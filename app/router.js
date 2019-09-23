import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('mailers', function() {
    this.route('mailer', { path: '/:mailer_id' }, function() {
      this.route('edit');
      this.route('delete');
    });
    this.route('new');
  });

  this.route('groups', function() {
    this.route('group', { path: '/:group_id' }, function() {
      this.route('edit');
      this.route('delete');

      this.route('targets', function() {
        this.route('target', { path: '/:target_id' }, function() {
          this.route('edit');
          this.route('delete');
        });
        this.route('new');
        this.route('upload');
      });
    });
    this.route('new');
  });

  this.route('templates', function() {
    this.route('template', { path: '/:template_id' }, function() {
      this.route('edit');
      this.route('delete');
      this.route('duplicate');

      this.route('goals', function() {
        this.route('goal', { path: '/:goal_id' }, function() {
          this.route('edit');
          this.route('delete');
        });
        this.route('new');
      });

      this.route('resources', function() {
        this.route('resource', { path: '/:resource_id' }, function() {
          this.route('edit');
          this.route('delete');
          this.route('upload');
        });
        this.route('new');
      });

      this.route('attachments', function() {
        this.route('attachment', { path: '/:attachment_id' }, function() {
          this.route('edit');
          this.route('delete');
        });
        this.route('new');
      });
    });
    this.route('new');
    this.route('upload');
  });

  this.route('campaigns', function() {
    this.route('campaign', { path: '/:campaign_id' }, function() {
      this.route('edit');
      this.route('delete');

      this.route('victims', function() {
          this.route('victim', { path: '/:victim_id' }, function() {
        });
      });

      this.route('scenarios', function() {
        this.route('scenario', { path: '/:scenario_id' }, function() {
          this.route('edit');
          this.route('delete');

          this.route('victims', function() {
            this.route('victim', { path: '/:victim_id' }, function() {
              this.route('delete');
            });
          });

          this.route('targets', function() {
            this.route('from-victims');
          });
        });
        this.route('new');
      });
    });
    this.route('new');
  });
});

export default Router;
