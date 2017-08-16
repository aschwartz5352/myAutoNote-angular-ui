import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {MdDialog, MdDialogRef,MD_DIALOG_DATA} from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import {UserProfileReducer} from '../app-store/reducers/user-profile.reducer';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent implements OnInit {

  public actionType:string;

  private userProfile:any={};

  private name:string="";


  constructor(private store:Store<any>,public dialogRef: MdDialogRef<DialogComponent>, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.store.select<any>("userProfile").subscribe(storeData => {
      this.userProfile = storeData;
      console.log(this.dialogRef.componentInstance);
    });
  }

  ngOnChanges(){
      console.log("sf",MD_DIALOG_DATA);

  }

  logout(){
    this.afAuth.auth.signOut();
    this.store.dispatch({type:UserProfileReducer.LOG_OUT});
  }



}
