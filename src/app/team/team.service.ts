import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Team } from './team.model';

@Injectable()
export class TeamService {
  team: Team[];
  teamChanged = new Subject<Team[]>();
  constructor(private httpclient: HttpClient) { }

  getTeamData() {
    return this.httpclient.get('https://team-management-ghclxtoitp.now.sh/team')
      .map(
      data => {
        console.log(data);
        return data;
      }
      );

  }

  addTeam(team: Team) {
    this.team.push(team);
    this.teamChanged.next(this.team.slice());
  }

  updateTeam(index: number, newTeam: Team) {
    this.team[index] = newTeam;
    this.teamChanged.next(this.team.slice());
  }

  getTeamById(index: number) {
    return this.team[index];
  }

  setTeam(team: Team[]) {
    this.team = team;
    this.teamChanged.next(this.team.slice());
  }

  deleteTeam(index: number) {
    this.team.splice(index, 1);
    this.teamChanged.next(this.team.slice());
  }
}
