import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
const mediaQuery = '(max-width: 540px)';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  headerName: string = '';
  partnerLogo = environment.partnerLogo;
  isSmallScreen = false;
  isOpen = false;
  isprofileOpen = false;
  constructor(private breakpointObserver: BreakpointObserver, private elRef: ElementRef, private router: Router) {
  }
  ngOnInit(): void {
    this.breakpointObserver.observe([mediaQuery]).subscribe(state => {
      this.isSmallScreen = state.matches;
    });
  }


  toggleOffcanvas() {
    this.isOpen = !this.isOpen;
    const body = document.body;

    if (this.isOpen) {
      body.classList.add('notifications-open');
    } else {
      body.classList.remove('notifications-open');
    }
  }

  profilecanvas() {
    this.isprofileOpen = !this.isprofileOpen;
    // console.log('action performed');
    const body = document.body;
    if (this.isprofileOpen) {
      body.classList.add('profile-open');
    }
    else {
      body.classList.remove('profile-open');
    }
  }

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent) {
  //   const openButton = document.getElementById('openOffcanvas');

  //   // Check if the click event target is the open button
  //   if (event.target === openButton) {
  //     this.toggleOffcanvas();
  //     return;
  //   }

  //   if (this.isOpen) {
  //     const offcanvasElement = this.elRef.nativeElement.querySelector('.offcanvas');

  //     // Check if the click event target is not within the offcanvas menu
  //     if (offcanvasElement && !offcanvasElement.contains(event.target as Node)) {
  //       this.toggleOffcanvas();
  //     }
  //   }
  // }
  navigateToBatches() {
    const location = localStorage.getItem('slug');
    if (location) {
      this.router.navigateByUrl('/batches/' + location);
    }
    else {
      this.router.navigateByUrl('/locations');
    }

  }

}
