import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Group } from '../group.model';
import 'rxjs/Rx';
import { GroupService } from '../group.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
   group: Group[];
   subscription: Subscription;
  constructor(
    private groupservice: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingservice: SlimLoadingBarService

  ) { }

  ngOnInit() {
  //  this.loadingservice.progress = 30;

      // We can listen when loading will be completed
    this.loadingservice.start();
    this.groupservice.getGroupData()
      .subscribe(
      (data: Group[]) => {
        this.groupservice.setGroup(data);
        this.group = data;
      }
    );
  }

  onNewGroup() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }


}
