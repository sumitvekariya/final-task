
import { EventEmitter, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import 'rxjs/Rx';
import { Group } from './group.model';

@Injectable()
export class GroupService {
  group: Group[];
  groupChanged = new Subject<Group[]>();

  constructor(private httpclient: HttpClient) { }

  storeGroup(id: number) {
    const req = new HttpRequest('POST', 'https://team-management-ghclxtoitp.now.sh/group', this.getGroup());
    return this.httpclient.request(req);
    // return this.httpclient.post('https://testing-4617a.firebaseio.com/group.json', this.getGroupData())
    // // , {
    // //    observe: 'events',
    // //    headers: new HttpHeaders().set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik4wRkVOakpCUkVReU0wTkNOVEpHTlRWQk56bEdSakExUmpoQlFUVkVOelEyUVVNeU5UZzFSZyJ9.eyJpc3MiOiJodHRwczovL3R3aXN0ZWRwYXJpbGFicy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTk4MWE5MTMzNDFlMGIwYTAzOWQyN2I1IiwiYXVkIjoiaHR0cDovL2ZvdW5kZXJzZWQua2F1ZmZtYW4ub3JnIiwiYXpwIjoidXhVblpVWENDZXZtSGFWc3NTMWE4ZGFUQW84R3hNamciLCJleHAiOjE1MDI0NDQxNzQsImlhdCI6MTUwMjM1Nzc3NCwic2NvcGUiOiIiLCJndHkiOiJwYXNzd29yZCJ9.Gb78Sxf0nR2Qfa6vU8nwDhPd63-2oq_XKAtYkanVgpQiNMd5w1-bvr3G2zs6drOWL8YYFlw74aaQ0I4i3aB-2fU_gz5AC0MtZTDCsF7TcXc4Uao7vqatFkmNsiIDaaTdrCtHOHoGj6BX3P_BUsK_IViEk8gbnm_jv0s8zFTs6bDp4AywuDkYtKF1xJzzfiqPiuyjKh1gyzB3sTgHODxRCmfGG-2SlSK1WXjovQIeqwREpA4NnIXL1xtQQvweiqLIErakinjCj7D_mjIhcqIae4fh0csuf3TTXzlIeP_kkmmraGMat7eopV8g_8YsF2pIiS8yJ3TZnPpLtprRSdZPZA'),
    // // });
    // .map(
    //   (data) => {
    //     console.log(data);
    //     return data; }
    // );
  }
    getGroupData() {
    return this.httpclient.get('https://team-management-ghclxtoitp.now.sh/group')
    .map(
      data => {
        console.log(data);
        return data;
      }
    );

  }

  onDeleteGroupData(id: number) {
    return this.httpclient.delete('https://team-management-ghclxtoitp.now.sh/group', this.getGroupById(id));
  }

    getGroup() {
      return this.group.slice();
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
