import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem } from '../model/KeyboardItem';

import './keyboard.scss';

interface Props {
  keyboard: KeyboardItem;
}

@observer
export class Keyboard extends React.Component<Props> {
  public render() {
    return (
      <div className={'keyboard'}>
        <div className={'top-row'}></div>
        <div className={'left-side'}></div>
        <div className={'keys-area'}>{this.renderKeys()}</div>
        <div className={'right-side'}></div>
      </div>
    );
  }

  private renderKeys() {
    const { keyboard } = this.props;

    const octaves: JSX.Element[] = [];

    for (let i = 0; i < keyboard.octaves; i++) {
      octaves.push(this.renderOctave());
    }

    return octaves;
  }

  private renderOctave() {
    return (
      <>
        {this.renderWhiteBlackKeyPair()}
        {this.renderWhiteBlackKeyPair()}
        {this.renderWhiteKey()}
        {this.renderWhiteBlackKeyPair()}
        {this.renderWhiteBlackKeyPair()}
        {this.renderWhiteBlackKeyPair()}
        {this.renderWhiteKey()}
      </>
    );
  }

  private renderWhiteKey() {
    return <div className={'white-key'}></div>;
  }
  private renderWhiteBlackKeyPair() {
    return (
      <div className={'key-pair'}>
        <div className={'white-key'}></div>
        <div className={'black-key'}></div>
      </div>
    );
  }
}
