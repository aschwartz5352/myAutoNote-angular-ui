import { ActionReducer, Action } from '@ngrx/store';

export class UserProfileReducer{
  public static SET_PROFILE: string = "[Collection UserProfile] SET_PROFILE";
  public static LOG_OUT: string = "[Collection UserProfile] LOG_OUT";

  public static reducer(userProfile:any, action:Action){
    switch(action.type){
      case UserProfileReducer.LOG_OUT:
        return null;
      case UserProfileReducer.SET_PROFILE:
        console.log(userProfile, action);
        return Object.assign(action.payload);
      default:
        return userProfile;
    };
  }
}
