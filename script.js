(function spawnSparkles() {
  const bg = document.getElementById('sparkleBg');
  const colors = ['#87CEEB','#FFB6C1','#ffffff','#FFD700','#b8e4f9','#ffe0e8'];
  for (let i = 0; i < 55; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const size = Math.random() * 8 + 3;
    s.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${size}px;
      height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --dur:${(Math.random()*2+1.5).toFixed(1)}s;
      --delay:-${(Math.random()*3).toFixed(1)}s;
    `;
    bg.appendChild(s);
  }
})();

let cakeClicked = false;

document.getElementById('cakeWrapper').addEventListener('click', () => {
  if (cakeClicked) return;
  cakeClicked = true;

  const blob = document.getElementById('gummyBlob');
  const cake = document.getElementById('cake');

  blob.classList.add('morphing');

  setTimeout(() => {
    blob.style.display = 'none';
    cake.classList.add('appear');
    cake.style.pointerEvents = 'auto';

    setTimeout(() => {
      cake.style.animation = 'cakeAppear 0s forwards';
    }, 900);
  }, 600);
});

function openCard() {
  const entrance = document.getElementById('entrance');
  const wishCard = document.getElementById('wishCard');

  entrance.classList.add('fly-out');

  setTimeout(() => {
    entrance.style.display = 'none';
    wishCard.classList.remove('hidden');
    wishCard.classList.add('slide-in');
    spawnPetals();
  }, 600);
}

function goBack() {
  const entrance = document.getElementById('entrance');
  const wishCard = document.getElementById('wishCard');

  wishCard.classList.add('hidden');
  entrance.style.display = '';
  entrance.classList.remove('fly-out');
}

function spawnPetals() {
  const container = document.getElementById('petals');
  container.innerHTML = '';
  const emojis = ['🌸','🌷','💕','✨','🎀','💖','🌺'];

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const dur  = (Math.random() * 6 + 7).toFixed(1);
    const delay = (Math.random() * 8).toFixed(1);
    const drift = `${Math.random() < 0.5 ? '-' : ''}${(Math.random() * 80 + 20).toFixed(0)}px`;
    p.style.cssText = `
      left:${Math.random()*100}%;
      --dur:${dur}s;
      --delay:-${delay}s;
      --drift:${drift};
      font-size:${(Math.random()*0.8+0.8).toFixed(1)}rem;
    `;
    container.appendChild(p);
  }
}

function setupMusicAutoplay() {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;

  audio.loop = true;
  audio.volume = 1;

  const tryPlay = () => {
    audio.muted = true;
    audio.play().then(() => {
      setTimeout(() => {
        audio.muted = false;
      }, 250);
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('keydown', tryPlay);
    }).catch(() => {
    });
  };

  tryPlay();
  window.addEventListener('load', tryPlay, { once: true });

  const retryDelays = [500, 1200, 2200];
  retryDelays.forEach((delay) => {
    setTimeout(tryPlay, delay);
  });

  document.addEventListener('click', tryPlay, { once: true });
  document.addEventListener('touchstart', tryPlay, { once: true });
  document.addEventListener('keydown', tryPlay, { once: true });

  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });
}

document.addEventListener('DOMContentLoaded', setupMusicAutoplay);


