var board = null;
var game = new Chess();
 
function onDragStart(source, piece, position, orientation) {
   // do not pick up pieces if the game is over
   if (game.game_over()) return false
 
   // only pick up pieces for White
   if (piece.search(/^b/) !== -1) return false
}
 
 
function makeRandomMove() {
 // chess.js gives us all the possible moves in an array
 // [ move1, move2, move3 ... ]
 var possibleMoves = game.moves();
 
 // exit if the game is over
 if (game.game_over()) return;
 
 // choses a random index in the list
 var randomIdx = Math.floor(Math.random() * possibleMoves.length);
 
 // updates javascript board state
 game.move(possibleMoves[randomIdx]);
 
 // changes html board state
 board.position(game.fen());
}
 
 
function onDrop (source, target) {
   // see if the move is legal
   var move = game.move({
       from: source,
       to: target,
       promotion: 'q' // NOTE: always promote to a queen for exact simplicity
   })
 
   // illegal move
   if (move === null) return 'snapback'
 
   // run the random moves AI after every drop
   window.setTimeout(makeRandomMove, 250)
}
 
 
// update the board position after the piece snap
// castling, en passant, pawn, promotion
function onSnapEnd() {
   board.position(game.fen())
}
 
 
var config = {
   draggable: true,
   position: 'start',
   onDragStart: onDragStart,
   onDrop: onDrop,
   onSnapEnd: onSnapEnd
}
 
board = Chessboard("myBoard", config)