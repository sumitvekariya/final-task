
import { EventEmitter, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import 'rxjs/Rx';
import { Group } from './group.model';
import { environment } from '../../environments/environment';
import { MemberService } from '../member/member.service';

@Injectable()
export class GroupService {
  group: Group[];
  groupChanged = new Subject<Group[]>();
  url: string = environment.apiURL;
  constructor(
                private httpclient: HttpClient

              ) { }

  storeGroup(group) {
    return this.httpclient.post(this.url + '/group', group);
  }

  getGroupData() {
    return this.httpclient.get(this.url + '/group')
    .map(
      data => {
        console.log(data);
        return data;
      }
    );
  }

  getGroupDataByGroupId(groupid) {
    return this.httpclient.get(this.url + '/group/' + groupid)
      .map(
      data => {
        console.log(data);
        return data;
      }
      );
  }


  onDeleteGroupData(groupid: string) {
    const jsonHeader = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.delete(this.url + '/group/' + groupid, {
      headers: jsonHeader} );
  }

    getGroup() {
      return this.group.slice();
    }

    addGroup(group: Group) {
      this.group.push(group);
      this.groupChanged.next(this.group.slice());
    }

    updateGroup(index: number, newGroup: Group, groupid) {
      this.group[index] = newGroup;
      this.groupChanged.next(this.group.slice());
      const jsonHeader = new HttpHeaders().set('Content-Type', 'application/json');
      return this.httpclient.put(this.url + '/group/' + groupid  , newGroup, {
        headers: jsonHeader
      });
    }

  getGroupById(index: number) {
      return this.group[index];
   }

  setGroup(group: Group[]) {
    this.group = group;
    this.groupChanged.next(this.group.slice());
  }

  deleteGroup(index: number) {
    this.group.splice(index, 1);
    this.groupChanged.next(this.group.slice());
  }

}
