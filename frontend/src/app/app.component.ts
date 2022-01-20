import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountserviceService } from './account/services/accountservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public router: Router,

    private accountService: AccountserviceService
  ) {}
  title = 'frontend';
  ngOnInit(): void {
    this.accountService.autoAuthUser();
  }
}
