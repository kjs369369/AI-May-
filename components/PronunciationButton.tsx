import React from 'react';

interface PronunciationButtonProps {
  text: string;
  lang: string;
  className?: string;
}

const PronunciationButton: React.FC<PronunciationButtonProps> = ({ text, lang, className }) => {
  const handlePlay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent card click events
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any currently playing utterance
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('죄송합니다, 이 브라우저에서는 음성 합성을 지원하지 않습니다.');
    }
  };

  return (
    <button
      onClick={handlePlay}
      aria-label={`${text} 발음 듣기`}
      title={`${text} 발음 듣기`}
      className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
    </button>
  );
};

export default PronunciationButton;
