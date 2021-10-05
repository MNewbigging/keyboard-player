import { action, observable } from 'mobx';
import * as Tone from 'tone';

import { hotkeyManager } from '../utils/HotKeyManager';
import { KeyboardUtils } from '../utils/KeyboardUtils';
import { mouseUtils } from '../utils/MouseUtils';
import { KeyboardKey } from './KeyboardKey';

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
  @observable public firstNote = Notes.C;
  public firstOctave = Octaves.THREE;
  public octaves = 2;
  @observable public keys: KeyboardKey[] = [];
  @observable public keysPlaying: string[] = [];
  @observable public hotkeys = new Map<string, KeyboardKey[]>();
  @observable public hotkeyAssignKey?: KeyboardKey;
  private polySynth = new Tone.PolySynth().toDestination();

  constructor(id: string, startNote: Notes) {
    this.id = id;
    this.firstNote = startNote;

    this.keys = KeyboardUtils.generateKeys(this.firstNote, this.firstOctave, this.octaves);

    hotkeyManager.addKeyDownListener(this.onHotkeyPress);
    hotkeyManager.addKeyUpListener(this.onHotkeyRelease);
  }

  public isKeyPlaying(key: KeyboardKey) {
    return this.keysPlaying.includes(key.name);
  }

  public onMouseDownKey(key: KeyboardKey) {
    this.playKey(key);
  }

  public onMouseUpKey(key: KeyboardKey) {
    this.stopPlayingKey(key);
  }

  public onMouseEnterKey(key: KeyboardKey) {
    if (mouseUtils.mousedown) {
      this.playKey(key);
    }
  }

  public onMouseLeaveKey(key: KeyboardKey) {
    this.stopPlayingKey(key);
  }

  @action public readonly startAssignHotkey = (key: KeyboardKey) => {
    // We are now listening for a hotkey press
    this.hotkeyAssignKey = key;
  };

  @action public readonly clearAllHotkeys = () => {
    this.hotkeys.clear();
    this.keys.forEach((key) => key.clearHotkey());
  };

  public readonly clearHotkey = (key: KeyboardKey) => {
    // If this key has no hotkeys to clear, stop
    if (!key.hotkey) {
      return;
    }

    // Otherwise, get the current keys for this hotkey
    let curKeys: KeyboardKey[] = this.hotkeys.get(key.hotkey);
    if (curKeys?.length) {
      // Filter out the key being removed for this hotkey
      curKeys = curKeys.filter((k) => k.name !== key.name);
      // Set the new keys against this hotkey
      this.hotkeys.set(key.hotkey, curKeys);
    }

    // Then clear the hotkey from the key itself
    key.clearHotkey();
  };

  private readonly onHotkeyPress = (hotkey: string) => {
    // First check if we're listening to assign a new hotkey
    if (this.hotkeyAssignKey) {
      // If so, assign that hotkey to the note
      this.assignHotkey(hotkey);
    } else {
      // Otherwise, get the notes to play for this hotkey and play them
      const keys = this.hotkeys.get(hotkey);
      if (keys?.length) {
        keys.forEach((key) => this.playKey(key));
      }
    }
  };

  private readonly onHotkeyRelease = (hotkey: string) => {
    // Stop playing any sounds that might be playing from pressing this hotkey
    const keys = this.hotkeys.get(hotkey) ?? [];
    if (keys.length) {
      keys.forEach((key) => this.stopPlayingKey(key));
    }
  };

  @action private assignHotkey(hotkey: string) {
    if (!this.hotkeyAssignKey) {
      return;
    }

    // Only allowed hotkeys are single character keys
    if (hotkey.length !== 1 || hotkey === ' ') {
      return;
    }

    // Assign hotkey to the key for display
    this.hotkeyAssignKey.setHotkey(hotkey);

    // Add it to map for playing via hotkey
    const curKeys = this.hotkeys.get(hotkey) ?? [];
    curKeys.push(this.hotkeyAssignKey);
    this.hotkeys.set(hotkey, curKeys);

    // No longer listening for assigning hotkey
    this.hotkeyAssignKey = undefined;
  }

  private playKey(key: KeyboardKey) {
    // Only play if not already playing
    if (!this.keysPlaying.includes(key.name)) {
      this.keysPlaying.push(key.name);
      this.polySynth.triggerAttack(key.name);
    }
  }

  private stopPlayingKey(key: KeyboardKey) {
    // Can only stop if currently playing
    if (this.keysPlaying.includes(key.name)) {
      this.polySynth.triggerRelease(key.name);
      this.keysPlaying = this.keysPlaying.filter((k) => k !== key.name);
    }
  }
}
