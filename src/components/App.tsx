import { observer } from 'mobx-react';
import React from 'react';

import { AppState } from '../state/AppState';
import { Header } from './Header';
import { KeyboardRow } from './KeyboardRow';

import './app.scss';

@observer
export class App extends React.PureComponent {
  private readonly appState = new AppState();
  public render() {
    console.log('apprender');
    return (
      <>
        <Header appState={this.appState} />
        <div className={'top-row'}>
          <KeyboardRow
            keyboardRow={this.appState.topRowKeyboards}
            addKeyboard={() => this.appState.addTopRowKeyboard()}
          />
        </div>
        <div className={'bot-row'}>
          <KeyboardRow
            keyboardRow={this.appState.botRowKeyboards}
            addKeyboard={() => this.appState.addBotRowKeyboard()}
          />
        </div>
      </>
    );
  }
}
