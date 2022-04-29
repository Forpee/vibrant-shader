import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')
// Loader
const loader = new GLTFLoader()
loader.load('/model/scene.gltf', (gltf) => {
    // gltf.scene.position.y += -0.2
    // gltf.scene.geometry.center()
    gltf.scene.scale.set(0.01, 0.01, 0.01)
    scene.add(gltf.scene)
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.geometry.center()
            child.material = material
        }
    })

})
// Scene
const scene = new THREE.Scene()

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.SphereBufferGeometry(0.5, 32, 32)

// Material
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide
})

// Mesh
const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
/**
 * Lights
 */
// Ambient
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)
// Directional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 1, 1)
// scene.add(directionalLight)
// directional light helpers
const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(dlHelper)
// Directional light camera helpers
const dlCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(dlCameraHelper)
/**
 * Camera
 */
// Orthographic camera
// const camera = new THREE.OrthographicCamera(-1/2, 1/2, 1/2, -1/2, 0.1, 100)

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x111111, 1)
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    // Update controls
    controls.update()

    // Get elapsedtime
    const elapsedTime = clock.getElapsedTime()

    // Update uniforms
    material.uniforms.uTime.value = elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()