import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Member } from './member.model';

@Injectable()
export class MemberService {
  member: Member[];
  memberChanged = new Subject<Member[]>();
  constructor(private httpclient: HttpClient) { }

  getMemberData() {
    return this.httpclient.get('https://team-management-ghclxtoitp.now.sh/teamMember')
      .map(
      data => {
        console.log(data);
        return data;
      }
      );

  }

  addMember(member: Member) {
    this.member.push(member);
    this.memberChanged.next(this.member.slice());
  }

  updateMember(index: number, newMember: Member) {
    this.member[index] = newMember;
    this.memberChanged.next(this.member.slice());
  }

  getMemberById(index: number) {
    return this.member[index];
  }

  setMember(member: Member[]) {
    this.member = member;
    this.memberChanged.next(this.member.slice());
  }

  deleteMember(index: number) {
    this.member.splice(index, 1);
    this.memberChanged.next(this.member.slice());
  }
}
