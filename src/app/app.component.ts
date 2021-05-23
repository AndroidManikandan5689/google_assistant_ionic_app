import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Deeplinks } from "@ionic-native/deeplinks/ngx";
import { HomePage } from "./home/home.page";
import { OrderPage } from "./order/order.page";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private deeplinks: Deeplinks,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setupDeeplink();
    });
  }

  setupDeeplink() {
    this.deeplinks.route({ "/open": HomePage, "/order": OrderPage }).subscribe(
      (match) => {
        console.log("url", match.$link);
        console.log("arguments", match.$args);
        console.log("path", match.$link.path);
        switch (match.$link.path) {
          case "/open":
            this.navigateToPage(match.$args["featureParam"]);
            break;
          case "/order":
            this.router.navigate(["order"]);
            break;
          default:
            break;
        }
      },
      (nomatch) => {
        console.log("Not Match", nomatch);
      }
    );
  }

  navigateToPage(pageName) {
    switch (pageName) {
      case "home":
        this.router.navigate(["home"]);
        break;
      case "profile":
        this.router.navigate(["home/profile"]);
        break;
      case "notification":
        this.router.navigate(["home/notification"]);
        break;
      case "settings":
        this.router.navigate(["home/settings"]);
        break;
      case "history":
        this.router.navigate(["home/history"]);
        break;

      default:
        this.router.navigate(["home"]);
        break;
    }
  }
}
