import { Key, KeyType } from '../model/Key';
import { Octaves, Notes, octaves, allNotes } from '../model/KeyboardItem';

export class KeyboardUtils {
  public static getKeyName(note: Notes, octave: Octaves) {
    return `${note}${octave}`;
  }

  public static getKeyType(note: Notes) {
    switch (note) {
      case Notes.C:
      case Notes.D:
      case Notes.E:
      case Notes.F:
      case Notes.G:
      case Notes.A:
      case Notes.B:
        return KeyType.WHITE;
      default:
        return KeyType.BLACK;
    }
  }

  public static generateKeys(firstNote: Notes, firstOctave: Octaves, numOctaves: number) {
    const keys: Key[] = [];

    // Current octave
    let curOctave: number = octaves.indexOf(firstOctave);

    // Current note
    let curNote: number = allNotes.indexOf(firstNote);

    // For each octave
    for (let o = 0; o < numOctaves; o++) {
      const octave = octaves[curOctave];

      // For each note
      for (let n = 0; n < allNotes.length; n++) {
        const note = allNotes[curNote];

        keys.push(new Key(note, octave));

        curNote++;
        if (curNote === allNotes.length) {
          curNote = 0;
        }
      }

      curOctave++;
      if (curOctave === octaves.length) {
        // Don't loop around octaves; stop here
        break;
      }
    }

    // Another note of the first note type at last octave
    keys.push(new Key(firstNote, octaves[curOctave]));

    return keys;
  }
}
