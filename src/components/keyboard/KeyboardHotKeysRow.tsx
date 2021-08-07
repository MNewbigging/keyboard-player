import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardKey } from '../../model/KeyboardKey';
import { KeyboardItem, Notes } from '../../model/KeyboardItem';

import './keyboard-hotkeys-row.scss';

interface Props {
  keyboard: KeyboardItem;
}

@observer
export class KeyboardHotkeysRow extends React.Component<Props> {
  public render() {
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
          whiteRow.push(this.renderHotkeyBox(key));
          break;
        case Notes.E:
        case Notes.B:
          whiteRow.push(this.renderHotkeyBox(key));
          blackRow.push(<div key={`hks-${keyboard.id}-${k}`} className={'hotkey-spacer'}></div>);
          break;
        case Notes.C_SHARP:
        case Notes.D_SHARP:
        case Notes.F_SHARP:
        case Notes.G_SHARP:
        case Notes.A_SHARP:
          blackRow.push(this.renderHotkeyBox(key));
          break;
      }
    }

    // Last is always a white note
    const lastKey = keyboard.keys[keyboard.keys.length - 1];
    whiteRow.push(this.renderHotkeyBox(lastKey));

    return (
      <>
        <div className={'hotkey-row black'}>{blackRow}</div>
        <div className={'hotkey-row'}>{whiteRow}</div>
      </>
    );
  }

  private renderHotkeyBox(key: KeyboardKey) {
    const { keyboard } = this.props;

    return (
      <div
        key={`hk-${keyboard.id}-${key.name}`}
        className={'hotkey-box ' + key.type}
        onClick={() => keyboard.startAssignHotkey(key)}
        onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          keyboard.clearHotkey(key);
        }}
      >
        {key.hotkey}
      </div>
    );
  }
}
