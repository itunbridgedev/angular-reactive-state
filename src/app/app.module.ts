import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { reducers, effects, CustomSerializer } from './store';

import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

export const routes: Routes = [
  { 
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)  
  },
  { 
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin',
  },
  {
    path: '**',
    redirectTo: 'admin'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, { metaReducers }), // don't understand the metaReducers
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule, // Not sure what this is for - research...
    environment.development ? StoreDevtoolsModule.instrument() : [], // Don't know what this is for
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
