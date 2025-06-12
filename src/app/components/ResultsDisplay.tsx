'use client';

import type { Semester } from './CGPACalculator';

interface ResultsDisplayProps {
  cgpa: number;
  totalCredits: number;
  totalCreditsPassed: number;
  academicStanding: string;
  semesters: Semester[];
}

export function ResultsDisplay({
  cgpa,
  totalCredits,
  totalCreditsPassed,
  academicStanding,
  semesters
}: ResultsDisplayProps) {
  const getStandingColor = (standing: string) => {
    switch (standing) {
      case 'First Class':
        return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800';
      case 'Second Class Upper':
        return 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800';
      case 'Second Class Lower':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'Third Class':
        return 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800';
      case 'Pass':
        return 'text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800';
      case 'Fail':
        return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-700';
    }
  };

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 4.5) return 'text-green-600 dark:text-green-400';
    if (cgpa >= 3.5) return 'text-blue-600 dark:text-blue-400';
    if (cgpa >= 2.4) return 'text-yellow-600 dark:text-yellow-400';
    if (cgpa >= 1.5) return 'text-orange-600 dark:text-orange-400';
    if (cgpa >= 1.0) return 'text-purple-600 dark:text-purple-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Main CGPA Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Current CGPA
          </h3>
          <div className={`text-4xl font-bold mb-2 ${getCGPAColor(cgpa)}`}>
            {cgpa.toFixed(2)}
          </div>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStandingColor(academicStanding)}`}>
            {academicStanding}
          </div>
        </div>
      </div>

      {/* Credit Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Credit Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Credits</span>
            <span className="font-semibold text-gray-900 dark:text-white">{totalCredits}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Credits Passed</span>
            <span className="font-semibold text-green-600 dark:text-green-400">{totalCreditsPassed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Credits Failed</span>
            <span className="font-semibold text-red-600 dark:text-red-400">{totalCredits - totalCreditsPassed}</span>
          </div>
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Pass Rate</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalCredits > 0 ? ((totalCreditsPassed / totalCredits) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Semester Breakdown */}
      {semesters.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Semester Breakdown
          </h3>
          <div className="space-y-3">
            {semesters.map((semester) => (
              <div key={semester.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {semester.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {semester.courses.length} course{semester.courses.length !== 1 ? 's' : ''} • {semester.totalCredits} credits
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${getCGPAColor(semester.gpa)}`}>
                    {semester.gpa.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">GPA</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grade Distribution */}
      {semesters.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Grade Distribution
          </h3>
          <div className="space-y-2">
            {(() => {
              const allCourses = semesters.flatMap(s => s.courses);
              const gradeCount = {
                A: allCourses.filter(c => c.grade === 'A').length,
                B: allCourses.filter(c => c.grade === 'B').length,
                C: allCourses.filter(c => c.grade === 'C').length,
                D: allCourses.filter(c => c.grade === 'D').length,
                E: allCourses.filter(c => c.grade === 'E').length,
                F: allCourses.filter(c => c.grade === 'F').length,
              };
              const total = allCourses.length;

              return Object.entries(gradeCount).map(([grade, count]) => {
                const percentage = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={grade} className="flex items-center space-x-3">
                    <div className="w-8 text-center font-medium text-gray-900 dark:text-white">
                      {grade}
                    </div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          grade === 'A' ? 'bg-green-500' :
                          grade === 'B' ? 'bg-blue-500' :
                          grade === 'C' ? 'bg-yellow-500' :
                          grade === 'D' ? 'bg-orange-500' :
                          grade === 'E' ? 'bg-red-500' : 'bg-red-700'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm text-gray-600 dark:text-gray-400">
                      {count}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Academic Goals
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Progress to First Class (4.50)</span>
              <span className="text-gray-900 dark:text-white">{Math.min(100, (cgpa / 4.5) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (cgpa / 4.5) * 100)}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Progress to Second Class Upper (3.50)</span>
              <span className="text-gray-900 dark:text-white">{Math.min(100, (cgpa / 3.5) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (cgpa / 3.5) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 