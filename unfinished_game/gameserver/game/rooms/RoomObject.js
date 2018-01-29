/*
Author: Kevin Justice
File: RoomObject.js
Date Created: 102016

game room object constructor
*/

RoomObject = function(room, constructors){

	var scope = this;

	this.constructors = new constructors();
	this.room = room;

	this.openRoom = function(){
		scope.room = new scope.room();
	};
	
};

RoomObject.prototype.constructor = RoomObject;