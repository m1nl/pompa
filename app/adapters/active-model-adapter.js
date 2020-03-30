import Ember from 'ember';
import { pluralize } from 'ember-inflector';

import RESTAdapter from "@ember-data/adapter/rest";
import { InvalidError } from '@ember-data/adapter/error';
import { errorsHashToArray } from '@ember-data/adapter/error';

const {
  decamelize,
  underscore
} = Ember.String;

/**
  @module ember-data
*/

/**
  The ActiveModelAdapter is a subclass of the RESTAdapter designed to integrate
  with a JSON API that uses an underscored naming convention instead of camelCasing.
  It has been designed to work out of the box with the
  [active\_model\_serializers](http://github.com/rails-api/active_model_serializers)
  Ruby gem. This Adapter expects specific settings using ActiveModel::Serializers,
  `embed :ids, embed_in_root: true` which sideloads the records.

  This adapter extends the RESTAdapter by making consistent use of the camelization,
  decamelization and pluralization methods to normalize the serialized JSON into a
  format that is compatible with a conventional Rails backend and Ember Data.

  ## JSON Structure

  The ActiveModelAdapter expects the JSON returned from your server to follow
  the REST adapter conventions substituting underscored keys for camelcased ones.

  Unlike the RESTAdapter, async relationship keys must be the singular form
  of the relationship name, followed by "_id" for belongsTo relationships,
  or "_ids" for hasMany relationships.

  ### Conventional Names

  Attribute names in your JSON payload should be the underscored versions of
  the attributes in your Ember.js models.

  For example, if you have a `Person` model:

  ```js
  App.FamousPerson = Model.extend({
    firstName: attr('string'),
    lastName: attr('string'),
    occupation: attr('string')
  });
  ```

  The JSON returned should look like this:

  ```js
  {
    "famous_person": {
      "id": 1,
      "first_name": "Barack",
      "last_name": "Obama",
      "occupation": "President"
    }
  }
  ```

  Let's imagine that `Occupation` is just another model:

  ```js
  App.Person = Model.extend({
    firstName: attr('string'),
    lastName: attr('string'),
    occupation: belongsTo('occupation')
  });

  App.Occupation = Model.extend({
    name: attr('string'),
    salary: attr('number'),
    people: hasMany('person')
  });
  ```

  The JSON needed to avoid extra server calls, should look like this:

  ```js
  {
    "people": [{
      "id": 1,
      "first_name": "Barack",
      "last_name": "Obama",
      "occupation_id": 1
    }],

    "occupations": [{
      "id": 1,
      "name": "President",
      "salary": 100000,
      "person_ids": [1]
    }]
  }
  ```

  @class ActiveModelAdapter
  @constructor
  @namespace DS
  @extends RESTAdapter
**/

const ActiveModelAdapter = RESTAdapter.extend({
  defaultSerializer: '-active-model',
  /**
    The ActiveModelAdapter overrides the `pathForType` method to build
    underscored URLs by decamelizing and pluralizing the object type name.

    ```js
      this.pathForType("famousPerson");
      //=> "famous_people"
    ```

    @method pathForType
    @param {String} modelName
    @return String
  */
  pathForType: function(modelName) {
    var decamelized = decamelize(modelName);
    var underscored = underscore(decamelized);
    return pluralize(underscored);
  },

  /**
    The ActiveModelAdapter overrides the `handleResponse` method
    to format errors passed to a InvalidError for all
    422 Unprocessable Entity responses.

    A 422 HTTP response from the server generally implies that the request
    was well formed but the API was unable to process it because the
    content was not semantically correct or meaningful per the API.

    For more information on 422 HTTP Error code see 11.2 WebDAV RFC 4918
    https://tools.ietf.org/html/rfc4918#section-11.2

    @method handleResponse
    @param  {Number} status
    @param  {Object} headers
    @param  {Object} payload
    @return {Object | AdapterError} response
  */
  handleResponse: function(status, headers, payload) {
    if (this.isInvalid(status, headers, payload)) {
      let errors = errorsHashToArray(payload.errors);

      return new InvalidError(errors);
    } else {
      return this._super(...arguments);
    }
  }
});

export default ActiveModelAdapter;
