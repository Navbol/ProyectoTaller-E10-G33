import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Revision, Propietario} from '../models';
import {RevisionRepository} from './revision.repository';
import {PropietarioRepository} from './propietario.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.placa,
  VehiculoRelations
> {

  public readonly revisions: HasManyRepositoryFactory<Revision, typeof Vehiculo.prototype.placa>;

  public readonly propietarios: BelongsToAccessor<Propietario, typeof Vehiculo.prototype.placa>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.propietarios = this.createBelongsToAccessorFor('propietarios', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietarios', this.propietarios.inclusionResolver);
    this.revisions = this.createHasManyRepositoryFactoryFor('revisions', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisions', this.revisions.inclusionResolver);
  }
}
