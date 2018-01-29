/*
Author: Kevin Justice
File: HermesInterface.js
Date Created: 101916

Class constructor for hermes server states
*/

HermesInterface = function(initializeFunction, destroyFunction){
	var scope = this;
	this.initializeFunction = initializeFunction;
	this.destroyFunction = destroyFunction;
	this.initializeFunction();
};

HermesInterface.prototype.constructor = HermesInterface;