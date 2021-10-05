import { KeyboardKey, KeyType } from '../model/KeyboardKey';
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

  public static getNoteFromString(note: string) {
    switch (note) {
      case 'C':
        return Notes.C;
      case 'C#':
        return Notes.C_SHARP;
      case 'D':
        return Notes.D;
      case 'D#':
        return Notes.D_SHARP;
      case 'E':
        return Notes.E;
      case 'F':
        return Notes.F;
      case 'F#':
        return Notes.F_SHARP;
      case 'G':
        return Notes.G;
      case 'G#':
        return Notes.G_SHARP;
      case 'A':
        return Notes.A;
      case 'A#':
        return Notes.A_SHARP;
    }
  }

  public static getOctaveFromString(octave: string) {
    switch (octave) {
      case '1':
        return Octaves.ONE;
      case '2':
        return Octaves.TWO;
      case '3':
        return Octaves.THREE;
      case '4':
        return Octaves.FOUR;
      case '5':
        return Octaves.FIVE;
      case '6':
        return Octaves.SIX;
    }
  }

  public static generateKeys(firstNote: Notes, firstOctave: Octaves, numOctaves: number) {
    const keys: KeyboardKey[] = [];

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
      keys.push(new KeyboardKey(curNote, curOctave));

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
    keys.push(new KeyboardKey(firstNote, octaves[octaveIdx]));

    return keys;
  }
}
