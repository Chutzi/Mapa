import { CameraPhoto } from '@capacitor/core';
import { CameraService, Photo } from './../camera/camera.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  pic : Photo;
  constructor(public photo : CameraService) {
    this.photo.loadPhoto();
  }
  ngOnInit(): void {

  }


}
