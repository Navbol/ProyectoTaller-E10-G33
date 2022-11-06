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
  Revision,
} from '../models';
import {SedeRepository} from '../repositories';

export class SedeRevisionController {
  constructor(
    @repository(SedeRepository) protected sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/revisions', {
    responses: {
      '200': {
        description: 'Array of Sede has many Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Revision)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Revision>,
  ): Promise<Revision[]> {
    return this.sedeRepository.revisions(id).find(filter);
  }

  @post('/sedes/{id}/revisions', {
    responses: {
      '200': {
        description: 'Sede model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sede.prototype.idSede,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {
            title: 'NewRevisionInSede',
            exclude: ['idRevision'],
            optional: ['idSede']
          }),
        },
      },
    }) revision: Omit<Revision, 'idRevision'>,
  ): Promise<Revision> {
    return this.sedeRepository.revisions(id).create(revision);
  }

  @patch('/sedes/{id}/revisions', {
    responses: {
      '200': {
        description: 'Sede.Revision PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {partial: true}),
        },
      },
    })
    revision: Partial<Revision>,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.sedeRepository.revisions(id).patch(revision, where);
  }

  @del('/sedes/{id}/revisions', {
    responses: {
      '200': {
        description: 'Sede.Revision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.sedeRepository.revisions(id).delete(where);
  }
}
