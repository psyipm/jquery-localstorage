jquery-localstorage
==================
Save and read objects to localstorage. If localstorage is unsupported cookies will be used instead.

Requirements
----
* jQuery-cookie https://github.com/carhartl/jquery-cookie

Usage
----
```javascript
$.storage.set('name', 'value', expire);
$.storage.get('name');
```
for example:
```javascript
var object = {
	message: "Hello world"
};
$.storage.set('msg', object, 1); //set expire next day
alert($.storage.get('msg').message);
```