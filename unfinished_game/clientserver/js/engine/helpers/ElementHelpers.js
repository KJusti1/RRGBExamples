/*
Author: Kevin Justice
File: ElementHelpers.js
Date Created: 102316

html element helpers
*/

ContextMenu = function(){
	var scope = this;
	scope.drawn = false;
	scope.formulaObject = {};

	var getSize = function(divId){
		var numOptions = scope.formulaObject[divId].numOptions;
		return({height:3+16*numOptions, width:106});
	};

	var constructMenu = function(location, divId){
		var fill = '<div id="ctxtMenuWrapper" style="top:'+location.top.toString()+'px; left:'+location.left.toString()+'px;">';
		for(var i = 0; i<scope.formulaObject[divId].numOptions; i++){
			fill = fill+'<div class="ctxtMenuListing" onclick="'+scope.formulaObject[divId][i].onClick+'" >'+scope.formulaObject[divId][i].gameAction+'</div>';
		};
		fill = fill+ '</div>';
		return(fill);
	};

	this.load = function(event, element){
		event.preventDefault();
		if(scope.drawn){
			scope.close();
		};
		var location = {left: event.clientX, top: event.clientY};
		var size = getSize(element.id);
		if(location.left+size.width > 1024){
			location.left = 1024-size.width;
		};
		if(location.top+size.height > 576){
			location.top = 576-size.height;
		};
		var inner = constructMenu(location, element.id);
    	var htmlInsert = document.createElement('div');
    	htmlInsert.innerHTML = inner;
    	document.body.appendChild(htmlInsert.firstChild);
    	scope.drawn  = true;
    	window.addEventListener("click", scope.close);
	};

	this.addFormulas = function(formulaObject){
		for(i in formulaObject){
			scope.formulaObject[i] = formulaObject[i];
		};
	};

	this.removeFormulas = function(formulaObject){
		for(i in formulaObject){
			delete scope.formulaObject[i];
		};
	};

	this.close = function(){
		if(scope.drawn){
			document.body.removeChild(document.getElementById('ctxtMenuWrapper'));
			window.removeEventListener("click", scope.close);
			scope.drawn = false;
		};
	};

};
ContextMenu.prototype.constructor = ContextMenu;

LoginBox = function(){
	var scope = this;
	var inner = '<div id="loginPadding"> <div id="loginHeader"> <b>Alpha Double Prime Testing Login</b> </div> <div id="loginBox"> <b>[Username] </b><input id="username"/></li> <br/><br/> <li><b>[Password] </b><input id="password"/><br/><br/> <button id="login" onclick="hermes.hCurrent.attemptLogin();"><b>Log In</b></button> </div> </div>';

	this.load = function(){
    	var htmlInsert = document.createElement('div');
    	htmlInsert.innerHTML = inner;
    	document.body.appendChild(htmlInsert.firstChild);
  	};

  	this.close = function(){
    	document.body.removeChild(document.getElementById('loginPadding'));
  	};
};
LoginBox.prototype.constructor = LoginBox;

MessageBox = function(){
	var scope = this;
	var inner = '<div id="messageBoxShell">[MESSAGE BOX]</div>';

	this.load = function(){
    	var htmlInsert = document.createElement('div');
    	htmlInsert.innerHTML = inner;
    	document.body.appendChild(htmlInsert.firstChild);
  	};

  	this.close = function(){
    	document.body.removeChild(document.getElementById('messageBoxShell'));
  	};
};
MessageBox.prototype.constructor = MessageBox;

OptionsMenu = function(){
	var scope = this;
	var inner1 = '<div class="optionsBar" id="options_interact" onclick="gCurrent.optionsMenuHelper.select(0);">Interact</div>';
	var inner2 = '<div class="optionsBar" id="options_backpack" onclick="gCurrent.optionsMenuHelper.select(1);">Backpack</div>';
	scope.activeMenu = undefined;

	this.load = function(){
    	var htmlInsert = document.createElement('div');
    	htmlInsert.innerHTML = inner1;
    	document.body.appendChild(htmlInsert.firstChild);
    	var htmlInsert = document.createElement('div');
    	htmlInsert.innerHTML = inner2;
    	document.body.appendChild(htmlInsert.firstChild);
  	};

  	this.select = function(menu){
  		if(menu == scope.activeMenu){
  			switch(menu){
	  			case(0):
	  				gCurrent.interactionsMenuHelper.close();
	  				scope.activeMenu = undefined;
	  				break;
	  			default:
	  				break;
  			};
  		}
  		else{
	  		switch(menu){
	  			case(0):
	  				//close all menus cept for menu var
	  				gCurrent.interactionsMenuHelper.load();
	  				scope.activeMenu = menu;
	  				break;
	  			default:
	  				break;
	  		};
	  	};

  	};

  	this.close = function(){
    	document.body.removeChild(document.getElementById('options_interact'));
    	document.body.removeChild(document.getElementById('options_backpack'));
  	};
};
OptionsMenu.prototype.constructor = OptionsMenu;

InteractionsMenu = function(){
	var scope = this;
	var wrapper = '<div id="interactions_listWrapper"></div>';
	scope.insert = '';
	scope.drawn = false;
	scope.interactions = {};
	scope.formulaObject = {};

	this.load = function(){
		if(!scope.drawn){
	    	var htmlInsert = document.createElement('div');
	    	htmlInsert.innerHTML = wrapper;
	    	document.body.appendChild(htmlInsert.firstChild);
	    	document.getElementById('interactions_listWrapper').innerHTML = scope.insert;
	    	gCurrent.contextMenuHelper.addFormulas(scope.formulaObject);
	    	scope.drawn = true;
	    };
  	};

  	this.close = function(){
  		if(scope.drawn){
    		document.body.removeChild(document.getElementById('interactions_listWrapper'));
    		gCurrent.contextMenuHelper.removeFormulas(scope.formulaObject);
    		scope.drawn = false;
    	};
  	};

  	this.handleChange = function(rawInteraction){
  		var interactiveObjectName = rawInteraction.id;
  		if(scope.interactions[interactiveObjectName] != undefined && !rawInteraction.destroy){
  			
  		};
  	};

  	var update = function(){
  		var interactions = scope.interactions;
  		gCurrent.contextMenuHelper.removeFormulas(scope.formulaObject);
  		var insert = '';
  		var numEntries;
  		var alphabetizedObjects = [];
  		var formulaObject = {};
  		for(i in interactions){
  			alphabetizedObjects.push(interactions[i].objectName);
  		};
  		alphabetizedObjects.sort();
  		if(alphabetizedObjects.length>8){
  			numEntries = 8;
  		}
  		else{
  			numEntries = alphabetizedObjects.length;
  		};
  		for(var i = 0; i<numEntries; i++){
  			var interactionCurrent = interactions[alphabetizedObjects[i]];
  			var top = 50*i+4;
  			var context = 'oncontextmenu="gCurrent.contextMenuHelper.load(event, this);"';
  			var imgDiv = '<div class="interactionIcon" style="background-image:url(../pictures/icons/'+interactionCurrent.imgName+'.png);"></div>';
  			var nameDiv = '<div class="interactionName">'+interactionCurrent.objectName+'</div>'
  			insert = insert+'<div id="icm'+i.toString()+'" class="interactionListing" style="top:'+top.toString()+'px;" '+context+'>'+imgDiv+nameDiv+'</div>';
  			formulaObject["icm"+i.toString()] = interactionCurrent.formula;
  		};
  		gCurrent.contextMenuHelper.addFormulas(formulaObject);
  		scope.insert = insert;
  		scope.formulaObject = formulaObject;
  		if(scope.drawn){
  			document.getElementById('interactions_listWrapper').innerHTML = scope.insert;
  		};
  	};
};
InteractionsMenu.prototype.constructor = InteractionsMenu;