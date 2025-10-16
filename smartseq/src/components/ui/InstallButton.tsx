// import React from 'react';
// import { usePWA } from '../../hooks/usePWA';

export default function InstallButton() {
  // const { isInstallable, isInstalled, installApp } = usePWA();

  // Toujours afficher pour test
  // if (isInstalled || !isInstallable) return null;

  return (
    <button
      // onClick={installApp}
      className="fixed top-4 left-4 z-50 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 text-sm font-semibold"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Installer l'app
    </button>
  );
}