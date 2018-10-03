import ActiveModelAdapter from 'active-model-adapter';
import ENV from "../config/environment";

export default ActiveModelAdapter.extend({
  namespace: ENV.APP.apiNamespace,
  host: ENV.APP.apiHost,
});
