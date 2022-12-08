use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};
use wasm_bindgen::prelude::*;

#[derive(Hash)]
struct Stat {
    c_time: u32,
    m_time: u32,
}

#[derive(Hash)]
struct File {
    path: String,
    data: String,
    stat: Stat,
}

#[wasm_bindgen]
pub fn calculate_file_hash(path: String, data: String, m_time: u32, c_time: u32) -> u64 {
    let file: File = File {
        path: path,
        data: data,
        stat: Stat {
            c_time: c_time,
            m_time: m_time,
        },
    };
    return calculate_hash(&file);
}

pub fn calculate_hash<T: Hash>(t: &T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}
