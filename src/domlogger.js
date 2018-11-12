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
        function a(n, a) {
            if (o.length > 2e3) {
                return "object too long";
            }
            var s = false;
            o.forEach(function(e, t) {
                if (e === a) {
                    s = t;
                }
            });
            if (n == "") {
                o.push(e);
                r.push("root");
                return a;
            } else if (s + "" != "false" && typeof a == "object") {
                if (r[s] == "root") {
                    return "(pointer to root)";
                } else {
                    return "(see " + (!!a && !!a.constructor ? a.constructor.name.toLowerCase() : typeof a) + " with key " + r[s] + ")";
                }
            } else {
                var l = n || "(empty key)";
                o.push(a);
                r.push(l);
                if (t) {
                    return t(n, a);
                } else {
                    return a;
                }
            }
        }
        return JSON.stringify(e, a, n);
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
            e.innerHTML = `\n\t\t<div class="dom-logger-component ${s.componentClass}">\n\t\t\t<div class="dom-logger-toolbar">\n\t\t\t\t<div class="dom-logger-toolbar-btn expand-btn">Expand</div>\n\t\t\t\t<div class="dom-logger-toolbar-btn clear-btn">Clear</div>\n\t\t\t\t<div class="dom-logger-toolbar-btn closed-btn">Close</div>\n\t\t\t</div>\n\t\t\t<div class="dom-logger-wrapper">\n\t\t\t\t<div class="dom-logger-panel">\n\t\t\t\t\t\x3c!-- Logged Messages --\x3e\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>`;
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
            if (document.readyState === "complete" || document.readyState === "interactive") {
                document.body.appendChild(t._.component);
            } else {
                window.addEventListener("load", function() {
                    document.body.appendChild(t._.component);
                });
            }
            return t._.panel;
        };
        var a = function(e, n, o = false, r = false) {
            var a = document.createElement(r ? "pre" : "div");
            if (o === true) {
                a.innerHTML = n;
            } else {
                a.textContent = n;
            }
            a.className = "dom-logger-message ";
            a.title = t._.data.timer.time() / 1e3;
            a.addEventListener("click", function() {
                var e = this.getAttribute("data-message-type");
                var t = "[" + e + "][" + a.title.replace("\n", " ") + "] " + a.textContent;
                console.log(t);
            });
            return a;
        };
        var s = Object.assign({
            componentClass: ""
        }, e);
        t._ = {};
        t._.data = {};
        t._.data.timer = o;
        t._.data.blinkedTimeoutId = false;
        t._.panel = new r();
        t._.wrapper = t._.panel.parentElement;
        function l(e, n, o, r = undefined) {
            return function(s, l = false) {
                var i;
                var c = false;
                if (typeof s !== "string") {
                    i = JSON.stringifyOnce(s, null, 4);
                    l = false;
                    c = true;
                } else {
                    i = s;
                }
                var d = new a(e, i, l, c);
                d.className += o;
                d.setAttribute("data-message-type", e);
                if (typeof r === "function") {
                    r(d);
                }
                t._.panel.insertBefore(d, t._.panel.children[0] || null);
                t._.component.className += n;
                t._.data.blinkedTimeoutId = setTimeout(function() {
                    if (t._.data.blinkedTimeoutId) {
                        t._.component.className = t._.component.className.replace(n, "");
                    }
                }, 800);
                return t;
            };
        }
        t.registerMessageType = function(e, n = "", o = "", r = undefined, a = undefined) {
            t[e] = l(a ? a : e.toUpperCase(), n, o, r);
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