export default function pieceMovements( pieceX, pieceY, layout ) {
    //First find out the side and piece type
    var pieceId = layout[ pieceY ][ pieceX ];
    if( pieceId === '' ) return;
    
    var side = pieceId[0].toLowerCase();
    var type = pieceId[1].toLowerCase();
    var hasntMoved = pieceId.length === 3 && pieceId[2] === '_';

    switch( type ) {
        case 'p':
            return movePawn();
        case 'r':
            return moveRook();
        case 'n':
            return moveKnight();
        case 'b':
            return moveBishop();
        case 'q':
            return moveQueen();
        case 'k':
            return moveKing();
        default:
            console.warn( 'Unknown piece type ' + type );
    }



    function movePawn() {
        var movements = [];
        
        var m;

        //Move forward one if possible
        m = getForward();
        if( m ) movements.push( m );

        //Move forward two if first move and if possible
        m = getDoubleForward();
        if( m ) movements.push( m );

        //Move left diagonal if can attack
        m = leftDiagonalHasEnemy();
        if( m ) movements.push( m );

        //Move right diagonal if can attack
        m = rightDiagonalHasEnemy();
        if( m ) movements.push( m );

        return movements;
        //===============================

        function leftDiagonalHasEnemy() {
            if( side === 'w' &&
                onB( pieceX - 1, pieceY - 1 ) &&
                layout[ pieceY - 1 ][ pieceX - 1 ][0] === 'r' ) {
                return [ pieceX - 1, pieceY - 1 ];
            }
            else if( side === 'r' &&
                onB( pieceX - 1, pieceY + 1 ) &&
                layout[ pieceY + 1 ][ pieceX - 1 ][0] === 'w' ) {
                return [ pieceX - 1, pieceY + 1 ];
            }
            return false;
        }
        function rightDiagonalHasEnemy() {
            if( side === 'w' &&
                onB( pieceX + 1, pieceY - 1 ) &&
                layout[ pieceY - 1 ][ pieceX + 1 ][0] === 'r' ) {
                return [ pieceX + 1, pieceY - 1 ];
            }
            else if( side === 'r' &&
                onB( pieceX + 1, pieceY + 1 ) &&
                layout[ pieceY + 1 ][ pieceX + 1 ][0] === 'w' ) {
                return [ pieceX + 1, pieceY + 1 ];
            }
            return false;
        }
        function getForward() {
            if( side === 'w' ) {
                if( isV( pieceX, pieceY - 1 ) ) {
                    return [ pieceX, pieceY - 1 ];
                }
            }
            else if( side === 'r' ) {
                if( isV( pieceX, pieceY + 1 ) ) {
                    return [ pieceX, pieceY + 1 ];
                }
            }
            return false;
        }
        function getDoubleForward() {
            if( !hasntMoved ) return false;
            if( side === 'w' ) {
                if( isV( pieceX, pieceY - 1 ) && isV( pieceX, pieceY - 2 )  ) {
                    return [ pieceX, pieceY - 2 ];
                }
            }
            else if( side === 'r' ) {
                if( isV( pieceX, pieceY + 1 ) && isV( pieceX, pieceY + 2 ) ) {
                    return [ pieceX, pieceY + 2 ];
                }
            }
        }
    }


    function moveRook() {
        var movements = [];
        
        var m;

        m = getUp();
        if( m ) movements = movements.concat( m );

        m = getLeft();
        if( m ) movements = movements.concat( m );

        m = getDown();
        if( m ) movements = movements.concat( m );

        m = getRight();
        if( m ) movements = movements.concat( m );

        return movements;
        //================
        //check up left down right
        function getUp() {
            var submovements = [];
            var curY = pieceY - 1;
            while( isV( pieceX, curY ) ) {
                submovements.push( [ pieceX, curY ] );
                curY--;
            }
            if( isE( pieceX, curY ) )
                submovements.push( [ pieceX, curY ] );
            return submovements;
        }
        function getLeft() {
            var submovements = [];
            var curX = pieceX - 1;
            while( isV( curX, pieceY ) ) {
                submovements.push( [ curX, pieceY ] );
                curX--;
            }
            if( isE( curX, pieceY ) )
                submovements.push( [ curX, pieceY ] );
            return submovements;
        }
        function getDown() {
            var submovements = [];
            var curY = pieceY + 1;
            while( isV( pieceX, curY ) ) {
                submovements.push( [ pieceX, curY ] );
                curY++;
            }
            if( isE( pieceX, curY ) )
                submovements.push( [ pieceX, curY ] );
            return submovements;
        }
        function getRight() {
            var submovements = [];
            var curX = pieceX + 1;
            while( isV( curX, pieceY ) ) {
                submovements.push( [ curX, pieceY ] );
                curX++;
            }
            if( isE( curX, pieceY ) )
                submovements.push( [ curX, pieceY ] );
            return submovements;
        }
    }


    function moveKnight() {
        var movements = [];
        
        var m;

        m = getUpLeft();
        if( m ) movements.push( m );

        m = getUpRight();
        if( m ) movements.push( m );

        m = getLeftUp();
        if( m ) movements.push( m );

        m = getLeftDown();
        if( m ) movements.push( m );

        m = getDownLeft();
        if( m ) movements.push( m );

        m = getDownRight();
        if( m ) movements.push( m );

        m = getRightUp();
        if( m ) movements.push( m );

        m = getRightDown();
        if( m ) movements.push( m );

        return movements;
        //==============
        
        //eight possible movements
        function getUpLeft() {
            if( isVE( pieceX - 1, pieceY - 2 ) ) return [ pieceX - 1, pieceY - 2 ];
        }
        function getUpRight() {
            if( isVE( pieceX + 1, pieceY - 2 ) ) return [ pieceX + 1, pieceY - 2 ];
        }
        function getLeftUp() {
            if( isVE( pieceX - 2, pieceY - 1 ) ) return [ pieceX - 2, pieceY - 1 ];
        }
        function getLeftDown() {
            if( isVE( pieceX - 2, pieceY + 1 ) ) return [ pieceX - 2, pieceY + 1 ];
        }
        function getDownLeft() {
            if( isVE( pieceX - 1, pieceY + 2 ) ) return [ pieceX - 1, pieceY + 2 ];
        }
        function getDownRight() {
            if( isVE( pieceX + 1, pieceY + 2 ) ) return [ pieceX + 1, pieceY + 2 ];
        }
        function getRightUp() {
            if( isVE( pieceX + 2, pieceY - 1 ) ) return [ pieceX + 2, pieceY - 1 ];
        }
        function getRightDown() {
            if( isVE( pieceX + 2, pieceY + 1 ) ) return [ pieceX + 2, pieceY + 1 ];
        }
    }


    function moveBishop() {
        var movements = [];
        
        var m;

        m = getUpLeft();
        if( m ) movements = movements.concat( m );

        m = getUpRight();
        if( m ) movements = movements.concat( m );

        m = getDownLeft();
        if( m ) movements = movements.concat( m );

        m = getDownRight();
        if( m ) movements = movements.concat( m );

        return movements;
        //================
        //check four diagonals
        function getUpLeft() {
            var submovements = [];
            var curX = pieceX - 1;
            var curY = pieceY - 1;
            while( isV( curX, curY ) ) {
                submovements.push( [ curX, curY ] );
                curX--;
                curY--;
            }
            if( isE( curX, curY ) )
                submovements.push( [ curX, curY ] );
            return submovements;
        }
        function getUpRight() {
            var submovements = [];
            var curX = pieceX + 1;
            var curY = pieceY - 1;
            while( isV( curX, curY ) ) {
                submovements.push( [ curX, curY ] );
                curX++;
                curY--;
            }
            if( isE( curX, curY ) )
                submovements.push( [ curX, curY ] );
            return submovements;
        }
        function getDownLeft() {
            var submovements = [];
            var curX = pieceX - 1;
            var curY = pieceY + 1;
            while( isV( curX, curY ) ) {
                submovements.push( [ curX, curY ] );
                curX--;
                curY++;
            }
            if( isE( curX, curY ) )
                submovements.push( [ curX, curY ] );
            return submovements;
        }
        function getDownRight() {
            var submovements = [];
            var curX = pieceX + 1;
            var curY = pieceY + 1;
            while( isV( curX, curY ) ) {
                submovements.push( [ curX, curY ] );
                curX++;
                curY++;
            }
            if( isE( curX, curY ) )
                submovements.push( [ curX, curY ] );
            return submovements;
        }
    }


    function moveQueen() {
        return moveRook().concat( moveBishop() ); 
    }


    function moveKing() {
        var movements = [];

        var m;

        m = getUpLeft();
        if( m ) movements.push( m );

        m = getUp();
        if( m ) movements.push( m );

        m = getUpRight();
        if( m ) movements.push( m );

        m = getRight();
        if( m ) movements.push( m );

        m = getDownRight();
        if( m ) movements.push( m );

        m = getDown();
        if( m ) movements.push( m );

        m = getDownLeft();
        if( m ) movements.push( m );

        m = getLeft();
        if( m ) movements.push( m );

        m = getCastleLeft();
        if( m ) movements.push( m );

        m = getCastleRight();
        if( m ) movements.push( m );

        return movements;
        //==================

        function getUpLeft() {
            if( isVE( pieceX - 1, pieceY - 1 ) ) return [ pieceX - 1, pieceY - 1 ];
        }
        function getUp() {
            if( isVE( pieceX, pieceY - 1 ) ) return [ pieceX, pieceY - 1 ];
        }
        function getUpRight() {
            if( isVE( pieceX + 1, pieceY - 1 ) ) return [ pieceX + 1, pieceY - 1 ];
        }
        function getRight() {
            if( isVE( pieceX + 1, pieceY ) ) return [ pieceX + 1, pieceY ];
        }
        function getDownRight() {
            if( isVE( pieceX + 1, pieceY + 1 ) ) return [ pieceX + 1, pieceY + 1 ];
        }
        function getDown() {
            if( isVE( pieceX, pieceY + 1 ) ) return [ pieceX, pieceY + 1 ];
        }
        function getDownLeft() {
            if( isVE( pieceX - 1, pieceY + 1 ) ) return [ pieceX - 1, pieceY + 1 ];
        }
        function getLeft() {
            if( isVE( pieceX - 1, pieceY ) ) return [ pieceX - 1, pieceY ];
        }

        //Castling
        function getCastleLeft() {
            if( hasntMoved && layout[pieceY][0] === side + 'R_' ) {
                if( isE( 1, pieceY ) && isE( 2, pieceY ) && isE( 3, pieceY ) )
                    return [ 2, pieceY ];    
            }
        }
        function getCastleRight() {
            if( hasntMoved && layout[pieceY][7] === side + 'R_' ) {
                if( isE( 5, pieceY ) && isE( 6, pieceY ) )
                    return [ 6, pieceY ];    
            }
        }
    }



    //if location is onBoard
    function onB( x, y ) {
        return ( x < 8 && x >= 0 && y < 8 && y >= 0 );
    }
    //if location is vacant
    function isV( x, y ) {
        return onB( x, y ) && layout[y][x] === '';
    }
    //if location is enemy
    function isE( x, y ) {
        return onB( x, y ) && layout[y][x][0] !== side;
    }
    //if location is vacant or enemy
    function isVE( x, y ) {
        return isV( x, y ) || isE( x, y );
    }

}