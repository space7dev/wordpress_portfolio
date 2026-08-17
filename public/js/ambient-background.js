const particleCanvas = document.querySelector('[data-particle-canvas]');

if (particleCanvas) {
  const context = particleCanvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointer = { x: 0, y: 0 };
  let particles = [];
  let animationFrame;

  function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    particleCanvas.width = window.innerWidth * pixelRatio;
    particleCanvas.height = window.innerHeight * pixelRatio;
    particleCanvas.style.width = `${window.innerWidth}px`;
    particleCanvas.style.height = `${window.innerHeight}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    const count = Math.min(150, Math.floor((window.innerWidth * window.innerHeight) / 9000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.3 + 0.2,
      speed: Math.random() * 0.16 + 0.04,
      alpha: Math.random() * 0.65 + 0.2
    }));
  }

  function drawParticles() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle) => {
      particle.y -= particle.speed;
      if (particle.y < -4) particle.y = window.innerHeight + 4;
      context.beginPath();
      context.arc(particle.x + pointer.x, particle.y + pointer.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(216, 180, 254, ${particle.alpha})`;
      context.fill();
    });
    if (!reducedMotion) animationFrame = window.requestAnimationFrame(drawParticles);
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('pointermove', (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 8;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 8;
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.cancelAnimationFrame(animationFrame);
    else if (!reducedMotion) drawParticles();
  });

  resizeCanvas();
  drawParticles();
}

