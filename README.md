# Backbone Fuse

Fuse is a simple mixin for [Backbone.js](http://backbonejs.org) that enforces the Highlander Principle for your models.

The principle describes that only one object should ever represent a domain object at any one time. Fuse just ensures that - based on ID - you're never managing several instances that represent a single resource, no matter whether you're using .fetch(), new Thing() or letting a collection create the model objects for you.