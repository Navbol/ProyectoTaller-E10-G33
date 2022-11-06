import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Repuesto,
  Revision,
} from '../models';
import {RepuestoRepository} from '../repositories';

export class RepuestoRevisionController {
  constructor(
    @repository(RepuestoRepository)
    public repuestoRepository: RepuestoRepository,
  ) { }

  @get('/repuestos/{id}/revision', {
    responses: {
      '200': {
        description: 'Revision belonging to Repuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Revision)},
          },
        },
      },
    },
  })
  async getRevision(
    @param.path.string('id') id: typeof Repuesto.prototype.referencia,
  ): Promise<Revision> {
    return this.repuestoRepository.revisions(id);
  }
}
