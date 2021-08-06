import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem, Notes, Octaves } from '../../model/KeyboardItem';
import { WhiteKey } from './WhiteKey';

interface Props {
  keyboard: KeyboardItem;
  wNote: Notes;
  bNote: Notes;
  octave: Octaves;
}

@observer
export class WhiteBlackKeyPair extends React.Component<Props> {
  public render() {
    const { keyboard, wNote, bNote, octave } = this.props;

    const playingClass = keyboard.isKeyPlaying(bNote, octave) ? 'playing' : '';

    return (
      <div className={'key-pair'} key={keyboard.id + '-' + bNote + octave}>
        <WhiteKey keyboard={keyboard} note={wNote} octave={octave} />
        <div
          className={'black-key ' + playingClass}
          onMouseEnter={() => keyboard.onMouseEnterKey(bNote, octave)}
          onMouseLeave={() => keyboard.onMouseLeaveKey(bNote, octave)}
          onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault();
            keyboard.onMouseDownKey(bNote, octave);
          }}
          onMouseUp={() => keyboard.onMouseUpKey(bNote, octave)}
        ></div>
      </div>
    );
  }
}
