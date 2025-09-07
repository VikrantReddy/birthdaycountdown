import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DayPage from './DayPage';
import { dailyContent } from '@/data/dailyContent';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const BirthdayCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);

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
        const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
        
        setTimeLeft({
          days: daysLeft,
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });

        // Calculate current day (10 days before = day 0, birthday = day 10)
        const day = Math.max(0, Math.min(10, 10 - daysLeft));
        setCurrentDay(day);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentDayContent = () => {
    return dailyContent.find(content => content.day === currentDay) || dailyContent[0];
  };

  const isDayUnlocked = (day: number) => {
    return day <= currentDay;
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

      {/* Daily unlockable content */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Daily Birthday Magic
          </h2>
          <p className="text-muted-foreground">
            Day {currentDay} of 10 • {timeLeft.days === 0 ? "It's your birthday! 🎉" : `${timeLeft.days} days until the big day!`}
          </p>
        </div>
        
        <DayPage
          day={currentDay}
          affirmation={getCurrentDayContent().affirmation}
          gift={getCurrentDayContent().gift}
          isUnlocked={isDayUnlocked(currentDay)}
        />
        
        {/* Previous days indicator */}
        {currentDay > 0 && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Previous magical days:
            </p>
            <div className="flex justify-center space-x-2">
              {Array.from({ length: currentDay }, (_, i) => (
                <div key={i} className="text-lg">
                  🎁✨
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayCountdown;