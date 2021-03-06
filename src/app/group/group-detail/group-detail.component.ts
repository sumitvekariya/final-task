import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { TeamService } from '../../team/team.service';
import { Team } from '../../team/team.model';
import swal from 'sweetalert2';


@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  group: Group;
  id: number;
  team: Team[];
  constructor(
    private groupservice: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private teamservice: TeamService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.group = this.groupservice.getGroupById(this.id);
        console.log(this.group);

        this.teamservice.getTeamDataByGroupId(this.group._id)
          .subscribe(
          (data: Team[]) => {
            this.team = data;
            console.log(this.team);
          }
          );
      }
      );

    this.teamservice.getTeamDataByGroupId(this.group._id)
      .subscribe(
      (data: Team[]) => {
        this.team = data;
        console.log(this.team);
      }
    );
   }

  onEditGroup() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteGroup(groupid: string) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(deletedata => { if (deletedata) {
      swal(
        'Deleted!',
        'Your Group has been deleted.',
        'success'
      );
      this.groupservice.deleteGroup(this.id);
      this.groupservice.onDeleteGroupData(groupid)
        .subscribe(
        (data) => {
          console.log(data);
        }
        );
      this.router.navigate(['/group']);
    }
  }
   , function (dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
          swal(
            'Cancelled',
            'Your Group is safe :)',
            'error'
          );
        }
      });
  }

}
