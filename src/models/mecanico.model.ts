import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Sede} from './sede.model';
import {Revision} from './revision.model';

@model()
export class Mecanico extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idMecanico: string;

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

  @hasMany(() => Revision, {keyTo: 'idMecanico'})
  revisions: Revision[];

  constructor(data?: Partial<Mecanico>) {
    super(data);
  }
}

export interface MecanicoRelations {
  // describe navigational properties here
}

export type MecanicoWithRelations = Mecanico & MecanicoRelations;
