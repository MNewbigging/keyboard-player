import { action, observable } from 'mobx';
import { Notes, Octaves } from '../model/KeyboardItem';
import { KeyboardUtils } from '../utils/KeyboardUtils';

export enum KeyboardRowLocation {
  TOP = 'top',
  BOT = 'bot',
}

export class AddKeyboardDialogState {
  @observable public open = false;
  @observable public startNote = Notes.C;
  @observable public startOctave = Octaves.THREE;
  @observable public numOctaves = 2;

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

  @action public setStartOctave(octave: string) {
    this.startOctave = KeyboardUtils.getOctaveFromString(octave);
  }

  @action public setNumOctaves(num: string) {
    this.numOctaves = parseInt(num, 10);
  }
}
