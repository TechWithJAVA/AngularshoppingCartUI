import { ApiService } from 'src/app/Service/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = false;
  usertype: string;
  constructor(private apiService: ApiService, private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      mobile: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.loginForm.value);
    debugger;
    this.apiService.userLogin(this.loginForm.value).

      subscribe(res => {

        if (res.status == "200" && res.userType == "user") {
          this.router.navigate(['/home']);
          this.error = false;
        } else if (res.status == "200" && res.userType == "admin") {
          this.apiService.adminLogin(this.loginForm.value).
            subscribe(res => {
             // if (res.status == "200" && res.userType == "admin") {
                this.router.navigate(['/admin']);
             // } else {
              //  this.router.navigate(['/login']);
             // }
              this.error = false;
            }
            );
        }else {
          this.router.navigate(['/login']);
        }
        // else if (res.status == "500") {
        //   this.apiService.adminLogin(this.loginForm.value).
        //     subscribe(res => {
        //       if (res.status == "200" && res.userType == "admin") {
        //         this.router.navigate(['/admin']);
        //       } else {
        //         this.router.navigate(['/login']);
        //       }
        //       this.error = false;
        //     }, err => {
        //       console.log(err);
        //     }
        //     );
        // }
      },
        err => {
          console.log(err);
        });
  }
}