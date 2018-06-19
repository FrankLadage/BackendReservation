'use strict';

define('reservey/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('admin/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'admin/controller.js should pass ESLint\n\n');
  });

  QUnit.test('admin/edit/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'admin/edit/controller.js should pass ESLint\n\n');
  });

  QUnit.test('admin/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'admin/edit/route.js should pass ESLint\n\n');
  });

  QUnit.test('admin/index/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'admin/index/controller.js should pass ESLint\n\n');
  });

  QUnit.test('admin/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'admin/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('admin/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'admin/route.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('application/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'application/controller.js should pass ESLint\n\n');
  });

  QUnit.test('application/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'application/route.js should pass ESLint\n\n');
  });

  QUnit.test('classrooms/classroom/model.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'classrooms/classroom/model.js should pass ESLint\n\n');
  });

  QUnit.test('classrooms/classroom/reservations/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'classrooms/classroom/reservations/controller.js should pass ESLint\n\n');
  });

  QUnit.test('classrooms/classroom/reservations/model.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'classrooms/classroom/reservations/model.js should pass ESLint\n\n');
  });

  QUnit.test('classrooms/classroom/reservations/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'classrooms/classroom/reservations/route.js should pass ESLint\n\n');
  });

  QUnit.test('classrooms/classroom/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'classrooms/classroom/route.js should pass ESLint\n\n');
  });

  QUnit.test('classrooms/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'classrooms/controller.js should pass ESLint\n\n');
  });

  QUnit.test('classrooms/model.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'classrooms/model.js should pass ESLint\n\n');
  });

  QUnit.test('classrooms/reservations/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'classrooms/reservations/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('classrooms/reservations/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'classrooms/reservations/new/route.js should pass ESLint\n\n');
  });

  QUnit.test('classrooms/reservations/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'classrooms/reservations/route.js should pass ESLint\n\n');
  });

  QUnit.test('classrooms/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'classrooms/route.js should pass ESLint\n\n');
  });

  QUnit.test('components/rs-dialog/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/rs-dialog/component.js should pass ESLint\n\n');
  });

  QUnit.test('components/rs-header/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/rs-header/component.js should pass ESLint\n\n');
  });

  QUnit.test('components/rs-service-form/component.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/rs-service-form/component.js should pass ESLint\n\n12:7 - Use closure actions, unless you need bubbling (ember/closure-actions)');
  });

  QUnit.test('components/rs-service-input/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/rs-service-input/component.js should pass ESLint\n\n');
  });

  QUnit.test('components/rs-service-item/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/rs-service-item/component.js should pass ESLint\n\n');
  });

  QUnit.test('components/rs-sidebar/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/rs-sidebar/component.js should pass ESLint\n\n');
  });

  QUnit.test('dialog/service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dialog/service.js should pass ESLint\n\n');
  });

  QUnit.test('formats.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'formats.js should pass ESLint\n\n');
  });

  QUnit.test('mallfunctions/model.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mallfunctions/model.js should pass ESLint\n\n');
  });

  QUnit.test('reservations/model.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'reservations/model.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('rs-agenda/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rs-agenda/route.js should pass ESLint\n\n');
  });

  QUnit.test('rs-classrooms/route.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'rs-classrooms/route.js should pass ESLint\n\n4:5 - \'Classroom\' is assigned a value but never used. (no-unused-vars)\n15:5 - \'Reservation\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('rs-classrooms/rs-reservation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rs-classrooms/rs-reservation/route.js should pass ESLint\n\n');
  });

  QUnit.test('rs-classrooms/rs-reservation/rs-reservations/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rs-classrooms/rs-reservation/rs-reservations/route.js should pass ESLint\n\n');
  });

  QUnit.test('rs-service/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rs-service/controller.js should pass ESLint\n\n');
  });

  QUnit.test('rs-service/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rs-service/edit/route.js should pass ESLint\n\n');
  });

  QUnit.test('rs-service/index/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rs-service/index/controller.js should pass ESLint\n\n');
  });

  QUnit.test('rs-service/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rs-service/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('rs-service/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rs-service/route.js should pass ESLint\n\n');
  });

  QUnit.test('session/service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'session/service.js should pass ESLint\n\n');
  });

  QUnit.test('sidebar/service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sidebar/service.js should pass ESLint\n\n');
  });

  QUnit.test('users/model.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'users/model.js should pass ESLint\n\n');
  });
});
define('reservey/tests/helpers/create-offline-ref', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createOfflineRef;


  /**
   * Creates an offline firebase reference with optional initial data and url.
   *
   * Be sure to `stubfirebase()` and `unstubfirebase()` in your tests!
   *
   * @param  {!Object} [initialData]
   * @param  {string} [url]
   * @param  {string} [apiKey]
   * @return {!firebase.database.Reference}
   */
  function createOfflineRef(initialData, url = 'https://emberfire-tests-2c814.firebaseio.com', apiKey = 'AIzaSyC9-ndBb1WR05rRF1msVQDV6EBqB752m6o') {

    if (!_firebase.default._unStub) {
      throw new Error('Please use stubFirebase() before calling this method');
    }

    const config = {
      apiKey: apiKey,
      authDomain: 'emberfire-tests-2c814.firebaseapp.com',
      databaseURL: url,
      storageBucket: ''
    };

    let app;

    try {
      app = _firebase.default.app();
    } catch (e) {
      app = _firebase.default.initializeApp(config);
    }

    const ref = app.database().ref();

    app.database().goOffline(); // must be called after the ref is created

    if (initialData) {
      ref.set(initialData);
    }

    return ref;
  }
});
define('reservey/tests/helpers/destroy-firebase-apps', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyFirebaseApps;


  const { run } = Ember;

  /**
   * Destroy all Firebase apps.
   */
  function destroyFirebaseApps() {
    const deletions = _firebase.default.apps.map(app => app.delete());
    Ember.RSVP.all(deletions).then(() => run(() => {
      // NOOP to delay run loop until the apps are destroyed
    }));
  }
});
define('reservey/tests/helpers/ember-power-select', ['exports', 'ember-power-select/test-support/helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = exports.touchTrigger = exports.nativeTouch = exports.clickTrigger = exports.typeInSearch = exports.triggerKeydown = exports.nativeMouseUp = exports.nativeMouseDown = exports.findContains = undefined;
  exports.default = deprecatedRegisterHelpers;


  function deprecateHelper(fn, name) {
    return function (...args) {
      (true && !(false) && Ember.deprecate(`DEPRECATED \`import { ${name} } from '../../tests/helpers/ember-power-select';\` is deprecated. Please, replace it with \`import { ${name} } from 'ember-power-select/test-support/helpers';\``, false, { until: '1.11.0', id: `ember-power-select-test-support-${name}` }));

      return fn(...args);
    };
  }

  let findContains = deprecateHelper(_helpers.findContains, 'findContains');
  let nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  let nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  let triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  let typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  let clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  let nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  let touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  let selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');

  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, { until: '1.11.0', id: 'ember-power-select-test-support-register-helpers' }));

    return (0, _helpers.default)();
  }

  exports.findContains = findContains;
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;
  exports.selectChoose = selectChoose;
});
define('reservey/tests/helpers/replace-app-ref', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = replaceAppRef;
  /**
   * Updates the supplied app adapter's Firebase reference.
   *
   * @param  {!Ember.Application} app
   * @param  {!firebase.database.Reference} ref
   * @param  {string} [model]  The model, if overriding a model specific adapter
   */
  function replaceAppRef(app, ref, model = 'application') {
    app.register('service:firebaseMock', ref, { instantiate: false, singleton: true });
    app.inject('adapter:firebase', 'firebase', 'service:firebaseMock');
    app.inject('adapter:' + model, 'firebase', 'service:firebaseMock');
  }
});
define('reservey/tests/helpers/replace-firebase-app-service', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = replaceFirebaseAppService;
  /**
   * Replaces the `firebaseApp` service with your own using injection overrides.
   *
   * This is usually not needed in test modules, where you can re-register over
   * existing names in the registry, but in acceptance tests, some registry/inject
   * magic is needed.
   *
   * @param  {!Ember.Application} app
   * @param  {!Object} newService
   */
  function replaceFirebaseAppService(app, newService) {
    app.register('service:firebaseAppMock', newService, { instantiate: false, singleton: true });
    app.inject('torii-provider:firebase', 'firebaseApp', 'service:firebaseAppMock');
    app.inject('torii-adapter:firebase', 'firebaseApp', 'service:firebaseAppMock');
  }
});
define('reservey/tests/helpers/stub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = stubFirebase;


  /**
   * When a reference is in offline mode it will not call any callbacks
   * until it goes online and resyncs. The ref will have already
   * updated its internal cache with the changed values so we shortcut
   * the process and call the supplied callbacks immediately (asynchronously).
   */
  function stubFirebase() {
    // check for existing stubbing
    if (!_firebase.default._unStub) {
      var originalSet = _firebase.default.database.Reference.prototype.set;
      var originalUpdate = _firebase.default.database.Reference.prototype.update;
      var originalRemove = _firebase.default.database.Reference.prototype.remove;

      _firebase.default._unStub = function () {
        _firebase.default.database.Reference.prototype.set = originalSet;
        _firebase.default.database.Reference.prototype.update = originalUpdate;
        _firebase.default.database.Reference.prototype.remove = originalRemove;
      };

      _firebase.default.database.Reference.prototype.set = function (data, cb) {
        originalSet.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase.default.database.Reference.prototype.update = function (data, cb) {
        originalUpdate.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase.default.database.Reference.prototype.remove = function (cb) {
        originalRemove.call(this);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };
    }
  }
});
define('reservey/tests/helpers/unstub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = unstubFirebase;
  function unstubFirebase() {
    if (typeof _firebase.default._unStub === 'function') {
      _firebase.default._unStub();
      delete _firebase.default._unStub;
    }
  }
});
define('reservey/tests/integration/components/rs-dialog/component-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | rs-dialog', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "LLKDESGV",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"rs-dialog\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Cdb06YQv",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"rs-dialog\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('reservey/tests/integration/components/rs-header/component-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | rs-header', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "2+hA8smG",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"rs-header\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "E6UV61gT",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"rs-header\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('reservey/tests/integration/components/rs-service-form/component-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | rs-service-form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "4opYRhHI",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"rs-service-form\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "6AWKmWy2",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"rs-service-form\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('reservey/tests/integration/components/rs-service-input/component-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | rs-service-input', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "fGtyomab",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"rs-service-input\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "fnM2av2s",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"rs-service-input\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('reservey/tests/integration/components/rs-service-item/component-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | rs-service-item', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "VSRihoKK",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"rs-service-item\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kB5AOY4P",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"rs-service-item\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('reservey/tests/integration/components/rs-sidebar/component-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | rs-sidebar', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "oAO9U8It",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"rs-sidebar\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "2BzpuAbn",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"rs-sidebar\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('reservey/tests/integration/components/service-items/component-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | service-items', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "/Z6fk7A0",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"service-items\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Px/yCuxd",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"service-items\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('reservey/tests/test-helper', ['reservey/app', 'reservey/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('reservey/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/rs-dialog/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rs-dialog/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/rs-header/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rs-header/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/rs-service-form/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rs-service-form/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/rs-service-input/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rs-service-input/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/rs-service-item/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rs-service-item/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/rs-sidebar/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rs-sidebar/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/service-items/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/service-items/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/addclassroom/model-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/addclassroom/model-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/admin/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/admin/controller-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/admin/edit/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/admin/edit/controller-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/admin/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/admin/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/admin/index/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/admin/index/controller-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/admin/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/admin/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/admin/new/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/admin/new/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/admin/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/admin/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/admin/service/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/admin/service/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/application/adapter-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/application/adapter-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/application/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/application/controller-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/application/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/application/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/classroom/model-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/classroom/model-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/classrooms/classroom/reservations/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/classrooms/classroom/reservations/controller-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/classrooms/classroom/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/classrooms/classroom/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/classrooms/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/classrooms/controller-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/classrooms/model-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/classrooms/model-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/classrooms/reservations/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/classrooms/reservations/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/classrooms/reservations/new/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/classrooms/reservations/new/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/classrooms/reservations/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/classrooms/reservations/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/classrooms/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/classrooms/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/dialog/service-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/dialog/service-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/mallfunctions/model-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mallfunctions/model-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/reservations/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/reservations/controller-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/reservations/model-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/reservations/model-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/rs-agenda/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/rs-agenda/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/rs-overview/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/rs-overview/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/rs-overview/rs-reservation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/rs-overview/rs-reservation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/rs-reservation-logs/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/rs-reservation-logs/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/rs-reservations/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/rs-reservations/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/rs-service-item/model-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/rs-service-item/model-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/rs-service/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/rs-service/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/rs-service/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/rs-service/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/rs-service/new/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/rs-service/new/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/rs-service/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/rs-service/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/service-items/model-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/service-items/model-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/service/model-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/service/model-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/session/service-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/session/service-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/sidebar/service-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/sidebar/service-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/users/model-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/users/model-test.js should pass ESLint\n\n');
  });
});
define('reservey/tests/unit/addclassroom/model-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | addclassroom', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('addclassroom', {}));
      assert.ok(model);
    });
  });
});
define('reservey/tests/unit/admin/controller-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | admin', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:admin');
      assert.ok(controller);
    });
  });
});
define('reservey/tests/unit/admin/edit/controller-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | admin/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:admin/edit');
      assert.ok(controller);
    });
  });
});
define('reservey/tests/unit/admin/edit/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | admin/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:admin/edit');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/admin/index/controller-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | admin/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:admin/index');
      assert.ok(controller);
    });
  });
});
define('reservey/tests/unit/admin/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | admin/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:admin/index');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/admin/new/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | admin/new', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:admin/new');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/admin/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | admin', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:admin');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/admin/service/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | admin/service', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:admin/service');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/application/adapter-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define('reservey/tests/unit/application/controller-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:application');
      assert.ok(controller);
    });
  });
});
define('reservey/tests/unit/application/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:application');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/classroom/model-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | classroom', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('classroom', {}));
      assert.ok(model);
    });
  });
});
define('reservey/tests/unit/classrooms/classroom/reservations/controller-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | classrooms/classroom/reservations', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:classrooms/classroom/reservations');
      assert.ok(controller);
    });
  });
});
define('reservey/tests/unit/classrooms/classroom/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | classrooms/classroom', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:classrooms/classroom');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/classrooms/controller-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | classrooms', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:classrooms');
      assert.ok(controller);
    });
  });
});
define('reservey/tests/unit/classrooms/model-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | classrooms', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('classrooms', {}));
      assert.ok(model);
    });
  });
});
define('reservey/tests/unit/classrooms/reservations/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | classrooms/reservations/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:classrooms/reservations/index');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/classrooms/reservations/new/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | classrooms/reservations/new', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:classrooms/reservations/new');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/classrooms/reservations/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | classrooms/reservations', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:classrooms/reservations');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/classrooms/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | classrooms', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:classrooms');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/dialog/service-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | dialog', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:dialog');
      assert.ok(service);
    });
  });
});
define('reservey/tests/unit/mallfunctions/model-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | mallfunctions', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('mallfunctions', {}));
      assert.ok(model);
    });
  });
});
define('reservey/tests/unit/reservations/controller-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | reservations', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:reservations');
      assert.ok(controller);
    });
  });
});
define('reservey/tests/unit/reservations/model-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | reservations', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('reservations', {}));
      assert.ok(model);
    });
  });
});
define('reservey/tests/unit/rs-agenda/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | rs-agenda', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rs-agenda');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/rs-overview/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | rs-overview', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rs-overview');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/rs-overview/rs-reservation/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | rs-overview/rs-reservation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rs-overview/rs-reservation');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/rs-reservation-logs/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | rs-reservations', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rs-reservations');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/rs-reservations/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | rs-reservations-overview', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rs-reservations-overview');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/rs-service-item/model-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | rs service item', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('rs-service-item', {}));
      assert.ok(model);
    });
  });
});
define('reservey/tests/unit/rs-service/edit/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | rs-service/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rs-service/edit');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/rs-service/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | rs-service/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rs-service/index');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/rs-service/new/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | rs-service/new', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rs-service/new');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/rs-service/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | rs-service', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rs-service');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/service-items/model-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | service items', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('service-items', {}));
      assert.ok(model);
    });
  });
});
define('reservey/tests/unit/service/model-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | service', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('service', {}));
      assert.ok(model);
    });
  });
});
define('reservey/tests/unit/services/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | services', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:services');
      assert.ok(route);
    });
  });
});
define('reservey/tests/unit/session/service-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | session', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:session');
      assert.ok(service);
    });
  });
});
define('reservey/tests/unit/sidebar/service-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | sidebar', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:sidebar');
      assert.ok(service);
    });
  });
});
define('reservey/tests/unit/users/model-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | users', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = Ember.run(() => store.createRecord('users', {}));
      assert.ok(model);
    });
  });
});
define('reservey/config/environment', [], function() {
  var prefix = 'reservey';
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

require('reservey/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
