import { PlayersService } from './../players.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Superheroes game';
  heroes;
  randomHeroes = [];

  constructor(private http: HttpClient, private playersService: PlayersService, private router: Router) {
  }

  ngOnInit(): void {
    this.playersService.players = [];
    this.http.get('https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json').subscribe(heroes => {
      this.heroes = heroes;
      this.getRandomHeroes();
    });
  }
  getRandomHeroes() {
    let randIndex;
    let i = 0;
    while (i < 8) {
      randIndex = Math.floor((Math.random() * this.heroes.length));
      this.randomHeroes.push(this.heroes[randIndex]);
      i++;
    }

    console.log(this.randomHeroes);
  }

  selectHero(hero) {
    hero.selected = true;
    this.playersService.players.push(hero);
    if (this.playersService.players.length === 2) {
      this.router.navigate(['connect4']);
    }
  }
}
