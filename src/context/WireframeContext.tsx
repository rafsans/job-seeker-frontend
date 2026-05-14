import React, { createContext, useContext, useState, useEffect } from 'react';

const WireframeContext = createContext({
  isWireframe: false,
  toggleWireframe: () => {},
});

export const useWireframe = () => useContext(WireframeContext);

export const WireframeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWireframe, setIsWireframe] = useState(false);

  const toggleWireframe = () => setIsWireframe(!isWireframe);

  useEffect(() => {
    if (isWireframe) {
      document.body.classList.add('wireframe-mode');
    } else {
      document.body.classList.remove('wireframe-mode');
    }
  }, [isWireframe]);

  return (
    <WireframeContext.Provider value={{ isWireframe, toggleWireframe }}>
      {children}
      {/* Floating Toggle Button */}
      <button
        onClick={toggleWireframe}
        className="fixed bottom-6 right-6 z-[9999] px-4 py-2 bg-gray-900 text-white rounded-full font-bold shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all border-2 border-white/20"
      >
        <div className={`w-3 h-3 rounded-full ${isWireframe ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
        {isWireframe ? 'High-Fidelity Mode' : 'Wireframe Mode'}
      </button>
    </WireframeContext.Provider>
  );
};
