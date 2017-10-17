import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team/team.service';
import { GroupService } from '../../group/group.service';
import { Group } from '../../group/group.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  id: number;
  editMode = false;
  group: Group[];

  teamForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private teamservice: TeamService,
    private router: Router,
    private groupservice: GroupService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
      );

    this.groupservice.getGroupData()
      .subscribe(
      (data: Group[]) => {
      //  this.groupservice.setGroup(data);
        this.group = data;
      }
      );
  }

  private initForm() {
    let teamName = '';
    let teamDescription = '';
    let techStack = '';
  //  let teamId = 'ID will be assigned automatically';
  //  let groupId = 'ID will be assigned automatically';

    if (this.editMode) {
      const team = this.teamservice.getTeamById(this.id);
      console.log(team);
      teamName = team.name;
      teamDescription = team.description;
      techStack = team.techStack;
    //  groupId = team.groupId;
    //  teamId = team._id;
    }

    this.teamForm = new FormGroup({
      'name': new FormControl(teamName),
    //  '_id': new FormControl(teamId),
      'description': new FormControl(teamDescription),
      'groupId': new FormControl(),
      'techStack': new FormControl(techStack),
    });
  }

  onSubmit() {

    if (this.editMode) {
      const team = this.teamservice.getTeamById(this.id);
      this.teamservice.updateTeam(this.id, this.teamForm.value, team._id)
        .subscribe(
        response => {
          console.log(response);
        }
        );
      swal(
        'Added!',
        'The Team has been Updated!',
        'success'
      );
    } else {
      this.teamservice.addTeam(this.teamForm.value);
      this.teamservice.storeTeam(this.teamForm.value)
        .subscribe(
        (response) => {
          console.log(response);
        }
      );
      swal(
        'Added!',
        'A new Team has been Added!',
        'success'
      );
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
