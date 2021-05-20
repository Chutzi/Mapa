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
  systemDark: MediaQueryList;

  constructor(public photo : CameraService) {
    this.photo.loadPhoto();
  }
  ngOnInit(): void {
    
    
  }

  onClick(event){
    this.systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    this.systemDark.addListener(this.colorTest);
    if(event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
    }
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');		
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }


}
