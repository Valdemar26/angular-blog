import { Component, Input, ElementRef, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

import { NotificationInterface } from './interfaces/notification.interface';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent implements OnInit, OnDestroy {

  @Input() public notification: NotificationInterface;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {
  }

  public ngOnInit(): void {
    console.log('notification: ', this.notification);
  }

  public close(): void {
    this.renderer.addClass(this.el.nativeElement.children[0], 'exp-notification-toast-destroy');
  }

  public ngOnDestroy(): void {

  }


}
