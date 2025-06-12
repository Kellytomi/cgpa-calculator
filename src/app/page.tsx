'use client';

import { CGPACalculator } from './components/CGPACalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <CGPACalculator />
    </main>
  );
}
