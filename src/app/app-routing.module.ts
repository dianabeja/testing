import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StddevComponent } from './stddev/stddev.component';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CorrelationComponent } from './correlation/correlation.component';

const routes: Routes = [
  {path: '', redirectTo: "inicio", pathMatch: 'full'},
  {path: "1a", component: StddevComponent},
  {path: "inicio", component: AppComponent},
  {path: "3a", component: CorrelationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
