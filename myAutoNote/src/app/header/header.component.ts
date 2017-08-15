import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  private userProfile:any={};

  constructor(private store:Store<any>) { }

  ngOnInit() {
    this.store.select<any>("userProfile").subscribe(storeData => {
      this.userProfile = storeData;
      console.log(storeData)
    });
  }

}
