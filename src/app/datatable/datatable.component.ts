import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member/member.service';
import { Member } from '../member/member.model';
import { TeamService } from '../team/team.service';
import { Team } from '../team/team.model';
import { GroupService } from '../group/group.service';
import { Group } from '../group/group.model';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  member: Member[];
  team: Team;
  group: Group;
  rows = [];
  columns = [];
  teamname = '';
  groupname = '';

  constructor(
    private memberservice: MemberService,
    private teamservice: TeamService,
    private groupservice: GroupService
  ) {}

  ngOnInit() {
    this.memberservice.getMemberData()
      .subscribe(
      (data: Member[]) => {
        this.member = data;
        this.rows = this.member;
      //   for (const mem of this.member) {
      //     this.teamservice.getTeamDataByTeamId(mem.teamId)
      //       .subscribe(
      //       (teamdata: Team) => {
      //         this.teamname = teamdata.name;
      //     //    this.member.push(teamdata.name);
      //         this.rows = this.member;
      //         this.columns = [
      //           {
      //             prop: 'teamdata.name'
      //           }
      //         ];
      //         console.log(this.teamname);
      //         this.groupservice.getGroupDataByGroupId(teamdata.groupId)
      //           .subscribe(
      //           (group: Group) => {
      //             this.groupname = group.name;
      //           //  this.rows = this.member;
      //             this.columns = [
      //               {
      //                 prop: 'group.name'
      //               }
      //             ];
      //           }
      //           );
      //       }
      //       );
      //     console.log(this.member);
      //   }
         }
       );
    this.columns = [
      {
        prop: '_id',
      },
      {
        prop: 'EmailAddress'
      },
      {
        prop: 'teamId'
      }
    ];

  }

}
