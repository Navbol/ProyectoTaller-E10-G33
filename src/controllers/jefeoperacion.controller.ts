import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Jefeoperacion} from '../models';
import {JefeoperacionRepository} from '../repositories';

export class JefeoperacionController {
  constructor(
    @repository(JefeoperacionRepository)
    public jefeoperacionRepository : JefeoperacionRepository,
  ) {}

  @post('/jefeoperacions')
  @response(200, {
    description: 'Jefeoperacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Jefeoperacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jefeoperacion, {
            title: 'NewJefeoperacion',
            
          }),
        },
      },
    })
    jefeoperacion: Jefeoperacion,
  ): Promise<Jefeoperacion> {
    return this.jefeoperacionRepository.create(jefeoperacion);
  }

  @get('/jefeoperacions/count')
  @response(200, {
    description: 'Jefeoperacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Jefeoperacion) where?: Where<Jefeoperacion>,
  ): Promise<Count> {
    return this.jefeoperacionRepository.count(where);
  }

  @get('/jefeoperacions')
  @response(200, {
    description: 'Array of Jefeoperacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jefeoperacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Jefeoperacion) filter?: Filter<Jefeoperacion>,
  ): Promise<Jefeoperacion[]> {
    return this.jefeoperacionRepository.find(filter);
  }

  @patch('/jefeoperacions')
  @response(200, {
    description: 'Jefeoperacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jefeoperacion, {partial: true}),
        },
      },
    })
    jefeoperacion: Jefeoperacion,
    @param.where(Jefeoperacion) where?: Where<Jefeoperacion>,
  ): Promise<Count> {
    return this.jefeoperacionRepository.updateAll(jefeoperacion, where);
  }

  @get('/jefeoperacions/{id}')
  @response(200, {
    description: 'Jefeoperacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Jefeoperacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Jefeoperacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Jefeoperacion>
  ): Promise<Jefeoperacion> {
    return this.jefeoperacionRepository.findById(id, filter);
  }

  @patch('/jefeoperacions/{id}')
  @response(204, {
    description: 'Jefeoperacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jefeoperacion, {partial: true}),
        },
      },
    })
    jefeoperacion: Jefeoperacion,
  ): Promise<void> {
    await this.jefeoperacionRepository.updateById(id, jefeoperacion);
  }

  @put('/jefeoperacions/{id}')
  @response(204, {
    description: 'Jefeoperacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() jefeoperacion: Jefeoperacion,
  ): Promise<void> {
    await this.jefeoperacionRepository.replaceById(id, jefeoperacion);
  }

  @del('/jefeoperacions/{id}')
  @response(204, {
    description: 'Jefeoperacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.jefeoperacionRepository.deleteById(id);
  }
}
