import BirthdayCountdown from '@/components/BirthdayCountdown';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 gradient-glow opacity-30"></div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 float">
            ✨ Magical Birthday ✨
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A dreamy countdown filled with Disney magic, Sanrio sweetness, and enneagram wisdom 💖
          </p>
        </div>
        
        <BirthdayCountdown />
        
        {/* Footer with soft decoration */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex justify-center space-x-4 text-2xl">
            <span className="float sparkle" style={{ animationDelay: '0s' }}>🌟</span>
            <span className="float sparkle" style={{ animationDelay: '0.5s' }}>🎂</span>
            <span className="float sparkle" style={{ animationDelay: '1s' }}>🎉</span>
            <span className="float sparkle" style={{ animationDelay: '1.5s' }}>💖</span>
            <span className="float sparkle" style={{ animationDelay: '2s' }}>✨</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Made with love and sprinkled with pixie dust 🧚‍♀️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
