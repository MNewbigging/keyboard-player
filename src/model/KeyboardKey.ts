import { action, observable } from 'mobx';

import { KeyboardUtils } from '../utils/KeyboardUtils';
import { Notes, Octaves } from './KeyboardItem';

export enum KeyType {
  WHITE = 'white',
  BLACK = 'black',
}

export class KeyboardKey {
  public note: Notes;
  public octave: Octaves;
  public name: string;
  public type: KeyType;
  @observable public hotkey = '';

  constructor(note: Notes, octave: Octaves) {
    this.note = note;
    this.octave = octave;
    this.name = KeyboardUtils.getKeyName(note, octave);
    this.type = KeyboardUtils.getKeyType(note);
  }

  @action setHotkey(key: string) {
    this.hotkey = key;
  }

  @action clearHotkey() {
    this.hotkey = '';
  }
}
