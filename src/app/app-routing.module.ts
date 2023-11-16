import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StddevComponent } from './stddev/stddev.component';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', redirectTo: "inicio", pathMatch: 'full'},
  {path: "1a", component: StddevComponent},
  {path: "inicio", component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
