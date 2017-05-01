var HJPassport =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var context, errorHandler, BI, controller, //these module will be loaded later.
	    actionEnum = __webpack_require__(1).actions,
	    flows = __webpack_require__(1).flow,
	    settings = __webpack_require__(2),
	    closeBIPoint = function () {
	        switch (context.name) {
	            case actionEnum.REG_SUCCESS:
	                BI.fire('register_success_close');
	                window.location.reload && window.location.reload();
	                break;

	            case actionEnum.CATE_SELECT:
	                BI.fire('interest_step1_close', {
	                    login: !!context.setInterest
	                });

	                if (context.setInterest) { //If select interest after login.
	                    window.location.reload();
	                }
	                break;
	            case actionEnum.INTEREST_SELECT:
	                BI.fire('interest_step2_close', {
	                    login: !!context.setInterest
	                });

	                if (context.setInterest) { //If select interest after login.
	                    window.location.reload();
	                }
	                break;
	            case actionEnum.LOGIN:
	                if (context.isNewUser) {
	                    BI.fire('login_close');
	                } else {
	                    BI.fire('login_close_witheixst');
	                }
	                break;
	            case actionEnum.REGISTER:
	                if (context.currentAction.view.currentMode === 'email') {
	                    BI.fire('register_email_close');
	                } else {
	                    BI.fire('register_mobile_close');
	                }
	                break;
	            default:
	                break;
	        }
	    };

	var result = {
	    initialized: false,
	    container  : null,
	    version    : ("0.4.3"),

	    init: function (options) {
	        if (this.initialized) return;

	        $.extend(settings, options); // merge to settings.

	        settings.client = settings.client ||
	            (options.container ? 'mobile' : 'pc');

	        // Init module after settings changed,
	        // To make sure the change of 'settings' taking effect on initializaiton.
	        controller = __webpack_require__(3);
	        errorHandler = __webpack_require__(17);
	        context = __webpack_require__(4);
	        BI = __webpack_require__(45);


	        var element,
	            initAllActions = __webpack_require__(117);

	        if (element = options.container) {
	            context.mode = 'inline';

	            if(settings.client !== 'pc') {
	                element.addClass("hp-mobile-container");
	            }
	            
	            window.onpopstate = function (event) {
	                var state = event.state;
	                if (state && state.name) {
	                    controller.switchToView(state.name, null, true);
	                    //ensure current flow is correct when use browser,history to switch view.
	                    context.currentFlow = state.currentFlow || context.currentFlow;

	                } else if (context.firstView) {
	                    controller.switchToView(context.firstView, context.firstViewOpts, true);
	                    context.currentFlow = context.firstFlow|| context.currentFlow;
	                }

	                //context.historyBackViaPopstate = true;
	            }

	        } else {
	            context.mode = 'popup';
	            element = $("<div class='hp-view-container'></div>")
	                .appendTo('body')
	                .hpdialog({
	                    close: closeBIPoint
	                });
	        }

	        //set default value for settings client

	        BI.register(element);
	        context.element = element;
	        errorHandler.initTip(element);

	        this.initialized = true;
	    },

	    login: function (options) { // inline mode login
	        this.init(options);
	        controller.switchToFlow(flows.LOGIN);
	    },

	    register: function (options) { // inline mode register
	        this.init(options);
	        controller.switchToFlow(flows.REGISTER);
	    },

	    thirdParty: function (options) { // inline mode register
	        this.init(options);
	        controller.switchToFlow(flows.LOGIN_THIRD);
	    },

	    show: function (flow, options) { // show Flow
	        if (context.mode === 'popup') {
	            context.element.hpdialog("open");
	        }

	        controller.switchToFlow(flow, options);

	    },

	    showView: function (view, options) {
	        controller.switchToView(view, options);
	    },

	    showError: function (msg) {
	        errorHandler.showErrorMessage(msg);
	    },

	    _getContext: function () {
	        return context;
	    }
	};

	if (false) {
	    var hjapp = require('./common/jsbridge-helper.js');
	    result.callbacks = hjapp.callbacks;
	    result.callbackFromNative = hjapp.callbackFromNative;
	    result.invoke = hjapp.invoke;
	}

	module.exports = result;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	    actions: {
	        LOGIN                  : "login",
	        REGISTER               : "register-mobile",
	        REGISTER_MOBILE        : "register-mobile",
	        REGISTER_EMAIL         : "register-email",
	        REGISTER_SMS           : "register-sms",
	        REGISTER_SUCCESS_RENAME: "register-success-rename",
	        INTEREST_SELECT        : "interest-select",
	        CATE_SELECT            : "category-select",
	        REG_SUCCESS            : "register-success",
	        LOGIN_TRANSFER         : "login-transfer",
	        LOGIN_THIRD            : "login-third",
	        LOGIN_THIRD_BIND       : "login-third-bind",
	        LOGIN_THIRD_BIND_MOBILE: "login-third-bind-mobile",
	        LOGIN_THIRD_SUCCESS    : "login-third-success",

	        RESETPWD_CHOOSE        : "resetpwd-choose",
	        RESETPWD_SMS           : "resetpwd-sms",
	        RESETPWD_EMAIL         : "resetpwd-email",
	        RESETPWD_EMAIL_VALIDATE: "resetpwd-email-validate",
	        RESETPWD_RESET         : "resetpwd-reset",
	        RESETPWD_SUCCESS       : "resetpwd-success",
	        RESETPWD_FAIL          : "resetpwd-fail"
	    },
	    
	    flow: {
	        LOGIN      : "login",
	        REGISTER   : "register",
	        LOGIN_THIRD: "login-third",
	        RESETPWD   : "resetpwd"
	    }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	// get or set settings of HJPassport
	module.exports = {
	    container      : null, //if container is null, we will create a dialog and put it in.
	    API_SLD        : '',
	    skips          : [], //steps on register
	    skipsOnLogin   : [], //steps on login
	    skipsOnThird   : [], //steps on login
	    client         : '', //Define which client, the default client is determined by the showing-mode 'popup' & 'inline'
	    // string or function, Set the source of HJPassport for pushing marketing info to customers.
	    source         : '',
	    redirectURL    : encodeURIComponent(window.location.href),
	    disable3rdParty: [],
	    diableEmail    : false,
	    //for new app flow
	    randUserName   : true,
	    checkSafe      : true
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var context = __webpack_require__(4),
	    views = __webpack_require__(5),
	    switcher = __webpack_require__(116),
	    settings = __webpack_require__(2),
	    Ctor = __webpack_require__(20),
	    Action = function () {
	    },
	    isActionFunc = function (action, key) {
	        return /^__/.test(key) &&
	            (typeof action[key] === 'function');
	    },

	    bindActions = function (action, view) {
	        for (var key in action) {
	            if (!isActionFunc(action, key)) continue;

	            var actionName = key.replace(/^__/, '');

	            view.on(actionName, (function () {
	                var handler = key;
	                return function () {
	                    if (!action[handler]) return;
	                    action[handler].apply(action, arguments);
	                }
	            }()));
	        }
	    };

	// all actions handler name will following contract "__actionName" on prototype of action
	Action.prototype = {

	    init  : function () {//placeholder
	    },
	    skiped: function () {//placeholder
	    },
	    show  : function (opts) {
	        this.view.show(opts);
	    },

	    load: function (opts) { // init & show
	        if (!this.initialized) {
	            this.view = views[this.key];
	            this.view.element.hide();
	            context.element.append(this.view.element);

	            bindActions(this, this.view);

	            this.init();
	            this.initPartial && this.initPartial();
	            this.initialized = true;
	        }
	        this.show(opts);
	    }
	}

	module.exports = {
	    switchToView: switcher.switchToView,
	    switchToFlow: switcher.switchToFlow,

	    historyBack: function(){
	       // context.historyBackViaPopstate = false;

	        if(false) {

	            //if(!context.historyBackViaPopstate) {
	            if(history.state == null) {
	                return HJSDK.invokeOriginally('navigator_closeWindow');
	            }
	        }

	        history.back();
	    },

	    redirect: function () {
	        if (false) {
	            HJSDK.invokeOriginally('navigator_closeWindow');

	        } else {
	            if (settings.redirectURL && context.mode !== 'popup') {
	                //window.location.href = decodeURIComponent(settings.redirectURL);
	                window.location.replace(decodeURIComponent(settings.redirectURL));
	            } else {
	                window.location.reload();
	            }
	        }
	    },

	    register: function (key, mixins, obj) {
	        if (!obj) {
	            obj = mixins;
	            mixins = [];
	        }

	        var Act = Ctor(Action, mixins, obj);

	        var action = new Act();
	        action.key = key;
	        switcher.actions[key] = action;
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	// context of actions
	module.exports = {
	    element        : null,
	    categoryId     : 1000,
	    username       : null, // user info cached
	    mobile         : null,
	    email          : null, // user info cached
	    password       : null, // user info cached
	    currentFlow    : null, // If in 'login' ， 'register' or 'resetpwd'
	    currentAction  : null, // get current view instance
	    thirdResetLinks: {},
	    imgCode        : null,
	    token          : null,
	    cookie         : null,
	    ticket         : null
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	//index.js
	var views = __webpack_require__(6).views;

	__webpack_require__(21);
	__webpack_require__(32);
	// require("./register/view.js");
	__webpack_require__(37);
	__webpack_require__(48);
	__webpack_require__(52);
	__webpack_require__(56);
	__webpack_require__(60);
	__webpack_require__(64);
	__webpack_require__(70);
	// require("./login-third-bind/view.js");
	__webpack_require__(75);

	__webpack_require__(79);
	__webpack_require__(83);
	__webpack_require__(88);
	__webpack_require__(92);
	__webpack_require__(96);
	__webpack_require__(100);
	__webpack_require__(104);

	__webpack_require__(108);
	__webpack_require__(112);

	module.exports = views;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(7),
	    Ctor = __webpack_require__(20),
	    viewList = {};

	exports.register = function (key, mixins, settings) {
	    //extend base;
	    if (viewList[key]) {
	        throw 'This view already existed!';
	    }

	    if (!settings) {
	        settings = mixins;
	        mixins = [];
	    }

	    var V = Ctor(View, mixins, settings),
	        view = new V(settings);

	    view.name = key;
	    viewList[key] = view;
	};

	exports.views = viewList;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	var template = __webpack_require__(16);
	var errorHandler = __webpack_require__(17);

	var View = function (settings) {
	    if (settings) {
	        this._init(settings);
	        this.initialized = true;
	    }
	};

	View.prototype = {

	    _init: function (settings) {
	        var tmplStr = settings.template;

	        if (settings.templateInitData) {
	            tmplStr = template(tmplStr, settings.templateInitData);
	        }
	        this.element = $(tmplStr);

	        if (false) {
	            this.element.find('[data-external-link]').click(function (event) {
	                var link = $(event.target).attr('href');
	                HJSDK.invokeOriginally('navigator_openURL', {"url": link});
	                event.preventDefault();
	            });
	        }

	        // if(typeof FastClick !== 'undefined' && this.element.find('.hp-head').length) {
	        //     FastClick.attach(this.element.find('.hp-head')[0]);
	        // }

	        this.callbacks = {};
	        this.init();
	        this.initPartial && this.initPartial();
	    },

	    init: function () { /* handle all initialization of view & element
	     * init widgets,
	     * bind events to element,
	     */
	    },

	    show: function () {
	        this.element.show();
	        this.update.apply(this, arguments);
	    },

	    showErrorOnField: function (field, msg, forceToInvalid) {
	        this.element.hpvalidator('showError', field, msg, forceToInvalid);
	    },

	    update: function () {
	    }, //this will be called after view shown.

	    // bind callback to view.
	    on     : function (name, func) {
	        if (!this.callbacks[name]) {
	            this.callbacks[name] = [];
	        }
	        this.callbacks[name].push(func);

	        return this; //support chain;
	    },
	    // trigger callback on view.
	    trigger: function (name, data) {
	        var funcs = this.callbacks[name];
	        if (!funcs) return;

	        data = Array.prototype.slice.call(arguments, 1);

	        for (var i = 0, len = funcs.length; i < len; i++) {
	            if (typeof funcs[i] === 'function') {
	                funcs[i].apply(this, data);
	            }
	        }
	    }
	};

	module.exports = View;

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports) {

	module.exports = function (source, opts) {
	    source = String(source);
	    var data = Array.prototype.slice.call(arguments, 1),
	        toString = Object.prototype.toString;
	    if (data.length) {
	        data = (data.length == 1 ?
	            /*  Object.prototype.toString.call(null) == '[object Object]' */
	            (opts !== null && (/\[object (Array|Object)\]/.test(toString.call(opts))) ? opts : data) : data);

	        return source.replace(/\{\{(.+?)\}\}/g, function (match, key) {
	            var parts = key.split('.'),
	                part = parts.shift(),
	                cur = data,
	                variable;

	            while (part) {
	                if (cur[part] !== undefined) {
	                    cur = cur[part];
	                } else {
	                    cur = undefined;
	                    break;
	                }
	                part = parts.shift();
	            }
	            variable = cur;

	            if ('[object Function]' === toString.call(variable)) {
	                variable = variable(key);
	            }
	            return (undefined === variable ? '' : variable);
	        });
	    }
	    return source;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var errortip = __webpack_require__(18),
	    context = __webpack_require__(4),
	    flows = __webpack_require__(1).flow,
	    markup = '<div class="hp-common-info">' +
	        '   <p class="hp-common-info-line">提示</p>' +
	        '</div>',
	    isCodeIn = function (code, params) {
	        if (typeof code === 'undefined') return;

	        params = Array.prototype.slice.call(arguments, 1);

	        for (var i = 0, len = params.length; i < len; i++) {
	            if (params[i] === code) return true;
	        }
	        return false;
	    };

	module.exports = {
	    initTip: function (container) {
	        this.errorTip = $(markup).appendTo(container);
	        this.errorTip.hperrortip();
	    },

	    showTip: function (msg) {

	        if (false) {
	            HJSDK.invoke('ui_toast', {
	                "message" : msg,
	                "duration": "2000"
	            });
	        } else {
	            this.errorTip.hperrortip('show', msg);
	        }
	    },

	    showErrorMessage: function (code, msg, view, forceToInvalid) {
	        if (msg === undefined) {
	            msg = code;
	            this.showTip(msg);
	        } else {
	            this.showErrorByCode(code, msg, view, forceToInvalid);
	        }
	    },

	    showErrorByCode: function (code, msg, view, forceToInvalid) {
	        var field = '',
	            skipValidate = false;

	        if (isCodeIn(code, 1101, 1102, 1103, 1104, 1301, 1304, 1202, 1201)) {
	            if (context.currentFlow === flows.LOGIN && !context.isNewUser) {
	                field = 'password';
	            } else {
	                field = 'username';
	            }
	            view._updateCaptcha && view._updateCaptcha();

	        } else if (code === 1302) {
	            field = 'mobile';
	        } else if (code === 1303) {
	            field = 'email';
	        } else if (code === 1004) {
	            if(view._showCaptcha) {
	                view._showCaptcha(true);
	                view._updateCaptcha();
	            }
	            view._updateTimer && view._updateTimer();

	            field = 'captcha';
	        } else if (code === 1006) {
	            field = 'sms';
	            view._updateCaptcha();
	        } else if (code === 1008) {
	            field = 'sms';
	            view._showCaptcha(true);
	            view._updateCaptcha();
	        } else if (code === 1503) {
	            msg = '用户操作超时，将自动跳转登录页面';
	            // 之所以将controller的初始化，放在这里，
	            // 是因为commonjs循环依赖时，会出现模块放空的情况
	            // 杜绝循环依赖！
	            var controller = __webpack_require__(3);
	            window.setTimeout(function () {
	                controller.switchToFlow(flows.LOGIN);
	            }, 3000);
	        }

	        if (skipValidate) return;

	        if (field && view.element.find('[name=' + field + ']').length) {
	            view.showErrorOnField(field, msg, forceToInvalid);
	        } else {
	            this.showTip(msg);
	        }
	    }
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Widget = __webpack_require__(19);

	module.exports = Widget.extend('Errortip', {

	    render: function () {
	        this.element.hide();
	    },

	    _registerOuterClick: function () {
	        var self = this,
	            $doc = $(document);

	        $doc.unbind('click.errortip');
	        setTimeout(function () {

	            $doc.bind('click.errortip', function (e) {
	                // jshint eqeqeq: false
	                self.hide();
	            });
	            
	        }, 10);
	    },

	    show: function (msg) {
	        var self = this;
	        this.element.children(':first').text(msg);
	        this.element.css({
	            'display': 'table'
	        });
	        this._registerOuterClick();
	        var timer = setTimeout(function () {
	            self.hide();
	        }, 2000);
	    },

	    hide: function () {
	        this.element.hide();
	        $(document).unbind('click.errortip');
	    }
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	var __hasProp = Object.prototype.hasOwnProperty,
	    __slice = Array.prototype.slice,
	    __extend = function (target) {
	        var input = __slice.call(arguments, 1),
	            key,
	            value;
	        for (var i = 0, length = input.length; i < length; i++) {
	            for (key in input[i]) {
	                value = input[i][key];
	                if (input[i].hasOwnProperty(key) && value !== undefined) {
	                    // Clone objects
	                    if ($.isPlainObject(value)) {
	                        target[key] = $.isPlainObject(target[key]) ?
	                            __extend({}, target[key], value) :
	                            // Don't extend strings, arrays, etc. with objects
	                            __extend({}, value);
	                        // Copy everything else by reference
	                    } else {
	                        target[key] = value;
	                    }
	                }
	            }
	        }
	        return target;
	    },
	    __bridge = function (name, Widget) {
	        if (!window.$) return;

	        $.fn[name] = function (options) {

	            var isMethod = typeof options === "string",
	                args = __slice.call(arguments, 1),
	                returnVal = this;

	            if (isMethod) {
	                this.each(function () {
	                    var result,
	                        instance,
	                        widgets = widgetCache[$(this).attr('data-hp-widgets')];

	                    if (!widgets) {
	                        throw 'No widget found!';
	                    }

	                    instance = widgets[name];

	                    if (!instance) {
	                        throw 'Cannot call method before ' + name + ' initialized!';
	                    }
	                    if (typeof instance[options] !== 'function') {
	                        throw 'There is no method called ' + options;
	                    }
	                    result = instance[options].apply(instance, args);

	                    if (result !== instance && result !== undefined) {
	                        returnVal = result && result.jquery ?
	                            returnVal.pushStack(result.get()) :
	                            result;
	                        return false;
	                    }

	                });
	            } else {

	                this.each(function () {
	                    var $this = $(this);
	                    var data = new Widget($this, options);
	                    $this.attr('data-hp-widgets', uid);
	                    widgetCache[uid + ''] = widgetCache[uid + ''] || {};
	                    widgetCache[uid + ''][name] = data;

	                    uid++;
	                });
	            }
	            return returnVal;

	        };
	    };

	var Widget = function () {
	};
	var uid = 0;
	var widgetCache = {};
	var noop = function () {
	};

	Widget.prototype = {
	    options: {
	        enabled: true
	    },

	    _createWidget: function (element, options) {
	        var self = this;

	        self.options = __extend({},
	            self.options,
	            options);

	        self.element = element;

	        self.render();
	        self._trigger("create", null, self._getCreateEventData());

	        self.init();
	    },

	    _getCreateEventData: function () {
	        return {
	            el: this.element
	        }
	    },

	    render  : noop,
	    init    : noop,
	    _destroy: noop,

	    //Invoke custom callback function that defined by widgets
	    //It same as _trigger.
	    //The different is 'event' & 'this'.
	    _invoke: function (type, thisObj, args) {
	        var callback = this.options[type],
	            args = __slice.call(arguments, 2);

	        if (typeof callback === 'function') {
	            return callback.apply(thisObj, args);
	        }
	    },

	    //Trigger custom event that defined by widgets
	    _trigger: function (type, event, args) {
	        var prop, orig, callback = this.options[type];

	        if (typeof callback === 'function') {
	            return callback.call(this.element[0], event, args);
	        }
	    },

	    destroy: function () {
	        this._destroy();
	        this.element.unbind(this.ns)
	            .removeData(this.widgetFullName);
	    }
	};

	Widget.extend = function (name, prototype) {

	    var base, baseProto, fullName,
	        NewWidget = function (element, options) {
	            this._createWidget(element, options);
	        };

	    base = this;
	    fullName = 'hp' + name.toLowerCase();

	    for (var key in base) { //static members
	        if (__hasProp.call(base, key)) NewWidget[key] = base[key];
	    }

	    function Ctor() {
	        this.constructor = NewWidget;
	    }

	    Ctor.prototype = base.prototype;
	    baseProto = new Ctor();
	    NewWidget.__super__ = base.prototype;

	    //proto members
	    baseProto.options = __extend({}, baseProto.options);
	    NewWidget.prototype = __extend(baseProto, prototype, {
	        widgetName: name
	    });

	    __bridge(fullName, NewWidget);

	    return NewWidget;
	}

	module.exports = Widget;

/***/ },
/* 20 */
/***/ function(module, exports) {

	var mergeProto = function (proto, mixins, overrides) {
	    var args = [proto], initPartial = [], len = mixins.length;

	    for (var i = 0; i < len; i++) {
	        if (mixins[i]._initPartial) initPartial.push(mixins[i]._initPartial);
	        args.push(mixins[i]);
	    }

	    if (len = initPartial.length) {
	        proto.initPartial = function () {
	            for (var j = 0; j < len; j++) {
	                initPartial[j].apply(this, arguments);
	            }
	        }
	    }

	    args.push(overrides);

	    $.extend.apply(null, args);
	}

	module.exports = function (Base, mixins, overrides) {
	    var Ctor = function () {
	        Base.apply(this, arguments);
	    };

	    Ctor.prototype = new Base();

	    mergeProto(Ctor.prototype, mixins, overrides);

	    return Ctor;
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);

	var View = __webpack_require__(6),
	    template = __webpack_require__(16),
	    Validator = __webpack_require__(24),
	    Input = __webpack_require__(25),
	    captcha = __webpack_require__(26),
	    device = __webpack_require__(27),
	    settings = __webpack_require__(2),
	    CONST = __webpack_require__(28),
	    css_disabled = 'hp-disabled',
	    css_hidden = 'hp-hide',
	    on_login_text = '登录中',
	    login_default_text = '登录',
	    thirdMixin = __webpack_require__(29),
	    captchaMixin = __webpack_require__(30);

	View.register('login', [thirdMixin, captchaMixin], {
	    template: __webpack_require__(31),

	    init: function () {
	        var self = this,
	            ele = self.element;

	        this.submitBtn = ele.find('.hp-btn');

	        ele.hpvalidator({
	            events    : 'focusin',
	            validClass: ''
	        });
	        ele.find('input').hpinput();

	        ele.on('click', '.hp-user-del', function () {
	            self._switchAvatar(false);
	            self.trigger('clear');

	        }).on('keyup', 'input', function (event) {
	            if (event.keyCode === 13) {//Enter
	                self._handleLogin();
	            }
	        }).on('click', '.hp-register', function (e) {
	            self.trigger('registerClick');
	            e.preventDefault();

	        }).on('click', '.hp-btn', function () {
	            self._handleLogin();

	        }).on('click', '.hp-forgot', function () {
	            self.trigger('forgotPwd');
	        }).on('click', '.hp-back', function () {
	            self.trigger('previous');
	        });

	        if(settings.client === 'pc') {
	            ele.find('.hp-back').hide();
	        }

	        if (false) {

	            ele.find('.hp-try-it').on('click', function () {
	                self.trigger('trialLogin');
	            });

	            if (settings.is_trial) {
	                ele.find('.hp-trial').hide();
	            }

	            if (settings.hide_closebtn) {
	                ele.find('.hp-close-btn').hide();
	            }

	        }
	    },

	    _handleLogin: function () {
	        if (this.submitBtn.hasClass(css_disabled) || !this.element.hpvalidator('valid')) {
	            return;
	        }

	        this.disableSubmit(true);
	        this.trigger('login', {
	            userName: this.element.find('.hp-username').val(),
	            password: this.element.find('.hp-password').val(),
	            imgcode : this.element.find('.hp-captcha').val()
	        });
	    },

	    disableSubmit: function (disabled) {
	        if (disabled) {
	            this.submitBtn.addClass(css_disabled).text(on_login_text);
	        } else {
	            this.submitBtn.removeClass(css_disabled).text(login_default_text);
	        }
	    },

	    _switchAvatar: function (show) {
	        var ele = this.element;

	        ele.find('.hp-input-username')[show ? 'hide' : 'show']();
	        ele.find('.hp-input-userinfo')[show ? 'show' : 'hide']();

	        if (!show) {
	            this._clear();
	        }

	        this.trigger('switchAvatar', show);
	    },

	    _clear: function () {
	        var ele = this.element;

	        ele.find('.hp-password').val('');
	        ele.find('.hp-username').val('');
	    },

	    updateAvatar: function (username, avatar, pwd) {
	        var $userInfo = this.element.find('.hp-input-userinfo');

	        $userInfo.find('.hp-user-name').text(username);
	        $userInfo.find('.hp-user-avatar').attr('src', avatar);
	        pwd && this.element.find('.hp-password').val(pwd);
	    },
	    
	    updateCover: function (appname, icon) {
	        var $appInfo = this.element.find('.hp-app-cover');
	        
	        $appInfo.find('.hp-app-name').text(appname);
	        $appInfo.find('.hp-app-icon').attr('src', icon);
	    },

	    update: function () {
	        if (true) {
	            this.element.find('input').first().focus();
	        }
	        
	        if (false) {
	            this.element.find('.hp-info-tip').hide()
	        }
	    }
	});

/***/ },
/* 22 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Widget = __webpack_require__(19);

	var EMAIL_PATTERN = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
	    CELLPHONE_CN_PATTERN = /^1[34578]\d{9}$/,
	    PASSWORD_PATTERN = /^(?![0-9]+$)(?![a-zA-Z]+$).*$/,
	    PASSWORD_LENGTH_PATTERN = /^.{8,20}$/,
	    USERNAME_START_PATTERN = /^[^_\d].*/,
	    USERNAME_PATTERN = /^[a-zA-Z\u4E00-\uFA29][_a-zA-Z\d\u4E00-\uFA29]+$/,
	    SMS_PATTERN = /^\d{6}$/,
	    CN_PATTERN = /[\u4E00-\uFA29]/g,

	    ERR_CSS = 'hp-input-err',
	    VALID_CSS = 'hp-input-correct',

	    TYPES = 'input:not([type]),input[type="email"],' +
	        'input[type="number"],input[type="password"],input[type="tel"],' +
	        'input[type="text"],input[type="time"]',


	    isEmptyOrNull = function (val) {
	        if (val === undefined || val === null || val === "") {
	            return true;
	        }
	    },
	    patternMatch = function (val, pattern) {
	        return isEmptyOrNull(val) || pattern.test(val);
	    },
	    objectLength = function (obj) {
	        var count = 0,
	            i;
	        for (i in obj) {
	            count++;
	        }
	        return count;
	    };

	Validator = {
	    rules: {
	        required: {
	            validator: function (val) {
	                var stringTrimRegEx = /^\s+|\s+$/g,
	                    testVal;

	                if (val === undefined || val === null) return false;

	                testVal = val;
	                if (typeof val === "string") {
	                    testVal = val.replace(stringTrimRegEx, '');
	                }
	                return ((testVal + '').length > 0);
	            },
	            message  : "不能为空"
	        },

	        cellphone: {
	            validator: function (val) {
	                return patternMatch(val, CELLPHONE_CN_PATTERN);
	            },
	            message  : "手机号码不合法"
	        },

	        equal: {
	            validator: function (val, otherVal) {
	                if (otherVal && otherVal.jquery) otherVal = otherVal.val();
	                return val === otherVal;
	            },
	            message  : "必须于上一次的输入相同"
	        },

	        notEqual: {
	            validator: function (val, otherVal) {
	                if (otherVal && otherVal.jquery) otherVal = otherVal.val();
	                return val !== otherVal;
	            },
	            message  : "用户名和密码不能相同"
	        },

	        'username-start': {
	            validator: function (val) {
	                return patternMatch(val, USERNAME_START_PATTERN);
	            },
	            message  : "不能以下划线或数字开头"
	        },

	        username: {
	            validator: function (val) {
	                var temp = val.replace(CN_PATTERN, '__'),
	                    len = temp.length;

	                return patternMatch(val, USERNAME_PATTERN) && (len >= 4 && len <= 20);
	            },
	            message  : "用户名为4-20个不含特殊符号的字符."
	        },

	        email: {
	            validator: function (val) {
	                return patternMatch(val, EMAIL_PATTERN);
	            },
	            message  : "邮件格式不合法"
	        },

	        sms: {
	            validator: function (val) {
	                return patternMatch(val, SMS_PATTERN);
	            },
	            message  : "短信码格式不正确"
	        },


	        password: {
	            validator: function (val) {
	                return patternMatch(val, PASSWORD_PATTERN);
	            },
	            message  : "密码不能使用纯数字或纯字母"
	        },

	        'password-length': {
	            validator: function (val) {
	                return patternMatch(val, PASSWORD_LENGTH_PATTERN);
	            },
	            message  : "密码长度为8-20位"
	        }
	    }
	};

	var indexOfArray = function (arr, item) {
	        for (var i = 0, len = arr.length; i < len; i++) {
	            if (arr[i] === item) return i;
	        }
	        return -1;
	    },

	    focusinHandler = function (element) {
	        $(element).parent()
	            .removeClass(this.options.errorClass)
	            .removeClass(this.options.validClass);
	    },

	    focusoutHandler = function (element) { //triggered when blur
	        if (!$(element).val()) return;

	        var valid = this.checkElement(element);
	    },

	    keyupHandler = function (element, event) {
	        // Avoid revalidate the field when pressing one of the following keys
	        // Shift, Ctrl, Alt , Capslock, End, Home, Left, Up, 
	        // Right, Down, Insert, Num lock, AltGr
	        var excludedKeys = [
	            16, 17, 18, 20, 35, 36, 37,
	            38, 39, 40, 45, 144, 225
	        ];

	        if (event.which === 9 && $(element).val() === "" ||
	            indexOfArray(excludedKeys, event.keyCode) !== -1) {
	            return;
	        } else {
	            var valid = this.check(element);
	            if (valid) {
	                $(element).parent().removeClass(this.options.errorClass);
	            }
	        }
	    },

	    changeHandler = function (element) {
	        this.checkElement(element);
	    },

	    highlightHandler = function (element) {
	        $(element)
	            .parent()
	            .addClass(this.options.errorClass)
	            .removeClass(this.options.validClass);
	    },

	    unhighlightHandler = function (element) {
	        $(element)
	            .parent()
	            .removeClass(this.options.errorClass)
	            .addClass(this.options.validClass);
	    };

	module.exports = Widget.extend("Validator", {

	    //定义了验证时的handler
	    options: {
	        errorClass : ERR_CSS,
	        validClass : VALID_CSS,
	        rules      : null,
	        // code example:
	        // {
	        //      'username': {
	        //          validated: function(){},
	        //          events: 'focusin,focusout,keyup'
	        //      } 
	        // }
	        events     : 'focusin focusout keyup change',
	        fields     : {},
	        messages   : {},
	        focusin    : focusinHandler,
	        focusout   : focusoutHandler,
	        keyup      : keyupHandler,
	        change     : changeHandler,
	        highlight  : highlightHandler,
	        unhighlight: unhighlightHandler
	    },

	    // this.element means a form container.
	    // It include one submit button
	    // And a couple of form element.
	    render: function () {
	        var self = this,
	            fields = this.options.fields;

	        this.submitted = {};
	        this.forceList = {};
	        this._reset();

	        if (this.options.events) {
	            this.element.bind(this.options.events, function (event) {
	                var handler = event.type,
	                    element = event.target,
	                    name = element.name,
	                    events;

	                if (!$(element).is(TYPES)) return;

	                if (fields[name] && (events = fields[name].events)) {
	                    if (events.lastIndexOf(handler) === -1) return;
	                }

	                return self._invoke(handler, self, element, event);

	            });
	        }
	    },

	    _reset: function () {
	        this.successList = []; //
	        this.errorList = [];
	        this.toShow = $([]);
	        this.toHide = $([]);
	        this.currentElements = $([]);
	    },

	    _staticRules: function (element) {
	        return this.options.rules ?
	            (this._normalizeRule(this.options.rules[element.name]) || {}) : {};
	    },

	    _normalizeRule: function (data) {
	        if (typeof data === "string") {
	            var transformed = {};
	            $.each(data.split(/\s/), function () {
	                transformed[this] = true;
	            });
	            data = transformed;
	        }
	        return data;
	    },

	    _dataRules: function (element) {
	        var method, value, rules = {},
	            $element = $(element);

	        for (method in Validator.rules) {
	            value = $element.data("rule" +
	                method.charAt(0).toUpperCase() +
	                method.substring(1).toLowerCase());
	            if (value !== undefined) {
	                rules[method] = value;
	            }
	        }
	        return rules;
	    },

	    _getRules: function (element) {
	        return $.extend({},
	            this._dataRules(element),
	            this._staticRules(element)
	        );
	    },

	    _formatAndAdd: function (element, rule, msg) {
	        var name = element.name,
	            message = this._customMessage(name, rule.method) || this._customDataMessage(element, rule.method) || msg,
	            theregex = /\#\{(.+?)\}/g;

	        if (theregex.test(message)) {
	            message = message;
	        }

	        this.errorList.push({
	            message: message,
	            element: element,
	            method : rule.method
	        });

	        this.submitted[name] = message;
	    },

	    _showLabel: function (element, message) {
	        var $elem = $(element),
	            error = $elem.siblings('.hp-err-tips:eq(0)');

	        if (!error.length) {
	            error = $('<span class="hp-err-tips"></span>').insertAfter($elem);
	        }

	        error.text(message);

	        this.toShow = this.toShow.add(error);
	    },

	    _elements: function () {
	        var self = this,
	            rulesCache = {};

	        return $(this.element)
	            .find("input,select")
	            .not(":submit,[disabled],:hidden")
	            .filter(function () {
	                // select only the first element for each name, and only those with rules specified
	                if (this.name in rulesCache || !objectLength(self._getRules(this)))
	                    return false;

	                rulesCache[this.name] = true;
	                return true;
	            });
	    },

	    valid: function () {
	        if (objectLength(this.forceList)) return false;

	        var valid = this._checkForm();
	        this.showErrors();

	        return valid;
	    },

	    showError: function (name, message, forceToInvalid) {
	        var self = this,
	            element = self.element.find('[name=' + name + ']');

	        if(!element.length) return;

	        this.errorList.push({
	            message: message,
	            element: element[0]
	        });

	        if (forceToInvalid) {
	            this.forceList[name] = true;
	        }

	        this.successList = $.grep(this.successList, function (element) {
	            return element.name !== name;
	        });

	        this.showErrors();
	    },

	    showValid: function (name) {
	        var self = this,
	            element = self.element.find('[name=' + name + ']');

	        if (this.forceList[name]) {
	            delete this.forceList[name];
	        }

	        $(element)
	            .parent()
	            .addClass(this.options.validClass);
	    },

	    resetForm: function () {
	        this.submitted = {};
	        this.lastElement = null;
	        this._reset();
	        this.toHide = this._errors();
	        this._hideErrors(this.toHide);
	    },

	    _checkForm: function () {
	        this._reset();
	        for (var i = 0, elements = (this.currentElements = this._elements()); elements[i]; i++) {
	            this._check(elements[i]);
	        }
	        return this.errorList.length === 0;
	    },

	    _customMessage: function (name, method) {
	        var m = this.options.messages[name];
	        return m && (m.constructor === String ? m : m[method]);
	    },

	    _customDataMessage: function (element, method) {
	        return $(element).data("msg" + method.charAt(0).toUpperCase() +
	                method.substring(1).toLowerCase()) || $(element).data("msg");
	    },

	    checkElement: function (element) { // check single element

	        if (typeof element === 'string') {
	            element = this.element.find('[name=' + element + ']')[0];
	        } else if(element.jquery) {
	            element = element[0];
	        }

	        if ($(element).is('[disabled]')) return true;

	        var result = this.check(element);
	        this.showErrors();
	        return result;
	    },

	    _check: function (element) {
	        var rules = this._getRules(element),
	            val = $.trim($(element).val()),
	            result, method, rule, check;

	        for (method in rules) {
	            rule = {
	                method    : method,
	                parameters: rules[method]
	            };

	            check = Validator.rules[method];

	            if (!check) {
	                throw "没有找到验证规则" + method;
	            }

	            if (!check.validator.call(this, val, rule.parameters)) {
	                this._formatAndAdd(element, rule, check.message);
	                return false;
	            }
	        }

	        if (objectLength(rules)) {
	            this.successList.push(element);
	        }
	        return true;
	    },

	    check: function (element) {
	        var fields = this.options.fields,
	            valid,
	            name = element.name,
	            field,
	            result = true;

	        this.lastElement = element;
	        this._reset();
	        this.toHide = $(element).siblings('.hp-err-tips:eq(0)');
	        this.currentElements = $(element);
	        valid = this._check(element)
	        result = valid !== false;

	        if (fields && (field = fields[name])) {
	            (typeof field.validated === 'function') &&
	            field.validated.call(this, {
	                validated: valid,
	                name     : name,
	                element  : element
	            });
	        }

	        return result;
	    },

	    showErrors: function () {
	        var i, elements, error, success;

	        for (i = 0; this.errorList[i]; i++) {
	            error = this.errorList[i];
	            this._invoke('highlight', this, error.element);
	            this._showLabel(error.element, error.message);
	        }

	        for (i = 0; this.successList[i]; i++) {
	            success = this.successList[i];
	            this._invoke('unhighlight', this, success);
	            this._showLabel(success);
	        }
	    }
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Widget = __webpack_require__(19);

	var isSupportPlaceHolder = (function () {
	    var input = document.createElement('input'), result;

	    result = typeof input.placeholder === 'string';
	    input = null; //avoid memory leak
	    return result;
	})();
	var cleanHTML = '<span class="hp-icon hp-icon-del hp-btn-del-name"></span>';

	//decorate form element with placeholder.
	module.exports = Widget.extend('Input', {

	    options: {
	        hideOnfocus : false,
	        showCleanBtn: false
	    },

	    render: function () {
	        var self = this,
	            o = self.options, placeholder;

	        placeholder = this.element.attr('placeholder');

	        if (!isSupportPlaceHolder && typeof placeholder === 'string') {
	            self.placeholder = $('<span class="hp-placeholder">' + placeholder + '</span>');
	            self.placeholder.insertBefore(this.element);
	        }

	        if (o.showCleanBtn || this.element.attr('data-enable-clean')) {
	            self.cleanBtn = $(cleanHTML).insertAfter(this.element).hide();

	            self.cleanBtn.mousedown(function () {
	                self.element.val('');
	            });
	        }

	        this._bindEvents();

	    },

	    togglePlaceholder: function (action) { //hide or show.
	        this.placeholder && this.placeholder[action]();
	    },

	    toggleCleanBtn: function (action) { //hide or show.
	        this.cleanBtn && this.cleanBtn[action]();
	    },

	    _bindEvents: function () {
	        var self = this;

	        this.element.bind('paste keyup change blur', function () {
	            if (self.placeholder) {
	                self.element.val() ?
	                    self.togglePlaceholder('hide') :
	                    self.togglePlaceholder('show');
	            }

	            self.element.val() ?
	                self.toggleCleanBtn('show') :
	                self.toggleCleanBtn('hide');
	        });

	        this.element.bind({
	            'keydown': function (event) {
	                if (event.keyCode !== 8) {
	                    self.togglePlaceholder('hide');
	                }
	            },
	            'focus'  : function () {
	                if (self.options.hideOnfocus) {
	                    self.togglePlaceholder('hide');
	                }
	            }
	        });
	    }
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// captcha singleton, make sure only one captcha image on current page.
	var image, token, imageUrl = "",
	    context = __webpack_require__(4),
	    url = "//captcha.yeshj.com/api.php",
	    result = {
	        render: function () {
	            return "<img src='" + imageUrl + "'>";
	        },
	        update: function () {
	            imageUrl = image + "&t=" + (+new Date());
	        },
	        token : token
	    };

	$.get(url, {
	    w: 100,
	    h: 30,
	    t: +new Date()
	}, function (data) {
	    image = data.img;
	    if (false) {
	        if (!/^http/.test(image)) {
	            image = 'http:' + image
	        }
	    }
	    result.token = data.token;
	    imageUrl = image + "&t=" + (+new Date());

	    if (context.mode === 'inline') {
	        var img = $('.hp-captcha-pic img');

	        if (img.length) {
	            img.attr('src', imageUrl);
	        }
	    }

	}, "jsonp");


	module.exports = result;

/***/ },
/* 27 */
/***/ function(module, exports) {

	var ua = navigator.userAgent,
	    isAndroid = /Android/i.test(ua),
	    isBlackBerry = /BlackBerry/i.test(ua),
	    isWindowPhone = /IEMobile/i.test(ua),
	    isIOS = /iPhone|iPad|iPod/i.test(ua),
	    isWeixin = /micromessenger/i.test(ua),
	    isMobile = isAndroid || isBlackBerry || isWindowPhone || isIOS,
	    isPC = !isWeixin && !isMobile;

	isMobile = !isWeixin && isMobile;

	function device() {
	    if (isWeixin) {
	        return "weixin";
	    } else if (isMobile) {
	        return "mobile";
	    } else {
	        return "pc";
	    }
	}

	module.exports = {
	    isWeixin: isWeixin,
	    isMobile: isMobile,
	    isPC    : isPC,
	    device  : device()
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * The constants for HJPassport
	 */

	var device = __webpack_require__(27),
	    settings = __webpack_require__(2),
	    getAPISLD = function () {
	        return settings.API_SLD || '//pass';
	    };
	    
	if (false) {
	    var genAPIUrl = function (action) {
	        return {
	            host  : getAPISLD() + ".hujiang.com",
	            path  : "/Handler/UCenter",
	            action: action
	        }
	    }
	} else {
	    var genAPIUrl = function (action) {
	        return getAPISLD() + ".hujiang.com/Handler/UCenter?action=" + action;
	    };
	}
	    

	module.exports = {
	    getAPISLD       : getAPISLD,
	    genAPIUrl       : genAPIUrl,
	    originDomain    : document.domain,
	    thirdLoginDomain: document.domain.replace(/.*((?:hujiang|cctalk|hjenglish|hjclass)\.com).*/, '$1'),
	    SSODomains      : ["hujiang.com", "yeshj.com", "cctalk.com", "hjenglish.com", "hjclass.com"],

	    agreementLink  : getAPISLD() + ".hujiang.com/" + (device.isPC ? '' : 'm/') + "agreement.aspx",
	    fillUserInfoUrl: getAPISLD() + ".hujiang.com/account",


	    unameCookie: "HJ_USER_NAME",
	    uidCookie  : "HJ_USER_ID",

	    EMAIL_DOMAIN: {
	        '@qq.com'     : 'http://mail.qq.com',
	        '@163.com'    : 'http://mail.163.com',
	        '@126.com'    : 'http://mail.126.com',
	        '@sina.com'   : 'http://mail.sina.com',
	        '@hujiang.com': 'http://mail.hujiang.com',
	        '@hotmail.com': 'http://mail.hotmail.com',
	        '@gmail.com'  : 'http://mail.google.com'
	    },
	    keyCode     : {
	        INSERT      : 45,
	        DELETE      : 46,
	        BACKSPACE   : 8,
	        TAB         : 9,
	        ENTER       : 13,
	        ESC         : 27,
	        LEFT        : 37,
	        UP          : 38,
	        RIGHT       : 39,
	        DOWN        : 40,
	        END         : 35,
	        HOME        : 36,
	        SPACEBAR    : 32,
	        PAGEUP      : 33,
	        PAGEDOWN    : 34,
	        F2          : 113,
	        F10         : 121,
	        F12         : 123,
	        NUMPAD_PLUS : 107,
	        NUMPAD_MINUS: 109,
	        NUMPAD_DOT  : 110
	    }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var CONST = __webpack_require__(28),
	    settings = __webpack_require__(2),
	    device = __webpack_require__(27);

	module.exports = {

	    _initPartial: function () { // init parital widget on views
	        this._disable3rdParty();
	    },

	    _disable3rdParty: function () {
	        var platforms = settings.disable3rdParty || [],
	            i = 0,
	            len = platforms.length,
	            thirdContainer = this.element.find('.hp-third-login');

	        if(settings.disable3rdParty === "all") {
	            return thirdContainer.find('.hp-list').hide();
	        }

	        if (true) {

	            if (device.isMobile && !device.isWeixin) {
	                this.element.find('.hp-wechat').hide();
	                thirdContainer.addClass('hp-third-with-two');
	            }
	            
	        } 
	        else {
	            
	            for (; i < len; i++) {
	                var platform = platforms[i];
	                if (platform) this.element.find('.hp-' + platform).hide();
	            }
	            
	            if (this.element.has('.hp-register-switch').length && !settings.diableEmail) {
	                if (len === 0) return thirdContainer.addClass('hp-third-with-four');
	                len--;
	            }
	            
	            if (len === 1) thirdContainer.addClass('hp-third-with-two');
	            if (len === 2) thirdContainer.addClass('hp-third-with-one');
	        }
	    },

	    _bind3rdClick: function (data) {
	        var self = this, el = this.element;

	        data = data || {};

	        el.find('.hp-wechat').click(function (event) {
	            self.trigger('record3rdClick', 'login_weixin');
	            self.trigger('hanlde3rdClick', data.weixin || 'wechat');
	            event.preventDefault();
	        });
	        el.find('.hp-weibo').click(function (event) {
	            self.trigger('record3rdClick', 'login_weibo');
	            self.trigger('hanlde3rdClick', data.sina || 'weibo');
	            event.preventDefault();
	        });
	        el.find('.hp-qq').click(function (event) {
	            self.trigger('record3rdClick', 'login_qq');
	            self.trigger('hanlde3rdClick', data.qq || 'qq');
	            event.preventDefault();
	        });
	    },

	    _update3rdLoginUrl: function (data) {
	        var el = this.element;
	        el.find('.hp-wechat').attr('href', data.weixin);
	        el.find('.hp-weibo').attr('href', data.sina);
	        el.find('.hp-qq').attr('href', data.qq);
	    }
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var captcha = __webpack_require__(26),
	    css_hidden = 'hp-hide';

	module.exports = {

	    _initPartial: function () { // init parital widget on views
	        var self = this;
	        this.element.on('click', '.hp-captcha-pic', function () {
	            self._updateCaptcha();
	        });
	    },

	    _renderCaptcha: function () {
	        this.element.find('.hp-captcha-pic').html(captcha.render());
	    },

	    _updateCaptcha: function () {

	        //var cap =  this.element.find('.hp-captcha-pic');
	        //if(cap.length && cap.is(':visible')) {
	        //    captcha.update();
	        //    this._renderCaptcha();
	        //}
	        captcha.update();
	        this._renderCaptcha();
	    },

	    _showCaptcha: function (show) {
	        var $yzm = this.element.find('.hp-input-captcha'),
	            $yzmInput = $yzm.find('.hp-captcha');

	        if (show) {
	            $yzm.removeClass(css_hidden);
	            $yzmInput.removeAttr('disabled');
	        } else {
	            $yzm.addClass(css_hidden);
	            $yzmInput.attr('disabled', 'disabled');
	        }
	    }
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n    <div class=\"hp-head\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            \n            <span class=\"hp-h3\">登录沪江</span>\n            <a href=\"javascript:;\" class=\"hp-right hp-register\">\n                注册&nbsp;\n            </a>\n            \n            \n        </div>\n    </div>\n    <div class=\"hp-section\">\n        <div class=\"hp-body\">\n            \n            \n            \n            \n                <div class=\"hp-input hp-input-username\">\n    <input type=\"text\" class=\"hp-username\" name=\"username\" autocomplete=\"off\" autocapitalize=\"off\" autocorrect=\"off\"  data-enable-clean=\"true\" data-rule-required=\"true\"\n           placeholder=\"手机号/用户名/邮箱\"/>\n    <i class=\"hp-input-icon hp-icon-input-username\"></i>\n    <span class=\"hp-err-tips\"></span>\n    <span class=\"hp-flag\"></span>\n</div>\n\n                <div class=\"hp-input hp-input-userinfo hp-cf\">\n                    <img src=\"//i2.hjfile.cn/f96/92/85/34819285.jpg\" class=\"hp-user-avatar\" alt=\"头像\"/>\n                    <span class=\"hp-user-name\">用户名</span>\n\n                    <div class=\"hp-user-del\"><span class=\"hp-icon hp-icon-del\"></span></div>\n                </div>\n\n                <div class=\"hp-input\">\n                    <input type=\"password\" class=\"hp-password\" name=\"password\" data-rule-required=\"true\" maxlength=\"20\"\n                        placeholder=\"密码\"/>\n                    <i class=\"hp-input-icon hp-icon-input-password\"></i>\n                    <a class=\"hp-forgot\" href=\"javascript:void(0);\" data-bi-point=\"forgot_password\">忘记密码？</a>\n                    <span class=\"hp-err-tips\">密码错误提示</span>\n                </div>\n\n\n                <div class=\"hp-input hp-input-half hp-input-captcha hp-hide\">\n    <input class=\"hp-captcha\" disabled=\"disabled\" type=\"text\" maxlength=\"8\" name=\"captcha\" data-rule-captcha=\"true\"\n           data-rule-required=\"true\" placeholder=\"验证码\"/>\n    <span class=\"hp-btn-half hp-captcha-pic\"></span>\n    <i class=\"hp-input-icon hp-icon-input-captcha\"></i>  \n    <span class=\"hp-err-tips\"></span>\n</div>\n                \n\n                <button class=\"hp-btn hp-btn-green\" type=\"submit\" data-bi-point=\"login_submit\">登&nbsp;&nbsp;录</button>\n            \n            \n            \n        </div>\n        <div class=\"hp-third-login\">\n    \n    \n    \n    \n\n    <div class=\"hp-list hp-cf\">\n        <a class=\"hp-wechat\" target=\"_blank\">\n            <p><span class=\"hp-icon hp-icon-weixin\"></span></p>\n            <span class=\"hp-name\">微信</span>\n        </a>\n        <a class=\"hp-qq\" target=\"_blank\">\n           <p><span class=\"hp-icon hp-icon-qq\"></span></p>\n            <span class=\"hp-name\">QQ</span>\n        </a>\n        <a class=\"hp-weibo\" target=\"_blank\">\n            <p><span class=\"hp-icon hp-icon-weibo\"></span></p>\n            <span class=\"hp-name\">微博</span>\n        </a>\n    </div>\n</div>\n    </div>\n</div>\n";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33);
	var View = __webpack_require__(6);

	View.register('login-transfer', {
	    template: __webpack_require__(36)
	});

/***/ },
/* 33 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 34 */,
/* 35 */,
/* 36 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n    <div class=\"hp-section\">\n\n        <div class=\"hp-login-transfer\">\n\n            <span class=\"hp-login-transfer-success\"></span>\n\n            <p class=\"hp-info\">\n                <span class=\"hp-green\">登录成功</span>, 正在努力跳转...\n            </p>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);

	var View = __webpack_require__(6),
	    Tabs = __webpack_require__(40).Tabs,
	    captcha = __webpack_require__(26),
	    css_disabled = 'hp-disabled',
	    css_hidden = 'hp-hide',
	    disable_btn_text = '正在注册',
	    btn_text = '注册',
	    BI = __webpack_require__(45),
	    settings = __webpack_require__(2),
	    customMsg = {
	        'password': {required: '密码不能为空！'},
	        'mobile'  : {required: '手机号码不能为空！'},
	        'captcha' : {required: '验证码不能为空！'}
	    },
	    thirdMixin = __webpack_require__(29),
	    captchaMixin = __webpack_require__(30);

	var isIE10Minus = $.browser && $.browser.msie && parseInt($.browser.version, 10) < 10;

	View.register('register-mobile', [thirdMixin, captchaMixin], {

	    template        : __webpack_require__(47),
	    templateInitData: {
	        agreementLink: __webpack_require__(28).agreementLink
	    },

	    init: function () {
	        var self = this,
	            ele = self.element,
	            rules,
	            mobileContainer = ele.find('#hp-reg-mobile');

	        self.currentMode = 'mobile';
	        self.currentTab = mobileContainer;
	        self.dtm = ele.find('.hp-dtm-get');

	        ele.find('.hp-agreement a').attr('href');
	        
	        // init widgets
	        ele.find('input').hpinput();
	        ele.find('.hp-password').hpstrength();

	        var mobileConfig = {
	                validated: function (data) {
	                    var validator = this,
	                        val = $(data.element).val();
	                    if (data.validated === true) {
	                        self.trigger('checkExist', 'mobile', val, function (v, message, isSafe) {
	                            if (v) {
	                                self._showCaptcha(!isSafe);
	                                // self._toggleDtm(true);
	                                validator.showValid('mobile', true);
	                            } else {
	                                // self._toggleDtm(false);
	                                validator.showError('mobile', message, true);
	                            }
	                        });
	                    } else {
	                        // self._toggleDtm(false);
	                    }
	                }
	            };

	        mobileContainer.hpvalidator({
	            messages: customMsg,
	            fields  : {
	                'mobile'  : mobileConfig
	            }
	        });

	        // bind event
	        ele.on('keyup', 'input', function (event) {
	            if (event.keyCode === 13) {
	                self._onRegisterBtnClick();
	            }
	        }).on('click', '.hp-btn', function () {
	            if ($(this).hasClass(css_disabled)) return;
	            self._onRegisterBtnClick();

	        }).on('click', '.hp-back', function () {
	            self.trigger('previous');
	        }).on('click', '.hp-register-switch', function () {
	            self.trigger('switchToEmail');
	        }).on('click', '.hp-select-other', function () {
	            self._toggleThird();
	        });

	        if(settings.client === 'pc') {
	            ele.find('.hp-login-nav').hide();
	        } else {
	            ele.on('click','.hp-login-nav', function(){
	                self.trigger('login');
	            });
	        }
	    },
	    
	    _toggleThird: function () {
	       var logoClass = 'hp-icon-arrow-up hp-icon-arrow-down' 
	        
	       $thirdList = this.element.find('.hp-list'),
	       $selectLogo = this.element.find('.hp-select-title i');
	        
	       $selectLogo.toggleClass(logoClass)     
	       $thirdList.toggleClass(css_hidden);        
	    },
	    
	    _toggleDtm: function (enable) {
	        if (enable && this.interval) return;
	        this.dtm[enable ? 'removeClass' : 'addClass'](css_disabled);
	    },

	    showErrorOnField: function (field, msg, forceToInvalid) {
	        this.currentTab.hpvalidator('showError', field, msg, forceToInvalid);
	    },

	    _onRegisterBtnClick: function () {
	        var currentTab = this.currentTab;
	        if (!currentTab.hpvalidator('valid')) return;
	        this._switchRegisterButtonState(true);

	        this.trigger('getRegisterCode', {
	                mobile     : currentTab.find('.hp-mobileno').val(),
	                password   : currentTab.find('.hp-password').val(),
	                imgCode    : currentTab.find('.hp-captcha').val(),
	                sendtype   : 'register'
	            });
	    },

	    _switchRegisterButtonState: function (disabled) {
	        var $btn = this.currentTab.find('.hp-btn');
	        if (disabled) {
	            $btn.addClass(css_disabled).text(disable_btn_text);
	        } else {
	            $btn.removeClass(css_disabled).text(btn_text);
	        }
	    },
	    // called before it bee n shown.
	    update      : function (context) {
	        this.focus();
	        if (true) {
	            this.element.find('.hp-collapse-pc').show();
	        }
	    },

	    focus: function (context) {
	        if (true) {
	            this.currentTab.find('input:visible').first().focus();
	        }
	    }
	});

/***/ },
/* 38 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 39 */,
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	//index.js

	exports.Dialog = __webpack_require__(41);
	//exports.Hint = require('./hint.js');
	exports.Tabs = __webpack_require__(42);
	exports.Errortip = __webpack_require__(18);
	exports.Validator = __webpack_require__(24);

	//exports.Checkbox = require('./checkbox.js');
	exports.Strength = __webpack_require__(44);
	exports.Input = __webpack_require__(25);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*global jQuery, window, $*/

	var Widget = __webpack_require__(19);
	var keyCode = __webpack_require__(28).keyCode;

	/**
	 * @namespace HJPassport.Widget.Dialog
	 */
	module.exports = Widget.extend("Dialog", {
	    options: {
	        width         : 500,
	        closeOnEsc    : true,
	        closeOnOverlay: true,
	        showTitle     : false,
	        modal         : true,
	        minHeight     : 150,
	        minWidth      : 150,
	        animation     : false,
	        zIndex        : 1000001,
	        beforeClose   : null,
	        open          : null,
	        close         : null
	    },

	    render: function () {
	        var self = this,
	            o = self.options,
	            $dialog;

	        this.widget = $dialog = $("<div>")
	            .addClass("hp-dialog")
	            .css({
	                display: "none",
	                zIndex : o.zIndex
	            })
	            .attr("tabIndex", -1)
	            .width(o.width || 500)
	            .bind({
	                "keydown": function (event) {
	                    if (o.closeOnEsc && event.keyCode === keyCode.ESC) {
	                        self.close();
	                        event.preventDefault();
	                    }
	                }
	            })
	            .appendTo("body");

	        this.element
	            .addClass("hp-content")
	            .show()
	            .appendTo($dialog);

	        if (o.showTitle) {
	            this._createTitle();
	        }

	    },

	    widget: function () {
	        return this.widget;
	    },

	    _createTitle: function () {
	        var self = this,
	            title,
	            o = self.options,
	            widget = this.widget,
	            header = '<div class="hp-dialog-header"></div>';

	        this.header = $(header)
	            .bind("mousedown", function () {
	                widget.focus();
	            })
	            .prependTo(widget);

	        widget = this.header;

	        this.$closeBtn = $('<div class="hp-close"></div>')
	            .click(function () {
	                self.close();
	            })
	            .appendTo(widget);

	    },

	    _createOverlay: function () {
	        var self = this,
	            getDocSize = function () {
	                return {
	                    height: $(document).height() + 'px'
	                };
	            };

	        $(window).bind("resize.dialog", function () {
	            self.overlay.css({
	                //width: 0,
	                height: 0
	            }).css(getDocSize());

	            self._setPosition();
	        });

	        return $("<div class='hp-overlay'>")
	            .click(function () {
	                if (self.options.closeOnOverlay) {
	                    self.close();
	                }
	            })
	            .appendTo(document.body)
	            .css(getDocSize());
	    },

	    reset: function () {
	        return this._setPosition();
	    },

	    _setPosition: function () {
	        var self = this,
	            o = self.options,
	            d = this.widget,
	            position = o.position,
	            winW = $(window).width(),
	            winH = $(window).height(),
	            top, left,
	            scrollTop = d.css('position') !== 'fixed' ? $(window).scrollTop() : 0;

	        top = (position && !isNaN(position.top)) ?
	            position.top :
	        winH / 2 - d.outerHeight(true) / 2 + scrollTop; //reduce height of header

	        left = (position && !isNaN(position.left)) ?
	            position.left :
	        winW / 2 - d.outerWidth(true) / 2;

	        d.css({
	            left: left,
	            top : top
	        });
	    },

	    /**
	     打开对话框.
	     @param {number} - duration
	     @returns {jQuery}
	     */
	    open: function () {
	        if (this.isOpen) return;

	        var self = this,
	            o = this.options;

	        this.overlay = o.modal ? this._createOverlay() : null;

	        this._setPosition();
	        this.widget.show();
	        self.widget.focus();
	        this.isOpen = true;
	        this._trigger("open", null, null);

	        return this;
	    },

	    /**
	     关闭对话框.
	     @param {number} - duration
	     @returns {jQuery}
	     */
	    close: function () {
	        if (!this.isOpen) return;

	        if (this._trigger("beforeClose", null) === false) {
	            return;
	        }
	        this.isOpen = false;

	        if (this.overlay) {
	            this.overlay.remove();
	        }

	        this.widget.hide();
	        this._trigger("close", null, null);
	        return this;
	    }
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Widget = __webpack_require__(19);
	var tap = __webpack_require__(43);
	var settings = __webpack_require__(2);

	module.exports = Widget.extend('Tabs', {
	    options: {
	        active              : 0,
	        selectedIndexChanged: null
	    },

	    render: function () {
	        this._renderPanels();
	        this._bindEvents();
	        this.setActiveTab(this.options.active);
	    },

	    _renderPanels: function () {
	        var self = this;

	        self.panels = $();
	        self.tabs = this.element.find('>ul>li');

	        self.tabs.each(function (i) {
	            var $this = $(this),
	                panelId = $this.attr('data-panel'),
	                panel = self.element.find('#' + panelId);

	            if (panel.length) {
	                self.panels = self.panels.add(panel);
	            }
	        });
	    },

	    setActiveTab: function (idx) {
	        var $this = this.tabs.eq(idx || 0),
	            panelId = $this.attr('data-panel'),
	            $panel = this.element.find('#' + panelId);

	        if (!$this.hasClass('hp-tab-selected')) {

	            this.tabs.removeClass('hp-tab-selected');
	            this.panels.hide();

	            $this.addClass('hp-tab-selected');
	            $panel.show();

	            this._trigger('selectedIndexChanged', null, {
	                index: idx
	            });
	        }
	    },

	    _bindEvents: function () {
	        var self = this;

	        if (settings.client === 'mobile') {
	            self.element.find('li').tap(function (event) {
	                self.setActiveTab($(this).index());
	            });
	        } else {
	            self.element.delegate('li', {
	                click: function (event) {
	                    self.setActiveTab($(this).index());
	                }
	            }).delegate('li a', {
	                click: function (event) {
	                    event.preventDefault();
	                }
	            });
	        }
	    }
	});

/***/ },
/* 43 */
/***/ function(module, exports) {

	var isTouch = "ontouchend" in document.createElement("div");

	$.fn.tap = function (fn) {

	    var collection = this,
	        tstart = isTouch ? "touchstart" : "mousedown",
	        tmove = isTouch ? "touchmove" : "mousemove",
	        tend = isTouch ? "touchend" : "mouseup",
	        tcancel = isTouch ? "touchcancel" : "mouseout";

	    collection.each(function () {
	        var i = {};
	        i.target = this;
	        $(i.target).on(tstart, function (e) {
	            var p = "touches" in e ? e.touches[0] : (isTouch ? window.event.touches[0] : window.event);
	            i.startX = p.clientX;
	            i.startY = p.clientY;
	            i.endX = p.clientX;
	            i.endY = p.clientY;
	            i.startTime = +new Date;
	        });
	        $(i.target).on(tmove, function (e) {
	            var p = "touches" in e ? e.touches[0] : (isTouch ? window.event.touches[0] : window.event);
	            i.endX = p.clientX;
	            i.endY = p.clientY;
	        });
	        $(i.target).on(tend, function (e) {
	            if ((+new Date) - i.startTime < 300) {
	                if (Math.abs(i.endX - i.startX) + Math.abs(i.endY - i.startY) < 20) {
	                    var e = e || window.event;
	                    e.preventDefault();
	                    fn.call(i.target);
	                }
	            }
	            i.startTime = undefined;
	            i.startX = undefined;
	            i.startY = undefined;
	            i.endX = undefined;
	            i.endY = undefined;
	        });
	    });
	    return collection;
	}

	module.exports = {
	    tap        : $.fn.tap,
	    enableTouch: isTouch
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Widget = __webpack_require__(19);

	var STRENGTH = {
	    none  : 0,
	    weak  : 1,
	    medium: 2,
	    strong: 3
	}

	var CSS = 'hp-input',
	    WEAK_CSS = CSS + ' hp-input-bad',
	    MEDIUM_CSS = CSS + ' hp-input-ok',
	    STRONG_CSS = CSS + ' hp-input-good',
	    WEAK_PATTERN = /^(abc123|a1b2c3|aaa111|123qwe|p@ssword|passw0rd|trustno1)$/,
	    DIGITAL_PATTERN = /\d/,
	    LETTER_PATTERN = /[a-zA-Z]/,
	    SPECIAL_PATTERN = /[^0-9a-zA-Z]/;

	//password strength
	module.exports = Widget.extend('Strength', {

	    render: function () {
	        var self = this;

	        this.strength = self.element.parent('.hp-input');

	        this.element.bind('paste keyup change input', function () {
	            var val = $.trim(self.element.val());

	            self.status(val);
	        });
	    },

	    checkStrength: function (val) {
	        if (!val) return 0;
	        if (WEAK_PATTERN.test(val) || val.length < 8) return 1;

	        var num = 0;
	        if (DIGITAL_PATTERN.test(val)) {
	            num++;
	        }
	        if (LETTER_PATTERN.test(val)) {
	            num++;
	        }
	        if (SPECIAL_PATTERN.test(val)) {
	            num++;
	        }

	        return num;
	    },

	    status: function (val) {
	        var strength = this.strength[0];

	        var status = this.checkStrength(val);

	        switch (status) {
	            case STRENGTH.weak:
	                strength.className = WEAK_CSS;
	                break;
	            case STRENGTH.medium:
	                strength.className = MEDIUM_CSS;
	                break;
	            case STRENGTH.strong:
	                strength.className = STRONG_CSS;
	                break;
	            case STRENGTH.none:
	            default:
	                strength.className = CSS;
	                break;
	        }
	    }
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * The Points info for data analysis
	 */
	if (false) {
	    var BI = require("./BI-app.js");
	} else {
	    var BI = __webpack_require__(46);
	}

	var POINTS = BI.POINTS;

	module.exports = {

	    getBIHash: function (context) {
	        return {
	            name      : context.name,
	            groupid   : context.groupid,
	            categoryid: context.category_id
	        }
	    },

	    register: function (element) { // write in view class.
	        var self = this;

	        $(element).delegate('[data-bi-point]', 'click', function (event) {
	            var pointElement = $(this),
	                BIKey = pointElement.attr('data-bi-point');

	            if (POINTS[BIKey]) {
	                self.fire(BIKey);
	            }
	        });
	    },

	    // Send registered point to BI-backend.
	    fire: function (type, hash) {
	        BI.fire (type, hash);
	    }
	};


/***/ },
/* 46 */
/***/ function(module, exports) {

	/*
	 * The Points info for data analysis
	 */
	var POINTS = {
	    'login_qq'                : [2, 1402],
	    'login_submit'            : [2, 1403],
	    'login_failure'           : [2, 1404],
	    'login_close'             : [2, 1405],
	    'login_weibo'             : [2, 1407],
	    'login_weixin'            : [2, 1408],
	    'login_show'              : [2, 1409],
	    'login_success_view'      : [2, 1410],
	    'login_failure_view'      : [2, 1411],
	    'login_close_witheixst'   : [2, 1412],
	    'login_delexsit_witheixst': [2, 1413],
	    'login_show_witheixst'    : [2, 1414],
	    'login_retry_view'        : [2, 1415],

	    'sync_login_success': [2, 1474],
	    'sync_login_failure': [2, 1475],

	    'register_email_to_mobile'     : [2, 1441],
	    'register_email_close'         : [2, 1442],
	    'register_email_show'          : [2, 1443],
	    'register_email_submit'        : [2, 1444],
	    'register_mobile_to_emal'      : [2, 1424],
	    'register_mobile_close'        : [2, 1425],
	    'register_mobile_sms'          : [2, 1426],
	    'register_mobile_show'         : [2, 1427],
	    'register_mobile_submit'       : [2, 1428],
	    'register_success'             : [2, 1400],
	    'register_success_close'       : [2, 1446],
	    'register_success_fillinfo'    : [2, 1447],
	    'register_success_show'        : [2, 1448],
	    'register_success_choose'      : [2, 1454],
	    'register_success_continue'    : [2, 1455],
	    'register_success_goto_email'  : [2, 1456],
	    'register_success_active_email': [2, 1464],
	    'register_success_trial'       : [2, 1465],
	    'register_success_next'        : [2, 'Bi_regsuccess_click'],
	    'register_sms_show'            : [2, 'Bi_dynamiccode_show'],
	    'register_sms_nextstep'        : [2, 'Bi_dynamiccode_click'],
	    'register_mobile_duration'     : [2, 'Bi_regphone_duration'],
	    'register_sms_duration'        : [2, 'Bi_dynamiccode_duration'],
	    'register_success_duration'    : [2, 'Bi_regsuccess_duration'],

	    'interest_step2_close' : [2, 1449],
	    'interest_step2_show'  : [2, 1450],
	    'interest_step1_choose': [2, 1451],
	    'interest_step1_close' : [2, 1452],
	    'interest_step1_show'  : [2, 1453],
	    'interest_step1_skip'  : [2, 1457],
	    'interest_choose'      : [2, 1431],
	    'interest_switch'      : [2, 1432],
	    'interest_skep'        : [2, 1433],

	    'forgot_password'          : [2, 1406],
	    'resetpwd_qq'              : [2, 1401],
	    'resetpwd_weibo'           : [2, 1429],
	    'resetpwd_weixin'          : [2, 1430],
	    'resetpwd_sms_get'         : [2, 1416],
	    'resetpwd_sms_nextstep'    : [2, 1417],
	    'resetpwd_sms_show'        : [2, 1418],
	    'resetpwd_sms_submit'      : [2, 1419],
	    'resetpwd_msg'             : [2, 1420],
	    'resetpwd_complain'        : [2, 1445],
	    'resetpwd_next'            : [2, 1421],
	    'resetpwd_show'            : [2, 1422],
	    'resetpwd_success'         : [2, 1423],
	    'resetpwd_email_success'   : [2, 1434],
	    'resetpwd_email_err_show'  : [2, 1435],
	    'resetpwd_email_to_mailbox': [2, 1436],
	    'resetpwd_email_next'      : [2, 1437],
	    'resetpwd_email_show'      : [2, 1438],
	    'resetpwd_email_retype'    : [2, 1439],
	    'resetpwd_email_submit'    : [2, 1440],

	    //third party
	    '3rd_login_back'        : [2, 1459],
	    '3rd_login_register_new': [2, 1460],
	    '3rd_login_bind_click'  : [2, 1461],
	    //'3rd_login_back': [2, 1462],
	    //'3rd_login_back': [2, 1463],
	    '3rd_login_bind_submit' : [2, 1466],
	    '3rd_login_bind_back'   : [2, 1467],
	    '3rd_login_telbind_show'      : [2, 'login_telbind_show'],
	    '3rd_login_telbind_vertify'   : [2, 'login_telbind_vertify'],
	    '3rd_login_telbind_getcode'   : [2, 'login_telbind_getcode'],
	    '3rd_login_telbind_pass'      : [2, 'login_telbind_pass'],
	    '3rd_login_telbind_picvertify': [2, 'login_telbind_picvertify']    
	};

	module.exports = {
	    POINTS : POINTS,
	    
	    sendEvent: function (planID, eventID, params) {
	        if (typeof window.SendEvent === 'function') {
	            return window.SendEvent(planID, eventID, params);
	        }
	    },

	    // Send registered point to BI-backend.
	    fire: function (type, hash) {
	        if (!POINTS[type]) {
	            throw "Type " + type + ' doesn\'t exsit!';
	        }
	        var args = POINTS[type];

	        this.sendEvent.call(this, args[0], args[1], hash);
	    }   
	}


/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view \">\n    <div class=\"hp-head\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            <span class=\"hp-h3\">注册沪江</span>\n            <a href=\"javascript:;\" class=\"hp-right hp-login-nav\">\n                登录&nbsp;\n            </a>\n        </div>\n    </div>\n\n    <div class=\"hp-section\">\n        <div class=\"hp-section-pb\">\n            <div class=\"hp-tabs\">\n\n                <div class=\"hp-tab-body\">\n                    <!-- div for mobile register -->\n                    <div id=\"hp-reg-mobile\" class=\"hp-reg-app\">\n\n                        <div class=\"hp-input\">\n    <input class=\"hp-mobileno\" name=\"mobile\" data-enable-clean=\"true\" data-rule-cellphone=\"true\"\n           data-rule-required=\"true\" type=\"tel\" maxlength=\"11\" placeholder=\"填写手机号\"/>\n    <i class=\"hp-input-icon hp-icon-input-mobile\"></i>  \n    <span class=\"hp-err-tips\"></span>\n    <span class=\"hp-flag\"></span>\n</div>\n                        \n                        <div class=\"hp-input hp-input-half hp-input-captcha hp-hide\">\n    <input class=\"hp-captcha\" disabled=\"disabled\" type=\"text\" maxlength=\"8\" name=\"captcha\" data-rule-captcha=\"true\"\n           data-rule-required=\"true\" placeholder=\"验证码\"/>\n    <span class=\"hp-btn-half hp-captcha-pic\"></span>\n    <i class=\"hp-input-icon hp-icon-input-captcha\"></i>  \n    <span class=\"hp-err-tips\"></span>\n</div>\n\n                        <div class=\"hp-input hp-input-password\">\n    <input class=\"hp-password\" type=\"password\" name=\"password\" maxlength=\"20\" data-rule-password-length=\"true\"\n           data-rule-password=\"true\" data-rule-required=\"true\" maxlength=\"35\" placeholder=\"设置密码（8-20位字符）\"/>\n    \n    <i class=\"hp-input-icon hp-icon-input-password\"></i>  \n    \n    <p class=\"hp-pass-bars hp-cf\">\n        <span class=\"hp-pass-bar hp-pass-bar1\"></span>\n        <span class=\"hp-pass-bar hp-pass-bar2\"></span>\n        <span class=\"hp-pass-bar hp-pass-bar3\"></span>\n    </p>\n    <span class=\"hp-err-tips\"></span>\n    <span class=\"hp-flag\"></span>\n</div>\n\n                        <button class=\"hp-btn hp-btn-green hp-dtm-get\" type=\"submit\">注&nbsp;&nbsp;册</button>\n                    </div>\n\n                </div>\n                <!-- div for mail registery end-->\n            </div>\n\n            <div class=\"hp-info-tip hp-agreement\">\n                注册代表您已经阅读并同意<a href='{{agreementLink}}'>《沪江用户协议》</a>\n            </div>\n        </div>\n        <div class=\"hp-collapse-pc hp-hide\">\n            <a href=\"javascript:;\" class=\"hp-register-switch hp-switch\" data-bi-point=\"register_mobile_to_emal\">\n                <i class=\"hp-icon-input-email\"></i>\n                <span>使用邮箱注册</span>                   \n            </a>\n        </div>\n        \n    </div>\n</div>";

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);

	var View = __webpack_require__(6),
	    Tabs = __webpack_require__(40).Tabs,
	    captcha = __webpack_require__(26),
	    css_disabled = 'hp-disabled',
	    css_hidden = 'hp-hide',
	    disable_btn_text = '正在注册',
	    btn_text = '注册',
	    BI = __webpack_require__(45),
	    settings = __webpack_require__(2),
	    customMsg = {
	        'password': {required: '密码不能为空！'},
	        'email'   : {required: '邮箱不能为空！'},
	        'captcha' : {required: '验证码不能为空！'}
	    };

	var isIE10Minus = $.browser && $.browser.msie && parseInt($.browser.version, 10) < 10;

	View.register('register-email', {

	    template        : __webpack_require__(51),
	    templateInitData: {
	        agreementLink: __webpack_require__(28).agreementLink
	    },

	    init: function () {
	        var self = this,
	            ele = self.element,
	            rules,
	            emailContainer = ele.find('#hp-reg-email');

	        self.currentMode = 'email';
	        self.currentTab = emailContainer;
	       
	        ele.find('.hp-agreement a').attr('href');
	        
	        // init widgets
	        ele.find('input').hpinput();
	        ele.find('.hp-password').hpstrength();

	        var checkAsync = function (field, data) {
	                if (data.validated === false) return;
	                var validator = this;

	                self.trigger('checkExist', field, $(data.element).val(), function (isvalidated, message) {
	                    if (!isvalidated) {
	                        validator.showError(field, message, true);
	                    } else {
	                        validator.showValid(field);
	                    }
	                });
	            },
	            emailConfig = {
	                events   : 'focusin,focusout',
	                validated: function (data) {
	                    checkAsync.call(this, 'email', data);
	                }
	            };

	        emailContainer.hpvalidator({
	            messages: customMsg,
	            fields  : {
	                'email'   : emailConfig
	            }
	        });
	        // bind event
	        ele.on('keyup', 'input', function (event) {
	            if (event.keyCode === 13) {
	                self._onRegisterBtnClick();
	            }
	        }).on('click', '.hp-captcha-pic', function () {
	            self._updateCaptcha();
	        }).on('click', '.hp-btn', function () {
	            if ($(this).hasClass(css_disabled)) return;
	            self._onRegisterBtnClick();

	        }).on('click', '.hp-back', function () {
	            self.trigger('previous');
	        }).on('click', '.hp-register-switch', function () {
	            self.trigger('switchToMobile');;
	        })
	        
	        if(settings.client === 'pc') {
	            ele.find('.hp-login-nav, .hp-back').hide();
	        } else {
	            ele.on('click','.hp-login-nav', function(){
	                self.trigger('login');
	            });
	        }
	    },
	    
	    showErrorOnField: function (field, msg, forceToInvalid) {
	        this.currentTab.hpvalidator('showError', field, msg, forceToInvalid);
	    },

	    _onRegisterBtnClick: function () {
	        var currentTab = this.currentTab;
	        if (!currentTab.hpvalidator('valid')) return;
	        this._switchRegisterButtonState(true);

	        this.trigger('sendEmailData', {
	                email      : currentTab.find('.hp-email').val(),
	                password   : currentTab.find('.hp-password').val(),
	                captchaCode: currentTab.find('.hp-captcha').val()
	            });
	    },

	    _switchRegisterButtonState: function (disabled) {
	        var $btn = this.currentTab.find('.hp-btn');
	        if (disabled) {
	            $btn.addClass(css_disabled).text(disable_btn_text);
	        } else {
	            $btn.removeClass(css_disabled).text(btn_text);
	        }
	    },

	    _updateCaptcha: function (data) {
	        captcha.update();
	        this._renderCaptcha();
	    },

	    _renderCaptcha: function () {
	        this.element.find('.hp-captcha-pic').html(captcha.render());
	    },

	    _showCaptcha: function () {
	        this.currentTab
	            .find('.hp-input-captcha')
	            .removeClass(css_hidden)
	            .find('.hp-captcha')
	            .removeAttr('disabled');
	    },

	    _switchCaptcha: function () {
	        if (!this.isShowCaptcha['email']) return;

	        // if (this.isShowCaptcha[this.currentMode]) {
	        //     if(__ISAPP__) { // issue-fixing: In hybridApp , the captcha should be hidden on initialization too show the 3rd-party login icons
	        //         if(this.currentMode === 'mobile') return;
	        //     }
	        //     this._showCaptcha();
	        // }
	        this._showCaptcha();
	    },
	    // called before it bee n shown.
	    update      : function (context) {
	        this.focus();
	        if (true) {
	            this.element.find('.hp-collapse-pc').show();
	        }
	    },

	    focus: function (context) {
	        if (true) {
	            this.currentTab.find('input:visible').first().focus();
	        }
	    }
	});

/***/ },
/* 49 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 50 */,
/* 51 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view \">\n    <div class=\"hp-head\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            <span class=\"hp-h3\">注册沪江</span>\n            <a href=\"javascript:;\" class=\"hp-right hp-login-nav\">\n                登录&nbsp;\n            </a>\n        </div>\n    </div>\n\n    <div class=\"hp-section\">\n        <div class=\"hp-section-pb\">\n            <div class=\"hp-tabs\">\n\n                <div class=\"hp-tab-body\">\n                    <!-- div for mobile register -->\n                    <div id=\"hp-reg-email\" class=\"hp-reg-app\">\n                        <div class=\"hp-input\">\n    <input class=\"hp-email\" name=\"email\" data-enable-clean=\"true\" data-rule-required=\"true\" data-rule-email=\"true\"\n           type=\"email\" maxlength=\"35\" placeholder=\"邮箱\"/>\n    <i class=\"hp-input-icon hp-icon-input-email\"></i>  \n    <span class=\"hp-err-tips\"></span>\n    <span class=\"hp-flag\"></span>\n</div>\n                        \n                        <div class=\"hp-input hp-input-half hp-input-captcha hp-hide\">\n    <input class=\"hp-captcha\" disabled=\"disabled\" type=\"text\" maxlength=\"8\" name=\"captcha\" data-rule-captcha=\"true\"\n           data-rule-required=\"true\" placeholder=\"验证码\"/>\n    <span class=\"hp-btn-half hp-captcha-pic\"></span>\n    <i class=\"hp-input-icon hp-icon-input-captcha\"></i>  \n    <span class=\"hp-err-tips\"></span>\n</div>\n                        \n                        <div class=\"hp-input hp-input-password\">\n    <input class=\"hp-password\" type=\"password\" name=\"password\" maxlength=\"20\" data-rule-password-length=\"true\"\n           data-rule-password=\"true\" data-rule-required=\"true\" maxlength=\"35\" placeholder=\"设置密码（8-20位字符）\"/>\n    \n    <i class=\"hp-input-icon hp-icon-input-password\"></i>  \n    \n    <p class=\"hp-pass-bars hp-cf\">\n        <span class=\"hp-pass-bar hp-pass-bar1\"></span>\n        <span class=\"hp-pass-bar hp-pass-bar2\"></span>\n        <span class=\"hp-pass-bar hp-pass-bar3\"></span>\n    </p>\n    <span class=\"hp-err-tips\"></span>\n    <span class=\"hp-flag\"></span>\n</div>\n\n                        <button class=\"hp-btn hp-btn-green\" type=\"submit\">注&nbsp;&nbsp;册</button>\n                    </div>\n                  \n                </div>\n                <!-- div for mail registery end-->\n            </div>\n\n            <div class=\"hp-info-tip hp-agreement\">\n                注册代表您已经阅读并同意<a href='{{agreementLink}}'>《沪江用户协议》</a>\n            </div>\n            \n        </div>\n        \n        <div class=\"hp-collapse-pc hp-hide\">\n            <a href=\"javascript:;\" class=\"hp-register-switch hp-switch\" data-bi-point=\"register_mobile_to_emal\">\n                <i class=\"hp-icon-input-mobile\"></i>\n                <span>手机快速注册</span>                   \n            </a>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);

	var View = __webpack_require__(6),
	    Tabs = __webpack_require__(40).Tabs,
	    captcha = __webpack_require__(26),
	    css_disabled = 'hp-disabled',
	    css_hidden = 'hp-hide',
	    disable_btn_text = '正在完成',
	    btn_text = '完成',
	    BI = __webpack_require__(45),
	    settings = __webpack_require__(2),
	    customMsg = {
	        'sms'     : {required: '动态码不能为空！'}
	    };

	var isIE10Minus = $.browser && $.browser.msie && parseInt($.browser.version, 10) < 10;

	View.register('register-sms', {

	    template        : __webpack_require__(55),

	    init: function () {
	        var self = this,
	            ele = self.element,
	            rules,
	            mobileContainer = ele.find('#hp-reg-mobile');

	        self.currentMode = 'mobile';
	        self.currentTab = mobileContainer;
	        self.dtm = ele.find('.hp-dtm-resend');
	        
	        // init widgets
	        ele.find('input').hpinput();
	        
	        var checkAsync = function (field, data) {
	                if (data.validated === false) return;
	                var validator = this;
	            };

	        mobileContainer.hpvalidator({
	            messages: customMsg
	        });

	        // bind event
	        ele.on('keyup', 'input', function (event) {
	            if (event.keyCode === 13) {
	                self._onRegisterBtnClick();
	            }
	        }).on('click', '.hp-btn', function () {
	            if ($(this).hasClass(css_disabled)) return;
	            self._onRegisterBtnClick();

	        }).on('click', '.hp-back', function () {
	            self.trigger('previous');
	        });

	        if(settings.client === 'pc') {
	            ele.find('.hp-login-nav').hide();
	        } else {
	            ele.on('click','.hp-login-nav', function(){
	                self.trigger('login');
	            });
	        }
	    },
	    
	    _initDtm: function () {
	        var self = this;
	        self._initDtmInterval($('.hp-dtm-resend'));

	        this.element.on('click', '.hp-dtm-resend', function () {
	            var $this = $(this);
	            if ($this.hasClass(css_disabled)) return;

	            //add validation on send sms
	            var captchaInput = self.currentTab.find('input.hp-captcha');
	            if(captchaInput.length && captchaInput.is(':visible')) {
	                var valid = self.currentTab.hpvalidator("checkElement",captchaInput);
	                if(!valid) return;
	            }

	            $this.addClass(css_disabled);
	            self._initDtmInterval($(this));
	            self.trigger('getMessageCode');
	        });        
	    },

	    _toggleDtm: function (enable) {
	        if (enable && this.interval) return;
	        this.dtm[enable ? 'removeClass' : 'addClass'](css_disabled);
	    },

	    showErrorOnField: function (field, msg, forceToInvalid) {
	        this.currentTab.hpvalidator('showError', field, msg, forceToInvalid);
	    },

	    _onRegisterBtnClick: function () {
	        var currentTab = this.currentTab;
	        if (!currentTab.hpvalidator('valid')) return;
	        this._switchRegisterButtonState(true);
	        
	        this.trigger('sendMobileData', {
	            mobileCode: currentTab.find('.hp-dtm').val()
	        });
	    },

	    _switchRegisterButtonState: function (disabled) {
	        var $btn = this.currentTab.find('.hp-btn');
	        if (disabled) {
	            $btn.addClass(css_disabled).text(disable_btn_text);
	        } else {
	            $btn.removeClass(css_disabled).text(btn_text);
	        }
	    },
	    
	    _updateCaptcha: function () {
	        
	    },

	    _initDtmInterval: function (ele) {
	        var self = this,
	            total = 60;

	        if (self.interval) {
	            window.clearInterval(self.interval);
	        }

	        self.interval = setInterval(function () {
	            ele.text('(' + total.toString() + 's)').removeClass('hp-sms-resend');
	            if (total <= 0) {
	                ele.text('重新发送').removeClass(css_disabled).addClass('hp-sms-resend');

	                clearInterval(self.interval);
	                self.interval = null;
	            }
	            total--;
	        }, 1000);

	    },

	    _updateTimer: function () {
	        if (this.interval) {
	            window.clearInterval(this.interval);
	            this.interval = null;

	            this.element.find('.hp-dtm-resend')
	                .text('重新发送')
	                .removeClass(css_disabled);
	        }
	    },
	    // called before it bee n shown.
	    update      : function (context) {
	        this.focus();
	        this._renderUserPhone(context);
	    },
	    
	    _renderUserPhone: function (context) {
	        var ele = this.element,
	            mobile = context.mobile || '';

	        ele.find('.hp-sms-mobile').text(mobile);         
	    },

	    focus: function (context) {
	        if (true) {
	            this.currentTab.find('input:visible').first().focus();
	        }
	    }
	});

/***/ },
/* 53 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 54 */,
/* 55 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view \">\n    <div class=\"hp-head\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            <span class=\"hp-h3\">填写短信验证码</span>\n        </div>\n    </div>\n\n    <div class=\"hp-section\">\n        <div class=\"hp-section-pb\">\n            <div class=\"hp-tabs\">\n                \n                <div class=\"hp-tab-body\">\n                    <!-- div for mobile register -->\n                    <div id=\"hp-reg-mobile\" class=\"hp-reg-sms\">\n                        \n                        <div class=\"hp-sms-info\">\n                            <div class=\"hp-icon-app-captcha-sent\"></div>\n                            <div class=\"hp-sms-subtitle\">验证码已发送至<span class=\"hp-sms-mobile\"></span></div>\n                            <div class=\"hp-dtm-resend hp-disabled\">(60s)</div>\n                        </div>\n                        \n                        <div class=\"hp-input hp-input-dtm\">\n                            <input class=\"hp-dtm\" type=\"text\" maxlength=\"8\" name=\"sms\" data-rule-required=\"true\" data-rule-sms=\"true\"\n                                placeholder=\"动态码\"/>\n                            <i class=\"hp-input-icon hp-icon-input-captcha\"></i>\n                            <!--<span class=\"hp-btn-half hp-dtm-get hp-disabled\">重新获取</span>-->\n                            <span class=\"hp-err-tips\">动态码错误</span>\n                        </div>\n                        \n                        <button class=\"hp-btn hp-btn-green\" type=\"submit\">完&nbsp;&nbsp;成</button>\n                    </div>\n\n                </div>\n                <!-- div for mail registery end-->\n            </div>\n\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(57);

	var View = __webpack_require__(6),
	    template = __webpack_require__(16),
	    device = __webpack_require__(27),
	    css_hidden = 'hp-hidden';

	View.register('register-success', {
	    template        : __webpack_require__(59),
	    templateInitData: {
	        fillUserInfoUrl: __webpack_require__(28).fillUserInfoUrl
	    },

	    init: function () {
	        var self = this;
	        this.element.find('.hp-btn-continue').click(function () {
	            self.trigger('continue');
	        });

	        if (false) {
	            this.element.find('.hp-btn-continue').text('继续使用');
	        }
	    },

	    update: function (context) {
	        var ele = this.element,
	            txt;

	        switch (context.currentFlow) {
	            case 'login-third':
	                txt = '登录成功';
	                break;
	            case 'register':
	                txt = '恭喜您注册成功！';
	                break;
	            default:
	                txt = '感谢您的配合';
	                break;
	        }

	        ele.find('.hp-thank-word').text(txt);
	        ele.find('.hp-reg-success-username').text(context.username || '');

	        this.trigger('getPushData', ele.find('.hp-filled-content'));
	        this._renderMail(context);
	    },

	    _renderMail: function (context) {
	        var self = this,
	            ele = this.element,
	            emailBtn = ele.find('.hp-btn-tomail');

	        if (context.email) {
	            var email = context.email,
	                host = email.substr(email.indexOf('@')),
	                mailList = __webpack_require__(28).EMAIL_DOMAIN,
	                link = mailList[host] || ('http://www.' + host.substr(1));

	            emailBtn.removeClass(css_hidden).click(function () {
	                self.trigger('emailClick', link);
	            });
	        } else {
	            //hp-btn-success-alone
	            emailBtn.hide();
	            ele.find('.hp-btn-success').addClass('hp-btn-success-alone');
	        }
	    },

	    genPushMarkup: function (data) {
	        var html = '';

	        for (var i = 0; i < data.length; i++) {
	            var it = data[i];
	            switch (it.textType) {
	                case 'qq':
	                    html += '<a href="' + it.link + '" data-bi-type="' + it.textType +'" class="hp-external hp-cf hp-external-ad" target="_blank">' +
	                        '<p class="hp-ex-title">' + it.title + '</p>' +
	                        '<p class="hp-ex-info hp-cf">' +
	                        '<img src="' + it.img + '" alt="' + it.title + '">' +
	                        '<span class="hp-ex-text">' + it.subTitle + '</span>' +
	                        '<span class="hp-ex-btn">一键加群</span>' +
	                        '</p>' +
	                        '</a>';
	                    break;
	                case 'banner':
	                    html += '<a href="' + it.link + '" data-bi-type="' + it.textType +'" class="hp-external hp-cf hp-external-banner" target="_blank">';
	                    html += '<img src="' + it.img + '" alt=""></a>';
	                    break;
	                case 'weixin':
	                    html += '<a href="' + it.link + '"  data-bi-type="' + it.textType +'" class="hp-external hp-cf hp-external-ad" target="_blank">' +
	                        '<p class="hp-ex-title">' + it.title + '</p>' +
	                        '<p class="hp-ex-info hp-cf">' +
	                        '<img src="' + it.img + '" alt="' + it.title + '">' +
	                        '<span class="hp-ex-text">' + it.subTitle + '</span>';
	                    if (device.isPC) {
	                        html += '<span class="hp-ex-text">打开微信，点击底部的“发现”,使用“扫一扫”即可关注。</span>';
	                    } else if (device.isMobile) {
	                        html += '<span class="hp-ex-text">在微信中搜索公众号，即可关注我们~</span>';
	                    } else if (device.isWeixin) {
	                        html += '<span class="hp-ex-text">长按二维码，点击“识别图中二维码”即可关注我们~</span>';
	                    }
	                    html += '</p></a>';
	                    break;
	                case 'adv':
	                default:
	                    html += '<a href="' + it.link + '" data-bi-type="adv" class="hp-external hp-cf hp-external-ad" target="_blank">' +
	                        '<p class="hp-ex-title">' + it.title + '</p>' +
	                        '<p class="hp-ex-info hp-cf">' +
	                        '<img src="' + it.img + '" alt="' + it.title + '">' +
	                        '<span class="hp-ex-text">' + it.subTitle + '</span>' +
	                        '</p>' +
	                        '</a>';
	                    break;
	            }
	        }

	        return html;
	    }
	});

/***/ },
/* 57 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 58 */,
/* 59 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view hp-view-success\">\n    <div class=\"hp-section\">\n        <!-- rebuild -->\n\n        <div class=\"hp-banner\">\n            <div class=\"hp-banner-text\">\n                <span class=\"hp-icon hp-icon-smile\"></span>\n                <span class=\"hp-thank-word\">感谢您的配合</span>\n            </div>\n        </div>\n\n        <!-- <div class=\"hp-info\">\n            <p>为您推荐</p>\n        </div> -->\n        <div class=\"hp-filled-content\"></div>\n\n        <!-- \n            注意：当单个按钮时，添加下面class\n            hp-btn-success-alone \n        -->\n        <div class=\"hp-cf hp-btn-success\">\n            <a href=\"javascript:;\" class=\"hp-fl hp-btn-tomail\">前往邮箱</a>\n            <a href=\"javascript:;\" class=\"hp-fr hp-btn-continue\" data-bi-point=\"register_success_continue\">继续浏览</a>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);

	var View = __webpack_require__(6),
	    Tabs = __webpack_require__(42),
	    BI = __webpack_require__(45),
	    settings = __webpack_require__(2),
	    titles = {
	        '1000': '中小幼',
	        '2000': '外语',
	        '3000': '留学',
	        '4000': '职场兴趣',
	        '5000': '口语',
	        '6000': '考试考证'
	    },
	    getTitleByCateID = function (id) {
	        return titles[id];
	    };

	View.register('interest-select', {
	    template: __webpack_require__(63),

	    init: function () {
	        var self = this,
	            ele = self.element,
	            skipBtn = ele.find('.hp-skip'),
	            backBtn = ele.find('.hp-back');

	        if (settings.client === 'mobile') {
	            ele.delegate('.hp-interest li', 'touchstart', function (event) {
	                $(event.target).addClass('hp-grade-selected');
	            }).delegate('.hp-interest li', 'touchend', function (event) {
	                $(event.target).removeClass('hp-grade-selected');
	            });

	            ele.find('.hp-interest li').tap(function (event) {
	                var id = $(this).attr("data-interest-id");
	                setTimeout(function () {
	                    //ugly implement: avoid to tap through on some weird browsers
	                    //reply: maybe little better for interaction
	                    self.trigger('interestSelect', id);
	                }, 300);
	            });

	        } else {
	            ele.delegate('.hp-interest li', 'click', function (e) {
	                var id = $(e.currentTarget).attr('data-interest-id');
	                self.trigger('interestSelect', id);
	            });
	        }

	        skipBtn.bind('click', function (event) {
	            self.trigger('skip');
	        });

	        backBtn.bind('click', function (event) {
	            self.trigger('previous');
	        });
	    },

	    _switchCategory: function (id) {
	        var cates = this.element.find('.hp-block');
	        cates.hide();
	        cates.filter('[data-category=' + id + ']').show();
	    },

	    // called before it been shown.
	    update: function (cateID, isHidePrev) {
	        cateID = cateID || 1000;
	        this.element.find('.hp-cate-title')
	            .text(getTitleByCateID(cateID));
	        this._switchCategory(cateID);

	        if (isHidePrev) {
	            this.element.find('.hp-back').hide();
	        }

	    }
	});

/***/ },
/* 61 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 62 */,
/* 63 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n    <section class=\"hp-section\">\n\n        <div class=\"hp-head hp-head-interest\">\n            <div class=\"hp-title hp-cf\">\n                <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n                <span class=\"hp-h3\"><span class=\"hp-cate-title\">读取分类</span><span class=\"hp-gray\">(单选)</span></span>\n            </div>\n        </div>\n\n        <div class=\"hp-body\">\n\n            <div class=\"hp-block hp-interest-k12\" data-category=\"1000\">\n\n\n                <div class=\"hp-info hp-info-interest\">\n                    <p>孩子正在哪个阶段？</p>\n                </div>\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">学龄前</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"1001\"><span>0-2岁</span></li>\n                        <li data-interest-id=\"1002\"><span>3-4岁</span></li>\n                        <li data-interest-id=\"1003\"><span>5-6岁</span></li>\n                    </ul>\n                </div>\n\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">小学</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"1010\"><span>一年级</span></li>\n                        <li data-interest-id=\"1011\"><span>二年级</span></li>\n                        <li data-interest-id=\"1012\"><span>三年级</span></li>\n\n                        <li data-interest-id=\"1013\"><span>四年级</span></li>\n                        <li data-interest-id=\"1014\"><span>五年级</span></li>\n                        <li data-interest-id=\"1015\"><span>六年级</span></li>\n                    </ul>\n                </div>\n\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">中学</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"1020\"><span>初一</span></li>\n                        <li data-interest-id=\"1021\"><span>初二</span></li>\n                        <li data-interest-id=\"1022\"><span>初三</span></li>\n                        <li data-interest-id=\"1030\"><span>高一</span></li>\n                        <li data-interest-id=\"1031\"><span>高二</span></li>\n                        <li data-interest-id=\"1032\"><span>高三</span></li>\n                    </ul>\n                </div>\n\n            </div>\n\n            <div class=\"hp-block hp-interest-lang\" data-category=\"5000\">\n                <div class=\"hp-info hp-info-interest\">\n                    <p>想修炼哪门技能？</p>\n                </div>\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">英语</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"5001\"><span>基础发音</span></li>\n                        <li data-interest-id=\"5002\"><span>生活口语</span></li>\n                        <li data-interest-id=\"5003\"><span>职场口语</span></li>\n                    </ul>\n                </div>\n\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">日语</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"5010\"><span>基础发音</span></li>\n                        <li data-interest-id=\"5011\"><span>生活口语</span></li>\n                        <li data-interest-id=\"5012\"><span>职场口语</span></li>\n                    </ul>\n                </div>\n\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">韩语</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"5020\"><span>基础发音</span></li>\n                        <li data-interest-id=\"5021\"><span>生活口语</span></li>\n                        <li data-interest-id=\"5022\"><span>职场口语</span></li>\n                    </ul>\n                </div>\n\n            </div>\n\n            <div class=\"hp-block hp-interest-abroad\" data-category=\"3000\">\n\n                <div class=\"hp-info hp-info-interest\">\n                    <p>要参加哪门考试？</p>\n                </div>\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\"></span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"3001\"><span>雅思</span></li>\n                        <li data-interest-id=\"3002\"><span>托福</span></li>\n                        <li data-interest-id=\"3003\"><span>SAT</span></li>\n\n                        <li data-interest-id=\"3004\"><span>GRE</span></li>\n                        <li data-interest-id=\"3005\"><span>GMAT</span></li>\n                    </ul>\n                </div>\n\n            </div>\n\n            <div class=\"hp-block hp-interest-career\" data-category=\"2000\">\n\n                <div class=\"hp-info hp-info-interest\">\n                    <p>想学习哪门外语？</p>\n                </div>\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">英语</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"2001\"><span>零基础</span></li>\n                        <li data-interest-id=\"2007\"><span>备考</span></li>\n\n                        <li data-interest-id=\"2008\"><span>美剧英乐</span></li>\n                        <li data-interest-id=\"2006\"><span>商务英语</span></li>\n                    </ul>\n                </div>\n\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">日语</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"2017\"><span>零基础</span></li>\n                        <li data-interest-id=\"2018\"><span>备考</span></li>\n\n                        <li data-interest-id=\"2019\"><span>日剧动漫</span></li>\n                        <li data-interest-id=\"2020\"><span>实用日语</span></li>\n                    </ul>\n                </div>\n\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">其他</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"2036\"><span>韩语</span></li>\n                        <li data-interest-id=\"2031\"><span>法语</span></li>\n\n                        <li data-interest-id=\"2032\"><span>德语</span></li>\n                        <li data-interest-id=\"2033\"><span>西语</span></li>\n                    </ul>\n                </div>\n            </div>\n\n            <div class=\"hp-block hp-interest-oral\" data-category=\"6000\">\n\n\n                <div class=\"hp-info hp-info-interest\">\n                    <p>要参加哪门考试？</p>\n                </div>\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">考试考证</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"6005\"><span>四六级</span></li>\n                        <li data-interest-id=\"6006\"><span>商英</span></li>\n                        <li data-interest-id=\"6017\"><span>中高口</span></li>\n                        <li data-interest-id=\"6007\"><span>能力考</span></li>\n                        <li data-interest-id=\"6008\"><span>Topik</span></li>\n                        <li data-interest-id=\"6014\"><span>DELE</span></li>\n                        <li data-interest-id=\"6015\"><span>德福</span></li>\n                        <li data-interest-id=\"6013\"><span>TEF/TCF</span></li>\n                        <li data-interest-id=\"6018\"><span>考研</span></li>\n                        <li data-interest-id=\"6019\"><span>财会</span></li>\n                        <li data-interest-id=\"6009\"><span>职称</span></li>\n                        <li data-interest-id=\"6016\"><span>公务员</span></li>\n                    </ul>\n                </div>\n\n            </div>\n\n            <div class=\"hp-block hp-interest-exam\" data-category=\"4000\">\n\n\n                <div class=\"hp-info hp-info-interest\">\n                    <p>对什么感兴趣？</p>\n                </div>\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">职场提升</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"4012\"><span>求职面试</span></li>\n                        <li data-interest-id=\"4005\"><span>办公软件</span></li>\n                        <li data-interest-id=\"4013\"><span>行业技能</span></li>\n                        <li data-interest-id=\"4014\"><span>管理方法</span></li>\n                    </ul>\n                </div>\n\n                <div class=\"hp-interest\">\n                    <span class=\"hp-name\">美好生活</span>\n                    <ul class=\"hp-cf\">\n                        <li data-interest-id=\"4016\"><span>育儿</span></li>\n                        <li data-interest-id=\"4017\"><span>理财</span></li>\n                        <li data-interest-id=\"4006\"><span>读书</span></li>\n                        <li data-interest-id=\"4007\"><span>摄影</span></li>\n                        <li data-interest-id=\"4018\"><span>旅游</span></li>\n                        <li data-interest-id=\"4009\"><span>绘画</span></li>\n                        <li data-interest-id=\"4003\"><span>美妆瘦身</span></li>\n                        <li data-interest-id=\"4015\"><span>影视音乐</span></li>\n                    </ul>\n                </div>\n\n            </div>\n\n        </div>\n\n        <div class=\"hp-foot hp-cf\">\n            <div class=\"hp-fr\">\n                <a href=\"javascript:;\" class=\"hp-gray-lighter hp-skip\">跳过</a>\n            </div>\n        </div>\n\n    </section>\n</div>";

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);

	var View = __webpack_require__(6),
	    settings = __webpack_require__(2);

	View.register('category-select', {
	    template: __webpack_require__(69),
	    
	    init: function () {
	        var self = this;

	        this.element.on('click', '.hp-login', function (e) {
	            self.trigger('login');
	            e.preventDefault();

	        }).on('click', '.hp-category a', function (e) {
	            self.trigger('selectCategory',
	                $(e.currentTarget).attr('data-category-id'));
	            e.preventDefault();

	        }).on('click', '.hp-back', function () {
	            self.trigger('previous');
	        }).find('.hp-skip').click(function (event) {
	            self.trigger('skip');
	        });

	        if(settings.client === 'pc') {
	            this.element.find('.hp-back').hide();
	        }
	    },

	    update: function (isAfterLogin) {
	        if (isAfterLogin) {
	            this.element.find('.hp-fl').hide();
	            this.element.find('.hp-banner-title').text('沪江小调查');
	            this.element.find('.hp-banner-info').text('指尖轻触，只为贴心服务');
	        }
	    }
	});

/***/ },
/* 65 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n    <div class=\"hp-head hp-head-category-select\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            <span class=\"hp-h3\">兴趣选择</span>\n        </div>\n    </div>\n\n    <div class=\"hp-section\">\n\n        <!-- rebuild -->\n        <div class=\"hp-banner hp-banner-slogan\">\n\n        </div>\n\n        <div class=\"hp-info hp-info-category\">\n            <span class=\"hp-icon hp-icon-arrow-down\"></span>\n\n            <p>告诉我您最感兴趣的内容</p>\n        </div>\n\n        <div class=\"hp-category\">\n            <ul class=\"hp-cf\">\n                <li>\n                    <a href=\"#\" class=\"hp-cate-blue2\" data-category-id=\"5000\">\n                        <span class=\"hp-icon hp-icon-oral\"></span>\n                        <span class=\"hp-name\">口语</span>\n                    </a>\n                </li>\n                <li>\n                    <a href=\"#\" class=\"hp-cate-red\" data-category-id=\"3000\">\n                        <span class=\"hp-icon hp-icon-liuxue\"></span>\n                        <span class=\"hp-name\">留学</span>\n                    </a>\n                </li>\n                <li>\n                    <a href=\"#\" class=\"hp-cate-yellow\" data-category-id=\"1000\">\n                        <span class=\"hp-icon hp-icon-k12\"></span>\n                        <span class=\"hp-name\">中小幼</span>\n                    </a>\n                </li>\n                <li>\n                    <a href=\"#\" class=\"hp-cate-green3\" data-category-id=\"2000\">\n                        <span class=\"hp-icon hp-icon-cate\"></span>\n                        <span class=\"hp-name\">外语学习</span>\n                    </a>\n                </li>\n                <li>\n                    <a href=\"#\" class=\"hp-cate-green3\" data-category-id=\"6000\">\n                        <span class=\"hp-icon hp-icon-exam\"></span>\n                        <span class=\"hp-name\">考试考证</span>\n                    </a>\n                </li>\n                <li>\n                    <a href=\"#\" class=\"hp-cate-green3\" data-category-id=\"4000\">\n                        <span class=\"hp-icon hp-icon-interest\"></span>\n                        <span class=\"hp-name\">职场兴趣</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n\n        <div class=\"hp-foot hp-cf\">\n            <div class=\"hp-fl\">\n                已有帐号\n                <a href=\"javascript:;\" class=\"hp-green hp-login\">立即登录</a>\n            </div>\n            <div class=\"hp-fr\">\n                <a href=\"javascript:;\" class=\"hp-gray-lighter hp-skip\">跳过</a>\n            </div>\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71);

	var View = __webpack_require__(6),
	    formMixin = __webpack_require__(73),
	    captchaMixin = __webpack_require__(30),
	    css_disabled = 'hp-disabled',
	    css_hidden = 'hp-hide';

	View.register('login-third', [formMixin, captchaMixin], {
	    // called after it been rendered.
	    template: __webpack_require__(74),

	    init: function () {
	        var self = this,
	            ele = self.element;

	        self.toggleAccount('no');

	        ele.hpvalidator({
	            events    : 'focusin',
	            validClass: ''
	        });

	        ele.on('click', '.hp-btn-register', function (event) {
	            self.trigger('accountBind');
	        }).on('click', '.hp-btn-no-account', function (event) {
	            self.toggleAccount('no');
	        }).on('click', '.hp-btn-has-account', function (event) {
	            self.toggleAccount('has');
	        });
	    },

	    toggleAccount: function (action) {
	        var nobtn = this.element.find('.hp-btn-no-account'),
	            hasbtn = this.element.find('.hp-btn-has-account');

	        if (action === 'no') {
	            nobtn.addClass('active');
	            hasbtn.removeClass('active');
	            this.element.find('.hp-register-action').show();
	            this.element.find('.hp-bind-action').hide();
	        } else {
	            hasbtn.addClass('active');
	            nobtn.removeClass('active');
	            this.element.find('.hp-register-action').hide();
	            this.element.find('.hp-bind-action').show();
	        }
	    },

	    getFields: function () {
	        var ele = this.element;
	        return {
	            userName: ele.find('.hp-username').val(),
	            password: ele.find('.hp-password').val(),
	            imgcode : ele.find('.hp-captcha').val()
	        }
	    },

	    update: function (headimg, nick, platform) {
	        var el = this.element,
	            pf = '';

	        if (nick) {
	            el.find('.hp-user-name').text(nick);
	        }
	        if (headimg) {
	            el.find('.hp-user-avatar').attr('src', headimg);
	        }

	        if(!platform) return;

	        if (platform === 'weixin' || platform === 'wechat') {
	            this.submitBtn.text('绑定微信');
	            pf = '微信';
	        } else if (platform === 'qq') {
	            this.submitBtn.text('绑定');
	            pf = 'QQ';
	        } else {
	            this.submitBtn.text('绑定');
	            pf = '微博';
	        }

	        el.find('.hp-platform').text(pf);
	    }
	});

/***/ },
/* 71 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 72 */,
/* 73 */
/***/ function(module, exports) {

	var css_disabled = 'hp-disabled',
	    css_hidden = 'hp-hide';

	module.exports = {

	    _initPartial: function () {
	        var self = this, ele;

	        ele = self.element;
	        ele.find('input').hpinput();

	        ele.on('click', '.hp-back', function (event) {
	            self.trigger('previous');
	        }).on('keyup', 'input', function (event) {
	            if (event.keyCode === 13)
	                self.handleSubmit();
	        });
	        
	        this.submitBtn = ele.find('.hp-submit-btn').click(function () {
	            self.handleSubmit();
	        });
	    },


	    //get submited fields.
	    getFields: function () {
	        return {};
	    },

	    handleSubmit: function () {
	        var self = this,
	            ele = self.element;

	        if (this.submitBtn.hasClass(css_disabled) || !ele.hpvalidator('valid')) return;

	        self.trigger('submit', self.getFields());
	    },

	    disableSubmit: function (disabled) {
	        this.submitBtn[disabled ? 'addClass' : 'removeClass'](css_disabled);
	    },

	    update: function () {
	        this.element.find('input:visible').first().focus();
	        this._updateForm();
	    },

	    reset: function () {
	        this.element.find('input').val('');
	    },

	    _updateForm: function () {
	    }
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n    <div class=\"hp-section\">\n\n        <div class=\"hp-head hp-head-interest\">\n            <div class=\"hp-title hp-cf\">\n                <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n                <span class=\"hp-h3\">注册沪江帐户</span>\n            </div>\n        </div>\n        <div class=\"login-third-container\">\n            <div class=\"hp-login-third\">\n\n                <div class=\"hp-user\">\n                    <img class=\"hp-user-avatar\" alt=\"头像\" src=\"//i2.hjfile.cn/f96/92/85/34819285.jpg\"/>\n\n                    <div class=\"hp-user-name\">第三方登录后的用户名</div>\n                </div>\n\n                <div class=\"hp-btns\">\n                    <button class=\"hp-btn hp-btn-no-account\">无沪江帐号</button>\n                    <button class=\"hp-btn hp-btn-has-account \">有沪江帐号</button>\n                </div>\n\n                <div class=\"hp-btn-actions\">\n\n                    <div class=\"hp-register-action hp-hide\">\n                        <button class=\"hp-btn hp-btn-green hp-btn-register \">注&nbsp;册</button>\n                        <p class=\"hp-login-tip hp-desktop\">*点击注册按钮，自动生成一个同名沪江帐号并绑定<span class=\"hp-platform\">微信</span>号。今后可以通过<span\n                                class=\"hp-platform\">微信</span>直接登录。</p>\n                        <p class=\"hp-login-tip hp-mobile\">*点击注册按钮，自动生成一个同名沪江帐号并绑定<span class=\"hp-platform\">微信</span>号。今后可以通过<span\n                                class=\"hp-platform\">微信</span>直接登录。</p>\n                    </div>\n\n                    <div class=\"hp-bind-action hp-hide\">\n                        <div class=\"hp-input hp-input-username\">\n                            <input type=\"text\" class=\"hp-username\" name=\"username\" autocomplete=\"off\" autocapitalize=\"off\" autocorrect=\"off\"  data-enable-clean=\"true\" data-rule-required=\"true\"\n                                placeholder=\"填写已有沪江帐号\"/>\n                            <i class=\"hp-input-icon hp-icon-input-username\"></i>\n                            <span class=\"hp-err-tips\"></span>\n                            <span class=\"hp-flag\"></span>\n                        </div>\n                        <div class=\"hp-input\">\n                            <input type=\"password\" class=\"hp-password\" name=\"password\" data-rule-required=\"true\"\n                                   maxlength=\"20\" placeholder=\"密码\"/>\n                            <i class=\"hp-input-icon hp-icon-input-password\"></i>\n                            <span class=\"hp-err-tips\">密码错误提示</span>\n                        </div>\n                        <div class=\"hp-input hp-input-half hp-input-captcha hp-hide\">\n    <input class=\"hp-captcha\" disabled=\"disabled\" type=\"text\" maxlength=\"8\" name=\"captcha\" data-rule-captcha=\"true\"\n           data-rule-required=\"true\" placeholder=\"验证码\"/>\n    <span class=\"hp-btn-half hp-captcha-pic\"></span>\n    <i class=\"hp-input-icon hp-icon-input-captcha\"></i>  \n    <span class=\"hp-err-tips\"></span>\n</div>\n\n                        <!-- 将下面两行中的 ”微信“ 换成对应的第三方平台的名称 -->\n                        <button class=\"hp-btn hp-btn-green hp-btn-bind hp-submit-btn \">绑定</button>\n                        <p class=\"hp-login-tip hp-desktop\">* 将沪江帐号与<span class=\"hp-platform\">微信</span>绑定</p>\n                        <p class=\"hp-login-tip hp-mobile\">* 将沪江帐号与<span class=\"hp-platform\">微信</span>绑定</p>\n                    </div>\n\n                </div>\n\n            </div>\n        </div>\n\n    </div>\n</div>\n";

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by dailiang@hujiang.com on 15/7/6.
	 */
	__webpack_require__(76);

	var View = __webpack_require__(6),
	    template = __webpack_require__(16),
	    device = __webpack_require__(27),
	    css_hidden = 'hp-hidden';

	View.register('login-third-success', {
	    template: __webpack_require__(78),

	    init: function () {
	        var self = this;
	        this.element.find('.hp-btn-continue').click(function () {
	            self.trigger('continue');
	        });

	        if (false) {
	            this.element.find('.hp-btn-continue').text('继续使用');
	        }
	    },

	    update: function (context) {
	    }
	});

/***/ },
/* 76 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 77 */,
/* 78 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view hp-register-success\">\n    <div class=\"hp-section\">\n\n        <div class=\"hp-success\">\n            <div class=\"hp-success-text\">\n                <span class=\"hp-icon hp-icon-success\"></span>\n                <span class=\"hp-thank-word\">登录成功</span>\n            </div>\n        </div>\n\n\n        <div class=\"qrcode\">\n            <p class=\"qrcode-text\">关注公众号“沪江”（ hujiang4u ）管理帐号信息并享受优质学习服务</p>\n\n            <img class=\"qrcode-img\" src=\"//res.hjfile.cn/co/pass/images/wechat.png\" />\n        </div>\n\n\n        <button class=\"hp-btn hp-btn-green hp-btn-auto hp-btn-continue\">继续浏览</button>\n    </div>\n</div>\n";

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);

	var View = __webpack_require__(6),
	    thirdMixin = __webpack_require__(29);

	View.register('resetpwd-choose', [thirdMixin], {

	    template: __webpack_require__(82),
	    
	    init: function () {
	        var self = this,
	            ele = self.element;

	        ele.on('click', '.hp-sms', function (event) {
	            self.trigger('smsSelect');
	        }).on('click', '.hp-email', function (event) {
	            self.trigger('emailSelect');
	        }).on('click', '.hp-back', function (event) {
	            self.trigger('previous');
	        });
	    }

	});

/***/ },
/* 80 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 81 */,
/* 82 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n\n    <div class=\"hp-head\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            <span class=\"hp-h3\">选择密码重置方式</span>\n        </div>\n    </div>\n\n    <div class=\"hp-section\">\n\n        <div class=\"hp-reset-choose\">\n            <div class=\"hp-list hp-cf\">\n                <a class=\"hp-sms\" href=\"javascript:void(0)\">\n                    <p>\n                        <span class=\"hp-icon hp-icon-sms\"></span>\n                    </p>\n                    <span class=\"hp-name\">短信</span>\n                </a>\n                <a class=\"hp-email\" href=\"javascript:void(0)\">\n                    <p>\n                        <span class=\"hp-icon hp-icon-email\"></span>\n                    </p>\n                    <span class=\"hp-name\">邮箱</span>\n                </a>\n            </div>\n        </div>\n        <div class=\"hp-third-login\">\n    \n    \n    \n    \n\n    <div class=\"hp-list hp-cf\">\n        <a class=\"hp-wechat\" target=\"_blank\">\n            <p><span class=\"hp-icon hp-icon-weixin\"></span></p>\n            <span class=\"hp-name\">微信</span>\n        </a>\n        <a class=\"hp-qq\" target=\"_blank\">\n           <p><span class=\"hp-icon hp-icon-qq\"></span></p>\n            <span class=\"hp-name\">QQ</span>\n        </a>\n        <a class=\"hp-weibo\" target=\"_blank\">\n            <p><span class=\"hp-icon hp-icon-weibo\"></span></p>\n            <span class=\"hp-name\">微博</span>\n        </a>\n    </div>\n</div>\n    </div>\n</div>\n";

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84);

	var View = __webpack_require__(6),
	    formMixin = __webpack_require__(73),
	    captchaMixin = __webpack_require__(30),
	    smsMixin = __webpack_require__(86);

	View.register('resetpwd-sms', [formMixin, captchaMixin, smsMixin], {

	    template: __webpack_require__(87),

	    init: function () {
	        var self = this,
	            ele = self.element,
	            mobileAsync = function (data) {
	                var validator = this,
	                    val = $(data.element).val();
	                if (data.validated === true) {
	                    self.trigger('checkNotExist', 'mobile', val, function (v, message) {
	                        if (v) {
	                            self._toggleDtm(true);
	                            validator.showValid('mobile', true);
	                        } else {
	                            self._toggleDtm(false);
	                            validator.showError('mobile', message, true);
	                        }
	                    });
	                } else {
	                    self._toggleDtm(false);
	                }
	            };

	        self.currentTab = self.element; //back-compat for register, currentTab is for mobile sms validation

	        ele.hpvalidator({
	            fields: {
	                'mobile': {
	                    validated: mobileAsync
	                }
	            }
	        });
	    },

	    getFields: function () {
	        var ele = this.element;
	        return {
	            mobile : ele.find('[name=mobile]').val(),
	            msgcode: ele.find('[name=sms]').val()
	        }
	    }
	});

/***/ },
/* 84 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 85 */,
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var captcha = __webpack_require__(26),
	    css_disabled = 'hp-disabled';

	module.exports = {

	    _initPartial: function () {
	        var self = this;

	        this.element.on('click', '.hp-dtm-get', function () {
	            var $this = $(this);
	            if ($this.hasClass(css_disabled)) return;

	            //add validation on send sms
	            var captchaInput = self.currentTab.find('input.hp-captcha');
	            if(captchaInput.length && captchaInput.is(':visible')) {
	                var valid = self.currentTab.hpvalidator("checkElement",captchaInput);
	                if(!valid) return;
	            }

	            $this.addClass(css_disabled);
	            self._initDtmInterval($(this));
	            captcha.update();
	            self.trigger('getMessageCode', {
	                mobile  : self.currentTab.find('.hp-mobileno').val(),
	                imgcode : self.currentTab.find('.hp-captcha').val()
	            });
	        });
	    },

	    _toggleDtm: function (enable) {
	        if (enable && this.interval) return;
	        this.element.find('.hp-dtm-get')[enable ? 'removeClass' : 'addClass'](css_disabled);
	    },

	    _initDtmInterval: function (ele) {
	        var self = this,
	            total = 60;

	        if (self.interval) {
	            window.clearInterval(self.interval);
	        }

	        self.interval = setInterval(function () {
	            ele.text('重新获取(' + total.toString() + 's)');
	            if (total <= 0) {
	                ele.text('获取动态码').removeClass(css_disabled);
	                self._renderCaptcha();
	                clearInterval(self.interval);
	                self.interval = null;
	            }
	            total--;
	        }, 1000);

	    },

	    _updateTimer: function () {
	        if (this.interval) {
	            window.clearInterval(this.interval);
	            this.interval = null;

	            this.element.find('.hp-dtm-get')
	                .text('获取动态码')
	                .removeClass(css_disabled);
	        }
	    }

	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n\n    <div class=\"hp-head\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            <span class=\"hp-h3\">短信重置密码</span>\n        </div>\n    </div>\n\n    <div class=\"hp-section\">\n        <div class=\"hp-section-pb\">\n            <div class=\"hp-input\">\n    <input class=\"hp-mobileno\" name=\"mobile\" data-enable-clean=\"true\" data-rule-cellphone=\"true\"\n           data-rule-required=\"true\" type=\"tel\" maxlength=\"11\" placeholder=\"填写手机号\"/>\n    <i class=\"hp-input-icon hp-icon-input-mobile\"></i>  \n    <span class=\"hp-err-tips\"></span>\n    <span class=\"hp-flag\"></span>\n</div>\n\n            <div class=\"hp-input hp-input-half hp-input-captcha hp-hide\">\n    <input class=\"hp-captcha\" disabled=\"disabled\" type=\"text\" maxlength=\"8\" name=\"captcha\" data-rule-captcha=\"true\"\n           data-rule-required=\"true\" placeholder=\"验证码\"/>\n    <span class=\"hp-btn-half hp-captcha-pic\"></span>\n    <i class=\"hp-input-icon hp-icon-input-captcha\"></i>  \n    <span class=\"hp-err-tips\"></span>\n</div>\n\n            <div class=\"hp-input hp-input-half hp-input-dtm\">\n    <input class=\"hp-dtm\" type=\"text\" maxlength=\"8\" name=\"sms\" data-rule-required=\"true\" data-rule-sms=\"true\"\n           placeholder=\"短信动态码\"/>\n    <i class=\"hp-input-icon hp-icon-input-captcha\"></i>\n    <span class=\"hp-btn-half hp-dtm-get hp-disabled\">获取动态码</span>\n    <span class=\"hp-err-tips\">动态码错误</span>\n</div>\n\n            <button class=\"hp-btn hp-btn-green hp-submit-btn\">下一步</button>\n\n            <div class=\"hp-info-tip\">\n    选择问题？请 <a href=\"http://kefu.hujiang.com/feedback/\" target=\"_blank\" data-external-link=\"true\"\n              data-bi-point=\"resetpwd_msg\" class=\"hp-green\">留言</a>，或者进行 <a href=\"http://kefu.hujiang.com/shensu/\"\n                                                                           data-external-link=\"true\" target=\"_blank\"\n                                                                           class=\"hp-green\"\n                                                                           data-bi-point=\"resetpwd_complain\">帐号申诉</a>\n</div>\n        </div>\n\n    </div>\n\n</div>\n";

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(89);

	var View = __webpack_require__(6),
	    formMixin = __webpack_require__(73),
	    captchaMixin = __webpack_require__(30);

	View.register('resetpwd-email', [formMixin, captchaMixin], {

	    template: __webpack_require__(91),

	    init: function () {
	        var self = this,
	            ele = self.element;

	        var checkAsync = function (field, data) {
	                if (data.validated === false) return;
	                var validator = this;

	                self.trigger('checkNotExist', field, $(data.element).val(), function (isvalidated, message) {
	                    if (!isvalidated) {
	                        validator.showError(field, message, true);
	                    } else {
	                        validator.showValid(field);
	                    }
	                });
	            },
	            emailConfig = {
	                events   : 'focusin,focusout',
	                validated: function (data) {
	                    checkAsync.call(this, 'email', data);
	                }
	            };

	        ele.hpvalidator({
	            fields: {
	                'email': emailConfig
	            }
	        });
	    },

	    getFields: function () {
	        var ele = this.element;
	        return {
	            email  : ele.find('[name=email]').val(),
	            imgcode: ele.find('[name=captcha]').val()
	        }
	    },

	    _updateForm: function () {
	        this._updateCaptcha();
	        this._showCaptcha(true);
	    }
	});

/***/ },
/* 89 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 90 */,
/* 91 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n\n    <div class=\"hp-head\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            <span class=\"hp-h3\">邮箱重置密码</span>\n        </div>\n    </div>\n\n    <div class=\"hp-section\">\n        <div class=\"hp-section-pb\">\n            <div class=\"hp-input\">\n    <input class=\"hp-email\" name=\"email\" data-enable-clean=\"true\" data-rule-required=\"true\" data-rule-email=\"true\"\n           type=\"email\" maxlength=\"35\" placeholder=\"邮箱\"/>\n    <i class=\"hp-input-icon hp-icon-input-email\"></i>  \n    <span class=\"hp-err-tips\"></span>\n    <span class=\"hp-flag\"></span>\n</div>\n\n            <div class=\"hp-input hp-input-half hp-input-captcha hp-hide\">\n    <input class=\"hp-captcha\" disabled=\"disabled\" type=\"text\" maxlength=\"8\" name=\"captcha\" data-rule-captcha=\"true\"\n           data-rule-required=\"true\" placeholder=\"验证码\"/>\n    <span class=\"hp-btn-half hp-captcha-pic\"></span>\n    <i class=\"hp-input-icon hp-icon-input-captcha\"></i>  \n    <span class=\"hp-err-tips\"></span>\n</div>\n\n            <button class=\"hp-btn hp-btn-green hp-submit-btn\">下一步</button>\n\n            <div class=\"hp-info-tip\">\n    选择问题？请 <a href=\"http://kefu.hujiang.com/feedback/\" target=\"_blank\" data-external-link=\"true\"\n              data-bi-point=\"resetpwd_msg\" class=\"hp-green\">留言</a>，或者进行 <a href=\"http://kefu.hujiang.com/shensu/\"\n                                                                           data-external-link=\"true\" target=\"_blank\"\n                                                                           class=\"hp-green\"\n                                                                           data-bi-point=\"resetpwd_complain\">帐号申诉</a>\n</div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);

	var View = __webpack_require__(6),
	    css_hidden = 'hp-hide';

	View.register('resetpwd-email-validate', {

	    template: __webpack_require__(95),

	    init: function () {
	        var self = this;
	        
	        this.element.on('click', '.hp-back', function () {
	            self.trigger('previous');
	        });
	    },

	    update: function (context) {
	        var self = this,
	            emailBtn = this.element.find('.hp-btn-mailbox'),
	            email = context.email,
	            host = email.substr(email.indexOf('@')),
	            mailList = __webpack_require__(28).EMAIL_DOMAIN,
	            link = mailList[host] || ('http://www.' + host.substr(1));

	        this.element.find('.hp-mail-addr').text(email);
	        emailBtn.removeClass(css_hidden).click(function () {
	            self.trigger('emailClick', link);
	        });
	    }
	});

/***/ },
/* 93 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 94 */,
/* 95 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n\n    <div class=\"hp-head\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            <span class=\"hp-h3\">邮箱重置密码</span>\n        </div>\n    </div>\n\n    <div class=\"hp-section hp-reset-email-validate\">\n        <div class=\"hp-section-pb\">\n            <div class=\"hp-ps\">\n                <p class=\"hp-p1\">确认邮件已发往邮箱</p>\n\n                <p class=\"hp-p2 hp-mail-addr\"></p>\n            </div>\n\n            <button class=\"hp-btn hp-btn-green hp-btn-mailbox\">前往邮箱确认</button>\n\n            <div class=\"hp-info-tip\">\n    选择问题？请 <a href=\"http://kefu.hujiang.com/feedback/\" target=\"_blank\" data-external-link=\"true\"\n              data-bi-point=\"resetpwd_msg\" class=\"hp-green\">留言</a>，或者进行 <a href=\"http://kefu.hujiang.com/shensu/\"\n                                                                           data-external-link=\"true\" target=\"_blank\"\n                                                                           class=\"hp-green\"\n                                                                           data-bi-point=\"resetpwd_complain\">帐号申诉</a>\n</div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(97);

	var View = __webpack_require__(6),
	    formMixin = __webpack_require__(73);

	View.register('resetpwd-reset', [formMixin], {

	    template: __webpack_require__(99),

	    init: function () {
	        var self = this,
	            ele = self.element;

	        ele.find('[name=password]').hpstrength();

	        ele.hpvalidator({
	            rules   : {
	                'password_nocheck': {
	                    equal: self.element.find('[name=password]')
	                }
	            },
	            messages: {
	                'password_nocheck': {equal: '两次密码输入不一致'}
	            }
	        });
	    },

	    getFields: function () {
	        var ele = this.element;
	        return {
	            password: this.element.find('.hp-password').val()
	        }
	    },

	    update: function (hash) {
	        var name = hash && hash.username;
	        this.element.find('.hp-username').text(name);
	    }
	});

/***/ },
/* 97 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 98 */,
/* 99 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n\n    <div class=\"hp-head\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            <span class=\"hp-h3\">密码重置</span>\n        </div>\n    </div>\n\n    <div class=\"hp-section\">\n        <div class=\"hp-section-pb\">\n            <div class=\"hp-input\">\n                <div class=\"hp-p\">\n                    用户名：<span class=\"hp-username\"></span>\n                </div>\n            </div>\n\n            <div class=\"hp-input hp-input-password\">\n    <input class=\"hp-password\" type=\"password\" name=\"password\" maxlength=\"20\" data-rule-password-length=\"true\"\n           data-rule-password=\"true\" data-rule-required=\"true\" maxlength=\"35\" placeholder=\"设置密码（8-20位字符）\"/>\n    \n    <i class=\"hp-input-icon hp-icon-input-password\"></i>  \n    \n    <p class=\"hp-pass-bars hp-cf\">\n        <span class=\"hp-pass-bar hp-pass-bar1\"></span>\n        <span class=\"hp-pass-bar hp-pass-bar2\"></span>\n        <span class=\"hp-pass-bar hp-pass-bar3\"></span>\n    </p>\n    <span class=\"hp-err-tips\"></span>\n    <span class=\"hp-flag\"></span>\n</div>\n\n            <div class=\"hp-input hp-input-password\">\n    <input type=\"password\" class=\"hp-password\" name=\"password_nocheck\" data-rule-required=\"true\" maxlength=\"20\"\n           placeholder=\"确认密码\"/>\n    <i class=\"hp-input-icon hp-icon-input-password\"></i>\n    \n    <span class=\"hp-err-tips\"></span>\n    <span class=\"hp-flag\"></span>\n</div>\n\n            <button class=\"hp-btn hp-btn-green hp-submit-btn\">下一步</button>\n\n            <div class=\"hp-info-tip\">\n    选择问题？请 <a href=\"http://kefu.hujiang.com/feedback/\" target=\"_blank\" data-external-link=\"true\"\n              data-bi-point=\"resetpwd_msg\" class=\"hp-green\">留言</a>，或者进行 <a href=\"http://kefu.hujiang.com/shensu/\"\n                                                                           data-external-link=\"true\" target=\"_blank\"\n                                                                           class=\"hp-green\"\n                                                                           data-bi-point=\"resetpwd_complain\">帐号申诉</a>\n</div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(101);

	var View = __webpack_require__(6);

	View.register('resetpwd-success', {

	    template: __webpack_require__(103),

	    init: function () {

	        var self = this;
	        //hp-btn
	        this.element.on('click', '.hp-btn', function () {
	            self.trigger('toLogin');
	        }).on('click', '.hp-back', function () {
	            self.trigger('previous');
	        });
	    }
	});

/***/ },
/* 101 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 102 */,
/* 103 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n\n    <div class=\"hp-head\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            <span class=\"hp-h3\">密码重置成功</span>\n        </div>\n    </div>\n\n    <div class=\"hp-section hp-reset-success\">\n        <div class=\"hp-section-pb\">\n\n            <p class=\"hp-p\">\n                <span class=\"hp-icon hp-icon-smile-green\"></span><br>\n                请妥善保存您的密码\n            </p>\n\n            <button class=\"hp-btn hp-btn-green\">立即登录</button>\n\n            <div class=\"hp-info-tip\">\n    选择问题？请 <a href=\"http://kefu.hujiang.com/feedback/\" target=\"_blank\" data-external-link=\"true\"\n              data-bi-point=\"resetpwd_msg\" class=\"hp-green\">留言</a>，或者进行 <a href=\"http://kefu.hujiang.com/shensu/\"\n                                                                           data-external-link=\"true\" target=\"_blank\"\n                                                                           class=\"hp-green\"\n                                                                           data-bi-point=\"resetpwd_complain\">帐号申诉</a>\n</div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(105);

	var View = __webpack_require__(6);

	View.register('resetpwd-fail', {

	    template: __webpack_require__(107),

	    init: function () {
	        var self = this;
	        this.element.on('click', '.hp-btn', function () {
	            self.trigger('previous');
	        }).on('click', '.hp-back', function () {
	            self.trigger('previous');
	        });
	    }
	});

/***/ },
/* 105 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 106 */,
/* 107 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n\n    <div class=\"hp-head\">\n        <div class=\"hp-title hp-cf\">\n            <div class=\"hp-left hp-back\">\n    <span class=\"hp-icon hp-icon-arrow-left\"></span>\n</div>\n            <span class=\"hp-h3\">密码重置失败</span>\n        </div>\n    </div>\n\n    <div class=\"hp-section hp-reset-success\">\n        <div class=\"hp-section-pb\">\n\n            <p class=\"hp-p\">\n                <span class=\"hp-icon hp-icon-unhappy\"></span><br>\n                您的第三方帐号尚未绑定过任何沪江帐号<br>\n                重新选择密码找回方式\n            </p>\n\n            <button class=\"hp-btn hp-btn-green\">重新选择</button>\n\n            <div class=\"hp-info-tip\">\n    选择问题？请 <a href=\"http://kefu.hujiang.com/feedback/\" target=\"_blank\" data-external-link=\"true\"\n              data-bi-point=\"resetpwd_msg\" class=\"hp-green\">留言</a>，或者进行 <a href=\"http://kefu.hujiang.com/shensu/\"\n                                                                           data-external-link=\"true\" target=\"_blank\"\n                                                                           class=\"hp-green\"\n                                                                           data-bi-point=\"resetpwd_complain\">帐号申诉</a>\n</div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(109);

	var View = __webpack_require__(6),
	    css_disabled = 'hp-disabled',
	    css_hidden = 'hp-hide',
	    disable_btn_text = '正在进入',
	    btn_text = '确定并进入',
	    BI = __webpack_require__(45),
	    settings = __webpack_require__(2),
	    customMsg = {
	        'username': {required: '用户名不能为空！'}
	    };

	var isIE10Minus = $.browser && $.browser.msie && parseInt($.browser.version, 10) < 10;

	View.register('register-success-rename', {

	    template        : __webpack_require__(111),

	    init: function () {
	        var self = this,
	            ele = self.element,
	            rules;
	        
	        self.ele = ele;
	        
	        ele.find('input').hpinput();
	        // init widgets

	        // var checkAsync = function (field, data) {
	        //         if (data.validated === false) return;
	        //         var validator = this;

	        //         self.trigger('checkExist', field, $(data.element).val(), function (isvalidated, message) {
	        //             if (!isvalidated) {
	        //                 validator.showError(field, message, true);
	        //             } else {
	        //                 validator.showValid(field);
	        //             }
	        //         });
	        //     },
	        //     usernameConfig = {
	        //         events  : 'focusin, focusout',
	        //         validated: function (data) {
	        //             checkAsync.call(this, 'username', data);
	        //         }
	        //     };
	            
	        // ele.hpvalidator({
	        //     messages: customMsg,
	        //     fields  : {
	        //         'username': usernameConfig
	        //     }
	        // })

	        // bind event
	        ele.hpvalidator({
	            messages: customMsg
	        });
	        
	        ele.on('click', '.hp-btn-continue', function () {
	            if ($(this).hasClass(css_disabled)) return;
	            self._onContinueBtnClick();

	        }).on('click', '.hp-back', function () {
	            self.trigger('previous');
	        });

	        if(settings.client === 'pc') {
	            ele.find('.hp-login-nav').hide();
	        } else {
	            ele.on('click','.hp-login-nav', function(){
	                self.trigger('login');
	            });
	        }
	    },
	    
	    update: function (context) {
	        this._renderUserName(context);
	    },
	    
	    _renderUserName: function (context) {
	        var ele = this.element,
	            username = context.username || '';

	        ele.find('.hp-username').val(username);  
	    },
	    
	    showErrorOnField: function (field, msg, forceToInvalid) {
	        this.ele.hpvalidator('showError', field, msg, forceToInvalid);
	    },

	    _onContinueBtnClick: function () {     
	        var self = this,
	            ele = self.ele,
	            username = ele.find('.hp-username').val(),
	            field = 'username';

	        if(!ele.hpvalidator('valid')) return;    
	        this._switchRegisterButtonState(true);
	           
	        self.trigger('checkExist', field, username, function (isvalidated, message) {
	            if (!isvalidated) {
	                self.showErrorOnField(field, message)
	                self._switchRegisterButtonState(false);
	            } else {
	                self.trigger('changeUserName', {
	                    username  : ele.find('.hp-username').val()
	                });
	            }
	        });
	        
	    },

	    _switchRegisterButtonState: function (disabled) {
	        var $btn = this.ele.find('.hp-btn');
	        if (disabled) {
	            $btn.addClass(css_disabled).text(disable_btn_text);
	        } else {
	            $btn.removeClass(css_disabled).text(btn_text);
	        }
	    }
	});

/***/ },
/* 109 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 110 */,
/* 111 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n    <!-- rebuild -->\n\n    <div class=\"hp-rename-head\">\n        <div class=\"hp-show-title\">恭喜你注册成功</div>\n        <div class=\"hp-icon-app-register-success hp-show-img\"></div>\n        <div class=\"hp-show-subtitle\">设置您的用户名</div>\n    </div>\n\n    <!-- <div class=\"hp-info\">\n        <p>为您推荐</p>\n    </div> -->\n    <div class=\"hp-rename-body\">\n        <div class=\"hp-input\">\n            <input class=\"hp-username\" name=\"username\" data-enable-clean=\"true\" data-rule-username-start=\"true\"\n                data-rule-username=\"true\" data-rule-required=\"true\" autocapitalize=\"off\" autocorrect=\"off\" type=\"text\" autocomplete=\"false\" maxlength=\"20\" placeholder=\"填写用户名\"/>\n            <span class=\"hp-err-tips\"></span>\n            <span class=\"hp-flag\"></span>\n        </div>\n        <button class=\"hp-btn hp-btn-green hp-btn-continue\">确定并进入</button>\n    </div>\n    \n\n    <!-- \n        注意：当单个按钮时，添加下面class\n        hp-btn-success-alone \n    -->\n</div>";

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(113);

	var View = __webpack_require__(6),
	    Tabs = __webpack_require__(40).Tabs,
	    captcha = __webpack_require__(26),
	    formMixin = __webpack_require__(73),
	    smsMixin = __webpack_require__(86),
	    captchaMixin = __webpack_require__(30),
	    BI = __webpack_require__(45),
	    css_disabled = 'hp-disabled',
	    css_hidden = 'hp-hide',
	    customMsg = {
	        'mobile' : {required: '手机号码不能为空'},
	        'sms'    : {required: '动态码不能为空！'},
	        'captcha': {required: '验证码不能为空！'}
	    };

	  View.register('login-third-bind-mobile', [formMixin, smsMixin, captchaMixin], {
	    // called after it been rendered.
	    template: __webpack_require__(115),

	    init: function () {
	        var self = this,
	            ele = self.element,
	            mobileContainer = ele;
	        
	        self.currentMode = 'mobile';
	        self.currentTab = mobileContainer;
	        self.dtm = ele.find('.hp-dtm-get');
	        
	        ele.find('input').hpinput();
	        
	        var mobileConfig = {
	            validated: function (data) {
	                var validator = this,
	                    val = $(data.element).val();
	                if (data.validated === true) {
	                    self.trigger('checkExist', 'mobile', val, function (v, message, isSafe) {
	                        if (v) {
	                            self._showCaptcha(!isSafe);
	                            self._toggleDtm(true);                        
	                            validator.showValid('mobile', true);
	                        } else {
	                            self._toggleDtm(false);
	                            validator.showError('mobile', message, true);
	                        }
	                    });
	                } else {
	                    self._toggleDtm(false);
	                }
	            }
	        };

	        mobileContainer.hpvalidator({
	            messages: customMsg,
	            fields  : {
	                'mobile'  : mobileConfig
	            }
	        });
	        
	        ele.on('click', '.hp-skip', function() {
	            self.trigger('loginNoBind');
	        }).on('click', '.hp-captcha-pic', function () {
	            self._updateCaptcha();
	        });

	    },
	    
	    _showCaptcha: function (show) {
	        var $yzm = this.element.find('.hp-input-captcha'),
	            $yzmInput = $yzm.find('.hp-captcha');

	        if (show) {
	            BI.fire('3rd_login_telbind_picvertify');
	            $yzm.removeClass(css_hidden);
	            $yzmInput.removeAttr('disabled');
	        } else {
	            $yzm.addClass(css_hidden);
	            $yzmInput.attr('disabled', 'disabled');
	        }
	    },
	    
	    _toggleDtm: function (enable) {
	        if (enable && this.interval) return;
	        this.dtm[enable ? 'removeClass' : 'addClass'](css_disabled);
	    },
	    
	    showErrorOnField: function (field, msg, forceToInvalid) {
	        this.currentTab.hpvalidator('showError', field, msg, forceToInvalid);
	    },

	    getFields: function () {
	        var ele = this.element;
	        return {
	            mobile  : ele.find('.hp-mobileno').val(),
	            msgCode : ele.find('.hp-dtm').val()
	        };
	    }
	});

/***/ },
/* 113 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 114 */,
/* 115 */
/***/ function(module, exports) {

	module.exports = "<div class=\"hp-view\">\n    <div class=\"hp-section\">\n        \n        \n\n        <div class=\"login-third-container\">\n            <div class=\"hp-login-third-info\">\n                <div class=\"hp-show-title\">恭喜你注册成功</div>\n                <div class=\"hp-icon-app-bind-success hp-show-img\"></div>\n                <div class=\"hp-third-info-title hp-show-subtitle\">绑定手机号，帐号安全妥妥滴</div>\n            </div>\n            \n            <div class=\"hp-login-third-inputs\">\n                <div class=\"hp-input\">\n    <input class=\"hp-mobileno\" name=\"mobile\" data-enable-clean=\"true\" data-rule-cellphone=\"true\"\n           data-rule-required=\"true\" type=\"tel\" maxlength=\"11\" placeholder=\"填写手机号\"/>\n    <i class=\"hp-input-icon hp-icon-input-mobile\"></i>  \n    <span class=\"hp-err-tips\"></span>\n    <span class=\"hp-flag\"></span>\n</div>\n                \n                <div class=\"hp-input hp-input-half hp-input-captcha hp-hide\">\n    <input class=\"hp-captcha\" disabled=\"disabled\" type=\"text\" maxlength=\"8\" name=\"captcha\" data-rule-captcha=\"true\"\n           data-rule-required=\"true\" placeholder=\"验证码\"/>\n    <span class=\"hp-btn-half hp-captcha-pic\"></span>\n    <i class=\"hp-input-icon hp-icon-input-captcha\"></i>  \n    <span class=\"hp-err-tips\"></span>\n</div>\n                \n                <div class=\"hp-input hp-input-half hp-input-dtm\">\n    <input class=\"hp-dtm\" type=\"text\" maxlength=\"8\" name=\"sms\" data-rule-required=\"true\" data-rule-sms=\"true\"\n           placeholder=\"短信动态码\"/>\n    <i class=\"hp-input-icon hp-icon-input-captcha\"></i>\n    <span class=\"hp-btn-half hp-dtm-get hp-disabled\">获取动态码</span>\n    <span class=\"hp-err-tips\">动态码错误</span>\n</div>\n\n                <!-- 此处没有打点 -->\n                <button class=\"hp-btn hp-submit-btn hp-btn-green \" type=\"submit\">绑定并进入</button>\n                <!--<div class=\"hp-third-link\">\n                    <a class=\"hp-skip\">跳过</a>\n                </div>-->\n            </div>\n        </div>\n        \n        \n        <div class=\"hp-third-link\">\n            <a href=\"javascript:;\" class=\"hp-right hp-skip\">\n                跳过&nbsp;\n            </a>\n        </div>\n        \n    </div>\n</div>\n";

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var actions = {},
	    context = __webpack_require__(4),
	    views = __webpack_require__(5),
	    settings = __webpack_require__(2),
	    flows = __webpack_require__(1).flow,
	    actionEnum = __webpack_require__(1).actions,
	    BI = __webpack_require__(45),
	    viewMap = {
	        "login"          : "login_show",
	        "category-select": "interest_step1_show",
	        "interest-select": "interest_step2_show",
	        "register-sms"   : "register_sms_show",
	        "login-transfer" : "login_success_view"
	    },
	    durationMap = {
	        "register-mobile": "register_mobile_duration",
	        "register-sms"   : "register_sms_duration"
	    },
	//这里只能控制到主线流程支线流程控制不到！
	    registerOrder = [
	        'category-select',
	        'interest-select',
	        'register-mobile',
	        'register-success'
	    ],

	    loginOrder = [
	        'login',
	        'login-transfer',
	        'category-select',
	        'interest-select'
	    ],

	    thirdOrder = [
	        'login-third',
	        'login-third-bind',
	        'login-third-success',
	        'category-select',
	        'interest-select'
	    ];

	var biPoint = {
	    start      : +(new Date),
	    currentView: ''
	}

	function fireBI(key) {
	    if (!viewMap[key]) return;

	    BI.fire(viewMap[key], {
	        login: !!context.setInterest
	    });
	}

	function keepTimeBI(key) {
	    if (durationMap[biPoint.currentView]) {
	        BI.fire(durationMap[biPoint.currentView], {
	            duration: +(new Date) - biPoint.start 
	        });
	        biPoint.currentView = '';
	    }
	    
	    if (durationMap[key] && biPoint.currentView === '') {
	        return biPoint = {
	            start       : +(new Date),
	            currentView : key
	        };
	    }
	}

	function getSkips(flow) {
	    if (flow === flows.LOGIN) return settings.skipsOnLogin;
	    if (flow === flows.REGISTER) return settings.skips;
	    if (flow === flows.LOGIN_THIRD) return settings.skipsOnThird;
	    return [];
	}


	function _isSkip(key) {

	    var skips = getSkips(context.currentFlow);

	    if (!skips) return false;

	    for (var i = 0, len = skips.length; i < len; i++) {
	        if (skips[i] === key) return true;
	    }
	    return false;
	}


	function getOrder(flow) {
	    if (flow === flows.LOGIN) return loginOrder;
	    if (flow === flows.REGISTER) return registerOrder;
	    if (flow === flows.LOGIN_THIRD) return thirdOrder;
	    return [];
	}

	// If this step isn't in order, show this step;
	// If this step is in order, and not ignored , show this step;
	// If this step is in order, and ignored , check next step;
	// If this step is in order, and all following steps are ignored, then return empty.
	function _getActualView(key) {

	    var order = getOrder(context.currentFlow),
	    // var order = registerOrder,
	        len = order.length,
	        result = key,
	        isAfter = false;

	    for (var i = 0; i < len; i++) {
	        var step = order[i];
	        if (step !== key && !isAfter) continue;
	        isAfter = true;

	        if (!_isSkip(step)) {
	            result = step;
	            break;
	        } else {
	            result = '';
	            actions[step].skiped();
	        }
	    }

	    return result;
	}

	var firstLoad = true; //ignore push to history stack on first load.

	function switchToView(key, options, ignorePush2History) {
	    var rawKey = key,
	        key = _getActualView(key);

	    if (key === '') return;
	    
	    var action = actions[key];

	    if (context.currentAction) {
	        context.currentAction.view.element.hide();
	    }
	    context.currentAction = action;

	    action.load.call(action, options); // load action;

	    if (context.mode === 'popup') {
	        context.element.hpdialog("reset");
	    }

	    if (action.fireBI) {
	        action.fireBI.call(action);
	    } else {
	        fireBI(key);
	    }
	    
	    keepTimeBI(key); //Record duration in some pages

	    if (context.mode === 'inline' &&
	        settings.client === 'mobile' && !ignorePush2History &&
	        history &&
	        history.pushState) { //push to history

	        //Cache first-view that not been pushed to history stack.
	        if (firstLoad) {
	            context.firstView = key;
	            context.firstViewOpts = options;
	            context.firstFlow = context.currentFlow;
	        } else {
	            // setTimeout(function() {
	            //     history.pushState({
	            //         name: key,
	            //         currentFlow: context.currentFlow
	            //     }, '', '#' + key);  
	            // }, 0);
	            history.pushState({
	                name: key,
	                currentFlow: context.currentFlow
	            }, '', '#' + key);
	        }
	        // console.log('before push')
	        // history.pushState({
	        //     name: key,
	        //     currentFlow: context.currentFlow
	        // }, '', '#' + key);
	        // console.log('after push')
	    }

	    firstLoad = false;
	    context.name = key;
	}

	module.exports = {

	    actions     : actions,
	    switchToView: switchToView,

	    switchToFlow: function (key, options, ignorePush2History) {
	        context.currentFlow = key;
	        var view = '';
	        switch (key) {
	            case flows.LOGIN:
	                view = actionEnum.LOGIN;
	                break;
	            case flows.REGISTER:
	                if (false) {
	                    view = actionEnum.REGISTER_MOBILE;
	                } else {
	                    view = actionEnum.CATE_SELECT;
	                }
	                break;
	            case flows.RESETPWD:
	                if (options && options.fromThird) {
	                    if (options.IsBind) {
	                        view = actionEnum.RESETPWD_RESET;
	                    } else {
	                        view = actionEnum.RESETPWD_FAIL;
	                    }
	                } else {
	                    view = actionEnum.RESETPWD_CHOOSE;
	                }
	                break; //LOGIN_THIRD
	            case flows.LOGIN_THIRD:
	                view = ( true)? actionEnum.LOGIN_THIRD : actionEnum.LOGIN_THIRD_BIND_MOBILE;
	                break;
	            default:
	                view = actionEnum.LOGIN;
	                break;
	        }

	        switchToView(view, options, ignorePush2History);
	    }
	}

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	//register all actions
	__webpack_require__(118);
	// require("./register.js");
	__webpack_require__(124);
	__webpack_require__(126);
	__webpack_require__(127);
	__webpack_require__(128);
	__webpack_require__(129);
	__webpack_require__(130);
	__webpack_require__(131);
	__webpack_require__(132);
	// require("./loginThirdBind.js");
	__webpack_require__(134);

	__webpack_require__(135);
	__webpack_require__(136);
	__webpack_require__(138);
	__webpack_require__(139);
	__webpack_require__(140);
	__webpack_require__(142);
	__webpack_require__(143);

	__webpack_require__(144);
	__webpack_require__(145);

	module.exports = {
	    action: __webpack_require__(3)
	}

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    flows = __webpack_require__(1).flow,
	    APIs = __webpack_require__(119),
	    context = __webpack_require__(4),
	    captcha = __webpack_require__(26),

	    settings = __webpack_require__(2),
	    device = __webpack_require__(27),
	    cookie = __webpack_require__(121),
	    md5 = __webpack_require__(122),
	    BI = __webpack_require__(45),
	    CONST = __webpack_require__(28),
	    errHandler = __webpack_require__(17),
	    thirdMixin = __webpack_require__(123);

	controller.register(actionEnum.LOGIN, [thirdMixin], {

	    init: function () {
	        var view = this.view;

	        this._initAvatar();
	        
	        if (false) {
	            this._initCover();
	        }

	        APIs.isShowLoginCaptcha()
	            .success(function (data) {
	                if (data.Data && data.Data.Result) {
	                    view._showCaptcha(true);
	                    view._updateCaptcha();
	                }
	            });
	    },

	    __previous: function () {
	        controller.historyBack();
	    },

	    __registerClick: function () {
	        controller.switchToFlow(flows.REGISTER);
	    },

	    __switchAvatar: function (show) {
	        context.isNewUser = !show;
	    },

	    __clear: function () {
	        this._cleanUserCache();
	    },

	    __trialLogin: function () {
	        APIs.trialLoginOnApp(function (data) {
	            HJSDK.invokeOriginally('navigator_closeWindow');
	        });
	    },

	    __closeView: function () {
	        controller.redirect();
	    },

	    __forgotPwd: function () {
	        controller.switchToFlow(flows.RESETPWD);
	    },

	    __login: function (data) {
	        var self = this,
	            view = this.view,
	            info = self._getUserInfoFormCache();

	        data.userName = data.userName || info.uname;
	        data.token = captcha.token || "";
	        var rawpwd = data.password;
	        data.password = md5(data.password);

	        APIs.login(data).success(function (d) {
	            var needChooseInterest = d.Data.UserTag === null,
	                callback = function () {
	                    view.disableSubmit(false);
	                    context.setInterest = needChooseInterest;

	                    if (needChooseInterest) {
	                        controller.switchToView(actionEnum.CATE_SELECT, true);
	                    } else {
	                        controller.switchToView(actionEnum.LOGIN_TRANSFER);
	                    }
	                };
	            if (false) {
	                d.Data.__rawpwd = rawpwd;
	            }

	            APIs.syncLogin(d.Data, function () {

	                BI.fire("sync_login_success", {
	                    logintype: 'uname'
	                });
	                callback();

	            }, function () {

	                BI.fire("sync_login_failure", {
	                    logintype: 'uname'
	                });
	                view.disableSubmit(false);
	            });

	        }).failure(function (message, code) {
	            errHandler.showErrorMessage(code, message, view);

	            BI.fire("login_failure", {
	                errorcode: code
	            });
	            view.disableSubmit(false);
	        });
	    },

	    _cleanUserCache: function () {
	        if (false) {
	            HJSDK.invoke('account_clearHistory');
	        } else {
	            cookie.removeCookie(CONST.uidCookie);
	            cookie.removeCookie(CONST.unameCookie);
	        }
	    },

	    _getUserInfoFormCache: function () {
	        var info = settings.previous_user_info;

	        if (false) {
	            return {
	                uname: info.username,
	                uid  : info.uid,
	                pwd  : info.password
	            }
	        }
	        return {
	            uname: decodeURIComponent(cookie.getCookie(CONST.unameCookie)),
	            uid  : cookie.getCookie(CONST.uidCookie)
	        }
	    },
	    
	    _getAppInfoFromOption: function () {
	        var info = settings.content_app_info;
	        
	        if (false) {
	            return {
	                appicon: info.icon_local_id,
	                appname: info.name
	            }
	        }
	    },
	    
	    _initCover: function () {
	        var self = this,
	            info = self._getAppInfoFromOption();
	        
	        if (info) {
	            showCover = true;
	            self.view.updateCover(info.appname, info.appicon);
	        }
	    },

	    _initAvatar: function () {
	        var self = this,
	            info = self._getUserInfoFormCache(),
	            username = info.uname,
	            userid = info.uid,
	            showAvatar = false;

	        if (username && userid) {
	            showAvatar = true;
	            self.view.updateAvatar(username, APIs.getAvatar(userid), info.pwd);
	        }

	        self.view._switchAvatar(showAvatar);
	    },

	    show: function () {
	        this.view.show();
	    }
	});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var ajax = __webpack_require__(120),
	    Const = __webpack_require__(28),
	    settings = __webpack_require__(2),
	    context = __webpack_require__(4),
	    device = __webpack_require__(27),
	    genAPIUrl = Const.genAPIUrl,
	    showLoading, hideLoading, getWithSyncLogin, jsbridge;


	if (false) {
	    jsbridge = require('../common/jsbridge-helper');
	}


	showLoading = function () {
	    if (false) {
	        jsbridge.invoke('ui_loading', {
	            action: 'show'
	        });
	    }
	}

	hideLoading = function () {
	    if (false) {
	        jsbridge.invoke('ui_loading', {
	            action: 'hide'
	        });
	    }
	}

	getWithSyncLogin = function (type, data, ctxt) {
	    if (false) {
	        showLoading();
	        return ajax.get(genAPIUrl(type), data, ctxt)
	            .failure(hideLoading);
	    } else {
	        return ajax.get(genAPIUrl(type), data);
	    }
	}

	module.exports = {

	    // login related APIs
	    login: function (data) {
	        return getWithSyncLogin("Login", data);
	    },

	    getUserInfo: function () {
	        return ajax.get(genAPIUrl("GetUserInfo"));
	    },

	    getOauthLoginUrl: function (data) {
	        return ajax.get(genAPIUrl("getoauthloginurl"), data);
	    },

	    isShowLoginCaptcha: function () {
	        return ajax.get(genAPIUrl("LoginCodeCaptcha"));
	    },

	    // register related APIs
	    checkUserName: function (userName, checkType, checkSafe) {
	        return ajax.get(genAPIUrl("checkUserName"), {
	            userName : userName,
	            checkType: checkType,
	            checkSafe: checkSafe
	        });
	    },
	    

	    checkNotExist: function (userinfo, checkType) {
	        return ajax.get(genAPIUrl("CheckEmailOrMobile"), {
	            userinfo : userinfo,
	            checkType: checkType
	        });
	    },
	    
	    changeUserName: function (data) {
	        return getWithSyncLogin("QuickChangeUserName", data);
	    },
	    
	    bindMobile: function (data) {
	        return getWithSyncLogin("QuickBindMobile", data);  
	    },

	    sendMessage: function (data) {
	        return ajax.get(genAPIUrl("SendMsg"), data);
	    },

	    register: function (data) {
	        if (false) {
	            data.accesstoken = settings.access_token;
	            return this.trialFromRegister(data);
	        }
	        
	        if (false) {
	            showLoading();
	            return ajax.get(genAPIUrl("Register"), data)
	                .success(hideLoading).failure(hideLoading); 
	        }

	        return getWithSyncLogin("Register", data);
	    },

	    isShowRegisterCaptcha: function () {
	        return ajax.get(genAPIUrl("isShowCode"));
	    },

	    //sso
	    syncLogin: function (data, onSynced, failure) {
	        if (false) {
	            var params = {
	                cookie: data.Cookie
	            };

	            //pass additional params to native.
	            params.platform = data.Platform || context.thirdEntry;

	            if (data.is_trial) params.is_trial = data.is_trial;
	            if (data.__rawpwd && settings.support_savepwd) {
	                params.password = data.__rawpwd;
	            }
	            

	            jsbridge.invoke('account_loginSuccess', params, function (hash) {
	                jsbridge.invoke('ui_loading', {
	                    action: 'hide'
	                });
	                onSynced(true);
	            }, function (errInfo) {
	                if (failure) failure(errInfo);
	            });
	            //onSynced(true);
	            return;
	        }

	        var domains = Const.SSODomains,
	            len = domains.length,
	            ticket = data.ticket,
	            url,
	            count = 0,
	            timer,
	            callback = function (data) {
	                count++;
	                if (count == len) {
	                    if (timer) {
	                        clearTimeout(timer);
	                    }
	                    onSynced(true);
	                }
	            };

	        timer = setTimeout(function () {
	            onSynced(false);
	        }, 10000);

	        for (var i = 0; i < len; i++) {
	            url = Const.getAPISLD() + "." + domains[i] + "/quick/synclogin.aspx";
	            $.get(url, {
	                token      : ticket,
	                reg3rd     : data.reg3rd,
	                remeberdays: 14
	            }, callback, "jsonp");
	        }
	    },

	    //reset password
	    findPwdByEmail: function (data) {
	        return ajax.get(genAPIUrl("FindSendEmail"), data);
	    },

	    findPwdByMobile: function (data) {
	        return ajax.get(genAPIUrl("FindByMobile"), data);
	    },

	    updatePwd: function (data) {
	        return ajax.get(genAPIUrl("UpdateUserPassword"), data);
	    },

	    //third-party APIs
	    oauthRegister: function (data) {

	        if (false) {
	            data.accesstoken = settings.access_token;
	            return this.trialFromThird(data);
	        }
	        return getWithSyncLogin("OauthRegister", data);
	    },

	    oauthLogin: function (data) {
	        return getWithSyncLogin("OauthBind", data);
	    },

	    // other APIs
	    setTag: function (tagId) {
	        return ajax.get(genAPIUrl("UpdateUserTag"), {
	            categoryid: tagId
	        });
	    },

	    getPushData: function () {
	        return ajax.get(genAPIUrl("PushDataLoad"), {
	            format      : 'json',
	            platformType: device.device,
	            click_url   : settings.redirectURL
	        });
	    },

	    recordThirdInfos: function (data) {
	        return getWithSyncLogin("AppOauthUserToCache", data);
	    },

	    thirdLoginOnApp: function (platform, callback) {
	        jsbridge.invoke('account_getSocialInfo', {
	            platform: platform
	        }, function (data) {
	            callback.call(null, data);
	        });
	    },

	    //
	    trialFromRegister: function (data) {
	        if (false) {
	            showLoading();
	            return ajax.get(genAPIUrl("ConvertByRegister"), data, {
	                is_trial: true
	            }).success(hideLoading).failure(hideLoading); 
	        }
	        
	        return getWithSyncLogin("ConvertByRegister", data, {
	            is_trial: true
	        });
	    },

	    trialFromThird: function (data) {
	        return getWithSyncLogin("ConvertByOauth", data, {
	            is_trial: true
	        });
	    },

	    trialLoginOnApp: function (callback) {
	        jsbridge.invoke('ui_loading', {
	            action: 'show'
	        });

	        jsbridge.invoke('account_trialLogin', function (data) {
	            jsbridge.invoke('ui_loading', {
	                action: 'hide'
	            });
	            callback.call(null, data);
	        });
	    },

	    //sync method, (maybe it should merge to getUserInfo API)
	    getAvatar: function (userId) {
	        var strId = userId.toString(),
	            len = userId.length,
	            strTemp = "0000",
	            avatar = "//i2.hjfile.cn/f48/";

	        if (len < 4) {
	            strId = strTemp.substring(0, 4 - len) + strId;
	            len = 4;
	        }

	        return avatar + strId.substr(len - 4, 2) + "/" +
	            strId.substr(len - 2, 2) + "/" + strId + ".jpg";
	    },
	    
	    addRegInfo: function () {
	        var data = {};

	        if (true) {
	            if(window.ht && !!ht['getIDs']) { //ht is injected by BI
	                var idInfo = ht.getIDs();
	                data = {
	                    VisitorID    : idInfo.uid,
	                    SessionID    : idInfo.sid,
	                    SiteSessionID: idInfo.ssid,
	                    PageUrl      : encodeURIComponent(location.href)
	                }
	            }
	        } 
	        
	        return ajax.get(genAPIUrl("AddRegVisitorInfo"), data);
	    }
	}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// ajax method
	function ajaxHandelr(obj, ctxt) {
	    var successCallbacks = [],
	        failureCallbacks = [],
	        completeCallbacks = [],
	        successHandler = function (data) {
	            $.each(successCallbacks, function (i, callback) {
	                return callback.call(ctxt, data);
	            });
	        },

	        failureHandler = function (data) {
	            if (true) {
	                if (!data.Code) console.log(data.Message);
	            }
	            var message, status;
	            if (data.Code) {
	                message = data.Message;
	                status = data.Code;
	            } else {
	                message = ((false) && data.message) || data.statusText;
	                status = data.status;
	            }

	            $.each(failureCallbacks, function (i, callback) {
	                return callback.call(ctxt, message, status);
	            });
	        },

	        completeHandler = function (data) {
	            
	            $.each(completeCallbacks, function (i, callback) {
	                return callback.call(ctxt, data);
	            });
	        };

	    obj.success = function (data) {
	        if (data.Code === 0) {
	            successHandler(data);
	        } else {
	            failureHandler(data);
	        }
	    };

	    obj.error = function (data) {
	        failureHandler(data);
	    };

	    obj.complete = function (data) {
	        completeHandler(data);
	    };

	    return {
	        success: function (callback) {
	            successCallbacks.push(callback);
	            return this;
	        },

	        failure: function (callback) {
	            failureCallbacks.push(callback);
	            return this;
	        },

	        complete: function (callback) {
	            completeCallbacks.push(callback);
	            return this;
	        }
	    }
	}

	function createHandler(mode) {

	    return function (url, data, ctxt) {        
	        ctxt = ctxt || {};

	        var obj = {
	                success: $.noop,
	                error  : $.noop
	            },
	            ret = ajaxHandelr(obj, ctxt);
	        
	        if (false) {
	            data && (data.isapp = true);
	            
	            data = data || {};
	            data.action = url.action;
	            
	            
	            //For ios serialization problem
	            //ios trans boolean(true or false) to number
	            //it will be consider when we change get to post
	            for (var key in data) {
	                if (typeof data[key] === 'boolean') {
	                    data[key] = data[key].toString();
	                }
	            }
	            
	            var xhr = HJSDK.invoke('network_request', {
	                host    : url.host,
	                path    : url.path + ".json",
	                method  : "GET",
	                params  : data,
	                success : obj.success,
	                failure : obj.error
	                // ,complete: obj.complete
	            });
	        } else {
	            var xhr = $.ajax({
	                type    : mode,
	                url     : url,
	                data    : data,
	                dataType: "jsonp",
	                success : obj.success,
	                error   : obj.error,
	                complete: obj.complete
	            });                     
	        }
	        
	        ctxt.xhr = xhr;   
	        return ret;
	    }
	}


	module.exports = {
	    post: createHandler('post'),
	    get : createHandler('get')
	}

/***/ },
/* 121 */
/***/ function(module, exports) {

	/**
	 * 根据cookie的键值获取cookie的值。
	 * @param {string} name cookie键值
	 * @return {string}
	 */
	function getCookie(name) {
	    var start = document.cookie.indexOf(name + '=');
	    var len = start + name.length + 1;
	    if ((!start) && (name != document.cookie.substring(0, name.length))) {
	        return undefined;
	    }
	    if (start == -1) return undefined;
	    var end = document.cookie.indexOf(';', len);
	    if (end == -1) end = document.cookie.length;
	    return decodeURIComponent(document.cookie.substring(len, end));
	};

	/**
	 * 设置cookie的值。
	 * @param {string} name cookie键值
	 * @param {string} value  cookie值
	 * @param {number} expires  失效时间，以天计
	 * @param {string} [path]  设置cookie所在目录
	 * @param {string} [domain]  设置cookie所在域
	 * @param {string} [secure]  设置https only的cookie
	 */
	function setCookie(name, value, expires, path, domain, secure) {
	    expires = expires || 24 * 60 * 60 * 1000;
	    var expires_date = new Date((new Date()).getTime() + (expires));
	    document.cookie = name + '=' + encodeURIComponent(value) + ((expires) ? ';expires=' + expires_date.toGMTString() : '') + /*expires.toGMTString()*/
	        ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
	};

	/**
	 * 根据cookie的键值移除cookie的值。
	 * @param {string} name cookie键值
	 * @return {string}
	 */
	function removeCookie(name, path, domain) {
	    if (getCookie(name)) document.cookie = name + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	};

	module.exports = {
	    getCookie   : getCookie,
	    setCookie   : setCookie,
	    removeCookie: removeCookie
	}

/***/ },
/* 122 */
/***/ function(module, exports) {

	/*
	 * Perform a simple self-test to see if the VM is working
	 */
	//function md5_vm_test()
	//{
	//  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
	//}
	/*
	 * Configurable variables. You may need to tweak these to be compatible with
	 * the server-side, but the defaults work in most cases.
	 */
	var hexcase = 0;
	/* hex output format. 0 - lowercase; 1 - uppercase        */
	var chrsz = 8;
	/* bits per input character. 8 - ASCII; 16 - Unicode      */

	/*
	 * These are the functions you'll usually want to call
	 * They take string arguments and return either hex or base-64 encoded strings
	 */
	function hex_md5(s) {
	    return binl2hex(core_md5(str2binl(s), s.length * chrsz));
	}
	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len) {
	    /* append padding */
	    x[len >> 5] |= 0x80 << ((len) % 32);
	    x[(((len + 64) >>> 9) << 4) + 14] = len;

	    var a = 1732584193;
	    var b = -271733879;
	    var c = -1732584194;
	    var d = 271733878;

	    for (var i = 0; i < x.length; i += 16) {
	        var olda = a;
	        var oldb = b;
	        var oldc = c;
	        var oldd = d;

	        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
	        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
	        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
	        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
	        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
	        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
	        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
	        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
	        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
	        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
	        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
	        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
	        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
	        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
	        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
	        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

	        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
	        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
	        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
	        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
	        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
	        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
	        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
	        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
	        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
	        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
	        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
	        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
	        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
	        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
	        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
	        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

	        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
	        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
	        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
	        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
	        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
	        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
	        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
	        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
	        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
	        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
	        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
	        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
	        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
	        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
	        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
	        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

	        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
	        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
	        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
	        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
	        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
	        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
	        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
	        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
	        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
	        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
	        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
	        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
	        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
	        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
	        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
	        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

	        a = safe_add(a, olda);
	        b = safe_add(b, oldb);
	        c = safe_add(c, oldc);
	        d = safe_add(d, oldd);
	    }
	    return Array(a, b, c, d);

	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t) {
	    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}

	function md5_ff(a, b, c, d, x, s, t) {
	    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}

	function md5_gg(a, b, c, d, x, s, t) {
	    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}

	function md5_hh(a, b, c, d, x, s, t) {
	    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function md5_ii(a, b, c, d, x, s, t) {
	    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}


	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y) {
	    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	    return (msw << 16) | (lsw & 0xFFFF);
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt));
	}

	/*
	 * Convert a string to an array of little-endian words
	 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
	 */
	//不能删
	function str2binl(str) {
	    var bin = Array();
	    var mask = (1 << chrsz) - 1;
	    for (var i = 0; i < str.length * chrsz; i += chrsz)
	        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
	    return bin;
	}


	/*
	 * Convert an array of little-endian words to a hex string.
	 */
	//不能删
	function binl2hex(binarray) {
	    var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
	    var str = '';
	    for (var i = 0; i < binarray.length * 4; i++) {
	        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
	            hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
	    }
	    return str;
	}

	module.exports = hex_md5;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var APIs = __webpack_require__(119),
	    context = __webpack_require__(4),
	    controller = __webpack_require__(3),
	    flows = __webpack_require__(1).flow,
	    settings = __webpack_require__(2),
	    device = __webpack_require__(27),
	    BI = __webpack_require__(45),
	    CONST = __webpack_require__(28),
	    errHandler = __webpack_require__(17),
	    getResetUrl = function (url, action) {
	        return url.replace(/(type%3d)login/, '$1' + action);
	    },
	    mapKeyWithNoDash = function (data) {
	        var result = {},
	            key;

	        for (key in data) {
	            var newKey = key.replace(/_/g, '');
	            result[newKey] = data[key];
	        }
	        return result;
	    };

	module.exports = {

	    _getLinks: function () {
	        var links = context.currentFlow === flows.LOGIN ?
	            context.thirdLoginLinks :
	            (context.currentFlow === flows.RESETPWD ? context.thirdResetLinks : '');

	        if (device.isPC) {
	            this.view._bind3rdClick(links);
	        } else {
	            this.view._update3rdLoginUrl(links);
	        }
	    },

	    _initPartial: function () {
	        var self = this;

	        if (false) {
	            self.view._bind3rdClick();
	        } else if (context.thirdLoginLinks && context.thirdLoginLinks.qq) {
	            self._getLinks();
	        } else {
	            APIs.getOauthLoginUrl({
	                domain   : CONST.thirdLoginDomain,
	                mode     : device.device,
	                iswechat : device.isWeixin,
	                protocol : location.protocol,
	                regsource: settings.source,
	                returnurl: settings.redirectURL
	            }).success(function (data) {
	                var urls = data.Data,
	                    obj = {};

	                if (urls && urls.length) {
	                    $.each(urls, function (i, item) {
	                        obj[item.key] = item.Url;
	                    });
	                }

	                context.thirdLoginLinks = obj;
	                self._init3rdLinks();
	                var links = self._getLinks();
	            });
	        }
	    },
	    
	    //BI use
	    __record3rdClick: function (party) {
	       var login = 1, register = 0;
	               
	       BI.fire(party, {
	           type: context.currentFlow === flows.LOGIN ? login : register
	        });  
	    },

	    __hanlde3rdClick: function (url) {
	        if (false) {
	            APIs.thirdLoginOnApp(url, function (data) {
	                data = mapKeyWithNoDash(data);
	                var nextView = flows.LOGIN_THIRD;
	                if (context.currentFlow === flows.RESETPWD) {
	                    data.islogin = 1001;
	                    nextView = flows.RESETPWD;
	                }

	                APIs.recordThirdInfos(data).success(function (hash) {
	                    controller.switchToFlow(nextView, hash.Data);
	                    //ugly fix
	                    //twice ui_loading hide in success failure to prevent can not back
	                    HJSDK.invoke('ui_loading', {action: 'hide'}); 
	                }).failure(function (message, code) {
	                    errHandler.showErrorMessage(message);
	                    HJSDK.invoke('ui_loading', {action: 'hide'});
	                });
	            });
	        } else {
	            this._open3rdWindow(url);
	        }
	    },

	    _init3rdLinks: function () {
	        var action = device.isPC ? 'reset' : 'mreset';
	        for (var key in context.thirdLoginLinks) {
	            context.thirdResetLinks[key] =
	                getResetUrl(context.thirdLoginLinks[key], action);
	        }
	    },

	    _open3rdWindow: function (url) {
	        document.domain = CONST.thirdLoginDomain;
	        window.open(url, 'ThirdPartyLogin',
	            'location=no,scrollbars=no,width=450,height=600');
	    }
	}


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by chendafu@hujiang.com on 16/4/1.
	 */
	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    flows = __webpack_require__(1).flow,
	    captcha = __webpack_require__(26),
	    APIs = __webpack_require__(119),
	    md5 = __webpack_require__(122),
	    settings = __webpack_require__(2),
	    context = __webpack_require__(4),
	    BI = __webpack_require__(45),
	    errHandler = __webpack_require__(17),
	    checkMixin = __webpack_require__(125);

	controller.register(actionEnum.REGISTER_EMAIL, [checkMixin], {

	    init: function () {
	        this._initCaptcha();
	    },

	    __sendEmailData: function (data) {
	        var self = this;
	        BI.fire("register_email_submit", {
	            groupid   : context.categoryId,
	            categoryid: context.interestId
	        });

	        APIs.register({
	            userext     : data.email,
	            password    : md5(data.password),
	            username    : '',
	            source      : self._getSource(),
	            imgcode     : data.captchaCode,
	            token       : captcha.token,
	            categoryid  : context.interestId,
	            randusername: settings.randUserName
	        }).success(function (d) {
	            if (this.is_trial) d.Data.is_trial = true;

	            if (false) {
	                d.Data.__rawpwd = data.password;
	            }
	            
	            self._registerSuccess(d.Data);
	        }).failure(function (message, code) {
	            self._registerFailure(message, code);
	        });
	        context.email = data.email;

	    },

	    __login: function(){
	        controller.switchToFlow(flows.LOGIN);
	    },

	    __previous: function () {

	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToFlow(flows.LOGIN); // back to prev
	        }
	    },
	    
	    __switchToMobile: function () {
	        controller.switchToView(actionEnum.REGISTER_MOBILE);  
	    },
	 
	    _getSource: function () {
	        if (typeof settings.source === 'string')
	            return settings.source;

	        if (typeof settings.source === 'function')
	            return settings.source();
	    },


	    _registerSuccess: function (data) {
	        var self = this,
	            newData = {
	                username : data.UserName,
	                cookie   : data.Cookie,
	                ticket   : data.ticket
	            };
	            
	        $.extend(context, newData);
	        
	        BI.fire("register_success", {
	            useremail : data.email,
	            usermobile: data.mobile,
	            groupid   : context.categoryId,
	            categoryid: context.interestId
	        });
	        
	        APIs.addRegInfo(); //send BI infomation when register
	            
	        self.view._switchRegisterButtonState(false);
	        controller.switchToView(actionEnum.REGISTER_SUCCESS_RENAME); 

	        // APIs.syncLogin(data, function () {

	        //     BI.fire("sync_login_success", {
	        //         regtype: 'email'
	        //     });

	        //     self.view._switchRegisterButtonState(false);
	        //     controller.switchToView(actionEnum.REGISTER_SUCCESS_RENAME);
	        // }, function () {
	        //     BI.fire("sync_login_failure", {
	        //         regtype: 'email'
	        //     });

	        //     self.view._switchRegisterButtonState(false);
	        // });
	    },

	    _registerFailure: function (message, code) {
	        var view = this.view;
	        errHandler.showErrorMessage(code, message, view);

	        view._switchRegisterButtonState(false);
	    },

	    _initCaptcha: function () {
	        var self = this;
	        
	        APIs.isShowRegisterCaptcha().success(function (data) {
	            if (data.Code !== 0) return;

	            var d = data.Data;
	            self.view.isShowCaptcha = {
	                email : d.Email
	            };
	            if (d.Email) {
	                self.view._renderCaptcha();
	            }
	            self.view._switchCaptcha();

	        });
	    },

	    _skipInsterest: function () {
	        var skips = settings.skips;
	        if (!skips) return false;

	        for (var i = 0, len = skips.length; i < len; i++) {
	            if (skips[i] === "interest-select") return true;
	        }
	        return false;
	    },

	    show: function () {
	        if (this._skipInsterest()) {
	            this.view.element.find('.hp-img-step').hide();
	        }

	        this.view.show();
	        
	        BI.fire("register_email_show", {
	            groupId   : context.categoryId,
	            categoryid: context.interestId
	        });
	    }
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var APIs = __webpack_require__(119),
	    settings = __webpack_require__(2);

	module.exports = {

	    __checkExist: function (type, val, callback) {
	        APIs.checkUserName(val, type, settings.checkSafe).success(function (d) {
	            if (d.Data && d.Data.IsSafe && d.Data.IsSafe === true) {
	                return callback(true, '', true);
	            }
	            callback(true, '', false);
	        }).failure(function (message, data) {
	            callback(false, message);
	        });
	    }
	}

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by chendafu@hujiang.com on 16/4/1.
	 */
	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    flows = __webpack_require__(1).flow,
	    captcha = __webpack_require__(26),
	    APIs = __webpack_require__(119),
	    settings = __webpack_require__(2),
	    context = __webpack_require__(4),
	    BI = __webpack_require__(45),
	    errHandler = __webpack_require__(17),
	    thirdMixin = __webpack_require__(123),
	    checkMixin = __webpack_require__(125);

	controller.register(actionEnum.REGISTER_MOBILE, [thirdMixin, checkMixin], {

	    init: function () {
	        if (settings.diableEmail) {
	            this.view.element.find('.hp-register-switch').hide();
	        }
	        this._initCaptcha();
	    },

	    __getRegisterCode: function (data) {
	        var self = this;
	        BI.fire("register_mobile_submit");

	        data.token = captcha.token;
	        
	        APIs.sendMessage({
	            mobile   : data.mobile,
	            imgcode  : data.imgCode,
	            token    : data.token,
	            sendtype : data.sendtype,
	            checkSafe: settings.checkSafe
	        })
	        .success(function (d) {
	            self._getRegCodeSuccess(d.Data);
	        })
	        .failure(function (message, code) {
	            self._getRegCodeFailure(message, code);
	        });
	        
	        var newData = {
	            mobile  : data.mobile,
	            imgCode : data.imgCode,
	            token   : data.token,
	            password: data.password
	        };
	        
	        $.extend(context, newData);
	    },
	    
	    _getRegCodeSuccess: function (data) {
	        var view = this.view;
	        
	        view._switchRegisterButtonState(false);
	        
	        controller.switchToView(actionEnum.REGISTER_SMS);
	    },
	    
	    _getRegCodeFailure: function (message, code) {
	        var view = this.view;

	        errHandler.showErrorMessage(code, message, view);

	        view._switchRegisterButtonState(false);        
	    },

	    __login: function () {
	        controller.switchToFlow(flows.LOGIN);
	    },

	    __previous: function () {

	        if(settings.client === 'mobile') {
	            controller.redirect();
	        } else {
	            controller.switchToFlow(flows.LOGIN); // back to prev
	        }
	    },
	    
	    __switchToEmail: function () {
	        controller.switchToView(actionEnum.REGISTER_EMAIL);  
	    },

	    _getSource: function () {
	        if (typeof settings.source === 'string')
	            return settings.source;

	        if (typeof settings.source === 'function')
	            return settings.source();
	    },
	    
	    _initCaptcha: function () {
	        var self = this;
	        /*
	        new register flow dose not need to
	        check isShowRegisterCaptcha in mail flow
	        */
	        // APIs.isShowRegisterCaptcha().success(function (data) {
	        //     if (data.Code !== 0) return;

	        //     var d = data.Data;
	        //     self.view.isShowCaptcha = {
	        //         mobile: d.Mobile
	        //     };
	        //     if (d.Mobile) {
	        //         self.view._renderCaptcha();
	        //     }

	        // });
	        self.view._renderCaptcha();
	    },

	    _skipInsterest: function () {
	        var skips = settings.skips;
	        if (!skips) return false;

	        for (var i = 0, len = skips.length; i < len; i++) {
	            if (skips[i] === "interest-select") return true;
	        }
	        return false;
	    },

	    show: function () {
	        if (this._skipInsterest()) {
	            this.view.element.find('.hp-img-step').hide();
	        }

	        this.view.show();
	        
	        BI.fire("register_mobile_show", {
	            groupId   : context.categoryId,
	            categoryid: context.interestId    
	        });
	    }
	});

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by chendafu@hujiang.com on 16/4/1.
	 */
	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    flows = __webpack_require__(1).flow,
	    captcha = __webpack_require__(26),
	    APIs = __webpack_require__(119),
	    md5 = __webpack_require__(122),
	    settings = __webpack_require__(2),
	    context = __webpack_require__(4),
	    BI = __webpack_require__(45),
	    errHandler = __webpack_require__(17);

	controller.register(actionEnum.REGISTER_SMS, {

	    init: function () {
	        if (settings.diableEmail) {
	            this.view.element.find('.hp-tab-head').hide();
	        }
	    },


	    __sendMobileData: function (data) {
	        var self = this;

	        APIs.register({
	            userext     : context.mobile,
	            password    : md5(context.password),
	            username    : '',
	            source      : self._getSource(),
	            msgCode     : data.mobileCode,
	            categoryid  : context.interestId,
	            randusername: settings.randUserName
	        }).success(function (d) {
	            self._registerSuccess(d.Data);
	        }).failure(function (message, code) {
	            self._registerFailure(message, code);
	        });
	    },

	    __login: function(){
	        controller.switchToFlow(flows.LOGIN);
	    },
	    
	    __previous: function () {

	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToFlow(flows.LOGIN); // back to prev
	        }
	    },

	    _getSource: function () {
	        if (typeof settings.source === 'string')
	            return settings.source;

	        if (typeof settings.source === 'function')
	            return settings.source();
	    },


	    _registerSuccess: function (data) {
	        var self = this,
	            newData = {
	                username : data.UserName,
	                cookie   : data.Cookie,
	                ticket   : data.ticket
	            };
	        
	        $.extend(context, newData);
	        
	        BI.fire("register_sms_nextstep", {
	            result: 'success'
	        });
	        
	        BI.fire("register_success", {
	            useremail : data.email,
	            usermobile: data.mobile,
	            groupid   : context.categoryId,
	            categoryid: context.interestId
	        });
	        
	        APIs.addRegInfo();//send BI infomation when register

	        self.view._switchRegisterButtonState(false);
	        controller.switchToView(actionEnum.REGISTER_SUCCESS_RENAME); 
	        // APIs.syncLogin(data, function () {
	        //     BI.fire("sync_login_success", {
	        //         regtype: 'mobile'
	        //     });

	        //     self.view._switchRegisterButtonState(false);
	        //     controller.switchToView(actionEnum.REGISTER_SUCCESS_RENAME);
	        // }, function () {
	        //     BI.fire("sync_login_failure", {
	        //         regtype:'mobile'
	        //     });

	        //     self.view._switchRegisterButtonState(false);
	        // });
	    },

	    _registerFailure: function (message, code) {
	        BI.fire("register_sms_nextstep", {
	            result: 'failure'
	        });
	        
	        var view = this.view;
	        errHandler.showErrorMessage(code, message, view);

	        view._switchRegisterButtonState(false);
	    },
	    
	     __getMessageCode: function (data) {
	        var view = this.view;
	        BI.fire("register_mobile_sms");
	        
	        if (false) {
	            HJSDK.invoke('ui_loading', {
	                action: 'show'
	            });
	        }
	        
	        APIs.sendMessage({
	            mobile   :  context.mobile,
	            imgcode  :  context.imgCode,
	            token    :  context.token,
	            sendtype :  'register',
	            checkSafe:  settings.checkSafe
	            
	        }).success(function(){
	            if (false) {
	                HJSDK.invoke('ui_loading', {
	                    action: 'hide'
	                });    
	            }
	        }).failure(function (message, code) {
	            if (false) {
	                HJSDK.invoke('ui_loading', {
	                    action: 'hide'
	                });    
	            }
	            errHandler.showErrorMessage(code, message, view);
	        });
	    },

	    show: function () {
	        this.view.element.find('.hp-img-step').hide();

	        this.view.show(context);
	        
	        this.view._initDtm()
	    }
	});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    flows = __webpack_require__(1).flow,
	    context = __webpack_require__(4),
	    APIs = __webpack_require__(119),
	    BI = __webpack_require__(45),
	    settings = __webpack_require__(2),
	    errHandler = __webpack_require__(17),
	    _isArray = function (arr) {
	        return Object.prototype.toString.call(arr) === '[object Array]';
	    },
	    _isInArray = function (item, arr) {
	        for (var i = 0, len = arr.length; i < len; i++) {
	            if (arr[i] === item) return true;
	        }
	        return false;
	    };

	controller.register(actionEnum.INTEREST_SELECT, {


	    __previous: function () {
	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToView(actionEnum.CATE_SELECT);
	        }
	    },

	    // actions
	    __interestSelect: function (id) {
	        context.interestId = id;
	        // todo when init the login from different site, the default tab is different.x
	        BI.fire("interest_choose", {
	            categoryid: id,
	            login     : !!context.setInterest,
	            groupid   : context.categoryId
	        });
	        this._switchNextView();
	    },

	    __skip: function () {
	        BI.fire("interest_skep");
	        this._switchNextView();
	    },

	    skiped: function () {
	        if (context.currentFlow === flows.LOGIN ||
	            context.currentFlow === flows.LOGIN_THIRD) {
	            controller.switchToView(actionEnum.LOGIN_TRANSFER);
	        }
	    },


	    show: function () {
	        var isHidePrev;

	        if (_isArray(settings.skips) &&
	            _isInArray(actionEnum.CATE_SELECT, settings.skips)) {
	            isHidePrev = true;
	        }
	        this.view.show(context.categoryId, isHidePrev);
	    },

	    _switchNextView: function () {
	        var self = this;
	        if (context.setInterest) {
	            // reload the page after login
	            var id = context.interestId;
	            if (id) {
	                APIs.setTag(id).success(function (d) {
	                    controller.switchToView(actionEnum.REG_SUCCESS);
	                }).failure(function (message) {
	                    errHandler.showErrorMessage(message);
	                });
	            } else {
	                controller.switchToView(actionEnum.REG_SUCCESS);
	            }

	        } else {
	            controller.switchToView(actionEnum.REGISTER);
	        }
	    }
	});

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    flows = __webpack_require__(1).flow,
	    context = __webpack_require__(4),
	    BI = __webpack_require__(45);


	controller.register(actionEnum.CATE_SELECT, {

	    __previous: function () {
	        controller.historyBack();
	    },

	    __login: function () {
	        controller.switchToFlow(flows.LOGIN);
	    },

	    __selectCategory: function (id) {
	        context.categoryId = id;
	        BI.fire("interest_step1_choose", {
	            login  : !!context.setInterest,
	            groupid: id
	        });
	        controller.switchToView(actionEnum.INTEREST_SELECT);
	    },

	    __skip: function () {

	        BI.fire("interest_step1_skip", {
	            login: !!context.setInterest
	        });
	        this._switchNextView();
	    },

	    _switchNextView: function () {
	        if (context.setInterest) {
	            controller.redirect();
	        } else {
	            controller.switchToView(actionEnum.REGISTER_MOBILE);
	        }
	    }
	});

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    delay = 500;

	controller.register(actionEnum.LOGIN_TRANSFER, {
	    show: function () {
	        this.view.show();
	        window.setTimeout(function () {
	            controller.redirect();
	        }, delay);
	    },

	    skiped: function () {//spell err
	        action.redirect();
	    }
	});

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    settings = __webpack_require__(2),
	    context = __webpack_require__(4),
	    APIs = __webpack_require__(119),
	    BI = __webpack_require__(45);

	controller.register(actionEnum.REG_SUCCESS, {

	    __getPushData: function (container) {
	        var self = this;
	        APIs.getPushData().success(function (data) {
	            if (!data.Data) return;
	            container.html(self.view.genPushMarkup(data.Data));

	            if (context.mode === 'popup') {
	                context.element.hpdialog('reset');
	            }

	            container.delegate("a[data-bi-type]", "click", function(event){
	                var $a = $(this),
	                    type =  $a.attr('data-bi-type');

	                BI.fire("register_success_choose", {
	                    source: settings.source,
	                    groupid: context.categoryId,
	                    categoryid: context.interestId,
	                    //regtype:
	                    type: type
	                });
	            });

	            if (false) {
	                container.find('a[href]').click(function (event) {
	                    var $a = $(event.currentTarget),
	                        link = $a.attr('href');
	                    event.preventDefault();

	                    HJSDK.invokeOriginally('navigator_openURL', {
	                        "url": link
	                    });
	                });
	            }
	        });
	    },

	    __continue: function () {
	        controller.redirect();
	    },

	    __emailClick: function (link) {
	        BI.fire('register_success_active_email');
	        //window.location.href = link;
	        if (false) {
	            HJSDK.invokeOriginally('navigator_openURL', {
	                "url": link
	            });
	        } else {
	            window.open(link);
	        }
	    },

	    skiped: function () {
	        controller.redirect();
	    },

	    show: function () {
	        this.view.show(context);
	    },

	    fireBI: function () {
	        BI.fire("register_success_show", {
	            groupId   : context.categoryId,
	            categoryid: context.interestId
	        });
	    }
	});

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    captcha = __webpack_require__(26),
	    APIs = __webpack_require__(119),
	    BI = __webpack_require__(45),
	    context = __webpack_require__(4),
	    settings = __webpack_require__(2),
	    md5 = __webpack_require__(122),
	    flows = __webpack_require__(1).flow,
	    errHandler = __webpack_require__(17),
	    oauthMixin = __webpack_require__(133);

	controller.register(actionEnum.LOGIN_THIRD, [oauthMixin], {

	    __previous: function () {
	        BI.fire('3rd_login_back', {
	            regtype: context.thirdEntry
	        });

	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToFlow(flows.LOGIN); // back to prev
	        }
	    },

	    __submit: function (data) {

	        var self = this,
	            view = self.view;

	        BI.fire('3rd_login_bind_submit', {
	            regtype: context.thirdEntry
	        });

	        var rawpwd = data.password;
	        data.password = md5(data.password);
	        data.token = captcha.token;
	        
	        APIs.oauthLogin(data)
	            .success(function (d) {      

	                if (false) {
	                    d.Data.__rawpwd = rawpwd;
	                    // if (!d.Data.MobileBind) {
	                    //     return controller.switchToView(actionEnum.LOGIN_THIRD_BIND_MOBILE, d.Data);    
	                    // }
	                }
	                
	                if (!d.Data.MobileBind) {
	                    return controller.switchToView(actionEnum.LOGIN_THIRD_BIND_MOBILE, d.Data);    
	                }
	                
	                var needChooseInterest = d.Data.UserTag === null,
	                    callback = function () {
	                        view.disableSubmit(false);
	                        context.setInterest = needChooseInterest;
	                        
	                        if (context.thirdEntry === 'weixin') {
	                            return controller.switchToView(actionEnum.LOGIN_THIRD_SUCCESS);
	                        }

	                        if (needChooseInterest) {
	                            controller.switchToView(actionEnum.CATE_SELECT, true);
	                        } else {
	                            controller.switchToView(actionEnum.LOGIN_TRANSFER);
	                        }
	                    };

	                APIs.syncLogin(d.Data, function () {
	                    BI.fire("sync_login_success", {
	                        logintype: '3rd'
	                    });
	                    callback();
	                }, function () {
	                    BI.fire("sync_login_failure", {
	                        logintype: '3rd'
	                    });
	                });

	            }).failure(function (message, code) {
	                errHandler.showErrorMessage(code, message, view);

	                view.disableSubmit(false);
	                BI.fire("login_failure", {
	                    errorcode: code
	                });
	            });
	    },

	    __accountBind: function (data) {
	        BI.fire('3rd_login_bind_click', {
	            regtype: context.thirdEntry
	        });

	        this._oauthSubmit({
	            userName    : context.unameOfThird
	        }, null, function (message, code) {
	            // if (!__ISAPP__) {
	            //     controller.switchToView(actionEnum.LOGIN_THIRD_BIND);    
	            // }
	            errHandler.showErrorMessage(code, message, context.currentAction.view);
	        })
	    },


	    show: function (options) {
	        if (!options) {
	            return this.view.show();
	        }

	        var needChooseInterest = !options.UserTag;

	        if (options['Platform']) {
	            context.thirdEntry = options['Platform'];
	        }

	        if (options.IsBind) {
	            // If is bound, switch current flow to login flow.
	            if (false) {
	                // Ugly fixing 
	                // Unexpected ue that a 'blank page' will shown after receiving the account info
	                // Thus, showing login page as a workaround solution.
	                // controller.switchToView(actionEnum.LOGIN, null, true);

	                HJSDK.invoke('ui_loading', {action: 'show'});
	            }

	            context.currentFlow = flows.LOGIN;
	            APIs.syncLogin(options, function () {
	                BI.fire("sync_login_success", {
	                    logintype: '3rd'
	                });

	                context.setInterest = needChooseInterest;
	                if (needChooseInterest) {
	                    controller.switchToView(actionEnum.CATE_SELECT, true);
	                } else {
	                    controller.switchToView(actionEnum.LOGIN_TRANSFER);
	                }
	            }, function () {
	                BI.fire("sync_login_failure", {
	                    logintype: '3rd'
	                });
	            });
	        } else {
	            context.unameOfThird = options.Nick;            
	            this.view.show(options.Headimg, options.Nick, context.thirdEntry);
	        }
	    }
	});

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    APIs = __webpack_require__(119),
	    context = __webpack_require__(4),
	    BI = __webpack_require__(45),
	    settings = __webpack_require__(2),
	    errHandler = __webpack_require__(17);

	module.exports = {

	    _oauthSubmit: function (data, success, failure) {
	        var view = this.view;

	        BI.fire('3rd_login_register_new', {
	            regtype: context.thirdEntry
	        });

	        data.source = this._getSource();
	        data.randusername = settings.randUserName;
	        
	        // if (__ISAPP__) {
	        //     data.randusername = settings.randUserName
	        // }
	        

	        APIs.oauthRegister(data)
	            .success(function (d) {
	                //send BI infomation when register     
	                APIs.addRegInfo();
	                           
	                if(false) {
	                    //内容型应用直接进入最后一步
	                    HJSDK.invoke('ui_loading', {
	                        action: 'hide'
	                    });
	                    
	                    return success && success.call(null, d.Data);
	                }
	                
	                return controller.switchToView(actionEnum.LOGIN_THIRD_BIND_MOBILE, d.Data); 
	                
	                // var needChooseInterest = (d.Data.UserTag === null || !d.Data.UserTag.CategoryId),
	                //     callback = function () {
	                //         view.disableSubmit(false);
	                //         context.setInterest = needChooseInterest;
	                        
	                //         if (context.thirdEntry === 'weixin') {
	                //             return controller.switchToView(actionEnum.LOGIN_THIRD_SUCCESS);
	                //         }

	                //         if (needChooseInterest) {
	                //             controller.switchToView(actionEnum.CATE_SELECT, true);
	                //         } else {
	                //             controller.switchToView(actionEnum.LOGIN_TRANSFER);
	                //         }
	                //     };

	                // if (this.is_trial) d.Data.is_trial = true;

	                // d.Data.reg3rd = true;

	                // APIs.syncLogin(d.Data, function () {
	                //     BI.fire('sync_login_success', {
	                //         regtype: '3rd'
	                //     });
	                //     callback();
	                // }, function () {
	                //     BI.fire('sync_login_failure', {
	                //         regtype: '3rd'
	                //     });
	                // });

	            }).failure(function (message, code) {
	                failure && failure.call(null, message, code);
	            });
	    },

	    _getSource: function () {
	        if (typeof settings.source === 'string')
	            return settings.source;

	        if (typeof settings.source === 'function')
	            return settings.source();
	    }
	}

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions;

	controller.register(actionEnum.LOGIN_THIRD_SUCCESS, {

	    __continue: function () {
	        controller.redirect();
	    }
	});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    flows = __webpack_require__(1).flow,
	    settings = __webpack_require__(2),
	    thirdMixin = __webpack_require__(123);

	controller.register(actionEnum.RESETPWD_CHOOSE, [thirdMixin], {

	    __smsSelect: function () {
	        controller.switchToView(actionEnum.RESETPWD_SMS);
	    },

	    __emailSelect: function () {
	        controller.switchToView(actionEnum.RESETPWD_EMAIL);
	    },

	    __previous: function () {

	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToFlow(flows.LOGIN); // back to prev
	        }
	    }
	});

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    context = __webpack_require__(4),
	    APIs = __webpack_require__(119),
	    actionEnum = __webpack_require__(1).actions,
	    settings = __webpack_require__(2),
	    captcha = __webpack_require__(26),
	    errHandler = __webpack_require__(17),
	    formMixin = __webpack_require__(137);

	controller.register(actionEnum.RESETPWD_EMAIL, [formMixin], {

	    __previous: function () {

	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToFlow(actionEnum.RESETPWD_CHOOSE); // back to prev
	        }
	    },

	    __submit: function (data) {
	        data.token = captcha.token;

	        var view = this.view;
	        
	        APIs.findPwdByEmail(data).success(function (hash) {
	            context.email = data.email;
	            controller.switchToView(actionEnum.RESETPWD_EMAIL_VALIDATE);
	            
	        }).failure(function (message, code) {
	            errHandler.showErrorMessage(code, message, view);
	        });
	    },
	    
	    __checkNotExist: function (type, val, callback) {
	        APIs.checkNotExist(val, type).success(function () {
	            callback(true);
	        }).failure(function (message, data) {
	            callback(false, message);
	        });
	    }
	});

/***/ },
/* 137 */
/***/ function(module, exports) {

	module.exports = {}


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    context = __webpack_require__(4),
	    settings = __webpack_require__(2),
	    actionEnum = __webpack_require__(1).actions;

	controller.register(actionEnum.RESETPWD_EMAIL_VALIDATE, {

	    __previous: function () {
	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToFlow(actionEnum.RESETPWD_CHOOSE); // back to prev
	        }
	    },

	    __emailClick: function (link) {
	        // BI.fire('resetpwd_active_email');
	        //window.location.href = link;
	        if (false) {
	            HJSDK.invokeOriginally('navigator_openURL', {"url": link});
	        } else {
	            window.open(link);
	        }
	    },

	    show: function () {
	        this.view.show(context);
	    }
	});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    formMixin = __webpack_require__(137),
	    errHandler = __webpack_require__(17),
	    settings = __webpack_require__(2),
	    md5 = __webpack_require__(122),
	    APIs = __webpack_require__(119);

	controller.register(actionEnum.RESETPWD_RESET, [formMixin], {

	    __previous: function () {

	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToFlow(actionEnum.RESETPWD_CHOOSE); // back to prev
	        }
	    },

	    __submit: function (data) {
	        var view = this.view;
	        data.password = md5(data.password);
	        
	        APIs.updatePwd(data).success(function (hash) {
	            controller.switchToView(actionEnum.RESETPWD_SUCCESS);
	            view.reset();
	        }).failure(function (message, code) {
	            errHandler.showErrorMessage(code, message, view);
	            view.reset();
	        });
	    }
	});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    APIs = __webpack_require__(119),
	    actionEnum = __webpack_require__(1).actions,
	    formMixin = __webpack_require__(137),
	    errHandler = __webpack_require__(17),
	    settings = __webpack_require__(2),
	    smsMixin = __webpack_require__(141);

	controller.register(actionEnum.RESETPWD_SMS, [formMixin, smsMixin], {

	    init: function () {
	        this._initCaptcha();
	    },

	    __previous: function () {

	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToFlow(actionEnum.RESETPWD_CHOOSE); // back to prev
	        }
	    },


	    __submit: function (data) {
	        var view = this.view;
	        
	        APIs.findPwdByMobile(data).success(function (hash) {
	            var info = hash.Data;
	            controller.switchToView(actionEnum.RESETPWD_RESET, {
	                username: info.UserName
	            });
	        }).failure(function (message, code) {
	            errHandler.showErrorMessage(code, message, view);
	        });
	    },

	    __checkNotExist: function (type, val, callback) {
	        APIs.checkNotExist(val, type).success(function () {
	            callback(true);
	        }).failure(function (message, data) {
	            callback(false, message);
	        });
	    },

	    _initCaptcha: function () {
	        var self = this;
	        APIs.isShowRegisterCaptcha().success(function (data) {
	            if (data.Code !== 0) return;

	            var d = data.Data;
	            if (d.ResetByMobile) {
	                self.view._showCaptcha(true);
	                self.view._updateCaptcha();
	            }
	        });
	    }
	});

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var captcha = __webpack_require__(26),
	    APIs = __webpack_require__(119),
	    BI = __webpack_require__(45),
	    errHandler = __webpack_require__(17),
	    context = __webpack_require__(4),
	    settings = __webpack_require__(2);

	module.exports = {

	    __getMessageCode: function (data) {    
	        var view = this.view,
	            sendType;
	        BI.fire("register_mobile_sms");
	        
	        switch (context.currentFlow) {
	            case 'login-third': 
	                sendType = 'bindmobile';
	                BI.fire('3rd_login_telbind_getcode');
	                break;
	            case 'resetpwd':
	                sendType = 'reset';
	                break;
	            default :
	                sendType = 'register';
	                break;
	        }
	        
	        data.sendtype = sendType;
	        data.checkSafe = settings.checkSafe;
	        data.token = captcha.token;
	        APIs.sendMessage(data).failure(function (message, code) {
	            errHandler.showErrorMessage(code, message, view);
	        });
	    }
	}


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    settings = __webpack_require__(2),
	    flows = __webpack_require__(1).flow;

	controller.register(actionEnum.RESETPWD_SUCCESS, {

	    __toLogin: function(){
	        controller.switchToFlow(flows.LOGIN);
	    },

	    __previous: function () {

	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToFlow(flows.LOGIN); // back to prev
	        }
	    }
	});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    settings = __webpack_require__(2),
	    actionEnum = __webpack_require__(1).actions;
	//flows = require("../enum.js").flow;

	controller.register(actionEnum.RESETPWD_FAIL, {
	    __previous: function () {
	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToFlow(actionEnum.RESETPWD_CHOOSE); // back to prev
	        }
	    }
	});

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by chendafu@hujiang.com on 16/4/13.
	 */
	var controller = __webpack_require__(3),
	    actionEnum = __webpack_require__(1).actions,
	    flows = __webpack_require__(1).flow,
	    APIs = __webpack_require__(119),
	    settings = __webpack_require__(2),
	    cookie = __webpack_require__(121),
	    context = __webpack_require__(4),
	    BI = __webpack_require__(45),
	    CONST = __webpack_require__(28),
	    errHandler = __webpack_require__(17),
	    startTime;

	controller.register(actionEnum.REGISTER_SUCCESS_RENAME, {

	    init: function () {
	  
	    },

	    __changeUserName: function (data) {
	        var self = this;
	        
	        if (data.username === context.username) {
	            var oldData = {
	                Cookie: context.cookie,
	                ticket: context.ticket
	            };
	            if (false) {
	                HJSDK.invoke('ui_loading', {
	                    action: 'show'
	                });   
	            }
	            return self._changeUserNameSuccess(oldData)
	        }
	        
	        APIs.changeUserName({
	            newusername : data.username
	        }).success(function (d) {            
	            self._changeUserNameSuccess(d.Data);
	        }).failure(function (message, code) {
	            self._changeUserNameFailure(message, code);
	        });  
	    },
	    
	    _changeUserNameSuccess: function (data) {
	        var self = this;
	        
	        BI.fire('register_success_next', {
	            result: 'success'
	        })
	        
	        if (this.is_trial) data.is_trial = true;
	        
	        if (false) {
	            data.__rawpwd = context.passpord;
	        }
	        
	        APIs.syncLogin(data, function () {
	            BI.fire("sync_login_success", {
	                regtype: context.mobile ? 'mobile' : 'email'
	            });
	            
	            self.view._switchRegisterButtonState(false);
	            self._continue();
	        }, function () {
	            BI.fire("sync_login_failure", {
	                regtype: data.mobile ? 'mobile' : 'email'
	            });
	            
	            self.view._switchRegisterButtonState(false);
	        });
	        
	        
	    },
	    
	    _changeUserNameFailure: function (message, code) {
	        var view = this.view;
	        
	        BI.fire('register_success_next', {
	            result: 'failure'
	        })
	        errHandler.showErrorMessage(code, message, view);
	        
	        view._switchRegisterButtonState(false);
	    },

	    __checkExist: function (type, val, callback) {   
	        if (val === context.username) return callback(true);
	        
	        APIs.checkUserName(val, type).success(function () {
	            callback(true);
	        }).failure(function (message, data) {
	            callback(false, message);
	        });
	    },
	    
	    _continue: function () {
	        this.fireBI('duration')
	        
	        controller.redirect();
	    },
	    
	    fireBI: function (type) {
	       var regType = context.mobile? 'phone' : 'email';
	       
	       if (type === 'show') {
	            BI.fire('register_success_show', {
	                Regtype: regType
	            });
	            return startTime = +(new Date);
	       }
	       
	       if (type === 'duration') {
	           BI.fire('register_success_duration', {
	               Regtype : regType,
	               duration: +(new Date) - startTime
	           });
	           return;
	       }       
	    }, 

	    __previous: function () {
	        this.fireBI('duration');

	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToFlow(flows.LOGIN); // back to prev
	        }
	        
	    },
	    
	    show: function () {
	        
	        this.view.show(context);
	        
	        this.fireBI('show');
	    }

	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var controller = __webpack_require__(3),
	    flows = __webpack_require__(1).flow,
	    actionEnum = __webpack_require__(1).actions,
	    APIs = __webpack_require__(119),
	    captcha = __webpack_require__(26),
	    context = __webpack_require__(4),
	    settings = __webpack_require__(2),
	    BI = __webpack_require__(45),
	    errHandler = __webpack_require__(17),
	    smsMixin = __webpack_require__(141),
	    checkMixin = __webpack_require__(125),
	    oauthMixin = __webpack_require__(133),
	    cacheOptions;

	controller.register(actionEnum.LOGIN_THIRD_BIND_MOBILE, [smsMixin, checkMixin, oauthMixin], {
	    
	    init: function () {
	        this._initCaptcha();
	    },
	    
	    
	    __previous: function () {

	        BI.fire('3rd_login_bind_back', {
	            regtype: context.thirdEntry
	        });

	        if(settings.client === 'mobile') {
	            controller.historyBack();
	        } else {
	            controller.switchToView(actionEnum.LOGIN_THIRD); // back to prev
	        }
	    },
	    
	    __loginNoBind: function () {
	        BI.fire("3rd_login_telbind_pass");
	        
	        var data = cacheOptions;
	        this._syncLogin(data);
	    },
	    
	    _syncLogin: function (data) {
	        var self = this,
	            view = self.view;
	        
	        APIs.syncLogin(data, function () {
	            BI.fire("sync_login_success", {
	               logintype: '3rd' 
	            });
	            
	            view.disableSubmit(false);
	            
	            var needChooseInterest = data.UserTag === null;
	            context.setInterest = needChooseInterest;
	            
	            if (false) {
	                return controller.switchToView(actionEnum.LOGIN_TRANSFER); 
	            }
	            
	            if (context.thirdEntry === 'weixin') {
	                return controller.switchToView(actionEnum.LOGIN_THIRD_SUCCESS);
	            }

	            if (needChooseInterest) {
	                controller.switchToView(actionEnum.CATE_SELECT, true);
	            } else {
	                controller.switchToView(actionEnum.LOGIN_TRANSFER);
	            } 
	            
	        }, function () {
	            BI.fire("sync_login_failure", {
	                logintype: '3rd'
	            });
	        });
	            
	          
	    },

	    __submit: function (data) {
	        var self = this, 
	            view = self.view;
	        
	        APIs.bindMobile(data)
	            .success(function () {
	                BI.fire("3rd_login_telbind_vertify", {
	                   result: 'success' 
	                });
	                
	                self._syncLogin(cacheOptions);
	            }).failure(function (message, code) {
	                BI.fire("3rd_login_telbind_vertify", {
	                   result: 'failure' 
	                });
	                
	                errHandler.showErrorMessage(code, message, view);
	                
	                view.disableSubmit(false);
	            });
	    },
	    
	    _initCaptcha: function () {
	        var self = this;
	        self.view._renderCaptcha();
	    },
	    

	    show: function (options) {
	        var self = this;
	        cacheOptions = options;
	        
	        if (false) {
	            if (options['Platform']) {
	                context.thirdEntry = options['Platform'];
	            }

	            if (options.IsBind) {
	                // If is bound, switch current flow to login flow.
	                // if (__ISAPP__) {
	                //     // Ugly fixing 
	                //     // Unexpected ue that a 'blank page' will shown after receiving the account info
	                //     // Thus, showing login page as a workaround solution.
	                //     // controller.switchToView(actionEnum.LOGIN, null, true);

	                //     HJSDK.invoke('ui_loading', {action: 'show'});
	                // }

	                context.currentFlow = flows.LOGIN;
	                APIs.syncLogin(options, function () {
	                    BI.fire("sync_login_success", {
	                        logintype: '3rd'
	                    });

	                    controller.switchToView(actionEnum.LOGIN_TRANSFER);
	                }, function () {
	                    BI.fire("sync_login_failure", {
	                        logintype: '3rd'
	                    });
	                });
	            } else {
	                HJSDK.invoke('ui_loading', {action: 'hide'});
	                
	                this._oauthSubmit({
	                    userName    : options.Nick
	                }, function (data) {
	                    cacheOptions = data;
	                    self.view.show();
	                }, function (message, code) {
	                    history.back();   
	                    errHandler.showErrorMessage(code, message, context.currentAction.view);
	                })
	            }  
	        } else {
	            if (false) {
	                HJSDK.invoke('ui_loading', {action: 'hide'});
	            }
	            this.view.show();
	        }
	        
	        BI.fire("3rd_login_telbind_show");
	    }
	});

/***/ }
/******/ ]);