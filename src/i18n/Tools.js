/* eslint-disable no-invalid-this */

import Jed from 'jed';

export default class Tools {
  constructor({ localeData, locale }) {
    this.setLanguage({ localeData, locale });
  }

  setLanguage = ({ localeData, locale }) => {
    this.jed = new Jed(localeData);
    this.locale = locale;
  }

  l = (text) => this.jed.gettext(text);

  ngettext = (singular, plural, amount) => this.jed.ngettext(singular, plural, amount);

  getLocale = () => this.locale.toLowerCase();
}
