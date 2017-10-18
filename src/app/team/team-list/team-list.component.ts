import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Team } from '../team.model';
import 'rxjs/Rx';
import { TeamService } from '../team.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  team: Team[];
  constructor(
    private teamservice: TeamService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingservice: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.loadingservice.start();
    this.teamservice.getTeamData()
      .subscribe(
      (data: Team[]) => {
        this.teamservice.setTeam(data);
        this.team = data;
      }
      );
  }

  onNewTeam() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
