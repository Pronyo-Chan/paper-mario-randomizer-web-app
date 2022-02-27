import { SettingDetailsPageComponent } from './pages/setting-details-page/setting-details-page.component';
import { ChangelogPageComponent } from './pages/changelog-page/changelog-page.component';
import { TipsPageComponent } from './pages/tips-page/tips-page.component';
import { SeedPageComponent } from './pages/seed/seed-page/seed-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomizerPageComponent } from './pages/home/randomizer-page/randomizer-page.component';

const routes: Routes = [
  { path: 'seed', component: SeedPageComponent },
  { path: 'tips', component: TipsPageComponent },
  { path: 'changelog', component: ChangelogPageComponent },
  { path: 'settings', component: SettingDetailsPageComponent },
  { path: '', pathMatch: 'full', component: RandomizerPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
