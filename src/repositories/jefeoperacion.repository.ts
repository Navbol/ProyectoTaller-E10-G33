import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Jefeoperacion, JefeoperacionRelations, Sede} from '../models';
import {SedeRepository} from './sede.repository';

export class JefeoperacionRepository extends DefaultCrudRepository<
  Jefeoperacion,
  typeof Jefeoperacion.prototype.idJefeoperacion,
  JefeoperacionRelations
> {

  public readonly sedes: BelongsToAccessor<Sede, typeof Jefeoperacion.prototype.idJefeoperacion>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>,
  ) {
    super(Jefeoperacion, dataSource);
    this.sedes = this.createBelongsToAccessorFor('sedes', sedeRepositoryGetter,);
    this.registerInclusionResolver('sedes', this.sedes.inclusionResolver);
  }
}
