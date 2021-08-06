import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem } from '../model/KeyboardItem';
import { Keyboard } from './Keyboard';

import './keyboard-row.scss';

interface Props {
  keyboardRow: KeyboardItem[];
  addKeyboard: () => void;
}

@observer
export class KeyboardRow extends React.Component<Props> {
  public render() {
    const { keyboardRow, addKeyboard } = this.props;

    return (
      <div className={'keyboard-row'}>
        <div className={'add-keyboard'} onClick={() => addKeyboard()}>
          +
        </div>
        {keyboardRow.map((kb) => (
          <Keyboard key={kb.id} keyboard={kb} />
        ))}
      </div>
    );
  }
}
