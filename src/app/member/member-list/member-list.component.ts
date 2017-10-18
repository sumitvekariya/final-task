import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Member } from '../member.model';
import 'rxjs/Rx';
import { MemberService } from '../member.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  member: Member[];
  subscription: Subscription;
  constructor(
    private memberservice: MemberService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingservice: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.loadingservice.start();
    this.memberservice.getMemberData()
      .subscribe(
      (data: Member[]) => {
        this.memberservice.setMember(data);
        this.member = data;
      }
      );
  }

  onNewMember() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
