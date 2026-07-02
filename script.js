document.body.classList.add('intro-active');

// ═══════════════════════════════════════════════
//  THREE.JS INTRO GLOBE (3D Landing)
// ═══════════════════════════════════════════════
const introScene = new THREE.Scene();
const introCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const introRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
introRenderer.setSize(window.innerWidth, window.innerHeight);
introRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('intro-canvas-container').appendChild(introRenderer.domElement);

// Create a complex wireframe sphere (Icosahedron)
const introGeo = new THREE.IcosahedronGeometry(2, 4);
const introMat = new THREE.MeshBasicMaterial({
    color: 0x00F2FF,
    wireframe: true,
    transparent: true,
    opacity: 0.15
});
const introGlobe = new THREE.Mesh(introGeo, introMat);
introScene.add(introGlobe);

// Add glowing nodes to the vertices
const nodeGeo = new THREE.BufferGeometry();
const nodePositions = introGeo.attributes.position.array;
nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
const nodeMat = new THREE.PointsMaterial({
    color: 0x7000FF,
    size: 0.05,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});
const introNodes = new THREE.Points(nodeGeo, nodeMat);
introGlobe.add(introNodes);

introCamera.position.z = 5;

// Mouse interaction for intro globe
let introMouseX = 0;
let introMouseY = 0;
let introTargetX = 0;
let introTargetY = 0;

window.addEventListener('mousemove', (e) => {
    if (!document.body.classList.contains('intro-active')) return;
    introTargetX = (e.clientX - window.innerWidth / 2) * 0.001;
    introTargetY = (e.clientY - window.innerHeight / 2) * 0.001;
});

function animateIntro() {
    if (!document.body.classList.contains('intro-active')) return;
    requestAnimationFrame(animateIntro);

    introMouseX += (introTargetX - introMouseX) * 0.05;
    introMouseY += (introTargetY - introMouseY) * 0.05;

    introGlobe.rotation.y += 0.002 + introMouseX;
    introGlobe.rotation.x += 0.001 + introMouseY;

    introRenderer.render(introScene, introCamera);
}

// ═══════════════════════════════════════════════
//  INTRO ANIMATIONS & TRANSITION
// ═══════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
    // Intro elements entrance
    gsap.to('.intro-title', { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.2 });
    gsap.to('.intro-subtitle', { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.5 });
    gsap.to('.btn-intro', { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.8 });
    animateIntro();
});

document.getElementById('enterAppBtn').addEventListener('click', () => {
    // Fade out intro
    const overlay = document.getElementById('intro-overlay');
    overlay.classList.add('hidden');
    document.body.classList.remove('intro-active');

    // Trigger main app animations
    gsap.fromTo('#mainNav', 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
    
    // The main reveal animations are already handled by ScrollTrigger, 
    // but we can animate the background points entering
    gsap.fromTo(points.position, 
        { z: -5, opacity: 0 }, 
        { z: 0, opacity: 1, duration: 2, ease: 'power3.out' }
    );
});

// Resize handler for intro
window.addEventListener('resize', () => {
    if (document.body.classList.contains('intro-active')) {
        introCamera.aspect = window.innerWidth / window.innerHeight;
        introCamera.updateProjectionMatrix();
        introRenderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// ═══════════════════════════════════════════════
//  THREE.JS BACKGROUND GLOBE
// ═══════════════════════════════════════════════
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
const particleCount = 900;
for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 2;
    const y = (Math.random() - 0.5) * 2;
    const z = (Math.random() - 0.5) * 2;
    const d = 1 / Math.sqrt(x * x + y * y + z * z);
    vertices.push(x * d * 1.5, y * d * 1.5, z * d * 1.5);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({ color: 0x00F2FF, size: 0.012, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
const points = new THREE.Points(geometry, material);
scene.add(points);

const lineMat = new THREE.LineBasicMaterial({ color: 0x00F2FF, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending });
const lineGeo = new THREE.BufferGeometry();
const linePos = [];
for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
        const dx = vertices[i * 3] - vertices[j * 3], dy = vertices[i * 3 + 1] - vertices[j * 3 + 1], dz = vertices[i * 3 + 2] - vertices[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 0.28) {
            linePos.push(vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2], vertices[j * 3], vertices[j * 3 + 1], vertices[j * 3 + 2]);
        }
    }
}
lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
points.add(new THREE.LineSegments(lineGeo, lineMat));

const ringGeom = new THREE.TorusGeometry(1.6, 0.005, 16, 100);
const ring = new THREE.Mesh(ringGeom, new THREE.MeshBasicMaterial({ color: 0x00F2FF, transparent: true, opacity: 0.2 }));
ring.rotation.x = Math.PI / 2;
scene.add(ring);
camera.position.z = 3.5;

let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
const mouse = new THREE.Vector2(-10, -10);

// Interactive Hover Map Effects
const raycaster = new THREE.Raycaster();
const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const mouse3D = new THREE.Vector3();

const interactiveLineMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
});
const interactivePositions = new Float32Array(5 * 2 * 3); // 5 lines to connect
const interactiveLineGeo = new THREE.BufferGeometry();
interactiveLineGeo.setAttribute('position', new THREE.BufferAttribute(interactivePositions, 3));
const interactiveLines = new THREE.LineSegments(interactiveLineGeo, interactiveLineMat);
scene.add(interactiveLines);

const cursorMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
);
scene.add(cursorMesh);

window.addEventListener('mousemove', e => {
    targetX = (e.clientX - window.innerWidth / 2) / 1000;
    targetY = (e.clientY - window.innerHeight / 2) / 1000;

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);

    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;

    points.rotation.y += 0.001 + mouseX * 0.2;
    points.rotation.x += 0.0005 + mouseY * 0.2;

    ring.rotation.z += 0.002;
    ring.rotation.x += mouseX * 0.1;

    // Interactive Hover Map logic
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(mousePlane, mouse3D);
    cursorMesh.position.copy(mouse3D);

    const localMouse = mouse3D.clone();
    points.worldToLocal(localMouse);

    const posAttr = points.geometry.attributes.position;
    const distances = [];
    for (let i = 0; i < particleCount; i++) {
        const px = posAttr.getX(i), py = posAttr.getY(i), pz = posAttr.getZ(i);
        distances.push({ x: px, y: py, z: pz, distSq: (px - localMouse.x) ** 2 + (py - localMouse.y) ** 2 + (pz - localMouse.z) ** 2 });
    }

    distances.sort((a, b) => a.distSq - b.distSq);

    let idx = 0;
    for (let i = 0; i < 5; i++) {
        const pt = distances[i];
        const worldPt = new THREE.Vector3(pt.x, pt.y, pt.z);
        points.localToWorld(worldPt);

        interactivePositions[idx++] = mouse3D.x; interactivePositions[idx++] = mouse3D.y; interactivePositions[idx++] = mouse3D.z;
        interactivePositions[idx++] = worldPt.x; interactivePositions[idx++] = worldPt.y; interactivePositions[idx++] = worldPt.z;
    }
    interactiveLineGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}
animate();
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ═══════════════════════════════════════════════
//  GSAP SCROLL ANIMATIONS
// ═══════════════════════════════════════════════
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.reveal').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
        }
    );
});
gsap.to('.hero-content', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    opacity: 0, y: -100
});
gsap.to(points.position, {
    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 },
    z: 1, y: 0.5
});

// ═══════════════════════════════════════════════
//  MOBILE MENU
// ═══════════════════════════════════════════════
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ═══════════════════════════════════════════════
//  "GET STARTED" BUTTON HANDLERS  →  scroll to planner
// ═══════════════════════════════════════════════
function scrollToPlanner() {
    document.getElementById('route-planner').scrollIntoView({ behavior: 'smooth' });
}
['navGetStarted', 'heroGetStarted', 'ctaGetStarted'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', scrollToPlanner);
});
const learnMore = document.getElementById('heroLearnMore');
if (learnMore) learnMore.addEventListener('click', () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
});

// ═══════════════════════════════════════════════
//  CITY GRAPH DATA
//  nodes: { name, x, y }  (x,y in canvas coordinate space 0–1200 × 0–700)
//  edges: [from, to, distance_km]
// ═══════════════════════════════════════════════
const CITIES = {
    'Mumbai': { lat: 19.0760, lng: 72.8777, state: 'Maharashtra' },
    'Pune': { lat: 18.5204, lng: 73.8567, state: 'Maharashtra' },
    'Nashik': { lat: 19.9975, lng: 73.7898, state: 'Maharashtra' },
    'Surat': { lat: 21.1702, lng: 72.8311, state: 'Gujarat' },
    'Ahmedabad': { lat: 23.0225, lng: 72.5714, state: 'Gujarat' },
    'Vadodara': { lat: 22.3072, lng: 73.1812, state: 'Gujarat' },
    'Indore': { lat: 22.7196, lng: 75.8577, state: 'Madhya Pradesh' },
    'Bhopal': { lat: 23.2599, lng: 77.4126, state: 'Madhya Pradesh' },
    'Nagpur': { lat: 21.1458, lng: 79.0882, state: 'Maharashtra' },
    'Hyderabad': { lat: 17.3850, lng: 78.4867, state: 'Telangana' },
    'Bengaluru': { lat: 12.9716, lng: 77.5946, state: 'Karnataka' },
    'Chennai': { lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu' },
    'Delhi': { lat: 28.7041, lng: 77.1025, state: 'Delhi' },
    'Jaipur': { lat: 26.9124, lng: 75.7873, state: 'Rajasthan' },
    'Agra': { lat: 27.1767, lng: 78.0081, state: 'Uttar Pradesh' },
    'Lucknow': { lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh' },
    'Kanpur': { lat: 26.4499, lng: 80.3319, state: 'Uttar Pradesh' },
    'Varanasi': { lat: 25.3176, lng: 82.9739, state: 'Uttar Pradesh' },
    'Patna': { lat: 25.5941, lng: 85.1376, state: 'Bihar' },
    'Kolkata': { lat: 22.5726, lng: 88.3639, state: 'West Bengal' },
    'Bhubaneswar': { lat: 20.2961, lng: 85.8245, state: 'Odisha' },
    'Visakhapatnam': { lat: 17.6868, lng: 83.2185, state: 'Andhra Pradesh' },
    'Raipur': { lat: 21.2514, lng: 81.6296, state: 'Chhattisgarh' },
    'Ranchi': { lat: 23.3441, lng: 85.3096, state: 'Jharkhand' },
    'Guwahati': { lat: 26.1445, lng: 91.7362, state: 'Assam' },
    'Chandigarh': { lat: 30.7333, lng: 76.7794, state: 'Chandigarh' },
    'Amritsar': { lat: 31.6340, lng: 74.8723, state: 'Punjab' },
    'Jodhpur': { lat: 26.2389, lng: 73.0243, state: 'Rajasthan' },
    'Kochi': { lat: 9.9312, lng: 76.2673, state: 'Kerala' },
    'Coimbatore': { lat: 11.0168, lng: 76.9558, state: 'Tamil Nadu' },
};

const EDGES = [
    ['Mumbai', 'Pune', 149],
    ['Mumbai', 'Nashik', 167],
    ['Mumbai', 'Surat', 284],
    ['Surat', 'Vadodara', 98],
    ['Vadodara', 'Ahmedabad', 99],
    ['Ahmedabad', 'Jodhpur', 250],
    ['Jodhpur', 'Jaipur', 335],
    ['Jaipur', 'Delhi', 281],
    ['Delhi', 'Agra', 204],
    ['Delhi', 'Chandigarh', 244],
    ['Chandigarh', 'Amritsar', 229],
    ['Agra', 'Lucknow', 363],
    ['Lucknow', 'Kanpur', 82],
    ['Lucknow', 'Varanasi', 289],
    ['Varanasi', 'Patna', 248],
    ['Patna', 'Kolkata', 600],
    ['Kolkata', 'Bhubaneswar', 440],
    ['Kolkata', 'Ranchi', 390],
    ['Kolkata', 'Guwahati', 990],
    ['Ranchi', 'Patna', 320],
    ['Ranchi', 'Raipur', 430],
    ['Bhubaneswar', 'Visakhapatnam', 450],
    ['Bhubaneswar', 'Raipur', 410],
    ['Raipur', 'Nagpur', 290],
    ['Raipur', 'Visakhapatnam', 510],
    ['Nagpur', 'Bhopal', 355],
    ['Nagpur', 'Hyderabad', 500],
    ['Nashik', 'Indore', 375],
    ['Indore', 'Bhopal', 196],
    ['Indore', 'Ahmedabad', 399],
    ['Bhopal', 'Agra', 404],
    ['Bhopal', 'Delhi', 780],
    ['Hyderabad', 'Chennai', 630],
    ['Hyderabad', 'Bengaluru', 568],
    ['Bengaluru', 'Chennai', 346],
    ['Bengaluru', 'Kochi', 540],
    ['Bengaluru', 'Coimbatore', 360],
    ['Chennai', 'Visakhapatnam', 795],
    ['Kochi', 'Coimbatore', 190],
    ['Pune', 'Hyderabad', 560],
    ['Kanpur', 'Delhi', 490],
    ['Kanpur', 'Bhopal', 410],
    ['Jaipur', 'Indore', 533],
    ['Varanasi', 'Raipur', 780],
];

// Build adjacency list
const graph = {};
Object.keys(CITIES).forEach(c => graph[c] = []);
EDGES.forEach(([a, b, d]) => {
    graph[a].push({ node: b, dist: d });
    graph[b].push({ node: a, dist: d });
});

// Populate state dropdowns
const srcStateSel = document.getElementById('sourceState');
const dstStateSel = document.getElementById('destState');
const srcCitySel = document.getElementById('sourceCity');
const dstCitySel = document.getElementById('destCity');

const states = Object.keys(INDIA_DISTRICTS).sort();
states.forEach(state => {
    srcStateSel.add(new Option(state, state));
    dstStateSel.add(new Option(state, state));
});

function updateDistricts(stateSel, citySel) {
    citySel.innerHTML = '<option value="" disabled selected>Select district</option>';
    if (!stateSel.value) {
        citySel.disabled = true;
        return;
    }
    citySel.disabled = false;
    INDIA_DISTRICTS[stateSel.value].districts.sort().forEach(dist => {
        citySel.add(new Option(dist, dist));
    });
}

srcStateSel.addEventListener('change', () => updateDistricts(srcStateSel, srcCitySel));
dstStateSel.addEventListener('change', () => updateDistricts(dstStateSel, dstCitySel));

// ═══════════════════════════════════════════════
//  DIJKSTRA'S ALGORITHM
// ═══════════════════════════════════════════════
function dijkstra(start, end) {
    const dist = {}, prev = {}, visited = new Set();
    Object.keys(graph).forEach(n => dist[n] = Infinity);
    dist[start] = 0;
    // Min‑priority queue (simple array‑based)
    const queue = [{ node: start, cost: 0 }];

    while (queue.length) {
        queue.sort((a, b) => a.cost - b.cost);
        const { node } = queue.shift();
        if (visited.has(node)) continue;
        visited.add(node);
        if (node === end) break;
        for (const { node: nb, dist: d } of graph[node]) {
            const alt = dist[node] + d;
            if (alt < dist[nb]) {
                dist[nb] = alt;
                prev[nb] = node;
                queue.push({ node: nb, cost: alt });
            }
        }
    }

    if (dist[end] === Infinity) return null;
    const path = [];
    let cur = end;
    while (cur) { path.unshift(cur); cur = prev[cur]; }
    return { path, total: dist[end] };
}

// ═══════════════════════════════════════════════
//  A* ALGORITHM
// ═══════════════════════════════════════════════
function heuristic(a, b) {
    // Euclidean distance between real coordinates
    const dx = CITIES[a].lng - CITIES[b].lng;
    const dy = CITIES[a].lat - CITIES[b].lat;
    return Math.sqrt(dx * dx + dy * dy) * 111; // scale to roughly km
}

function aStar(start, end) {
    const g = {}, f = {}, prev = {}, closed = new Set();
    Object.keys(graph).forEach(n => { g[n] = Infinity; f[n] = Infinity; });
    g[start] = 0;
    f[start] = heuristic(start, end);
    const open = [{ node: start, cost: f[start] }];

    while (open.length) {
        open.sort((a, b) => a.cost - b.cost);
        const { node } = open.shift();
        if (node === end) break;
        if (closed.has(node)) continue;
        closed.add(node);
        for (const { node: nb, dist: d } of graph[node]) {
            if (closed.has(nb)) continue;
            const tentG = g[node] + d;
            if (tentG < g[nb]) {
                g[nb] = tentG;
                f[nb] = tentG + heuristic(nb, end);
                prev[nb] = node;
                open.push({ node: nb, cost: f[nb] });
            }
        }
    }

    if (g[end] === Infinity) return null;
    const path = [];
    let cur = end;
    while (cur) { path.unshift(cur); cur = prev[cur]; }
    return { path, total: Math.round(g[end]) };
}

// ═══════════════════════════════════════════════
//  CANVAS ROUTE VISUALIZATION
// ═══════════════════════════════════════════════
let routeMapScene, routeMapCamera, routeMapRenderer, routeSplines = [], routeParticles = [];
let routeMapInitialized = false;
let routeProjection;

function init3DRouteMap() {
    if (routeMapInitialized) return;
    const container = document.getElementById('route-3d-container');
    const W = container.clientWidth;
    const H = container.clientHeight || 700;

    routeMapScene = new THREE.Scene();
    routeMapScene.background = new THREE.Color(0x050508);
    routeMapScene.fog = new THREE.FogExp2(0x050508, 0.0008);

    routeMapCamera = new THREE.PerspectiveCamera(40, W / H, 1, 5000);
    routeMapCamera.position.set(0, -600, 1000);
    routeMapCamera.lookAt(0, 0, 0);

    routeMapRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    routeMapRenderer.setSize(W, H);
    routeMapRenderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(routeMapRenderer.domElement);

    // D3 Projection: Mercator centered on India
    routeProjection = d3.geoMercator()
        .center([82, 23])
        .scale(1800)
        .translate([0, 0]);

    // Create Map Group
    const mapGroup = new THREE.Group();
    routeMapScene.add(mapGroup);

    // Create Hub Nodes
    const hubGeo = new THREE.CylinderGeometry(5, 5, 2, 24);
    const hubMat = new THREE.MeshBasicMaterial({ color: 0x00F2FF, transparent: true, opacity: 0.6 });
    
    const distPos = [];
    const distColors = [];
    const colorGen = new THREE.Color();

    Object.keys(CITIES).forEach(city => {
        const [x, y] = routeProjection([CITIES[city].lng, CITIES[city].lat]);
        CITIES[city].px = x;
        CITIES[city].py = -y;

        const hub = new THREE.Mesh(hubGeo, hubMat);
        hub.position.set(x, -y, 0);
        hub.rotation.x = Math.PI / 2;
        mapGroup.add(hub);

        let districtCount = 0;
        for (const [dist, h] of Object.entries(DISTRICT_HUB_MAP)) {
            if (h === city) districtCount++;
        }

        for (let i = 0; i < districtCount; i++) {
            const r = Math.random() * 25 + 2;
            const theta = Math.random() * 2 * Math.PI;
            const dx = x + r * Math.cos(theta);
            const dy = -y + r * Math.sin(theta);
            distPos.push(dx, dy, (Math.random() - 0.5) * 5);
            colorGen.setHSL(0.55 + Math.random() * 0.1, 0.9, 0.4 + Math.random() * 0.3);
            distColors.push(colorGen.r, colorGen.g, colorGen.b);
        }
    });

    const distGeo = new THREE.BufferGeometry();
    distGeo.setAttribute('position', new THREE.Float32BufferAttribute(distPos, 3));
    distGeo.setAttribute('color', new THREE.Float32BufferAttribute(distColors, 3));
    const districtPoints = new THREE.Points(distGeo, new THREE.PointsMaterial({ size: 2.5, vertexColors: true, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending }));
    mapGroup.add(districtPoints);

    // Ambient light
    routeMapScene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // Load Real World GeoJSON Map of India (All States)
    fetch('https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson')
        .then(res => res.json())
        .then(data => {
            const mapMat = new THREE.LineBasicMaterial({ color: 0x00f2ff, transparent: true, opacity: 0.3 });
            const shapes = [];

            data.features.forEach(feature => {
                const geometry = feature.geometry;
                if (!geometry) return;
                
                const coords = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
                
                coords.forEach(polygon => {
                    // Create solid shape
                    const shape = new THREE.Shape();
                    const outerRing = polygon[0];
                    
                    outerRing.forEach((coord, i) => {
                        const [x, y] = routeProjection(coord);
                        if (i === 0) shape.moveTo(x, -y);
                        else shape.lineTo(x, -y);
                    });

                    // Add holes if any
                    for (let i = 1; i < polygon.length; i++) {
                        const holeRing = polygon[i];
                        const hole = new THREE.Path();
                        holeRing.forEach((coord, j) => {
                            const [x, y] = routeProjection(coord);
                            if (j === 0) hole.moveTo(x, -y);
                            else hole.lineTo(x, -y);
                        });
                        shape.holes.push(hole);
                    }
                    shapes.push(shape);

                    // Also draw the wireframe line loops for that neon tech effect
                    polygon.forEach(ring => {
                        const pts = [];
                        ring.forEach(coord => {
                            const [x, y] = routeProjection(coord);
                            pts.push(new THREE.Vector3(x, -y, -1)); 
                        });
                        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
                        mapGroup.add(new THREE.LineLoop(lineGeo, mapMat));
                    });
                });
            });

            // Extrude the shapes to create a solid 3D map landmass
            const solidGeo = new THREE.ExtrudeGeometry(shapes, { depth: 4, bevelEnabled: false });
            const solidMat = new THREE.MeshStandardMaterial({ 
                color: 0x070b14, 
                roughness: 0.9, 
                metalness: 0.1 
            });
            const solidMesh = new THREE.Mesh(solidGeo, solidMat);
            solidMesh.position.z = -5; // Sink it slightly below the lines and nodes
            mapGroup.add(solidMesh);
        });

    routeMapInitialized = true;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate particles along splines
        routeParticles.forEach(p => {
            p.progress += p.speed;
            if (p.progress > 1) p.progress = 0;
            const pos = p.curve.getPointAt(p.progress);
            p.mesh.position.copy(pos);
        });

        routeMapRenderer.render(routeMapScene, routeMapCamera);
    }
    animate();

    // Custom Map Interaction (Pan and Zoom)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('pointerdown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
        container.style.cursor = 'grabbing';
    });

    container.addEventListener('pointermove', (e) => {
        if (isDragging) {
            const deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };
            
            // Pan camera opposite to mouse drag
            routeMapCamera.position.x -= deltaMove.x * 2.5;
            routeMapCamera.position.y += deltaMove.y * 2.5;
            
            previousMousePosition = { x: e.offsetX, y: e.offsetY };
        }
    });

    const stopDragging = () => {
        isDragging = false;
        container.style.cursor = 'grab';
    };
    container.addEventListener('pointerup', stopDragging);
    container.addEventListener('pointerleave', stopDragging);
    container.style.cursor = 'grab';

    // Zoom via wheel
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        routeMapCamera.position.z += e.deltaY * 0.8;
        // Clamp zoom
        if (routeMapCamera.position.z < 200) routeMapCamera.position.z = 200;
        if (routeMapCamera.position.z > 2000) routeMapCamera.position.z = 2000;
    });

    // Handle Resize
    window.addEventListener('resize', () => {
        const newW = container.clientWidth;
        routeMapCamera.aspect = newW / H;
        routeMapCamera.updateProjectionMatrix();
        routeMapRenderer.setSize(newW, H);
    });
}

function drawRoute3D(path, algo, startName, endName) {
    if (!routeMapInitialized) init3DRouteMap();

    routeSplines.forEach(s => routeMapScene.remove(s));
    routeParticles.forEach(p => routeMapScene.remove(p.mesh));
    routeSplines = [];
    routeParticles = [];

    const colorHex = algo === 'astar' ? 0xb040ff : 0x00F2FF;
    
    const points = path.map(city => {
        return new THREE.Vector3(CITIES[city].px, CITIES[city].py, 0);
    });

    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i+1];
        const mid = p1.clone().lerp(p2, 0.5);
        mid.z = p1.distanceTo(p2) * 0.25;
        
        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const segments = curve.getPoints(30);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(segments);
        const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: colorHex, linewidth: 2, transparent: true, opacity: 0.8 }));
        routeMapScene.add(line);
        routeSplines.push(line);

        const pMesh = new THREE.Mesh(new THREE.SphereGeometry(3, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: createGlowTexture(colorHex), color: colorHex, transparent: true, blending: THREE.AdditiveBlending }));
        glow.scale.set(30, 30, 1);
        pMesh.add(glow);
        routeMapScene.add(pMesh);
        routeParticles.push({ mesh: pMesh, curve: curve, progress: 0, speed: 0.004 + Math.random() * 0.004 });
    }

    const nodeGeo = new THREE.CylinderGeometry(6, 6, 4, 24);
    const nodeMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.8 });
    
    path.forEach((city, idx) => {
        const isEnd = idx === 0 || idx === path.length - 1;
        const hl = new THREE.Mesh(nodeGeo, nodeMat);
        if (isEnd) {
            hl.scale.set(1.8, 3, 1.8);
            // Add a "Beacon" ring for the start and end
            const ringGeo = new THREE.RingGeometry(12, 14, 32);
            const ringMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.set(CITIES[city].px, CITIES[city].py, 1);
            routeMapScene.add(ring);
            routeSplines.push(ring);
            
            // Pulsing animation for the ring
            gsap.to(ring.scale, { x: 2, y: 2, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
            gsap.to(ring.material, { opacity: 0, duration: 1.5, repeat: -1, ease: "power1.in" });
        }
        hl.position.set(CITIES[city].px, CITIES[city].py, isEnd ? 3 : 1);
        hl.rotation.x = Math.PI / 2;
        routeMapScene.add(hl);
        routeSplines.push(hl);

        let labelText = city;
        if (idx === 0) labelText = "START: " + (startName || city);
        if (idx === path.length - 1) labelText = "END: " + (endName || city);

        const label = createTextSprite(labelText, isEnd ? colorHex : 0xffffff, isEnd ? 38 : 28);
        label.position.set(CITIES[city].px, CITIES[city].py - (isEnd ? 30 : 20), 10);
        routeMapScene.add(label);
        routeSplines.push(label);
    });

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    points.forEach(p => {
        minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
    });
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const size = Math.max(maxX - minX, maxY - minY, 300);

    gsap.to(routeMapCamera.position, { x: centerX, y: centerY - size * 0.4, z: size * 1.2, duration: 1.5, ease: "power3.inOut" });
    routeMapCamera.lookAt(centerX, centerY, 0);
}

function createGlowTexture(colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    const hex = new THREE.Color(colorHex).getHexString();
    grad.addColorStop(0.2, `#${hex}`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,64,64);
    return new THREE.CanvasTexture(canvas);
}

function createTextSprite(text, colorHex, fontSize = 32) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    
    // Add text shadow for readability
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    ctx.fillStyle = '#' + new THREE.Color(colorHex).getHexString();
    ctx.textAlign = 'center';
    ctx.fillText(text, 256, 80);
    const tex = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(150, 37.5, 1);
    return sprite;
}

// ═══════════════════════════════════════════════
//  ALGORITHM TOGGLE
// ═══════════════════════════════════════════════
let selectedAlgo = 'dijkstra';
document.querySelectorAll('.algo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.algo-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAlgo = btn.dataset.algo;
    });
});

// ═══════════════════════════════════════════════
//  FORM SUBMIT
// ═══════════════════════════════════════════════
const routeForm = document.getElementById('routeForm');
routeForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const srcState = document.getElementById('sourceState').value;
    const dstState = document.getElementById('destState').value;
    const srcDist = document.getElementById('sourceCity').value;
    const dstDist = document.getElementById('destCity').value;

    if (!srcState || !dstState || !srcDist || !dstDist) return;

    const srcInput = `${srcDist} (${srcState})`;
    const dstInput = `${dstDist} (${dstState})`;

    const src = DISTRICT_HUB_MAP[srcInput];
    const dst = DISTRICT_HUB_MAP[dstInput];

    if (!CITIES[src] || !CITIES[dst]) {
        alert('Please select a valid district from the list.');
        return;
    }

    if (src === dst) {
        alert('Source and destination map to the same hub city. Please choose locations further apart.');
        return;
    }

    // Show loader
    const btnText = document.querySelector('#findRouteBtn .btn-text');
    const btnLoader = document.querySelector('#findRouteBtn .btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    document.getElementById('findRouteBtn').disabled = true;

    // Small delay for UX
    setTimeout(() => {
        const result = selectedAlgo === 'astar' ? aStar(src, dst) : dijkstra(src, dst);

        btnText.style.display = '';
        btnLoader.style.display = 'none';
        document.getElementById('findRouteBtn').disabled = false;

        if (!result) {
            alert('No route found between those cities. Please choose different cities.');
            return;
        }

        const { path, total } = result;
        const algoName = selectedAlgo === 'astar' ? 'A* Search' : "Dijkstra's";

        // Update badges
        document.getElementById('resultAlgo').textContent = algoName;
        document.getElementById('resultDist').textContent = `${total.toLocaleString()} km`;

        // Path text
        const pathStr = path.join(' → ');
        document.getElementById('resultPathText').innerHTML =
            `<strong>Hello ${name || 'Traveller'}!</strong> Here is your shortest route from <strong>${srcInput}</strong> to <strong>${dstInput}</strong> using <strong>${algoName}</strong>:<br><br>` +
            `📍 <strong>${pathStr}</strong><br><br>` +
            `Total distance: <strong style="color:var(--primary)">${total.toLocaleString()} km</strong> &nbsp;|&nbsp; Stops: <strong>${path.length}</strong>`;

        // Show result section FIRST so the 3D container gets a valid width
        const resultEl = document.getElementById('routeResult');
        resultEl.style.display = 'block';

        // Draw 3D route (Now clientWidth > 0)
        drawRoute3D(path, selectedAlgo, srcDist, dstDist);

        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
});

// ═══════════════════════════════════════════════
//  DOWNLOAD IMAGE (Note: using renderer.domElement)
// ═══════════════════════════════════════════════
document.getElementById('downloadBtn').addEventListener('click', () => {
    if (!routeMapRenderer) return;
    const src = document.getElementById('sourceCity').value;
    const dst = document.getElementById('destCity').value;
    
    // Force a render before capture
    routeMapRenderer.render(routeMapScene, routeMapCamera);
    
    const link = document.createElement('a');
    link.download = `smartroute_${src.replace(/\s+/g, '_')}_to_${dst.replace(/\s+/g, '_')}.jpg`;
    link.href = routeMapRenderer.domElement.toDataURL('image/jpeg', 0.95);
    link.click();
});