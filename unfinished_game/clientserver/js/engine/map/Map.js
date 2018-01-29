/*
Author: Kevin Justice
File: Map.js
Date Created: 080316

Map object constructor with helper methods
*/

Map = function(mapBuild){	
	
	var scope = this;
	this.mapBuild = mapBuild;
	this.tileArray = scope.mapBuild.tileArray;
	
	this.getTileByID = function(id){
		if(id>=0 && id <= scope.mapBuild.x*scope.mapBuild.z-1){
			return(scope.tileArray[Math.floor(id/scope.mapBuild.x)][Math.round(id%scope.mapBuild.x)]);
		}
		else{
			return(null);
		}
	};
	
	this.getNorthOf = function(tile){
		if((Math.floor(tile.id/scope.mapBuild.x)-1) >= 0){
			return(scope.tileArray[Math.floor(tile.id/scope.mapBuild.x)-1][Math.round(tile.id%scope.mapBuild.x)]);
		}
		else{
			return(null);
		};
	};

	this.getSouthOf = function(tile){
		if((Math.floor(tile.id/scope.mapBuild.x)+1) <= scope.mapBuild.z-1){
			return(scope.tileArray[Math.floor(tile.id/scope.mapBuild.x)+1][Math.round(tile.id%scope.mapBuild.x)]);
		}
		else{
			return(null);
		};
	};

	this.getWestOf = function(tile){
		if(Math.abs(Math.round((tile.id-1))%scope.mapBuild.x) < Math.round((tile.id)%scope.mapBuild.x)){
			return(scope.getTileByID(tile.id-1));
		}
		else{
			return(null);
		};
	};
	
	this.getEastOf = function(tile){
		if(Math.round((tile.id+1)%scope.mapBuild.x) > Math.round((tile.id)%scope.mapBuild.x)){
			return(scope.getTileByID(tile.id+1));
		}
		else{
			return(null);
		};
	};

	this.getNorthWestOf = function(tile){
		if((Math.round((tile.id-1)%scope.mapBuild.x) < Math.round((tile.id)%scope.mapBuild.x)) && (Math.floor(tile.id/scope.mapBuild.x)-1 >= 0) && ((scope.getNorthOf(tile) != null) && (scope.getWestOf(tile) != null))){
			return(scope.tileArray[Math.floor(tile.id/scope.mapBuild.x)-1][Math.round(tile.id%scope.mapBuild.x)-1]);
		}
		else{
			return(null);
		};
	};

	this.getNorthEastOf = function(tile){
		if(((Math.floor(tile.id/scope.mapBuild.x)-1) >= 0) && (Math.round((tile.id+1)%scope.mapBuild.x) > Math.round((tile.id)%scope.mapBuild.x)) && ((scope.getNorthOf(tile) != null) && (scope.getEastOf(tile) != null))){
			return(scope.tileArray[Math.floor(tile.id/scope.mapBuild.x)-1][Math.round(tile.id%scope.mapBuild.x)+1]);
		}
		else{
			return(null);
		};
	};

	this.getSouthWestOf = function(tile){
		if((Math.abs(Math.round((tile.id-1))%scope.mapBuild.x) < Math.round((tile.id)%scope.mapBuild.x)) && ((Math.floor(tile.id/scope.mapBuild.x)+1) <= scope.mapBuild.z-1) && ((scope.getSouthOf(tile) != null) && (scope.getWestOf(tile) != null))){
			return(scope.tileArray[Math.floor(tile.id/scope.mapBuild.x)+1][Math.round(tile.id%scope.mapBuild.x)-1]);
		}
		else{
			return(null);
		};
	};

	this.getSouthEastOf = function(tile){
		if((Math.round((tile.id+1)%scope.mapBuild.x) > Math.round((tile.id)%scope.mapBuild.x)) && ((Math.floor(tile.id/scope.mapBuild.x)+1) <= scope.mapBuild.z-1) && ((scope.getSouthOf(tile) != null) && (scope.getEastOf(tile) != null))){
			return(scope.tileArray[Math.floor(tile.id/scope.mapBuild.x)+1][Math.round(tile.id%scope.mapBuild.x)+1]);
		}
		else{
			return(null);
		};
	};

};

Map.prototype.constructor = Map;