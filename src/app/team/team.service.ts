import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Team } from './team.model';

@Injectable()
export class TeamService {
  team: Team[];
  teamChanged = new Subject<Team[]>();
  constructor(private httpclient: HttpClient) { }

  storeTeam(team) {
    return this.httpclient.post('https://team-management-ghclxtoitp.now.sh/team', team);
  }

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

  updateTeam(index: number, newTeam: Team, teamid) {
    this.team[index] = newTeam;
    this.teamChanged.next(this.team.slice());
    const jsonHeader = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.put('https://team-management-ghclxtoitp.now.sh/team/' + teamid, newTeam, {
      headers: jsonHeader
    });
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

  onDeleteTeamData(teamid: string) {
    const jsonHeader = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.delete('https://team-management-ghclxtoitp.now.sh/team/' + teamid, {
      headers: jsonHeader
    });
  }
}
