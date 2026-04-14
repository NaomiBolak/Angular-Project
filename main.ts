import { bootstrapApplication } from '@angular/platform-browser';
import { SiteComponent } from './app/site/site';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(SiteComponent, {
  providers: [provideRouter(routes)]
})
  .catch((err) => console.error(err));
