'use client';

interface GradeSystemInfoProps {
  onClose: () => void;
}

export function GradeSystemInfo({ onClose }: GradeSystemInfoProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Nigerian University Grade System
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Grade Scale */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Grade Scale & Points
            </h3>
            <div className="space-y-3">
              {[
                { grade: 'A', points: '5.0', percentage: '70-100%', description: 'Excellent', color: 'green' },
                { grade: 'B', points: '4.0', percentage: '60-69%', description: 'Very Good', color: 'blue' },
                { grade: 'C', points: '3.0', percentage: '50-59%', description: 'Good', color: 'yellow' },
                { grade: 'D', points: '2.0', percentage: '45-49%', description: 'Fair', color: 'orange' },
                { grade: 'E', points: '1.0', percentage: '40-44%', description: 'Pass', color: 'red' },
                { grade: 'F', points: '0.0', percentage: '0-39%', description: 'Fail', color: 'red' },
              ].map(({ grade, points, percentage, description, color }) => (
                <div
                  key={grade}
                  className={`p-4 rounded-lg border ${
                    color === 'green' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                    color === 'blue' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' :
                    color === 'yellow' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
                    color === 'orange' ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' :
                    'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {grade}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {points} Points
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {percentage}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Standing */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Academic Standing Classifications
            </h3>
            <div className="space-y-3">
              {[
                { standing: 'First Class', range: '4.50 - 5.00', description: 'Outstanding academic performance', color: 'green' },
                { standing: 'Second Class Upper', range: '3.50 - 4.49', description: 'Very good academic performance', color: 'blue' },
                { standing: 'Second Class Lower', range: '2.40 - 3.49', description: 'Good academic performance', color: 'yellow' },
                { standing: 'Third Class', range: '1.50 - 2.39', description: 'Satisfactory academic performance', color: 'orange' },
                { standing: 'Pass', range: '1.00 - 1.49', description: 'Minimum passing grade', color: 'purple' },
                { standing: 'Fail', range: 'Below 1.00', description: 'Academic probation/failure', color: 'red' },
              ].map(({ standing, range, description, color }) => (
                <div
                  key={standing}
                  className={`p-4 rounded-lg border ${
                    color === 'green' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                    color === 'blue' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' :
                    color === 'yellow' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
                    color === 'orange' ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' :
                    color === 'purple' ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' :
                    'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                  }`}
                >
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    {standing}
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    CGPA: {range}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Formula */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            How CGPA is Calculated
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Quality Points</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quality Points = Grade Points × Credit Units
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Example: A grade (5.0 points) in a 3-credit course = 5.0 × 3 = 15 quality points
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Semester GPA</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                GPA = Total Quality Points ÷ Total Credit Units
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cumulative GPA (CGPA)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                CGPA = Sum of all Quality Points ÷ Sum of all Credit Units
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
            💡 Tips for Students
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <li>• Focus on courses with higher credit units as they have more impact on your CGPA</li>
            <li>• Aim for consistent performance across all semesters</li>
            <li>• Retake failed courses (F grades) to improve your CGPA</li>
            <li>• Use this calculator to plan your academic goals and track progress</li>
            <li>• Regularly monitor your performance to stay on track for your desired classification</li>
          </ul>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
} 