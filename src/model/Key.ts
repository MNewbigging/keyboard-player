import { KeyboardUtils } from '../utils/KeyboardUtils';
import { Notes, Octaves } from './KeyboardItem';

export enum KeyType {
  WHITE = 'white',
  BLACK = 'black',
}

export class Key {
  note: Notes;
  octave: Octaves;
  name: string;
  type: KeyType;

  constructor(note: Notes, octave: Octaves) {
    this.note = note;
    this.octave = octave;
    this.name = KeyboardUtils.getKeyName(note, octave);
    this.type = KeyboardUtils.getKeyType(note);
  }
}
