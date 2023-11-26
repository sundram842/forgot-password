import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './global/components/not-found/not-found.component';
import { AuthGuard } from './global/guards/auth.guard';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
   { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
  {
    path: '', component: LayoutComponent, children: [
      {path:'batches',loadChildren:()=>import('./batch/batch.module').then(m=>m.BatchModule)},
      {
        path: 'locations',
        loadChildren: () =>
          import('./location/location.module').then((m) => m.LocationModule),
      },
    ]
  },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
