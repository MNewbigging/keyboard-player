import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardKey } from '../../model/KeyboardKey';
import { KeyboardItem } from '../../model/KeyboardItem';
import { WhiteKey } from './WhiteKey';

interface Props {
  keyboard: KeyboardItem;
  wKey: KeyboardKey;
  bKey: KeyboardKey;
}

@observer
export class WhiteBlackKeyPair extends React.Component<Props> {
  public render() {
    const { keyboard, wKey, bKey } = this.props;

    const playingClass = keyboard.isKeyPlaying(bKey) ? 'playing' : '';

    return (
      <div className={'key-pair'}>
        <WhiteKey keyboard={keyboard} keyboardKey={wKey} />
        <div
          className={'black-key ' + playingClass}
          onMouseEnter={() => keyboard.onMouseEnterKey(bKey)}
          onMouseLeave={() => keyboard.onMouseLeaveKey(bKey)}
          onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault();
            keyboard.onMouseDownKey(bKey);
          }}
          onMouseUp={() => keyboard.onMouseUpKey(bKey)}
        ></div>
      </div>
    );
  }
}
