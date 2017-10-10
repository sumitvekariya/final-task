import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Member } from './member.model';

@Injectable()
export class MemberService {
  member: Member[];
  memberChanged = new Subject<Member[]>();
  constructor(private httpclient: HttpClient) { }

  storeMember(member) {
    const jsonHeader = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('https://team-management-ghclxtoitp.now.sh/teamMember', member, {
      headers: jsonHeader
    });
  }
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

  updateMember(index: number, newMember: Member, memberid) {
    this.member[index] = newMember;
    this.memberChanged.next(this.member.slice());
    const jsonHeader = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.put('https://team-management-ghclxtoitp.now.sh/teamMember/' + memberid, newMember, {
      headers: jsonHeader
    });
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

  onDeleteMemberData(memberid: string) {
    const jsonHeader = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.delete('https://team-management-ghclxtoitp.now.sh/teamMember/' + memberid, {
      headers: jsonHeader
    });
  }
}
