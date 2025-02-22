import * as THREE from 'three';
import { gsap } from 'gsap';

// Time Portal Animation
const canvas = document.getElementById('timePortal');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const geometry = new THREE.TorusGeometry(5, 2, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0x00f3ff,
  wireframe: true
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 15;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  renderer.render(scene, camera);
}

animate();

// Flip Book
const book = document.querySelector('.book');
const pages = document.querySelectorAll('.page');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentPage = 0;

function updateBook() {
  pages.forEach((page, index) => {
    if (index === currentPage) {
      page.style.transform = 'rotateY(0deg)';
    } else if (index < currentPage) {
      page.style.transform = 'rotateY(-180deg)';
    } else {
      page.style.transform = 'rotateY(0deg) translateX(100%)';
    }
  });
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updateBook();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < pages.length - 1) {
    currentPage++;
    updateBook();
  }
});

// Contact form animations
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
  const input = group.querySelector('input, textarea, select');
  if (input) {
    input.addEventListener('focus', () => {
      group.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        group.classList.remove('focused');
      }
    });
  }
});

// Form submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.submit-btn');
  btn.innerHTML = 'Message Sent!';
  btn.style.background = '#00f3ff';
  
  setTimeout(() => {
    btn.innerHTML = '<span>Send Message</span><div class="btn-particles"></div>';
    btn.style.background = 'linear-gradient(45deg, var(--neon-blue), var(--neon-purple))';
    form.reset();
  }, 2000);
});

// Responsive canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
