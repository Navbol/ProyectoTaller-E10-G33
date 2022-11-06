import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sede, SedeRelations, Mecanico, Revision, Propietario, Jefeoperacion} from '../models';
import {MecanicoRepository} from './mecanico.repository';
import {RevisionRepository} from './revision.repository';
import {PropietarioRepository} from './propietario.repository';
import {JefeoperacionRepository} from './jefeoperacion.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.idSede,
  SedeRelations
> {

  public readonly mecanicos: HasManyRepositoryFactory<Mecanico, typeof Sede.prototype.idSede>;

  public readonly revisions: HasManyRepositoryFactory<Revision, typeof Sede.prototype.idSede>;

  public readonly propietarios: HasManyRepositoryFactory<Propietario, typeof Sede.prototype.idSede>;

  public readonly jefeoperacions: HasManyRepositoryFactory<Jefeoperacion, typeof Sede.prototype.idSede>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MecanicoRepository') protected mecanicoRepositoryGetter: Getter<MecanicoRepository>, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('JefeoperacionRepository') protected jefeoperacionRepositoryGetter: Getter<JefeoperacionRepository>,
  ) {
    super(Sede, dataSource);
    this.jefeoperacions = this.createHasManyRepositoryFactoryFor('jefeoperacions', jefeoperacionRepositoryGetter,);
    this.registerInclusionResolver('jefeoperacions', this.jefeoperacions.inclusionResolver);
    this.propietarios = this.createHasManyRepositoryFactoryFor('propietarios', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietarios', this.propietarios.inclusionResolver);
    this.revisions = this.createHasManyRepositoryFactoryFor('revisions', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisions', this.revisions.inclusionResolver);
    this.mecanicos = this.createHasManyRepositoryFactoryFor('mecanicos', mecanicoRepositoryGetter,);
    this.registerInclusionResolver('mecanicos', this.mecanicos.inclusionResolver);
  }
}
