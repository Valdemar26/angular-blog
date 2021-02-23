import { Injectable, ApplicationRef, ComponentFactoryResolver,
  ComponentRef, Injector, Renderer2, RendererFactory2
} from '@angular/core';

import { NotificationInterface } from '../interfaces/notification.interface';
import { ToastComponent } from '../toast.component';
import { CloseModalComponent } from '../close-modal/close-modal.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private renderer: Renderer2;
  componentRef: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
    private resolver: ComponentFactoryResolver,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public showToast(toastContainer, config): void {
    toastContainer.clear();
    const factory = this.resolver.resolveComponentFactory(ToastComponent);
    this.componentRef = toastContainer.createComponent(factory);

    this.componentRef.instance.notification = config;
  }

  public showModal(modalContainer, config, id?): void {

    modalContainer.clear();
    const factory = this.resolver.resolveComponentFactory(CloseModalComponent);
    this.componentRef = modalContainer.createComponent(factory);

    this.componentRef.instance.modalConfig = config;
    this.componentRef.instance.filteredFilmId = id;
  }

  public removeToast(notification: NotificationInterface): void {
    console.log('removeToast');
  }
}
