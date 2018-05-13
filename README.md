 

# domlogger

Simple visual web logging, based on the DOM.


## 1. Installation

`~$ npm install -s domlogger`

Then, in your browser, include the 2 files:

```html
<script src="node_modules/domlogger/src/domlogger.js"></script>
<link rel="stylesheet" type="text/css" href="node_modules/domlogger/src/domlogger.css" />
```

Then, you are ready to use it.

## 2. Usage

The usage is very simple.

##### 1. Create a new instance of the logger, and show it:

```js
const logger = new DOMLogger().show();
```

##### 2. Use any of the 3 default methods for logging:

```js
logger.log("This is a simple message");
logger.error("This is an error message");
logger.warn("This is a warning message");
logger.log({message: "Object are valid, even if they are circular"});
logger.error(window);
logger.warn(document.body);
```

##### 3. Expand, compact or toggleExpansion:

```js
logger.expand();
logger.compact();
logger.toggleCompact();
```

##### 4. Open, close or toggle:

```js
logger.open();
logger.close();
logger.toggleOpen();
```

##### 5. Show, hide or toggleShow:

```js
logger.show();
logger.hide();
logger.toggleShow();
```

##### 6. Clear or destroy:

```js
logger.clear();
logger.destroy();
```

















 

## 3. API Reference

The API is focused, basically, in a class: `DOMLogger`.

The instances of `DOMLogger` are provided with some properties and methods.



 

----

**Name:** **DOMLogger(optionsParam={})**

**Type:** `{Class}`

**Return:** `{DOMLogger}`

**Parameter:** `{Object} optionsParam` Object that defines the parameters of a DOMLogger instance.

**Description:** Generates the base object of the DOMLogger API.



 

----

**Name:** **DOMLoggerPanel**

**Private:** yes

**Type:** `{Class}`

**Return:** `{HTMLElement}`

**Description:** Instance of an HTMLElement of a DOMLoggerPanel.



 

----

**Name:** **DOMLoggerMessage**

**Private:** yes

**Type:** `{Class}`

**Return:** `{HTMLElement}`

**Parameter:** `{String}` msg 

**Parameter:** `{Boolean}` isHTML False by default.

**Parameter:** `{Boolean}` isDebugged False by default.

**Altered:** className, title, +click, innerHTML | textContent.

**Description:** Instance of an HTMLElement of a DOMLoggerMessage.



 

----

**Name:** **otions**

**Private:** yes

**Type:** `{Object}`

**Property:** componentClass: "".

**Description:** Default option parameters for the current DOMLogger instance.



 

----

**Name:** **DOMLogger.log(msg, isHTML=false)**

**Type:** `{Function}`

**Parameter:** `{String|Any}` msg. Message to be logged.

**Parameter:** `{Boolean}` isHTML. Indicates if the message has to be taken as HTML (true) or as plain text. By default: false (plain text).

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Logs a message in the default style. Green by default.



 

----

**Name:** **DOMLogger.error(msg, isHTML=false)**

**Type:** `{Function}`

**Parameter:** `{String|Any}` msg. Message to be logged.

**Parameter:** `{Boolean}` isHTML. Indicates if the (string) messages have to be taken as HTML (true) or as plain text. By default: false (plain text).

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Logs as an error message in the default style. Red by default.



 

----

**Name:** **DOMLogger.warn(msg, isHTML=false)**

**Type:** `{Function}`

**Parameter:** `{String|Any}` msg. Message to be logged.

**Parameter:** `{Boolean}` isHTML. Indicates if the message has to be taken as HTML (true) or as plain text. By default: false (plain text).

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Logs as a warning message in the default style. Orange by default.



 

----

**Name:** **DOMLogger.expand()**

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Expands the console of the logger through all the window.



 

----

**Name:** **DOMLogger.compact()**

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Compacts the console of the logger. Default position: bottom right.



 

----

**Name:** **DOMLogger.toggleCompact()**

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Compacts or expands the console of the logger through all the window.



 

----

**Name:** **DOMLogger.isCompact()**

**Type:** `{Function}`

**Returns:** `{Boolean}` True if it is compacted.

**Description:** Returns true if is is compacted.



 

----

**Name:** **DOMLogger.open()**

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Opens the top buttons panel of the console of the logger.



 

----

**Name:** **DOMLogger.close()**

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Leaves only the "Open" button visible, to open the top buttons panel the console of the logger.



 

----

**Name:** **DOMLogger.toggleOpen()**

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Opens or closes the console of the logger.



 

----

**Name:** **DOMLogger.isOpened()**

**Type:** `{Function}`

**Returns:** `{Boolean}` True if it is opened.

**Description:** Returns true if is is opened.



 

----

**Name:** **DOMLogger.show()**

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Shows the console of the logger.



 

----

**Name:** **DOMLogger.hide()**

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Hides the console of the logger.



 

----

**Name:** **DOMLogger.toggleShow()**

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Shows or hides the console of the logger.



 

----

**Name:** **DOMLogger.isShown()**

**Type:** `{Function}`

**Returns:** `{Boolean}` True if it is shown.

**Description:** Returns true if it is shown.



 

----

**Name:** **DOMLogger.clear()**

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Clears the console of the logger.



 

----

**Name:** **DOMLogger.destroy()**

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Destroys the console of the logger.



 

## 4. Conclusion

This library can be very interesting and handy for random projects.





