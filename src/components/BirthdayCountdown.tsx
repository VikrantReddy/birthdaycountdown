import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const BirthdayCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [easterEggClicks, setEasterEggClicks] = useState(0);

  // Birthday date: September 18th, 2024 (adjust year as needed)
  const birthdayDate = new Date(2024, 8, 18); // September is month 8 (0-indexed)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      let targetTime = birthdayDate.getTime();
      
      // If birthday has passed this year, set for next year
      if (now > targetTime) {
        targetTime = new Date(2025, 8, 18).getTime();
      }
      
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEasterEggClick = () => {
    setEasterEggClicks(prev => prev + 1);
  };

  const getEnneagramMessage = () => {
    const messages = [
      "✨ Nine types of wonderful, and you're all of them! ✨",
      "🌸 Your personality is as beautiful as cherry blossoms 🌸",
      "💖 Each facet of you sparkles like Disney magic 💖"
    ];
    return messages[easterEggClicks % messages.length];
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-6">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 float sparkle text-2xl">🌟</div>
      <div className="absolute top-20 right-16 float sparkle text-xl" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-20 left-20 float sparkle text-lg" style={{ animationDelay: '2s' }}>🌸</div>

      {/* Main countdown card */}
      <Card 
        className={`relative p-8 gradient-dreamy glow-soft border-none transition-all duration-500 ${
          isHovered ? 'scale-105' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary tracking-wide">
              🎂 Birthday Countdown 🎂
            </h1>
            <p className="text-lg text-muted-foreground">
              Until the magical day arrives...
            </p>
          </div>

          {/* Countdown display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            {[
              { label: 'Days', value: timeLeft.days, icon: '📅' },
              { label: 'Hours', value: timeLeft.hours, icon: '⏰' },
              { label: 'Minutes', value: timeLeft.minutes, icon: '⏱️' },
              { label: 'Seconds', value: timeLeft.seconds, icon: '⚡' }
            ].map((item, index) => (
              <div key={item.label} className="text-center space-y-2">
                <div className="text-2xl">{item.icon}</div>
                <div className="text-3xl font-bold text-primary sparkle" style={{ animationDelay: `${index * 0.5}s` }}>
                  {item.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Disney-inspired message */}
          <div className="space-y-3">
            <p className="text-primary font-medium">
              "All it takes is faith, trust, and a little bit of pixie dust!" ✨
            </p>
            <p className="text-sm text-muted-foreground">
              - Peter Pan
            </p>
          </div>
        </div>
      </Card>

      {/* Easter egg button */}
      <Button
        variant="secondary"
        onClick={handleEasterEggClick}
        className={`transition-all duration-300 ${easterEggClicks > 0 ? 'wiggle' : ''}`}
      >
        {easterEggClicks === 0 ? (
          <>🎭 Discover Your Enneagram Magic</>
        ) : (
          <>🌈 {getEnneagramMessage()}</>
        )}
      </Button>

      {/* Sanrio-style cute messages */}
      {easterEggClicks > 2 && (
        <div className="text-center space-y-2 bounce-cute">
          <div className="text-4xl">🎀</div>
          <p className="text-primary font-medium">
            Hello Kitty says: "You're purrfect just the way you are!" 🐱
          </p>
        </div>
      )}

      {/* Hidden Disney easter egg */}
      {easterEggClicks > 5 && (
        <div className="text-center space-y-2 float">
          <div className="text-4xl">🏰</div>
          <p className="text-primary font-medium">
            "The very things that hold you down are going to lift you up!" 🐘
          </p>
          <p className="text-xs text-muted-foreground">- Dumbo</p>
        </div>
      )}
    </div>
  );
};

export default BirthdayCountdown;