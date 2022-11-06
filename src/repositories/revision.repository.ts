import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Revision, RevisionRelations, Mecanico, Sede, Vehiculo, Repuesto} from '../models';
import {MecanicoRepository} from './mecanico.repository';
import {SedeRepository} from './sede.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {RepuestoRepository} from './repuesto.repository';

export class RevisionRepository extends DefaultCrudRepository<
  Revision,
  typeof Revision.prototype.idRevision,
  RevisionRelations
> {

  public readonly mecanicos: BelongsToAccessor<Mecanico, typeof Revision.prototype.idRevision>;

  public readonly sedes: BelongsToAccessor<Sede, typeof Revision.prototype.idRevision>;

  public readonly vehiculos: BelongsToAccessor<Vehiculo, typeof Revision.prototype.idRevision>;

  public readonly repuestos: HasManyRepositoryFactory<Repuesto, typeof Revision.prototype.idRevision>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MecanicoRepository') protected mecanicoRepositoryGetter: Getter<MecanicoRepository>, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('RepuestoRepository') protected repuestoRepositoryGetter: Getter<RepuestoRepository>,
  ) {
    super(Revision, dataSource);
    this.repuestos = this.createHasManyRepositoryFactoryFor('repuestos', repuestoRepositoryGetter,);
    this.registerInclusionResolver('repuestos', this.repuestos.inclusionResolver);
    this.vehiculos = this.createBelongsToAccessorFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.sedes = this.createBelongsToAccessorFor('sedes', sedeRepositoryGetter,);
    this.registerInclusionResolver('sedes', this.sedes.inclusionResolver);
    this.mecanicos = this.createBelongsToAccessorFor('mecanicos', mecanicoRepositoryGetter,);
    this.registerInclusionResolver('mecanicos', this.mecanicos.inclusionResolver);
  }
}
