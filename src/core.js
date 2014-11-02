this.lamedh = (function() {
    'use strict';
    var Lamedh = function Lamedh() {
        this.utils = {
                      /**
                       * Set that Child class extends Parent class
                       * @param {function} Child the child class
                       * @param {function} Parent the parent class
                       * @return {function} the child class
                       */
                      setToInherit: function(Child, Parent) {
                          Child.Parent = Parent;
                          Child.prototype = Object.create(Parent.prototype);
                          Child.prototype.constructor = Child;
                          return Child;
                      },

                      jsonReplace: function(key, value) {
                          if (value.isManagedObject) {
                              return new ManagedObjectReference(value._id, value.objectstoreName);
                          } else {
                              return value;
                          }
                      }
        };

        this.ManagedObjectReference = function ManagedObjectReference(id, objectstoreName) {
            this.id = id;
            this.objectstoreName = objectstoreName;
        };

        this.ManagedObject = function ManagedObject() {
            Object.defineProperty(this, 'isLoaded', {
                value: false,
                enumerable: false,
                configurable: true
            });

            Object.defineProperty(objectConstructor.prototype, '_id', {
                get: function () {
                    return this[this.idProperty];
                },
                set: function (value) {
                    this[this.idProperty] = value;
                },
                
                enumerable: false,
                configurable: true
            });
        };

        this.ManagedObject.prototype.load = function(callback) {

        };

        Object.defineProperty(this.ManagedObject.prototype, 'isManagedObject', {
            value: true,
            writable: false,
            enumerable: false,
            configurable: true
        });

        this.Context = function Context() {
        //TODO
        };

        this.setToManagedObjectClass = function(objectstoreName, objectConstructor, idProperty) {
            this.utils.setToInherit(objectConstructor, this.ManagedObject);

            Object.defineProperty(objectConstructor.prototype, 'idProperty', {
                value: idProperty,
                writable: true,
                enumerable: false,
                configurable: true
            });

            Object.defineProperty(objectConstructor.prototype, 'objectstoreName', {
                value: objectstoreName,
                writable: false,
                enumerable: false,
                configurable: true
            });

            return ManagedObject;
        };
    };
    return new Lamedh();
})();
