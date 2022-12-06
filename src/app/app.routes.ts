
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { DonutService } from './admin/services/donut.service';


export const AppRoutes: Routes = [
  { 
    path: 'admin', loadChildren: () => import('./admin/admin.routes').then(x => x.AdminRoutes),
    providers: [HttpClientModule, DonutService]  
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
