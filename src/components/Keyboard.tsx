import { observer } from 'mobx-react';
import React from 'react';

import { KeyboardItem, Notes } from '../model/KeyboardItem';

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

    const keys: JSX.Element[] = [];

    // 12 notes to an octave
    const totalNotes = keyboard.octaves * 12;
    const notes = Object.values(Notes);
    console.log('notes: ', notes);

    let currentNote: number = notes.indexOf(keyboard.firstNote);
    for (let i = 0; i < totalNotes; i++) {
      const note = notes[currentNote];
      const key = this.getKey(note);
      keys.push(key);

      currentNote++;
      if (currentNote === notes.length) {
        currentNote = 0;
      }
    }

    // Add final key
    const lastKey = this.renderWhiteKey();
    keys.push(lastKey);

    return keys;
  }

  private getKey(note: Notes) {
    switch (note) {
      case Notes.C:
      case Notes.D:
      case Notes.F:
      case Notes.G:
      case Notes.A:
        return this.renderWhiteBlackKeyPair();
      case Notes.E:
      case Notes.B:
        return this.renderWhiteKey();
    }
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
