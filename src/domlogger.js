JSON.stringifyOnce = function(obj, replacer, indent) {
		var printedObjects = [];
		var printedObjectKeys = [];

		function printOnceReplacer(key, value) {
				if (printedObjects.length > 2000) { // browsers will not print more than 20K, I don't see the point to allow 2K.. algorithm will not be fast anyway if we have too many objects
						return 'object too long';
				}
				var printedObjIndex = false;
				printedObjects.forEach(function(obj, index) {
						if (obj === value) {
								printedObjIndex = index;
						}
				});

				if (key == '') { //root element
						printedObjects.push(obj);
						printedObjectKeys.push("root");
						return value;
				} else if (printedObjIndex + "" != "false" && typeof(value) == "object") {
						if (printedObjectKeys[printedObjIndex] == "root") {
								return "(pointer to root)";
						} else {
								return "(see " + ((!!value && !!value.constructor) ? value.constructor.name.toLowerCase() : typeof(value)) + " with key " + printedObjectKeys[printedObjIndex] + ")";
						}
				} else {

						var qualifiedKey = key || "(empty key)";
						printedObjects.push(value);
						printedObjectKeys.push(qualifiedKey);
						if (replacer) {
								return replacer(key, value);
						} else {
								return value;
						}
				}
		}
		return JSON.stringify(obj, printOnceReplacer, indent);
};
/**
 * ## 3. API Reference
 *
 * The API is focused, basically, in a class: `DOMLogger`.
 * 
 * The instances of `DOMLogger` are provided with some properties and methods.
 */

/**
 * ----
 * @name **DOMLogger(optionsParam)**
 * @type `{Class}`
 * @return `{DOMLogger}`
 * @parameter `optionsParam`
 * @description Generates the base object of the DOMLogger API.
 */
function DOMLogger(optionsParam = {}) {
		var logger = this;
		var Timer = function() {
				this.first = new Date();
				this.reset = function() {
						this.first = new Date();
				}
				this.time = function() {
						return (new Date()).getTime() - this.first.getTime();
				};
				return this;
		};

		var timer = new Timer();
		/**
		 * ----
		 * @name DOMLoggerPanel
		 * @internal true
		 * @type `{Class}`
		 * @return `{HTMLElement}`
		 * @description Instance of an HTMLElement of a DOMLoggerPanel.
		 */
		var DOMLoggerPanel = function() {
				var divTmp = document.createElement("div");
				divTmp.innerHTML = `
		<div class="dom-logger-component ${options.componentClass}">
			<div class="dom-logger-toolbar">
				<div class="dom-logger-toolbar-btn expand-btn">Expand</div>
				<div class="dom-logger-toolbar-btn clear-btn">Clear</div>
				<div class="dom-logger-toolbar-btn closed-btn">Close</div>
			</div>
			<div class="dom-logger-wrapper">
				<div class="dom-logger-panel">
					<!-- Logged Messages -->
				</div>
			</div>
		</div>`;
				logger._.wrapper = divTmp.querySelectorAll(".dom-logger-wrapper")[0];
				logger._.component = divTmp.children[0];
				logger._.panel = divTmp.querySelectorAll(".dom-logger-panel")[0];
				logger._.toolbar = divTmp.querySelectorAll(".dom-logger-toolbar")[0];
				logger._.buttons = {};
				logger._.buttons.clear = divTmp.querySelectorAll(".clear-btn")[0];
				logger._.buttons.clear.addEventListener("click", function() {
						logger.clear();
				});
				logger._.buttons.closed = divTmp.querySelectorAll(".closed-btn")[0];
				logger._.buttons.closed.addEventListener("click", function() {
						logger.toggleOpen();
				});
				logger._.buttons.expand = divTmp.querySelectorAll(".expand-btn")[0];
				logger._.buttons.expand.addEventListener("click", function() {
						logger.toggleCompact();
				});
				document.body.appendChild(logger._.component);
				return logger._.panel;
		};
		/**
		 * ----
		 * @name DOMLoggerMessage
		 * @internal true
		 * @type `{Class}`
		 * @return `{HTMLElement}`
		 * @parameter `{String}` msg 
		 * @parameter `{Boolean}` isHTML False by default.
		 * @parameter `{Boolean}` isDebugged False by default.
		 * @altered className, title, +click, innerHTML | textContent.
		 * @description Instance of an HTMLElement of a DOMLoggerMessage.
		 */
		var DOMLoggerMessage = function(msg, isHTML = false, isDebugged = false) {
				var message = document.createElement(isDebugged ? "pre" : "div");
				if (isHTML === true) {
						message.innerHTML = msg;
				} else {
						message.textContent = msg;
				}
				message.className = "dom-logger-message ";
				message.title = logger._.data.timer.time() / 1000;
				message.addEventListener("click", function() {
						var msgType = "";
						var msgClass = this.getAttribute("data-message-type");
						if (~msgClass.indexOf("error")) {
								msgType = "ERROR";
						} else if (~msgClass.indexOf("warn")) {
								msgType = "WARN";
						} else {
								msgType = "LOG";
						}
						var msg = "[" + msgType + "][" + message.title.replace("\n", " ") + "] " + message.textContent;
						console.log(msg);
				});
				return message;
		};
		/**
		 * ----
		 * @name **otions**
		 - @internals true
		 * @type `{Object}`
		 * @default Property componentClass: "".
		 * @description Default option parameters for the current DOMLogger instance.
		 */
		var options = Object.assign({
				componentClass: ""
		}, optionsParam);
		logger._ = {};
		logger._.data = {};
		logger._.data.timer = timer;
		logger._.data.blinkedTimeoutId = false;
		logger._.panel = new DOMLoggerPanel();
		logger._.wrapper = logger._.panel.parentElement;

		function generateLogFunc(classNameComponent, classNameMessage) {
				return function(msgParam, isHTML = false) {
						var msg;
						var isDebugged = false;
						if (typeof msgParam !== "string") {
								msg = JSON.stringifyOnce(msgParam, null, 4);
								isHTML = false;
								isDebugged = true;
						} else {
								msg = msgParam;
						}
						var message = new DOMLoggerMessage(msg, isHTML, isDebugged);
						message.className += classNameMessage;
						message.setAttribute("data-message-type", classNameMessage);
						logger._.panel.insertBefore(message, logger._.panel.children[0] || null);
						logger._.component.className += classNameComponent;
						logger._.data.blinkedTimeoutId = setTimeout(function() {
								if (logger._.data.blinkedTimeoutId) {
										logger._.component.className = logger._.component.className.replace(classNameComponent, "");
								}
						}, 800);
						return logger;
				}
		}
		/**
		 * ----
		 * @name **DOMLogger.log(msg, isHTML)**
		 * @type `{Function}`
		 * @parameter `{String|Any}` msg. Message to be logged.
		 * @parameter `{Boolean}` isHTML. Indicates if the message has to be taken as HTML (true) or as plain text. By default: false (plain text).
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Logs a message in the default style. Green by default.
		 */
		logger.log = generateLogFunc(" blinked ", "");
		/**
		 * ----
		 * @name **DOMLogger.error(message)**
		 * @type `{Function}`
		 * @parameter `{String|Any}` msg. Message to be logged.
		 * @parameter `{Boolean}` isHTML. Indicates if the (string) messages have to be taken as HTML (true) or as plain text. By default: false (plain text).
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Logs as an error message in the default style. Red by default.
		 */
		logger.error = generateLogFunc(" blinked error ", " error-message ");
		/**
		 * ----
		 * @name **DOMLogger.warn(message)**
		 * @type `{Function}`
		 * @parameter `{String|Any}` msg. Message to be logged.
		 * @parameter `{Boolean}` isHTML. Indicates if the message has to be taken as HTML (true) or as plain text. By default: false (plain text).
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Logs as a warning message in the default style. Orange by default.
		 */
		logger.warn = generateLogFunc(" blinked warning ", " warning-message ");
		/**
		 * ----
		 * @name **DOMLogger.expand()**
		 * @type `{Function}`
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Expands the console of the logger through all the window.
		 */
		logger.expand = function() {
				// @TODO:
				logger._.component.className += " expanded ";
				logger._.buttons.expand.textContent = "Compact";
				return logger;
		};
		/**
		 * ----
		 * @name **DOMLogger.compact()**
		 * @type `{Function}`
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Compacts the console of the logger. Default position: bottom right.
		 */
		logger.compact = function() {
				// @TODO:
				logger._.component.className = logger._.component.className.replace(/ expanded/g, "");
				logger._.buttons.expand.textContent = "Expand";
				return logger;
		};
		/**
		 * ----
		 * @name **DOMLogger.toggleCompact()**
		 * @type `{Function}`
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Compacts or expands the console of the logger through all the window.
		 */
		logger.toggleCompact = function() {
				// @TODO:
				if (logger.isCompact()) {
						logger.expand();
				} else {
						logger.compact();
				}
				return logger;
		};

		/**
		 * ----
		 * @name **DOMLogger.isCompact()**
		 * @type `{Function}`
		 * @returns `{Boolean}` True if it is compacted.
		 * @description Returns true if is is compacted.
		 */
		logger.isCompact = function() {
				var curText = logger._.buttons.expand.textContent;
				switch (curText) {
						case "Expand":
								return true;
						case "Compact":
								return false;
				}
		}
		/**
		 * ----
		 * @name **DOMLogger.open()**
		 * @type `{Function}`
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Opens the top buttons panel of the console of the logger.
		 */
		logger.open = function() {
				// @TODO:
				logger._.component.className = logger._.component.className.replace(/ closed/g, "");
				logger._.buttons.closed.textContent = "Close";
				return logger;
		};
		/**
		 * ----
		 * @name **DOMLogger.close()**
		 * @type `{Function}`
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Leaves only the "Open" button visible, to open the top buttons panel the console of the logger.
		 */
		logger.close = function() {
				// @TODO:
				logger._.component.className += " closed ";
				logger._.buttons.closed.textContent = "Open";

				return logger;
		};
		/**
		 * ----
		 * @name **DOMLogger.toggleOpen()**
		 * @type `{Function}`
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Opens or closes the console of the logger.
		 */
		logger.toggleOpen = function() {
				// @TODO:
				if (logger.isOpened()) {
						logger.close();
				} else {
						logger.open();
				}
				return logger;
		};

		/**
		 * ----
		 * @name **DOMLogger.isOpened()**
		 * @type `{Function}`
		 * @returns `{Boolean}` True if it is opened.
		 * @description Returns true if is is opened.
		 */
		logger.isOpened = function() {
				// @TODO:
				var curText = logger._.buttons.closed.textContent;
				switch (curText) {
						case "Close":
								return true;
						case "Open":
								return false;
				}
		};
		/**
		 * ----
		 * @name **DOMLogger.show()**
		 * @type `{Function}`
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Shows the console of the logger.
		 */
		logger.show = function() {
				// @TODO:
				logger._.component.style.display = "block";
				return logger;
		};
		/**
		 * ----
		 * @name **DOMLogger.hide()**
		 * @type `{Function}`
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Hides the console of the logger.
		 */
		logger.hide = function() {
				// @TODO:
				logger._.component.style.display = "none";
				return logger;
		};
		/**
		 * ----
		 * @name **DOMLogger.toggleShow()**
		 * @type `{Function}`
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Shows or hides the console of the logger.
		 */
		logger.toggleShow = function() {
				// @TODO:
				if (logger.isShown()) {
						logger.hide();
				} else {
						logger.show();
				}
				return logger;
		};
		/**
		 * ----
		 * @name **DOMLogger.isShown()**
		 * @type `{Function}`
		 * @returns `{Boolean}` True if it is shown.
		 * @description Returns true if it is shown.
		 */
		logger.isShown = function() {
				// @TODO:
				switch (logger._.component.style.display) {
						case "block":
								return true;
						case "none":
								return false;
				}
				return logger;
		};
		/**
		 * ----
		 * @name **DOMLogger.clear()**
		 * @type `{Function}`
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Clears the console of the logger.
		 */
		logger.clear = function() {
				// @TODO:
				logger._.panel.innerHTML = "";
				return logger;
		};
		/**
		 * ----
		 * @name **DOMLogger.destroy()**
		 * @type `{Function}`
		 * @returns `{DOMLogger}` In order to keep it chainable, it returns the logger itself.
		 * @description Destroys the console of the logger.
		 */
		logger.destroy = function() {
				// @TODO:
				logger._.component.remove();
				return logger;
		};
		return logger;
};