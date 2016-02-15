# Micro Service Adapter
Micro Service Adapter - stream transform protocol for node.js
```sh
$ npm install service-adapter
```
```js
var adapter=require('service-adapter');
```
#### A simple usage schema
```
HTTP Server          DB Server
-----------          ---------
  adapter <---------> adapter
     ^                   ^
     |     Log Server    |
     |     ----------    |
     -----> adapter <-----
```
#### Basic routing
```js
// object functions for 1st adapter
var fc1={
	test1:function(callback,header,body,data){
		console.log('test1 call',arguments);
	}
};
// object functions for 2nd adapter
var fc2={
	test2:function(callback,header,body,data){
		console.log('test2 call',arguments);
		callback('test1',header+' back');
	}
};

// create the adapter
var adapter1=new adapter(fc1);
var adapter2=new adapter(fc2);

adapter1.pipe(adapter2).pipe(adapter1);

// call function `test2` from `adapter2`
adapter1._callback('test2','welcome');
```
Output
```
test2 call { '0': [Function: bound ],
  '1': 'welcome',
  '2': undefined,
  '3': undefined }
test1 call { '0': [Function: bound ],
  '1': 'welcome back',
  '2': undefined,
  '3': undefined }
```
##### Adapter constructor `new adapter (functions, options)`
* `functions` - Object functions list
* `options` - Object, `data` key for `adapter.data`

##### Function adapter `function (callback, header, body, data)`
* `callback` - Function, to push data into next readable stream
* `header` - Object
* `body` - Buffer
* `data` - Object data `adapter.data`

Bound `adapter1` to another socket stream adapter `socketAdapter`
```js
socketAdapter.pipe(adapter1).pipe(socketAdapter);
```
--------------------------------------------------------
**Micro Service Adapter** is licensed under the MIT license. See the included `LICENSE` file for more details.