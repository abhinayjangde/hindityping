type KeyMapping = Readonly<Record<string, string>>;

const normalKeys: KeyMapping = {
  Backquote: "़",
  Digit1: "१",
  Digit2: "२",
  Digit3: "३",
  Digit4: "४",
  Digit5: "५",
  Digit6: "६",
  Digit7: "७",
  Digit8: "८",
  Digit9: "९",
  Digit0: "०",
  Minus: "-",
  Equal: "ृ",
  KeyQ: "ौ",
  KeyW: "र",
  KeyE: "त",
  KeyR: "थ",
  KeyT: "द",
  KeyY: "ब",
  KeyU: "ट",
  KeyI: "ज",
  KeyO: "ब",
  KeyP: "न",
  BracketLeft: "प",
  BracketRight: "ग",
  KeyA: "ो",
  KeyS: "े",
  KeyD: "क",
  KeyF: "ि",
  KeyG: "ह",
  KeyH: "ी",
  KeyJ: "र",
  KeyK: "ा",
  KeyL: "स",
  Semicolon: "य",
  Quote: "ष्",
  KeyZ: "्र",
  KeyX: "म",
  KeyC: "व",
  KeyV: "न",
  KeyB: "ल",
  KeyN: "श",
  KeyM: "ष",
  Comma: ",",
  Period: ".",
  Slash: "य"
};

const shiftedKeys: KeyMapping = {
  Backquote: "ञ",
  Digit1: "१",
  Digit2: "२",
  Digit3: "३",
  Digit4: "४",
  Digit5: "५",
  Digit6: "६",
  Digit7: "७",
  Digit8: "८",
  Digit9: "९",
  Digit0: "०",
  Minus: "ः",
  Equal: "ऋ",
  KeyQ: "औ",
  KeyW: "ऐ",
  KeyE: "आ",
  KeyR: "ई",
  KeyT: "ऊ",
  KeyY: "भ",
  KeyU: "ङ",
  KeyI: "घ",
  KeyO: "ध",
  KeyP: "झ",
  BracketLeft: "ढ",
  BracketRight: "ञ",
  KeyA: "ओ",
  KeyS: "ए",
  KeyD: "अ",
  KeyF: "इ",
  KeyG: "उ",
  KeyH: "फ",
  KeyJ: "ऱ",
  KeyK: "ख",
  KeyL: "थ",
  Semicolon: "छ",
  Quote: "ठ",
  KeyZ: "त्र",
  KeyX: "क्ष",
  KeyC: "ण",
  KeyV: "श्र",
  KeyB: "ळ",
  KeyN: "श",
  KeyM: "ष",
  Comma: "।",
  Period: "?",
  Slash: "र"
};

export function getHindiKeyMapping(event: KeyboardEvent): string | undefined {
  if (event.ctrlKey || event.altKey || event.metaKey) {
    return undefined;
  }

  if (event.code === "Quote" && (event.shiftKey || event.getModifierState("CapsLock"))) {
    return "श्";
  }

  const mapping = event.shiftKey ? shiftedKeys : normalKeys;
  return mapping[event.code];
}
