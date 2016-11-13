import Immutable from 'immutable';
const APP_KEY = 'globalApp';
const emptyApp = {
  authUser: {},
  customData: {},
};

class LocalStorageUtils {
  constructor() {
    const app = this.getApp();

    if (!app) {
      this.safeSave(APP_KEY, emptyApp);
    }
  }

  setAuthinticatedUser(user) {
    const app = this.getApp();

    this.setApp({ ...app, authUser: user && user.toJS && user.toJS() });
  }

  getAuthinticatedUser() {
    const app = this.getApp();

    return Immutable.fromJS(app.authUser);
  }

  getApp() {
    return this.safeParse(localStorage.getItem(APP_KEY));
  }

  setApp(app) {
    this.safeSave(APP_KEY, app);
  }

  setCustomValue(key, value) {
    const app = this.getApp();

    this.setApp({ ...app, customData: { ...app.customData, key: value } });
  }

  getCustomValue(key) {
    const app = this.getApp();

    return app.customData[key];
  }

  safeParse(data) {
    try {
      return JSON.parse(data);
    } catch (err) {
      console.error('INVALID DATA TO PARSE');

      return emptyApp;
    }
  }

  safeSave(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export default (new LocalStorageUtils());
