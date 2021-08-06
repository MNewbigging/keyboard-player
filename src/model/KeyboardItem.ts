export enum Notes {
  C = 'C',
  C_SHARP = 'C#',
  D = 'D',
  D_SHARP = 'D#',
  E = 'E',
  F = 'F',
  F_SHARP = 'F#',
  G = 'G',
  G_SHARP = 'G#',
  A = 'A',
  A_SHARP = 'A#',
  B = 'B',
}

export const whiteNotes: Notes[] = [Notes.C, Notes.D, Notes.E, Notes.F, Notes.G, Notes.A, Notes.B];

export const allNotes: Notes[] = Object.values(Notes);

export enum Octaves {
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
}

export const octaves: Octaves[] = Object.values(Octaves);

export class KeyboardItem {
  public id: string;
  public firstNote = Notes.C;
  public firstOctave = Octaves.THREE;
  public octaves = 3;

  constructor(id: string) {
    this.id = id;
  }

  public onClickKey(note: Notes, octave: Octaves) {
    console.log('clicked key: ' + note + octave);
  }

  public onMouseEnterKey(note: Notes, octave: Octaves) {
    //
  }

  public onMouseLeaveKey(note: Notes, octave: Octaves) {
    //
  }

  public playKey(note: Notes, octave: Octaves) {}
}
