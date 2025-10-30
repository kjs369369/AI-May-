import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl" role="img" aria-label="globe">🌐</span>
          <h1 className="text-xl md:text-2xl font-bold text-blue-500">
            AI 외국어 여행 회화
          </h1>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg text-slate-600 text-sm">
          <h2 className="font-bold mb-2">👋 안녕하세요!</h2>
          <p>이 앱은 여러분의 성공적인 해외 여행을 위한 필수 회화 도우미입니다.</p>
          <p className="mt-1"><strong className="text-blue-500">사용 방법:</strong> 배우고 싶은 언어를 선택하고, 매일 새로운 표현을 익혀보세요. 스피커 아이콘을 눌러 원어민 발음도 확인할 수 있습니다. 준비가 되면 퀴즈에 도전해보세요!</p>
        </div>
      </div>
    </header>
  );
};

export default Header;