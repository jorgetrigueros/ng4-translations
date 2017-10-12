import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Utility } from 'app/services/utility.service';

if (environment.production) {
  enableProdMode();
}

export function getTranslationProviders(): Promise<Object[]> {
  // tslint:disable-next-line:prefer-const
  let locale = 'fr-FR';
  const noProviders: Object[] = [];
  if (!locale || locale === 'en-US') {
      return Promise.resolve(noProviders);
  }
  const translationFile = `../locale/messages.${locale}.xlf`;
  return getTranslationsWithImports(translationFile)
      .then((translations: string) => [
          { provide: TRANSLATIONS, useValue: translations },
          { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
          { provide: LOCALE_ID, useValue: locale }
      ])
      .catch(() => noProviders);
}

function getTranslationsWithImports(file: string) {
  const util = new Utility();
  return util.getFile(file);
}

// platformBrowserDynamic().bootstrapModule(AppModule);

getTranslationProviders().then(providers => {
  const options = { providers };
  platformBrowserDynamic().bootstrapModule(AppModule, options);
});
