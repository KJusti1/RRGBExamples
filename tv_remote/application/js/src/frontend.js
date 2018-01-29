var ipc = require('electron').ipcRenderer;


window.onload = function(){
	document.getElementById('turnOff').onclick = function(){
		var addresses = [];
		for(var i = 0; i<44; i++){
			if(document.getElementById('useip'+i.toString()).checked){
				addresses.push(document.getElementById('ip'+i.toString()).value);
			}
			else{
				continue;
			}
		};
		var data = {functionCall:'sendCommandToTVS', args:['TURN_OFF', addresses]};
		ipc.send('request-mainprocess-action', data);
	};

	document.getElementById('home').onclick = function(){
		var addresses = [];
		for(var i = 0; i<44; i++){
			if(document.getElementById('useip'+i.toString()).checked){
				addresses.push(document.getElementById('ip'+i.toString()).value);
			}
			else{
				continue;
			}
		};
		var data = {functionCall:'sendCommandToTVS', args:['HOME_BUTTON', addresses]};
		ipc.send('request-mainprocess-action', data);
	};

	document.getElementById('back').onclick = function(){
		var addresses = [];
		for(var i = 0; i<44; i++){
			if(document.getElementById('useip'+i.toString()).checked){
				addresses.push(document.getElementById('ip'+i.toString()).value);
			}
			else{
				continue;
			}
		};
		var data = {functionCall:'sendCommandToTVS', args:['BACK_BUTTON', addresses]};
		ipc.send('request-mainprocess-action', data);
	};

	document.getElementById('click').onclick = function(){
		var addresses = [];
		for(var i = 0; i<44; i++){
			if(document.getElementById('useip'+i.toString()).checked){
				addresses.push(document.getElementById('ip'+i.toString()).value);
			}
			else{
				continue;
			}
		};
		var data = {functionCall:'sendCommandToTVS', args:['CLICK', addresses]};
		ipc.send('request-mainprocess-action', data);
	};

	document.getElementById('up').onclick = function(){
		var addresses = [];
		for(var i = 0; i<44; i++){
			if(document.getElementById('useip'+i.toString()).checked){
				addresses.push(document.getElementById('ip'+i.toString()).value);
			}
			else{
				continue;
			}
		};
		var data = {functionCall:'sendCommandToTVS', args:['UP_BUTTON', addresses]};
		ipc.send('request-mainprocess-action', data);
	};

	document.getElementById('down').onclick = function(){
		var addresses = [];
		for(var i = 0; i<44; i++){
			if(document.getElementById('useip'+i.toString()).checked){
				addresses.push(document.getElementById('ip'+i.toString()).value);
			}
			else{
				continue;
			}
		};
		var data = {functionCall:'sendCommandToTVS', args:['DOWN_BUTTON', addresses]};
		ipc.send('request-mainprocess-action', data);
	};

	document.getElementById('left').onclick = function(){
		var addresses = [];
		for(var i = 0; i<44; i++){
			if(document.getElementById('useip'+i.toString()).checked){
				addresses.push(document.getElementById('ip'+i.toString()).value);
			}
			else{
				continue;
			}
		};
		var data = {functionCall:'sendCommandToTVS', args:['LEFT_BUTTON', addresses]};
		ipc.send('request-mainprocess-action', data);
	};

	document.getElementById('right').onclick = function(){
		var addresses = [];
		for(var i = 0; i<44; i++){
			if(document.getElementById('useip'+i.toString()).checked){
				addresses.push(document.getElementById('ip'+i.toString()).value);
			}
			else{
				continue;
			}
		};
		var data = {functionCall:'sendCommandToTVS', args:['RIGHT_BUTTON', addresses]};
		ipc.send('request-mainprocess-action', data);
	};

	document.getElementById('mode3D').onclick = function(){
		var addresses = [];
		for(var i = 0; i<44; i++){
			if(document.getElementById('useip'+i.toString()).checked){
				addresses.push(document.getElementById('ip'+i.toString()).value);
			}
			else{
				continue;
			}
		};
		var data = {functionCall:'sendCommandToTVS', args:['3D_BUTTON', addresses]};
		ipc.send('request-mainprocess-action', data);
	};
};