import React, { Component } from 'react';
import './Chess.css';
import pieceMovements from './ChessMoves.js'

class Chess extends Component {
  render() {
    return (
      <div className='chess'>
        <Board/>
      </div>
    );
  }
}

class Board extends Component {
  constructor() {
    super();
    this.state = {
      layout: this.getInitialBoardLayout(),
      whitesTurn: true,
      chosen: Array.from({length: 8}, () => Array.from({length: 8}, () => false) ),
      possible: Array.from({length: 8}, () => Array.from({length: 8}, () => false) )
    }
  }

  getInitialBoardLayout() {
    return [
             [ 'rR', 'rN', 'rB', 'rQ', 'rK', 'rB', 'rN', 'rR' ],
             [ 'rP', 'rP', 'rP', 'rP', 'rP', 'rP', 'rP', 'rP' ],
             [  '' ,  '' ,  '' ,  '' ,  '' ,  '' ,  '' ,  ''  ],
             [  '' ,  '' ,  '' ,  '' ,  '' ,  '' ,  '' ,  ''  ],
             [  '' ,  '' ,  '' ,  '' ,  '' ,  '' ,  '' ,  ''  ],
             [  '' ,  '' ,  '' ,  '' ,  '' ,  '' ,  '' ,  ''  ],
             [ 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP' ],
             [ 'wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR' ]
           ];
  }

  handleClick( x, y ) {
    
    const chosen = Array.from({length: 8}, () => Array.from({length: 8}, () => false));
    const possible = Array.from({length: 8}, () => Array.from({length: 8}, () => false));
    const movements = pieceMovements( x, y, this.state.layout ) || [];

    if( ( this.state.whitesTurn && this.state.layout[y][x][0] === 'w' ) ||
        ( !this.state.whitesTurn && this.state.layout[y][x][0] === 'r' ) ) {
      chosen[y][x] = true;
      for( let i = 0; i < movements.length; i++ ) {
        possible[ movements[i][1] ][ movements[i][0] ] = true;
      }
    }

    this.setState({
      chosen: chosen,
      possible: possible
    });
  }

  makeSquare( x, y ) {

    function getClasses() {
      var classes = 'square color' + (x+y)%2;
      return classes;
    }
    
    return (
      <Square
        key = {x + '_' + y}
        posX = { x }
        posY = { y }
        classes = {getClasses()}
        piece = {this.state.layout[y][x]}
        chosen = {this.state.chosen[y][x]}
        possible = {this.state.possible[y][x]}
        onClick={() => this.handleClick( x, y )}
      />
    );
  }

  render() {
    var board = [];
    var cols = [];
    for( let y = 0; y < 8; y++ ) {
      cols = [];
      for( let x = 0; x < 8; x++ ) {
        cols.push( this.makeSquare( x, y ) );
      }
      board.push( <div key={y} className='boardRow'> {cols} </div> )
    }
    return ( <div className='board'> {board} </div> );
  }
}

class Square extends Component {

  handleSquareClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div className={this.props.classes}>
        <Piece chosen={this.props.chosen}
               possible={this.props.possible}
               piece={this.props.piece}
               onClick={() => this.handleSquareClick()}
        />
      </div>
    );
  }
}

class Piece extends Component {
  handlePieceClick( active ) {
    if( active === ' active' ) {
      this.props.onClick();
    }
  }
  render() {
    const chosen = this.props.chosen ? ' chosen' : '';
    const possible = this.props.possible ? ' possible' : '';
    const active = this.props.piece !== '' ? ' active' : '';
    const side = this.props.piece !== '' ? ' ' + this.props.piece[0] : '';
    const type = this.props.piece !== '' ? ' ' + this.props.piece[1] : '';
    return (
      <div className={ 'piece' + side + type + chosen + possible + active }
           onClick={() => this.handlePieceClick( active ) }
      >
        {type}
      </div>
    );
  }
}

export default Chess;
