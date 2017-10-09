import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../team.model';

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent implements OnInit {
  @Input() teams: Team;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
