import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountserviceService } from '../../services/accountservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: any = null;

  constructor(private authService: AccountserviceService) { }

  ngOnInit(): void {
    this.error= null;
    this.authService.err.subscribe((err)=>{this.error=err,this.isLoading=false})
    
  }
  onSignUp(form: NgForm) {
    this.isLoading=true;
    if (form.invalid) {
      return;
    }
    const formData:any={
      name: form.value.name,
      email: form.value.email,
      mobile: form.value.mobile,
      password: form.value.password,
      join_time: new Date(),

    };
    console.table(formData)
    this.authService.signUp(formData)
    form.reset()
  }
  

}
