import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem } from '../model/KeyboardItem';
import { Keyboard } from './keyboard/Keyboard';

import './keyboard-row.scss';

interface Props {
  keyboardRow: KeyboardItem[];
  addKeyboard: () => void;
  removeKeyboard: (id: string) => void;
}

@observer
export class KeyboardRow extends React.Component<Props> {
  public render() {
    const { keyboardRow, addKeyboard, removeKeyboard } = this.props;

    return (
      <div className={'keyboard-row'}>
        <div className={'add-keyboard'} onClick={() => addKeyboard()}>
          +
        </div>
        {keyboardRow.map((kb) => (
          <Keyboard key={kb.id} keyboard={kb} onRemove={() => removeKeyboard(kb.id)} />
        ))}
      </div>
    );
  }
}
