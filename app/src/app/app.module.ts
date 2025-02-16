import { EmergencySpoilerLogComponent } from './pages/seed/seed-page/emergency-spoiler-log/emergency-spoiler-log.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RandomizerPageComponent } from './pages/home/randomizer-page/randomizer-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatInputModule } from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider'
import { MatSelectModule } from '@angular/material/select'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatChipsModule } from '@angular/material/chips'
import { MatSliderModule } from '@angular/material/slider'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialogModule } from '@angular/material/dialog'
import { MatListModule } from '@angular/material/list'
import { ClipboardModule } from '@angular/cdk/clipboard'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemsComponent } from './pages/home/randomizer-page/items/items.component';
import { PartnersComponent } from './pages/home/randomizer-page/partners/partners.component';
import { GameplayComponent } from './pages/home/randomizer-page/gameplay/gameplay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorldSettingsComponent } from './pages/home/randomizer-page/world-settings/world-settings.component';
import { DifficultySettingsComponent } from './pages/home/randomizer-page/difficulty-settings/difficulty-settings.component';
import { GoalSettingsComponent } from './pages/home/randomizer-page/goal-settings/goal-settings.component';
import { QolSettingsComponent } from './pages/home/randomizer-page/qol-settings/qol-settings.component';
import { PresetSettingsComponent } from './pages/home/randomizer-page/preset-settings/preset-settings.component';
import { PatcherComponent } from './pages/home/randomizer-page/patcher/patcher.component';
import { TooltipSpanComponent } from './common/tooltip-span/tooltip-span.component';
import { SeedPageComponent } from './pages/seed/seed-page/seed-page.component';
import { SettingsInfoComponent } from './pages/seed/seed-page/settings-info/settings-info.component';
import { SpoilerLogComponent } from './pages/seed/seed-page/spoiler-log/spoiler-log.component';
import { LoadingComponent } from './common/loading/loading.component';
import { ErrorComponent } from './common/error/error.component';
import { ChangelogPageComponent } from './pages/changelog-page/changelog-page.component';
import { CosmeticsComponent } from './pages/seed/seed-page/cosmetics/cosmetics.component';
import { MarioSettingsComponent } from './pages/home/randomizer-page/mario-settings/mario-settings.component';
import { StartingItemsComponent } from './pages/home/randomizer-page/starting-items/starting-items.component';
import { ItemChiplistComponent } from './pages/home/randomizer-page/starting-items/item-chiplist/item-chiplist.component';
import { GithubPageComponent } from './pages/github-page/github-page.component';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';
import { SavePresetDialogComponent } from './pages/home/randomizer-page/preset-settings/save-preset-dialog/save-preset-dialog.component';
import { DevPageComponent } from './pages/dev-page/dev-page.component';
import { InfoDialogComponent } from './pages/home/randomizer-page/info-dialog/info-dialog.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTabScrollToCenterDirective } from './utilities/directives/scrolling.directive';
import { SpoilerSettingsComponent } from './pages/home/randomizer-page/spoiler-settings/spoiler-settings.component';
import { GlitchesAndTricksComponent } from './pages/home/randomizer-page/glitches-and-tricks/glitches-and-tricks.component';
import { ItemPoolSettingsComponent } from './pages/home/randomizer-page/item-pool-settings/item-pool-settings.component';
import { GlobalConfig, ToastrModule } from 'ngx-toastr';
import { PlandoPageComponent } from './pages/plando-page/plando-page.component';
import { PlandoSpiritsAndChaptersComponent } from './pages/plando-page/plando-spirits-and-chapters/plando-spirits-and-chapters.component';
import { PlandoPartyComponent } from './pages/plando-page/plando-party/plando-party.component';
import { PlandoBadgesComponent } from './pages/plando-page/plando-badges/plando-badges.component';
import { PlandoItemsComponent } from './pages/plando-page/plando-items/plando-items.component';
import { PlandoSaveLoadComponent } from './pages/plando-page/plando-save-load/plando-save-load.component';
import { PlandomizersComponent } from './pages/home/randomizer-page/plandomizers/plandomizers.component';
import { GenerationSettingsComponent } from './pages/home/randomizer-page/generation-settings/generation-settings.component';
import { PlandoAssignableDirective } from './utilities/directives/plando-assignable.directive';

const dbConfig: DBConfig  = {
  name: 'db',
  version: 1,
  objectStoresMeta: [{
    store: 'userCache',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'rom', keypath: 'rom', options: { unique: false } }
    ]
  }]
};

const toasterConfig: Partial<GlobalConfig> = {
  closeButton: true,
  progressBar: true,
  maxOpened: 1,
  timeOut: 5000,
  positionClass: "toast-top-center"
}

@NgModule({
  declarations: [
    AppComponent,
    RandomizerPageComponent,
    ItemsComponent,
    PartnersComponent,
    GameplayComponent,
    WorldSettingsComponent,
    DifficultySettingsComponent,
    GoalSettingsComponent,
    ItemPoolSettingsComponent,
    QolSettingsComponent,
    PresetSettingsComponent,
    PatcherComponent,
    TooltipSpanComponent,
    SeedPageComponent,
    SettingsInfoComponent,
    SpoilerLogComponent,
    EmergencySpoilerLogComponent,
    LoadingComponent,
    ErrorComponent,
    ChangelogPageComponent,
    CosmeticsComponent,
    MarioSettingsComponent,
    StartingItemsComponent,
    ItemChiplistComponent,
    SavePresetDialogComponent,
    GithubPageComponent,
    DevPageComponent,
    InfoDialogComponent,
    MatTabScrollToCenterDirective,
    SpoilerSettingsComponent,
    GenerationSettingsComponent,
    GlitchesAndTricksComponent,
    PlandoPageComponent,
    PlandoSpiritsAndChaptersComponent,
    PlandoPartyComponent,
    PlandoBadgesComponent,
    PlandoItemsComponent,
    PlandoSaveLoadComponent,
    PlandomizersComponent,
    PlandoAssignableDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatChipsModule,
    MatSliderModule,
    MatMenuModule,
    MatDialogModule,
    MatListModule,
    ClipboardModule,
    ToastrModule.forRoot(toasterConfig),
    HttpCacheInterceptorModule.forRoot(),
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
