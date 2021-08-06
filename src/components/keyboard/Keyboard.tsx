import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem, Notes, octaves, Octaves, whiteNotes } from '../../model/KeyboardItem';

import './keyboard.scss';
import { KeyboardHotkeysRow } from './KeyboardHotKeysRow';
import { KeyboardTopControls } from './KeyboardTopControls';
import { WhiteBlackKeyPair } from './WhiteBlackKeyPair';
import { WhiteKey } from './WhiteKey';

interface Props {
  keyboard: KeyboardItem;
}

@observer
export class Keyboard extends React.Component<Props> {
  public render() {
    const { keyboard } = this.props;

    return (
      <div className={'keyboard'}>
        <div className={'top-row'}>
          <KeyboardTopControls keyboard={keyboard} />
        </div>
        <div className={'hotkeys-row'}>
          <KeyboardHotkeysRow />
        </div>
        <div className={'left-side'}></div>
        <div className={'keys-area'}>{this.renderKeys()}</div>
        <div className={'right-side'}></div>
      </div>
    );
  }

  private renderKeys() {
    const { keyboard } = this.props;

    const keys: JSX.Element[] = [];

    // Get the starting octave for this keyboard
    let currentOctave: number = octaves.indexOf(keyboard.firstOctave);

    // Get the starting note for this keyboard
    let currentWhiteNote: number = whiteNotes.indexOf(keyboard.firstNote);

    // For all the octaves on this keyboard...
    for (let o = 0; o < keyboard.octaves; o++) {
      // Go through all white notes for this octave
      for (let n = 0; n < whiteNotes.length; n++) {
        // Get the key for this note (plus black key for certain white notes)
        const key = this.getKeys(currentWhiteNote, currentOctave);
        keys.push(key);

        // Move to next white note
        currentWhiteNote++;
        if (currentWhiteNote === whiteNotes.length) {
          currentWhiteNote = 0;
        }
      }

      // Move to next octave
      currentOctave++;
      if (currentOctave === octaves.length) {
        currentOctave = 0;
      }
    }

    // Add final key
    const lastKey = this.renderWhiteKey(whiteNotes[currentWhiteNote], octaves[currentOctave]);
    keys.push(lastKey);

    return keys;
  }

  private getKeys(note: number, octave: number) {
    // Get the current octave
    const curOctave = octaves[octave];

    // Get the current white note
    const curWhiteNote = whiteNotes[note];

    switch (curWhiteNote) {
      case Notes.C:
        return this.renderWhiteBlackKeyPair(curWhiteNote, Notes.C_SHARP, curOctave);
      case Notes.D:
        return this.renderWhiteBlackKeyPair(curWhiteNote, Notes.D_SHARP, curOctave);
      case Notes.F:
        return this.renderWhiteBlackKeyPair(curWhiteNote, Notes.F_SHARP, curOctave);
      case Notes.G:
        return this.renderWhiteBlackKeyPair(curWhiteNote, Notes.G_SHARP, curOctave);
      case Notes.A:
        return this.renderWhiteBlackKeyPair(curWhiteNote, Notes.A_SHARP, curOctave);
      case Notes.E:
      case Notes.B:
        return this.renderWhiteKey(curWhiteNote, curOctave);
    }
  }

  private renderWhiteKey(note: Notes, octave: Octaves) {
    const { keyboard } = this.props;

    return (
      <WhiteKey
        key={keyboard.id + '-' + note + octave}
        keyboard={keyboard}
        note={note}
        octave={octave}
      />
    );
  }

  private renderWhiteBlackKeyPair(wNote: Notes, bNote: Notes, octave: Octaves) {
    const { keyboard } = this.props;

    return (
      <WhiteBlackKeyPair
        key={keyboard.id + '-' + bNote + octave}
        keyboard={keyboard}
        wNote={wNote}
        bNote={bNote}
        octave={octave}
      />
    );
  }
}
