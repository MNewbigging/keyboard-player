import { observer } from 'mobx-react';
import React from 'react';

import { AppState } from '../state/AppState';
import { Header } from './Header';
import { Keyboard } from '../components/Keyboard';

import './app.scss';

@observer
export class App extends React.PureComponent {
  private readonly appState = new AppState();
  public render() {
    return (
      <>
        <Header appState={this.appState} />
        {this.appState.keyboards.map((kb) => (
          <Keyboard keyboard={kb} />
        ))}
      </>
    );
  }
}
