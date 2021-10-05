import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem } from '../../model/KeyboardItem';

import './keyboard-top-controls.scss';

interface Props {
  keyboard: KeyboardItem;
}

@observer
export class KeyboardTopControls extends React.Component<Props> {
  public render() {
    return <div className={'keyboard-top-controls'}></div>;
  }
}
