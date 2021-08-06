import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem } from '../model/KeyboardItem';

import './keyboard.scss';

interface Props {
  keyboard: KeyboardItem;
}

@observer
export class Keyboard extends React.Component<Props> {
  public render() {
    return (
      <div className={'keyboard'}>
        <div className={'top-row'}></div>
        <div className={'left-side'}></div>
        <div className={'keys-area'}></div>
        <div className={'right-side'}></div>
      </div>
    );
  }
}
