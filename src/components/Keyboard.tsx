import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem } from '../model/KeyboardItem';

interface Props {
  keyboard: KeyboardItem;
}

@observer
export class Keyboard extends React.Component<Props> {
  public render() {
    return (
      <div>
        <div></div>
      </div>
    );
  }
}
