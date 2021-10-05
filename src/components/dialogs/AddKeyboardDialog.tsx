import { observer } from 'mobx-react';
import React from 'react';
import { Notes } from '../../model/KeyboardItem';
import { AddKeyboardDialogState } from '../../state/AddKeyboardDialogState';

import './add-keyboard-dialog.scss';

interface Props {
  dialogState: AddKeyboardDialogState;
  onAddKeyboard: () => void;
}

@observer
export class AddKeyboardDialog extends React.Component<Props> {
  public render() {
    const { dialogState, onAddKeyboard } = this.props;

    const openClass = dialogState.open ? 'open' : 'closed';

    return (
      <div className={'add-keyboard-dialog ' + openClass}>
        {this.renderFirstNoteSelect()}

        <div className={'controls'}>
          <button>Close</button>
          <button onClick={() => onAddKeyboard()}>Add Keyboard</button>
        </div>
      </div>
    );
  }

  private renderFirstNoteSelect() {
    const { dialogState } = this.props;

    return (
      <div className={'first-note-select'}>
        <span className={'label'}>Start key</span>
        <select
          value={dialogState.startNote}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            dialogState.setStartNote(e.target.value)
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
