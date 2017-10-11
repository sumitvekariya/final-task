import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../group.model';
import { TeamService } from '../../../team/team.service';
import { Team } from '../../../team/team.model';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() groups: Group;
  @Input() index: number;
  team: Team[];
  teamCount = 0;
  constructor(private teamservice: TeamService) { }

  ngOnInit() {
    this.teamservice.getTeamDataByGroupId(this.groups._id)
      .subscribe(
      (data: Team[]) => {
        this.team = data;
        console.log(this.team);
        this.teamCount = this.team.length;
      }
      );
  }

}
