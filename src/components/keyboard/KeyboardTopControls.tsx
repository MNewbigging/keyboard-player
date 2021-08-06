import React from 'react';

import { KeyboardItem } from '../../model/KeyboardItem';

import './keyboard-top-controls.scss';

interface Props {
  keyboard: KeyboardItem;
}

export class KeyboardTopControls extends React.Component<Props> {
  public render() {
    return (
      <div className={'keyboard-top-controls'}>
        <div>btn</div>
      </div>
    );
  }
}
