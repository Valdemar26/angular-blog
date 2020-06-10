import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // TODO rewrite on Renderer2 and Angular way
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
  }

  ngOnInit() {
  }

  toAdminPage() {
    this.router.navigate(['/admin', 'login']);
  }

}
