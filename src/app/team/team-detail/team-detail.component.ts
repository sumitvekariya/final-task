import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../team.model';
import { TeamService } from '../../team/team.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  team: Team;
  id: number;
  constructor(
    private teamservice: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.team = this.teamservice.getTeamById(this.id);
        console.log(this.team);
      }
      );
  }

  onEditTeam() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteTeam() {
    this.teamservice.deleteTeam(this.id);
    this.router.navigate(['/team']);
  }

}
