import {NgModule} from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import {WorkScreenComponent} from './work-screen/work-screen.component'
import {DirectoryComponent} from './directory/directory.component'

const routes:Routes = [
  {
    path:'',
    redirectTo:'/directory',
    pathMatch:'full'
  },
  {
    path:'work',
    component:WorkScreenComponent,
    children:[]
  },
  {
    path:'directory',
    component:DirectoryComponent,
    children:[]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule],
  providers:[]
})
export class AppRoutingModule { }
