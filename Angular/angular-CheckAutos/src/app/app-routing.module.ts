import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudMecanicosComponent } from './crud-mecanicos/crud-mecanicos.component';
import { CrudPropietariosComponent } from './crud-propietarios/crud-propietarios.component';
import { CrudRevisionesComponent } from './crud-revisiones/crud-revisiones.component';
import { CrudUsuariosComponent } from './crud-usuarios/crud-usuarios.component';
import { CrudVehiculosComponent } from './crud-vehiculos/crud-vehiculos.component';

const routes: Routes = [
  {path: '', component: CrudUsuariosComponent},
  {path: 'usuarios', component: CrudUsuariosComponent},
  {path: 'vehiculos', component: CrudVehiculosComponent},
  {path: 'mecanicos', component: CrudMecanicosComponent},
  {path: 'propietarios', component: CrudPropietariosComponent},
  {path: 'revisiones', component: CrudRevisionesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
