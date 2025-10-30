import React, { useEffect } from 'react';

const Celebration: React.FC = () => {
  useEffect(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!audioContext) return;

    const playNote = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      
      const volume = 0.3;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02); 
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration - 0.02);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = audioContext.currentTime;
    const fanfare = [
      { freq: 523.25, time: 0, duration: 0.15 }, // C5
      { freq: 659.25, time: 0.15, duration: 0.15 }, // E5
      { freq: 783.99, time: 0.3, duration: 0.15 }, // G5
      { freq: 1046.50, time: 0.45, duration: 0.3 }, // C6
    ];

    fanfare.forEach(note => {
      playNote(note.freq, now + note.time, note.duration);
    });

    return () => {
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
      <style>{`
        .firework {
          position: absolute;
          border-radius: 50%;
          animation: firework-animation 1s ease-out forwards;
          width: 100px;
          height: 100px;
          background: transparent;
        }
        .firework::before, .firework::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: hsl(var(--hue), 100%, 70%);
          box-shadow: 0 0 8px hsl(var(--hue), 100%, 70%), 0 0 15px hsl(var(--hue), 100%, 70%);
          transform: translate(-50%, -50%);
        }
        
        .firework:nth-child(1) { top: 20%; left: 15%; --hue: 350; animation-delay: 0s; }
        .firework:nth-child(2) { top: 40%; left: 80%; --hue: 120; animation-delay: 0.3s; }
        .firework:nth-child(3) { top: 60%; left: 30%; --hue: 240; animation-delay: 0.6s; }

        @keyframes firework-animation {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black/50 p-4 rounded-lg animate-pulse">
        🎉 축하합니다! 🎉
      </div>
    </div>
  );
};

export default Celebration;
