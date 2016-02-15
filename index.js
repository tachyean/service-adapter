/* Copyright (c) 2016 Micro Service Adapter - Tanase Laurentiu Iulian - https://github.com/RTComm/service-adapter */

'use strict';

var fs=require('fs'),
inherits=require('util').inherits,
Transform=require('stream').Transform;

inherits(adapter,Transform);
function adapter(functions,options){
	if(!(this instanceof adapter)){return new adapter(functions,options);}
	Transform.call(this,options);
	this._f=functions;// functions object
	this._b=0;// body length
	this._c=new Buffer(0);
	this.data=typeof options==='object'&&'data' in options?options.data:undefined;// extra data pass
	this.isOpen=true;
}

adapter.prototype._transform=function(data,enc,cb){
	cb();
};

adapter.prototype._flush=function(cb){
	this.isOpen=false;
	console.log('_flush');
	cb();
};

module.exports=adapter;
