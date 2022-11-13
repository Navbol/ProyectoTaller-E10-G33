import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from '../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { forkJoin, switchMap } from 'rxjs';
import { map } from 'rxjs/operators'


@Component({
  selector: 'app-crud-mecanicos',
  templateUrl: './crud-mecanicos.component.html',
  styleUrls: ['./crud-mecanicos.component.scss']
})
export class CrudMecanicosComponent implements OnInit {
  modeForm = 'adicion';
  dataSedes: any = [];
  dataSource: any = [];
  newObject: any = [];
  newArr: any = [];
  
  displayedColumns: string[] = [ 'idMecanico','nombre', 'apellido', 'telefono','fechaNacimiento'];
  columnas=[
    {titulo: "Cedula", name: "idMecanico",width: 15},
    {titulo: "Nombre", name: "nombre",width: 15},
    {titulo: "Apellido", name: "apellido",width: 15},
    {titulo: "Teléfono", name: "telefono",width: 15},
    {titulo: "Fecha de Nacimiento", name: "fechaNacimiento",width: 15}
  ];

  showForm = false; 
  formMecanico: FormGroup = new FormGroup({});
  result: any;
  constructor(private servicioBackend: RequestBackendService, private fb: FormBuilder) {
     this.formMecanico = this.fb.group({
        idMecanico:[''],
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
    this.getAllMecanicos();
    this.getAllSedes();
    this.getSedeId('63620422646a1a82d8b7a977');
    this.getSede('1');
  }




  getSede(id: string): void {
    //this.servicioBackend.parallelRequests('mecanicos','sedes')
    
    this.servicioBackend.getTable1AndTable2('mecanicos','sedes').subscribe(
      (data) => {

  

        const [mecanicos, sedes] = data;
        console.log(typeof(sedes));
        console.log(sedes);

        // for(let i=0; i<mecanicos.length; i++){
        //   this.newArr.push(mecanicos[i]);
        //   alert(this.newArr);
        //   let mecanico:Array<any> = [this.newArr];
        //   alert(mecanico);
        //   // for(let j=0; i<this.newArr.length; i++){
        //   //   console.log(this.newArr[j])
        //   //   alert(this.newArr[j]);
        //   // }

        // }

        console.log(this.newArr); //use i instead of 0
      //   for (var i = 0; i < data.length; i++) { 
      //     for (var x = 0; x < data[i].length; x++) { 
      //         newObject[data[i][x][0]] = data[i][x][1];
      //     }
      //     newArr.push(newObject);
      //     newObject = {};
      // }

        console.log(data);
        //return data;
      },

      (error) => {
        console.log('Error: ' + error);
      }
    );

  }

  // getXXX(id: string): void {
  //   forkJoin([this.getAllMecanicos(), this.getAllSedes()]).subscribe(
  //     ([dataSource, dataSedes]) => {
  //       this.result = dataSource.map((dataSource) => ({
  //         name: dataSource.name,
  //         dataSedes: dataSedes.find((h) => h.id === dataSource.idSede).nombre,

  //       })

  //       );

  //     }
  //   );
  //   return result
  // }


  getSedeId(code: string): void {
    this.servicioBackend.getDataID('sedes',code).subscribe(
      (data) => {
        console.log(data.nombre);
        return data.nombre;
      },

      (error) => {
        console.log('Error: ' + error);
      }
    );
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

  async getAllMecanicos() {
    //this.dataSource = ELEMENT_DATA;
    this.servicioBackend.getData('mecanicos').subscribe(
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

  // async getAllData() {
  //   forkJoin([this.getAllMecanicos(), this.getAllSedes()]).subscribe(
  //     ([dataSource, dataSedes]) => {
  //       this.result = dataSource.map((mecanico) => ({
  //         name: mecanico.nombre,
  //         dataSedes: dataSedes.find((h) => h.id === mecanico.idSede).nombre,
  //       }));
  //     }
  //   );
  // }


  deleteMecanico(code: string): void {
    console.log(code);

    Swal.fire({
      title: '¿Está seguro de eliminar el usuario?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioBackend.deleteData('mecanicos', code).subscribe({
          next: (data) => {
            this.getAllMecanicos();
            Swal.fire('Ok!', 'Eliminado', 'success');
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Usuario NO eliminado', 'Ocurrió un error', 'error');
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

  saveUser(): void {
    const datosUser = this.formMecanico.getRawValue();
    datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);

    console.log(datosUser);

    this.servicioBackend
      .postData('mecanicos', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getAllMecanicos();
          Swal.fire(
            'Usuario creado',
            'Todo ha salido muy bien con la creación del usuario',
            'success'
          );
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Usuario NO creado', 'Ocurrió un error', 'error');
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
  updateUser(): void {}

}

function forkJoined(): any {
  throw new Error('Function not implemented.');
}
