import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationInterface } from '../interfaces/notification.interface';

@Component({
  selector: 'exp-modal',
  templateUrl: './close-modal.component.html',
  styleUrls: ['./close-modal.component.scss']
})
export class CloseModalComponent implements OnInit {

  @Input() public modalConfig: NotificationInterface;
  @Input() public filteredFilmId: number;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) { }

  public ngOnInit(): void {

    this.modalConfig.confirm$.subscribe((confirmed: boolean) => {
      console.log('confirmed: ', confirmed);

      if (confirmed) {
        // hide film forever
        const hiddenFilms = [];
        hiddenFilms.push(this.filteredFilmId);

        localStorage.setItem('filteredFilmsId', JSON.stringify(hiddenFilms));
      }
    });

  }

  public close(): void {
    this.renderer.addClass(this.el.nativeElement.children[0], 'exp-modal-destroy');
  }

  public acceptHide(): void {

    this.close();

    this.modalConfig.confirm$.next(true);
    this.router.navigate(['/main']);
  }
}
