import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { FormControl } from '@angular/forms';
import { WorkScreenService } from './work-screen.service';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-work-screen',
  templateUrl: './work-screen.component.html',
  styleUrls: ['./work-screen.component.sass']
})
export class WorkScreenComponent implements OnInit {

  private notePath = "";
  private noteTitle = "";
  @ViewChild('editor') editor: QuillEditorComponent;
  //@ViewChild('viewer') viewer: QuillEditorComponent;

  private userProfile;
  private dbNote;


  private formattedNotes:string = "";

  private contentForm:FormControl;

  private value:string="";

  constructor(private workScreenService:WorkScreenService, private db: AngularFireDatabase, private store:Store<any>, private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {

      this.store.select<any>("userProfile").subscribe(storeData => {
        if(storeData){
          this.userProfile = storeData;
          this.route.queryParams.subscribe(params => {
            console.log(params)
            this.notePath = params.nav;
            //this.noteTitle = this.notePath.split()
            this.dbNote = this.db.object('/users/'+storeData.uid+'/files'+this.notePath);
            this.dbNote.subscribe(item => {
              console.log(item);
              this.value = item.$value;
            });
          });

        }
      });

    //this.contentForm = new FormControl("");
    //this.contentForm.valueChanges.subscribe(newData => {
      //this.formattedNotes = "";

      //console.log(newData);
      // if(newData){
      //   let lines = newData.split("</p>").filter(data => data.length>0).map((d,i) => {
      //     this.formattedNotes += this.workScreenService.parseText(d.substring(3), i);
      //
      //   });
      //   console.log(lines);
      //   //this.formattedNotes = this.workScreenService.print(lines)
      //
      // }

      //newData;
      // this.viewer.quillEditor.deleteText();
      // this.viewer.quillEditor.updateContents(
      //   [
      //     {insert:newData}
      //   ]
      // );
    //});
  }

  private save(){
    this.db.object('/users/'+this.userProfile.uid+'/files').update({[this.notePath]:this.value})
    //this.dbNote.set({text:this.value});
  }

  private updateContents(a){
    this.formattedNotes = "";
    a.text.split("\n").filter(data => data.length>0).map((d,i) => {
        this.formattedNotes += this.workScreenService.parseText(d, i);

      });

  }

  private back(){
    this.router.navigate(['directory']);

  }



}
