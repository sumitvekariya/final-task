import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../member.model';
import { MemberService } from '../../member/member.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  id: number;
  constructor(
    private memberservice: MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.member = this.memberservice.getMemberById(this.id);
        console.log(this.member);
      }
      );
  }

  onEditMember() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteMember(memberid) {
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
          'Your Team Member has been deleted.',
          'success'
        );
    this.memberservice.deleteMember(this.id);
    this.memberservice.onDeleteMemberData(memberid)
      .subscribe(
      (data) => {
        console.log(data);
      }
      );
    this.router.navigate(['/member']);
    }
  }
    , function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your Team Member is safe :)',
          'error'
        );
      }
    });
  }
}
