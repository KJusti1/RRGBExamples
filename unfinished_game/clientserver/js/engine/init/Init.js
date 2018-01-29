/*
Author: Kevin Justice
File: Init.js
Date Created: 092016

Initial engine function
*/

defaultFunction = function(){};

var scene, camera, renderer, gCurrent, hermes;

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

scene = new THREE.Scene();
var WIDTH = 1024;//window.innerWidth;
var HEIGHT = 576;//window.innerHeight;
scene.fog = new THREE.FogExp2(0xffffff, 0);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x0, 1);
document.body.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(55, WIDTH / HEIGHT, 0.1, 20000);
camera.zoom = 1.2;

hermes = new Hermes();

function animate(){
  requestAnimationFrame(animate);
  stats.begin();
  gCurrent.animateFunction();
  stats.end();
  renderer.render(scene, camera);
};

requestAnimationFrame(animate);

/*
window.addEventListener('resize', function(){
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
});
*/
