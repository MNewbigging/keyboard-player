import React from 'react';

import { AppState } from '../state/AppState';

import './header.scss';

interface Props {
  appState: AppState;
}

export class Header extends React.Component<Props> {
  public render() {
    const { appState } = this.props;

    return <div className={'header'}>Keyboardist</div>;
  }
}
