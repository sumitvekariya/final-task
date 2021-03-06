import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../team.model';
import { MemberService } from '../../../member/member.service';
import { Member } from '../../../member/member.model';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent implements OnInit {
  @Input() teams: Team;
  @Input() index: number;
  member: Member[];
  memberCount = 0;
  constructor(
    private memberservice: MemberService,
    private loadingservice: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.memberservice.getMemberDataByTeamId(this.teams._id)
      .subscribe(
      (data: Member[]) => {
        this.member = data;
        console.log(this.member);
        this.memberCount = this.member.length;
      }
      );
    this.loadingservice.complete();
  }
}
