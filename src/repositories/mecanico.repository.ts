import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mecanico, MecanicoRelations, Sede, Revision} from '../models';
import {SedeRepository} from './sede.repository';
import {RevisionRepository} from './revision.repository';

export class MecanicoRepository extends DefaultCrudRepository<
  Mecanico,
  typeof Mecanico.prototype.idMecanico,
  MecanicoRelations
> {

  public readonly sedes: BelongsToAccessor<Sede, typeof Mecanico.prototype.idMecanico>;

  public readonly revisions: HasManyRepositoryFactory<Revision, typeof Mecanico.prototype.idMecanico>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Mecanico, dataSource);
    this.revisions = this.createHasManyRepositoryFactoryFor('revisions', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisions', this.revisions.inclusionResolver);
    this.sedes = this.createBelongsToAccessorFor('sedes', sedeRepositoryGetter,);
    this.registerInclusionResolver('sedes', this.sedes.inclusionResolver);
  }
}
