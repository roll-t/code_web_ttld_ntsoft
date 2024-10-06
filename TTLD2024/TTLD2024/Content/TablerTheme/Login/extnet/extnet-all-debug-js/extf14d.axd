/*
 * @version   : 4.2.2 - Ext.NET License
 * @author    : Object.NET, Inc. http://object.net/
 * @date      : 2017-06-19
 * @copyright : Copyright (c) 2008-2017, Object.NET, Inc. (http://object.net/). All rights reserved.
 * @license   : See license.txt and http://ext.net/license/.
 */

Ext.ns("Ext.net", "Ext.ux", "Ext.ux.plugins", "Ext.ux.layout");
Ext.net.Version = "4.2.2";

Ext.validIdRe = /^[a-z_][a-z0-9\-_\.]*$/i;
Ext.dom.Element.prototype.validIdRe = Ext.validIdRe;
Ext.mixin.Observable.prototype.validIdRe = Ext.validIdRe;
Ext.Component.prototype.validIdRe = Ext.validIdRe;
Ext.form.trigger.Trigger.prototype.validIdRe = Ext.validIdRe;

Ext.net.reconfigure = function (inst, initConfig, config) {
    var property,
        defaults = {},
        apply = false;

    if (initConfig) {
        for (property in config) {
            if (config.hasOwnProperty(property)) {
                if (typeof initConfig[property] === 'undefined') {
                    defaults[property] = config[property];
                    apply = true;
                }
            }
        }
    } else {
        defaults = config;
        apply = true;
    }

    if (apply) {
        var configurator = undefined;

        if (inst.getConfigurator) {
            configurator = inst.getConfigurator();
        } else if (inst.self && inst.self.getConfigurator) {
            configurator = inst.self.getConfigurator();
        }
        
        if (configurator) {
            configurator.reconfigure(inst, defaults);
        }
    }
};

// #496
Ext.Array.each(Ext.feature.tests, function(test) {
    if (test.name === "RightMargin") {
        test.fn = function(doc, div) {
            var view = doc.defaultView;

            if (Ext.isGecko) {
                return true;
            } else {
                return !(view && view.getComputedStyle(div.firstChild.firstChild, null).marginRight != '0px');
            }

            return true;

        }
    }

    if (test.name === "TransparentColor") {
        test.fn = function(doc, div) {
            var view = doc.defaultView;

            if (Ext.isGecko) {
                return true;
            } else {
                return !(view && view.getComputedStyle(div.lastChild, null).backgroundColor != 'transparent');
            }

            return true;
        }
    }
});

// @source core/ajax/Connection.js

Ext.data.Connection.override({
    // Do not replace with .callParent()
    setOptions: Ext.Function.createInterceptor(Ext.data.Connection.prototype.setOptions, function (options, scope) {
        if (options.json) {
            options.jsonData = options.params;
        }
        
        if (options.xml) {
            options.xmlData = options.params;
        }
    }),

    // Do not replace with .callParent()
    setupHeaders : Ext.Function.createInterceptor(Ext.data.Connection.prototype.setupHeaders, function (xhr, options, data, params) {
        if (options.json) {
            options.jsonData = options.params;
        }
        
        if (options.xml) {
            options.xmlData = options.params;
        }
    })
});

// @source core/ajax/Ajax.js

Ext.apply(Ext.dom.Element, {
    serializeForm : function (form, parentEl) {
	    var fElements = form.elements || (document.forms[form] || Ext.getDom(form)).elements,
	        hasSubmit = false,
	        hasValue,
		    encoder = encodeURIComponent,
		    element,
		    name,
		    data = [],
		    type,
		    submitDisabled = Ext.net && Ext.net.ResourceMgr && Ext.net.ResourceMgr.submitDisabled;

		hasSubmit = form.ignoreAllSubmitFields || false;

	    for (var i = 0; i < fElements.length; i++) {
		    element = fElements[i];
		    name = element.name;
		    type = element.type;
		    options = element.options;
		    
		    if (!Ext.isEmpty(parentEl) && Ext.isEmpty(Ext.fly(element).parent("#" + parentEl.id))) {
                continue;
            }

		    if ((!element.disabled || submitDisabled) && name) {
			    if (/select-(one|multiple)/i.test(type)) {
				    Ext.each(element.options, function (opt) {
					    if (opt.selected) {
						    hasValue = opt.hasAttribute ? opt.hasAttribute('value') : opt.getAttributeNode('value').specified; 
						    data.push(encoder(name));
						    data.push("=");
						    data.push(encoder(hasValue ? opt.value : opt.text));
						    data.push("&");
					    }
				    });
			    } else if (!/file|undefined|reset|button|radio/i.test(type)) {
				    if (!(/radio|checkbox/i.test(type) && !element.checked) && !(type == "submit" && hasSubmit)) {
					    data.push(encoder(name));
					    data.push("=");
					    data.push(encoder(element.value));
					    data.push("&");    
					    if (type == "submit") {
					        hasSubmit = /submit/i.test(type);
                        }
                    }
                }
            }
        }

	    data = data.join("");
        data = data.substr(0, data.length - 1);
        return data;
    }
});
// @source core/utils/DirectObservable.js

Ext.define('Ext.Configurator_override', {
    override: "Ext.Configurator",

    _initDirectEvents : function () {
        delete this._checkInitDirectEvents;
        if (this.directEvents) {
            
            if (!this.hasListeners) {// it might be for Plugins
                this.hasListeners = new this.HasListeners();
            }

            Ext.iterate(this.directEvents, function (name, e) {
                if (!Ext.isDefined(e.delay)) {
                    e.delay = 20;
                }

                if (e.delay <= 0) {
                    delete e.delay;
                }
                e.priority = -999;
            });
            this.addListener(this.directEvents);
            delete this.directEvents;
        }

        if (Ext.net && Ext.net.MessageBus) {
            Ext.net.MessageBus.initEvents(this);
        }
    },

    _addBusListener: function (ename, fn, scope, options, caller) {
        if (this._checkInitDirectEvents) {            
            Ext.Configurator.prototype._initDirectEvents.call(this);
        }

        var obj,
            name,
            config;

        if (typeof ename !== 'string') {
            obj = ename;
            for (name in obj) {
                config = obj[name];
                if (config.broadcastOnBus && !this.eventOptionsRe.test(name)) {
                    if (!config.fn) {
                        config.fn = this._generateBusFn(config);
                    }
                    else {
                        config.fn = Ext.Function.createSequence(config.fn, this._generateBusFn(config), config.scope || options.scope);
                    }

                    delete config.broadcastOnBus;
                }
            }

            return this._origAddListener(ename, fn, scope, options, caller);
        }
        else {
            if (options && options.broadcastOnBus)
            {
                if (!fn) {
                    fn = this._generateBusFn(options);
                }
                else {
                    fn = Ext.Function.createSequence(fn, this._generateBusFn(options), scope);
                }

                delete config.broadcastOnBus;
            }

            return this._origAddListener(ename, fn, scope, options, caller);
        }
    },

    _generateBusFn: function (options) {
        if (options && options.broadcastOnBus) {
            var parts = options.broadcastOnBus.split(":"),
                bus,
                name;

            if (parts.length == 1) {
                bus = Ext.net.Bus;
                name = parts[0];
            } else {
                bus = Ext.net.ResourceMgr.getCmp(parts[0]);
                name = parts[1];
            }

            fn = Ext.Function.bind(function () {
                var bus = arguments[arguments.length - 2],
                    name = arguments[arguments.length - 1],
                    options = arguments[arguments.length - 3],
                    data = arguments,
                    i,
                    len;

                if (!options.argumentsList) {
                    options = arguments[arguments.length - 4]
                }

                if (options && options.argumentsList) {
                    data = {};

                    for (i = 0, len = options.argumentsList.length; i < len; i++) {
                        data[options.argumentsList[i]] = arguments[i];
                    }
                }

                bus.publish(name, data);
            }, this, [bus, name], true);

            return fn;
        }
    }
});

Ext.Configurator.prototype.configure = Ext.Function.createInterceptor(Ext.Configurator.prototype.configure, function (instance, instanceConfig) {
    if (instance.isObservable && instance.addListener && !instance._generateBusFn) {
        instance._origAddListener = instance.addListener;
        
        if (!instance.eventOptionsRe) {
            instance.eventOptionsRe = /^(?:scope|delay|buffer|onFrame|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|element|destroyable|vertical|horizontal|priority)$/;
        }
        instance.addListener = this._addBusListener;
        instance._generateBusFn = this._generateBusFn;
    }
});

Ext.Configurator.prototype.configure = Ext.Function.createSequence(Ext.Configurator.prototype.configure, function (instance, instanceConfig) {
    if (instance.isObservable) {
        this._initDirectEvents.call(instance);
    }
});

Ext.mixin.Observable.override({
    constructor: function (config) {
        var me = this;

        if (me.isObservable && me.addListener && !me._generateBusFn) {
            me._origAddListener = me.addListener;
            me.addListener = Ext.Configurator.prototype._addBusListener;
            me._generateBusFn = Ext.Configurator.prototype._generateBusFn;

            if (!me.eventOptionsRe) {
                me.eventOptionsRe = /^(?:scope|delay|buffer|onFrame|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|element|destroyable|vertical|horizontal|priority)$/;
            }

            me._checkInitDirectEvents = true;            
        }

        this.callParent(arguments);
    }
});

// @source core/utils/Utils.js


Ext.isEmptyObj = function (obj) {
    if (typeof (obj) === "undefined" || obj === null) {
        return true;
    }

    if (!(!Ext.isEmpty(obj) && typeof obj == "object")) {
        return false;
    }

    for (var p in obj) {
        return false;
    }

    return true;
};

Ext.net.clone = function (o) {
    if (!o || "object" !== typeof o) {
        return o;
    }

    var c = "[object Array]" === Object.prototype.toString.call(o) ? [] : {},
        p,
        v;

    for (p in o) {
        if (o.hasOwnProperty(p)) {
            v = o[p];
            c[p] = (v && "object" === typeof v) ? Ext.net.clone(v) : v;
        }
    }

    return c;
};

Ext.net.on = function (target, eventName, handler, scope, mode, cfg) {
    var el = target;

    if (typeof target == "string") {
        el = Ext.get(target);
    }

    if (!Ext.isEmpty(el)) {
        if (mode && mode == "client") {
            el.on(eventName, handler.fn, scope, handler);
        } else {
            el.on(eventName, handler, scope, cfg);
        }
    }
};

Ext.net.lazyInit = function (controls) {
    if (!Ext.isArray(controls)) {
        return;
    }

    var cmp, i;

    for (i = 0; i < controls.length; i++) {
        cmp = Ext.getCmp(controls[i]);

        if (!Ext.isEmpty(cmp)) {
            window[controls[i]] = cmp;
        }
    }
};

// #671
Ext.net.getEl = function (el, skipDeep) {
    var cmp, tEl, validId;

    if (Ext.isEmpty(el, false)) {
        return null;
    }

    if (el.isComposite) {
        return el;
    }

    if (el.getEl) {
        return el.getEl();
    }

    if (el.el) {
        return el.el;
    }

    cmp = Ext.getCmp(el);

    if (!Ext.isEmpty(cmp)) {
        return cmp.getEl();
    }

    validId = Ext.isString(el) && Ext.validIdRe.test(el);

    if (validId) {
        tEl = Ext.get(el);
    }

    if (Ext.isEmpty(tEl) && skipDeep !== true) {
        if (validId) {
            tEl = Ext.get(el);

            if (tEl && tEl.dom) {
                return tEl;
            }
        }

        try {
            return Ext.net.getEl(eval("(" + el + ")"), true);
        } catch (e) { }
    }

    return tEl;
};

Ext.net.replaceContent = function (cmp, contentEl, html) {
    contentEl = Ext.net.getEl(contentEl);

    if (!Ext.isEmpty(contentEl)) {
        contentEl.remove();
    }

    var el = Ext.net.append(Ext.getBody(), html, null, true);

    el.removeCls(["x-hidden", "x-hidden-display"]);
    cmp.getContentTarget().dom.appendChild(el.dom);
};

Ext.net.replaceWith = function (config) {
    var id = Ext.String.format("el_{0}_container", config.id || ""),
        el = Ext.fly(id) || Ext.fly(config.id);

    if (!Ext.isEmpty(el)) {
        el.replaceWith({
            id: id,
            tag: "span"
        }).update(config.html, true);
    }
};

Ext.net.addTo = function (container, items, clear) {
    if (Ext.isString(container)) {
        var cmp = Ext.getCmp(container);

        if (!cmp) {
            cmp = Ext.net.ResourceMgr.getCmp(container);
        }

        container = cmp;
    }

    if (clear) {
        container.removeAll();
    }

    container.add(items);
};

Ext.net.renderTo = function (container, items) {
    if (Ext.isString(container)) {
        container = Ext.net.getEl(container);
    }

    Ext.each(items, function (item) {
        item.renderTo = container;

        Ext.ComponentManager.create(item);
    });
};

//private
Ext.net._renderTo = function (cfg, cmp) {
    if (cfg.mode == "item") {
        cfg.ct.insert(cfg.index, cmp);
    } else if (cfg.mode == "el") {
        if (Ext.isArray(cmp)) {
            Ext.each(cmp, function (c) {
                Ext.net._renderTo(cfg, c);
            });
        } else {
            cmp = Ext.ComponentManager.create(cmp);
            cmp.render(cfg.ct, cfg.position);
        }
    }
};

Ext.net.append = function (elTo, html, callback, wait) {
    html = html || "";

    var id = Ext.id(),
        me = this,
        dom = Ext.getDom(elTo),
        interval,
        createdEl,
        fn;

    fn = function () {
        if (wait) {
            if (!document.getElementById(id)) {
                return false;
            }
            clearInterval(interval);
        }
        var DOC = document,
            hd = DOC.getElementsByTagName("head")[0],
            re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,
            reStyle = /(?:<style([^>]*)?>)((\n|\r|.)*?)(?:<\/style>)/ig,
            reLink = /(?:<link([^>]*)?\/>)/ig,
            srcRe = /\ssrc=([\'\"])(.*?)\1/i,
            typeRe = /\stype=([\'\"])(.*?)\1/i,
            hrefRe = /\shref=([\'\"])(.*?)\1/i,
            match,
            attrs,
            hrefMatch,
            srcMatch,
            typeMatch,
            el,
            s;

        while ((match = reLink.exec(html))) {
            attrs = match[1];
            hrefMatch = attrs ? attrs.match(hrefRe) : false;

            if (hrefMatch && hrefMatch[2]) {
                s = DOC.createElement("link");
                s.href = hrefMatch[2];
                s.rel = "stylesheet";
                typeMatch = attrs.match(typeRe);

                if (typeMatch && typeMatch[2]) {
                    s.type = typeMatch[2];
                }

                hd.appendChild(s);
            }
        }

        while ((match = reStyle.exec(html))) {
            if (match[2] && match[2].length > 0) {
                Ext.net.ResourceMgr.registerCssClass("", match[2], false);
            }
        }

        while ((match = re.exec(html))) {
            attrs = match[1];
            srcMatch = attrs ? attrs.match(srcRe) : false;

            if (srcMatch && srcMatch[2]) {
                s = DOC.createElement("script");
                s.src = srcMatch[2];
                typeMatch = attrs.match(typeRe);

                if (typeMatch && typeMatch[2]) {
                    s.type = typeMatch[2];
                }

                hd.appendChild(s);
            } else if (match[2] && match[2].length > 0) {
                if (window.execScript) {
                    window.execScript(match[2]);
                } else {
                    window.eval.call(window, match[2]);
                }
            }
        }
        if (wait) {
            el = DOC.getElementById(id);

            if (el) {
                Ext.removeNode(el);
            }
        }
        Ext.callback(callback, me);
    };

    if (wait) {
        html += '<span id="' + id + '"></span>';
        interval = setInterval(fn, 20);
    }

    createdEl = Ext.DomHelper.append(elTo, html.replace(/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, "")
                                                   .replace(/(?:<style.*?>)((\n|\r|.)*?)(?:<\/style>)/ig, "")
                                                   .replace(/(?:<link([^>]*)?\/>)/ig, ""), true);
    if (!wait) {
        fn();
    }

    if (createdEl && createdEl.id == id) {
        createdEl = createdEl.prev();
    }

    return createdEl;
};

Ext.net.findField = function (name, scope) {
    if (Ext.isEmpty(name)) {
        return;
    }

    var cmp;

    if (scope) {
        if (!(scope.createForm && scope.getForm)) {
            scope = scope.up("form");
        }

        if (scope) {
            cmp = scope.down("field[name='" + name + "']");

            if (cmp && cmp.length > 0) {
                return cmp[0];
            }
        }
    }

    cmp = Ext.ComponentQuery.query("field[name='" + name + "']");

    if (cmp && cmp.length > 0) {
        return cmp[0];
    }

    return Ext.getCmp(name);
};

Ext.net.loadResources = function (cfg, callback, scope) {
    if (cfg && cfg['x.res']) {
        if (cfg['x.res'].ns) {
            Ext.ns.apply(Ext, cfg['x.res'].ns);
        }

        if (cfg['x.res'].res) {
            Ext.net.ResourceMgr.load(cfg['x.res'].res, function () {
                if (callback) {
                    Ext.callback(callback, scope, [cfg.config ? Ext.decode(cfg.config) : {}]);
                }
            });
        }
    }
    else {
        if (callback) {
            Ext.callback(callback, scope, [cfg.config || cfg || {}]);
        }
    }
};

Ext.net.widgetFactory = function (instanceName, isInstance, configFn) {
    var widgetCache,
        fn = function (addConfig, cache, merge) {
            if (cache && widgetCache) {
                return widgetCache;
            }
            var config = merge ? Ext.merge(configFn.call(this), addConfig || {}) :
                                 Ext.applyIf(addConfig || {}, configFn.call(this)),
                widget = isInstance ? Ext.create(instanceName, config) : config;

            if (cache) {
                widgetCache = widget;
                if (isInstance && widget.on) {
                    widget.on("destroy", function () {
                        widgetCache = null;
                    });
                }
            }
            else {
                if (widgetCache && Ext.isFunction(widgetCache.destroy)) {
                    widgetCache.destroy();
                }
                widgetCache = null;
            }

            return widget;
        };

    return fn;
};

Ext.net.define = function (name, fn) {
    if (!Ext.ClassManager.get(name)) {
        fn();
    }
}

if (typeof RegExp.escape !== "function") {
    RegExp.escape = function (s) {
        if ("string" !== typeof s) {
            return s;
        }

        return s.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, "\\$1");
    };
}

// @source core/net/StringUtils.js

Ext.net.StringUtils = function () {
    var _formatRe = /\{(\d+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
        _argRe = /(['"])(.*?)\1\s*(?:,|$)/g;

    return {
        format : function (format) {
            var args = Ext.Array.toArray(arguments, 1),
                fm = Ext.util.Format;

            return format.replace(_formatRe, function (m, idx, fn, fmArgs) {
                var replaceValue = args[parseInt(idx, 10)],
                    values,
                    match;

                if (fn) {
                    values = [replaceValue];

                    while (match = _argRe.exec(fmArgs)) {
                        values.push(match[2]);
                    }

                    return fm[fn].apply(fm, values);
                }

                return replaceValue;
            });
        },

        startsWith : function (str, value) {
            return str.match("^" + value) !== null;
        },

        endsWith : function (str, value) {
            return str.match(value + "$") !== null;
        }
    };
}();
Ext.util.Filter.override({
    // This has been overridden for GridFilters with remote filtering to send the filter's type and serialize a date with the submitFormat.
    serialize: function () {
        var result = this.getState(),
            serializer = this.getSerializer(),
            serialized;

        if (this.type) {
            result.type = this.type; // Added
        }

        delete result.id;
        delete result.serializer;
        
        if ((this.type === "date") && this.submitFormat) {
            result.value = Ext.Date.format(new Date(result.value), this.submitFormat); // Added
        } else {
            if (serializer) {
                serialized = serializer.call(this, result);
                if (serialized) {
                    result = serialized;
                }
            }
        }

        return result;
    },

    statics: {
        createFilterFn: function (filters) {
            if (!filters) {
                return Ext.returnTrue;
            }

            return function (candidate, scope) {
                var items = filters.isCollection ? filters.items : filters,
                    length = items.length,
                    match = true,
                    i, filter;

                for (i = 0; match && i < length; i++) {
                    filter = items[i];

                    if (Ext.isFunction(filter)) {
                        match = filter.call(scope, candidate);
                    }
                    else if (!filter.getDisabled()) {
                        match = filter.filter(candidate);
                    }
                }

                return match;
            };
        }
    }
});

// @source core/utils/History.js

Ext.History.initEx = function (config) {
    Ext.History.init();

    if (config.listeners) {
        Ext.History.addListener(config.listeners);
    }

    if (config.directEvents) {
        Ext.History.addListener(config.directEvents);
    }

    if (config.proxyId || config.id) {
        Ext.History.proxyId = config.proxyId || config.id;
    }
};
// @source core/utils/ClickRepeater.js

Ext.define("Ext.net.ClickRepeater", {
    extend : "Ext.util.ClickRepeater",
    ignoredButtons: [],
    btnEvents: {
        0 : "leftclick", 
        1 : "middleclick", 
        2 : "rightclick"
    },

    constructor : function (config) {
        this.callParent([config.el, config]);
    },
    
    enable : function () {
        if (this.disabled) {
            this.el.on("mousedown", this.handleMouseDown, this);
            
            if (Ext.isIE8) {
                this.el.on('dblclick', this.handleDblClick, this);
            }

            if ((this.preventDefault || this.stopDefault) && !this.isButtonIgnored(0)) {
                this.el.on("click", this.eventOptions, this);
            }
            
            if ((this.preventDefault || this.stopDefault) && !this.isButtonIgnored(2)) {
                this.el.on("contextmenu", this.eventOptions, this);
            }
        }
        this.disabled = false;
    },
    
    isButtonIgnored : function (e) {
        var ignored = false;
        Ext.each(this.ignoredButtons, function (b) {
            if (b == (e.button || e)) {
                ignored = true;
                return false;
            }
        }, this);
        
        return ignored;
    },
    
    handleMouseDown : function (e) {
        clearTimeout(this.timer);

        if (this.pressedCls) {
            this.el.addCls(this.pressedCls);
        }
        
        this.mousedownTime = new Date();

        Ext.getDoc().on("mouseup", this.handleMouseUp, this);
        this.el.on("mouseout", this.handleMouseOut, this);

        if (!this.isButtonIgnored(e)) {
            this.fireEvent("mousedown", this, e);
            this.fireClick(e);
        }

        if (this.accelerate) {
            this.delay = 400;
	    }
        
        this.timer = Ext.defer(this.click, this.delay || this.interval, this, [e]);

        if (this.mousedownPreventDefault) {
            e.preventDefault();
        }

        if (this.mousedownStopEvent) {
            e.stopEvent();
        }    
    },
    
    click : function (e) {
        if (!this.isButtonIgnored(e)) {
            this.fireClick(e);
        }

        this.timer =  Ext.defer(this.click, this.accelerate ?
            this.easeOutExpo(Ext.Date.getElapsed(this.mousedownTime),
                400,
                -390,
                12000) :
            this.interval, this, [e]);
    },
    
    fireClick : function (e) {        
        if (this.fireEvent("click", this, e) !== false) {
            this.fireEvent(this.btnEvents[e.button] || "click", this, e);
        }        
    },
    
    handleMouseUp : function (e) {
        clearTimeout(this.timer);
        this.el.un("mouseover", this.handleMouseReturn, this);
        this.el.un("mouseout", this.handleMouseOut, this);
        Ext.getDoc().un("mouseup", this.handleMouseUp, this);

        if (this.pressedCls) {
            this.el.removeCls(this.pressedCls);
        }
        
        if (!this.isButtonIgnored(e)) {
            this.fireEvent("mouseup", this, e);
        }
    }
});

// @source core/utils/Element.js

Ext.dom.Element.override({
    singleSelect: function (selector, unique) {
        return Ext.get(Ext.select(selector, unique).elements[0]);
    },

    setValue: function (val) {
        if (Ext.isDefined(this.dom.value)) {
            this.dom.value = val;
        }

        return this;
    },

    getValue: function (asNumber) {
        var value = this.dom.value;

        return Ext.isDefined(value) ? (asNumber ? parseInt(value, 10) : value) : null;
    },

    removeAttribute: function (attr) {
        this.dom.removeAttribute(attr);
    },

    removeStyleProperty: function (prop) {
        this.dom.style[Ext.isIE8m ? "removeAttribute" : "removeProperty"](prop);
    },

    getById: function (id, asDom) {
        if (Ext.isEmpty(id)) {
            return null;
        }

        return this.callParent(arguments);
    },

    is: function (selector) {
        var dom = this.dom,
            is,
            children,
            i,
            len;

        if (!selector) {
            // In Ext 4 is() called through to DomQuery methods, and would always
            // return true if the selector was ''.  The new query() method in v5 uses
            // querySelector/querySelectorAll() which consider '' to be an invalid
            // selector and throw an error as a result.  To maintain compatibility
            // with the various users of is() we have to return true if the selector
            // is an empty string.  For example: el.up('') should return the element's
            // direct parent.
            is = true;
        } else if (!dom.tagName) {
            // document and window objects can never match a selector
            is = false;
        } else if (Ext.isFunction(selector)) {
            is = selector(dom);
        } else if (dom[Ext.supports.matchesSelector]) { // #659
            is = dom[Ext.supports.matchesSelector](selector);
        } else if (document.documentElement[Ext.supports.matchesSelector]) { // #659
            is = document.documentElement[Ext.supports.matchesSelector].call(dom, selector); 
        } else if (Ext.isIE8) { // #728
            children = this.dom.parentNode.querySelectorAll(selector);
            len = children.length;
            is = false;

            for (i = 0; i < len; i++) {
                if (children[i] === dom) {
                    is = true;
                    break;
                }
            }
        } else { // There is a possibility that a check on selector fails.
            is = false;
            Ext.raise(Ext.String.format("The element '{0}' could not be ckecked on matching the selector", this.id));
        }

        return is;
    }
});

// @source core/utils/Format.js

Ext.util.Format.usMoneyTemp = Ext.util.Format.usMoney;

Ext.util.Format.usMoney = function (v) {
    return Ext.util.Format.usMoneyTemp(String(v).replace(/[^0-9.\-]/g, ""));
};

Ext.util.Format.euroMoney = function (v) {
    v = String(v).replace(/[^0-9.\-]/g, "");
    v = (Math.round((v - 0) * 100)) / 100;
    v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v + "0" : v);
    v = String(v);

    var ps = v.split('.'),
        whole = ps[0],
        sub = ps[1] ? ',' + ps[1] : ',00',
        r = /(\d+)(\d{3})/;

    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + '.' + '$2');
    }

    v = whole + sub;

    if (!Ext.util.Format.euroPrefix) {
        v += " &euro;";
    } else {
        v = "&euro; " + v;
    }

    return v;
};

Ext.util.Format.checkbox = function (v) {
    return Ext.grid.column.Check.prototype.defaultRenderer.call(null, v);
};

// @source core/utils/Mask.js

Ext.LoadMask.override({
    // Github issue #15. Remove after Sencha fix. Review all other "loadingText" appearances
    initComponent: function () {
        if (!Ext.isDefined(this.initialConfig.msg)) {
            this.msg = Ext.view.AbstractView.prototype.loadingText;
        }

        if (Ext.isEmpty(this.msg)) {
            this.msgCls = this.msgCls ? this.msgCls + " empty-loadmask" : "empty-loadmask"; // GitHub issue #449
        }

        this.callParent(arguments);
    },

    setZIndex: function (index) {
        var me = this,
            tmpIndex,
            owner = me.activeOwner;

        if (owner) {
            tmpIndex = parseInt(owner.el.getStyle('zIndex'), 10) + 1;

            if (Ext.isNumber(tmpIndex)) {
                index = tmpIndex;
            }
        }

        me.getMaskEl().setStyle('zIndex', index - 1);

        return me.mixins.floating.setZIndex.apply(me, arguments);
    }
});

Ext.net.Mask = function () {
    var instance,
        bmask,
        init = function () {
            bmask = Ext.getBody().createChild({
                cls: "x-page-mask",
                style: "top:0;left:0;z-index:20000;position:absolute;background-color:transparent,width:100%,height:100%,zoom:1;"
            })
                .enableDisplayMode("block")
                .hide();

            Ext.on('resize', function () {
                bmask.setSize(Ext.Element.getViewportWidth(false), Ext.Element.getViewportHeight(false));
                var scroll = Ext.getBody().getScroll();
                bmask.setStyle({
                    top: scroll.top + "px",
                    left: scroll.left + "px"
                });
            });
        };

    return {
        show: function (cfg) {
            this.hide();

            cfg = Ext.apply({
                msg: Ext.view.AbstractView.prototype.loadingText,
                msgCls: "x-mask-loading",
                el: Ext.getBody()
            }, cfg || {});

            if (cfg.el == Ext.getBody()) {
                if (Ext.isEmpty(bmask)) {
                    init();
                }

                Ext.getBody().addCls("x-masked");

                bmask.setSize(Ext.Element.getViewportWidth(false), Ext.Element.getViewportHeight(false)).show();
                var scroll = Ext.getBody().getScroll();
                bmask.setStyle({
                    top: scroll.top + "px",
                    left: scroll.left + "px"
                });
                cfg.el = bmask;
            } else {
                cfg.el = Ext.net.getEl(cfg.el);
            }

            cfg.el.mask(cfg.msg, cfg.msgCls);

            instance = cfg.el;

            return instance;
        },

        hide: function () {
            if (instance) {
                instance.unmask();
            }

            if (bmask) {
                Ext.getBody().removeCls("x-masked");
                bmask.hide();
            }

            if (Ext.getBody().isMasked() === true) {
                Ext.getBody().unmask();
            }
        }
    };
}();

// @source core/utils/TaskManager.js

Ext.net.TaskResponse = {
    stopTask: -1,
    stopAjax: -2
};

Ext.define("Ext.net.TaskManager", {
    extend: "Ext.util.Observable",

    constructor: function (config) {
        this.callParent(arguments);
        this.initManager();
    },

    getTasks: function () {
        return this.tasks;
    },

    initManager: function () {
        this.runner = new Ext.util.TaskRunner(this.interval || 10);

        var task;
        this.tasks = [];
        this.tasksConfig = this.tasksConfig || [];

        for (var i = 0; i < this.tasksConfig.length; i++) {
            task = this.createTask(this.tasksConfig[i]);
            this.tasks.push(task);

            if (task.autoRun) {
                Ext.Function.defer(this.startTask, this.autoRunDelay || 50, this, [task]);
            }
        }
    },

    addTask: function (taskConfig) {
        var task = this.createTask(taskConfig);
        this.tasks.push(task);

        if (task.autoRun) {
            this.startTask(task);
        }
    },

    removeTask: function (task) {
        task = this.getTask(task);
        if (!Ext.isEmpty(task)) {
            this.stopTask(task);
            Ext.Array.remove(this.tasks, task);
        }
    },

    getTask: function (id) {
        if (typeof id == "object") {
            return id;
        } else if (typeof id == "string") {
            for (var i = 0; this.tasks.length; i++) {
                if (this.tasks[i].id == id) {
                    return this.tasks[i];
                }
            }
        } else if (typeof id == "number") {
            return this.tasks[id];
        }
        return null;
    },

    startTask: function (task) {
        task = this.getTask(task);
        task.executing = true;

        if (task.onstart) {
            task.onstart.apply(task.scope || task);
        }

        this.runner.start(task);
    },

    stopTask: function (task) {
        this.runner.stop(this.getTask(task));
    },

    startAll: function () {
        for (var i = 0; i < this.tasks.length; i++) {
            this.startTask(this.tasks[i]);
        }
    },

    stopAll: function () {
        this.runner.stopAll();
    },

    //private
    createTask: function (config) {
        return Ext.apply({}, config, {
            owner: this,
            executing: false,
            interval: 1000,
            autoRun: true,
            waitPreviousRequest: false,

            onStop: function (t) {
                this.executing = false;

                if (this.onstop) {
                    this.onstop();
                }
                if (this._ts && this.owner.destroying) {
                    Ext.net.DirectEvent.abort(this._ts);
                }
            },

            onRemoteComplete: function () {
                delete this._ts;
                if (this.runOnComplete && this.executing) {
                    this.runOnComplete = false;
                    this.run();
                }

                if (!this.executing) {
                    this.runOnComplete = false;
                }
            },

            run: function () {
                if (!this.executing) {
                    return;
                }

                if (this.clientRun) {
                    var rt = this.clientRun.apply(arguments);

                    if (rt === Ext.net.TaskResponse.stopAjax) {
                        return;
                    } else if (rt === Ext.net.TaskResponse.stopTask) {
                        return false;
                    }
                }

                if (this.waitPreviousRequest && this._ts) {
                    this.runOnComplete = true;
                    return;
                }

                if (this.serverRun) {
                    var o = this.serverRun();
                    if (!o.alreadySetComplete) {
                        if (o.userComplete && Ext.isFunction(o.userComplete)) {
                            o.userComplete = Ext.Function.createSequence(o.userComplete, Ext.Function.bind(this.onRemoteComplete, this), this);
                        }
                        else {
                            o.userComplete = Ext.Function.bind(this.onRemoteComplete, this);
                        }
                        o.alreadySetComplete = true;
                    }
                    o.control = this.owner;
                    this._ts = Ext.net.DirectEvent.request(o);
                }
            }
        });
    },

    setTaskInterval: function (taskId, newInterval) {
        var task = this.getTask(taskId),
            restart = false;

        if (task.executing) {
            this.stopTask(task);
            restart = true;
        }

        task.interval = newInterval;

        if (restart) {
            this.startTask(task);
        }
    },

    destroy: function () {
        this.destroying = true;
        this.stopAll();
        Ext.net.ComponentManager.unregisterId(this);
        delete this.tasks;
        delete this.runner;
    }
});
// @source core/utils/VTypes.js

Ext.apply(Ext.form.VTypes, {
    daterange : function (val, field) {
        var date = field.parseDate(val),
            ct, end, start;

        if (date) {
            if (field.startDateField && (!this.dateRangeMax || (date.getTime() !== this.dateRangeMax.getTime())) && !this.startValidating) {
                ct = field.up('container');
                
                if (ct) {
                    start = ct.down('#' + field.startDateField);
                }

                if (!start) {
                    start = Ext.getCmp(field.startDateField)
                }

                this.dateRangeMax = date;
                start.setMaxValue(date);
                this.startValidating = true;
                start.validate();
                delete this.startValidating;
            } else if (field.endDateField && (!this.dateRangeMin || (date.getTime() !== this.dateRangeMin.getTime())) && !this.endValidating) {
                ct = field.up('container');
                
                if (ct) {
                    end = ct.down('#' + field.endDateField);
                }

                if (!end) {
                    end = Ext.getCmp(field.endDateField);
                }

                this.dateRangeMin = date;
                end.setMinValue(date);
                this.endValidating = true;
                end.validate();
                delete this.endValidating;
            }
        }
        
        
        return true;
    },

    daterangeText : 'Start date must be less than end date',

    password : function (val, field) {
        if (field.initialPassField) {
            var pwd = Ext.isString(field.initialPassField) ? (field.up('container') && field.up('container').down('#' + field.initialPassField) || Ext.getCmp(field.initialPassField)) : field.initialPassField;

            if (pwd) {
                if (pwd.processRawValue) {
                    return pwd ? (val === pwd.processRawValue(pwd.getRawValue())) : false;
                }
                else {
                    return pwd ? (val === pwd.getRawValue()) : false;
                }
            }

            return false;            
        }

        return true;
    },

    passwordText : "Passwords do not match",

    ipRegExp : /^([1-9][0-9]{0,1}|1[013-9][0-9]|12[0-689]|2[01][0-9]|22[0-3])([.]([1-9]{0,1}[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){2}[.]([1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/,

    ip : function (val, field) {
        return Ext.form.VTypes.ipRegExp.test(val);
    },

    ipText : "Invalid IP Address format"
});

// @source core/direct/DirectEvent.js

Ext.net.DirectEvent = new Ext.data.Connection();

Ext.net.DirectEvent.addListener({
    beforerequest: {
        fn: function (conn, options) {
            var o = options || {},
                key,
                obj;

            o.eventType = o.eventType || "event";
            o._paramsFn = {};

            var isInstance = o.eventType == "public",
                submitConfig = {},
                forms,
                aspForm;

            if (o.extraParams) {
                for (key in o.extraParams) {
                    if (o.extraParams.hasOwnProperty(key)) {
                        obj = o.extraParams[key];

                        if (obj === undefined) {
                            delete o.extraParams[key];
                        }
                        else if (Ext.isFunction(obj)) {
                            o._paramsFn[key] = o.extraParams[key];
                            o.extraParams[key] = obj.apply(o.control);
                        }
                    }
                }
            }
            else {
                o.extraParams = {};
            }

            switch (o.eventType) {
                case "event":
                case "bus":
                case "custom":
                case "proxy":
                case "postback":
                case "public":
                    if (isInstance) {
                        o.action = o.name;
                    }

                    if (Ext.net.ResourceMgr.isMVC) {
                        o.cleanRequest = true;
                    }

                    o.control = o.control || {};

                    if (o.control.usedSelectors && !o.control.isComponent && o.control.component && o.control.component.isComponent) {
                        o.control = o.control.component;
                    }


                    o.requestType = o.type || "submit"; // ExtJS 6 uses "type" for other purposes, so, used "requestType" instead of "type"
                    delete o.type;

                    o.viewStateMode = o.viewStateMode || "default";
                    o.action = o.action || "Click";
                    o.headers = Ext.apply(o.headers || {}, { "X-Ext-Net": "delta=true" });

                    if (o.control && o.control.beforeDirectEvent) {
                        o.control.beforeDirectEvent(o);
                    }

                    if (o.requestType == "submit") {
                        if (Ext.isFunction(o.formId)) {
                            o.form = o.formId.call(o.control);
                        } else if (o.formId) {
                            o.form = Ext.get(o.formId);

                            if (!o.form) {
                                o.form = Ext.net.ResourceMgr.getCmp(o.formId);
                            }
                        }

                        if (!Ext.isEmpty(o.form) && !Ext.isEmpty(o.form.id)) {
                            var cmp = Ext.getCmp(o.form.id);

                            if (!Ext.isEmpty(cmp) && cmp.getForm && cmp.submit) {
                                this.buildForm(o, cmp);
                            }
                        }

                        if (Ext.isEmpty(o.form) && !Ext.isEmpty(o.control.el)) {
                            if (Ext.isEmpty(o.control.isComposite) || o.control.isComposite === false) {
                                o.form = o.control.el.up("form");

                                if (Ext.isEmpty(o.form) && o.control.up) {
                                    var formPanel = o.control.up("form");

                                    if (!Ext.isEmpty(formPanel) && formPanel.getForm && formPanel.submit) {
                                        this.buildForm(o, formPanel);
                                    }
                                }
                            } else {
                                o.form = Ext.get(o.control.elements[0]).up("form");
                            }
                        }

                        if (Ext.isEmpty(o.form) && Ext.isEmpty(o.url) && !Ext.isEmpty(Ext.net.ResourceMgr.aspForm)) {
                            o.form = Ext.get(Ext.net.ResourceMgr.aspForm);
                        }

                        if (Ext.isEmpty(o.form) && o.control && o.control.alias == "widget.form") {
                            this.buildForm(o, o.control);
                        }

                        if (Ext.isEmpty(o.form) && o.control && Ext.isFunction(o.control.up)) {
                            var formCmp = o.control.up("form");

                            if (formCmp && Ext.isFunction(formCmp.getForm)) {
                                this.buildForm(o, formCmp);
                            }
                        }

                        if (o.isUpload && Ext.isEmpty(o.form)) {

                            o.form = Ext.get(Ext.DomHelper.append(Ext.getBody(), {
                                tag: 'form',
                                style: 'display:none'
                            }));

                            o.formCfg = {};
                            o.formCfg.form = o.form.dom;
                        }

                    } else if (o.requestType == "load") {
                        //o.method = "GET";
                        delete o.form;
                    }

                    if (Ext.isEmpty(o.form) && Ext.isEmpty(o.url)) {
                        if (!Ext.isEmpty(Ext.net.ResourceMgr.aspForm)) {
                            aspForm = Ext.getDom(Ext.net.ResourceMgr.aspForm);
                        }

                        if (aspForm) {
                            if (o.requestType == "submit") {
                                o.form = aspForm;
                            } else {
                                o.url = aspForm.action;
                            }
                        }
                    }

                    var argument = Ext.net.StringUtils.format("{0}|{1}|{2}", o.proxyId || (o.control.isStore ? o.control.getStoreId() : null) || o.control.proxyId || o.control.id || "-", o.eventType, o.action);

                    if (!Ext.isEmpty(o.form)) {
                        if (Ext.net.ResourceMgr.isMVC !== true) {
                            this.setValue(o.form.dom, "__EVENTTARGET", Ext.net.ResourceMgr.id);
                            this.setValue(o.form.dom, "__EVENTARGUMENT", argument);
                        }
                        Ext.getDom(o.form).ignoreAllSubmitFields = true;
                    } else {
                        o.url = o.url || Ext.net.ResourceMgr.url || window.location.href;
                        if (Ext.net.ResourceMgr.isMVC !== true) {
                            Ext.apply(submitConfig, {
                                __EVENTTARGET: Ext.net.ResourceMgr.id,
                                __EVENTARGUMENT: argument
                            });
                        }
                    }

                    if (o.viewStateMode != "default") {
                        Ext.apply(submitConfig, {
                            viewStateMode: o.viewStateMode
                        });
                    }

                    if (o.rethrowException) {
                        submitConfig.rethrowException = true;
                    }

                    if (o.before) {
                        if (o.before.call(o.scope || o.control || window, o.control, o.eventType, o.action, o.extraParams, o) === false) {
                            if (o.control && o.control.onDirectEventCancel) { // #874
                                o.control.onDirectEventCancel(o);
                            }

                            return false;
                        }
                    }

                    if (this.fireEvent("beforeajaxrequest", o.control, o.eventType, o.action, o.extraParams, o) === false) {
                        if (o.control && o.control.onDirectEventCancel) { // #874
                            o.control.onDirectEventCancel(o);
                        }

                        return false;
                    }

                    if (!Ext.isEmpty(o.extraParams) && !Ext.isEmptyObj(o.extraParams)) {
                        Ext.apply(submitConfig, {
                            extraParams: o.extraParams
                        });
                    }

                    if (!Ext.isEmpty(o.serviceParams)) {
                        Ext.apply(submitConfig, { serviceParams: o.serviceParams });
                    }

                    if (!Ext.isEmpty(submitConfig) && !Ext.isEmptyObj(submitConfig)) {
                        o.params = { submitDirectEventConfig: Ext.encode({ config: submitConfig }) };
                    } else {
                        o.params = {};
                    }

                    if (!Ext.isEmpty(o.form)) {
                        var enctype = Ext.getDom(o.form).getAttribute("enctype");

                        if ((enctype && enctype.toLowerCase() == "multipart/form-data") || o.isUpload) {
                            Ext.apply(o.params, { "__ExtNetDirectEventMarker": "delta=true" });
                        }
                    }

                    if (o.cleanRequest) {
                        o.params = Ext.apply({}, o.extraParams || {});

                        if (o.json) {
                            o.jsonData = o.params;
                            o.headers = Ext.apply(o.headers || {}, { Accept: 'application/json' });
                            if ((o.method || this.method) !== "GET") {
                                o.params = "";
                            }
                            o.json = false;
                        } else {
                            var ov,
                                encode = Ext.isBoolean(o.encode) ? o.encode : Ext.net.DirectEvent.encode;

                            if (encode) {
                                for (key in o.params) {
                                    ov = o.params[key];

                                    if (typeof ov == "object") {
                                        o.params[key] = Ext.encode(ov);
                                    }
                                }
                            } else {
                                o.params = Ext.Object.toQueryString(o.params, Ext.isBoolean(o.recursive) ? o.recursive : Ext.net.DirectEvent.recursive);
                            }
                        }
                    }

                    if (!Ext.isEmpty(o.form)) {
                        o.form.dom.action = o.form.dom.action || o.form.action || o.url || Ext.net.ResourceMgr.url || window.location.href;
                    }

                    break;
                case "static":
                    o.headers = {
                        "X-Ext-Net": "delta=true,staticmethod=true"
                    };

                    if (Ext.isEmpty(o.form) && Ext.isEmpty(o.url)) {
                        forms = Ext.select("form").elements;
                        o.url = (forms.length == 1 && !Ext.isEmpty(forms[0].action)) ? forms[0].action : Ext.net.ResourceMgr.url || window.location.href;
                    }

                    if (o.before) {
                        if (o.before.call(o.scope || o.control || window, o.eventType, o.action, o.extraParams) === false) {
                            if (o.control && o.control.onDirectEventCancel) { // #874
                                o.control.onDirectEventCancel(o);
                            }

                            return false;
                        }
                    }

                    if (this.fireEvent("beforeajaxrequest", o.control, o.eventType, o.action, o.extraParams, o) === false) {
                        if (o.control && o.control.onDirectEventCancel) { // #874
                            o.control.onDirectEventCancel(o);
                        }

                        return false;
                    }

                    o.params = Ext.apply(o.extraParams, { "_methodName_": o.name });
                    if (o.rethrowException) {
                        o.params._rethrowException_ = true;
                    }
                    break;
            }

            o.userScope = o.scope;
            o.scope = this;

            //--Common part----------------------------------------------------------

            if (o.disableControl && o.control && Ext.isFunction(o.control.disable)) {
                o.control.disable();
            }

            var el,
                em = o.eventMask || {},
                durationMessages = em.durationMessages || Ext.net.DirectEvent.durationMessages,
                showDurationMessages = Ext.net.DirectEvent.forbidDurationMessages !== true && durationMessages && durationMessages.length > 0 &&
                                    ((em.showDurationMessages === true) || (Ext.net.DirectEvent.showDurationMessages && !Ext.isDefined(em.showDurationMessages)));

            if (em.showMask === true || showDurationMessages) {
                if (!Ext.isEmpty(em.customTarget, false) && Ext.isEmpty(em.target, false)) {
                    em.target = "customtarget";
                }
                switch (em.target || "page") {
                    case "this":
                        if (o.control.getEl) {
                            el = o.control.getEl();
                        } else if (o.control.dom) {
                            el = o.control;
                        }

                        break;
                    case "body":
                        if (o.control.body) {
                            el = o.control.body;
                        }
                        else if (o.control.getEl) {
                            el = o.control.getEl();
                        } else if (o.control.dom) {
                            el = o.control;
                        }

                        break;
                    case "parent":
                        if (o.control.getEl) {
                            el = o.control.getEl().parent();
                        } else if (o.control.parent) {
                            el = o.control.parent();
                        }

                        break;
                    case "page":
                        var theHeight = "100%";

                        if (window.innerHeight) {
                            theHeight = window.innerHeight + "px";
                        } else if (document.documentElement && document.documentElement.clientHeight) {
                            theHeight = document.documentElement.clientHeight + "px";
                        } else if (document.body) {
                            theHeight = document.body.clientHeight + "px";
                        }

                        Ext.getBody().addCls("x-masked");

                        el = Ext.getBody().createChild({
                            cls: "x-page-mask",
                            style: "position:absolute;left:0;top:0;width:100%;height:" + theHeight + ";z-index:20000;background-color:Transparent;"
                        });

                        var scroll = Ext.getBody().getScroll();
                        el.setLeft(scroll.left).setTop(scroll.top);
                        break;
                    case "customtarget":
                        var trg = em.customTarget || "";

                        if (Ext.isFunction(trg)) {
                            el = Ext.net.getEl(trg.call(o.control));
                        }
                        else {
                            el = Ext.net.getEl(trg);

                            if (Ext.isEmpty(el)) {
                                el = trg.getEl ? trg.getEl() : null;
                            }

                            if (!el && o.control.el) {
                                try {
                                    el = o.control.el.down(trg);
                                } catch (e) { }
                            }

                            if (!el) {
                                try {
                                    el = Ext.select(trg);
                                } catch (e) { }
                            }
                        }

                        break;
                }

                if (!Ext.isEmpty(el)) {
                    if (em.showMask === true) {
                        var msg = Ext.isDefined(em.msg) ? em.msg : Ext.view.AbstractView.prototype.loadingText,
                            msgCls = em.msgCls || Ext.LoadMask.prototype.msgCls;

                        if (Ext.isEmpty(msg)) {
                            msgCls += " empty-eventmask"; // GitHub issue #449
                        }

                        if (em.useMsg !== false) {
                            el.mask(msg, msgCls);
                        } else {
                            el.mask();
                        }

                        o.maskEl = el;
                    }

                    if (showDurationMessages) {
                        o.maskEl = el;
                        durationMessages = Ext.Array.clone(durationMessages);
                        durationMessages.sort(function (a, b) {
                            return a.duration < b.duration ? -1 : 1;
                        });
                        o.durationMessagesTask = new Ext.util.DelayedTask(function (durationMessages) {
                            var o = this,
                                current = durationMessages[0],
                                next = durationMessages[1],
                                next,
                                msg,
                                msgCls,
                                maskEl,
                                maskDiv,
                                prevHeight, prevWidth, curHeight, curWidth,
                                fixAttempts = 0, maxAttempts = 5;

                            if (current && current.message) {
                                msg = current.message;

                                maskEl = o.maskEl;
                                if (!maskEl.isMasked()) {
                                    msgCls = o.eventMask ? (o.eventMask.msgCls || Ext.LoadMask.prototype.msgCls) : Ext.LoadMask.prototype.msgCls;
                                    maskEl.mask(msg, msgCls);
                                } else {
                                    maskEl.down("div.x-mask-msg-text").update(msg);

                                    maskDiv = maskEl.down("div.x-mask-msg");

                                    // Try to center the mask until the centering attempt stop changing the mask's
                                    // dimensions. Gives up after 5 attempts.
                                    // This re-center requirement behavior can be reproduced in the test case for
                                    // issue #1312.
                                    while (fixAttempts <= maxAttempts) {
                                        prevHeight = maskDiv.getHeight();
                                        prevWidth = maskDiv.getWidth();

                                        // Always center the mask message on the masked element
                                        maskDiv.center(o.maskEl);

                                        curHeight = maskDiv.getHeight();
                                        curWidth = maskDiv.getWidth();

                                        if (curHeight == prevHeight && curWidth == prevWidth) {
                                            break; // will relieve from the loop
                                        }

                                        fixAttempts++; // count how many attempts failed
                                    }

                                    // Emit a warning message to console if trying 5 times weren't enough to
                                    // successfully center the message.
                                    if (fixAttempts > maxAttempts) {
                                        Ext.log.warn("DirectEvent Duration messages: " + maxAttempts +
                                            " mask center attempts resulted in different positioning/size " +
                                            "of the mask message! Given up centering.");
                                    }
                                }
                            }

                            if (next && next.message) {
                                o.durationMessagesTask.delay(next.duration - current.duration);
                            }

                            Ext.Array.remove(durationMessages, current);
                        }, o, [durationMessages]);

                        o.durationMessagesTask.delay(durationMessages[0].duration);
                    }
                }
            }

            o.failure = this.requestFailureHandler;
            o.success = this.requestSuccessHandler;
            o.url = Ext.net.ResourceMgr.resolveUrl(o.url);
        }
    }
});


Ext.apply(Ext.net.DirectEvent, {
    autoAbort: false,
    
    confirmTitle: "Confirmation",
    
    confirmMessage: "Are you sure?",
    showDurationMessages: true,

    // true to encode the parameters
    encode: true,

    // true to a recursive call of Ext.Object.toQueryString on preparation of request's parameters.
    // Applicable only if encode is false.
    recursive: false,

    confirmRequest: function (directEventConfig) {
        directEventConfig = directEventConfig || {};

        if (Ext.isFunction(directEventConfig.success)) {
            directEventConfig.userSuccess = directEventConfig.success;
            delete directEventConfig.success;
        }

        if (Ext.isFunction(directEventConfig.failure)) {
            directEventConfig.userFailure = directEventConfig.failure;
            delete directEventConfig.failure;
        }

        if (Ext.isFunction(directEventConfig.complete)) {
            directEventConfig.userComplete = directEventConfig.complete;
            delete directEventConfig.complete;
        }

        if (directEventConfig.confirmation && directEventConfig.confirmation.confirmRequest) {
            if (directEventConfig.confirmation.beforeConfirm && directEventConfig.confirmation.beforeConfirm(directEventConfig) === false) {
                Ext.net.DirectEvent.request(directEventConfig);
                return;
            }

            Ext.Msg.confirm(
                directEventConfig.confirmation.title || this.confirmTitle,
                directEventConfig.confirmation.message || this.confirmMessage,
                Ext.Function.bind(this.confirmAnswer, this, [directEventConfig], true),
                this);
        } else {
            Ext.net.DirectEvent.request(directEventConfig);
        }
    },

    confirmAnswer: function (btn, text, buttonConfig, directEventConfig) {
        if (btn == "yes") {
            Ext.net.DirectEvent.request(directEventConfig);
        }
        if (btn == "no" && directEventConfig.confirmation.cancel) {
            directEventConfig.confirmation.cancel(directEventConfig);
        }
    },

    serializeForm: function (form) {
        return Ext.lib.Ajax.serializeForm(form);
    },

    setValue: function (form, name, value) {
        Ext.net.ResourceMgr.initAspInputs();

        var input = null,
            pe,
            els = Ext.fly(form).select("input[name=" + name + "]");

        if (els.getCount() > 0) {
            input = els.elements[0];
        } else {
            input = document.createElement("input");
            input.setAttribute("name", name);
            input.setAttribute("type", "hidden");
        }

        input.setAttribute("value", value);

        pe = input.parentElement ? input.parentElement : input.parentNode;

        if (Ext.isEmpty(pe)) {
            form.appendChild(input);
        }
    },

    delayedF: function (el, remove) {
        if (!Ext.isEmpty(el)) {
            el.unmask();

            if (remove === true) {
                el.remove();
                Ext.getBody().removeCls("x-masked");
            }
        }
    },

    showFailure: function (response, errorMsg) {
        response = response || {};
        var bodySize = Ext.getBody().getViewSize(),
            width = (bodySize.width < 500) ? bodySize.width - 50 : 500,
            height = (bodySize.height < 300) ? bodySize.height - 50 : 300,
            win;

        if (Ext.isEmpty(errorMsg)) {
            errorMsg = response.responseText;
        }

        win = new Ext.window.Window({
            modal: true,
            width: width,
            height: height,
            title: "Request Failure",
            layout: "fit",
            maximizable: true,
            items: [{
                xtype: "container",
                layout: {
                    type: "vbox",
                    align: "stretch"
                },
                items: [
                    {
                        xtype: "container",
                        height: 42,
                        layout: "absolute",
                        defaultType: "label",
                        items: [
                            {
                                xtype: "component",
                                x: 5,
                                y: 5,
                                html: '<div class="x-message-box-error" style="width:32px;height:32px"></div>'
                            },
                            {
                                x: 42,
                                y: 6,
                                html: "<b>Status Code: </b>"
                            },
                            {
                                x: 125,
                                y: 6,
                                text: response.status
                            },
                            {
                                x: 42,
                                y: 25,
                                html: "<b>Status Text: </b>"
                            },
                            {
                                x: 125,
                                y: 25,
                                text: response.statusText
                            }
                        ]
                    },
                    {
                        flex: 1,
                        itemId: "__ErrorMessageEditor",
                        xtype: "htmleditor",
                        value: errorMsg,
                        readOnly: true,
                        enableAlignments: false,
                        enableColors: false,
                        enableFont: false,
                        enableFontSize: false,
                        enableFormat: false,
                        enableLinks: false,
                        enableLists: false,
                        enableSourceEdit: false
                    }
                ]
            }]
        });

        win.show();
    },

    parseResponse: function (response, options) {
        var text = response.responseText,
            result = {},
            tmpResult,
            exception = false;

        result.success = true;

        try {
            if (/^<\?xml/.test(text)) {
                //xml parsing
                var xmlData = response.responseXML,
                    root = xmlData.documentElement || xmlData,
                    q = Ext.DomQuery;

                if (root.nodeName == "DirectResponse") {
                    //root = q.select("DirectResponse", root);
                    //success
                    var sv = q.selectValue("Success", root, true),
                        pSuccess = sv !== false && sv !== "false",
                        pErrorMessage = q.selectValue("ErrorMessage", root, ""),
                        pScript = q.selectValue("Script", root, ""),
                        pViewState = q.selectValue("ViewState", root, ""),
                        pViewStateEncrypted = q.selectValue("ViewStateEncrypted", root, ""),
                        pEventValidation = q.selectValue("EventValidation", root, ""),
                        pServiceResponse = q.selectValue("ServiceResponse", root, ""),
                        pUserParamsResponse = q.selectValue("ExtraParamsResponse", root, ""),
                        pResult = q.selectValue("Result", root, "");

                    if (!Ext.isEmpty(pSuccess)) {
                        Ext.apply(result, { success: pSuccess });
                    }

                    if (!Ext.isEmpty(pErrorMessage)) {
                        Ext.apply(result, { errorMessage: pErrorMessage });
                    }

                    if (!Ext.isEmpty(pScript)) {
                        Ext.apply(result, { script: pScript });
                    }

                    if (!Ext.isEmpty(pViewState)) {
                        Ext.apply(result, { viewState: pViewState });
                    }

                    if (!Ext.isEmpty(pViewStateEncrypted)) {
                        Ext.apply(result, { viewStateEncrypted: pViewStateEncrypted });
                    }

                    if (!Ext.isEmpty(pEventValidation)) {
                        Ext.apply(result, { eventValidation: pEventValidation });
                    }

                    if (!Ext.isEmpty(pServiceResponse)) {
                        Ext.apply(result, { serviceResponse: eval("(" + pServiceResponse + ")") });
                    }

                    if (!Ext.isEmpty(pUserParamsResponse)) {
                        Ext.apply(result, { extraParamsResponse: eval("(" + pUserParamsResponse + ")") });
                    }

                    if (!Ext.isEmpty(pResult)) {
                        Ext.apply(result, { result: eval("(" + pResult + ")") });
                    }

                    return {
                        result: result,
                        exception: false
                    };
                } else {
                    return {
                        result: response.responseXML,
                        exception: false
                    };
                    // root.text || root.textContent;
                }
            }

            result = eval("(" + text + ")");

        } catch (e) {
            result.success = false;
            exception = true;

            if (response.responseText.length === 0) {
                result.errorMessage = "NORESPONSE";
            } else {
                result.errorMessage = "BADRESPONSE: " + e.message;
                result.responseText = response.responseText;
            }

            response.statusText = result.errorMessage;
        }

        if (result && result.d) {
            result = result.d;

            if (Ext.isString(result) && options.isDirectMethod !== true) {
                tmpResult = Ext.decode(result, true);
                if (!tmpResult) {
                    result = {
                        script: result
                    };
                }
                else {
                    result = tmpResult;
                }
            }
        }

        return {
            result: result,
            exception: exception
        };
    },

    cacheBusterCheck: function (o) {
        var method = o.method || this.method || ((o.params || o.xmlData || o.jsonData || o.form) ? "POST" : "GET"),
            url = o.url || this.url,
            form = Ext.getDom(o.form);

        if (form) {
            url = url || form.action;
        }

        if (method === "POST" && (this.disableCaching && o.disableCaching !== false)) {
            if (Ext.isFunction(url)) {
                url = url.call(o.scope || "window", o);
            }

            var dcp = o.disableCachingParam || this.disableCachingParam;
            o.url = Ext.net.ResourceMgr.resolveUrl(Ext.urlAppend(url, dcp + '=' + (new Date().getTime())));
        }
    },

    buildForm: function (o, cmp) {
        o.formCfg = {};
        o.formCfg.action = Ext.ClassManager.instantiateByAlias('formaction.standardsubmit', { form: cmp.getForm() });
        o.formCfg.action.submitEmptyText = false;
        o.formCfg.form = o.formCfg.action.buildForm().formEl;
        o.form = Ext.get(o.formCfg.form);
    },

    requestSuccessHandler: function (response, options) {
        var o = options;

        this.removeMask(o);

        if (o.disableControl && o.control && Ext.isFunction(o.control.enable)) {
            o.control.enable();
        }

        var parsedResponse = o.scope.parseResponse(response, options);

        if (!Ext.isEmpty(parsedResponse.result.documentElement)) {
            this.executeScript(o, parsedResponse.result, response);
            return;
        }

        var result = parsedResponse.result,
            exception = parsedResponse.exception;

        if (o.control && o.control.afterDirectEvent) {
            o.control.afterDirectEvent(o, response, result);
        }

        if (result.success === false) {
            if (this.fireEvent("ajaxrequestexception", response, result, o.control, o.eventType, o.action, o.extraParams, o) === false) {
                o.cancelFailureWarning = true;
            }

            if (o.userFailure) {
                o.userFailure.call(o.userScope || o.control || window, response, result, o.control, o.eventType, o.action, o.extraParams, o);
            } else {
                if (o.showWarningOnFailure !== false && !o.cancelFailureWarning) {
                    var errorMsg = "";
                    if (!exception && result.errorMessage && result.errorMessage.length > 0) {
                        errorMsg = result.errorMessage;
                    }
                    o.scope.showFailure(response, errorMsg);
                }
            }

            if (o.userComplete) {
                o.userComplete.call(o.userScope || o.control || window, false, response, result, o.control, o.eventType, o.action, o.extraParams, o);
            }

            return;
        }

        if (!Ext.isEmpty(result.viewState) && o.form !== null) {
            o.scope.setValue(o.form.dom, "__VIEWSTATE", result.viewState);
            delete result.viewState;

            if (!Ext.isEmpty(result.viewStateEncrypted) && o.form !== null) {
                o.scope.setValue(o.form.dom, "__VIEWSTATEENCRYPTED", result.viewStateEncrypted);
                delete result.viewStateEncrypted;
            }

            if (!Ext.isEmpty(result.eventValidation) && o.form !== null) {
                o.scope.setValue(o.form.dom, "__EVENTVALIDATION", result.eventValidation);
                delete result.eventValidation;
            }
        }

        this.executeScript(o, result, response);
    },

    requestFailureHandler: function (response, options) {
        var o = options;

        this.removeMask(o);

        if (o.disableControl && o.control && Ext.isFunction(o.control.enable)) {
            o.control.enable();
        }

        if (o.control && o.control.afterDirectEvent) {
            o.control.afterDirectEvent(o, response);
        }

        if (this.fireEvent("ajaxrequestexception", response, { "errorMessage": response.statusText }, o.control, o.eventType, o.action, o.extraParams, o) === false) {
            o.cancelFailureWarning = true;
        }

        if (o.userFailure) {
            o.userFailure.call(o.userScope || o.control || window, response, { "errorMessage": response.responseText }, o.control, o.eventType, o.action, o.extraParams, o);
        } else if (o.showWarningOnFailure !== false && !o.cancelFailureWarning) {
            o.scope.showFailure(response, "");
        }

        if (o.userComplete) {
            o.userComplete.call(o.userScope || o.control || window, false, response, { "errorMessage": response.statusText }, o.control, o.eventType, o.action, o.extraParams, o);
        }
    },

    removeMask: function (o) {
        if (o.maskEl !== undefined && o.maskEl !== null) {
            var delay = 0,
                em = o.eventMask || {},
                remove,
                task;

            if (em && em.minDelay) {
                delay = em.minDelay;
            }

            remove = (em.target || "page") == "page";

            task = new Ext.util.DelayedTask(this.removeMaskDelay, o.scope, [o, remove]).delay(delay);
        }

        if (o.durationMessagesTask) {
            o.durationMessagesTask.cancel();
        }
    },

    removeMaskDelay: function (o, remove) {
        o.scope.delayedF(o.maskEl, remove);
    },

    executeScript: function (o, result, response) {
        var delay = 0,
            em = o.eventMask || {};

        if (em.minDelay) {
            delay = em.minDelay;
        }

        if (delay > 0) {
            var task = new Ext.util.DelayedTask(this.executeScriptDelay, o.scope, [o, result, response]).delay(delay);
        } else {
            this.executeScriptDelay.call(o.scope, o, result, response);
        }
    },

    executeScriptDelay: function (o, result, response) {
        if (result.script && result.script.length > 0) {
            if (window.execScript) {
                window.execScript(result.script);
            } else {
                window.eval.call(window, result.script);
            }
        }

        this.fireEvent("ajaxrequestcomplete", response, result, o.control, o.eventType, o.action, o.extraParams, o);

        if (o.userSuccess) {
            o.userSuccess.call(o.userScope || o.control || window, response, result, o.control, o.eventType, o.action, o.extraParams, o);
        }

        if (o.userComplete) {
            o.userComplete.call(o.userScope || o.control || window, true, response, result, o.control, o.eventType, o.action, o.extraParams, o);
        }
    }
});

Ext.net.DirectEvent.request = Ext.Function.createSequence(Ext.net.DirectEvent.request, function (o) {
    if (!Ext.isEmpty(o.form) && Ext.net.ResourceMgr.isMVC !== true) {
        this.setValue(o.form.dom, "__EVENTTARGET", "");
        this.setValue(o.form.dom, "__EVENTARGUMENT", "");
    }

    if (o.formCfg) {
        Ext.removeNode(o.formCfg.form);
        delete o.formCfg;
    }

    if (!Ext.isEmptyObj(o._paramsFn)) {
        Ext.apply(o.extraParams, o._paramsFn);
        delete o._paramsFn;
    }

    if (o.after) {
        o.after.call(o.userScope || o.control || window, o.control, o.eventType, o.action, o.extraParams, o);
    }
});

Ext.net.directRequest = Ext.bind(Ext.net.DirectEvent.confirmRequest, Ext.net.DirectEvent);

// @source core/direct/DirectMethod.js

Ext.net.DirectMethod = {
    request : function (name, options) {
        options = options || {};

        if (typeof options !== "object") {
            
            throw { message : "The DirectMethod options object is an invalid type: typeof " + typeof options };
        }

        var obj,
            encode;

        if (!Ext.isEmpty(name) && typeof name === "object") {
            options = name;
        }

        encode = Ext.isBoolean(options.encode) ? options.encode : Ext.net.DirectEvent.encode;
        
        if (options.params && options.json !== true && encode !== false) {
            for (var key in options.params) {
                if (options.params.hasOwnProperty(key)) {
                    obj = options.params[key];

                    if (obj === undefined) {
                        delete options.params[key];
                    }
                    else if (obj && typeof obj === "object") {
                        options.params[key] = Ext.encode(obj);
                    }
                }
            }
        }

        obj = {
            name                 : options.cleanRequest ? undefined : (options.name || name),
            cleanRequest         : options.cleanRequest,
            url                  : Ext.net.ResourceMgr.resolveUrl(options.url),
            control              : Ext.isEmpty(options.control) ? null : { id : options.control },
            eventType            : options.specifier || "public",
            requestType          : options.type || "submit",
            method               : options.method || "POST",
            eventMask            : options.eventMask,
            extraParams          : options.params,
            directMethodSuccess  : options.success,
            directMethodFailure  : options.failure,
            directMethodComplete : options.complete,
            viewStateMode        : options.viewStateMode,
            isDirectMethod       : true,
            encode               : encode,
            recursive            : Ext.isBoolean(options.recursive) ? options.recursive : Ext.net.DirectEvent.recursive,
            userSuccess          : function (response, result, control, eventType, action, extraParams, o) {
                if (o.successSeq) {
                    o.successSeq.call(o.userScope || o, response, result, control, eventType, action, extraParams, o);
                }
                
                result = !Ext.isDefined(result.result) ? (result.d || result) : result.result;
                
                if (!Ext.isEmpty(o.directMethodSuccess)) {
                    o.directMethodSuccess.call(o.userScope || o, result, response, extraParams, o);
                }
                
                if (!Ext.isEmpty(o.directMethodComplete)) {
                    o.directMethodComplete.call(o.userScope || o, true, result, response, extraParams, o);
                }
            },
            userFailure          : function (response, result, control, eventType, action, extraParams, o) {
                if (o.failureSeq) {
                    o.failureSeq.call(o.userScope || o, response, result, control, eventType, action, extraParams, o);
                }

                if (!Ext.isEmpty(o.directMethodFailure)) {
                    o.directMethodFailure.call(o.userScope || o, result.errorMessage, response, extraParams, o);
                } else if (o.showFailureWarning !== false && o.cancelFailureWarning !== true) {
                    Ext.net.DirectEvent.showFailure(response, result.errorMessage);
                }
                
                if (!Ext.isEmpty(o.directMethodComplete)) {
                    o.directMethodComplete.call(o.userScope || o, false, result.errorMessage, response, extraParams, o);
                }
            }
        };

        return Ext.net.DirectEvent.request(Ext.apply(options, obj));
    }
};

// @source core/net/ResourceMgr.js

Ext.net.ResourceMgr = function () {
    return {
        id    : "",
        url   : "",
        theme : "blue",
        quickTips       : true,
        cssClasses      : {},
        cssIcons        : {},
        submitDisabled  : true,
        BLANK_IMAGE_URL : "",
        aspInputs       : [],
        ns : "App",
        
        initAspInputs : function (inputs) {
            if (this.inputsInit || this.isMVC) {
                return;
            }

            if (!Ext.get("__EVENTTARGET")) {
                inputs = Ext.applyIf(inputs, {
                    "__EVENTTARGET": ""
                });
            }

            if (!Ext.get("__EVENTARGUMENT")) {
                inputs = Ext.applyIf(inputs, {
                    "__EVENTARGUMENT": ""
                });
            }
            
            Ext.iterate(inputs, function (key, value) {
                this.aspInputs.push(Ext.core.DomHelper.append(this.getAspForm() || Ext.getBody(), {
                    tag : "input",
                    type : "hidden",
                    name : key,
                    value : value
                }));
            }, this);
            
            this.inputsInit = true;            
        },

        initGlyphFontFamily: function () {
            if (this.glyphFontFamily) {
                Ext.setGlyphFontFamily(this.glyphFontFamily);
            }
        },

        initAjaxTimeout: function () {
            var t = this.ajaxTimeout;

            if (Ext.isNumber(t)) {
                Ext.data.Connection.prototype.timeout = t;
                Ext.Ajax.setTimeout(t);
                Ext.net.DirectEvent.setTimeout(t);
                Ext.data.proxy.Server.prototype.timeout = t;
            }
        },

        initDirectEventDurationMessages: function() {
            if (Ext.isDefined(this.directEventForbidDurationMessages)) {
                Ext.net.DirectEvent.forbidDurationMessages = this.directEventForbidDurationMessages;
            }

            if (Ext.isDefined(this.directEventShowDurationMessages)) {
                Ext.net.DirectEvent.showDurationMessages = this.directEventShowDurationMessages;
            }

            if (Ext.isDefined(this.directEventDurationMessages)) {
                Ext.net.DirectEvent.durationMessages = this.directEventDurationMessages;
            }
        },

        resolveUrl : function (url) {
            if (url && Ext.net.StringUtils.startsWith(url, "~/")) {                
                return url.replace(/^~/, Ext.isEmpty(this.appName, false) ? "" : ("/"+this.appName))
            }

            return url;
        },

        initAriaSettings: function() {
            if (Ext.isDefined(this.enableAria)) {
                Ext.enableAria = this.enableAria;
            }

            if (Ext.isDefined(this.enableAriaButtons)) {
                Ext.enableAriaButtons = this.enableAriaButtons;
            }

            if (Ext.isDefined(this.enableAriaPanels)) {
                Ext.enableAriaPanels = this.enableAriaPanels;
            }
        },

        hasCssClass : function (id) {
            return !!this.cssClasses[id];
        },

        registerCssClass : function (id, cssClass, registerId) {
            if (!this.hasCssClass(id)) {                
                if (!this.resourcesSheet) {
                    this.resourcesSheet = Ext.util.CSS.createStyleSheet("\n", "extnet-resources");
                }

                if (!Ext.isIE) {
					var removeComments = /\/\*.*?\*\//img,
                        csssplitregexp = /([^{}]+)\{([^{}]+)+\}/img,                        
                        match;

                    cssClass = cssClass.replace(removeComments, "");
                    match = csssplitregexp.exec(cssClass)

                    while (match != null) {	                    
                        this.resourcesSheet.insertRule(match[0], this.resourcesSheet.cssRules.length);
	                    match = csssplitregexp.exec(cssClass);
                    }                    
				} else {					
					document.styleSheets["extnet-resources"].cssText += cssClass;
				}

				if (!Ext.isIE8m) {
				    try {
				        Ext.util.CSS.refreshCache();
				    }
				    catch (e) {
				    }
                }

                if (registerId !== false) {
                    this.cssClasses[id] = true;
                }
            }
        },

        // private
        toCharacterSeparatedFileName : function (name, separator) {
            if (Ext.isEmpty(name, false)) {
                return;
            }

            var matches = name.match(/([A-Z]+)[a-z]*|\d{1,}[a-z]{0,}/g);

            var temp = "";

            for (var i = 0; i < matches.length; i++) {
                if (i !== 0) {
                    temp += separator;
                }

                temp += matches[i].toLowerCase();
            }

            return temp;
        },

        getIcon : function (icon) {
            this.registerIcon(icon);
            icon = icon.toLowerCase();

            return !Ext.net.StringUtils.startsWith(icon, "icon-") ? ("icon-" + icon) : icon;
        },

        getRenderTarget : function () {
            return Ext.net.ResourceMgr.getAspForm() || Ext.getBody();
        },

        setIconCls : function (cmp, propertyName) {
            var val = cmp[propertyName];

            if (val && Ext.isString(val) && val.indexOf('#') === 0) {
                cmp[propertyName] = this.getIcon(val.substring(1));
            }
        },

        getIconUrl : function (icon) {
            var iconName = this.toCharacterSeparatedFileName(icon, "_"),                
                template = "/{0}icons/{1}-png/ext.axd",
                templateCdn = "{0}/icons/{1}.png",
                appName = Ext.isEmpty(this.appName, false) ? "" : (this.appName + "/"),
                path = this.cdnPath || this.resourcePath;

            return Ext.net.StringUtils.format(path ? templateCdn : template, path || appName, iconName);
        },

        registerIcon : function (name, init) {
            if (typeof name === 'string' && !!this.cssIcons[name]) {
                return;
            }

            var buffer = [],
                templateEmb = ".{0}{background-image:url(\"/{1}icons/{2}-png/ext.axd\") !important;background-repeat:no-repeat;}",
                templateCdn = ".{0}{background-image:url(\"{1}/icons/{2}.png\") !important;background-repeat:no-repeat;}",
                appName = Ext.isEmpty(this.appName, false) ? "" : (this.appName + "/");

            Ext.each(name, function (icon) {
                if (!!this.cssIcons[icon.name || icon]) {
                    return;
                }

                if (!Ext.isObject(icon)) {
                    icon = { name: icon };
                }                

                var iconName = this.toCharacterSeparatedFileName(icon.name, "_"),
                    iconRule = icon.name.toLowerCase(),
                    id = !Ext.net.StringUtils.startsWith(iconRule, "icon-") ? ("icon-" + iconRule) : iconRule,
                    path = this.cdnPath || this.resourcePath;

                if (!this.hasCssClass(id)) {
                    if (icon.url) {
                        buffer.push(Ext.net.StringUtils.format(".{0}{background-image:url(\"{1}\") !important;background-repeat:no-repeat;}", id, icon.url));
                    } else {                        
                        if (path) {
                            buffer.push(Ext.net.StringUtils.format(templateCdn, id, path, iconName));
                        } 
                        else {
                            buffer.push(Ext.net.StringUtils.format(templateEmb, id, appName, iconName));
                        }                        
                    }

                    this.cssClasses[id] = true;
                    this.cssIcons[icon.name] = true;
                }
            }, this);

            if (buffer.length > 0) {
                this.registerCssClass("", buffer.join(" "), false);
            }
        },
        
        getCmp : function (id) {
            var d = id.split("."),
                o = window[d[0]];

            Ext.each(d.slice(1), function (v) {
                if (!o) {
                   return null;
                }

                o = o[v];
            });
            
            return o ? Ext.getCmp(o.id) || o : null;
        },

        destroyCmp : function (id, contentOnly) {
            var obj = Ext.getCmp(id) || window[id];
            
            if (!Ext.isObject(obj) || (!obj.destroy && !obj.destroyStore)) {
                obj = Ext.net.ResourceMgr.getCmp(id);
            } 

            if (Ext.isObject(obj) && (obj.destroy || obj.destroyStore)) {
                try {
                    if (contentOnly) {
                        obj.clearContent && obj.clearContent();
                    }
                    else {                    
                        obj.destroyStore ?  obj.destroyStore() : obj.destroy();
                    }
                } catch (e) { }
            }
        },

        init : function (config) {
            window.X = window.Ext;
            window.X.net.RM = this;
            Ext.apply(this, config || {});

            if (this.quickTips !== false) {
                Ext.tip.QuickTipManager.init();
            }

            this.registerPageResources();

            if (this.theme) {
                if (Ext.isReady) {
                    Ext.fly(document.body.parentNode).addCls("x-theme-" + this.theme);
                }
                else {
                    Ext.onReady(function () {
                        Ext.fly(document.body.parentNode).addCls("x-theme-" + this.theme);
                    }, this);
                }
            }

            if (this.icons) {
                this.registerIcon(this.icons, true);
            }

            if (!Ext.isEmpty(this.ns)) {
                if (Ext.isArray(this.ns)) {
                    Ext.each(this.ns, function (ns) {
                        if (ns) {
                            Ext.ns(ns);
                        }
                    });
                } else {
                    Ext.ns(this.ns);
                }
            }            

            Ext.onReady(function () {
                if (this.aspForm && this.isMVC !== true && !window.theForm) {
                    window.theForm = document.forms[this.aspForm];
                    if (!window.theForm) {
                        window.theForm = document[this.aspForm];
                    }

                    window.__doPostBack = function (et, ea) {
                        var form = Ext.net.ResourceMgr.getAspForm(true);
    
                        if (form && (!form.onsubmit || (form.onsubmit() != false))) {
                            form.__EVENTTARGET.value = et;
                            form.__EVENTARGUMENT.value = ea;
                            form.submit();
                        }
                    };
                }         
                
                Ext.Function.defer(function () {
                    if (!this.inputsInit) {
                        this.initAspInputs({});
                    }    
                }, 10, this);                
            }, this);
            
            this.initGlyphFontFamily();
            this.initAjaxTimeout();
            this.initDirectEventDurationMessages();
            this.initAriaSettings();

            if (this.globalEvents) {
                Ext.on(this.globalEvents);
            }
        },

        registerPageResources : function () {
            Ext.select("script").each(function (el) {
                var url = el.dom.getAttribute("src");

                if (!Ext.isEmpty(url) && !this.queue.contains(url)) {
                    this.queue.buffer.push({
                        url: url,
                        loading: false
                    });
                }
            }, this);

            Ext.select('link[type="text/css"]').each(function (el) {
                var url = el.dom.getAttribute("href");

                if (!Ext.isEmpty(url) && !this.queue.contains(url)) {
                    this.queue.buffer.push({
                        url: url,
                        loading: false
                    });
                }
            }, this);
        },

        getAspForm : function (dom) {
            if (this.aspForm) {
                return Ext[dom ? "getDom" : "get"](this.aspForm);
            }
        },

        load : function (config, groupCallback) {
            this.queue.clear();

            if (groupCallback) {
                groupCallback = {
                    fn: groupCallback,
                    counter: config.length || 1,
                    config: config,
                    step : function () {
                        this.counter--;

                        if (this.counter === 0) {
                            this.fn.apply(window, [this.config]);
                        }
                    }
                };
            }

            Ext.each(Ext.isArray(config) ? config : [config], function (config) {
                if (Ext.isString(config)) {
                    var url = config;

                    config = { url: url };

                    if (url.substring(url.length - 4) === ".css") {
                        config.mode = "css";
                    }
                }

                config.options = Ext.applyIf(config.options || {}, {
                    mode: config.mode || "js"
                });

                if (config.callback) {
                    config.loadCallback = config.callback;
                    delete config.callback;
                }

                if (groupCallback) {
                    config.groupCallback = groupCallback;
                }

                if (!Ext.isEmpty(config.url)) {
                    this.queue.enqueue(config);
                }
            }, this);

            this.doLoad();
        },

        // private
        doLoad : function () {
            var config = this.queue.peek();

            if (config === undefined) {
                return;
            }

            var url = config.url,
                item,
                contains = this.queue.contains(url);

            if (config.force === true || contains !== true) {
                if (contains !== true) {
                    this.queue.buffer.push({
                        url: url,
                        loading: true
                    });
                }

                if (url && url.indexOf("://") >= 0) {
                    this.scriptTagRequest(url, config);
                }
                else {
                    Ext.Ajax.request(Ext.apply({
                        scope: this,
                        method: "GET",
                        callback: this.onResult,
                        disableCaching: false
                    }, config));
                }
            } else {
                item = this.queue.getItem(url);

                if (item && item.loading) {
                    this.queue.waitingList.push(config);
                    return;
                }

                if (config.loadCallback) {
                    config.loadCallback.apply(window, [config]);
                }

                if (config.groupCallback) {
                    config.groupCallback.step();
                }

                this.queue.dequeue(config);
                this.doLoad();
            }
        },

        scriptTagRequest : function (url, config) {
            var el,
                head = document['head'] || document.getElementsByTagName('head')[0];

            if (config.mode === "css") {
                el = document.createElement('link');
                el.type = 'text/css';
                el.rel = 'stylesheet';
                el.href = url;
            }
            else {
                el = document.createElement('script');
                el.type = 'text/javascript';
                el.src  = url;
            }

            el.onload = el.onreadystatechange = Ext.Function.bind(this.scriptTagOnResult, this, [config], 0);
            el.onerror = Ext.Function.bind(this.scriptTagOnError, this, [config], 0);
            el.async = false;
            el.defer = false;
            config.el = el;

            head.insertBefore(el, head.lastChild);
        },

        scriptTagOnError : function (options) {
            options.el.onload = options.el.onreadystatechange = options.el.onerror = null;

            Ext.net.DirectEvent.showFailure({
                status : "",
                statusText : "Failure"
            }, options.url + " is not loaded correctly");

            this.queue.dequeue(options);
            this.doLoad();
        },

        scriptTagOnResult : function (options, event) {
            event = event || window.event;

            if ((event && event.type == 'load') || (/loaded|complete/.test(options.el.readyState) && (!document.documentMode || document.documentMode < 9))) {            
                options.el.onload = options.el.onreadystatechange = options.el.onerror = null;
                
                var i = 0,
                    item = this.queue.getItem(options.url);

                if (item !== null) {
                    item.loading = false;
                }

                if (options.loadCallback) {
                    options.loadCallback.apply(window, [options]);
                }

                if (options.groupCallback) {
                    options.groupCallback.step();
                }

                while (this.queue.waitingList.length > i) {
                    item = this.queue.waitingList[i];

                    if (item.url === options.url) {
                        if (item.loadCallback) {
                            item.loadCallback.apply(window, [item]);
                        }

                        if (item.groupCallback) {
                            item.groupCallback.step();
                        }

                        Ext.Array.remove(this.queue.waitingList, item);
                    } else {
                        i++;
                    }
                }

                this.queue.dequeue(options);
                this.doLoad();
            }            
        },

        // private
        onResult : function (options, success, response) {
            if (success === true) {
                if (options.mode === "css") {
                    Ext.util.CSS.createStyleSheet(response.responseText);
                } else {
                    var head = document['head'] || document.getElementsByTagName('head')[0],
                        el = document.createElement("script");

                    el.setAttribute("type", "text/javascript");
                    el.text = response.responseText;

                    head.insertBefore(el, head.lastChild);
                }

                var i = 0,
                    item = this.queue.getItem(options.url);

                if (item !== null) {
                    item.loading = false;
                }

                if (options.loadCallback) {
                    options.loadCallback.apply(window, [options]);
                }

                if (options.groupCallback) {
                    options.groupCallback.step();
                }

                while (this.queue.waitingList.length > i) {
                    item = this.queue.waitingList[i];

                    if (item.url === options.url) {
                        if (item.loadCallback) {
                            item.loadCallback.apply(window, [item]);
                        }

                        if (item.groupCallback) {
                            item.groupCallback.step();
                        }

                        Ext.Array.remove(this.queue.waitingList, item);
                    } else {
                        i++;
                    }
                }
            }
            else {
               Ext.net.DirectEvent.showFailure(response, response.responseText);
            }

            this.queue.dequeue(options);

            this.doLoad();
        },

        // private
        queue : function () {
            // first-in-first-out
            return {
                // private
                js: [],

                // private
                css: [],

                // private
                buffer: [],

                waitingList: [],

                enqueue : function (item) {
                    this[item.options.mode].push(item);
                },

                dequeue : function (item) {
                    var mode = item.options.mode,
                        temp = this[mode][0];

                    this[mode] = this[mode].slice(1);

                    return temp;
                },

                clear : function () {
                    this.js = [];
                    this.css = [];
                },

                contains : function (url) {
                    // workaround, need more universal fix
                    url = url.replace("&amp;", "&");
                    for (var i = 0; i < this.buffer.length; i++) {
                        if (this.buffer[i].url.replace("&amp;", "&") === url) {
                            return true;
                        }
                    }

                    return false;
                },

                getItem : function (url) {
                    for (var i = 0; i < this.buffer.length; i++) {
                        if (this.buffer[i].url === url) {
                            return this.buffer[i];
                        }
                    }

                    return null;
                },

                peek : function () {
                    return this.css.length > 0 ? this.css[0] : this.js[0];
                }
            };
        } ()       
    };
} ();

// @source core/ComponentMgr.js

Ext.net.ComponentManager = {
    registerId : function (cmp) {
        if (cmp.initialConfig || cmp.isStore || cmp.proxyId) {
            var cfg = cmp.initialConfig || {},
                id = cmp.isStore ? cmp.storeId : (cmp.proxyId || cfg.proxyId || cfg.id),
                ns = cmp.ns || (Ext.isArray(Ext.net.ResourceMgr.ns) ? Ext.net.ResourceMgr.ns[0] : Ext.net.ResourceMgr.ns),
                hasId = (!Ext.isEmpty(id, false) && id.indexOf("-") === -1);
            
            if (cmp.forbidIdScoping !== true && ( hasId || (cmp.ns && !Ext.isEmpty(cmp.itemId, false)) ) ) {
                if (ns) {                    
                    (Ext.isObject(ns) ? ns : Ext.ns(ns))[hasId ? id : cfg.itemId] = cmp;
                    cmp.nsId = (Ext.isObject(ns) ? "" : (ns + ".")) + (hasId ? id : cfg.itemId);
                } else {
                    window[id] = cmp;
                    cmp.nsId = id;
                }
            }
        }
    },
    
    unregisterId : function (cmp) {        
        if (cmp.forbidIdScoping !== true) {
            var cfg = cmp.initialConfig || {},
                ns = cmp.ns || (Ext.isArray(Ext.net.ResourceMgr.ns) ? Ext.net.ResourceMgr.ns[0] : Ext.net.ResourceMgr.ns),
                id = cmp.proxyId || cmp.storeId || cmp.id,
                hasId = (!Ext.isEmpty(id, false) && id.indexOf("-") === -1),
                nsObj;

            if(!hasId && cfg.ns && cmp.itemId) {
                id = cmp.itemId;
            }
            
            if (ns && id) {                
                if (Ext.isObject(ns) && ns[id]) {
                    try {
                        delete ns[id];
                    } catch (e) {
                        ns[id] = undefined;
                    }
                } else if (Ext.net.ResourceMgr.getCmp(ns + "." + id)) {
                    try {
                        delete Ext.ns(ns)[id];
                    } catch (e) {
                        Ext.ns(ns)[id] = undefined;
                    }
                }
            } 
            else if (window[cmp.proxyId || cmp.storeId || cmp.id]) {
                window[cmp.proxyId || cmp.storeId || cmp.id] = null;
            }

            delete cmp.nsId;
        }
    }
};

Ext.ComponentManager.unregister = Ext.Function.createSequence(Ext.ComponentManager.unregister, function (component) {    
    Ext.net.ComponentManager.unregisterId(component);   
});

Ext.data.StoreManager.register = Ext.Function.createSequence(Ext.data.StoreManager.register, function () {    
    for (var i = 0, s; (s = arguments[i]); i++) {
        Ext.net.ComponentManager.registerId(s);
    }    
});

Ext.data.StoreManager.unregister = Ext.Function.createSequence(Ext.data.StoreManager.unregister, function () {    
    for (var i = 0, s; (s = arguments[i]); i++) {
        Ext.net.ComponentManager.unregisterId(s);
    }    
});

(function (fn) {
    Ext.PluginManager.create = function () {
        var p = fn.apply(Ext.PluginManager, arguments);

        Ext.net.ComponentManager.registerId(p);

        if (Ext.isFunction(p.on)) {
            p.on("destroy", function () {
                Ext.net.ComponentManager.unregisterId(this);
            });
        }

        return p;
    };
})(Ext.PluginManager.create);
//http://www.openajax.org/member/wiki/OpenAjax_Hub_2.0_Specification
//http://www.openajax.org/member/wiki/OpenAjax_Hub_2.0_Specification_Topic_Names

Ext.define("Ext.net.MessageBus", {    
    mixins: {
        observable: 'Ext.util.Observable'
    }, 
     
    statics: { 
        initEvents : function (owner) {                        
            if (owner.messageBusListeners) {                
                var busListeners = [];
                Ext.each(owner.messageBusListeners, function (listener) {
                    var bus = listener.bus ? Ext.net.ResourceMgr.getCmp(listener.bus) : Ext.net.Bus,
                        name = listener.name || "**";

                    if (owner instanceof Ext.net.MessageBus) {
                        bus = owner;
                    }

                    if (!bus) {
                        throw new Error("Bus is not found: " + listener.bus);
                    }

                    listener.scope = listener.scope || owner;

                    busListeners.push({name : name, fn : bus.subscribe(name, listener), bus: bus, scope: listener.scope});                    
                });

                if (owner.on && busListeners.length) {
                    owner.on("destroy", function () {
                        Ext.each(busListeners, function (item) {
                            item.bus.unsubscribe(item.name, item.fn, item.scope);
                        });
                    });
                }

                owner.messageBusListeners = null;
            }

            if (owner.messageBusDirectEvents) {
               var busDirectEvents = [];
                Ext.each(owner.messageBusDirectEvents, function (listener) {
                    var bus = listener.bus ? Ext.net.ResourceMgr.getCmp(listener.bus) : Ext.net.Bus,
                        name = listener.name || "**";

                    if (owner instanceof Ext.net.MessageBus) {
                        bus = owner;
                    }

                    if (!bus) {
                        throw new Error("Bus is not found: " + listener.bus);
                    }
                    listener.isDirect = true;                    
                    listener.scope = listener.scope || owner;
                    busDirectEvents.push({name : name, fn : bus.subscribe(name, listener), bus: bus, scope: listener.scope});
                });

                if (owner.on && busDirectEvents.length) {
                    owner.on("destroy", function () {
                        Ext.each(busDirectEvents, function (item) {
                            var _events = item.bus.events;
                            item.bus.events = item.bus.directListeners;
                            item.bus.unsubscribe(item.name, item.fn, item.scope);
                            item.bus.events = _events;
                        });
                    });
                }

                owner.messageBusDirectEvents = null;
            }
        }
    },   
    
    constructor : function (config) {
        var isDefault = !Ext.net.Bus;
        Ext.apply(this, config || {});

        if (this.defaultBus) {
            Ext.net.Bus = this;
        }

        Ext.net.ComponentManager.registerId(this);

                
        this.mixins.observable.constructor.call(this);        
    },

    destroy : function () {
        Ext.net.ComponentManager.unregisterId(this);   
    },
     
    messageFilter : function (name) {
        var tokens = name.split('.'),
            len = tokens.length,
            tokenRe = /^\w+$/,
            token,
            i;

        for (i = 0; i < len; i++) {
            token = tokens[i];

            if (!tokenRe.test(token) && token !== "*" && (token !== "**" || i !== (len - 1)) ) {
                throw new Error('Incorrect event name: ' + name);
            }

            if (token === "**") {
                tokens[i] = ".*";
            } else if (token === "*") {
                tokens[i] = "\\w+";
            }
        }

        return new RegExp("^" + tokens.join("\\.") + "$");
    }, 

    subscribe : function (name, fn, config) {        
        config = config || {};

        if (Ext.isObject(fn)) {
            config = fn;
        } else {
            config.fn = fn;
        }

        config.filter = this.messageFilter(name);
        config.name = name;
        var fn = Ext.bind(this.onMessage, this);

        if (config.isDirect) {
            if (!Ext.isDefined(config.delay)) {
                config.delay = 20;
            }

            if (config.delay <= 0) {
                delete config.delay;
            }
            config.priority = -999;
        }

        this.on("message", fn, config.scope || this, config);
        return fn;
    },

    unsubscribe : function (name, fn, scope) {
        this.un("message", fn, scope || this);
    },

    publish : function (name, data, target, fromParent) {
        //!!! do not replace == by ===
        if (target == this) {
            return;
        }
        
        this.fireEvent("message", name, data);

        if (!target) {
            target = this;
        }
        
        //!!! do not replace != by !===
        if (parent != window && fromParent !== true) {
            this.publishToFrame(parent, name, data, target);            
        }

        var frames = window.frames,
            i;
        for (i = 0; i < frames.length; i++) {   
            this.publishToFrame(frames[i], name, data, target, true);            
        }  
    },

    publishToFrame : function (frame, name, data, target, fromParent) {
        var bus;

        try {
           if (this.defaultBus && frame.Ext && frame.Ext.net && frame.Ext.net.Bus) {
               bus = frame.Ext.net.Bus;        
           }
           else if (frame.Ext && frame.Ext.net && frame.Ext.net.ResourceMgr) {
               bus = frame.Ext.net.ResourceMgr.getCmp(this.nsId);
           }   

           if (bus) {
               bus.publish(name, data, target, fromParent);
           }
        }
        catch (e) {
        }        
    },

    onMessage : function (name, data, config) {
        if (config.filter.test(name)) {
            (config.fn || Ext.emptyFn).call(config.scope || this, name, data, config);
        }
    }
}, function () {
   //create default message bus
   Ext.net.Bus = Ext.create("Ext.net.MessageBus"); 
   Ext.net.Bus.defaultBus = true;
});

// @source core/Component.js

Ext.override(Ext.Component, {
    selectable      : true,    
    autoFocusDelay  : 10,
    styleHtmlCls: 'x-html',

    onRender : function () {                
        this.callParent(arguments);

        if (this.callouts) {
            var callouts = this.callouts,
                callout,
                i;
            delete this.callouts;

            for (i = 0; i < callouts.length; i++ ) {
                callout = callouts[i];
                callout.target = this;
                Ext.create("Ext.net.Callout", callout);
            }
        }

        if (this.tooltips) {        
            var tooltips = [],
                tooltip,
                i;

            for (i = 0; i < this.tooltips.length; i++ ) {
                tooltip = this.tooltips[i];
                if (!tooltip.target) {
                    tooltip.target = this.el;
                }

                tooltips.push(Ext.ComponentManager.create(tooltip,"tooltip"));
            }

            this.tooltips = tooltips;
        }
    },

    afterRender : function () {
        this.callParent(arguments);

        if (this.styleHtmlContent) {
            this.getTargetEl().addCls(this.styleHtmlCls);
        }
    },

    initComponent : function () {
        var cmp, i, len;

        if (this.hasId()) {
            cmp = Ext.getCmp(this.id);
            
            if (cmp) {
                cmp.destroy();
            }
        }
        
        if (this.contentHtml && Ext.isFunction(this.contentHtml)) {
            this.contentHtml.call(window);
        }
        
        if (this.preinitFn) {
            this.preinitFn.call(this.preinitScope || this, this);
        }

        if (this.tag) {
            this.setTag(this.tag);
        }
        
        Ext.net.ComponentManager.registerId(this);
        
        if (this.bin) {
            for (i = 0, len = this.bin.length; i < len; i++) {
                this.bin[i].binOwner = this;
            }
        }
        
        this.callParent(arguments);

        if (!Ext.isEmpty(this.contextMenuId, false)) {
            this.on("render", function () {
                this.mon(this.el, "contextmenu", function (e, t) {
                    var menu = Ext.menu.MenuMgr.get(this.contextMenuId);
                    menu.contextEvent = { e : e, t : t };
                    e.stopEvent();
                    e.preventDefault();
                    menu.showAt(e.getXY());
                }, this);            
            }, this, { single : true });    
        }
    
        if (this.iconCls) {
            X.net.RM.setIconCls(this, "iconCls");
        }
    
        if (!Ext.isEmpty(this.defaultAnchor, true)) {
            if (Ext.isEmpty(this.defaults)) {
                this.defaults = {};
            }
        
            Ext.apply(this.defaults, { anchor : this.defaultAnchor });
        }
    
        if (this.selectable === false) {
            this.on("afterrender", function () { 
                this.setSelectable(false); 
            }, this, {single: true});
        }
    
        if (this.autoFocus) {        
            if (this.ownerCt) {
                this.mon(this.ownerCt, "afterlayout", function () { 
                    this.focus(this.selectOnFocus || false);
                }, this, { delay: this.autoFocusDelay, single: true });
            } else {
                this.on("afterrender", function () {
                    this.focus(this.selectOnFocus || false);
                }, this, { delay: this.autoFocusDelay, single: true });
            }
        }
    
        if (this.postback) {
            this.on("afterrender", function () { 
                this.on(this.postback.eventName, this.postback.fn, this, { delay : 30 });
            }, this, {single:true});
        }
    },

    hasId : function () {
        return !!(this.initialConfig && this.initialConfig.id) && this.initialConfig.id.indexOf("-") === -1;
    },

    isNonContentable : function () {
        return this.isXType("tablepanel") 
                || this.isXType("dataview") 
                || this.isXType("field")
                || this.isXType("draw")
                || this.isXType("chart")
                || this.isXType("button");
    },

    destroyContentWidgets : function (checkFlag) {
        if ((this.destroyContent || !checkFlag) && !this.isNonContentable()) {
            var contentEl = this.getContentTarget();
            if(contentEl && contentEl.dom) {
                this.destroyFromDom(contentEl.dom);
            }
        }
    },

    beforeDestroy : function () {
        this.destroyContentWidgets(true);
    },

    destroyFromDom : function (dom) {
        if (!dom || !dom.children) {
            return;
        }

        var tagsToExculde = ["svg", "iframe", "object"],
            tag = dom.tagName.toLowerCase(),
            children,
            child,
            cmp,
            id,
            len,
            i;

        if (tagsToExculde.indexOf(tag) > -1) {
            return;
        }

        children = dom.children;

        for (i = 0, len = children.length; i < len;i++) {
            child = children[i];

            if (child) {
                id = child.id;
                if (!Ext.isEmpty(id)) {
                    cmp = Ext.getCmp(id);
                    if(cmp) {
                        cmp.destroyContent = true;
                        if (!cmp.isDescendantOf(this)) {                                    
                            cmp.destroy();
                        }
                        else {
                            cmp.destroyContentWidgets(true);
                        }
                    }
                    else {
                        this.destroyFromDom(child);
                    }
                }
                else {
                    this.destroyFromDom(child);
                }
            }
        }
    },
    
    destroy : function () {        
        this.destroyBin();
        this.destroyTooltips();
        this.destroyCallouts();
        this.callParent(arguments);
    },

    destroyCallouts : function () {
        if (this.callouts) {
            for (i = 0; i < this.callouts.length; i++ ) {
                var callout = this.callouts[i];
                if (!callout.destroyed) {
                    callout.destroyFromCmp = true;
                    callout.destroy();
                }
            }

            delete this.callouts;
        }
    },

    destroyTooltips : function () {
        if (this.tooltips) {
            for (i = 0; i < this.tooltips.length; i++ ) {
                var tooltip = this.tooltips[i];
                if (!tooltip.destroyed && Ext.isFunction(tooltip.destroy)) {
                    tooltip.destroy();
                }
            }

            delete this.tooltips;
        }
    },
    
    destroyBin : function () {
        if (this.bin) {
            Ext.destroy(this.bin);
        }

        delete this.bin;
    },    
    
    setSelectable : function (selectable) {
        if (selectable === false) {
            this.setDisabled(true).el.removeCls("x-item-disabled").applyStyles("color:black;");
        } else if (selectable === true) {
            this.setDisabled(false);
        }
        
        this.selectable = false;
        
        return this;
    },
    
    addPlugins : function (plugins) {
        if (Ext.isEmpty(this.plugins)) {
            this.plugins = [];
        } else if (!Ext.isArray(this.plugins)) {
            this.plugins = [ this.plugins ];
        }
        
        if (Ext.isArray(plugins)) {
            for (var i = 0; i < plugins.length; i++) {
                this.plugins.push(this.initPlugin(plugins[i]));
            }
        } else {
            this.plugins.push(this.initPlugin(plugins));
        }
    },
    
    getForm : function (id) {
        var form = Ext.isEmpty(id) ? this.el.up("form") : Ext.get(id);
        
        if (!Ext.isEmpty(form)) {
            Ext.apply(form, form.dom);
            
            form.submit = function () {
                form.dom.submit();
            };
        }
        
        return form;
    },
    
    setAnchor : function (anchor, updateLayout) {
        this.anchor = anchor;
        delete this.anchorSpec;
        
        if (updateLayout && this.ownerCt) {
            this.ownerCt.updateLayout();
        }
    },
    
    getLoader : function () {
        var me = this,
            autoLoad = me.autoLoad ? (Ext.isObject(me.autoLoad) ? me.autoLoad : {url: me.autoLoad}) : null,
            loader = me.loader || autoLoad;

        if (loader) {
            if (!loader.isLoader) {
                me.loader = Ext.create('Ext.net.ComponentLoader', Ext.apply({
                    target: me,
                    autoLoad: autoLoad
                }, loader));
            } else {
                loader.setTarget(me);
            }

            return me.loader;

        }

        return null;
    },
    
    getTagHiddenField : function () {
        if (!this.tagHiddenField && (this.hasId() || this.tagHiddenName)) {
            this.tagHiddenField = new Ext.form.Hidden({ 
                name : this.tagHiddenName || (this.id + "_tag") 
            });

            this.on("beforedestroy", function () { 
                this.destroy();
            }, this.tagHiddenField);

            this.on("afterrender", function () {
                this.tagHiddenField.render(this.el.parent() || this.el);
            }, this, { single: true });
        }

        return this.tagHiddenField;
    },

    setTag : function (tag) {
        var field = this.getTagHiddenField();

        if (field) {
            field.setValue(escape(Ext.encode(tag)));
        }
        this.tag = tag;
    },

    getTag : function () {
        return this.tag;
    },

    replace : function (cmp) {
        if (this.ownerCt) {
            var index = this.ownerCt.items.indexOf(this),
                ct = this.ownerCt;

            ct.remove(this, true);
            
            if (Ext.isFunction(cmp)) {
                cmp({ mode : "item", index : index, ct : ct });
            } else {
                ct.insert(index, cmp);
            }
        } else { 

            var container = this.el.dom.parentNode,
                position = this.el.next();

            this.destroy();

            if(!position || !position.dom) 
            {
                position = undefined;
            }

            if (Ext.isFunction(cmp)) {
                cmp({mode : "el", position : position, ct : container });
            } else {
                cmp = Ext.ComponentManager.create(cmp);
                cmp.render(container, position);
            }            
        }
    },

    
    getBinComponent : function (comp) {
        var me = this,
            item = null;

        if (me.bin) {
            if (Ext.isNumber(comp)) {
                item = me.bin[comp];
            } else if (Ext.isString(comp)) {
                Ext.each(me.bin, function (binItem) {
                    if (binItem.itemId === comp || binItem.id === comp || binItem.storeId === comp || binItem.proxyId === comp) {
                        item = binItem;
                        return false;
                    }
                });
            }
        }

        return item;
    },

    afterRender : function () {
        this.callParent(arguments);

        if (this.keyMap && !this.keyMap.addBinding) {
            this.keyMap = new Ext.util.KeyMap(Ext.apply({
                target: this.keyMap.componentEvent ? this : (this.keyMap.cmpEl ? this[this.keyMap.cmpEl] : this.el)
            }, this.keyMap));

            if (this instanceof Ext.window.Window) {
                this._keyMap = this.keyMap;
                delete this.keyMap;
            }
        }

        if (this.keyNav && !Ext.isFunction(this.keyNav.destroy)) {
            this.keyNav = new Ext.util.KeyNav(Ext.apply({
                target: this.keyMap.componentEvent ? this : (this.keyMap.cmpEl ? this[this.keyMap.cmpEl] : this.el)
            }, this.keyNav));
        }
    },

    onDestroy : function () {            
        if (this.rendered && (this.keyMap || this._keyMap)) {
            (this._keyMap || this.keyMap).destroy();
            delete this._keyMap;
            delete this.keyMap;
        }

        if (this.rendered && this.keyNav && this.keyNav.map) {
            this.keyNav.destroy();
            delete this.keyNav;
        }    
        
        this.callParent(arguments);
    },

    privates: {
        // Introduced since ExtJS 6.2.0 update. The 'keyMap' object in Ext.NET is different than ExtJS's
        // and in some situations its keys return a null value which can break matchEntry().
        findKeyMapEntry: function (e) {
            var me = this,
                keyMap = me.getKeyMap(),
                key, entry;

            if (keyMap) {
                for (key in keyMap) {
                    // If the key code and the modifier flags match, call the handler 
                    // Cast the mapping's flag because they will be undefined if not 
                    // true. Case metaKey because it's undefined on some platforms. 
                    entry = keyMap[key];

                    // Ext.NET requires to check against NULL here as in some situations
                    // the objects will have extra keys triggering this situation.
                    if (entry != null && Ext.mixin.Keyboard.matchEntry(key, entry, e)) {
                        return entry;
                    }
                }
            }

            return null;
        }
    }
});
// @source core/container/Container.js

Ext.container.Container.override({
    initComponent: function () {
        this.callParent(arguments);

        if (this.autoUpdateLayout === true) {
            this.on("afterrender", this.updateLayout, this, { delay: 10, single: true });
        }
    },

    getBody: function (focus) {
        if (this.iframe) {
            var self = this.getWin();

            if (focus !== false) {
                try {
                    self.focus();
                } catch (e) { }
            }

            return self;
        }

        return Ext.get(this.id + "_Content") || this.layout.getRenderTarget() || this.getTargetEl();
    },

    reload: function (disableCaching) {
        var loader = this.getLoader();
        loader.load(Ext.applyIf({ disableCaching: disableCaching }, loader.lastOptions || {}));
    },

    load: function (config) {
        this.getLoader().load(config);
    },

    clearContent: function () {
        if (this.iframe && this.iframe.dom) {
            var me = this,
                doc,
                prop;

            this.iframe.un("load", this.getLoader().afterIFrameLoad, this);

            try {
                doc = me.getDoc();

                if (doc) {
                    try {
                        if (me._docListeners) {
                            Ext.get(doc).un(this._docListeners);
                        }
                    } catch (e) { }

                    for (prop in doc) {
                        if (doc.hasOwnProperty && doc.hasOwnProperty(prop)) {
                            delete doc[prop];
                        }
                    }
                }
            } catch (e) { }

            try {
                this.iframe.dom.src = Ext.SSL_SECURE_URL;
                delete this.iframe;
                this.removeAll(true);
            } catch (e) { }

            this.getLoader().removeMask();

        } else if (this.rendered) {
            this.update("");
        }
    },

    doDestroy: function () {
        if (this.iframe && this.iframe.dom) {
            try {
                this.clearContent();
            } catch (e) { }
        }
        this.destroyContentWidgets(true);
        this.destroyContentWidgets = Ext.emptyFn;
        this.callParent(arguments);
    },

    onRender: function () {
        this.callParent(arguments);
        this.mon(this.el, Ext.supports.SpecialKeyDownRepeat ? 'keydown' : 'keypress', this.fireKey, this);
    },

    fireKey: function (e) {
        if (e.getKey() === e.ENTER) {
            var tagRe = /textarea/i,
                target = e.target;

            contentEditable = target.contentEditable;
            if (tagRe.test(target.tagName) || (contentEditable === '' || contentEditable === 'true')) {
                return;
            }

            var btn,
                index,
                fbar = this.child("[ui='footer']"),
                dbtn = this.defaultButton;

            if (!dbtn) {
                if (!(this instanceof Ext.form.Panel) || !fbar || !fbar.items || !(fbar.items.last() instanceof Ext.button.Button) || Ext.fly(target).hasCls(Ext.button.Button.prototype.baseCls)) {
                    return;
                }

                btn = fbar.items.last();
                this.clickButton(btn, e);

                return;
            }

            if (Ext.isNumeric(dbtn)) {
                index = parseInt(dbtn, 10);

                if (!fbar || !fbar.items || !(fbar.items.getAt(index) instanceof Ext.button.Button)) {
                    return;
                }

                btn = fbar.items.getAt(index);
                this.clickButton(btn, e);
            } else {
                btn = Ext.getCmp(dbtn);

                if (!btn) {
                    btn = this.down(dbtn);
                }

                if (btn) {
                    this.clickButton(btn, e);
                }
            }
        }
    },

    clickButton: function (btn, e) {
        if (this.defaultButtonStopEvent !== false) {
            e.stopEvent();
        }
        if (btn.onClick) {
            e.button = 0;
            btn.onClick(e);
        } else {
            btn.fireEvent("click", btn, e);
        }
    },

    beforeWindowUnload: function () {
        var me = this,
            doc, prop;

        if (me.rendered) {
            try {
                doc = me.getDoc();
                if (doc) {
                    try {
                        Ext.get(doc).un(this._docListeners);
                    } catch (e) { }
                }
            } catch (e) { }
        }
    },

    onIFrameLoad: function () {
        return;

        var me = this,
            doc = me.getDoc(),
            fn = me.onIFrameRelayedEvent;

        if (doc) {
            try {
                Ext.get(doc).on(
                    me._docListeners = {
                        mousedown: fn, // menu dismisal (MenuManager) and Window onMouseDown (toFront)
                        mousemove: fn, // window resize drag detection
                        mouseup: fn,   // window resize termination
                        click: fn,     // not sure, but just to be safe
                        dblclick: fn,  // not sure again
                        scope: me
                    }
                );
            } catch (e) {
            }

            Ext.get(this.getWin()).on('beforeunload', me.beforeWindowUnload, me);
        }
    },

    onIFrameRelayedEvent: function (event) {
        if (!this.iframe) {
            return;
        }

        // relay event from the iframe's document to the document that owns the iframe...

        var iframeEl = this.iframe,

            // Get the left-based iframe position
            iframeXY = iframeEl.getTrueXY(),
            originalEventXY = event.getXY(),

            // Get the left-based XY position.
            // This is because the consumer of the injected event will
            // perform its own RTL normalization.
            eventXY = event.getTrueXY();

        // the event from the inner document has XY relative to that document's origin,
        // so adjust it to use the origin of the iframe in the outer document:
        event.xy = [iframeXY[0] + eventXY[0], iframeXY[1] + eventXY[1]];

        event.injectEvent(iframeEl); // blame the iframe for the event...

        event.xy = originalEventXY; // restore the original XY (just for safety)
    },

    getFrameBody: function () {
        var doc = this.getDoc();
        return doc.body || doc.documentElement;
    },

    getDoc: function () {
        try {
            return this.getWin().document;
        } catch (ex) {
            return null;
        }
    },

    getWin: function () {
        var me = this,
            name = me.id + "_IFrame",
            win = Ext.isIE
                ? me.iframe.dom.contentWindow
                : window.frames[name];
        return win;
    },

    getFrame: function () {
        var me = this;
        return me.iframe.dom;
    }
});
Ext.define('Ext.net.plugin.Viewport', {
    extend: 'Ext.plugin.Viewport',
    alias: 'plugin.netviewport',

    statics: {
        setupViewport: function () {
            var me = this,
                body = Ext.getBody();

            el = me.el = Ext.get(me.renderTo || Ext.net.ResourceMgr.getAspForm() || body);

            Ext.fly(document.documentElement).addCls(me.viewportCls);
            el.setHeight = el.setWidth = Ext.emptyFn;
            body.setHeight = body.setWidth = Ext.emptyFn;
            el.dom.scroll = 'no';
            body.dom.scroll = 'no';
            me.allowDomMove = false;
            me.renderTo = me.el;

            if (me.rtl) {
                body.addCls(Ext.baseCSSPrefix + "rtl");
            }

            body.applyStyles({
                overflow: "hidden",
                margin: "0",
                padding: "0",
                border: "0px none",
                height: "100%"
            });

            if (Ext.supports.Touch) {
                me.addMeta("apple-mobile-web-app-capable", "yes");
            }

            Ext.on("resize", me.handleViewportResize, me);

            // Get the DOM disruption over with before the Viewport renders and begins a layout
            Ext.getScrollbarSize();

            // Clear any dimensions, we will size later on
            me.width = me.height = undefined;

            // ... but take the measurements now because doing that in onRender
            // will cause a costly reflow which we just forced with getScrollbarSize()
            me.initialViewportHeight = Ext.Element.getViewportHeight();
            me.initialViewportWidth  = Ext.Element.getViewportWidth();
        }
    }
}, function () {
    this.prototype.apply = function (target) {
        Ext.plugin.Viewport.apply(target);
        (target.prototype || target).setupViewport = Ext.net.plugin.Viewport.setupViewport;
    };
});

Ext.define('Ext.net.Viewport', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.net.plugin.Viewport'
    ],

    alias: 'widget.netviewport'
},
function () {
    Ext.plugin.Viewport.decorate(this);
    this.prototype.setupViewport = Ext.net.plugin.Viewport.setupViewport;
});

// @source core/XTemplate.js

Ext.net.XTemplate = function (config) {
    config = config || {};
    var html;
    
    this.proxyId = config.proxyId;
    
    if (config.el) {
        config.el = Ext.getDom(config.el);
        html = config.el.value || config.el.innerHTML;
    } else {
        html = config.html;
        
        if (Ext.isArray(html)) {
            html = html.join("");
        }
    }
    
    Ext.net.XTemplate.superclass.constructor.call(this, html, config.functions);
};

Ext.extend(Ext.net.XTemplate, Ext.XTemplate, {
    destroy : function () {
        Ext.net.ComponentManager.unregisterId(this);
    }
});

// @source core/Editor.js

Ext.Editor.override({
    activateEvent : "click",
    useHtml : false,
    htmlEncode : false,
    htmlDecode : false,

    initComponent : function () {
        this.callParent(arguments);

        this.field.submitValue = false;
        this.initTarget();
    },

    realign : function (autoSize) {
        var me = this;
        if (autoSize === true) {
            if (this.autoSize) {
                me.updateLayout();

                var autoSizeBehav = this.autoSize,
                    fieldWidth,
                    fieldHeight;

                if (autoSizeBehav === true) {
                    autoSizeBehav =  {
                        width  : 'boundEl',
                        height : 'boundEl'    
                    };
                }                
                
                fieldWidth  = me.getDimension(autoSizeBehav.width,  'getWidth',  this.width);
                fieldHeight = me.getDimension(autoSizeBehav.height, 'getHeight', this.height);

                this.field.setSize(fieldWidth || this.field.getWidth(), fieldHeight || this.field.getHeight());
            }
        }
        me.alignTo(me.boundEl, me.alignment, me.offsets);
    },

    getDimension: function (type, getMethod, size){
        switch (type) {
            case 'boundEl':
                return this.boundEl[getMethod]();

            case 'field':
                return undefined;

            default:
                return size;
        }
    },
    
    initTarget : function () {
        if (this.isSeparate) {
            this.field = Ext.ComponentManager.create(this.field, "textfield");
        }
        
        if (!Ext.isEmpty(this.target, false)) {            
            var targetEl = Ext.net.getEl(this.target);
            
            if (!Ext.isEmpty(targetEl)) {
                this.initTargetEvents(targetEl);
            } else {
                var getTargetTask = new Ext.util.DelayedTask(function (task) {
                    targetEl = Ext.get(this.target);
                    
                    if (!Ext.isEmpty(targetEl)) {                            
                        this.initTargetEvents(targetEl);
                        task.cancel();
                        delete this.getTargetTask;
                    } else {
                        task.delay(500, undefined, this, [task]);
                    }
                }, this);
                this.getTargetTask = getTargetTask;
                getTargetTask.delay(1, undefined, this, [getTargetTask]);
            }
        } 
    },
    
    retarget : function (target) {
        if (this.getTargetTask) {
            this.getTargetTask.cancel();
            delete this.getTargetTask;
        }
        
        this.target = Ext.net.getEl(target);
        
        if (this.target && this.target.un && !Ext.isEmpty(this.activateEvent, false)) {
            if (this.target.isComposite) {
                this.target.each(function (item) {
                    item.un(this.activateEvent, this.activateFn, item.dom);
                }, this);
            } else {
                this.target.un(this.activateEvent, this.activateFn, this.target.dom);            
            }
        }
        
        this.initTargetEvents(this.target);            
    },

    initTargetEvents : function (targetEl) {
        this.target = targetEl;
        
        var ed = this,
            activate = function () {
                if (!ed.disabled) {
                    ed.startEdit(this);
                }
            };
        
        this.activateFn = activate;
        
        if (!Ext.isEmpty(this.activateEvent, false)) {
            if (this.target.isComposite) {
                this.target.each(function (item) {
                    item.on(this.activateEvent, this.activateFn, item.dom);
                }, this);
            } else {
                this.target.on(this.activateEvent, this.activateFn, this.target.dom);            
            }
        }
    },

    onFocusLeave: function(e) {
        var me = this;

        if (me.editing && me.cancelOnBlur === true) {
            me.cancelEdit();
        } else if (me.allowBlur === true && me.editing) {
            me.completeEdit();
        }

        me.callParent([e]);
    },

    startEdit: function (el, value, doFocus) {
        if (!Ext.isDefined(value)) {
            this.completeEdit();
            this.boundEl = Ext.get(el);

            if (this.useHtml) {
                value = this.boundEl.dom.innerHTML;
                if (this.htmlEncode) {                    
                    value = Ext.util.Format.htmlEncode(value);
                }
            }
            else {
                value = Ext.String.trim(this.boundEl.dom[Ext.isGecko ? "textContent" : "innerText"]);                
            }
        }
        
        this.callParent([el, value, doFocus]);
    },

    completeEdit: function (remainVisible) {
        var me = this,
            field = me.field,
            startValue = me.startValue,
            cancel = me.context && me.context.cancel,
            value;

        if (!me.editing) {
            return;
        }

        // Assert combo values first
        if (field.assertValue) {
            field.assertValue();
        }

        value = me.getValue();
        if (!field.isValid()) {
            if (me.revertInvalid !== false) {
                me.cancelEdit(remainVisible);
                return;
            }
        }

        if (me.ignoreNoChange && !field.didValueChange(value, startValue)) {
            me.onEditComplete(remainVisible);
            return;
        }

        if (me.fireEvent('beforecomplete', me, value, startValue) !== false) {
            // Grab the value again, may have changed in beforecomplete
            value = me.getValue();
            if (me.updateEl && me.boundEl) {
                if (me.htmlDecode) {
                    me.boundEl.setHtml(Ext.util.Format.htmlDecode(value));
                }
                else {
                    me.boundEl.setHtml(value);
                }
            }
            me.onEditComplete(remainVisible, cancel);
            me.fireEvent('complete', me, value, startValue);
        }
    }
});

Ext.layout.container.Editor.override({
    autoSizeDefault: {
        width  : 'boundEl',
        height : 'boundEl'    
    }
});

// @source core/ComponentLoader.js

Ext.ComponentLoader.Renderer.Data = function (loader, response, active) {
    var success = true;

    try {
        loader.getTarget().update((Ext.isObject(response.responseText) || Ext.isArray(response.responseText)) ? response.responseText : Ext.decode(response.responseText));
    } catch (e) {
        success = false;
    }

    return success;
};

Ext.ComponentLoader.Renderer.Component = function (loader, response, active) {
    var success = true,
        target = loader.getTarget(),
        items = [];

    //<debug>
    if (!target.isContainer) {
        Ext.raise({
            target: target,
            msg: 'Components can only be loaded into a container'
        });
    }
    //</debug>

    try {
        items = (Ext.isObject(response.responseText) || Ext.isArray(response.responseText)) ? response.responseText : Ext.decode(response.responseText);
    } catch (e) {
        success = false;
    }

    if (success) {
        if (items && items['x.res']) {
            if (items['x.res'].ns) {
                Ext.ns.apply(Ext, items['x.res'].ns);
            }

            if (items.config) {
                response.responseText = items.config;
            }

            if (items['x.res'].res) {
                Ext.net.ResourceMgr.load(items['x.res'].res, Ext.Function.bind(Ext.ComponentLoader.Renderer.Component, this, [loader, response, active]));
                return;
            }
        } else {
            target.suspendLayouts();
            if (active.removeAll) {
                target.removeAll();
            }
            target.add(items);
            target.resumeLayouts(true);
        }
    }

    return success;
}

Ext.ComponentLoader.Renderer.Script = function (loader, response, active) {
    var success = true;

    try {
        if (window.execScript) {
            window.execScript(response.responseText);
        } else {
            window.eval.call(window, response.responseText);
        }
    } catch (e) {
        success = false;
    }

    return success;
};

Ext.define('Ext.net.ComponentLoader', {
    extend: 'Ext.ComponentLoader',
    autoLoad: true,
    removeD: false,

    constructor: function (config) {
        config = config || {};
        var autoLoad = config.autoLoad;
        config.autoLoad = false;

        Ext.net.ComponentLoader.superclass.constructor.call(this, config);

        if (autoLoad !== false) {
            this.autoLoad = true;
        }

        this.initLoader();
    },

    addMask: function (mask) {
        if (mask.showMask) {
            if (this.target.floating) {
                (this.target.body || this.target.el).mask(mask.msg || Ext.view.AbstractView.prototype.loadingText, mask.msgCls || "x-mask-loading");

                return;
            }

            this.callParent(arguments);
        }
    },

    removeMask: function () {
        if (this.target.floating) {
            (this.target.body || this.target.el).unmask();
            return;
        }

        this.callParent(arguments);
    },

    getLocation: function (href) {
        var l = document.createElement("a");
        l.href = href;
        return l;
    },

    isIFrame: function (cfg) {
        var frame = false;

        if (cfg.renderer == "frame") {
            return true;
        }

        if (typeof cfg == "string" && cfg.indexOf("://") >= 0 && this.getLocation(cfg).host != window.location.host) {
            frame = true;
        } else if (cfg.url && cfg.url.indexOf("://") >= 0 && this.getLocation(cfg.url).host != window.location.host) {
            frame = true;
        }

        return frame;
    },

    initLoader: function () {
        if (this.isIFrame(this)) {
            var target = this.getTarget();

            if (!target.isContainer) {
                throw 'IFrame can only be loader to a container';
            }

            target.layout = "fit";
            this.renderer = "frame";
        }

        var loadConfig = {
            delay: 10,
            single: true
        },
            triggerCmp,
            triggerControl = this.triggerControl || this.getTarget(),
            triggerEvent = this.triggerEvent,
            defaultTriggerEvent = triggerControl instanceof Ext.container.Container ? "afterlayout" : "afterrender"; // #938

        if (Ext.isFunction(triggerControl)) {
            triggerControl = triggerControl.call(window);
        } else if (Ext.isString(triggerControl)) {
            triggerCmp = Ext.net.ResourceMgr.getCmp(triggerControl);

            if (triggerCmp) {
                triggerControl = triggerCmp;
            } else {
                triggerControl = Ext.net.getEl(triggerControl);
            }
        }

        loadConfig.single = !(this.reloadOnEvent || false);

        if (this.autoLoad) {
            triggerControl.on(triggerEvent || defaultTriggerEvent, function () {
                this.load({});
            }, this, loadConfig);
        }
    },

    load: function (options) {
        if (Ext.isString(options)) {
            options = { url: options };
        } else {
            options = Ext.apply({}, options);
        }

        this.lastOptions = options;

        if (this.paramsFn) {
            this.params = this.paramsFn.call(this.paramsFnScope || this.getTarget());
        }

        if (options.paramsFn) {
            options.params = Ext.apply(options.params || {}, options.paramsFn.call(this.paramsFnScope || this.getTarget()));
        }

        if (!Ext.isDefined(options.passParentSize) && this.passParentSize) {
            options.params = options.params || {};
            options.params.width = (this.target.body || this.target.el).getWidth(true);
            options.params.height = (this.target.body || this.target.el).getHeight(true);
        }

        if (this.renderer == "frame") {
            this.loadFrame(options);
            return;
        }

        if (this.directMethod) {
            var me = this,
                mask = Ext.isDefined(options.loadMask) ? options.loadMask : me.loadMask,
                params = Ext.apply({}, options.params),
                callback = options.callback || me.callback,
                scope = options.scope || me.scope || me,
                method,
                dmCfg;

            Ext.applyIf(params, me.params);
            Ext.apply(params, me.baseParams);

            Ext.apply(options, {
                scope: me,
                params: params,
                callback: me.onComplete
            });

            if (me.fireEvent('beforeload', me, options) === false) {
                return;
            }

            if (mask) {
                me.addMask(mask);
            }

            method = Ext.decode(this.directMethod);

            dmCfg = {
                complete: function (success, result, response) {
                    me.onComplete(options, success, { responseText: result });
                }
            }

            if (method.length > 1) {
                method(Ext.encode(options.params), dmCfg);
            }
            else {
                method(dmCfg);
            }

            me.active = {
                options: options,
                mask: mask,
                scope: scope,
                callback: callback,
                success: options.success || me.success,
                failure: options.failure || me.failure,
                renderer: options.renderer || me.renderer,
                scripts: Ext.isDefined(options.scripts) ? options.scripts : me.scripts
            };

            me.setOptions(me.active, options);

            return;
        }

        Ext.net.ComponentLoader.superclass.load.apply(this, arguments);
    },

    loadFrame: function (options) {
        options = Ext.apply({}, options);

        var me = this,
            target = me.target,
            mask = Ext.isDefined(options.loadMask) ? options.loadMask : me.loadMask,
            monitorComplete = Ext.isDefined(options.monitorComplete) ? options.monitorComplete : me.monitorComplete,
            disableCaching = Ext.isDefined(options.disableCaching) ? options.disableCaching : me.disableCaching,
            disableCachingParam = options.disableCachingParam || "_dc",
            params = Ext.apply({}, options.params),
            callback = options.callback || me.callback,
            scope = options.scope || me.scope || me;

        Ext.applyIf(params, me.params);
        Ext.apply(params, me.baseParams);

        Ext.applyIf(options, {
            url: me.url
        });

        Ext.apply(options, {
            mask: mask,
            monitorComplete: monitorComplete,
            disableCaching: disableCaching,
            params: params,
            callback: callback,
            scope: scope
        });

        this.lastOptions = options;

        if (!options.url) {
            throw 'No URL specified';
        }

        if (me.fireEvent('beforeload', me, options) === false) {
            return;
        }

        var url = options.url;

        if (disableCaching !== false) {
            url = url + ((url.indexOf("?") > -1) ? "&" : "?") + disableCachingParam + "=" + new Date().getTime();
        }

        if (!Ext.Object.isEmpty(params)) {
            var p = {};

            for (var key in params) {
                var ov = params[key];

                if (typeof ov == "function") {
                    p[key] = ov.call(target);
                } else {
                    p[key] = ov;
                }
            }

            p = Ext.urlEncode(p);
            url = url + ((url.indexOf("?") > -1) ? "&" : "?") + p;
        }

        if (mask) {
            me.addMask(mask);
        }

        if (Ext.isEmpty(target.iframe)) {
            var iframeObj = {
                tag: "iframe",
                id: target.id + "_IFrame",
                name: target.id + "_IFrame",
                src: url,
                frameborder: 0
            },
                layout = target.getLayout();

            if (!target.layout || target.layout.type !== "fit") {
                target.setLayout(Ext.layout.Layout.create("fit"));
            }

            target.removeAll(true);

            var p = target,
                iframeCt = {
                    xtype: "component",
                    autoEl: iframeObj,
                    listeners: {
                        afterrender: function () {
                            var owner = this.ownerCt;
                            owner.iframe = this.el;

                            if (monitorComplete) {
                                owner.getLoader().startIframeMonitoring();
                            } else {
                                this.el.on("load", owner.getLoader().afterIFrameLoad, owner.getLoader());
                            }

                            owner.getLoader().beforeIFrameLoad(options);
                        }
                    }
                };

            if (Ext.platformTags.ios) { // #117
                target.getTargetEl().addCls("ios-iframe-scroll-fix");
            }

            target.add(iframeCt);
        } else {
            this.beforeIFrameLoad(options);

            // The test below avoids double loads on IE10+
            if (Ext.isIE && Ext.ieVersion <= 9) {
                // IE9 refresh iframe with pdf issue: http://forums.ext.net/showthread.php?24690
                window.frames[target.iframe.dom.name].location.replace(url);
            } else {
                target.iframe.dom.src = url; // #936
            }
        }

        if (!this.destroyIframeOnUnload) {
            this.destroyIframeOnUnload = true;

            // Commented out because of the GitHub issue #617
            // Ext.getWin().on("beforeunload", this.target.destroy, this.target);
        }
    },

    iframeCompleteCheck: function () {
        if (this.target.iframe.dom.readyState == "complete") {
            this.stopIframeMonitoring();
            this.afterIFrameLoad();
        }
    },

    startIframeMonitoring: function () {
        if (this.iframeTask) {
            this.iframeTask.stopAll();
            this.iframeTask = null;
        }

        this.iframeTask = new Ext.util.TaskRunner();
        this.iframeTask.start({
            run: this.iframeCompleteCheck,
            interval: 200,
            scope: this
        });
    },

    stopIframeMonitoring: function () {
        if (this.iframeTask) {
            this.iframeTask.stopAll();
            this.iframeTask = null;
        }
    },

    beforeIFrameLoad: function () {
        if (Ext.isString(this.parentRef) && (this.parentRef.length > 0)) {
            try {
                this.target.iframe.dom.contentWindow[this.parentRef] = this.target;
            } catch (e) { }
        }
    },

    afterIFrameLoad: function () {
        var options = this.lastOptions,
            doc;
        if (options.mask) {
            this.removeMask();
        }

        if (Ext.isString(this.parentRef) && (this.parentRef.length > 0)) {
            try {
                this.target.iframe.dom.contentWindow[this.parentRef] = this.target;
            } catch (e) { }
        }

        if (options.callback) {
            Ext.callback(options.callback, options.scope, [this, true, null, options]);
        }

        if (options.success) {
            Ext.callback(options.success, options.scope, [this, true, null, options]);
        }

        this.target.onIFrameLoad();

        try {
            doc = this.target.getWin().document;

            if (doc) {
                this.fireEvent("load", this, null, options);
            }
            else if (options.url) {
                this.fireEvent('exception', this, null, options);
            }
        } catch (ex) {
            this.fireEvent("load", this, null, options);
        }
    },

    getRenderer: function (renderer) {
        if (Ext.isFunction(renderer)) {
            return renderer;
        }

        switch (renderer) {
            case 'component':
                return Ext.ComponentLoader.Renderer.Component;
            case 'data':
                return Ext.ComponentLoader.Renderer.Data;
            case 'script':
                return Ext.ComponentLoader.Renderer.Script;
            default:
                return Ext.ElementLoader.Renderer.Html;
        }
    },

    onComplete: function (options, success, response, decodedResp) {
        var me = this,
            text,
            cfg,
            resp,
            active = me.active,
            scope,
            renderer;

        if (active) {
            scope = active.scope;
            renderer = me.getRenderer(active.renderer);

            if (success && !decodedResp && (this.removeD || (active && active.options && active.options.url && active.options.url.indexOf(".asmx") > 0))) {
                try {
                    text = response.responseText.replace(/{"d":null}$/, "");
                    cfg = Ext.decode(text, true);

                    if (cfg && cfg.d) {
                        text = cfg.d;
                    }
                    else if (active.renderer === "component") {
                        text = cfg;
                    }
                } catch (e) {
                    success = false;
                }

                resp = { responseText: text };
            }
            else {
                resp = response;
            }

            if (success && !decodedResp && active.renderer === "component") {
                if (Ext.isObject(resp.responseText)) {
                    cfg = resp.responseText;
                }
                else if (Ext.isString(resp.responseText)) {
                    cfg = Ext.decode(resp.responseText);
                    resp.responseText = cfg;
                }
                else {
                    cfg = null;
                }

                if (cfg && cfg['x.res']) {
                    if (cfg['x.res'].ns) {
                        Ext.ns.apply(Ext, cfg['x.res'].ns);
                    }

                    if (cfg.config) {
                        resp.responseText = cfg.config;
                    }

                    if (cfg['x.res'].res) {
                        Ext.net.ResourceMgr.load(cfg['x.res'].res, Ext.Function.bind(this.onComplete, this, [options, success, response, resp]));
                        return;
                    }
                }
            }

            if (success) {
                success = renderer.call(me, me, decodedResp || resp, active) !== false;
            }

            if (success) {
                Ext.callback(active.success, scope, [me, response, options]);
                me.fireEvent('load', me, response, options);
            } else {
                Ext.callback(active.failure, scope, [me, response, options]);
                me.fireEvent('exception', me, response, options);

                if (this.showWarningOnFailure !== false && !this.hasListener("exception")) {
                    Ext.net.DirectEvent.showFailure(response, response.responseText);
                }
            }
            Ext.callback(active.callback, scope, [me, success, response, options]);

            if (active.mask) {
                me.removeMask();
            }
        }

        delete me.active;
    }
});
Ext.Action.override({
    constructor: function () {
        this.callParent(arguments);
        this.proxyId = this.initialConfig.id;
        delete this.initialConfig.id;
        Ext.net.ComponentManager.registerId(this);
    },

    destroy: function () {
        Ext.net.ComponentManager.unregisterId(this);
    }
});

// @source core/buttons/Button.js

Ext.override(Ext.button.Button, {
	initComponent : function () {
        this.callParent(arguments);

        if (this.flat) {
            this.ui = this.ui + '-toolbar';
            this.focusCls = "";
        }
    },

    onRender : function (el) {
        this.callParent(arguments);

        this.onButtonRender(el);
    },

    getPressedField : function () {
        if (!this.pressedField && (this.hasId() || this.pressedHiddenName)) {
            this.pressedField = new Ext.form.Hidden({ 
                name : this.pressedHiddenName || (this.id + "_Pressed") 
            });

			this.on("beforedestroy", function () {
                this.destroy();                
            }, this.pressedField);
        }
        return this.pressedField;
    },
    
	onButtonRender : function (el) {
		if (this.enableToggle || !Ext.isEmpty(this.toggleGroup)) {
			var field = this.getPressedField();

            if (field) {
                field.render(this.el.parent() || this.el);
            }
		   
			this.on("toggle", function (el, pressed) {
				var field = this.getPressedField();
                
				if (field) {
                    field.setValue(pressed);
                }
			}, this);      
		}    

        if (this.standOut) {
            this.addCls(this.overCls);
        }
	},

    setIconCls : function (cls) {
        this.callParent([cls && cls.indexOf('#') === 0 ? X.net.RM.getIcon(cls.substring(1)) : cls]);
    },

    setIcon : function (icon) {
        if (this.iconCls && icon) {
            this.setIconCls("");
        }

        this.callParent([icon && icon.indexOf('#') === 0 ? X.net.RM.getIconUrl(icon.substring(1)) : icon]);
    },

    onEnable : function () {
        this.callParent(arguments);

        if (this.standOut) {
            this.addCls(this.overCls);
        } 
    },

    setLoading : function (config) {
        if (Ext.isBoolean(this.loadingState)) {
            delete this.loadingState;
        }
        
        this.loadingState = this.loadingState || {};

        var cfg = {};

        this.clearLoadingState = {};
        
        this.suspendLayouts();
        if (config && Ext.isString(config)) {
            this.loadingState.text = config;
        }

        if (Ext.isObject(config)) {
            Ext.apply(this.loadingState, config);            
        }

        config = this.loadingState;

        if (Ext.isDefined(config.glyph)) {
            cfg.glyph = this.glyph || null;
            this.setGlyph(config.glyph);
        }
               
        if (Ext.isDefined(config.iconCls) || (config.iconCls !== null && !Ext.isDefined(config.icon))) {
            cfg.iconCls = this.iconCls || "";
            this.setIconCls(config.iconCls || "x-loading-indicator");
        }

        if (Ext.isDefined(config.icon)) {
            cfg.icon = this.icon || "";
            this.setIcon(config.icon);
        }

        if (config.text !== null) {
            cfg.text = this.text || "";
            this.setText(Ext.isDefined(config.text) ? config.text : "Loading...");
        }

        if (Ext.isDefined(config.tooltip)) {
            cfg.tooltip = this.tooltip || "";
            this.setTooltip(config.tooltip);
        }

        if (Ext.isDefined(config.cls)) {
            cfg.cls = config.cls;
            this.addCls(config.cls);
        }

        if (config.disabled) {
            cfg.disabled = true;
            this.disable();
        }

        if (config.disabled === false) {
            cfg.disabled = false;
            this.enable();
        } else {
            cfg.disabled = true;
            this.disable();
        }

        if (config.hidden) {
            cfg.hidden = true;
            this.hide();
        }

        if (config.width || config.height) {
            cfg.size = this.getSize();
            this.setSize(config.width || cfg.size.width, config.height || cfg.height);
        }

        this.clearLoadingState = cfg;

        this.resumeLayouts(true);
    },

    // #741: Now button's btnWrap and inner btn have the UI and scale classes bound to them. These inner controls do not support
    // setUI() as they are not Ext.Component instances, so we either implement support for traversing the inner ellements and
    // review the bound classes or we just redraw the button. The code below redraws the button if its already rendered.
    setScale: function (scale) {
        var me = this;
        if (me.callParent(arguments));
        if (me.rendered) {
            me.setHtml('');
            me.protoEl = new Ext.util.ProtoElement();
            me.setupProtoEl();
            me.render();
        }
    },

    clearLoading : function () {
        if (this.clearLoadingState) {
            this.suspendLayouts();

            var config = this.clearLoadingState;

            if (Ext.isDefined(config.glyph)) {
                this.setGlyph(config.glyph);
            }

            if (Ext.isDefined(config.iconCls)) {
                this.setIconCls(config.iconCls);
            }

            if (Ext.isDefined(config.icon)) {
                this.setIcon(config.icon);
            }

            if (Ext.isDefined(config.text)) {
                this.setText(config.text);
            }

            if (Ext.isDefined(config.tooltip)) {
                this.setTooltip(config.tooltip);
            }

            if (Ext.isDefined(config.cls)) {
                this.removeCls(config.cls);
            }

            if (config.disabled) {
                this.enable();
            }

            if (config.hidden) {
                this.show();
            }

            if (config.size) {
                this.setSize(config.size);
            }

            delete this.clearLoadingState;

            this.resumeLayouts(true);
        }
    },

    beforeDirectEvent : function (o) {
        if (o.action === "Click" && this.loadingState) {
            this.setLoading();
        }
    },

    afterDirectEvent : function (o) {
        if (o.action === "Click" && this.clearLoadingState) {
            this.clearLoading();
        }
    },

    onDirectEventCancel: function(o) {
        if (o.action === "Click" && this.clearLoadingState) {
            this.clearLoading();
        }
    },

    privates: {
        addOverCls: function () {
            if (!this.disabled && !this.standOut) {
                this.addCls(this.overCls);
            }
        },

        removeOverCls: function () {
            if (!this.standOut) {
                this.removeCls(this.overCls);
            }
        },

        wrapPrimaryEl: function (dom) {
            Ext.Component.prototype.wrapPrimaryEl.call(this, dom);
        }
    }
});

// @source core/buttons/CycleButton.js

Ext.button.Cycle.override({
    setActiveItem: function (item, suppressEvent) {
        this.callParent(arguments);

        if (!this.forceIcon && item.icon) {
            this.setIcon(item.icon);
        }
    },

    // #286
    toggleSelected: function() {
        var me = this,
            m = me.menu,
            checkItem;

        checkItem = me.activeItem.next(':not([disabled])[setChecked]') || m.items.getAt(0); // added "setChecked"
        checkItem.setChecked(true);
    } 
});

// @source core/buttons/Hyperlink.js

Ext.define("Ext.net.HyperlinkButton", {
    extend : "Ext.button.Button",
    alias  : "widget.nethyperlinkbutton",
    buttonSelector : "a:first",
    cls : "",
    iconAlign : "left",
    initRenderTpl : Ext.emptyFn,
    applyRenderSelectors : Ext.emptyFn,
    componentLayout : null,
    scale : null,   
    autoEl : 'span', 
    frame: false,

    initComponent : function () {
        this.callParent();
        
        this.autoEl = {
            tag: 'span',
            role: 'button',
            hidefocus: 'on',
            unselectable: 'on'
        };
        this.setIconCls = this.setIconClass;
    },

    // private
    onMenuShow : function (e) {
        this.fireEvent("menushow", this, this.menu);
    },
    
    // private
    onMenuHide : function (e) {
        this.fireEvent("menuhide", this, this.menu);
    },

    toggle: function (state) {
        // #1448: if this has been called by Ext.Button.Button.doToggle(), it
        // has the 'toggle depressed state' meaning, which does not match the
        // actual meaning here (which is to toggle enabled state).
        // If so, then call parent method (if any).
        var ejsCaller = (Ext.isIE ? "Ext.button.Button#" : "") + "doToggle";

        if (arguments && arguments.callee && arguments.callee.caller &&
            arguments.callee.caller.name == ejsCaller) {
            return this.callParent(arguments);
        }

        // Else, proceed to the enabled state toggling.
        state = state === undefined ? !this.pressed : state;
        if (state != this.pressed) {
            if (state) {
                this.setDisabled(true);
                this.disabled = false;
                this.pressed = true;
                
                if (this.allowDepress !== false) {
                    this.textEl.style.cursor = "pointer";
                    this.el.dom.style.cursor = "pointer";
                }
                this.fireEvent("toggle", this, true);
            } else {
                this.disabled = true; // this will allow onEnable() event to be triggered
                this.setDisabled(false);
                this.pressed = false;
                this.fireEvent("toggle", this, false);
            }
            
            if (this.toggleHandler) {
                this.toggleHandler.call(this.scope || this, this, state);
            }
        }
    },

    valueElement : function () {
        var textEl = document.createElement("a");
        
        textEl.style.verticalAlign = "middle";
        
        if (!Ext.isEmpty(this.cls, false)) {
            textEl.className = this.cls;
        }

        textEl.setAttribute("href", this.href || "javascript:;");

        if (this.hrefTarget) {
            textEl.setAttribute("target", this.hrefTarget);
        }

        if (this.disabled || this.pressed) {
            textEl.setAttribute("disabled", "1");
            textEl.removeAttribute("href");

            if (this.pressed && this.allowDepress !== false) {
                textEl.style.cursor = "pointer";
            }
        }

        if (this.tabIndex) {
            textEl.tabIndex = this.tabIndex;
        }
        
        if (this.tooltip) {
            if (typeof this.tooltip == "object") {
                Ext.QuickTips.register(Ext.apply({
                    target : textEl.id
                }, this.tooltip));
            } else {
                textEl[this.tooltipType] = this.tooltip;
            }
        }

        textEl.innerHTML = this.text;

        this.textEl = textEl;
        return this.textEl;
    },

    getElConfig : function () {
        return Ext.apply(this.callParent(), {
            id : this.getId(),
            tag : "span"
        });
    },

    onRender : function (ct, position) {
        var el = this.el.dom;

        var img = document.createElement("img");
        img.src = Ext.BLANK_IMAGE_URL;
        img.className = "x-label-icon " + (this.iconCls || "");

        if (Ext.isEmpty(this.iconCls)) {
            img.style.display = "none";
        }

        if (this.iconAlign == "left") {
            el.appendChild(img);
        }

        el.appendChild(this.valueElement());
        this.btnEl = Ext.get(this.textEl);
        this.ariaEl = this.el; // required because of "applyRenderSelectors : Ext.emptyFn"

        if (this.iconAlign == "right") {
            el.appendChild(img);
        }

        this.callParent(arguments);

        // Only an anchor element should be clickable
        this.mun(this.el, this.clickEvent, this.onClick, this);
        this.mon(Ext.get(this.textEl), this.clickEvent, this.onClick, this);
        this.el.dom.style.cursor = "default";

        if (this.pressed && this.allowDepress !== false) {
            this.setDisabled(true);
            this.disabled = false;
            this.textEl.style.cursor = "pointer";
        }

        if (Ext.isIE) { // #624, #1318
            this.on({
                element: "el",
                delegate: "a",
                translate: false,
                click: function (e) {
                    e.preventDefault();
                }
            });
        }
    },

    getTriggerSize : function () {
        return 0;
    },
    
    setText : function (t, encode) {
        this.text = t;
        
        if (this.rendered) {
            this.textEl.innerHTML = encode !== false ? Ext.util.Format.htmlEncode(t) : t;
        }
        
        return this;
    },
    
    setIconClass : function (cls) {
        var oldCls = this.iconCls;
        
        this.iconCls = cls;
        
        if (this.rendered) {
            var img = this.el.child("img.x-label-icon");
            img.replaceCls(oldCls, this.iconCls);
            img.dom.style.display = (cls === "") ? "none" : "inline";
        }
    },

    onDisable : function () {
        Ext.net.HyperlinkButton.superclass.onDisable.apply(this);
        this.textEl.setAttribute("disabled", "1");
        this.textEl.removeAttribute("href");
    },
    
    onEnable : function () {
        Ext.net.HyperlinkButton.superclass.onEnable.apply(this);
        this.textEl.removeAttribute("disabled");
        this.textEl.setAttribute("href", this.href || "javascript:;");
    },

    privates: {
        wrapPrimaryEl: function (dom) {
            Ext.Component.prototype.wrapPrimaryEl.call(this, dom);
        }
    }
});

// @source core/buttons/ImageButton.js

Ext.define("Ext.net.ImageButton", {
    extend : "Ext.button.Button",
    alias  : "widget.netimagebutton",
    cls    : "",
    iconAlign      : "left",
    initRenderTpl: Ext.emptyFn,
    componentLayout : null,
    autoEl: 'img',
    frame: false,

    initComponent : function () {
        this.scale = null;
        this.callParent();       
        
        this.autoEl = {
            tag: 'img',
            role: 'button',
            hidefocus: 'on',
            unselectable: 'on'
        };
        
        var i;
        
        if (this.imageUrl) {
            i = new Image().src = this.imageUrl;
        }

        if (this.overImageUrl) {
            i = new Image().src = this.overImageUrl;
        }

        if (this.disabledImageUrl) {
            i = new Image().src = this.disabledImageUrl;
        }

        if (this.pressedImageUrl) {
            i = new Image().src = this.pressedImageUrl;
        }
    },

    getElConfig : function () {
        var config = this.callParent();

        Ext.applyIf(config.style, this.getStyle());

        return Ext.apply(config, {
            tag: "img",
            id: this.getId(),
            src: this.imageUrl
        });
    },

    getStyle : function () {
        var style = {
            border: "none",
            cursor: "pointer"
        };

        if (this.height) {
            style.height = this.height + "px;";
        }

        if (this.width) {
            style.width = this.width + "px;";
        }

        return style;
    },

    onRender : function (ct, position) {
        this.imgEl = this.el;        

        if (!Ext.isEmpty(this.imgEl.getAttribute("width"), false) ||
            !Ext.isEmpty(this.imgEl.getAttribute("height"), false)) {
            this.imgEl.dom.removeAttribute("width");
            this.imgEl.dom.removeAttribute("height");
        }

        if (this.altText) {
            this.imgEl.dom.setAttribute("alt", this.altText);
        }

        if (this.align && this.align !== "notset") {
            this.imgEl.dom.setAttribute("align", this.align);
        }

        if (this.pressed && this.pressedImageUrl) {
            this.imgEl.dom.src = this.pressedImageUrl;
        }

        if (this.tabIndex !== undefined) {
            this.imgEl.dom.tabIndex = this.tabIndex;
        }
        
        //this.imgEl.on(this.clickEvent, this.onClick, this);		
            		
		if (this.href) {
			this.on("click", function () {
				if (this.target) {
					window.open(this.href, this.target);
				} else {
					window.location = this.href;
				}
			}, this);
		}
			
		this.callParent(arguments);

        if (this.disabled) {
            this.setDisabled(true);
        }

		this.btnEl = this.el;
    },

    // private
    onMenuShow : function (e) {
        if (this.pressedImageUrl) {
            this.imgEl.dom.src = this.pressedImageUrl;
        }
        this.fireEvent("menushow", this, this.menu);
    },
    
    // private
    onMenuHide : function (e) {
        this.imgEl.dom.src = (this.monitoringMouseOver) ? this.overImageUrl : this.imageUrl;
        this.fireEvent("menuhide", this, this.menu);
        this.focus();
    },

    getTriggerSize : function () {
        return 0;
    },

    toggle: function (state, suppressEvent, suppressHandler) {
        state = state === undefined ? !this.pressed : !!state;

        if (state != this.pressed) {
            if (state) {
                if (this.pressedImageUrl) {
                    this.imgEl.dom.src = this.pressedImageUrl;
                }
 
                this.pressed = true;
            } else {
                this.imgEl.dom.src = (this.monitoringMouseOver) ? this.overImageUrl : this.imageUrl;
                this.pressed = false;
            }

            if (!suppressEvent) {
                this.fireEvent("toggle", this, this.pressed);
            }
                        
            if (this.toggleHandler && !suppressHandler) {
                this.toggleHandler.call(this.scope || this, this, state);
            }
        }
        return this;
    },

    setText : Ext.emptyFn,

    setDisabled : function (disabled) {
        this.disabled = disabled;

        if (!this.rendered) {
            return;
        }
        
        if (this.imgEl && this.imgEl.dom) {
            this.imgEl.dom.disabled = disabled;
        }
        
        if (disabled) {
            if (this.disabledImageUrl) {
                this.imgEl.dom.src = this.disabledImageUrl;
            } else {
                this.imgEl.addCls(this.disabledCls);
            }

            this.imgEl.setStyle({ cursor: "default" });
        } else {
            this.imgEl.dom.src = this.imageUrl;
            this.imgEl.setStyle({ cursor: "pointer" });
            this.imgEl.removeCls(this.disabledCls);
        }
    },

    enable: function() {
        this.setDisabled(false);
    },

    disable: function() {
        this.setDisabled(true);
    },
    
    onMouseOver : function (e) {
        if (!this.disabled) {
            var internal = e.within(this.el.dom, true);

            if (!internal) {
                if (this.overImageUrl && !this.pressed && !this.hasVisibleMenu()) {
                    this.imgEl.dom.src = this.overImageUrl;
                }

                if (!this.monitoringMouseOver) {
                    Ext.getDoc().on("mouseover", this.monitorMouseOver, this);
                    this.monitoringMouseOver = true;
                }
            }
        }

        this.fireEvent("mouseover", this, e);
    },
    
    monitorMouseOver : function (e) {
        if (e.target != this.el.dom && !e.within(this.el)) {
            if (this.monitoringMouseOver) {
                Ext.getDoc().un('mouseover', this.monitorMouseOver, this);
                this.monitoringMouseOver = false;
            }
            this.onMouseOut(e);
        }
    },
    
    onMouseEnter : function (e) {
        if (this.overImageUrl && !this.pressed && !this.disabled && !this.hasVisibleMenu()) {
            this.imgEl.dom.src = this.overImageUrl;
        }
        this.fireEvent("mouseover", this, e);
    },

    // private
    onMouseOut : function (e) {
        if (!this.disabled && !this.pressed && !this.hasVisibleMenu()) {
            this.imgEl.dom.src = this.imageUrl;
        }
        
        this.fireEvent("mouseout", this, e);
    },

    onMouseDown : function (e) {
        var me = this;

        if (Ext.isIE || e.pointerType === 'touch') {
            // In IE the use of unselectable on the button's elements causes the element
            // to not receive focus, even when it is directly clicked.
            // On Touch devices, we need to explicitly focus on touchstart.
            Ext.defer(function () {
                // Deferred to give other mousedown handlers the chance to preventDefault
                if (!e.defaultPrevented) {
                    var focusEl = me.getFocusEl();

                    // The component might be destroyed by this time
                    if (focusEl) {
                        focusEl.focus();
                    }
                }
            }, 1);
        }

        if (!me.disabled && e.button === 0) {
            if (me.pressedImageUrl) {
                me.imgEl.dom.src = me.pressedImageUrl;
            }
            
            Ext.button.Manager.onButtonMousedown(me, e);
        }
    },
    
    // private
    onMouseUp : function (e) {
        if (!this.destroyed && e.button === 0 && !this.enableToggle && !this.hasVisibleMenu()) {
            this.imgEl.dom.src = (this.overImageUrl && this.monitoringMouseOver) ? this.overImageUrl : this.imageUrl;
        }
    },
    
    setImageUrl : function (image) {
        this.imageUrl = image;
        
        if ((!this.disabled || Ext.isEmpty(this.disabledImageUrl, false)) && 
            (!this.pressed || Ext.isEmpty(this.pressedImageUrl, false))) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    
    setDisabledImageUrl : function (image) {
        this.disabledImageUrl = image;
        
        if (this.disabled) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    
    setOverImageUrl : function (image) {
        this.overImageUrl = image;
        
        if ((!this.disabled || Ext.isEmpty(this.disabledImageUrl, false)) &&            
            (!this.pressed || Ext.isEmpty(this.pressedImageUrl, false))) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    
    setPressedImageUrl : function (image) {
        this.pressedImageUrl = image;
        
        if ((!this.disabled || Ext.isEmpty(this.disabledImageUrl, false)) && this.pressed) {
            this.imgEl.dom.src = image;
        } else {
            new Image().src = image;
        }
    },
    
    setAlign : function (align) {
        this.align = align;
        
        if (this.rendered) {
            this.imgEl.dom.setAttribute("align", this.align);
        }
    },

    setAltText : function (altText) {
        this.altText = altText;
        
        if (this.rendered) {
            this.imgEl.dom.setAttribute("altText", this.altText);
        }
    }
});

// @source window/Toast.js
Ext.define('Ext.window.Toast', {
    override: 'Ext.window.Toast',

    // Ensure we use originalCloseAction in case Ext.window.Window override is already in place (#1414)
    closeAction: Ext.window.Window.prototype.originalCloseAction !== undefined ? Ext.window.Window.prototype.originalCloseAction : Ext.window.Window.prototype.closeAction
});

// @source window/Window.js
Ext.window.Window.override({
    // This will store original close action so that child classes can get
    // the original behavior no matter what currently is in ExtJS original code.
    // By #1414, Ext.window.Toast should not have default close action as "hide"
    // or display issues will happen.
    originalCloseAction: Ext.window.Window.prototype.closeAction,

    closeAction: "hide",
    defaultRenderTo: "body",
    initialAlphaNum: /^[a-z0-9]/i,

    onAdded: function () {
        this.callParent(arguments);

        if (this.initialConfig && this.initialConfig.hidden === false && this.ownerCt) {
            if (this.ownerCt.rendered) {
                this.show();
            } else {
                this.ownerCt.on("afterlayout", function () {
                    this.show();
                }, this, { single: true, delay: 10 });
            }
        }
    },

    privates: {

        initContainer: function (container) {
            var me = this;

            if (!container && me.el) {
                container = me.el.dom.parentNode;
                me.allowDomMove = false;
            }

            me.container = container.dom ? container : Ext.get(container);

            if (this.container.dom == (Ext.net.ResourceMgr.getAspForm() || {}).dom) {
                me.container = Ext.getBody();
            }

            return me.container;
        },

        doAutoRender: function () {
            var me = this;

            if (!me.rendered) {
                var form = Ext.net.ResourceMgr.getAspForm(),
                    ct = ((this.defaultRenderTo === "body" || !form) ? Ext.getBody() : form);

                if (me.floating) {
                    me.render(ct);
                } else {
                    me.render(Ext.isBoolean(me.autoRender) ? ct : me.autoRender);
                }
            }
        }
    },

    render: function (container, position) {
        var me = this,
            el = me.el,
            ownerLayout = me.ownerLayout,
            vetoed, tree, nextSibling;

        if (el && !el.isElement) {
            me.el = el = me.wrapPrimaryEl(el); // ensure me.el is wrapped
        }

        Ext.suspendLayouts();

        container = container.dom ? container : Ext.get(container);
        var newcontainer = me.initContainer(container);

        if (container.dom != (Ext.net.ResourceMgr.getAspForm() || {}).dom) {
            container = newcontainer;
        }

        nextSibling = me.getInsertPosition(position);

        if (!el) {
            tree = me.getRenderTree();  // calls beforeRender

            if (ownerLayout && ownerLayout.transformItemRenderTree) {
                tree = ownerLayout.transformItemRenderTree(tree);
            }

            // tree will be null if a beforerender listener returns false
            if (tree) {
                if (nextSibling) {
                    el = Ext.DomHelper.insertBefore(nextSibling, tree);
                } else {
                    el = Ext.DomHelper.append(container, tree);
                }

                me.wrapPrimaryEl(el);
                // Just rendered a bunch of stuff so fill up the cache with those els we
                // will need.
                me.cacheRefEls(el);
            }
        } else {
            if (!me.hasListeners.beforerender || me.fireEvent('beforerender', me) !== false) {
                me.beforeRender();
                // We're simulating the above block here as much as possible, but we're already
                // given an el, so we don't need to create it. We still need to initialize the renderTpl later.
                me.needsRenderTpl = me.rendering = true;
                me._renderState = 2;

                // Set configured styles on pre-rendered Component's element
                me.initStyles(el);
                if (me.allowDomMove !== false) {
                    if (nextSibling) {
                        container.dom.insertBefore(el.dom, nextSibling);
                    } else {
                        container.dom.appendChild(el.dom);
                    }
                }
            } else {
                vetoed = true;
            }
        }

        if (el && !vetoed) {
            me.finishRender(position);
        }

        Ext.resumeLayouts(!me.hidden && !container.isDetachedBody);

        if (me.initialConfig && me.initialConfig.hidden === false) {
            me.toFront();
        }
    }
});

Ext.window.MessageBox.override({
    updateButtonText : function () {
        var me = this,
            btnId,
            btn,
            buttons = 0;

        for (btnId in me.buttonText) {
            if (me.buttonText.hasOwnProperty(btnId)) {
                btn = me.msgButtons[btnId];
                if (btn) {
                    if (me.cfg && me.cfg.buttons && Ext.isObject(me.cfg.buttons)) {
                        buttons = buttons | Math.pow(2, Ext.Array.indexOf(me.buttonIds, btnId));
                    }

                    if (btn.text != me.buttonText[btnId]) {
                        btn.setText(me.buttonText[btnId]);
                    }
                }
            }
        }

        return buttons;
    }
});
// @source core/form/Field.js

Ext.form.field.Base.override({
    isRemoteValidation: false,
    remoteValidatingMessage: "Validating...",

    initComponent: function () {
        this.callParent(arguments);

        this.remoteValidationSuccess = Ext.Function.bind(this.remoteValidationSuccess, this);
        this.remoteValidationFailure = Ext.Function.bind(this.remoteValidationFailure, this);

        if (this.isRemoteValidation) {
            this.activateRemoteValidation();
        }
    },

    getName : function () {
        if (this.name) {
            return this.name;
        } else if (this.hasId()) {
            return this.id;
        }
    },

    onRender: function (el) {
        this.callParent(arguments);
        if (this.inputEl && this.submitValue === false) {
            this.inputEl.dom.name = "";
            this.inputEl.dom.removeAttribute('name');
        }
    },

    onBlur: function () {
        if (this.inEditor && this.surpressBlur) {
            return;
        }

        this.callParent(arguments);
    },

    getRawValue: function () {
        var me = this,
            v = (me.inputEl ? me.inputEl.getValue() : Ext.valueFrom(me.rawValue || me.value, ''));
        me.rawValue = v;
        return v;
    },

    getErrors: function (value) {
        var me = this,
            errors = [],
            validator = me.validator,
            vtype = me.vtype,
            vtypes = Ext.form.field.VTypes,
            validationField = this.getValidationField(),
            validation = this.getValidation(),
            msg, trimmed, isStr, result;

        if (validationField) {
            result = validationField.validate(value);
            if (result !== true) {
                errors.push(result);
            }
        }

        if (validation && validation !== true) {
            errors.push(validation);
        }

        value = (value || value === 0) ? value : me.getRawValue();

        if (Ext.isFunction(validator)) {
            msg = validator.call(me, value, me.vtypeParams);
            if (msg !== true) {
                errors.push(Ext.isString(msg) ? msg : (me.validatorText || "Value is invalid"));
            }
        }

        isStr = Ext.isString(value);
        trimmed = (me.allowOnlyWhitespace || !isStr) ? value : Ext.String.trim(value);

        if (!me.validateBlank && ((isStr && trimmed.length < 1) || (value === me.emptyText && me.valueContainsPlaceholder))) {
            return errors;
        }

        if (vtype) {
            if (!vtypes[vtype](value, me, me.vtypeParams)) {
                errors.push(me.vtypeText || vtypes[vtype + 'Text']);
            }
        }

        return errors;
    },

    

    activateRemoteValidation: function () {
        this.originalIsValid = this.isValid;
        this.originalValidate = this.validate;

        this.isValid = this.rv_isValid;
        this.validate = this.rv_validate;

        this.rvConfig = Ext.apply({
            remoteValidated: false,
            remoteValid: false,
            validationEvent: "change",
            eventOwner: "field",
            validationBuffer: 500,
            showBusy: true,
            busyIconCls: "x-loading-indicator",
            busyTip: "Validating...",
            initValueValidation: "valid",
            errorMessage: "Invalid",
            responseFields: {
                success: "valid",
                message: "message",
                returnValue: "value"
            }
        }, this.remoteValidationOptions || {});

        var fn = function () {
            this.rvTask = new Ext.util.DelayedTask(this.remoteValidate, this);

            if (this.rvConfig.validationEvent && this.rvConfig.validationEvent.indexOf(",") > 0) {
                this.rvConfig.validationEvent = this.rvConfig.validationEvent.split(",");
            }

            if (Ext.isArray(this.rvConfig.validationEvent)) {
                Ext.each(this.rvConfig.validationEvent, function (event) {
                    (this.rvConfig.eventOwner == "input" ? this.inputEl : this).on(event, this.performRemoteValidation, this);
                }, this);
            }
            else {
                (this.rvConfig.eventOwner == "input" ? this.inputEl : this).on(this.rvConfig.validationEvent, this.performRemoteValidation, this);
            }
        };

        if (this.rendered) {
            fn.call(this);
        } else {
            this.on("render", fn);

            this.on("afterrender", function () {
                //if (this.value !== undefined) {
                switch (this.rvConfig.initValueValidation) {
                    case "valid":
                        this.markAsValid();
                        break;
                    case "invalid":
                        // do nothing
                        break;
                    case "validate":
                        this.remoteValidate();
                        break;
                }
                //}
            });
        }
    },

    // private, does not work for all fields
    append: function (v) {
        this.setValue([this.getValue(), v].join(''));
    },

    deactivateRemoteValidation: function () {
        this.isValid = this.originalIsValid;
        this.validate = this.originalValidate;

        if (this.rvTask) {
            this.rvTask.cancel();
        }

        if (Ext.isArray(this.rvConfig.validationEvent)) {
            Ext.each(this.rvConfig.validationEvent, function (event) {
                (this.rvConfig.eventOwner == "input" ? this.inputEl : this).un(event, this.performRemoteValidation, this);
            }, this);
        }
        else {
            (this.rvConfig.eventOwner == "input" ? this.inputEl : this).un(this.rvConfig.validationEvent, this.performRemoteValidation, this);
        }

        delete this.originalIsValid;
        delete this.originalValidate;
    },

    // this method is used with remote validation only
    markAsValid: function (abortRequest) {
        if (!this.isRemoteValidation) {
            return;
        }

        this.rvConfig.validating = false;
        this.rvConfig.remoteValidated = true;
        this.rvConfig.remoteValid = true;

        if (this.validationId && abortRequest !== false) {
            Ext.net.DirectEvent.abort(this.validationId);
        }
    },

    rv_isValid: function () {
        if (this.disabled) {
            return true;
        }

        if (this.rvConfig.validating) {
            preventMark = true;
        }

        return this.originalIsValid.call(this) && !this.rvConfig.validating && this.rvConfig.remoteValidated && this.rvConfig.remoteValid;
    },

    localValidate: function () {
        var me = this,
            isValid = me.originalIsValid.call(me);

        if (isValid !== me.wasValid) {
            me.wasValid = isValid;
            me.fireEvent('validitychange', me, isValid);
        }

        return isValid;
    },

    rv_validate: function () {
        var clientValid = this.localValidate(),
            orgPrevent;

        if (!this.disabled && !clientValid) {
            return false;
        }

        if (this.rvConfig.validating) {
            orgPrevent = this.preventMark;
            this.preventMark = true;
            this.markInvalid(this.remoteValidatingMessage);
            this.preventMark = orgPrevent;
            this.wasValid = false;
            this.fireEvent('validitychange', this, false);
            return false;
        }

        if (this.disabled || (clientValid && (!this.rvConfig.remoteValidated || this.rvConfig.remoteValid))) {
            if (!this.rvConfig.ignoreLastValue && this.rvConfig.lastValue === this.getValue() && this.rvConfig.remoteValid === false) {
                this.markInvalid(this.rv_response.message || this.rvConfig.errorMessage);
                this.wasValid = false;
                this.fireEvent('validitychange', this, false);
            } else {
                this.clearInvalid();
                this.wasValid = true;
                this.fireEvent('validitychange', this, true);
            }

            return this.rvConfig.remoteValid;
        }

        if (this.rvConfig.remoteValidated && !this.rvConfig.remoteValid) {
            orgPrevent = this.preventMark;
            this.preventMark = this.rvConfig.validating;
            this.markInvalid(this.rv_response.message || this.rvConfig.errorMessage);
            this.preventMark = orgPrevent;
            this.wasValid = this.rvConfig.validating;
            this.fireEvent('validitychange', this, this.rvConfig.validating);
            return false;
        }

        return false;
    },

    performRemoteValidation: function (e) {
        var orgPrevent = this.preventMark;
        this.preventMark = true;

        if ((this.rvConfig.lastValue === this.getValue() && !this.rvConfig.ignoreLastValue) || !this.originalIsValid(true)) {
            this.preventMark = orgPrevent;
            this.rvTask.cancel();
            return;
        }

        this.preventMark = orgPrevent;

        if (!e || !e.isNavKeyPress || (e && e.isNavKeyPress && !e.isNavKeyPress())) {
            if (e && e.normalizeKey) {
                var k = e.normalizeKey(e.keyCode);

                if (k >= 16 && k <= 20) {
                    return;
                }
            }

            this.rvTask.delay(this.rvConfig.validationBuffer);
        }
    },

    remoteValidate: function () {
        this.rvConfig.remoteValid = false;
        this.rvConfig.remoteValidated = false;

        var dc = Ext.apply({}, this.remoteValidationOptions),
            options = { params: {} };

        if (this.fireEvent("beforeremotevalidation", this, options) !== false) {
            dc.userSuccess = this.remoteValidationSuccess;
            dc.userFailure = this.remoteValidationFailure;
            dc.extraParams = Ext.apply(dc.extraParams || {}, options.params);
            dc.control = this;
            dc.eventType = "postback";
            dc.action = "remotevalidation";

            var o = {
                id: this.id,
                name: this.name,
                value: this.getValue()
            },
                directFn = dc.directFn;

            dc.serviceParams = Ext.encode(o);

            if (dc.url && !directFn) {
                dc.cleanRequest = true;

                if (dc.json && Ext.isEmpty(dc.method, false)) {
                    dc.method = "POST";
                }

                dc.extraParams = Ext.apply(dc.extraParams, o);
                dc.type = "load";
            }

            if (this.rvConfig.showBusy) {
                this.saveIndicator("remotevalidation", true);
                this.setIndicatorIconCls(this.rvConfig.busyIconCls, true);
                this.showIndicator();

                if (this.rvConfig.busyTip) {
                    this.setIndicatorTip(this.rvConfig.busyTip);
                }
            }

            this.rvConfig.remoteValidated = false;
            this.rvConfig.validating = true;
            this.rvConfig.lastValue = o.value;

            this.wasValid = false;
            this.fireEvent('validitychange', false);

            if (this.validationId) {
                this.validationId.abortedByEvent = true;

                try {
                    Ext.net.DirectEvent.abort(this.validationId);
                } catch (e) { }
            }

            if (directFn) {
                if (Ext.isString(directFn)) {
                    directFn = Ext.decode(directFn);
                }

                var extraParams = dc.extraParams;

                delete dc.extraParams;
                delete dc.serviceParams;
                delete dc.control;
                delete dc.eventType;
                delete dc.action;

                dc.successSeq = dc.userSuccess;
                dc.failureSeq = dc.userFailure;

                delete dc.userSuccess;
                delete dc.userFailure;
                dc.showFailureWarning = false;

                if (directFn.length === 2) {
                    this.validationId = directFn(o.value, dc);
                }
                else if (directFn.length === 3) {
                    this.validationId = directFn(o.value, o.name, dc);
                }
                else if (directFn.length === 4) {
                    this.validationId = directFn(o.value, o.name, o.id);
                }
                else {
                    this.validationId = directFn(o.value, o.name, o.id, extraParams || null, dc);
                }
            }
            else {
                this.validationId = Ext.net.DirectEvent.request(dc);
            }
        }
    },

    remoteValidationSuccess: function (response, result, context, type, action, extraParams, o) {
        var isException = false,
            responseObj;

        this.rvConfig.validating = false;
        this.validationId = null;

        if (this.rvConfig.showBusy) {
            //this.preserveIndicatorIcon = false;
            this.restoreIndicator("remotevalidation");
        }

        try {
            if (this.remoteValidationOptions && this.remoteValidationOptions.directFn) {
                responseObj = Ext.isEmpty(result.result, true) ? (result.d || result) : result.result;

                if (Ext.isString(responseObj)) {
                    result = {
                        success: false,
                        message: responseObj
                    };
                }
                else if (Ext.isBoolean(responseObj)) {
                    result = {
                        success: responseObj
                    };
                }
                else {
                    result = responseObj;
                }
            }
            else {
                responseObj = result.serviceResponse || result.d || result;

                result = {
                    success: responseObj[this.rvConfig.responseFields.success],
                    message: responseObj[this.rvConfig.responseFields.message],
                    value: responseObj[this.rvConfig.responseFields.returnValue]
                };
            }
        } catch (ex) {
            result = {
                success: false,
                message: ex.message
            };

            isException = true;

            this.rvConfig.remoteValidated = true;
            this.rvConfig.remoteValid = false;

            this.fireEvent("remotevalidationinvalid", this, response, responseObj, ex, o);

            if (o.cancelWarningFailure !== true &&
              (this.remoteValidationOptions || {}).showWarningFailure !== false &&
              !this.hasListener("remotevalidationinvalid")) {
                Ext.net.DirectEvent.showFailure(response, response.responseText);
            }

            return;
        }

        if (!isException && result.success !== true) {
            this.fireEvent("remotevalidationinvalid", this, response, responseObj, result, o);
        }

        if (result.success === true) {
            this.fireEvent("remotevalidationvalid", this, response, responseObj, result, o);
        }

        if (result.value !== null && Ext.isDefined(result.value)) {
            this.setValue(result.value);
        }

        this.rvConfig.remoteValidated = true;
        this.rvConfig.remoteValid = result.success;
        this.rv_response = result;
        this.validate();
    },

    remoteValidationFailure: function (response, result, context, type, action, extraParams, o) {
        if (response.request.abortedByEvent) {
            return;
        }

        this.validationId = null;

        if (this.rvConfig.showBusy) {
            this.restoreIndicator("remotevalidation");
        }

        this.fireEvent("remotevalidationfailure", this, response, { message: response.statusText }, o);

        this.rvConfig.validating = false;
        this.rvConfig.remoteValidated = true;
        this.rvConfig.remoteValid = false;
        this.rv_response = {
            success: false,
            message: response.responseText
        };

        this.wasValid = false;
        this.fireEvent('validitychange', false);

        if (o.cancelWarningFailure !== true &&
            (this.remoteValidationOptions || {}).showWarningFailure !== false &&
            !this.hasListener("remotevalidationfailure")) {
            Ext.net.DirectEvent.showFailure(response, response.responseText);
        }
    }

    
});
// @source core/form/FieldExtensions.js

Ext.net.FieldNote = {
    autoFitIndicator: true,
    useHiddenField: false,
    includeHiddenStateToSubmitData: true,
    submitEmptyHiddenState: true,
    overrideSubmiDataByHiddenState: false,
    isIndicatorActive: false,

    initHiddenFieldState: function () {
        this.initName();
        if (this.useHiddenField) {
            this.on("change", this.syncHiddenState, this);
        }
    },

    onFieldMutation: function () {
        this.callParent(arguments);

        if (this.useHiddenField) {
            this.syncHiddenState();
        }
    },

    syncHiddenState: function () {
        if (this.hiddenField) {
            var val = this.getHiddenState(this.getValue());

            this.hiddenField.dom.value = val !== null ? val : "";

            this.checkHiddenStateName();
        }
        else {
            this.hiddenValue = this.getHiddenState(this.getValue());
        }
    },

    initName: function () {
        if (!this.name) {
            this.name = this.id || this.getInputId();
        }
    },

    getHiddenStateName: function () {
        return "_" + this.getName() + "_state";
    },

    getSubmitData: function () {
        var me = this,
            data = null,
            val;

        if (!me.disabled && me.submitValue && !me.isFileUpload()) {
            val = me.getSubmitValue();

            if (val !== null) {
                data = {};

                data[me.getName()] = val;

                val = me.getHiddenState(val);
                if (this.useHiddenField && this.includeHiddenStateToSubmitData && val !== null) {
                    data[this.getHiddenStateName()] = val;
                }
            }
        }
        return data;
    },

    checkHiddenStateName: function () {
        if (this.hiddenField && this.submitEmptyHiddenState === false) {

            if (Ext.isEmpty(this.hiddenField.dom.value)) {
                this.hiddenField.dom.name = "";
                this.hiddenField.dom.removeAttribute("name");
            } else {
                this.hiddenField.set({ name: this.getHiddenStateName() });
            }
        }
    },

    getHiddenState: function (value) {
        return value;
    },

    clear: function () {
        this.setValue("");
    },

    beforeSubTpl: [
        '<tpl if="noteAlign==\'top\'">',
            '<div id="{id}-note" class="x-field-note {noteCls}">{noteHtml}</div>',
        '</tpl>',
    ],

    afterSubTpl: [
        '<tpl if="noteAlign==\'down\'">',
            '<div id="{id}-note" class="x-field-note {noteCls}">{noteHtml}</div>',
        '</tpl>',
    ],

    indicatorTpl: [
        '<div id="{id}-indicator" style="position:relative;display:table-cell;">',
            '<div class="x-field-indicator {indicatorCls} {indicatorIconCls}">{indicatorHtml}</div>',
        '</div>'
    ],


    hideNote: function () {
        if (!Ext.isEmpty(this.note, false) && this.noteEl) {
            this.noteEl.addCls("x-hide-" + this.hideMode);
        }
    },

    showNote: function () {
        if (!Ext.isEmpty(this.note, false) && this.noteEl) {
            this.noteEl.removeCls("x-hide-" + this.hideMode);
        }
    },

    setNote: function (t, encode) {
        this.note = t;

        if (this.rendered) {
            this.noteEl.dom.innerHTML = encode !== false ? Ext.util.Format.htmlEncode(t) : t;
        }
    },

    setNoteCls: function (cls) {
        if (this.rendered) {
            this.noteEl.removeCls(this.noteCls);
            this.noteEl.addCls(cls);
        }

        this.noteCls = cls;
    },

    isIndicatorEmpty: function () {
        return Ext.isEmpty(this.indicatorText) && Ext.isEmpty(this.indicatorCls) && Ext.isEmpty(this.indicatorIconCls);
    },

    clearIndicator: function (preventLayout, holder) {
        holder = holder || {};
        this.setIndicator(holder.indicatorText || "", false, true);
        this.setIndicatorCls(holder.indicatorCls || "", true);
        this.setIndicatorIconCls(holder.indicatorIconCls || "", true);
        this.setIndicatorTip(holder.indicatorTip || "", true);

        if (preventLayout !== true) {
            this.isIndicatorActive = true;
            this.needIndicatorRelayout = false;
            this.updateLayout();
        }
        else {
            this.needIndicatorRelayout = true;
        }
        this.isIndicatorActive = false;
    },

    saveIndicator: function (name, ignoreExists) {
        this._indicators = this._indicators || {};

        if (ignoreExists && this._indicators[name || "default"]) {
            return;
        }

        var holder = this._indicators[name || "default"] || {};
        holder.indicatorText = this.indicatorText;
        holder.indicatorCls = this.indicatorCls;
        holder.indicatorIconCls = this.indicatorIconCls;
        holder.indicatorTip = this.indicatorTip;

        this._indicators[name || "default"] = holder;
    },

    restoreIndicator: function (name, remove) {
        if (!this._indicators) {
            return;
        }

        var holder = this._indicators[name || "default"];
        this.clearIndicator(false, holder);

        if (remove !== false && holder) {
            delete this._indicators[name || "default"];
        }

        return holder;
    },

    setIndicator: function (t, encode, preventLayout) {
        this.indicatorText = t;

        if (this.indicatorEl) {
            this.isIndicatorActive = true;
            this.indicatorEl.dom.innerHTML = encode !== false ? Ext.util.Format.htmlEncode(t) : t;

            if (preventLayout !== true) {
                if (this.autoFitIndicator) {
                    this.indicatorEl.setStyle("width", "");
                }

                this.needIndicatorRelayout = false;
                this.updateLayout();
            }
            else {
                this.needIndicatorRelayout = true;
            }
        }
    },

    setIndicatorCls: function (cls, preventLayout) {
        if (this.indicatorEl) {
            this.indicatorEl.removeCls(this.indicatorCls);
            this.indicatorEl.addCls(cls);
            if (preventLayout !== true) {
                this.needIndicatorRelayout = false;
                this.updateLayout();
            }
            else {
                this.needIndicatorRelayout = true;
            }
        }

        this.indicatorCls = cls;
    },

    setIndicatorIconCls: function (cls, preventLayout) {
        if (this.indicatorEl) {
            this.isIndicatorActive = true;
            this.indicatorEl.removeCls(this.indicatorIconCls);

            cls = cls.indexOf('#') === 0 ? X.net.RM.getIcon(cls.substring(1)) : cls;

            this.indicatorEl.addCls(cls);

            if (preventLayout !== true) {
                this.needIndicatorRelayout = false;
                this.updateLayout();
            }
            else {
                this.needIndicatorRelayout = true;
            }
        }

        this.indicatorIconCls = cls;
    },

    initIndicatorTip: function () {
        if (this.indicatorTip) {
            if (Ext.isString(this.indicatorTip)) {
                this.indicatorTip = { text: this.indicatorTip };
            }
            Ext.tip.QuickTipManager.register(
                Ext.apply({
                    target: this.indicatorEl
                }, this.indicatorTip)
            );
            //this.indicatorEl.set({ "data-qtip": this.indicatorTip.text });
        }
    },

    setIndicatorTip: function (tip) {
        this.indicatorTip = Ext.apply(this.indicatorTip || {}, { text: tip });

        if (!this.indicatorEl) {
            this.initIndicator();
        } else {
            if (Ext.QuickTips.getQuickTip().targets[this.indicatorEl.id]) {
                Ext.QuickTips.getQuickTip().targets[this.indicatorEl.id].text = tip;
            } else {
                this.initIndicatorTip();
            }
        }

        if (this.indicatorEl) {
            this.isIndicatorActive = true;

            if (Ext.QuickTips.getQuickTip().targets[this.indicatorEl.id]) {
                Ext.QuickTips.getQuickTip().targets[this.indicatorEl.id].text = tip;
            } else {
                this.initIndicatorTip();
            }
        }
    },

    showIndicator: function (preventLayout) {
        if (Ext.isObject(preventLayout)) {
            var cfg = preventLayout;
            preventLayout = cfg.preventLayout;

            this.setIndicatorTip(cfg.tip || "", true);
            this.setIndicatorIconCls(cfg.iconCls || "", true);
            this.setIndicatorCls(cfg.cls || "", true);
            this.setIndicator(cfg.text || "", cfg.encode || false, true);
        }

        if (this.indicatorEl && (this.indicatorHidden !== false || this.needIndicatorRelayout)) {
            if (this.preserveIndicatorIcon) {
                this.indicatorEl.fixDisplay();
            }

            this.indicatorHidden = false;

            if (preventLayout !== true) {
                if (this.autoFitIndicator) {
                    this.indicatorEl.setStyle("width", "");
                }
                this.updateLayout();
            }
        }
    },

    hideIndicator: function (preventLayout) {
        if (this.indicatorEl && this.indicatorHidden !== true) {
            var errorSide = this.msgTarget == "side" && this.hasActiveError();
            if (this.preserveIndicatorIcon && !errorSide) {
                this.indicatorEl.fixDisplay();
            }

            this.indicatorHidden = true;
            this.errorSideHide = false;

            if (preventLayout !== true) {
                this.needIndicatorRelayout = false;
                this.updateLayout();
            }
            else {
                this.needIndicatorRelayout = true;
            }
        }
    },

    onIndicatorIconClick: function () {
        this.fireEvent("indicatoriconclick", this, this.indicatorEl);
    },

    getInsertionRenderData: function (data, names) {
        var indicatorIconCls = this.indicatorIconCls && this.indicatorIconCls.indexOf('#') === 0 ? X.net.RM.getIcon(this.indicatorIconCls.substring(1)) : this.indicatorIconCls;
        this.indicatorIconCls = indicatorIconCls;
        this.note = this.noteEncode ? Ext.util.Format.htmlEncode(this.note) : this.note;
        this.isIndicatorActive = !this.isIndicatorEmpty();

        data = Ext.apply(data, {
            noteCls: this.noteCls || "",
            noteAlign: this.note ? (this.noteAlign || "down") : "",
            indicatorCls: this.indicatorCls || "",
            indicatorIconCls: indicatorIconCls || "",
            indicatorHtml: this.indicatorText || "",
            noteHtml: this.note || ""
        });
        return this.callParent([data, names]);
    },

    afterRender: function () {
        this.callParent(arguments);

        if (!this.isIndicatorWasUpdated) {
            this.updateIndicator();
        }
    },

    updateIndicator: function () {
        if (!this.indicatorEl) {
            return;
        }

        if (!this.isIndicatorWasUpdated) {
            this.isIndicatorWasUpdated = true;
        }

        var errorSide = this.msgTarget == "side" && this.hasActiveError(),
            isTopNote = this.noteAlign == "top",
            hideIndicator,
            w,
            h;

        if (isTopNote) {
            h = this.noteEl.getHeight();

            if (this.labelAlign !== "top") {
                this.labelEl.setStyle("padding-top", (h + 4) + "px");
            }

            this.indicatorEl.setStyle("top", h + "px");

            if (this.errorEl && this.msgTarget == "side") {
                this.errorEl.parent().setStyle("padding-top", h + "px");
            }
        }

        if (!this.isIndicatorActive && !this.preserveIndicatorIcon) {
            this.hideIndicator(true);
            this.indicatorEl.parent().setStyle("display", "none");
            this.errorSideHide = errorSide;
            return;
        }

        if (errorSide) {
            this.hideIndicator(true);
            this.indicatorEl.parent().setStyle("display", "none");
            this.errorSideHide = true;
        } else {
            if (this.errorSideHide) {
                this.showIndicator(true);                
            }

            hideIndicator = (this.isIndicatorEmpty() || this.indicatorHidden);

            this.indicatorEl.parent().setStyle("display", (hideIndicator && !this.preserveIndicatorIcon) ? "none" : "table-cell");

            this.indicatorEl.setStyle("padding-left", this.indicatorIconCls ? "18px" : "0px");

            if (this.autoFitIndicator) {
                w = Ext.isIE7 ? this.indicatorEl.getPadding("lr") : 0;
                w = hideIndicator ? (this.preserveIndicatorIcon ? 18 : 0) : (this.indicatorEl.getWidth() - w);
                this.indicatorEl.parent().setStyle("width", w + "px");
                //this.indicatorEl.parent().setStyle("height", this.inputEl ? (this.inputEl.getHeight() + "px") : "22px");
                this.indicatorEl.setStyle("width", w + "px");
            }
        }
    },

    updateLayout: function () {
        this.updateIndicator();
        this.callParent(arguments);
    },

    initIndicatorElements : function () {
        var me = this;
        me.noteEl = Ext.get(me.id + "-note");
        me.indicatorEl = Ext.get(me.id + "-indicator");
        if (me.indicatorEl) {
            me.indicatorEl = me.indicatorEl.down(".x-field-indicator");
        }

        if (!me.indicatorEl) {
            return;
        }

        if (me.indicatorTip) {
            me.initIndicatorTip();
        }

        me.indicatorEl.on("click", me.onIndicatorIconClick, me);

        if (me.initialConfig.listeners && me.initialConfig.listeners.indicatoriconclick ||
            me.initialConfig.directEvents && me.initialConfig.directEvents.indicatoriconclick) {

            me.indicatorEl.applyStyles("cursor: pointer;");
        }

        if (this.useHiddenField) {
            this.hiddenField = this.bodyEl.createChild({
                tag: 'input',
                type: 'hidden',
                name: this.getHiddenStateName()
            });

            var val = Ext.isDefined(this.hiddenValue) ? this.hiddenValue : this.getHiddenState(this.getValue());

            this.hiddenField.dom.value = !Ext.isEmpty(val) ? val : "";

            this.checkHiddenStateName();

            this.on("beforedestroy", function () {
                this.hiddenField.destroy();
            }, this);
        }
    },

    onRender: function () {
        this.callParent(arguments);
        this.initIndicatorElements();
    }

    
};

Ext.form.field.Base.override(Ext.net.FieldNote);
Ext.form.FieldContainer.override(Ext.net.FieldNote);

// Do not replace with .callParent()
Ext.form.field.Base.prototype.initComponent = Ext.Function.createInterceptor(Ext.form.field.Base.prototype.initComponent, Ext.net.FieldNote.initHiddenFieldState);
Ext.form.FieldContainer.prototype.initComponent = Ext.Function.createInterceptor(Ext.form.FieldContainer.prototype.initComponent, Ext.net.FieldNote.initHiddenFieldState);

(function (cls) {
    for (var c = 0; c < cls.length; c++) {
        var me = cls[c],
            tpl = me.labelableRenderTpl,
            i,
            len,
            beforeStr,
            beforeIndex;

        if (tpl && Ext.isArray(tpl)) {
            beforeStr = '<tpl if="renderError">';
            if (tpl[24] == beforeStr) {
                beforeIndex = 24;
            }
            else {
                for (i = 0, len = tpl.length; i < len; i++) {
                    if (tpl[i] == beforeStr) {
                        beforeIndex = i;
                        break;
                    }
                }
            }

            Ext.Array.insert(tpl, beforeIndex, "{indicatorTpl}");

            me.labelableInsertions.push("indicatorTpl");
        }
    }
})([Ext.form.field.Base.prototype]);
// @source core/form/TextField.js

Ext.override(Ext.form.field.Text, {
    leftButtonsShowMode: "always",
    rightButtonsShowMode: "always",

    isIconIgnore: function () {
        return !!this.el.up(".x-menu-list-item");
    },

    initComponent: function () {
        this.setButtonsHiddenNonBuffered = this.setButtonsHidden;
        this.setButtonsHidden = Ext.Function.createBuffered(this.setButtonsHidden, 250, this);

        this.callParent(arguments);

        if (Ext.isNumeric(this.triggerIndexOnEnter) || this.triggerTagOnEnter) {
            this.on("specialkey", this.onSpecialKey);
        }
    },

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            var index = field.triggerIndexOnEnter,
                tag = field.triggerTagOnEnter,
                trigger = field.getTrigger(tag || index);

            if (trigger && trigger.isVisible()) {                        
                trigger.onClick(e, e);
            }
        }
    },

    getTrigger: function (id) {
        if (Ext.isNumeric(id)) {
            return this.orderedTriggers[id];
        }

        return this.getTriggers()[id];
    },

    toggleTrigger: function (index, state) {
        var trigger = this.getTrigger(index);

        if (!Ext.isBoolean(state)) {
            state = !trigger.isVisible();
        }

        trigger[state ? "show" : "hide"]();
    },

    onCustomTriggerClick: function (trigger, e) {
        if (!this.disabled) {
            var index = Ext.Array.indexOf(this.orderedTriggers, trigger);
            this.fireEvent("triggerclick", this, trigger, index, trigger.tag, e);
        }
    },

    //private
    renderIconEl: function () {
        var rtl = this.getInherited().rtl,
            renderTo = this.inputWrap || this.bodyEl;
        this.inputEl.addCls("x-textfield-icon-input");

        renderTo.setStyle("position", "relative");
        this.icon = Ext.core.DomHelper.append(renderTo, {
            tag: "div",
            style: "position:absolute;margin:0px;padding:0px;border:0px;top:0px;float:" + (rtl ? "right;" : "left;"),
            children: [{
                tag: "div",
                style: "position:absolute"
            }]
        }, true);

        this.icon = this.icon.first();

        this.icon.on("click", function (e, t) {
            this.fireEvent("iconclick", this, e, t);
        }, this);
    },

    setIconCls: function (cls) {
        if (this.isIconIgnore()) {
            return;
        }

        if (!this.icon) {
            this.renderIconEl();
        }

        if (Ext.isEmpty(cls)) {
            this.inputEl.removeCls("x-textfield-icon-input");
            this.inputEl.repaint();
            this.restoreIconCls = true;
            this.iconCls = "";
            this.icon.dom.className = "";
        } else {
            if (this.restoreIconCls) {
                delete this.restoreIconCls;
                this.inputEl.addCls("x-textfield-icon-input");
                this.inputEl.repaint();
            }

            cls = cls.indexOf('#') === 0 ? X.net.RM.getIcon(cls.substring(1)) : cls;
            this.iconCls = cls;
            this.icon.dom.className = "x-textfield-icon " + cls;
        }
    },

    getErrors: function (value) {
        value = arguments.length ? (value == null ? '' : value) : this.processRawValue(this.getRawValue());

        var me = this,
            errors = Ext.form.field.Text.superclass.getErrors.apply(this, [value]),
            regex = me.regex,
            format = Ext.String.format,
            msg,
            trimmed, isBlank;        

        trimmed = me.allowOnlyWhitespace ? value : Ext.String.trim(value);

        if (trimmed.length < 1 || (value === me.emptyText && me.valueContainsPlaceholder)) {
            if (!me.allowBlank) {
                errors.push(me.blankText);
            }

            // If we are not configured to validate blank values, there cannot be any additional errors
            if (!me.validateBlank) {
                return errors;
            }
            isBlank = true;
        }

        // If a blank value has been allowed through, then exempt it dfrom the minLength check.
        // It must be allowed to hit the vtype validation.
        if (!isBlank && value.length < me.minLength) {
            errors.push(format(me.minLengthText, me.minLength));
        }

        if (value.length > me.maxLength) {
            errors.push(format(me.maxLengthText, me.maxLength));
        }

        if (regex && !regex.test(value)) {
            errors.push(me.regexText || me.invalidText);
        }

        return errors;
    },

    afterRender: function () {
        this.callParent(arguments);

        if (this.iconCls) {
            var iconCls = this.iconCls;
            delete this.iconCls;
            this.setIconCls(iconCls);
        }

        if (this.removeClearTrigger) {
            this.inputEl.addCls("x-clear-field");
        }

        if (this.removeShowPasswordTrigger) {
            this.inputEl.addCls("x-showpassword-field");
        }

        Ext.form.trigger.Trigger.prototype.removeBorderIfSimple.call(this, this);

        if (!this.isButtonsInit) { // Added because of #873
            this.initButtons();
        }
    },

    initButtons: function (updateLayout) {
        this.isButtonsInit = true;

        if (this.leftButtons) {
            this.leftButtons = this.initButtonsSide(this.leftButtons, "left");
        }

        if (this.rightButtons) {
            this.rightButtons = this.initButtonsSide(this.rightButtons, "right");
        }

        if (this.leftButtonsShowMode == "mouseover" || this.leftButtonsShowMode == "mouseovernonblank" || this.leftButtonsShowMode == "mouseoverorfocus" ||
            this.rightButtonsShowMode == "mouseover" || this.rightButtonsShowMode == "mouseovernonblank" || this.rightButtonsShowMode == "mouseoverorfocus") {

            this.bodyEl.on({
                mouseover: this.onMouseOver,
                mouseout: this.onMouseOut,
                scope: this
            });
        }

        if (updateLayout !== false && (this.leftButtons || this.rightButtons)) {
            this.updateLayout();
        }
    },

    isButtonsVisible: function (side) {
        var mode = this[side + "ButtonsShowMode"];
        switch (mode) {
            case "focus":
                return this.hasFocus;
            case "mouseover":
                return this.hasMouse;
            case "nonblank":
                return this.getRawValue().length > 0;
            case "mouseovernonblank":
                return this.hasMouse && this.getRawValue().length > 0;
            case "mouseoverorfocus":
                return this.hasMouse || this.hasFocus;
            case "always":
            default:
                return true;
        }
    },

    addButton: function (button, side, updateLayout) {
        var ct,
            ctRef,
            renderTo;

        side = side || "right";
        ctRef = side + "ButtonsCt";
        if (!Ext.isDefined(button.flat)) {
            button.flat = true;
        }
        button.height = this.inputEl.getHeight();

        if (this[side + "ButtonsShowMode"] != "always") {
            button.hidden = !this.isButtonsVisible(side);
        }

        ct = this[ctRef];
        if (!ct) {
            renderTo = this.inputWrap || this.bodyEl;
            this[ctRef] = Ext.core.DomHelper.append(renderTo, {
                tag: "div",
                cls: "x-form-text-default",
                style: "position:absolute;margin:0px;padding:0px;border:0px;top:0px;background-repeat: repeat-x;" + side + ": 0px;"
            }, true);
            ct = this[ctRef];

            renderTo.setStyle("position", "relative");
        }

        var btn = Ext.ComponentManager.create(button, "button");

        btn.field = this;
        btn.fieldSide = side;
        btn.ownerCt = this;

        btn.on("destroy", function (btn) {
            if (this.isDestroying) {
                return;
            }

            Ext.Array.remove(btn.fieldSide === "right" ? this.rightButtons : this.leftButtons, btn);
            Ext.defer(this.updateLayout, 1, this);
        }, this);

        btn.on({
            show: this.updateFieldPadding,
            hide: this.updateFieldPadding,
            resize: this.updateFieldPadding,
            scope: this
        });

        btn.render(ct, side == "right" ? ct.first() : undefined);

        if (updateLayout !== false) {
            this.updateLayout();
        }

        return btn;
    },

    removeButton: function (button) {
        button.destroy();
    },

    initButtonsSide: function (buttons, side) {
        var i,
            len;

        if (side == "right") {
            len = buttons.length;
            i = len - 1;
            for (; i >= 0; i--) {
                buttons[i] = this.addButton(buttons[i], side, false);
            }
        }
        else {
            for (i = 0, len = buttons.length; i < len; i++) {
                buttons[i] = this.addButton(buttons[i], side, false);
            }
        }

        return buttons;
    },

    destroy: function () {
        this.isDestroying = true;
        if (this.leftButtons) {
            Ext.each(this.leftButtons, function (btn) {
                if (btn.destroy) {
                    btn.destroy();
                }
            });
            delete this.leftButtons;
        }

        if (this.rightButtons) {
            Ext.each(this.rightButtons, function (btn) {
                if (btn.destroy) {
                    btn.destroy();
                }
            });
            delete this.rightButtons;
        }

        if (this.leftButtonsCt) {
            this.leftButtonsCt.destroy();
            this.leftButtonsCt = null;
        }

        if (this.rightButtonsCt) {
            this.rightButtonsCt.destroy();
            this.rightButtonsCt = null;
        }

        this.callParent(arguments);
    },

    setButtonsDisabled: function (disabled, side) {
        if (this.leftButtons && (!Ext.isDefined(side) || side == "left")) {
            Ext.each(this.leftButtons, function (btn) {
                if (btn.setDisabled) {
                    btn.setDisabled(disabled);
                } else {
                    btn.disabled = disabled;
                }
            });
        }

        if (this.rightButtons && (!Ext.isDefined(side) || side == "right")) {
            Ext.each(this.rightButtons, function (btn) {
                if (btn.setDisabled) {
                    btn.setDisabled(disabled);
                } else {
                    btn.disabled = disabled;
                }
            });
        }
    },

    setButtonsHidden: function (hidden, side) {
        var method = !hidden ? "show" : "hide";

        this.bulkButtonsUpdate = true;

        if (this.leftButtons && (!Ext.isDefined(side) || side.indexOf("left") > -1)) {
            Ext.each(this.leftButtons, function (btn) {
                if (!btn.hiddenPin) {
                    btn[method](false);
                }
            });
        }

        if (this.rightButtons && (!Ext.isDefined(side) || side.indexOf("right") > -1)) {
            Ext.each(this.rightButtons, function (btn) {
                if (!btn.hiddenPin) {
                    btn[method](false);
                }
            });
        }
        this.bulkButtonsUpdate = false;

        if (this.needUpdateAfterBulk) {
            delete this.needUpdateAfterBulk;
            this.updateFieldPadding();
        }
    },

    //private
    onDisable: function () {
        this.callParent();
        this.setButtonsDisabled(true);
    },

    //private
    onEnable: function () {
        this.callParent();
        this.setButtonsDisabled(false);
    },

    getButtonsSide: function (left, right) {
        var side = "";

        if (left) {
            side += "left";
        }

        if (right) {
            side += "right";
        }

        return side;
    },

    onFocus: function (e) {
        // Fix for #1441 - start
        // solution from: https://www.sencha.com/forum/showthread.php?310439&p=1170408&viewfull=1#post1170408
        var me = this,
                    inputEl = me.inputEl.dom,
                    startValue, value, len;

        // Changing call to callSuper instead of callParent to skip the original method
        me.callSuper([e]);

        // Added check for selectOnFocus
        if (me.selectOnFocus) {
            // This handler may be called when the focus has already shifted to another element;
            // calling inputEl.select() will forcibly focus again it which in turn might set up
            // a nasty circular race condition if focusEl !== inputEl.
            if (!me.focusTimer) {
                startValue = inputEl.value;
                me.focusTimer = Ext.asap(function () {
                    me.focusTimer = null;
                    // This ensures the carret will be at the end of the input element
                    // while tabbing between editors.
                    if (!me.destroyed && document.activeElement === inputEl) {
                        value = inputEl.value;
                        len = value.length;

                        // If focusing has fired an event which mutated the value,
                        // place the caret at the end. Else select the initial text
                        // as is the HTML default behaviour.
                        me.selectText(value !== startValue ? len : 0, len);
                    }
                });
            }
        }

        if (me.emptyText) {
            me.autoSize();
        }

        me.addCls(me.fieldFocusCls);
        me.triggerWrap.addCls(me.triggerWrapFocusCls);
        me.inputWrap.addCls(me.inputWrapFocusCls);
        me.invokeTriggers('onFieldFocus', [e]);
        // Fix for #1441 - end (the whole method was replaced)

        // Add this.callParent(arguments) when this override can be undone.
        // The code below is required and Ext.NET-specific.
        this.setButtonsHidden(false, this.getButtonsSide(this.leftButtons && (this.leftButtonsShowMode == "focus" || this.leftButtonsShowMode == "mouseoverorfocus"),
                                                         this.rightButtons && (this.rightButtonsShowMode == "focus" || this.rightButtonsShowMode == "mouseoverorfocus")));
    },

    onFocusLeave: function () {
        this.callParent(arguments);
        this.setButtonsHidden(true, this.getButtonsSide(this.leftButtons && (this.leftButtonsShowMode == "focus" || (this.leftButtonsShowMode == "mouseoverorfocus" && !this.hasMouse)),
                                                         this.rightButtons && (this.rightButtonsShowMode == "focus" || (this.rightButtonsShowMode == "mouseoverorfocus" && !this.hasMouse))));
    },

    onMouseOver: function () {
        this.hasMouse = true;
        this.setButtonsHidden(false, this.getButtonsSide(this.leftButtons && (this.leftButtonsShowMode == "mouseover" || this.leftButtonsShowMode == "mouseoverorfocus" || (this.leftButtonsShowMode == "mouseovernonblank" && this.getRawValue().length > 0)),
                                                         this.rightButtons && (this.rightButtonsShowMode == "mouseover" || this.rightButtonsShowMode == "mouseoverorfocus" || (this.rightButtonsShowMode == "mouseovernonblank" && this.getRawValue().length > 0))));

    },

    onMouseOut: function () {
        this.hasMouse = false;
        this.setButtonsHidden(true, this.getButtonsSide(this.leftButtons && (this.leftButtonsShowMode == "mouseover" || (this.leftButtonsShowMode == "mouseoverorfocus" && !this.hasFocus) || this.leftButtonsShowMode == "mouseovernonblank"),
                                                        this.rightButtons && (this.rightButtonsShowMode == "mouseover" || (this.rightButtonsShowMode == "mouseoverorfocus" && !this.hasFocus) || this.rightButtonsShowMode == "mouseovernonblank")));

    },

    onChange: function () {
        var nonEmpty;

        this.callParent(arguments);

        if (this.leftButtons && (this.leftButtonsShowMode == "nonblank" || this.leftButtonsShowMode == "mouseovernonblank")) {
            nonEmpty = this.getRawValue().length > 0;

            if ((this.leftButtonsShowMode == "nonblank" && nonEmpty) ||
                (this.leftButtonsShowMode == "mouseovernonblank" && nonEmpty && this.hasMouse)) {
                this.setButtonsHiddenNonBuffered(false, "left");
            }
            else {
                this.setButtonsHiddenNonBuffered(true, "left");
            }
        }

        if (this.rightButtons && (this.rightButtonsShowMode == "nonblank" || this.rightButtonsShowMode == "mouseovernonblank")) {
            nonEmpty = this.getRawValue().length > 0;

            if ((this.rightButtonsShowMode == "nonblank" && nonEmpty) ||
                (this.rightButtonsShowMode == "mouseovernonblank" && nonEmpty && this.hasMouse)) {
                this.setButtonsHiddenNonBuffered(false, "right");
            }
            else {
                this.setButtonsHiddenNonBuffered(true, "right");
            }
        }
    },

    updateFieldPadding: function () {
        if (this.bulkButtonsUpdate) {
            this.needUpdateAfterBulk = true;
            return;
        }

        var field = this,
            pad,
            w,
            inputEl,
            inputElDom,
            updateValue,
            selectionStart,
            selectionEnd;

        if (field.leftButtons || field.rightButtons) {
            if (!field.isButtonsInit) {
                field.initButtons(false);
            }

            inputEl = field.inputEl;

            if (field.leftButtonsCt) {
                pad = inputEl.getPadding("l");
                w = field.leftButtonsCt.getWidth() + 3;

                if (pad != w) {
                    inputEl.setStyle("padding-left", w + "px");
                    updateValue = true;
                }
            }

            if (field.rightButtonsCt) {
                pad = inputEl.getPadding("r");
                w = field.rightButtonsCt.getWidth() + 3;

                if (pad != w) {
                    inputEl.setStyle("padding-right", w + "px");
                    updateValue = true;
                }
            }

            if (updateValue) {
                inputElDom = inputEl.dom;

                if (Ext.isIE) { // #884
                    selectionStart = inputElDom.selectionStart;
                    selectionEnd = inputElDom.selectionEnd;
                }

                inputElDom.value = inputElDom.value;

                if (Ext.isIE && inputElDom.setSelectionRange && field.hasFocus) { // #884, corrected in #1224
                    inputElDom.setSelectionRange(selectionStart, selectionEnd);
                }
            }
        }
    },

    updateLayout: function () {
        this.callParent(arguments);
        this.updateFieldPadding();
    }
});
Ext.form.trigger.Trigger.getIcon = function (icon) {
    var iconName = icon.toLowerCase(),
        key = "x-form-" + iconName + "-trigger";

    if (iconName !== "combo" && iconName !== "clear" && iconName !== "date" && iconName !== "search") {
        if (!this.registeredIcons) {
            this.registeredIcons = {};
        }

        if (!this.registeredIcons[key]) {
            this.registeredIcons[key] = true;

            var sepName = Ext.net.ResourceMgr.toCharacterSeparatedFileName(icon, "-"),
                template = "/{0}extnet/resources/images/triggerfield/{1}-gif/ext.axd",
                appName = Ext.isEmpty(Ext.net.ResourceMgr.appName, false) ? "" : (Ext.net.ResourceMgr.appName + "/"),
                url,
                url1 = "",
                css = ".{0}{background-image:url({1});cursor:pointer;}";

            if (Ext.net.ResourceMgr.theme == "gray" && (icon == "Ellipsis" || icon == "Empty")) {
                template = "/{0}extnet/resources/images/triggerfield/gray/{1}-gif/ext.axd";
            }

            if (Ext.net.ResourceMgr.theme == "neptune" ||
                Ext.net.ResourceMgr.theme == "crisp" ||
                Ext.net.ResourceMgr.theme == "neptunetouch" ||
                Ext.net.ResourceMgr.theme == "crisptouch" ||
                Ext.net.ResourceMgr.theme == "triton") {
                template = "/{0}extnet/resources/images/triggerfield/neptune/{1}-png/ext.axd";
            }

            url = Ext.net.StringUtils.format(template, appName, sepName);

            css = Ext.net.StringUtils.format(css, key, url, url1);
            Ext.net.ResourceMgr.registerCssClass("trigger_" + key, css);
        }
    }

    return key;
};

Ext.define('Ext.form.trigger.Trigger.extnet', {
    override: "Ext.form.trigger.Trigger",

    onFieldRender: function () {
        this.callParent(arguments);

        if (this.qTip || this.qTipCfg) {
            if (!this.qTipCfg) {
                this.qTipCfg = {};
            }

            if (this.qTip) {
                this.qTipCfg.text = this.qTip;
            }

            Ext.tip.QuickTipManager.register(Ext.apply({
                target: this.el.id
            }, this.qTipCfg));
        }
    },

    removeBorderIfSimple: function (field) {
        var first,
            i,
            triggers,
            len,
            isSimple = false;

        field = field || this.field,

        triggers = field.orderedTriggers;

        if (!triggers || !field.rendered) {
            return;
        }

        len = triggers.length;

        for (i = 0; i < len; i++) {
            first = triggers[i];
            if (first.isVisible()) {
                if (Ext.net.StringUtils.startsWith(first.cls || "", "x-form-simple")) {
                    isSimple = true;
                }
                break;
            }
        }

        if (isSimple && !field.hideTrigger && !field.readOnly) {
            field.inputWrap.setStyle({ "border-right-width": "0px" });
        } else {
            field.inputWrap.setStyle({ "border-right-width": "1px" });
        }
    },

    show: function () {
        this.callParent(arguments);
        this.removeBorderIfSimple();
    },

    hide: function () {
        this.callParent(arguments);
        this.removeBorderIfSimple();
    },

    renderTrigger: function (fieldData) {
        var me = this,
            width = me.width,
            triggerStyle = me.hidden ? 'display:none;' : '',
            triggers,
            len,
            isNotLast,
            isTouchTheme,
            forceSimple,
            isTritonTheme;

        isTritonTheme = Ext.net.ResourceMgr.theme == "triton";

        isTouchTheme = Ext.net.ResourceMgr.theme == "neptunetouch" ||
                       Ext.net.ResourceMgr.theme == "crisptouch" ||
                       isTritonTheme;

        if (isTouchTheme) {
            if (me.cls == "x-form-ellipsis-trigger" || me.cls == "x-form-empty-trigger") {
                forceSimple = true;
            }
        }

        if (forceSimple || Ext.net.StringUtils.startsWith(me.cls || "", "x-form-simple")) {
            if (isTouchTheme) {
                this.focusCls += "22";
                this.overCls += "22";
                this.clickCls += "22";
            }

            triggers = this.field.orderedTriggers;
            len = triggers.length;
            isNotLast = triggers[len - 1] != this;
            if (isNotLast && (Ext.net.ResourceMgr.theme === "blue" || Ext.net.ResourceMgr.theme === "gray")) {
                width = 16;
            }

            if (triggers[0] == this) {
                if (this.field.inputWrap) {
                    this.field.inputWrap.setStyle({ "border-right-width": "0px" });
                }
                else {
                    this.field.on("afterrender", function () {
                        this.inputWrap.setStyle({ "border-right-width": "0px" });
                    }, this.field, { single: true });
                }
            }

            if (Ext.net.ResourceMgr.theme == "neptune" ||
                Ext.net.ResourceMgr.theme == "crisp" ||
                Ext.net.ResourceMgr.theme == "neptunetouch" ||
                Ext.net.ResourceMgr.theme == "crisptouch" ||
                Ext.net.ResourceMgr.theme == "triton") {
                width = forceSimple && !isNotLast ? 22 : 18;
            }
        }

        if (width) {
            triggerStyle += 'width:' + width + "px";
        }

        if (isTritonTheme &&
            !Ext.isEmpty(me.cls) &&
            me.cls !== "x-form-arrow-trigger" &&
            me.cls !== "x-form-clear-trigger" &&
            me.cls !== "x-form-search-trigger" &&
            me.cls !== "x-form-time-trigger" &&
            me.cls !== "x-form-date-trigger") {

            me.cls += " x-form-trigger-triton";
        }

        return Ext.XTemplate.getTpl(me, 'renderTpl').apply({
            $trigger: me,
            fieldData: fieldData,
            ui: fieldData.ui,
            childElCls: fieldData.childElCls,
            triggerId: me.domId = me.field.id + '-trigger-' + me.id,
            cls: me.cls,
            triggerStyle: triggerStyle,
            extraCls: me.extraCls,
            baseCls: me.baseCls
        });
    },

    isCustomTrigger: function () {
        return !((this.handler == "onTriggerClick" || this.handler == this.field.onTriggerClick) &&
               (this.scope == "this" || this.scope == this.field));
    },

    onCustomClick: function () {
        if (!this.field.readOnly && this.isFieldEnabled() && this.isCustomTrigger()) {
            this.field.onCustomTriggerClick(this, this.clickRepeater ? arguments[1] : arguments[0]);
        }
    },

    onClick: function () {
        this.callParent(arguments);

        this.onCustomClick.apply(this, arguments);
    }
});

Ext.define('Ext.form.trigger.Spinner.extnet', {
    override: "Ext.form.trigger.Spinner",

    onCustomClick: Ext.emptyFn
});

// @source core/form/Checkbox.js

Ext.form.field.Checkbox.override({
    useHiddenField                 : true, 
    includeHiddenStateToSubmitData : false,
    submitEmptyHiddenState         : false,

    onRender : function (){
        delete this.inputWidth;
        this.callParent(arguments);
        this.applyBoxLabelCss();    
    },
    
    getHiddenState : function (value) {
        return this.getSubmitValue();
    },

    getHiddenStateName : function () {
        return this.getName();
    },

    initValue : function () {
        var me = this;

        if (!me.checked && (me.value === true || me.value === "true")) {
            me.checked = true;
        }   

        me.callParent(arguments);
    },

    applyBoxLabelCss : function () {
        if (this.boxLabelClsExtra) {
            this.setBoxLabelCls(this.boxLabelClsExtra);
        }
        
        if (this.boxLabelStyle) {
            this.setBoxLabelStyle(this.boxLabelStyle);
        }
    },
    
    setBoxLabelStyle : function (style) {
        this.boxLabelStyle = style;

        if (this.boxLabelEl) {
            this.boxLabelEl.applyStyles(style);
        }
    },
    
    setBoxLabelCls : function (cls) {
        if (this.boxLabelEl && this.boxLabelClsExtra) {
            this.boxLabelEl.removeCls(this.boxLabelClsExtra);
        }
        
        this.boxLabelClsExtra = cls;
        
        if (this.boxLabelEl) {
            this.boxLabelEl.addCls(this.boxLabelClsExtra);
        }
    },
    
    setBoxLabel : function (label) {
        this.boxLabel = label;        
        
        if (this.rendered) {
            if (this.boxLabelEl) {
                this.boxLabelEl.setHtml(label);
                this.boxLabelEl[label ? "removeCls" : "addCls"](this.noBoxLabelCls);
                this.updateLayout();
            } else {            
                this.boxLabelEl = this.bodyEl.createChild({
                    id: this.id + "-boxLabelEl",
                    "data-ref" : "boxLabelEl",
                    tag: "label",
                    "for"    : this.el.id,
                    cls     : this.boxLabelCls,
                    html    : this.boxLabel
                });

                this.applyBoxLabelCss();
            }
        }
    }
});

// @source core/form/CheckboxGroup.js

Ext.form.CheckboxGroup.override({
    invalidCls: Ext.baseCSSPrefix + 'form-invalid'
});

Ext.form.CheckboxGroup.override({
    onRender: function (ct, position) {
        this.callParent(arguments);

        if (this.fireChangeOnLoad) {
            var checked = false;

            this.eachBox(function (item) {
                if (item.checked) {
                    checked = true;
                    return false;
                }
            });

            if (checked) {
                this.checkChange();
            }
        }
    }
});
// @source core/form/ComboBox.js

Ext.form.field.ComboBox.override({
    alwaysMergeItems: true,
    useHiddenField: true,
    simpleSubmit: false,
    checkChangeEvents: Ext.isIE ? ['change', 'propertychange', 'keyup'] : ['change', 'input', 'textInput', 'keyup', 'dragdrop'], // #648

    initComponent: function () {
        this.callParent(arguments);
        this.initMerge();
        this.includeHiddenStateToSubmitData = !this.simpleSubmit;

        if (!Ext.isEmpty(this.selectedItems) && this.store) {
            this.setInitValue(this.selectedItems);
        }
    },

    getHiddenStateName: function () {
        return this.valueHiddenName || ("_" + this.getName() + "_state");
    },

    getSubmitArray: function () {
        var state = [],
            value,
            record;

        if (!this.valueCollection || this.valueCollection.getCount() === 0) {
            value = this.getValue();
            if (!Ext.isEmpty(value)) {
                record = this.findRecordByValue(value);

                if (!record) {
                    this.mon(this.store, "load", this.syncHiddenState, this, { single: true });
                    return [{ value: value }];
                }

                return [{
                    value: record.get(this.valueField),
                    text: record.get(this.displayField),
                    index: this.store.indexOf(record)
                }];
            }

            return state;
        }

        this.valueCollection.each(function (model) {
            state.push({
                value: model.get(this.valueField),
                text: model.get(this.displayField),
                index: this.store.indexOf(model)
            });
        }, this);

        return state;
    },

    getHiddenState: function (value) {
        if (this.simpleSubmit) {
            return this.getValue();
        }

        var state = this.getSubmitArray();
        return state.length > 0 ? Ext.encode(state) : "";
    },

    onFieldMutation: function () {
        this.callParent(arguments);

        if (this.useHiddenField) {
            this.syncHiddenState();
        }
    },

    initMerge: function () {
        if (this.mergeItems) {
            if (this.store.getCount() > 0) {
                this.doMerge();
            }

            if (this.store.getCount() === 0 || this.alwaysMergeItems) {
                this.mon(this.store, "load", this.doMerge, this, { single: !this.alwaysMergeItems });
            }
        }
    },

    // Issue #1443 - TypeAhead treats regex as string. 
    doTypeAhead: function (queryPlan) {
        var me = this,
            lastQueryStr = queryPlan.lastQuery.source,
            queryStr = queryPlan.query.source;

        if (!me.typeAheadTask) {
            me.typeAheadTask = new Ext.util.DelayedTask(me.onTypeAhead, me);
        }

        // Here, send the regex's respective sources instead of the regex strings themselves.
        if (queryPlan.query.length > queryPlan.lastQuery.length || !Ext.String.startsWith(lastQueryStr, queryStr)) {
            me.typeAheadTask.delay(me.typeAheadDelay);
        }
    },

    doMerge: function () {
        for (var mi = this.mergeItems.length - 1; mi > -1; mi--) {
            var f = this.store.model.prototype.fields, dv = {};

            for (var i = 0; i < f.length; i++) {
                dv[f.items[i].name] = f.items[i].defaultValue;
            }

            if (!Ext.isEmpty(this.displayField, false)) {
                dv[this.displayField] = this.mergeItems[mi][1];
            }

            if (!Ext.isEmpty(this.valueField, false) && this.displayField != this.valueField) {
                dv[this.valueField] = this.mergeItems[mi][0];
            }

            this.store.insert(0, new this.store.model(dv));
        }
    },

    addRecord: function (values) {
        var rowIndex = this.store.data.length,
            record = this.insertRecord(rowIndex, values);

        return { index: rowIndex, record: record };
    },

    addItem: function (text, value) {
        var rowIndex = this.store.data.length,
            record = this.insertItem(rowIndex, text, value);

        return { index: rowIndex, record: record };
    },

    insertRecord: function (rowIndex, values) {
        this.store.clearFilter(true);
        return this.store.insert(rowIndex, values || {})[0];
    },

    insertItem: function (rowIndex, text, value) {
        var dv = {};

        if (!Ext.isEmpty(this.displayField, false)) {
            dv[this.displayField] = text;
        }

        if (!Ext.isEmpty(this.valueField, false) && this.displayField != this.valueField) {
            dv[this.valueField] = value;
        }

        return this.store.insert(rowIndex, dv)[0];
    },

    removeByField: function (field, value) {
        var index = this.store.find(field, value);

        if (index < 0) {
            return;
        }

        this.store.remove(this.store.getAt(index));
    },

    removeByIndex: function (index) {
        if (index < 0 || index >= this.store.getCount()) {
            return;
        }

        this.store.remove(this.store.getAt(index));
    },

    removeByValue: function (value) {
        this.removeByField(this.valueField, value);
    },

    removeByText: function (text) {
        this.removeByField(this.displayField, text);
    },

    setValueAndFireSelect: function (v) {
        this.setValue(v);
        this.fireEvent("select", this, this.valueCollection ? this.valueCollection.items : []);
    },

    setInitValue: function (value) {
        var set = Ext.Function.bind(function (value) {
            this.setSelectedItems(value, this.fireChangeOnLoad);
            this.resetOriginalValue();
        }, this, [value]);

        if (this.store.getCount() > 0) {
            set();
        } else {
            this.mon(this.store, "load", set, this, { single: true });
            this.setInitValueSetFunction = set;
        }
    },

    onLoad: function(store, records, success) { // #660
        var me = this,
            collapse = me.collapse,
            // This flag is saying that the raw value needs updating because the displayField is
            // different from the valueFiueld, so we need a record to translate from one to the other
            // and there is no match in our valueCollewction
            value = me.valueCollection.byValue.get(me.value),
            needsValueUpdating = (me.displayField !== me.valueField && !value) || (me.picker && !me.picker.getNode(value));

        if (this.mode === "single") { // it was before #660
            this.mode = "local";
        }

        // If not returning from a query, and the value was set from a raw data value, unrelated to a record
        // because the displayField was not honoured when calculating the raw value, then we update
        // the raw value.
        if (success && needsValueUpdating && !(store.lastOptions && store.lastOptions.rawQuery)) {
            me.collapse = Ext.emptyFn;
            me.setValueOnData();
            me.collapse = collapse;
        }
    },

    // This override forces local mode on the picked when it has a non-emptyFn
    // store or mode is set to 'single'.
    // This information is only relevant to Ext.NET so this override should
    // always exist in Ext.NET.
    createPicker: function () {
        var retval = this.callParent(arguments);

        if (this.mode == "single" && this.store.getCount() > 0) {
            this.mode = "local";
        }

        return retval;
    },

    setSelectedItems: function (items, fireChange) {
        var collapse = this.collapse;

        this.clearValue();

        if (items) {
            items = Ext.Array.from(items);

            var rec,
                values = [];

            Ext.each(items, function (item) {
                if (Ext.isDefined(item.value)) {
                    rec = this.findRecordByValue(item.value);

                    if (!rec && !isNaN(parseInt(item.value, 10)) && isFinite(item.value)) {
                        rec = this.findRecordByValue(parseInt(item.value, 10));
                    }

                    if (rec) {
                        values.push(rec);
                    }
                } else if (Ext.isDefined(item.text)) {
                    rec = this.findRecordByDisplay(item.text);
                    if (rec) {
                        values.push(rec);
                    }
                } else if (Ext.isDefined(item.index)) {
                    rec = this.store.getAt(item.index);
                    if (rec) {
                        values.push(rec);
                    }
                }
            }, this);

            this.collapse = Ext.emptyFn;

            if (fireChange !== false) {
                this.setValue(values);
            } else {
                this.suspendCheckChange++;
                this.setValue(values);
                this.suspendCheckChange--;
            }

            this.collapse = collapse;

            if (this.fireSelectOnLoad) {
                this.fireEvent("select", this, this.valueCollection ? this.valueCollection.items : []);
            }
        }
    },

    fireEvent: function() { // #716
        if (arguments[0] === "select") {
            arguments[2] = Ext.Array.from(arguments[2]);
        }

        return this.callParent(arguments); // #814
    }
});

// @source core/form/DateField.js

Ext.form.field.Date.override({
    initComponent: function () {
        if (this.vtype === "daterange") {
            this.enableKeyEvents = true;
            this.on("keyup", this.updateDateRange);
        }

        this.callParent(arguments);
    },

    updateDateRange: function (item, event) {
        var me = this,
            v = me.getValue(),
            field;

        if (me.startDateField) {
            field = Ext.getCmp(me.startDateField);
            field.setMaxValue(v);
            me.dateRangeMax = v;
        } else if (me.endDateField) {
            field = Ext.getCmp(me.endDateField);
            field.setMinValue(v);
            me.dateRangeMin = v;
        }

        field.validate();
    },

    createPicker : function () {
        var me = this,
            isMonth = this.type == "month",
            format = Ext.String.format,
            pickerConfig,
            monthPickerOptions;

        if (me.okText) {
            monthPickerOptions = monthPickerOptions || {};
            monthPickerOptions.okText = me.okText;
        }

        if (me.cancelText) {
            monthPickerOptions = monthPickerOptions || {};
            monthPickerOptions.cancelText = me.cancelText;
        }

        if (isMonth) {
            pickerConfig = {
                floating: true,
                hidden: true,
                small: true,
                preventRefocus: true,
                listeners: {
                    scope: me,
                    cancelclick: me.collapse,
                    okclick: me.onMonthSelect,
                    yeardblclick: me.onMonthSelect,
                    monthdblclick: me.onMonthSelect
                },
                keyNavConfig: {
                    esc : function () {
                        me.collapse();
                    }
                },
                // #668: This is required to avoid loosing focus and collapsing the DateField
                onMouseDown: function (e) {
                    e.preventDefault();
                }
            };

            if (me.pickerOptions) {
	            Ext.apply(pickerConfig, me.pickerOptions, monthPickerOptions || {});
            }        

            return Ext.create('Ext.picker.Month', pickerConfig);
        }        

        pickerConfig = {
            id: me.id + '-picker', // From ExtJS 6.0.2 > 6.2.0 upgrade
            pickerField: me,
            monthPickerOptions : monthPickerOptions,            
            floating: true,
            preventRefocus: true,
            hidden: true,            
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            ariaDisabledDatesText: me.ariaDisabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            ariaDisabledDaysText: me.ariaDisabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            ariaMinText: format(me.ariaMinText, me.formatDate(me.minValue, me.ariaFormat)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            ariaMaxText: format(me.ariaMaxText, me.formatDate(me.maxValue, me.ariaFormat)),
            listeners: {
                scope: me,
                select: me.onSelect,
                tabout: me.onTabOut
            },
            keyNavConfig: {
                esc: function () {
                    me.inputEl.focus();
                    me.collapse();
                }
            }
        };

        if (me.pickerOptions) {
	        Ext.apply(pickerConfig, me.pickerOptions);
        }        
        
        return new Ext.picker.Date(pickerConfig); // Actual since ExtJS 6.0.2 at least.
    },

    onMonthSelect : function (picker, value) {
        var me = this;

        var me = this,
            month = value[0],
            year = value[1],
            date = new Date(year, month, 1);

        if (date.getMonth() !== month) {
            date = new Date(year, month, 1).getLastDateOfMonth();
        }
        
        me.setValue(date);
        me.fireEvent('select', me, date);
        me.collapse();
    }
});

// @source core/form/Display.js

Ext.form.field.Display.override({
    initComponent: function () {
        if (!this.value && this.html) {
            this.value = this.html;
        }
 
        this.callParent(arguments);
    },

    getDisplayValue: function () {
        var me = this,
            value = this.getRawValue(),
            renderer = me.renderer,
            display;

        if (Ext.isEmpty(value) && !Ext.isEmpty(me.emptyText)) {
             display = me.emptyText;
        }
        else if (me.format) {
             display = Ext.net.StringUtils.format(me.format, value);
        }
        else if (renderer) {
             display = Ext.callback(renderer, me.scope, [value, me], 0, me);
        } else {
             display = me.htmlEncode ? Ext.util.Format.htmlEncode(value) : value;
        }
        return display;
    },
    
    // Appends the specified string and a new line to the DisplayField's value.
    // Options:
    //      text - a string to append.
    appendLine : function (text) {
        this.append(text + "<br/>");
    }
});

// @source core/form/DisplayTime.js

Ext.util.Format.timeSettings = {
    pastPrefix: null,
    futurePrefix: null,
    pastSuffix: "ago",
    futureSuffix: "from now",
    seconds: "less than a minute",
    minute: "about a minute",
    minutes: "{0} minutes",
    hour: "about an hour",
    hours: "about {0} hours",
    day: "a day",
    days: "{0} days",
    month: "about a month",
    months: "{0} months",
    year: "about a year",
    years: "{0} years",
    ranges : [
        {value: 0, unit: "second"},
        {value: 45, unit: "second", setting : "seconds"},
        {value: 90, unit: "second", setting : "minute"},
        {value: 45, unit: "minute", setting : "minutes"},
        {value: 90, unit: "minute", setting : "hour"},
        {value: 24, unit: "hour", setting : "hours"},
        {value: 42, unit: "hour", setting : "day"},
        {value: 30, unit: "day", setting : "days"},
        {value: 45, unit: "day", setting : "month"},
        {value: 365, unit: "day", setting : "months", divider: 30},
        {value: 1.5, unit: "year", setting : "year"},
        {value: Number.POSITIVE_INFINITY, unit: "year", setting : "years"},
    ]
};

Ext.util.Format.time = function (value) {
    if (!value) {
        return null;
    }
            
    if (!Ext.isDate(value)) {
        value = Ext.Date.parse(value, "c");
               
        if (!value) {
            value = Ext.Date.parse(value, "MS");
        }

        if (!value) {
            value = Ext.Date.parse(value, "time");
        }
    } 

    if (!value) {
        return null;
    }

    var diff = new Date().getTime() - value.getTime(),
        absDiff = Math.abs(diff),
        settings = Ext.util.Format.timeSettings,
        prefix = diff < 0 ? settings.futurePrefix : settings.pastPrefix,
        suffix = diff < 0 ? settings.futureSuffix : settings.pastSuffix,
        multiplier = {
            second : 1000,
            minute : 60000,
            hour : 3600000,
            day : 86400000,
            year : 31536000000
        },
        times = {
            second : absDiff / 1000,
            minute : absDiff / 60000,  // seconds / 60
            hour : absDiff / 3600000,  // minutes / 60
            day : absDiff / 86400000,  // hours / 24
            year : absDiff / 31536000000  // days / 365
        },                               
        i, 
        fn,
        range,                
        value1,
        value2,
        ranges = settings.ranges,
        length = ranges.length;

    for (i = 0; i < length; i++) {
        range = ranges[i];

        if(i < (length-1)){
            value1 = range.value * multiplier[range.unit];
            value2 = ranges[i+1].value * multiplier[ranges[i+1].unit];
                
            if(absDiff >= value1 && absDiff< value2) {
                range = ranges[i+1];
                break;
            }
        }                
    }

    fn = settings[range.setting];
    value1 = Math.round(range.divider ? (times[range.unit] / range.divider) : times[range.unit]);
    value2 = Ext.String.format(Ext.isFunction(fn) ? fn(value1) : fn, value1);

    return [prefix, value2, suffix].join(" ");
};

Ext.define('Ext.form.field.DisplayTime', {
    extend:'Ext.form.field.Display',
    alias: 'widget.displaytimefield',

    autoUpdate : false,
    updateInterval : 60000,

    constructor : function (config) {
        this.date = config.date;

        if (this.date) {
            config.value = this.date;
        }

        this.setValue = Ext.Function.bind(this.setValue, this);

        this.callParent(arguments);

        if(this.autoUpdate) {
            this.startUpdating();
        }
    },

    startUpdating : function (interval) {
        if(interval) {
            this.updateInterval = interval;
        }
        
        this.autoUpdate = true;
        this.timer = setInterval(this.setValue, this.updateInterval);
    },

    stopUpdating : function () {
        this.autoUpdate = false;
        if(this.timer) {
            clearInterval(this.timer);
            delete this.timer;
        }
    },

    setValue : function (date) {
        if(date) {
            this.date = date;
        }
        this.callParent([this.date ? Ext.util.Format.time(this.date) : ""]);
    }
});
// @source core/form/DropDownField.js

Ext.define("Ext.net.DropDownField", {
    extend: "Ext.form.field.Picker",
    alias: "widget.netdropdown",
    mode: "text",
    includeHiddenStateToSubmitData: false,
    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',

    syncValue: Ext.emptyFn,

    initComponent: function () {
        this.useHiddenField = this.mode !== "text";
        this.callParent();
    },

    getHiddenStateName: function () {
        return this.valueHiddenName || (this.getName() + "_value");
    },

    getHiddenState: function (value) {
        return this.getValue();
    },

    initValue: function () {
        if (!Ext.isEmpty(this.text)) {
            this.originalValue = this.lastValue = this.value;
            this.suspendCheckChange++;
            this.setValue(this.value ? this.value : (this.mode === "text" ? this.text : ""), this.text, false);
            this.suspendCheckChange--;
        }
        else {
            this.callParent();
        }

        this.originalText = this.getText();
    },

    collapseIf: function (e) {
        var me = this;
        if (this.allowBlur !== true && !me.destroyed && !e.within(me.bodyEl, false, true) && !me.owns(e.target) && !e.within(me.picker.el, false, true)) {
            me.collapse();
        }
    },

    // Updated with base on ExtJS 6.2.0 Ext.picker.Date
    initEvents: function () {
        var me = this;
        me.callParent();

        me.keyNav = new Ext.util.KeyNav(me.inputEl, Ext.apply({
            scope: me,
            tab: function (e) {
                this.handleTabKey(e);
                return true;
            }
        }, me.keyNavConfig));

        if (me.disabled) {
            me.syncDisabled(true);
        }
    },

    createPicker: function () {
        if (this.component && !this.component.render) {
            this.component = new Ext.ComponentManager.create(Ext.apply(this.component, {
                renderTo: Ext.net.getEl(this.componentRenderTo) || Ext.net.ResourceMgr.getAspForm() || document.body,
                dropDownField: this,
                hidden: true,
                floating: true
            }), "panel");

            if (this.component.rendered) {
                this.syncValue(this.getValue(), this.getText());
            } else {
                this.mon(this.component, "afterrender", function () {
                    this.syncValue(this.getValue(), this.getText());
                }, this);
            }
        }

        return this.component;
    },

    onSyncValue: function (value, text) {
        if (this.component && this.component.rendered) {
            this.syncValue(value, text);
        }
    },

    setValue: function (value, text, collapse, preventSync) {

        if (this.mode === "text") {
            collapse = text;
            text = value;
        }

        this._value = value;

        this.callParent([text]);

        if (preventSync === false || ((preventSync == null || !Ext.isDefined(preventSync)) && !this.isExpanded)) {
            this.onSyncValue(value, text);
        }

        if (collapse !== false) {
            this.collapse();
        }

        return this;
    },

    getText: function () {
        return Ext.net.DropDownField.superclass.getValue.call(this);
    },

    getValue: function () {
        return this.mode == "text" ? this.callParent() : this._value;
    },

    reset: function () {
        this.setValue(this.originalValue, this.originalText, false);
        this.clearInvalid();
        delete this.wasValid;
        this.applyEmptyText();
    },

    clearValue: function () {
        this.setValue("", "", false);
        this.clearInvalid();
        delete this.wasValid;
        this.applyEmptyText();
    },

    checkChange: function () {
        if (!this.suspendCheckChange) {
            var me = this,
                newVal = me.getValue(),
                rawValue = me.getRawValue(),
                oldVal = me.lastValue,
                oldRawVal = me.lastRawValue;

            if (!me.isEqual(newVal, oldVal) && !me.destroyed) {
                me.lastValue = newVal;
                me.lastRawValue = rawValue;

                me.fireEvent('change', me, newVal, oldVal);
                me.onChange(newVal, oldVal);
            } else if (!me.isEqual(rawValue, oldRawVal) && !me.destroyed) {
                me.lastRawValue = rawValue;
                me.fireEvent('change', me, newVal, oldVal);
                me.onChange(newVal, oldVal);
            }
        }
    },

    // Added with base on ExtJS 6.2.0 Ext.picker.Date - start
    doDestroy: function () {
        var me = this;
        Ext.destroy(me.keyNav);
        return me.callParent(arguments);
    },

    handleTabKey: function (e) {
        var me = this;

        if (!me.disabled && me.isExpanded) {
            me.collapse();
        } else {
            me.fireEventArgs('tabout', [
                me
            ]);
        }
    },

    onDisable: function () {
        var retVal = this.callParent(arguments);
        this.syncDisabled(true);
        return retVal;
    },

    onEnable: function () {
        var me = this;
        var retVal = me.callParent(arguments);
        this.syncDisabled(true);
        return retVal;
    },

    onHide: function () {
        var retVal = this.callParent(arguments);
        this.syncDisabled(true);
        return retVal;
    },

    onShow: function () {
        var me = this;
        me.callParent();
        me.syncDisabled(false);
    },

    syncDisabled: function(disabled) {
        var me = this,
            keyNav = me.keyNav;

        if (keyNav) {
            keyNav.setDisabled(disabled);
        }
    }
    // Added with base on ExtJS 6.2.0 Ext.picker.Date - end
});

// @source core/form/FileUploadField.js

Ext.form.field.File.override({
    stripPath: true,
    
    isIconIgnore : function () {
        return true;
    },

    onFileChange: function (button, e, value) {
        this.lastValue = null;
        this.duringFileSelect = true;

        if (this.stripPath === false) {
            Ext.form.field.File.superclass.setValue.call(this, value);
            delete this.duringFileSelect;
            return;
        }

        var v = value,                
            fileNameRegex = /[^\\]*$/im,
            fileNameRegexNix = /[^/]*$/im,
            match = fileNameRegex.exec(v);
                    
        if (match !== null) {
	        v = match[0];
        }
        else {
            match = fileNameRegexNix.exec(v);
            if (match !== null) {
	            v = match[0];
            }
        }

        Ext.form.field.File.superclass.setValue.call(this, v);
        delete this.duringFileSelect;
    },

    onEnable: function () {
        var me = this;
        me.callParent();
        me.button.fileInputEl.dom.removeAttribute("disabled");
    },

    reset : function () {        
        this.callParent();
        if (this.disabled) {
            this.button.fileInputEl.dom.disabled = true;
        }
    }
});

// @source core/form/Hidden.js
Ext.form.field.Hidden.override({
    hidden : true,
    autoEl : {
        tag  : "input",
        type : "hidden"
    },

    getElConfig : function () {
        return Ext.apply(this.callParent(), {
            id    : this.id,
            name  : this.name || this.getInputId(),
            //value : this.getRawValue(),
            cls: Ext.baseCSSPrefix + 'form-hidden x-form-field'
        });
    },

    afterRender : function () {
        this.inputEl = this.el;
        this.labelEl = this.el;
        this.bodyEl = this.el;
        this.errorEl = this.el;
        this.inputRow = this.el;

        if (Ext.isDefined(this.value)) {
            this.originalValue = this.lastValue = this.value;
            this.el.dom.value = this.value;
        }
        
        this.callParent();
    },

    renderActiveError : Ext.emptyFn,
    updateLayout :  Ext.emptyFn
});
// @source core/form/HtmlEditor.js

Ext.form.field.HtmlEditor.override({
    escapeValue: true,

    componentTpl: [
        '{beforeTextAreaTpl}',
        '<textarea id="{id}-textareaEl" data-ref="textareaEl" name="{name}" tabindex="-1" {inputAttrTpl}',
                 ' class="{textareaCls}" autocomplete="off">',
            '{[ this.owner.escapeValue ? escape(values.value || "") : Ext.util.Format.htmlEncode(values.value) ]}', // #880
        '</textarea>',
        '{afterTextAreaTpl}',
        '{beforeIFrameTpl}',
        '<iframe id="{id}-iframeEl" data-ref="iframeEl" name="{iframeName}" frameBorder="0" {iframeAttrTpl}',
               ' src="{iframeSrc}" class="{iframeCls}"></iframe>',
        '{afterIFrameTpl}',
        {
            disableFormats: true
        }
    ],

    initComponent: function () {
        if (this.initialConfig && this.initialConfig.buttonTips) {
            this.buttonTips = Ext.Object.merge(Ext.clone(Ext.form.field.HtmlEditor.prototype.buttonTips), this.buttonTips);
        }

        if (!this.name) {
            this.name = this.id || this.inputId || Ext.id();
        }
        this.callParent(arguments);
    },

    syncValue: function () {
        var me = this,
            body, changed, html, bodyStyle, match, textElDom;
        if (me.initialized) {
            body = me.getEditorBody();
            html = body.innerHTML;
            textElDom = me.textareaEl.dom;
            if (Ext.isWebKit) {
                bodyStyle = body.getAttribute('style'); // Safari puts text-align styles on the body element!
                match = bodyStyle.match(me.textAlignRE);

                if (match && match[1]) {
                    html = '<div style="' + match[0] + '">' + html + '</div>';
                }
            }
            html = me.cleanHtml(html);
            if (me.fireEvent('beforesync', me, html) !== false) {

                // Gecko inserts single <br> tag when input is empty
                // and user toggles source mode. See https://sencha.jira.com/browse/EXTJSIV-8542
                if (Ext.isGecko && textElDom.value === '' && html === '<br>') {
                    html = '';
                }

                if (textElDom.value !== html) {
                    textElDom.value = this.escapeValue ? escape(html) : html;
                    changed = true;
                }

                me.fireEvent('sync', me, html);

                if (changed && !me.inSync) {
                    // we have to guard this to avoid infinite recursion because getValue
                    // calls this method...
                    me.inSync = true;
                    me.checkChange();
                    delete me.isSync;
                }
            }
        }
    },

    setValue: function (value) {
        var me = this,
            textarea = me.textareaEl;

        if (value === null || value === undefined) {
            value = '';
        }

        if (me.value !== value) {
            if (textarea) {
                textarea.dom.value = this.escapeValue ? escape(value) : value;
            }

            me.pushValue();

            if (!me.rendered && me.inputCmp) {
                me.inputCmp.data.value = value;
            }

            me.mixins.field.setValue.call(me, value);
        }

        return me;
    },


    getValue: function () {
        var me = this,
            value;
        if (!me.sourceEditMode) {
            me.syncValue();
        }
        value = me.rendered ? me.textareaEl.dom.value : me.value;
        me.value = value;

        return this.escapeValue ? unescape(value) : value;
    },

    toggleSourceEdit: function (sourceEditMode) {
        var me = this,
            iframe = me.iframeEl,
            textarea = me.textareaEl,
            hiddenCls = Ext.baseCSSPrefix + 'hidden',
            btn = me.getToolbar().getComponent('sourceedit');

        if (!Ext.isBoolean(sourceEditMode)) {
            sourceEditMode = !me.sourceEditMode;
        }
        me.sourceEditMode = sourceEditMode;

        if (btn.pressed !== sourceEditMode) {
            btn.toggle(sourceEditMode);
        }
        if (sourceEditMode) {
            me.disableItems(true);
            me.syncValue();
            if (this.escapeValue) {
                textarea.dom.value = unescape(this.textareaEl.dom.value);
            }
            iframe.addCls(hiddenCls);
            textarea.removeCls(hiddenCls);
            textarea.dom.removeAttribute('tabIndex');
            textarea.focus();
            me.inputEl = textarea;
        }
        else {
            if (me.initialized) {
                me.disableItems(me.readOnly);
            }
            me.pushValue();
            if (this.escapeValue) {
                textarea.dom.value = escape(this.textareaEl.dom.value);
            }
            iframe.removeCls(hiddenCls);
            textarea.addCls(hiddenCls);
            textarea.dom.setAttribute('tabIndex', -1);
            me.deferFocus();
            me.inputEl = iframe;
        }
        me.fireEvent('editmodechange', me, sourceEditMode);
        me.updateLayout();
    },

    pushValue: function () {
        var me = this,
           v;
        if (me.initialized) {
            v = (me.escapeValue ? unescape(me.textareaEl.dom.value) : me.textareaEl.dom.value) || "";
            if (!me.activated && v.length < 1) {
                v = me.defaultValue;
            }
            if (me.fireEvent('beforepush', me, v) !== false) {
                me.getEditorBody().innerHTML = v;
                if (Ext.isGecko) {
                    // Gecko hack, see: https://bugzilla.mozilla.org/show_bug.cgi?id=232791#c8
                    me.setDesignMode(false);  //toggle off first
                    me.setDesignMode(true);
                }
                me.fireEvent('push', me, v);
            }
        }
    },

    // Appends the text.
    // Options:
    //      text - a string to append.
    //      (optional) appendLine - appends a new line if true. Defaults to false.
    append: function (text, appendLine) {
        this.setValue([this.getValue(), text, appendLine === true ? "<br/>" : ""].join(""), false);
    },

    // Appends the text and a new line.
    // Options:
    //      text - a string to append.
    appendLine: function (text) {
        this.append(text, true);
    },

    setReadOnly: function (readOnly) {
        this.callParent(arguments);
        this[!!readOnly ? 'addCls' : 'removeCls'](this.readOnlyCls); // #887
    }
});

Ext.layout.component.field.HtmlEditor.override({
    finishedLayout: function () { // #885
        var body;

        this.callParent(arguments);
        body = this.owner.getDoc().body;

        if (body) {
            body.style[Ext.isIE8 ? "height" : "minHeight"] = this.owner.iframeEl.getHeight() + "px";;
        }
    }
});
// @source core/form/Label.js

Ext.define("Ext.net.Label", {
    extend: "Ext.form.Label",
    alias: 'widget.netlabel',
    requires: ['Ext.XTemplate'],
    iconAlign: "left",
    baseCls: Ext.baseCSSPrefix + "label",

    renderTpl: [
        '<tpl if="iconAlign == \'left\'">',
            '<img id="{id}-imgEl" data-ref="imgEl" src="{[Ext.BLANK_IMAGE_URL]}" class="' + Ext.baseCSSPrefix + 'label-icon',
            '<tpl if="!Ext.isEmpty(iconCls)"> {iconCls}</tpl>',
            '"/>',
        '</tpl>',
        '<span id="{id}-textEl" data-ref="textEl" class="' + Ext.baseCSSPrefix + 'label-value">',
        '<tpl if="!Ext.isEmpty(html)">{html}</tpl>',
        '</span>',
        '<tpl if="iconAlign == \'right\'">',
            '<img id="{id}-imgEl" data-ref="imgEl" src="{[Ext.BLANK_IMAGE_URL]}" class="' + Ext.baseCSSPrefix + 'label-icon',
            '<tpl if="!Ext.isEmpty(iconCls)"> {iconCls}</tpl>',
            '"/>',
        '</tpl>'
    ],

    childEls: ["imgEl", "textEl"],

    getElConfig: function () {
        var me = this;
        return Ext.apply(me.callParent(), {
            tag: 'label',
            id: me.id,
            htmlFor: me.forId || ''
        });
    },

    beforeRender: function () {
        var me = this;

        me.callParent();

        Ext.apply(me.renderData, {
            iconAlign: me.iconAlign,
            iconCls: me.iconCls || "",
            html: me.getDisplayText(me.text ? me.text : me.html, !!me.text)
        });

        delete me.html;
    },

    afterRender: function () {
        Ext.net.Label.superclass.afterRender.call(this);

        if (Ext.isEmpty(this.iconCls)) {
            this.imgEl.setDisplayed(false);
        }

        if (this.editor) {
            if (Ext.isEmpty(this.editor.field)) {
                this.editor.field = {
                    xtype: "textfield"
                };
            }

            this.editor.target = this.textEl;
            this.editor = new Ext.Editor(this.editor);
        }
    },

    getText: function (encode) {
        return this.rendered ? encode === true ? Ext.util.Format.htmlEncode(this.textEl.getHtml()) : this.textEl.getHtml() : this.text;
    },

    getDisplayText: function (text, encode) {
        var t = text || this.text || this.html || "",
            x = encode !== false ? Ext.util.Format.htmlEncode(t) : t;

        return (Ext.isEmpty(t) && !Ext.isEmpty(this.emptyText)) ? this.emptyText : !Ext.isEmpty(this.format) ? Ext.net.StringUtils.format(this.format, x) : x
    },

    setText: function (text, encode) {
        encode = encode !== false;

        if (encode) {
            this.text = text;
            delete this.html;
        } else {
            this.html = text;
            delete this.text;
        }

        if (this.rendered) {
            this.textEl.setHtml(this.getDisplayText(null, encode));
            this.updateLayout();
        }

        return this;
    },

    setIconCls: function (cls) {
        var oldCls = this.iconCls;

        cls = cls.indexOf('#') === 0 ? X.net.RM.getIcon(cls.substring(1)) : cls;

        this.iconCls = cls;

        if (this.rendered) {
            this.imgEl.replaceCls(oldCls, this.iconCls);
            this.imgEl.setDisplayed(!Ext.isEmpty(cls));
        }
    },

    // Appends the specified string to the label's innerHTML.
    // Options:
    //      text - a string to append.
    //      (optional) appendLine - appends a new line if true. Defaults to false.
    append: function (text, appendLine) {
        this.setText([this.getText(), text, appendLine === true ? "<br/>" : ""].join(""), false);
    },

    // Appends the specified string and a new line to the label's innerHTML.
    // Options:
    //      text - a string to append.
    appendLine: function (text) {
        this.append(text, true);
    },

    privates: {
        getContentTarget: function () {
            return this.textEl;
        }
    }
});
// @source core/form/Hyperlink.js

Ext.define("Ext.net.Hyperlink", {
    extend: "Ext.net.Label",
    alias: 'widget.nethyperlink',
    url: "#",

    renderTpl: [
        '<tpl if="iconAlign == \'left\'">',
           '<img src="{[Ext.BLANK_IMAGE_URL]}" class="' + Ext.baseCSSPrefix + 'label-icon',
           '<tpl if="!Ext.isEmpty(iconCls)"> {iconCls}</tpl>',
           '"/>',
        '</tpl>',
        '<a style="vertical-align:middle;"',
        '<tpl if="!Ext.isEmpty(hrefCls)"> class="{hrefCls}"</tpl>',
        '<tpl if="!Ext.isEmpty(href)"> href="{href}"</tpl>',
        '>',
        '</a>',
        '<tpl if="iconAlign == \'right\'">',
           '<img src="{[Ext.BLANK_IMAGE_URL]}" class="' + Ext.baseCSSPrefix + 'label-icon',
           '<tpl if="!Ext.isEmpty(iconCls)"> {iconCls}</tpl>',
           '"/>',
        '</tpl>',
    ],

    getElConfig: function () {
        var me = this;
        return Ext.apply(me.callParent(), {
            tag: 'span',
            id: me.id
        });
    },

    beforeRender: function () {
        var me = this;

        me.callParent();

        Ext.apply(me.renderData, {
            iconAlign: me.iconAlign,
            iconCls: me.iconCls || "",
            hrefCls: this.hrefCls,
            href: this.url
        });

        Ext.apply(me.childEls, {
            imgEl: { select: '.' + Ext.baseCSSPrefix + 'label-icon' },
            textEl: { select: 'a' }
        });
    },

    afterRender: function () {
        Ext.net.Hyperlink.superclass.afterRender.call(this);

        if (!Ext.isEmpty(this.target, false)) {
            this.textEl.set({ "target": this.target });
        }

        if (this.imageUrl) {
            this.textEl.setHtml('<img src="' + this.imageUrl + '" />');
        } else {
            this.textEl.setHtml(this.text ? Ext.util.Format.htmlEncode(this.text) : (this.html || ""));
        }
    },

    onDisable : function() {
        this.textEl.set({ 
            href: undefined
        });
        this.textEl.setStyle({
            "text-decoration": "none"
        });
    },

    onEnable : function() {
        this.textEl.set({
            href: this.url
        });
        this.textEl.setStyle({
            "text-decoration": undefined
        });
    },

    setImageUrl: function (imageUrl) {
        this.imageUrl = imageUrl;
        this.textEl.setHtml('<img style="border:0px;" src="' + this.imageUrl + '" />');
    },

    setUrl: function (url) {
        this.url = url;
        this.textEl.set({ "href": this.url });
    },

    setTarget: function (target) {
        this.target = target;
        this.textEl.set({ "target": this.target });
    }
});
// @source core/form/Image.js

Ext.define("Ext.layout.component.Image", {
    extend: "Ext.layout.component.Auto",
    alias: ["layout.image"],
    type: 'image',

    publishInnerHeight: function (ownerContext, height) {
        var padding = this.owner.el.getPadding("tb") || 0,
            border = this.owner.el.getBorderWidth("tb") || 0;

        if (this.owner.allowPan || this.owner.resizable) {
            this.owner.el.setHeight(height);

            if (!this.owner.allowPan) {
                this.owner.imgEl.setHeight(height - padding - border);
            }
        }
        else {
            this.owner.imgEl.setHeight(height - padding - border);
        }
    },

    publishInnerWidth: function (ownerContext, width) {
        var padding = this.owner.el.getPadding("lr") || 0,
            border = this.owner.el.getBorderWidth("lr") || 0;

        if (this.owner.allowPan || this.owner.resizable) {
            this.owner.el.setWidth(width);

            if (!this.owner.allowPan) {
                this.owner.imgEl.setWidth(width - padding - border);
            }
        }
        else {
            this.owner.imgEl.setWidth(width - padding - border);
        }
    }
});

Ext.define("Ext.net.Image", {
    extend: "Ext.Component",
    alias: "widget.netimage",
    lazyLoad: false,
    monitorComplete: true,
    monitorPoll: 200,
    allowPan: false,
    componentLayout: "image",

    renderTpl: [
            '<img src="{src}" style="border:none;"',
                 '<tpl if="!Ext.isEmpty(altText)"> alt="{altText}"</tpl>',
                 '<tpl if="!Ext.isEmpty(align)"> align="{align}"</tpl>',
                 '<tpl if="!Ext.isEmpty(cls)"> class="{cls}"</tpl>',
                 '<tpl if="!Ext.isEmpty(title)"> title="{title}"</tpl>',
             '/>',
    ],

    initComponent: function () {
        Ext.net.Image.superclass.initComponent.call(this);

        this.imageProxy = new Image();

        if (this.monitorComplete) {
            if (this.loadMask) {

                this.loadMask = Ext.apply({ msg: Ext.view.AbstractView.prototype.loadingText, msgCls: "x-mask-msg" }, this.loadMask);

                this.on("beforeload", function () {
                    if (this.rendered) {
                        this.getMaskEl().mask(this.loadMask.msg, this.loadMask.msgCls);
                    } else {
                        this.loadMask.deferredMask = true;
                    }
                });

                this.on("complete", function () {
                    if (this.rendered) {
                        this.getMaskEl().unmask(this.loadMask.removeMask);
                    }
                    else {
                        this.loadMask.deferredMask = false;
                    }
                }, this);
            }

            this.checkTask = new Ext.util.DelayedTask(function () {
                if (this.imageProxy.complete) {
                    this.checkTask.cancel();
                    this.complete = true;

                    if (this.allowPan && this.rendered) {
                        if (this.xDelta || this.yDelta) {
                            this.el.dom.scrollLeft -= this.xDelta || 0;
                            this.el.dom.scrollTop -= this.yDelta || 0;
                        }
                    }

                    this.fireEvent("complete", this);
                } else {
                    this.checkTask.delay(this.monitorPoll);
                }
            }, this);

            if (!this.lazyLoad) {
                this.imageProxy.src = this.src;
                this.fireEvent("beforeload", this);
                this.checkTask.delay(this.monitorPoll);
            }
        }
    },

    getMaskEl: function () {
        return this.el;
    },

    getOriginalSize: function () {
        return {
            width: this.imageProxy.width,
            height: this.imageProxy.height
        };
    },

    beforeRender: function () {
        var me = this,
            cls = this.cls;

        me.callParent();

        if (this.lazyLoad) {
            this.imageProxy.src = this.src;

            if (this.monitorComplete) {
                this.fireEvent("beforeload", this);
                this.checkTask.delay(this.monitorPoll);
            }
        }

        if (!Ext.isEmpty(this.imgCls)) {
            if (Ext.isEmpty(cls)) {
                cls = this.imgCls;
            } else {
                cls += " " + this.imgCls;
            }
        }

        this.renderData = {
            altText: this.altText,
            align: this.align !== "notset" ? this.align : null,
            cls: cls,
            src: this.src,
            title: this.title
        };

        Ext.apply(this.childEls, {
            imgEl: { selectNode: 'img' }
        });
    },

    initResizable: Ext.emptyFn,

    afterRender: function () {
        Ext.net.Image.superclass.afterRender.apply(this);

        this.imgEl.on("click", this.onClick, this);
        this.imgEl.on("dblclick", this.onDblClick, this);
        if (this.allowPan) {
            this.el.dom.style.overflow = "hidden";
            this.imgEl.on("mousedown", this.onMouseDown, this);
            this.imgEl.setStyle("cursor", "move");

            if (this.xDelta || this.yDelta) {
                this.el.dom.scrollLeft -= this.xDelta || 0;
                this.el.dom.scrollTop -= this.yDelta || 0;
            }
        }

        if (this.resizable) {
            this.resizer = Ext.create("Ext.resizer.Resizer", Ext.applyIf(this.resizable || {}, {
                target: this,
                handles: "all"
            }));

            this.resizer.on("beforeresize", function (r, e) {
                return this.fireEvent("resizerbeforeresize", this, e);
            }, this);

            this.resizer.on("resize", function (r, width, height, e) {
                if (!this.allowPan) {
                    this.imgEl.setSize(width, height);
                }

                this.fireEvent("resizerresize", this, width, height, e);
            }, this);
        }
    },

    afterComponentLayout: function () {
        this.callParent(arguments);

        if (this.loadMask && this.loadMask.deferredMask) {
            this.getMaskEl().mask(this.loadMask.msg, this.loadMask.msgCls);
            delete this.loadMask.deferredMask;
        }
    },

    onClick: function (e, t) {
        this.fireEvent("click", this, e, t);
    },

    onDblClick: function (e, t) {
        this.fireEvent("dblclick", this, e, t);
    },

    onMouseDown: function (e) {
        e.stopEvent();
        this.mouseX = e.getX();
        this.mouseY = e.getY();
        Ext.getBody().on("mousemove", this.onMouseMove, this);
        Ext.getDoc().on("mouseup", this.onMouseUp, this);
    },

    onMouseMove: function (e) {
        e.stopEvent();

        var x = e.getX(),
            y = e.getY();

        if (e.within(this.el)) {
            var xDelta = x - this.mouseX;
            var yDelta = y - this.mouseY;
            this.el.dom.scrollLeft -= xDelta;
            this.el.dom.scrollTop -= yDelta;
            this.fireEvent("pan", this, this.el.dom.scrollLeft, this.el.dom.scrollTop, xDelta, yDelta);
        }

        this.mouseX = x;
        this.mouseY = y;
    },

    onMouseUp: function (e) {
        Ext.getBody().un("mousemove", this.onMouseMove, this);
        Ext.getDoc().un("mouseup", this.onMouseUp, this);
    },

    setSrc: function (src) {
        this.src = src;

        if (this.rendered) {
            this.imgEl.dom.removeAttribute("width");
            this.imgEl.dom.removeAttribute("height");
            this.imgEl.dom.src = this.src;

            if (this.monitorComplete) {
                delete this.imageProxy;
                this.imageProxy = new Image();
                this.imageProxy.src = this.src;
                this.fireEvent("beforeload", this);
                this.checkTask.cancel();
                this.checkTask.delay(this.monitorPoll);
            }
        } else {
            if (!this.lazyLoad) {
                delete this.imageProxy;
                this.imageProxy = new Image();
                this.imageProxy.src = this.src;

                if (this.monitorComplete) {
                    this.fireEvent("beforeload", this);
                    this.checkTask.cancel();
                    this.checkTask.delay(this.monitorPoll);
                }
            }
        }
    },

    setImageUrl: function (imageUrl) {
        return this.setSrc(imageUrl);
    },

    setAlign: function (align) {
        this.align = align;

        if (this.rendered) {
            this.imgEl.dom.setAttribute("align", this.align);
        }
    },

    setAltText: function (altText) {
        this.altText = altText;

        if (this.rendered) {
            this.imgEl.dom.setAttribute("altText", this.altText);
        }
    },

    scroll: function (x, y) {
        if (x) {
            this.el.dom.scrollLeft -= x;
        }

        if (y) {
            this.el.dom.scrollTop -= y;
        }
    },

    scrollTo: function (x, y) {
        if (x || x === 0) {
            this.el.dom.scrollLeft = x;
        }

        if (y || y === 0) {
            this.el.dom.scrollTop = y;
        }
    },

    getCurrentScroll: function () {
        return {
            x: this.el.dom.scrollLeft,
            y: this.el.dom.scrollTop
        };
    },

    privates: {
        getContentTarget: function () {
            return this.imgEl;
        }
    }
});
// @source core/form/MultiCombo.js

Ext.define("Ext.net.MultiCombo", {
    extend: "Ext.form.field.ComboBox",
    alias: "widget.netmulticombo",

    wrapBySquareBrackets: false,
    selectionMode: "checkbox",
    multiSelect: true,
    sortByDisplayField: false,
    sortByValueField: false,

    assertValue: function () {
        this.collapse();
    },

    getPicker: function () {
        if (!this.picker) {
            this.listConfig = this.listConfig || {};

            if (!this.listConfig.getInnerTpl) {
                this.listConfig.getInnerTpl = function (displayField) {
                    return '<div class="x-combo-list-item {[this.getItemClass(values)]}">' +
                          '<div class="x-mcombo-text">{' + displayField + '}</div></div>';
                };
            }

            this.picker = this.createPicker();

            this.mon(this.picker.getSelectionModel(), 'select', this.onListSelect, this);
            this.mon(this.picker.getSelectionModel(), 'deselect', this.onListDeselect, this);

            this.picker.tpl.getItemClass = Ext.Function.bind(function (values) {
                var record,
                    //fieldValue = this.getValue(),
                    searchValue,
                    selected;

                if (this.selectionMode === "selection") {
                    return "";
                }

                Ext.each(this.store.getRange(), function (r) {
                    // do not replace == by ===
                    if (r.get(this.valueField) == values[this.valueField]) {
                        record = r;
                        return false;
                    }
                }, this);

                selected = record ? this.picker.getSelectionModel().isSelected(record) : false;

                

                if (selected) {
                    return "x-mcombo-item-checked";
                }

                return "x-mcombo-item-unchecked";

            }, this, [], true);


            if (this.selectionMode !== "checkbox") {
                this.picker.on("render", function () {
                    this.picker.overItemCls = "x-multi-selected";
                }, this);
            }

            this.picker.on("viewready", this.onViewReady, this, { single: true });
        }

        return this.picker;
    },

    onViewReady: function () {
        this.valueCollection.each(function (r) {
            this.selectRecord(r);
        }, this);
    },

    onListSelect: function (model, record) {
        if (!this.ignoreSelection) {
            this.selectRecord(record);
        }
    },

    onListDeselect: function (model, record) {
        if (!this.ignoreSelection) {
            this.deselectRecord(record);
        }
    },

    initComponent: function () {
        this.editable = false;

        this.callParent(arguments);
    },

    getDisplayValue: function () {
        var value = this.displayTpl.apply(this.displayTplData);
        return this.wrapBySquareBrackets ? "[" + value + "]" : value;
    },

    isSelected: function (record) {
        if (Ext.isNumber(record)) {
            record = this.store.getAt(record);
        }

        if (Ext.isString(record)) {
            Ext.each(this.store.getRange(), function (r) {
                // do not replace == by ===
                if (r.get(this.valueField) == record) {
                    record = r;
                    return false;
                }
            }, this);
        }

        return this.valueCollection.indexOf(record) !== -1;
    },

    //private
    deselectRecord: function (record) {
        if (!this.picker) {
            return;
        }

        switch (this.selectionMode) {
            case "checkbox":
                this.picker.refreshNode(this.store.indexOf(record));
                break;
            case "selection":
                if (this.picker.getSelectionModel().isSelected(record)) {
                    this.picker.deselect(this.store.indexOf(record));
                }

                break;
            case "all":
                if (this.picker.getSelectionModel().isSelected(record)) {
                    this.picker.deselect(this.store.indexOf(record));
                }

                this.picker.refreshNode(this.store.indexOf(record));
                break;
        }
    },

    //private
    selectRecord: function (record) {
        if (!this.picker) {
            return;
        }

        switch (this.selectionMode) {
            case "checkbox":
                this.picker.refreshNode(this.store.indexOf(record));
                break;
            case "selection":
                if (!this.picker.getSelectionModel().isSelected(record)) {
                    this.picker.select(this.store.indexOf(record), true);
                }

                break;
            case "all":
                if (!this.picker.getSelectionModel().isSelected(record)) {
                    this.picker.select(this.store.indexOf(record), true);
                }

                this.picker.refreshNode(this.store.indexOf(record));
                break;
        }
    },

    selectAll: function () {
        this.setValue(this.store.getRange());
    },

    deselectItem: function (record) {
        if (Ext.isNumber(record)) {
            record = this.store.getAt(record);
        }

        if (Ext.isString(record)) {
            Ext.each(this.store.getRange(), function (r) {
                // do not replace == by ===
                if (r.get(this.valueField) == record) {
                    record = r;
                    return false;
                }
            }, this);
        }

        if (this.valueCollection.indexOf(record) !== -1) {
            this.setValue(this.valueCollection.remove(record));
            this.deselectRecord(record);
        }
    },

    selectItem: function (record) {
        if (Ext.isNumber(record)) {
            record = this.store.getAt(record);
        }

        if (Ext.isString(record)) {
            Ext.each(this.store.getRange(), function (r) {
                // do not replace == by ===
                if (r.get(this.valueField) == record) {
                    record = r;
                    return false;
                }
            }, this);
        }

        if (this.valueCollection.indexOf(record) === -1) {
            this.valueCollection.add(record);
            this.setValue(this.valueCollection.items);
        }
    },

    getSelectedRecords: function () {
        return this.valueCollection.items;
    },

    getSelectedIndexes: function () {
        var indexes = [];

        this.valueCollection.each(function (record) {
            indexes.push(this.store.indexOf(record));
        }, this);

        return indexes;
    },

    getSelectedValues: function () {
        var values = [];

        this.valueCollection.each(function (record) {
            values.push(record.get(this.valueField));
        }, this);

        return values;
    },

    getSelectedText: function () {
        var text = [];

        this.valueCollection.each(function (record) {
            text.push(record.get(this.displayField));
        }, this);

        return text;
    },

    getSelection: function () {
        var selection = [];

        this.valueCollection.each(function (record) {
            selection.push({
                text: record.get(this.displayField),
                value: record.get(this.valueField),
                index: this.store.indexOf(record)
            });
        }, this);

        return selection;
    },

    setValue: function (value, doSelect) {
        var me = this,
            matchedRecords,
            nonRecords,
            fieldToSortBy,
            record;

        if (Ext.isEmpty(value)) {
            value = null;
        }

        me.callParent(arguments);

        this.valueCollection.each(function (r) {
            this.selectRecord(r);
        }, this);
    },

    onValueCollectionEndUpdate: function() {
        if (this.sortByDisplayField || this.sortByValueField) {
            this.valueCollection.sort(this.sortByDisplayField ? this.displayField : this.valueField, "ASC");
        }

        this.callParent(arguments);
    },

    reset: function () {
        this.callParent(arguments);
        if (this.picker && this.picker.rendered) {
            this.picker.refresh();
        }
    },

    clearValue: function () {
        this.callParent(arguments);
        if (this.picker && this.picker.rendered) {
            this.picker.refresh();
        }
    }
});

// @source core/form/Number.js

Ext.form.NumberField.override({
    setValue: function (v) {
        this.callParent(arguments);

        if (this.trimTrailedZeros === false) {
            var value = this.getValue(),
                strValue;
        
            if (!Ext.isEmpty(value, false)) {
                strValue = value.toFixed(this.decimalPrecision).replace(".", this.decimalSeparator);    
                this.setRawValue(strValue);
            }
        }
    }
});

// @source core/form/Picker.js

Ext.form.field.Picker.override({
    collapseIf: function(e) { // #554
        var me = this;

        if (!me.destroyed && !e.within(me.bodyEl, false, true) && !me.owns(e.target) && !e.within(me.picker.el, false, true) && !Ext.fly(e.target).isFocusable()) {
            me.collapse();
        }
    },

    setHideBaseTrigger: function (value) {
        if (this.triggers && this.triggers.picker) {
            this.triggers.picker[value ? "hide" : "show"].apply(this.triggers.picker, []);
        }
    },

    applyTriggers: function (triggers) {
        var me = this,
            picker = triggers.picker;

        if (this.hideBaseTrigger) {
            picker.hidden = true;
        }
        
        return me.callParent([triggers]);
    },

    setReadOnly: function (readOnly) {
        this.callParent(arguments);

        if (!readOnly && this.hideBaseTrigger) { // #904
            this.setHideBaseTrigger(true);
        }
    }
});

Ext.form.field.Picker.override({
    config: {
        triggers: {
            picker: {
                weight: 1, // This is added to get the main trigger to be appeared on the right by default.
                handler: 'onTriggerClick',
                scope: 'this'
            }
        }
    }
});

// @source core/form/TextArea.js

Ext.override(Ext.form.TextArea, {
    initComponent : function () {
        Ext.form.TextArea.superclass.initComponent.call(this);
        
        if (this.maxLength !== Number.MAX_VALUE && this.truncate === true) {
            this.on("validitychange", function (f, isValid) {
                if (!isValid && this.getValue().length > this.maxLength) {
                    this.setValue(this.getValue().substr(0, this.maxLength));
                }
            });
        }
    },

    // Appends the specified string and a new line to the TextArea's value.
    // Options:
    //      text - a string to append.
    appendLine : function (text) {
        this.append(text + "\n");
    }
});

// @source core/form/TimeField.js

Ext.form.field.Time.override({
    useHiddenField : true,
    
    processHiddenValue : function () {
        return this.getRawValue();
    }
});

// @source core/form/BasicForm.js

Ext.form.action.Load.override({
    onSuccess: function (response) {
        var result = this.processResponse(response),
            form = this.form,
            formActive = form && !form.destroying && !form.destroyed;

        if (result === true || !result.success || !result.data) {
            if (this.simpleObject && result !== true) {
                result = {data: result};
            } else {
                this.failureType = Ext.form.action.Action.LOAD_FAILURE;

                if (formActive) {
                    form.afterAction(this, false);
                }

                return;
            }
        }

        if (formActive) {
            form.clearInvalid();
            form.setValues(result.data);
            form.afterAction(this, true);
        }
    }
});

Ext.form.action.Submit.override({
    onSuccess: function(response){
        if (this.allowNoContent && response.status === 204 || response.status === 202 || response.status === 1223) {
            this.form.afterAction(this, true);
        } else {
            this.callParent(arguments);
        }
    }
});

Ext.form.Basic.override({
    prefixRegex : /[^.]+$/,

    onFieldAdd: function (field) {
        var me = this;
        me.mon(field, 'change', me.fireFieldChange, me);
        me.callParent(arguments);
    }, 

    onFieldRemove: function (field) {
        var me = this;
        me.mun(field, 'change', me.fireFieldChange, me);
        me.callParent(arguments);
    },

    fireFieldChange: function (field, newValue, oldValue) {
        var me = this;
        me.owner.fireEvent('fieldchange', me.owner, field, newValue, oldValue);
    },

    removePrefix : function (name) {
        if (Ext.isEmpty(name) || !Ext.net.ResourceMgr.isMVC) {
            return name;
        }

        var match = name.match(this.prefixRegex);
        return match ? match[0] : name;
    },
    
    findField: function (id) {
        var withoutPrefixId = this.removePrefix(id);
        return this.getFields().findBy(function (f) {            
            return (
                f.getItemId() === id || f.getName() === id 
                || (f.dataIndex && (id.indexOf(".") > -1 ? (f.dataIndex === id) : (f.dataIndex.split(".")[0] === id))) 
                || this.removePrefix(f.getName()) === withoutPrefixId);
        }, this);
    },

    findMappingFields: function (id) {        
        var fields = [];
        this.getFields().each(function (f) {            
            if(f.dataIndex && f.dataIndex.split(".")[0] === id) {
                fields.push(f);
            }
        }, this);

        return fields;
    },

    getFieldValues: function (dirtyOnly, removePrefix, disableMapping) {
        return this.getValues(false, dirtyOnly, false, true, removePrefix, disableMapping);
    },

    setValues: function (values) {
        var me = this,
            v, vLen, val;

        function setVal(fieldId, val) {
            var field = me.findField(fieldId),
                map_fields,
                notFound,
                v;

            if (field) {
                var mapping = field.dataIndex && field.dataIndex.split(".");
                if (mapping && mapping[0] === fieldId) {
                    map_fields = me.findMappingFields(fieldId);
                    
                    for ( var f = 0; f < map_fields.length; f++ ) {
                        field = map_fields[f];
                        mapping = field.dataIndex && field.dataIndex.split(".");
                        v = val;
                        notFound = false;

                        for (var i = 1; i < mapping.length; i++ ) {
                            if (v.hasOwnProperty(mapping[i])) {
                                v = v[mapping[i]];
                            }
                            else {
                                notFound = true;
                                break;
                            }
                        }

                        if(!notFound) {
                            field.setValue(v);

                            if (me.trackResetOnLoad) {
                                field.resetOriginalValue();
                            }
                        }
                    }                    
                }
                else {                
                    field.setValue(val);

                    if (me.trackResetOnLoad) {
                        field.resetOriginalValue();
                    }
                }
            }
        }

        Ext.suspendLayouts();
        if (Ext.isArray(values)) {            
            vLen = values.length;

            for (v = 0; v < vLen; v++) {
                val = values[v];

                setVal(val.id, val.value);
            }
        } else {        
            Ext.iterate(values, setVal);
        }
        Ext.resumeLayouts(true);
        return this;
    },

    getValues: function (asString, dirtyOnly, includeEmptyText, useDataValues, isSubmitting, removePrefix, disableMapping) {
        var values  = {},
            fields  = this.getFields().items,
            fLen    = fields.length,
            isArray = Ext.isArray,
            dataMethod = useDataValues ? 'getModelData' : 'getSubmitData',
            field, data, val, bucket, name, f,
            mapping, obj_holder, withoutPrefixName;

        for (f = 0; f < fLen; f++) {
            field = fields[f];

            if (!dirtyOnly || field.isDirty()) {
                data = field[dataMethod](includeEmptyText, isSubmitting);

                if (Ext.isObject(data)) {
                    for (name in data) {
                        if (data.hasOwnProperty(name)) {
                            val = data[name];

                            if (includeEmptyText && val === '') {
                                val = field.emptyText || '';
                            }

                            if (useDataValues && disableMapping !== true && field.dataIndex) {
                                mapping = field.dataIndex.split(".");
                                obj_holder = values;

                                for (var i = 0; i < mapping.length - 1; i++) {
                                    if (!obj_holder.hasOwnProperty(mapping[i])) {
                                        obj_holder[mapping[i]] = {};
                                    }

                                    obj_holder = obj_holder[mapping[i]];
                                }

                                obj_holder[mapping[mapping.length - 1]] = val;
                            }
                            else {
                                withoutPrefixName = removePrefix === true ? this.removePrefix(name) : name;

                                if (!field.isRadio) {
                                    if (values.hasOwnProperty(withoutPrefixName)) {
                                        bucket = values[withoutPrefixName];

                                        if (!isArray(bucket)) {
                                            bucket = values[withoutPrefixName] = [bucket];
                                        }

                                        if (isArray(val)) {
                                            values[withoutPrefixName] = bucket.concat(val);
                                        } else {
                                            bucket.push(val);
                                        }
                                    } else {
                                        values[withoutPrefixName] = val;
                                    }
                                } else {
                                    values[withoutPrefixName] = values[withoutPrefixName] || val;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (asString) {
            values = Ext.Object.toQueryString(values);
        }
        return values;
    },

    updateRecord : function (record, disableMapping) {
        if (!record) {
            record = this._record;
        }

        var fields = record.self.fields,
            values = this.getFieldValues(false, true, disableMapping),
            obj = {},
            i = 0,
            len = fields.length,
            name;

        for (; i < len; ++i) {
            name  = fields[i].name;

            if (values.hasOwnProperty(name)) {
                obj[name] = values[name];
            }
        }

        record.beginEdit();
        record.set(obj);
        record.endEdit();

        return this;
    },

    afterAction: function (action, success) {
        this.callParent(arguments);

        if (action.result && action.result.script && action.result.script.length > 0) {
            if (window.execScript) {
                window.execScript(action.result.script);
            } else {
                window.eval.call(window, action.result.script);
            }
        }
    },

    getBoundRecord : function () {
        return this._record;
    }
});

// @source core/form/FormPanel.js

Ext.form.Panel.override({
    validate: function () {
        return this.getForm().isValid();
    },

    getName: function () {
        return this.id || '';
    },

    clearInvalid: function () {
        return this.getForm().clearInvalid();
    },

    markInvalid: function (msg) {
        return this.getForm().markInvalid(msg);
    },

    getValue: function () {
        return this.getForm().getValues();
    },

    setValue: function (value) {
        return this.getForm().setValues(value);
    },

    // Introduced on ExtJS 6.0.2: the resetRecord argument.
    reset: function (resetRecord) {
        return this.getForm().reset(resetRecord);
    },

    setUrl: function (value) {
        var form = this.getForm();

        this.url = value;

        if (form) {
            form.url = value
        }
    },

    setWaitMsgTarget: function (value) {
        var form = this.getForm();

        this.waitMsgTarget = value;

        if (form) {
            form.waitMsgTarget = value
        }
    }
});
Ext.data.Model.override({
    inheritableStatics: {
        replaceFields: function (newFields, removeFields) {
            var me = this,
                proto = me.prototype,
                Field = Ext.data.field.Field,
                fields = me.fields,
                fieldsMap = me.fieldsMap,
                ordinals = me.fieldOrdinals,
                field, i, idField, len, name, ordinal;

            if (removeFields === true) {
                fields.length = 0;
                me.fieldsMap = fieldsMap = {};
                me.fieldOrdinals = ordinals = {};
            } else if (removeFields) {
                for (i = removeFields.length; i-- > 0;) {
                    name = removeFields[i];
                    if (name in ordinals) {
                        delete ordinals[name];
                        delete fieldsMap[name];
                    }
                }

                for (i = 0, len = fields.length; i < len; ++i) {
                    name = (field = fields[i]).name;

                    if (name in ordinals) {
                        ordinals[name] = i;
                    } else {
                        // This field is being removed (it is no longer in ordinals).
                        fields.splice(i, 1);
                        --i;
                        --len;
                        // we need to do this forwards so that ordinals don't become
                        // invalid due to a splice
                    }
                }
            }

            for (i = 0, len = newFields ? newFields.length : 0; i < len; i++) {
                name = (field = newFields[i]).name;

                if (!(name in ordinals)) {
                    ordinals[name] = ordinal = fields.length; // 0-based
                    fields.push(field = Field.create(field));

                    fieldsMap[name] = field;
                    field.ordinal = ordinal;
                    field.definedBy = field.owner = this; // Ext.data.NodeInterface
                }
            }

            if (!(idField = fieldsMap[proto.idProperty])) {
                idField = new Field(proto.idProperty);
                ordinal = fields.length;
                fields[ordinal] = idField;
                ordinals[proto.idProperty] = ordinal;
                fieldsMap[proto.idProperty] = idField;
                idField.definedBy = this;
                idField.ordinal = ordinal;
                idField.generated = true;
            }

            // The idField could have been replaced, so reacquire it.
            me.idField = proto.idField = idField = fieldsMap[proto.idProperty];
            idField.allowNull = idField.critical = idField.identifier = true;
            idField.defaultValue = null;

            // In case we've created the initializer we need to zap it so we recreate it
            // next time. Likewise with field ranking.
            me.initializeFn = me.rankedFields = me.transientFields = me.criticalFields = null;
        }
    }
});
Ext.data.proxy.Proxy.override({
    $configStrict: false
});
// @source data/PagingMemory.js

Ext.data.proxy.Memory.override({
    getRecords: function () {
        return this.getReader().read(this.getData()).getRecords();
    }
});

Ext.define("Ext.data.proxy.PagingMemory", {
    extend: "Ext.data.proxy.Memory",
    alias: "proxy.pagingmemory",
    isMemoryProxy: true,

    read: function (operation) {
        var me = this,
            resultSet = me.getReader().read(me.getData()),
            records = resultSet.getRecords(),
            sorters = operation.getSorters(),
            grouper = operation.getGrouper(),
            filters = operation.getFilters(),
            start = operation.getStart(),
            limit = operation.getLimit();

        // Apply filters, sorters, and start/limit options
        if (operation.process(resultSet, null, null, false) !== false) {
            if (operation.gridfilters !== undefined) {
                var r = [];
                for (var i = 0, len = records.length; i < len; i++) {
                    if (operation.gridfilters.call(this, records[i])) {
                        r.push(records[i]);
                    }
                }
                records = r;
                result.setRecords(r);
                result.setTotal(records.length);
            }

            // Filter the resulting array of records
            if (filters && filters.length) {
                // Total will be updated by setting records
                resultSet.setRecords(records = Ext.Array.filter(records, Ext.util.Filter.createFilterFn(filters, operation.getInternalScope())));
                resultSet.setTotal(records.length);
            }

            // Remotely, grouper just mean top priority sorters
            if (grouper) {
                // Must concat so as not to mutate passed sorters array which could be the items property of the sorters collection
                sorters = sorters ? sorters.concat(grouper) : sorters;
            }

            // Sort by the specified grouper and sorters
            if (sorters && sorters.length) {
                resultSet.setRecords(records = Ext.Array.sort(records, Ext.util.Sortable.createComparator(sorters)));
            }

            // Reader reads the whole passed data object.
            // If successful and we were given a start and limit, slice the result.
            if (me.getEnablePaging() && start !== undefined && limit !== undefined && operation.isPagingStore !== true) {

                // Attempt to read past end of memory dataset - convert to failure
                if (start >= resultSet.getTotal()) {
                    resultSet.setConfig({
                        success: false,
                        records: [],
                        total: 0
                    });
                }
                    // Range is valid, slice it up.
                else {
                    resultSet.setRecords(Ext.Array.slice(records, start, start + limit));
                }
            }
            operation.setCompleted();
        }
    }
});

// @source data/ServerProxy.js

Ext.data.proxy.Server.override({
    appendAction: true,

    afterRequest: function (request, success) {
        this.fireEvent("afterrequest", this, request, success);
    },

    getUrl: function (request) {
        var url,
            api = this.getApi(),
            action = request.getAction();
        if (request) {
            url = request.getUrl() || api[action] || (action != "read" ? api["sync"] : "");
        }
        return url ? url : this.callParent();
    },

    buildRequest: function (operation) {
        this.fireEvent("beforerequest", this, operation);

        var me = this,
            initialParams = Ext.apply({}, operation.getParams()),
            // Clone params right now so that they can be mutated at any point further down the call stack
            params = Ext.applyIf(initialParams, me.getExtraParams() || {}),
            request,
            operationId,
            idParam,
            method;

        //copy any sorters, filters etc into the params so they can be sent over the wire
        Ext.applyIf(params, me.getParams(operation));

        // Set up the entity id parameter according to the configured name.
        // This defaults to "id". But TreeStore has a "nodeParam" configuration which
        // specifies the id parameter name of the node being loaded.
        operationId = operation.getId();
        idParam = me.getIdParam();
        if (operationId !== undefined && params[idParam] === undefined) {
            params[idParam] = operationId;
        }

        request = new Ext.data.Request({
            params: params,
            action: operation.getAction(),
            records: operation.getRecords(),
            url: operation.getUrl(),
            operation: operation,

            // this is needed by JsonSimlet in order to properly construct responses for
            // requests from this proxy
            proxy: me
        });

        if (me.getMethod) {
            method = me.getMethod(request);
        }
        else if (request.getMethod) {
            method = request.getMethod();
        }

        if (this.json) {
            request.setJsonData(request.getParams());
            if (method.toUpperCase() !== "GET") {
                request.setParams(undefined);
            }
        }
        else if (this.xml) {
            request.setXmlData(request.getParams());
            if (method.toUpperCase() !== "GET") {
                request.setParams(undefined);
            }
        }

        request.setUrl(me.buildUrl(request));

        if (this.appendAction && operation.allowWrite()) {
            request.setUrl(Ext.urlAppend(request.getUrl(), "action=" + operation.action));
        }

        operation.setRequest(request);

        return request;
    }
});
// @source data/PageProxy.js

Ext.define("Ext.data.proxy.Page", {
    extend: "Ext.data.proxy.Server",
    alias: 'proxy.page',
    isPageProxy: true,
    appendAction: false,

    extractResponseData: function (response) {
        return response.data;
    },

    buildUrl: function () {
        return '';
    },

    getMethod: function (request) {        
        return request.getMethod() || this.method;
    },

    doRequest: function (operation) {
        if (!this._initReader) {
            this._initReader = true;
            this.initReader(this.getReader());
        }

        var request = this.buildRequest(operation),
            writer = this.getWriter(),
            requestConfig = Ext.apply({}, this.requestConfig || {}),
            params = request.getParams(),
            action = operation.getAction(),
            api = this.getApi(),
            scope;

        if (writer && operation.allowWrite()) {
            writer.setEncode(true);
            writer.setRootProperty("serviceParams");
            writer.setAllowSingle(false);
            request = writer.write(request);
        }

        requestConfig.userSuccess = this.createSuccessCallback(request, operation);
        requestConfig.userFailure = this.createErrorCallback(request, operation);
        requestConfig.eventMask = Ext.applyIf(requestConfig.eventMask || {}, {
            showDurationMessages: false
        });

        if (params.serviceParams) {
            requestConfig.serviceParams = params.serviceParams;
            delete params.serviceParams;
        }

        requestConfig.extraParams = params;

        var directFn = this.directFn || api[action] || (action != "read" ? api["sync"] : null);
        if (directFn) {
            if (Ext.isString(directFn)) {
                directFn = Ext.decode(directFn);
            }

            var extraParams = requestConfig.extraParams,
                serviceParams = requestConfig.serviceParams;

            delete requestConfig.extraParams;
            delete requestConfig.serviceParams;

            requestConfig.successSeq = requestConfig.userSuccess;
            requestConfig.failureSeq = requestConfig.userFailure;

            delete requestConfig.userSuccess;
            delete requestConfig.userFailure;
            requestConfig.showFailureWarning = false;

            if (directFn.length === 1) {
                directFn(requestConfig);
            }
            else if (directFn.length === 2) {
                directFn(action || null, requestConfig);
            }
            else if (directFn.length === 3) {
                directFn(action || null, extraParams || null, requestConfig);
            }
            else {
                directFn(action || null, extraParams || null, serviceParams || null, requestConfig);
            }
        }
        else {
            scope = operation._store || operation.getInternalScope();

            if (!scope.isStore) {
                var records = request.getRecords();

                if (records.length > 0) {
                    scope = records[0].store;
                }
            }

            Ext.apply(requestConfig, {
                control: scope,
                eventType: "postback",
                action: action
            });

            Ext.net.DirectEvent.request(requestConfig);
        }

        return request;
    },

    createSuccessCallback: function (request, operation) {
        var me = this;

        return function (response, result, context, type, action, extraParams) {
            var res,
                api,
                action;

            try {
                api = me.getApi();
                action = operation.getAction();

                if (me.directFn || api[action] || (action != "read" ? api["sync"] : null)) {
                    res = Ext.isEmpty(result.result, true) ? (result.d || result) : result.result;

                    response.data = res;
                    res = { success: true };
                }
                else {
                    res = result.serviceResponse;
                    response.data = res.data ? res.data : {};

                    if (res.metaData) {
                        response.metaData = res.metaData;
                    }

                    request._data = response.data;
                    if ((res || result).success === false) {
                        throw new Error((res || result).message);
                    }
                }
            } catch (e) {
                operation.setException(e.message);
                me.setException = Ext.emptyFn;
                me.processResponse(false, operation, request, response);
                me.setException = Ext.data.proxy.Page.prototype.setException;
                return;
            }

            me.processResponse(res.success, operation, request, response);
        };
    },

    createErrorCallback: function (request, operation) {
        var me = this;

        return function (response, result, context, type, action, extraParams) {
            me.processResponse(false, operation, request, response);
        };
    },

    updateReader: function (reader) {
        this.callParent(arguments);
        this._initReader = false;
    },

    initReader: function (reader) {
        reader.setTotalProperty("total");
        if (!reader.getRootProperty()) {
            reader.setRootProperty("data");
        }
        reader.buildExtractors(true);

        return reader;
    }
});

Ext.define("Ext.data.proxy.OData", {

    extend: "Ext.data.proxy.Ajax",
	alternateClassName: "Ext.data.OData",
	alias: "proxy.odata",
    isODataProxy : true,
    enablePagingParams : true,
    appendAction : false,

    
	appendId: true,	

	constructor: function () {
	    this.callParent(arguments);
	    Ext.net.reconfigure(this, this.initialConfig, {
	        
	        batchActions: false,

	        actionMethods: {
	            create: "POST",
	            read: "GET",
	            update: "PUT",
	            destroy: "DELETE"
	        },

	        headers: {
	            "Accept": "application/json"
	        },

	        reader: {
	            type: 'odata'
	        },

	        pageParam: undefined,

	        noCache: false
	    });
	},

    
	buildUrl: function (request) {
	    var me = this,
			operation = request.getOperation(),
			records = operation.getRecords() || [],
			record = records[0],
			format = me.format,
			url = me.getUrl(request),
            params     = request.getParams() || {},            
			id = record && !record.phantom ? record.getId() : null;

	    if (me.appendId && id) {
	        if (url.match(/\/$/)) {
                url = url.substring(0, url.length - 1);
            }
            url = url + "(" + id + ")";
	    }

        if (request.getAction() == "read") {
            request.setParams(Ext.apply(params, { "$inlinecount": "allpages" }));
        }

	    if (format) {
	        if (!url.match(/\.$/)) {
	            url += ".";
	        }

	        url += format;
	    }

	    request.setUrl(url);

	    delete params[me.getIdParam()];

	    return me.callParent(arguments);
	},

    doRequest: function(operation) {
        var scope = operation.getInternalScope();

        if (operation.getAction() === "read") {
            this.setSortParam(scope.getRemoteSort() ? "$orderby" : null);
            this.setFilterParam(scope.getRemoteFilter() ? "$filter" : null);
            this.setStartParam(this.enablePagingParams ? "$skip" : null);
            this.setLimitParam(this.enablePagingParams ? "$top" : null);
        }

        this.getWriter().setAllowSingle(true);
        this.json = true;

        return this.callParent(arguments);
    },

    
    encodeSorters: function (sorters) {
	    var min = [],
			length = sorters.length,
			i = 0;

	    for (; i < length; i++) {
	        min[i] = sorters[i].getProperty();

	        if (sorters[i].getDirection().toLowerCase() == "desc") {
	            min[i] += " desc";
	        }
	    }

	    return min.join(",");
	},

    
	encodeFilters: function (filters) {
	    var filter = "",
            logical = "",
			length = filters.length,
			sq = "'",
			type = "",
            op = "",
            prop = "",
            val = "",
            item,
			i;

	    for (i = 0; i < length; i++) {
            item = filters[i];
	        type = item.type || "";
            logical = item.logical || "and";

            if (i > 0){
                filter += " " + logical + " ";
            }

	        switch (type) {
	            case "int":
	            case "bool":
	                type = "";
	                sq = "";
	                break;
	            case "guid":
	                type = "guid";
	                sq = "'";
	                break;
	            default:
	                type = "";
	                sq = "'";
	                break;
	        }
	        op = item.getOperator() || "eq";
	        prop = item.getProperty();
	        val = item.getValue();

	        if (op == "like") {
	            prop = "substringof('" + val + "', " + prop + ")";
	            val = "true";
	            op = "eq";
	            sq = "";
	        }

	        filter += prop + " " + op + " " + type + sq + val + sq;
	    }

	    return filter;
	},

    processResponse: function(success, operation, request, response) {
        var me = this,
            action = operation.getAction(),
            reader,
            resultSet;
        
        if (action === 'read' || action === 'create') {
            this.callParent(arguments);
        }                
        else {            
            if (response.status !== 204 && response.status !== 202 && response.status !== 1223) {
                operation.setException(response.statusText);
                me.fireEvent('exception', this, response, operation);
            }
            else {
                reader = me.getReader();

                resultSet = reader.read(me.extractResponseData(response), {
                    recordCreator: operation.getRecordCreator()
                });

                operation.process(resultSet, request, response);
            }

            me.afterRequest(request, success);
        }
    }
});
Ext.data.identifier.Generator.override({
    $configStrict: false // It is for a generate function to be applied on the instance 
});
Ext.data.operation.Operation.override({
    $configStrict: false
});
// @source data/schema/Role.js

Ext.data.schema.Role.override({
    storeConfig: {
        autoDestroy: false
    }
});
Ext.data.reader.Reader.override({
    $configStrict: false,

    constructor: function () {
        this.callParent(arguments);
        Ext.net.reconfigure(this, this.initialConfig, {
            messageProperty: "message"
        });
    }
});
Ext.data.reader.Json.override({
    buildExtractors: function () {
        var me = this,
            _root;

        me.callParent(arguments);

        _root = me.getRoot;

        me.getRoot = function (root) {
            var data = _root(root);
            return Ext.isString(data) ? Ext.decode(data) : data;
        };
    }
});
Ext.define("Ext.data.reader.OData",{
    extend: "Ext.data.reader.Json",    
    alias: "reader.odata",

    constructor: function () {
        this.callParent(arguments);
        Ext.net.reconfigure(this, this.initialConfig, {
            rootProperty: "value",
            totalProperty: "odata_count"
        });
    },

    read: function (response, readOptions) {
        if (response && response.responseText == "") {
            return this.nullResultSet;
        }

        var data;

        if (response) {
            data = response.responseText ? this.getResponseData(response) : this.readRecords(response, readOptions);
        }

        return this.callParent([ data || this.nullResultSet, readOptions ]);
    },

    getData: function (response) {
        if(!Ext.isDefined(response[this.getRootProperty()]) && !Ext.isDefined(response["odata.count"])){
            var obj = {};
            obj[this.getRootProperty()] = Ext.isArray(response) ? response : [response];
            response = obj;
        }

        if(response && Ext.isDefined(response["odata.count"]))
        {
            response["odata_count"] = response["odata.count"];
        }

        return response;
    }
});
Ext.data.writer.Writer.override({
    $configStrict: false,

    constructor: function () {
        this.callParent(arguments);
        Ext.net.reconfigure(this, this.initialConfig, {
            writeAllFields: true
        });
    },

    write: function (request) {
        var operation = request.getOperation(),
            record,
            records = operation.getRecords() || [],
            len = records.length,
            i = 0,
            data = [];

        for (; i < len; i++) {
            record = records[i];

            if (this.filterRecord && this.filterRecord(record) === false) {
                continue;
            }

            data.push(this.getRecordData(record, operation));
        }
        return this.writeRecords(request, data);
    },

    isSimpleField: function (f) {
        var type = f ? f.getType() : "";

        return type === "int" || type === "float" || type === "boolean" || type === "date";
    },

    getRecordData: function (record, operation) {
        var me = this,
            nameProperty = me.getNameProperty(),
            mapping = nameProperty !== 'name',
            idField = record.self.idField,
            key = idField[nameProperty] || idField.name, // setup for idField first
            value = record.id,
            writeAll = me.getWriteAllFields(),
            phantom = record.phantom,
            ret, dateFormat, phantom,
            options, clientIdProperty,
            fieldsMap, data, field;

        if (idField.serialize) {
            value = idField.serialize(value);
        }

        if (!writeAll && operation && operation.isDestroyOperation) {
            ret = {};
            ret[key] = value;
        } else {
            dateFormat = me.getDateFormat();
            options = (phantom || writeAll) ? me.getAllDataOptions() : me.getPartialDataOptions();
            clientIdProperty = phantom && me.getClientIdProperty();
            fieldsMap = record.getFieldsMap();

            options.serialize = false; // we must take over this here
            data = record.getData(options);

            // If we are mapping we need to pour data into a new object, otherwise we do
            // our work in-place:
            ret = mapping ? {} : data;

            if (clientIdProperty) { // if (phantom and have clientIdProperty)
                ret[clientIdProperty] = value; // must read data and write ret
                delete data[key];  // in case ret === data (must not send "id")
            }
            else if (!me.getWriteRecordId()) {
                delete data[key];
            }

            for (key in data) {
                value = data[key];

                if (this.filterField && this.filterField(record, fieldsMap[key], key, value) === false) {
                    delete ret[key];
                    continue;
                }

                if (!(field = fieldsMap[key])) {
                    // No defined field, so clearly no nameProperty to look up for this field
                    // but if we are mapping we need to copy over the value. Also there is no
                    // serializer to call in this case.
                    if (mapping) {
                        ret[key] = value;
                    }
                } else {
                    // Allow this Writer to take over formatting date values if it has a
                    // dateFormat specified. Only check isDate on fields declared as dates
                    // for efficiency.
                    if (field.isDateField && dateFormat && Ext.isDate(value)) {
                        value = Ext.Date.format(value, dateFormat);
                    } else if (field.serialize) {
                        value = field.serialize(value, record);
                    }

                    if (mapping) {
                        key = field[nameProperty] || key;
                    }

                    if (Ext.isEmpty(value, false) && this.isSimpleField(field)) {
                        switch (field.submitEmptyValue) {
                            case "null":
                                value = null;
                                break;
                            case "emptystring":
                                value = "";
                                break;
                        }
                    } else {
                        value = this.htmlEncode || field.htmlEncode ? Ext.util.Format.htmlEncode(value) : value;
                    }

                    ret[key] = value;
                }
            }
        }

        if ((this.excludeId && ret.hasOwnProperty(idField.name)) ||
           (this.skipIdForPhantomRecords !== false && ret.hasOwnProperty(idField.name) && phantom)) {
            delete ret[idField.name];
        }

        if (this.skipPhantomId && phantom && ret.hasOwnProperty(me.getClientIdProperty())) {
            delete ret[record.clientIdProperty];
        }

        return ret;
    }
});
Ext.data.writer.Json.override({
    constructor: function () {
        this.callParent(arguments);
        Ext.net.reconfigure(this, this.initialConfig, {
            allowSingle: false,
            expandData: true
        });
    }
});
// @source data/data/Store.js
Ext.data.StoreManager.getArrayStore = function (fieldsCount) {
    var fields = ['field1'],
        i;

    fieldsCount = fieldsCount || 1;

    for (i = 2; i <= fieldsCount; ++i) {
        fields.push('field' + i);
    }

    return new Ext.data.ArrayStore({
        data: [],
        fields: fields,
        autoDestroy: true,
        autoCreated: true,
        expanded: false
    });
};

Ext.data.AbstractStore.override({
    autoDestroy: true,

    constructor: function (config) {
        var me = this;

        if (config && config.storeId) {
            var store = Ext.data.StoreManager.lookup(config.storeId);
            if (store) {
                store.destroy();
            }
        }

        me.callParent(arguments);

        if (this.proxy && this.proxy.isRemote) {
            me.proxy.on("exception", me.onProxyException, me);
            me.proxy.on("beforerequest", me.buildRequestParams, me);
        }
    },

    onProxyException: function (proxy, response, operation) {
        var error = operation.getError() || "Unknown error",
            message = Ext.isString(error) ? error : ("(" + error.status + ")" + error.statusText);

        this.fireEvent("exception", proxy, response, operation);

        if (Ext.net.DirectEvent.fireEvent("ajaxrequestexception", response, { "errorMessage": message }, null, null, null, null, operation) !== false) {
            if (this.showWarningOnFailure !== false) {
                Ext.net.DirectEvent.showFailure(response, response ? response.responseText : message);
            }
        }
    },

    buildRequestParams: function (proxy, operation) {
        operation._store = this;

        if (operation.allowWrite() && this.writeParameters) {
            this.buildWriteParams(operation);
        } else if (this.readParameters) {
            this.buildReadParams(operation);
        }
    },

    buildWriteParams: function (operation) {
        var prms = this.writeParameters(operation),
            action = operation.getAction(),
            params;

        params = operation.getParams() || {};

        if (prms.apply) {
            if (prms.apply["all"]) {
                Ext.apply(params, prms.apply["all"]);
            }

            if (prms.apply[action]) {
                Ext.apply(params, prms.apply[action]);
            }
        }

        if (prms.applyIf) {
            if (prms.applyIf["all"]) {
                Ext.applyIf(params, prms.applyIf["all"]);
            }

            if (prms.applyIf[action]) {
                Ext.applyIf(params, prms.applyIf[action]);
            }
        }

        operation.setParams(params);
    },

    buildReadParams: function (operation) {
        var prms = this.readParameters(operation),
            params;

        params = operation.getParams() || {};

        if (prms.apply) {
            Ext.apply(params, prms.apply);
        }

        if (prms.applyIf) {
            Ext.applyIf(params, prms.applyIf);
        }

        operation.setParams(params);
    },

    createTempProxy: function (callback, proxyConfig, sync) {
        var oldProxy = this.proxy,
            proxyId = Ext.id(),
            proxy = this.serverProxy ? Ext.createByAlias('proxy.' + this.serverProxy.type, Ext.apply({
                model: this.model,
                reader: {
                    type: oldProxy && oldProxy.reader && oldProxy.reader.type ? oldProxy.reader.type : "json",
                    rootProperty: oldProxy && oldProxy.reader ? "data." + oldProxy.reader.getRootProperty() : "data"
                },
                writer: oldProxy.writer
            }, proxyConfig || {}, this.serverProxy)) : Ext.createByAlias('proxy.page', Ext.applyIf({
                type: 'page',
                model: this.model,
                reader: {
                    type: oldProxy && oldProxy.reader && oldProxy.reader.type ? oldProxy.reader.type : "json",
                    rootProperty: oldProxy && oldProxy.reader ? "data." + oldProxy.reader.getRootProperty() : "data"
                },
                writer: oldProxy.writer
            }, proxyConfig || {})),
            scope;

        this.proxy = proxy;
        this[proxyId] = proxy;
        this._oldProxy = oldProxy;

        this.proxy.on("exception", this.onProxyException, this);
        this.proxy.on("beforerequest", this.buildRequestParams, this);

        this.proxy.on("beforerequest", function () {
            this.proxy = oldProxy;
        }, this, { single: true });

        scope = {
            proxyId: proxyId,
            callback: callback,
            proxy: this.proxy,
            oldProxy: oldProxy,
            store: this
        };

        if (callback) {
            if (sync) {
                this.proxy.onBatchComplete = Ext.Function.createInterceptor(
                    this.proxy.onBatchComplete,
                    function (batchOptions, batch) {
                        this.callback.call(this, null, !batch.hasException);
                    },
                    scope
                );
            }
            else {
                this.proxy.on(
                    "afterrequest",
                    function (proxy, request, success) {
                        this.callback.call(this, request, success);
                    },
                    scope);
            }
        }

        this.proxy.on(
            "endprocessresponse",
            function (proxy, response, operation) {
                // #1273: do not destroy the proxy till all sync operations are done
                if (!this.store.isSyncing) { 
                    this.proxy.destroy();
                    this.proxy.clearListeners();
                    delete this.store[this.proxyId];
                    delete this.store._oldProxy;
                }
            },
            scope
        );
    },

    reload: function (options) {
        return this.load(Ext.apply({}, options, this.lastOptions));
    },

    getChangedData: function (options) {
        options = options || {};

        var json = {},
            me = this,
            obj,
            newRecords = this.getNewRecords(),
            updatedRecords = this.getUpdatedRecords(),
            removedRecords = this.getRemovedRecords(),

            handleRecords = function (array) {
                var i,
                    len,
                    obj,
                    list,
                    buffer = [],
                    mappings = options.mappings !== false && this.saveMappings !== false,
                    idProp,
                    idMap;

                for (i = 0, len = array.length; i < len; i++) {
                    obj = {};
                    record = array[i];
                    idProp = record.self.idField.name;
                    idMap = record.self.idField.mapping;
                    idName = mappings ? (idMap || idProp) : idProp;
                    list = Ext.apply(obj, record.data);

                    if (list.hasOwnProperty(idProp)) {
                        if (record.phantom) {
                            if (record.clientIdProperty) {
                                list[record.clientIdProperty] = record.internalId;
                            }
                        } else {
                            list[idProp] = record.getId();
                        }
                    }

                    list = this.prepareRecord(list, record, options, record.phantom);

                    if (record.phantom && (options.skipIdForPhantomRecords !== false) && (list && list.hasOwnProperty(idName))) {
                        delete list[idName];
                        //delete list[record.clientIdProperty];
                    }

                    if (!Ext.isEmptyObj(list)) {
                        buffer.push(list);
                    }
                }

                return buffer;
            };

        if (removedRecords.length > 0) {
            obj = handleRecords.call(this, removedRecords);

            if (obj.length > 0) {
                json.Deleted = obj;
            }
        }

        if (updatedRecords.length > 0) {
            obj = handleRecords.call(this, updatedRecords);

            if (obj.length > 0) {
                json.Updated = obj;
            }
        }

        if (newRecords.length > 0) {
            obj = handleRecords.call(this, newRecords);

            if (obj.length > 0) {
                json.Created = obj;
            }
        }

        return options.encode ? Ext.util.Format.htmlEncode(json) : json;
    },

    prepareRecord: function (data, record, options, isNew) {
        var newData = {},
            field,
            idProp = record.self.idField.name,
            idMap = record.self.idField.mapping,
            m,                
            mappings,
            map = record.getFieldsMap();

        if (options.filterRecord && options.filterRecord(record) === false) {
            return;
        }

        if (options.visibleOnly && options.grid) {
            var columns = options.grid.headerCt.getVisibleGridColumns(),
                i, len;

            for (i = 0, len = columns.length; i < len; i++) {
                newData[columns[i].dataIndex] = data[columns[i].dataIndex];
            }

            data = newData;
        }

        if (options.dirtyRowsOnly && !isNew) {
            if (!record.dirty) {
                return;
            }
        }

        if (options.dirtyCellsOnly === true && !isNew) {
            newData = {};

            for (var j in data) {
                if (record.isModified(j)) {
                    newData[j] = data[j];
                }
            }

            data = newData;
        }

        if (options.filterField) {
            for (var k in data) {
                if (options.filterField(record, k, data[k]) === false) {
                    delete data[k];
                }
            }
        }

        mappings = {};
        Ext.iterate(data, function (prop, value) {
            m = map[prop];

            if (m) {
                mappings[prop] = value;
            }
        });
        data = mappings;

        if (options.mappings !== false && this.saveMappings !== false) {
            mappings = {};

            Ext.iterate(data, function (prop, value) {
                m = map[prop];

                if (m) {
                    mappings[m.mapping ? m.mapping : m.name] = value;
                }
            });

            if (options.excludeId !== true) {
                if (record.phantom) {
                    if (record.clientIdProperty) {
                        mappings[record.clientIdProperty] = record.internalId;
                    }
                } else {
                    mappings[idMap || idProp] = record.getId();
                }
            }
            else if (!(isNew && (options.skipIdForPhantomRecords === false))) {
                if (record.phantom) {
                    if (record.clientIdProperty) {
                        delete mappings[record.clientIdProperty];
                    }
                } else {
                    delete mappings[idMap || idProp];
                }
            }

            data = mappings;
        }
        else if (options.excludeId === true && !(isNew && (options.skipIdForPhantomRecords === false))) {
            if (record.phantom) {
                if (record.clientIdProperty) {
                    delete data[record.clientIdProperty];
                }
            } else {
                delete data[idProp];
            }
        }

        if (!options.ignoreSubmitEmptyValue) {
            for (var k in data) {
                field = this.getFieldByName(k);

                if (Ext.isEmpty(data[k], false) && this.isSimpleField(k, field)) {
                    switch (field.submitEmptyValue) {
                        case "null":
                            data[k] = null;
                            break;
                        case "emptystring":
                            data[k] = "";
                            break;
                        default:
                            delete data[k];
                            break;
                    }
                }
            }
        }

        if (options.prepare) {
            options.prepare(data, record);
        }

        return data;
    },

    getFieldByName: function (name) {
        var fields = this.model.getFields();
        for (var i = 0; i < fields.length ; i++) {
            var field = fields[i];

            if (name === (field.mapping || field.name)) {
                return field;
            }
        }
    },

    isSimpleField: function (name, field) {
        var f = field || this.getFieldByName(name),
            type = f ? f.getType() : "";

        return type === "int" || type === "float" || type === "boolean" || type === "date";
    },

    // Overridden only because of #853
    onFilterEndUpdate: function () {
        var me = this,
            suppressNext = me.suppressNextFilter;

        if (me.getRemoteFilter()) {
            me.getFilters().each(function (filter) {
                if (filter.getInitialConfig().filterFn) {
                    Ext.raise('Unable to use a filtering function in conjunction with remote filtering.');
                }
            });

            me.currentPage = 1;

            if (!suppressNext && !(!me.isLoaded() && !me.getAutoLoad())) { // #853: added the condifition after "!suppressNext"
                me.load();
            }
        } else if (!suppressNext) {
            me.fireEvent('datachanged', me);
            me.fireEvent('refresh', me);
        }

        if (me.trackStateChanges) {
            me.saveStatefulFilters = true;
        }

        me.fireEvent('filterchange', me, me.getFilters().getRange());
    }
});

Ext.data.ProxyStore.override({
    dirtyWarningTitle: "Uncommitted Changes",
    dirtyWarningText: "You have uncommitted changes.  Are you sure you want to reload data?",

    sync: function (options, proxyConfig) {
        var me = this,
            operations = {},
            toCreate = me.getNewRecords(),
            toUpdate = me.getUpdatedRecords(),
            toDestroy = me.getRemovedRecords(),
            needsSync = false;

        //<debug>
        if (me.isSyncing) {
            Ext.log.warn('Sync called while a sync operation is in progress. Consider configuring autoSync as false.');
        }
        //</debug>

        me.needsSync = false;

        if (toCreate.length > 0) {
            operations.create = toCreate;
            needsSync = true;
        }

        if (toUpdate.length > 0) {
            operations.update = toUpdate;
            needsSync = true;
        }

        if (toDestroy.length > 0) {
            operations.destroy = toDestroy;
            needsSync = true;
        }

        if (needsSync && me.fireEvent('beforesync', operations) !== false) {
            me.isSyncing = true;

            options = options || {};

            if (me.proxy instanceof Ext.data.proxy.Memory) {
                me.createTempProxy(Ext.emptyFn, proxyConfig, true);
            }

            me.proxy.batch(Ext.apply(options, {
                operations: operations,
                listeners: me.getBatchListeners()
            }));
        }

        return me;
    },

    onBatchException: function (batch, operation) {
        this.callParent(arguments);
        this.onProxyException(this.proxy, operation.getResponse(), operation);
    },

    addField: function (field, index, rebuildMeta) {
        if (typeof field == "string") {
            field = { name: field };
        }

        this.model.addFields([field]);

        if (rebuildMeta && this.proxy && this.proxy.reader) {
            this.proxy.reader.buildExtractors(true);
        }
    },

    rebuildMeta: function () {
        if (this.proxy && this.proxy.reader) {
            this.proxy.reader.buildExtractors(true);
        }
    },

    removeFields: function () {
        this.model.removeFields(true);
        this.removeAll();
    },

    removeField: function (name) {
        this.model.removeFields([name]);

        this.each(function (r) {
            delete r.data[name];

            if (r.modified) {
                delete r.modified[name];
            }
        });
    },

    getRecordsValues: function (options) {
        options = options || {};

        var records = (options.records ? options.records : (options.currentPageOnly ? this.getRange() : this.getAllRange())) || [],
            values = [],
            i;

        for (i = 0; i < records.length; i++) {
            var obj = {},
                dataR,
                idProp = records[i].self.idField.name;

            dataR = Ext.apply(obj, records[i].data);
            if (idProp && dataR.hasOwnProperty(idProp)) {
                if (options.excludeId === true) {
                    delete obj[idProp];
                }
                else {
                    obj[idProp] = records[i].getId();
                }
            }
            dataR = this.prepareRecord(dataR, records[i], options);

            if (!Ext.isEmptyObj(dataR)) {
                values.push(dataR);
            }
        }

        return values;
    },

    isDirty: function () {
        return this.getNewRecords().length > 0 || this.getUpdatedRecords().length > 0 || this.getRemovedRecords().length > 0;
    },

    _load: Ext.data.ProxyStore.prototype.load,

    load: function (options) {
        if (this.warningOnDirty && this.isDirty()) {
            Ext.Msg.confirm(
                this.dirtyWarningTitle,
                this.dirtyWarningText,
                function (btn, text) {
                    if (btn == "yes") {
                        this._load(options);
                    }
                },
                this
            );

            return this;
        }

        return this._load(options);
    },

    getAllRange: function (start, end) {
        return this.getRange(start, end);
    },

    _reload: Ext.data.ProxyStore.prototype.reload,

    reload: function (options, proxyConfig) {
        var memProxy = this.proxy instanceof Ext.data.proxy.Memory;
        if (memProxy) {
            this.createTempProxy(function (request, success) {
                if (success) {
                    if (this.store.isPagingStore && !this.store.allData) {
                        this.store.applyPaging();
                    }
                    this.oldProxy.data = request._data && request._data.data ? request._data.data : {};

                    if (this.oldProxy.reader) {
                        this.oldProxy.reader.rawData = this.oldProxy.data;
                    }
                }
            }, proxyConfig);
        }

        var result = this._reload(options);

        if (memProxy && !this.loading) {
            this.proxy.destroy();
            this.proxy.clearListeners();
            this.proxy = this._oldProxy;
            delete this.store[proxyId];
            delete this._oldProxy;
        }

        return result;
    },

    submitData: function (options, requestConfig) {
        this._submit(null, options, requestConfig);
    },

    _submit: function (data, options, requestConfig) {
        if (!data) {
            data = this.getRecordsValues(options);
        }

        if (!data || data.length === 0) {
            return false;
        }

        data = Ext.encode(data);

        if (options && options.encode) {
            data = Ext.util.Format.htmlEncode(data);
        }

        options = { params: (options && options.params) ? options.params : {} };

        if (Ext.isString(requestConfig)) {
            requestConfig = {
                url: requestConfig
            };
        }

        var config = {},
            ac = requestConfig || {},
            isClean = !!ac.url;

        ac.userSuccess = ac.success;
        ac.userFailure = ac.failure;
        delete ac.success;
        delete ac.failure;
        ac.extraParams = options.params;
        ac.enforceFailureWarning = !ac.userFailure;

        if (isClean) {
            ac.cleanRequest = true;
            ac.extraParams = ac.extraParams || {};
            ac.extraParams.data = data;
        }

        Ext.apply(config, ac, {
            control: this,
            eventType: "postback",
            action: "submit",
            serviceParams: data
        });

        Ext.net.DirectEvent.request(config);
    },

    getByInternalId: function (internalId) {
        return this.getData().get(internalId);
    }
});

Ext.data.Store.override({
    commitRemoving: function (id) {
        var recs = this.removed,
            len = recs.length,
            i;

        for (i = 0; i < len; i++) {
            if (recs[i].getId() === id) {
                Ext.Array.erase(this.removed, i, 1);
                return;
            }
        }
    },

    rejectRemoving: function (id) {
        var recs = this.removed,
            len = recs.length,
            i;

        for (i = 0; i < len; i++) {
            if (recs[i].getId() === id) {
                this.insert(0, recs[i]);
                recs[i].reject();
                Ext.Array.erase(this.removed, i, 1);
                return;
            }
        }
    }
});

Ext.StoreManager.lookup("ext-empty-store").autoDestroy = false;
// @source data/PagingStore.js

var fnMaker = function (parent) {
    return function () {
        this.saveStoreData();
        this.copyAllData();

        var result = Ext.data.PagingStore.superclass[parent].apply(this, arguments);
        this.restoreStoreData();

        return result;
    };
};

Ext.define("Ext.data.PagingStore", {
    extend: "Ext.data.Store",
    alias: "store.paging",

    isPagingStore: true,

    constructor: function () {
        this.clearAllData();
        this.callParent(arguments);
        this.getFilters().on('beginupdate', this.onFilterBeginUpdate, this);
        // #1280: We have to listen it explicitly. 
        // Otherwise, it is not called if actual filtering doesn't happen.
        // See aslo: the onCollectionFilter override
        this.getFilters().on('endupdate', this.onFilterEndUpdate, this);
    },

    clearAllData: function () {
        this.allData = {
            items: []
        };
    },

    saveStoreData: function () {
        this._pageData = {
            items: this.data.items,
            map: this.data.map,
            indices: this.data.indices,
            filtered: this.data.filtered,
            source: this.data.getSource()
        };

        this.data.filtered = false;
        this.data._source = null;
    },

    restoreStoreData: function () {
        if (this._pageData) {
            this.data.items = this._pageData.items;
            this.data.length = this._pageData.items.length;
            this.data.map = this._pageData.map;
            this.data.indices = this._pageData.indices;
            this.data.filtered = this._pageData.filtered;
            this.data._source = this._pageData.source;

            delete this._pageData;
        }
    },

    clearAllDataMap: function () {
        delete this.allData.map;
        delete this.allData.indices;
    },

    destroy: function () {
        this.callParent(arguments);
        this.allData = null;
    },

    clearData: function (isLoad, data, skipAll) {
        this.clearAllData();
        this.callParent(arguments);
    },

    copyToAllData: function () {
        var me = this;
        me.allData.items = me.data.items;
        me.allData.map = me.data.map;
        me.allData.indices = me.data.indices;
    },

    copyAllData: function (allData, native) {
        var me = this,
            map = {},
            indices = {},
            i, item, items, key, length;

        items = allData || me.allData.items;
        
        me.data.items = items;
        me.data.length = length = items.length;

        if (allData || !me.allData.map) {
            me.data.map = map;
            me.data.indices = indices;

            for (i = 0; i < length; ++i) {
                key = me.data.getKey(item = items[i]);
                map[key] = item;
                indices[key] = i;
            }
        }
        else {
            me.data.map = me.allData.map;
            me.data.indices = me.allData.indices;
        }

        if (me.groupingDataSource && native) {            
            me.updateGroupField(me.groupField);
        }
    },

    removeAll: function (silent) {
        this._removeAllAction = true;
        this.callParent(arguments);
    },

    onCollectionRemove: function (collection, info) {
        var me = this,
            records = info.items,
            len = records.length,
            i, record;

        if (!me.ignoreCollectionRemove) {
            if (this._removeAllAction) {
                this.clearAllData();
            }
            else {
                for (i = 0; i < len; ++i) {
                    record = records[i];

                    Ext.Array.remove(this.allData.items, record);
                }
            }

            this.clearAllDataMap();
        }

        this.callParent(arguments);
    },

    onCollectionAdd: function (collection, info) {
        var me = this,
            records = info.items,
            len = records.length,
            ignoreAdd = me.ignoreCollectionAdd,
            index = info.at,
            i, record;

        if (!ignoreAdd) {
            index = (this.currentPage - 1) * this.pageSize + index;
            Ext.Array.insert(this.allData.items, index, records);
            this.clearAllDataMap();
        }
        this.callParent(arguments);
    },

    onBeforeCollectionSort: function () {
        this.copyAllData();
        this.callParent(arguments);
    },

    onSorterEndUpdate: function () {
        this.copyToAllData();
        this.applyPaging();
        this.callParent(arguments);
    },

    applyPaging: function (notify, native) {
        var start = (this.currentPage - 1) * this.pageSize,
            limit = this.pageSize,
            items;

        if (start >= this.allData.items.length) {
            start = this.start = 0;
        }

        items = Ext.Array.slice(this.allData.items, start, start + limit);

        this.copyAllData(items, native);

        if (notify === true) {
            this.fireEvent("refresh", this);
        }

        this.fireEvent("paging", this);
    },

    isPaging: function (options) {
        return options && options.isPagingRequest;
    },

    load: function (options) {
        var forceLocal = false;
        if (options === true) {
            forceLocal = true;
        }

        options = options || {};

        if (forceLocal || ((!Ext.isDefined(options.action) || options.action === "read") && this.isPaging(options))) {
            Ext.Function.defer(function () {
                var operation = this.getProxy().createOperation('read', options);
                this.fireEvent('beforeload', this, operation);

                this.ignoreCollectionAdd = true;
                this.callObservers('BeforeLoad');
                this.copyAllData();
                this.applyPaging(false, true);
                this.ignoreCollectionAdd = false;
                this.complete = true;

                this.fireEvent("datachanged", this, this.data.items);
                this.fireEvent("load", this, this.data.items, true);
                this.fireEvent("refresh", this);
                this.callObservers('AfterLoad');

                if (options.callback) {
                    options.callback.call(options.scope || this, this.data.items, options, true);
                }
            }, 1, this);

            return this;
        }

        options.isPagingStore = true;

        return this.callParent(arguments);
    },

    getTotalCount: function () {
        if (this.allData) {
            return this.allData.items.length;
        }
        return this.totalCount || 0;
    },

    loadPage: function (page, options) {
        var me = this,
            size = me.getPageSize();

        me.currentPage = page;

        options = Ext.apply({
            isPagingRequest: true,
            page: page,
            start: (page - 1) * size,
            limit: size,
            addRecords: !me.getClearOnPageLoad()
        }, options);

        me.read(options);
    },

    loadRecords: function (records, options) {
        var me = this,
            length = records.length,
            data = me.getData(),
            addRecords, autoSort, skipSort, i;

        if (options) {
            addRecords = options.addRecords;
        }

        skipSort = me.getRemoteSort() || !me.getSortOnLoad();
        if (skipSort) {
            autoSort = data.getAutoSort();
            data.setAutoSort(false);
        }

        if (!addRecords) {
            me.clearData(true);
        }

        // Clear the flag AFTER the stores collection has been cleared down so that
        // observers of that collection know that it was due to a load, and a refresh is imminent.
        me.loading = false; // #872

        me.ignoreCollectionAdd = true;
        me.callObservers('BeforeLoad');
        data.add(records);
        me.ignoreCollectionAdd = false;

        for (i = 0; i < length; i++) {
            records[i].join(me);
        }
        me.clearAllDataMap();
        me.allData.items = data.items;
        me.applyPaging(false, true);

        if (skipSort) {
            data.setAutoSort(autoSort);
        }
        ++me.loadCount;
        me.complete = true;
        me.fireEvent('datachanged', me);
        me.fireEvent('refresh', me);
        me.callObservers('AfterLoad');
    },

    onFilterBeginUpdate: function () {
        var me = this;

        if (!me.data.filtered) {
            me.copyAllData();
        }
    },

    onFilterEndUpdate: function () {
        this.copyToAllData();
        this.applyPaging(); // #1280: paging must be re-applied on each filter update

        if (!this.data.filtered) {
            this.data.setSource(null);
        }

        this.callParent(arguments);
    },

    onCollectionFilter: Ext.emptyFn, // #1280: to avoid additional call of onFilterEndUpdate

    findPage: function (record) {
        if ((typeof this.pageSize == "number")) {

            return Math.ceil((this.indexOfAll(record) + 1) / this.pageSize);
        }

        return -1;
    },

    privates: {
        onBeforeLoad: function() {
            var filters;

            this.callParent(arguments);

            if (this.data.filtered) {
                filters = Ext.clone(this.getFilters().getRange());
                this.clearFilter(true);
                this.on("load", function() {
                    this.setFilters(filters);
                }, this, { single: true });
            }
        }
    },

    indexOfIdAll: fnMaker("indexOfId"),
    indexOfAll: fnMaker("indexOf"),

    getAtAll: fnMaker("getAt"),
    find: fnMaker("find"),
    findBy: fnMaker("findBy"),
    findRecord: fnMaker("findRecord"),
    findExact: fnMaker("findExact"),
    contains: fnMaker("contains"),
    each: fnMaker("each"),
    getUnfiltered: fnMaker("getUnfiltered"),
    getRejectRecords: fnMaker("getRejectRecords"),
    getAllRange: fnMaker("getRange"),
    getById: fnMaker("getById"),
    getByInternalId: fnMaker("getByInternalId"),
    collect: fnMaker("collect"),
    queryBy: fnMaker("queryBy"),
    query: fnMaker("query"),
    sum: fnMaker("sum"),
    count: fnMaker("count"),
    min: fnMaker("min"),
    max: fnMaker("max"),
    average: fnMaker("average")
});
Ext.data.TreeStore.override({
    proxy: "page",

    constructor: function () {
        this.callParent(arguments);

        this.on("beforeload", this.addDataPath, this);
    },

    addDataPath : function (store, operation) {
        var node = operation.node || this.getById(operation.id);

        if (node && node.data.dataPath) {
            operation.setParams(Ext.apply(operation.getParams() || {}, {dataPath : node.data.dataPath}));
        }
    },

    
    reload: function (options) {
        var o = Ext.apply({}, options, this.lastOptions),
            node = o.node || this.getRoot();

        if (node && this.getClearOnLoad()) {
            this.unregisterNode(node, true);
        }

        this.load(o);
    }
});

Ext.data.NodeInterface.decorate = Ext.Function.createSequence(Ext.data.NodeInterface.decorate, function (modelClass) {
    var model = Ext.data.schema.Schema.lookupEntity(modelClass);

    model.addFields([        
        { name: 'dataPath', type: 'string',  defaultValue: null, persist: false},
        { name: 'selected', type: 'bool',  defaultValue: false, persist: false}
    ]);

    model.override({
        copy: function (newId, deep) {
            var me = this,
                result = me.callSuper([newId]),
                len = me.childNodes ? me.childNodes.length : 0,
                i;


            if (deep) {
                for (i = 0; i < len; i++) {
                    result.appendChild(me.childNodes[i].copy(undefined, true));
                }
            }
            return result;
        },

        reload: function (options) {
            var me = this;

            options = options || {};
            treeStore = me.getTreeStore(); // #934

            if (treeStore) {
                options = Ext.apply({
                    node: me,
                    callback: function (records, operation, success) {
                        if (success) {
                            me.expand();
                        }
                    }
                }, options);

                if (treeStore.getClearOnLoad()) {
                    treeStore.unregisterNode(me, true);
                }

                treeStore.load(options);
            } 
        }
    });
});
// @source core/toolbar/Paging.js

Ext.toolbar.Paging.override({
    initComponent: function () {
        this.originalOnLoad = this.onLoad;
        this.onLoad = Ext.Function.createBuffered(this.onLoad, 50); // #727
        this.callParent(arguments);

        if (this.hideRefresh) {
            this.child("#refresh").hide();
        }
    },

    bindStore: function (store, initial, propertyName) {
        var isEmpty = store === 'ext-empty-store' && initial;

        if (store && !isEmpty) {
            store = Ext.data.StoreManager.lookup(store);
        }

        if (!store || isEmpty) {
            if (this.ownerCt) {
                store = this.findStore();
            }
            else {
                store = 'ext-empty-store';
                this.needFindStore = true;
            }
        }

        this.callParent([store, initial, propertyName]);
    },

    findStore: function () {
        var storeOwner = this.up('{store}');
        return storeOwner ? storeOwner.store : 'ext-empty-store';
    },

    onAdded: function () {
        this.callParent(arguments);

        if (this.needFindStore) {
            this.bindStore(this.findStore());
            delete this.needFindStore;
        }
    },

    getStoreListeners: function () {
        return {
            beforeload: this.beforeLoad,
            load: this.onStoreLoad,
            exception: this.onLoadError,
            datachanged: this.onLoad,
            add: this.onLoad,
            remove: this.onLoad,
            clear: this.onClear
        };
    },

    onClear: function () {
        this.store.currentPage = 1;
        this.onLoad();
    },

    doRefresh: function () {
        var me = this,
            current = me.store.currentPage;

        if (me.fireEvent('beforechange', me, current) !== false) {
            if (me.store.isPagingStore) {
                me.store.reload();
            } else {
                me.store.loadPage(current);
            }
            return true;
        }

        return false;
    },

    onStoreLoad: function () {
        this.onLoad(true);
    },

    onLoad: function (isLoad) {
        var me = this,
            pageData,
            currPage,
            pageCount,
            afterText,
            count,
            isEmpty,
            item;

        if (!me.rendered) {
            if (!me.updateAfterRender) {
                me.updateAfterRender = true;
                this.on("afterrender", me.onLoad, me, { single: true });
            }
            return;
        }

        delete me.updateAfterRender;

        count = me.store.getCount();
        isEmpty = count === 0;
        if (!isEmpty) {
            pageData = me.getPageData();
            currPage = pageData.currentPage;
            pageCount = pageData.pageCount;

            // Check for invalid current page.
            if (currPage > pageCount) {
                // If the surrent page is beyond the loaded end,
                // jump back to the loaded end if there is a valid page count.
                if (pageCount > 0) {
                    me.store.loadPage(pageCount);
                }
                    // If no pages, reset the page field.
                else {
                    me.getInputItem().reset();
                }

                return;
            }

            afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
        } else {
            currPage = 0;
            pageCount = 0;
            afterText = Ext.String.format(me.afterPageText, 0);
        }

        Ext.suspendLayouts();
        item = me.child('#afterTextItem');
        if (item) {
            item.update(afterText);
        }
        item = me.getInputItem();
        if (item) {
            item.setDisabled(isEmpty).setValue(currPage);
        }
        me.setChildDisabled('#first', currPage === 1 || isEmpty);
        me.setChildDisabled('#prev', currPage === 1 || isEmpty);
        me.setChildDisabled('#next', currPage === pageCount || isEmpty);
        me.setChildDisabled('#last', currPage === pageCount || isEmpty);
        me.setChildDisabled('#refresh', false);
        me.updateInfo();
        Ext.resumeLayouts(true);

        if (me.rendered && isLoad === true && !me.calledInternal) {
            me.fireEvent('change', me, pageData || me.emptyPageData);
        }
    },

    updateInfo: function () {
        var me = this,
            displayItem = me.child('#displayItem'),
            pageData = me.getPageData(),
            msg;

        if (displayItem) {
            if (pageData.pageCount === 0) {
                msg = me.emptyMsg;
            } else {
                msg = Ext.String.format(
                    me.displayMsg,
                    pageData.fromRecord,
                    pageData.toRecord,
                    pageData.total
                );
            }
            displayItem.setText(msg);
        }
    }
});
// @source src/grid/Navigation.js

Ext.define('EXTJS_23457.grid.NavigationModel', {
    override: 'Ext.grid.NavigationModel',
    onContainerMouseDown: function (view, mousedownEvent) {
        var me = this,
            context = new Ext.grid.CellContext(view),
            lastFocused, position;

        me.callSuper([view, mousedownEvent]);

        lastFocused = view.lastFocused;
        position = (view.actionableMode && view.actionPosition) || lastFocused;

        if (!position || lastFocused === 'scrollbar') {
            return;
        }

        context.setPosition(position.record, position.column);
        mousedownEvent.position = context;
        me.attachClosestCell(mousedownEvent);

        // If we are not already on that position, set position there.
        if (!me.position.isEqual(context)) {
            me.setPosition(context, null, mousedownEvent);
        }
    }
});

// @source src/grid/Panel.js

Ext.grid.Panel.override({
    selectionSubmit : true,
    selectionMemory : true,
    selectionMemoryEvents: true,
    focusable: false, // temp fix for grid's scroll jumping

    getFilterPlugin : function () {
        return this.filters;
    },

    getRowEditor : function () {
        return this.editingPlugin;
    },

    getRowExpander : function () {
        if (this.plugins && Ext.isArray(this.plugins)) {
            for (var i = 0; i < this.plugins.length; i++) {
                if (this.plugins[i].isRowExpander) {
                    return this.plugins[i];
                }
            }
        } else {
            if (this.plugins && this.plugins.isRowExpander) {
                return this.plugins;
            }
        }
    },
    
    initComponent : function () {
        this.plugins = this.plugins || [];

        if (!Ext.isArray(this.plugins)) {
            this.plugins = [this.plugins];
        }
        
        if (this.selectionMemory) {
            this.initSelectionMemory();
        }    
        
        this.initSelectionSubmit();        
        this.callParent(arguments);
    },
    
    initSelectionSubmit : function () {
        if (!this.isLocked && !this.getSelectionSubmit) {
            this.plugins.push(Ext.create('Ext.grid.plugin.SelectionSubmit', {}));
        }
    },
    
    initSelectionMemory : function () {
        if (!this.isLocked && !this.getSelectionMemory && !(this.selModel && this.selModel.isSpreadsheetModel)) {
            this.plugins.push(Ext.create('Ext.grid.plugin.SelectionMemory', {}));
        }
    },
    
    clearMemory : function () {
        if (this.selectionMemory) {
            this.getSelectionMemory().clearMemory();
        }
    },
    
    doSelection : function () {
         this.getSelectionSubmit().doSelection();
    },
    
    initSelectionData : function () {
        this.getSelectionSubmit().initSelectionData();
    },
    
    // config :
    //    - selectedOnly
    //    - visibleOnly
    //    - dirtyCellsOnly
    //    - dirtyRowsOnly
    //    - currentPageOnly
    //    - excludeId
    //    - filterRecord - function (record) - return false to exclude the record
    //    - filterField - function (record, fieldName, value) - return false to exclude the field for particular record
    //    - ignoreSubmitEmptyValue - true to ignore the ModelFields' SubmitEmptyValue option; defaults to false
    getRowsValues : function (config) {
        config = config || {};

        if (this.isEditable && this.editingPlugin) {
            this.editingPlugin.completeEdit();
        }

        var records = (config.selectedOnly ? this.selModel.getSelection() : config.currentPageOnly ? this.store.getRange() : this.store.getAllRange()) || [],
            values = [],
            record,
            sIds,
            i,
            idProp = this.store.getModel().idField.name;

        if (this.selectionMemory && config.selectedOnly && !config.currentPageOnly && this.store.isPagingStore) {
            records = [];
            sIds = this.getSelectionMemory().selectedIds;

            for (var id in sIds) {
                if (sIds.hasOwnProperty(id)) {
                    record = this.store.getById(sIds[id].id);

                    if (!Ext.isEmpty(record)) {
                        records.push(record);
                    }
                }
            }
        }

        for (i = 0; i < records.length; i++) {
            var obj = {}, dataR;

            dataR = Ext.apply(obj, records[i].data);

            if (idProp && dataR.hasOwnProperty(idProp)) {
                dataR[idProp] = config.excludeId === true ? undefined : records[i].getId();
            }
            
            config.grid = this;
            dataR = this.store.prepareRecord(dataR, records[i], config);

            if (!Ext.isEmptyObj(dataR)) {
                values.push(dataR);
            }
        }

        return values;
    },

    serialize : function (config) {
        return Ext.encode(this.getRowsValues(config));
    },
    
    // config:
    //   - selectedOnly,
    //   - visibleOnly
    //   - dirtyCellsOnly
    //   - dirtyRowsOnly
    //   - currentPageOnly
    //   - excludeId
    //   - encode
    //   - filterRecord - function (record) - return false to exclude the record
    //   - filterField - function (record, fieldName, value) - return false to exclude the field for particular record
    //   - ignoreSubmitEmptyValue - true to ignore the ModelFields' SubmitEmptyValue option; defaults to false
    submitData : function (config, requestConfig) {
        config = config || {};
        config.selectedOnly = config.selectedOnly || false;
        encode = config.encode;

        var values = this.getRowsValues(config);

        if (!values || values.length === 0) {
            return false;
        }

        if (encode) {
            values = Ext.util.Format.htmlEncode(values);
            delete config.encode;
        }

        this.store._submit(values, config, requestConfig);
    },

    deleteSelected : function () {
        var selection = this.getSelectionModel().getSelection();

        if (selection && selection.length > 0) {
            this.store.remove(selection);
        }
    },

    hasSelection : function () {
        return this.getSelectionModel().hasSelection();
    },

    print : function (config) {
        Ext.net.GridPrinter.print(this, config);
    }
});
Ext.define("Ext.net.GridPrinter", {

    requires: 'Ext.XTemplate',

    statics: {
        //stylesheets: null,

        title: "",

        printStyle: "html,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,p,blockquote,th,td{margin:0;padding:0}html,img,body{border:0}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:400}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%}q:before,q:after{content:''}table{width:100%;text-align:left;font-size:11px;font-family:arial;border-collapse:collapse;table-layout:fixed;}table th{font-weight:700;padding:4px 3px 4px 5px;border:1px solid #d0d0d0;border-left-color:#eee;background-color:#ededed}table tr.odd{background-color:#fff}table tr.even{background-color:#f9f9f9}table td{padding:4px 3px 4px 5px;border-style:none solid solid;border-width:1px;border-color:#ededed;text-overflow: ellipsis;overflow:hidden;white-space:nowrap;}@media print{body{margin:0;padding:0}}.group-header{border-bottom:2px solid #000;font-size:14px;}.group-header td{padding-top:15px;}",
        headerTpl: [
            '<tpl for=".">',
                '<th>{text}</th>',
            '</tpl>'
        ],

        bodyTpl: [
            '<tpl for=".">',
                '<tpl if="values.dataIndex">',
                    '<td>\{{[Ext.String.createVarName(values.dataIndex)]}\}</td>',
                '<tpl else>',
                    '<td>\{{[Ext.String.createVarName(values.id)]}\}</td>',
                '</tpl>',
            '</tpl>'
        ],

        //config: 
        // - columnFilter 
        // - columnFilterScope
        // - includeHidden
        // - copyStylesheets
        // - ignoreRowBody
        // - includeGroupField
        // - currentPageOnly
        // - stylesheets
        // - printStyle
        // - gridWidth
        // - columnsWidth
        // - userStyle
        print: function (grid, config) {
            if (!grid) {
                throw "Grid is undefined";
            }

            config = config || {};

            var groupingFeature = grid.groupingFeature,
                groupField = groupingFeature && groupingFeature.getGroupField(),
                isGrouped = grid.store.isGrouped(),
                rowBodyFeature = grid.view.rowBodyFeature,
                rowBody,
                columns = grid.headerCt.getGridColumns(),
                data,
                resPath,
                stylesheets,
                parent_ss,
                tableHeader,
                body;

            columns = this.getColumns(columns);
            columns = this.filterColumns(columns, isGrouped, groupField, config);
            data = this.convertData(grid, columns, config);
            resPath = Ext.net.ResourceMgr.cdnPath || Ext.net.ResourceMgr.resourcePath;
            stylesheets = [];
            stylesheets = stylesheets.concat(this.stylesheets || []);
            stylesheets = stylesheets.concat(config.stylesheets || []);

            if (this.get("copyStylesheets", config) !== false) {
                parent_ss = this.getStylesheets();
            }

            tableHeader = this.getTableHeader(columns);

            if (rowBodyFeature && this.get("ignoreRowBody", config) !== true) {
                rowBody = this.getRowBody(rowBodyFeature, columns);
            }

            body = this.getBody(grid, columns, data, rowBody);

            this.doPrint(this.getHtml(grid, parent_ss, tableHeader, body, rowBody, isGrouped, config, columns, {
                data: data,
                stylesheets: stylesheets,
                title: grid.title || this.title
            }));
        },

        getColumns: function (gridColumns) {
            var i,
                c,
                len,
                columns = [];

            for (i = 0, len = gridColumns.length; i < len; i++) {
                c = gridColumns[i];
                if (c.items.length > 0 && !c.isComponentHeader) {
                    columns = columns.concat(c.items.items);
                } else {
                    columns.push(c);
                }
            }

            return columns;
        },

        filterColumns: function (columns, isGrouped, groupField, config) {
            var temp = [],
                i,
                len,
                result,
                c,
                includeHidden = this.get("includeHidden", config),
                includeGroupField = this.get("includeGroupField", config),
                columnFilter = this.get("columnFilter", config),
                columnFilterScope = this.get("columnFilterScope", config);

            for (i = 0, len = columns.length; i < len; i++) {
                c = columns[i];

                if (columnFilter) {
                    result = columnFilter.call(columnFilterScope, c);
                    if (Ext.isDefined(result)) {
                        if (result === true) {
                            temp.push(c);
                        }
                        continue;
                    }
                }

                if (c.isXType("commandcolumn") ||
                    c.isXType("componentcolumn") ||
                    c.isXType("imagecommandcolumn") ||
                    c.isXType("actioncolumn")) {
                    continue;
                }

                if (c.dataIndex &&
                    (!c.hidden || includeHidden) &&
                    (!isGrouped || c.dataIndex !== groupField || includeGroupField)) {
                    temp.push(c);
                }
                else if (c.isXType("templatecolumn")) {
                    temp.push(c);
                }
                else if (c.isXType("rownumberer")) {
                    c.text = "№";
                    temp.push(c);
                }
            }
            return temp;
        },

        convertData: function (grid, columns, config) {
            var data = [];
            Ext.each(this.get("currentPageOnly", config) ? grid.store.getRange() : grid.store.getAllRange(), function (record, index) {
                var item = Ext.apply({}, record.data),
                    i,
                    len,
                    c,
                    meta,
                    value;

                for (i = 0, len = columns.length; i < len; i++) {
                    c = columns[i];

                    if (c.dataIndex) {
                        value = record.data[c.dataIndex];
                        meta = { tdCls: "", tdAttr: "", style: "" };

                        value = c.renderer ? c.renderer.call(c, value, meta, record, index, i, grid.store, grid.view) : value;
                        item[Ext.String.createVarName(c.dataIndex)] = value;
                    }
                    else if (c.isXType("rownumberer")) {
                        meta = { tdCls: "", tdAttr: "", style: "" };
                        item[Ext.String.createVarName(c.id)] = c.renderer.call(c, null, meta, record, index, i, grid.store, grid.view); //index + 1;
                    }
                    else if (column.isXType("templatecolumn")) {
                        value = c.tpl ? c.tpl.apply(record.data) : value;
                        item[Ext.String.createVarName(c.id)] = value;
                    }
                }
                item.__internalId = record.internalId;
                data.push(item);
            });

            return data;
        },

        getStylesheets: function () {
            var doc_ss = document.styleSheets,
                ss,
                parent_ss = [],
                i,
                g,
                len;

            for (i = 0; i < doc_ss.length; i++) {
                ss = doc_ss[i];

                if (ss.id == "ext-theme" ||
                    ss.id == "extnet-styles" ||
                    ss.id == "extnet-resetstyles" ||
                    ss.id == "extnet-resources") {
                    continue;
                }

                try {
                    if (!Ext.isIE) {
                        for (g = 0, len = ss.cssRules.length; g < len; g++) {
                            parent_ss.push(ss.cssRules[g].cssText);
                        }
                    } else {
                        parent_ss.push(ss.cssText);
                    }
                }
                catch (e) {
                }
            }

            return parent_ss.join("");
        },

        getRowBody: function (rowBodyFeature, columns) {
            return '{[ this.getBodyContent(this.view, values, xindex, this.colSpan) ]}';
        },

        getBodyContent: function (view, data, index, colSpan) {
            var values = {};
            view.rowBodyFeature.setupRowData(data.__internalId ? view.store.getByInternalId(data.__internalId) : data, index, values);

            return ([
                '<td colspan="' + colSpan + '" class="' + (values.rowBodyCls || "") + '">',
                    '<div class="x-grid-rowbody ' + (values.rowBodyDivCls || "") + '">' + (values.rowBody || "") + '</div>',
                '</td>'
            ].join(""));
        },

        get: function (name, config) {
            return Ext.isDefined(config[name]) ? config[name] : this[name];
        },

        doPrint: function (html) {
            var win = window.open('', 'printgrid');
            win.document.open();
            win.document.write(html);
            win.document.close();
            win.print();
            win.close();
        },

        getTableHeader: function (columns) {
            return Ext.create('Ext.XTemplate', this.headerTpl).apply(columns);
        },

        getTableDefinition: function (grid, columns, config) {
            var buffer = ["<table"],
                gridWidth = this.get("gridWidth", config),
                columnsWidth = this.get("columnsWidth", config);

            if (!Ext.isDefined(gridWidth) && columnsWidth) {
                gridWidth = true;
            }

            if (gridWidth) {
                buffer.push(" style=\"width:");
                buffer.push(grid.getWidth());
                buffer.push("px;\"");
            }

            buffer.push(">");

            if (columnsWidth) {
                for (var i = 0; i < columns.length; i++) {
                    buffer.push("<colgroup><col style=\"width: ");
                    buffer.push(columns[i].getWidth());
                    buffer.push("px;\"></colgroup>");
                }
            }

            return buffer.join("");
        },

        getHtml: function (grid, styles, headers, body, rowBody, isGrouped, config, columns, data) {
            var printStyle = this.get("printStyle", config),
                userStyle = this.get("userStyle", config),

                stylesheets = Ext.create('Ext.XTemplate', [
                    '<tpl for=".">',
                        '<link href="{.}" rel="stylesheet" type="text/css" media="screen,print" />',
                    '</tpl>',
                ]).apply(data.stylesheets),

                tableDefinition = this.getTableDefinition(grid, columns, config),

                table = isGrouped ?
                    [
                        tableDefinition,
                          '<tr>',
                            headers,
                          '</tr>',
                           body,
                        '</table>'
                    ].join("") :

                    Ext.create('Ext.XTemplate', [
                        tableDefinition,
                          '<tr>',
                            headers,
                          '</tr>',
                            '<tpl for=".">',
                               '<tr class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
                                  body,
                               '</tr>',
                               '<tr class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
                               (rowBody || ""),
                               '</tr>',
                            '</tpl>',
                        '</table>',
                        {
                            view: grid.view,
                            getBodyContent: this.getBodyContent,
                            colSpan: columns.length
                        }
                    ]).apply(data.data);


            return [
                '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
                '<html>',
                  '<head>',
                    '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />',
                    '<title>' + (data.title || "") + '</title>',
                    (stylesheets || ""),
                    '<style type="text/css">',
                        (styles || ""),
                        (printStyle || ""),
                        (userStyle || ""),
                    '</style>',
                  '</head>',
                  '<body>',
                    (this.get("beforeBody", config) || ""),
                    (table || ""),
                    (this.get("afterBody", config) || ""),
                  '</body>',
                '</html>'
            ].join("");
        },

        getBody: function (grid, columns, data, rowBody) {

            var groups,
                fields = grid.store.getModel().getFields(),
                groupField,
                header,
                feature,
                body;

            if (grid.store.isGrouped()) {
                groups = grid.store.getGroups();
                feature = grid.groupingFeature;
                header = feature.refreshData.header;
                groupField = feature.getGroupField();

                if (!fields || !groupField) {
                    return;
                }

                //fields = fields.filter( function(field) {
                //    return !!Ext.Array.findBy(columns, function (c) {
                //        return c.dataIndex == field.name;
                //    });
                //});

                var bodyTpl = [
                    '<tpl for=".">',
                        '<tr class="group-header">',
                            '<td colspan="{[this.colSpan]}">',
                              (feature.groupHeaderTpl.html || ''),
                            '</td>',
                        '</tr>',
                        '<tpl for="items">',
                            '<tr class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
                                '<tpl for="this.columns">',
                                    '<td>',
                                      '{[ this.getValue(parent, Ext.String.createVarName(values.dataIndex || values.id)) ]}',
                                    '</td>',
                                '</tpl>',
                            '</tr>',
                            '<tr class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
                                 (rowBody || ""),
                            '</tr>',
                        '</tpl>',
                    '</tpl>',
                    {
                        getBodyContent: this.getBodyContent,
                        view: grid.view,
                        columns: columns,
                        fields: fields,
                        colSpan: columns.length,
                        getValue: function (record, name) {
                            return record.convertedData[name];
                        }
                    }
                ];

                groups.each(function (group) {
                    group.groupField = groupField;
                    group.groupValue = group.getGroupKey();
                    group.name = group.getGroupKey();
                    group.columnName = header ? header.text : groupField;
                    group.rows = group.items;

                    Ext.each(group.items, function (record) {
                        var i, len;

                        for (i = 0, len = data.length; i < len; i++) {
                            if (data[i].__internalId == record.internalId) {
                                record.convertedData = data[i];
                                return;
                            }
                        }
                    });
                });

                body = Ext.create('Ext.XTemplate', bodyTpl).apply(groups.items);

                groups.each(function (group) {
                    delete group.groupField;
                    delete group.groupValue;
                    delete group.columnName;
                    delete group.name;
                    delete group.rows;

                    Ext.each(group.items, function (record) {
                        delete record.convertedData;
                    });
                });
            }
            else {
                body = Ext.create('Ext.XTemplate', this.bodyTpl).apply(columns);
            }

            return body;
        }
    }
});
Ext.grid.feature.Grouping.override({
    init: function(grid) {
        this.callParent(arguments);
        grid.groupingFeature = this;

        if (this.dataSource) {
            grid.store.groupingDataSource = this.dataSource;
        }
    }
});

// @source grid/plugin/CellEditing.js

Ext.grid.plugin.CellEditing.override({
    getColumnField: function (columnHeader, defaultField, record) {
        if (columnHeader instanceof Ext.grid.column.Check
           || columnHeader instanceof Ext.grid.column.Action
           || columnHeader instanceof Ext.grid.RowNumberer
           ) {
            return;
        }

        var field = columnHeader.field;

        if (!field && columnHeader.editor) {
            field = columnHeader.editor;
            delete columnHeader.editor;
        }

        if (!field && defaultField) {
            field = defaultField;
        }

        if (!field || this.fieldFromEditors) {
            if (columnHeader.editors) {
                field = this.getFromEditors(record, columnHeader, columnHeader.editors, columnHeader.editorStrategy, columnHeader);
                this.fieldFromEditors = false;
            }

            if ((!field || this.fieldFromEditors) && this.grid.editors) {
                field = this.getFromEditors(record, columnHeader, this.grid.editors, this.grid.editorStrategy, this.grid);
            }

            this.fieldFromEditors = true;
        }

        if (field) {
            if (Ext.isString(field)) {
                field = { xtype: field };
            }
            if (!field.isFormField) {
                field = Ext.ComponentManager.create(field, this.defaultFieldXType);
            }
            columnHeader.field = field;

            Ext.apply(field, {
                name: columnHeader.dataIndex
            });

            columnHeader.activeEditorId = field instanceof Ext.grid.CellEditor ? field.field.getItemId() : field.getItemId();

            return field;
        }
    },

    getFromEditors: function (record, column, editors, editorStrategy, scope) {
        var editor,
            index;

        if (editorStrategy) {
            editor = editorStrategy.call(scope, record, column, editors, this.grid);

            if (Ext.isNumber(editor)) {
                index = editor;
                editor = editors[index];
            }

            index = Ext.Array.indexOf(editors, editor);
        } else {
            editor = editors[0];
            index = 0;
        }

        if (editor && !(editor instanceof Ext.grid.CellEditor)) {
            if (!(editor instanceof Ext.form.field.Base)) {
                editor = Ext.ComponentManager.create(editor, 'textfield');
            }
            editor = editors[index] = new Ext.grid.CellEditor({
                field: editor,
                floating: true
            });
        }

        if (editor) {
            Ext.applyIf(editor, {
                editorId: editor.field.getItemId(),
                editingPlugin: this,
                //ownerCt: this.grid,
                floating: true
            });
        }

        return editor;
    },

    initFieldAccessors: function (columns) {
        if (columns.isGroupHeader) {
            columns = columns.getGridColumns();
        }
        else if (!Ext.isArray(columns)) {
            columns = [columns];
        }

        var me = this,
            c,
            cLen = columns.length,
            column;

        for (c = 0; c < cLen; c++) {
            column = columns[c];

            if (!column.getEditor) {
                column.getEditor = function (record, defaultField) {
                    return me.getColumnField(this, defaultField, record);
                };
            }
            if (!column.hasEditor) {
                column.hasEditor = function () {
                    return me.hasColumnField(this);
                };
            }
            if (!column.setEditor) {
                column.setEditor = function (field) {
                    me.setColumnField(this, field);
                };
            }
        }
    }
});

// @source grid/plugin/RowEditing.js

Ext.grid.plugin.RowEditing.override({
    saveBtnText   : 'Update',
    cancelBtnText : 'Cancel',
    errorsText    : 'Errors',
    dirtyText     : 'You need to commit or cancel your changes', 

    getEditor: function () {
        var me = this;

        if (!me.editor) {
            me.editor = me.initEditor();
            if (me.editor.rendered) {
                me.setHandlers();
            }
            else {
                me.editor.on("afterrender", me.setHandlers, me, { single:true });
            }
        }
        return me.editor;
    },

    setHandlers : function () {
        if (this.saveHandler) {
            var btn = this.editor.getFloatingButtons().down("#update"),
                enterBinding = Ext.Array.findBy(this.editor.keyNav.map.bindings, function (b) {
                    return b.key === Ext.event.Event.ENTER;
                });    
 
            btn.handler = enterBinding.handler = this.saveHandler;
            btn.scope = enterBinding.scope = this.editor;
        }
    }    
});

// @source grid/plugin/RowExpander.js

// feature idea to enable Ajax loading and then the content
// cache would actually make sense. Should we dictate that they use
// data or support raw html as well?


Ext.define('Ext.net.RowExpander', {
    extend: 'Ext.plugin.Abstract',
    lockableScope: 'normal',

    requires: [
        'Ext.grid.feature.RowBody'
    ],

    alias: 'plugin.netrowexpander',

    mixins: {
        observable: 'Ext.util.Observable'
    },

    isRowExpander: true,
    rowBodyTpl: null,
    lockedTpl: null,

    
    expandOnEnter: false,

    
    expandOnDblClick: true,

    
    selectRowOnExpand: false,
    headerWidth: Ext.grid.plugin.RowExpander.prototype.headerWidth,
    bodyBefore: false,
    hiddenColumn: false,

    rowBodyTrSelector: '.' + Ext.baseCSSPrefix + 'grid-rowbody-tr',
    rowBodyHiddenCls: Ext.baseCSSPrefix + 'grid-row-body-hidden',
    rowCollapsedCls: Ext.baseCSSPrefix + 'grid-row-collapsed',
    swallowBodyEvents: false,

    addCollapsedCls: {
        fn: function (out, values, parent) {
            var me = this.rowExpander;
            if (!me.recordsExpanded[values.record.internalId]) {
                values.itemClasses.push(me.rowCollapsedCls);
            }
            this.nextTpl.applyOut(values, out, parent);
        },

        syncRowHeights: function (lockedItem, normalItem) {
            this.rowExpander.syncRowHeights(lockedItem, normalItem);
        },

        // We need a high priority to get in ahead of the outerRowTpl
        // so we can setup row data
        priority: 20000
    },

    constructor: function (config) {
        this.callParent(arguments);
        this.mixins.observable.constructor.call(this);
        this.fitCmpWidth = Ext.Function.createDelayed(this.fitCmpWidth, 1);
    },

    
    

    setCmp: function (grid) {
        var me = this,
            features;

        this.callParent(arguments);

        this.recordsExpanded = {};
        this.preventsExpanding = {};
        this.bodyContent = {};

        if (!this.rowBodyTpl) {
            this.rowBodyTpl = "";
        }

        if (!Ext.isEmpty(this.rowBodyTpl) && (this.loader || this.component)) {
            this.cmpBodyTpl = (this.rowBodyTpl instanceof Ext.XTemplate) ? this.rowBodyTpl : Ext.create('Ext.XTemplate', this.rowBodyTpl);
            this.rowBodyTpl = "";
        }

        this.rowBodyTpl = (this.rowBodyTpl instanceof Ext.XTemplate) ? this.rowBodyTpl : Ext.create('Ext.XTemplate', this.rowBodyTpl);
        features = me.getFeatureConfig(grid);

        if (grid.features) {
            grid.features = Ext.Array.push(features, grid.features);
        } else {
            grid.features = features;
        }

        this.componentsCache = [];
        this.outerComponentsCache = [];

        
        if (this.singleExpand && this.cacheSingleExpandRows && this.component && this.component.monitorResize) {
            this.component.monitorResize = this.singleExpand;
        }
        
        this.componentCfg = this.component;
        delete this.component;
    },

    getFeatureConfig: function (grid) {
        var me = this,
            features = [],
            featuresCfg = {
                ftype: 'rowbody',
                rowExpander: me,
                bodyBefore: me.bodyBefore,
                recordsExpanded: this.recordsExpanded,
                rowBodyHiddenCls: this.rowBodyHiddenCls,
                rowCollapsedCls: this.rowCollapsedCls,
                setupRowData: this.getRowBodyFeatureData,
                setup: this.setup,
                expander: this
            };

        features.push(Ext.apply({
            lockableScope: 'normal',
            getRowBodyContents: me.getRowBodyContentsFn(me.rowBodyTpl)
        }, featuresCfg));

        // Locked side will need a copy to keep the two DOM structures symmetrical.
        // A lockedTpl config is available to create content in locked side.
        // The enableLocking flag is set early in Ext.panel.Table#initComponent if any columns are locked.
        if (grid.enableLocking) {
            features.push(Ext.apply({
                lockableScope: 'locked',
                getRowBodyContents: me.lockedTpl ? me.getRowBodyContentsFn(me.lockedTpl) : function () { return ''; }
            }, featuresCfg));
        }

        return features;
    },

    getRowBodyContentsFn: function (rowBodyTpl) {
        var me = this;
        return function (rowValues) {
            rowBodyTpl.owner = me;
            return rowBodyTpl.applyTemplate(rowValues.record.getData()) || this.rowExpander.bodyContent[rowValues.record.internalId];
        };
    },

    getExpanded: function () {
        var store = this.grid.store,
            expandedRecords = [];

        store.each(function (record, index) {
            if (this.recordsExpanded[record.internalId]) {
                expandedRecords.push(record);
            }
        }, this);

        return expandedRecords;
    },

    init: function (grid) {
        if (grid.lockable) {
            grid = grid.normalGrid;
        }

        var me = this,
            ownerLockable = grid.ownerLockable,
            lockedView;

        this.callParent(arguments);
        this.grid = grid;
        me.view = grid.getView();

        me.bindView(me.view);
        me.view.addRowTpl(me.addCollapsedCls).rowExpander = me;

        // If our client grid is the normal side of a lockable grid, we listen to its lockable owner's beforereconfigure
        // and also bind to the locked grid's view for dblclick and keydown events
        if (ownerLockable) {
            me.addExpander(ownerLockable.lockedGrid.headerCt.items.getCount() ? ownerLockable.lockedGrid : grid);

            lockedView = ownerLockable.lockedGrid.getView();

            // Bind to locked view for key and mouse events
            // Add row processor which adds collapsed class
            me.bindView(lockedView);
            lockedView.addRowTpl(me.addCollapsedCls).rowExpander = me;

            ownerLockable.mon(ownerLockable, {
                processcolumns: me.onLockableProcessColumns,
                lockcolumn: me.onColumnLock,
                unlockcolumn: me.onColumnUnlock,
                scope: me
            });

            // Process items added.
            // It may be a re-rendering by the buffered renderer of an expanded item.
            // If so, schedule a syncRowHeights call.
            me.viewListeners = view.on({
                itemadd: me.onItemAdd,
                scope: me
            });
        } else {
            me.addExpander(grid);
            grid.on('beforereconfigure', me.beforeReconfigure, me);
        }

        grid.headerCt.on("columnresize", this.updateComponentsWidth, this, { delay: 20, buffer: 20 });
        grid.headerCt.on("columnhide", this.updateComponentsWidth, this, { delay: 20, buffer: 20 });
        grid.headerCt.on("columnshow", this.updateComponentsWidth, this, { delay: 20, buffer: 20 });
    },

    onItemAdd: function(newRecords, startIndex, newItems) {
        var me = this,
            ownerLockable = me.grid.ownerLockable,
            lockableSyncRowHeights = me.lockableSyncRowHeights || (me.lockableSyncRowHeights = Ext.Function.createAnimationFrame(ownerLockable.syncRowHeights, ownerLockable)),
            len = newItems.length,
            i;

        // If any added items are expanded, we will need a syncRowHeights call on next animation frame
        for (i = 0; i < len; i++) {
            if (!Ext.fly(newItems[i]).hasCls(me.rowCollapsedCls)) {
                lockableSyncRowHeights();
                return;
            }
        }
    },

    updateComponentsWidth: function () {
        var i,
            grid = this.grid,
            body,
            len = this.componentsCache.length,
            item;

        if (this.component && this.component.record && this.recordsExpanded[this.component.record.internalId]) {
            body = Ext.get(grid.view.getNode(grid.store.getByInternalId(this.component.record.internalId))).down("div.x-grid-rowbody");
            this.component.setWidth(body.getWidth() - body.getPadding("lr") - (this.scrollOffset || 0));
        }

        if (this.componentsCache && len > 0) {
            for (i = 0; i < len; i++) {
                item = this.componentsCache[i];
                if (this.recordsExpanded[item.id]) {
                    body = Ext.get(grid.view.getNode(grid.store.getByInternalId(item.id))).down("div.x-grid-rowbody");
                    item.cmp.setWidth(body.getWidth() - body.getPadding("lr") - (this.scrollOffset || 0));
                }
            }
        }
    },

    beforeReconfigure: function (grid, store, columns, oldStore, oldColumns) {
        var me = this;

        if (me.viewListeners) {
            me.viewListeners.destroy();
        }

        if (columns) {
            me.expanderColumn = new Ext.grid.Column(me.getHeaderConfig());
            columns.unshift(me.expanderColumn);
        }

    },

    onLockableProcessColumns: function (lockable, lockedHeaders, normalHeaders) {
        this.addExpander(lockedHeaders.length ? lockable.lockedGrid : lockable.normalGrid);
    },

    addExpander: function (expanderGrid) {
        var me = this,
            gridSelMdl = expanderGrid.getSelectionModel();

        me.grid = expanderGrid;
        me.expanderColumn = expanderGrid.headerCt.insert(0, me.getHeaderConfig());

        // If a CheckboxModel, it must now put its checkbox in at position one because this
        // cell always gets in at position zero, and spans 2 columns.
        if (gridSelMdl && gridSelMdl.selType == "checkboxmodel") {
            var injectValue = gridSelMdl.injectCheckbox,
                parsedIValue = parseInt(injectValue);
                    
            if (!isNaN(parsedIValue) && parsedIValue == injectValue) {
                gridSelMdl.injectCheckbox++; // move one column index ahead
            }
        }
    },

    getRowBodyFeatureData: function (record, idx, rowValues) {
        var me = this;
        me.self.prototype.setupRowData.apply(me, arguments);

        rowValues.rowBody = me.getRowBodyContents(rowValues);
        rowValues.rowBodyCls = me.recordsExpanded[record.internalId] ? '' : me.rowBodyHiddenCls;
    },

    setup: function (rows, rowValues) {
        var me = this,
            lockable = me.grid.ownerLockable;

        me.self.prototype.setup.apply(me, arguments);

        // If we are lockable, and we are setting up the side which has the expander column, it is row spanning so we don't have to colspan it
        if (lockable && Ext.Array.indexOf(me.grid.columnManager.getColumns(), me.rowExpander.expanderColumn) !== -1) {
            rowValues.rowBodyColspan -= 1;
        }
    },

    bindView: function (view) {
        view.stopEventFn = this.stopEventFn;

        view.on("beforerefresh", function () {
            this.preventsExpanding = {};
        }, this);

        if (this.expandOnEnter) { // Means legacy behavior
            view.on('itemkeydown', this.onKeyDownLegacy, this);
        } else { // New ExtJS 6 behavior
            view.on('itemkeydown', this.onKeyDown, this);
        }

        if (this.expandOnDblClick) {
            view.on('itemdblclick', this.onDblClick, this);
        }

        view.on('itemmousedown', function (view, record, item, index, e) {
            return !e.getTarget('div.x-grid-rowbody', view.el);
        }, this);

        if (this.swallowBodyEvents) {
            view.on("itemupdate", this.swallowRow, this);
            view.on("refresh", this.swallowRow, this);
        }

        if (this.componentCfg || this.loader) {
            view.on("beforerefresh", this.mayRemoveComponents, this);
            view.on("beforeitemupdate", this.mayRemoveComponent, this);
            view.on("beforeitemremove", this.removeComponent, this);
            view.on("refresh", this.restoreComponents, this);
            view.on("itemupdate", this.restoreSingleComponent, this);
        }
    },

    moveComponent: function () {
        if (!this.componentInsideGrid) {
            return;
        }

        var ce = this.component.getEl(),
            el = Ext.net.ResourceMgr.getAspForm() || Ext.getBody();

        ce.addCls("x-hidden");
        el.dom.appendChild(ce.dom);
        this.componentInsideGrid = false;
    },

    removeComponent: function (view, record, rowIndex) {
        for (var i = 0, l = this.componentsCache.length; i < l; i++) {
            if (this.componentsCache[i].id == record.internalId) {
                try {
                    var cmp = this.componentsCache[i].cmp;
                    cmp.destroy();
                    Ext.Array.remove(this.componentsCache, this.componentsCache[i]);
                } catch (ex) { }

                break;
            }
        }
    },

    mayRemoveComponent: function (view, record, rowIndex) {
        if (this.invalidateComponentsOnRefresh) {
            this.removeComponents(view, record, rowIndex);
            return;
        }

        var item,
            ce,
            elTo;

        for (var i = 0, l = this.componentsCache.length; i < l; i++) {
            item = this.componentsCache[i];

            if (item.id == record.internalId) {
                ce = item.cmp.getEl();
                elTo = Ext.net.ResourceMgr.getAspForm() || Ext.getBody();
                ce.addCls("x-hidden");
                elTo.dom.appendChild(ce.dom);

                this.outerComponentsCache.push(item);
                Ext.Array.remove(this.componentsCache, item);

                break;
            }
        }
    },

    mayRemoveComponents: function () {
        if (this.invalidateComponentsOnRefresh) {
            this.removeComponents();
            return;
        }

        var cmp,
            ce,
            elTo = Ext.net.ResourceMgr.getAspForm() || Ext.getBody();

        for (var i = 0, l = this.componentsCache.length; i < l; i++) {
            cmp = this.componentsCache[i].cmp;
            ce = cmp.getEl();

            ce.addCls("x-hidden");
            elTo.dom.appendChild(ce.dom);
        }

        this.outerComponentsCache = this.componentsCache;
        this.componentsCache = [];
    },

    removeComponents: function (outer) {
        for (var i = 0, l = this.componentsCache.length; i < l; i++) {
            try {
                var cmp = this.componentsCache[i].cmp;
                cmp.destroy();
            } catch (ex) { }
        }

        this.componentsCache = [];

        if (outer && this.outerComponentsCache) {
            for (var i = 0, l = this.outerComponentsCache.length; i < l; i++) {
                try {
                    var cmp = this.outerComponentsCache[i].cmp;
                    cmp.destroy();
                } catch (ex) { }
            }

            this.outerComponentsCache = [];
        }
    },

    onRowCmpLoad: function (loader, response, options) {
        var expander = loader.paramsFnScope.expander,
            grid = expander.grid,
            target = loader.getTarget();

        grid.view.refreshSize(true);
        expander.fitCmpWidth(target);
    },

    createComponent: function (record, body) {
        var rowCmp,
            needContainer,
            scope,
            box,
            loader;

        if (this.loader) {
            needContainer = !(this.loader.renderer == "html" || this.loader.renderer == "data");
            scope = { record: record, expander: this, el: body, grid: this.grid };
            loader = Ext.isFunction(this.loader) ? this.loader.call(scope) : Ext.clone(this.loader);
            loader.paramsFnScope = scope;
            loader.success = this.onRowCmpLoad;

            rowCmp = Ext.create(needContainer ? "Ext.container.Container" : "Ext.Component", {
                loader: loader,
                layout: "anchor",
                defaults: { anchor: "100%" },
                tpl: !Ext.isEmpty(this.cmpBodyTpl) ? ((this.cmpBodyTpl instanceof Ext.XTemplate) ? this.cmpBodyTpl : Ext.create('Ext.XTemplate', this.cmpBodyTpl)) : undefined
            });
        }
        else {
            rowCmp = Ext.ComponentManager.create(Ext.isFunction(this.componentCfg) ? this.componentCfg.call({ record: record, expander: this }) : Ext.clone(this.componentCfg), "panel");
        }

        //box = Ext.util.Format.parseBox(this.componentMargin || 0);

        if (this.componentMargin) {
            rowCmp.margin = this.componentMargin;
        }

        rowCmp.ownerCt = this.grid;
        rowCmp.record = record;
        rowCmp.width = body.getWidth() - (this.scrollOffset || 0);
        rowCmp.render(body);
        rowCmp.addCls("x-row-expander-control");
        this.componentsCache.push({ id: record.internalId, cmp: rowCmp });
        return rowCmp;
    },

    restoreSingleComponent: function (record, index, node) {
        var grid = this.grid;

        if (record.isCollapsedPlaceholder) {
            return;
        }

        if (this.recordsExpanded[record.internalId]) {
            var rowNode = grid.view.getNode(record, false),
                row = Ext.get(rowNode),
                nextBd = row.down(this.rowBodyTrSelector),
                body = row.down("div.x-grid-rowbody"),
                rowCmp = this.getComponent(record, body);

            if (!rowCmp) {
                rowCmp = this.createComponent(record, body);
            }

            grid.view.refreshSize(true);
            this.fitCmpWidth(rowCmp);
        }
    },

    restoreComponents: function () {
        var grid = this.grid,
        cmps = [];

        Ext.each(grid.getView().getViewRange(), function (record, i) {
            if (record.isCollapsedPlaceholder) {
                return;
            }

            if (this.recordsExpanded[record.internalId]) {
                var rowNode = grid.view.getNode(record, false),
                    row = Ext.get(rowNode),
                    nextBd = row.down(this.rowBodyTrSelector),
                    body = row.down("div.x-grid-rowbody"),
                    rowCmp = this.getComponent(record, body);

                if (!rowCmp) {
                    rowCmp = this.createComponent(record, body);
                }

                cmps.push(rowCmp);
            }
        }, this);

        this.removeOuterOrphans();

        if (grid.view.viewReady) {
            grid.view.refreshSize(true);
        }

        Ext.each(cmps, function (cmp) {
            this.fitCmpWidth(cmp);
        }, this);
    },

    removeOuterOrphans: function () {
        if (this.outerComponentsCache && this.outerComponentsCache.length > 0) {
            var len = this.outerComponentsCache.length,
                store = this.grid.store,
                records = store.data.items,
                len2 = records.length,
                r,
                found,
                i = 0,
                item;

            while (i < len) {
                item = this.outerComponentsCache[i];
                found = false;

                for (r = 0; r < len2; r++) {
                    if (records[r].internalId == item.id) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    try {
                        item.cmp.destroy();
                    } catch (ex) { }
                    Ext.Array.remove(this.outerComponentsCache, item);
                    len--;
                }
                else {
                    i++;
                }
            }
        }
    },

    swallowRow: function () {
        var grid = this.grid;

        grid.store.each(function (record, i) {
            if (this.recordsExpanded[record.internalId]) {
                var rowNode = grid.view.getNode(record, false),
                    body = Ext.get(rowNode).down(this.rowBodyTrSelector);

                body.swallowEvent(['click', 'mousedown', 'mousemove', 'mouseup', 'dblclick'], false);
            }
        }, this);
    },

    onKeyDown: function(view, record, row, rowIdx, e) {
        var me = this,
            key = e.getKey(),
            pos = view.getNavigationModel().getPosition(),
            isCollapsed;

        if (pos) {
            row = Ext.fly(row);
            isCollapsed = row.hasCls(me.rowCollapsedCls);

            // + key on collapsed or - key on expanded
            if (((key === 107  || (key === 187 && e.shiftKey)) && isCollapsed) || ((key === 109 || key === 189) && !isCollapsed) && !this.preventsExpanding[record.internalId]) {
                me.toggleRow(rowIdx, record);
            }
        }
    },

    onKeyDownLegacy: function (view, record, row, rowIdx, e) {
        if (e.getKey() === e.ENTER) {
            var ds = view.store,
                sels = view.getSelectionModel().getSelection(),
                ln = sels.length,
                i = 0;

            for (; i < ln; i++) {
                if (!this.preventsExpanding[sels[i].internalId]) {
                    rowIdx = ds.indexOf(sels[i]);
                    this.toggleRow(rowIdx, sels[i]);
                }
            }
        }
    },

    beforeExpand: function (record, body, rowNode, rowIndex) {
        if (this.fireEvent("beforeexpand", this, record, body, rowNode, rowIndex) !== false) {
            if (this.singleExpand || this.component) {
                this.collapseAll();
            }

            return true;
        } else {
            return false;
        }
    },

    expandAll: function () {
        if (this.singleExpand || this.component) {
            return;
        }

        var i = 0,
            records = this.view.getViewRange(),
            store = this.grid.store,
            len = records.length;

        for (i; i < len; i++) {
            this.toggleRow(store.indexOf(records[i]), records[i], true);
        }
    },

    collapseAll: function () {
        var i = 0,
            records = this.view.getViewRange(),
            store = this.grid.store,
            len = records.length;

        for (i; i < len; i++) {
            this.toggleRow(store.indexOf(records[i]), records[i], false);
        }
        this.recordsExpanded = {};
        this.grid.view.rowBodyFeature.recordsExpanded = this.recordsExpanded;
    },

    collapseRow: function (row) {
        this.toggleRow(row, this.view.getRecord(this.view.getNode(row)), false);
    },

    expandRow: function (row) {
        this.toggleRow(row, this.view.getRecord(this.view.getNode(row)), true);
    },

    toggleRow: function (rowIdx, record, state) {
        if (record.isCollapsedPlaceholder) {
            return;
        }

        var me = this,
            view = this.view,
            bufferedRenderer = view.bufferedRenderer,
            scroller = view.getScrollable(),
            fireView = view,
            rowNode = this.view.getNode(record, false),
            normalRow = Ext.get(rowNode),
            lockedRow,
            nextBd = normalRow.down(this.rowBodyTrSelector),
            body = normalRow.down("div.x-grid-rowbody"),
            hasState = Ext.isDefined(state),
            wasCollapsed = normalRow.hasCls(me.rowCollapsedCls),
            addOrRemoveCls = wasCollapsed ? 'removeCls' : 'addCls',
            grid = this.grid,
            rowCmp,
            needContainer,
            ownerLockable = me.grid.ownerLockable,
            expanderCell;

        rowIdx = grid.store.indexOf(record);

        var cachelessRowExpander = this.singleExpand === true && this.cacheSingleExpandRows !== true;

        //Ext.suspendLayouts();
        if ((normalRow.hasCls(this.rowCollapsedCls) && !hasState) || (hasState && state === true && normalRow.hasCls(this.rowCollapsedCls))) {
            if (this.beforeExpand(record, nextBd, rowNode, rowIdx)) {
                normalRow.removeCls(this.rowCollapsedCls);
                nextBd.removeCls(this.rowBodyHiddenCls);
                this.recordsExpanded[record.internalId] = true;

                if (this.component) {
                    if (cachelessRowExpander) {
                        this.component = Ext.ComponentManager.create(Ext.isFunction(this.componentCfg) ? this.componentCfg.call({ record: record, expander: this }) : this.componentCfg, "panel");
                        this.recreateComponent = false; // ensure we're not going to try to recreate the component afterwards
                    }

                    if (this.recreateComponent) {
                        this.component.destroy();
                        this.component = Ext.ComponentManager.create(Ext.isFunction(this.componentCfg) ? this.componentCfg.call({ record: record, expander: this }) : this.componentCfg, "panel");
                    }

                    if (this.component.rendered) {
                        body.appendChild(this.component.getEl());
                        this.component.show();
                        this.component.setWidth(body.getWidth() - (this.scrollOffset || 0));
                    } else {
                        this.component.width = body.getWidth() - (this.scrollOffset || 0);
                        this.component.render(body);
                    }

                    this.component.addCls("x-row-expander-control");
                    this.component.removeCls("x-hidden");

                    this.componentInsideGrid = true;
                    rowCmp = this.component;
                }
                else if (this.componentCfg || this.loader) {
                    // #836: If the RowExpander is not cached, don't try to find any component associated to the row.
                    if (cachelessRowExpander) {
                        rowCmp = null;
                    } else {
                        rowCmp = this.getComponent(record, body);
                    }

                    if (!rowCmp) {
                        rowCmp = this.createComponent(record, body);
                    } else {
                        rowCmp.show();
                    }
                }

                if (this.swallowBodyEvents) {
                    this.swallowRow();
                }

                if (rowCmp) {
                    rowCmp.record = record;
                    this.fitCmpWidth(rowCmp);
                }

                this.fireEvent('expand', this, record, nextBd, rowNode, rowIdx);
            }
        } else if ((!normalRow.hasCls(this.rowCollapsedCls) && !hasState) || (hasState && state === false && !normalRow.hasCls(this.rowCollapsedCls))) {
            if (this.fireEvent("beforecollapse", this, record, nextBd, rowNode, rowIdx) !== false) {
                if (this.component && this.component.rendered) {
                    if (cachelessRowExpander) {
                        // #836: when we have SingleExpand but no CacheSingleExpandRows, destroy on hide.
                        this.removeComponent(this, record, rowIdx);
                    } else {
                        this.component.hide();
                    }
                } else if (this.componentCfg || this.loader) {
                    rowCmp = this.getComponent(record, body);

                    if (rowCmp && rowCmp.rendered) {
                        if (cachelessRowExpander) {
                            // #836: when we have SingleExpand but no CacheSingleExpandRows, destroy on hide.
                            this.removeComponent(this, record, rowIdx);
                        } else {
                            rowCmp.hide();
                        }
                    }
                }

                normalRow.addCls(this.rowCollapsedCls);
                nextBd.addCls(this.rowBodyHiddenCls);
                this.recordsExpanded[record.internalId] = false;

                this.fireEvent('collapse', this, record, nextBd, rowNode, rowIdx);
            }
        }

        // Sync the collapsed/hidden classes on the locked side
        if (me.grid.ownerLockable) {

            // It's the top level grid's LockingView that does the firing when there's a lockable assembly involved.
            fireView = ownerLockable.getView();

            // Only attempt to toggle lockable side if it is visible.
            if (ownerLockable.lockedGrid.isVisible()) {

                view = ownerLockable.view.lockedGrid.view;

                // Process the locked side.
                lockedRow = Ext.fly(view.getNode(rowIdx));
                // Just because the grid is locked, doesn't mean we'll necessarily have a locked row.
                if (lockedRow) {
                    lockedRow[addOrRemoveCls](me.rowCollapsedCls);

                    // If there is a template for expander content in the locked side, toggle that side too
                    nextBd = lockedRow.down(me.rowBodyTrSelector, true);
                    Ext.fly(nextBd)[addOrRemoveCls](me.rowBodyHiddenCls);
                }
            }
        }

        fireView.fireEvent(wasCollapsed ? 'expandbody' : 'collapsebody', rowNode, record, nextBd);

        // Layout needed of we are shrinkwrapping height, or there are locked/unlocked sides to sync
        // Will sync the expander row heights between locked and normal sides
        if (view.getSizeModel().height.shrinkWrap || ownerLockable) {
            view.refreshSize(true);
        }
        // If we are using the touch scroller, ensure that the scroller knows about
        // the correct scrollable range
        if (scroller) {
            if (bufferedRenderer) {
                bufferedRenderer.refreshSize();
            } else {
                scroller.refresh(true);
            }
        }    
    },

    onDblClick: function (view, record, row, rowIdx, e) {
        if (!this.preventsExpanding[record.internalId] && !e.getTarget(this.rowBodyTrSelector, view.el)) {
            this.toggleRow(rowIdx, record);
        }
    },

    renderer: Ext.emptyFn,

    // Called from TableLayout.finishedLayout
    syncRowHeights: function (lockedItem, normalItem) {
        var me = this,
            lockedBd = Ext.fly(lockedItem).down(me.rowBodyTrSelector),
            normalBd = Ext.fly(normalItem).down(me.rowBodyTrSelector),
            lockedHeight,
            normalHeight;

        // If expanded, we have to ensure expander row heights are synched
        if (normalBd.isVisible()) {

            // If heights are different, expand the smallest one
            if ((lockedHeight = lockedBd.getHeight()) !== (normalHeight = normalBd.getHeight())) {
                if (lockedHeight > normalHeight) {
                    normalBd.setHeight(lockedHeight);
                } else {
                    lockedBd.setHeight(normalHeight);
                }
            }
        }
            // When not expanded we do not control the heights
        else {
            lockedBd.dom.style.height = normalBd.dom.style.height = '';
        }
    },

    onColumnUnlock: function (lockable, column) {
        var me = this,
            lockedColumns;

        lockable = me.grid.ownerLockable;
        lockedColumns = lockable.lockedGrid.visibleColumnManager.getColumns();

        // User has unlocked all columns and left only the expander column in the locked side.
        if (lockedColumns.length === 1) {
            if (lockedColumns[0] === me.expanderColumn) {
                lockable.unlock(me.expanderColumn);
                me.grid = lockable.normalGrid;
            } else {
                lockable.lock(me.expanderColumn, 0);
            }
        }
    },

    onColumnLock: function (lockable, column) {
        var me = this,
            lockedColumns,
            lockedGrid;

        lockable = me.grid.ownerLockable;
        lockedColumns = lockable.lockedGrid.visibleColumnManager.getColumns();

        // User has unlocked all columns and left only the expander column in the locked side.
        if (lockedColumns.length === 1) {
            me.grid = lockedGrid = lockable.lockedGrid;
            lockedGrid.headerCt.insert(0, me.expanderColumn);
        }
    },

    getHeaderConfig: function () {
        var me = this,
            lockable = me.grid.ownerLockable;

        return {
            width: me.headerWidth,
            ignoreExport: true,
            isExpanderColumn: true,
            lockable: false,
            sortable: false,
            resizable: false,
            draggable: false,
            hideable: false,
            menuDisabled: true,
            hidden: this.hiddenColumn,
            tdCls: Ext.baseCSSPrefix + 'grid-cell-special',
            innerCls: Ext.baseCSSPrefix + 'grid-cell-inner-row-expander',
            preinitScope: me,
            preinitFn: function (column) {
                this.expanderColumn = column;
            },
            renderer: function (value, metadata, record) {
                var res = me.renderer.apply(this, arguments);
                if (res === false) {
                    res = "&#160;";
                    me.preventsExpanding[record.internalId] = true;
                }
                else if (res === true) {
                    res = null;
                }

                return res ? res : ('<div class="' + Ext.baseCSSPrefix + 'grid-row-expander" role="presentation"></div>');
            },
            processEvent: function (type, view, cell, rowIndex, cellIndex, e, record) {
                if ((type === "click" && e.getTarget('.' + Ext.baseCSSPrefix + 'grid-row-expander')) || (type === 'keydown' && e.getKey() === e.SPACE)) {
                    me.toggleRow(rowIndex, record);
                    return me.selectRowOnExpand;
                }
            },

            // This column always migrates to the locked side if the locked side is visible.
            // It has to report this correctly so that editors can position things correctly
            isLocked: function () {
                return lockable && (lockable.lockedGrid.isVisible() || this.locked);
            },

            // In an editor, this shows nothing.
            editRenderer: function () {
                return '&#160;';
            }
        };
    },

    isCollapsed: function (row) {
        if (typeof row === "number") {
            row = this.view.getNode(row);
        }

        return Ext.fly(row).hasCls(this.rowCollapsedCls);
    },

    isExpanded: function (row) {
        if (typeof row === "number") {
            row = this.view.getNode(row);
        }

        return !Ext.fly(row).hasCls(this.rowCollapsedCls);
    },

    getComponent: function (record, body) {
        var i, l, item, cmp;

        if (this.componentsCache) {
            for (i = 0, l = this.componentsCache.length; i < l; i++) {
                item = this.componentsCache[i];
                if (item.id == record.internalId) {
                    if (body) {
                        item.cmp.setWidth(body.getWidth() - (this.scrollOffset || 0));
                    }
                    return item.cmp;
                }
            }
        }

        if (this.outerComponentsCache) {
            for (i = 0, l = this.outerComponentsCache.length; i < l; i++) {
                if (this.outerComponentsCache[i].id == record.internalId) {
                    item = this.outerComponentsCache[i];
                    cmp = item.cmp;

                    if (body) {
                        body.appendChild(cmp.getEl());
                        cmp.removeCls("x-hidden");
                        cmp.setWidth(body.getWidth() - (this.scrollOffset || 0));
                        Ext.Array.remove(this.outerComponentsCache, item);
                        this.componentsCache.push(item);
                    }

                    return cmp;
                }
            }
        }

        return null;
    },

    destroy: function () {
        if (this.component && Ext.isFunction(this.component.destroy)) {
            this.component.destroy();
        }

        if (this.componentsCache) {
            this.removeComponents(true);
        }
    },

    fitCmpWidth: function (cmp) {
        if (cmp && cmp.record && this.recordsExpanded[cmp.record.internalId]) {
            body = Ext.get(this.grid.view.getNode(this.grid.store.getByInternalId(cmp.record.internalId))).down("div.x-grid-rowbody");
            cmp.setWidth(body.getWidth() - body.getPadding("lr") - (this.scrollOffset || 0));
        }
    }
});


// @source grid/plugin/SelectionMemory.js

Ext.define('Ext.grid.plugin.SelectionMemory', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.selectionmemory',
    lockableScope: 'normal',

    init: function (grid) {
        if (grid.isLocked || grid.getSelectionMemory) {
            return;
        }

        var me = this;
        this.grid = grid;
        this.headerCt = this.grid.normalGrid ? this.grid.normalGrid.headerCt : this.grid.headerCt;
        this.store = grid.store;
        this.selModel = this.grid.getSelectionModel();
        this.hasPaging = this.grid.down("pagingtoolbar") || this.grid.store.buffered;

        if (this.selModel instanceof Ext.selection.CellModel) {
            this.selModel.onViewRefresh = Ext.emptyFn;
            this.grid.getView().on("beforerefresh", function () {
                this.selModel.selection = null;
            }, this);
        }

        this.grid.getSelectionMemory = function () {
            return me;
        };

        this.selectedIds = {};

        this.selModel.on("select", this.onMemorySelect, this);
        this.selModel.on("deselect", this.onMemoryDeselect, this);
        this.grid.store.on("remove", this.onStoreRemove, this);
        this.grid.store.on("load", this.checkPhantoms, this);
        this.grid.getView().on("refresh", this.memoryReConfigure, this, { single: true });

        this.store.on("add", this.restoreRecordSelection, this);

        this.grid.getView()._onMaskBeforeShow = this.grid.getView().onMaskBeforeShow;
        this.grid.getView().onMaskBeforeShow = Ext.Function.createInterceptor(this.grid.getView().onMaskBeforeShow, this.onMaskBeforeShowBefore, this);
        this.grid.getView().onMaskBeforeShow = Ext.Function.createSequence(this.grid.getView().onMaskBeforeShow, this.onMaskBeforeShowAfter, this);

        this.selModel._onSelectChange = this.selModel.onSelectChange;
        this.selModel.onSelectChange = Ext.Function.createSequence(this.selModel.onSelectChange, this.onSelectChange, this);
    },

    destroy: function () {
        if (this.grid && !this.grid.lockable) {
            this.selModel.un("select", this.onMemorySelect, this);
            this.selModel.un("deselect", this.onMemoryDeselect, this);
            this.store.un("remove", this.onStoreRemove, this);
            this.grid.getView().un("refresh", this.memoryReConfigure, this, { single: true });
            this.grid.getView().onMaskBeforeShow = this.grid.getView()._onMaskBeforeShow;
            this.selModel.onSelectChange = this.selModel._onSelectChange;
        }
    },

    onMaskBeforeShowBefore: function () {
        this.surpressDeselection = true;
    },

    onMaskBeforeShowAfter: function () {
        this.surpressDeselection = false;
    },

    onSelectChange: function (record, isSelected, suppressEvent, commitFn) {
        if (suppressEvent) {
            if (isSelected) {
                this.onMemorySelect(this.selModel, record, this.store.indexOf(record), null);
            }
            else {
                this.onMemoryDeselect(this.selModel, record, this.store.indexOf(record));
            }
        }
    },

    clearMemory: function () {
        delete this.selModel.selectedData;
        this.selectedIds = {};
    },

    memoryReConfigure: function () {
        this.store.on("clear", this.onMemoryClear, this);
        this.store.on("datachanged", function () {
            this.memoryRestoreState();
        }, this, { delay: 100 });
    },

    restoreRecordSelection: function (store, records, index) {
        this.memoryRestoreState(records);
    },

    onMemorySelect: function (sm, rec, idx, column) {
        if (this.selModel.selectionMode == "SINGLE") {
            this.clearMemory();
        }

        if (!Ext.isFunction(rec.getId)) {
            return;
        }

        var id = rec.getId(),
            absIndex = this.getAbsoluteIndex(idx);

        if (id || id === 0) {
            this.onMemorySelectId(sm, absIndex, id, column);
        }
    },

    onMemorySelectId: function (sm, index, id, column) {
        if (!id && id !== 0) {
            return;
        }

        var obj = {
            id: id,
            index: index
        },
        col = Ext.isNumber(column) && this.headerCt.getHeaderAtIndex(column);

        if (col && col.dataIndex) {
            obj.dataIndex = col.dataIndex;
        }

        this.selectedIds[id] = obj;
    },

    getAbsoluteIndex: function (pageIndex) {
        return ((this.store.currentPage - 1) * this.store.pageSize) + pageIndex;
    },

    onMemoryDeselect: function (sm, rec, idx) {
        if (this.surpressDeselection) {
            return;
        }

        if (Ext.isArray(rec)) {
            for (var i = 0; i < rec.length; i++) {
                delete this.selectedIds[rec[i].getId()];
            }
        }
        else {
            delete this.selectedIds[rec.getId()];
        }        
    },

    onStoreRemove: function (store, rec, idx) {
        this.onMemoryDeselect(null, rec, idx);
    },

    memoryRestoreState: function (records) {
        if (this.store !== null && !this.store.isBufferedStore ) {
            var i = 0,
                ind,
                sel = [],
                len,
                all = true,
                cm = this.headerCt;

            if (!records) {
                records = this.store.getRange();
            }

            if (!Ext.isArray(records)) {
                records = [records];
            }

            if (this.selModel.isLocked()) {
                this.wasLocked = true;
                this.selModel.setLocked(false);
            }

            if (this.selModel instanceof Ext.selection.RowModel) {
                for (ind = 0, len = records.length; ind < len; ind++) {
                    var rec = records[ind],
                        id = rec.getId();

                    if ((id || id === 0) && !Ext.isEmpty(this.selectedIds[id])) {
                        sel.push(rec);
                    } else {
                        all = false;
                    }

                    ++i;
                }

                if (sel.length > 0) {
                    this.surpressDeselection = true;
                    this.selModel.select(sel, false, !this.grid.selectionMemoryEvents);
                    this.surpressDeselection = false;
                }
            } else {
                for (ind = 0, len = records.length; ind < len; ind++) {
                    var rec = records[ind],
                        id = rec.getId();

                    if ((id || id === 0) && !Ext.isEmpty(this.selectedIds[id])) {
                        if (this.selectedIds[id].dataIndex) {
                            var colIndex = cm.getHeaderIndex(cm.down('gridcolumn[dataIndex=' + this.selectedIds[id].dataIndex + ']'))
                            this.selModel.setCurrentPosition({
                                row: i,
                                column: colIndex
                            });
                        }
                        return false;
                    }

                    ++i;
                }
            }

            if (this.selModel instanceof Ext.selection.CheckboxModel) {
                if (all) {
                    this.selModel.column.setHeaderStatus(true);
                } else {
                    this.selModel.column.setHeaderStatus(false);
                }
            }

            if (this.wasLocked) {
                this.selModel.setLocked(true);
            }
        }
    },

    onMemoryClear: function () {
        this.selectedIds = {};
    },

    checkPhantoms: function () {
        if (!this.hasPaging) {
            var removeIds = [];
            for (var id in this.selectedIds) {
                if (this.selectedIds.hasOwnProperty(id) && !this.grid.store.getById(id)) {
                    removeIds.push(id);
                }
            }

            if (removeIds.length) {
                for (var i = 0; i < removeIds.length; i++) {
                    delete this.selectedIds[removeIds[i]];
                }
            }
        }
    }
});

// @source grid/plugin/SelectionSubmit.js

Ext.define('Ext.grid.plugin.SelectionSubmit', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.selectionsubmit',
    lockableScope: 'normal',

    statics: {
        getCellContext: function (view, cellConfig) {
            var record,
                column;

            if (cellConfig.isCellContext) {
                return cellConfig;
            }

            if (!Ext.isEmpty(cellConfig.rowIndex)) {
                record = view.panel.store.getAt(cellConfig.rowIndex);
            } else if (!Ext.isEmpty(cellConfig.recordID)) {
                record = view.panel.store.indexOfId(cellConfig.recordID);
            }

            if (!Ext.isEmpty(cellConfig.columnID)) {
                column = view.headerCt.getComponent(cellConfig.columnID);
            } else if (!Ext.isEmpty(cellConfig.columnIndex)) {
                column = view.headerCt.getComponent(cellConfig.columnIndex);
            } else if (!Ext.isEmpty(cellConfig.columnDataIndex)) {
                column = view.headerCt.down("gridcolumn[dataIndex=" + cellConfig.columnDataIndex + "]");
            }

            return new Ext.grid.CellContext(view).setPosition(record, column);
        }
    },

    init: function (grid) {
        if (grid.getSelectionSubmit
            // Locking grids with SpreadsheetModel are supported by SelectionSubmit
            || (grid.isLocked && !(grid.getSelectionModel() instanceof Ext.grid.selection.SpreadsheetModel))) {
            return;
        }

        this.grid = grid;
        this.isTree = this.grid.isTree;
        this.headerCt = this.grid.normalGrid ? this.grid.normalGrid.headerCt : this.grid.headerCt;
        this.store = grid.store;
        this.selModel = this.grid.getSelectionModel();
        var me = this;

        this.grid.getSelectionSubmit = function () {
            return me;
        };

        this.initSelection();
    },

    initSelection: function () {
        var sm = this.grid.getSelectionModel();
        this.hField = this.getSelectionModelField();

        if (sm instanceof Ext.grid.selection.SpreadsheetModel) {
            (this.grid.ownerGrid || this.grid).on("selectionchange", this.updateSelection, this, { buffer: 10 });
        } else {
            sm.on("selectionchange", this.updateSelection, this, { buffer: 10 });
        }

        this.store.on("add", this.updateSelection, this, { buffer: 1 });
        this.store.on("remove", this.updateSelection, this, { buffer: 1 });

        this.grid.getView().on("viewready", this.renderHiddenField, this);
        this.store.on("clear", this.clearField, this);
    },

    renderHiddenField: function () {
        if (this.grid.selectionSubmit && this.grid.getSelectionModel().proxyId) {
            this.getSelectionModelField().render(this.grid.el.parent() || this.grid.el);
        }
        this.initSelectionData();
    },

    clearField: function () {
        this.getSelectionModelField().setValue("");
    },

    getSelectionModelField: function () {
        if (!this.hField) {
            var id = this.selModel.hiddenName || this.selModel.proxyId || this.selModel.id;
            this.hField = new Ext.form.field.Hidden({ name: id });
        }

        return this.hField;
    },

    destroy: function () {
        if (this.hField) {
            this.hField.destroy();

            if (!this.isTree) {
                this.store.un("load", this.doSelection, this);
            }
        }

        if (this.grid && !this.grid.lockable && this.grid.selModel) {
            var sm = this.grid.getSelectionModel();

            if (sm) {
                if (sm instanceof Ext.grid.selection.SpreadsheetModel) {
                    (this.grid.ownerGrid || this.grid).un("selectionchange", this.updateSelection, this);
                } else {
                    sm.un("selectionchange", this.updateSelection, this);
                }
            }

            this.store.un("add", this.updateSelection, this);
            this.store.un("remove", this.updateSelection, this);

            this.grid.getView().un("viewready", this.renderHiddenField, this);
            this.store.un("clear", this.clearField, this);
        }
    },

    doSelection: function () {
        var grid = this.grid,
            cm = this.headerCt,
            store = this.grid.store,
            selModel = grid.getSelectionModel(),
            data = selModel.selectedData,
            notFoundRecords = [],
            records = [];

        if (!Ext.isEmpty(data)) {
            selModel.suspendChanges();
            if (selModel instanceof Ext.selection.CellModel) {
                selModel.setPosition(Ext.grid.plugin.SelectionSubmit.getCellContext(this.headerCt.view, data));
            } else if (selModel instanceof Ext.selection.RowModel) {
                var sMemory = grid.getSelectionMemory && grid.getSelectionMemory(),
                    record;

                for (var i = 0; i < data.length; i++) {
                    if (!Ext.isEmpty(data[i].recordID)) {
                        record = store.getById(data[i].recordID);

                        if (!record && Ext.isNumeric(data[i].recordID)) {
                            record = store.getById(parseInt(data[i].recordID, 10));
                        }

                        if (sMemory) {
                            var idx = data[i].rowIndex || -1;

                            if (!Ext.isEmpty(record)) {
                                idx = this.store.indexOfId(record.getId());
                                idx = sMemory.getAbsoluteIndex(idx);

                                if (idx < 0) {
                                    record = null;
                                }
                            }

                            sMemory.onMemorySelectId(null, idx, data[i].recordID);
                        }
                    } else if (!Ext.isEmpty(data[i].rowIndex)) {
                        record = this.isTree ? store.getRootNode().getChildAt(data[i].rowIndex) : store.getAt(data[i].rowIndex);

                        if (sMemory && !Ext.isEmpty(record)) {
                            sMemory.onMemorySelectId(null, data[i].rowIndex, record.getId());
                        }
                    }

                    if (!Ext.isEmpty(record)) {
                        records.push(record);
                    }
                    else if (this.isTree) {
                        notFoundRecords.push(data[i]);
                    }
                }
                if (records.length == 0) {
                    selModel.deselectAll();
                }
                else {
                    selModel.select(records, false, !this.grid.selectionMemoryEvents);
                }
            } else if (selModel instanceof Ext.grid.selection.SpreadsheetModel) {
                this.doSpreadsheetSelection();
                return;
            }

            this.updateSelection();
            selModel.resumeChanges();
            delete selModel.selectedData;

            if (this.isTree && notFoundRecords.length > 0) {
                selModel.selectedData = notFoundRecords;
                this.store.on("load", this.doSelection, this, { single: true, delay: 10 });
            }

            selModel.maybeFireSelectionChange(records.length > 0);
        }
    },

    doSpreadsheetSelection: function () {
        var grid = this.grid,
            store = this.grid.store,
            selModel = grid.getSelectionModel(),
            data = selModel.selectedData,
            rowsData = data.rows,
            columnsData = data.columns,
            rangeStart = data.rangeStart,
            rangeEnd = data.rangeEnd,
            headerCt,
            records = [],
            columns = [],
            i,
            record,
            column;

        if (rowsData) {
            // Parse rows configs and get records
            for (i = 0; i < rowsData.length; i++) {
                if (!Ext.isEmpty(rowsData[i].recordID)) {
                    record = store.getById(rowsData[i].recordID);

                    if (!record && Ext.isNumeric(rowsData[i].recordID)) {
                        record = store.getById(parseInt(rowsData[i].recordID, 10));
                    }
                } else if (!Ext.isEmpty(rowsData[i].rowIndex)) {
                    record = store.getAt(rowsData[i].rowIndex);
                }

                if (!Ext.isEmpty(record)) {
                    records.push(record);
                }
            }

            // Select rows
            if (records.length == 0) {
                selModel.deselectAll();
            } else {
                selModel.selectRows(records, false, true);
            }
        } else if (columnsData) {
            headerCt = this.headerCt;

            // Parse columns configs and get columns instances
            for (i = 0; i < columnsData.length; i++) {
                if (!Ext.isEmpty(columnsData[i].columnID)) {
                    column = headerCt.getComponent(columnsData[i].columnID);
                } else if (!Ext.isEmpty(columnsData[i].columnDataIndex)) {
                    column = headerCt.down("gridcolumn[dataIndex=" + columnsData[i].columnDataIndex + "]");
                } else if (!Ext.isEmpty(columnsData[i].columnIndex)) {
                    column = headerCt.getComponent(columnsData[i].columnIndex);
                }

                if (!Ext.isEmpty(column)) {
                    columns.push(column);
                }
            }

            // Select columns
            selModel.resetSelection(true);

            for (i = 0; i < columns.length; i++) {
                selModel.selectColumn(columns[i], true, true);
            }
        } else if (rangeStart && rangeEnd) {
            selModel.selectCells(rangeStart, rangeEnd, true);
        }

        this.updateSelection();
        selModel.resumeChanges();
        delete selModel.selectedData;
        selModel.maybeFireSelectionChange(records.length > 0 || columns.length > 0);
    },

    updateSelection: function () {
        var grid = this.grid,
            cm = this.headerCt,
            store = this.grid.store,
            selModel = grid.getSelectionModel(),
            sMemory = grid.getSelectionMemory && grid.getSelectionMemory(),
            rowIndex;

        if (this.grid.selectionSubmit === false) {
            return;
        }

        if (selModel instanceof Ext.selection.RowModel) {
            var records = [];

            if (sMemory && sMemory.selectedIds && !Ext.isEmptyObj(sMemory.selectedIds)) {
                for (var id in sMemory.selectedIds) {
                    if (sMemory.selectedIds.hasOwnProperty(id)) {
                        records.push({ RecordID: sMemory.selectedIds[id].id, RowIndex: sMemory.selectedIds[id].index });
                    }
                }
            } else {
                var selectedRecords = selModel.getSelection();

                for (var i = 0; i < selectedRecords.length; i++) {
                    if (this.isTree) {
                        records.push({ RecordID: selectedRecords[i].getId() });
                    } else {
                        rowIndex = store.indexOf(selectedRecords[i]);
                        records.push({ RecordID: selectedRecords[i].getId(), RowIndex: rowIndex });
                    }
                }
            }

            this.hField.setValue(Ext.encode(records));
        }
        else if (selModel instanceof Ext.selection.CellModel) {
            var pos = selModel.getCurrentPosition(),
                r = pos && this.store.getAt(pos.row);

            if (!pos || !r) {
                this.hField.setValue("");
                return;
            }

            var column = cm.getHeaderAtIndex(pos.column),
                columnDataIndex = column.dataIndex,
                value = r.get(columnDataIndex),
                id = r.getId() || "";

            this.hField.setValue(Ext.encode({
                RecordID: id,
                columnDataIndex: columnDataIndex,
                SubmittedValue: value,
                RowIndex: pos.row,
                ColumnIndex: pos.column,
                ColumnID: column.getId()
            }));
        }
        else if (selModel instanceof Ext.grid.selection.SpreadsheetModel) {
            this.updateSpreadsheetSelection();
        }
    },

    updateSpreadsheetSelection: function () {
        var grid = this.grid,
            selModel = grid.getSelectionModel(),
            selected = selModel.getSelected(),
            data = {},
            values;

        if (selected instanceof Ext.grid.selection.Rows) {
            values = [];

            selected.eachRow(function (record) {
                values.push({
                    rowIndex: this.view.indexOf(record),
                    recordID: record.getId()
                });
            });

            data.rows = values;
        } else if (selected instanceof Ext.grid.selection.Columns) {
            values = [];

            selected.eachColumn(function (column) {
                values.push({
                    columnID: column.getId(),
                    columnDataIndex: column.dataIndex,
                    columnIndex: this.headerCt.items.indexOf(column)
                });
            }, this);

            data.columns = values;
        } else if (selected instanceof Ext.grid.selection.Cells && selected.startCell && selected.endCell) {
            data.rangeStart = {
                columnIndex: selected.startCell.colIdx,
                rowIndex: selected.startCell.rowIdx,
                recordID: selected.startCell.record.getId(),
                columnDataIndex: selected.startCell.column.dataIndex,
                columnID: selected.startCell.column.getId()
            };

            data.rangeEnd = {
                columnIndex: selected.endCell.colIdx,
                rowIndex: selected.endCell.rowIdx,
                recordID: selected.endCell.record.getId(),
                columnDataIndex: selected.endCell.column.dataIndex,
                columnID: selected.endCell.column.getId()
            };
        }

        this.hField.setValue(Ext.encode(data));
    },

    initSelectionData: function () {
        if (this.grid.view.viewReady && this.store) {
            if (this.store.getCount() > 0 || this.isTree) {
                Ext.defer(this.doSelection, 100, this);
            } else {
                this.store.on("load", this.doSelection, this, { single: true, delay: 100 });
            }
        }
    }
});

// @source grid/plugin/HeaderResizer.js

Ext.grid.plugin.HeaderResizer.override({
    afterHeaderRender: function () {
        this.callParent(arguments);

        this.tracker.on("beforedragstart", function (tracker, e) {
            return !e.getTarget('.x-grid-header-widgets', this.headerCt.el);
        }, this);
    }
});
Ext.grid.header.Container.override({
    onHeaderCtEvent: function (e, t) {
        if (e.getTarget('.x-grid-header-widgets', this.el)) {
            return false;
        }

        return this.callParent(arguments);
    },

    afterRender: function () {
        this.callParent(arguments);

        if (this.focusableKeyNav) {
            this._processBinding = this.focusableKeyNav.map.processBinding;
            this.focusableKeyNav.map.processBinding = this.processBinding;
            this.focusableKeyNav.map.ignoreInputFields = true;
        }
    },

    // Addresses issue #1490
    applyScrollable: function (scrollable, oldScrollable) {
        var me = this,
            retVal = me.callParent(arguments);

        // This issue happens in google chrome only.
        // If adding a scrollbar and owning container is set and RTL,
        // then track header scrolling position from view scroll.
        // Support by default if resource manager is set as RTL and grid panel
        // is not rtl=false -- or just if grid panel's rtl=true.
        if (Ext.isChrome && scrollable && me.ownerCt && me.ownerCt.rtl != false && 
            (Ext.net.ResourceMgr.rtl || (me.ownerCt.rtl))) {
            retVal.trackingScrollLeft = me.ownerCt.getScrollX();
            retVal.trackingScrollTop = me.ownerCt.getScrollY();
        }

        return retVal;
    },

    processBinding: function (binding, e) {
        if (e.getTarget('.x-grid-header-widgets', this.el)) {
            return;
        }

        if (this.focusableKeyNav) {
            this._processBinding.apply(this.focusableKeyNav.map, arguments);
        }
    }
});
// @source src/grid/Column/Column.js

Ext.grid.column.Column.override({
    hideTitleEl: false,

    initComponent: function () {
        var me = this;

        if (me.items) {
            this.initHeaderItems();
        }

        if (me.isCellCommand && me.commands && !me.isCommandColumn) {
            me.userRenderer = me.renderer || me.defaultRenderer;
            me.renderer = Ext.Function.bind(me.cellCommandRenderer, me);
        }

        this.callParent(arguments);

        if (!me.renderer && !me.defaultRenderer) {
            me.setPattern(me.pattern, false, true);
        }
    },

    initHeaderItems: function () {
        var me = this;

        me.cls = (me.cls || '') + ' ' + Ext.baseCSSPrefix + 'column-header';
        me.items = [{
            xtype: "container",
            flex: 1,            
            cls: 'x-grid-header-widgets x-group-sub-header',
            border: "1 0 0 0",
            layout: me.layout !== "auto" ? me.layout : "anchor",
            padding: { top: 1, left: 1, right: 1, bottom: 0 },
            defaults: { anchor: "100%" },
            items: me.items
        }];

        me.layout = Ext.apply({
            type: 'hbox'
        });

        me.hasComponentWidgets = true;
    },

    onAdded: function () {
        this.callParent(arguments);

        if (this.ownerCt.isColumn && this.hasComponentWidgets) {
            var item = this.items.first();
            if (item.rendered) {
                item.setStyle("border-top-width", "0px");
            }
            else {
                item.border = 0;
            }
        }
    },

    setPattern: function (pattern, needRefresh, initial) {
        var me = this;

        if (pattern && (initial || me.pattern !== pattern)) {
            me.pattern = pattern;

            if (me.patternTpl) {
                me.patternTpl.destroy();
            }

            me.patternTpl = new Ext.Template(me.pattern, {
                compiled: true
            });

            me.renderer = Ext.bind(function (value) {
                return this.patternTpl.apply({ value: value });
            }, me);

            if (needRefresh !== false) {
                me.ownerCt.view.refresh();
            }
        }
    },

    afterHide: function () {
        this.callParent(arguments);

        Ext.select(".x-grid-cell-" + this.id).addCls("x-hide-command");
    },

    afterShow: function () {
        this.callParent(arguments);

        Ext.select(".x-grid-cell-" + this.id).removeCls("x-hide-command");
    },

    afterRender: function () {
        this.callParent(arguments);

        if (this.hideTitleEl) {
            this.titleEl.setDisplayed(false);
        }
    },

    initRenderData: function () {
        var me = this;

        if (!me.gridRef) {
            me.gridRef = me.up('tablepanel');
        }

        return this.callParent(arguments);
    },

    cellCommandTemplate:
        '<div class="cell-imagecommands <tpl if="rightValue === true">cell-imagecommand-right-value</tpl>">' +
          '<tpl if="rightAlign === true && rightValue === false"><div class="cell-imagecommand-value">{value}</div></tpl>' +
          '<tpl for="commands">' +
             '<div cmd="{command}" class="cell-imagecommand <tpl if="parent.rightAlign === false">left-cell-imagecommand</tpl> {cls} {iconCls} {hideCls}" ' +
             'style="{style}" data-qtip="{qtext}" data-qtitle="{qtitle}">' +
                '<tpl if="text"><span data-qtip="{qtext}" data-qtitle="{qtitle}">{text}</span></tpl>' +
             '</div>' +
          '</tpl>' +
          '<tpl if="rightAlign === false || rightValue === true"><div class="cell-imagecommand-value">{value}</div></tpl>' +
        '</div>',

    getCellCommandTemplate: function () {
        if (Ext.isEmpty(this.cellTemplate)) {
            this.cellTemplate = new Ext.XTemplate(this.cellCommandTemplate);
        }

        return this.cellTemplate;
    },

    processEvent: function (type, view, cell, recordIndex, cellIndex, e) {
        var me = this,
            match = e.getTarget(".cell-imagecommand", 5),
            isClick = type == "click",
            isMouseDown = type == "mousedown";

        if (match) {
            if (isClick) {
                me.onCellCommandClick(view, e, match, cell, recordIndex, cellIndex);
            } else if (isMouseDown) {
                return false;
            }

            if (this.stopSelection != false) {
                return false;
            }
        }

        if (isMouseDown && this.stopSelectionSelectors) {
            var i = 0,
                s = this.stopSelectionSelectors;

            for (i; i < s.length; i++) {
                if (e.getTarget(s[i], cell)) {
                    return false;
                }
            }
        }

        return this.callParent(arguments);
    },

    cellCommandRenderer: function (value, meta, record, row, col, store, view) {
        var me = this;

        if (me.commands && me.commands.length > 0 && me.isCellCommand) {
            var rightAlign = me.rightCommandAlign === false ? false : true,
                preparedCommands = [],
                commands = me.commands,
                i,
                cmd,
                command,
                userRendererValue;

            for (i = 0; i < commands.length; i++) {
                cmd = commands[i];

                if (cmd.iconCls && cmd.iconCls.charAt(0) === '#') {
                    cmd.iconCls = X.net.RM.getIcon(cmd.iconCls.substring(1));
                }
            }

            if (me.prepareCommands) {
                commands = Ext.net.clone(me.commands);
                me.prepareCommands(me.gridRef, commands, record, row, col, value);
            }

            for (i = rightAlign ? (commands.length - 1) : 0; rightAlign ? (i >= 0) : (i < commands.length) ; rightAlign ? i-- : i++) {
                cmd = commands[i];

                cmd.tooltip = cmd.tooltip || {};

                if (cmd.iconCls && cmd.iconCls.charAt(0) === '#') {
                    cmd.iconCls = X.net.RM.getIcon(cmd.iconCls.substring(1));
                }

                command = {
                    command: cmd.command,
                    cls: cmd.cls,
                    iconCls: cmd.iconCls,
                    hidden: cmd.hidden,
                    disabled: cmd.disabled,
                    text: cmd.text,
                    style: cmd.style,
                    qtext: cmd.tooltip.text,
                    qtitle: cmd.tooltip.title,
                    hideMode: cmd.hideMode
                };

                if (me.prepareCommand) {
                    me.prepareCommand(me.gridRef, command, record, row, col, value);
                }

                if (command.disabled) {
                    command.cls = (command.cls || "") + " x-imagecommand-disabled";
                }

                if (command.hidden) {
                    command.hideCls = "x-hidden-" + (command.hideMode || "display");
                }

                preparedCommands.push(command);
            }

            userRendererValue = value;

            if (typeof me.userRenderer === "string") {
                me.userRenderer = Ext.util.Format[me.userRenderer];
            }

            if (typeof me.userRenderer === "function") {
                userRendererValue = me.userRenderer.call(
                    me.rendererScope || me,
                    value,
                    meta,
                    record,
                    row,
                    col,
                    store,
                    view
                );
            }

            meta.tdCls = meta.tdCls || "";
            meta.tdCls += " cell-imagecommand-cell";

            if (me.isHidden()) {
                meta.tdCls += " x-hide-command";
            }

            return me.getCellCommandTemplate().apply({
                commands: preparedCommands,
                value: userRendererValue,
                rightAlign: rightAlign,
                rightValue: me.align == "right"
            });
        } else {
            meta.tdCls = meta.tdCls || "";
            meta.tdCls += " cell-no-imagecommand";
        }

        if (typeof me.userRenderer === "string") {
            me.userRenderer = Ext.util.Format[me.userRenderer];
        }

        if (typeof me.userRenderer === "function") {
            value = me.userRenderer.call(
                me.rendererScope || me.ownerCt,
                value,
                meta,
                record,
                row,
                col,
                store,
                view
            );
        }

        return value;
    },

    onCellCommandClick: function (view, e, target, cell, recordIndex, cellIndex) {
        var cmd = Ext.fly(target).getAttribute("cmd"),
            owner = this.gridRef,
            store = owner.getStore(),
            record = store.getAt ? store.getAt(recordIndex) : view.getRecord(view.getNode(recordIndex));

        if (Ext.isEmpty(cmd, false) || Ext.fly(target).hasCls("x-imagecommand-disabled")) {
            return;
        }

        this.fireEvent("command", this, cmd, record, recordIndex, cellIndex);
    },

    onTitleElDblClick: function(e) { // #685
        var prev;

        if (this.isAtStartEdge(e)) {
            prev = this.previousNode('gridcolumn:not([hidden]):not([isGroupHeader]):not([isCheckerHd])');

            if (prev) {
                this.callParent(arguments);
            }
        } else {
            this.callParent(arguments);
        }
    },

    beforeDestroy: function () {
        if (this.editors) {
            Ext.destroy(this.editors);
        }

        this.callParent(arguments);
    },

    // ExtJS 6.2.0 renamed onDestroy() to doDestroy().
    doDestroy: function () {
        if (this.patternTpl) {
            this.patternTpl.destroy();
        }

        this.callParent(arguments);
    }
});
// @source src/grid/Column/CheckColumn.js

Ext.grid.column.Check.override({
    processEvent: function (type, view, cell, recordIndex, cellIndex, e, record, row) {
        var me = this,
            key = type === "keydown" && e.getKey(),
            isClick = type === me.triggerEvent; // Introduced in ExtJS 6.2.0

        // Flag event to tell SelectionModel not to process it.
        e.stopSelection = !key && me.stopSelection;

        // From this point, the code has heavily been changed from ExtJS
        // There's no issue information on this change, and it has been
        // in code since at least commit 7db83a84.
        // The beforecheckchange event was added on 2ae4f6aa (ExtJS 4.1.1).
        if (!me.disabled && !!me.editable && (isClick || (key === e.ENTER || key === e.SPACE))) {
            var store = view.panel.store,
                dataIndex = me.dataIndex,
                checked = !me.isRecordChecked(record),
                eventTarget = view.panel.editingPlugin || view.panel;

            var ev = {
                grid   : view.panel,
                record : record,
                field  : dataIndex,
                value  : !checked,
                row    : row,
                column : me,
                rowIdx : recordIndex,
                colIdx : cellIndex,
                cancel : false
            };

            // Allow apps to hook beforecheckchange and beforeedit
            // Updated from ExtJS 6.0.2 to ExtJS 6.2.0
            if (me.fireEvent("beforecheckchange", me, recordIndex, record, checked, record, e) === false
	            || eventTarget.fireEvent("beforeedit", eventTarget, ev) === false
		        || ev.cancel === true) {

                return;
            }

            ev.originalValue = ev.value;
            ev.value = checked;

            if (eventTarget.fireEvent("validateedit", eventTarget, ev) === false || ev.cancel === true) {
                return;
            }

            if (me.singleSelect) {
                store.suspendEvents();

                store.each(function (record, i) {
                    var value = (i == recordIndex);

                    if (value != me.isRecordChecked(record)) {
                        record.set(dataIndex, value);
                    }
                });

                store.resumeEvents();
                store.fireEvent("datachanged", store);
            } else {
                // ExtJS 6.2.0 introduced recordIndex parameter below
                me.setRecordCheck(record, recordIndex, checked, cell, row, e);
            }

            // Introduced on ExtJS 6.2.0 ('if' block below)
            // Do not allow focus to follow from this mousedown unless the grid is already in actionable mode
            if (isClick && !view.actionableMode) {
                e.preventDefault();
            }
            
            // Updated from ExtJS 6.0.2 to ExtJS 6.2.0
            if (me.hasListeners.checkchange) {
                me.fireEvent("checkchange", me, recordIndex, record, checked, record, e);
            }
            
            eventTarget.fireEvent("edit", eventTarget, ev);
        } else {
            return this.callSuper(arguments);
        }
    }
});



// @source src/grid/Column/HyperlinkColumn.js

Ext.define('Ext.grid.column.Hyperlink', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.hyperlinkcolumn'],

    defaultRenderer: function (value, metadata, record) {        
        var me = this,
            data = {
                text: value,
                href: record.data[me.dataIndexHref]
            };

        if (!me.patternTpl) {
            me.updatePatternTpl();
        }

        return me.patternTpl.apply(data);
    },

    updatePatternTpl: function() {
        var me = this,
            html = "<a href='{0}' target='{1}'>{2}</a>";

        if (me.patternTpl) {
            me.patternTpl.destroy();
        }

        html = Ext.String.format(html, me.hrefPattern || "{href}", me.hrefTarget || "_blank", me.textPattern || "{text}");
        me.patternTpl = new Ext.Template(html, {
            compiled: true
        });
    }
});


Ext.define('Ext.ux.grid.column.ProgressBar', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.progressbarcolumn',
    cls: 'x-progress-column',
    progressCls: 'x-progress',
    progressText: '{0} %',
    hideIfEmpty: false,

    constructor: function () {
        var me = this;
        me.callParent(arguments);
        me.renderer = Ext.Function.bind(me.renderer, me);
        me.on("resize", this.onColumnResize);
    },

    initRenderData: function () {
        var me = this;
        me.gridRef = me.up('tablepanel');
        me.view = me.gridRef.getView();

        return me.callParent(arguments);
    },

    renderer: function (value, meta) {
        var me = this,
            text,
            cls = me.progressCls,
            pCls,
            cWidth = me.getWidth(true) - 2;

        if (me.hideIfEmpty && (!value && value !== 0 || value < 0)) {
            return "";
        }

        value = value || 0;

        text = Ext.String.format(me.progressText, Math.round(value * 100));

        pCls = cls + ' ' + cls + '-' + me.ui;
        meta.tdCls = "x-progress-column-cell";
        meta.style = "padding:0px;margin:0px;";
        v = '<div class="' + pCls + '" style="margin:1px 1px 1px 1px;width:' + cWidth + 'px;"><div class="' + cls + '-text ' + cls + '-text-back" style="width:' + (cWidth - 2) + 'px;">' +
                text +
            '</div>' +
            '<div class="' + cls + '-bar ' + cls + '-bar-' + me.ui + '" style="width: ' + value * 100 + '%;">' +
                '<div class="' + cls + '-text" style="width:' + (cWidth - 2) + 'px;">' +
                    '<div>' + text + '</div>' +
                '</div>' +
            '</div></div>'
        return v;
    },

    getCellSelector: function () {
        return '.' + Ext.baseCSSPrefix + 'grid-cell-' + this.getItemId();
    },

    onColumnResize: function () {
        var me = this,
            cls = me.progressCls,
            cWidth = me.getWidth(true) - 2,
            view = me.view;

        view.el.select(view.getCellInnerSelector(this) + " > div." + cls).setWidth(cWidth);
        view.el.select(view.getCellInnerSelector(this) + " div." + cls + "-text").setWidth(cWidth - 2);
    }
});
Ext.define('Ext.grid.column.ImageCommand', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.imagecommandcolumn',
    commandWidth: 18,
    dataIndex: "",
    menuDisabled: true,
    sortable: false,
    hideable: false,
    isColumn: true,
    isCommandColumn: true,
    adjustmentWidth: 4,

    constructor: function (config) {
        var me = this;
        me.callParent(arguments);


        me.commands = me.commands || [];

        if (me.autoWidth) {
            me.width = me.minWidth = me.commandWidth * me.commands.length + me.adjustmentWidth;
            me.fixed = true;
        }

        me.renderer = Ext.Function.bind(me.renderer, me);
    },

    initRenderData: function () {
        var me = this;
        me.gridRef = me.up('tablepanel');
        me.gridRef.addCls("x-grid-group-imagecommand");
        var groupFeature = me.getGroupingFeature(me.gridRef);

        if (me.groupCommands && groupFeature) {
            me.gridRef.view.on('groupclick', me.onGroupClick, me);
            me.gridRef.view.on('containerclick', me.onClick, me);

            if (Ext.isString(groupFeature.groupHeaderTpl)) {
                groupFeature.groupHeaderTpl = '<div class="group-row-imagecommand-cell">' + groupFeature.groupHeaderTpl + '</div>' + this.groupCommandTemplate;
            } else if (groupFeature.groupHeaderTpl && groupFeature.groupHeaderTpl.html) {
                groupFeature.groupHeaderTpl.html = '<div class="group-row-imagecommand-cell">' + groupFeature.groupHeaderTpl.html + '</div>' + this.groupCommandTemplate;
            }

            groupFeature.commandColumn = me;
            groupFeature.setupRowData = Ext.Function.createSequence(groupFeature.setupRowData, this.getGroupData, this);
        }

        return me.callParent(arguments);
    },

    afterHide: function () {
        this.callParent(arguments);

        Ext.select(".x-grid-cell-" + this.id).addCls("x-hide-command");
    },

    afterShow: function () {
        this.callParent(arguments);

        Ext.select(".x-grid-cell-" + this.id).removeCls("x-hide-command");
    },

    getGroupData: function (record, idx, rowValues) {
        var preparedCommands = [],
            i,
            cmd,
            command,
            groupCommands = this.groupCommands;

        if (!rowValues.isFirstRow) {
            return;
        }

        for (i = 0; i < groupCommands.length; i++) {
            cmd = groupCommands[i];

            if (cmd.iconCls && cmd.iconCls.charAt(0) === '#') {
                cmd.iconCls = X.net.RM.getIcon(cmd.iconCls.substring(1));
            }
        }

        //group.cls = (group.cls || "") + " group-imagecmd-ct";

        var groupId = record.get(this.getGroupingFeature(this.gridRef).refreshData.groupField),
            records = groupId ? this.gridRef.store.getGroups().get(groupId).items : null;

        if (this.prepareGroupCommands) {
            groupCommands = Ext.net.clone(this.groupCommands);
            this.prepareGroupCommands(this.gridRef, groupCommands, groupId, records);
        }

        for (i = 0; i < groupCommands.length; i++) {
            cmd = groupCommands[i];

            cmd.tooltip = cmd.tooltip || {};

            if (cmd.iconCls && cmd.iconCls.charAt(0) === '#') {
                cmd.iconCls = X.net.RM.getIcon(cmd.iconCls.substring(1));
            }

            command = {
                command: cmd.command,
                cls: cmd.cls,
                iconCls: cmd.iconCls,
                hidden: cmd.hidden,
                disabled: cmd.disabled,
                text: cmd.text,
                style: cmd.style,
                qtext: cmd.tooltip.text,
                qtitle: cmd.tooltip.title,
                hideMode: cmd.hideMode,
                rightAlign: cmd.rightAlign || false
            };

            if (this.prepareGroupCommand) {
                this.prepareGroupCommand(this.gridRef, command, groupId, records);
            }

            if (command.iconCls && command.iconCls.charAt(0) === '#') {
                command.iconCls = X.net.RM.getIcon(command.iconCls.substring(1));
            }

            if (command.disabled) {
                command.cls = (command.cls || "") + " x-imagecommand-disabled";
            }

            if (command.hidden) {
                var hideMode = command.hideMode || "display";
                command.hideCls = "x-hidden-" + hideMode;
            }

            if (command.rightAlign) {
                command.align = "right-group-imagecommand";
            } else {
                command.align = "";
            }

            preparedCommands.push(command);
        }
        rowValues.metaGroupCache.commands = preparedCommands;
    },

    getGroupingFeature: function (grid) {
        return grid.groupingFeature;
    },

    processEvent: function (type, view, cell, recordIndex, cellIndex, e) {
        if ((type === "click") && e.getTarget(".row-imagecommand", 3)) {
            this.onClick(view, e, recordIndex, cellIndex);

            if (this.stopSelection !== false) {
                var sm = this.gridRef.getSelectionModel(),
                    locked = sm.locked;

                sm.locked = true;
                Ext.defer(function () {
                    sm.locked = locked;
                }, 1);
            }
        }

        return this.callParent(arguments);
    },

    onGroupClick: function (view, rowElement, groupName, e) {
        var t = e.getTarget(".group-row-imagecommand"),
            cmd;

        if (t) {
            var groupField = this.gridRef.store.groupField;

            cmd = Ext.fly(t).getAttribute("cmd");

            if (Ext.isEmpty(cmd, false) || Ext.fly(t).hasCls("x-imagecommand-disabled")) {
                return;
            }

            this.fireEvent("groupcommand", this, cmd, this.gridRef.store.getGroups().get(groupName));
        }

        return !t;
    },

    onClick: function (view, e, recordIndex, cellIndex) {
        var view = this.gridRef.getView(),
            cmd,
            record,
            recordId,
            t = e.getTarget(".row-imagecommand");

        if (t) {
            cmd = Ext.fly(t).getAttribute("cmd");

            if (Ext.isEmpty(cmd, false) || Ext.fly(t).hasCls("x-imagecommand-disabled")) {
                return;
            }

            var row = e.getTarget(".x-grid-row");

            if (row === false) {
                return;
            }

            if (this !== this.gridRef.headerCt.getHeaderAtIndex(cellIndex)) {
                return;
            }

            recordId = Ext.fly(t).getAttribute("recordId");
            if (recordId && this.gridRef.store.getAt) {
                record = this.gridRef.store.getByInternalId(recordId);
            }
            else {
                record = this.gridRef.store.getAt ? this.gridRef.store.getAt(recordIndex) : view.getRecord(view.getNode(recordIndex));
            }

            this.fireEvent("command", this, cmd, record, recordIndex, cellIndex);
        }

        t = e.getTarget(".group-row-imagecommand");

        if (t) {
            var groupField = this.gridRef.store.groupField,
                groupId = Ext.fly(t).getAttribute("data-groupname");

            cmd = Ext.fly(t).getAttribute("cmd");

            if (Ext.isEmpty(cmd, false) || Ext.fly(t).hasCls("x-imagecommand-disabled")) {
                return;
            }

            this.fireEvent("groupcommand", this, cmd, this.gridRef.store.getGroups().get(groupId));
        }
    },

    renderer: function (value, meta, record, row, col, store) {
        var node;

        meta.tdCls = meta.tdCls || "";
        meta.tdCls += " row-imagecommand-cell";

        if (meta) {
            meta.tdCls = meta.tdCls || "";
            meta.tdCls += " row-imagecommand-cell";
        }
        else {
            node = view.getNode(record);

            if (node) {
                node = Ext.fly(node).down("td[data-columnid=" + this.id + "]");
                if (node) {
                    node.addCls("row-imagecommand-cell");
                }
            }
        }

        if (this.isHidden()) {
            if (meta) {
                meta.tdCls += " x-hide-command";
            }
            else if (node) {
                node.addCls("x-hide-command");
            }
        }

        if (this.commands) {
            var preparedCommands = [],
                i,
                cmd,
                command,
                commands = this.commands;

            for (i = 0; i < commands.length; i++) {
                cmd = commands[i];

                if (cmd.iconCls && cmd.iconCls.charAt(0) === '#') {
                    cmd.iconCls = X.net.RM.getIcon(cmd.iconCls.substring(1));
                }
            }

            if (this.prepareCommands) {
                commands = Ext.net.clone(this.commands);
                this.prepareCommands(this.gridRef, commands, record, row);
            }

            for (i = 0; i < commands.length; i++) {
                cmd = commands[i];

                cmd.tooltip = cmd.tooltip || {};

                if (cmd.iconCls && cmd.iconCls.charAt(0) === '#') {
                    cmd.iconCls = X.net.RM.getIcon(cmd.iconCls.substring(1));
                }

                command = {
                    command: cmd.command,
                    recordId: record.internalId,
                    cls: cmd.cls,
                    iconCls: cmd.iconCls,
                    hidden: cmd.hidden,
                    disabled: cmd.disabled,
                    text: cmd.text,
                    style: cmd.style,
                    qtext: cmd.tooltip.text,
                    qtitle: cmd.tooltip.title,
                    hideMode: cmd.hideMode
                };

                if (this.prepareCommand) {
                    this.prepareCommand(this.gridRef, command, record, row);
                }

                if (command.iconCls && command.iconCls.charAt(0) === '#') {
                    command.iconCls = X.net.RM.getIcon(command.iconCls.substring(1));
                }

                if (command.disabled) {
                    command.cls = (command.cls || "") + " x-imagecommand-disabled";
                }

                if (command.hidden) {
                    var hideMode = command.hideMode || "display";
                    command.hideCls = "x-hidden-" + hideMode;
                }

                if (Ext.isIE6 && Ext.isEmpty(cmd.text, false)) {
                    command.noTextCls = "no-row-imagecommand-text";
                }

                preparedCommands.push(command);
            }

            return this.getRowTemplate().apply({ commands: preparedCommands });
        }
        return "";
    },

    commandTemplate:
        '<div class="row-imagecommands">' +
          '<tpl for="commands">' +
             '<div recordId="{recordId}" cmd="{command}" class="row-imagecommand {cls} {noTextCls} {iconCls} {hideCls}" ' +
             'style="{style}" data-qtip="{qtext}" data-qtitle="{qtitle}">' +
                '<tpl if="text"><span data-qtip="{qtext}" data-qtitle="{qtitle}">{text}</span></tpl>' +
             '</div>' +
          '</tpl>' +
        '</div>',

    groupCommandTemplate:
         '<tpl for="commands">' +
            '<div cmd="{command}" class="group-row-imagecommand {cls} {iconCls} {hideCls} {align}" ' +
              'style="{style}" data-qtip="{qtext}" data-qtitle="{qtitle}"><tpl if="text"><span data-qtip="{qtext}" data-qtitle="{qtitle}">{text}</span></tpl></div>' +
         '</tpl>',

    getRowTemplate: function () {
        if (Ext.isEmpty(this.rowTemplate)) {
            this.rowTemplate = new Ext.XTemplate(this.commandTemplate);
        }

        return this.rowTemplate;
    }
});
Ext.define("Ext.grid.column.CommandColumn", {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.commandcolumn',

    dataIndex: "",
    menuDisabled: true,
    sortable: false,
    autoWidth: false,
    hideable: false,
    isColumn: true,
    isCommandColumn: true,
    showDelay: 250,
    hideDelay: 500,
    overOnly: false,

    constructor: function (config) {
        var me = this;
        me.callParent(arguments);

        me.cache = [];
        me.commands = me.commands || [];

        me.renderer = Ext.Function.bind(me.renderer, me);
    },

    renderer: function (value, meta, record, row, col, store) {
        if (meta) {
            meta.tdCls = meta.tdCls || "";
            meta.tdCls += " row-cmd-cell";
        }
        else {
            var node = view.getNode(record);

            if (node) {
                node = Ext.fly(node).down("td[data-columnid=" + this.id + "]");
                if (node) {
                    node.addCls("row-cmd-cell");
                }
            }
        }

        if (this.overOnly) {
            return "<div class='row-cmd-placeholder'>" + this.overRenderer(value, meta, record, row, col, store) + "</div>";
        }

        return "";
    },

    overRenderer: function (value, meta, record, row, col, store) {
        if (this.placeholder) {

        } else {
            return "<div class='x-over-commands-ph'></div>";
        }
    },

    initRenderData: function () {
        var me = this;
        me.gridRef = me.up('tablepanel');
        me.gridRef.addCls("x-grid-componentcolumn");
        me.view = me.gridRef.getView();
        var groupFeature = me.getGroupingFeature(me.gridRef);

        if (me.commands) {
            if (me.overOnly) {
                me.view.on("beforerefresh", me.moveToolbar, me);
                me.view.on("beforeitemupdate", me.moveToolbar, me);
                me.view.on("beforeitemremove", me.moveToolbar, me);

                me.view.on("itemmouseenter", me.onItemMouseEnter, me);
                me.view.on("itemmouseleave", me.onItemMouseLeave, me);
            } else {
                me.shareMenus(me.commands, "initMenu");

                me.view.on("beforerefresh", me.removeToolbars, me);
                me.view.on("refresh", me.insertToolbars, me, { buffer: 10 });

                me.view.on("beforeitemupdate", me.removeToolbar, me);

                me.view.on("beforeitemremove", me.beforeItemRemove, me);
                me.view.on("itemadd", me.itemAdded, me);
                me.view.on("itemupdate", me.itemUpdated, me);
            }
        }

        if (me.groupCommands && groupFeature) {
            me.shareMenus(me.groupCommands, "initGroupMenu");

            if (Ext.isString(groupFeature.groupHeaderTpl)) {
                groupFeature.groupHeaderTpl = '<div class="standard-view-group">' + groupFeature.groupHeaderTpl + '</div>';
            } else if (groupFeature.groupHeaderTpl && groupFeature.groupHeaderTpl.html) {
                groupFeature.groupHeaderTpl.html = '<div class="standard-view-group">' + groupFeature.groupHeaderTpl.html + '</div>';
            }

            groupFeature.doCollapseExpand = Ext.Function.createInterceptor(groupFeature.doCollapseExpand, this.beforeCollapseExpand, this);

            if (!me.commands || me.overOnly) {
                me.view.on("beforerefresh", me.removeToolbars, this);
            }

            me.view.on("refresh", me.insertGroupToolbars, this, { buffer: 10 });
            me.view.on("groupcollapse", me.insertGroupToolbar, this);
            me.view.on("groupexpand", me.insertGroupToolbar, this);
            me.mon(me.gridRef, "resize", me.onGridResize, me);

            me.view.on('groupclick', me.groupToolbarClick);

            me.view.on("beforeitemupdate", me.groupRemoveToolbar, me);
            me.view.on("itemupdate", me.groupItemUpdated, me);
        }

        if (me.gridRef.isTree || me.gridRef.ownerLockable && me.gridRef.ownerLockable.isTree) {
            me._cnrScope = { column: me, root: false };
            me.gridRef.on("beforeitemcollapse", me.removeNodeToolbars, me._cnrScope);
            me._crScope = { column: me, root: true };
            me.gridRef.on("beforeitemmove", me.removeNodeToolbars, me._crScope);
        }

        if (me.view.bufferedRenderer && ((me.commands && !me.overOnly) || (me.groupCommands && groupFeature))) {
            Ext.Function.interceptBefore(me.view.all, "scroll", me.beforeScroll, me);
            Ext.Function.interceptAfter(me.view.all, "scroll", Ext.Function.createBuffered(me.afterScroll, 200, me), me);
            Ext.Function.interceptBefore(me.view.all, "clear", me.beforeAllClear, me);

            Ext.Function.interceptAfter(me.view, "doAdd", Ext.Function.createBuffered(me.afterViewAdd, 50, me));
        }

        return me.callParent(arguments);
    },

    beforeAllClear: function (removeDom) {
        if (this.destroyed) {
            return;
        }

        if (removeDom) {
            this.removeToolbars();
        }
    },

    beforeScroll: function (newRecords, direction, removeCount) {
        var me = this;

        // Tracks scrolling while the renderer is buffered to avoid
        // unnecessary rows toolbars' creation and removals.
        me.scrollingBuffer = me.view && me.view.bufferedRenderer;

        if (this.destroyed) {
            return;
        }

        var i,
            removeEnd,
            nc = me.view.all,
            elements = nc.elements;

        if (direction == -1) {
            for (i = (nc.endIndex - removeCount) + 1; i <= nc.endIndex; i++) {
                me.removeToolbar(me.view, me.view.getRecord(elements[i]));
            }
        }
        else {
            removeEnd = nc.startIndex + removeCount;
            for (i = nc.startIndex; i < removeEnd; i++) {
                me.removeToolbar(me.view, me.view.getRecord(elements[i]));
            }
        }

        this.removeGroupToolbars();
    },

    afterScroll: function (newRecords, direction, removeCount) {
        var me = this;

        // Only fiddle with scrolling buffer if we are actually scrolling
        // a buffered view.
        if (me.scrollingBuffer) {
            me.scrollingBuffer = false;
        }

        if (this.destroyed) {
            return;
        }

        var i,
            recCount = newRecords.length;

        for (i = 0; i < recCount; i++) {
            me.insertToolbarForRecord(newRecords[i]);
        }

        this.insertGroupToolbars();
    },

    afterViewAdd: function (records, index) {
        if (this.destroyed) {
            return;
        }

        var me = this,
            count = records.length,
            i;

        for (i = 0; i < count; i++) {
            me.insertToolbarForRecord(records[i]);
        }
    },

    beforeCollapseExpand: function (collapsed, groupName, focus) {
        if (this.destroyed) {
            return;
        }

        var me = this,
            groupFeature = me.getGroupingFeature(me.gridRef),
            group = groupFeature.getCache()[groupName];

        if (group.isCollapsed != collapsed) {
            this.removeGroupToolbar(groupName);
        }
    },

    groupToolbarClick: function (view, group, idx, e, options) {
        return !e.getTarget('.x-toolbar', view.el);
    },

    onGridResize: function () {
        for (var i = 0, l = this.cache.length; i < l; i++) {
            if (this.cache[i].groupId) {
                this.cache[i].updateLayout();
            }
        }
    },

    processEvent: function (type, view, cell, recordIndex, cellIndex, e) {
        var me = this,
            match = e.getTarget(".row-cmd-cell", view.el);

        if (match && (type == 'click' || type == 'mousedown') && me.stopSelection !== false) {
            return false;
        }

        return me.callParent(arguments);
    },

    onItemMouseLeave: function (view, record, item, index, e) {
        var me = this;

        if (me.showDelayTask) {
            clearTimeout(me.showDelayTask);
            delete me.showDelayTask;
        }

        if (me.hideDelay) {
            if (me.hideDelayTask) {
                clearTimeout(me.hideDelayTask);
            }

            me.hideDelayTask = setTimeout(function () {
                me.hideToolbar(view, record, item, index, e);
            }, me.hideDelay);
        } else {
            me.hideToolbar(view, record, item, index, e);
        }
    },

    moveToolbar: function () {
        this.hideToolbar();
    },

    hideToolbar: function (view, record, item, index, e) {
        delete this.hideDelayTask;

        if (this.showDelayTask) {
            clearTimeout(this.showDelayTask);
            delete this.showDelayTask;
        }
        if (this.overToolbar && this.overToolbar.rendered && this.overToolbar.hidden !== true) {
            if (!item) {
                this.doToolbarHide();
                return;
            }

            var isVisible = false,
                menu;
            this.overToolbar.items.each(function (button) {
                if (button && button.menu && button.menu.isVisible()) {
                    isVisible = true;
                    menu = button.menu;
                    return false;
                }
            });

            if (isVisible) {
                menu.on("hide", function () {
                    this.column.doToolbarHide(this.item);
                }, { column: this, item: item }, { single: true });
                return;
            }

            this.doToolbarHide(item);
        }
    },

    getRenderTarget: function (node) {
        var td = this.select(node)[0];
        return td ? Ext.get(td).first("div") : null;
    },

    doToolbarHide: function (item) {
        var ce = this.overToolbar.getEl(),
            el = Ext.net.ResourceMgr.getAspForm() || Ext.getBody(),
            div = item ? this.getRenderTarget(item) : null;

        this.restoreLastPlaceholder();

        if (div) {
            div.down('.row-cmd-placeholder').removeCls("x-hidden-display");
        }

        this.overToolbar.addCls("x-hidden-display");
        this.overToolbar.hidden = true;

        el.dom.appendChild(ce.dom);
    },

    onItemMouseEnter: function (view, record, item, index, e) {
        var me = this;

        if (me.hideDelayTask) {
            clearTimeout(me.hideDelayTask);
            delete me.hideDelayTask;
        }

        if (me.showDelay) {
            if (me.showDelayTask) {
                clearTimeout(me.showDelayTask);
            }

            me.showDelayTask = setTimeout(function () {
                me.showToolbar(view, record, item, index, e);
            }, me.showDelay);
        } else {
            me.showToolbar(view, record, item, index, e);
        }
    },

    restoreLastPlaceholder: function () {
        if (this.lastToolbarDiv) {
            if (this.lastToolbarDiv.dom) {
                try {
                    this.lastToolbarDiv.down('.row-cmd-placeholder').removeCls("x-hidden-display");
                } catch (e) { }
            }
            delete this.lastToolbarDiv;
        }
    },

    showToolbar: function (view, record, item, index, e) {
        delete this.showDelayTask;

        if (this.hideDelayTask) {
            clearTimeout(this.hideDelayTask);
            delete this.hideDelayTask;
        }

        if (!this.overToolbar && this.commands) {
            this.overToolbar = Ext.create("Ext.toolbar.Toolbar", {
                ui: "flat",
                items: this.commands,
                enableOverflow: false,
                focusable: false,
                defaults: {
                    focusable: false
                },
                layout: {
                    pack: this.pack
                }
            });
        }

        if (this.overToolbar) {
            var toolbar = this.overToolbar,
                div = this.getRenderTarget(item);

            this.restoreLastPlaceholder();

            this.lastToolbarDiv = div;
            if (div) {
                div.down('.row-cmd-placeholder').addCls("x-hidden-display");
                div.addCls("row-cmd-cell-ct");
            }

            if (toolbar.rendered && div) {
                div.appendChild(toolbar.getEl());
            } else {
                if (div) {
                    toolbar.render(div);
                }

                toolbar.items.each(function (button) {
                    if (button.on) {
                        button.toolbar = toolbar;

                        if (button.standOut) {
                            button.on("mouseout", function () {
                                this.getEl().addCls("x-btn-over");
                            }, button);
                        }

                        if (!Ext.isEmpty(button.command, false)) {
                            button.on("click", function () {
                                var i = 0;
                                if (this.toolbar.grid.store.indexOf) {
                                    i = this.toolbar.grid.store.indexOf(this.toolbar.record);
                                }
                                else if (this.toolbar.record.parentNode) {
                                    i = this.toolbar.record.parentNode.indexOf(this.toolbar.record);
                                }
                                this.toolbar.column.fireEvent("command", toolbar.column, this.command, this.toolbar.record, i);
                            }, button);
                        }

                        if (button.menu && !button.menu.shared) {
                            this.initMenu(button.menu, toolbar);
                        }
                    }
                }, this);
            }

            this.overToolbar.removeCls("x-hidden-display");
            this.overToolbar.hidden = false;

            toolbar.record = record;

            toolbar.items.each(function (button) {
                if (button && button.menu && button.menu.isVisible()) {
                    button.menu.hide();
                }
            });

            if ((this.prepareToolbar && this.prepareToolbar(this.gridRef, toolbar, index, record) === false) || !div) {
                this.hideToolbar();
                return;
            }

            toolbar.grid = this.gridRef;
            toolbar.column = this;
            toolbar.rowIndex = index;
            toolbar.record = record;
        }
    },

    getGroupingFeature: function (grid) {
        return grid.groupingFeature;
    },

    itemUpdated: function (record, index, node) {
        this.insertToolbarForRecord(record, node);
    },

    itemAdded: function (records, index, nodes, view) {
        var me = this;

        // Should obey itemAdded event if it has been triggered by anything,
        // except if it was to render buffered view rows.
        if (!me.scrollingBuffer) {
            for (var i = 0, len = records.length; i < len; i++) {
                me.insertToolbarForRecord(records[i], nodes && nodes[i], i === (len - 1));
            }
        }
    },

    beforeItemRemove: function (records, index, nodes, view) {
        var me = this;

        // Should obey beforeItemRemove event if it has been triggered by
        // anything, except if it was to cleanup rendered rows in buffered view
        if (!me.scrollingBuffer) {
            me.removeToolbar.apply(me, arguments)
        }
    },

    select: function (row) {
        var classSelector = "x-grid-cell-" + this.id + ".row-cmd-cell",
            el = row ? Ext.fly(row) : this.gridRef.getEl();
        return el.query("td." + classSelector);
    },

    shareMenus: function (items, initMenu) {
        Ext.each(items, function (item) {
            if (item.menu) {
                if (item.menu.shared) {
                    item.menu.autoDestroy = false;
                    //item.autoDestroy = false;
                    item.destroyMenu = false;

                    item.onMenuShow = Ext.emptyFn;

                    item.showMenu = function (fromEvent) {
                        var me = this,
                            menu = me.menu;
                        if (this.rendered && this.menu) {
                            if (this.tooltip && Ext.quickTipsActive && me.getTipAttr() != 'title') {
                                Ext.tip.QuickTipManager.getQuickTip().cancelShow(me.el);
                            }

                            if (menu.isVisible()) {
                                menu.hide();
                            }

                            if (!fromEvent || me.showEmptyMenu || menu.items.getCount() > 0) {
                                menu.showBy(me.el, me.menuAlign);
                            }

                            this.menu.ownerCt = this;
                            this.ignoreNextClick = 0;
                            this.addCls(this._menuActiveCls);
                            this.fireEvent('menushow', this, this.menu);
                        }
                        return this;
                    };

                    item.menu = Ext.ComponentMgr.create(item.menu, "menu");
                    this.sharedMenus = this.sharedMenus || [];
                    this.sharedMenus.push(item.menu);
                    this[initMenu](item.menu, null, true);
                } else {
                    this.shareMenus(item.menu.items || []);
                }
            }
        }, this);
    },

    insertGroupToolbar: function (view, div) {
        var toolbar;

        if (this.groupCommands) {
            if (!div) {
                return;
            }

            div = Ext.get(div);

            var groupId = div.getAttribute("data-groupname"),
                i = 0;

            this.removeGroupToolbar(groupId);

            toolbar = new Ext.toolbar.Toolbar({
                items: this.groupCommands,
                ui: "flat",
                enableOverflow: false
            });

            this.cache.push(toolbar);

            if (div.dom.className.indexOf("row-cmd-cell-group-ct") < 0) {
                div.dom.className += " row-cmd-cell-group-ct";
            }
            //div.addCls("row-cmd-cell-group-ct");
            toolbar.render(div);

            var records = this.getRecords(groupId);

            if (this.prepareGroupToolbar && this.prepareGroupToolbar(this.gridRef, toolbar, groupId, records) === false) {
                toolbar.destroy();
                return;
            }

            toolbar.grid = this.gridRef;
            toolbar.column = this;
            toolbar.groupId = groupId;

            toolbar.items.each(function (button) {
                if (button.on) {
                    button.toolbar = toolbar;
                    button.column = this;

                    if (button.standOut) {
                        button.on("mouseout", function () {
                            this.getEl().addCls("x-btn-over");
                        }, button);
                    }

                    if (!Ext.isEmpty(button.command, false)) {
                        button.on("click", function () {
                            this.toolbar.column.fireEvent("groupcommand", this.toolbar.column, this.command, this.toolbar.grid.store.getGroups().get(this.toolbar.groupId));
                        }, button);
                    }

                    if (button.menu && !button.menu.shared) {
                        this.initGroupMenu(button.menu, toolbar);
                    }
                }
            }, this);
        }
    },

    insertToolbarForRecord: function (record, node, refreshSize) {
        if (this.commands) {

            var toolbar,
                view = this.view,
                div,
                i;

            if (record.isCollapsedPlaceholder) {
                return;
            }

            if (!node) {
                node = this.view.getNode(record, true);
            }

            if (!node) {
                return;
            }

            div = Ext.fly(node).down(this.getCellSelector() + " div");

            if (!div) {
                return;
            }

            if (view.store.indexOf) {
                i = view.store.indexOf(record);
            }
            else if (record.parentNode) {
                i = record.parentNode.indexOf(record);
            }

            this.removeToolbar(view, record, i);

            toolbar = Ext.create("Ext.toolbar.Toolbar", {
                items: this.commands,
                ui: "flat",
                enableOverflow: false,
                focusable: false,
                defaults: {
                    focusable: false
                },
                layout: {
                    pack: this.pack
                }
            });

            this.cache.push(toolbar);

            div.dom.innerHTML = "";

            if (div.dom.className.indexOf("row-cmd-cell-ct") < 0) {
                div.dom.className += " row-cmd-cell-ct";
            }
            //div.addCls("row-cmd-cell-ct");

            toolbar.render(div);
            toolbar.record = record;

            if (this.prepareToolbar && this.prepareToolbar(this.gridRef, toolbar, i, record) === false) {
                toolbar.destroy();
                return;
            }

            toolbar.grid = this.gridRef;
            toolbar.column = this;
            toolbar.rowIndex = i;
            toolbar.record = record;

            toolbar.items.each(function (button) {
                if (button.on) {
                    button.toolbar = toolbar;

                    if (button.standOut) {
                        button.on("mouseout", function () {
                            this.getEl().addCls("x-btn-over");
                        }, button);
                    }

                    if (!Ext.isEmpty(button.command, false)) {
                        button.on("click", function () {
                            var i = 0;
                            if (this.toolbar.grid.store.indexOf) {
                                i = this.toolbar.grid.store.indexOf(this.toolbar.record);
                            }
                            else if (this.toolbar.record.parentNode) {
                                i = this.toolbar.record.parentNode.indexOf(this.toolbar.record);
                            }
                            this.toolbar.column.fireEvent("command", toolbar.column, this.command, this.toolbar.record, i);
                        }, button);
                    }

                    if (button.menu && !button.menu.shared) {
                        this.initMenu(button.menu, toolbar);
                    }
                }
            }, this);

            if (!this.view._bufferedRefreshSize) {
                this.view._bufferedRefreshSize = Ext.Function.createBuffered(this.view.refreshSize, 10, this.view);
            }

            if (refreshSize !== false) {
                this.view._bufferedRefreshSize(true);
            }
        }
    },

    insertToolbars: function () {
        var records = this.view.getViewRange(),
            i,
            len = (records && records.length) || 0;

        for (i = 0; i < len; i++) {
            this.insertToolbarForRecord(records[i], null, i === (len - 1));
        }
    },

    initMenu: function (menu, toolbar, shared) {
        menu.items.each(function (item) {
            if (item.on) {
                item.toolbar = toolbar;

                if (shared) {
                    item.on("click", function () {
                        var pm = this.parentMenu;

                        while (pm && !pm.shared) {
                            pm = pm.parentMenu;
                        }

                        if (pm && pm.shared && pm.ownerCt && pm.ownerCt.toolbar) {
                            var toolbar = pm.ownerCt.toolbar,
                                i = 0;

                            if (this.toolbar.grid.store.indexOf) {
                                i = this.toolbar.grid.store.indexOf(this.toolbar.record);
                            }
                            else if (this.toolbar.record.parentNode) {
                                i = this.toolbar.record.parentNode.indexOf(this.toolbar.record);
                            }

                            toolbar.column.fireEvent("command", toolbar.column, this.command, toolbar.record, i);
                        }
                    }, item);

                    item.getRecord = function () {
                        var pm = this.parentMenu;

                        while (pm && !pm.shared) {
                            pm = pm.parentMenu;
                        }

                        if (pm && pm.shared && pm.ownerCt && pm.ownerCt.toolbar) {
                            var toolbar = pm.ownerCt.toolbar;
                            return toolbar.record;
                        }
                    };
                } else {
                    if (!Ext.isEmpty(item.command, false)) {
                        item.on("click", function () {
                            this.toolbar.column.fireEvent("command", this.toolbar.column, this.command, this.toolbar.record, this.toolbar.rowIndex);
                        }, item);

                        item.getRecord = function () {
                            return this.toolbar.record;
                        };
                    }
                }

                if (item.menu) {
                    this.initMenu(item.menu, toolbar, shared);
                }
            }
        }, this);
    },

    removeNodeToolbars: function (node) {
        node.cascadeBy(function (n) {
            if (n != node || this.root) {
                this.column.removeToolbar(this.column.view, n);
            }
        }, this);
    },

    removeToolbar: function (view, record, rowIndex) {
        for (var i = 0, l = this.cache.length; i < l; i++) {
            if (this.cache[i].record && (this.cache[i].record.id == record.id)) {
                try {
                    this.cache[i].destroy();
                    Ext.Array.remove(this.cache, this.cache[i]);
                } catch (ex) { }

                break;
            }
        }
    },

    removeGroupToolbar: function (groupId) {
        for (var i = 0, l = this.cache.length; i < l; i++) {
            if (this.cache[i].groupId == groupId) {
                try {
                    this.cache[i].destroy();
                    Ext.Array.remove(this.cache, this.cache[i]);
                } catch (ex) { }

                break;
            }
        }
    },

    removeGroupToolbars: function () {
        for (var i = this.cache.length - 1; i >= 0; i--) {
            if (this.cache[i].groupId) {
                try {
                    this.cache[i].destroy();
                    Ext.Array.remove(this.cache, this.cache[i]);
                } catch (ex) { }
            }
        }
    },

    removeToolbars: function () {
        for (var i = 0, l = this.cache.length; i < l; i++) {
            try {
                this.cache[i].destroy();
            } catch (ex) { }
        }

        this.cache = [];
    },

    selectGroups: function () {
        return this.gridRef.getEl().query("div.x-grid-group-hd");
    },

    insertGroupToolbars: function () {
        var groupCmd = this.selectGroups(),
            i;

        if (this.groupCommands) {
            for (i = 0; i < groupCmd.length; i++) {
                this.insertGroupToolbar(this.view, Ext.get(groupCmd[i]));
            }
        }
    },

    groupItemUpdated: function (record, index, node) {
        var grouper = this.gridRef.store.getGrouper(),
            groupId = grouper && grouper.getGroupString(record);

        if (groupId) {
            this.insertGroupToolbar(this.view, Ext.get(this.gridRef.getEl().query("div.x-grid-group-hd[data-groupname='" + groupId + "']")[0]));
        }
    },

    groupRemoveToolbar: function (view, record, rowIndex) {
        var grouper = this.gridRef.store.getGrouper(),
            groupId = grouper && grouper.getGroupString(record);

        if (groupId) {
            this.removeGroupToolbar(groupId);
        }
    },

    initGroupMenu: function (menu, toolbar, shared) {
        menu.items.each(function (item) {
            if (item.on) {
                item.toolbar = toolbar;
                item.column = this;

                if (!Ext.isEmpty(item.command, false)) {
                    if (shared) {
                        item.on("click", function () {
                            var pm = this.parentMenu;

                            while (pm && !pm.shared) {
                                pm = pm.parentMenu;
                            }

                            if (pm && pm.shared && pm.ownerCt && pm.ownerCt.toolbar) {
                                var toolbar = pm.ownerCt.toolbar;
                                toolbar.column.fireEvent("groupcommand", toolbar.column, this.command, toolbar.grid.store.getGroups().get(toolbar.groupId));
                            }
                        }, item);
                    } else {
                        item.on("click", function () {
                            this.toolbar.column.fireEvent("groupcommand", toolbar.column, this.command, toolbar.grid.store.getGroups().get(toolbar.groupId));
                        }, item);
                    }
                }

                if (item.menu) {
                    this.initGroupMenu(item.menu, toolbar, shared);
                }
            }
        }, this);
    },

    getRecords: function (groupId) {
        if (groupId) {
            return this.gridRef.store.getGroups().get(groupId).items;
        }
    },

    destroy: function () {
        var me = this,
            view;

        if (me.rendered) {
            view = me.gridRef.getView();

            Ext.each(me.sharedMenus || [], function (menu) {
                if (menu) {
                    menu.destroy();
                }
            });
            delete me.shareMenus;

            me.removeToolbars();

            if (me.overToolbar) {
                me.overToolbar.destroy();
                delete me.overToolbar;
            }

            if (me.commands) {
                if (me.overOnly) {
                    me.view.un("beforerefresh", me.moveToolbar, me);
                    me.view.un("beforeitemupdate", me.moveToolbar, me);
                    me.view.un("beforeitemremove", me.moveToolbar, me);
                    me.view.un("itemmouseenter", me.onItemMouseEnter, me);
                    me.view.un("itemmouseleave", me.onItemMouseLeave, me);
                } else {
                    me.view.un("beforerefresh", me.removeToolbars, me);
                    me.view.un("refresh", me.insertToolbars, me);
                    me.view.un("beforeitemupdate", me.removeToolbar, me);
                    me.view.un("beforeitemremove", me.removeToolbar, me);
                    me.view.un("itemadd", me.itemAdded, me);
                    me.view.un("itemupdate", me.itemUpdated, me);
                }
            }

            if (me.groupCommands) {
                me.view.un("beforerefresh", me.removeToolbars, me);
                me.view.un("refresh", me.insertGroupToolbars, me);
                me.mun(me.gridRef, "resize", me.onGridResize, me);
                me.view.un('groupclick', me.groupToolbarClick);
                me.view.un("groupexpand", me.insertGroupToolbar, me);
                me.view.un("groupexpand", me.insertGroupToolbar, me);
            }

            if (me.gridRef.isTree || me.gridRef.ownerLockable && me.gridRef.ownerLockable.isTree) {
                me.gridRef.un("beforeitemcollapse", me.removeNodeToolbars, me._cnrScope);
                me.gridRef.un("beforeitemmove", me.removeNodeToolbars, me._crScope);
            }
        }

        this.callParent(arguments);
    }
});
Ext.define("Ext.grid.column.ComponentColumn", {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.componentcolumn',
    isColumn: true,
    showDelay: 250,
    hideDelay: 300,
    overOnly: false,
    editor: false,
    pin: false,
    autoWidthComponent: true,
    isComponentColumn: true,
    stopSelection: true,
    pinAllColumns: true,
    moveEditorOnEnter: true,
    moveEditorOnTab: true,
    hideOnUnpin: false,
    disableKeyNavigation: false,
    swallowKeyEvents: true,

    constructor: function (config) {
        var me = this;
        me.callParent(arguments);
        me.cache = [];

        me.userRenderer = me.renderer;
        me.renderer = Ext.Function.bind(me.cmpRenderer, me);
    },

    cmpRenderer: function (value, meta, record, row, col, store, view) {
        if (meta) {
            meta.tdCls = meta.tdCls || "";
            meta.tdCls += " row-cmp-cell";
        }
        else {
            var node = view.getNode(record);

            if (node) {
                node = Ext.fly(node).down("td[data-columnid=" + this.id + "]");
                if (node) {
                    node.addCls("row-cmp-cell");
                }
            }
        }

        if (this.overOnly) {
            return "<div class='row-cmp-placeholder'>" + this.emptyRenderer(value, meta, record, row, col, store, view) + "</div>";
        }

        return this.emptyRenderer(value, meta, record, row, col, store, view);
    },

    emptyRenderer: function (value, meta, record, row, col, store, view) {
        if (this.userRenderer) {
            if (typeof this.userRenderer === "string") {
                this.userRenderer = Ext.util.Format[this.userRenderer];
            }

            return this.userRenderer.call(
                this.rendererScope || this.ownerCt,
                value,
                meta,
                record,
                row,
                col,
                store,
                view
            );
        }
        else if (this.editor) {
            return value;
        } else {
            return "<div style='height:16px;width:1px;'></div>";
        }
    },

    initRenderData: function () {
        var me = this;
        me.gridRef = me.up('tablepanel');
        me.gridRef.addCls("x-grid-componentcolumn");
        me.view = me.gridRef.getView();

        if (me.overOnly) {
            me.view.on("beforerefresh", me.onBeforeRefresh, me);
            me.view.on("refresh", me.mayShowPin, me, { buffer: 10 });
            me.view.on("beforeitemupdate", me.moveComponent, me);
            me.view.on("beforeitemremove", me.moveComponent, me);
            me.view.on("itemmouseenter", me.onItemMouseEnter, me);
            me.view.on("itemmouseleave", me.onItemMouseLeave, me);
        } else {
            me.view.on("beforerefresh", me.removeComponents, me);
            me.view.on("refresh", me.insertComponents, me, { buffer: 10 });
            me.view.on("beforeitemupdate", me.removeComponent, me);
            if (!me.view.bufferedRenderer) {
                me.view.on("beforeitemremove", me.removeComponent, me);
                me.view.on("itemadd", me.itemAdded, me);
            }
            me.view.on("itemupdate", me.itemUpdated, me);
        }

        if (me.view.bufferedRenderer) {
            if (!me.overOnly) { 
                Ext.Function.interceptBefore(me.view.all, "scroll", me.beforeScroll, me);
                Ext.Function.interceptAfter(me.view.all, "scroll", Ext.Function.createBuffered(me.afterScroll, 200, me), me);
                Ext.Function.interceptAfter(me.view, "doAdd", Ext.Function.createBuffered(me.afterViewAdd, 50, me));
            }

            Ext.Function.interceptBefore(me.view.all, "clear", me.beforeAllClear, me);
        }

        if (Ext.isNumber(this.pin) && this.pin > -1) {
            if (this.gridRef.store.getCount() > 0) {
                this.showComponent(this.pin);
                this.pin = true;
            } else {
                this.gridRef.store.on("load", function () {
                    this.showComponent(this.pin);
                    this.pin = true;
                }, this, { single: true, delay: 100 });
            }
        }

        if (this.disableKeyNavigation) {
            var sm = me.gridRef.getSelectionModel();
            sm.enableKeyNav = false;

            if (sm.keyNav) {
                sm.keyNav.disable();
            }
        }

        if (me.gridRef.isTree || me.gridRef.ownerLockable && me.gridRef.ownerLockable.isTree) {
            me._cnrScope = { column: me, root: false };
            me.gridRef.on("beforeitemcollapse", me.removeNodeComponents, me._cnrScope);
            me._crScope = { column: me, root: true };
            me.gridRef.on("beforeitemmove", me.removeNodeComponents, me._crScope);
        }

        me.view.on("cellfocus", this.onFocusCell, this);

        return me.callParent(arguments);
    },

    mayShowPin: function () {
        if (this.pin && this.pinnedOnRecord && this.gridRef.store.indexOf(this.pinnedOnRecord) > -1) {
            this.showComponent(this.pinnedOnRecord, false);
            delete this.pinnedOnRecord;
        }
    },

    beforeAllClear: function (removeDom) {
        if (removeDom) {
            this.removeComponents();
        }
    },

    beforeScroll: function (newRecords, direction, removeCount) {
        var me = this,
            i,
            removeEnd,
            nc = me.view.all,
            elements = nc.elements;

        if (direction == -1) {
            for (i = (nc.endIndex - removeCount) + 1; i <= nc.endIndex; i++) {
                me.removeComponent(me.view, me.view.getRecord(elements[i]));
            }
        }
        else {
            removeEnd = nc.startIndex + removeCount;
            for (i = nc.startIndex; i < removeEnd; i++) {
                me.removeComponent(me.view, me.view.getRecord(elements[i]));
            }
        }
    },

    afterScroll: function (newRecords, direction, removeCount) {
        var me = this,
            i,
            recCount = newRecords.length;

        for (i = 0; i < recCount; i++) {
            me.insertComponentForRecord(newRecords[i]);
        }
    },

    afterViewAdd: function (records, index) {
        var me = this,
            count = records.length,
            i;

        for (i = 0; i < count; i++) {
            me.insertComponentForRecord(records[i]);
        }
    },

    onBeforeRefresh: function () {
        if (this.pin && this.overOnly && this.overComponent && this.overComponent.rendered) {
            this.pinnedOnRecord = this.overComponent.column.record;
        }
        this.hideComponent();
    },

    onFocusCell: function (record, cell, position) {
        if (this.view.headerCt.getHeaderAtIndex(position.column) == this) {
            this.focusComponent(position.row);
        }
    },

    onItemMouseLeave: function (view, record, item, index, e) {
        var me = this;

        if (this.pin) {
            return;
        }

        if (me.showDelayTask) {
            clearTimeout(me.showDelayTask);
            delete me.showDelayTask;
        }

        if (me.hideDelay) {
            if (me.hideDelayTask) {
                clearTimeout(me.hideDelayTask);
            }

            me.hideDelayTask = setTimeout(function () {
                me.hideComponent(view, record, item, index, e);
            }, me.hideDelay);
        } else {
            me.hideComponent(view, record, item, index, e);
        }
    },

    getComponent: function (rowIndex) {
        if (this.overOnly) {
            return this.overComponent;
        }

        var record = Ext.isNumber(rowIndex) ? (this.gridRef.store.getAt ? this.gridRef.store.getAt(rowIndex) : this.view.getRecord(this.view.getNode(rowIndex))) : rowIndex,
            i,
            l;

        for (i = 0, l = this.cache.length; i < l; i++) {
            if (this.cache[i].id == record.id) {
                return this.cache[i].cmp;
            }
        }

        return null;
    },

    focusComponent: function (rowIndex) {
        var cmp = this.getComponent(rowIndex);

        if (cmp && cmp.hidden !== true && cmp.focus) {
            cmp.focus();
        }
    },

    moveComponent: function (view, record, index) {
        if (Ext.isDefined(index) && this.overComponent && this.overComponent.column && this.overComponent.column.rowIndex == index) {
            this.hideComponent();
        }
    },

    hideComponent: function (view, record, item, index, e) {
        delete this.hideDelayTask;

        if (!this.overOnly) {
            return;
        }

        var hideOtherComponents = view === true,
            rowIndex = this.overComponent && this.overComponent.column ? this.overComponent.column.rowIndex : -1;

        if (this.showDelayTask) {
            clearTimeout(this.showDelayTask);
            delete this.showDelayTask;
        }

        if (this.overComponent && this.overComponent.rendered && this.overComponent.hidden !== true) {
            if (!item) {
                this.doComponentHide();
            } else {
                this.doComponentHide(item);
            }
        }

        if (hideOtherComponents && this.overComponent) {
            var columns = this.view.getHeaderCt().getGridColumns(),
                item = this.gridRef.getView().getNode(rowIndex);

            Ext.each(columns, function (column) {
                if (column != this && column.hideComponent) {
                    column.hideComponent(item);
                }
            }, this);
        }
    },

    pinOverComponent: function (preventPinAll) {
        if (!this.overOnly) {
            return;
        }

        this.pin = true;
        this.fireEvent("pin", this, this.overComponent);

        if (this.pinAllColumns && preventPinAll !== true) {
            var columns = this.view.getHeaderCt().getGridColumns();
            Ext.each(columns, function (column) {
                if (column != this && column.pinOverComponent) {
                    column.pinOverComponent(true);
                }
            }, this);
        }
    },

    unpinOverComponent: function (preventUnpinAll) {
        if (!this.overOnly) {
            return;
        }

        this.pin = false;

        if (this.hideOnUnpin) {
            this.hideComponent();
        }

        this.fireEvent("unpin", this, this.overComponent);

        if (this.pinAllColumns && preventUnpinAll !== true) {
            var columns = this.view.getHeaderCt().getGridColumns();

            Ext.each(columns, function (column) {
                if (column != this && column.unpinOverComponent) {
                    column.unpinOverComponent(true);
                }
            }, this);
        }
    },

    doComponentHide: function (item) {
        var ce = this.overComponent.getEl(),
            el = Ext.net.ResourceMgr.getAspForm() || Ext.getBody(),
            div = item ? this.getRenderTarget(item) : null;

        this.restoreLastPlaceholder();

        if (div) {
            div.down('.row-cmp-placeholder').removeCls("x-hidden-display");
        }

        this.overComponent.hide(false);

        if (this.overComponent.column) {
            this.fireEvent("unbind", this, this.overComponent, this.overComponent.record, this.overComponent.column && this.overComponent.column.index, this.gridRef);
        }

        this.onUnbind(this.overComponent);
        if (this.overComponent._inGrid !== false) {
            el.dom.appendChild(ce.dom);
            this.overComponent._inGrid = false;
        }
    },

    onItemMouseEnter: function (view, record, item, index, e) {
        var me = this;

        if (me.hideDelayTask) {
            clearTimeout(me.hideDelayTask);
            delete me.hideDelayTask;
        }

        if (this.pin || (this.overComponent && this.overComponent.record && this.overComponent.record.id == record.id)) {
            return;
        }

        if (me.showDelay) {
            if (me.showDelayTask) {
                clearTimeout(me.showDelayTask);
            }

            me.showDelayTask = setTimeout(function () {
                me.showComponent(record, item, index, e);
            }, me.showDelay);
        } else {
            me.showComponent(record, item, index, e);
        }
    },

    restoreLastPlaceholder: function () {
        if (this.lastComponentDiv) {
            if (this.lastComponentDiv.dom) {
                try {
                    this.lastComponentDiv.down('.row-cmp-placeholder').removeCls("x-hidden-display");
                } catch (e) {
                }
            }

            delete this.lastComponentDiv;
        }
    },

    getRenderTarget: function (node) {
        var td = this.select(node)[0];
        return td ? Ext.get(td).first("div") : null;
    },

    showComponent: function (record, item, index, e) {
        delete this.showDelayTask;

        if (!this.overOnly) {
            return;
        }

        if (Ext.isNumber(record)) {
            record = this.gridRef.store.getAt ? this.gridRef.store.getAt(record) : this.view.getRecord(this.view.getNode(record));
        }

        var showOtherComponents = item === true;

        if (!Ext.isDefined(index)) {
            index = this.gridRef.store.indexOf ? this.gridRef.store.indexOf(record) : (record.parentNode ? record.parentNode.indexOf(record) : 0);
            item = this.gridRef.getView().getNode(index);
        }

        if (this.hideDelayTask) {
            clearTimeout(this.hideDelayTask);
            delete this.hideDelayTask;
        }

        if (!this.overComponent) {
            tpl = Ext.isFunction(this.component) ? this.component.call(this) : this.component;
            this.overComponents = [];
            for (var i = 0; i < tpl.length; i++) {
                var cmp,
                    evts;

                cmp = Ext.ComponentManager.create(tpl[i]);
                this.overComponents.push(cmp);
                this.initCmp(cmp);

                if (this.pinEvents) {
                    evts = Ext.Array.from(this.pinEvents);

                    Ext.each(evts, function (evt) {
                        var evtCfg = evt.split(":");
                        cmp.on(evtCfg[0], this.pinOverComponent, this, evtCfg.length > 1 ? { defer: parseInt(evtCfg[1], 10) } : {});
                    }, this);
                }

                if (this.unpinEvents) {
                    evts = Ext.Array.from(this.unpinEvents);

                    Ext.each(evts, function (evt) {
                        var evtCfg = evt.split(":");
                        cmp.on(evtCfg[0], this.unpinOverComponent, this, evtCfg.length > 1 ? { defer: parseInt(evtCfg[1], 10) } : {});
                    }, this);
                }
                this.overComponent = this.overComponents[0];
            }
        }

        if (this.overComponent) {
            if (this.overComponent.hidden !== true && this.overComponent.record) {
                this.fireEvent("unbind", this, this.overComponent, this.overComponent.record, this.overComponent.column && this.overComponent.column.index, this.gridRef);
                this.onUnbind(this.overComponent);
            }

            var e = {
                config: this.overComponents,
                record: record,
                rowIndex: index,
                grid: this.gridRef
            },
                hide = false;

            beforeBind = this.fireEvent("beforebind", this, e);
            if (beforeBind === false || e.cancel === true) {
                hide = true;
            }

            if (Ext.isArray(e.config)) {
                e.config = e.config[0];
            }

            if (this.overComponent != e.config) {
                delete this.overComponent.column;
                this.hideComponent();
            }

            this.overComponent = e.config;

            var cmp = this.overComponent,
                div = this.getRenderTarget(item);

            if (!div) {
                hide = true;
            }

            this.restoreLastPlaceholder();

            this.lastComponentDiv = div;

            if (div) {
                div.down('.row-cmp-placeholder').addCls("x-hidden-display");
                div.addCls("row-cmp-cell-ct");

                if (cmp.rendered) {
                    div.appendChild(cmp.getEl());
                } else {
                    cmp.render(div);
                }
            }
            this.overComponent._inGrid = true;
            this.overComponent.show(false);

            cmp.record = record;

            cmp.column = {
                grid: this.gridRef,
                column: this,
                rowIndex: index,
                record: record
            };

            if (hide || this.fireEvent("bind", this, cmp, record, index, this.gridRef) === false) {
                delete cmp.column;
                cmp._ignoreUnbind = true;
                this.hideComponent();
                return;
            }

            delete cmp._ignoreUnbind;
            this.onBind(cmp, record);

            if (this.overComponent.hasFocus) {
                var selectText = !!this.overComponent.getFocusEl().dom.select && this.overComponent.selectOnFocus === true;
                this.overComponent.focus(selectText, 10);
            }

            if (showOtherComponents) {
                var columns = this.view.getHeaderCt().getGridColumns();
                Ext.each(columns, function (column) {
                    if (column != this && column.showComponent) {
                        column.showComponent(record);
                    }
                }, this);
            }
        }
    },

    itemUpdated: function (record, index, node) {
        this.insertComponentForRecord(record, node);
    },

    itemAdded: function (records, index, nodes) {
        for (var i = 0, len = records.length; i < len; i++) {
            this.insertComponentForRecord(records[i], nodes && nodes[i], i === (len - 1));
        }
    },

    select: function (row) {
        var classSelector = "x-grid-cell-" + this.id + ".row-cmp-cell",
            el = row ? Ext.fly(row) : this.gridRef.getEl();
        return el.query("td." + classSelector);
    },

    insertComponentForRecord: function (record, node, refreshSize) {
        var tpl,
            cmp,
            div,
            e,
            node,
            record,
            beforeBind,
            i,
            width = 0;

        if (record.isCollapsedPlaceholder) {
            return;
        }

        if (!node) {
            node = this.view.getNode(record, true);
        }

        if (!node) {
            return;
        }

        div = Ext.fly(node).down(this.getCellSelector() + " div");

        if (!div) {
            return;
        }

        if (this.view.store.indexOf) {
            i = this.view.store.indexOf(record);
        }
        else if (record.parentNode) {
            i = record.parentNode.indexOf(record);
        }

        tpl = Ext.isFunction(this.component) ? this.component.call(this) : Ext.clone(this.component);

        e = {
            config: tpl,
            record: record,
            rowIndex: i,
            grid: this.gridRef
        };

        beforeBind = this.fireEvent("beforebind", this, e);
        if (beforeBind === false || e.cancel === true) {
            return;
        }

        tpl = e.config;

        if (Ext.isArray(tpl)) {
            tpl = tpl[0];
        }

        cmp = Ext.ComponentManager.create(tpl);

        this.initCmp(cmp);

        cmp.record = record;

        this.removeComponent(this.view, record, i); // #1307: ensures it is not adding a duplicate to the cache
        this.cache.push({ id: record.id, cmp: cmp });

        div.dom.innerHTML = "";
        div.addCls("row-cmp-cell-ct");

        cmp.render(div);

        cmp.column = {
            grid: this.gridRef,
            column: this,
            rowIndex: i,
            record: record
        };

        if (this.fireEvent("bind", this, cmp, record, i, this.gridRef) === false) {
            delete cmp.column;
            cmp.destroy();
            return;
        }

        this.onBind(cmp, record);

        if (!this.view._bufferedRefreshSize) {
            this.view._bufferedRefreshSize = Ext.Function.createBuffered(this.view.refreshSize, 10, this.view);
        }

        if (refreshSize !== false) {
            this.view._bufferedRefreshSize();
        }
    },

    insertComponents: function () {
        var records = this.view.getViewRange(),
            i,
            len = (records && records.length) || 0;

        for (i = 0; i < len; i++) {
            this.insertComponentForRecord(records[i], null, i === (len - 1));
        }
    },

    onBind: function (cmp, record) {
        if (this.editor && cmp.setValue && this.dataIndex) {
            this.settingValue = true;
            cmp.setValue(record.get(this.dataIndex));
            this.settingValue = false;
        }

        if (this.overOnly) {
            this.activeRecord = {
                cmp: cmp,
                record: record,
                rowIndex: cmp.column && cmp.column.rowIndex
            };
        }
    },

    onUnbind: function (cmp) {
        if (this.editor) {
            if (this.overOnly) {
                this.onSaveValue(cmp, true);
            }
        }
        delete cmp.column;
        delete cmp.record;
    },

    initCmp: function (cmp) {
        //cmp.on("resize", this.onComponentResize, this);
        this.on("resize", this.onColumnResize, { column: this, cmp: cmp });
        this.on("show", this.onColumnResize, { column: this, cmp: cmp });

        if (!Ext.isDefined(cmp.margin)) {
            cmp.margin = 1;
        }

        this.onColumnResize.call({ column: this, cmp: cmp });

        cmp.on("focus", function (cmp) {
            this.activeRecord = {
                cmp: cmp,
                record: cmp.record,
                rowIndex: cmp.column && cmp.column.rowIndex
            };
        }, this);

        cmp.on("specialkey", this.onCmpSpecialKey, cmp);

        if (this.swallowKeyEvents) {
            cmp.on("afterrender", function (cmp) {
                cmp.getEl().swallowEvent(["keyup", "keydown", "keypress"]);
            });
        }

        if (this.editor) {
            cmp.addCls(Ext.baseCSSPrefix + "small-editor");
            cmp.addCls(Ext.baseCSSPrefix + "grid-editor");

            if ((this.overOnly && this.saveOnChange) || !this.overOnly) {
                cmp.on("change", this.onSaveEvent, this);
            }
        }
    },

    onSaveEvent: function (cmp) {
        if (this.overOnly) {
            this.forceRefresh = true;
        }
        this.onSaveValue(cmp);
    },

    onSaveValue: function (cmp, deferRowRefresh) {
        if (cmp._ignoreUnbind) {
            return;
        }

        var me = this,
            value = cmp.getValue(),
            ev,
            headerCt,
            headers,
            row,
            colIndex;

        if (me.settingValue || (cmp.record.get(me.dataIndex) == value) || !cmp.isValid()) {
            if (!deferRowRefresh || !this.forceRefresh && deferRowRefresh) {
                return;
            }
        }

        headerCt = this.view.getHeaderCt();
        headers = headerCt.getGridColumns();
        colIndex = Ext.Array.indexOf(headers, this);
        row = cmp.column ? this.view.getNode(cmp.column.rowIndex) : null;

        ev = {
            grid: me.gridRef,
            cmp: cmp,
            record: cmp.record,
            field: me.dataIndex,
            value: value,
            originalValue: cmp.record.get(me.dataIndex),
            row: row,
            column: me,
            rowIdx: cmp.column ? cmp.column.rowIndex : null,
            colIdx: colIndex,
            cancel: false
        };

        if (this.fireEvent("validateedit", this, ev) === false || ev.cancel === true) {
            return;
        }

        cmp.record.beginEdit();
        cmp.record.set(me.dataIndex, cmp.getValue());
        cmp.record.endEdit(true);

        this.fireEvent("edit", this, ev);

        if (me.silentSave === false) {
            deferRowRefresh = true;
        }

        if (deferRowRefresh) {
            delete this.forceRefresh;
            me.gridRef.refreshComponents = me.gridRef.refreshComponents || {};
            var rowIndex = cmp.column && cmp.column.rowIndex;

            if (cmp.column && !me.gridRef.refreshComponents[rowIndex]) {
                me.gridRef.refreshComponents[rowIndex] = setTimeout(function () {
                    me.view.refreshNode(rowIndex);
                    delete me.gridRef.refreshComponents[rowIndex];
                }, 10);
            }
        }
    },

    focusColumn: function (e, rowIndex, cmp) {
        var headerCt = this.view.getHeaderCt(),
            headers = headerCt.getGridColumns(),
            colIndex = Ext.Array.indexOf(headers, this),
            rowCount = this.gridRef.store.getCount(),
            firstCol = 0,
            lastCol = headers.length - 1,
            found = false,
            newCmp;

        for (rowIndex; e.shiftKey ? (rowIndex >= 0) : (rowIndex < rowCount) ; e.shiftKey ? rowIndex-- : rowIndex++) {
            for (e.shiftKey ? --colIndex : ++colIndex; e.shiftKey ? (colIndex >= firstCol) : (colIndex <= lastCol) ; e.shiftKey ? colIndex-- : colIndex++) {
                if (headers[colIndex].hidden && headers[colIndex].isComponentColumn !== true) {
                    continue;
                }

                newCmp = headers[colIndex].getComponent(rowIndex);
                if (newCmp && newCmp.hidden !== true) {
                    newCmp.focus();
                    found = true;
                    break;
                }
            }

            colIndex = e.shiftKey ? lastCol + 1 : -1;

            if (found) {
                break;
            }
        }

        if (found && cmp.triggerBlur) {
            cmp.triggerBlur();
        }
    },

    onCmpSpecialKey: function (cmp, e) {
        
        var store = cmp.column.grid.store,
            grid = cmp.column.grid,
            column = cmp.column.column;
        switch (e.getKey()) {
            case e.TAB:
                column.focusColumn(e, cmp.column.rowIndex, cmp);

                e.stopEvent();
                return false;
            case e.ENTER:
                if (column.moveEditorOnEnter === false || (cmp.getPicker && cmp.isExpanded)) {
                    return;
                }

                var pos = cmp.column.rowIndex,
                    newPos;

                if (!e.shiftKey && !e.ctrlKey) {
                    newPos = pos + 1;

                    if (newPos >= store.getCount()) {
                        newPos = -1;
                    }
                } else {
                    if (e.shiftKey) {
                        newPos = pos - 1;
                    }

                    if (e.ctrlKey) {
                        newPos = 0;
                    }
                }

                if (newPos > -1 && pos != newPos) {
                    column.focusComponent(newPos);

                    if (cmp.triggerBlur) {
                        cmp.triggerBlur();
                    }
                }

                e.stopEvent();
                return false;
        }
    },

    onColumnResize: function () {
        if (this.column.overOnly && this.cmp.hidden) {
            if (!this.cmp.resizeListen) {
                this.cmp.on("show", this.column.fitComponent, this, { single: true });
                this.cmp.resizeListen = true;
            }
        } else {
            this.column.fitComponent.call(this);
        }
    },

    fitComponent: function () {
        delete this.cmp.resizeListen;

        if (this.column.autoWidthComponent) {
            var lr;

            if (this.cmp.rendered) {
                lr = this.cmp.getEl().getMargin('lr');
            } else {
                var box = Ext.util.Format.parseBox(this.cmp.margin || 0);
                lr = box.left + box.right;
            }

            this.cmp.setWidth(this.column.getWidth() - lr);
        }
    },

    removeNodeComponents: function (node) {
        node.cascadeBy(function (n) {
            if (n != node || this.root) {
                this.column.removeComponent(this.column.view, n);
            }
        }, this);
    },

    removeComponent: function (view, record, rowIndex) {
        for (var i = 0, l = this.cache.length; i < l; i++) {
            if (this.cache[i].id == record.id) {
                try {
                    var cmp = this.cache[i].cmp;
                    this.fireEvent("unbind", this, cmp, cmp.record, cmp.column && cmp.column.index, this.gridRef);
                    this.onUnbind(cmp);
                    Ext.Array.remove(this.cache, this.cache[i]);
                    cmp.destroy();
                } catch (ex) { }

                break;
            }
        }
    },

    removeComponents: function () {
        for (var i = 0, l = this.cache.length; i < l; i++) {
            try {
                var cmp = this.cache[i].cmp;
                this.fireEvent("unbind", this, cmp, cmp.record, cmp.column && cmp.column.index, this.gridRef);
                this.onUnbind(cmp);
                cmp.destroy();
            } catch (ex) { }
        }

        this.cache = [];
    },

    processEvent: function (type, view, cell, recordIndex, cellIndex, e) {
        if ((type == "mousedown" || type == "click") && this.stopSelection) {
            return false;
        }

        return this.callParent(arguments);
    },

    destroy: function () {
        var me = this,
            view;

        if (me.rendered) {
            view = me.gridRef.getView();

            me.removeComponents();

            if (me.overComponent) {
                me.overComponent.destroy();
                delete me.overComponent;
            }

            if (me.overOnly) {
                me.view.un("beforerefresh", me.onBeforeRefresh, me);
                me.view.un("beforeitemupdate", me.moveComponent, me);
                me.view.un("beforeitemremove", me.moveComponent, me);
                me.view.un("itemmouseenter", me.onItemMouseEnter, me);
                me.view.un("itemmouseleave", me.onItemMouseLeave, me);
            } else {
                me.view.un("beforerefresh", me.removeComponents, me);
                me.view.un("refresh", me.insertComponents, me);
                me.view.un("beforeitemupdate", me.removeComponent, me);
                me.view.un("beforeitemremove", me.removeComponent, me);
                me.view.un("itemadd", me.itemAdded, me);
                me.view.un("itemupdate", me.itemUpdated, me);
            }

            if (me.gridRef.isTree || me.gridRef.ownerLockable && me.gridRef.ownerLockable.isTree) {
                me.gridRef.un("beforeitemcollapse", me.removeNodeComponents, me._cnrScope);
                me.gridRef.un("beforeitemmove", me.removeNodeComponents, me._crScope);
            }

            me.view.un("cellfocus", me.onFocusCell, me);
        }

        me.callParent(arguments);
    }
});

// @source src/grid/filter/Base.js

Ext.grid.filters.filter.Base.override({
    // It has been overridden to provide required information - the filter's  type - to be sent to the server in the case of remote filtering.
    // In the case with a DateFilter, a filter is configured with a submitFormat to be used to format a date before sending to the server.
    // See the utils/Filter.js file. There is an override of the serialize method to take the type and submiFormat into account.
    getFilterConfig: function(config, key) {
        var config = this.callParent(arguments);

        config.type = this.type;

        if (this.type === "date") {
            config.submitFormat = this.submitFormat;
        }

        return config;
    }
});

// @source src/grid/filter/Date.js

Ext.grid.filters.filter.Date.override({
    submitFormat : "Y-m-d\\TH:i:s",

    // The constructor has been overridden to support the beforeText, afterText and onText config options.
    constructor: function(config) {
        var cfg = {
            fields: {}
        };

        if (Ext.isDefined(config.beforeText)) {
            cfg.fields.lt = { text: config.beforeText };
            delete config.beforeText;
        }

        if (Ext.isDefined(config.afterText)) {
            cfg.fields.gt = { text: config.afterText };
            delete config.afterText;
        }

        if (Ext.isDefined(config.onText)) {
            cfg.fields.eq = { text: config.onText };
            delete config.onText;
        }

        Ext.merge(config, cfg);
        this.callParent(arguments);
    }
});

// @source src/grid/filter/List.js

Ext.grid.filters.filter.List.override({
    setValue: function(value) { // The GitHub issue #542
        if (arguments.length === 1) {
            this.filter.setValue(value);

            if (this.active) {
                this.updateStoreFilter();
            } else {
                this.setActive(!!value);
            }
        } else {
            this.callParent(arguments);
        }
    },

    // This method has been introduced by Ext.NET for convenience.
    updateOptions: function (options) {
        var me = this,
            store = this.store;

        this.options = options;
        if (this.menu && store) {
            var data = [],
                i,
                len = options.length;

            for (i = 0; i < len; i++) {
                data.push([options[i], options[i]]);
            }

            this.store.loadData(data);
            this.createMenuItems(store);
        }
    }
});

// @source src/grid/filter/SingleFilter.js

Ext.grid.filters.filter.SingleFilter.override({
    constructor: function (config) { // The GitHub issue #540
        this.callParent([config]);

        if (this.active && this.column && this.owner) {
            this.column.addCls(this.owner.filterCls);
        }

        if (this.filter.getValue() === undefined) { // #829
            this.filter.setValue(this.defaultValue);
        }
    }
});

// @source src/grid/filter/String.js

Ext.grid.filters.filter.String.override({
    defaultValue: "" // #829
});

// @source src/grid/filter/TriFilter.js

Ext.grid.filters.filter.TriFilter.override({
    constructor: function (config) { // The GitHub issue #540
        this.callParent([config]);

        if (this.active && this.column && this.owner) {
            this.column.addCls(this.owner.filterCls);
        }
    },

    setValue: function (value) { // The GitHub issue #543
        if (!this.menu) {
            this.createMenu();
        }

        this.callParent(arguments);
    },

    setActive: function (active) {  // The GitHub issue #545
        var me = this,
            menuItem = me.owner.activeFilterMenuItem,
            filterCollection;

        if (me.active !== active) {
            me.active = active;

            if (!me.settingValue) { // That is the fix

                // The store filter will be updated, but we don't want to recreate the list store or the menu items in the
                // onDataChanged listener so we need to set this flag.
                me.preventDefault = true;

                filterCollection = me.getGridStore().getFilters();
                filterCollection.beginUpdate();

                if (active) {
                    me.activate();
                } else {
                    me.deactivate();
                }

                filterCollection.endUpdate();

                me.preventDefault = false;
            }

            // Make sure we update the 'Filters' menu item.
            if (menuItem && menuItem.activeFilter === me) {
                menuItem.setChecked(active);
            }

            me.setColumnActive(active)

            // TODO: fire activate/deactivate
        }
    }
});
Ext.grid.property.Store.override({
    setValue: function (prop, value, create) {
        var me = this,
            rec = me.getRec(prop);

        if (rec) {
            rec.set('value', value);
            me.source[prop] = value;
        } else if (create) {

            me.source[prop] = value;
            rec = new Ext.grid.property.Property({ name: prop, value: value });
            me.add(rec);
        }
    }
});

Ext.grid.property.Grid.override({
    editable: true,

    getDataField: function () {
        if (!this.dataField) {
            this.dataField = new Ext.form.Hidden({ name: this.id });

            this.on("beforedestroy", function () {
                this.dataField.destroy();
            }, this);
        }

        return this.dataField;
    },

    getChangeField: function () {
        if (!this.changeField) {
            this.changeField = new Ext.form.Hidden({ name: this.id + "_changeMap" });

            this.on("beforedestroy", function () {
                this.changeField.destroy();
            }, this);
        }

        return this.changeField;
    },

    initComponent: function () {
        this.changeMap = {};
        this.originalMap = {};
        this.callParent(arguments);

        this.propertyNames = this.propertyNames || [];

        if (!this.editable) {
            this.on("beforeedit", function () {
                return false;
            });
        }

        this.on("propertychange", this.onPropertyChangeHandler);
    },

    onPropertyChangeHandler: function (source, recordId, value, oldValue) {
        if (Ext.isDefined(this.changeMap[recordId])) {
            if (Ext.isDate(value) && Ext.isDate(this.originalMap[recordId])) {
                value = Ext.Date.clearTime(value, true);

                if (this.originalMap[recordId].getTime() === value.getTime()) {
                    delete this.changeMap[recordId];
                }
            }
            else if (this.originalMap[recordId] === value) {
                delete this.changeMap[recordId];
            }
        }
        else {
            if (Ext.isDate(value) && !Ext.isDate(oldValue)) {
                var editor = this.editingPlugin.editors.map[recordId];

                if (editor && editor.field) {
                    oldValue = Ext.Date.parse(oldValue, editor.field.format);
                }
            }

            this.originalMap[recordId] = oldValue;
            this.changeMap[recordId] = true;
        }

        this.saveSource(source);
    },

    afterRender: function () {
        this.callParent(arguments);
        if (this.hasId()) {
            this.getDataField().render(this.el.parent() || this.el);
            this.getChangeField().render(this.el.parent() || this.el);
        }
    },

    saveSource: function (source) {
        if (this.hasId()) {
            this.getDataField().setValue(Ext.encode(source || this.propStore.getSource()));
            this.getChangeField().setValue(Ext.encode(this.changeMap));
        }
    },

    setProperty: function (prop, value, create) {
        this.callParent(arguments);
        if (create) {
            this.saveSource();
        }
    },

    removeProperty: function (prop) {
        this.callParent(arguments);
        this.saveSource();
    }
});
// @source src/grid/selection/SpreadsheetModel.js

Ext.grid.selection.SpreadsheetModel.override({
    // Defined in Ext.NET for better API
    getColumnByConfig: function (config) {
        var column;

        if (config instanceof Ext.grid.column.Column) {
            column = config;
        } else if (Ext.isNumber(config) || Ext.isString(config)) {
            column = this.view.headerCt.getComponent(config);
        } else if (Ext.isObject(config)) {
            if (!Ext.isEmpty(config.columnID)) {
                column = this.view.headerCt.getComponent(config.columnID);
            } else if (!Ext.isEmpty(config.columnIndex)) {
                column = this.view.headerCt.getComponent(config.columnIndex);;
            } else if (!Ext.isEmpty(config.columnDataIndex)) {
                column = this.view.headerCt.down("gridcolumn[dataIndex=" + config.columnDataIndex + "]");
            }
        }

        return column;
    },

    // Defined in Ext.NET for better API
    parseRow: function (row) {
        var store = this.store,
            ret;

        if (row.isEntity) {
            ret = row;
        } else if (Ext.isNumber(row)) {
            ret = store.getAt(row) || store.getById(row);
        } else if (!Ext.isEmpty(row.recordID)) {
            ret = store.getById(row.recordID);
        } else if (!Ext.isEmpty(row.rowIndex)) {
            ret = store.getAt(row.rowIndex);
        } else {
            ret = store.getById(row);
        }

        return ret;
    },

    // Defined in Ext.NET for better API
    parseRows: function (rows) {
        var ret, i, len;

        if (Ext.isArray(rows)) {
            ret = [];

            for (i = 0, len = rows.length; i < len; i++) {
                ret.push(this.parseRow(rows[i]));
            }
        } else {
            ret = this.parseRow(rows);
        }

        return ret;
    },

    deselect: function (records, suppressEvent) {
        records = this.parseRows(records); // Defined in Ext.NET for better API

        // Overridden because of #1270
        var me = this,
            sel = me.selected,
            store = me.view.dataSource,
            len,
            i,
            record,
            changed = false;

        if (sel && sel.isRows) {
            if (!Ext.isArray(records)) {
                records = [records];
            }

            len = records.length;

            for (i = 0; i < len; i++) {
                record = records[i];

                if (typeof record === 'number') {
                    record = store.getAt(record);
                }

                if (sel.remove(record)) { // Here is the fix for #1270
                    changed = true;
                }
            }
        }

        if (changed) {
            me.updateHeaderState();

            if (!suppressEvent) {
                me.fireSelectionChange();
            }
        }
    },

    // Overridden in Ext.NET for better API
    deselectColumn: function (column) {
        arguments[0] = this.getColumnByConfig(column);
        this.callParent(arguments);
    },

    // Overridden in Ext.NET for better API
    selectCells: function (rangeStart, rangeEnd) {
        if (Ext.isObject(rangeStart) && Ext.isObject(rangeEnd)) {
            arguments[0] = Ext.grid.plugin.SelectionSubmit.getCellContext(this.view, rangeStart);
            arguments[1] = Ext.grid.plugin.SelectionSubmit.getCellContext(this.view, rangeEnd);
        }

        this.callParent(arguments);
    },

    // Overridden in Ext.NET for better API
    selectColumn: function (column) {
        arguments[0] = this.getColumnByConfig(column);
        this.callParent(arguments);
    },

    // Overridden in Ext.NET for better API
    selectRows: function (rows) {
        arguments[0] = this.parseRows(rows);
        this.callParent(arguments);
    },

    // Defined in Ext.NET for submitting selected data
    getSubmitData: function (config) {
        var config = config || {},
            selectedData = this.getSelected(),
            grid = this.view.panel,
            i, selectedColumns, selectedRecords,
            startCell, endCell,
            startColIdx, endColIdx,
            startRowIdx, endRowIdx;

        if (!selectedData) {
            return [];
        }

        if (!Ext.isDefined(config.excludeId)) {
            config.excludeId = false;
        }

        if (selectedData.isRows) {
            values = grid.getRowsValues({
                selectedOnly: true,
                excludeId: config.excludeId
            });
        } else if (selectedData.isColumns) {
            values = grid.getRowsValues({
                filterField: Ext.bind(this.filterFieldBySelectedColumns, { selectedColumns: selectedData.selectedColumns }),
                excludeId: config.excludeId
            });
        } else if (selectedData.isCells) {
            startCell = selectedData.startCell;
            endCell = selectedData.endCell;
            selectedColumns = this.view.headerCt.getVisibleGridColumns();
            startColIdx = startCell.colIdx,
            endColIdx = endCell.colIdx;

            if (startColIdx > endColIdx) { // The range can be selected from right to left
                endColIdx = startColIdx;
                startColIdx = endCell.colIdx;
            }

            selectedColumns = Ext.Array.slice(selectedColumns, startColIdx, endColIdx + 1);

            startRowIdx = startCell.rowIdx,
            endRowIdx = endCell.rowIdx;

            if (startRowIdx > endRowIdx) { // The range can be selected from bottom to top
                endRowIdx = startRowIdx;
                startRowIdx = endCell.rowIdx;
            }

            selectedRecords = this.view.store.getRange(startRowIdx, endRowIdx);

            values = grid.getRowsValues({
                filterField: Ext.bind(this.filterFieldBySelectedColumns, { selectedColumns: selectedColumns }),
                filterRecord: function (record) {
                    return selectedRecords.indexOf(record) > -1;
                },
                excludeId: config.excludeId
            });
        }

        return values;
    },

    // Defined in Ext.NET
    filterFieldBySelectedColumns: function (record, fieldName, value) {
        var include = false;

        for (i = 0; i < this.selectedColumns.length; i++) {
            if (this.selectedColumns[i].dataIndex === fieldName) {
                include = true;
                break;
            }
        }

        return include;
    }
});

// @source core/Panel.js

Ext.panel.Panel.override({
    initComponent : function () {
        if (this.tbar && (this.tbar.xtype == "paging") && !Ext.isDefined(this.tbar.store) && this.store) {
            this.tbar.store = this.store;
        }
    
        if (this.bbar && (this.bbar.xtype == "paging") && !Ext.isDefined(this.bbar.store) && this.store) {
            this.bbar.store = this.store;
        }

        this.callParent(arguments);

        this.on("collapse", function(){
            var f = this.getCollapsedField();
        
            if (f) {
                f.el.dom.value = "true";
            }
        }, this);

        this.on("expand", function(){
            var f = this.getCollapsedField();
        
            if (f) {
                f.el.dom.value = "false";
            }
        }, this);
    },
    
    getCollapsedField : function () {
        if (!this.collapsedField && this.hasId()) {
            this.collapsedField = new Ext.form.Hidden({
                id    : this.id + "_Collapsed",
                name  : this.id + "_Collapsed",
                value : this.collapsed || false
            });
			
			this.on("beforedestroy", function () {
                this.destroy();
            }, this.collapsedField);	

            if (this.hasId()) {
                this.collapsedField.render(this.el.parent() || this.el);
            }
        }

        return this.collapsedField;
    },

    setIconCls : function (cls) {
        this.callParent([cls && cls.indexOf('#') === 0 ? X.net.RM.getIcon(cls.substring(1)) : cls]);
    },

    setIcon : function (icon) {
        if (this.getIconCls() && icon) {
            this.setIconCls("");
        }

        this.callParent([icon && icon.indexOf('#') === 0 ? X.net.RM.getIconUrl(icon.substring(1)) : icon]);
    },

    // #1231: disables ExtJS Panel's defaultButton functionality in favor of native Ext.NET Container's defaultButton
    onBoxReady: function() { 
        var defaultButton = this.defaultButton;

        delete this.defaultButton;
        this.callParent(arguments);
        this.defaultButton = defaultButton;
    }
});

Ext.panel.Header.override({
    setIconCls : function (cls) {
        this.callParent([cls && cls.indexOf('#') === 0 ? X.net.RM.getIcon(cls.substring(1)) : cls]);
    },

    setIcon : function (icon) {
        if (this.getIconCls() && icon) {
            this.setIconCls("");
        }

        this.callParent([icon && icon.indexOf('#') === 0 ? X.net.RM.getIconUrl(icon.substring(1)) : icon]);
    }
});
Ext.panel.Table.override({
    processEvent: function (type, view, cell, recordIndex, cellIndex, e, record, row) {
        if (this.ignoreTargets) {
            var i;

            for (i = 0; i < this.ignoreTargets.length; i++) {
                if (e.getTarget(this.ignoreTargets[i])) {
                    return false;
                }
            }
        }

        return this.callParent(arguments);
    },

    doDestroy: function () {
        if (this.editors) {
            Ext.destroy(this.editors);
        }

        this.callParent(arguments);
    },

    hasLockedColumns: function (columns) {
        var i,
            len,
            column;

        if (columns && columns.isRootHeader) {
            columns = columns.items.items;
        } else if (Ext.isObject(columns)) {
            columns = columns.items;
        }

        for (i = 0, len = columns ? columns.length : 0; i < len; i++) {
            column = columns[i];
            if (!column.processed && column.locked) {
                return true;
            }
        }
    },

    insertColumn: function (index, newCol, updateLayout) {
        var headerCt = this.normalGrid ? this.normalGrid.headerCt : this.headerCt;

        if (index < 0) {
            index = 0;
        }

        if (newCol.locked && this.lockedGrid) {
            headerCt = this.lockedGrid.headerCt;
        }

        headerCt.insert(index, newCol);

        if (updateLayout !== false) {
            this.updateLayout();
            this.fireEvent('reconfigure', this, null, null);
            this.getView().refresh();
        }
    },

    addColumn: function (newCol, updateLayout) {
        var headerCt = this.normalGrid ? this.normalGrid.headerCt : this.headerCt;

        if (newCol.locked && this.lockedGrid) {
            headerCt = this.lockedGrid.headerCt;
        }

        this.insertColumn(headerCt.getColumnCount(), newCol, updateLayout);
    },

    removeColumn: function (index, updateLayout) {
        var headerCt = this.normalGrid ? this.normalGrid.headerCt : this.headerCt,
            column,
            locked = false;

        column = headerCt.getComponent(index);

        if (!column && this.lockedGrid) {
            headerCt = this.lockedGrid.headerCt;
            column = headerCt.getComponent(index);
            locked = true;
        }

        if (column) {
            headerCt.remove(column);

            if (updateLayout !== false) {
                if (locked) {
                    this.syncLockedWidth();
                    this.lockedGrid.getView().refresh();
                }

                this.updateLayout();
                this.fireEvent('reconfigure', this, null, null);
                this.getView().refresh();
            }
        }
    },

    removeAllColumns: function (updateLayout) {
        var headerCt = this.normalGrid ? this.normalGrid.headerCt : this.headerCt;

        headerCt.removeAll();

        if (this.lockedGrid) {
            this.lockedGrid.headerCt.removeAll();
        }

        if (updateLayout !== false) {
            this.updateLayout();
            this.fireEvent('reconfigure', this, null, null);
            this.getView().refresh();
        }
    },

    // #871
    setHideHeaders: function (hideHeaders) {
        var headerCt;

        if (this.lockedGrid) {
            this.lockedGrid.setHideHeaders(hideHeaders);
            this.normalGrid.setHideHeaders(hideHeaders);

            return;
        }

        if (this.rendered) {
            headerCt = this.getView().headerCt;

            if (hideHeaders) {
                headerCt.setHeight(0);
                headerCt.addCls(this.hiddenHeaderCtCls);
                this.addCls(this.hiddenHeaderCls);
                headerCt.hiddenHeaders = true;
            } else {
                headerCt.setHeight("auto");
                headerCt.removeCls(this.hiddenHeaderCtCls);
                this.removeCls(this.hiddenHeaderCls);
                headerCt.hiddenHeaders = false;
            }
        } else {
            this.hideHeaders = hideHeaders;
        }
    },

    // #902
    updateSelection: function (selection) {
        var me = this,
            sm;

        if (!me.ignoreNextSelection) {
            me.ignoreNextSelection = true;
            sm = me.getSelectionModel();

            if (selection || selection === 0) { // #902
                sm.select(selection);
            } else {
                sm.deselectAll();
            }

            me.ignoreNextSelection = false;
        }
    },

    privates: {
        doEnsureVisible: function (record, options) {
            var me = this,
                view = me.getView(),
                undoGetNodeHack = false;

            // If options.column is specified, hack into the view, wrapping the
            // getNode() function to get the corresponding cell DOM element.
            if (options && options.column) {
                view._queryArgs = { record: record, column: options.column };

                // Avoid rewriting the original method in case of nested calls.
                if (view._orgGetNode === undefined) {
                    view._orgGetNode = view.getNode;

                    if (view._getNodeWrapper === undefined) {
                        view._getNodeWrapper = function () {
                            var me = this,
                                cell = me.getCell(me._queryArgs.record, me._queryArgs.column);

                            // The cell result may be undefined if in a
                            // buffered grid the cell is too far away
                            // from the viewed/buffered rows.
                            return cell ? cell.dom : undefined;
                        };
                    }
                    view.getNode = view._getNodeWrapper;
                    undoGetNodeHack = true;
                }
            }

            me.callParent(arguments);

            // Undo the replacement so that subsequent node queries work correctly
            if (undoGetNodeHack) {
                delete view._queryArgs;

                view.getNode = view._orgGetNode;

                delete view._orgGetNode;
            }
        }
    }
});
Ext.view.AbstractView.override({
    // #1330: many Ext.NET code relies on the "view" first argument being passed to "beforeitemupdate" handlers,
    // but ExtJS doesn't pass the "view" argument. This overrides fixes it.
    fireEvent: function() {
        if (arguments.length >= 2 && arguments[0] === "beforeitemupdate" && !(arguments[1] instanceof Ext.view.AbstractView)) {
            arguments = Ext.Array.insert(Array.prototype.slice.call(arguments), 1, [this]);
        }

        return this.callParent(arguments); // The original fix for #1330 missed "return"
    },

    onRemove: function (ds, records, index) {
        var i;

        for (i = records.length - 1; i >= 0; --i) {
            this.fireEvent('beforeitemremove', this, records[i], index + i);
        }

        this.callParent(arguments);
    }
});
Ext.view.View.override({
    initComponent : function () {
         this.plugins = this.plugins || [];
         this.plugins.push(Ext.create('Ext.view.plugin.SelectionSubmit', {}));

         this.callParent(arguments);
    },

    getRowsValues : function (config) {
        if (Ext.isBoolean(config)) {
            config = {selectedOnly: config};
        }
        
        config = config || {};

        var records = (config.selectedOnly === true ? this.getSelectionModel().getSelection() : this.store.getRange()) || [],
            record,
            values = [],
            dataR,
            idProp,
            i;

        for (i = 0; i < records.length; i++) {
            record = records[i];
            if (Ext.isEmpty(records[i])) {
                continue;
            }

            idProp = record.self.idField.name;
            
            dataR = Ext.apply({}, record.data);

            if (idProp && dataR.hasOwnProperty(idProp)) {
                dataR[idProp] = record.getId();
            }
            
            dataR = this.store.prepareRecord(dataR, record, config);

            if (!Ext.isEmptyObj(dataR)) {
                values.push(dataR);
            }
        }

        return values;
    },

    submitData : function (config) {
        this.store._submit(this.getRowsValues(config));
    },

    handleMouseOver: function (e) {
        var me = this,
            item = e.getTarget();

        if (me.destroyed || ((Ext.fly(item).parent("." + me.baseCls) == me.el) && (!me.body || me.body.contains(item)))) { // #826
            return this.callParent(arguments);
        }
    }
});
Ext.view.BoundList.override({
    initComponent : function () {
        this.callParent(arguments);

        var cfg = this.initialConfig;
        if (cfg) {
            if (cfg.itemCls) {
                this.itemCls = cfg.itemCls;
            }

            if (cfg.selectedItemCls) {
                this.selectedItemCls = cfg.selectedItemCls;
            }

            if (cfg.overItemCls) {
                this.overItemCls = cfg.overItemCls;
            }

            if (cfg.itemSelector) {
                this.itemSelector = cfg.itemSelector;
            }
        }
    }
});
// @source src/view/DropZone.js

Ext.view.DropZone.override({
    getPosition: function (e, node) {
        var regionEl = Ext.get(node);

        if (regionEl.down("td.x-group-hd-container")) {
            regionEl = regionEl.down("tr.x-grid-row");
        }

        return this.callParent([e, regionEl]);
    },

    positionIndicator: function (node, data, e) {
        var me = this,
            view = me.view,
            pos = me.getPosition(e, node),
            overRecord = view.getRecord(node);

        if (me.overRecord != overRecord || me.currentPosition != pos) {
            node = Ext.get(node);

            if (node.down("td.x-group-hd-container")) {
                node = node.down("tr.x-grid-row");
            }
        }

        this.callParent([node, data, e]);
    }
});


Ext.define('Ext.view.plugin.SelectionSubmit', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.viewselectionsubmit',
    
    init : function (view) {
        var me = this;       
        view.getSelectionSubmit = function () {
            return me;
        };
        
        if (view instanceof Ext.view.Table || view instanceof Ext.view.BoundList) {
            return;
        }
        
        this.view = view;
        this.store = view.store;              
        
        this.initSelection();
    },
    
    initSelection : function () {
        this.hField = this.getSelectionModelField();

        if(this.view.hasId() && this.view.selectionSubmit !== false) {
            this.view.on("selectionchange", this.updateSelection, this, { buffer: 10 });
            this.store.on("clear", this.clearField, this);
        }
        
        this.view.on("viewready", function () {
            if(this.view.hasId() && this.view.selectionSubmit !== false) {
                this.getSelectionModelField().render(this.view.el.parent() || this.view.el);
            }
            this.initSelectionData();
        }, this);        
    },

    clearField : function () {
        this.getSelectionModelField().setValue("");
    },
    
    getSelectionModelField : function () {        
        if (!this.hField) {
            this.hField = new Ext.form.field.Hidden({ name: this.view.id });           
        }

        return this.hField;
    },
    
    destroy : function () {
        if (this.hField) {
            this.hField.destroy();
        }
    },
    
    doSelection : function () {
        var view = this.view,
            store = this.store,
            selModel = view.getSelectionModel(),
            data = view.selectedData;

        if (!Ext.isEmpty(data)) {
            selModel.suspendChanges();
            
            var records = [],
                record;

            for (var i = 0; i < data.length; i++) {
                if (!Ext.isEmpty(data[i].recordID)) {
                    record = store.getById(data[i].recordID);
                        
                    if (!record && Ext.isNumeric(data[i].recordID)) {
                        record = store.getById(parseInt(data[i].recordID, 10));
                    }
                } else if (!Ext.isEmpty(data[i].rowIndex)) {
                    record = store.getAt(data[i].rowIndex);
                }

                if (!Ext.isEmpty(record)) {
                    records.push(record);
                }
            }
            selModel.select(records);
            
            
            this.updateSelection();
            selModel.resumeChanges();
            delete selModel.selectedData;
        }
    },
    
    updateSelection : function () {
        var view = this.view,
            store = this.store,
            selModel = view.getSelectionModel(),
            rowIndex,
            selectedRecords,
            records = [];
            
        if (this.view.selectionSubmit === false) {
            return;
        }
            
        selectedRecords = selModel.getSelection();

        for (var i = 0; i < selectedRecords.length; i++) {
            rowIndex = store.indexOfId(selectedRecords[i].getId());                    
            records.push({ RecordID: selectedRecords[i].getId(), RowIndex: rowIndex });
        }
        

        this.hField.setValue(Ext.encode(records));
    },

    initSelectionData : function () {
        if (this.store && this.view.viewReady) {
            if (this.store.getCount() > 0) {
               Ext.defer(this.doSelection, 100, this);
            } else {
                this.store.on("load", this.doSelection, this, { single: true, delay : 100 });
            }
        }
    }   
});

Ext.view.Table.override({     
    processUIEvent: function (e) {
        if (this.stopEventFn && this.stopEventFn(this, e) === false) {
            return false;
        }
        
        return this.callParent(arguments);
    },
    
    getFeature: function(id) {
        var f = this.callParent(arguments);

        if (!f) {
            var features = this.featuresMC;
            if (features) {
                return features.getAt(features.findIndex("proxyId", id));
            }
        }

        return f;
    }
});
Ext.view.MultiSelector.override({
    initComponent: function () {
        this.callParent(arguments);

        if (this.hasId()) {
            this.store.on("datachanged", function () {
                this.getValueField().setValue(Ext.encode(this.getValues()));
            }, this);
        }
    },

    getValues: function () {
        var records = this.store.getRange() || [],
            record,
            values = [];

        for (var i = 0; i < records.length; i++) {
            record = records[i];
            values.push({
                text: record.get(this.fieldName),
                id: record.getId()
            });
        }

        return values;
    },

    getValueField: function () {
        if (!this.valueField && this.hasId()) {
            this.valueField = new Ext.form.Hidden({
                name: this.id
            });

            this.on("beforedestroy", function () {
                this.destroy();
            }, this.valueField);

            if (this.hasId()) {
                this.valueField.render(this.el.parent() || this.el);
            }
        }

        return this.valueField;
    }
});

Ext.view.MultiSelectorSearch.override({
    makeItems: function () {
        if (this.items) {
            return this.items;
        }

        var items = this.callParent(arguments);

        if (this.searchGridConfig) {
            Ext.apply(items[0], this.searchGridConfig);
        }

        return items;
    },

    makeDockedItems: function () {
        if (this.dockedItems) {
            return this.dockedItems;
        }

        var items = this.callParent(arguments);

        if (this.searchFieldConfig) {
            Ext.apply(items[0], this.searchFieldConfig);
        }

        return items;
    }
});

// @source core/tree/TreePanel.js

Ext.tree.Panel.override({
    mode: "local",
    selectionSubmit: false,

    constructor: function (config) {
        if (config && config.autoLoad) {
            delete config.autoLoad;
        }

        this.callParent(arguments);
    },

    initSelectionSubmit: function () {
        this.plugins = this.plugins || [];
        this.plugins.push(Ext.create('Ext.grid.plugin.SelectionSubmit', {}));
    },

    doSelection: function () {
        this.getSelectionSubmit().doSelection();
    },

    initSelectionData: function () {
        this.getSelectionSubmit().initSelectionData();
    },

    initComponent: function () {

        this.initSelectionSubmit();

        this.callParent(arguments);

        this.relayEvents(this.getView(), ["nodedragover"]);

        if ((Ext.isEmpty(this.selectionSubmitConfig) || this.selectionSubmitConfig.disableAutomaticSubmit !== true) && this.hasId()) {
            this.getSelectionModel().on("selectionchange", this.updateSelection, this);
            this.on("checkchange", this.updateCheckSelection, this);
            this.on("load", this.updateCheckSelection, this);
            this.on("itemappend", this.updateCheckSelection, this);
            this.on("iteminsert", this.updateCheckSelection, this);
            this.on("afterrender", this.updateCheckSelection, this, { single: true });
        }

        if (this.noLeafIcon) {
            this.addCls("x-noleaf-icon");
        }

        if (this.mode === "remote") {
            this.mode = "local";
            this.on("afterrender", function () {
                this.setMode("remote");
            }, this, { single: true });
        }
    },

    expandAll: function (callback, scope) {
        if (Ext.isBoolean(callback)) {
            var _oldTree = this.enableAnimations,
                _oldView = this.getView().animate;

            this.getView().animate = callback;
            this.enableAnimations = callback;
            this.callParent();
            this.enableAnimations = _oldTree;
            this.getView().animate = _oldView;
        } else {
            this.callParent(arguments);
        }
    },

    collapseAll: function (callback, scope) {
        if (Ext.isBoolean(callback)) {
            var _oldTree = this.enableAnimations,
                _oldView = this.getView().animate;

            this.getView().animate = callback;
            this.enableAnimations = callback;
            this.callParent();
            this.enableAnimations = _oldTree;
            this.getView().animate = _oldView;
        } else {
            this.callParent(arguments);
        }
    },

    filterBy: function (fn, config) {
        config = config || {};

        if (config.autoClear) {
            this.store.clearFilter();
        }

        var f = function (n) {
            var m = fn.call(config.scope || n, n),
                child;

            if (!m) {
                //child = n.findChildBy(fn, config.scope || n, true);
                child = n.findChild("visible", true, true);

                if (!child) {
                    return false;
                }
            } 

            return true;
        };

        this.store.filterBy(f, this);

        if (config.expandNodes !== false) {
            this.expandAll();
        }
    },

    clearFilter: function (collapse) {
        if (collapse) {
            this.collapseAll();
        }

        this.store.clearFilter();
    },

    // cfg : (required)ids, (optional)value, (optional)keepExisting, (optional)silent
    setChecked: function (cfg) {
        cfg = cfg || {};

        var originFn = this.updateCheckSelection;
        this.updateCheckSelection = Ext.emptyFn;

        if (cfg.silent) {
            this.suspendEvents();
        }

        if (cfg.keepExisting !== true) {
            this.clearChecked();
        }

        cfg.value = Ext.isDefined(cfg.value) ? cfg.value : true;

        if (cfg.ids) {
            for (var i = 0, l = cfg.ids.length; i < l; i++) {
                var node = this.store.getNodeById(cfg.ids[i]);

                node.set('checked', cfg.value);
                this.fireEvent('checkchange', node, cfg.value);
            }
        }

        if (cfg.nodes) {
            for (var i = 0, l = cfg.nodes.length; i < l; i++) {
                var node = cfg.nodes[i];

                node.set('checked', cfg.value);
                this.fireEvent('checkchange', node, cfg.value);
            }
        }

        this.updateCheckSelection = originFn;
        this.updateCheckSelection();
        if (cfg.silent) {
            this.resumeEvents();
        }
    },

    toggleChecked: function (startNode, value) {
        startNode = startNode || this.getRootNode();

        var f = function (node) {
            var oldValue = node.get("checked");

            if (Ext.isBoolean(oldValue) && oldValue !== value) {
                node.set('checked', value);
                this.fireEvent('checkchange', node, value);
            }
        };

        var originFn = this.updateCheckSelection;
        this.updateCheckSelection = Ext.emptyFn;

        startNode.cascadeBy(f, this);

        this.updateCheckSelection = originFn;
        this.updateCheckSelection();
    },

    clearChecked: function (startNode) {
        this.toggleChecked(startNode, false);
    },

    setAllChecked: function (startNode) {
        this.toggleChecked(startNode, true);
    },

    afterRender: function () {
        this.callParent(arguments);

        if ((Ext.isEmpty(this.selectionSubmitConfig) || this.selectionSubmitConfig.disableAutomaticSubmit !== true) && this.hasId()) {
            this.getSelectionModelField().render(this.el.parent() || this.el);
            this.getCheckNodesField().render(this.el.parent() || this.el);
        }
    },

    getSelectionModelField: function () {
        if (!this.selectionModelField) {
            this.selectionModelField = new Ext.form.field.Hidden({ name: this.selectedHiddenName || (this.id + "_SM") });

            this.on("beforedestroy", function () {
                this.destroy();
            }, this.selectionModelField);
        }

        return this.selectionModelField;
    },

    getCheckNodesField: function () {
        if (!this.checkNodesField) {
            this.checkNodesField = new Ext.form.field.Hidden({ name: this.checkedHiddenName || (this.id + "_CheckNodes") });

            this.on("beforedestroy", function () {
                this.destroy();
            }, this.checkNodesField);
        }

        return this.checkNodesField;
    },

    excludeAttributes: [
        "parentId",
        "index",
        "leaf",
        "depth",
        "expanded",
        "expandable",
        "cls",
        "icon",
        "iconCls",
        "root",
        "isLast",
        "isFirst",
        "allowDrag",
        "allowDrop",
        "loaded",
        "loading",
        "href",
        "hrefTarget",
        "qtip",
        "qtitle",
        "qshowDelay",
        "children",
        "dataPath",
        "selected",
        "visible"
    ],

    defaultAttributeFilter: function (attrName, attrValue) {
        return typeof attrValue != "function" && Ext.Array.indexOf(this.excludeAttributes, attrName) == -1;
    },

    defaultNodeFilter: function (node) {
        return true;
    },

    serializeTree: function (config) {
        config = config || {};

        if (Ext.isEmpty(config.withChildren)) {
            config.withChildren = true;
        }

        return Ext.encode(this.convertToSubmitNode(this.getRootNode(), config));
    },

    convertToSubmitNode: function (node, config) {
        config = config || {};

        if (!config.prepared) {
            config.attributeFilter = config.attributeFilter || Ext.Function.bind(this.defaultAttributeFilter, this);
            config.nodeFilter = config.nodeFilter || Ext.Function.bind(this.defaultNodeFilter, this);
            config.prepared = true;
        }

        if (!config.nodeFilter(node)) {
            return;
        }

        var sNode = {},
            path = node.getPath(config.pathAttribute),
            deleteAttrs = true;

        if (config.attributeFilter(node.idProperty, node.getId())) {
            sNode.nodeID = node.getId();
        }

        if (config.attributeFilter(node.clientIdProperty, node.internalId)) {
            sNode.clientID = node.internalId;
        }

        if (config.attributeFilter(this.displayField, node.data[this.displayField])) {
            sNode.text = config.encode ? Ext.util.Format.htmlEncode(node.data[this.displayField]) : node.data[this.displayField];
        }

        if (config.attributeFilter("path", path)) {
            sNode.path = path;
        }

        sNode.attributes = {};

        for (var attr in node.data) {
            if (attr == node.idProperty || attr == this.displayField) {
                continue;
            }

            var attrValue = node.data[attr];

            if (config.attributeFilter(attr, attrValue)) {
                sNode.attributes[attr] = attrValue;
                deleteAttrs = false;
            }
        }

        if (deleteAttrs) {
            delete sNode.attributes;
        }

        if (config.withChildren) {
            var children = node.childNodes;

            if (children.length !== 0) {
                sNode.children = [];

                for (var i = 0; i < children.length; i++) {
                    var cNode = this.convertToSubmitNode(children[i], config);

                    if (!Ext.isEmpty(cNode)) {
                        sNode.children.push(cNode);
                    }
                }

                if (sNode.children.length === 0) {
                    delete sNode.children;
                }
            }
        }

        return sNode;
    },

    getSelectedNodes: function (config) {
        var selection = this.getSelectionModel().getSelection(),
            selNodes = [];

        if (!selection || selection.length == 0) {
            return [];
        }

        Ext.each(selection, function (node) {
            selNodes.push(this.convertToSubmitNode(node, config));
        }, this);

        return selNodes;
    },

    // Fix for a locking tree, see github issue #250
    // Remove after Sencha fix
    getChecked: function () {
        var view = this.getView();

        if (view.lockedView) {
            view = view.lockedView;
        }

        return view.getChecked();
    },

    getCheckedNodes: function (config) {
        var checkedNodes = this.getChecked();

        if (Ext.isEmpty(checkedNodes)) {
            return [];
        }

        var nodes = [];

        Ext.each(checkedNodes, function (node) {
            nodes.push(this.convertToSubmitNode(node, config));
        }, this);

        return nodes;
    },

    updateSelection: function () {
        this.selectionSubmitConfig = this.selectionSubmitConfig || {};

        if (Ext.isEmpty(this.selectionSubmitConfig.withChildren)) {
            this.selectionSubmitConfig.withChildren = false;
        }

        var selection = this.getSelectedNodes(this.selectionSubmitConfig);

        if (!Ext.isEmpty(selection)) {
            this.getSelectionModelField().setValue(Ext.encode(selection));
        } else {
            this.getSelectionModelField().setValue("");
        }
    },

    updateCheckSelection: function () {
        this.selectionSubmitConfig = this.selectionSubmitConfig || {};

        if (Ext.isEmpty(this.selectionSubmitConfig.withChildren)) {
            this.selectionSubmitConfig.withChildren = false;
        }

        var selection = this.getCheckedNodes(this.selectionSubmitConfig);

        if (!Ext.isEmpty(selection)) {
            this.getCheckNodesField().setValue(Ext.encode(selection));
        } else {
            this.getCheckNodesField().setValue("");
        }
    },

    submitNodes: function (config) {
        var nodes = this.serializeTree(config),
            ac = Ext.apply(this.directEventConfig || {}, config);

        if (ac.params) {
            ac.extraParams = ac.params;
            delete ac.params;
        }

        if (ac.callback) {
            ac.userCallback = ac.callback;
            delete ac.callback;
        }

        if (ac.scope) {
            ac.userScope = ac.scope;
            delete ac.scope;
        }

        if (this.submitUrl && !ac.url) {
            ac.url = this.submitUrl;
        }

        Ext.apply(ac, {
            control: this,
            eventType: "postback",
            action: "submit",
            serviceParams: nodes,
            userSuccess: this.submitSuccess,
            userFailure: this.submitFailure
        });

        if (ac.cleanRequest || ac.url) {
            ac.extraParams = ac.extraParams || {};
            ac.extraParams.data = ac.serviceParams;
            delete ac.serviceParams;
        }

        Ext.net.DirectEvent.request(ac);
    },

    submitFailure: function (response, result, context, type, action, extraParams, o) {
        var msg = { message: result.errorMessage || response.statusText };

        if (o && o.userCallback) {
            o.userCallback.call(o.userScope || context, o, false, response);
        }

        if (!context.hasListener("submitexception")) {
            if (o.showWarningOnFailure !== false && o.cancelFailureWarning !== true) {
                Ext.net.DirectEvent.showFailure(response, msg.message);
            }
        }

        context.fireEvent("submitexception", context, o, response, msg);
    },

    submitSuccess: function (response, result, context, type, action, extraParams, o) {
        try {
            var responseObj = result.serviceResponse || result;
            result = { success: responseObj.success, msg: responseObj.message };
        } catch (e) {
            if (o && o.userCallback) {
                o.userCallback.call(o.userScope || context, o, false, response);
            }

            if (Ext.net.DirectEvent.fireEvent("ajaxrequestexception", {}, { "errorMessage": e.message }, null, null, null, null, o) !== false) {
                if (!context.hasListener("submitexception")) {
                    if (o.showWarningOnFailure !== false) {
                        Ext.net.DirectEvent.showFailure(response, e.message);
                    }
                }
            }

            context.fireEvent("submitexception", context, o, response, e);

            return;
        }

        if (result.success === false) {
            if (o && o.userCallback) {
                o.userCallback.call(o.userScope || context, o, false, response);
            }

            if (Ext.net.DirectEvent.fireEvent("ajaxrequestexception", {}, { "errorMessage": result.msg }, null, null, null, null, o) !== false) {
                if (!context.hasListener("submitexception")) {
                    if (o.showWarningOnFailure !== false) {
                        Ext.net.DirectEvent.showFailure(response, result.msg);
                    }
                }
            }

            context.fireEvent("submitexception", context, o, response, { message: result.msg });

            return;
        }

        if (o && o.userCallback) {
            o.userCallback.call(o.userScope || context, o, true, response);
        }

        context.fireEvent("submit", context, o);
    },

    //---remote mode section------

    setMode: function (mode) {
        if (mode === "remote" && this.mode === "local") {
            this.localActions = this.localActions || [];

            if (this.isEditable) {
                this.on("edit", this.onRemoteNodeEditComplete, this);
                this.on("canceledit", this.onRemoteNodeCancelEdit, this);
            }

            if (this.ddPlugin) {
                this.getView().on("beforedrop", this.onRemoteBeforeNodeDrop, this);
            }
        } else if (mode === "local" && this.mode === "remote") {
            if (this.editors) {
                Ext.each(this.editors, function (editor) {
                    editor.un("complete", this.onRemoteNodeEditComplete, this);
                    editor.un("canceledit", this.onRemoteNodeCancelEdit, this);
                }, this);
            }

            if (this.enableDD) {
                this.un("beforenodedrop", this.onRemoteBeforeNodeDrop, this);
            }
        }

        this.mode = mode;
    },

    remoteOptions: function (action, node) {
        var dc = Ext.apply({}, this.directEventConfig || {}),
		    options = { action: action, node: node, params: {} };

        if (this.fireEvent("beforeremoteaction", this, node, options, action) !== false) {
            dc.userSuccess = Ext.Function.bind(this.remoteActionSuccess, this);
            dc.userFailure = Ext.Function.bind(this.remoteActionFailure, this);
            dc.extraParams = options.params;
            dc.node = node;
            dc.control = this;
            dc.eventType = "postback";
            dc.action = action;

            if (!Ext.isEmpty(this[action + "Url"], false)) {
                dc.url = this[action + "Url"];
                dc.cleanRequest = true;
            }

            return dc;
        }

        return false;
    },

    remoteActionSuccess: function (response, result, context, type, action, extraParams, o) {
        if (o.node) {
            o.node.set("loading", false);
        }

        var rParams;

        try {
            rParams = result.extraParamsResponse || result.response || (result.d ? result.d.response : {}) || {};
            var responseObj = result.serviceResponse || result.d || result;
            result = {
                success: Ext.isDefined(responseObj.actionSuccess) ? responseObj.actionSuccess : responseObj.success,
                msg: responseObj.message,
                attributes: rParams.ra_applyObject || rParams.attributes
            };
        } catch (ex) {
            this.fireEvent("remoteactionexception", this, response, ex, o);

            if (o.cancelWarningFailure !== true &&
		        (this.directEventConfig || {}).showWarningFailure !== false &&
		        !this.hasListener("remoteactionexception")) {
                Ext.net.DirectEvent.showFailure(response, result.msg);
            }

            return;
        }

        if (result.success !== true) {
            this.fireEvent("remoteactionrefusal", this, response, { message: result.msg }, o);

            if (o.action === "raAppend" || o.action === "reInsert") {
                o.node.parentNode.removeChild(o.node);
            }
            else if (o.action === "raMove") {
                o.e.dropHandlers.cancelDrop();
            }
            else {
                o.node.reject();
            }

            return;
        }

        if (Ext.isObject(result.attributes)) {
            o.node.set(result.attributes);
        }

        if (o.action != "raEdit" && Ext.isDefined(rParams.value)) {
            o.node.set("text", rParams.value);
        }

        var id = rParams.ra_id || rParams.id;
        if (id) {
            o.node.setId(id);
        }

        switch (o.action) {
            case "raEdit":
                if (o.isRowEditing) {
                    if (Ext.isDefined(rParams.ra_newValues) || Ext.isDefined(rParams.value) || !o.fromEditor) {
                        o.node.set(rParams.ra_newValues || rParams.value || o.raConfig.newValues);
                    }
                }
                else if (Ext.isDefined(rParams.ra_newValue) || Ext.isDefined(rParams.value) || !o.fromEditor) {
                    o.node.set(o.raConfig.field, rParams.ra_newValue || rParams.value || o.raConfig.newValue);
                }
                break;
            case "raRemove":
                o.node.parentNode.removeChild(o.node);
                break;
            case "raMove":
                if (o.e.currentPosition === "append") {
                    o.e.overNode.expand();

                    if (o.e.overNode.data.loaded || o.e.overNode.isLeaf()) {
                        o.e.dropHandlers.processDrop();
                    } else {
                        o.e.dropHandlers.cancelDrop();

                        var parentNode = o.node.parentNode,
                            index = parentNode.indexOf(o.node);

                        o.node.remove();

                        o.e.overNode.on("load", function () {
                            var index = this.newParent.indexOfId(this.id),
                                node;
                            if (index >= 0) {
                                node = this.newParent.getChildAt(index);
                                node.fireEvent("move", node, this.oldParent, this.newParent, this.index);
                            }
                        }, {
                            tree: this,
                            oldParent: parentNode,
                            newParent: o.e.overNode,
                            id: o.node.getId(),
                            index: index
                        }, { single: true });
                    }
                }
                else {
                    o.e.dropHandlers.processDrop();
                }

                break;
            case "raAppend":
            case "raInsert":
                this.getSelectionModel().select(o.node);
                break;
        }

        o.node.commit();

        this.fireEvent("remote" + action.toLowerCase().substr(2) + "success", this, o.node, action, o);
        this.fireEvent("remoteactionsuccess", this, o.node, action, o);
    },

    remoteActionFailure: function (response, result, context, type, action, extraParams, o) {
        if (o.node) {
            o.node.set('loading', false);
        }

        if (o.action === "raAppend" || o.action === "reInsert") {
            o.node.parentNode.removeChild(o.node);
        }
        else if (o.action === "raMove") {
            o.e.dropHandlers.cancelDrop();
        }
        else {
            o.node.reject();
        }

        this.fireEvent("remoteactionexception", this, response, { message: response.statusText }, o);

        if (o.cancelWarningFailure !== true &&
            (this.directEventConfig || {}).showWarningFailure !== false &&
	        !this.hasListener("remoteactionexception")) {
            Ext.net.DirectEvent.showFailure(response, response.responseText);
        }
    },

    onRemoteNodeEditComplete: function (editor, e) {
        if (e.record.isNew) {
            var insert = e.record.insertAction;

            delete e.record.isNew;
            delete e.record.insertAction;

            this.appendChildRequest(e.record, insert);

            return;
        }

        this.editNode(e.record, e.field, e.value, e);
        return false;
    },

    onRemoteNodeCancelEdit: function (editor, e) {
        if (e.record.isNew) {
            e.record.parentNode.removeChild(editor.record);
        }
    },

    performRemoteAction: function (config) {
        if (config.cleanRequest) {
            if (this.remoteJson) {
                config.json = true;
                config.method = "POST";
            }

            config.extraParams = Ext.apply(config.extraParams, config.raConfig);
            config.type = "load";
        } else {
            config.serviceParams = Ext.encode(config.raConfig);
        }

        config.node.set('loading', true);
        Ext.net.DirectEvent.request(config);
    },

    appendChildRequest: function (node, insert) {
        if (this.mode === "local" || Ext.Array.indexOf(this.localActions, insert ? "insert" : "append") !== -1) {
            return;
        }

        var dc = this.remoteOptions("ra" + (insert ? "Insert" : "Append"), node);

        if (dc !== false && this.fireEvent("beforeremote" + (insert ? "insert" : "append"), this, node, dc.extraParams, insert) !== false) {
            dc.raConfig = {
                id: node.getId(),
                parentId: node.parentNode.getId(),
                text: this.convertText(node.data.text),
                index: node.parentNode.indexOf(node)
            };

            this.performRemoteAction(dc);
        }
    },

    editNode: function (node, field, value, e) {
        field = field || "text";
        if (this.mode === "local" || Ext.Array.indexOf(this.localActions, "edit") !== -1) {
            if (!e) {
                node.set(field, value);
            }
            return;
        }

        var dc = this.remoteOptions("raEdit", node);

        if (dc !== false && this.fireEvent("beforeremoteedit", this, node, dc.extraParams) !== false) {
            dc.raConfig = {
                id: node.getId(),
                field: field,
                newValue: this.convertText(value),
                oldValue: this.convertText(e ? e.originalValue : node.get(field))
            };

            if (e && e.newValues) {
                dc.raConfig.newValues = e.newValues;
                dc.raConfig.oldValues = e.originalValues;
                dc.raConfig.isRow = true;
                delete dc.raConfig.field;
                delete dc.raConfig.newValue;
                delete dc.raConfig.oldValue;

                dc.isRowEditing = true;
            }

            dc.fromEditor = !!e;

            this.performRemoteAction(dc);
        }
    },

    convertText: function (text) {
        if (!Ext.isString(text)) {
            return text;
        }

        if (text == "&#160;") {
            return "";
        }

        return Ext.util.Format.htmlEncode(text);
    },

    onRemoteBeforeNodeDrop: function (node, data, overRecord, currentPosition, dropHandlers) {
        if (this.mode === "local" || Ext.Array.indexOf(this.localActions, "move") !== -1) {
            return true;
        }

        this.moveNodeRequest(node, data, overRecord, currentPosition, dropHandlers);
        dropHandlers.wait = true;
        return false;
    },

    moveNodeRequest: function (node, data, overNode, currentPosition, dropHandlers) {
        if (this.mode === "local" || Ext.Array.indexOf(this.localActions, "move") !== -1) {
            return;
        }

        var dc = this.remoteOptions("raMove", data.records[0]);

        if (dc !== false && this.fireEvent("beforeremotemove", this, data.records, overNode, {
            node: node,
            data: data,
            overNode: overNode,
            currentPosition: currentPosition,
            dropHandlers: dropHandlers
        }, dc.extraParams) !== false) {

            dc.e = {
                dropHandlers: dropHandlers,
                data: data,
                overNode: overNode,
                currentPosition: currentPosition
            };

            var ids = [],
                parentIds = [];
            Ext.each(data.records, function (r) {
                ids.push(r.getId());
                parentIds.push(r.parentNode.getId());
            });

            dc.raConfig = {
                ids: ids,
                targetId: overNode.getId(),
                parentIds: parentIds,
                point: currentPosition
            };

            dropHandlers.wait = true;

            this.performRemoteAction(dc);
        }
    },

    removeNode: function (node) {
        if (node.isRoot()) {
            return;
        }

        if (this.mode === "local" || Ext.Array.indexOf(this.localActions, "remove") !== -1) {
            node.parentNode.removeChild(node);
            return;
        }

        var dc = this.remoteOptions("raRemove", node);

        if (dc !== false && this.fireEvent("beforeremoteremove", this, node, dc.extraParams) !== false) {
            dc.raConfig = {
                id: node.getId(),
                parentId: node.parentNode.getId()
            };

            this.performRemoteAction(dc);
        }
    },

    appendChild: function (parentNode, defaultText, insert, index) {
        var node = parentNode,
		    nodeAttr = {},
		    child;

        if (node.isLeaf()) {
            //node.set("leaf", false);
            //node.set("loaded", true);
            node.data.leaf = false;
            node.data.loaded = true;
            this.store.fireEvent('update', this, node, Ext.data.Model.EDIT, null);
        }

        this.getView().animate = false;
        node.expand(false);
        this.getView().animate = this.enableAnimations;

        if (Ext.isString(defaultText)) {
            nodeAttr = { text: defaultText || "", loaded: true, leaf: true };
        } else {
            nodeAttr = Ext.applyIf(defaultText, { text: "", loaded: true });
        }

        if (insert) {
            var beforeNode = index ? node.childNodes[index] : node.firstChild;
            child = node.insertBefore(nodeAttr, beforeNode);
        } else {
            child = node.appendChild(nodeAttr);
        }

        child.isNew = true;
        child.insertAction = insert;

        this.startEdit(child, this.headerCt.items.items[0]);
    },

    insertBefore: function (node, defaultText) {
        var nodeAttr = {},
		    child;

        if (Ext.isString(defaultText)) {
            nodeAttr = { text: defaultText || "", loaded: true, leaf: true };
        } else {
            nodeAttr = Ext.applyIf(defaultText, { text: "", loaded: true });
        }

        child = node.parentNode.insertBefore(nodeAttr, node);

        child.isNew = true;
        child.insertAction = true;

        this.startEdit(child, this.headerCt.items.items[0]);
    },

    startEdit: function (node, columnHeader) {
        if (typeof node === "string") {
            node = this.store.getNodeById(node);
        }

        this.getSelectionModel().select(node);

        if (this.editingPlugin) {
            this.editingPlugin.startEdit(node, columnHeader);
        }
    },

    completeEdit: function () {
        if (this.editingPlugin) {
            this.editingPlugin.completeEdit();
        }
    },

    cancelEdit: function () {
        if (this.editingPlugin) {
            this.editingPlugin.cancelEdit();
        }
    }
});
Ext.tree.View.override({
    initComponent: function() { 
        this.callParent(arguments);

        if (this.toggleOnClick) {
            this.toggleOnDblClick = false;
        }
    },

    getChecked: function () {
        var checked = [],
            node  = this.node || (this.getStore().getRootNode());
        if (node) {
            node.cascade(function (rec) {
                if (rec.get('checked')) {
                    checked.push(rec);
                }
            });
        }
        return checked;
    },

    // #14: toggleOnClick support
    onItemClick: function(record, item, index, e) { 
        var me = this,
            editingPlugin = me.editingPlugin,
            parent = me.callParent(arguments); 

        if (me.toggleOnClick && record.isExpandable() && !e.getTarget(me.expanderSelector, item) && !(editingPlugin && editingPlugin.clicksToEdit === 1)) {
            me.toggle(record);
        } 

        return parent;
    }
});
Ext.tree.Column.override({
    initComponent : function () {
        this.callParent(arguments);

        this.renderer = Ext.Function.createInterceptor(this.renderer, function (value, metaData, record, rowIdx, colIdx, store, view) {
            var iconCls = record.data.iconCls;

            if (iconCls && iconCls[0] === "#") {
                record.data.iconCls = X.net.RM.getIcon(iconCls.substring(1));
            }
        });
    }
});

// @source tree/plugin/TreeViewDragDrop.js

Ext.tree.ViewDropZone.override({
    getPosition: function (e, node) {
        var view = this.view,
            record = view.getRecord(node),
            y = e.getY(),
            noAppend = record.isLeaf() && view.allowLeafDrop !== true,
            noBelow = false,
            region = Ext.fly(node).getRegion(),
            fragment;

        // If we are dragging on top of the root node of the tree, we always want to append.
        if (record.isRoot()) {
            return 'append';
        }

        // Return 'append' if the node we are dragging on top of is not a leaf else return false.
        if (this.appendOnly) {
            return noAppend ? false : 'append';
        }

        if (!this.allowParentInserts) {
            noBelow = record.hasChildNodes() && record.isExpanded();
        }

        fragment = (region.bottom - region.top) / (noAppend ? 2 : 3);
        if (y >= region.top && y < (region.top + fragment)) {
            return 'before';
        }
        else if (!noBelow && (noAppend || (y >= (region.bottom - fragment) && y <= region.bottom))) {
            return 'after';
        }
        else {
            return 'append';
        }
    }
});

Ext.tree.plugin.TreeViewDragDrop.override({
    init : function (view) {
        //this.callParent(arguments);

        Ext.applyIf(view, {
            copy: this.copy,
            allowCopy: this.allowCopy
        });

        view.on("afterrender", this.onViewRender, this, { single: true }); // TODO: The github issue #178. Review after Sencha fix.

        view.panel.ddPlugin = this;
        view.ddPlugin = this;
        view.allowLeafDrop = this.allowLeafDrop;

        if (this.allowLeafDrop) {
            view.on("drop", function (node, data, overRecord, currentPosition) {
                if (currentPosition == "append" && overRecord.isLeaf()) {
                    overRecord.set("leaf", false);
                    overRecord.set("loaded", true);
                }
            });
        }
    }
});

// @source core/dd/DragDrop.js

Ext.dd.DragDrop.override({
    applyConfig: function() {
        var me = this;

        me.callParent();

        if (me.dragDropGroups) {
            Ext.Object.each(me.dragDropGroups, function (key, value, groups) {
                if (value) {
                    me.addToGroup(key);
                }
            });

            delete me.dragDropGroups;
            me.removeFromGroup("default");
        }
    }
});
// @source core/dd/DragDropManager.js
Ext.define('Ext.dd.DragDropManager', {
    override: 'Ext.dd.DragDropManager',

    stopEvent: function (e) {
        if (this.stopPropagation) {
            e.stopPropagation();
        }

        // #1438: do not verify against e.pointerType.
        if (this.preventDefault) {
            e.preventDefault();
        }
    }
});

// @source core/dd/DragTracker.js

Ext.define("Ext.net.DragTracker", {
    extend : "Ext.dd.DragTracker",
    
    proxyCls : "x-view-selector",
    
    onStart : function (xy) {
        if (!this.proxy) {
            this.proxy = this.el.createChild({ cls : this.proxyCls });
        } else {
            this.proxy.setDisplayed("block");
        }
    },

    onDrag : function (e) {
        var startXY = this.startXY,
            xy = this.getXY(),
            x = Math.min(startXY[0], xy[0]),
            y = Math.min(startXY[1], xy[1]),
            w = Math.abs(startXY[0] - xy[0]),
            h = Math.abs(startXY[1] - xy[1]);
        
        this.dragRegion.x = this.dragRegion.left = this.dragRegion[0] = x;
        this.dragRegion.y = this.dragRegion.top = this.dragRegion[1] = y;
        this.dragRegion.right = x + w;
        this.dragRegion.bottom = y + h;

        this.proxy.setBox(this.dragRegion);	
    },

    onEnd : function (e) {
        if (this.proxy) {
            this.proxy.setDisplayed(false);
        }
    }
});

// @source core/dd/ProxyDDCreator.js

Ext.define("Ext.net.ProxyDDCreator", {
    mixins: {
        observable: "Ext.util.Observable"
    },
    
    constructor : function (config) {
        Ext.apply(this, config);

        this.config = config || {};        
        this.initialConfig = this.config;        
        
        this.mixins.observable.constructor.call(this);
    
        if (!Ext.isEmpty(this.config.target, false)) {
            var targetEl = Ext.net.getEl(this.config.target);

            if (!Ext.isEmpty(targetEl)) {
                this.initDDControl(targetEl);
            } else {
                this.task = new Ext.util.DelayedTask(function () {
                    targetEl = Ext.net.getEl(this.config.target);

                    if (!Ext.isEmpty(targetEl)) {
                        this.task.cancel();
                        this.initDDControl(targetEl);                    
                    } else {
                        this.task.delay(500);
                    }
                }, this);
                
                this.task.delay(1);
            }
        }
    },
    
    initDDControl : function (target) {
        target = Ext.net.getEl(target);
        
        if (target.isComposite) {
            this.ddControl = [];
            target.each(function (targetEl) {
                this.ddControl.push(this.createControl(Ext.apply(Ext.net.clone(this.config), { id : Ext.id(targetEl) })));
            }, this);
        } else {
            this.ddControl = this.createControl(Ext.apply(Ext.net.clone(this.config), { id : Ext.id(target) }));
        }
    },
    
    createControl : function (config) {
        var ddControl;

        if (config.config.groups) {
            config.config.dragDropGroups = config.config.groups;
        }
        
        if (config.group) {
            ddControl = new config.type(config.id, config.group, config.config);
            Ext.apply(ddControl, config.config);
        } else {
            ddControl = new config.type(config.id, config.config);
        }        
        
        return ddControl;
    },
    
    lock : function () {
        Ext.each(this.ddControl, function (dd) {
            if (dd && dd.lock) {
                dd.lock();
            }
        });
    },
    
    unlock : function () {
        Ext.each(this.ddControl, function (dd) {
            if (dd && dd.unlock) {
                dd.unlock();
            }
        });
    },
    
    unreg : function () {
        Ext.each(this.ddControl, function (dd) {
            if (dd && dd.unreg) {
                dd.unreg();
            }
        });
    },
    
    destroy : function () {
        Ext.each(this.ddControl, function (dd) {
            if (dd && dd.unreg) {
                dd.unreg();
            }
        });
    }
});
// @source core/menu/MenuPanel.js

Ext.define("Ext.net.MenuPanel", {
    extend: "Ext.panel.Panel",
    alias: "widget.netmenupanel",
    saveSelection: true,
    selectedIndex: -1,
    layout: "fit",

    initComponent: function () {
        this.menu = Ext.apply(this.menu, {
            floating: false,
            border: false
        });

        this.items = [this.menu];

        this.callParent(arguments);

        this.menu = this.items.get(0);
        this.menu.layout = {
            type: 'vbox',
            align: 'stretch',
            autoSize: false,
            overflowHandler: 'Scroller'
        };

        if (this.selectedIndex > -1) {
            var item = this.menu.items.get(this.selectedIndex),
                fn = function () {
                    this.onFocus();
                    this.onFocusLeaveOriginal = this.onFocusLeave;
                    this.onFocusLeave = Ext.emptyFn;
                };

            if (item.rendered) {
                fn.call(item);
            } else {
                item.on("afterrender", fn, item, { single: true });
            }

            this.getSelIndexField().setValue(this.selectedIndex);
        }

        this.menu.on("click", this.setSelection, this);
    },

    setSelectedIndex: function (index) {
        this.setSelection(this.menu, this.menu.getComponent(index));
    },

    getSelIndexField: function () {
        if (!this.selIndexField) {
            this.selIndexField = new Ext.form.Hidden({ id: this.id + "_SelIndex", name: this.id + "_SelIndex" });

            this.on("beforedestroy", function () {
                this.destroy();
            }, this.selIndexField, { single: true });
        }

        return this.selIndexField;
    },

    setSelection: function (menu, item, e) {
        var selectedItem;

        if (this.saveSelection) {
            if (arguments.length === 1) {
                item = menu;
            }

            selectedItem = this.menu.getComponent(this.selectedIndex);

            if (selectedItem && selectedItem.onFocusLeaveOriginal) {
                selectedItem.onFocusLeave = selectedItem.onFocusLeaveOriginal;
            }

            if (item) {
                this.clearSelection();
                this.selectedIndex = this.menu.items.indexOf(item);
                this.getSelIndexField().setValue(this.selectedIndex);
                item.onFocus();
                item.onFocusLeaveOriginal = item.onFocusLeave;
                item.onFocusLeave = Ext.emptyFn;
            }
        }
    },

    clearSelection: function () {
        var selectedCmp;

        if (this.selectedIndex > -1) {
            selectedCmp = this.menu.getComponent(this.selectedIndex);

            if (selectedCmp) {
                selectedCmp.onFocusLeave();
            }
        }

        this.selectedIndex = -1;
        this.getSelIndexField().setValue(null);
    },

    afterRender: function () {
        this.callParent(arguments);

        if (this.hasId()) {
            this.getSelIndexField().render(this.el.parent() || this.el);
        }
    }
});


// @source core/menu/CheckItem.js

Ext.menu.CheckItem.override({
    onRender: function () {
        this.callParent(arguments);

        if (this.hasId()) {
            this.getCheckedField().render(Ext.net.ResourceMgr.getAspForm() || this.el.parent() || this.el);
        }
    },

    getCheckedField : function () {
        if (!this.checkedField) {
            this.checkedField = new Ext.form.field.Hidden({                
                name : this.id 
            });

			this.on("beforedestroy", function () {
                this.destroy();
            }, this.checkedField);	

            this.on("checkchange", function (item, checked) {
                this.getCheckedField().setValue(checked);
            }, this);
        }
        
        return this.checkedField;
    }
});

// @source core/menu/ColorPicker.js

Ext.menu.ColorPicker.override({
    initComponent : function () {
        var me = this,
            cfg = Ext.apply({}, me.pickerConfig || me.initialConfig);

        // Ensure we don't get duplicate listeners
        delete cfg.listeners;
        Ext.apply(me, {
            plain: true,
            showSeparator: false,
            bodyPadding: 0,
            items: Ext.applyIf({
                cls: Ext.baseCSSPrefix + 'menu-color-item',
                margin: 0,
                id: me.pickerId,
                xtype: 'colorpicker'
            }, cfg)
        });

        Ext.menu.ColorPicker.superclass.initComponent.call(this, arguments);

        me.picker = me.down('colorpicker');
        me.relayEvents(me.picker, ['select']);

        if (me.hideOnClick) {
            me.on('select', me.hidePickerOnSelect, me);
        }
    }
});

// @source core/menu/Menu.js

Ext.override(Ext.menu.Menu, {
    // Defined in Ext.NET
    lastTargetIn: function (cmp) {
        return Ext.fly(cmp.getEl ? cmp.getEl() : cmp).contains(this.contextEvent.t);
    },

    privates: {
        doAutoRender: function () {
            var me = this;
            if (!me.rendered) {
                var form = Ext.net.ResourceMgr.getAspForm(),
                    ct = ((this.renderToForm !== true || !form) ? (me.renderTo || document.body) : form);
                if (me.floating) {
                    me.render(ct);
                } else {
                    me.render(Ext.isBoolean(me.autoRender) ? ct : me.autoRender);
                }
            }
        }
    }
});

Ext.override(Ext.menu.Item, {
    setIconCls: function (cls) {
        this.callParent([cls && cls.indexOf('#') === 0 ? X.net.RM.getIcon(cls.substring(1)) : cls]);
    },

    setIcon: function (icon) {
        if (this.getIconCls() && icon) {
            this.setIconCls("");
        }

        this.callParent([icon && icon.indexOf('#') === 0 ? X.net.RM.getIconUrl(icon.substring(1)) : icon]);
    }
});

// @source core/msg/Notification.js

Ext.net.Notification = function () {
    var notifications = [];

    return {
        getDefaultOffset: function () {
            var defaultOffset = [-10, -10];

            if (!Ext.isIE9m) {
                if (Ext.getBody().getHeight() > Ext.Element.getViewportHeight()) {
                    defaultOffset[0] = -10 - Ext.getScrollbarSize().width;
                }

                if (Ext.getBody().getWidth() > Ext.Element.getViewportWidth()) {
                    defaultOffset[1] = -10 - Ext.getScrollbarSize().height;
                }
            }

            return defaultOffset;
        },

        notify: function (title, msg) {
            if (Ext.isString(title)) {
                Ext.net.Notification.show({
                    title: title,
                    html: msg || ""
                });
            } else {
                Ext.net.Notification.show(title);
            }
        },

        show: function (config) {
            if (config && (config.items || config.dockedItems)) {
                var resources = [];

                if (config.items && config.items['x.res']) {
                    if (config.items['x.res'].ns) {
                        Ext.ns.apply(Ext, config.items['x.res'].ns);
                    }

                    if (config.items['x.res'].res) {
                        resources = config.items['x.res'].res;
                    }

                    config.items = config.items.config;
                }

                if (config.dockedItems && config.dockedItems['x.res']) {
                    if (config.dockedItems['x.res'].ns) {
                        Ext.ns.apply(Ext, config.dockedItems['x.res'].ns);
                    }

                    if (config.dockedItems['x.res'].res) {
                        resources = Ext.Array.push(resources, config.dockedItems['x.res'].res);
                    }
                    config.dockedItems = config.dockedItems.config;
                }

                if (resources.length > 0) {
                    Ext.net.ResourceMgr.load(resources, Ext.Function.bind(this.show, this, [config]));
                    return;
                }
                else {
                    if (Ext.isString(config.items)) {
                        config.items = Ext.decode(config.items);
                    }

                    if (Ext.isString(config.dockedItems)) {
                        config.dockedItems = Ext.decode(config.dockedItems);
                    }
                }
            }

            config = config || {};
            var removeHeight = (Ext.isDefined(config.height) && !config.height) || (config.bodyStyle && config.bodyStyle.match(/height\s*:\s*auto/g));

            config = Ext.applyIf(config, {
                width: 200,
                height: 100,
                autoHide: true,
                plain: false,
                resizable: false,
                draggable: false,
                alignToCfg: {
                    el: document,
                    position: "br-br",
                    offset: this.getDefaultOffset()
                },
                showMode: "grid", 
                closeVisible: false,
                bringToFront: false,
                focusOnToFront: false,
                pinEvent: "none",
                hideDelay: 2500,
                shadow: false,
                showPin: false,
                pinned: false,
                showFx: {
                    fxName: "slideIn",
                    args: ["b", {}]
                },
                hideFx: {
                    fxName: "slideOut",
                    args: ["b", {}]
                },

                
                focus: Ext.emptyFn,

                stopHiding: function () {
                    if (this.tools && this.tools.close && this.tools.close.show) {
                        this.tools.close.show();
                    }

                    this.pinned = true;

                    if (this.autoHide) {
                        this.hideTask.cancel();
                    }
                },

                isStandardAlign: function () {
                    return this.alignToCfg.el == document && this.alignToCfg.position == "br-br";
                },

                getStatndardAlign: function () {
                    var w = [];

                    for (var i = 0; i < notifications.length; i++) {
                        var window = notifications[i];

                        if (window.isStandardAlign()) {
                            w.push(window);
                        }
                    }

                    return w;
                },

                getOffset: function () {
                    var offset = [], predefinedOffset = this.alignToCfg.offset || Ext.net.Notification.getDefaultOffset();
                    //need clone
                    offset.push(predefinedOffset[0]);
                    offset.push(predefinedOffset[1]);

                    if (this.showMode == "grid" && this.isStandardAlign()) {
                        var saw = this.getStatndardAlign(),
                            height = this.getSize().height - offset[1],
                            width = this.getSize().width - offset[0],
                            yPos = Ext.fly(this.alignToCfg.el).getViewSize().height - height,
                            xPos = Ext.fly(this.alignToCfg.el).getViewSize().width - width,
                            found = false,
                            isIntersect = function (tBox, box) {
                                tBox.x2 = tBox.x + tBox.width;
                                tBox.y2 = tBox.y + tBox.height;

                                box.x2 = box.x + box.width;
                                box.y2 = box.y + box.height;

                                if ((tBox.x2 - box.x) <= 0 || (box.x2 - tBox.x) <= 0) {
                                    return false;
                                }

                                if ((tBox.y2 - box.y) <= 0 || (box.y2 - tBox.y) <= 0) {
                                    return false;
                                }

                                return true;
                            };

                        while (xPos >= 0 && !found) {
                            while (yPos >= 0 && !found) {
                                var intersect = false;

                                for (var i = 0; i < saw.length; i++) {
                                    var window = saw[i],
                                        box = window.getBox();

                                    if (box.width == 0 && box.height == 0) {
                                        box = window._defaultBox;
                                    }

                                    if (isIntersect({ x: xPos, y: yPos, width: width, height: height }, box)) {
                                        intersect = true;
                                        break;
                                    }
                                }

                                found = !intersect;

                                if (!found) {
                                    yPos -= height;
                                }
                            }

                            if (!found) {
                                yPos = Ext.fly(this.alignToCfg.el).getViewSize().height - height;
                                xPos -= width;
                            }
                        }

                        if (found) {
                            this._defaultBox = { x: xPos, y: yPos, width: width, height: height };
                            offset[0] = offset[0] + ((xPos + width) - Ext.fly(this.alignToCfg.el).getViewSize().width);
                            offset[1] = offset[1] + ((yPos + height) - Ext.fly(this.alignToCfg.el).getViewSize().height);
                        }
                    }

                    return offset;
                },

                afterShow: function () {
                    var offset = this.getOffset(),
                        listeners;
                    notifications.push(this);
                    this._showing = true;
                    this.alignOffset = offset;
                    this.el.alignTo(this.alignToCfg.el || document, this.alignToCfg.position || "br-br", offset);
                    this.el.setDisplayed(this.showFx.fxName == "frame" || this.showFx.fxName == "highlight");

                    this.el[this.showFx.fxName].apply(this.el, this.showFx.args);
                    listeners = { beforeanimate: this.beforeAnimate, afteranimate: this._afterShow, scope: this };
                    if (this.showFx.fxName == "fadeIn") {
                        delete listeners.beforeanimate;
                        this.el.setOpacity(0, false);
                    }

                    Ext.fx.Manager.getFxQueue(this.el.dom.id || Ext.id(this.el.dom))[0].on(listeners);
                },
                beforeAnimate: function () {
                    this.el.setDisplayed(true);

                    if (this.bringToFront) {
                        this.toFront();
                    }
                },

                _afterShow: function () {
                    this._showing = false;

                    if (this._closed) {
                        this.destroy();
                        return;
                    }

                    this.toFront();

                    if (this.shadow) {
                        this.el.enableShadow(true);
                    }
                    this.onShowComplete();
                },

                onHide: function () {
                    if (this._closed) {
                        return;
                    }

                    if (Ext.isArray(this.hideFx.args) && this.hideFx.args.length > 0) {
                        this.hideFx.args[this.hideFx.args.length - 1] = Ext.apply(this.hideFx.args[this.hideFx.args.length - 1], { listeners: { afteranimate: this._hide, scope: this } });
                    } else {
                        this.hideFx.args = [{ listeners: { afteranimate: this._hide, scope: this } }];
                    }

                    this.el[this.hideFx.fxName].apply(this.el, this.hideFx.args);
                },
                _hide: function () {
                    this.hidden = true;
                    this.el.hide();
                    this.afterHide();
                    this.fireEvent('close', this);
                    this.destroy();
                }
            });

            if (removeHeight) {
                delete config.height;
            }

            config.cls = config.cls || "";
            config.cls += " x-notification";

            if (config.closeVisible) {
                for (var i = notifications.length - 1; i >= 0; i--) {
                    notifications[i]._closed = true;

                    if (!notifications[i]._showing) {
                        notifications[i].destroy();
                    }
                }

                notifications = [];
            }

            var w = new Ext.window.Window(config),
                mOver = function (e, t) {
                    if (!this.pinned) {
                        this.hideTask.cancel();
                        this.delayed = true;
                    }
                },
                mOut = function (e, t) {
                    if (!this.pinned) {
                        this.hideTask.delay(this.hideDelay);
                        this.delayed = false;
                    }
                };

            w.on("render", function () {
                if (this.autoHide) {
                    this.el.on("mouseover", mOver, this);
                    this.el.on("mouseout", mOut, this);

                    if (this.header && this.tools.close && !this.forceCloseTool) {
                        this.tools.close.hide();
                    }
                }

                if (this.contentEl) {
                    Ext.fly(this.contentEl).removeCls("x-hide-offsets");
                }
            }, w);

            w.afterRender = Ext.Function.createSequence(w.afterRender, function () {
                if (this.showPin) {
                    this.pin = function (e, toolEl, owner, tool) {
                        this.tools.unpin.hide();
                        this.tools.pin.show();
                        this.hideTask.cancel();
                        this.pinned = true;
                    };

                    this.unpin = function (e, toolEl, owner, tool) {
                        this.tools.pin.hide();
                        this.tools.unpin.show();
                        this.hide();
                        this.pinned = false;
                    };

                    this.addTool({
                        type: "unpin",
                        itemId: "unpin",
                        handler: this.pin,
                        hidden: this.pinned,
                        hideMode: "display",
                        scope: this
                    });

                    this.addTool({
                        type: "pin",
                        itemId: "pin",
                        handler: this.unpin,
                        hidden: !this.pinned,
                        hideMode: "display",
                        scope: this
                    });
                }
            });

            w.focus = Ext.emptyFn;

            w.afterShow = Ext.Function.createSequence(w.afterShow, function () {
                if (this.pinEvent !== "none") {
                    this.el.on(this.pinEvent, this.stopHiding, this);
                    this.on(this.pinEvent, this.stopHiding, this);
                }

                if (this.autoHide && !this.delayed && !this.pinned) {
                    this.hideTask.delay(this.hideDelay);
                }
            });

            w.on("beforedestroy", function () {
                for (var i = 0; i < notifications.length; i++) {
                    if (notifications[i].id == this.id) {
                        notifications.splice(i, 1);
                        break;
                    }
                }

                if (this.contentEl) {
                    var ce = Ext.get(this.contentEl), el = Ext.net.ResourceMgr.getAspForm() || Ext.getBody();

                    ce.addCls("x-hidden");
                    el = el.dom;
                    el.appendChild(ce.dom);
                }

                if (this.initialConfig.id) {
                    window[this.initialConfig.id] = undefined;
                }
            }, w);

            if (config.autoHide) {
                w.hideTask = new Ext.util.DelayedTask(w.hide, w);
            }

            w.on("beforehide", function () {
                this.el.disableShadow();
            }, w);

            w.show();

            return w;
        }
    };
}();

Ext.onReady(function() {
    Ext.MessageBox.notify = Ext.net.Notification.notify;
});
Ext.define('Ext.net.Badge', {
    extend: "Ext.util.Observable",
    alias: 'plugin.badge',

    badgeTextCls: "x-badge-text",
    badgeNumberCls: "x-badge-number",
    alignment: "c-tr",
    scale: "small",
    hideEmpty: true,

    statics: {
        show: function (cmp, config) {
            if (Ext.isString(cmp)) {
                cmp = Ext.getCmp(cmp);
            }

            if (cmp.badge) {
                if (!Ext.isDefined(config)) {
                    cmp.badge.show();
                    return cmp.badge;
                }

                if (!Ext.isObject(config)) {
                    cmp.badge.setHtml(config);
                    cmp.badge.show();
                    return cmp.badge;
                }

                Ext.Array.remove(cmp.plugins, cmp.badge);
                cmp.badge.destroy();
            }

            if (!Ext.isObject(config)) {
                config = {
                    text: config
                };
            }

            var badge = Ext.create('Ext.net.Badge', config);

            cmp.addPlugins(badge);

            return badge;
        },

        hide: function (cmp) {
            if (Ext.isString(cmp)) {
                cmp = Ext.getCmp(cmp);
            }

            if (cmp.badge) {
                cmp.badge.hide();
                return cmp.badge;
            }
        }
    },

    constructor: function (config) {
        Ext.apply(this, config);

        this.callParent(arguments);
    },

    init: function (cmp) {
        this.cmp = cmp;
        this.cmp.badge = this;

        this.cmp.on({
            show: this.show,
            hide: this.hide,
            scope: this
        });

        if (this.text) {
            this.html = Ext.util.Format.htmlEncode(this.text);
            delete this.text;
        }

        this.updatePosition = Ext.Function.createBuffered(this.realUpdatePosition, 100, this);

        if (cmp.rendered) {
            this.initPlugin();
        }
        else {
            cmp.on("afterrender", this.initPlugin, this, { single: true, delay: 100 });
        }
    },

    getTargetEl: function () {
        var targetEl;

        if (this.selector) {
            targetEl = this.cmp.el.down(this.selector);
        }
        else {
            targetEl = this.cmp.el;
        }

        return targetEl;
    },

    getRenderTo: function () {
        return this.renderToBody !== false ? Ext.getBody() : this.targetEl.parent();
    },

    initPlugin: function () {
        this.targetEl = this.getTargetEl();
        if (this.renderToBody !== false) {
            this.floatingParent = this.cmp.up('[floating]');

            var floating = (this.floatingParent || this.cmp),
                zm = floating.zIndexManager,
                visible;

            if (zm) {
                floating.setZIndex = Ext.Function.createSequence(floating.setZIndex, function () {
                    if (this.badgeEl) {
                        Ext.Function.defer(this.updateZIndex, 10, this);
                    }
                }, this);
            }

            if (this.floatingParent && this.floatingParent.floating) {
                this.floatingParent.on("move", this.updatePosition, this);
            }

            if (floating.floating && Ext.isFunction(floating.ghost)) {
                floating.ghost = Ext.Function.createSequence(floating.ghost, function () {
                    if (this.badgeEl) {
                        this._needToShow = !this.hidden;
                        this.hide();
                    }
                }, this);

                floating.unghost = Ext.Function.createSequence(floating.unghost, function () {
                    if (this.badgeEl && this._needToShow) {
                        delete this._needToShow;
                        this.show();
                    }

                }, this);
            }
        }

        this.badgeEl = this.getRenderTo().createChild({
            tag: "div",
            cls: "x-badge" + (this.cls ? (" " + this.cls) : ""),
            style: "top:-10000px;" + this.style || "",

            children: [{
                tag: "div",
                cls: "x-badge-wrap" + (this.wrapCls ? (" " + this.wrapCls) : ""),
                style: this.wrapStyle || "",

                children: [{
                    tag: "p",
                    cls: "x-badge-inner" + (this.textCls ? (" " + this.textCls) : ""),
                    style: this.textStyle || "",
                    html: Ext.isDefined(this.html) ? this.html : ""
                }]
            }]
        });

        visible = this.cmp.isVisible();
        if (!visible) {
            this.hide();
        }

        if (this.overCls) {
            this.badgeEl.addClsOnOver(this.overCls);
        }

        this.textEl = this.badgeEl.down("p");
        this.badgeEl.unselectable();
        this.setScale(this.scale);
        if (this.ui) {
            this.setUI(this.ui);
        }
        this.setHtml(this.html);

        this.cmp.on({
            afterlayout: this.updatePosition,
            resize: this.updatePosition,
            move: this.updatePosition,
            scope: this
        });

        this.initEvents();
    },

    setScale: function (scale) {
        if (this.scale && this.badgeEl) {
            this.badgeEl.removeCls("x-badge-" + this.scale);
        }

        this.scale = scale;
        if (this.scale && this.badgeEl) {
            this.badgeEl.addCls("x-badge-" + this.scale);
        }

        this.realUpdatePosition();
    },

    setText: function (text) {
        this.setHtml(Ext.util.Format.htmlEncode(text));
    },

    setHtml: function (html) {
        var isnan,
            fireEvent,
            oldHtml;

        if (html && html.charAt) {
            if (html.charAt(0) == '+') {
                if (isNaN(html.substr(1))) {
                    html = (this.html || 0) + html.substr(1);
                }
                else {
                    html = Math.round(~~this.html + ~~html.substr(1));
                }
            }
            else if (html.charAt(0) == '-') {
                if (!isNaN(html.substr(1))) {
                    html = Math.round(~~this.html - ~~html.substr(1));
                }
            }
        }

        isnan = isNaN(html);

        fireEvent = this.html !== html;

        oldHtml = this.html;
        this.html = Ext.isDefined(html) ? html : "";
        this.textEl.dom.innerHTML = this.html;

        if (fireEvent) {
            this.fireEvent("change", this, html, oldHtml);
        }

        if (this.hideEmpty && !this.html && isnan) {
            this.hide();
            return;
        }

        if (isnan) {
            this.textEl.removeCls("x-badge-number");
            this.textEl.addCls("x-badge-text");
        }
        else {
            this.textEl.removeCls("x-badge-text");
            this.textEl.addCls("x-badge-number");
        }

        this.realUpdatePosition();
    },

    setUI: function (ui) {
        if (this.ui && this.badgeEl) {
            this.badgeEl.removeCls("x-badge-" + this.ui);
        }

        this.ui = ui;
        if (this.ui && this.badgeEl) {
            this.badgeEl.addCls("x-badge-" + this.ui);
        }
    },

    updateZIndex: function () {
        var cmp = this.floatingParent || this.cmp,
            z,
            zm,
            zParent = this.cmp.zIndexParent;

        if (zParent && this.badgeEl) {
            this.badgeEl.setStyle("z-index", ~~zParent.el.getStyle("z-index") + 1);
        }
        else {
            z = cmp.el.getStyle("z-index");
            zm = cmp.zIndexManager;

            // #1237
            if (cmp.dockedItems && (cmp.dockedItems.getCount() > 0) && ~~z === 0) { 
                z = 1;
            }

            if ((z || zm) && this.badgeEl) {
                this.badgeEl.setStyle("z-index", (!zm || (~~z > zm.zseed)) ? (~~z + 1) : (zm.zseed + 1));
            }
        }
    },

    realUpdatePosition: function () {
        if (this.badgeEl) {
            if (this.renderToBody !== false) {
                this.updateZIndex();
            }
            this.badgeEl.alignTo(this.targetEl, this.alignment, this.offset ? this.offset : [0, 0], false);
        }
    },

    initEvents: function () {
        this.badgeEl.on({
            mouseover: this.onMouseOver,
            mouseout: this.onMouseOut,
            click: this.onClick,
            dblclick: this.onDblClick,
            scope: this
        });
    },

    onMouseOver: function (e) {
        this.fireEvent("mouseover", this, e);
    },

    onMouseOut: function (e) {
        this.fireEvent("mouseout", this, e);
    },

    onClick: function (e) {
        this.fireEvent("click", this, e);
    },

    onDblClick: function (e) {
        this.fireEvent("dblclick", this, e);
    },

    show: function () {
        if (this.badgeEl) {
            this.hidden = false;
            this.badgeEl.show();
            this.realUpdatePosition();
            this.fireEvent("show", this);
        }
    },

    hide: function () {
        if (this.badgeEl) {
            this.hidden = true;
            this.badgeEl.hide();
            this.fireEvent("hide", this);
        }
    },

    destroy: function () {
        if (this.badgeEl) {
            this.badgeEl.destroy();
            delete this.badgeEl;
        }
        this.cmp.un({
            show: this.show,
            hide: this.hide,
            afterlayout: this.updatePosition,
            resize: this.updatePosition,
            move: this.updatePosition,
            scope: this
        });

        if (this.floatingParent) {
            this.floatingParent.un("move", this.updatePosition, this);
        }

        this.callParent(arguments);
    }
});

Ext.onReady(function() {
    Ext.MessageBox.badge = function (cmp, config) {
        if (config) {
            Ext.net.Badge.show(cmp, config);
        } else {
            Ext.net.Badge.hide(cmp);
        }
    };
});


Ext.define("Ext.net.Callout", {
    extend: "Ext.Component",
    alias: "widget.callout",
    baseCls: Ext.baseCSSPrefix + "callout",
    alignment: "right",
    hidden: true,
    constrainPosition: true,
    //click, hover, focus, manual
    trigger: "click",
    quickShowInterval: 250,
    dismissDelay: 0,
    hideDelay: 0,
    showDelay: 0,
    autoHide: true,
    //focus - hide on blur, click - hide on next click
    hideOnToggle: true,
    toolbarAlign: "tr-tr",
    toolbarOffset: [-5, 3],
    animation: true,
    closeAction: "hide",
    closeOnOutsideClick: false,

    hoverConfig: {
        hideDelay: 200,
        showDelay: 500
    },

    childEls: [
        "body",
        "header",
        "headerText",
        "arrow"
    ],

    renderTpl: [
        '<div id="{id}-arrow" class="{baseCls}-arrow<tpl if="arrowCls"> {arrowCls}</tpl>"<tpl if="arrowStyle"> style="{arrowStyle}"</tpl>>',
        '</div>',
        '<h3 id="{id}-header" class="{baseCls}-header<tpl if="headerCls"> {headerCls}</tpl>"<tpl if="headerStyle"> style="{headerStyle}"</tpl>><span id="{id}-headerText" class="{baseCls}-header-text">{title}</span></h3>',
        '<div id="{id}-body" class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>{html}</div>'
    ],

    statics: {
        show: function (target, config, forceNew) {
            if (target) {
                var isCmp = target && target.isComponent,
                    t = isCmp ? target.el : Ext.get(target),
                    calloutOwner = isCmp ? target : t,
                    callout, show;

                if (target.callouts && target.callouts.length > 0 && !forceNew) {
                    callout = target.callouts[0];

                    if (config && Ext.isDefined(config.title)) {
                        callout.setTitle(config.title);
                    }

                    if (config && Ext.isDefined(config.html)) {
                        callout.setHtml(config.html);
                    }

                    if (config && Ext.isDefined(config.iconCls)) {
                        callout.setIconCls(config.iconCls);
                    }

                    if (config && Ext.isDefined(config.alignment)) {
                        if (callout.rendered) {
                            callout.removeCls(callout.baseCls + "-" + callout.alignment);
                            callout.addCls(callout.baseCls + "-" + config.alignment);
                        }

                        callout.origalignment = config.alignment;
                        callout.alignment = config.alignment;
                    }

                    if (config && Ext.isDefined(config.animation)) {
                        callout.animation = config.animation;
                    }

                    if (config && Ext.isDefined(config.ui)) {
                        callout.setUI(config.ui);
                    }

                    callout.triggerElement = t;
                    callout.hidden = true;
                    callout.delayShow();
                } else {
                    config.target = calloutOwner;

                    if (!Ext.isDefined(config.trigger)) {
                        config.trigger = "manual";
                    }

                    if (config.trigger == "manual" && !Ext.isDefined(config.hidden)) {
                        show = true;
                    }

                    callout = Ext.create("Ext.net.Callout", config);

                    if (show) {
                        callout.triggerElement = t;
                        callout.delayShow();
                    }
                }

                return callout
            }
        },

        hide: function (target) {
            if (target) {
                var isCmp = target && target.isComponent,
                    t = isCmp ? target.el : Ext.get(target),
                    calloutOwner = isCmp ? target : t,
                    callout;

                if (target.callouts && target.callouts.length > 0) {
                    callout = target.callouts[0];
                    callout.clearTimer('show');
                    callout.triggerElement = null;
                    callout.delayHide();
                }
            }
        },

        destroy: function (target) {
            if (target) {
                var isCmp = target && target.isComponent,
                    t = isCmp ? target.el : Ext.get(target),
                    calloutOwner = isCmp ? target : t,
                    callout;

                if (target.callouts && target.callouts.length > 0) {
                    callout = target.callouts[0];
                    callout.destroy();
                }
            }
        }
    },

    constructor: function (config) {
        if (config && config.hoverConfig) {
            Ext.apply(this.hoverConfig, config.hoverConfig);
            delete config.hoverConfig;
        }

        if (config && Ext.isDefined(config.hidden)) {
            this.hasConfigHidden = true;
        }

        this.callParent([config]);
    },

    initRenderData: function () {
        return Ext.applyIf(this.callParent(), {
            title: this.title || "",
            html: this.html || "",
            arrowCls: this.arrowCls,
            arrowStyle: this.arrowStyle,
            headerCls: this.headerCls,
            headerStyle: this.headerStyle,
            bodyCls: this.bodyCls,
            bodyStyle: this.bodyStyle
        });
    },

    initComponent: function () {
        var me = this,
            target;

        me.detectFocusInGecko = Ext.Function.bind(me.detectFocusInGecko, me);

        if (me.target) {
            if (!me.renderTo) {
                me.renderTo = Ext.getBody();
                Ext.WindowManager.register(me);
                me.renderedToBody = true;
            }

            if (me.target.isComponent && !me.target.rendered) {
                me.target.on("afterrender", function () {
                    target = me.target;
                    delete me.target;
                    me.setTarget(target);
                }, me);
            } else {
                target = me.target;
                delete me.target;
                me.setTarget(target);
            }
        }
        else {
            if (!this.hasConfigHidden) {
                this.hidden = false;
            }

            this.animation = false;
            this.addCls(this.baseCls + "-" + this.alignment);
        }

        me.origalignment = me.alignment;

        me.callParent(arguments);
    },

    onRender: function () {
        this.callParent(arguments);

        this.body = Ext.get(this.id + "-body");
        this.header = Ext.get(this.id + "-header");
        this.headerText = Ext.get(this.id + "-headerText");
        this.arrow = Ext.get(this.id + "-arrow");

        if (!this.target) {
            this.el.setStyle("position", "relative");
        }

        if (this.noArrow) {
            this.arrow.setDisplayed(false);
        }

        if (this.maxWidth) {
            this.el.setStyle("maxWidth", this.maxWidth + "px");
        }

        this.setTitle(this.title);

        if (this.headerToolbar) {
            this.createHeaderToolbar();
        }

        if (this.bodyWidget) {
            this.createBodyWidget();
        }

        if (this.iconCls) {
            this.setIconCls(this.iconCls);
        }

        if (this.glyph) {
            var glyph = this.glyph;
            delete this.glyph;
            this.setGlyph(glyph);
        }
    },

    setIconCls: function (cls) {
        if (this.iconCls) {
            this.header.removeCls(this.iconCls);
        }

        this.iconCls = cls && cls.indexOf('#') === 0 ? X.net.RM.getIcon(cls.substring(1)) : cls;

        if (this.iconCls) {
            this.header.addCls("x-callout-header-icon");
            this.header.addCls(this.iconCls);
        } else {
            this.header.removeCls("x-callout-header-icon");
        }
    },

    renderGlyphEl: function () {
        this.glyphEl = Ext.core.DomHelper.insertFirst(this.header, {
            tag: "span",
            cls: "x-callout-glyph",
            unselectable: "on"
        }, true);

        this.glyphEl.on("click", function (e, t) {
            this.fireEvent("glyphclick", this, e, t);
        }, this);

        return this.glyphEl;
    },

    setGlyph: function (glyph) {
        glyph = glyph || 0;
        var me = this,
            glyphEl = me.glyphEl,
            oldGlyph = me.glyph,
            fontFamily, glyphParts;

        me.glyph = glyph;

        if (!glyphEl) {
            glyphEl = this.renderGlyphEl();
        }

        if (typeof glyph === 'string') {
            glyphParts = glyph.split('@');
            glyph = glyphParts[0];
            fontFamily = glyphParts[1] || Ext._glyphFontFamily;
        }

        if (!glyph) {
            glyphEl.dom.innerHTML = '';
        } else if (oldGlyph != glyph) {
            glyphEl.dom.innerHTML = '&#' + glyph + ';';
        }

        if (fontFamily) {
            glyphEl.setStyle('font-family', fontFamily);
        }

        this.header.addCls("x-callout-glyph-" + (this.glyphScale || "small"));

        return me;
    },

    setTarget: function (target, eventTarget) {
        var me = this,
            isCmp = target && target.isComponent,
            t = isCmp ? target.el : Ext.get(target),
            calloutOwner = isCmp ? target : t,
            tg;

        if (this.eventSelector) {
            eventTarget = t.down(this.eventSelector);
        }

        if (this.selector) {
            t = t.down(this.selector);
        }

        if (!eventTarget && isCmp) {
            if (target.inputEl) {
                eventTarget = target.inputEl;
                t = target.inputWrap;
            }
        }

        if (me.eventTarget) {
            tg = Ext.get(me.eventTarget);
            me.mun(tg, 'mouseover', me.onTargetOver, me);
            me.mun(tg, 'mouseout', me.onTargetOut, me);
            me.mun(tg, 'mousemove', me.onMouseMove, me);
        }

        if (me.focusInInterval) {
            clearInterval(me.focusInInterval);
        }

        if (isCmp && me.checkDomInterval) {
            clearInterval(me.checkDomInterval);
        }

        if (!isCmp) {
            me.checkDomInterval = setInterval(Ext.Function.bind(this.checkDom, this), 10000);
        }

        if (!calloutOwner.callouts) {
            calloutOwner.callouts = [];
        }

        calloutOwner.callouts.push(this);

        me.target = t;
        me.calloutOwner = calloutOwner;
        me.eventTarget = eventTarget || t;

        if (t) {
            if (me.trigger == "hover") {

                Ext.apply(this, this.hoverConfig);

                me.mon(me.eventTarget, {
                    freezeEvent: true,
                    mouseover: me.onTargetOver,
                    mouseout: me.onTargetOut,
                    mousemove: me.onMouseMove,
                    scope: me
                });
            } else if (me.trigger == "click") {
                me.mon(me.eventTarget, {
                    click: me.onTargetClick,
                    scope: me
                });
            } else if (me.trigger == "focus") {
                if (this.delegate && Ext.isGecko) {
                    me.focusInInterval = setInterval(me.detectFocusInGecko, 200);
                } else if (this.delegate && Ext.isIE) {
                    me.mon(me.eventTarget, {
                        focusin: me.onTargetFocus,
                        focusout: me.onTargetBlur,
                        scope: me
                    });
                } else {
                    me.mon(me.eventTarget, {
                        focus: me.onTargetFocus,
                        blur: me.onTargetBlur,
                        scope: me
                    });
                }
            }

            if (this.hidden === false) {
                this.triggerElement = t;
                this.delayShow();
            }
        }
    },

    detectFocusInGecko: function () {
        if (document.activeElement != this.lastActiveElement) {
            var obj = new Ext.EventObjectImpl();

            if (this.lastActiveElement) {
                obj.target = this.lastActiveElement;
                this.lastActiveElement = null;
                this.onTargetBlur(obj);
            }

            if (this.eventTarget.contains(document.activeElement)) {
                this.lastActiveElement = document.activeElement;
                obj.target = this.lastActiveElement;
                this.onTargetFocus(obj);
            }
        }
    },

    createHeaderToolbar: function () {
        this.headerToolbar.floating = true;
        this.headerToolbar.shadow = false;
        this.headerToolbar.renderTo = this.el;
        this.headerToolbar = Ext.ComponentManager.create(this.headerToolbar, "toolbar");
        this.headerToolbar.callout = this;
    },

    createBodyWidget: function () {
        this.bodyWidget.renderTo = this.body;
        this.bodyWidget = Ext.ComponentManager.create(this.bodyWidget, "container");
        this.bodyWidget.callout = this;
        this.body.addCls(this.baseCls + "-body-widget");
    },

    doAlign: function () {
        if (this.target) {
            this.checkConstrain();

            var offset = this.getOffset(),
                align = this.getAlign(offset),
                config;

            config = {
                el: this.delegate ? this.triggerElement : this.target,
                alignment: this.alignment,
                align: align,
                offset: offset
            };

            this.fireEvent("beforealign", this, config);

            this.addCls(this.baseCls + "-" + config.alignment);
            this.el.alignTo(config.el, config.align, config.offset);

            this.toFront(true);
        }
    },

    doHeaderToolbarAlign: function () {
        if (this.headerToolbar) {
            this.headerToolbar.el.alignTo(this.el, this.toolbarAlign, this.toolbarOffset);
        }
    },

    getAlign: function () {
        if (this.alignment == "left") {
            return "r-l";
        } else if (this.alignment == "right") {
            return "l-r";
        } else if (this.alignment == "top") {
            return "b-t";
        } else if (this.alignment == "bottom") {
            return "t-b";
        } else if (this.alignment == "topleft") {
            return "bl-tl";
        } else if (this.alignment == "topright") {
            return "br-tr";
        } else if (this.alignment == "bottomright") {
            return "tr-br";
        } else if (this.alignment == "bottomleft") {
            return "tl-bl";
        } else if (this.alignment == "lefttop") {
            return "tr-tl";
        } else if (this.alignment == "leftbottom") {
            return "br-bl";
        } else if (this.alignment == "righttop") {
            return "tl-tr";
        } else if (this.alignment == "rightbottom") {
            return "bl-br";
        }
    },

    checkConstrain: function () {
        var me = this,
            offsets,
            parent,
            isBody,
            xy,
            dw,
            dh,
            de,
            bd,
            scrollX,
            scrollY,
            axy,
            sz,
            oldalignment;

        if (me.constrainPosition) {
            oldalignment = me.alignment,
            parent = this.el.parent(),
            isBody = parent == Ext.getBody(),
            offsets = this.getOffset();
            xy = me.getAlignToXY(this.delegate ? this.triggerElement : this.target, me.getAlign());
            dw = (isBody ? Ext.Element.getViewportWidth() : parent.getViewSize().width) - 5;
            dh = (isBody ? Ext.Element.getViewportHeight() : parent.getViewSize().height) - 5;
            de = document.documentElement;
            bd = document.body;
            scrollX = (de.scrollLeft || bd.scrollLeft || 0) + 5;
            scrollY = (de.scrollTop || bd.scrollTop || 0) + 5;
            axy = [xy[0] + offsets[0], xy[1] + offsets[1]];
            sz = me.getSize();

            if (Ext.net.StringUtils.startsWith(me.alignment, "left") && (axy[0] < scrollX)) {
                me.alignment = "right" + me.alignment.substring(4);
            } else if (Ext.net.StringUtils.startsWith(me.alignment, "right") && (axy[0] + sz.width > dw)) {
                me.alignment = "left" + me.alignment.substring(5);
            } else if (Ext.net.StringUtils.startsWith(me.alignment, "top") && (axy[1] < scrollY)) {
                me.alignment = "bottom" + me.alignment.substring(3);
            } else if (Ext.net.StringUtils.startsWith(me.alignment, "bottom") && (axy[1] + sz.height > dh)) {
                me.alignment = "top" + me.alignment.substring(6);
            }

            if (oldalignment && oldalignment != me.alignment) {
                this.removeCls(this.baseCls + "-" + oldalignment);
            }
        }
    },

    getOffset: function () {
        var value = this.noArrow ? 2 : 10,
            offset = [value, 0];

        if (this.alignment == "left" || this.alignment == "lefttop" || this.alignment == "leftbottom") {
            offset = [-value, 0];
        } else if (this.alignment == "right" || this.alignment == "righttop" || this.alignment == "rightbottom") {
            offset = [value, 0];
        } else if (this.alignment == "top" || this.alignment == "topleft" || this.alignment == "topright") {
            offset = [0, -value];
        } else if (this.alignment == "bottom" || this.alignment == "bottomleft" || this.alignment == "bottomright") {
            offset = [0, value];
        }

        if (this.offset) {
            offset[0] += this.offset[0];
            offset[1] += this.offset[1];
        }

        return offset;
    },

    setTitle: function (title) {
        this.title = title;
        this.headerText.dom.innerHTML = title;
        this.header.setDisplayed(!!title);
    },

    setHtml: function (html) {
        this.html = html;
        this.body.dom.innerHTML = html;
    },

    onMouseMove: function (e) {
        var me = this,
            t = me.delegate ? e.getTarget(me.delegate) : me.triggerElement = true,
            xy;

        if (t) {
            if ((t === true && me.triggerElement !== true) || (t !== true && t !== (me.triggerElement && me.triggerElement.dom))) {
                me.hide();
                me.lastActive = new Date(0);
                me.onTargetOver(e);
            }
        } else if (!me.hidden && me.autoHide !== false) {
            me.hide();
        }
    },

    hide: function () {
        var me = this;
        me.clearTimer('dismiss');
        me.lastActive = new Date();

        me.callParent(arguments);
        delete me.triggerElement;

        if (this.closeAction == "destroy") {
            this.destroy();
        }
    },

    onTargetClick: function (e) {
        var me = this,
            delegate = me.delegate,
            t;

        if (me.disabled || e.within(me.target.dom, true)) {
            return;
        }

        t = delegate ? e.getTarget(delegate) : true;
        if (t) {
            if (!this.hidden && delegate && (me.triggerElement && me.triggerElement.dom) != t) {
                this.hidden = true;
            }

            me.triggerElement = Ext.get(t);
            me.triggerEvent = e;
            me.clearTimer('hide');

            if (!this.hidden) {
                if (this.autoHide) {
                    if (me.showTimer) {
                        me.clearTimer('show');
                        me.triggerElement = null;
                    }

                    me.delayHide();
                }
            } else {
                me.delayShow();
            }
        }
    },

    onTargetFocus: function (e) {
        var me = this,
            delegate = me.delegate,
            t;

        if (me.disabled) {
            return;
        }

        t = delegate ? e.getTarget(delegate) : true;

        if (t) {
            me.triggerElement = Ext.get(t);
            me.triggerEvent = e;
            me.clearTimer('hide');

            if (!this.hidden && delegate) {
                this.hidden = true;
            }

            if (this.hidden) {
                me.delayShow();
            }
        }
    },

    onTargetBlur: function (e) {
        var me = this,
            delegate = me.delegate,
            t;

        if (me.disabled) {
            return;
        }

        t = delegate ? e.getTarget(delegate) : true;

        if (t) {
            me.triggerElement = Ext.get(t);
            me.triggerEvent = e;
            me.clearTimer('hide');

            if (!this.hidden && this.autoHide) {
                if (me.showTimer) {
                    me.clearTimer('show');
                    me.triggerElement = null;
                }

                me.delayHide();
            }
        }
    },

    onTargetOver: function (e) {
        var me = this,
            delegate = me.delegate,
            t;

        if (me.disabled || e.within(me.eventTarget, true)) {
            return;
        }

        t = delegate ? e.getTarget(delegate) : true;

        if (t) {
            me.triggerElement = Ext.get(t);
            me.triggerEvent = e;
            me.clearTimer('hide');
            me.delayShow();
        }
    },

    delayShow: function () {
        var me = this;

        if (me.hidden && !me.showTimer) {
            if ((me.lastActive && (Ext.Date.getElapsed(me.lastActive) < me.quickShowInterval)) || (me.showDelay <= 0)) {
                me.show();
            } else {
                me.showTimer = Ext.defer(me.showFromDelay, me.showDelay, me);
            }
        } else if (!me.hidden && me.autoHide !== false) {
            me.show();
        }
    },

    showFromDelay: function () {
        this.fromDelayShow = true;
        this.show();
        delete this.fromDelayShow;
    },

    onTargetOut: function (e) {
        var me = this,
            triggerEl = me.triggerElement,
            // If we don't have a delegate, then the target is set
            // to true, so set it to the main target.
            target = triggerEl === true ? me.eventTarget : triggerEl;

        // If disabled, moving within the current target, ignore the mouseout
        // EventObject.within is the only correct way to determine this.
        if (me.disabled || !triggerEl || e.within(target, true)) {
            return;
        }


        if (me.showTimer) {
            me.clearTimer('show');
            me.triggerElement = null;
        }

        if (me.autoHide !== false) {
            me.delayHide();
        }
    },

    // @private
    delayHide: function () {
        var me = this;

        if (!me.hidden && !me.hideTimer) {
            if (me.hideDelay > 0) {
                me.hideTimer = Ext.defer(me.hide, me.hideDelay, me);
            } else {
                me.hide();
            }
        }
    },

    show: function () {
        var me = this;

        this.callParent(arguments);

        if (this.hidden === false) {
            if (me.alignment) {
                me.alignment = me.origalignment;
            }

            me.doAlign();

            if (this.animation) {
                this.el.setOpacity(0, false);
                this.el.fadeIn(this.animation);
            }
        }

        if (me.dismissDelay && me.autoHide !== false) {
            me.dismissTimer = Ext.defer(me.hide, me.dismissDelay, me);
        }

        if (!this.wasFirstShow) {
            this.wasFirstShow = true;
            this.firstShow();
        }
    },

    toggle: function () {
        this.hidden ? this.show() : this.hide();
    },

    firstShow: function () {
        if (this.headerToolbar) {
            this.headerToolbar.updateLayout();
            this.doHeaderToolbarAlign();
        }

        if (this.bodyWidget) {
            this.bodyWidget.updateLayout();
        }
    },

    _timerNames: {},

    clearTimer: function (name) {
        var me = this,
            names = me._timerNames,
            propName = names[name] || (names[name] = name + 'Timer'),
            timer = me[propName];

        if (timer) {
            clearTimeout(timer);
            me[propName] = null;
        }
    },

    clearTimers: function () {
        var me = this;
        me.clearTimer('show');
        me.clearTimer('dismiss');
        me.clearTimer('hide');
    },

    onShow: function () {
        var me = this;
        me.callParent(arguments);

        if (this.trigger == "hover" || this.closeOnOutsideClick) {
            me.mon(Ext.getDoc(), 'mousedown', me.onDocMouseDown, me);
        }
    },

    onHide: function () {
        var me = this;

        me.callParent(arguments);

        if (me.animation) {
            me.el.show();
            me.el.fadeOut(me.animation);
        }

        if (me.trigger == "hover" || this.closeOnOutsideClick) {
            me.mun(Ext.getDoc(), 'mousedown', me.onDocMouseDown, me);
        }
    },

    onDocMouseDown: function (e) {
        var me = this,
            t;

        if (!e.within(me.el.dom)) {
            if (me.trigger !== "manual" && e.within(me.target)) {
                t = this.delegate ? e.getTarget(this.delegate) : true;

                if (t) {
                    return;
                }
            }

            me.disable();
            Ext.defer(me.doEnable, 100, me);
        }
    },

    doEnable: function () {
        if (!this.destroyed) {
            this.enable();
        }
    },

    onDisable: function () {
        this.callParent();
        this.clearTimers();
        this.hide();
    },

    checkDom: function () {
        var d = this.target.dom;

        if (!d || (!d.parentNode || (!d.offsetParent && !Ext.getElementById(this.target.id)))) {
            this.destroy();
        }
    },

    beforeDestroy: function () {
        var me = this;
        me.clearTimers();
        delete me.target;
        delete me.triggerElement;

        if (me.checkDomInterval) {
            clearInterval(me.checkDomInterval);
        }

        if (me.focusInInterval) {
            clearInterval(me.focusInInterval);
        }

        if (this.headerToolbar && this.headerToolbar.destroy) {
            this.headerToolbar.destroy();
        }

        if (this.bodyWidget && this.bodyWidget.destroy) {
            this.bodyWidget.destroy();
        }

        me.callParent();
    },

    onDestroy: function () {
        if (this.trigger == "hover" || this.closeOnOutsideClick) {
            Ext.getDoc().un('mousedown', this.onDocMouseDown, this);
        }

        if (!this.destroyFromCmp && this.calloutOwner && this.calloutOwner.callouts) {
            Ext.Array.remove(this.calloutOwner.callouts, this);
        }

        this.callParent();
    },

    setZIndex: function (index) {
        var me = this;

        me.el.setStyle("zIndex", index);
        index += 10;
        return index;
    }
});

Ext.onReady(function() {
    Ext.MessageBox.callout = function (target, config) {
        return Ext.net.Callout.show(target, config);
    };
});
// @source core/msg/InfoPanel.js

Ext.layout.ContextItem.override({
    flushAnimations: function () {
        var target = this.target,
            index,
            width,
            height,
            clear,
            ct = target.ownerCt,
            items,
            config = target.notificationAnimationConfig;

        if (target.isNotification && config && ct) {
            items = target.queue.getItems(true);
            target.getLayout().animate = target.queue.fx.show;
            index = items.length - 2;

            if (config.x === true) {
                width = this.props["width"] || target.getWidth();
                config.x = (index >= 0 ? items[index].el.getBox(false, true).right : 0) - width;
            }

            if (config.y === true) {
                height = this.props["height"] || target.getHeight();
                config.y = (index >= 0 ? items[index].el.getBox(false, true).bottom : 0) - height;
            }

            if (target.queue.fx.show && target.queue.fx.show.opacity) {
                config.opacity = 0;
                this.props["opacity"] = 1;
            }

            this.previousSize = config;
            clear = true;
        }

        this.callParent(arguments);

        if (clear) {
            target.getLayout().animate = target.queue.fx.slideBack;

            delete target.notificationAnimationConfig;
            delete this.previousSize.opacity;
            delete this.props["opacity"];
        }
    }
});

Ext.define('Ext.net.InfoPanelQueue', {
    extend: "Ext.util.Observable",
    addToEnd: true,
    sliding: true,
    vertical: true,
    offsetX: 20,
    offsetY: 20,
    spacing: 10,
    animateOpacity: true,
    defaultType: "infopanel",
    statics: {
        queues: {},
        noneQueue: {
            items: [],
            removeAll: function (animate) {
                var items = this.items,
                    item,
                    i,
                    len;

                this.items = [];

                for (i = 0, len = items.length; i < len; i++) {
                    item = item[i];

                    if (!item.hidden && item.rendered && animate !== false) {
                        item.destroy();
                    } else {
                        item.destroy(false);
                    }
                }
            }
        }
    },

    constructor: function (config) {
        config = config || {};

        if (config.animate === undefined) {
            config.animate = Ext.isBoolean(this.animate) ? this.animate : Ext.enableFx;
        }

        this.enableAnimations = config.animate;
        delete config.animate;

        this.callParent([config]);

        Ext.net.InfoPanelQueue.queues[this.name] = this;
        this.initQueue();
    },

    initQueue: function () {
        if (!this.container) {
            this.initItems();
            Ext.on('resize', this.align, this, { buffer: 200 });
        }

        if (this.slideTo == "right" || this.slideTo == "left") {
            this.vertical = false;
        }

        Ext.net.InfoPanelQueue.queues[this.name] = this;

        this.fx = Ext.merge(this.getDefaultFx(), this.fx || {});

        if (!this.alignment) {
            this.alignment = "tr-tr";
        }

        if (!this.container) {
            this.calculateItemAlign();
        }
    },

    calculateItemAlign: function () {
        var reverse,
            alignParts,
            ea0, ea1, elen;

        this.itemAnchor = "";
        reverse = this.isReverseSlide();
        alignParts = this.alignment.split("-");
        elen = alignParts[0].length;
        ea0 = alignParts[0].charAt(0);
        ea1 = elen == 2 ? alignParts[0].charAt(1) : alignParts[0].charAt(0);

        if (this.vertical) {
            this.itemAnchor = (reverse ? "t" : "b") + (elen == 2 ? ea1 : "");
        } else {
            this.itemAnchor = elen == 2 ? (ea0 + (reverse ? "l" : "r")) : ea0;
        }

        this.itemAnchor += "-" + this.itemAnchor;
        this.alignOffset = [
            (elen == 2 ? (ea1 == "r" ? -1 : 1) : (ea0 == "r" ? -1 : (ea0 == "l" ? 1 : 0))) * this.offsetX,
            (ea0 == "t" ? 1 : (ea0 == "b" ? -1 : 0)) * this.offsetY
        ];
    },

    getNotificationId: function (n) {
        return n.getItemId && n.getItemId();
    },

    getDefaultFx: function () {
        return {
            show: {
                easing: 'easeIn',
                duration: 500,
                opacity: this.animateOpacity
            },

            hide: {
                duration: 500,
                opacity: this.animateOpacity
            },

            slideBack: {
                duration: 500
            }
        };
    },

    initItems: function () {
        var i,
            items = this.items;

        this.items = new Ext.util.AbstractMixedCollection(false, this.getNotificationId);

        if (items) {
            if (!Ext.isArray(items)) {
                items = [items];
            }

            this.add(items);
        }
    },

    applyDefaults: function (config) {
        var i,
            defaults = this.defaults;

        if (defaults) {
            if (Ext.isArray(config)) {
                for (i = 0; i < config.length; i++) {
                    config[i] = this.applyDefaults(config[i]);
                }

                return config;
            }

            Ext.applyIf(config, defaults);
        }

        return config;
    },

    lookupComponent: function (comp) {
        return (typeof comp == 'string') ? Ext.ComponentManager.get(comp)
                                            : Ext.ComponentManager.create(comp, this.defaultType);
    },

    initNotification: function (item) {
        if (!item.queue) {
            item.queue = this;
        }

        if (!this.container) {
            this.fireEvent("beforeadd", this, item);
            this.initAlignEl();

            item.hideMode = "offsets";
            item = this.applyDefaults(item);
            item = this.lookupComponent(item);

            this.addToEnd ? this.items.add(item) : this.items.insert(0, item);
            this.fireEvent("add", this, item);

            if (item.rendered) {
                this.onItemRender(item);
                this.onAfterItemRender(item);
            } else {
                item.on("render", this.onItemRender, this, { single: true });
                item.on("afterrender", this.onAfterItemRender, this, { single: true });
            }

            item.on("destroy", this.align, this);
            item.on("hide", this.onItemHide, this);
            item.on("beforeshow", this.onItemBeforeShow, this);
            item.on("show", this.align, this);
            item.on("resize", this.align, this, { buffer: 200 });
        } else if (this.enableAnimations) {
            var vertical = this.vertical,
                c = {};

            if (this.sliding) {
                if (vertical) {
                    c.y = true;
                } else {
                    c.x = true;
                }
            }

            item.notificationAnimationConfig = c;
        }

        return item;
    },

    initContainer: function () {
        if (!this.container.rendered) {
            this.container.on("afterrender", this.initContainer, this, { single: true });

            return;
        }

        var vertical = this.vertical,
            l = this.container.getLayout(),
            i;

        this.vertical = vertical = (l.names && l.names.x) == "y";

        if (this.enableAnimations) {
            l.animatePolicy = this.animateOpacity ? { opacity: true } : {};

            if (this.sliding) {
                l.animatePolicy[vertical ? "y" : "x"] = true;
            }
        }

        if (this.container.items.length) {
            for (i = 0; i < this.container.items.length; i++) {
                this.initNotification(this.container.items.getAt(i));
            }
        }

        this.container.on("beforeadd", this.onBeforeAdd, this);
        this.container.addCls("x-infopanel-container");
        this.container.defaultType = this.defaultType;
        this.initContainer = Ext.emptyFn;
    },

    onBeforeAdd: function (container, item) {
        this.initNotification(item);
    },

    onItemRender: function (item) {
        if (!this.container) {
            item.el.getXY = item._getXY;
            item.el.setX(-10000);

            if (this.fx.show.opacity) {
                item.el.setOpacity(0);
            }
        }
    },

    initAlignEl: function () {
        if (!this.alignmentEl && !this.container) {
            this.alignmentEl = Ext.getBody();
        } else {
            this.alignmentEl = Ext.get(this.alignmentEl);
        }

        this.initAlignEl = Ext.emptyFn;
    },

    onAfterItemRender: function (item) {
        if (!item.hidden) {
            this.initItemAlign(item);
            this.align();
        }
    },

    onItemHide: function (item) {
        if (!item._destroyAfterHide) {
            this.align();
        }
    },

    onItemBeforeShow: function (item) {
        var _hidden = item.hidden;

        if (this.fx.show.opacity) {
            item.el.setOpacity(0);
        }

        item._includeToVisible = true;
        this.initItemAlign(item);

        delete item._includeToVisible;
    },

    initItemAlign: function (item) {
        var reverse = this.isReverseSlide(),
            vertical = this.vertical,
            el,
            align,
            xy,
            items = this.getItems(true),
            itemIndex = Ext.Array.indexOf(items, item),
            itemOffset;

        if (items.length > 1 && itemIndex > 0 && this.addToEnd) {
            el = items[itemIndex - 1];
            align = this.itemAnchor;
            itemOffset = [0, 0];
            el.el._xy = el._xy;
            xy = item.getAlignToXY(el, align, itemOffset);

            delete el.el._xy;
        } else {
            el = this.alignmentEl;
            align = this.alignment;
            itemOffset = [this.alignOffset[0], this.alignOffset[1]];

            if (vertical) {
                itemOffset[1] = (reverse ? 1 : -1) * (item.getHeight())
            } else {
                itemOffset[0] = (reverse ? 1 : -1) * (item.getWidth())
            }

            xy = item.getAlignToXY(el, align, itemOffset);
        }

        item.setXY(xy, false);

        if (item.el) {
            item.el.dom.style.visibility = "";
        }

        item._xy = xy;
    },

    isReverseSlide: function () {
        if (!this.slideTo) {
            var vertical = this.vertical;
            this.slideTo = vertical ? "left" : "up";

            if (vertical && this.addToEnd && Ext.net.StringUtils.startsWith(this.alignment, "t")) {
                this.slideTo = vertical ? "right" : "down";
            } else if (!vertical && this.addToEnd
                && (Ext.net.StringUtils.startsWith(this.alignment, "l")
                || Ext.net.StringUtils.startsWith(this.alignment, "bl")
                || Ext.net.StringUtils.startsWith(this.alignment, "tl"))) {
                this.slideTo = vertical ? "right" : "down";
            }
        }

        return this.slideTo == "up" || this.slideTo == "left";
    },

    add: function (items) {
        var i,
            len,
            item;

        if (this.container) {
            if (this.container && Ext.isString(this.container)) {
                this.container = Ext.net.ResourceMgr.getCmp(this.container);
            }

            if (this.container) {
                this.initContainer();
            }

            this.fireEvent("beforeadd", this, items);
            items = this.applyDefaults(items);
            items = this.addToEnd ? this.container.add(items) : this.container.insert(0, items);
            this.fireEvent("add", this, items);

            return items;
        }

        if (!Ext.isArray(items)) {
            items = [items];
        }

        for (i = 0, len = items.length; i < len; i++) {
            item = items[i];
            items[i] = this.initNotification(item);
        }

        return items.length == 1 ? items[0] : items;
    },

    remove: function (item, animate) {
        if (!item.hidden && item.rendered && animate !== false) {
            item.destroy();
        } else {
            if (this.container) {
                this.container.remove(item);
            } else {
                this.items.remove(item);
                this.align();
            }

            this.fireEvent("remove", this, item);
        }
    },

    removeAll: function (animate) {
        var items = this.container ? this.container.items : this.items,
            item,
            align,
            i, len;

        for (i = 0, len = items.length; i < len; i++) {
            item = item.getAt(i);

            if (!item.hidden && item.rendered && animate !== false) {
                item.destroy();
            } else {
                if (this.container) {
                    this.container.remove(item);
                } else {
                    align = true;
                }

                this.fireEvent("remove", this, item);
            }
        }

        if (align) {
            this.items.removeAll();
            this.align();
        }
    },

    getItems: function (visible) {
        var i,
            len,
            item,
            allItems = this.container ? this.container.items : this.items,
            items = [];

        for (i = 0, len = allItems.length; i < len; i++) {
            item = allItems.getAt(i);

            if (((visible && !item.hidden) || !visible || item._includeToVisible)
                && item.el
                && item.el.dom) {
                items.push(item);
            }
        }

        return items;
    },

    align: function () {
        if (this.container) {
            this.container.updateLayout();

            return;
        }

        var i,
            len,
            item,
            prevItem,
            x,
            y,
            xy,
            anim,
            config,
            items,
            reverse = this.isReverseSlide();

        items = this.getItems(true);

        for (i = 0, len = items.length; i < len; i++) {
            item = items[i];

            if (!item.el || !item.el.dom) {
                continue;
            }

            if (i == 0) {
                xy = item.getAlignToXY(this.alignmentEl, this.alignment, this.alignOffset);
            } else {
                prevItem = items[i - 1];

                if (prevItem.el && prevItem.el.dom) {
                    prevItem.el._xy = prevItem._xy;

                    xy = item.getAlignToXY(prevItem, this.itemAnchor, [
                        this.vertical ? 0 : ((reverse ? -1 : 1) * (item.getWidth() + this.spacing)),
                        this.vertical ? ((reverse ? -1 : 1) * (item.getHeight() + this.spacing)) : 0
                    ]);

                    delete prevItem.el._xy;
                } else {
                    xy = item.getAlignToXY(this.alignmentEl, this.alignment, this.alignOffset);
                }
            }

            if (item._xy[0] != xy[0] || item._xy[1] != xy[1]) {
                if (this.enableAnimations) {
                    item.stopAnimation();

                    if (!item.el || !item.el.dom) {
                        continue;
                    }

                    if (this.vertical) {
                        anim = reverse ? (item._xy[1] > xy[1] ? "show" : "slideBack") : (item._xy[1] < xy[1] ? "show" : "slideBack");
                    } else {
                        anim = reverse ? (item._xy[0] > xy[0] ? "show" : "slideBack") : (item._xy[0] < xy[0] ? "show" : "slideBack");
                    }

                    anim = this.fx[anim];

                    config = {
                        from: {
                            x: item.getX(),
                            y: item.getY()
                        },
                        to: {
                            x: xy[0],
                            y: xy[1]
                        },
                        duration: anim.duration,
                        dynamic: true
                    };

                    config.to.opacity = 1;

                    if (anim.easing) {
                        config.easing = anim.easing;
                    }

                    item.animate(config);
                } else {
                    item.setXY(xy, false);
                }

                item._xy = xy;
            }
        }
    }

}, function () {
    this.defaultQueue = new this({
        name: "default"
    });

    new this({
        name: "topright",
        alignment: "tr-tr",
        vertical: true,
        slideTo: "down"
    });

    new this({
        name: "topleft",
        alignment: "tl-tl",
        vertical: true,
        slideTo: "down"
    });

    new this({
        name: "top",
        alignment: "t-t",
        vertical: true,
        slideTo: "down"
    });

    new this({
        name: "bottomright",
        alignment: "br-br",
        vertical: true,
        slideTo: "up"
    });

    new this({
        name: "bottomleft",
        alignment: "bl-bl",
        vertical: true,
        slideTo: "up"
    });

    new this({
        name: "bottom",
        alignment: "b-b",
        vertical: true,
        slideTo: "up"
    });

    new this({
        name: "righttop",
        alignment: "tr-tr",
        vertical: false,
        slideTo: "left"
    });

    new this({
        name: "rightbottom",
        alignment: "br-br",
        vertical: false,
        slideTo: "left"
    });

    new this({
        name: "right",
        alignment: "r-r",
        vertical: false,
        slideTo: "left"
    });

    new this({
        name: "lefttop",
        alignment: "tl-tl",
        vertical: false,
        slideTo: "right"
    });

    new this({
        name: "leftbottom",
        alignment: "bl-bl",
        vertical: false,
        slideTo: "right"
    });

    new this({
        name: "left",
        alignment: "l-l",
        vertical: false,
        slideTo: "right"
    });

    new this({
        name: "center",
        alignment: "c-c",
        vertical: true,
        slideTo: "down"
    });
});



Ext.define('Ext.net.InfoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.infopanel',
    bodyCls: "x-infopanel-body",
    minWidth: 200,
    isNotification: true,
    shadow: false,
    autoHide: false,
    pinEvent: "none",
    hideDelay: 7000,
    showPin: false,
    pinned: false,
    bringToFront: true,
    focusOnToFront: false,
    textAlign: 'left',
    statics: {
        info: function (title, html, queue) {
            var config;

            if (arguments.length == 1 && Ext.isObject(title)) {
                config = title;
            } else {
                config = {};
                config.title = title;
                config.html = html;
                config.queue = queue;
            }

            config.isFloatingInfo = true;

            if (config.floating !== false && !Ext.isDefined(config.autoHide)) {
                config.autoHide = true;
            }

            if (!config.alignmentEl && config.floating !== false) {
                if (!config.queue) {
                    config.queue = Ext.net.InfoPanelQueue.defaultQueue;
                }

                if (Ext.isString(config.queue)) {
                    config.queue = Ext.net.InfoPanelQueue.queues[config.queue];
                }

                return config.queue.add(config);
            } else {
                return Ext.create("Ext.net.InfoPanel", config);
            }
        }
    },

    toFront: function () {
        this.callParent(arguments);

        if (this.modal) {
            this.zIndexManager.showModalMask(this); // #621
        }
    },

    initComponent: function () {
        var noqueue = false;
        this.addCls("x-infopanel");

        this.afterHideAnimate = Ext.Function.bind(this.afterHideAnimate, this);

        if (!this.alignmentEl && this.initialConfig.floating !== false && this.isFloatingInfo) {
            if (!this.queue) {
                this.queue = Ext.net.InfoPanelQueue.defaultQueue;
                noqueue = true;
            }

            if (Ext.isString(this.queue)) {
                this.queue = Ext.net.InfoPanelQueue.queues[this.queue];
            }

            if (noqueue && this.queue && !this.queue.container) {
                this.queue.add(this);
            }
        } else {
            delete this.queue;
            if (this.alignmentEl) {
                this.alignmentEl = Ext.get(this.alignmentEl);
            }
        }

        if ((this.alignmentEl || !this.queue || !this.queue.container) && this.initialConfig.floating !== false && this.isFloatingInfo) {
            this.floating = true;
            this.renderTo = Ext.getBody();
        }

        if (this.ui && this.ui != "default") {
            this.nui = this.ui;
            this.addCls("x-infopanel-" + this.ui);
            this.ui = "default";
        }

        if (this.floating) {
            this.addCls("x-infopanel-floating");
        }

        if (this.iconCls) {
            this.addCls("x-infopanel-icon");
        }

        this.callParent(arguments);

        if (noqueue && this.queue && this.queue.container) {
            this.queue.add(this);
        }
    },

    _getXY: function () {
        if (this._xy) {
            return this._xy;
        }

        return Ext.dom.Element.prototype.getXY.call(this);
    },

    hide: function (animate) {
        var me = this,
            config,
            hideFx = this.queue && this.queue.fx.hide;

        if (this._parentHide || animate === false) {
            delete this._parentHide;

            this.wasHidden = true;
            this.callParent(arguments);

            return this;
        }

        if (this._hiding) {
            return this;
        }

        if (hideFx && this.queue && this.queue.enableAnimations) {
            this._hiding = true;

            if (this.rendered) {
                config = {
                    duration: hideFx.duration,
                    listeners: {
                        afteranimate: this.afterHideAnimate
                    }
                };

                if (hideFx.easing) {
                    config.easing = hideFx.easing;
                }

                if (hideFx.opacity) {
                    config.to = {
                        opacity: 0
                    };
                }

                this.el.animate(config);
            }
        } else {
            if (this.alignmentEl) {
                this.animateHide();

                return;
            }

            if (this._destroyAfterHide) {
                this.destroy(false);
            } else {
                this.callParent(arguments);
            }
        }

        return this;
    },

    afterHideAnimate: function () {
        var me = this;

        if (me._destroyAfterHide) {
            me.destroy(false);
        } else {
            delete me._hiding;

            me._parentHide = true;
            me.hide();
            me.el.setOpacity(1, false);
        }
    },

    destroy: function (animate) {
        if (!this.hidden && this.rendered && animate !== false) {
            this._destroyAfterHide = true;
            this.hide();
        } else {
            if (this.queue) {
                this.queue.remove(this, animate);
                delete this.queue;
            } else {
                Ext.Array.remove(Ext.net.InfoPanelQueue.noneQueue.items, this);
            }

            if (this.hideTask) {
                this.hideTask.cancel();
            }

            this.callParent(arguments);
        }
    },

    stopHiding: function () {
        if (this.header && this.showPin) {
            this.pin();
        } else {
            this.pinned = true;

            if (this.autoHide) {
                this.hideTask.cancel();
            }
        }
    },

    onRender: function () {
        this.callParent(arguments);

        this.body.addCls("x-infopanel-body-" + this.textAlign);

        if (this.alignmentEl) {
            this.x = -10000;
        }

        if (this.autoHide) {
            this.hideTask = new Ext.util.DelayedTask(this.destroy, this);
            this.el.hover(this.onOver, this.onOut, this);
        }

        if (this.header) {
            this.header.addCls("x-infopanel-header x-panel-header-light");
        }
    },

    animateShow: function () {
        this.el.setOpacity(0, false);
        this.el.fadeIn();
    },

    animateHide: function () {
        this.el.fadeOut({
            listeners: {
                afteranimate: this.afterHideAnimate
            }
        });
    },

    restartHideTask: function () {
        if (this.hideTask) {
            this.hideTask.cancel();
            this.hideTask.delay(this.hideDelay);
            this.delayed = false;
        }
    },

    onOver: function () {
        if (!this.pinned) {
            this.hideTask.cancel();
            this.delayed = true;
        }
    },

    onOut: function () {
        if (!this.pinned) {
            this.hideTask.delay(this.hideDelay);
            this.delayed = false;
        }
    },

    pin: function (e, toolEl, owner, tool) {
        this.tools.unpin.hide();
        this.tools.pin.show();
        this.hideTask.cancel();
        this.pinned = true;
    },

    unpin: function (e, toolEl, owner, tool) {
        this.tools.pin.hide();
        this.tools.unpin.show();
        this.destroy();
        this.pinned = false;
    },

    afterLayout: function () {
        this.callParent(arguments);

        if (this.alignmentEl && !this._aligned) {
            this._aligned = true;
            var xy = this.getAlignToXY(this.alignmentEl, this.alignment || "tr-tr", [this.offsetX || 0, this.offsetY || 0]);
            this.x = xy[0];
            this.y = xy[1];
            this.setXY(xy);

            this.animateShow();
        }
    },

    afterRender: function () {
        if (this.bringToFront && this.floating) {
            this.toFront();
        }

        this.callParent(arguments);

        if (this.showPin) {
            this.addTool({
                type: "unpin",
                itemId: "unpin",
                handler: this.pin,
                hidden: this.pinned,
                hideMode: "display",
                scope: this
            });

            this.addTool({
                type: "pin",
                itemId: "pin",
                handler: this.unpin,
                hidden: !this.pinned,
                hideMode: "display",
                scope: this
            });
        }

        if (this.pinEvent !== "none") {
            this.el.on(this.pinEvent, this.stopHiding, this);
            this.on(this.pinEvent, this.stopHiding, this);
        }

        if (this.autoHide && !this.delayed && !this.pinned) {
            this.hideTask.delay(this.hideDelay);
        }
    },

    setUI: function (ui) {
        if (ui == "default") {
            this.callParent(arguments);

            return;
        }

        if (this.nui) {
            this.removeCls("x-infopanel-" + this.nui);
        }

        this.nui = ui;

        if (this.nui) {
            this.addCls("x-infopanel-" + this.nui);
        }
    }
});

Ext.onReady(function() {
    Ext.MessageBox.info = Ext.net.InfoPanel.info;
});

// @source core/layout/Accordion.js

Ext.layout.container.Accordion.override({
    updatePanelClasses: function (ownerContext) {
        this.callParent(arguments);

        for (var i = 0; i < ownerContext.visibleItems.length; i++) {
            if (this.originalHeader) {
                ownerContext.visibleItems[i].header.removeCls(Ext.baseCSSPrefix + 'accordion-hd');
            }
        }
    },

    beforeRenderItems: function (items) {
        var i, len;

        for (i = 0, len = items.length; i < len; i++) {
            if (!(items[i] instanceof Ext.panel.Panel)) {
                throw Ext.String.format("The container {0} with AccordionLayout cannot have non-Panel items: {1}", this.owner.id, items[i].id);
            }
        }

        this.callParent(arguments);
    }
});
Ext.layout.container.Column.override({
    columnWidthFlexSizePolicy: {
        readsWidth: 0,
        readsHeight: 1,
        setsWidth: 1,
        setsHeight: 1
    },

    columnFlexSizePolicy: {
        setsWidth: 0,
        setsHeight: 1
    },

    isItemShrinkWrap: function (ownerContext) {
        return !ownerContext.flex;
    },

    getItemSizePolicy: function (item, ownerSizeModel) {
        if (item.columnWidth) {
            if (!ownerSizeModel) {
                ownerSizeModel = this.owner.getSizeModel();
            }

            if (!ownerSizeModel.width.shrinkWrap) {
                return item.flex ? this.columnWidthFlexSizePolicy : this.columnWidthSizePolicy;
            }
        }
        return item.flex ? this.columnFlexSizePolicy : this.autoSizePolicy;
    },

    calculateItems: function (ownerContext, containerSize) {
        var me = this,
            items = ownerContext.childItems,
            len = items.length,
            i, itemContext,
            ownerHeight = ownerContext.target.getHeight() - ownerContext.targetContext.getPaddingInfo().height;

        for (i = 0; i < len; ++i) {
            itemContext = items[i];

            if (itemContext.target.flex) {
                itemContext.setHeight(ownerHeight);
            }
        }

        return this.callParent(arguments);
    }
});

// @source core/ColorPalette.js

Ext.override(Ext.picker.Color, {
	getColorField : function () {
        if (!this.colorField) {
            this.colorField = new Ext.form.field.Hidden({name : this.id });

			this.on("beforedestroy", function () {
                this.destroy();
            }, this.colorField);
        }
        
        return this.colorField;
    },

    afterRender : function () {
        this.callParent(arguments);
        this.on("select", function (cp, color) {
            this.getColorField().setValue(color);
        });

        if (this.hasId()) {
            this.getColorField().render(this.el.parent() || this.el);
        }
    }
});

// @source core/DatePicker.js

Ext.picker.Date.override({
    initComponent: function () {
        this.callParent(arguments);

        this.on("render", this.onDateSelect, this, { single: true });
        this.on("select", this.onDateSelect, this);
    },

    onDateSelect: function () {
        this.getInputField().setValue(Ext.Date.dateFormat(this.getValue(), "Y-m-d\\Th:i:s"));
    },

    onRender: function () {
        this.callParent(arguments);

        if (this.hasId()) {
            this.getInputField().render(this.el.parent() || this.el);
        }
    },

    getInputField: function () {
        if (!this.inputField) {
            this.inputField = new Ext.form.field.Hidden({
                name: this.id
            });

            this.on("beforedestroy", function () {
                this.destroy();
            }, this.inputField);
        }

        return this.inputField;
    },

    createMonthPicker: function () {
        var me = this,
            picker = me.monthPicker,
            pickerConfig;

        if (!picker) {
            pickerConfig = {
                renderTo: me.el,
                ownerCmp: me,
                floating: true,
                padding: me.padding,
                shadow: false,
                small: me.showToday === false,
                footerButtonUI: me.footerButtonUI,
                listeners: {
                    scope: me,
                    cancelclick: me.onCancelClick,
                    okclick: me.onOkClick,
                    yeardblclick: me.onOkClick,
                    monthdblclick: me.onOkClick
                }
            };

            if (me.monthPickerOptions) {
                Ext.apply(pickerConfig, me.monthPickerOptions);
            }

            me.monthPicker = picker = Ext.create('Ext.picker.Month', pickerConfig);

            if (!me.disableAnim) {
                // hide the element if we're animating to prevent an initial flicker
                picker.el.setStyle('display', 'none');
            }

            picker.hide();
            me.on('beforehide', me.doHideMonthPicker, me);
        }

        return picker;
    }
});

// @source picker/MonthPicker.js

Ext.picker.Month.override({
    initComponent: function () {
        this.callParent(arguments);

        this.on("render", this.onDateSelect, this, {single:true});
        this.on("select", this.onDateSelect, this);
    },

    onDateSelect: function () {
        this.getInputField().setValue(Ext.encode(this.getValue()));
    },

    onRender: function () {
        this.callParent(arguments);

        if (this.hasId()) {
            this.getInputField().render(this.el.parent() || this.el);
        }
    },

    getInputField : function () {
        if (!this.inputField) {
            this.inputField = new Ext.form.field.Hidden({ 
                name : this.id 
            });

			this.on("beforedestroy", function () {
                this.destroy();
            }, this.inputField);
        }
        
        return this.inputField;
    }
});

// @source core/DatePicker.js

Ext.picker.Time.override({
    initComponent : function () {
        this.callParent(arguments);

        this.mon(this.getSelectionModel(), {
            selectionchange: this.onTimeSelect,
            scope : this
        });
    
        this.on("render", this.onTimeSelect, this, {single: true});
    },

    onTimeSelect: function (list, recordArray) { 
        var record = recordArray ? recordArray[0] : this.getSelectionModel().getSelection()[0],
            val = record ? record.get('disp') : "";

        this.getInputField().setValue(val); 
    },

    onRender : function (el) {
        this.callParent(arguments);

        if (this.hasId()) {
            this.getInputField().render(this.el.parent() || this.el);    
        }
    },
    
    getInputField : function () {
        if (!this.inputField) {
            this.inputField = new Ext.form.field.Hidden({                 
                name : this.id
            });

			this.on("beforedestroy", function () {
                this.destroy();
            }, this.inputField);
        }
        
        return this.inputField;
    },

    afterRender : function () { 
        this.callParent(arguments);

        if (this.value) {
            this.setValue(this.value);
        }
    },

    safeParse : function (value, format) {
        var me = this,            
            parsedDate,
            result = null,
            initDate = '1/1/2008',
            initDateFormat = 'j/n/Y';

        if (Ext.Date.formatContainsDateInfo(format)) {
            result = Ext.Date.parse(value, format);
        } else {
            parsedDate = Ext.Date.parse(initDate + ' ' + value, initDateFormat + ' ' + format);
            if (parsedDate) {
                result = parsedDate;
            }
        }
        return result;
    },

    setValue : function (value) {
        if (!this.rendered) {
            this.valueOf = value;
            return;
        }
        
        var d,
            initDate = '1/1/2008',
            selModel,
            itemNode,
            lastSelected;

        if (Ext.isString(value)) {
            d = this.safeParse(value, this.format);
        }
        else if (Ext.isDate(value)) {
            d = value;
        }

        if (d) {
            value = Ext.Date.clearTime(new Date(initDate));
            value.setHours(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
            value = value.getTime();

            selModel = this.getSelectionModel();

            selModel.select(this.store.getAt(this.store.findBy(function (record) {
                  var date = record.get('date');
                  return date && date.getTime() == value;
            })));
            
            lastSelected = selModel.lastSelected;
            itemNode = this.getNode(lastSelected);
            if (itemNode) {
                this.highlightItem(itemNode);
                itemNode.scrollIntoView(this.el, false);
            }
        }
    },

    getValue : function () {
        var records = this.getSelectionModel().getSelection();

        if (records && records.length > 0) {
            return records[0].get('date');
        }

        return null;
    },

    getText : function () {
        var records = this.getSelectionModel().getSelection();

        if (records && records.length > 0) {
            return records[0].get('disp');
        }

        return "";
    }
});
Ext.resizer.Splitter.override({
    getCollapseTarget: function () {
        var me = this;

        if (me.collapseTarget != "prev" && me.collapseTarget != "next" && Ext.isString(me.collapseTarget)) {
           var cmp = Ext.net.ResourceMgr.getCmp(me.collapseTarget);
           if (cmp) {
               me.collapseTarget = cmp;
           }
        }

        return this.callParent(arguments);
    }
});

Ext.resizer.SplitterTracker.override({
    // #898
    createDragOverlay: function () {
        this.callParent(arguments);
        this.overlay.setStyle({
            cursor: this.el.getStyle("cursor")
        });
    }
});
Ext.define("Ext.selection.CheckboxModel", {
    override: "Ext.selection.CheckboxModel",

    // This renderer adds a rowspan to the checkbox cells (table's td) if specified in 
    // the checkbox selection model settings.
    // Ext.NET specific setting.
    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this,
            columnClassProto = Ext.ClassManager.classes[me.column.$className].prototype;

        if (me.rowspan) {
            if (metaData.tdAttr.length > 0) {
                metaData.tdAttr += ' ';
            }
            metaData.tdAttr += 'rowspan="' + me.rowspan + '"';
        }

        // Calls the original defaultRenderer from ExtJS
        return columnClassProto.defaultRenderer(value, metaData);
    },

    // Bind the custom renderer to the checkbox column so that we can add custom behavior
    // to the cells.
    // Ext.NET specific setting.
    getHeaderConfig: function () {
        var me = this,
            config = me.callParent(arguments);

        // Replaces the check column's defaultRenderer with checkboxmodel's specific renderer
        config.defaultRenderer = me.renderer.bind(me);

        return config;
    }
});

// @source core/slider/Multi.js

Ext.slider.Multi.override({    
    useHiddenField : true,
    includeHiddenStateToSubmitData : false,

    getHiddenStateName : function () {
        return this.getName();
    }
});
// @source core/tab/Bar.js

Ext.tab.Bar.override({
    initComponent: function () {
        this.callParent(arguments);

        if (this.tabPanel && this.tabPanel.tabAlign == "right") {
            this.layout.pack = "end";
        }
    },

    privates: {
        beforeFocusableChildFocus: function (child, e) {
            if (!child.isPanel) {
                return;
            }

            this.callParent(arguments);
        }
    }
});


// @source core/Tab.js
Ext.tab.Tab.override({
    closable: false
});

// @source core/tab/Panel.js

Ext.tab.Panel.override({
    applyTabBar: function (tabBar) {
        if (this.tabBarItems) {
            tabBar = Ext.apply({}, tabBar, {
                items: this.tabBarItems
            });
        }

        return this.callParent([tabBar]);
    },

    initComponent: function () {
        this.callParent(arguments);

        this.on("beforetabchange", function (el, newTab) {
            newTab = newTab || {};
            var field = this.getActiveTabField();

            if (field) {
                field.setValue(this.getTabId(newTab) + ':' + el.items.indexOf(newTab));
            }
        }, this);

        this.on("render", function () {
            var field = this.getActiveTabField();

            if (field && this.hasId()) {
                field.render(this.el.parent() || this.el);
            }
        }, this, { single: true });
    },

    getTabId: function (tab) {
        return tab.id;
    },

    getActiveTabField: function () {
        if (!this.activeTabField && this.hasId()) {
            this.activeTabField = new Ext.form.field.Hidden({
                name: this.id,
                value: this.id + ":" + (this.activeTab || 0)
            });

            this.on("beforedestroy", function () {
                this.destroy();
            }, this.activeTabField);
        }

        return this.activeTabField;
    },

    closeTab: function (item, closeAction) {
        item = this.getComponent(item);

        if (Ext.isEmpty(item)) {
            return false;
        }

        var eventName = closeAction || item.closeAction || "close",
            destroy = eventName == "close" || eventName == "destroy";

        if (eventName == "destroy") {
            eventName = "close";
        }

        if (eventName != "close") {
            if (this.fireEvent("beforetabclose", this, item) === false) {
                return false;
            }

            if (item.fireEvent("beforeclose", item) === false) {
                return false;
            }
        }

        if (this.fireEvent("beforetab" + eventName, this, item) === false) {
            return false;
        }

        if (item.fireEvent("before" + eventName, item) === false) {
            return false;
        }

        if (destroy) {
            item.fireEvent("close", item);
        }

        this.fireEvent("tabclose", this, item);

        this.remove(item, destroy);

        if (!destroy) {
            item.fireEvent("close", item);
        }

        return item;
    },

    addTab: function (tab, index, activate) {
        if (tab.id && this.getComponent(tab.id)) {
            return;
        }

        var config = {};

        if (!Ext.isEmpty(index)) {
            if (typeof index == "object") {
                config = index;
            } else if (typeof index == "number") {
                config.index = index;
            } else {
                config.activate = index;
            }
        }

        if (!Ext.isEmpty(activate)) {
            config.activate = activate;
        }

        if (this.items.getCount() === 0) {
            this.activeTab = null;
        }

        if (tab.hidden && Ext.isFunction(tab.show)) {
            tab.show();
        }

        if (!Ext.isEmpty(config.index) && config.index >= 0) {
            tab = this.insert(config.index, tab);
        } else {
            tab = this.add(tab);
        }

        if (config.activate !== false) {
            this.setActiveTab(tab);
        }
    },

    setLastTabAsActive: function () {
        this.setActiveTab(this.items.getCount() - 1);
    },

    setPreviousTabAsActive: function () {
        this.setActiveTab(Math.max(0, this.items.indexOf(this.getActiveTab()) - 1));
    },

    setNextTabAsActive: function () {
        this.setActiveTab(Math.min(this.items.getCount() - 1, this.items.indexOf(this.getActiveTab()) + 1));
    }
});
// @source core/tip/ToolTip.js

Ext.tip.ToolTip.override({
    setTarget: function (target) {
        // Fix for issue #671 - ensure target is a dom element
        if (typeof (target) === "string") {
            target = Ext.net.getEl(target);
        }

        this.callParent(arguments);
    }
});

// @source core/toolbar/TextItem.js

Ext.toolbar.TextItem.override({
    getText : function () {
        return this.rendered ? this.el.dom.innerHTML : this.text;
    }
});

// @source core/toolbar/Toolbar.js

Ext.toolbar.Toolbar.override({
    onBeforeAdd: function(component) {
        var ui = component.ui,
            isButton = component.isButton;

        this.callParent(arguments);

        if (isButton && this.ui !== 'footer' && (this.classicButtonStyle || component.flat === false)) {
            component.ui = ui;            
        }
    }
});
Ext.toolbar.Breadcrumb.override({
    applySelection: function (node) {
        if (node !== 'root' && Ext.isString(node)) {
            var store = this.getStore();

            if (store) {
                node = store.getNodeById(node);
            }
        }
        return this.callParent([node]);
    },

    // That is only overridden for #835 and .hasId() call at the end.
    updateSelection: function (node) {
        var me = this,
            buttons = me._buttons,
            items = [],
            itemCount = Ext.ComponentQuery.query('[isCrumb]', me.getRefItems()).length,
            needsSync = me._needsSync,
            displayField = me.getDisplayField(),
            showIcons, glyph, iconCls, icon, newItemCount, currentNode, text, button, id, depth, i, tooltip; // #835

        Ext.suspendLayouts();

        if (node) {
            currentNode = node;
            depth = node.get('depth');
            newItemCount = depth + 1;
            i = depth;

            while (currentNode) {
                id = currentNode.getId();

                button = buttons[i];

                if (!needsSync && button && button._breadcrumbNodeId === id) {
                    // reached a level in the hierarchy where we are already in sync.
                    break;
                }

                text = currentNode.get(displayField);
                tooltip = currentNode.get("qtip"); // #835

                if (button) {
                    // If we already have a button for this depth in the button cache reuse it
                    button.setText(text);
                    button.setTooltip(tooltip);
                } else {
                    // no button in the cache - make one and add it to the cache
                    button = buttons[i] = Ext.create({
                        isCrumb: true,
                        xtype: me.getUseSplitButtons() ? 'splitbutton' : 'button',
                        ui: me.getButtonUI(),
                        cls: me._btnCls + ' ' + me._btnCls + '-' + me.ui,
                        text: text,
                        tooltip: tooltip, // #835
                        showEmptyMenu: true,
                        // begin with an empty menu - items are populated on beforeshow
                        menu: {
                            listeners: {
                                click: '_onMenuClick',
                                beforeshow: '_onMenuBeforeShow',
                                scope: this
                            }
                        },
                        handler: '_onButtonClick',
                        scope: me
                    });
                }

                showIcons = this.getShowIcons();

                if (showIcons !== false) {
                    glyph = currentNode.get('glyph');
                    icon = currentNode.get('icon');
                    iconCls = currentNode.get('iconCls');

                    if (glyph) {
                        button.setGlyph(glyph);
                        button.setIcon(null);
                        button.setIconCls(iconCls); // may need css to get glyph
                    } else if (icon) {
                        button.setGlyph(null);
                        button.setIconCls(null);
                        button.setIcon(icon);
                    } else if (iconCls) {
                        button.setGlyph(null);
                        button.setIcon(null);
                        button.setIconCls(iconCls);
                    } else if (showIcons) {
                        // only show default icons if showIcons === true
                        button.setGlyph(null);
                        button.setIcon(null);
                        button.setIconCls(
                            (currentNode.isLeaf() ? me._leafIconCls : me._folderIconCls) + '-' + me.ui
                        );
                    } else {
                        // if showIcons is null do not show default icons
                        button.setGlyph(null);
                        button.setIcon(null);
                        button.setIconCls(null);
                    }
                }

                button.setArrowVisible(currentNode.hasChildNodes());
                button._breadcrumbNodeId = currentNode.getId();

                currentNode = currentNode.parentNode;
                i--;
            }

            if (newItemCount > itemCount) {
                // new selection has more buttons than existing selection, add the new buttons
                items = buttons.slice(itemCount, depth + 1);
                me.add(items);
            } else {
                // new selection has fewer buttons, remove the extra ones from the items, but
                // do not destroy them, as they are returned to the cache and recycled.
                for (i = itemCount - 1; i >= newItemCount; i--) {
                    me.remove(buttons[i], false);
                }
            }

        } else {
            // null selection
            for (i = 0; i < buttons.length; i++) {
                me.remove(buttons[i], false);
            }
        }

        Ext.resumeLayouts(true);

        
        me.fireEvent('selectionchange', me, node);

        me._needsSync = false;

        if (this.hasId()) { // Added in Ext.NET
            this.getSelectionField().setValue(node ? node.getId() : "");
        }
    },

    getSelectionField: function () {
        if (!this.selectionField && this.hasId()) {
            var value = this.getSelection();
            if (value && value.isModel) {
                value = value.getId();
            }
            else {
                value = "";
            }

            this.selectionField = new Ext.form.Hidden({
                name: this.id,
                value: value
            });

            this.on("beforedestroy", function () {
                this.destroy();
            }, this.selectionField);

            if (this.hasId()) {
                this.selectionField.render(this.el.parent() || this.el);
            }
        }

        return this.selectionField;
    }
});

// @source core/init/End.js

(function () {
    var buf = [];

    if (!Ext.isIE6) {
        buf.push(".x-label-icon{width:16px;height:16px;margin-left:3px;margin-right:3px;vertical-align:middle;border:0px !important;}");
    }

    if (Ext.isIE8) {
        buf.push(".x-item-disabled span.x-btn-icon-el { filter: alpha(opacity=50); }");
    }
    
    buf.push("input.x-tree-node-cb{margin-left:1px;height:18px;vertical-align:bottom;}.x-tree-node .x-tree-node-inline-icon{background:transparent;height:16px !important;}");
    buf.push(".x-toolbar-flat{padding:0px !important;border:0px !important;background:none !important;background-color: transparent !important; background-image: none !important;}");
	buf.push(".x-grid-row-checker-on{background-position:-25px 0 !important;}");
	buf.push(".x-grid-header-widgets{border-top-width:0px;} .x-grid-header-widgets .x-form-item{margin-bottom:1px;} .x-border-box .x-ie9 .x-grid-header-ct{padding-left:0px;}");

    if (Ext.platformTags.ios) { // #117
        buf.push(".ios-iframe-scroll-fix { -webkit-overflow-scrolling: touch; overflow-y: scroll; }");
    }

	Ext.net.ResourceMgr.registerCssClass("Ext.Net.CSS", buf.join(""));
})();
