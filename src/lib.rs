use js_sys::Number;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(num1: Number, num2: Number) -> js_sys::Number {
  return num1 + num2;
}