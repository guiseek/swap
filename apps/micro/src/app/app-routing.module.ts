import { NoopLocationStrategy, NoComponent } from '@swap/micro/router';
import { NgModule } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { ChildPageComponent } from './child-page.component';
import { MicroFrontendComponent } from './micro-frontend.component';

const routes: Routes = [
  {
    path: 'micro-frontend',
    component: MicroFrontendComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MainPageComponent,
      },
      {
        path: 'child',
        component: ChildPageComponent,
      },
      {
        path: 'redirect',
        redirectTo: 'child',
      },
    ],
  },
  { path: '**', component: NoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
    }),
  ],
  providers: [{ provide: LocationStrategy, useClass: NoopLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
