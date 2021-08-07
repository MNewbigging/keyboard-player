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
    let octaveIdx: number = octaves.indexOf(firstOctave);
    let curOctave = octaves[octaveIdx];

    // Current note
    let noteIdx: number = allNotes.indexOf(firstNote);

    // Total keys to add
    const totalKeys = numOctaves * 12;

    for (let i = 0; i < totalKeys; i++) {
      // Get the next note and octave
      const curNote = allNotes[noteIdx];
      curOctave = octaves[octaveIdx];

      // Create a key for it with current octave
      keys.push(new Key(curNote, curOctave));

      // Increase the note
      noteIdx++;
      // Loop around if at end of all notes array
      if (noteIdx === allNotes.length) {
        noteIdx = 0;
      }

      // Check if we've moved to next octave
      if (allNotes[noteIdx] === Notes.C) {
        octaveIdx++;

        // Cannot exceed max octaves supported
        if (octaveIdx === octaves.length) {
          return keys;
        }
      }
    }

    // Another note of the first note type at last octave
    keys.push(new Key(firstNote, octaves[octaveIdx]));

    return keys;
  }
}
