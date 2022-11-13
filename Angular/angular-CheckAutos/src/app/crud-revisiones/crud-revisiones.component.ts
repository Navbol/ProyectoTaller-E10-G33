import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from '../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Time } from '@angular/common';

@Component({
  selector: 'app-crud-revisiones',
  templateUrl: './crud-revisiones.component.html',
  styleUrls: ['./crud-revisiones.component.scss']
})
export class CrudRevisionesComponent implements OnInit {
  modeForm = 'adicion';
  dataSedes: any = [];
  dataVehiculos: any = [];
  dataMecanicos: any = [];
  dataSource: any = [];

  showForm = false; 
  formRevision: FormGroup = new FormGroup({});
  constructor(private servicioBackend: RequestBackendService, private fb: FormBuilder) {
    this.formRevision = this.fb.group({
      estado:[''],
      fecha:[''],
      hora:[''],
      placa:[''],
      idMecanico:[''],
      idSede:['']
      //idSede:['6362036a646a1a82d8b7a976']
   })
  }

  estados = [
    {
      text: 'Activa',
      value: 'Activa',
    },
    {
      text: 'En curso',
      value: 'En curso',
    },
    {
      text: 'Cerrada',
      value: 'Cerrada',
    },
    {
      text: 'Programada',
      value: 'Programada',
    },
    {
      text: 'Reprogramada',
      value: 'Reprogramada',
    },
    {
      text: 'Suspendida',
      value: 'Suspendida',
    },

  ];


  ngOnInit(): void {
    this.getAllRevisiones();
    this.getAllSedes();
    this.getAllVehiculos();
    this.getAllMecanicos();
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

  getAllVehiculos(): void {
    this.servicioBackend.getData('vehiculos').subscribe(
      (data) => {
        console.log(data);
        this.dataVehiculos = data;
      },

      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  async getAllMecanicos() {
    this.servicioBackend.getData('mecanicos').subscribe(
      (data) => {
        console.log(data);
        this.dataMecanicos = data;
      },
      (error) => {
        this.dataSource = [];
        console.log('Error: ' + error);
      }
    )
  }  

  async getAllRevisiones() {
    this.servicioBackend.getData('revisions').subscribe(
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

  deleteRevision(code: string): void {
    console.log(code);

    Swal.fire({
      title: '¿Está seguro de eliminar la revisión?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioBackend.deleteData('revisions', code).subscribe({
          next: (data) => {
            this.getAllRevisiones();
            Swal.fire('Ok!', 'Eliminado', 'success');
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Revisión NO eliminada', 'Ocurrió un error', 'error');
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    });
  }

  selectRevisionEdit(user: any): void {
    // this.showForm = true;
    // this.modeForm = 'edicion';
    // this.formUser.patchValue(user);
  }

  saveRevision(): void {
    const datosUser = this.formRevision.getRawValue();
    let fecha: Date = new Date(datosUser['fecha']);
    var hora = datosUser['hora'].concat(":", "00");
    const result = this.formatDate(fecha,hora);
  
    datosUser['fecha'] = new Date(datosUser['fecha']);
    datosUser['hora'] = result;
       

    console.log(datosUser);
    
    this.servicioBackend
      .postData('revisions', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getAllRevisiones();
          Swal.fire(
            'Revisión creada',
            'Todo ha salido muy bien con la creación de la revisión',
            'success'
          );
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Revision NO creada', 'Ocurrió un error', 'error');
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
  updateRevision(): void {}  



// ✅ Format using reusable function
padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}


formatDate(date: Date, hora: string) {
  return (
    [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate() ),
    ].join('-') +
    ' ' +
    hora
  );
}

  
}
