import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders} from '@angular/common/http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  private connectionReady = false;
  private lightState = "off";
  private fanState = "off";
  private pin15 = "off";
  private pin13 = "off";
  private pin11 = "off";

    constructor(public navCtrl: NavController, public http: HttpClient) {
      this.checkConnection();
    }

    // STATUS SECTION

    // connection status

    checkConnection() {
      this.http.get("http://192.168.0.31/rpiapi")
      .subscribe(response => {
        if(response) {
          this.connectionReady = true;
          this.checkStates();
        } 
      });
    }

    checkStates() {
      if(this.connectionReady) {
        this.checkLightState()
        this.checkFanState();
      } else {
        this.connectionReady = false;
      }
    }

    // light status

    checkLightState() {
      this.http.get("http://192.168.0.31/rpiapi/toggle/7")
      .subscribe(response => {
        if(response === 0) {
          this.lightState = "off"
        } else {
          this.lightState = "on"
        }
      });
    }

    // fan status

    checkFanState() {
      this.http.get("http://192.168.0.31/rpiapi/toggle/15")
      .subscribe(response => {
        if(response === 0) {
          this.pin15 = "off"
          this.checkFanPin13();
        } else {
          this.pin15 = "on"
          this.checkFanPin13();
        }
      });
    }

    checkFanPin13() {
      this.http.get("http://192.168.0.31/rpiapi/toggle/13")
      .subscribe(response => {
        if(response === 0) {
          this.pin13 = "off"
          this.checkFanPin11();
        } else {
          this.pin13 = "on"
          this.checkFanPin11();
        }
      });
    }

    checkFanPin11() {
      this.http.get("http://192.168.0.31/rpiapi/toggle/11")
      .subscribe(response => {
        if(response === 0) {
          this.pin11 = "off"
          this.determineFanState();
        } else {
          this.pin11 = "on"
          this.determineFanState();
        }
      });
    }

    determineFanState() {
      if(this.pin15 === "on" && (this.pin13 === "off" && this.pin11 === "off") ) {
        this.fanState = "high";
      } else if ((this.pin13 === "on" && this.pin11 === "on") && this.pin15 === "off") {
        this.fanState = "medium";
      } else if (this.pin11 === "on" && (this.pin13 === "off" && this.pin15 === "off")) {
        this.fanState = "low";
      } else if (this.pin15 === "off" && this.pin13 === "off" && this.pin11 === "off") {
        this.fanState = "off";
      } else {
        this.fanState = "unknown";
      }
    }

    // CONTROL SECTION

    // light control
    pinOn7() {
      this.http.get("http://192.168.0.31/rpiapi/activate/7")
      .subscribe(response => {
        if(response === 1) {
          this.checkStates();
        } 
      });
    }
    pinOff7() {
      this.http.get("http://192.168.0.31/rpiapi/deactivate/7")
      .subscribe(response => {
        if(response === 0) {
          this.checkStates();
        }
      });
    }

    // I should make it so if the response is not 0 connectionReady changes to false @DEBUG

    //  Fans control
    fanLow() {
      this.http.get("http://192.168.0.31/rpiapi/deactivate/15")
      .subscribe(response => {
        if(response === 0) {
          this.http.get("http://192.168.0.31/rpiapi/deactivate/13")
          .subscribe(response => {
            if(response === 0) {
              this.http.get("http://192.168.0.31/rpiapi/activate/11")
              .subscribe(response => {
                if(response === 1) {
                  this.checkStates();
                }
              });
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
          .subscribe(response => {
            if(response === 1) {
              this.checkStates();
            }
          });
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
              .subscribe(response => {
                if(response === 1) {
                  this.checkStates();
                }
              });
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
      .subscribe(response => {
        if(response === 0) {
          this.checkStates();
        }
      })
    }

}
