import {Component, ElementRef, HostListener, OnInit, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild('progressBar', { static: true }) progressBar: ElementRef;
  constructor(
    private router: Router,
    private renderer: Renderer2
  ) { }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    this.renderer.setStyle(this.progressBar.nativeElement, 'width', `${scrolled}%`);
  }

  ngOnInit() {
  }

  toAdminPage() {
    this.router.navigate(['/admin', 'login']);
  }

}
