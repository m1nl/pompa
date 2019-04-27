import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('mailers', { path: '/mailers' }, function() {
    this.route('mailer', { path: '/:mailer_id' }, function() {
      this.route('edit');
      this.route('delete');
    });
    this.route('new');
  });

  this.route('groups', { path: '/groups' }, function() {
    this.route('group', { path: '/:group_id' }, function() {
      this.route('edit');
      this.route('delete');

      this.route('targets', { path: '/targets' }, function() {
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

  this.route('templates', { path: '/templates' }, function() {
    this.route('template', { path: '/:template_id' }, function() {
      this.route('edit');
      this.route('delete');
      this.route('duplicate');

      this.route('goals', { path: '/goals' }, function() {
        this.route('goal', { path: '/:goal_id' }, function() {
          this.route('edit');
          this.route('delete');
        });
        this.route('new');
      });

      this.route('resources', { path: '/resources' }, function() {
        this.route('resource', { path: '/:resource_id' }, function() {
          this.route('edit');
          this.route('delete');
          this.route('upload');
        });
        this.route('new');
      });

      this.route('attachments', { path: '/attachments' }, function() {
        this.route('attachment', { path: '/:attachment_id' }, function() {
          this.route('edit');
          this.route('delete');
        });
        this.route('new');
      });
    });
    this.route('new');
  });

  this.route('campaigns', { path: '/campaigns' }, function() {
    this.route('campaign', { path: '/:campaign_id' }, function() {
      this.route('edit');
      this.route('delete');

      this.route('victims', { path: '/victims' }, function() {
          this.route('victim', { path: '/:victim_id' }, function() {
        });
      });

      this.route('scenarios', { path: '/scenarios' }, function() {
        this.route('scenario', { path: '/:scenario_id' }, function() {
          this.route('edit');
          this.route('delete');
          this.route('victims', { path: '/victims' }, function() {
            this.route('victim', { path: '/:victim_id' }, function() {
              this.route('delete');
            });
          });
        });
        this.route('new');
      });
    });
    this.route('new');
  });
});

export default Router;
