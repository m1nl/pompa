/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const Funnel = require('broccoli-funnel');
const UnwatchedDir = require('broccoli-source').UnwatchedDir;

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'node_modules/bootstrap-sass/assets/stylesheets',
        'node_modules/eonasdan-bootstrap-datetimepicker/src/sass',
        'node_modules/bootstrap-toggle/css',
        'node_modules/pace-js/themes/blue',
      ],
      extension: 'scss',
    },
    nodeModulesToVendor: [
      'node_modules/bootstrap-sass/assets/javascripts',
      'node_modules/bootstrap-sass/assets/fonts',
      'node_modules/bootstrap-toggle/js',
      'node_modules/eonasdan-bootstrap-datetimepicker/src/js',
      'node_modules/chart.js/dist',
      'node_modules/file-saver/dist',
      new Funnel(new UnwatchedDir('node_modules/google-palette'), { files: ['palette.js'] }),
      new Funnel(new UnwatchedDir('node_modules/twbs-pagination'), { files: ['jquery.twbsPagination.js'] }),
      new Funnel(new UnwatchedDir('node_modules/pace-js'), { files: ['pace.js'] }),
    ],
    ace: {
      themes: ['xcode'],
      modes: ['liquid'],
      workers: [],
    },
    'ember-font-awesome': {
      useScss: true,
      fontFormats: ['woff', 'woff2']
    },
    minifyCSS: { enabled: EmberApp.env() !== 'development', relativeTo: 'app/styles' },
    minifyJS: { enabled: EmberApp.env() !== 'development' },
    sourcemaps: {
      enabled: EmberApp.env() !== 'production',
      extensions: ['js']
    }
  });

  app.import('vendor/bootstrap.js');
  app.import('vendor/bootstrap-toggle.js');
  app.import('vendor/bootstrap-datetimepicker.js');
  app.import('vendor/jquery.twbsPagination.js');

  app.import('vendor/bootstrap/glyphicons-halflings-regular.woff', { destDir: 'fonts' });
  app.import('vendor/bootstrap/glyphicons-halflings-regular.woff2', { destDir: 'fonts' });

  app.import('vendor/Chart.js', { using: [{ transformation: 'amd', as: 'chart-js' }] });
  app.import('vendor/pace.js', { using: [{ transformation: 'amd', as: 'pace' }] });
 
  app.import('node_modules/google-palette/palette.js', { using: [{ transformation: 'cjs', as: 'palette' }] });
  app.import('node_modules/file-saver/dist/FileSaver.js', { using: [{ transformation: 'cjs', as: 'file-saver' }] });

  return app.toTree();
};
