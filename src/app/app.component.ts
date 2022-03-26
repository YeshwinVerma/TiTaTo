import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentMovePlayerName: string = 'player';
  currentPlayerWrapper: string = 'player';
  board: Array<string> = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
  winner: string = '';

  scores: any = {
    player: -1,
    ai: +1,
    tie: 0,
  };

  changeCurrentPlayer(name: any) {
    console.log(name);
    this.currentMovePlayerName = name;
  }

  onFirstMoveSlected() {
    this.currentMovePlayerName = this.currentPlayerWrapper;
    console.log(this.currentMovePlayerName);
    if (this.currentMovePlayerName == 'ai') {
      setTimeout(() => {
        this.aiMove();
      }, 100);
    }
  }

  aiMove(): void {
    let reformedBoard: Array<Array<string>> = this.reformBoard();
    if (this.checkwinner(reformedBoard) == 'player') {
      this.winner = 'The Player is the Winner!';
      return;
    }
    if (this.checkwinner(reformedBoard) == 'ai') {
      this.winner = 'The AI is the Winner!';
      return;
    }
    if (this.checkwinner(reformedBoard) == 'tie') {
      this.winner = 'No One is the Winner :(';
      return;
    }

    if (this.checkwinner(reformedBoard) != 'n') return;

    let bestScore = -Infinity;
    let bestMove: { i: number; j: number } = {
      i: 0,
      j: 0,
    };

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (reformedBoard[i][j] == '-') {
          reformedBoard[i][j] = 'O';
          let score = this.minmax(reformedBoard, 0, false);
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i, j };
          }
          reformedBoard[i][j] = '-';
        }
      }
    }

    this.board[bestMove.i * 3 + bestMove.j] = 'O';
    if (this.checkwinner(this.reformBoard()) == 'player') {
      this.winner = 'The Player is the Winner!';
      return;
    }
    if (this.checkwinner(this.reformBoard()) == 'ai') {
      this.winner = 'The AI is the Winner!';
      return;
    }
    if (this.checkwinner(this.reformBoard()) == 'tie') {
      this.winner = 'No One is the Winner :(';
      return;
    }
    this.currentMovePlayerName = 'player';
  }

  emptyBoard() {
    this.winner = '';
    this.board = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
    this.onFirstMoveSlected();
  }

  reformBoard(): Array<Array<string>> {
    let value = [
      [this.board[0], this.board[1], this.board[2]],
      [this.board[3], this.board[4], this.board[5]],
      [this.board[6], this.board[7], this.board[8]],
    ];
    return value;
  }

  checkwinner(board: Array<Array<string>>): string {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] == board[i][1] &&
        board[i][1] == board[i][2] &&
        board[i][0] == board[i][2]
      ) {
        if (board[i][0] == '-') continue;
        //this.currentMovePlayerName = "none";
        return board[i][0] == 'X' ? 'player' : 'ai';
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] == board[1][i] &&
        board[1][i] == board[2][i] &&
        board[0][i] == board[2][i]
      ) {
        if (board[0][i] == '-') continue;
        //this.currentMovePlayerName = "none";
        return board[0][i] == 'X' ? 'player' : 'ai';
      }
    }
    let availableSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '-') {
          availableSpots++;
        }
      }
    }
    if (
      board[0][0] == board[1][1] &&
      board[1][1] == board[2][2] &&
      board[0][0] == board[2][2]
    ) {
      if (board[0][0] != '-') {
        // this.currentMovePlayerName = "none";
        return board[0][0] == 'X' ? 'player' : 'ai';
      }
    }
    if (
      board[0][2] == board[1][1] &&
      board[1][1] == board[2][0] &&
      board[0][2] == board[2][0]
    ) {
      if (board[0][2] != '-') {
        //this.currentMovePlayerName = "none";
        return board[0][2] == 'X' ? 'player' : 'ai';
      }
    }
    if (availableSpots == 0) {
      //this.currentMovePlayerName = "none";
      return 'tie';
    }

    return 'n';
  }

  minmax(
    board: Array<Array<string>>,
    depth: number,
    isMaximizing: boolean
  ): number {
    let result = this.checkwinner(board);
    if (result != 'n') {
      return this.scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == '-') {
            board[i][j] = 'O';
            let score = this.minmax(board, depth + 1, false);
            board[i][j] = '-';
            if (score > bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == '-') {
            board[i][j] = 'X';
            let score = this.minmax(board, depth + 1, true);
            board[i][j] = '-';
            if (score < bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    }
  }

  isBoardEmpty(): boolean {
    let result = false;
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == '-') {
        result = true;
      } else {
        result = false;
        break;
      }
    }
    return result;
  }
}
