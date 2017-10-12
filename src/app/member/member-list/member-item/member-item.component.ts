import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../../member.model';
import { TeamService } from '../../../team/team.service';
import { Team } from '../../../team/team.model';
import { GroupService } from '../../../group/group.service';
import { Group } from '../../../group/group.model';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {
  teams: Team;
  group: Group;
  @Input() members: Member;
  @Input() index: number;
  teamname = '';
  groupname = '';

  constructor(
    private teamservice: TeamService,
    private groupservice: GroupService) { }

  ngOnInit() {
    this.teamservice.getTeamDataByTeamId(this.members.teamId)
      .subscribe(
      (data: Team) => {
        this.teamname = data.name;
        console.log(this.teamname);
        this.groupservice.getGroupDataByGroupId(data.groupId)
        .subscribe(
          (group: Group) => {
            this.groupname = group.name;
          }
        );
      }
    );
  }
}

