import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('white')
			const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({
                 antialias: true
            });
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 0.95;
             renderer.outputEncoding = THREE.sRGBEncoding;

             const controls = new OrbitControls( camera, renderer.domElement )
             controls.maxDistance = 8;
controls.minDistance = 2;
controls.enableDamping = true;
controls.dampingFactor = 0.035
controls.maxPolarAngle = Math.PI /2.1

let textureloader = new THREE.TextureLoader()

let texturematerial = new THREE.MeshStandardMaterial({
    map: textureloader.load('images/wood.jpg')
})

function colors(material){
     document.querySelectorAll('.color-item').forEach((el,i) =>{

         el.addEventListener('click', (e) =>{

            if(e.target.id){
                texturematerial.map = textureloader.load(e.target.id)
                 scene.getObjectByName('furniture').material = texturematerial
  
               }
  
             if(e.target.style.background){
                scene.getObjectByName('furniture').material = material

              material.color.set(new THREE.Color(e.target.style.background))

             }

          

         })

     })
}

let mainmaterial

const loader = new GLTFLoader()
loader.load('model.glb', (gltf) =>{
     let model = gltf.scene
     scene.add(model)



     model.traverse((child) =>{

         if(child.material){

            if(child.material.name == 'main-color'){
             mainmaterial = child.material
            }     
         }

     })

     colors(mainmaterial)
})

			camera.position.z = 6;
            camera.position.y = 3


            window.addEventListener('resize', function()

            {
        
            renderer.setSize( window.innerWidth,  window.innerHeight );
            camera.aspect =  window.innerWidth /  window.innerHeight;
            camera.updateProjectionMatrix();
            } );

            new RGBELoader().load('https://assets.codepen.io/7014830/studio.hdr',function(texture){
texture.mapping = THREE.EquirectangularReflectionMapping;

   scene.environment = texture;
   scene.background = texture;
})

			function animate() {
				requestAnimationFrame( animate );

	           controls.update()		
      
				renderer.render( scene, camera );
			};

			animate();