import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageTranslate'
})
export class LanguageTranslatePipe implements PipeTransform {

  transform(value: any, selectedLanguage: string): string {
    const defaultLanguage = 'en';

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'object' && value !== null) {
      return value[selectedLanguage] || value[defaultLanguage] || '';
    }

    return '';
  }

}
