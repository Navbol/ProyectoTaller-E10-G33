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
  Sede,
  Jefeoperacion,
} from '../models';
import {SedeRepository} from '../repositories';

export class SedeJefeoperacionController {
  constructor(
    @repository(SedeRepository) protected sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/jefeoperacions', {
    responses: {
      '200': {
        description: 'Array of Sede has many Jefeoperacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jefeoperacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Jefeoperacion>,
  ): Promise<Jefeoperacion[]> {
    return this.sedeRepository.jefeoperacions(id).find(filter);
  }

  @post('/sedes/{id}/jefeoperacions', {
    responses: {
      '200': {
        description: 'Sede model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jefeoperacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sede.prototype.idSede,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jefeoperacion, {
            title: 'NewJefeoperacionInSede',
            exclude: ['idJefeoperacion'],
            optional: ['idSede']
          }),
        },
      },
    }) jefeoperacion: Omit<Jefeoperacion, 'idJefeoperacion'>,
  ): Promise<Jefeoperacion> {
    return this.sedeRepository.jefeoperacions(id).create(jefeoperacion);
  }

  @patch('/sedes/{id}/jefeoperacions', {
    responses: {
      '200': {
        description: 'Sede.Jefeoperacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jefeoperacion, {partial: true}),
        },
      },
    })
    jefeoperacion: Partial<Jefeoperacion>,
    @param.query.object('where', getWhereSchemaFor(Jefeoperacion)) where?: Where<Jefeoperacion>,
  ): Promise<Count> {
    return this.sedeRepository.jefeoperacions(id).patch(jefeoperacion, where);
  }

  @del('/sedes/{id}/jefeoperacions', {
    responses: {
      '200': {
        description: 'Sede.Jefeoperacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Jefeoperacion)) where?: Where<Jefeoperacion>,
  ): Promise<Count> {
    return this.sedeRepository.jefeoperacions(id).delete(where);
  }
}
