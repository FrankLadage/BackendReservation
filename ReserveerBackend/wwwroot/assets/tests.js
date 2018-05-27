'use strict';

define('hreservation/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('authenticators/autherizers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/autherizers.js should pass ESLint\n\n');
  });

  QUnit.test('authenticators/oauth2.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/oauth2.js should pass ESLint\n\n');
  });

  QUnit.test('components/hr-agenda.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/hr-agenda.js should pass ESLint\n\n');
  });

  QUnit.test('components/hr-announcements.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/hr-announcements.js should pass ESLint\n\n');
  });

  QUnit.test('components/hr-dashboard.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/hr-dashboard.js should pass ESLint\n\n');
  });

  QUnit.test('components/hr-header.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/hr-header.js should pass ESLint\n\n');
  });

  QUnit.test('components/hr-service-panel.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/hr-service-panel.js should pass ESLint\n\n');
  });

  QUnit.test('components/hr-sidebar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/hr-sidebar.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/hr-dashboard.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/hr-dashboard.js should pass ESLint\n\n');
  });

  QUnit.test('formats.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'formats.js should pass ESLint\n\n');
  });

  QUnit.test('models/announcements.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/announcements.js should pass ESLint\n\n');
  });

  QUnit.test('models/hr-dashboard.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/hr-dashboard.js should pass ESLint\n\n');
  });

  QUnit.test('models/user.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/hr-dashboard.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/hr-dashboard.js should pass ESLint\n\n');
  });

  QUnit.test('routes/hr-service-panel.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/hr-service-panel.js should pass ESLint\n\n');
  });

  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass ESLint\n\n');
  });

  QUnit.test('routes/overview.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/overview.js should pass ESLint\n\n');
  });

  QUnit.test('services/device.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/device.js should pass ESLint\n\n');
  });

  QUnit.test('services/sidebar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/sidebar.js should pass ESLint\n\n');
  });
});
define('hreservation/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
    if (window.server) {
      window.server.shutdown();
    }
  }
});
define('hreservation/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _test) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;


  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _test.default);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return app.testHelpers.wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return app.testHelpers.wait();
  }
});
define('hreservation/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'hreservation/tests/helpers/start-app', 'hreservation/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var Promise = Ember.RSVP.Promise;
});
define('hreservation/tests/helpers/resolver', ['exports', 'hreservation/resolver', 'hreservation/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('hreservation/tests/helpers/start-app', ['exports', 'hreservation/app', 'hreservation/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('hreservation/tests/integration/components/hr-agenda-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('hr-agenda', 'Integration | Component | hr agenda', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "PXCWuRY+",
      "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hr-agenda\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Ah+0oR89",
      "block": "{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"hr-agenda\"],null,null,0],[\"text\",\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      template block text\\n\"]],\"locals\":[]}],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('hreservation/tests/integration/components/hr-announcements-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('hr-announcements', 'Integration | Component | hr announcements', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "p2XXceDf",
      "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hr-announcements\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "XM5xl0Zg",
      "block": "{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"hr-announcements\"],null,null,0],[\"text\",\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      template block text\\n\"]],\"locals\":[]}],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('hreservation/tests/integration/components/hr-dashboard-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('hr-dashboard', 'Integration | Component | hr dashboard', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "SCoeMMsj",
      "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hr-dashboard\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "VB7pB9Kx",
      "block": "{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"hr-dashboard\"],null,null,0],[\"text\",\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      template block text\\n\"]],\"locals\":[]}],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('hreservation/tests/integration/components/hr-header-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('hr-header', 'Integration | Component | hr header', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "G6HittdP",
      "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hr-header\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "25oetDOt",
      "block": "{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"hr-header\"],null,null,0],[\"text\",\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      template block text\\n\"]],\"locals\":[]}],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('hreservation/tests/integration/components/hr-login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('hr-login', 'Integration | Component | hr login', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "URxweI/p",
      "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hr-login\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "mf38bFnw",
      "block": "{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"hr-login\"],null,null,0],[\"text\",\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      template block text\\n\"]],\"locals\":[]}],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('hreservation/tests/integration/components/hr-service-panel-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('hr-service-panel', 'Integration | Component | hr service panel', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "xwU1oYOT",
      "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hr-service-panel\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "+4gVcrg+",
      "block": "{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"hr-service-panel\"],null,null,0],[\"text\",\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      template block text\\n\"]],\"locals\":[]}],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('hreservation/tests/integration/components/hr-sidebar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('hr-sidebar', 'Integration | Component | hr sidebar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "lSXzXnym",
      "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hr-sidebar\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Pe9d+aGw",
      "block": "{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"hr-sidebar\"],null,null,0],[\"text\",\"  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"      template block text\\n\"]],\"locals\":[]}],\"hasPartials\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('hreservation/tests/test-helper', ['hreservation/tests/helpers/resolver', 'ember-qunit'], function (_resolver, _emberQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
});
define('hreservation/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/hr-agenda-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/hr-agenda-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/hr-announcements-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/hr-announcements-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/hr-dashboard-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/hr-dashboard-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/hr-header-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/hr-header-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/hr-login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/hr-login-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/hr-service-panel-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/hr-service-panel-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/hr-sidebar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/hr-sidebar-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/hr-dashboard-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/hr-dashboard-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/hr-agenda-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/hr-agenda-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/hr-dashboard-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/hr-dashboard-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/hr-service-panel-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/hr-service-panel-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/overview-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/overview-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/sidebar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/sidebar-test.js should pass ESLint\n\n');
  });
});
define('hreservation/tests/unit/adapters/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('hreservation/tests/unit/controllers/hr-dashboard-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:hr-dashboard', 'Unit | Controller | hr dashboard', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('hreservation/tests/unit/models/hr-agenda-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('hr-agenda', 'Unit | Model | hr agenda', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('hreservation/tests/unit/routes/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('hreservation/tests/unit/routes/hr-dashboard-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:hr-dashboard', 'Unit | Route | hr dashboard', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('hreservation/tests/unit/routes/hr-service-panel-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:hr-service-panel', 'Unit | Route | hr service panel', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('hreservation/tests/unit/routes/login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('hreservation/tests/unit/routes/overview-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:overview', 'Unit | Route | overview', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('hreservation/tests/unit/services/sidebar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:sidebar', 'Unit | Service | sidebar', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('hreservation/config/environment', [], function() {
  var prefix = 'hreservation';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('hreservation/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
