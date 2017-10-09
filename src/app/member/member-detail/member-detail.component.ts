import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../member.model';
import { MemberService } from '../../member/member.service';

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

  onDeleteMember() {
    this.memberservice.deleteMember(this.id);
    this.router.navigate(['/member']);
  }

}
