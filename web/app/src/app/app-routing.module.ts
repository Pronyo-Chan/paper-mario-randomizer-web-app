import { SeedPageComponent } from './pages/seed/seed-page/seed-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomizerPageComponent } from './pages/home/randomizer-page/randomizer-page.component';

const routes: Routes = [
  { path: 'seed', component: SeedPageComponent },
  { path: '', pathMatch: 'full', component: RandomizerPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
