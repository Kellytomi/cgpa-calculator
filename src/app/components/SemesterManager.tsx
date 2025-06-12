'use client';

import { useState } from 'react';
import type { Course, Semester } from './CGPACalculator';
import { CourseInput } from './CourseInput';

interface SemesterManagerProps {
  semesters: Semester[];
  onAddSemester: () => void;
  onDeleteSemester: (semesterId: string) => void;
  onAddCourse: (semesterId: string) => void;
  onUpdateCourse: (semesterId: string, courseId: string, updates: Partial<Course>) => void;
  onDeleteCourse: (semesterId: string, courseId: string) => void;
}

export function SemesterManager({
  semesters,
  onAddSemester,
  onDeleteSemester,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse
}: SemesterManagerProps) {
  const [expandedSemesters, setExpandedSemesters] = useState<Set<string>>(new Set());

  const toggleSemester = (semesterId: string) => {
    setExpandedSemesters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(semesterId)) {
        newSet.delete(semesterId);
      } else {
        newSet.add(semesterId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Academic Records
        </h2>
        <button
          onClick={onAddSemester}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Semester</span>
        </button>
      </div>

      {semesters.length === 0 ? (
        <div className="text-center py-8 md:py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No semesters added yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 px-4">
            Start by adding your first semester to track your academic progress.
          </p>
          <button
            onClick={onAddSemester}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Add Your First Semester
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {semesters.map((semester) => (
            <div
              key={semester.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleSemester(semester.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      aria-label={expandedSemesters.has(semester.id) ? "Collapse semester" : "Expand semester"}
                    >
                      <svg
                        className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${
                          expandedSemesters.has(semester.id) ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      {semester.name}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="text-right">
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">GPA</div>
                      <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        {semester.gpa.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Credits</div>
                      <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        {semester.totalCredits}
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteSemester(semester.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete semester"
                      aria-label="Delete semester"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {expandedSemesters.has(semester.id) && (
                <div className="p-3 sm:p-4 space-y-4">
                  {semester.courses.map((course) => (
                    <CourseInput
                      key={course.id}
                      course={course}
                      onUpdate={(updates: Partial<Course>) => onUpdateCourse(semester.id, course.id, updates)}
                      onDelete={() => onDeleteCourse(semester.id, course.id)}
                    />
                  ))}
                  
                  <button
                    onClick={() => onAddCourse(semester.id)}
                    className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Course</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 