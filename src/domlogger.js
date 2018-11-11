(function(e, t) {
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = t;
    } else if (typeof define === "function" && typeof define.amd !== "undefined") {
        define([], () => t);
    } else {
        window[e] = t;
    }
})("DOMLogger", function() {
    JSON.stringifyOnce = function(e, t, n) {
        var o = [];
        var r = [];
        function s(n, s) {
            if (o.length > 2e3) {
                return "object too long";
            }
            var a = false;
            o.forEach(function(e, t) {
                if (e === s) {
                    a = t;
                }
            });
            if (n == "") {
                o.push(e);
                r.push("root");
                return s;
            } else if (a + "" != "false" && typeof s == "object") {
                if (r[a] == "root") {
                    return "(pointer to root)";
                } else {
                    return "(see " + (!!s && !!s.constructor ? s.constructor.name.toLowerCase() : typeof s) + " with key " + r[a] + ")";
                }
            } else {
                var l = n || "(empty key)";
                o.push(s);
                r.push(l);
                if (t) {
                    return t(n, s);
                } else {
                    return s;
                }
            }
        }
        return JSON.stringify(e, s, n);
    };
    function e(e = {}) {
        var t = this;
        var n = function() {
            this.first = new Date();
            this.reset = function() {
                this.first = new Date();
            };
            this.time = function() {
                return new Date().getTime() - this.first.getTime();
            };
            return this;
        };
        var o = new n();
        var r = function() {
            var e = document.createElement("div");
            e.innerHTML = `\n\t\t<div class="dom-logger-component ${a.componentClass}">\n\t\t\t<div class="dom-logger-toolbar">\n\t\t\t\t<div class="dom-logger-toolbar-btn expand-btn">Expand</div>\n\t\t\t\t<div class="dom-logger-toolbar-btn clear-btn">Clear</div>\n\t\t\t\t<div class="dom-logger-toolbar-btn closed-btn">Close</div>\n\t\t\t</div>\n\t\t\t<div class="dom-logger-wrapper">\n\t\t\t\t<div class="dom-logger-panel">\n\t\t\t\t\t\x3c!-- Logged Messages --\x3e\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>`;
            t._.wrapper = e.querySelectorAll(".dom-logger-wrapper")[0];
            t._.component = e.children[0];
            t._.panel = e.querySelectorAll(".dom-logger-panel")[0];
            t._.toolbar = e.querySelectorAll(".dom-logger-toolbar")[0];
            t._.buttons = {};
            t._.buttons.clear = e.querySelectorAll(".clear-btn")[0];
            t._.buttons.clear.addEventListener("click", function() {
                t.clear();
            });
            t._.buttons.closed = e.querySelectorAll(".closed-btn")[0];
            t._.buttons.closed.addEventListener("click", function() {
                t.toggleOpen();
            });
            t._.buttons.expand = e.querySelectorAll(".expand-btn")[0];
            t._.buttons.expand.addEventListener("click", function() {
                t.toggleCompact();
            });
            document.body.appendChild(t._.component);
            return t._.panel;
        };
        var s = function(e, n, o = false, r = false) {
            var s = document.createElement(r ? "pre" : "div");
            if (o === true) {
                s.innerHTML = n;
            } else {
                s.textContent = n;
            }
            s.className = "dom-logger-message ";
            s.title = t._.data.timer.time() / 1e3;
            s.addEventListener("click", function() {
                var e = this.getAttribute("data-message-type");
                var t = "[" + e + "][" + s.title.replace("\n", " ") + "] " + s.textContent;
                console.log(t);
            });
            return s;
        };
        var a = Object.assign({
            componentClass: ""
        }, e);
        t._ = {};
        t._.data = {};
        t._.data.timer = o;
        t._.data.blinkedTimeoutId = false;
        t._.panel = new r();
        t._.wrapper = t._.panel.parentElement;
        function l(e, n, o, r = undefined) {
            return function(a, l = false) {
                var i;
                var c = false;
                if (typeof a !== "string") {
                    i = JSON.stringifyOnce(a, null, 4);
                    l = false;
                    c = true;
                } else {
                    i = a;
                }
                var u = new s(e, i, l, c);
                u.className += o;
                u.setAttribute("data-message-type", e);
                if (typeof r === "function") {
                    r(u);
                }
                t._.panel.insertBefore(u, t._.panel.children[0] || null);
                t._.component.className += n;
                t._.data.blinkedTimeoutId = setTimeout(function() {
                    if (t._.data.blinkedTimeoutId) {
                        t._.component.className = t._.component.className.replace(n, "");
                    }
                }, 800);
                return t;
            };
        }
        t.registerMessageType = function(e, n = "", o = "", r = undefined, s = undefined) {
            t[e] = l(s ? s : e.toUpperCase(), n, o, r);
            return t;
        };
        t.log = l("LOG", " blinked ", "");
        t.error = l("ERROR", " blinked error ", " error-message ");
        t.warn = l("WARN", " blinked warning ", " warning-message ");
        t.expand = function() {
            t._.component.className += " expanded ";
            t._.buttons.expand.textContent = "Compact";
            return t;
        };
        t.compact = function() {
            t._.component.className = t._.component.className.replace(/ expanded/g, "");
            t._.buttons.expand.textContent = "Expand";
            return t;
        };
        t.toggleCompact = function() {
            if (t.isCompact()) {
                t.expand();
            } else {
                t.compact();
            }
            return t;
        };
        t.isCompact = function() {
            var e = t._.buttons.expand.textContent;
            switch (e) {
              case "Expand":
                return true;

              case "Compact":
                return false;
            }
        };
        t.open = function() {
            t._.component.className = t._.component.className.replace(/ closed/g, "");
            t._.buttons.closed.textContent = "Close";
            return t;
        };
        t.close = function() {
            t._.component.className += " closed ";
            t._.buttons.closed.textContent = "Open";
            return t;
        };
        t.toggleOpen = function() {
            if (t.isOpened()) {
                t.close();
            } else {
                t.open();
            }
            return t;
        };
        t.isOpened = function() {
            var e = t._.buttons.closed.textContent;
            switch (e) {
              case "Close":
                return true;

              case "Open":
                return false;
            }
        };
        t.show = function() {
            t._.component.style.display = "block";
            return t;
        };
        t.hide = function() {
            t._.component.style.display = "none";
            return t;
        };
        t.toggleShow = function() {
            if (t.isShown()) {
                t.hide();
            } else {
                t.show();
            }
            return t;
        };
        t.isShown = function() {
            switch (t._.component.style.display) {
              case "block":
                return true;

              case "none":
                return false;
            }
            return t;
        };
        t.clear = function() {
            t._.panel.innerHTML = "";
            return t;
        };
        t.destroy = function() {
            t._.component.remove();
            return t;
        };
        return t;
    }
    return e;
}());