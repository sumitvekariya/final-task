import { HttpEvent } from '@angular/common/http';
import { Response } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  id: number;
  editMode = false;
  groupForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private groupservice: GroupService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let groupName = '';
    let groupDescription = '';
  //  let groupId = '';

    if (this.editMode) {
      const group = this.groupservice.getGroupById(this.id);
      console.log(group);
      groupName = group.name;
      groupDescription = group.description;
    //  groupId = group._id;
      }

      this.groupForm = new FormGroup({
        'name': new FormControl(groupName),
      //  '_id': new FormControl( groupId),
        'description': new FormControl(groupDescription)
      });
  }

  onSubmit() {

    if (this.editMode) {
      const group = this.groupservice.getGroupById(this.id);
      this.groupservice.updateGroup(this.id, this.groupForm.value, group._id)
      .subscribe(
        response => {
          console.log(response);
        }
      );
    } else {
      this.groupservice.addGroup(this.groupForm.value);
      this.groupservice.storeGroup(this.groupForm.value)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}


