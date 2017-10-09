import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../group.model';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() groups: Group;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
