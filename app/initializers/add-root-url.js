import Component from '@ember/component';
import Controller from '@ember/controller';
import ENV from 'pompa/config/environment';

let alreadyRun = false;

export default {
  name: 'add-root-url',
  initialize() {
    if (alreadyRun) {
      return;
    }

    alreadyRun = true;

    Controller.reopen({
      rootURL: ENV.rootURL,
    });
    Component.reopen({
      rootURL: ENV.rootURL,
    });
  }
};
