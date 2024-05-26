import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppConfigModule } from './app/app.config'; // Zorg ervoor dat dit pad correct is

platformBrowserDynamic().bootstrapModule(AppConfigModule)
  .catch(err => console.error(err));
