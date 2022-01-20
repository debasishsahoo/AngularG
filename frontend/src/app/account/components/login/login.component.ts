import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountserviceService } from '../../services/accountservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: any = null;

  constructor(private authService: AccountserviceService) { }

  ngOnInit(): void {
    this.error= null;
    this.authService.err.subscribe((err)=>{this.error=err,this.isLoading=false})
    
  }
  onSubmit(form: NgForm) {
    this.isLoading=true;
    if (form.invalid) {
      return;
    }
    const formData:any={
      email: form.value.email,
      password: form.value.password,
    };
    this.authService.signIn(formData.email, formData.password)
    form.reset()
  }
  


}
