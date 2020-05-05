import { Component, OnInit } from '@angular/core';
import { User, Password } from 'shared/user';
import { AuthService } from '../auth.service';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import {Router} from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  biometricLogin:boolean = true
  pass:Password={data:'',type:'facedata',faceData:''}
  loginUser:User = {username:'',password:this.pass};
  public actualImage = null;
  public webcamImage: WebcamImage = null;

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.actualImage = webcamImage.imageAsBase64;
    this.pass.faceData = this.actualImage
    console.log("webcamImage::")
  }


  constructor(private authService:AuthService,
    private _router:Router) { }

  ngOnInit(): void {
  }

  authLogin(){
    this.authService.login(this.loginUser)
    .subscribe((resp)=>{
      console.log("from subscribe login ",resp)
      localStorage.setItem('token',resp.access_token)
      this._router.navigate(['/success'])
    })
    console.log(this.loginUser)
  }

}
