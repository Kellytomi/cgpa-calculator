'use client';

import { useState } from 'react';
import type { Semester } from './CGPACalculator';

interface ExportToolsProps {
  semesters: Semester[];
  cgpa: number;
  totalCredits: number;
  academicStanding: string;
  onClearAll: () => void;
  onExport: () => string;
  onImport: (data: string) => boolean;
}

export function ExportTools({
  semesters,
  cgpa,
  totalCredits,
  academicStanding,
  onClearAll,
  onExport,
  onImport
}: ExportToolsProps) {
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importData, setImportData] = useState('');
  const [importError, setImportError] = useState('');

  const downloadAsJSON = () => {
    const data = onExport();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cgpa-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePrintableReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CGPA Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 40px; }
            .cgpa-box { background: #f0f9ff; border: 2px solid #0ea5e9; padding: 20px; text-align: center; margin: 20px 0; }
            .semester { margin: 20px 0; }
            .course { margin: 10px 0; padding: 10px; background: #f9f9f9; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .summary { background: #f0fdf4; padding: 15px; margin: 20px 0; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>CGPA Calculator Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="cgpa-box">
            <h2>Current CGPA: ${cgpa.toFixed(2)}</h2>
            <p>Academic Standing: <strong>${academicStanding}</strong></p>
            <p>Total Credits: ${totalCredits}</p>
          </div>

          ${semesters.map(semester => `
            <div class="semester">
              <h3>${semester.name}</h3>
              <p>GPA: ${semester.gpa.toFixed(2)} | Credits: ${semester.totalCredits}</p>
              <table>
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Credit Units</th>
                    <th>Grade</th>
                    <th>Grade Points</th>
                    <th>Quality Points</th>
                  </tr>
                </thead>
                <tbody>
                  ${semester.courses.map(course => `
                    <tr>
                      <td>${course.code}</td>
                      <td>${course.name}</td>
                      <td>${course.creditUnits}</td>
                      <td>${course.grade}</td>
                      <td>${course.gradePoints.toFixed(1)}</td>
                      <td>${(course.gradePoints * course.creditUnits).toFixed(1)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}

          <div class="summary">
            <h3>Grade System Used (Nigerian University System)</h3>
            <p>A = 5.0 (70-100%) | B = 4.0 (60-69%) | C = 3.0 (50-59%)</p>
            <p>D = 2.0 (45-49%) | E = 1.0 (40-44%) | F = 0.0 (0-39%)</p>
          </div>

          <div class="no-print">
            <button onclick="window.print()">Print Report</button>
            <button onclick="window.close()">Close</button>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleImport = () => {
    setImportError('');
    if (onImport(importData)) {
      setShowImport(false);
      setImportData('');
    } else {
      setImportError('Invalid JSON format. Please check your data and try again.');
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportData(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Data Management
      </h3>
      
      <div className="space-y-3">
        <button
          onClick={downloadAsJSON}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Export as JSON</span>
        </button>

        <button
          onClick={generatePrintableReport}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Print Report</span>
        </button>

        <button
          onClick={() => setShowImport(true)}
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          <span>Import Data</span>
        </button>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          {showConfirmClear ? (
            <div className="space-y-2">
              <p className="text-sm text-red-600 dark:text-red-400">
                This will permanently delete all your data. This action cannot be undone.
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onClearAll();
                    setShowConfirmClear(false);
                  }}
                  className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear All Data
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="w-full px-4 py-2 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors"
            >
              Clear All Data
            </button>
          )}
        </div>
      </div>

      {/* Import Modal */}
      {showImport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Import Data
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Choose JSON File
                </label>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Or Paste JSON Data
                </label>
                <textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder="Paste your exported JSON data here..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {importError && (
                <p className="text-sm text-red-600 dark:text-red-400">{importError}</p>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowImport(false);
                    setImportData('');
                    setImportError('');
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={!importData.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 