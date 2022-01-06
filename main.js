import * as THREE from '../three/build/three.module.js';
import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js';
import { GUI } from '../three/examples/jsm/libs/lil-gui.module.min.js';
import Stats from '../three/examples/jsm/libs/stats.module.js';

//TEXTURES
const textureLoader = new THREE.TextureLoader();
//terrain
const mossNormal = textureLoader.load('textures/moss/moss_normal.png');
const mossHeight = textureLoader.load('textures/moss/moss_height.png');
const mossRoughness = textureLoader.load('textures/moss/moss_roughness.png');
const mossAo = textureLoader.load('textures/moss/moss_ao.png');
const mossAlbedo = textureLoader.load('textures/moss/moss_albedo.png');
//wall
const brickWallNormal = textureLoader.load('textures/brickWall/brickWall_normal.png');
const brickWallHeight = textureLoader.load('textures/brickWall/brickWall_height.png');
const brickWallRoughness = textureLoader.load('textures/brickWall/brickWall_roughness.png');
const brickWallOcclusion = textureLoader.load('textures/brickWall/brickWall_ao.png');
const brickWallAlbedo = textureLoader.load('textures/brickWall/brickWall_albedo.png');
//toit
const roofNormal = textureLoader.load('textures/roof/roof_normal.png');
const roofHeight = textureLoader.load('textures/roof/roof_height.png');
const roofRoughness = textureLoader.load('textures/roof/roof_roughness.png');
const roofAo = textureLoader.load('textures/roof/roof_ao.png');
const roofAlbedo = textureLoader.load('textures/roof/roof_albedo.png');

//INIT
const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load( "textures/nuages.jpeg" );

const renderer = new THREE.WebGLRenderer({alpha:false,antialias:true});
renderer.setSize( innerWidth, innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.gammaFactor = 5;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio( devicePixelRatio );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 1, 1000 );
camera.position.set( 0, 100, 300 );

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.1);
scene.add( ambientLight );

const terrain = createTerrain( 500, 500 );
scene.add( terrain );

const castle = createCastle();
scene.add( castle );

const sun = createSun();
scene.add(sun);

createHerbs( 0.2, 2.5, 20000 );

const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-300,  -20, 20),
    new THREE.Vector3( -150, 200, 20),
    new THREE.Vector3( 150, 200, 20),
    new THREE.Vector3( 300, -20, 20)
);

const stats = new Stats();
document.body.appendChild(stats.dom);

createControls();
animate();

//FUNCTIONS
function animate( vitesse ) {
    //sunRun
    curve.getPoint((1 * vitesse * .0001) % 1, sun.position);
    stats.update();
    renderer.render( scene, camera ) ;
    requestAnimationFrame( animate );
}

renderer.render( scene, camera ) ;

function createControls()
{
    let gui = new GUI();

    const params = {
        'castle position x' : castle.position.x,
        'castle position y' : castle.position.y,
        'castle position z' : castle.position.z
    };

    gui.add( params, 'castle position x', -100, 100 ).onChange( function ( val )
    {
        castle.position.x = val;
        renderer.render( scene, camera ) ;
    });

    gui.add( params, 'castle position y', 0, 100 ).onChange( function ( val )
    {
        castle.position.y = val;
        renderer.render( scene, camera ) ;
    });

    gui.add( params, 'castle position z', -100, 100 ).onChange( function ( val )
    {
        castle.position.z = val;
        renderer.render( scene, camera ) ;
    });

    gui.open();
}

window.onresize = function () {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( innerWidth, innerHeight );
}

function createHerbs ( width, height, numberOfHerbs ) {
    let herb = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( width, height ),
        new THREE.MeshStandardMaterial(
            {
                color: 0x00AA00
            }
        ))
    herb.material.side = THREE.DoubleSide;
    herb.position.y = height / 2;
    let newHerb;
    for ( let i = 0; i < numberOfHerbs; i++ )
    {
        herb.position.x = Math.floor(Math.random() * ( terrain.geometry.parameters.width )) - ( terrain.geometry.parameters.width / 2 );
        herb.position.z = Math.floor(Math.random() * ( terrain.geometry.parameters.height )) - ( terrain.geometry.parameters.height / 2 );
        newHerb = herb.clone( herb );
        scene.add( newHerb );
    }
}

function createTerrain ( width, height ) {
    let terrain = new THREE.Mesh(
        new THREE.PlaneGeometry( width, height ),
        new THREE.MeshStandardMaterial(
            {
                map: mossAlbedo,
                normalMap: mossNormal,
                displacementMap: mossHeight,
                displacementScale: 0.9,
                roughnessMap: mossRoughness,
                roughness: 0.4,
                aoMap: mossAo,
            }
        ))
    terrain.receiveShadow = true;
    terrain.rotation.x = -Math.PI / 2;

    return terrain;
}

function createWall( width, height, depth ) {
    const wall = new THREE.Mesh(
        new THREE.BoxGeometry( width, height, depth, 10, 100, 100 ),
        new THREE.MeshStandardMaterial(
            {
                map: brickWallAlbedo,
                normalMap: brickWallNormal,
                displacementMap: brickWallHeight,
                displacementScale: 0,
                roughnessMap: brickWallRoughness,
                roughness: 0.8,
                aoMap: brickWallOcclusion,
            }
        ))
    wall.receiveShadow = true;
    wall.position.y = wall.geometry.parameters.height / 2;
    wall.geometry.attributes.uv2 = wall.geometry.attributes.uv;
    return wall;
}

function createTower ( height, width ) {
    const tower = new THREE.Group();

    const tronc = new THREE.Mesh(
        new THREE.CylinderGeometry( width, width, height, 20 ),
        new THREE.MeshStandardMaterial(
            {
                map: brickWallAlbedo,
                normalMap: brickWallNormal,
                displacementMap: brickWallHeight,
                displacementScale: 0,
                roughnessMap: brickWallRoughness,
                roughness: 0.8,
                aoMap: brickWallOcclusion,
            }
        ));
    tronc.receiveShadow = true;
    tronc.position.y = tronc.geometry.parameters.height / 2;
    tronc.geometry.attributes.uv2 = tronc.geometry.attributes.uv;
    tower.add( tronc );

    const roof = new THREE.Mesh(
        new THREE.ConeGeometry( width + width * 0.1 , height/3, 32 ),
        new THREE.MeshStandardMaterial(
            {
                map: roofAlbedo,
                normalMap: roofNormal,
                displacementMap: roofHeight,
                displacementScale: 0,
                roughnessMap: roofRoughness,
                roughness: 0.8,
                aoMap: roofAo,
            }
        ));
    console.log(roof);
    roof.receiveShadow = true;
    roof.position.y = roof.geometry.parameters.height / 2 + height;
    roof.geometry.attributes.uv2 = roof.geometry.attributes.uv;
    tower.add( roof );

    return tower;
}

function createTorch() {
    const torch = new THREE.Group();

    const stick = new THREE.Mesh(
        new THREE.ConeGeometry( 1, 10, 32 ),
        new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load( 'textures/woodT.jpg' )
        }));

    const fire = new THREE.Mesh(
        new THREE.SphereGeometry( 1, 32, 16 ),
        new THREE.MeshBasicMaterial({
            color: 0xffcc66
        }));
    fire.position.set( 0, -5, 0 );

    const fireLight = new THREE.PointLight( 0xffcc66, 2, 40, 2 );
    fireLight.position.set( 0, -5, 0 );
    fireLight.castShadow = true;

    torch.add( stick );
    torch.add( fire );
    torch.add( fireLight );

    torch.rotation.x = Math.PI + Math.PI / 6;
    torch.receiveShadow = true;
    torch.castShadow = true;

    return torch;
}

function createCastle() {
    const castle = new THREE.Group();

    const frontWall = createWall( 8, 15, 30) ;
    frontWall.rotation.y = Math.PI / 2;
    frontWall.position.z += 15;
    castle.add( frontWall );

    const backWall = createWall( 8, 15, 30) ;
    backWall.rotation.y = Math.PI / 2;
    backWall.position.z -= 15;
    castle.add( backWall );

    const leftWall = createWall( 8, 15, 30) ;
    leftWall.position.x -= 15;
    castle.add( leftWall );

    const rightWall = createWall( 8, 15, 30) ;
    rightWall.position.x += 15;
    castle.add( rightWall );

    //Towers
    const frontRightTower = createTower( 25, 5 );
    frontRightTower.position.x += 15;
    frontRightTower.position.z += 15;
    console.log( frontRightTower );
    castle.add( frontRightTower );

    const frontRightTorch = createTorch();
    frontRightTorch.position.x += 19;
    frontRightTorch.position.z += 19;
    frontRightTorch.position.y += 14;
    frontRightTorch.rotation.z = Math.PI / 0.5;
    frontRightTorch.rotation.x = Math.PI / 0.9;
    castle.add( frontRightTorch );

    const frontLeftTower = createTower( 25, 5 );
    frontLeftTower.position.x -= 15;
    frontLeftTower.position.z += 15;
    castle.add( frontLeftTower );

    const frontLeftTorch = createTorch();
    frontLeftTorch.position.x -= 19;
    frontLeftTorch.position.z += 19;
    frontLeftTorch.position.y += 14;
    frontLeftTorch.rotation.z = Math.PI / 0.5;
    frontLeftTorch.rotation.x = Math.PI / 0.9;
    castle.add( frontLeftTorch );

    const backLeftTower = createTower( 25, 5 );
    backLeftTower.position.x -= 15;
    backLeftTower.position.z -= 15;
    castle.add( backLeftTower );

    const donjon = createTower( 35, 10 );
    donjon.position.x += 12;
    donjon.position.z -= 12;
    castle.add( donjon );

    return castle;
}

function createSun()
{
    const sun = new THREE.Group();

    const sunLight = new THREE.DirectionalLight( 0xffcc66, 1 );
    var side = 90;
    sunLight.shadow.camera.top = side;
    sunLight.shadow.camera.bottom = -side;
    sunLight.shadow.camera.left = side;
    sunLight.shadow.camera.right = -side;

    sun.add( sunLight );
    sunLight.castShadow = true;

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5),
    );
    sun.add( sphere );

    return sun;
}