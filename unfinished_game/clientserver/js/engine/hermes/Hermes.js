/*
Author: Kevin Justice
File: Hermes.js
Date Created: 073116

Class for server interfacing and interface dispatching
*/

Hermes = function(){

	var scope = this;

	gCurrent = new GameInterface(defaultFunction, defaultFunction, defaultFunction);
  	this.hCurrent = new HermesInterface(defaultFunction, defaultFunction);

  	var gameServerAddress = 'http://127.0.0.1';
	this.socket = io(gameServerAddress+':8001');

	var switchInterface = function(object){
		switch(object.interface){
			case 0:
        		scope.hCurrent.destroyFunction();
        		scope.hCurrent = new HermesInterface(hi00000000, hd00000000);
				gCurrent.destroyFunction();
				gCurrent = new GameInterface(gi00000000, gd00000000, ga00000000);
				break;

			case 1:
        		scope.hCurrent.destroyFunction();
        		scope.hCurrent = new HermesInterface(hi00000001, hd00000001);
				gCurrent.destroyFunction();
				gCurrent = new GameInterface(gi00000001, gd00000001, ga00000001);
				break;

			default:
				break;
		};
	};

	scope.socket.on('0', switchInterface);
	
};

Hermes.prototype.constructor = Hermes;