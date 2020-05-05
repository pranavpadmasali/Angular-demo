import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router'
import { User,Password } from 'shared/user';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  pass:Password={data:'',type:'password',faceData:''}
  registeredUser:User= {username:'',password:this.pass};

  public actualImage = null;
  public webcamImage: WebcamImage = null;

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.actualImage = webcamImage.imageAsBase64;
    this.pass.faceData = this.actualImage
    console.log("webcamImage::",)
  }

  constructor(private authService:AuthService,
    private _router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    console.log(this.registeredUser)
    this.authService.register(this.registeredUser)
    .subscribe((resp)=>{
      console.log("from subscribe register",resp)
      this._router.navigate(['/login'])
    })
  }

}
