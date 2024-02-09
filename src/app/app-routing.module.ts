import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home/',
    pathMatch: 'full'
  },
  {
    path: 'home/:query',
    component: HomeComponent
  },
  {
    path: 'character-detail/:id',
    component: CharacterDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
