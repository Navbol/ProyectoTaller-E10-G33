import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Notificacion,
  Propietario,
} from '../models';
import {NotificacionRepository} from '../repositories';

export class NotificacionPropietarioController {
  constructor(
    @repository(NotificacionRepository)
    public notificacionRepository: NotificacionRepository,
  ) { }

  @get('/notificacions/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to Notificacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Notificacion.prototype.idMensaje,
  ): Promise<Propietario> {
    return this.notificacionRepository.propietarios(id);
  }
}
