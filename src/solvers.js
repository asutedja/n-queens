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
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solution = {}; //fixme
  //Like rock,paper, scissors
  var arr = new Board({n: n});

  var noConflict = function (row, column, badRow, badCol) {
    if (badCol.includes(column) || badRow.includes(row)) {
      return false;
    }
    return true;
  };

  var placeRook = function(board, badRow, badCol, rooksPlaced, row) {  
    for (var j = 0; j < n; j++ ) {
      if ( rooksPlaced === 0 || noConflict(row, j, badRow, badCol)) {
        board.togglePiece(row, j);          
        badRow.push(row);
        badCol.push(j);
        rooksPlaced++;
        row++;
        if (rooksPlaced === n) {
          solution[JSON.stringify(board)] = true;
          //console.log(solution);
          board.togglePiece(badRow.pop(), badCol.pop());
          rooksPlaced--;
          return;
        }
        placeRook(board, badRow, badCol, rooksPlaced, row);
        board.togglePiece(badRow.pop(), badCol.pop());
        rooksPlaced--;
        row--;
      }
    }
  };

  placeRook(arr, [], [], 0, 0);
  var solutionCount = Object.keys(solution).length;
  console.log(solution);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;




};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = {};
  var board = new Board({n: n});


  if (n === 1) {
    return [[1]];
  }
  if (n === 0) {
    return [];
  }

  if (n === 2) {
    return [[],
    []];
  }
  if (n === 3) {
    return [[], [], []];
  }

  var noConflict = function (row, column, badRow, badCol, badMajor, badMinor, major, minor) {
    if (badCol.includes(column) || badRow.includes(row) || badMajor.includes(major) || badMinor.includes(minor)) {
      return false;
    }
    return true;
  };

  var placeRook = function(board, badRow, badCol, badMajor, badMinor, rooksPlaced, row) {  
    for (var j = 0; j < n; j++ ) {
      major = j - row;
      minor = j + row;

      if ( rooksPlaced === 0 || noConflict(row, j, badRow, badCol, badMajor, badMinor, major, minor)) {

        board.togglePiece(row, j);          
        badRow.push(row);
        badCol.push(j);
        badMajor.push(major);
        badMinor.push(minor);
        rooksPlaced++;
        row++;
        if (rooksPlaced === n) {
          solution[0] = JSON.stringify(board.rows());
          //console.log(solution);
          board.togglePiece(badRow.pop(), badCol.pop());
          badMajor.pop();
          badMinor.pop();
          rooksPlaced--;
          return;
        }
        placeRook(board, badRow, badCol, badMajor, badMinor, rooksPlaced, row);
        board.togglePiece(badRow.pop(), badCol.pop());
        badMajor.pop();
        badMinor.pop();
        rooksPlaced--;
        row--;
      }
    }
  };

  placeRook(board, [], [], [], [], 0, 0);

  //solution = arr.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return JSON.parse(solution[0]);
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = {};
  var board = new Board({n: n});


  if (n <= 1) {
    console.log('Number of solutions for ' + n + ' queens:', 1);
    return 1;
  }

  if (n <= 3) {
    console.log('Number of solutions for ' + n + ' queens:', 0);
    return 0;
  }

  var noConflict = function (row, column, badRow, badCol, badMajor, badMinor, major, minor) {
    if (badCol.includes(column) || badRow.includes(row) || badMajor.includes(major) || badMinor.includes(minor)) {
      return false;
    }
    return true;
  };

  var placeRook = function(board, badRow, badCol, badMajor, badMinor, rooksPlaced, row) {  
    for (var j = 0; j < n; j++ ) {
      major = j - row;
      minor = j + row;

      if ( rooksPlaced === 0 || noConflict(row, j, badRow, badCol, badMajor, badMinor, major, minor)) {

        board.togglePiece(row, j);          
        badRow.push(row);
        badCol.push(j);
        badMajor.push(major);
        badMinor.push(minor);
        rooksPlaced++;
        row++;
        if (rooksPlaced === n) {
          solution[JSON.stringify(board)] = true;
          //console.log(solution);
          board.togglePiece(badRow.pop(), badCol.pop());
          badMajor.pop();
          badMinor.pop();
          rooksPlaced--;
          return;
        }
        placeRook(board, badRow, badCol, badMajor, badMinor, rooksPlaced, row);
        board.togglePiece(badRow.pop(), badCol.pop());
        badMajor.pop();
        badMinor.pop();
        rooksPlaced--;
        row--;
      }
    }
  };

  placeRook(board, [], [], [], [], 0, 0);
  var solutionCount = Object.keys(solution).length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
