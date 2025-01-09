import { DevPageComponent } from './pages/dev-page/dev-page.component';
import { GithubPageComponent } from './pages/github-page/github-page.component';
import { ChangelogPageComponent } from './pages/changelog-page/changelog-page.component';
import { SeedPageComponent } from './pages/seed/seed-page/seed-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomizerPageComponent } from './pages/home/randomizer-page/randomizer-page.component';
import { PlandoPageComponent } from "./pages/plando-page/plando-page.component";

const routes: Routes = [
  { path: 'seed', component: SeedPageComponent, runGuardsAndResolvers: 'always', },
  { path: 'changelog', component: ChangelogPageComponent },
  { path: 'github', component: GithubPageComponent },
  { path: 'plandomizer', component: PlandoPageComponent },
  { path: 'dev-tools', component: DevPageComponent },
  { path: '', pathMatch: 'full', component: RandomizerPageComponent },
  { path: "**", redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    onSameUrlNavigation: 'reload'
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
