'use strict';

define('reservey/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

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

  QUnit.test('components/rs-header/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/rs-header/component.js should pass ESLint\n\n');
  });

  QUnit.test('components/rs-sidebar/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/rs-sidebar/component.js should pass ESLint\n\n');
  });

  QUnit.test('formats.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'formats.js should pass ESLint\n\n');
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
    assert.ok(true, 'rs-classrooms/route.js should pass ESLint\n\n');
  });

  QUnit.test('rs-classrooms/rs-reservation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rs-classrooms/rs-reservation/route.js should pass ESLint\n\n');
  });

  QUnit.test('rs-classrooms/rs-reservation/rs-reservations/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rs-classrooms/rs-reservation/rs-reservations/route.js should pass ESLint\n\n');
  });

  QUnit.test('rs-reservations-overview/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'rs-reservations-overview/route.js should pass ESLint\n\n');
  });

  QUnit.test('session/service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'session/service.js should pass ESLint\n\n');
  });

  QUnit.test('sidebar/service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'sidebar/service.js should pass ESLint\n\n');
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
define('reservey/tests/test-helper', ['reservey/app', 'reservey/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('reservey/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/rs-header/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rs-header/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/rs-sidebar/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rs-sidebar/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/application/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/application/controller-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/application/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/application/route-test.js should pass ESLint\n\n');
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

  QUnit.test('unit/session/service-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/session/service-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/sidebar/service-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/sidebar/service-test.js should pass ESLint\n\n');
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
