import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Fireworks from '@/components/Fireworks';
import confetti from 'canvas-confetti';

const Birthday = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Continuous confetti celebration
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#FFB6C1', '#FFC0CB', '#FFCCCB', '#FFD700', '#FF69B4', '#87CEEB', '#DDA0DD']
      });
    }, 2000);

    // Show message with delay
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    // Initial big confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFB6C1', '#FFC0CB', '#FFCCCB', '#FFD700', '#FF69B4', '#87CEEB', '#DDA0DD']
      });
    }, 500);

    return () => {
      clearInterval(confettiInterval);
      clearTimeout(messageTimer);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-glow opacity-40"></div>
      <Fireworks />
      
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 float sparkle text-4xl">🎉</div>
      <div className="absolute top-20 right-16 float sparkle text-3xl" style={{ animationDelay: '1s' }}>🎂</div>
      <div className="absolute bottom-20 left-20 float sparkle text-3xl" style={{ animationDelay: '2s' }}>🌟</div>
      <div className="absolute top-40 right-40 float sparkle text-4xl" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-40 right-20 float sparkle text-3xl" style={{ animationDelay: '1.5s' }}>🎈</div>
      <div className="absolute top-60 left-40 float sparkle text-4xl" style={{ animationDelay: '2.5s' }}>🌸</div>

      {/* Main birthday content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <Card className={`p-12 gradient-dreamy glow-soft border-none transition-all duration-1000 ${
          showMessage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          <div className="space-y-8">
            {/* Main hero text */}
            <div className="space-y-6">
              <div className="text-6xl md:text-8xl font-bold text-primary leading-tight">
                <div className="sparkle" style={{ animationDelay: '0s' }}>🎂</div>
                <div className="mt-4">Happy Birthday!</div>
                <div className="sparkle" style={{ animationDelay: '1s' }}>🎉</div>
              </div>
              
              <div className="text-2xl md:text-4xl font-medium text-primary leading-relaxed max-w-4xl mx-auto">
                To one of the best people I've ever met
              </div>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center space-x-6 text-4xl md:text-6xl">
              <span className="float sparkle" style={{ animationDelay: '0s' }}>🌟</span>
              <span className="float sparkle" style={{ animationDelay: '0.5s' }}>💖</span>
              <span className="float sparkle" style={{ animationDelay: '1s' }}>✨</span>
              <span className="float sparkle" style={{ animationDelay: '1.5s' }}>🎈</span>
              <span className="float sparkle" style={{ animationDelay: '2s' }}>🌸</span>
            </div>

            {/* Special birthday message */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <p className="text-lg text-primary font-medium">
                "Today you are you, that is truer than true. There is no one alive who is youer than you!" ✨
              </p>
              <p className="text-sm text-muted-foreground">
                - Dr. Seuss
              </p>
            </div>

            {/* Birthday wishes */}
            <div className="space-y-3 max-w-3xl mx-auto">
              <p className="text-primary text-lg leading-relaxed">
                May your special day be filled with Disney magic, Sanrio sweetness, 
                and all the wonderful qualities that make you absolutely amazing! 🌈
              </p>
              <div className="text-4xl">🎀💕🧚‍♀️</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Birthday;