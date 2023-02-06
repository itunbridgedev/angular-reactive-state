import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RouterModule, Routes } from '@angular/router';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

// routes
export const routes: Routes = [
  {
    path: 'donuts',
    component: fromContainers.DonutListComponent,
    canActivate: [fromGuards.DonutsGuard],
  },
  {
    path: 'donuts/new',
    component: fromContainers.DonutItemComponent,
    data: { isEdit: false },
    canActivate: [fromGuards.DonutsGuard],
  },
  {
    path: 'donuts/:donutId',
    component: fromContainers.DonutItemComponent,
    data: { isEdit: true },
    canActivate: [fromGuards.DonutExistsGuards],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'donuts',
  },
];

// services
import { DonutService } from './services/donut.service';

// guards
import * as fromGuards from './guards';

// store
import { reducers, effects } from './store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [DonutService, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class AdminModule {}
