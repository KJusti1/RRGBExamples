/*
Author: Kevin Justice
File: OrbitingFollowControls.js
Date Created: 070916

A set of camera controls that allow the camera to orbit a moving object.
*/

OrbitingFollowControls = function(cameraObject, domElement, orbitObject, orbitRadius){
	
	//Snapshot of Object Vars
	var scope = this;
	//Object Variables
	this.cameraObject = cameraObject;
	this.domElement = ( domElement != undefined ) ? domElement : document;
	this.orbitObject = orbitObject;
	this.orbitRadius = orbitRadius;

	//Control Constraints- both max and min azimuth must be set
	this.maxPolarAngle = Math.PI/2;
	this.minAzimuthAngle = -Infinity;
	this.maxAzimuthAngle = Infinity;

	//Camera Zoom Constraints- should usually be handled with higher scope's camera object
	this.maxZoom = 100;
	this.minZoom = .01;
	this.zoom = 1;

	//Animation Clock and Speed Settings
	this.thetaSpeed = 2;//1
	this.phiSpeed = 1;//1

	//Most Recent Update Time
	this.then = 0;

	//Cursor Object Variables
	this.enableMove = false;
	this.cursorPosition = {x: this.domElement.clientWidth/2, y: this.domElement.clientHeight/2};

	//Control Positions- relative
	this.theta = 0;
	this.phi = Math.PI/4;
	this.spherical = {rho: this.orbitRadius, theta: this.theta, phi: this.phi};
	this.cartesian = {x: 0, y:0, z:0};

	var onMouseDown = function(e){
		scope.enableMove = true;
		scope.then = performance.now();
	};
	var onMouseUp = function(e){
		scope.enableMove = false;
	};
	var onMouseMove = function(e){
		scope.cursorPosition.x = e.clientX;
		scope.cursorPosition.y = e.clientY;
	};
	
	this.addListeners = function(){
		scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.addEventListener( 'mouseup', onMouseUp, false );
		scope.domElement.addEventListener( 'mousemove', onMouseMove, false);
	};

	this.mapCursor = function(pair){
		var halfWidth = scope.domElement.clientWidth/2;
		var halfHeight = scope.domElement.clientHeight/2;
		var intensity = {x: (pair.x/halfWidth)-1, y: (pair.y/halfHeight)-1};
		return(intensity);
	};

	this.update = function(){
		if(scope.enableMove){
			var now = performance.now();
			var dT = (now-scope.then)*.001;
			var intensity = scope.mapCursor(scope.cursorPosition);

			//Theta Calculations
			var dX = scope.thetaSpeed*intensity.x*scope.spherical.rho*(-Math.cos(scope.spherical.phi)+Math.cos(scope.phiSpeed*dT+scope.spherical.phi))/scope.phiSpeed;
			var cX = 2*Math.PI*scope.spherical.rho*Math.sin(scope.spherical.phi);
			scope.spherical.theta -= (dX/cX)*2*Math.PI;
			if(scope.spherical.theta >= scope.maxAzimuthAngle){
				scope.spherical.theta = scope.maxAzimuthAngle;;
			}
			else if(scope.spherical.theta <= scope.minAzimuthAngle){
				scope.spherical.theta = scope.minAzimuthAngle;
			}

			//Phi Calculations
			var dY = scope.phiSpeed*intensity.y*scope.spherical.rho*dT;
			var cY = Math.PI*scope.spherical.rho*2;
			scope.spherical.phi += (dY/cY)*2*Math.PI;
			if(scope.spherical.phi <= .1){
				scope.spherical.phi = .1;
			}
			else if(scope.spherical.phi>=(scope.maxPolarAngle)){
				scope.spherical.phi = scope.maxPolarAngle;
			}

			//Apply Calculations to Camera
			scope.cartesian = {x: scope.spherical.rho*Math.sin(scope.spherical.phi)*Math.sin(scope.spherical.theta), y: scope.spherical.rho*Math.cos(scope.spherical.phi), z: scope.spherical.rho*Math.sin(scope.spherical.phi)*Math.cos(scope.spherical.theta)};
			scope.cameraObject.position.set(scope.cartesian.x+scope.orbitObject.position.x, scope.cartesian.y+scope.orbitObject.position.y, scope.cartesian.z+scope.orbitObject.position.z);
			scope.cameraObject.lookAt(new THREE.Vector3(scope.orbitObject.position.x,scope.orbitObject.position.y,scope.orbitObject.position.z));
			scope.then = now;
		}
		else{
			//Get New orbitObject Location and Shift Camera to Follow
			scope.cartesian = {x: scope.spherical.rho*Math.sin(scope.spherical.phi)*Math.sin(scope.spherical.theta), y: scope.spherical.rho*Math.cos(scope.spherical.phi), z: scope.spherical.rho*Math.sin(scope.spherical.phi)*Math.cos(scope.spherical.theta)};
			scope.cameraObject.position.set(scope.cartesian.x+scope.orbitObject.position.x, scope.cartesian.y+scope.orbitObject.position.y, scope.cartesian.z+scope.orbitObject.position.z);
			scope.cameraObject.lookAt(new THREE.Vector3(scope.orbitObject.position.x,scope.orbitObject.position.y,scope.orbitObject.position.z));
			scope.then = now;
		}
	};

	this.dispose = function(){
		scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.removeEventListener( 'mouseup', onMouseUp, false );
		scope.domElement.removeEventListener( 'mousemove', onMouseMove, false);
	};

	this.addListeners();
};

OrbitingFollowControls.prototype.constructor = OrbitingFollowControls;