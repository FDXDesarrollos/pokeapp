import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './pokedex/table/table.component';
import { DetailComponent } from './pokedex/detail/detail.component';


const routes: Routes = [
  {path: 'home', component: TableComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
