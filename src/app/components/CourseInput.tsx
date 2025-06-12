'use client';

import { useState } from 'react';
import type { Course } from './CGPACalculator';

const GRADES = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
const CREDIT_OPTIONS = [1, 2, 3, 4, 5, 6];

interface CourseInputProps {
  course: Course;
  onUpdate: (updates: Partial<Course>) => void;
  onDelete: () => void;
}

export function CourseInput({ course, onUpdate, onDelete }: CourseInputProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800';
      case 'B': return 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800';
      case 'C': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'D': return 'text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800';
      case 'E': return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800';
      case 'F': return 'text-red-800 bg-red-100 border-red-300 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-700';
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Course Name
          </label>
          <input
            type="text"
            value={course.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="e.g., Introduction to Computer Science"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Course Code
          </label>
          <input
            type="text"
            value={course.code}
            onChange={(e) => onUpdate({ code: e.target.value })}
            placeholder="e.g., CSC 101"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Credit Units
          </label>
          <select
            value={course.creditUnits}
            onChange={(e) => onUpdate({ creditUnits: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {CREDIT_OPTIONS.map(credit => (
              <option key={credit} value={credit}>{credit}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Grade
          </label>
          <select
            value={course.grade}
            onChange={(e) => onUpdate({ grade: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium ${getGradeColor(course.grade)}`}
          >
            {GRADES.map(grade => (
              <option key={grade} value={grade} className="text-gray-900 dark:text-white">
                {grade} ({grade === 'A' ? '5.0' : grade === 'B' ? '4.0' : grade === 'C' ? '3.0' : grade === 'D' ? '2.0' : grade === 'E' ? '1.0' : '0.0'})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Grade Points
          </label>
          <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium">
            {course.gradePoints.toFixed(1)}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Quality Points: <span className="font-medium">{(course.gradePoints * course.creditUnits).toFixed(1)}</span>
        </div>
        
        <div className="flex space-x-2">
          {showConfirmDelete ? (
            <div className="flex space-x-2">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Delete course"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 