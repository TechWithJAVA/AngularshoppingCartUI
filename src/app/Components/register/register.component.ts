import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   registerForm:  FormGroup;
   submitted = false;
   
  constructor(private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.createForm();
     }

  ngOnInit(): void {
  }
  createForm() {
    this.registerForm = this.formBuilder.group({
      mobile:[9, [Validators.required, Validators.minLength(10)]] ,
      username: ['', Validators.required],
      password:['', [Validators.required, Validators.minLength(6)]],
      name:['', Validators.required],
      lastname:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      active: [false, Validators.requiredTrue],
      usertype: 'user'
    });
  }
  register(): void {

    this.apiService.register(this.registerForm.value).
      subscribe(res => {
        if (res.status == "400") {
          alert(res.message);
          console.log("Details cannot be empty");
        } else {
          alert(res.message);
          this.router.navigate(['/login']);
        }
      },
        err => {
          alert("An error has occured, Please try again !!!");
        });
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}
}
