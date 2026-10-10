/* 3D scene, welcome experience, and existing WhatsApp contact flow */
const $ = (selector) => document.querySelector(selector);

// Welcome screen: the name stays only in this browser (localStorage), never sent anywhere.
const gate = $('#welcomeGate');
const greeting = $('#visitorGreeting');
const savedName = localStorage.getItem('sauravPortfolioVisitor');
function enterPortfolio(name = '') {
  const cleanName = name.trim().replace(/[<>]/g, '').slice(0, 32);
  if (cleanName) localStorage.setItem('sauravPortfolioVisitor', cleanName);
  const displayName = cleanName || localStorage.getItem('sauravPortfolioVisitor');
  greeting.textContent = displayName ? `WELCOME, ${displayName.toUpperCase()}` : 'WELCOME, EXPLORER';
  gate.classList.add('is-hidden');
  document.body.style.overflow = '';
}
document.body.style.overflow = 'hidden';
if (savedName) $('#visitorName').value = savedName;
$('#welcomeForm').addEventListener('submit', (event) => { event.preventDefault(); enterPortfolio($('#visitorName').value); });
$('#skipWelcome').addEventListener('click', () => enterPortfolio());

// Mobile navigation
const menuToggle = $('#menuToggle'); const navLinks = $('#navLinks');
menuToggle.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open); });
document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }));

// Preserve the original WhatsApp contact flow.
const contactForm = $('#contactForm'); const formStatus = $('#formStatus'); const WHATSAPP_PHONE = '918451844016';
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = $('#name').value.trim(), email = $('#email').value.trim(), message = $('#message').value.trim();
  if (!name || !email || !message) { formStatus.textContent = 'Please complete all fields before sending.'; return; }
  const text = ['Hello Saurav,', '', `Name: ${name}`, `Email: ${email}`, '', 'Message:', message].join('\n');
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  formStatus.textContent = 'WhatsApp is open — tap Send to deliver your message.'; contactForm.reset();
});

$('#year').textContent = new Date().getFullYear();
$('#topButton').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Lightweight three.js particle universe. It pauses with reduced-motion preference.
if (window.THREE && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const canvas = $('#scene'); const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(56, 1, .1, 100); camera.position.z = 8;
  const group = new THREE.Group(); scene.add(group);
  const geometry = new THREE.IcosahedronGeometry(1.35, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x8878ef, wireframe: true, transparent: true, opacity: .22 });
  const core = new THREE.Mesh(geometry, material); core.position.set(3.2, .5, -2.2); group.add(core);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, .012, 8, 100), new THREE.MeshBasicMaterial({ color: 0xd3ff62, transparent: true, opacity: .26 })); ring.position.copy(core.position); ring.rotation.x = 1.1; group.add(ring);
  const particleCount = innerWidth < 650 ? 80 : 190; const pos = new Float32Array(particleCount * 3);
  for (let i = 0; i < pos.length; i += 3) { pos[i] = (Math.random() - .5) * 18; pos[i + 1] = (Math.random() - .5) * 14; pos[i + 2] = (Math.random() - .5) * 7 - 2; }
  const particles = new THREE.BufferGeometry(); particles.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(particles, new THREE.PointsMaterial({ color: 0xc9c2ff, size: .025, transparent: true, opacity: .72 })));
  let pointerX = 0, pointerY = 0; window.addEventListener('pointermove', (e) => { pointerX = e.clientX / innerWidth - .5; pointerY = e.clientY / innerHeight - .5; $('#cursorGlow').style.transform = `translate(${e.clientX}px,${e.clientY}px)`; });
  function resize() { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight, false); } resize(); addEventListener('resize', resize);
  function loop(time) { group.rotation.y += .0022; group.rotation.x = Math.sin(time * .00035) * .14; group.position.x += (pointerX * .7 - group.position.x) * .025; group.position.y += (-pointerY * .55 - group.position.y) * .025; ring.rotation.z += .004; renderer.render(scene, camera); requestAnimationFrame(loop); } requestAnimationFrame(loop);
}

// Interactive skill cards steer the visual color; scroll reveals keep the page calm.
document.querySelectorAll('.skill-card').forEach((card) => card.addEventListener('mouseenter', () => { card.style.setProperty('--skill-color', card.dataset.color); document.documentElement.style.setProperty('--violet', card.dataset.color); }));
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('show'); observer.unobserve(entry.target); } }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
const sections = document.querySelectorAll('main section[id]'); const navItems = document.querySelectorAll('.nav-links a');
addEventListener('scroll', () => { let current = 'home'; sections.forEach((section) => { if (scrollY >= section.offsetTop - 150) current = section.id; }); navItems.forEach((item) => item.classList.toggle('active', item.getAttribute('href') === `#${current}`)); }, { passive: true });
