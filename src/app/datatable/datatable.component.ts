import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member/member.service';
import { Member } from '../member/member.model';
import { TeamService } from '../team/team.service';
import { Team } from '../team/team.model';
import { GroupService } from '../group/group.service';
import { Group } from '../group/group.model';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

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
    private groupservice: GroupService,
    private loadingservice: SlimLoadingBarService
  ) {}

  ngOnInit() {
    const param = { value: 'world' };
    this.loadingservice.start();
    this.memberservice.getMemberData()
      .subscribe(
      (data: Member[]) => {
        this.member = data;
        this.rows = this.member;
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
    this.loadingservice.complete();
  }

}
