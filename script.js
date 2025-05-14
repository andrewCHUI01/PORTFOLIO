// Initialize AOS
AOS.init({ duration: 1000 });

// Dark Mode
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'dark') body.classList.add('dark');

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Soul Mode
const soulModeToggle = document.getElementById('soul-mode');
let soulModeActive = false;
const soulAudio = new Audio('sounds/soul-mode.mp3');
const rumiQuotes = [
    "The universe is not outside of you. Look inside yourself; everything that you want, you already are.",
    "Let the beauty of what you love be what you do.",
    "Beyond ideas of wrongdoing and rightdoing, there is a field. I’ll meet you there.",
    "You were born with wings, why prefer to crawl through life?",
    "The wound is the place where the light enters you."
];
if (soulModeToggle) {
    soulModeToggle.addEventListener('click', () => {
        soulModeActive = !soulModeActive;
        console.log('Soul Mode:', soulModeActive); // Debug
        if (soulModeActive) {
            body.classList.add('soul-mode');
            soulAudio.play().catch(e => console.error('Audio error:', e));
            soulAudio.loop = true;
            const quote = rumiQuotes[Math.floor(Math.random() * rumiQuotes.length)];
            alert(`Rumi says: "${quote}"`);
        } else {
            body.classList.remove('soul-mode');
            soulAudio.pause();
            soulAudio.currentTime = 0;
        }
    });
}

// WebGL Canvas (Home Page Stars)
if (document.getElementById('webgl-canvas')) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let i = 0; i < 200; i++) {
        const star = new THREE.Mesh(geometry, material);
        star.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50);
        scene.add(star);
    }
    camera.position.z = 50;
    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();
}

// 3D Project Gallery
if (document.getElementById('project-canvas')) {
    const projects = [
        {
            name: "MY-WEBSITE",
            description: "A personal website showcasing my early web dev skills.",
            url: "https://andrewchui01.github.io/MY-WEBSITE/",
            image: "images/my-website.jpg"
        },
        {
            name: "TechTrend",
            description: "A cosmic ecommerce platform with 432Hz Vibe Mode.",
            url: "https://ecommerce-website-navy-omega.vercel.app/",
            image: "images/techtrend.jpg"
        },
        {
            name: "Spiritual App UI",
            description: "A mockup for a meditation app with 432Hz audio integration.",
            url: "#",
            image: "images/spiritual-app.jpg"
        }
    ];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('project-canvas'), alpha: true });
    renderer.setSize(window.innerWidth, 600);

    const projectMeshes = [];
    projects.forEach((project, i) => {
        const geometry = new THREE.PlaneGeometry(3, 2);
        let texture;
        try {
            texture = new THREE.TextureLoader().load(project.image);
        } catch (e) {
            console.error('Image load error:', project.image, e);
            texture = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1516321318428-742bbec3f781');
        }
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(i * 4 - 4, 0, 0);
        scene.add(mesh);
        projectMeshes.push({ mesh, project });
    });

    camera.position.z = 5;
    function animate() {
        requestAnimationFrame(animate);
        projectMeshes.forEach(({ mesh }) => {
            mesh.rotation.y += 0.01;
        });
        renderer.render(scene, camera);
    }
    animate();

    const projectDetails = document.getElementById('project-details');
    renderer.domElement.addEventListener('click', (event) => {
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / 600) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(projectMeshes.map(m => m.mesh));
        if (intersects.length > 0) {
            const selected = projectMeshes.find(m => m.mesh === intersects[0].object).project;
            projectDetails.innerHTML = `
                <h3 class="text-2xl font-bold">${selected.name}</h3>
                <p class="my-4">${selected.description}</p>
                <a href="${selected.url}" target="_blank" class="btn bg-purple-500 text-white px-4 py-2 rounded-full">Visit Project</a>
            `;
        }
    });
}

// Cosmic Skill Tree
if (document.getElementById('skill-tree')) {
    const skills = [
        { name: "HTML", x: 0, y: 0 },
        { name: "CSS", x: 2, y: 1 },
        { name: "JavaScript", x: 2, y: -1 },
        { name: "Python", x: -2, y: 1 },
        { name: "SQL", x: -2, y: -1 },
        { name: "Startups", x: 0, y: 2 }
    ];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('skill-tree'), alpha: true });
    renderer.setSize(window.innerWidth, 600);

    skills.forEach(skill => {
        const geometry = new THREE.SphereGeometry(0.3, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x8B5CF6 });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(skill.x, skill.y, 0);
        scene.add(sphere);
    });

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8B5CF6 });
    const lines = [
        [[0, 0, 0], [2, 1, 0]],
        [[0, 0, 0], [2, -1, 0]],
        [[0, 0, 0], [-2, 1, 0]],
        [[0, 0, 0], [-2, -1, 0]],
        [[0, 0, 0], [0, 2, 0]]
    ];
    lines.forEach(line => {
        const points = [];
        points.push(new THREE.Vector3(line[0][0], line[0][1], line[0][2]));
        points.push(new THREE.Vector3(line[1][0], line[1][1], line[1][2]));
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMesh = new THREE.Line(geometry, lineMaterial);
        scene.add(lineMesh);
    });

    camera.position.z = 5;
    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();
}

// Contact Form
if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent! I’ll hit you up on WhatsApp.');
        e.target.reset();
    });
}

// Cosmic Cursor Trail
const cursorCanvas = document.createElement('canvas');
cursorCanvas.id = 'cursor-trail';
document.body.appendChild(cursorCanvas);
const ctx = cursorCanvas.getContext('2d');
cursorCanvas.width = window.innerWidth;
cursorCanvas.height = window.innerHeight;
const particles = [];
const maxParticles = 20;

function createParticle(x, y) {
    particles.push({
        x,
        y,
        size: Math.random() * 5 + 2,
        alpha: 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.alpha -= 0.02;
        particle.size *= 0.98;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.alpha})`;
        ctx.fill();

        if (particle.alpha <= 0) particles.splice(index, 1);
    });
    requestAnimationFrame(animateParticles);
}

document.addEventListener('mousemove', (e) => {
    if (particles.length < maxParticles) createParticle(e.clientX, e.clientY);
});
animateParticles();

// Typing Animation
const subtitle = document.getElementById('subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    setTimeout(type, 500);
}