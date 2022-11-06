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
  Sede,
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionSedeController {
  constructor(
    @repository(RevisionRepository)
    public revisionRepository: RevisionRepository,
  ) { }

  @get('/revisions/{id}/sede', {
    responses: {
      '200': {
        description: 'Sede belonging to Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sede)},
          },
        },
      },
    },
  })
  async getSede(
    @param.path.string('id') id: typeof Revision.prototype.idRevision,
  ): Promise<Sede> {
    return this.revisionRepository.sedes(id);
  }
}
