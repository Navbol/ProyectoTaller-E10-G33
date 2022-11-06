import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Mecanico} from './mecanico.model';
import {Revision} from './revision.model';
import {Propietario} from './propietario.model';
import {Jefeoperacion} from './jefeoperacion.model';

@model()
export class Sede extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idSede: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
  })
  direccion?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @hasMany(() => Mecanico, {keyTo: 'idSede'})
  mecanicos: Mecanico[];

  @hasMany(() => Revision, {keyTo: 'idSede'})
  revisions: Revision[];

  @hasMany(() => Propietario, {keyTo: 'idSede'})
  propietarios: Propietario[];

  @hasMany(() => Jefeoperacion, {keyTo: 'idSede'})
  jefeoperacions: Jefeoperacion[];

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
