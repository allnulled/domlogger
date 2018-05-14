 

# domlogger


![](https://img.shields.io/badge/domlogger-v1.0.0-green.svg) ![](https://img.shields.io/badge/visual%20tests-passing-green.svg) ![](https://img.shields.io/badge/stable-80%25-orange.svg)

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

##### 3. Expand, compact or toggleCompact:

```js
logger.expand();
logger.compact();
logger.toggleCompact();
```

##### 4. Open, close or toggleOpen:

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

This is the list of the current API:


```js
DOMLogger(optionsParam={})
options;
domLogger.registerMessageType(methodName, classNameComponent="", classNameMessage="", modifierFunc=undefined);
domLogger.log(msg, isHTML=false);
domLogger.error(msg, isHTML=false);
domLogger.warn(msg, isHTML=false);
domLogger.expand();
domLogger.compact();
domLogger.toggleCompact();
domLogger.isCompact();
domLogger.open();
domLogger.close();
domLogger.toggleOpen();
domLogger.isOpened();
domLogger.show();
domLogger.hide();
domLogger.toggleShow();
domLogger.isShown();
domLogger.clear();
domLogger.destroy();
```

----


Here, you can find a deeper explanation:




 

----
## DOMLogger(optionsParam={})

**Type:** `{Class}`

**Return:** `{DOMLogger}`

**Parameter:** `{Object} optionsParam` Object that defines the parameters of a DOMLogger instance.

**Description:** Generates the base object of the DOMLogger API.



 

----
## options

**Accessible:** *Extended by the `DOMLogger(optionsParam={})` parameter.*

**Type:** `{Object}`

**DefaultValue:** 
```js
{
 componentClass: ""
}
```

**Description:** Default option parameters for the current `{DOMLogger}` instance. It is used as the base value of the `DOMLogger(optionsParam)` parameter.



 

---- 
## domLogger._

**Type:** `{Object}`

**Description:** This object holds some of the internals of the API, which will not be included in this documentation.



 

----
## domLogger.registerMessageType(methodName, classNameComponent="", classNameMessage="", modifierFunc=undefined)

**Type:** `{Function}`

**Parameter:** `{String} methodName`. Name of the method that will log this type of message.

**Parameter:** `{String} classNameComponent`. Class applied to the `{HTMLElement}` of the logger component when a message is sent, that stays for less than 1 second. It is used to give some kind of visual effect for when that type of message is logged. Empty string by default.

**Parameter:** `{String} classNameMessage`. Class applied to the `{HTMLElement}` message sub-component (only the message element). Empty string by default.

**Parameter:** `{Function|undefined} modifierFunc`. Function that receives the generated `{HTMLElement}` message, and lets it modify it, to fully customize. Pass `undefined` for not doing anything in this step, or simply, do not provide it.

**Parameter:** `{String} msgTypeAbbr`. Name to be logged when a message of this type is clicked, by the browser console.

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Creates a new method for the current `{DOMLogger}` instance. It will be available as one more method, like `domLogger.log(~)`, `domLogger.error(~)` or `domLogger.warn(~)`.
The customization is limited, but one can play with the CSS classes applied to the message component, or even modify the `{HTMLElement}` generated by the method.

**Example:** 
```js
var logger = new DOMLogger().show();
// This example uses jQuery:
$("<style>.okok{background:black;color:white}</style>").appendTo("head"); 
logger.registerMessageType("ok", "okok", "okok", undefined, "OKAY");
logger.ok("Yeah!"); // This should add a new message, with black background, and white letters.
```




 

----
## domLogger.log(msg, isHTML=false)

**Type:** `{Function}`

**Parameter:** `{String|Any} msg`. Message to be logged.

**Parameter:** `{Boolean} isHTML`. Indicates if the message has to be taken as HTML (true) or as plain text. By default: false (plain text).

**Returns:** `{DOMLogger}`. In order to keep it chainable, it returns the logger itself.

**Description:** Logs a message in the default style. Green by default.



 

----
## domLogger.error(msg, isHTML=false)

**Type:** `{Function}`

**Parameter:** `{String|Any} msg`. Message to be logged.

**Parameter:** `{Boolean} isHTML`. Indicates if the (string) messages have to be taken as HTML (true) or as plain text. By default: false (plain text).

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Logs as an error message in the default style. Red by default.



 

----
## domLogger.warn(msg, isHTML=false)

**Type:** `{Function}`

**Parameter:** `{String|Any} msg`. Message to be logged.

**Parameter:** `{Boolean} isHTML`. Indicates if the message has to be taken as HTML (true) or as plain text. By default: false (plain text).

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Logs as a warning message in the default style. Orange by default.



 

----
## domLogger.expand()

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Expands the console of the logger through all the window.



 

----
## domLogger.compact()

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Compacts the console of the logger. Default position: bottom right.



 

----
## domLogger.toggleCompact()

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Compacts or expands the console of the logger through all the window.



 

----
## domLogger.isCompact()

**Type:** `{Function}`

**Returns:** `{Boolean}` True if it is compacted.

**Description:** Returns true if is is compacted.



 

----
## domLogger.open()

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Opens the top buttons panel of the console of the logger.



 

----
## domLogger.close()

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Leaves only the "Open" button visible, to open the top buttons panel the console of the logger.



 

----
## domLogger.toggleOpen()

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Opens or closes the console of the logger.



 

----
## domLogger.isOpened()

**Type:** `{Function}`

**Returns:** `{Boolean}` True if it is opened.

**Description:** Returns true if is is opened.



 

----
## domLogger.show()

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Shows the console of the logger.



 

----
## domLogger.hide()

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Hides the console of the logger.



 

----
## domLogger.toggleShow()

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Shows or hides the console of the logger.



 

----
## domLogger.isShown()

**Type:** `{Function}`

**Returns:** `{Boolean}` True if it is shown.

**Description:** Returns true if it is shown.



 

----
## domLogger.clear()

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Clears the console of the logger.



 

----
## domLogger.destroy()

**Type:** `{Function}`

**Returns:** `{DOMLogger}` In order to keep it chainable, it returns the logger itself.

**Description:** Destroys the console of the logger.



 

## 4. Conclusion

This library can be very interesting and handy for random projects.





