import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Propietario,
  Notificacion,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioNotificacionController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Notificacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Notificacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Notificacion>,
  ): Promise<Notificacion[]> {
    return this.propietarioRepository.notificacions(id).find(filter);
  }

  @post('/propietarios/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notificacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.idPropietario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacion, {
            title: 'NewNotificacionInPropietario',
            exclude: ['idMensaje'],
            optional: ['idPropietario']
          }),
        },
      },
    }) notificacion: Omit<Notificacion, 'idMensaje'>,
  ): Promise<Notificacion> {
    return this.propietarioRepository.notificacions(id).create(notificacion);
  }

  @patch('/propietarios/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Propietario.Notificacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificacion, {partial: true}),
        },
      },
    })
    notificacion: Partial<Notificacion>,
    @param.query.object('where', getWhereSchemaFor(Notificacion)) where?: Where<Notificacion>,
  ): Promise<Count> {
    return this.propietarioRepository.notificacions(id).patch(notificacion, where);
  }

  @del('/propietarios/{id}/notificacions', {
    responses: {
      '200': {
        description: 'Propietario.Notificacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Notificacion)) where?: Where<Notificacion>,
  ): Promise<Count> {
    return this.propietarioRepository.notificacions(id).delete(where);
  }
}
