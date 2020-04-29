import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders} from '@angular/common/http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  private connectionReady = false;

    constructor(public navCtrl: NavController, public http: HttpClient) {
      this.checkConnection();
    }

    checkConnection() {
      this.http.get("http://192.168.0.31/rpiapi")
      .subscribe(response => {
        if(response) {
          this.connectionReady = true;
        } 
      });
    }

    //  Lights section
    pinOn7() {
      this.http.get("http://192.168.0.31/rpiapi/activate/7")
      .subscribe(response => response)
    }
    pinOff7() {
      this.http.get("http://192.168.0.31/rpiapi/deactivate/7")
      .subscribe(response => response)
    }

    //  Fans section
    fanLow() {
      this.http.get("http://192.168.0.31/rpiapi/deactivate/15")
      .subscribe(response => {
        if(response === 0) {
          this.http.get("http://192.168.0.31/rpiapi/deactivate/13")
          .subscribe(response => {
            if(response === 0) {
              this.http.get("http://192.168.0.31/rpiapi/activate/11")
              .subscribe(response => console.log('response pin 11 low', response));
            }
          });
        }
      });
    }
   
    fanMedium() {
      this.http.get("http://192.168.0.31/rpiapi/deactivate/15")
      .subscribe(response => {
        if(response === 0) {
          this.http.get("http://192.168.0.31/rpiapi/activate/11")
          .subscribe(response => console.log('response pin 11 medium', response));
          this.http.get("http://192.168.0.31/rpiapi/activate/13")
          .subscribe(response => console.log('response pin 13 medium', response));
        }
      });
    }
    
    fanHigh() {
      this.http.get("http://192.168.0.31/rpiapi/deactivate/11")
      .subscribe(response => {
        if(response === 0) {
          this.http.get("http://192.168.0.31/rpiapi/deactivate/13")
          .subscribe(response => {
            if(response === 0) {
              this.http.get("http://192.168.0.31/rpiapi/activate/15")
              .subscribe(response => console.log('response pin 15 high', response));
            }
          });
        }
      });
    }

    allFanPinsOff() {
      this.http.get("http://192.168.0.31/rpiapi/deactivate/15")
      .subscribe(response => console.log('response pin 15 fan off', response))
      this.http.get("http://192.168.0.31/rpiapi/deactivate/13")
      .subscribe(response => console.log('response pin 13 fan off', response))
      this.http.get("http://192.168.0.31/rpiapi/deactivate/11")
      .subscribe(response => console.log('response pin 11 fan off', response))
    }

}
