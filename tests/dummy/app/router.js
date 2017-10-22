import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('basic-example');
    this.route('async-example');
    this.route('form-example');
    this.route('delete-example');
    this.route('no-animation-example');
});

export default Router;
