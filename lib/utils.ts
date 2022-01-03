import { Keyboard } from '../types/keyboard';

export function getAllKeyboardSwitches(keyboards: Keyboard[]) {
  return Array.from(new Set(keyboards.map((keyboard) => keyboard.switches)));
}

export function getAllKeyboardStatus(keyboards: Keyboard[]) {
  return Array.from(new Set(keyboards.map((keyboard) => keyboard.status)));
}

export function getAllKeyboardLighting(keyboards: Keyboard[]) {
  return Array.from(new Set(keyboards.map((keyboard) => keyboard.lighting)));
}

export function getAllKeyboardType(keyboards: Keyboard[]) {
  return Array.from(new Set(keyboards.map((keyboard) => keyboard.type)));
}

export function getAllKeyboardWired(keyboards: Keyboard[]) {
  return Array.from(new Set(keyboards.map((keyboard) => keyboard.wired)));
}

export function getDomain() {
  return;
}
