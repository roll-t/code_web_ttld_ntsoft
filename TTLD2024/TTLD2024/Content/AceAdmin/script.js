﻿if (!("ace" in window)) {
    window.ace = {}
}
jQuery(function (a) {
    window.ace.click_event = a.fn.tap ? "tap" : "click"
});
jQuery(function (a) {
    ace.handle_side_menu(jQuery);
    ace.enable_search_ahead(jQuery);
    ace.general_things(jQuery);
    ace.widget_boxes(jQuery);
    ace.widget_reload_handler(jQuery)
});
ace.handle_side_menu = function (a) {
    a("#menu-toggler").on(ace.click_event, function () {
        a("#sidebar").toggleClass("display");
        a(this).toggleClass("display");
        return false
    });
    var c = a("#sidebar").hasClass("menu-min");
    a("#sidebar-collapse").on(ace.click_event, function () {
        c = a("#sidebar").hasClass("menu-min");
        ace.settings.sidebar_collapsed(!c)
    });
    var b = "ontouchend" in document;
    a(".nav-list").on(ace.click_event, function (h) {
        var g = a(h.target).closest("a");
        if (!g || g.length == 0) {
            return
        }
        c = a("#sidebar").hasClass("menu-min");
        if (!g.hasClass("dropdown-toggle")) {
            if (c && ace.click_event == "tap" && g.get(0).parentNode.parentNode == this) {
                var i = g.find(".menu-text").get(0);
                if (h.target != i && !a.contains(i, h.target)) {
                    return false
                }
            }
            return
        }
        var f = g.next().get(0);
        if (!a(f).is(":visible")) {
            var d = a(f.parentNode).closest("ul");
            if (c && d.hasClass("nav-list")) {
                return
            }
            d.find("> .open > .submenu").each(function () {
                if (this != f && !a(this.parentNode).hasClass("active")) {
                    a(this).slideUp(200).parent().removeClass("open")
                }
            })
        } else { }
        if (c && a(f.parentNode.parentNode).hasClass("nav-list")) {
            return false
        }
        a(f).slideToggle(200).parent().toggleClass("open");
        return false
    })
}
    ;
ace.general_things = function (a) {
    a('.ace-nav [class*="icon-animated-"]').closest("a").on("click", function () {
        var d = a(this).find('[class*="icon-animated-"]').eq(0);
        var c = d.attr("class").match(/icon\-animated\-([\d\w]+)/);
        d.removeClass(c[0]);
        a(this).off("click")
    });
    a(".nav-list .badge[title],.nav-list .label[title]").tooltip({
        placement: "right"
    });
    a("#ace-settings-btn").on(ace.click_event, function () {
        a(this).toggleClass("open");
        a("#ace-settings-box").toggleClass("open")
    });
    a("#ace-settings-navbar").on("click", function () {
        ace.settings.navbar_fixed(this.checked)
    }).each(function () {
        this.checked = ace.settings.is("navbar", "fixed")
    });
    a("#ace-settings-sidebar").on("click", function () {
        ace.settings.sidebar_fixed(this.checked)
    }).each(function () {
        this.checked = ace.settings.is("sidebar", "fixed")
    });
    a("#ace-settings-breadcrumbs").on("click", function () {
        ace.settings.breadcrumbs_fixed(this.checked)
    }).each(function () {
        this.checked = ace.settings.is("breadcrumbs", "fixed")
    });
    a("#ace-settings-add-container").on("click", function () {
        ace.settings.main_container_fixed(this.checked)
    }).each(function () {
        this.checked = ace.settings.is("main-container", "fixed")
    });
    a("#ace-settings-rtl").removeAttr("checked").on("click", function () {
        ace.switch_direction(jQuery)
    });
    a("#btn-scroll-up").on(ace.click_event, function () {
        var c = Math.min(400, Math.max(100, parseInt(a("html").scrollTop() / 3)));
        a("html,body").animate({
            scrollTop: 0
        }, c);
        return false
    });
    try {
        a("#skin-colorpicker").ace_colorpicker()
    } catch (b) { }
    a("#skin-colorpicker").on("change", function () {
        var d = a(this).find("option:selected").data("skin");
        var c = a(document.body);
        c.removeClass("skin-1 skin-2 skin-3");
        if (d != "default") {
            c.addClass(d)
        }
        if (d == "skin-1") {
            a(".ace-nav > li.grey").addClass("dark")
        } else {
            a(".ace-nav > li.grey").removeClass("dark")
        }
        if (d == "skin-2") {
            a(".ace-nav > li").addClass("no-border margin-1");
            a(".ace-nav > li:not(:last-child)").addClass("light-pink").find('> a > [class*="icon-"]').addClass("pink").end().eq(0).find(".badge").addClass("badge-warning")
        } else {
            a(".ace-nav > li").removeClass("no-border margin-1");
            a(".ace-nav > li:not(:last-child)").removeClass("light-pink").find('> a > [class*="icon-"]').removeClass("pink").end().eq(0).find(".badge").removeClass("badge-warning")
        }
        if (d == "skin-3") {
            a(".ace-nav > li.grey").addClass("red").find(".badge").addClass("badge-yellow")
        } else {
            a(".ace-nav > li.grey").removeClass("red").find(".badge").removeClass("badge-yellow")
        }
    })
}
    ;
ace.widget_boxes = function (a) {
    a(document).on("hide.bs.collapse show.bs.collapse", function (c) {
        var b = c.target.getAttribute("id");
        a('[href*="#' + b + '"]').find('[class*="icon-"]').each(function () {
            var e = a(this);
            var d;
            var f = null;
            var g = null;
            if ((f = e.attr("data-icon-show"))) {
                g = e.attr("data-icon-hide")
            } else {
                if (d = e.attr("class").match(/icon\-(.*)\-(up|down)/)) {
                    f = "icon-" + d[1] + "-down";
                    g = "icon-" + d[1] + "-up"
                }
            }
            if (f) {
                if (c.type == "show") {
                    e.removeClass(f).addClass(g)
                } else {
                    e.removeClass(g).addClass(f)
                }
                return false
            }
        })
    });
    a(document).on("click.ace.widget", "[data-action]", function (o) {
        o.preventDefault();
        var n = a(this);
        var p = n.data("action");
        var b = n.closest(".widget-box");
        if (b.hasClass("ui-sortable-helper")) {
            return
        }
        if (p == "collapse") {
            var j = b.hasClass("collapsed") ? "show" : "hide";
            var f = j == "show" ? "shown" : "hidden";
            var c;
            b.trigger(c = a.Event(j + ".ace.widget"));
            if (c.isDefaultPrevented()) {
                return
            }
            var g = b.find(".widget-body");
            var m = n.find("[class*=icon-]").eq(0);
            var h = m.attr("class").match(/icon\-(.*)\-(up|down)/);
            var d = "icon-" + h[1] + "-down";
            var i = "icon-" + h[1] + "-up";
            var l = g.find(".widget-body-inner");
            if (l.length == 0) {
                g = g.wrapInner('<div class="widget-body-inner"></div>').find(":first-child").eq(0)
            } else {
                g = l.eq(0)
            }
            var e = 300;
            var k = 200;
            if (j == "show") {
                if (m) {
                    m.addClass(i).removeClass(d)
                }
                b.removeClass("collapsed");
                g.slideUp(0, function () {
                    g.slideDown(e, function () {
                        b.trigger(c = a.Event(f + ".ace.widget"))
                    })
                })
            } else {
                if (m) {
                    m.addClass(d).removeClass(i)
                }
                g.slideUp(k, function () {
                    b.addClass("collapsed");
                    b.trigger(c = a.Event(f + ".ace.widget"))
                })
            }
        } else {
            if (p == "close") {
                var c;
                b.trigger(c = a.Event("close.ace.widget"));
                if (c.isDefaultPrevented()) {
                    return
                }
                var r = parseInt(n.data("close-speed")) || 300;
                b.hide(r, function () {
                    b.trigger(c = a.Event("closed.ace.widget"));
                    b.remove()
                })
            } else {
                if (p == "reload") {
                    var c;
                    b.trigger(c = a.Event("reload.ace.widget"));
                    if (c.isDefaultPrevented()) {
                        return
                    }
                    n.blur();
                    var q = false;
                    if (b.css("position") == "static") {
                        q = true;
                        b.addClass("position-relative")
                    }
                    b.append('<div class="widget-box-overlay"><i class="icon-spinner icon-spin icon-2x white"></i></div>');
                    b.one("reloaded.ace.widget", function () {
                        b.find(".widget-box-overlay").remove();
                        if (q) {
                            b.removeClass("position-relative")
                        }
                    })
                } else {
                    if (p == "settings") {
                        var c = a.Event("settings.ace.widget");
                        b.trigger(c)
                    }
                }
            }
        }
    })
}
    ;
ace.widget_reload_handler = function (a) {
    a(document).on("reload.ace.widget", ".widget-box", function (b) {
        var c = a(this);
        setTimeout(function () {
            c.trigger("reloaded.ace.widget")
        }, parseInt(Math.random() * 1000 + 1000))
    })
}
    ;
ace.enable_search_ahead = function (a) {
    ace.variable_US_STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
    try {
        a("#nav-search-input").typeahead({
            source: ace.variable_US_STATES,
            updater: function (c) {
                a("#nav-search-input").focus();
                return c
            }
        })
    } catch (b) { }
}
    ;
ace.switch_direction = function (d) {
    var c = d(document.body);
    c.toggleClass("rtl").find(".dropdown-menu:not(.datepicker-dropdown,.colorpicker)").toggleClass("pull-right").end().find(".pull-right:not(.dropdown-menu,blockquote,.profile-skills .pull-right)").removeClass("pull-right").addClass("tmp-rtl-pull-right").end().find(".pull-left:not(.dropdown-submenu,.profile-skills .pull-left)").removeClass("pull-left").addClass("pull-right").end().find(".tmp-rtl-pull-right").removeClass("tmp-rtl-pull-right").addClass("pull-left").end().find(".chosen-container").toggleClass("chosen-rtl").end();
    function a(h, g) {
        c.find("." + h).removeClass(h).addClass("tmp-rtl-" + h).end().find("." + g).removeClass(g).addClass(h).end().find(".tmp-rtl-" + h).removeClass("tmp-rtl-" + h).addClass(g)
    }
    function b(h, g, i) {
        i.each(function () {
            var k = d(this);
            var j = k.css(g);
            k.css(g, k.css(h));
            k.css(h, j)
        })
    }
    a("align-left", "align-right");
    a("no-padding-left", "no-padding-right");
    a("arrowed", "arrowed-right");
    a("arrowed-in", "arrowed-in-right");
    a("messagebar-item-left", "messagebar-item-right");
    var e = d("#piechart-placeholder");
    if (e.size() > 0) {
        var f = d(document.body).hasClass("rtl") ? "nw" : "ne";
        e.data("draw").call(e.get(0), e, e.data("chart"), f)
    }
}
    ;
if (!("ace" in window)) {
    window.ace = {}
}
ace.config = {
    cookie_expiry: 604800,
    storage_method: 2
};
ace.settings = {
    is: function (b, a) {
        return (ace.data.get("settings", b + "-" + a) == 1)
    },
    exists: function (b, a) {
        return (ace.data.get("settings", b + "-" + a) !== null)
    },
    set: function (b, a) {
        ace.data.set("settings", b + "-" + a, 1)
    },
    unset: function (b, a) {
        ace.data.set("settings", b + "-" + a, -1)
    },
    remove: function (b, a) {
        ace.data.remove("settings", b + "-" + a)
    },
    navbar_fixed: function (a) {
        a = a || false;
        if (!a && ace.settings.is("sidebar", "fixed")) {
            ace.settings.sidebar_fixed(false)
        }
        var b = document.getElementById("navbar");
        if (a) {
            if (!ace.hasClass(b, "navbar-fixed-top")) {
                ace.addClass(b, "navbar-fixed-top")
            }
            if (!ace.hasClass(document.body, "navbar-fixed")) {
                ace.addClass(document.body, "navbar-fixed")
            }
            ace.settings.set("navbar", "fixed")
        } else {
            ace.removeClass(b, "navbar-fixed-top");
            ace.removeClass(document.body, "navbar-fixed");
            ace.settings.unset("navbar", "fixed")
        }
        document.getElementById("ace-settings-navbar").checked = a
    },
    breadcrumbs_fixed: function (a) {
        a = a || false;
        if (a && !ace.settings.is("sidebar", "fixed")) {
            ace.settings.sidebar_fixed(true)
        }
        var b = document.getElementById("breadcrumbs");
        if (a) {
            if (!ace.hasClass(b, "breadcrumbs-fixed")) {
                ace.addClass(b, "breadcrumbs-fixed")
            }
            if (!ace.hasClass(document.body, "breadcrumbs-fixed")) {
                ace.addClass(document.body, "breadcrumbs-fixed")
            }
            ace.settings.set("breadcrumbs", "fixed")
        } else {
            ace.removeClass(b, "breadcrumbs-fixed");
            ace.removeClass(document.body, "breadcrumbs-fixed");
            ace.settings.unset("breadcrumbs", "fixed")
        }
        document.getElementById("ace-settings-breadcrumbs").checked = a
    },
    sidebar_fixed: function (a) {
        a = a || false;
        if (!a && ace.settings.is("breadcrumbs", "fixed")) {
            ace.settings.breadcrumbs_fixed(false)
        }
        if (a && !ace.settings.is("navbar", "fixed")) {
            ace.settings.navbar_fixed(true)
        }
        var b = document.getElementById("sidebar");
        if (a) {
            if (!ace.hasClass(b, "sidebar-fixed")) {
                ace.addClass(b, "sidebar-fixed")
            }
            ace.settings.set("sidebar", "fixed")
        } else {
            ace.removeClass(b, "sidebar-fixed");
            ace.settings.unset("sidebar", "fixed")
        }
        document.getElementById("ace-settings-sidebar").checked = a
    },
    main_container_fixed: function (a) {
        a = a || false;
        var c = document.getElementById("main-container");
        var b = document.getElementById("navbar-container");
        if (a) {
            if (!ace.hasClass(c, "container")) {
                ace.addClass(c, "container")
            }
            if (!ace.hasClass(b, "container")) {
                ace.addClass(b, "container")
            }
            ace.settings.set("main-container", "fixed")
        } else {
            ace.removeClass(c, "container");
            ace.removeClass(b, "container");
            ace.settings.unset("main-container", "fixed")
        }
        document.getElementById("ace-settings-add-container").checked = a;
        if (navigator.userAgent.match(/webkit/i)) {
            var d = document.getElementById("sidebar");
            ace.toggleClass(d, "menu-min");
            setTimeout(function () {
                ace.toggleClass(d, "menu-min")
            }, 0)
        }
    },
    sidebar_collapsed: function (c) {
        c = c || false;
        var e = document.getElementById("sidebar");
        var d = document.getElementById("sidebar-collapse").querySelector('[class*="icon-"]');
        var b = d.getAttribute("data-icon1");
        var a = d.getAttribute("data-icon2");
        if (c) {
            ace.addClass(e, "menu-min");
            ace.removeClass(d, b);
            ace.addClass(d, a);
            ace.settings.set("sidebar", "collapsed")
        } else {
            ace.removeClass(e, "menu-min");
            ace.removeClass(d, a);
            ace.addClass(d, b);
            ace.settings.unset("sidebar", "collapsed")
        }
    },
};
ace.settings.check = function (c, e) {
    if (!ace.settings.exists(c, e)) {
        return
    }
    var a = ace.settings.is(c, e);
    var b = {
        "navbar-fixed": "navbar-fixed-top",
        "sidebar-fixed": "sidebar-fixed",
        "breadcrumbs-fixed": "breadcrumbs-fixed",
        "sidebar-collapsed": "menu-min",
        "main-container-fixed": "container"
    };
    var d = document.getElementById(c);
    if (a != ace.hasClass(d, b[c + "-" + e])) {
        ace.settings[c.replace("-", "_") + "_" + e](a)
    }
}
    ;
ace.data_storage = function (e, c) {
    var b = "ace.";
    var d = null;
    var a = 0;
    if ((e == 1 || e === c) && "localStorage" in window && window.localStorage !== null) {
        d = ace.storage;
        a = 1
    } else {
        if (d == null && (e == 2 || e === c) && "cookie" in document && document.cookie !== null) {
            d = ace.cookie;
            a = 2
        }
    }
    this.set = function (h, g, i, k) {
        if (!d) {
            return
        }
        if (i === k) {
            i = g;
            g = h;
            if (i == null) {
                d.remove(b + g)
            } else {
                if (a == 1) {
                    d.set(b + g, i)
                } else {
                    if (a == 2) {
                        d.set(b + g, i, ace.config.cookie_expiry)
                    }
                }
            }
        } else {
            if (a == 1) {
                if (i == null) {
                    d.remove(b + h + "." + g)
                } else {
                    d.set(b + h + "." + g, i)
                }
            } else {
                if (a == 2) {
                    var j = d.get(b + h);
                    var f = j ? JSON.parse(j) : {};
                    if (i == null) {
                        delete f[g];
                        if (ace.sizeof(f) == 0) {
                            d.remove(b + h);
                            return
                        }
                    } else {
                        f[g] = i
                    }
                    d.set(b + h, JSON.stringify(f), ace.config.cookie_expiry)
                }
            }
        }
    }
        ;
    this.get = function (h, g, j) {
        if (!d) {
            return null
        }
        if (g === j) {
            g = h;
            return d.get(b + g)
        } else {
            if (a == 1) {
                return d.get(b + h + "." + g)
            } else {
                if (a == 2) {
                    var i = d.get(b + h);
                    var f = i ? JSON.parse(i) : {};
                    return g in f ? f[g] : null
                }
            }
        }
    }
        ;
    this.remove = function (g, f, h) {
        if (!d) {
            return
        }
        if (f === h) {
            f = g;
            this.set(f, null)
        } else {
            this.set(g, f, null)
        }
    }
}
    ;
ace.cookie = {
    get: function (c) {
        var d = document.cookie, g, f = c + "=", a;
        if (!d) {
            return
        }
        a = d.indexOf("; " + f);
        if (a == -1) {
            a = d.indexOf(f);
            if (a != 0) {
                return null
            }
        } else {
            a += 2
        }
        g = d.indexOf(";", a);
        if (g == -1) {
            g = d.length
        }
        return decodeURIComponent(d.substring(a + f.length, g))
    },
    set: function (b, e, a, g, c, f) {
        var h = new Date();
        if (typeof (a) == "object" && a.toGMTString) {
            a = a.toGMTString()
        } else {
            if (parseInt(a, 10)) {
                h.setTime(h.getTime() + (parseInt(a, 10) * 1000));
                a = h.toGMTString()
            } else {
                a = ""
            }
        }
        document.cookie = b + "=" + encodeURIComponent(e) + ((a) ? "; expires=" + a : "") + ((g) ? "; path=" + g : "") + ((c) ? "; domain=" + c : "") + ((f) ? "; secure" : "")
    },
    remove: function (a, b) {
        this.set(a, "", -1000, b)
    }
};
ace.storage = {
    get: function (a) {
        return window.localStorage.getItem(a)
    },
    set: function (a, b) {
        window.localStorage.setItem(a, b)
    },
    remove: function (a) {
        window.localStorage.removeItem(a)
    }
};
ace.sizeof = function (c) {
    var b = 0;
    for (var a in c) {
        if (c.hasOwnProperty(a)) {
            b++
        }
    }
    return b
}
    ;
ace.hasClass = function (b, a) {
    return (" " + b.className + " ").indexOf(" " + a + " ") > -1
}
    ;
ace.addClass = function (c, b) {
    if (!ace.hasClass(c, b)) {
        var a = c.className;
        c.className = a + (a.length ? " " : "") + b
    }
}
    ;
ace.removeClass = function (b, a) {
    ace.replaceClass(b, a)
}
    ;
ace.replaceClass = function (c, b, d) {
    var a = new RegExp(("(^|\\s)" + b + "(\\s|$)"), "i");
    c.className = c.className.replace(a, function (e, g, f) {
        return d ? (g + d + f) : " "
    }).replace(/^\s+|\s+$/g, "")
}
    ;
ace.toggleClass = function (b, a) {
    if (ace.hasClass(b, a)) {
        ace.removeClass(b, a)
    } else {
        ace.addClass(b, a)
    }
}
    ;
ace.data = new ace.data_storage(ace.config.storage_method);
