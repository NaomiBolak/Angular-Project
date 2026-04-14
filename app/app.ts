import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { SiteComponent } from './site/site';

import { CartService } from './services/cart.service';
import { TrackingService } from './services/users.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SiteComponent
  ],
  providers: [
    CartService,
    TrackingService
  ],
  bootstrap: [SiteComponent]
})
export class AppModule {}
