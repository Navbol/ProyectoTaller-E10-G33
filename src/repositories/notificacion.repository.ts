import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Notificacion, NotificacionRelations, Propietario} from '../models';
import {PropietarioRepository} from './propietario.repository';

export class NotificacionRepository extends DefaultCrudRepository<
  Notificacion,
  typeof Notificacion.prototype.idMensaje,
  NotificacionRelations
> {

  public readonly propietarios: BelongsToAccessor<Propietario, typeof Notificacion.prototype.idMensaje>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(Notificacion, dataSource);
    this.propietarios = this.createBelongsToAccessorFor('propietarios', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietarios', this.propietarios.inclusionResolver);
  }
}
