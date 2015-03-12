/* jshint ignore:start */

/* jshint ignore:end */

define('example-app/adapters/application', ['exports', 'ember-data', 'example-app/config/environment'], function (exports, DS, config) {

  'use strict';

  exports['default'] = DS['default'].ActiveModelAdapter.extend({
    host: config['default'].apiUrl
  });

});
define('example-app/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'example-app/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('example-app/components/cdv-nav-bar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: "header"
  });

});
define('example-app/components/modal-dialog', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    actions: {
      close: function () {
        this.sendAction();
      }
    }
  });

});
define('example-app/controllers/help', ['exports', 'example-app/controllers/modal'], function (exports, Modal) {

	'use strict';

	exports['default'] = Modal['default'].extend();

});
define('example-app/controllers/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    today: Ember['default'].computed(function () {
      return new Date();
    })
  });

});
define('example-app/controllers/modal', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      close: function () {
        this.send("closeModal");
      }
    }
  });

});
define('example-app/helpers/format-date', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  /* global moment */

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(function (value, format) {
    return moment(value).format(format);
  });

});
define('example-app/initializers/app-version', ['exports', 'example-app/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;

  exports['default'] = {
    name: "App Version",
    initialize: function (container, application) {
      var appName = classify(application.toString());
      Ember['default'].libraries.register(appName, config['default'].APP.version);
    }
  };

});
define('example-app/initializers/ember-cli-fastclick', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var EmberCliFastclickInitializer = {
    name: "fastclick",

    initialize: function () {
      Ember['default'].run.schedule("afterRender", function () {
        FastClick.attach(document.body);
      });
    }
  };

  exports['default'] = EmberCliFastclickInitializer;

});
define('example-app/initializers/export-application-global', ['exports', 'ember', 'example-app/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  };

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('example-app/initializers/in-app-livereload', ['exports', 'example-app/config/environment', 'ember-cli-cordova/initializers/in-app-livereload'], function (exports, config, reloadInitializer) {

  'use strict';

  /* globals cordova */

  var inAppReload = reloadInitializer['default'].initialize;

  var initialize = function (container, app) {
    if (typeof cordova === "undefined" || config['default'].environment !== "development" || config['default'].cordova && (!config['default'].cordova.liveReload || !config['default'].cordova.liveReload.enabled)) {
      return;
    }

    return inAppReload(container, app, config['default']);
  };

  exports['default'] = {
    name: "cordova:in-app-livereload",
    initialize: initialize
  };

  exports.initialize = initialize;

});
define('example-app/router', ['exports', 'ember', 'example-app/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.resource("page", { path: "/page/:id" });
  });

  exports['default'] = Router;

});
define('example-app/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    actions: {
      back: function () {
        Ember['default'].AnimatedContainerView.enqueueAnimations({ main: "slideRight" });
        history.go(-1);
      },

      closeModal: function () {
        this.disconnectOutlet({
          outlet: "modal",
          parentView: "application"
        });
      },

      openModal: function (name) {
        this.render(name, {
          into: "application",
          outlet: "modal"
        });
      },

      openLink: function (url) {
        window.open(url, "_system");
      }
    }
  });

});
define('example-app/routes/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function () {
      return [Ember['default'].Object.create({
        id: 0,
        title: "Page 0",
        body: "Pellentesque augue risus, elementum luctus nulla sed, fringilla accumsan libero. Fusce venenatis aliquet lectus gravida rutrum. Aenean sagittis, ante ut varius elementum, libero nisl pulvinar nunc, quis aliquam neque massa bibendum massa. Fusce non mollis massa. Nunc dignissim, magna non facilisis consectetur, massa dolor scelerisque elit, nec euismod diam ipsum vel nunc. Curabitur suscipit id elit id bibendum. Sed non urna condimentum, condimentum est vel, iaculis lectus."
      }), Ember['default'].Object.create({
        id: 1,
        title: "Page 1",
        body: "Aliquam tortor ligula, adipiscing vel eros nec, facilisis faucibus eros. In sapien odio, ornare sit amet arcu at, imperdiet consectetur ligula. Etiam eget odio ullamcorper, posuere ante sed, porta orci. Sed diam sapien, molestie eu tempus quis, rhoncus quis sapien. Integer vitae diam lectus. Praesent lacus nisi, varius ut metus vel, laoreet ultricies felis. Mauris sit amet ipsum fermentum, feugiat quam id, tincidunt risus. Pellentesque non porttitor nunc. Duis dapibus augue porta lorem consectetur, eget sollicitudin libero eleifend. Sed id lobortis lectus. Aenean semper auctor varius. Proin tempor arcu a orci tincidunt, placerat fermentum risus dictum. Ut eu vestibulum orci."
      }), Ember['default'].Object.create({
        id: 2,
        title: "Page 2",
        body: "Curabitur non risus purus. Maecenas non massa dolor. Donec gravida posuere congue. Donec pulvinar lorem quis orci molestie suscipit. Vestibulum consequat nisl aliquam ante rutrum malesuada. Vestibulum lacus nulla, bibendum molestie sollicitudin ut, tristique eu turpis. Vivamus volutpat sollicitudin risus elementum lacinia."
      }), Ember['default'].Object.create({
        id: 3,
        title: "Page 3",
        body: "Aenean suscipit neque quis mauris pellentesque, a blandit eros pharetra. Nulla eget orci nec sem ornare tincidunt a vel elit. Vestibulum at lorem faucibus, tincidunt leo vitae, consequat urna. Nam non ultricies risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam sed gravida justo. Ut tempus sapien a est ultricies luctus. Sed euismod arcu eu fermentum pulvinar."
      })];
    },

    actions: {
      goToPage: function (page) {
        this.transitionToAnimated("page", { main: "slideLeft" }, page);
      }
    }
  });

});
define('example-app/templates/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
  /**/) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


    data.buffer.push("<div class=\"animated-outlet\">\n  ");
    data.buffer.push(escapeExpression((helper = helpers['animated-outlet'] || (depth0 && depth0['animated-outlet']),options={hash:{
      'name': ("main")
    },hashTypes:{'name': "STRING"},hashContexts:{'name': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "animated-outlet", options))));
    data.buffer.push("\n</div>\n");
    data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "modal", options) : helperMissing.call(depth0, "outlet", "modal", options))));
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('example-app/templates/cdv-generic-nav-bar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
  /**/) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n  <button ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "leftButton", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">\n    ");
    stack1 = helpers['if'].call(depth0, "nav.leftButton.icon", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    ");
    stack1 = helpers._triageMustache.call(depth0, "nav.leftButton.text", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  </button>\n");
    return buffer;
    }
  function program2(depth0,data) {
    
    var buffer = '';
    data.buffer.push("\n      <i ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":icon nav.leftButton.icon")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push("></i>\n    ");
    return buffer;
    }

  function program4(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n  <h1>\n    ");
    stack1 = helpers._triageMustache.call(depth0, "nav.title.text", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  </h1>\n");
    return buffer;
    }

  function program6(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n  <button ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "rightButton", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">\n    ");
    stack1 = helpers['if'].call(depth0, "nav.rightButton.icon", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    ");
    stack1 = helpers._triageMustache.call(depth0, "nav.rightButton.text", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  </button>\n");
    return buffer;
    }
  function program7(depth0,data) {
    
    var buffer = '';
    data.buffer.push("\n      <i ");
    data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
      'class': (":icon nav.rightButton.icon")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
    data.buffer.push("></i>\n    ");
    return buffer;
    }

    stack1 = helpers['if'].call(depth0, "nav.leftButton.text", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n");
    stack1 = helpers['if'].call(depth0, "nav.title.text", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n");
    stack1 = helpers['if'].call(depth0, "nav.rightButton.text", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('example-app/templates/components/cdv-nav-bar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
  /**/) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1;


    stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n");
    return buffer;
    
  });

});
define('example-app/templates/components/modal-dialog', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
  /**/) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, escapeExpression=this.escapeExpression;


    data.buffer.push("<div class=\"overlay\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">\n  <div class=\"modal\">\n    <div class=\"close\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">X</div>\n    <div ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, {hash:{
      'bubbles': (false)
    },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[],types:[],data:data})));
    data.buffer.push(">\n      ");
    stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    </div>\n  </div>\n</div>\n\n");
    return buffer;
    
  });

});
define('example-app/templates/help', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
  /**/) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

  function program1(depth0,data) {
    
    var buffer = '';
    data.buffer.push("\n  <div class=\"text-center\">\n    <p>\n      Help stuff here\n    </p>\n    <button class=\"full\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">\n      Ok, got it\n    </button>\n  </div>\n");
    return buffer;
    }

    stack1 = (helper = helpers['modal-dialog'] || (depth0 && depth0['modal-dialog']),options={hash:{
      'action': ("close")
    },hashTypes:{'action': "STRING"},hashContexts:{'action': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "modal-dialog", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n\n");
    return buffer;
    
  });

});
define('example-app/templates/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
  /**/) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n        <li ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "goToPage", "page", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
    data.buffer.push(" class=\"disclosure\">\n          ");
    stack1 = helpers._triageMustache.call(depth0, "page.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n        </li>\n      ");
    return buffer;
    }

    data.buffer.push("<header>\n  <h1>\n    EmberCDV App\n  </h1>\n</header>\n<div id=\"main\">\n  <div id=\"scrollable\">\n    <ul class=\"ui-table-view\">\n      ");
    stack1 = helpers.each.call(depth0, "page", "in", "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    </ul>\n    <br>\n    <div class=\"content-padded text-center\">\n      <a href=\"#\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "openModal", "help", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
    data.buffer.push(">\n        Help\n      </a>\n    </div>\n    <div class=\"content-padded text-center\">\n      Today is ");
    data.buffer.push(escapeExpression((helper = helpers['format-date'] || (depth0 && depth0['format-date']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "today", "MMM DD, YYYY h:mma", options) : helperMissing.call(depth0, "format-date", "today", "MMM DD, YYYY h:mma", options))));
    data.buffer.push("\n    </div>\n  </div>\n</div>\n\n");
    return buffer;
    
  });

});
define('example-app/templates/page', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data
  /**/) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, escapeExpression=this.escapeExpression;


    data.buffer.push("<header>\n  <div class=\"back-button left-button\" ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "back", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">\n    Back\n  </div>\n  <h1>\n    ");
    stack1 = helpers._triageMustache.call(depth0, "model.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n  </h1>\n</header>\n<div id=\"main\">\n  <div id=\"scrollable\">\n    <div class=\"content-padded\">\n      <p>\n        ");
    stack1 = helpers._triageMustache.call(depth0, "model.body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n      </p>\n    </div>\n  </div>\n</div>\n\n");
    return buffer;
    
  });

});
define('example-app/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('example-app/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('example-app/tests/components/modal-dialog.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/modal-dialog.js should pass jshint', function() { 
    ok(true, 'components/modal-dialog.js should pass jshint.'); 
  });

});
define('example-app/tests/controllers/help.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/help.js should pass jshint', function() { 
    ok(true, 'controllers/help.js should pass jshint.'); 
  });

});
define('example-app/tests/controllers/index.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/index.js should pass jshint', function() { 
    ok(true, 'controllers/index.js should pass jshint.'); 
  });

});
define('example-app/tests/controllers/modal.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/modal.js should pass jshint', function() { 
    ok(true, 'controllers/modal.js should pass jshint.'); 
  });

});
define('example-app/tests/helpers/format-date.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/format-date.js should pass jshint', function() { 
    ok(true, 'helpers/format-date.js should pass jshint.'); 
  });

});
define('example-app/tests/helpers/resolver', ['exports', 'ember/resolver', 'example-app/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('example-app/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('example-app/tests/helpers/start-app', ['exports', 'ember', 'example-app/app', 'example-app/router', 'example-app/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('example-app/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('example-app/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('example-app/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('example-app/tests/routes/index.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/index.js should pass jshint', function() { 
    ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('example-app/tests/test-helper', ['example-app/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('example-app/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('example-app/tests/views/application.jshint', function () {

  'use strict';

  module('JSHint - views');
  test('views/application.js should pass jshint', function() { 
    ok(true, 'views/application.js should pass jshint.'); 
  });

});
define('example-app/tests/views/index.jshint', function () {

  'use strict';

  module('JSHint - views');
  test('views/index.js should pass jshint', function() { 
    ok(true, 'views/index.js should pass jshint.'); 
  });

});
define('example-app/tests/views/page.jshint', function () {

  'use strict';

  module('JSHint - views');
  test('views/page.js should pass jshint', function() { 
    ok(true, 'views/page.js should pass jshint.'); 
  });

});
define('example-app/views/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].View.extend();

});
define('example-app/views/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].View.extend();

});
define('example-app/views/page', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].View.extend();

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('example-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'example-app';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("example-app/tests/test-helper");
} else {
  require("example-app/app")["default"].create({"name":"example-app","version":"0.0.0.9d1362d1"});
}

/* jshint ignore:end */
//# sourceMappingURL=example-app.map