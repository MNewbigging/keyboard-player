import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardKey } from '../../model/KeyboardKey';
import { KeyboardItem } from '../../model/KeyboardItem';

interface Props {
  keyboard: KeyboardItem;
  keyboardKey: KeyboardKey;
}

@observer
export class WhiteKey extends React.Component<Props> {
  public render() {
    const { keyboard, keyboardKey } = this.props;

    const playingClass = keyboard.isKeyPlaying(keyboardKey) ? 'playing' : '';

    return (
      <div
        className={'white-key ' + playingClass}
        onMouseEnter={() => keyboard.onMouseEnterKey(keyboardKey)}
        onMouseLeave={() => keyboard.onMouseLeaveKey(keyboardKey)}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault();
          keyboard.onMouseDownKey(keyboardKey);
        }}
        onMouseUp={() => keyboard.onMouseUpKey(keyboardKey)}
      ></div>
    );
  }
}
