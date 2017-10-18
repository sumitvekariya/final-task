import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { TranslateService, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private translateservice: TranslateService) {

    this.translateservice.addLangs(['en', 'fr']);
    // this.translateservice.setDefaultLang('en');
    // this.translateservice.use('fr');
    }

  ngOnInit() {
    // firebase.initializeApp({
    //   apiKey: 'AIzaSyCBw0tfDl-MmTmlLiJSuzqeZHH4gwBEHI4',
    //   authDomain: 'testing-4617a.firebaseapp.com',
    // });
  }
  onEnglish() {
  //  this.translateservice.use('en');
    const browserLang = this.translateservice.getBrowserLang();
    this.translateservice.use(browserLang);
  }
  onFrench() {
    this.translateservice.use('fr');
  }
}
