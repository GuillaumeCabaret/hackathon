import { Router } from '@angular/router';
import { PlayersService } from './../players.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connect4',
  templateUrl: './connect4.component.html',
  styleUrls: ['./connect4.component.css']
})
export class Connect4Component implements OnInit {

  grid = [];

  scores = [25, 100];

  turn = 1;

  heroes;

  constructor(private http: HttpClient, private playersService: PlayersService, private router: Router) { }

  ngOnInit() {
    if (this.playersService.players.length === 0) {
      this.router.navigate(['']);
    }
    this.initGrid();
    this.http.get('https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json').subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  cellClicked(columnIndex) {

    if (this.isSomeoneWon()) {
      return;
    }

    let i = this.grid.length - 1;
    while (i >= 0) {
      if (this.grid[i][columnIndex] === 0) {
        this.grid[i][columnIndex] = this.turn;
        this.turn = this.turn === 1 ? 2 : 1;

        if (this.isWon(1)) {
          this.scores[1] -= 25;
          this.initGrid();
        } else if (this.isWon(2)) {
          this.scores[0] -= 25;
          this.initGrid();
        }

        if (this.scores[0] === 0 || this.scores[1] === 0) {
          const audio = new Audio();
          audio.src = '/assets/sounds/you_win.mp3';
          audio.load();
          audio.play();
        }

        return;
      }
      i--;
    }

  }

  initGrid() {
    this.grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
  }

  getPlayerImg(player) {
    return this.playersService.players[player - 1].images.md;
  }

  getScore(player) {
    return this.scores[player - 1];
  }

  isSomeoneWon() {
    return this.isWon(1) || this.isWon(2);
  }

  isWon(player) {
    return this.isVerticalWon(player) ||
      this.isHorizontalWon(player) ||
      this.isDiagonalLeftRightWon(player) ||
      this.isDiagonalRightLeftWon(player);
  }

  isVerticalWon(player) {
    let i = 0;
    while (i < this.grid[0].length) {
      if (this.grid[0][i] === player &&
        this.grid[1][i] === player &&
        this.grid[2][i] === player &&
        this.grid[3][i] === player) {
        return true;
      } else if (this.grid[1][i] === player &&
        this.grid[2][i] === player &&
        this.grid[3][i] === player &&
        this.grid[4][i] === player) {
        return true;
      } else if (this.grid[2][i] === player &&
        this.grid[3][i] === player &&
        this.grid[4][i] === player &&
        this.grid[5][i] === player) {
        return true;
      }
      i++;
    }
    return false;
  }

  isHorizontalWon(player) {
    let i = 0;
    while (i < this.grid.length) {
      if (this.grid[i][0] === player &&
        this.grid[i][1] === player &&
        this.grid[i][2] === player &&
        this.grid[i][3] === player) {
        return true;
      } else if (this.grid[i][1] === player &&
        this.grid[i][2] === player &&
        this.grid[i][3] === player &&
        this.grid[i][4] === player) {
        return true;
      } else if (this.grid[i][2] === player &&
        this.grid[i][3] === player &&
        this.grid[i][4] === player &&
        this.grid[i][5] === player) {
        return true;
      } else if (this.grid[i][3] === player &&
        this.grid[i][4] === player &&
        this.grid[i][5] === player &&
        this.grid[i][6] === player) {
        return true;
      }
      i++;
    }
    return false;
  }

  isDiagonalLeftRightFromStartWon(player, line, col) {
    if (this.grid[line][col] === player &&
      this.grid[line + 1][col + 1] === player &&
      this.grid[line + 2][col + 2] === player &&
      this.grid[line + 3][col + 3] === player) {
      return true;
    } else {
      return false;
    }
  }

  isDiagonalRightLeftFromStartWon(player, line, col) {
    if (this.grid[line][col] === player &&
      this.grid[line + 1][col - 1] === player &&
      this.grid[line + 2][col - 2] === player &&
      this.grid[line + 3][col - 3] === player) {
      return true;
    } else {
      return false;
    }
  }

  isDiagonalLeftRightWon(player) {
    if (this.isDiagonalLeftRightFromStartWon(player, 2, 0) ||
      this.isDiagonalLeftRightFromStartWon(player, 1, 0) ||
      this.isDiagonalLeftRightFromStartWon(player, 2, 1) ||
      this.isDiagonalLeftRightFromStartWon(player, 0, 0) ||
      this.isDiagonalLeftRightFromStartWon(player, 1, 1) ||
      this.isDiagonalLeftRightFromStartWon(player, 2, 2) ||
      this.isDiagonalLeftRightFromStartWon(player, 0, 3) ||
      this.isDiagonalLeftRightFromStartWon(player, 0, 1) ||
      this.isDiagonalLeftRightFromStartWon(player, 0, 2) ||
      this.isDiagonalLeftRightFromStartWon(player, 1, 2) ||
      this.isDiagonalLeftRightFromStartWon(player, 2, 3) ||
      this.isDiagonalLeftRightFromStartWon(player, 1, 3)
    ) {
      return true;
    } else {
      return false;
    }
  }

  isDiagonalRightLeftWon(player) {
    if (this.isDiagonalRightLeftFromStartWon(player, 2, 6 - 0) ||
      this.isDiagonalRightLeftFromStartWon(player, 1, 6 - 0) ||
      this.isDiagonalRightLeftFromStartWon(player, 2, 6 - 1) ||
      this.isDiagonalRightLeftFromStartWon(player, 0, 6 - 0) ||
      this.isDiagonalRightLeftFromStartWon(player, 1, 6 - 1) ||
      this.isDiagonalRightLeftFromStartWon(player, 2, 6 - 2) ||
      this.isDiagonalRightLeftFromStartWon(player, 0, 6 - 3) ||
      this.isDiagonalRightLeftFromStartWon(player, 0, 6 - 1) ||
      this.isDiagonalRightLeftFromStartWon(player, 0, 6 - 2) ||
      this.isDiagonalRightLeftFromStartWon(player, 1, 6 - 2) ||
      this.isDiagonalRightLeftFromStartWon(player, 2, 6 - 3) ||
      this.isDiagonalRightLeftFromStartWon(player, 1, 6 - 3)
    ) {
      return true;
    } else {
      return false;
    }
  }

}
