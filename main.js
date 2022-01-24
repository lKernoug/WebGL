import * as THREE from './three/build/three.module.js';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';
import { GUI } from './examples/jsm/libs/lil-gui.module.min.js';
import Stats from './three/examples/jsm/libs/stats.module.js';
import { FBXLoader } from './three/examples/jsm/loaders/FBXLoader.js';

const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', createControls );
///INIT
const overlay = document.getElementById( 'overlay' );
overlay.remove();
//SOUND
let analyser1, analyser2, analyser3;
//StartButton

//TEXTURES
const textureLoader = new THREE.TextureLoader();
//arbre
const treeMaterial = textureLoader.load('textures/tree/texture-tronc-arbre-bouchent_23-2148189581.jpg');
const leafMaterial = textureLoader.load('textures/tree/istockphoto-690390010-170667a.jpg');
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





const scene = new THREE.Scene();
let mixer;
let mixer2;
const clock = new THREE.Clock();
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

const listener = new THREE.AudioListener();
camera.add( listener );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.1);
scene.add( ambientLight );

const terrain = createTerrain( 1000, 1000 );
scene.add( terrain );

const castle = createCastle();
scene.add( castle );

const characters = importCharacter();
scene.add( characters);

const sun = createSun();
scene.add(sun);

//AJOUT DES ARBRES

        const tronc = createTrunc(2, 2, 80, 64);
        scene.add(tronc);
        tronc.receiveShadow= true;
        tronc.position.x = 138;
        tronc.position.z = -24;
        const feuille = createLeaf(138, 40, -24);
        scene.add(feuille);
        const tronc2 = createTrunc(2, 2, 80, 64);
        scene.add(tronc2);
        tronc2.position.x = 108;
        tronc2.position.z = -37;
        const feuille2 = createLeaf(108, 40, -37);
        scene.add(feuille2);
        const tronc3 = createTrunc(2, 2, 80, 64);
        scene.add(tronc3);
        tronc3.position.x = 167;
        tronc3.position.z = -26;
        const feuille3 = createLeaf(167, 40, -26);
        scene.add(feuille3);
        const tronc4 = createTrunc(2, 2, 80, 64);
        scene.add(tronc4);
        tronc4.position.x = 130;
        tronc4.position.z = 18;
        const feuille4 = createLeaf(130, 40, 18);
        scene.add(feuille4);
        const tronc5 = createTrunc(2, 2, 80, 64);
        scene.add(tronc5);
        tronc5.position.x = 167;
        tronc5.position.z = 40;
        const feuille5 = createLeaf(167, 42, 40);
        scene.add(feuille5);
        const tronc6 = createTrunc(2, 2, 80, 64);
        scene.add(tronc6);
        tronc6.position.x = 167;
        tronc6.position.z = 11;
        const feuille6 = createLeaf(167, 42, 11);
        scene.add(feuille6);
        const tronc7 = createTrunc(2, 2, 80, 64);
        scene.add(tronc7);
        tronc7.receiveShadow= true;
        tronc7.position.x = -138;
        tronc7.position.z = -24;
        const feuille7 = createLeaf(-138, 40, -24);
        scene.add(feuille7);
        const tronc8 = createTrunc(2, 2, 80, 64);
        scene.add(tronc8);
        tronc8.position.x = -108;
        tronc8.position.z = -37;
        const feuille8 = createLeaf(-108, 40, -37);
        scene.add(feuille8);
        const tronc9 = createTrunc(2, 2, 80, 64);
        scene.add(tronc9);
        tronc9.position.x = -167;
        tronc9.position.z = -26;
        const feuille9 = createLeaf(-167, 40, -26);
        scene.add(feuille9);
        const tronc10 = createTrunc(2, 2, 80, 64);
        scene.add(tronc10);
        tronc10.position.x = -130;
        tronc10.position.z = 18;
        const feuille10 = createLeaf(-130, 40, 18);
        scene.add(feuille10);
        const tronc11 = createTrunc(2, 2, 80, 64);
        scene.add(tronc11);
        tronc11.position.x = -167;
        tronc11.position.z = 40;
        const feuille11 = createLeaf(-167, 42, 40);
        scene.add(feuille11);
        const tronc12 = createTrunc(2, 2, 80, 64);
        scene.add(tronc12);
        tronc12.position.x = -167;
        tronc12.position.z = 11;
        const feuille12 = createLeaf(-167, 42, 11);
        scene.add(feuille12);


const sound1 = new THREE.PositionalAudio( listener );
const songElement = document.getElementById( 'song' );
sound1.setMediaElementSource( songElement );
sound1.setRefDistance( 200 );
songElement.play();
tronc.add( sound1 );

//createHerbs( 0.2, 2.5, 20000 );

const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-550,  -20, 0),
    new THREE.Vector3( -150, 400, 20),
    new THREE.Vector3( 150, 400, 20),
    new THREE.Vector3( 550, -20, 100)
);

const stats = new Stats();
document.body.appendChild(stats.dom);



createControls();
animate();

//FUNCTIONS
function animate( vitesse ) {
    //sunRun
    curve.getPoint((1 * vitesse * .0001) % 1, sun.position);
    
    renderer.render( scene, camera ) ;
    requestAnimationFrame( animate );
    const delta = clock.getDelta();

    if ( mixer ) mixer.update( delta );
     if ( mixer2 ) mixer2.update( delta );
    renderer.render( scene, camera ) ;
    stats.update();
}



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

function createLeaf(large, haut, prof){
    let leaf = new THREE.Mesh(
        new THREE.DodecahedronGeometry(11, 1),
        new THREE.MeshStandardMaterial(
            {
                map: leafMaterial,
                normalMap: leafMaterial,
                displacementMap: leafMaterial,
                displacementScale: 0.9,
                roughnessMap: leafMaterial,
                roughness: 0.4,
                aoMap: mossAo,
            }
        )
    )
    leaf.position.x = large;
    leaf.position.y = haut;
    leaf.position.z = prof;

    leaf.receiveShadow = true;
    return leaf;
}

function createTrunc(radiusTop, radiusBot, height, radialSegments){
    //const geometree = new THREE.CylinderGeometry(5, 5, 19, 64);
    
    let trunc = new THREE.Mesh(
        new THREE.CylinderGeometry(radiusTop, radiusBot, height, radialSegments),
        new THREE.MeshStandardMaterial(
            {
                map: treeMaterial,
                normalMap: treeMaterial,
                displacementMap: treeMaterial,
                displacementScale: 0.9,
                roughnessMap: treeMaterial,
                roughness: 0.4,
                aoMap: mossAo,
            }
        ))

        /*let leaf = new THREE.Mesh(
            new THREE.DodecahedronGeometry(11, 1),
            new THREE.MeshStandardMaterial(
                {
                    map: leafMaterial,
                    normalMap: leafMaterial,
                    displacementMap: leafMaterial,
                    displacementScale: 0.9,
                    roughnessMap: leafMaterial,
                    roughness: 0.4,
                    aoMap: mossAo,
                }
            )
        )*/

        
            
        trunc.receiveShadow= true;
        return trunc;
        
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

    const frontWall = createWall( 16, 80, 120) ;
    frontWall.rotation.y = Math.PI / 2;
    frontWall.position.z += 30;
    castle.add( frontWall );

    const backWall = createWall( 16, 80, 120) ;
    backWall.rotation.y = Math.PI / 2;
    backWall.position.z -= 30;
    castle.add( backWall );

    const leftWall = createWall( 16, 80, 60) ;
    leftWall.position.x -= 60;
    castle.add( leftWall );

    const rightWall = createWall( 16, 80, 60) ;
    rightWall.position.x += 60;
    castle.add( rightWall );

    //Towers
    const frontRightTower = createTower( 100, 20 );
    frontRightTower.position.x += 65;
    frontRightTower.position.z += 45;
    console.log( frontRightTower );
    castle.add( frontRightTower );

    const frontRightTorch = createTorch();
    frontRightTorch.position.x += 65;
    frontRightTorch.position.z += 67;
    frontRightTorch.position.y += 28;
    frontRightTorch.rotation.z = Math.PI / 0.5;
    frontRightTorch.rotation.x = Math.PI / 0.9;
    castle.add( frontRightTorch );

    const frontLeftTower = createTower( 100, 20 );
    frontLeftTower.position.x -= 65;
    frontLeftTower.position.z += 45;
    castle.add( frontLeftTower );

    const frontLeftTorch = createTorch();
    frontLeftTorch.position.x -= 65;
    frontLeftTorch.position.z += 67;
    frontLeftTorch.position.y += 28;
    frontLeftTorch.rotation.z = Math.PI / 0.5;
    frontLeftTorch.rotation.x = Math.PI / 0.9;
    castle.add( frontLeftTorch );

    const backLeftTower = createTower( 100, 20 );
    backLeftTower.position.x -= 65;
    backLeftTower.position.z -= 45;
    castle.add( backLeftTower );

    const donjon = createTower( 120, 30 );
    donjon.position.x += 42;
    donjon.position.z -= 42;
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
function importCharacter(){
   
    const loader = new FBXLoader();
                    loader.load( 'models/test2.fbx', function ( humanoid ) { //on appelle la fonction object lorsque la ressource est chargée

                        mixer2 = new THREE.AnimationMixer( humanoid ); //initialisation de l'animation

                        const action2 = mixer2.clipAction( humanoid.animations[ 0 ] ); //dans variable actione, on clip action l'animation contenue dans mixer
                        action2.play();

                        humanoid.traverse( function ( child ) {//exécute un call back sur object et tous ses descendants

                            if ( child.isMesh ) {

                                child.castShadow = true;
                                child.receiveShadow = true;

                            }

                        } );
                        humanoid.scale.x = 0.3;
                        humanoid.scale.y = 0.3;
                        humanoid.scale.z = 0.3;
                        humanoid.position.x = 50;
                        
                        scene.add( humanoid );

                    } );

    const loader2 = new FBXLoader();
                    loader.load( 'models/UnarmedWalkForward.fbx', function ( man ) { //on appelle la fonction object lorsque la ressource est chargée

                        mixer = new THREE.AnimationMixer( man ); //initialisation de l'animation

                        const action = mixer.clipAction( man.animations[ 0 ] ); //dans variable actione, on clip action l'animation contenue dans mixer
                        action.play();

                        man.traverse( function ( child2 ) {//exécute un call back sur object et tous ses descendants

                            if ( child2.isMesh ) {

                                child2.castShadow = true;
                                child2.receiveShadow = true;

                            }

                        } );
                        
                        man.position.x = -150;
                        
                        scene.add( man );
                        man.scale.x = 0.3;
                        man.scale.y = 0.3;
                        man.scale.z = 0.3;

                    } );
}

