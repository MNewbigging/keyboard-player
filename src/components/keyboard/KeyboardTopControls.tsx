import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem } from '../../model/KeyboardItem';

import './keyboard-top-controls.scss';

interface Props {
  keyboard: KeyboardItem;
  onRemove: () => void;
}

@observer
export class KeyboardTopControls extends React.Component<Props> {
  public render() {
    const { onRemove } = this.props;

    return (
      <div className={'keyboard-top-controls'}>
        <button onClick={() => onRemove()}>Remove</button>
      </div>
    );
  }
}
