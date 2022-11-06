import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Propietario} from './propietario.model';

@model()
export class Notificacion extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idMensaje: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Propietario, {name: 'propietarios'})
  idPropietario: string;

  constructor(data?: Partial<Notificacion>) {
    super(data);
  }
}

export interface NotificacionRelations {
  // describe navigational properties here
}

export type NotificacionWithRelations = Notificacion & NotificacionRelations;
