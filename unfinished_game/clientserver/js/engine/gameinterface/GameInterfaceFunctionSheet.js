/*
Author: Kevin Justice
File: GameInterfaceFunctionSheet.js
Date Created: 073116

Functions for GameInterface objects
*/

/*

FUNCTIONS ON THIS SHEET:

gi00000000 = login screen init
ga00000000 = login screen animate
gd00000000 = login screen destroy

gi00000001 = developers basement init
ga00000001 = developers basement animate
gd00000001 = developers basement destroy

*/

gi00000000 = function(){

  var scope = this;

  var skyColor = 0xffdd99;
  renderer.setClearColor(skyColor, 1);
  scene.fog.color.set(skyColor);
  scene.fog.density = .03;

  var light = new THREE.HemisphereLight( skyColor, 0x009900, 1 );
  scene.add( light );

  var groundGeometry = new THREE.PlaneBufferGeometry(100 ,100);
  var groundMaterial = new THREE.MeshLambertMaterial({color:0x009900});
  var groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.position.set(0,0,0);
  groundMesh.rotation.x = - Math.PI / 2;
  scene.add(groundMesh);

  var onProgress = function(a){};
  var onError = function(a){};

  var MTLLoader = new THREE.MTLLoader();
  var OBJLoader = new THREE.OBJLoader();
  MTLLoader.load( "js/engine/models/mtls/lowpolytree.mtl", function( materials ) {
    materials.preload();
    OBJLoader.setMaterials( materials );
    OBJLoader.load( "js/engine/models/objs/lowpolytree.obj", function ( tree ) {
      tree.position.x = 0;
      tree.position.y = 0;
      tree.position.z = 0;
      tree.scale.set(2,1,2);
        for(var i=0; i<300; i++){
          var yScale = Math.random()*(2.75)+.25;
          var xzScale = Math.random()*(3.5)+.5;
          var xPos = Math.random()*(100)-50;
          var zPos = Math.random()*(100)-50;
          var newTree = tree.clone();
          newTree.scale.set(xzScale, yScale, xzScale);
          newTree.position.set(xPos, 2*yScale, zPos);
          scene.add(newTree);
        }
    }, onProgress, onError );
  });

  scope.loginBoxHelper = new LoginBox();
  scope.loginBoxHelper.load();
};

ga00000000 = function(){

  var scope = this;

  if(scope.previousAnimateTime == undefined){
    scope.previousAnimateTime = performance.now();
    scope.theta = 0;
    camera.position.y = 10;
    camera.position.z = 30;
  };
  var now = performance.now();
  var dT = (now-scope.previousAnimateTime)*.001;
  var velocity = Math.E*.1;
  scope.theta -= velocity*dT;
  camera.position.x = 30*Math.sin(scope.theta);
  camera.position.z = 30*Math.cos(scope.theta);
  camera.lookAt(new THREE.Vector3(0,5,0));

  scope.previousAnimateTime = performance.now();
};

gd00000000 = function(){

  var scope = this;

  scope.animateFunction = function(){};
  scene.children = [];
  scene.fog.color.set(0xffffff);
  scene.fog.density = 0;
  renderer.setClearColor(0x0, 1);
  scope.loginBoxHelper.close();
};

gi00000001 = function(){

  var scope = this;

  scope.actors = {};
  scope.activeMovements = [];

  var tArray = [[{x: -7, y: 0, z: -5.5, id: 0}, {x: -6, y: 0, z: -5.5, id: 1}, {x: -5, y: 0, z: -5.5, id: 2}, null, {x: -3, y: 0, z: -5.5, id: 4}, {x: -2, y: 0, z: -5.5, id: 5}, {x: -1, y: 0, z: -5.5, id: 6}, {x: 0, y: 0, z: -5.5, id: 7}, {x: 1, y: 0, z: -5.5, id: 8}, {x: 2, y: 0, z: -5.5, id: 9}, {x: 3, y: 0, z: -5.5, id: 10}, {x: 4, y: 0, z: -5.5, id: 11}, {x: 5, y: 0, z: -5.5, id: 12}, {x: 6, y: 0, z: -5.5, id: 13}, {x: 7, y: 0, z: -5.5, id: 14}], [{x: -7, y: 0, z: -4.5, id: 15}, {x: -6, y: 0, z: -4.5, id: 16}, {x: -5, y: 0, z: -4.5, id: 17}, null, {x: -3, y: 0, z: -4.5, id: 19}, {x: -2, y: 0, z: -4.5, id: 20}, {x: -1, y: 0, z: -4.5, id: 21}, {x: 0, y: 0, z: -4.5, id: 22}, {x: 1, y: 0, z: -4.5, id: 23}, {x: 2, y: 0, z: -4.5, id: 24}, {x: 3, y: 0, z: -4.5, id: 25}, {x: 4, y: 0, z: -4.5, id: 26}, {x: 5, y: 0, z: -4.5, id: 27}, {x: 6, y: 0, z: -4.5, id: 28}, {x: 7, y: 0, z: -4.5, id: 29}], [{x: -7, y: 0, z: -3.5, id: 30}, {x: -6, y: 0, z: -3.5, id: 31}, {x: -5, y: 0, z: -3.5, id: 32}, null, null, null, null, null, null, null, null, null, null, null, null], [{x: -7, y: 0, z: -2.5, id: 45}, {x: -6, y: 0, z: -2.5, id: 46}, {x: -5, y: 0, z: -2.5, id: 47}, {x: -4, y: 0, z: -2.5, id: 48}, {x: -3, y: 0, z: -2.5, id: 49}, {x: -2, y: 0, z: -2.5, id: 50}, {x: -1, y: 0, z: -2.5, id: 51}, {x: 0, y: 0, z: -2.5, id: 52}, {x: 1, y: 0, z: -2.5, id: 53}, {x: 2, y: 0, z: -2.5, id: 54}, {x: 3, y: 0, z: -2.5, id: 55}, {x: 4, y: 0, z: -2.5, id: 56}, {x: 5, y: 0, z: -2.5, id: 57}, {x: 6, y: 0, z: -2.5, id: 58}, {x: 7, y: 0, z: -2.5, id: 59}], [{x: -7, y: 0, z: -1.5, id: 60}, {x: -6, y: 0, z: -1.5, id: 61}, {x: -5, y: 0, z: -1.5, id: 62}, {x: -4, y: 0, z: -1.5, id: 63}, {x: -3, y: 0, z: -1.5, id: 64}, {x: -2, y: 0, z: -1.5, id: 65}, {x: -1, y: 0, z: -1.5, id: 66}, {x: 0, y: 0, z: -1.5, id: 67}, {x: 1, y: 0, z: -1.5, id: 68}, {x: 2, y: 0, z: -1.5, id: 69}, {x: 3, y: 0, z: -1.5, id: 70}, {x: 4, y: 0, z: -1.5, id: 71}, {x: 5, y: 0, z: -1.5, id: 72}, {x: 6, y: 0, z: -1.5, id: 73}, {x: 7, y: 0, z: -1.5, id: 74}], [{x: -7, y: 0, z: -0.5, id: 75}, {x: -6, y: 0, z: -0.5, id: 76}, {x: -5, y: 0, z: -0.5, id: 77}, {x: -4, y: 0, z: -0.5, id: 78}, {x: -3, y: 0, z: -0.5, id: 79}, {x: -2, y: 0, z: -0.5, id: 80}, {x: -1, y: 0, z: -0.5, id: 81}, {x: 0, y: 0, z: -0.5, id: 82}, {x: 1, y: 0, z: -0.5, id: 83}, {x: 2, y: 0, z: -0.5, id: 84}, {x: 3, y: 0, z: -0.5, id: 85}, {x: 4, y: 0, z: -0.5, id: 86}, {x: 5, y: 0, z: -0.5, id: 87}, {x: 6, y: 0, z: -0.5, id: 88}, {x: 7, y: 0, z: -0.5, id: 89}], [{x: -7, y: 0, z: 0.5, id: 90}, {x: -6, y: 0, z: 0.5, id: 91}, {x: -5, y: 0, z: 0.5, id: 92}, {x: -4, y: 0, z: 0.5, id: 93}, {x: -3, y: 0, z: 0.5, id: 94}, {x: -2, y: 0, z: 0.5, id: 95}, {x: -1, y: 0, z: 0.5, id: 96}, {x: 0, y: 0, z: 0.5, id: 97}, {x: 1, y: 0, z: 0.5, id: 98}, {x: 2, y: 0, z: 0.5, id: 99}, {x: 3, y: 0, z: 0.5, id: 100}, {x: 4, y: 0, z: 0.5, id: 101}, {x: 5, y: 0, z: 0.5, id: 102}, {x: 6, y: 0, z: 0.5, id: 103}, {x: 7, y: 0, z: 0.5, id: 104}], [{x: -7, y: 0, z: 1.5, id: 105}, {x: -6, y: 0, z: 1.5, id: 106}, {x: -5, y: 0, z: 1.5, id: 107}, {x: -4, y: 0, z: 1.5, id: 108}, {x: -3, y: 0, z: 1.5, id: 109}, {x: -2, y: 0, z: 1.5, id: 110}, {x: -1, y: 0, z: 1.5, id: 111}, {x: 0, y: 0, z: 1.5, id: 112}, {x: 1, y: 0, z: 1.5, id: 113}, {x: 2, y: 0, z: 1.5, id: 114}, {x: 3, y: 0, z: 1.5, id: 115}, {x: 4, y: 0, z: 1.5, id: 116}, {x: 5, y: 0, z: 1.5, id: 117}, {x: 6, y: 0, z: 1.5, id: 118}, {x: 7, y: 0, z: 1.5, id: 119}], [{x: -7, y: 0, z: 2.5, id: 120}, {x: -6, y: 0, z: 2.5, id: 121}, {x: -5, y: 0, z: 2.5, id: 122}, {x: -4, y: 0, z: 2.5, id: 123}, {x: -3, y: 0, z: 2.5, id: 124}, {x: -2, y: 0, z: 2.5, id: 125}, {x: -1, y: 0, z: 2.5, id: 126}, {x: 0, y: 0, z: 2.5, id: 127}, {x: 1, y: 0, z: 2.5, id: 128}, {x: 2, y: 0, z: 2.5, id: 129}, {x: 3, y: 0, z: 2.5, id: 130}, {x: 4, y: 0, z: 2.5, id: 131}, {x: 5, y: 0, z: 2.5, id: 132}, {x: 6, y: 0, z: 2.5, id: 133}, {x: 7, y: 0, z: 2.5, id: 134}], [{x: -7, y: 0, z: 3.5, id: 135}, {x: -6, y: 0, z: 3.5, id: 136}, {x: -5, y: 0, z: 3.5, id: 137}, {x: -4, y: 0, z: 3.5, id: 138}, {x: -3, y: 0, z: 3.5, id: 139}, {x: -2, y: 0, z: 3.5, id: 140}, {x: -1, y: 0, z: 3.5, id: 141}, {x: 0, y: 0, z: 3.5, id: 142}, {x: 1, y: 0, z: 3.5, id: 143}, {x: 2, y: 0, z: 3.5, id: 144}, {x: 3, y: 0, z: 3.5, id: 145}, {x: 4, y: 0, z: 3.5, id: 146}, {x: 5, y: 0, z: 3.5, id: 147}, {x: 6, y: 0, z: 3.5, id: 148}, {x: 7, y: 0, z: 3.5, id: 149}], [{x: -7, y: 0, z: 4.5, id: 150}, {x: -6, y: 0, z: 4.5, id: 151}, {x: -5, y: 0, z: 4.5, id: 152}, {x: -4, y: 0, z: 4.5, id: 153}, {x: -3, y: 0, z: 4.5, id: 154}, {x: -2, y: 0, z: 4.5, id: 155}, {x: -1, y: 0, z: 4.5, id: 156}, {x: 0, y: 0, z: 4.5, id: 157}, {x: 1, y: 0, z: 4.5, id: 158}, {x: 2, y: 0, z: 4.5, id: 159}, {x: 3, y: 0, z: 4.5, id: 160}, {x: 4, y: 0, z: 4.5, id: 161}, {x: 5, y: 0, z: 4.5, id: 162}, {x: 6, y: 0, z: 4.5, id: 163}, {x: 7, y: 0, z: 4.5, id: 164}], [{x: -7, y: 0, z: 5.5, id: 165}, {x: -6, y: 0, z: 5.5, id: 166}, {x: -5, y: 0, z: 5.5, id: 167}, {x: -4, y: 0, z: 5.5, id: 168}, {x: -3, y: 0, z: 5.5, id: 169}, {x: -2, y: 0, z: 5.5, id: 170}, {x: -1, y: 0, z: 5.5, id: 171}, {x: 0, y: 0, z: 5.5, id: 172}, {x: 1, y: 0, z: 5.5, id: 173}, {x: 2, y: 0, z: 5.5, id: 174}, {x: 3, y: 0, z: 5.5, id: 175}, {x: 4, y: 0, z: 5.5, id: 176}, {x: 5, y: 0, z: 5.5, id: 177}, {x: 6, y: 0, z: 5.5, id: 178}, {x: 7, y: 0, z: 5.5, id: 179}]];
  var mBuild = {x: 15, z: 12, tileArray: tArray};
  scope.map = new Map(mBuild);

  renderer.setClearColor(0x0, 1);

  var light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 10, 0 );
  scene.add( light );

  var groundGeometry0 = new THREE.PlaneBufferGeometry(15 ,9);
  var groundGeometry1 = new THREE.PlaneBufferGeometry(3.2 ,12);
  var groundMaterial = new THREE.MeshPhongMaterial({color:0x1a0d00});
  groundMaterial.shininess =  2;
  groundMesh0 = new THREE.Mesh(groundGeometry0, groundMaterial);
  groundMesh1 = new THREE.Mesh(groundGeometry1, groundMaterial);
  groundMesh0.position.set(0,0,1.6);
  groundMesh1.position.set(-6,0,0);
  groundMesh0.rotation.x = - Math.PI / 2;
  groundMesh1.rotation.x = - Math.PI / 2;
  scene.add(groundMesh0);
  scene.add(groundMesh1);

  var onProgress = function(a){};
  var onError = function(a){};

  var MTLLoader = new THREE.MTLLoader();
  var OBJLoader = new THREE.OBJLoader();
  MTLLoader.load( "js/engine/models/mtls/basementStructure.mtl", function( materials ) {
    materials.preload();
    OBJLoader.setMaterials( materials );
    OBJLoader.load( "js/engine/models/objs/basementStructure.obj", function ( basement ) {
      basement.position.set(.46,0,.2);
      basement.scale.set(.0097,.0097,.0092);
      scene.add(basement);
    }, onProgress, onError );
  });

  camera.position.set(0, 100, 0);
  camera.lookAt(0, 101, 0);

  scope.loadUserActor = function(cpc){
    scope.username = cpc.username;
    var color;
    switch(cpc.model){
      case(0):
        color = 'red';
        break;
      case(1):
        color = 'orange';
        break;
      case(2):
        color = 'yellow';
        break;
      case(3):
        color = 'green';
        break;
      case(4):
        color = 'blue';
        break;
      case(5):
        color = 'purple';
        break;
      default:
        color = 'white';
    };

    var jLoader = new THREE.JSONLoader();
    var oLoader = new THREE.ObjectLoader();
    oLoader.load("./js/engine/models/marine_anims_allbad.json", function(object){
      var currentTile = scope.map.getTileByID(cpc.tileID);
      var material = new THREE.MeshLambertMaterial({color: color});
      var mesh = object.children[0];
      mesh.material = material;
      mesh.material.skinning = true;
      mesh.material.morphTargets= true;
      mesh.name = cpc.username;
      mesh.scale.set(.013,.013,.013);
      mesh.rotation.set(-Math.PI/2,0,0);
      mesh.position.set(currentTile.x, currentTile.y, currentTile.z);
      scope.actors[cpc.username] = {model: mesh, tileID: cpc.tileID};
      scene.add(mesh);
      jLoader.load( "./js/engine/models/compass.js", function(compassGeometry){
        var compassMaterial = new THREE.MeshBasicMaterial({color: color});
        var compass = new THREE.Mesh(compassGeometry, compassMaterial);
        scene.add(compass);
        scope.cameraControls = new OrbitingFollowControls(camera, renderer.domElement, mesh, 15);
        scope.movementHelper = new PlayerMovementHelper(compass, mesh);
        scope.movementHelper.thetaOffset = Math.PI/2;
      });
      var mixer = new THREE.AnimationMixer(mesh);
      mixer.clipAction(mesh.geometry.animations[0]).play();
      scope.actors[cpc.username].mixer = mixer;
    });
  };

  scope.loadActor = function(cpc){
    var color;
    switch(cpc.model){
      case(0):
        color = 'red';
        break;
      case(1):
        color = 'orange';
        break;
      case(2):
        color = 'yellow';
        break;
      case(3):
        color = 'green';
        break;
      case(4):
        color = 'blue';
        break;
      case(5):
        color = 'purple';
        break;
      default:
        color = 'white';
    };

    var jLoader = new THREE.JSONLoader();
    var oLoader = new THREE.ObjectLoader();
    oLoader.load("./js/engine/models/marine_anims_allbad.json", function(object){
      var currentTile = scope.map.getTileByID(cpc.tileID);
      var material = new THREE.MeshLambertMaterial({color: color});
      var mesh = object.children[0];
      mesh.material = material;
      mesh.material.skinning = true;
      mesh.material.morphTargets= true;
      mesh.name = cpc.username;
      mesh.scale.set(.013,.013,.013);
      mesh.rotation.set(-Math.PI/2,0,0);
      mesh.position.set(currentTile.x, currentTile.y, currentTile.z);
      scope.actors[cpc.username] = {model: mesh, tileID: cpc.tileID};
      scene.add(mesh);
      var mixer = new THREE.AnimationMixer(mesh);
      mixer.clipAction(mesh.geometry.animations[0]).play();
      scope.actors[cpc.username].mixer = mixer;
    });
  };

  scope.removeActor = function(username){
    var destroyableMovement = scope.activeMovements.filter(function(item){return(item.username == username);})[0];
    if(destroyableMovement != undefined){
      scope.activeMovements[scope.activeMovements.indexOf(destroyableMovement)] = null;
    };
    var destroyableActor = scope.actors[username];
    if(destroyableActor != undefined){
      delete scope.actors[username];
      var actorChild = scene.children.filter(function(item){return(item.name == username);})[0];
      scene.remove(actorChild);
    };
  };

  scope.contextMenuHelper = new ContextMenu();
  
  scope.messageBoxHelper = new MessageBox();
  scope.messageBoxHelper.load();

  scope.optionsMenuHelper = new OptionsMenu();
  scope.optionsMenuHelper.load();

  scope.interactionsMenuHelper = new InteractionsMenu();
};

ga00000001 = function(){

  var scope = this;

  var dT = (performance.now()-scope.previousAnimateTime)*.001;

/*************UPDATE SCENE ACTOR MOVEMENT*******/
  var velocity = 3;
  for(var i = 0; i<scope.activeMovements.length; i++){
    var currentMovement = scope.activeMovements[i];
    if(currentMovement == null || scope.actors[currentMovement.username].model == undefined){
      continue;
    };
    var startTile = scope.map.getTileByID(currentMovement.startTileID);
    var endTile = scope.map.getTileByID(currentMovement.endTileID);
    var currentModel = scope.actors[currentMovement.username].model;
    if(!currentMovement.hasStarted){
      var theta = 1/4*currentMovement.direction*Math.PI;
      currentModel.position.set(startTile.x, startTile.y, startTile.z);
      currentModel.rotation.set(currentModel.rotation.x, currentModel.rotation.y, theta);
      scope.actors[currentMovement.username].mixer.clipAction(scope.actors[currentMovement.username].model.geometry.animations[0]).stop();
      scope.actors[currentMovement.username].mixer.clipAction(scope.actors[currentMovement.username].model.geometry.animations[9]).play();
      currentMovement.hasStarted = true;
      currentMovement.triggered = false;
    }
    if(currentMovement.hasStarted){
      var direction = [endTile.x-startTile.x, endTile.y-startTile.y, endTile.z-startTile.z];
      var magnitude = Math.sqrt(Math.pow(direction[0], 2)+Math.pow(direction[1], 2)+Math.pow(direction[2], 2));
      direction[0] = direction[0]/magnitude;
      direction[1] = direction[1]/magnitude;
      direction[2] = direction[2]/magnitude;
      var velocityDirection = [direction[0]*velocity, direction[1]*velocity, direction[2]*velocity];
      var trigger = Math.sqrt(Math.pow(startTile.x-currentModel.position.x, 2)+Math.pow(startTile.y-currentModel.position.y, 2)+Math.pow(startTile.z-currentModel.position.z, 2)) > .5;
      var finished = (Math.sign(currentModel.position.x+dT*velocityDirection[0]-endTile.x)*(endTile.x-currentModel.position.x+dT*velocityDirection[0]) >= 0) && (Math.sign(currentModel.position.y+dT*velocityDirection[1]-endTile.y)*(endTile.y-currentModel.position.y+dT*velocityDirection[1]) >= 0) && (Math.sign(currentModel.position.z+dT*velocityDirection[2]-endTile.z)*(endTile.z-currentModel.position.z+dT*velocityDirection[2]) >= 0);
      if(trigger && !currentMovement.triggered && currentMovement.username == scope.username){
        currentMovement.triggered = true;
        scope.movementHelper.arrive();
      }
      if(finished){
        currentModel.position.set(endTile.x, endTile.y, endTile.z);
        scope.actors[currentMovement.username].tileID = endTile.id;
        if(currentMovement.lastTileID == endTile.id){
          scope.actors[currentMovement.username].mixer.clipAction(scope.actors[currentMovement.username].model.geometry.animations[9]).stop();
          scope.actors[currentMovement.username].mixer.clipAction(scope.actors[currentMovement.username].model.geometry.animations[0]).play();
          scope.activeMovements[i] = null;
        }
        else{
          var fTile;
          switch(currentMovement.direction){
             case(0):
                fTile = scope.map.getNorthOf(endTile);
                break;
              case(1):
                fTile = gCurrent.map.getNorthWestOf(endTile);
                break;
              case(2):
                fTile = gCurrent.map.getWestOf(endTile);
                break;
              case(3):
                fTile = gCurrent.map.getSouthWestOf(endTile);
                break;
              case(4):
                fTile = gCurrent.map.getSouthOf(endTile);
                break;
              case(5):
                fTile = gCurrent.map.getSouthEastOf(endTile);
                break;
              case(6):
                fTile = gCurrent.map.getEastOf(endTile);
                break;
              case(7):
                fTile = gCurrent.map.getNorthEastOf(endTile);
                break;
              default:
                fTile = null;
                break;
          };
          var newMovement = {startTileID: endTile.id, endTileID: fTile.id, username: currentMovement.username, lastTileID: currentMovement.lastTileID, hasStarted: false, direction: currentMovement.direction};
          scope.activeMovements[i] = newMovement;
        };
      }
      else{
        currentModel.position.x += velocityDirection[0]*dT;
        currentModel.position.y += velocityDirection[1]*dT;
        currentModel.position.z += velocityDirection[2]*dT;
      };
    };
  };
  scope.activeMovements = scope.activeMovements.filter(function(item){return item});
  /*************UPDATE SCENE ACTOR MOVEMENT*******/

  /*************UPDATE SCENE ACTOR ANIMATION******/
  for(i in scope.actors){
    if(scope.actors[i].mixer){
      scope.actors[i].mixer.update(dT);
    };
  };
  /*************UPDATE SCENE ACTOR ANIMATION******/

  if(scope.cameraControls){
    scope.cameraControls.update();
  };
  if(scope.movementHelper){
    scope.movementHelper.update();
  };

  scope.previousAnimateTime = performance.now();
};

gd00000001 = function(){

  var scope = this;

  scope.animateFunction = function(){};
  scope.cameraControls.dispose();
  scope.movementHelper.dispose();
  scene.children = [];
  scene.fog.color.set(0xffffff);
  scene.fog.density = 0;
  renderer.setClearColor(0x0, 1);
  scope.messageBoxHelper.close();
  scope.optionsMenuHelper.close();
};