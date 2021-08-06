import { KeyboardUtils } from '../utils/KeyboardUtils';
import { Notes, Octaves } from './KeyboardItem';

export class Key {
  note: Notes;
  octave: Octaves;
  name: string;

  constructor(note: Notes, octave: Octaves) {
    this.note = note;
    this.octave = octave;
    this.name = KeyboardUtils.getKeyName(note, octave);
  }
}
