"use strict";



define('reservey/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default.extend({});
});
define('reservey/admin/controller', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        name: '',
        onDialogEnabled: false,
        isEditable: false,
        isShowingDialog: false,
        test: false,

        isAddButtonDisabled: Ember.computed('name', function () {
            return Ember.isEmpty(this.get('name'));
        }),

        actions: {
            onToggleDialog() {
                this.toggleProperty('isShowingDialog');
            },

            createClassroom() {
                const name = this.get('name');
                const facility = this.get('facility');
                const capacity = this.get('capacity');
                const outlets = this.get('outlets');

                const newClassroom = this.store.createRecord('classrooms', { name: name, facility: facility, capacity: capacity, outlets: outlets });
                newClassroom.save();

                this.set('responseMessage', `Thank you! We have just saved your new classroom: ${this.get('name')}`);
                this.setProperties({ name: '', facility: '', capacity: '', outlets: '' });
                this.toggleProperty('isShowingDialog');
            }
        }
    });
});
define('reservey/admin/edit/controller', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        name: '',
        onDialogEnabled: false,
        isEditable: false,
        isShowingDialog: false,
        test: false,

        isAddButtonDisabled: Ember.computed('name', function () {
            return Ember.isEmpty(this.get('name'));
        }),

        actions: {
            onToggleDialog() {
                this.toggleProperty('isShowingDialog');
            },
            toggleEditableInputs() {
                this.toggleProperty('isEditable');
            },
            createClassroom() {
                const name = this.get('name');
                const facility = this.get('facility');
                const capacity = this.get('capacity');
                const outlets = this.get('outlets');

                const newClassroom = this.store.createRecord('classrooms', { name: name, facility: facility, capacity: capacity, outlets: outlets });
                newClassroom.save();

                this.set('responseMessage', `Thank you! We have just saved your new classroom: ${this.get('name')}`);
                this.setProperties({ name: '', facility: '', capacity: '', outlets: '' });
                this.toggleProperty('isShowingDialog');
            }
        }
    });
});
define('reservey/admin/edit/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({

        model(params) {
            return this.store.findRecord('classrooms', params.classroom_id);
        },

        didTransition: function () {
            document.title = 'Reservey - Admin edit';
        },

        actions: {
            saveClassroom(editedClassroom) {
                editedClassroom.save().then(() => this.transitionTo('admin'));
            },

            willTransition(transition) {
                let model = this.controller.get('model');

                if (model.get('hasDirtyAttributes')) {
                    let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

                    if (confirmation) {
                        model.rollbackAttributes();
                    } else {
                        transition.abort();
                    }
                }
            }
        }
    });
});
define("reservey/admin/edit/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ih0IMj5T", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"content\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"admin__edit-mode\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"admin__edit-mode--card\"],[8],[0,\"\\n            \"],[6,\"h3\"],[8],[0,\"Edit classrooms\"],[9],[0,\"\\n            \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[22,[\"model\",\"name\"]],\"Classroom\"]]],false],[0,\"\\n            \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"text\",[22,[\"model\",\"facility\"]],\"Facilities\"]]],false],[0,\"\\n            \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"number\",[22,[\"model\",\"capacity\"]],\"Capacity of the room\"]]],false],[0,\"\\n            \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"placeholder\"],[\"number\",[22,[\"model\",\"outlets\"]],\"Amount of outlets in the room\"]]],false],[0,\"\\n            \"],[6,\"button\"],[10,\"class\",\"form__button\"],[10,\"type\",\"submit\"],[3,\"action\",[[21,0,[]],\"saveClassroom\",[22,[\"model\"]]]],[8],[0,\"Save changes\"],[9],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/admin/edit/template.hbs" } });
});
define('reservey/admin/index/controller', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        name: '',
        onDialogEnabled: false,
        isEditable: false,
        isShowingDialog: false,
        test: false,

        isAddButtonDisabled: Ember.computed.empty('name'),

        actions: {
            onToggleDialog() {
                this.toggleProperty('isShowingDialog');
            },
            toggleEditableInputs() {
                this.toggleProperty('isEditable');
            },

            createClassroom() {
                const name = this.get('name');
                const facility = this.get('facility');
                const capacity = this.get('capacity');
                const outlets = this.get('outlets');

                const newClassroom = this.store.createRecord('classrooms', { name: name, facility: facility, capacity: capacity, outlets: outlets });
                newClassroom.save();

                this.set('responseMessage', `Thank you! We have just saved your new classroom: ${this.get('name')}`);
                this.setProperties({ name: '', facility: '', capacity: '', outlets: '' });
                this.toggleProperty('isShowingDialog');
            }
        }
    });
});
define('reservey/admin/index/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        dialog: Ember.inject.service('dialog'),

        model() {
            return this.store.findAll('classrooms');
        },

        actions: {
            didTransition: function () {
                document.title = 'Reservey - Admin';
            },
            willTransition: function (transition) {
                var controller = this.controller.get('isEditable');
                //TODO Fancy popup ISO confirm..
                if (controller && !confirm("You have unsaved changes. Are you sure you want to leave?")) {
                    transition.abort();
                } else {
                    return true;
                }
            },
            deleteClassroom(classrooms) {
                let confirmation = confirm('Are you sure?');

                if (confirmation) {
                    classrooms.destroyRecord();
                }
            }
        }
    });
});
define("reservey/admin/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "u2AfXfAn", "block": "{\"symbols\":[\"classroom\"],\"statements\":[[4,\"if\",[[22,[\"responseMessage\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"alert alert-success\"],[8],[1,[20,\"responseMessage\"],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[6,\"div\"],[10,\"class\",\"classrooms\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"classrooms__list__wrapper\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"classrooms__list\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"classrooms__header\"],[8],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"classrooms__header--item\"],[8],[0,\"Classroom\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"classrooms__header--item\"],[8],[0,\"Facilities\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"classrooms__header--item\"],[8],[0,\"Capacity\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"classrooms__header--item\"],[8],[0,\"Outlets\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"classrooms__header--icon--placeholder\"],[8],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"classrooms__header--icon\"],[8],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[26,\"action\",[[21,0,[]],\"onToggleDialog\"],null]]],{\"statements\":[[1,[26,\"paper-icon\",null,[[\"icon\"],[\"add\"]]],false]],\"parameters\":[]},null],[9],[0,\"\\n            \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"classrooms__list--item\"],[8],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"classrooms__list--name\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"classrooms__list--facility\"],[8],[1,[21,1,[\"facility\"]],false],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"classrooms__list--capacity\"],[8],[1,[21,1,[\"capacity\"]],false],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"classrooms__list--outlets\"],[8],[1,[21,1,[\"outlets\"]],false],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"classrooms__list--icon classrooms__list--icon--edit\"],[8],[4,\"link-to\",[\"admin.edit\",[21,1,[\"id\"]]],null,{\"statements\":[[6,\"i\"],[10,\"class\",\"material-icons\"],[8],[0,\"edit\"],[9]],\"parameters\":[]},null],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"classrooms__list--icon classrooms__list--icon--delete\"],[3,\"action\",[[21,0,[]],\"deleteClassroom\",[21,1,[]]]],[8],[6,\"i\"],[10,\"class\",\"material-icons\"],[8],[0,\"delete\"],[9],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"isShowingDialog\"]]],null,{\"statements\":[[4,\"paper-dialog\",null,[[\"class\",\"onClose\",\"origin\",\"clickOutsideToClose\"],[\"flex-40\",[26,\"action\",[[21,0,[]],\"onToggleDialog\"],null],[22,[\"dialogOrigin\"]],true]],{\"statements\":[[4,\"paper-toolbar\",null,null,{\"statements\":[[4,\"paper-toolbar-tools\",null,[[\"class\"],[\"dialog__header\"]],{\"statements\":[[0,\"\\t\\t\"],[6,\"h2\"],[8],[0,\"Add classroom\"],[9],[0,\"\\n\\t\\t\"],[6,\"span\"],[10,\"class\",\"flex\"],[8],[9],[0,\"\\n\\t\\t\"],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[26,\"action\",[[21,0,[]],\"onToggleDialog\"],null]]],{\"statements\":[[1,[26,\"paper-icon\",null,[[\"icon\"],[\"close\"]]],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"dialog__content\"],[8],[0,\"\\n\\t\\t\"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"\",\"Classroom\",[22,[\"name\"]]]]],false],[0,\"\\n\\t\\t\"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"\",\"Facilities\",[22,[\"facility\"]]]]],false],[0,\"\\n\\t\\t\"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"number\",\"\",\"Capacity\",[22,[\"capacity\"]]]]],false],[0,\"\\n\\t\\t\"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"number\",\"\",\"Outlets\",[22,[\"outlets\"]]]]],false],[0,\"\\n\\t\"],[9],[0,\"\\n\\n\"],[4,\"paper-dialog-actions\",null,[[\"class\"],[\"layout-row\"]],{\"statements\":[[0,\"\\t\\t\"],[6,\"button\"],[10,\"class\",\"dialog__button--cancel\"],[3,\"action\",[[21,0,[]],\"onToggleDialog\"]],[8],[0,\"Cancel\"],[9],[0,\"\\n\\t\\t\"],[6,\"button\"],[10,\"class\",\"dialog__button--confirm\"],[11,\"disabled\",[20,\"isAddButtonDisabled\"],null],[3,\"action\",[[21,0,[]],\"createClassroom\"]],[8],[0,\"Add\"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "reservey/admin/index/template.hbs" } });
});
define('reservey/admin/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model() {
            return this.store.findAll('classrooms');
        },

        actions: {
            didTransition: function () {
                document.title = 'Reservey - Admin';
            },
            willTransition: function (transition) {
                var controller = this.controller.get('isEditable');
                //TODO Fancy popup ISO confirm..
                if (controller && !confirm("You have unsaved changes. Are you sure you want to leave?")) {
                    transition.abort();
                } else {
                    return true;
                }
            }
        }
    });
});
define("reservey/admin/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FBqGoRp/", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"rs-header\",null,[[\"title\"],[\"Admin Panel\"]]],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"content\"],[8],[0,\"\\n\\t\"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/admin/template.hbs" } });
});
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
        beforeModel: function () {
            // this.transitionTo('classrooms');
        },

        model: function () {
            var classrooms = SidebarItem.create({
                label: 'Agenda',
                to: 'rs-agenda',
                icon: 'dashboard'
            });
            var agenda = SidebarItem.create({
                label: 'Overview',
                to: 'classrooms',
                icon: 'view_agenda'
            });
            var reservations = SidebarItem.create({
                label: 'Service Panel',
                to: 'rs-service',
                icon: 'record_voice_over'
            });
            var reservationsOverview = SidebarItem.create({
                label: 'Admin Panel',
                to: 'admin',
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
define('reservey/classrooms/classroom/model', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Object.extend({
		name: '',

		init: function () {
			this._super(...arguments);
			if (!this.get('reservations')) {
				this.set('reservations', []);
			}
		},

		slug: Ember.computed('name', function () {
			return this.get('name').dasherize();
		})
	});
});
define('reservey/classrooms/classroom/reservations/controller', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        sortBy: 'ratingDesc',
        sortedProperties: Ember.computed('sortBy', function () {
            var options = {
                'classroomDesc': 'classroom:asc',
                'classroomAsc': 'classroom:asc',
                'attendantsDesc': 'attendants:desc',
                'attendantsAsc': 'attendants:asc'
            };
            return options[this.get('sortBy')];
        }),
        sortedReservations: Ember.computed.sort('model.reservations', 'sortedProperties'),
        showDialog: false,

        actions: {
            openDialog() {
                this.get('dialog').openReservations();
            },
            toggleDialog() {
                this.toggleProperty('showDialog');
            },
            closeDialog() {},
            setSorting(option) {
                this.set('sortBy', option);
            }
        }
    });
});
define('reservey/classrooms/classroom/reservations/model', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Object.extend({
        //zie reservations/model
    });
});
define('reservey/classrooms/classroom/reservations/route', ['exports', 'reservey/reservations/model'], function (exports, _model) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        dialog: Ember.inject.service(),

        model: function () {
            return this.modelFor('classrooms.classroom');
        },
        actions: {
            createReservation: function () {
                var controller = this.get('controller');
                var classroom = this.modelFor('classrooms.classroom');
                var attendants = controller.get('attendants');
                var reservation = _model.default.create({ attendants: attendants, classroom: classroom });
                classroom.get('reservations').pushObject(reservation);
                controller.set('attendants', '');
            },
            didTransition: function () {
                var classroom = this.modelFor('classrooms.classroom');
                document.title = `Reservey - Classroom ${classroom.get('name')}`;
            },
            closeDialog() {}
        }
    });
});
define("reservey/classrooms/classroom/reservations/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5rjLiGlh", "block": "{\"symbols\":[\"reservation\"],\"statements\":[[6,\"div\"],[10,\"class\",\"reservation__header\"],[8],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"reservation__header--item\"],[8],[0,\"Attendants\"],[9],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"reservation__header--item\"],[8],[0,\"Classroom\"],[9],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"reservation__header--item\"],[8],[0,\"Timebox\"],[9],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"reservation__header--icon\"],[8],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[26,\"action\",[[21,0,[]],\"toggleDialog\"],null]]],{\"statements\":[[1,[26,\"paper-icon\",null,[[\"icon\"],[\"add\"]]],false]],\"parameters\":[]},null],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"sortedReservations\"]]],null,{\"statements\":[[0,\"\\t\"],[6,\"div\"],[10,\"class\",\"reservation__list--item\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"reservation.classroom.reservations\",[22,[\"classroom\"]]],[[\"class\"],[\"list-group-item classroom-link\"]],{\"statements\":[[0,\"\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"reservation--item\"],[8],[1,[21,1,[\"attendants\"]],false],[9],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"reservation--item\"],[8],[1,[21,1,[\"classroom\"]],false],[9],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"reservation--item\"],[8],[1,[21,1,[\"timebox\"]],false],[9],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"reservation--icon\"],[8],[6,\"i\"],[10,\"class\",\"material-icons\"],[8],[0,\"delete\"],[9],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\t\"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n\"],[4,\"if\",[[22,[\"showDialog\"]]],null,{\"statements\":[[0,\"\\t\"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"\",\"New reservation\",[22,[\"attendants\"]]]]],false],[0,\"\\n\\t\"],[6,\"button\"],[10,\"class\",\"\"],[3,\"action\",[[21,0,[]],\"createReservation\"]],[8],[0,\"Add\"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "reservey/classrooms/classroom/reservations/template.hbs" } });
});
define('reservey/classrooms/classroom/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function (params) {
            return this.store.findRecord('classroom', params.classroom_id);
        }
    });
});
define("reservey/classrooms/classroom/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gSf1Gjdf", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "reservey/classrooms/classroom/template.hbs" } });
});
define('reservey/classrooms/controller', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
define("reservey/classrooms/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cXEwZPt0", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"reservation__placeholder\"],[8],[0,\"\\n    Select a classroom.\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/classrooms/index/template.hbs" } });
});
define('reservey/classrooms/model', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        name: _emberData.default.attr('string'),
        facility: _emberData.default.attr('string'),
        capacity: _emberData.default.attr('number'),
        outlets: _emberData.default.attr('number')

        // reservations: DS.hasMany('reservations'),
    });
});
define('reservey/classrooms/reservations/index/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model() {
      return this.store.findAll('reservations');
    },

    actions: {}
  });
});
define("reservey/classrooms/reservations/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "plfZYWXv", "block": "{\"symbols\":[\"reservation\"],\"statements\":[[6,\"div\"],[10,\"class\",\"reservations\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"reservations__list__wrapper\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"reservations__list\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"reservations__header\"],[8],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"reservations__header--item\"],[8],[0,\"Attendants\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"reservations__header--item\"],[8],[0,\"Timebox\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"reservations__header--item\"],[8],[0,\"Classroom\"],[9],[0,\"\\n\"],[0,\"            \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"reservations__list--item\"],[8],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"reservations__list--attendants\"],[8],[1,[21,1,[\"attendants\"]],false],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"reservations__list--timebox\"],[8],[1,[21,1,[\"timebox\"]],false],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"reservations__list--classroom\"],[8],[1,[21,1,[\"classroom\"]],false],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/classrooms/reservations/index/template.hbs" } });
});
define('reservey/classrooms/reservations/new/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model() {
      return this.store.createRecord('reservations');
    },

    actions: {

      saveReservation(newReservation) {
        newReservation.save().then(() => this.transitionTo('classrooms'));
      },

      willTransition() {
        this.controller.get('model').rollbackAttributes();
      }
    }
  });
});
define("reservey/classrooms/reservations/new/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "43Jrirvu", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"model\",\"attendants\"]],\"form-control\",\"Attendant\"]]],false],[0,\"\\n\"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"model\",\"classrooms\"]],\"form-control\",\"Classroom\"]]],false],[0,\"\\n\"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"model\",\"timebox\"]],\"form-control\",\"Timebox\"]]],false],[0,\"\\n\"],[6,\"button\"],[10,\"class\",\"\"],[10,\"type\",\"submit\"],[3,\"action\",[[21,0,[]],\"saveReservation\",[22,[\"model\"]]]],[8],[0,\"Save Reservation\"],[9],[0,\"\\n\\n\"],[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "reservey/classrooms/reservations/new/template.hbs" } });
});
define('reservey/classrooms/reservations/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model() {
      // return this.store.createRecord('reservations');
      return this.store.findAll('reservations');
    },

    actions: {
      didTransition: function () {
        document.title = 'Reservey - Reservations';
      },
      saveReservation(newReservation) {
        newReservation.save().then(() => this.transitionTo('classrooms'));
      },

      willTransition() {
        this.controller.get('model').rollbackAttributes();
      }
    }
  });
});
define("reservey/classrooms/reservations/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GFlFp4m7", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "reservey/classrooms/reservations/template.hbs" } });
});
define('reservey/classrooms/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model() {
            return this.store.findAll('classrooms');
        },

        actions: {
            didTransition: function () {
                document.title = 'Reservey - Classrooms';
            },
            willTransition: function (transition) {
                var controller = this.controller.get('isEditable');
                //TODO Fancy popup ISO confirm..
                if (controller && !confirm("You have unsaved changes. Are you sure you want to leave?")) {
                    transition.abort();
                } else {
                    return true;
                }
            }
        }
    });
});
define("reservey/classrooms/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0kW8NA/X", "block": "{\"symbols\":[\"classroom\"],\"statements\":[[1,[26,\"rs-header\",null,[[\"title\"],[\"Classrooms overview\"]]],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"content\"],[8],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"classrooms\"],[8],[0,\"\\n\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__list__wrapper\"],[8],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__list\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__header\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__header--item\"],[8],[0,\"Classroom\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__header--item\"],[8],[0,\"Facilities\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__header--item\"],[8],[0,\"Capacity\"],[9],[0,\"\\n\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__header--item\"],[8],[0,\"Outlets\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[4,\"link-to\",[\"classrooms.reservations\"],[[\"class\"],[\"\"]],{\"statements\":[[0,\"\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__list--item\"],[8],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__list--name\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__list--facility\"],[8],[1,[21,1,[\"facility\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__list--capacity\"],[8],[1,[21,1,[\"capacity\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__list--outlets\"],[8],[1,[21,1,[\"outlets\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__right\"],[8],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__filter\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"list-group-item\"],[8],[0,\"\\n\\t\\t\\t\\t\\tfilter\\n\\t\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"classrooms__reservations\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[1,[20,\"outlet\"],false],[0,\"\\n\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\\t\"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/classrooms/template.hbs" } });
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
define('reservey/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _basicDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _basicDropdown.default;
    }
  });
});
define('reservey/components/basic-dropdown/content-element', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content-element'], function (exports, _contentElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentElement.default;
    }
  });
});
define('reservey/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('reservey/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('reservey/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormhole) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
define('reservey/components/paper-autocomplete-content', ['exports', 'ember-paper/components/paper-autocomplete-content'], function (exports, _paperAutocompleteContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperAutocompleteContent.default;
});
define('reservey/components/paper-autocomplete-dropdown', ['exports', 'ember-paper/components/paper-autocomplete-dropdown'], function (exports, _paperAutocompleteDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperAutocompleteDropdown.default;
});
define('reservey/components/paper-autocomplete-highlight', ['exports', 'ember-paper/components/paper-autocomplete-highlight'], function (exports, _paperAutocompleteHighlight) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperAutocompleteHighlight.default;
    }
  });
});
define('reservey/components/paper-autocomplete-options', ['exports', 'ember-paper/components/paper-autocomplete-options'], function (exports, _paperAutocompleteOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperAutocompleteOptions.default;
    }
  });
});
define('reservey/components/paper-autocomplete-trigger-container', ['exports', 'ember-paper/components/paper-autocomplete-trigger-container'], function (exports, _paperAutocompleteTriggerContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperAutocompleteTriggerContainer.default;
});
define('reservey/components/paper-autocomplete-trigger', ['exports', 'ember-paper/components/paper-autocomplete-trigger'], function (exports, _paperAutocompleteTrigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperAutocompleteTrigger.default;
});
define('reservey/components/paper-autocomplete', ['exports', 'ember-paper/components/paper-autocomplete'], function (exports, _paperAutocomplete) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperAutocomplete.default;
    }
  });
});
define('reservey/components/paper-backdrop', ['exports', 'ember-paper/components/paper-backdrop'], function (exports, _paperBackdrop) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperBackdrop.default;
});
define('reservey/components/paper-button', ['exports', 'ember-paper/components/paper-button'], function (exports, _paperButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperButton.default;
});
define('reservey/components/paper-card-actions', ['exports', 'ember-paper/components/paper-card-actions'], function (exports, _paperCardActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardActions.default;
});
define('reservey/components/paper-card-avatar', ['exports', 'ember-paper/components/paper-card-avatar'], function (exports, _paperCardAvatar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardAvatar.default;
});
define('reservey/components/paper-card-content', ['exports', 'ember-paper/components/paper-card-content'], function (exports, _paperCardContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardContent.default;
});
define('reservey/components/paper-card-header-headline', ['exports', 'ember-paper/components/paper-card-header-headline'], function (exports, _paperCardHeaderHeadline) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardHeaderHeadline.default;
});
define('reservey/components/paper-card-header-subhead', ['exports', 'ember-paper/components/paper-card-header-subhead'], function (exports, _paperCardHeaderSubhead) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardHeaderSubhead.default;
});
define('reservey/components/paper-card-header-text', ['exports', 'ember-paper/components/paper-card-header-text'], function (exports, _paperCardHeaderText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardHeaderText.default;
});
define('reservey/components/paper-card-header-title', ['exports', 'ember-paper/components/paper-card-header-title'], function (exports, _paperCardHeaderTitle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardHeaderTitle.default;
});
define('reservey/components/paper-card-header', ['exports', 'ember-paper/components/paper-card-header'], function (exports, _paperCardHeader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardHeader.default;
});
define('reservey/components/paper-card-icon-actions', ['exports', 'ember-paper/components/paper-card-icon-actions'], function (exports, _paperCardIconActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardIconActions.default;
});
define('reservey/components/paper-card-image', ['exports', 'ember-paper/components/paper-card-image'], function (exports, _paperCardImage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardImage.default;
});
define('reservey/components/paper-card-media', ['exports', 'ember-paper/components/paper-card-media'], function (exports, _paperCardMedia) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardMedia.default;
});
define('reservey/components/paper-card-title-media', ['exports', 'ember-paper/components/paper-card-title-media'], function (exports, _paperCardTitleMedia) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardTitleMedia.default;
});
define('reservey/components/paper-card-title-text', ['exports', 'ember-paper/components/paper-card-title-text'], function (exports, _paperCardTitleText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardTitleText.default;
});
define('reservey/components/paper-card-title', ['exports', 'ember-paper/components/paper-card-title'], function (exports, _paperCardTitle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardTitle.default;
});
define('reservey/components/paper-card', ['exports', 'ember-paper/components/paper-card'], function (exports, _paperCard) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCard.default;
});
define('reservey/components/paper-checkbox', ['exports', 'ember-paper/components/paper-checkbox'], function (exports, _paperCheckbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCheckbox.default;
});
define('reservey/components/paper-chips', ['exports', 'ember-paper/components/paper-chips'], function (exports, _paperChips) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperChips.default;
});
define('reservey/components/paper-contact-chips', ['exports', 'ember-paper/components/paper-contact-chips'], function (exports, _paperContactChips) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperContactChips.default;
});
define('reservey/components/paper-content', ['exports', 'ember-paper/components/paper-content'], function (exports, _paperContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperContent.default;
});
define('reservey/components/paper-dialog-actions', ['exports', 'ember-paper/components/paper-dialog-actions'], function (exports, _paperDialogActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDialogActions.default;
    }
  });
});
define('reservey/components/paper-dialog-container', ['exports', 'ember-paper/components/paper-dialog-container'], function (exports, _paperDialogContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDialogContainer.default;
    }
  });
});
define('reservey/components/paper-dialog-content', ['exports', 'ember-paper/components/paper-dialog-content'], function (exports, _paperDialogContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDialogContent.default;
    }
  });
});
define('reservey/components/paper-dialog-inner', ['exports', 'ember-paper/components/paper-dialog-inner'], function (exports, _paperDialogInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDialogInner.default;
    }
  });
});
define('reservey/components/paper-dialog', ['exports', 'ember-paper/components/paper-dialog'], function (exports, _paperDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDialog.default;
    }
  });
});
define('reservey/components/paper-divider', ['exports', 'ember-paper/components/paper-divider'], function (exports, _paperDivider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperDivider.default;
});
define('reservey/components/paper-form', ['exports', 'ember-paper/components/paper-form'], function (exports, _paperForm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperForm.default;
});
define('reservey/components/paper-grid-list', ['exports', 'ember-paper/components/paper-grid-list'], function (exports, _paperGridList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperGridList.default;
    }
  });
});
define('reservey/components/paper-grid-tile-footer', ['exports', 'ember-paper/components/paper-grid-tile-footer'], function (exports, _paperGridTileFooter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperGridTileFooter.default;
    }
  });
});
define('reservey/components/paper-grid-tile', ['exports', 'ember-paper/components/paper-grid-tile'], function (exports, _paperGridTile) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperGridTile.default;
    }
  });
});
define('reservey/components/paper-icon', ['exports', 'ember-paper/components/paper-icon'], function (exports, _paperIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperIcon.default;
});
define('reservey/components/paper-ink-bar', ['exports', 'ember-paper/components/paper-ink-bar'], function (exports, _paperInkBar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperInkBar.default;
    }
  });
});
define('reservey/components/paper-input', ['exports', 'ember-paper/components/paper-input'], function (exports, _paperInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperInput.default;
});
define('reservey/components/paper-item', ['exports', 'ember-paper/components/paper-item'], function (exports, _paperItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperItem.default;
});
define('reservey/components/paper-list', ['exports', 'ember-paper/components/paper-list'], function (exports, _paperList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperList.default;
});
define('reservey/components/paper-menu-content-inner', ['exports', 'ember-paper/components/paper-menu-content-inner'], function (exports, _paperMenuContentInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperMenuContentInner.default;
    }
  });
});
define('reservey/components/paper-menu-content', ['exports', 'ember-paper/components/paper-menu-content'], function (exports, _paperMenuContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperMenuContent.default;
    }
  });
});
define('reservey/components/paper-menu-item', ['exports', 'ember-paper/components/paper-menu-item'], function (exports, _paperMenuItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperMenuItem.default;
    }
  });
});
define('reservey/components/paper-menu', ['exports', 'ember-paper/components/paper-menu'], function (exports, _paperMenu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperMenu.default;
    }
  });
});
define('reservey/components/paper-optgroup', ['exports', 'ember-paper/components/paper-optgroup'], function (exports, _paperOptgroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperOptgroup.default;
    }
  });
});
define('reservey/components/paper-option', ['exports', 'ember-paper/components/paper-option'], function (exports, _paperOption) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperOption.default;
});
define('reservey/components/paper-progress-circular', ['exports', 'ember-paper/components/paper-progress-circular'], function (exports, _paperProgressCircular) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperProgressCircular.default;
    }
  });
});
define('reservey/components/paper-progress-linear', ['exports', 'ember-paper/components/paper-progress-linear'], function (exports, _paperProgressLinear) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperProgressLinear.default;
    }
  });
});
define('reservey/components/paper-radio-group', ['exports', 'ember-paper/components/paper-radio-group'], function (exports, _paperRadioGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperRadioGroup.default;
    }
  });
});
define('reservey/components/paper-radio-proxiable', ['exports', 'ember-paper/components/paper-radio-proxiable'], function (exports, _paperRadioProxiable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperRadioProxiable.default;
    }
  });
});
define('reservey/components/paper-radio', ['exports', 'ember-paper/components/paper-radio'], function (exports, _paperRadio) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperRadio.default;
    }
  });
});
define('reservey/components/paper-reset-button', ['exports', 'ember-paper/components/paper-reset-button'], function (exports, _paperResetButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperResetButton.default;
    }
  });
});
define('reservey/components/paper-select-content', ['exports', 'ember-paper/components/paper-select-content'], function (exports, _paperSelectContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectContent.default;
    }
  });
});
define('reservey/components/paper-select-header', ['exports', 'ember-paper/components/paper-select-header'], function (exports, _paperSelectHeader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectHeader.default;
    }
  });
});
define('reservey/components/paper-select-menu-inner', ['exports', 'ember-paper/components/paper-select-menu-inner'], function (exports, _paperSelectMenuInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectMenuInner.default;
    }
  });
});
define('reservey/components/paper-select-menu-trigger', ['exports', 'ember-paper/components/paper-select-menu-trigger'], function (exports, _paperSelectMenuTrigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSelectMenuTrigger.default;
});
define('reservey/components/paper-select-menu', ['exports', 'ember-paper/components/paper-select-menu'], function (exports, _paperSelectMenu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectMenu.default;
    }
  });
});
define('reservey/components/paper-select-options', ['exports', 'ember-paper/components/paper-select-options'], function (exports, _paperSelectOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectOptions.default;
    }
  });
});
define('reservey/components/paper-select-search', ['exports', 'ember-paper/components/paper-select-search'], function (exports, _paperSelectSearch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectSearch.default;
    }
  });
});
define('reservey/components/paper-select-trigger', ['exports', 'ember-paper/components/paper-select-trigger'], function (exports, _paperSelectTrigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectTrigger.default;
    }
  });
});
define('reservey/components/paper-select', ['exports', 'ember-paper/components/paper-select'], function (exports, _paperSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSelect.default;
});
define('reservey/components/paper-sidenav-container', ['exports', 'ember-paper/components/paper-sidenav-container'], function (exports, _paperSidenavContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSidenavContainer.default;
    }
  });
});
define('reservey/components/paper-sidenav-inner', ['exports', 'ember-paper/components/paper-sidenav-inner'], function (exports, _paperSidenavInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSidenavInner.default;
});
define('reservey/components/paper-sidenav-toggle', ['exports', 'ember-paper/components/paper-sidenav-toggle'], function (exports, _paperSidenavToggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSidenavToggle.default;
});
define('reservey/components/paper-sidenav', ['exports', 'ember-paper/components/paper-sidenav'], function (exports, _paperSidenav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSidenav.default;
});
define('reservey/components/paper-slider', ['exports', 'ember-paper/components/paper-slider'], function (exports, _paperSlider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSlider.default;
});
define('reservey/components/paper-snackbar-text', ['exports', 'ember-paper/components/paper-snackbar-text'], function (exports, _paperSnackbarText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSnackbarText.default;
    }
  });
});
define('reservey/components/paper-speed-dial-actions-action', ['exports', 'ember-paper/components/paper-speed-dial-actions-action'], function (exports, _paperSpeedDialActionsAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSpeedDialActionsAction.default;
    }
  });
});
define('reservey/components/paper-speed-dial-actions', ['exports', 'ember-paper/components/paper-speed-dial-actions'], function (exports, _paperSpeedDialActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSpeedDialActions.default;
    }
  });
});
define('reservey/components/paper-speed-dial-trigger', ['exports', 'ember-paper/components/paper-speed-dial-trigger'], function (exports, _paperSpeedDialTrigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSpeedDialTrigger.default;
    }
  });
});
define('reservey/components/paper-speed-dial', ['exports', 'ember-paper/components/paper-speed-dial'], function (exports, _paperSpeedDial) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSpeedDial.default;
    }
  });
});
define('reservey/components/paper-subheader', ['exports', 'ember-paper/components/paper-subheader'], function (exports, _paperSubheader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSubheader.default;
});
define('reservey/components/paper-switch', ['exports', 'ember-paper/components/paper-switch'], function (exports, _paperSwitch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSwitch.default;
});
define('reservey/components/paper-tab', ['exports', 'ember-paper/components/paper-tab'], function (exports, _paperTab) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperTab.default;
    }
  });
});
define('reservey/components/paper-tabs', ['exports', 'ember-paper/components/paper-tabs'], function (exports, _paperTabs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperTabs.default;
    }
  });
});
define('reservey/components/paper-toast-inner', ['exports', 'ember-paper/components/paper-toast-inner'], function (exports, _paperToastInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperToastInner.default;
    }
  });
});
define('reservey/components/paper-toast-text', ['exports', 'ember-paper/components/paper-toast-text'], function (exports, _paperToastText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperToastText.default;
    }
  });
});
define('reservey/components/paper-toast', ['exports', 'ember-paper/components/paper-toast'], function (exports, _paperToast) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperToast.default;
    }
  });
});
define('reservey/components/paper-toaster', ['exports', 'ember-paper/components/paper-toaster'], function (exports, _paperToaster) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperToaster.default;
    }
  });
});
define('reservey/components/paper-toolbar-tools', ['exports', 'ember-paper/components/paper-toolbar-tools'], function (exports, _paperToolbarTools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperToolbarTools.default;
});
define('reservey/components/paper-toolbar', ['exports', 'ember-paper/components/paper-toolbar'], function (exports, _paperToolbar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperToolbar.default;
});
define('reservey/components/paper-tooltip-inner', ['exports', 'ember-paper/components/paper-tooltip-inner'], function (exports, _paperTooltipInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperTooltipInner.default;
    }
  });
});
define('reservey/components/paper-tooltip', ['exports', 'ember-paper/components/paper-tooltip'], function (exports, _paperTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperTooltip.default;
    }
  });
});
define('reservey/components/paper-virtual-repeat-scroller', ['exports', 'ember-paper/components/paper-virtual-repeat-scroller'], function (exports, _paperVirtualRepeatScroller) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperVirtualRepeatScroller.default;
});
define('reservey/components/paper-virtual-repeat', ['exports', 'ember-paper/components/paper-virtual-repeat'], function (exports, _paperVirtualRepeat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperVirtualRepeat.default;
});
define('reservey/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _powerSelectMultiple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectMultiple.default;
    }
  });
});
define('reservey/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('reservey/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _powerSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelect.default;
    }
  });
});
define('reservey/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _beforeOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _beforeOptions.default;
    }
  });
});
define('reservey/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _options) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _options.default;
    }
  });
});
define('reservey/components/power-select/placeholder', ['exports', 'ember-power-select/components/power-select/placeholder'], function (exports, _placeholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _placeholder.default;
    }
  });
});
define('reservey/components/power-select/power-select-group', ['exports', 'ember-power-select/components/power-select/power-select-group'], function (exports, _powerSelectGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectGroup.default;
    }
  });
});
define('reservey/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _searchMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _searchMessage.default;
    }
  });
});
define('reservey/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('reservey/components/rs-dialog/component', ['exports', 'reservey/components/rs-dialog/template'], function (exports, _template) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Component.extend({
		layout: _template.default,

		actions: {
			onConfirm() {
				Ember.get(this, 'onConfirm')();
			},
			onToggleDialog() {
				this.toggleProperty('isShowingDialog');
			}
		}
	});
});
define("reservey/components/rs-dialog/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "X+OpoO5z", "block": "{\"symbols\":[\"&default\"],\"statements\":[[0,\"\\n\\n\"],[4,\"if\",[[22,[\"isShowingDialog\"]]],null,{\"statements\":[[4,\"paper-dialog\",null,[[\"class\",\"clickOutsideToClose\",\"parent\",\"onClose\"],[\"flex-25\",true,\".content\",[26,\"action\",[[21,0,[]],[22,[\"onToggleDialog\"]]],null]]],{\"statements\":[[4,\"paper-toolbar\",null,null,{\"statements\":[[4,\"paper-toolbar-tools\",null,null,{\"statements\":[[0,\"\\t\\t\\t\"],[6,\"h2\"],[10,\"data-test-dialog-title\",\"\"],[8],[1,[20,\"title\"],false],[9],[0,\"\\n\\t\\t\\t\"],[6,\"span\"],[10,\"class\",\"flex\"],[8],[9],[0,\"\\n\\t\\t\\t\"],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[26,\"action\",[[21,0,[]],[22,[\"onToggleDialog\"]]],null]]],{\"statements\":[[1,[26,\"paper-icon\",null,[[\"icon\"],[\"close\"]]],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[4,\"paper-dialog-content\",null,null,{\"statements\":[[0,\"\\t\\t\\t\"],[13,1],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"paper-dialog-actions\",null,[[\"class\"],[\"layout-row\"]],{\"statements\":[[0,\"\\t\\t\\t\"],[6,\"span\"],[10,\"class\",\"flex\"],[8],[9],[0,\"\\n\\t\\t\\t\"],[4,\"paper-button\",null,[[\"onClick\"],[[26,\"action\",[[21,0,[]],\"onToggleDialog\"],null]]],{\"statements\":[[1,[26,\"t\",[\"maple_shared_components.dialog.cancel\"],null],false]],\"parameters\":[]},null],[0,\"\\n\\t\\t\\t\"],[4,\"paper-button\",null,[[\"onClick\",\"primary\"],[[26,\"action\",[[21,0,[]],[22,[\"createClassroom\"]]],null],true]],{\"statements\":[[1,[26,\"t\",[\"maple_shared_components.dialog.confirm\"],null],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "reservey/components/rs-dialog/template.hbs" } });
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
            },
            onToggleDialog() {
                this.toggleProperty('isShowingDialog');
            },
            createIssue() {
                const classroom = this.get('classroom');
                const issue = this.get('issue');

                const newIssue = this.store.createRecord('mallfunctions', { classroom: classroom, issue: issue });
                newIssue.save();

                this.set('responseMessage', `We save your issue for classroom: ${this.get('name')} and will get make sure it gets looked into`);
                this.setProperties({ name: '', issue: '' });
                this.toggleProperty('isShowingDialog');
            }
        }
    });
});
define("reservey/components/rs-header/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "NWmRNIkW", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"div\"],[10,\"class\",\"hr-header\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"hr-header__title\"],[8],[1,[20,\"title\"],false],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\\n\"],[13,1]],\"hasEval\":false}", "meta": { "moduleName": "reservey/components/rs-header/template.hbs" } });
});
define('reservey/components/rs-service-form/component', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: '',

    status: null,
    statuses: Ember.String.w('Student Teacher Administrator Service'),

    actions: {
      click(param) {
        this.sendAction('action', param);
      },
      changeStatus(status) {
        this.set('status', status);
      }
    }
  });
});
define("reservey/components/rs-service-form/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jpOmRU5f", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"title\"],false],[0,\"\\n\\n\"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"item\",\"reporter\"]],\"\",\"Reporter\"]]],false],[0,\"\\n\"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"item\",\"classroom\"]],\"\",\"Classroom\"]]],false],[0,\"\\n\"],[1,[26,\"textarea\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"item\",\"issue\"]],\"\",\"Please discribe the mallfunction\"]]],false],[0,\"\\n\"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[22,[\"item\",\"status\"]],\"\",\"Status\"]]],false],[0,\"\\n\"],[6,\"button\"],[10,\"class\",\"form__button\"],[11,\"disabled\",[26,\"unless\",[[22,[\"item\",\"isValid\"]],true],null],null],[10,\"type\",\"submit\"],[3,\"action\",[[21,0,[]],\"click\",[22,[\"item\"]]]],[8],[1,[20,\"label\"],false],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "reservey/components/rs-service-form/template.hbs" } });
});
define('reservey/components/rs-service-input/component', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define("reservey/components/rs-service-input/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QhDKvGQz", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"div\"],[10,\"class\",\"service__list--name\"],[8],[1,[22,[\"item\",\"reporter\"]],false],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"service__list--classroom\"],[8],[1,[22,[\"item\",\"classroom\"]],false],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"service__list--issue\"],[8],[1,[22,[\"item\",\"issue\"]],false],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"service__list--status\"],[8],[1,[22,[\"item\",\"status\"]],false],[9],[0,\"\\n\"],[13,1]],\"hasEval\":false}", "meta": { "moduleName": "reservey/components/rs-service-input/template.hbs" } });
});
define('reservey/components/rs-service-item/component', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define("reservey/components/rs-service-item/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RDkY32Te", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"service__list--item\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"service__list--name\"],[8],[1,[22,[\"issue\",\"reporter\"]],false],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"service__list--classroom\"],[8],[1,[22,[\"issue\",\"classroom\"]],false],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"service__list--issue\"],[8],[1,[22,[\"issue\",\"issue\"]],false],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"service__list--status\"],[8],[1,[22,[\"issue\",\"status\"]],false],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"service__list--icon service__list--icon--edit\"],[8],[4,\"link-to\",[\"rs-service.edit\",[22,[\"issue\",\"id\"]]],null,{\"statements\":[[6,\"i\"],[10,\"class\",\"material-icons\"],[8],[0,\"edit\"],[9]],\"parameters\":[]},null],[9],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"service__list--icon service__list--icon--delete\"],[3,\"action\",[[21,0,[]],\"deleteIssue\",[22,[\"issue\"]]]],[8],[6,\"i\"],[10,\"class\",\"material-icons\"],[8],[0,\"delete\"],[9],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/components/rs-service-item/template.hbs" } });
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
define('reservey/components/transition-group', ['exports', 'ember-css-transitions/components/transition-group'], function (exports, _transitionGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _transitionGroup.default;
    }
  });
});
define('reservey/components/virtual-each', ['exports', 'virtual-each/components/virtual-each/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
define('reservey/dialog/service', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Service.extend({
        state: false,
        stateReservations: false,

        open() {
            this.set('state', true);
        },

        close() {
            this.set('state', false);
        },
        openReservations() {
            this.set('state', true);
        },

        closeReservations() {
            this.set('state', false);
        }
    });
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
define('reservey/helpers/-paper-underscore', ['exports', 'ember-paper/helpers/underscore'], function (exports, _underscore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _underscore.default;
    }
  });
  Object.defineProperty(exports, 'underscore', {
    enumerable: true,
    get: function () {
      return _underscore.underscore;
    }
  });
});
define('reservey/helpers/and', ['exports', 'ember-truth-helpers/helpers/and'], function (exports, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(exports, 'and', {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
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
define('reservey/helpers/cancel-all', ['exports', 'ember-concurrency/helpers/cancel-all'], function (exports, _cancelAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
  Object.defineProperty(exports, 'cancelAll', {
    enumerable: true,
    get: function () {
      return _cancelAll.cancelAll;
    }
  });
});
define('reservey/helpers/ember-power-select-is-group', ['exports', 'ember-power-select/helpers/ember-power-select-is-group'], function (exports, _emberPowerSelectIsGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsGroup', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
});
define('reservey/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectIsSelected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('reservey/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectTrueStringIfPresent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('reservey/helpers/eq', ['exports', 'ember-truth-helpers/helpers/equal'], function (exports, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(exports, 'equal', {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
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
define('reservey/helpers/gt', ['exports', 'ember-truth-helpers/helpers/gt'], function (exports, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(exports, 'gt', {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
define('reservey/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(exports, 'gte', {
    enumerable: true,
    get: function () {
      return _gte.gte;
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
define('reservey/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(exports, 'isArray', {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
define('reservey/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
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
define('reservey/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(exports, 'lt', {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
define('reservey/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(exports, 'lte', {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
define('reservey/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(exports, 'notEq', {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
define('reservey/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
define('reservey/helpers/or', ['exports', 'ember-truth-helpers/helpers/or'], function (exports, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(exports, 'or', {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
define('reservey/helpers/perform', ['exports', 'ember-concurrency/helpers/perform'], function (exports, _perform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
  Object.defineProperty(exports, 'perform', {
    enumerable: true,
    get: function () {
      return _perform.perform;
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
define('reservey/helpers/task', ['exports', 'ember-concurrency/helpers/task'], function (exports, _task) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
  Object.defineProperty(exports, 'task', {
    enumerable: true,
    get: function () {
      return _task.task;
    }
  });
});
define('reservey/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(exports, 'xor', {
    enumerable: true,
    get: function () {
      return _xor.xor;
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
define('reservey/initializers/ember-concurrency', ['exports', 'ember-concurrency/initializers/ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.initialize;
    }
  });
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
define('reservey/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfire) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberfire.default;
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
define('reservey/mallfunctions/model', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        reporter: _emberData.default.attr('string'),
        classroom: _emberData.default.attr('string'),
        issue: _emberData.default.attr('string'),
        status: _emberData.default.attr('string'),

        isValid: Ember.computed.notEmpty('reporter')
    });
});
define('reservey/mixins/transition-mixin', ['exports', 'ember-css-transitions/mixins/transition-mixin'], function (exports, _transitionMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _transitionMixin.default;
    }
  });
});
define('reservey/reservations/model', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        attendants: _emberData.default.attr('string'),
        timebox: _emberData.default.attr('string'),
        classroom: _emberData.default.attr('string')
    });
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

    this.route('rs-reservations-overview', { path: '/reservations-overview' });

    this.route('classrooms', function () {
      this.route('classroom', { path: ':reservation_id' }, function () {
        this.route('reservations');
      });
      this.route('reservations', function () {
        this.route('new');
      });
    });

    this.route('rs-service', { path: '/service-panel' }, function () {
      this.route('new');
      this.route('edit', { path: '/:issue_id/edit' });
    });

    this.route('admin', function () {
      this.route('service');
      this.route('edit', { path: '/:classroom_id/edit' });
      this.route('new');
    });
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
  exports.default = Ember.HTMLBars.template({ "id": "73lnSwBN", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"rs-header\",null,[[\"title\"],[\"Agenda\"]]],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"content\"],[8],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"agenda\"],[8],[0,\"\\n\\t\\t\"],[6,\"h1\"],[8],[0,\"Comming Soon\"],[9],[0,\"\\n\\t\"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[1,[20,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-agenda/template.hbs" } });
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
		// model: function() {
		// 	let one = Reservation.create({ classroom: 'first Reservation', timebox: '', attendants: ''});
		//     let two = Reservation.create({ classroom: 'second Reservation', timebox: '', attendants: '' });
		//     let three = Reservation.create({ classroom: 'third Reservation', timebox: '', attendants: '' });


		// 	let H1 = Classroom.create({
		// 		name: 'H1.2.1',
		// 		capacity: 28,
		// 		facility: 'None',
		// 		outlets: 26,
		// 		Reservations: [one]
		// 	});
		// 	let H2 = Classroom.create({
		// 		name: 'WD.02.106',
		// 		capacity: 29,
		// 		facility: 'TV',
		// 		outlets: 27,
		// 		Reservations: [two]
		// 	});
		// 	let H3 = Classroom.create({
		// 		name: 'H4.2.1',
		// 		capacity: 30,
		// 		facility: 'Whiteboard',
		// 		outlets: 28,
		// 		Reservations: [three]
		// 	});

		// 	return [H1, H2, H3];

		// }
	});
});
define('reservey/rs-classrooms/rs-reservation/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        // model: function(params) {
        //     let classroom = this.modelFor('rs-classroom');
        //     return classroom.findBy('slug', params.slug);
        // }
    });
});
define('reservey/rs-classrooms/rs-reservation/rs-reservations/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        // model: function() {
        //     return this.modelFor('rs-classrooms.rs-reservation');
        // }
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
  exports.default = Ember.HTMLBars.template({ "id": "qT/uJ5Vl", "block": "{\"symbols\":[],\"statements\":[[0,\"halloooo\\n\\n\"],[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-classrooms/rs-reservation/template.hbs" } });
});
define("reservey/rs-classrooms/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "WoQ0UauH", "block": "{\"symbols\":[\"classroom\"],\"statements\":[[1,[26,\"rs-header\",null,[[\"title\"],[\"Overview\"]]],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"content\"],[8],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"overview\"],[8],[0,\"\\n\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list\"],[8],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__header\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__header--item\"],[8],[0,\"Classroom\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__header--item\"],[8],[0,\"Facilities\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__header--item\"],[8],[0,\"Capacity\"],[9],[0,\"\\n\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__header--item\"],[8],[0,\"Outlets\"],[9],[0,\"\\n\\t\\t\\t\"],[9],[0,\"\\n\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[0,\"\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list--item\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"rs-classrooms.rs-reservation\"],[[\"class\"],[\"\"]],{\"statements\":[[0,\"\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list--name\"],[8],[1,[21,1,[\"name\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list--facility\"],[8],[1,[21,1,[\"facility\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list--capacity\"],[8],[1,[21,1,[\"capacity\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__list--outlets\"],[8],[1,[21,1,[\"outlets\"]],false],[9],[0,\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[6,\"span\"],[10,\"class\",\"pointer glyphicon glyphicon-chevron-right\"],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\t\\t\\t\\t\\t\"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__right\"],[8],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__filter\"],[8],[0,\"\\n\\t\\t\\t\\ttest\\n\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\\t\"],[6,\"div\"],[10,\"class\",\"overview__reservations\"],[8],[0,\"\\n\\t\\t\\t\\t\"],[1,[20,\"outlet\"],false],[0,\"\\n\\t\\t\\t\"],[9],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\\t\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-classrooms/template.hbs" } });
});
define('reservey/rs-service/controller', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    headerMessage: 'Coming Soon',
    responseMessage: '',
    emailAddress: '',

    isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
    isDisabled: Ember.computed.not('isValid'),

    actions: {

      saveInvitation() {
        const email = this.get('emailAddress');

        const newInvitation = this.store.createRecord('mallfunctions', { classroom: email });
        newInvitation.save();

        this.set('responseMessage', `Thank you! We have just saved your email address: ${this.get('emailAddress')}`);
        this.set('emailAddress', '');
      }
    }

  });
});
define('reservey/rs-service/edit/route', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model(params) {
      return this.store.findRecord('mallfunctions', params.issue_id);
    },

    actions: {

      saveIssue(issue) {
        issue.save().then(() => this.transitionTo('rs-service'));
      },

      willTransition(transition) {

        let model = this.controller.get('model');

        if (model.get('hasDirtyAttributes')) {
          let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

          if (confirmation) {
            model.rollbackAttributes();
          } else {
            transition.abort();
          }
        }
      }
    }
  });
});
define("reservey/rs-service/edit/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bN8rAmOw", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"content\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"service__edit-mode\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"service__edit-mode--card\"],[8],[0,\"\\n            \"],[1,[26,\"rs-service-form\",null,[[\"item\",\"action\",\"title\",\"label\"],[[22,[\"model\"]],\"saveIssue\",\"Edit issue\",\"Save issue\"]]],false],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-service/edit/template.hbs" } });
});
define("reservey/rs-service/form/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "liInr7NK", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"rs-service-form\",null,[[\"item\",\"action\"],[[22,[\"model\"]],\"saveIssue\"]]],false]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-service/form/template.hbs" } });
});
define('reservey/rs-service/index/controller', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        onDialogEnabled: false,
        isEditable: false,
        isShowingDialog: false,

        isAddButtonDisabled: Ember.computed.empty('reporter'),

        actions: {
            onToggleAdd() {
                this.toggleProperty('showAddDialog');
            },
            onToggleEdit() {
                this.toggleProperty('showEditDialog');
            },
            toggleEditableInputs() {
                this.toggleProperty('isEditable');
            },

            saveIssue() {
                const reporter = this.get('reporter');
                const classroom = this.get('classroom');
                const issue = this.get('issue');
                const status = this.get('status');

                const newIssue = this.store.createRecord('mallfunctions', { reporter: reporter, classroom: classroom, issue: issue, status: status });
                newIssue.save();

                this.set('responseMessage', `Thank you! We have just saved your new classroom: ${this.get('name')}`);
                this.setProperties({ reporter: '', classroom: '', issue: '', status: '' });
                this.toggleProperty('showAddDialog');
            }
        }
    });
});
define('reservey/rs-service/index/route', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Route.extend({
		model() {
			return Ember.RSVP.hash({
				mallfunctions: this.store.findAll('mallfunctions'),
				users: this.store.findAll('users'),
				createusers: this.store.createRecord('users')
			});
		},

		setupController(controller, model) {
			controller.set('mallfunctions', model.mallfunctions);
			controller.set('users', model.users);

			this._super(controller, model);
		},

		actions: {
			deleteIssue(issue) {
				let confirmation = confirm('Are you sure?');

				if (confirmation) {
					issue.destroyRecord();
				}
			},
			saveUser(newUser) {
				newUser.save().then(() => this.transitionTo('rs-service'));
			}
		}
	});
});
define("reservey/rs-service/index/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "V48PwIuT", "block": "{\"symbols\":[\"user\",\"issue\"],\"statements\":[[6,\"div\"],[10,\"class\",\"service\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"service__list__wrapper\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"service__list\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"service__header\"],[8],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"service__header--item\"],[8],[0,\"Reporter\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"service__header--item\"],[8],[0,\"Classroom\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"service__header--item--issue\"],[8],[0,\"Issue\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"service__header--item\"],[8],[0,\"Status\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"service__header--item--placeholder\"],[8],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"classrooms__header--icon\"],[8],[0,\"\\n\"],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[26,\"action\",[[21,0,[]],\"onToggleAdd\"],null]]],{\"statements\":[[0,\"                        \"],[1,[26,\"paper-icon\",null,[[\"icon\"],[\"add\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"                \"],[9],[0,\"\\n            \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"mallfunctions\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"service__list--item\"],[8],[0,\"\\n\"],[4,\"rs-service-input\",null,[[\"item\"],[[21,2,[]]]],{\"statements\":[[0,\"                        \"],[6,\"div\"],[10,\"class\",\"service__list--icon service__list--icon--edit\"],[8],[4,\"link-to\",[\"rs-service.edit\",[21,2,[\"id\"]]],null,{\"statements\":[[6,\"i\"],[10,\"class\",\"material-icons\"],[8],[0,\"edit\"],[9]],\"parameters\":[]},null],[9],[0,\"\\n\"],[0,\"                        \"],[6,\"div\"],[10,\"class\",\"service__list--icon service__list--icon--delete\"],[3,\"action\",[[21,0,[]],\"deleteIssue\",[21,2,[]]]],[8],[6,\"i\"],[10,\"class\",\"material-icons\"],[8],[0,\"delete\"],[9],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"                \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"user\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"user__list__wrapper\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"user__list\"],[8],[0,\"\\n            \"],[6,\"div\"],[10,\"class\",\"user__header\"],[8],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"user__header--item\"],[8],[0,\"Username\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"user__header--item\"],[8],[0,\"Displayname\"],[9],[0,\"\\n                \"],[6,\"div\"],[10,\"class\",\"user__header--item\"],[8],[0,\"Type\"],[9],[0,\"\\n            \"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"users\"]]],null,{\"statements\":[[0,\"                \"],[6,\"div\"],[10,\"class\",\"user__list--item\"],[8],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"user__list--username\"],[8],[1,[21,1,[\"userName\"]],false],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"user__list--displayname\"],[8],[1,[21,1,[\"displayName\"]],false],[9],[0,\"\\n                    \"],[6,\"div\"],[10,\"class\",\"user__list--type\"],[8],[1,[21,1,[\"type\"]],false],[9],[0,\"\\n                \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"showAddDialog\"]]],null,{\"statements\":[[4,\"paper-dialog\",null,[[\"class\",\"onClose\",\"origin\",\"clickOutsideToClose\"],[\"flex-40\",[26,\"action\",[[21,0,[]],\"onToggleAdd\"],null],[22,[\"dialogOrigin\"]],true]],{\"statements\":[[4,\"paper-toolbar\",null,null,{\"statements\":[[4,\"paper-toolbar-tools\",null,[[\"class\"],[\"dialog__header\"]],{\"statements\":[[0,\"\\t\\t\"],[6,\"h2\"],[8],[0,\"Add classroom\"],[9],[0,\"\\n\\t\\t\"],[6,\"span\"],[10,\"class\",\"flex\"],[8],[9],[0,\"\\n\\t\\t\"],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[26,\"action\",[[21,0,[]],\"onToggleAdd\"],null]]],{\"statements\":[[1,[26,\"paper-icon\",null,[[\"icon\"],[\"close\"]]],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"dialog__content\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"\",\"Reporter\",[22,[\"reporter\"]]]]],false],[0,\"\\n\\t\\t\"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"\",\"Classroom\",[22,[\"classroom\"]]]]],false],[0,\"\\n\\t\\t\"],[1,[26,\"textarea\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"string\",\"\",\"Please describe your issue\",[22,[\"issue\"]]]]],false],[0,\"\\n\\t\\t\"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"string\",\"\",\"Status\",[22,[\"status\"]]]]],false],[0,\"\\n\\t\"],[9],[0,\"\\n\\n\"],[4,\"paper-dialog-actions\",null,[[\"class\"],[\"layout-row\"]],{\"statements\":[[0,\"\\t\\t\"],[6,\"button\"],[10,\"class\",\"dialog__button--cancel\"],[3,\"action\",[[21,0,[]],\"onToggleAdd\"]],[8],[0,\"Cancel\"],[9],[0,\"\\n\\t\\t\"],[6,\"button\"],[10,\"class\",\"dialog__button--confirm\"],[11,\"disabled\",[20,\"isAddButtonDisabled\"],null],[3,\"action\",[[21,0,[]],\"saveIssue\"]],[8],[0,\"Add\"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"showEditDialog\"]]],null,{\"statements\":[[4,\"paper-dialog\",null,[[\"class\",\"onClose\",\"origin\",\"clickOutsideToClose\"],[\"flex-40\",[26,\"action\",[[21,0,[]],\"onToggleEdit\"],null],[22,[\"dialogOrigin\"]],true]],{\"statements\":[[4,\"paper-toolbar\",null,null,{\"statements\":[[4,\"paper-toolbar-tools\",null,[[\"class\"],[\"dialog__header\"]],{\"statements\":[[0,\"\\t\\t\"],[6,\"h2\"],[8],[0,\"Add classroom\"],[9],[0,\"\\n\\t\\t\"],[6,\"span\"],[10,\"class\",\"flex\"],[8],[9],[0,\"\\n\\t\\t\"],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[26,\"action\",[[21,0,[]],\"onToggleEdit\"],null]]],{\"statements\":[[1,[26,\"paper-icon\",null,[[\"icon\"],[\"close\"]]],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\\t\"],[6,\"div\"],[10,\"class\",\"dialog__content\"],[8],[0,\"\\n        \"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"\",\"Reporter\",[22,[\"reporter\"]]]]],false],[0,\"\\n\\t\\t\"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"text\",\"\",\"Classroom\",[22,[\"classroom\"]]]]],false],[0,\"\\n\\t\\t\"],[1,[26,\"textarea\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"string\",\"\",\"Please describe your issue\",[22,[\"issue\"]]]]],false],[0,\"\\n\\t\\t\"],[1,[26,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\"],[\"string\",\"\",\"Status\",[22,[\"status\"]]]]],false],[0,\"\\n\\t\"],[9],[0,\"\\n\\n\"],[4,\"paper-dialog-actions\",null,[[\"class\"],[\"layout-row\"]],{\"statements\":[[0,\"\\t\\t\"],[6,\"button\"],[10,\"class\",\"dialog__button--cancel\"],[3,\"action\",[[21,0,[]],\"onToggleEdit\"]],[8],[0,\"Cancel\"],[9],[0,\"\\n\\t\\t\"],[6,\"button\"],[10,\"class\",\"dialog__button--confirm\"],[11,\"disabled\",[20,\"isAddButtonDisabled\"],null],[3,\"action\",[[21,0,[]],\"saveIssue\"]],[8],[0,\"Add\"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-service/index/template.hbs" } });
});
define('reservey/rs-service/route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model() {
            return this.store.findAll('mallfunctions');
        }
    });
});
define("reservey/rs-service/template", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LxhZI8Rz", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"rs-header\",null,[[\"title\"],[\"Service Panel\"]]],false],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"content\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "reservey/rs-service/template.hbs" } });
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
define('reservey/services/constants', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({

    sniffer: Ember.inject.service('sniffer'),

    webkit: Ember.computed(function () {
      return (/webkit/i.test(this.get('sniffer.vendorPrefix'))
      );
    }),

    vendorProperty(name) {
      return this.get('webkit') ? `-webkit-${name.charAt(0)}${name.substring(1)}` : name;
    },

    CSS: Ember.computed('webkit', function () {
      let webkit = this.get('webkit');
      return {
        /* Constants */
        TRANSITIONEND: `transitionend${webkit ? ' webkitTransitionEnd' : ''}`,
        ANIMATIONEND: `animationend${webkit ? ' webkitAnimationEnd' : ''}`,

        TRANSFORM: this.vendorProperty('transform'),
        TRANSFORM_ORIGIN: this.vendorProperty('transformOrigin'),
        TRANSITION: this.vendorProperty('transition'),
        TRANSITION_DURATION: this.vendorProperty('transitionDuration'),
        ANIMATION_PLAY_STATE: this.vendorProperty('animationPlayState'),
        ANIMATION_DURATION: this.vendorProperty('animationDuration'),
        ANIMATION_NAME: this.vendorProperty('animationName'),
        ANIMATION_TIMING: this.vendorProperty('animationTimingFunction'),
        ANIMATION_DIRECTION: this.vendorProperty('animationDirection')
      };
    }),

    KEYCODE: Ember.Object.create({
      ENTER: 13,
      ESCAPE: 27,
      SPACE: 32,
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      TAB: 9
    }),

    // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
    MEDIA: {
      'xs': '(max-width: 599px)',
      'gt-xs': '(min-width: 600px)',
      'sm': '(min-width: 600px) and (max-width: 959px)',
      'gt-sm': '(min-width: 960px)',
      'md': '(min-width: 960px) and (max-width: 1279px)',
      'gt-md': '(min-width: 1280px)',
      'lg': '(min-width: 1280px) and (max-width: 1919px)',
      'gt-lg': '(min-width: 1920px)',
      'xl': '(min-width: 1920px)',
      'print': 'print'
    },

    // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
    MEDIA_PRIORITY: ['xl', 'gt-lg', 'lg', 'gt-md', 'md', 'gt-sm', 'sm', 'gt-xs', 'xs', 'print']
  });
});
define('reservey/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _firebaseApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebaseApp.default;
});
define('reservey/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
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
define('reservey/services/paper-sidenav', ['exports', 'ember-paper/services/paper-sidenav'], function (exports, _paperSidenav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSidenav.default;
    }
  });
});
define('reservey/services/paper-toaster', ['exports', 'ember-paper/services/paper-toaster'], function (exports, _paperToaster) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperToaster.default;
    }
  });
});
define('reservey/services/sniffer', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* globals FastBoot */
  let isString = function (value) {
    return typeof value === 'string';
  };

  let lowercase = function (string) {
    return isString(string) ? string.toLowerCase() : string;
  };

  let toInt = function (str) {
    return parseInt(str, 10);
  };

  exports.default = Ember.Service.extend({
    vendorPrefix: '',
    transitions: false,
    animations: false,
    _document: null,
    _window: null,

    android: Ember.computed('', function () {
      return toInt((/android (\d+)/.exec(lowercase((this.get('_window').navigator || {}).userAgent)) || [])[1]);
    }),

    init() {
      this._super(...arguments);
      if (typeof FastBoot !== 'undefined') {
        return;
      }

      let _document = document;
      let _window = window;

      this.setProperties({
        _document,
        _window
      });

      let bodyStyle = _document.body && _document.body.style;
      let vendorPrefix, match;
      let vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/;

      let transitions = false;
      let animations = false;

      if (bodyStyle) {
        for (let prop in bodyStyle) {
          match = vendorRegex.exec(prop);
          if (match) {
            vendorPrefix = match[0];
            vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
            break;
          }
        }

        if (!vendorPrefix) {
          vendorPrefix = 'WebkitOpacity' in bodyStyle && 'webkit';
        }

        transitions = !!('transition' in bodyStyle || `${vendorPrefix}Transition` in bodyStyle);
        animations = !!('animation' in bodyStyle || `${vendorPrefix}Animation` in bodyStyle);

        if (this.get('android') && (!transitions || !animations)) {
          transitions = isString(bodyStyle.webkitTransition);
          animations = isString(bodyStyle.webkitAnimation);
        }
      }

      this.set('transitions', transitions);
      this.set('animations', animations);

      this.set('vendorPrefix', vendorPrefix);
    }

  });
});
define('reservey/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _textMeasurer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textMeasurer.default;
    }
  });
});
define('reservey/services/util', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let Util = Ember.Service.extend({

    // Disables scroll around the passed element.
    disableScrollAround() {
      let util = this;
      let $document = Ember.$(window.document);

      util.disableScrollAround._count = util.disableScrollAround._count || 0;
      ++util.disableScrollAround._count;
      if (util.disableScrollAround._enableScrolling) {
        return util.disableScrollAround._enableScrolling;
      }

      let { body } = $document.get(0);
      let restoreBody = disableBodyScroll();
      let restoreElement = disableElementScroll();

      return util.disableScrollAround._enableScrolling = function () {
        if (! --util.disableScrollAround._count) {
          restoreBody();
          restoreElement();
          delete util.disableScrollAround._enableScrolling;
        }
      };

      // Creates a virtual scrolling mask to absorb touchmove, keyboard, scrollbar clicking, and wheel events
      function disableElementScroll() {
        let zIndex = 50;
        let scrollMask = Ember.$(`<div class="md-scroll-mask" style="z-index: ${zIndex}">
          <div class="md-scroll-mask-bar"></div>
        </div>`);
        body.appendChild(scrollMask[0]);

        scrollMask.on('wheel', preventDefault);
        scrollMask.on('touchmove', preventDefault);
        $document.on('keydown', disableKeyNav);

        return function restoreScroll() {
          scrollMask.off('wheel');
          scrollMask.off('touchmove');
          scrollMask[0].parentNode.removeChild(scrollMask[0]);
          $document.off('keydown', disableKeyNav);
          delete util.disableScrollAround._enableScrolling;
        };

        // Prevent keypresses from elements inside the body
        // used to stop the keypresses that could cause the page to scroll
        // (arrow keys, spacebar, tab, etc).
        function disableKeyNav() {
          // -- temporarily removed this logic, will possibly re-add at a later date
          return;
          /* if (!element[0].contains(e.target)) {
            e.preventDefault();
            e.stopImmediatePropagation();
          } */
        }

        function preventDefault(e) {
          e.preventDefault();
        }
      }

      // Converts the body to a position fixed block and translate it to the proper scroll
      // position
      function disableBodyScroll() {
        let htmlNode = body.parentNode;
        let restoreHtmlStyle = htmlNode.getAttribute('style') || '';
        let restoreBodyStyle = body.getAttribute('style') || '';
        let scrollOffset = body.scrollTop + body.parentElement.scrollTop;
        let { clientWidth } = body;

        if (body.scrollHeight > body.clientHeight) {
          applyStyles(body, {
            position: 'fixed',
            width: '100%',
            top: `${-scrollOffset}px`
          });

          applyStyles(htmlNode, {
            overflowY: 'scroll'
          });
        }

        if (body.clientWidth < clientWidth) {
          applyStyles(body, { overflow: 'hidden' });
        }

        return function restoreScroll() {
          body.setAttribute('style', restoreBodyStyle);
          htmlNode.setAttribute('style', restoreHtmlStyle);
          body.scrollTop = scrollOffset;
        };
      }

      function applyStyles(el, styles) {
        for (let key in styles) {
          el.style[key] = styles[key];
        }
      }
    },
    enableScrolling() {
      let method = this.disableScrollAround._enableScrolling;
      method && method();
    },

    /*
     * supplant() method from Crockford's `Remedial Javascript`
     * Equivalent to use of $interpolate; without dependency on
     * interpolation symbols and scope. Note: the '{<token>}' can
     * be property names, property chains, or array indices.
     */
    supplant(template, values, pattern) {
      pattern = pattern || /\{([^{}]*)\}/g;
      return template.replace(pattern, function (a, b) {
        let p = b.split('.');
        let r = values;
        try {
          for (let s in p) {
            if (p.hasOwnProperty(s)) {
              r = r[p[s]];
            }
          }
        } catch (e) {
          r = a;
        }
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      });
    },
    nextTick: function (window, prefixes, i, p, fnc) {
      while (!fnc && i < prefixes.length) {
        fnc = window[`${prefixes[i++]}equestAnimationFrame`];
      }
      return fnc && fnc.bind(window) || window.setImmediate || function (fnc) {
        window.setTimeout(fnc, 0);
      };
    }(window, 'r webkitR mozR msR oR'.split(' '), 0)

  });

  exports.default = Util;
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
  exports.default = Ember.HTMLBars.template({ "id": "5mTwq7W/", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"container\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "reservey/templates/application.hbs" } });
});
define("reservey/templates/components/transition-group", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fAchvzNJ", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "reservey/templates/components/transition-group.hbs" } });
});
define('reservey/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});
define("reservey/translations/en-us", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = { "product": { "html": { "info": "<strong>{product}</strong> will cost <em>{price, number, USD}</em> if ordered by {deadline, date, time}" }, "info": "{product} will cost {price, number, USD} if ordered by {deadline, date, time}", "title": "Hello world!" } };
});
define('reservey/users/model', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        userName: _emberData.default.attr('string'),
        displayName: _emberData.default.attr('string'),
        type: _emberData.default.attr('string')
    });
});
define('reservey/utils/clamp', ['exports', 'ember-paper/utils/clamp'], function (exports, _clamp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _clamp.default;
    }
  });
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
  require("reservey/app")["default"].create({"name":"reservey","version":"0.0.0+a4c28c8b"});
}
//# sourceMappingURL=reservey.map
