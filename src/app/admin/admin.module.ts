import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

// containers
import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutItemComponent } from './containers/donut-item/donut-item.component';

// components
import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { DonutFormComponent } from './components/donut-form/donut-form.component';

// routes
export const routes: Routes = [
  { path: 'donuts', component: DonutListComponent },
  { path: 'donuts/new', component: DonutItemComponent, data: { isEdit: false } },
  { path: 'donuts/:id', component: DonutItemComponent, data: { isEdit: true } },
  { path: '', pathMatch: 'full', redirectTo: 'donuts' },
];

// services

// guards

// directives

@NgModule({
  declarations: [
    DonutListComponent,
    DonutItemComponent,
    DonutCardComponent,
    DonutFormComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
