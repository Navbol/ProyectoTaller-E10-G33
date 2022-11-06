import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Revision} from './revision.model';

@model()
export class Repuesto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  referencia: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Revision, {name: 'revisions'})
  idRevision: string;

  constructor(data?: Partial<Repuesto>) {
    super(data);
  }
}

export interface RepuestoRelations {
  // describe navigational properties here
}

export type RepuestoWithRelations = Repuesto & RepuestoRelations;
