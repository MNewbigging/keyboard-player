import { observable } from 'mobx';
import * as Tone from 'tone';
import { KeyboardUtils } from '../utils/KeyboardUtils';
import { mouseUtils } from '../utils/MouseUtils';
import { Key } from './Key';

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
  public octaves = 2;
  public keys: Key[] = [];
  @observable public keysPlaying: string[] = [];
  private polySynth = new Tone.PolySynth().toDestination();

  constructor(id: string) {
    this.id = id;

    this.keys = KeyboardUtils.generateKeys(this.firstNote, this.firstOctave, this.octaves);
    console.log('keys', this.keys);
  }

  public isKeyPlaying(note: Notes, octave: Octaves) {
    const key = this.getKeyString(note, octave);
    return this.keysPlaying.includes(key);
  }

  public onMouseDownKey(note: Notes, octave: Octaves) {
    this.playKey(note, octave);
  }

  public onMouseUpKey(note: Notes, octave: Octaves) {
    this.stopPlayingKey(note, octave);
  }

  public onMouseEnterKey(note: Notes, octave: Octaves) {
    if (mouseUtils.mousedown) {
      this.playKey(note, octave);
    }
  }

  public onMouseLeaveKey(note: Notes, octave: Octaves) {
    this.stopPlayingKey(note, octave);
  }

  public playKey(note: Notes, octave: Octaves) {
    const key = this.getKeyString(note, octave);
    // Only play if not already playing
    if (!this.keysPlaying.includes(key)) {
      this.keysPlaying.push(key);
      this.polySynth.triggerAttack(key);
    }
  }

  private stopPlayingKey(note: Notes, octave: Octaves) {
    const key = this.getKeyString(note, octave);
    // Can only stop if currently playing
    if (this.keysPlaying.includes(key)) {
      this.polySynth.triggerRelease(key);
      this.keysPlaying = this.keysPlaying.filter((k) => k !== key);
    }
  }

  private getKeyString(note: Notes, octave: Octaves) {
    return `${note}${octave}`;
  }
}
