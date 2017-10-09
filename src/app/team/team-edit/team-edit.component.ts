import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team/team.service';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  id: number;
  editMode = false;
  teamForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private teamservice: TeamService,
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
    let teamName = '';
    let teamDescription = '';
    let techStack = '';
    let teamId = '';
    let groupId = '';

    if (this.editMode) {
      const team = this.teamservice.getTeamById(this.id);
      console.log(team);
      teamName = team.name;
      teamDescription = team.description;
      techStack = team.techStack;
      groupId = team.groupId;
      teamId = team._id;
    }

    this.teamForm = new FormGroup({
      'name': new FormControl(teamName, Validators.required),
      '_id': new FormControl(teamId, Validators.required),
      'description': new FormControl(teamDescription, Validators.required),
      'groupId': new FormControl(groupId, Validators.required),
      'techStack': new FormControl(techStack, Validators.required),
    });
  }

  onSubmit() {

    if (this.editMode) {
      this.teamservice.updateTeam(this.id, this.teamForm.value);
    } else {
      this.teamservice.addTeam(this.teamForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
