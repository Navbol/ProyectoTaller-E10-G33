import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Repuesto, RepuestoRelations, Revision} from '../models';
import {RevisionRepository} from './revision.repository';

export class RepuestoRepository extends DefaultCrudRepository<
  Repuesto,
  typeof Repuesto.prototype.referencia,
  RepuestoRelations
> {

  public readonly revisions: BelongsToAccessor<Revision, typeof Repuesto.prototype.referencia>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Repuesto, dataSource);
    this.revisions = this.createBelongsToAccessorFor('revisions', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisions', this.revisions.inclusionResolver);
  }
}
