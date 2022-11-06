import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Revision,
  Mecanico,
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionMecanicoController {
  constructor(
    @repository(RevisionRepository)
    public revisionRepository: RevisionRepository,
  ) { }

  @get('/revisions/{id}/mecanico', {
    responses: {
      '200': {
        description: 'Mecanico belonging to Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mecanico)},
          },
        },
      },
    },
  })
  async getMecanico(
    @param.path.string('id') id: typeof Revision.prototype.idRevision,
  ): Promise<Mecanico> {
    return this.revisionRepository.mecanicos(id);
  }
}
