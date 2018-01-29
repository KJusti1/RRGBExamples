/*
Author: Kevin Justice
File: SocketInterface.js
Date Created: 092216

SocketInterface object constructor
*/

SocketInterface = function(socket, initializeFunction, destroyFunction, username){

	var scope = this;

	this.username = username;
	this.socket = socket;
	this.initializeFunction = initializeFunction;
	this.destroyFunction = destroyFunction;

	this.changeSocketInterface = function(initializeFunctionNew, destroyFunctionNew){
		scope.destroyFunction();
		scope = new SocketInterface(scope.socket, initializeFunctionNew, destroyFunctionNew, scope.username);
	}

	this.initializeFunction();
};

SocketInterface.prototype.constructor = SocketInterface;