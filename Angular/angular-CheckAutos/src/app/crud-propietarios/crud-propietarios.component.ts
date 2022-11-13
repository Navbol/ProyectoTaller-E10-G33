import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from '../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-crud-propietarios',
  templateUrl: './crud-propietarios.component.html',
  styleUrls: ['./crud-propietarios.component.scss']
})
export class CrudPropietariosComponent implements OnInit {
  modeForm = 'adicion';
  dataSedes: any = [];
  dataSource: any = [];

  showForm = false; 
  formPropietario: FormGroup = new FormGroup({});

  constructor(private servicioBackend: RequestBackendService, private fb: FormBuilder) { 
    this.formPropietario = this.fb.group({
      idPropietario:[''],
      nombre:[''],
      apellido:[''],
      telefono:[''],
      fechaNacimiento:[''],
      contrasena:[''],
      idSede:['']
      //idSede:['6362036a646a1a82d8b7a976']
   })

  }

  ngOnInit(): void {
    this.getAllPropietarios();
    this.getAllSedes();

  }

  getAllSedes(): void {
    this.servicioBackend.getData('sedes').subscribe(
      (data) => {
        console.log(data);
        this.dataSedes = data;
      },

      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  async getAllPropietarios() {
    this.servicioBackend.getData('propietarios').subscribe(
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




  deletePropietario(code: string): void {
    console.log(code);

    Swal.fire({
      title: '¿Está seguro de eliminar el propietario?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioBackend.deleteData('propietarios', code).subscribe({
          next: (data) => {
            this.getAllPropietarios();
            Swal.fire('Ok!', 'Eliminado', 'success');
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Propietario NO eliminado', 'Ocurrió un error', 'error');
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    });
  }

  selectUserEdit(user: any): void {
    // this.showForm = true;
    // this.modeForm = 'edicion';
    // this.formUser.patchValue(user);
  }

  savePropietario(): void {
    const datosUser = this.formPropietario.getRawValue();
    datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);

    console.log(datosUser);

    this.servicioBackend
      .postData('propietarios', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getAllPropietarios();
          Swal.fire(
            'Propietario creado',
            'Todo ha salido muy bien con la creación del propietario',
            'success'
          );
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Propietario NO creado', 'Ocurrió un error', 'error');
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
  updatePropietario(): void {}

  // forkJoin([this.getAllPropietarios(), this.getAllSedes()]).subscribe(
  //   ([propietarios, sedes]) => {
  //     this.result = propietario.map((propietarios) => ({
  //       name: propietario.nombre,
  //       sedes: sedes.find((h) => h.id === propietario.idSede).name,
  //     }));
  //   }
  // );



}