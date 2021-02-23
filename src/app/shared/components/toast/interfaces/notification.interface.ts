import { ModalTypeEnum, NotificationTypeEnum } from '../enum/notification-type.enum';

import { Subject } from 'rxjs';

export interface NotificationInterface {
  title: any;
  text: string;
  notificationType?: NotificationTypeEnum.Error;
  modalType?: ModalTypeEnum.Error;
  icon: any;
  confirm$?: Subject<boolean>;
}
