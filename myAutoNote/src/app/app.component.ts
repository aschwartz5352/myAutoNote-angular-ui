import { Component } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import {UserProfileReducer} from './app-store/reducers/user-profile.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  user: Observable<firebase.User>;
  private userProfile;

  constructor(private afAuth: AngularFireAuth,private db: AngularFireDatabase, private store:Store<any>) {
    this.user = afAuth.authState;

  }

  ngOnInit() {

    this.user.subscribe(us => {
      if(us){
        this.userProfile = us;
        this.store.dispatch({type:UserProfileReducer.SET_PROFILE, payload:us});
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
