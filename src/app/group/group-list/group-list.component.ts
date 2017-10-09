import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Group } from '../group.model';
import 'rxjs/Rx';
import { GroupService } from '../group.service';

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
    private router: Router

  ) { }

  ngOnInit() {
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
