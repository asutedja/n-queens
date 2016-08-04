/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined;
  var arr = new Board({n: n});

  //arr.togglePiece(0, 0);
  arr.togglePiece(0, 0);
  var rooksPlaced = 1;
   //fixme
  //make if statements for edge cases for n = 1
  if (n === 1) {
    return [[1]];
  }
  // Create two databases
  var badCol = [0];
  var badRow = [0];
  //console.log(n);


  while ( rooksPlaced < n) {
    for (var i = 0; i < n; i++) {
      //console.log('hi');
      for (var j = 0; j < n; j++) {
        if (badCol.indexOf(j) === -1 && badRow.indexOf(i) === -1) {
          //console.log('NOOO', arr.rows(), i, j, badCol, badRow);
          arr.togglePiece(i, j);
          badCol.push(j);
          badRow.push(i);
          rooksPlaced++;
        }
      }
    }
  }

  
  solution = arr.rows();
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = {}; //fixme
  //Like rock,paper, scissors
  var arr = new Board({n: n});
  var rooksPlaced = 0;
  var badCol = [];
  var badRow = [];

  //arr.togglePiece(0, 0);
  var placeRook = function(board, badRow, badCol, rooksPlaced) {
   //debugger;
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        console.log(i, j);
        if ( rooksPlaced === 0 || noConflict(i, j, badRow, badCol)) {
          board.togglePiece(i, j);
          badCol.push(j);
          badRow.push(i);
          rooksPlaced++;
          placeRook(board, badRow, badCol, rooksPlaced);
          if (rooksPlaced === n) {
            solution[JSON.stringify(board)] = true;
            badRow.pop();
            badCol.pop();
            rooksPlaced--;
            return;
          }
        }
      }
    }
    badRow.pop();
    badCol.pop();
    rooksPlaced--;
    return;
  };

  var noConflict = function (row, column, badRow, badCol) {
    if (badCol.includes(column) || badRow.includes(row)) {
      return false;
    }
    return true;
  };

  // for (var i = 0; i < n; i++) {
  //   for ( var j = 0; j < n; j++) {
  //     arr.togglePiece(i, j);
  //     // Create two databases
  //     badRow[i] = true;
  //     badCol[j] = true;
  //     placeRook(arr);    
  //   }
  // }
  // //console.log(n);
  placeRook(arr, badRow, badCol, rooksPlaced);
  var solutionCount = Object.keys(solution).length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var arr = new Board({n: n});
  var solution = arr.rows(); //fixme
  // three bad databases
  //func(solution) 

    //iterate through board

      // if queen can be placed in space

        //place queen
        //if queens placed > n
          //return newBoard;
        //return func(newBoard)


  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
