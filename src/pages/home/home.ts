import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders} from '@angular/common/http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    constructor(public navCtrl: NavController, public http: HttpClient) {
    }

    pinOn24() {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Basic YWRtaW46RnJhZ2dsZVN0aWNrQ2Fy');

      this.http.get("http://192.168.0.31/rpiapi/activate/24", {headers:headers})
      .subscribe(response => response)
    }
    pinOff24() {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Basic YWRtaW46RnJhZ2dsZVN0aWNrQ2Fy');

      this.http.get("http://192.168.0.31/rpiapi/deactivate/24", {headers:headers})
      .subscribe(response => response)
    }

}
