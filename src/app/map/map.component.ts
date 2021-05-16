import { ContentModalComponent } from './content-modal/content-modal.component';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit {

  @Input() coords: { latitude: number; longitude: number };
  heatMap : google.maps.visualization.HeatmapLayer;
  map: google.maps.Map;
  userPositionDiv : any;

  constructor(private modalController : ModalController) {}

  ngOnInit() {
    console.log("on init");
    try {
      if(document.getElementById('map').innerHTML == "")
      {
        this.initMap();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async initMap() : Promise<void> {

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: new google.maps.LatLng(0, 0),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    );

    const moonMapType = new google.maps.ImageMapType({
      getTileUrl: function (coord, zoom): string {
        const normalizedCoord = getNormalizedCoord(coord, zoom);

        if (!normalizedCoord) {
          return "";
        }
        const bound = Math.pow(2, zoom);
        return (
          "http://c.tile.stamen.com/toner-background" +
          "/" +
          zoom +
          "/" +
          normalizedCoord.x +
          "/" +
          normalizedCoord.y +
          ".png"
        );
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 20,
      minZoom: 0,
      // @ts-ignore TODO(jpoehnelt) 'radius' does not exist in type 'ImageMapTypeOptions'
      radius: 1738000,
      name: "Moon",
    });

    this.map.mapTypes.set("moon", moonMapType);
    //this.map.setMapTypeId("moon");

    console.log("Map inited")
    google.maps.event.addListener(this.map, 'mousemove', function (event) {
      displayCoordinates(event.latLng);
    });

  }

  async mostrarModal()
  {
    const modal = await this.modalController.create({
      component : ContentModalComponent,
      cssClass : "shitModal"
    });
    return await modal.present();
  }

  panTo(lat : number, long : number)
  {
    console.log("Panned to : " + lat + "," + long)
    this.map.panTo(new google.maps.LatLng(lat, long));
  }

  updateHeatmap(heatmap : google.maps.visualization.HeatmapLayer)
  {
    if(heatmap != null)
    {
      this.heatMap = heatmap;
      console.log("Upadated heatmap");
      this.heatMap.setMap(this.map);
    }
  }
}

function displayCoordinates(pnt) {

  //console.log(pnt.lat() + "," + pnt.lng());
}

function getNormalizedCoord(coord: google.maps.Point, zoom: number) {
  const y = coord.y;
  let x = coord.x;

  // tile range in one direction range is dependent on zoom level
  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
  const tileRange = 1 << zoom;

  // don't repeat across y-axis (vertically)
  if (y < 0 || y >= tileRange) {
    return null;
  }

  // repeat across x-axis
  if (x < 0 || x >= tileRange) {
    x = ((x % tileRange) + tileRange) % tileRange;
  }

  return { x: x, y: y };
}
