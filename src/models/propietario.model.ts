import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Sede} from './sede.model';
import {Notificacion} from './notificacion.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Propietario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idPropietario: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
  })
  telefono?: string;

  @property({
    type: 'date',
  })
  fechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  @belongsTo(() => Sede, {name: 'sedes'})
  idSede: string;

  @hasMany(() => Notificacion, {keyTo: 'idPropietario'})
  notificacions: Notificacion[];

  @hasMany(() => Vehiculo, {keyTo: 'idPropietario'})
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Propietario>) {
    super(data);
  }
}

export interface PropietarioRelations {
  // describe navigational properties here
}

export type PropietarioWithRelations = Propietario & PropietarioRelations;
