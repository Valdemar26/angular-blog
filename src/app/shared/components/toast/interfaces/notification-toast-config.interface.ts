import {NotificationPositionEnum} from '../enum/notification-position.enum';
import {NotificationTypeEnum} from '../enum/notification-type.enum';


export interface NotificationToastConfigInterface {
  duration?: number;
  position?: NotificationPositionEnum;
  notificationType?: NotificationTypeEnum;
  hideOnClick?: boolean;
  keepOnHover?: boolean;
  icon?: {
    src: string;
    alt: string;
  };
  actionButton?: {
    label: string;
    action?: () => void
  };
  closeButton?: {
    image: {
      src: string;
      alt: string;
    }
  };
  maxStackSize?: number;
}
