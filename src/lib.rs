use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};
use wasm_bindgen::prelude::*;

#[derive(Hash)]
struct File {
    path: String,
    data: String,
}

#[wasm_bindgen]
pub fn calculate_file_hash(path: String, data: String) -> u64 {
    let file: File = File {
        path: path,
        data: data,
    };
    return calculate_hash(&file);
}

pub fn calculate_hash<T: Hash>(t: &T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}
