import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../group.model';
import { TeamService } from '../../../team/team.service';
import { Team } from '../../../team/team.model';
import { MemberService } from '../../../member/member.service';
import { Member } from '../../../member/member.model';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() groups: Group;
  @Input() index: string;
  team: Team[];
  member: Member[];
  teamCount = 0;
  memberCount = 0;
  constructor(
              private teamservice: TeamService,
              private memberservice: MemberService,
              private loadingservice: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.teamservice.getTeamDataByGroupId(this.groups._id)
      .subscribe(
      (data: Team[]) => {
        this.team = data;
        console.log(this.team);
        this.teamCount = this.team.length;

        for (const tm of this.team) {
          this.memberservice.getMemberDataByTeamId(tm._id)
          .subscribe(
            (mem: Member[]) => {
              this.memberCount = mem.length;
            }
          );
        }

        // this.memberservice.getMemberData()
        //   .subscribe(
        //   (member: Member[]) => {
        //     this.member = member;
        //     for (const mem of this.member) {
        //       for (const tm of this.team) {
        //         if (mem.teamId === tm._id) {
        //           this.memberCount++;
        //         }
        //       }
        //     }
        //   }
        //   );
      }
      );
    this.loadingservice.complete();
  }

}
