import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../group.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  group: Group;
  id: number;
  constructor(
    private groupservice: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.group = this.groupservice.getGroupById(this.id);
        console.log(this.group);
      }
      );
   }

  onEditGroup() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteGroup() {
    this.groupservice.deleteGroup(this.id);
    // this.groupservice.onDeleteGroupData(this.id)
    // .subscribe(
    //   (data) => {
    //     console.log(data);
    //   }
    // );
    this.router.navigate(['/group']);
  }

}
