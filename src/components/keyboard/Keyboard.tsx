import { observer } from 'mobx-react';
import React from 'react';

import { Key, KeyType } from '../../model/Key';
import { KeyboardItem, Notes, Octaves } from '../../model/KeyboardItem';
import { KeyboardHotkeysRow } from './KeyboardHotKeysRow';
import { KeyboardTopControls } from './KeyboardTopControls';
import { WhiteBlackKeyPair } from './WhiteBlackKeyPair';
import { WhiteKey } from './WhiteKey';

import './keyboard.scss';

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
          <KeyboardHotkeysRow keyboard={keyboard} />
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

    // Since black and white keys are rendered in pairs, just need all white keys
    const whiteKeys = keyboard.keys.filter((key) => key.type === KeyType.WHITE);

    // Render all but last as potential pairs
    for (let i = 0; i < whiteKeys.length - 1; i++) {
      keys.push(this.renderKey(whiteKeys[i]));
    }

    // Last item never a pair; always a white note
    const lastKey = whiteKeys[whiteKeys.length - 1];
    keys.push(this.renderWhiteKey(lastKey.note, lastKey.octave));

    return keys;
  }

  private renderKey(key: Key) {
    switch (key.note) {
      case Notes.C:
        return this.renderWhiteBlackKeyPair(key.note, Notes.C_SHARP, key.octave);
      case Notes.D:
        return this.renderWhiteBlackKeyPair(key.note, Notes.D_SHARP, key.octave);
      case Notes.F:
        return this.renderWhiteBlackKeyPair(key.note, Notes.F_SHARP, key.octave);
      case Notes.G:
        return this.renderWhiteBlackKeyPair(key.note, Notes.G_SHARP, key.octave);
      case Notes.A:
        return this.renderWhiteBlackKeyPair(key.note, Notes.A_SHARP, key.octave);
      case Notes.E:
      case Notes.B:
        return this.renderWhiteKey(key.note, key.octave);
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
