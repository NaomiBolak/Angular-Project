import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { SiteComponent } from './app/site/site';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(SiteComponent, config, context);

export default bootstrap;
