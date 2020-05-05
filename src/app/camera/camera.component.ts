import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();
  @Output()
  public showWebcam = false;
  constructor() { }

  ngOnInit(): void {
  }

  
  public actualImage = null;
  public webcamImage: WebcamImage = null;
  public multipleWebcamsAvailable = false;
  private trigger: Subject<void> = new Subject<void>();


  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

    public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.pictureTaken.emit(webcamImage);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
