const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
var ipc = require('electron').ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, '/application/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

var sendCommandToTVS = function(cmd, addresses){
  switch(cmd){
    case 'CLICK':
        sendButtonToTVS('CLICK', addresses);
        break;

    case 'TURN_OFF':
      turnOffTVS(addresses);
      break;

    case 'HOME_BUTTON':
      sendButtonToTVS('HOME', addresses);
      break;

    case 'BACK_BUTTON':
      sendButtonToTVS('BACK', addresses);
      break;

    case 'UP_BUTTON':
      sendButtonToTVS('UP', addresses);
      break;

    case 'DOWN_BUTTON':
      sendButtonToTVS('DOWN', addresses);
      break;

    case 'LEFT_BUTTON':
      sendButtonToTVS('LEFT', addresses);
      break;

    case 'RIGHT_BUTTON':
      sendButtonToTVS('RIGHT', addresses);
      break;

    case '3D_BUTTON':
      sendButtonToTVS('3D_MODE', addresses);
      break;

    default:
      break;
  };
};

var turnOffTVS = function(addresses){
  for(var i = 0; i<addresses.length; i++){
    var currentIP = addresses[i];
    var tv = require('lgtv2')({url:'ws://'+currentIP+':3000'});
    tv.on('connect', function(){
      console.log('Connected to TV at IP: '+currentIP);
      tv.request('ssap://system/turnOff', function(err, res){
        console.log('Turn Off Command Sent to TV at IP: '+currentIP);
        setTimeout(function(){tv.disconnect()}, 1000);
      });
    });
    console.log('turnOffTVS');
  };
};

/*
var sendButtonToTVS = function(cmd, addresses){
  for(var i = 0; i<addresses.length; i++){
    var currentIP = addresses[i];
    var tv = require('lgtv2')({url:'ws://'+currentIP+':3000'});
    tv.on('connect', function(){
      console.log('Connected to TV at IP: '+currentIP);
      tv.getSocket('ssap://com.webos.service.networkinput/getPointerInputSocket', function(err, sock){
        if(!err){
          if(cmd == 'CLICK'){
            sock.send('click');
          }
          else{
            sock.send('button', {name:cmd});
          }
        }
        console.log(cmd+' Button Command Sent to TV at IP: '+currentIP);
        setTimeout(function(){tv.disconnect()}, 1000);
      });
    });
  };
};
*/

ipc.on('request-mainprocess-action', function(event, arg){
  switch(arg.functionCall){
    case 'sendCommandToTVS':
      sendCommandToTVS(arg.args[0], arg.args[1]);
      break;

    default:
      break;
  };
});

var sendButtonToTVS = function(cmd, addresses){
  if(addresses.length>0){
    var currentIP = addresses[0];
    var tv = require('lgtv2')({url:'ws://'+currentIP+':3000'});
    tv.on('connect', function(){
      console.log('Connected to TV at IP: '+currentIP);
      tv.getSocket('ssap://com.webos.service.networkinput/getPointerInputSocket', function(err, sock){
        if(!err){
          if(cmd == 'CLICK'){
            sock.send('click');
          }
          else{
            sock.send('button', {name:cmd});
          }
        }
        console.log(cmd+' Button Command Sent to TV at IP: '+currentIP);
        setTimeout(function(){
          tv.disconnect();
          addresses.shift();
          sendButtonToTVS(cmd, addresses);
        }, 250);
      });
    });
  };
};
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.