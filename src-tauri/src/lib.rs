use tauri::{Emitter, AppHandle, Manager, PhysicalPosition, PhysicalSize};
use std::fs::File;
use std::io::{BufReader, BufRead, Seek, SeekFrom};
use std::thread;
use std::time::Duration;
use serde::{Serialize, Deserialize};
use tokio::runtime::Runtime;
use winapi::shared::minwindef::{BOOL, LPARAM};
use winapi::shared::windef::{HWND, RECT};
use winapi::um::winuser::{EnumWindows, GetWindowRect, GetWindowTextW, IsWindowVisible};

#[derive(Serialize, Deserialize, Clone)]
pub struct Achievement {
    pub id: i32,
    pub title: String,
    pub description: String,
    pub r#type: Option<String>,
    pub points: i32,
    pub badge: Option<String>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Achievement_Clean {
    #[serde(rename = "ID")]
    pub id: i32,
    #[serde(rename = "Title")]
    pub title: String,
    #[serde(rename = "Description")]
    pub description: String,
    #[serde(rename = "Type")]
    pub r#type: Option<String>,
    #[serde(rename = "Points")]
    pub points: i32,
    #[serde(rename = "BadgeName")]
    pub badge: Option<String>,
}

#[derive(Serialize, Deserialize, Clone)]
struct RAUnlockResponse {
    #[serde(rename = "Achievement")]
    achievement: Achievement_Clean,
}

// 1. Struct coerente per la ricerca
struct SearchData {
    target_title: String,
    found_hwnd: Option<HWND>,
}

// 2. Callback pulita: deve solo trovare l'HWND
unsafe extern "system" fn enum_window_callback(hwnd: HWND, lparam: LPARAM) -> BOOL {
    let data = &mut *(lparam as *mut SearchData);
    if IsWindowVisible(hwnd) == 0 { return 1; }

    let mut buffer: [u16; 512] = [0; 512];
    let len = GetWindowTextW(hwnd, buffer.as_mut_ptr(), buffer.len() as i32);
    if len > 0 {
        let title = String::from_utf16_lossy(&buffer[..len as usize]);
        if title.contains(&data.target_title) {
            data.found_hwnd = Some(hwnd);
            return 0; // Trovata, ferma tutto
        }
    }
    1
}

// 3. Funzione che restituisce il RECT di RetroArch
fn get_retroarch_rect() -> Option<RECT> {
    let mut data = SearchData {
        target_title: "RetroArch".to_string(),
        found_hwnd: None,
    };
    unsafe {
        EnumWindows(Some(enum_window_callback), &mut data as *mut SearchData as LPARAM);
        if let Some(hwnd) = data.found_hwnd {
            let mut rect = RECT { left: 0, top: 0, right: 0, bottom: 0 };
            if GetWindowRect(hwnd, &mut rect) != 0 {
                return Some(rect);
            }
        }
    }
    None
}

fn watch_log(app: AppHandle, _path: &str) {
    let log_path = "C:\\RetroArch-Win64\\logs\\retroarch.log";
    let f = File::open(log_path).expect("Impossibile aprire il file log");
    let mut reader = BufReader::new(f);
    let rt = Runtime::new().unwrap();
    
    reader.seek(SeekFrom::End(0)).unwrap();

    loop {
        let mut line = String::new();
        if let Ok(bytes) = reader.read_line(&mut line) {
            if bytes == 0 {
                thread::sleep(Duration::from_millis(500));
                continue;
            }

            if line.contains("Awarding achievement") {
                if let Some(id) = find_id(&line) {
                    // SPOSTA LA FINESTRA PRIMA DI MANDARE L'ACHIEVEMENT
                    if let Some(rect) = get_retroarch_rect() {
                        if let Some(window) = app.get_webview_window("overlay") {
                            let _ = window.set_position(PhysicalPosition::new(rect.left, rect.top));
                            let w = (rect.right - rect.left) as u32;
                            let h = (rect.bottom - rect.top) as u32;
                            let _ = window.set_size(PhysicalSize::new(w, h));
                        }
                    }

                    // CHIAMA API
                    if let Ok(result) = rt.block_on(get_achievement(id, "Yd6Iv3DEb9MahvNU8uxM6RAhtJlFmEJF", "delisnt")) {
                        let _ = app.emit("achievement-sent", result);
                    }
                }
            }
        }
    }
}

fn find_id(line: &str) -> Option<u32> {
    line.split("Awarding achievement ")
        .nth(1)?
        .split(':')
        .next()?
        .trim()
        .parse::<u32>()
        .ok()
}

async fn get_achievement(id: u32, api_key: &str, user: &str) -> Result<Achievement, String> {
    let url = format!(
        "https://retroachievements.org/API/API_GetAchievementUnlocks.php?z={}&y={}&a={}&c=1",
        user, api_key, id
    );
    let response = reqwest::get(url).await.map_err(|e| e.to_string())?;
    let full_data: RAUnlockResponse = response.json().await.map_err(|e| e.to_string())?;

    Ok(Achievement {
        id: full_data.achievement.id,
        title: full_data.achievement.title,
        description: full_data.achievement.description,
        r#type: full_data.achievement.r#type,
        points: full_data.achievement.points,
        badge: full_data.achievement.badge,
    })
}

#[tauri::command]
fn simulate_achievement(app: AppHandle, cheevo: Achievement) {
    let _ = app.emit("achievement-sent", cheevo);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![simulate_achievement])
        .setup(|app| {
            let handle = app.handle().clone();
            thread::spawn(move || {
                watch_log(handle, "");
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}