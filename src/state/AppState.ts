import { action, observable } from 'mobx';

import { KeyboardItem } from '../model/KeyboardItem';
import { RandomId } from '../utils/RandomId';
import { AddKeyboardDialogState, KeyboardRowLocation } from './AddKeyboardDialogState';

export class AppState {
  @observable public topRowKeyboards: KeyboardItem[] = [];
  @observable public botRowKeyboards: KeyboardItem[] = [];
  public addKeyboardDialogState = new AddKeyboardDialogState();

  @action public startAddTopRowKeyboard() {
    this.addKeyboardDialogState.startAddKeyboard(KeyboardRowLocation.TOP);
  }

  @action public startAddBotRowKeyboard() {
    this.addKeyboardDialogState.startAddKeyboard(KeyboardRowLocation.BOT);
  }

  @action public addKeyboard() {
    this.addKeyboardDialogState.close();
    const loc = this.addKeyboardDialogState.location;

    const id = RandomId.createId();
    const startNote = this.addKeyboardDialogState.startNote;
    const startOctave = this.addKeyboardDialogState.startOctave;
    const numOctaves = this.addKeyboardDialogState.numOctaves;

    const keyboard = new KeyboardItem(id, startNote, startOctave, numOctaves);

    if (loc === KeyboardRowLocation.TOP) {
      this.topRowKeyboards.push(keyboard);
    } else {
      this.botRowKeyboards.push(keyboard);
    }
  }

  @action public removeKeyboard(id: string, location: KeyboardRowLocation) {
    if (location === KeyboardRowLocation.TOP) {
      const keyboard = this.topRowKeyboards.find((kb) => kb.id === id);
      keyboard.removeKeyboard();
      this.topRowKeyboards = this.topRowKeyboards.filter((kb) => kb.id !== id);
    } else {
      const keyboard = this.botRowKeyboards.find((kb) => kb.id === id);
      keyboard.removeKeyboard();
      this.botRowKeyboards = this.botRowKeyboards.filter((kb) => kb.id !== id);
    }
  }
}
