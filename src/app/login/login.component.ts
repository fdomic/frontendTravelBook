import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.services';
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: any = {
    name:"",
    email: "fdomic@gmail.com",
    password: "0000"
  };

  public isRight: boolean = false;

  constructor(  private apiService: ApiService,
    private router: Router,
    private message: NzMessageService) { 
    
    let token = localStorage.getItem("AUTH_TOKEN");
    if(token) {
     // this.router.navigate(['navigation']);
    }
  }

  ngOnInit() {}

	public onPanelChangeBtnClick(isRight: boolean): void {
		this.isRight = isRight;
  }

  public onSubmit(): any {

    return this.apiService.login(this.form.email, this.form.password).subscribe(
      response => {
        if(response && response.access_token) {
          localStorage.setItem("AUTH_TOKEN", response.access_token);
          this.createMessage("success");
        }
        this.router.navigate(['navigation']);
        this.form.email ="";
        this.form.password ="";
      },
      error => console.log(error,this.createMessage("error"))
    );
  }

  public onSubmitCreateUser(): any{
    return this.apiService.kreirajUsera(this.form.name,this.form.email, this.form.password).subscribe(
      response => {
        if(response ) {

          this.createMessage("success");
        }
      },
      error => console.log(error,this.createMessage("error"))
    );
  }

  public createMessage(type: string): void {
    if (type === "success") {
      this.message.create(type, `Uspjesno je prijavljen`);

    } else {
      this.message.create(type, `Netočni podatci.Probajte ponovo.`);
    }
  }

}

