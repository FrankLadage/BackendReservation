"use strict";



define('reservey/app', ['exports', 'reservey/resolver', 'ember-load-initializers', 'reservey/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('reservey/application/controller', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
define('reservey/application/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    var SidebarItem = Ember.Object.extend({
        label: '',
        to: '',
        icon: ''
    });

    exports.default = Ember.Route.extend({
        model: function () {
            var classrooms = SidebarItem.create({
                label: 'Overview',
                to: 'rs-agenda',
                icon: 'dashboard'
            });
            var agenda = SidebarItem.create({
                label: 'Agenda',
                to: 'rs-classrooms',
                icon: 'view_agenda'
            });
            var reservations = SidebarItem.create({
                label: 'Agenda',
                to: 'rs-classrooms',
                icon: 'view_agenda'
            });
            var reservationsOverview = SidebarItem.create({
                label: 'Reservations',
                to: 'rs-reservations-overview',
                icon: 'fingerprint'
            });

            return [classrooms, agenda, reservations, reservationsOverview];
        }
    });
});
define("reservey/application/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "IwrYpHEx", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"rs-sidebar\",null,[[\"model\"],[[22,[\"model\"]]]]],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/application/template.hbs" } });
});
define("reservey/cldrs/en", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = [{ "locale": "en-US", "parentLocale": "en" }, { "locale": "en", "pluralRuleFunction": function (n, ord) {
      var s = String(n).split("."),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";return n == 1 && v0 ? "one" : "other";
    }, "fields": { "year": { "displayName": "year", "relative": { "0": "this year", "1": "next year", "-1": "last year" }, "relativeTime": { "future": { "one": "in {0} year", "other": "in {0} years" }, "past": { "one": "{0} year ago", "other": "{0} years ago" } } }, "month": { "displayName": "month", "relative": { "0": "this month", "1": "next month", "-1": "last month" }, "relativeTime": { "future": { "one": "in {0} month", "other": "in {0} months" }, "past": { "one": "{0} month ago", "other": "{0} months ago" } } }, "day": { "displayName": "day", "relative": { "0": "today", "1": "tomorrow", "-1": "yesterday" }, "relativeTime": { "future": { "one": "in {0} day", "other": "in {0} days" }, "past": { "one": "{0} day ago", "other": "{0} days ago" } } }, "hour": { "displayName": "hour", "relativeTime": { "future": { "one": "in {0} hour", "other": "in {0} hours" }, "past": { "one": "{0} hour ago", "other": "{0} hours ago" } } }, "minute": { "displayName": "minute", "relativeTime": { "future": { "one": "in {0} minute", "other": "in {0} minutes" }, "past": { "one": "{0} minute ago", "other": "{0} minutes ago" } } }, "second": { "displayName": "second", "relative": { "0": "now" }, "relativeTime": { "future": { "one": "in {0} second", "other": "in {0} seconds" }, "past": { "one": "{0} second ago", "other": "{0} seconds ago" } } } } }];
});
define('reservey/components/rs-header/component', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({

        tagName: '',
        session: Ember.inject.service('session'),

        actions: {
            dropdownthis() {
                this.toggleProperty('dropdown');
            },
            invalidateSession() {
                this.get('session').invalidate();
            },
            validateSession() {
                this.get('session').validate();
            },
            authenticate() {
                let { identification, password } = this.getProperties('identification', 'password');
                this.get('session').authenticate('authenticator:oauth2', identification, password).catch(reason => {
                    this.set('errorMessage', reason.error || reason);
                });
            }
        }
    });
});
define("reservey/components/rs-header/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8zfgkw4v", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"div\"],[10,\"class\",\"hr-header\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"hr-header__title\"],[8],[1,[20,\"title\"],false],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"hr-header__login\"],[11,\"onClick\",[26,\"action\",[[21,0,[]],\"dropdownthis\"],null],null],[8],[0,\"\\n        Welcome name\\n    \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"dropdown\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"hr-header__login--dropdown\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"                \"],[6,\"a\"],[3,\"action\",[[21,0,[]],\"invalidateSession\"]],[8],[0,\"Logout\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                Please Login first\\n\"]],\"parameters\":[]}],[0,\"        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[9],[0,\"\\n\\n\"],[13,1]],\"hasEval\":false}", "meta": { "moduleName": "reservey/components/rs-header/template.hbs" } });
});
define('reservey/components/rs-sidebar/component', ['exports', 'ember-component-inbound-actions/inbound-actions', 'ember-get-config'], function (exports, _inboundActions, _emberGetConfig) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	const transitionDelayMs = 150;

	const {
		rootURL
	} = _emberGetConfig.default;

	exports.default = Ember.Component.extend(_inboundActions.default, {
		tagName: '',
		rootURL,
		svc: Ember.inject.service('sidebar'),

		init() {
			// eslint-disable-next-line prefer-rest-params, no-underscore-dangle
			this._super(...arguments);

			Ember.set(this, 'svc.toggleExpand', this.actions.toggleExpand.bind(this));
		},

		expanded: true,
		collapsed: Ember.computed.not('expanded'),
		isExpanding: false,

		actions: {
			toggleExpand() {
				this.toggleProperty('isExpanding');
				this.toggleProperty('expanded');

				Ember.run.debounce(this, () => {
					if (!(Ember.get(this, 'isDestroyed') || Ember.get(this, 'isDestroying'))) {
						this.toggleProperty('isExpanding');
					}
				}, transitionDelayMs);
			}
		}
	});
});
define("reservey/components/rs-sidebar/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "daDFFjBB", "block": "{\"symbols\":[\"item\"],\"statements\":[[6,\"div\"],[11,\"class\",[27,[\"sidebar\",[26,\"unless\",[[22,[\"expanded\"]],\" sidebar--collapsed\"],null]]]],[10,\"data-test-selector\",\"sidebar\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"sidebar__logo__wrapper\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"device\",\"isMobile\"]]],null,{\"statements\":[[4,\"if\",[[22,[\"expanded\"]]],null,{\"statements\":[[0,\"                \"],[6,\"img\"],[10,\"alt\",\"logo\"],[11,\"class\",[27,[\"sidebar__logo--\",[26,\"if\",[[22,[\"expanded\"]],\"large\",\"small\"],null]]]],[11,\"src\",[26,\"concat\",[[22,[\"rootURL\"]],\"assets/images/logo-large.svg\"],null],null],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[6,\"img\"],[10,\"alt\",\"logo\"],[11,\"class\",[27,[\"sidebar__logo--\",[26,\"if\",[[22,[\"expanded\"]],\"large\",\"small\"],null]]]],[11,\"src\",[26,\"concat\",[[22,[\"rootURL\"]],\"assets/images/\",[26,\"if\",[[22,[\"expanded\"]],\"logo-large\",\"logo-small\"],null],\".svg\"],null],null],[8],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"expanded\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"sidebar__logo--title\"],[8],[0,\"\\n                    Hogeschool Rotterdam\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]}],[0,\"    \"],[9],[0,\"\\n    \"],[6,\"nav\"],[10,\"class\",\"sidebar__nav\"],[10,\"data-test-selector\",\"sidebar-nav\"],[8],[0,\"\\n        \"],[6,\"ul\"],[10,\"class\",\"sidebar__toggle__row\"],[8],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"sidebar__toggle sidebar__cell\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"toggleExpand\"],null],null],[10,\"data-test-selector\",\"sidebar-nav-toggle\"],[8],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"sidebar__icon\"],[10,\"align\",\"center\"],[8],[0,\"\\n                    \"],[6,\"i\"],[10,\"class\",\"material-icons sidebar__icon__element\"],[8],[1,[26,\"concat\",[\"chevron_\",[26,\"if\",[[22,[\"expanded\"]],\"left\",\"right\"],null]],null],false],[9],[0,\"\\n                \"],[9],[0,\"\\n            \"],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"ul\"],[10,\"class\",\"sidebar__menu\"],[10,\"data-test-selector\",\"sidebar-menu\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[4,\"link-to\",[[21,1,[\"to\"]]],[[\"class\"],[\"sidebar__cell sidebar__submenu__item\"]],{\"statements\":[[0,\"                    \"],[6,\"div\"],[10,\"class\",\"sidebar__icon\"],[10,\"align\",\"center\"],[10,\"data-test-selector\",\"sidebar-menu-item-icon\"],[8],[0,\"\\n                        \"],[6,\"i\"],[10,\"class\",\"material-icons\"],[8],[1,[21,1,[\"icon\"]],false],[9],[0,\"\\n                    \"],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"sidebar__item__label\"],[10,\"data-test-selector\",\"sidebar-menu-item-label\"],[8],[0,\"\\n                        \"],[1,[21,1,[\"label\"]],false],[0,\"\\n                    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "reservey/components/rs-sidebar/template.hbs" } });
});
define('reservey/formats', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    time: {
      hhmmss: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
    },
    date: {
      hhmmss: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
    },
    number: {
      EUR: {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      },
      USD: {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    }
  };
});
define('reservey/helpers/app-version', ['exports', 'reservey/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('reservey/helpers/format-date', ['exports', 'ember-intl/helpers/format-date'], function (exports, _formatDate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _formatDate.default;
    }
  });
});
define('reservey/helpers/format-html-message', ['exports', 'ember-intl/helpers/format-html-message'], function (exports, _formatHtmlMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _formatHtmlMessage.default;
    }
  });
});
define('reservey/helpers/format-message', ['exports', 'ember-intl/helpers/format-message'], function (exports, _formatMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _formatMessage.default;
    }
  });
});
define('reservey/helpers/format-number', ['exports', 'ember-intl/helpers/format-number'], function (exports, _formatNumber) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _formatNumber.default;
    }
  });
});
define('reservey/helpers/format-relative', ['exports', 'ember-intl/helpers/format-relative'], function (exports, _formatRelative) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _formatRelative.default;
    }
  });
});
define('reservey/helpers/format-time', ['exports', 'ember-intl/helpers/format-time'], function (exports, _formatTime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _formatTime.default;
    }
  });
});
define('reservey/helpers/intl-get', ['exports', 'ember-intl/helpers/intl-get'], function (exports, _intlGet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _intlGet.default;
    }
  });
});
define('reservey/helpers/l', ['exports', 'ember-intl/helpers/l'], function (exports, _l) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _l.default;
    }
  });
});
define('reservey/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('reservey/helpers/send', ['exports', 'ember-component-inbound-actions/helpers/send'], function (exports, _send) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _send.default;
    }
  });
});
define('reservey/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('reservey/helpers/t-html', ['exports', 'ember-intl/helpers/format-html-message'], function (exports, _formatHtmlMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _formatHtmlMessage.default;
    }
  });
});
define('reservey/helpers/t', ['exports', 'ember-intl/helpers/t'], function (exports, _t) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _t.default;
    }
  });
});
define('reservey/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'reservey/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('reservey/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('reservey/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('reservey/initializers/export-application-global', ['exports', 'reservey/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("reservey/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('reservey/instance-initializers/ember-intl', ['exports', 'ember-intl/initializer'], function (exports, _initializer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.instanceInitializer = undefined;
  exports.instanceInitializer = _initializer.instanceInitializer;
  exports.default = _initializer.default;
});
define('reservey/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('reservey/router', ['exports', 'reservey/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('rs-agenda', { path: '/agenda' });
    this.route('rs-classrooms', { path: '/classrooms' }, function () {
      this.route('rs-reservation', { path: ':slug' }, function () {
        this.route('rs-reservations', { path: '/reservations' });
      });
    });

    this.route('rs-reservations-overview', { path: '/reservations-overview' });
  });

  exports.default = Router;
});
define('reservey/rs-agenda/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define("reservey/rs-agenda/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YH1pQvFN", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"rs-header\",null,[[\"title\"],[\"Agenda\"]]],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"content\"],[8],[0,\"\\n\\thoiiiiasdasdasd\\n\"],[9],[0,\"\\n\\n\"],[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-agenda/template.hbs" } });
});
define("reservey/rs-classrooms/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kXf/6oes", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"list-group\"],[8],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"list-group-item empty-list\"],[8],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"empty-message\"],[8],[0,\"\\nSelecteer een lokaal.\\n\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-classrooms/index/template.hbs" } });
});
define('reservey/rs-classrooms/route', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	let Classroom = Ember.Object.extend({
		name: '',
		capacity: 0,
		facility: '',
		outlets: 0,

		slug: Ember.computed('name', function () {
			return this.get('name').dasherize();
		})
	});

	let Reservation = Ember.Object.extend({
		classroom: '',
		timebox: '',
		attendants: ''
	});

	exports.default = Ember.Route.extend({
		model: function () {
			let one = Reservation.create({ classroom: 'first Reservation', timebox: '', attendants: '' });
			let two = Reservation.create({ classroom: 'second Reservation', timebox: '', attendants: '' });
			let three = Reservation.create({ classroom: 'third Reservation', timebox: '', attendants: '' });

			let H1 = Classroom.create({
				name: 'H1.2.1',
				capacity: 28,
				facility: 'None',
				outlets: 26,
				Reservations: [one]
			});
			let H2 = Classroom.create({
				name: 'WD.02.106',
				capacity: 29,
				facility: 'TV',
				outlets: 27,
				Reservations: [two]
			});
			let H3 = Classroom.create({
				name: 'H4.2.1',
				capacity: 30,
				facility: 'Whiteboard',
				outlets: 28,
				Reservations: [three]
			});

			return [H1, H2, H3];
		}
	});
});
define('reservey/rs-classrooms/rs-reservation/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function (params) {
            let classroom = this.modelFor('rs-classroom');
            return classroom.findBy('slug', params.slug);
        }
    });
});
define('reservey/rs-classrooms/rs-reservation/rs-reservations/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function () {
            return this.modelFor('rs-classrooms.rs-reservation');
        }
    });
});
define("reservey/rs-classrooms/rs-reservation/rs-reservations/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "HInWMaYm", "block": "{\"symbols\":[\"reservation\"],\"statements\":[[6,\"ul\"],[10,\"class\",\"list-group\"],[10,\"style\",\"display: flex; flex-direction: column;\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"        \"],[6,\"li\"],[10,\"class\",\"list-group-item\"],[8],[1,[21,1,[\"room\"]],false],[9],[0,\"\\n        \"],[6,\"li\"],[10,\"class\",\"list-group-item\"],[8],[1,[21,1,[\"timebox\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-classrooms/rs-reservation/rs-reservations/template.hbs" } });
});
define("reservey/rs-classrooms/rs-reservation/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pUd0yv3v", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-classrooms/rs-reservation/template.hbs" } });
});
define("reservey/rs-classrooms/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MMihs1UU", "block": "{\"symbols\":[\"classroom\"],\"statements\":[[1,[26,\"rs-header\",null,[[\"title\"],[\"Overview\"]]],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"content\"],[8],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"overview\"],[8],[0,\"\\n\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list\"],[8],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__header\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__header--item\"],[8],[0,\"Classroom\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__header--item\"],[8],[0,\"Facilities\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__header--item\"],[8],[0,\"Capacity\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__header--item\"],[8],[0,\"Outlets\"],[9],[0,\"\\n\\t\\t\\t\"],[9],[0,\"\\n\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list--item\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"rs-classrooms.rs-reservation.rs-reservations\",[21,1,[]]],[[\"class\"],[\"list-group-item band-link\"]],{\"statements\":[[0,\"\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list--name\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list--facility\"],[8],[1,[21,1,[\"facility\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list--capacity\"],[8],[1,[21,1,[\"capacity\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list--outlets\"],[8],[1,[21,1,[\"outlets\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"span\"],[10,\"class\",\"pointer glyphicon glyphicon-chevron-right\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\t\\t\\t\\t\\t\"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__right\"],[8],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__filter\"],[8],[0,\"\\n\\t\\t\\t\\ttest\\n\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__reservations\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[1,[20,\"outlet\"],false],[0,\"\\n\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\\t\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-classrooms/template.hbs" } });
});
define('reservey/rs-reservations-overview/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    var Reservation = Ember.Object.extend({
        name: ''
    });

    exports.default = Ember.Route.extend({
        model: function () {
            var one = Reservation.create({ classroom: 'first Reservation Overview' });
            var two = Reservation.create({ classroom: 'second Reservation Overview' });
            var three = Reservation.create({ classroom: 'third Reservation Overview' });

            return [one, two, three];
        }
    });
});
define("reservey/rs-reservations-overview/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9ObEhVax", "block": "{\"symbols\":[\"reservation\"],\"statements\":[[1,[26,\"rs-header\",null,[[\"title\"],[\"Reservations\"]]],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"content\"],[8],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"list-group\"],[10,\"style\",\"display: flex; flex-direction: column;\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"            \"],[6,\"li\"],[10,\"class\",\"list-group-item\"],[8],[1,[21,1,[\"classroom\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-reservations-overview/template.hbs" } });
});
define('reservey/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('reservey/services/intl', ['exports', 'ember-intl/services/intl'], function (exports, _intl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _intl.default;
    }
  });
});
define('reservey/session/service', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({});
});
define('reservey/sidebar/service', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({});
});
define("reservey/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ny8yizT8", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"rs-sidebar\"],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/templates/application.hbs" } });
});
define("reservey/translations/en-us", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = { "product": { "html": { "info": "<strong>{product}</strong> will cost <em>{price, number, USD}</em> if ordered by {deadline, date, time}" }, "info": "{product} will cost {price, number, USD} if ordered by {deadline, date, time}", "title": "Hello world!" } };
});
define('reservey/utils/intl/missing-message', ['exports', 'ember-intl/utils/missing-message'], function (exports, _missingMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _missingMessage.default;
    }
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

if (!runningTests) {
  require("reservey/app")["default"].create({"name":"reservey","version":"0.0.0+e76f5520"});
}
//# sourceMappingURL=reservey.map
