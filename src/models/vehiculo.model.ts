import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Revision} from './revision.model';
import {Propietario} from './propietario.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
  })
  tipo?: string;

  @property({
    type: 'string',
  })
  linea?: string;

  @property({
    type: 'string',
    required: true,
  })
  cilindraje: string;

  @property({
    type: 'number',
    required: true,
  })
  modelo: number;

  @property({
    type: 'number',
  })
  capacidad?: number;

  @hasMany(() => Revision, {keyTo: 'placa'})
  revisions: Revision[];

  @belongsTo(() => Propietario, {name: 'propietarios'})
  idPropietario: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
