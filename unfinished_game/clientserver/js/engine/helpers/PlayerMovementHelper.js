/*
Author: Kevin Justice
File: PlayerMovementHelper.js
Date Created: 072916

A set of controls for handling input for player movement
*/

PlayerMovementHelper = function(compass, pawn){

	var scope = this;
	
	this.active = true;
	this.compass = compass;
	this.pawn = pawn;

	this.rotateVelocity = 10;
	this.thetaOffest = 0;

	this.yOffset = 0;

	this.aDown = false;
	this.dDown = false;
	this.wDown = false;
	this.wDownTime = 0;

	this.then = 0;
	this.theta = 0;

	var onA = function(){
		if(scope.aDown){
			return;
		}
		else{
			scope.then = performance.now();
			scope.aDown = true;
		}
	};
	var onD = function(){
		if(scope.dDown){
			return;
		}
		else{
			scope.then = performance.now();
			scope.dDown = true;
		}			
	};
	var onW = function(){
		if(scope.wDown || (performance.now()-scope.wDownTime)*.001 < 1/3){
			return;
		}
		scope.wDownTime = performance.now();
		scope.wDown = true;
		if(scope.active){
			hermes.hCurrent.sendInitialTileMovement();
		};		
	};
	var offA = function(){
		scope.aDown = false;
	};
	var offD = function(){
		scope.dDown = false;			
	};
	var offW = function(){
		hermes.hCurrent.sendEndTileMovement();
		scope.wDown = false;			
	};	
	var handleKeyDown = function(e){
		if(e.keyCode==65){onA();}
		else if(e.keyCode==68){onD();}
		else if(e.keyCode==87){onW();}
		else{return;}
	};
	var handleKeyUp = function(e){
		if(e.keyCode==65){offA();}
		else if(e.keyCode==68){offD();}
		else if(e.keyCode == 87){offW();}
		else{return;}
	};

	this.addListeners = function(){
		window.addEventListener( "keydown", handleKeyDown, false);
		window.addEventListener( "keyup", handleKeyUp, false);
	};

	this.update = function(){
		var now = performance.now();
		var dT = (now-scope.then)*.001;
		var dTheta = -(scope.dDown*scope.rotateVelocity*dT)+(scope.aDown*scope.rotateVelocity*dT);
		scope.theta = scope.normalizeAngle(dTheta+scope.theta);
		scope.compass.rotation.y = scope.theta+scope.thetaOffset;

		scope.compass.position.set(scope.pawn.position.x, scope.pawn.position.y+scope.yOffset, scope.pawn.position.z);
		scope.then = now;
	};

	this.normalizeAngle = function(angle){
		if(angle > 2*Math.PI){
			angle -= 2*Math.PI;
			return(angle);
		}
		else if(angle < 0){
			angle += 2*Math.PI;
			return(angle);
		}
		else{
			return(angle);
		}
	};

	this.currentDirection = function(){
		var direction;
		if((scope.theta<=Math.PI/6)||(scope.theta>11*Math.PI/6 && scope.theta <= 2*Math.PI)){
			direction = 0;
		}
		else if(scope.theta>Math.PI/6 && scope.theta <= Math.PI/3){
			direction = 1;
		}
		else if(scope.theta>Math.PI/3 && scope.theta <= 2*Math.PI/3){
			direction = 2;
		}
		else if(scope.theta>2*Math.PI/3 && scope.theta <= 5*Math.PI/6){
			direction = 3;
		}
		else if(scope.theta>5*Math.PI/6 && scope.theta <= 7*Math.PI/6){
			direction = 4;
		}
		else if(scope.theta>7*Math.PI/6 && scope.theta <= 4*Math.PI/3){
			direction = 5;
		}
		else if(scope.theta>4*Math.PI/3 && scope.theta <= 5*Math.PI/3){
			direction = 6;
		}
		else if(scope.theta>5*Math.PI/3 && scope.theta <= 11*Math.PI/6){
			direction = 7;
		}
		else{
			direction = 0;
		}
		return(direction);
	};

	this.arrive = function(){
		if(scope.active && scope.wDown){
			hermes.hCurrent.sendArrived();
		}
	};

	this.dispose = function(){
		window.removeEventListener( "keydown", handleKeyDown, false);
		window.removeEventListener( "keyup", handleKeyUp, false);
	};

	this.addListeners();
};

PlayerMovementHelper.prototype.constructor = PlayerMovementHelper;