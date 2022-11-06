import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Jefeoperacion,
  Sede,
} from '../models';
import {JefeoperacionRepository} from '../repositories';

export class JefeoperacionSedeController {
  constructor(
    @repository(JefeoperacionRepository)
    public jefeoperacionRepository: JefeoperacionRepository,
  ) { }

  @get('/jefeoperacions/{id}/sede', {
    responses: {
      '200': {
        description: 'Sede belonging to Jefeoperacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sede)},
          },
        },
      },
    },
  })
  async getSede(
    @param.path.string('id') id: typeof Jefeoperacion.prototype.idJefeoperacion,
  ): Promise<Sede> {
    return this.jefeoperacionRepository.sedes(id);
  }
}
