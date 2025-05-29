import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <QRCodeGenerator />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;