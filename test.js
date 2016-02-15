'use strict';

var adapter=require('./index.js');

//console.log(adapter({},{data:'test'}));

var inherits=require('util').inherits,Readable=require('stream').Readable;

inherits(test,Readable);
function test(){
	Readable.call(this);
	this.i=0;
	//this.a=['{','"','f','"',':','"','t','"','}','\n'];
	/*this.a=['{"f":"t","b":4}\n'];
	this.a.push('012');
	this.a.push('3{"f":"t"}\n');*/
	this.a=['{"f":"t","b":4}\n01','2','3{"f"',':"t"}\n'];
}
test.prototype._read=function(){
	if(this.i<this.a.length){this.push(this.a[this.i]);}
	else{this.push(null);}
	this.i++;
};
var readStream=new test();

var fc={
	t:function(){
		console.log('t',arguments);
	}
};

readStream.
	on('data',function(data){console.log('read onData',data);}).
	on('end',function(){console.log('read onEnd',this.i-1);}).
	pipe(new adapter(fc,{data:'bla'})).//,{end:false}
	on('error',function(e){console.log('adapter onError',e);}).
	on('finish',function(){console.log('adapter onFinish');}).
	on('end',function(){console.log('adapter onEnd');});