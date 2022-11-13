import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from '../request-backend.service';

const ELEMENT_DATA: any = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.scss']
})
export class CrudUsuariosComponent implements OnInit {
  edad = 0;
  titulo = 'Hola';
  value ='';

  
  displayedColumns: string[] = ['nombre', 'apellido', 'telefono', 'fechaNacimiento'];
  dataSource = [];
  columnas=[
    {titulo: "Nombre", name: "nombre"},
    {titulo: "Apellido", name: "apellido"},
    {titulo: "Teléfono", name: "telefono"},
    {titulo: "Fecha de Nacimiento", name: "fechaNacimiento"}
  ]

  constructor(private servicioBackend: RequestBackendService) { 
    this.getUsers();
  }

  ngOnInit(): void {
  }

  cambiarTitulo(): void {
    this.titulo = "He cambiado de nombre";
  }
  
  blurBuscar(): void{
    console.log('libero focus');

  }
  focusBuscar(): void{
    console.log('hizo focus');
  }

  getUsers(): void{
    this.servicioBackend.getData('mecanicos').subscribe(
      (data) => {
        console.log(data);
        this.dataSource = data;
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  
}
