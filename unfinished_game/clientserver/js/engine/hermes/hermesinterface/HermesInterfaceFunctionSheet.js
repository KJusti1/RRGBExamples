/*
Author: Kevin Justice
File: HermesInterfaceFunctionSheet.js
Date Created: 101916

Functions for HermesInterface objects
*/

/*

FUNCTIONS ON THIS SHEET:

hi00000000- login screen init
hd00000000- login screen destroy

hi00000001- developers basement init
hd00000001- developers basement destroy

*/

hi00000000 = function(){

	var scope = this;

	scope.attemptLogin = function(){
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		hermes.socket.emit('0', {U: username, P: password});
	};

};

hd00000000 = function(){

	var scope = this;

};

hi00000001 = function(){

	var scope = this;

	scope.sendInitialTileMovement = function(){
    	hermes.socket.emit('0', {direction: gCurrent.movementHelper.currentDirection()});
  };

	scope.sendArrived = function(){
    	hermes.socket.emit('1', {});
  };

  scope.sendEndTileMovement = function(){
    hermes.socket.emit('2', {});
  };

	var pushMovement = function(m){
    var lTile = gCurrent.map.getTileByID(m.startTileID);
    var fTile;
    switch(m.direction){
      case(0):
        fTile = gCurrent.map.getNorthOf(lTile);
        break;
      case(1):
        fTile = gCurrent.map.getNorthWestOf(lTile);
        break;
      case(2):
        fTile = gCurrent.map.getWestOf(lTile);
        break;
      case(3):
        fTile = gCurrent.map.getSouthWestOf(lTile);
        break;
      case(4):
        fTile = gCurrent.map.getSouthOf(lTile);
        break;
      case(5):
        fTile = gCurrent.map.getSouthEastOf(lTile);
        break;
      case(6):
        fTile = gCurrent.map.getEastOf(lTile);
        break;
      case(7):
        fTile = gCurrent.map.getNorthEastOf(lTile);
        break;
      default:
        fTile = null;
        break;
    };
    var newMovement = {startTileID: m.startTileID, endTileID: fTile.id, username: m.username, lastTileID: undefined, hasStarted: false, direction: m.direction};
  	var ancestorMovement = gCurrent.activeMovements.filter(function(item){return(item.username == m.username);})[0];
  	if(ancestorMovement != undefined){
      gCurrent.activeMovements[gCurrent.activeMovements.indexOf(ancestorMovement)] = newMovement;
  	}
  	else{
      gCurrent.activeMovements.push(newMovement);
  	};
  };

	var endMovement = function(m){
    	var ancestorMovement = gCurrent.activeMovements.filter(function(item){return(item.username == m.username);})[0];
    	if(ancestorMovement == undefined){
        //pass
    	}
    	else{
        gCurrent.activeMovements[gCurrent.activeMovements.indexOf(ancestorMovement)].lastTileID = m.lastTileID;
    	};
  };

  hermes.socket.on('1', function(cpc){gCurrent.loadActor(cpc)});
	hermes.socket.on('2', function(cpc){gCurrent.loadUserActor(cpc);});
  hermes.socket.on('3', function(m){pushMovement(m);});
  hermes.socket.on('4', function(m){endMovement(m);});
  hermes.socket.on('5', function(u){gCurrent.removeActor(u.username)});

};

hd00000001 = function(){

	var scope = this;

	hermes.socket.removeAllListeners('1');
	hermes.socket.removeAllListeners('2');
	hermes.socket.removeAllListeners('3');
	hermes.socket.removeAllListeners('4');
	hermes.socket.removeAllListeners('5');

};