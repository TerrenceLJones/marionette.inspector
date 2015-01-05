this.serializeEmptyView = function(view) {
  var data = {};

  data.cid = view.cid;
  data.isLoading = true;
  data.options = {};
  data.ui = {};
  data.el = {};
  data.events = {};
  data._events = {};
  data.modelEvents = {};
  data.collectionEvents = {};
  data.triggers = {};
  data.properties = {};
  data.ancestorInfo = {};
  data._requirePath = '';
  data._className = '';
  data.parentClass = '';

  return data;
};

this.serializeView = function(view) {
  var data = {};
  // debug.log('serializeView', view)

  if (!_.isObject(view)) {
    return {};
  }


  data.cid = view.cid;
  data.isLoading = false; // set when a view is registered, but not serialized

  data.options = this.serializeObject(view.options);
  data.ui = this.serializeUI(view.ui);
  data.el = this.serializeElement(view.el, 'el', false);
  data.events = serializeEventsHash(view.events);
  data._events = this.serializeEvents(view._events);
  data.modelEvents = serializeEventsHash(view.modelEvents);
  data.collectionEvents = serializeEventsHash(view.collectionEvents);
  data.triggers = serializeEventsHash(view.triggers);
  data.properties = this.serializeObjectProperties(view);
  data.ancestorInfo = this.ancestorInfo(view);
  data._requirePath = view._requirePath;
  data._className = this.serializeClassName(view);
  data.parentClass = this.isKnownType(view) ? this.knownType(view).name : '';

  if (view.model) {
    data.model = {
      cid: view.model.cid
    };
  }

  return data;
}


this.serializeUI = function(ui) {
  var data = {};
  _.each(ui, function(element, uiName) {
    data[uiName] = this.serializeElement(element, uiName, false);
  }, this);

  return data;
}