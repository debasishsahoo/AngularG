import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountserviceService } from '../account/services/accountservice.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  private authListenersSubs?: Subscription;
  private userId: any;
  userName: any;
  constructor(private accountService: AccountserviceService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.accountService.getIsAuth();
    this.authListenersSubs = this.accountService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      });
  }
  onSignOut() {
    this.accountService.signOut();
  }
  navbarCollapsed = true;

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
