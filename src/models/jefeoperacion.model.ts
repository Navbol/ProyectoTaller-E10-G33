import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Sede} from './sede.model';

@model()
export class Jefeoperacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idJefeoperacion: string;

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

  constructor(data?: Partial<Jefeoperacion>) {
    super(data);
  }
}

export interface JefeoperacionRelations {
  // describe navigational properties here
}

export type JefeoperacionWithRelations = Jefeoperacion & JefeoperacionRelations;
