import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem, Octaves, Notes } from '../../model/KeyboardItem';

interface Props {
  keyboard: KeyboardItem;
  note: Notes;
  octave: Octaves;
}

@observer
export class WhiteKey extends React.Component<Props> {
  public render() {
    const { keyboard, note, octave } = this.props;

    const playingClass = keyboard.isKeyPlaying(note, octave) ? 'playing' : '';

    return (
      <div
        className={'white-key ' + playingClass}
        onMouseEnter={() => keyboard.onMouseEnterKey(note, octave)}
        onMouseLeave={() => keyboard.onMouseLeaveKey(note, octave)}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault();
          keyboard.onMouseDownKey(note, octave);
        }}
        onMouseUp={() => keyboard.onMouseUpKey(note, octave)}
      ></div>
    );
  }
}
