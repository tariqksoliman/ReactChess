export default function pieceMovements( pieceX, pieceY, layout ) {
    //First find out the side and piece type
    var pieceId = layout[ pieceY ][ pieceX ];
    if( pieceId === '' ) return;
    
    var side = pieceId[0].toLowerCase();
    var type = pieceId[1].toLowerCase();

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

        function isInStartingPosition() {
            return ( side === 'w' && pieceY === 6 ) || ( side === 'r' && pieceY === 1 );
        }
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
                return [ pieceX + 1, pieceY - 1 ];
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
            if( !isInStartingPosition() ) return false;
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

    }

    function moveKnight() {

    }

    function moveBishop() {

    }

    function moveQueen() {

    }

    function moveKing() {

    }

    //if location is onBoard
    function onB( x, y ) {
        return ( x < 8 && x >= 0 && y < 8 && y >= 0 );
    }
    //if location is vacant
    function isV( x, y ) {
        return onB( x, y ) && layout[y][x] === '';
    }

}