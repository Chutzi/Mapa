import { GeoService } from './../map/geo.service';
import { LoginService } from './../loginServices/login.service';
import { CameraPhoto } from '@capacitor/core';
import { CameraService, Photo } from './../camera/camera.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  pic: Photo;
  systemDark: MediaQueryList;
  email = "";

  constructor(public photo: CameraService, public login : LoginService, public geo :GeoService) {
    this.photo.loadPhoto();
    this.login.getEmail().then(mail => {this.email = mail});
    //new
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
    //
  }
  ngOnInit(): void {}
  //nuevo
  darkMode: boolean = true;

  // funcion para cambiar el modo desde el toggle
  change() {
    this.darkMode = !this.darkMode;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches){
      document.body.classList.toggle('dark');
    }
  }
}
