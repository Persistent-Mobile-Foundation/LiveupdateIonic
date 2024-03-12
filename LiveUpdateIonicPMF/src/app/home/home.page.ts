import { Component, Renderer2, ChangeDetectorRef } from '@angular/core';
declare var LiveUpdateManager: any
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  buttonText = "Feature Button"
  featureScreen = false

  constructor(renderer: Renderer2,  private cd: ChangeDetectorRef){
    renderer.listen('document', 'mfpjsloaded', () => {
      console.log('--> MobileFirst API plugin init complete');
      this.checkForFeature()
    });
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  

  checkForFeature() {
    LiveUpdateManager.obtainConfiguration({useClientCache: false}, (configuration:any) => {
      console.log("Successfully retreived Liveupdate Configuration" + JSON.stringify(configuration))
      if(configuration.features["festivalShopping"]) {
        if(configuration.properties["buttonLabel"] != typeof undefined) {
          this.buttonText = configuration.properties["buttonLabel"]
        }
        this.featureScreen = true
      } else {
        this.featureScreen = false
      }
      this.cd.detectChanges();
    }, (failure:any) => {
      console.log("Failed to retreive Liveupdate Configuration" + JSON.stringify(failure))
      alert("Failed to retreive Liveupdate Configuration. Reason :" + JSON.stringify(failure))
      this.featureScreen = false
      this.cd.detectChanges();
    })
  }

}
