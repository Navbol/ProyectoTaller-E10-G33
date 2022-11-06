import {Entity, model, property, hasMany, belongsTo, hasOne} from '@loopback/repository';
import {Mecanico} from './mecanico.model';
import {Sede} from './sede.model';
import {Vehiculo} from './vehiculo.model';
import {Repuesto} from './repuesto.model';

@model()
export class Revision extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idRevision: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'date',
    required: true,
  })
  hora: string;

  @belongsTo(() => Mecanico, {name: 'mecanicos'})
  idMecanico: string;

  @belongsTo(() => Sede, {name: 'sedes'})
  idSede: string;

  @belongsTo(() => Vehiculo, {name: 'vehiculos'})
  placa: string;

  @hasMany(() => Repuesto, {keyTo: 'idRevision'})
  repuestos: Repuesto[];

  constructor(data?: Partial<Revision>) {
    super(data);
  }
}

export interface RevisionRelations {
  // describe navigational properties here
}

export type RevisionWithRelations = Revision & RevisionRelations;
