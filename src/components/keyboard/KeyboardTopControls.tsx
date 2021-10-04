import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem, Notes } from '../../model/KeyboardItem';

import './keyboard-top-controls.scss';

interface Props {
  keyboard: KeyboardItem;
}

@observer
export class KeyboardTopControls extends React.Component<Props> {
  public render() {
    return <div className={'keyboard-top-controls'}>{this.renderStartKeySelect()}</div>;
  }

  private renderStartKeySelect() {
    const { keyboard } = this.props;

    return (
      <div className={'start-key-select'}>
        <span>Start key</span>
        <select
          value={keyboard.firstNote}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            keyboard.setStartKey(e.target.value)
          }
        >
          <option value={Notes.C}>C</option>
          <option value={Notes.C_SHARP}>C#</option>
          <option value={Notes.D}>D</option>
          <option value={Notes.D_SHARP}>D#</option>
          <option value={Notes.E}>E</option>
          <option value={Notes.F}>F</option>
          <option value={Notes.F_SHARP}>F#</option>
          <option value={Notes.G}>G</option>
          <option value={Notes.G_SHARP}>G#</option>
          <option value={Notes.A}>A</option>
          <option value={Notes.A_SHARP}>A#</option>
          <option value={Notes.B}>B</option>
        </select>
      </div>
    );
  }
}
