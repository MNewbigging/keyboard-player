import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardKey } from '../../model/KeyboardKey';
import { KeyboardItem, Notes } from '../../model/KeyboardItem';
import { KeyboardHotkeysRow } from './KeyboardHotKeysRow';
import { KeyboardTopControls } from './KeyboardTopControls';
import { WhiteBlackKeyPair } from './WhiteBlackKeyPair';
import { WhiteKey } from './WhiteKey';

import './keyboard.scss';

interface Props {
  keyboard: KeyboardItem;
  onRemove: () => void;
}

@observer
export class Keyboard extends React.Component<Props> {
  public render() {
    const { keyboard, onRemove } = this.props;

    return (
      <div className={'keyboard'}>
        <div className={'top-row'}>
          <KeyboardTopControls keyboard={keyboard} onRemove={() => onRemove()} />
        </div>
        <div className={'clear-hk'}>
          <div className={'keyboard-button'} onClick={keyboard.clearAllHotkeys}>
            CLEAR HOTKEYS
          </div>
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

    keyboard.keys.forEach((key, idx) => {
      switch (key.note) {
        // B and E have white keys after them
        case Notes.B:
        case Notes.E:
          keys.push(this.renderWhiteKey(key));
          break;
        // All other white keys have black keys after them
        case Notes.C:
        case Notes.D:
        case Notes.F:
        case Notes.G:
        case Notes.A:
          if (idx + 1 < keyboard.keys.length) {
            const blackKey = keyboard.keys[idx + 1];
            keys.push(this.renderWhiteBlackKeyPair(key, blackKey));
          }
          break;
      }
    });

    // Last item never a pair; always a white note
    const lastKey = keyboard.keys[keyboard.keys.length - 1];
    keys.push(this.renderWhiteKey(lastKey));

    return keys;
  }

  private renderWhiteKey(key: KeyboardKey) {
    const { keyboard } = this.props;

    return <WhiteKey key={`${keyboard.id}-${key.name}`} keyboard={keyboard} keyboardKey={key} />;
  }

  private renderWhiteBlackKeyPair(wKey: KeyboardKey, bKey: KeyboardKey) {
    const { keyboard } = this.props;

    return (
      <WhiteBlackKeyPair
        key={`${keyboard.id}-${bKey.name}`}
        keyboard={keyboard}
        wKey={wKey}
        bKey={bKey}
      />
    );
  }
}
