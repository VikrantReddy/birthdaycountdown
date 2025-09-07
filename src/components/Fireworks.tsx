import { useEffect } from 'react';

const Fireworks = () => {
  useEffect(() => {
    const createFirework = () => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      
      // Random position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2;
      
      firework.style.left = `${x}px`;
      firework.style.top = `${y}px`;
      
      // Random colors
      const colors = ['#FFB6C1', '#FFC0CB', '#FFD700', '#FF69B4', '#87CEEB', '#DDA0DD', '#98FB98'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      firework.style.setProperty('--firework-color', color);
      
      document.body.appendChild(firework);
      
      // Remove after animation
      setTimeout(() => {
        if (document.body.contains(firework)) {
          document.body.removeChild(firework);
        }
      }, 2000);
    };

    // Create fireworks at intervals
    const interval = setInterval(createFirework, 800);
    
    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(createFirework, i * 300);
    }

    return () => {
      clearInterval(interval);
      // Clean up any remaining fireworks
      const fireworks = document.querySelectorAll('.firework');
      fireworks.forEach(fw => {
        if (document.body.contains(fw)) {
          document.body.removeChild(fw);
        }
      });
    };
  }, []);

  return null;
};

export default Fireworks;