import { EventEmitter, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Group } from './group.model';

@Injectable()
export class GroupService {
  group: Group[];
  groupChanged = new Subject<Group[]>();

  constructor(private httpclient: HttpClient) { }

    getGroupData() {
    return this.httpclient.get('https://team-management-ghclxtoitp.now.sh/group')
    .map(
      data => {
        console.log(data);
        return data;
      }
    );

  }

    addGroup(group: Group) {
      this.group.push(group);
      this.groupChanged.next(this.group.slice());
    }

    updateGroup(index: number, newGroup: Group) {
      this.group[index] = newGroup;
      this.groupChanged.next(this.group.slice());
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
