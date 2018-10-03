import $ from 'jquery';
import Pace from 'pace';

export function initialize() {
  $(document).ajaxStart(function() {
    Pace.stop();
    Pace.start({
      elements: false,
      ajax: {
        trackMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      },
      restartOnPushState: false
    });
  });
}

export default {
  name: 'pace',
  initialize
};
