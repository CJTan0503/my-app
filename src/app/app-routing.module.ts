import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'addItem', loadChildren: () => import('./addItem/addItem.module').then(m => m.AddItemPageModule) },
  { path: 'edit-delete-item', loadChildren: () => import('./edit-delete-item/edit-delete-item.module').then(m => m.EditDeleteItemPageModule) },
  { path: 'edit-item', loadChildren: () => import('./edit-item/edit-item.module').then(m => m.EditItemPageModule) }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
