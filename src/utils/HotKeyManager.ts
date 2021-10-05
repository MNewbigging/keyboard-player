type HotkeyListener = (key: string) => void;

class HotkeyManager {
  private pressedKeys: string[] = [];
  private lastPressedKey = '';
  private keyDownListeners: HotkeyListener[] = [];
  private keyUpListeners: HotkeyListener[] = [];

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  public addKeyDownListener(listener: HotkeyListener) {
    this.keyDownListeners.push(listener);
  }

  public addKeyUpListener(listener: HotkeyListener) {
    this.keyUpListeners.push(listener);
  }

  public removeListener(listener: HotkeyListener) {
    this.keyDownListeners = this.keyDownListeners.filter((l) => l !== listener);
    this.keyUpListeners = this.keyUpListeners.filter((l) => l !== listener);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    // This event fires every frame key is held
    if (this.lastPressedKey === e.key) {
      return;
    }

    this.lastPressedKey = e.key;
    this.pressedKeys.push(e.key);
    this.keyDownListeners.forEach((cb) => cb(e.key));
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.pressedKeys = this.pressedKeys.filter((key) => key !== e.key);
    this.keyUpListeners.forEach((cb) => cb(e.key));
    this.lastPressedKey = '';
  };
}

export const hotkeyManager = new HotkeyManager();
