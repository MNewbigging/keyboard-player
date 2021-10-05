import { action, observable } from 'mobx';
import { Notes } from '../model/KeyboardItem';
import { KeyboardUtils } from '../utils/KeyboardUtils';

export enum KeyboardRowLocation {
  TOP = 'top',
  BOT = 'bot',
}

export class AddKeyboardDialogState {
  @observable public open = false;
  @observable public startNote = Notes.C;
  public location = KeyboardRowLocation.TOP;

  @action public startAddKeyboard(location: KeyboardRowLocation) {
    this.location = location;
    this.open = true;
  }

  @action public close() {
    this.open = false;
  }

  @action public setStartNote(note: string) {
    this.startNote = KeyboardUtils.getNoteFromString(note);
  }
}
