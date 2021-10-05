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
}
