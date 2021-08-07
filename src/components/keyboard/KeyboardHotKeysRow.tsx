import { observer } from 'mobx-react';
import React from 'react';
import { KeyType } from '../../model/Key';

import { KeyboardItem, Notes } from '../../model/KeyboardItem';

import './keyboard-hotkeys-row.scss';

interface Props {
  keyboard: KeyboardItem;
}

@observer
export class KeyboardHotkeysRow extends React.Component<Props> {
  public render() {
    const { keyboard } = this.props;

    return <div className={'hotkeys-container'}>{this.renderHotkeyBoxes()}</div>;
  }

  private renderHotkeyBoxes() {
    const { keyboard } = this.props;

    // Consists of two rows; white notes and black notes boxes
    const whiteRow: JSX.Element[] = [];
    const blackRow: JSX.Element[] = [];

    // Do all but the last like this:
    const penultimateKey = keyboard.keys.length - 1;
    for (let k = 0; k < penultimateKey; k++) {
      const key = keyboard.keys[k];
      switch (key.note) {
        case Notes.C:
        case Notes.D:
        case Notes.F:
        case Notes.G:
        case Notes.A:
          whiteRow.push(<div className={'hotkey-box white'}></div>);
          break;
        case Notes.E:
        case Notes.B:
          whiteRow.push(<div className={'hotkey-box white'}></div>);
          blackRow.push(<div className={'hotkey-spacer'}></div>);
          break;
        case Notes.C_SHARP:
        case Notes.D_SHARP:
        case Notes.F_SHARP:
        case Notes.G_SHARP:
        case Notes.A_SHARP:
          blackRow.push(<div className={'hotkey-box black'}></div>);
          break;
      }
    }

    // Last is always a white note
    whiteRow.push(<div className={'hotkey-box white'}></div>);

    return (
      <>
        <div className={'hotkey-row black'}>{blackRow}</div>
        <div className={'hotkey-row'}>{whiteRow}</div>
      </>
    );
  }
}
