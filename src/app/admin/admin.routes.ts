import { Routes } from '@angular/router';

// routes
export const AdminRoutes: Routes = [
  {
    path: 'donuts',
    loadComponent: () =>
      import('../admin/containers/donut-list/donut-list.component').then(
        (x) => x.DonutListComponent
      ),
  },
  {
    path: 'donuts/new',
    loadComponent: () =>
      import('../admin/containers/donut-item/donut-item.component').then(
        (x) => x.DonutItemComponent
      ),
    data: { isEdit: false },
  },
  {
    path: 'donuts/:donutId',
    loadComponent: () =>
      import('../admin/containers/donut-item/donut-item.component').then(
        (x) => x.DonutItemComponent
      ),
    data: { isEdit: true },
  },
  { path: '', pathMatch: 'full', redirectTo: 'donuts' },
];