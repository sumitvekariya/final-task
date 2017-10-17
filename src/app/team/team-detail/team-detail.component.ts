import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../team.model';
import { TeamService } from '../../team/team.service';
import { MemberService } from '../../member/member.service';
import { Member } from '../../member/member.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  team: Team;
  id: number;
  member: Member[];
  constructor(
    private teamservice: TeamService,
    private route: ActivatedRoute,
    private router: Router,
    private memberservice: MemberService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.team = this.teamservice.getTeamById(this.id);
        console.log(this.team);

        this.memberservice.getMemberDataByTeamId(this.team._id)
          .subscribe(
          (data: Member[]) => {
            this.member = data;
            console.log(this.member);
          }
          );
      }
      );

    this.memberservice.getMemberDataByTeamId(this.team._id)
      .subscribe(
      (data: Member[]) => {
        this.member = data;
        console.log(this.member);
      }
      );
  }

  onEditTeam() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteTeam(teamid) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(deletedata => {
      if (deletedata) {
        swal(
          'Deleted!',
          'Your Team has been deleted.',
          'success'
        );
    this.teamservice.deleteTeam(this.id);
    this.teamservice.onDeleteTeamData(teamid)
      .subscribe(
      (data) => {
        console.log(data);
      }
      );
    this.router.navigate(['/team']);
    }
  }
    , function (dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
          swal(
            'Cancelled',
            'Your Team is safe :)',
            'error'
          );
        }
      });
    }
}
