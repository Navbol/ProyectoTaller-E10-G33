import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Sede, Notificacion, Vehiculo} from '../models';
import {SedeRepository} from './sede.repository';
import {NotificacionRepository} from './notificacion.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.idPropietario,
  PropietarioRelations
> {

  public readonly sedes: BelongsToAccessor<Sede, typeof Propietario.prototype.idPropietario>;

  public readonly notificacions: HasManyRepositoryFactory<Notificacion, typeof Propietario.prototype.idPropietario>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Propietario.prototype.idPropietario>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('NotificacionRepository') protected notificacionRepositoryGetter: Getter<NotificacionRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Propietario, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.notificacions = this.createHasManyRepositoryFactoryFor('notificacions', notificacionRepositoryGetter,);
    this.registerInclusionResolver('notificacions', this.notificacions.inclusionResolver);
    this.sedes = this.createBelongsToAccessorFor('sedes', sedeRepositoryGetter,);
    this.registerInclusionResolver('sedes', this.sedes.inclusionResolver);
  }
}
