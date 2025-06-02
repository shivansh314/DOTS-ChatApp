import React from "react";

const AuthImagePattern = () => {
  // Generate dots with random positions and delays
  const dots = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));

  const pulsingDots = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (i % 4) * 25 + 12.5,
    y: Math.floor(i / 4) * 33.33 + 16.66,
    delay: i * 0.2,
  }));

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black overflow-hidden rounded-2xl">
      {/* Background floating dots */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-white opacity-10"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animation: `float ${dot.duration}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}

      {/* Central pattern with pulsing dots */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-48">
          {pulsingDots.map((dot) => (
            <div
              key={dot.id}
              className="absolute w-4 h-4 bg-gradient-to-r from-gray-400 to-slate-300 rounded-full shadow-lg"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${dot.delay}s`,
              }}
            />
          ))}

          {/* Connecting lines animation */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#9ca3af", stopOpacity: 0.6 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#6b7280", stopOpacity: 0.2 }}
                />
              </linearGradient>
            </defs>
            {/* Animated connecting lines */}
            <line
              x1="12.5%"
              y1="16.66%"
              x2="37.5%"
              y2="16.66%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse"
            />
            <line
              x1="37.5%"
              y1="16.66%"
              x2="62.5%"
              y2="50%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <line
              x1="62.5%"
              y1="50%"
              x2="87.5%"
              y2="83.33%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <line
              x1="12.5%"
              y1="83.33%"
              x2="37.5%"
              y2="50%"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
          </svg>
        </div>
      </div>

      {/* Orbiting dots around the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 h-80">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-white to-gray-300 rounded-full"
              style={{
                animation: `orbit 8s linear infinite`,
                animationDelay: `${i * 1}s`,
                transformOrigin: "150px 150px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Glowing effect overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-500/5 to-transparent" />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.3;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(156, 163, 175, 0.8);
          }
          50% {
            transform: scale(1.3);
            box-shadow: 0 0 20px rgba(156, 163, 175, 1),
              0 0 30px rgba(107, 114, 128, 0.6);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;
