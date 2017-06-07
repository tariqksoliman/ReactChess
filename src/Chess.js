import React, { Component } from 'react';
import './Chess.css';
import ChessMoves from './ChessMoves.js'

class Chess extends Component {
  constructor() {
    super();
    this.ChessMoves = new ChessMoves();
    this.state = {
      layout: this.getInitialBoardLayout(),
      whitesTurn: true,
      chosen: [ null, null ],
      possible: Array.from({length: 8}, () => Array.from({length: 8}, () => false) ),
      messageTurn: "White's Turn",
      messageState: '',
      capturedPieces: [],
      algebraicNotation: []
    }
  }

  getInitialBoardLayout() {
    // {side}{piece}{_ if hasn't moved yet}
    return [
             [ 'rR_', 'rN_', 'rB_', 'rQ_', 'rK_', 'rB_', 'rN_', 'rR_' ],
             [ 'rP_', 'rP_', 'rP_', 'rP_', 'rP_', 'rP_', 'rP_', 'rP_' ],
             [   '' ,   '' ,   '' ,   '' ,   '' ,   '' ,   '' ,   ''  ],
             [   '' ,   '' ,   '' ,   '' ,   '' ,   '' ,   '' ,   ''  ],
             [   '' ,   '' ,   '' ,   '' ,   '' ,   '' ,   '' ,   ''  ],
             [   '' ,   '' ,   '' ,   '' ,   '' ,   '' ,   '' ,   ''  ],
             [ 'wP_', 'wP_', 'wP_', 'wP_', 'wP_', 'wP_', 'wP_', 'wP_' ],
             [ 'wR_', 'wN_', 'wB_', 'wQ_', 'wK_', 'wB_', 'wN_', 'wR_' ]
           ];
  }

  setMessageTurn( whitesTurn ) {
    this.setState({ 
      messageTurn: ( whitesTurn ) ? "White's Turn" : "Red's Turn"
    });
    //change background color
    document.body.className = ( whitesTurn ) ? 'whitesTurn' : 'redsTurn';
  }
  setMessageState( message ) {
    this.setState({ messageState: message });
  }
  addAlgebraicNotation(){}
  addCapturedPiece(){}
  promotePawn(){}

  handleClick( x, y ) {

    let layout = JSON.parse( JSON.stringify( this.state.layout ) );
    let whitesTurn = this.state.whitesTurn;
    let chosen = [ null, null ];
    const possible = Array.from({length: 8}, () => Array.from({length: 8}, () => false));
    const movements = this.ChessMoves.pieceMovements( x, y, this.state.layout ) || [];

    //if you click your piece
    if( ( whitesTurn && this.state.layout[y][x][0] === 'w' ) ||
        ( !whitesTurn && this.state.layout[y][x][0] === 'r' ) ) {
      chosen = [ x, y ];
      for( let i = 0; i < movements.length; i++ ) {
        possible[ movements[i][1] ][ movements[i][0] ] = true;
      }
      this.setState({
          chosen: chosen,
          possible: possible
      });
    }
    //or if you click a place to move
    else if( this.state.possible[y][x] ) {
      //was it a castle
      if( layout[ this.state.chosen[1] ][ this.state.chosen[0] ].substring( 1, 3 ) === 'K_' ) {
        if( x === 2 ) {
          layout[y][3] = this.state.layout[y][0].substring( 0, 2 );
          layout[y][0] = '';
        }
        else if( x === 6 ) {
          layout[y][5] = this.state.layout[y][7].substring( 0, 2 );
          layout[y][7] = '';
        }
      }

      //substr02 to remove hasnt moved underscore indicator
      layout[y][x] = this.state.layout[ this.state.chosen[1] ][ this.state.chosen[0] ].substring( 0, 2 );
      layout[ this.state.chosen[1] ][ this.state.chosen[0] ] = '';

      let checks = this.ChessMoves.checkForChecks( layout );

      let whosChecked = null;
      if( checks.whiteChecked && whitesTurn )
        whosChecked = 'White will be in Check';
      else if( checks.redChecked && !whitesTurn )
        whosChecked = 'Red will be in Check';
      this.setMessageState( whosChecked );

      //No checking yourself or leaving yourself checked
      if( ( whitesTurn && !checks.whiteChecked ) ||
          ( !whitesTurn && !checks.redChecked ) ) {
        //switch the turn
        whitesTurn = !whitesTurn;
        this.setMessageTurn( whitesTurn );
        //Update
        this.setState({
          layout: layout,
          whitesTurn: whitesTurn,
          chosen: chosen,
          possible: possible
        });
      }
        if( whosChecked === null ) {
        checks = this.ChessMoves.checkForChecks( layout );
        if( checks.whiteChecked && whitesTurn )
          whosChecked = 'White in Check';
        else if( checks.redChecked && !whitesTurn )
          whosChecked = 'Red in Check';
        this.setMessageState( whosChecked );
      }
    }
  }

  render() {
    return (
      <div className='chess'>
        <div id='chess-message-turn'>{this.state.messageTurn}</div>
        <Board
          layout = {this.state.layout}
          chosen = {this.state.chosen}
          possible = {this.state.possible}
          onClick = {( x, y ) => this.handleClick( x, y )}
        />
        <div id='chess-message-state'>{this.state.messageState}</div>
      </div>
    );
  }
}

class Board extends Component {

  handleBoardClick( x, y ) {
    this.props.onClick( x, y );
  }

  makeSquare( x, y ) {

    function getClasses() {
      var classes = 'square color' + (x+y)%2;
      return classes;
    }

    const chosen = ( x === this.props.chosen[0] &&
                     y === this.props.chosen[1] ) ? true : false;
    
    return (
      <Square
        key = {x + '_' + y}
        posX = { x }
        posY = { y }
        classes = {getClasses()}
        piece = {this.props.layout[y][x]}
        chosen = {chosen}
        possible = {this.props.possible[y][x]}
        onClick={() => this.handleBoardClick( x, y )}
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
  handlePieceClick() {
      this.props.onClick();
  }

  mapTypeToPieceCode( type, side ) {
    if( type === 'P' ) return 'o';
    if( type === 'R' ) return 't';
    if( type === 'N' ) return 'j';
    if( type === 'B' ) return 'n';
    if( type === 'Q' ) return 'w';
    if( type === 'K' ) return 'l';
    return '';
  }

  render() {
    const chosen = this.props.chosen ? ' chosen' : '';
    const possible = this.props.possible ? ' possible' : '';
    const active = this.props.piece !== '' ? ' active' : '';
    const side = this.props.piece !== '' ? ' ' + this.props.piece[0] : '';
    const type = this.props.piece !== '' ? ' ' + this.props.piece[1] : '';
    return (
      <div className={ 'piece' + side + type + chosen + possible + active }
           onClick={() => this.handlePieceClick( ) }
      >
        {this.mapTypeToPieceCode( type[1], side[1] )}
      </div>
    );
  }
}

export default Chess;
