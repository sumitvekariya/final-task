import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  id: number;
  editMode = false;
  memberForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private memberservice: MemberService,
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
    let memberFirstName = '';
    let memberLastName = '';
    let memberMiddleName = '';
    let memberId = '';
    let teamId = '';
    let emailAddress = '';

    if (this.editMode) {
      const member = this.memberservice.getMemberById(this.id);
      console.log(member);
      memberFirstName = member.firstName;
      memberMiddleName = member.middleName;
      memberLastName = member.lastName;
      teamId = member.teamId;
      memberId = member._id;
      emailAddress = member.EmailAddress;
    }

    this.memberForm = new FormGroup({
      'firstName': new FormControl(memberFirstName, Validators.required),
      'middleName': new FormControl(memberMiddleName),
      'lastName': new FormControl(memberLastName, Validators.required),
      'EmailAddress': new FormControl(emailAddress, Validators.email),
      'teamId': new FormControl(teamId, Validators.required),
      '_id': new FormControl(memberId, Validators.required),

    });
  }

  onSubmit() {

    if (this.editMode) {
      this.memberservice.updateMember(this.id, this.memberForm.value);
    } else {
      this.memberservice.addMember(this.memberForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
