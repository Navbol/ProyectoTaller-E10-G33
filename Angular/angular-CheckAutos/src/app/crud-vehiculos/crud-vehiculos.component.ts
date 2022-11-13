import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from '../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-vehiculos',
  templateUrl: './crud-vehiculos.component.html',
  styleUrls: ['./crud-vehiculos.component.scss']
})
export class CrudVehiculosComponent implements OnInit {
  modeForm = 'adicion';
  dataPropietarios: any = [];
  dataSource: any = [];

  showForm = false; 
  formVehiculo: FormGroup = new FormGroup({});
  constructor(private servicioBackend: RequestBackendService, private fb: FormBuilder) {
    this.formVehiculo = this.fb.group({
      placa:[''],
      marca:[''],
      tipo:[''],
      linea:[''],
      cilindraje:[''],
      modelo:[''],
      capacidad:[''],
      idPropietario:['']
      //idSede:['6362036a646a1a82d8b7a976']
   })
  }

  tipos = [
    {
      text: 'Automóvil',
      value: 'Automóvil',
    },
    {
      text: 'Camioneta',
      value: 'Camioneta',
    },
    {
      text: 'Camión',
      value: 'Camión',
    },
  ];

  marcas = [
    {
      text: 'BMW',
      value: 'BMW',
    },
    {
      text: 'Chevrolet',
      value: 'Chevrolet',
    },
    {
      text: 'Ford',
      value: 'Ford',
    },
    {
      text: 'Mazda',
      value: 'Mazda',
    },
    {
      text: 'Mercedez Benz',
      value: 'Mercedez Benz',
    },
    {
      text: 'Nissan',
      value: 'Nissan',
    },
    {
      text: 'Renault',
      value: 'Renault',
    },
    {
      text: 'Honda',
      value: 'Honda',
    },
    {
      text: 'Volvo',
      value: 'Volvo',
    },
    {
      text: 'Audit',
      value: 'Audit',
    },
  ];



  ngOnInit(): void {
    this.getAllVehiculos();
    this.getAllPropietarios();
  }

  getAllPropietarios(): void {
    this.servicioBackend.getData('propietarios').subscribe(
      (data) => {
        console.log(data);
        this.dataPropietarios = data;
      },

      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  async getAllVehiculos() {
    this.servicioBackend.getData('vehiculos').subscribe(
      (data) => {
        console.log(data);
        this.dataSource = data;
      },
      (error) => {
        this.dataSource = [];
        console.log('Error: ' + error);
      }
    )
  }

  deleteVehiculo(code: string): void {
    console.log(code);

    Swal.fire({
      title: '¿Está seguro de eliminar el vehículo?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioBackend.deleteData('vehiculos', code).subscribe({
          next: (data) => {
            this.getAllVehiculos();
            Swal.fire('Ok!', 'Eliminado', 'success');
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Vehículo NO eliminado', 'Ocurrió un error', 'error');
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    });
  }

  selectVehiculoEdit(user: any): void {
    // this.showForm = true;
    // this.modeForm = 'edicion';
    // this.formUser.patchValue(user);
  }

  saveVehiculo(): void {
    const datosUser = this.formVehiculo.getRawValue();
    console.log(datosUser);

    this.servicioBackend
      .postData('vehiculos', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getAllVehiculos();
          Swal.fire(
            'Vehículo creado',
            'Todo ha salido muy bien con la creación del vehículo',
            'success'
          );
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Vehiculo NO creado', 'Ocurrió un error', 'error');
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  changeShowForm() {
    this.modeForm = 'adicion';
    this.showForm = !this.showForm;
  }

  updateVehiculo(): void {}


}
