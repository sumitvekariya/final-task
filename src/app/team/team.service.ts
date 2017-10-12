import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Team } from './team.model';
import { environment } from '../../environments/environment';

@Injectable()
export class TeamService {
  team: Team[];
  teamChanged = new Subject<Team[]>();
  url: string = environment.apiURL;
  constructor(private httpclient: HttpClient) { }

  storeTeam(team) {
    return this.httpclient.post(this.url + '/team', team);
  }

  getTeamData() {
    return this.httpclient.get(this.url + '/team')
      .map(
      data => {
        console.log(data);
        return data;
      }
      );

  }

  getTeamDataByTeamId(teamid) {
    return this.httpclient.get(this.url + '/team/' + teamid)
      .map(
      data => {
        console.log(data);
        return data;
      }
      );
  }

  getTeamDataByGroupId(groupid: string) {
    return this.httpclient.get(this.url + '/team?groupId=' + groupid)
      .map(
      data => {
        console.log(groupid);
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
    return this.httpclient.put(this.url + '/team/' + teamid, newTeam, {
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
    return this.httpclient.delete(this.url + '/team/' + teamid, {
      headers: jsonHeader
    });
  }
}
