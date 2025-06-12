'use client';

import { useState } from 'react';
import { Header } from './Header';
import { SemesterManager } from './SemesterManager';
import { ResultsDisplay } from './ResultsDisplay';
import { ExportTools } from './ExportTools';
import { GradeSystemInfo } from './GradeSystemInfo';
import { useCGPAData } from '../hooks/useCGPAData';

export interface Course {
  id: string;
  name: string;
  code: string;
  creditUnits: number;
  grade: string;
  gradePoints: number;
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
  gpa: number;
  totalCredits: number;
}

export function CGPACalculator() {
  const {
    semesters,
    cgpa,
    totalCredits,
    totalCreditsPassed,
    academicStanding,
    addSemester,
    deleteSemester,
    addCourse,
    updateCourse,
    deleteCourse,
    clearAllData,
    exportData,
    importData
  } = useCGPAData();

  const [showGradeInfo, setShowGradeInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header onShowGradeInfo={() => setShowGradeInfo(true)} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <SemesterManager
              semesters={semesters}
              onAddSemester={addSemester}
              onDeleteSemester={deleteSemester}
              onAddCourse={addCourse}
              onUpdateCourse={updateCourse}
              onDeleteCourse={deleteCourse}
            />
          </div>

          {/* Results Sidebar */}
          <div className="space-y-6">
            <ResultsDisplay
              cgpa={cgpa}
              totalCredits={totalCredits}
              totalCreditsPassed={totalCreditsPassed}
              academicStanding={academicStanding}
              semesters={semesters}
            />
            
            <ExportTools
              semesters={semesters}
              cgpa={cgpa}
              totalCredits={totalCredits}
              academicStanding={academicStanding}
              onClearAll={clearAllData}
              onExport={exportData}
              onImport={importData}
            />
          </div>
        </div>
      </div>

      {/* Grade System Info Modal */}
      {showGradeInfo && (
        <GradeSystemInfo onClose={() => setShowGradeInfo(false)} />
      )}
    </div>
  );
} 