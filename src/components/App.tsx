import { observer } from 'mobx-react';
import React from 'react';

import { AppState } from '../state/AppState';
import { Header } from './Header';
import { KeyboardRow } from './KeyboardRow';
import { AddKeyboardDialog } from './dialogs/AddKeyboardDialog';

import './app.scss';
import { KeyboardRowLocation } from '../state/AddKeyboardDialogState';

@observer
export class App extends React.PureComponent {
  private readonly appState = new AppState();
  public render() {
    return (
      <>
        <Header appState={this.appState} />

        <AddKeyboardDialog
          dialogState={this.appState.addKeyboardDialogState}
          onAddKeyboard={() => this.appState.addKeyboard()}
        />

        <div className={'top-row'}>
          <KeyboardRow
            keyboardRow={this.appState.topRowKeyboards}
            addKeyboard={() => this.appState.startAddTopRowKeyboard()}
            removeKeyboard={(id: string) =>
              this.appState.removeKeyboard(id, KeyboardRowLocation.TOP)
            }
          />
        </div>
        <div className={'bot-row'}>
          <KeyboardRow
            keyboardRow={this.appState.botRowKeyboards}
            addKeyboard={() => this.appState.startAddBotRowKeyboard()}
            removeKeyboard={(id: string) =>
              this.appState.removeKeyboard(id, KeyboardRowLocation.BOT)
            }
          />
        </div>
      </>
    );
  }
}
