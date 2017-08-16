import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {MdDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';


@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.sass']
})
export class DirectoryComponent implements OnInit {

  private directory;
  private items;
  private page;
  private paths = [];

  constructor(private db: AngularFireDatabase, private store:Store<any>, private router: Router, public dialog: MdDialog) { }

  ngOnInit() {
    this.store.select<any>("userProfile").subscribe(storeData => {
      if(storeData){
        this.directory = this.db.object('/users/'+storeData.uid+'/directory');
        this.directory.subscribe(item => {
          if(Object.keys(item).length == 1 && Object.keys(item)[0]=="$value")
            this.page = {};
          else{
            this.page = JSON.parse(item.paths);
            this.items = Object.keys(this.navigatePath(""));

          }
        });
      }
    });
  }

  private home(){
    this.items = Object.keys(this.page)
    this.paths = [];
  }

  private dive(path){
    if(this.hasChildren(path)){
      //console.log(this.page, this.page[path]);
      this.items = Object.keys(this.navigatePath(path));
      this.paths.push(path);
    }else{
      //open note
      let nav = "";
      this.paths.map(p => nav += "/"+p);
      nav += "/"+this.navigatePath(path);
      this.router.navigate(['work'], {queryParams:{nav}});

    }
  }

  private climbTo(path, index){
    if(index < this.paths.length){
      this.paths.splice(index+1);
      this.items = Object.keys(this.navigatePath(""));
    }
  }

  private navigatePath(p){
    let result = Object.assign(this.page);
    this.paths.map(t => result = result[t]);
    if(p && p != "")
      result = result[p];
    return result;
  }

  private hasChildren(p){
    let result = this.page;
    this.paths.map(t => result = result[t]);
    if(p && p != "")
      result = result[p];

    return typeof result != 'string';
  }

  private createNote(){
    let location = this.navigatePath("");

    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.actionType = "file";
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        location[result] = result;
        this.items = Object.keys(this.navigatePath(""));
        this.directory.set({paths:JSON.stringify(this.page)});
      }
    });


    // this.directory.update(
    //   {
    //     "New Note 123":"New Note 123"
    //   }
    // );
  }

  private createFolder(){
    let location = this.navigatePath("")

    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.actionType = "folder";
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        location[result] = {};
        this.items = Object.keys(this.navigatePath(""));
        this.directory.set({paths:JSON.stringify(this.page)});
      }
    });



  }

}
