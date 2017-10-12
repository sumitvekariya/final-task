import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCBw0tfDl-MmTmlLiJSuzqeZHH4gwBEHI4',
      authDomain: 'testing-4617a.firebaseapp.com',
    });
  }
}
