/*
Author: Kevin Justice
File: GameInterface.js
Date Created: 073116

GameInterface object constructor
*/

GameInterface = function(initializeFunction, destroyFunction, animateFunction){
	var scope = this;
	this.initializeFunction = initializeFunction;
	this.destroyFunction = destroyFunction;
	this.animateFunction = animateFunction;
	this.initializeFunction();
};

GameInterface.prototype.constructor = GameInterface;