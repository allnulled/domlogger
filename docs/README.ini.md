/**
 * # domlogger
 *
 * Simple visual web logging, based on the DOM.
 *
 *
 * ## 1. Installation
 *
 * `~$ npm install -s domlogger`
 *
 * Then, in your browser, include the 2 files:
 *
 * ```html
 * <script src="node_modules/domlogger/src/domlogger.js"></script>
 * <link rel="stylesheet" type="text/css" href="node_modules/domlogger/src/domlogger.css" />
 * ```
 *
 * Then, you are ready to use it.
 *
 * ## 2. Usage
 *
 * The usage is very simple.
 *
 * ##### 1. Create a new instance of the logger, and show it:
 * 
 * ```js
 * const logger = new DOMLogger().show();
 * ```
 * 
 * ##### 2. Use any of the 3 default methods for logging:
 * 
 * ```js
 * logger.log("This is a simple message");
 * logger.error("This is an error message");
 * logger.warn("This is a warning message");
 * logger.log({message: "Object are valid, even if they are circular"});
 * logger.error(window);
 * logger.warn(document.body);
 * ```
 * 
 * ##### 3. Expand, compact or toggleExpansion:
 * 
 * ```js
 * logger.expand();
 * logger.compact();
 * logger.toggleCompact();
 * ```
 * 
 * ##### 4. Open, close or toggle:
 * 
 * ```js
 * logger.open();
 * logger.close();
 * logger.toggleOpen();
 * ```
 * 
 * ##### 5. Show, hide or toggleShow:
 * 
 * ```js
 * logger.show();
 * logger.hide();
 * logger.toggleShow();
 * ```
 * 
 * ##### 6. Clear or destroy:
 * 
 * ```js
 * logger.clear();
 * logger.destroy();
 * ```
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */