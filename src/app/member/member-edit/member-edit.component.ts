import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member/member.service';
import { TeamService } from '../../team/team.service';
import { Team } from '../../team/team.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  id: number;
  editMode = false;
  memberForm: FormGroup;
  team: Team[];
  constructor(private route: ActivatedRoute,
    private memberservice: MemberService,
    private router: Router,
    private teamservice: TeamService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
      );

    this.teamservice.getTeamData()
      .subscribe(
      (data: Team[]) => {
        //  this.groupservice.setGroup(data);
        this.team = data;
      }
      );
  }



  private initForm() {
    let memberFirstName = '';
    let memberLastName = '';
    let memberMiddleName = '';
  //  let memberId = 'ID will be assigned automatically';
    let teamId = '';
    let emailAddress = '';

    if (this.editMode) {
      const member = this.memberservice.getMemberById(this.id);
      console.log(member);
      memberFirstName = member.firstName;
      memberMiddleName = member.middleName;
      memberLastName = member.lastName;
      teamId = member.teamId;
    //  memberId = member._id;
      emailAddress = member.EmailAddress;
    }

    this.memberForm = new FormGroup({
      'firstName': new FormControl(memberFirstName),
      'middleName': new FormControl(memberMiddleName),
      'lastName': new FormControl(memberLastName),
      'EmailAddress': new FormControl(emailAddress),
      'teamId': new FormControl()
    //  '_id': new FormControl(memberId),

    });
  }



  onSubmit() {

    if (this.editMode) {
      const member = this.memberservice.getMemberById(this.id);
      this.memberservice.updateMember(this.id, this.memberForm.value, member._id)
        .subscribe(
        response => {
          console.log(response);
        }
        );
      swal(
        'Updated!',
        'The Member has been Updated!',
        'success'
      );
    } else {
      this.memberservice.addMember(this.memberForm.value);
      this.memberservice.storeMember(this.memberForm.value)
        .subscribe(
        (response) => {
          console.log(response);
        }
        );
      swal(
        'Added!',
        'A new Member has been Added!',
        'success'
      );
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
