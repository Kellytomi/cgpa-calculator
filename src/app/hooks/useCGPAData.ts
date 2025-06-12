'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Course, Semester } from '../components/CGPACalculator';

// Nigerian University Grade System
const GRADE_SYSTEM = {
  'A': 5.0,
  'B': 4.0,
  'C': 3.0,
  'D': 2.0,
  'E': 1.0,
  'F': 0.0
};

// Academic Standing Classifications
const getAcademicStanding = (cgpa: number): string => {
  if (cgpa >= 4.50) return 'First Class';
  if (cgpa >= 3.50) return 'Second Class Upper';
  if (cgpa >= 2.40) return 'Second Class Lower';
  if (cgpa >= 1.50) return 'Third Class';
  if (cgpa >= 1.00) return 'Pass';
  return 'Fail';
};

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export function useCGPAData() {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('cgpa-calculator-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setSemesters(parsed.semesters || []);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever semesters change
  useEffect(() => {
    localStorage.setItem('cgpa-calculator-data', JSON.stringify({ semesters }));
  }, [semesters]);

  // Calculate GPA for a semester
  const calculateGPA = useCallback((courses: Course[]): number => {
    const totalPoints = courses.reduce((sum, course) => sum + (course.gradePoints * course.creditUnits), 0);
    const totalCredits = courses.reduce((sum, course) => sum + course.creditUnits, 0);
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }, []);

  // Calculate semester stats and overall CGPA in real-time
  const semestersWithCalculations = semesters.map(semester => ({
    ...semester,
    gpa: calculateGPA(semester.courses),
    totalCredits: semester.courses.reduce((sum, course) => sum + course.creditUnits, 0)
  }));

  // Calculate overall CGPA
  const cgpa = semestersWithCalculations.length > 0 ? 
    semestersWithCalculations.reduce((sum, semester) => sum + (semester.gpa * semester.totalCredits), 0) /
    semestersWithCalculations.reduce((sum, semester) => sum + semester.totalCredits, 0) || 0 : 0;

  // Calculate total credits
  const totalCredits = semestersWithCalculations.reduce((sum, semester) => sum + semester.totalCredits, 0);
  const totalCreditsPassed = semestersWithCalculations.reduce((sum, semester) => 
    sum + semester.courses.filter(course => course.gradePoints > 0).reduce((s, course) => s + course.creditUnits, 0), 0);

  // Get academic standing
  const academicStanding = getAcademicStanding(cgpa);

  // Add new semester
  const addSemester = useCallback(() => {
    const newSemester: Semester = {
      id: generateId(),
      name: `Semester ${semesters.length + 1}`,
      courses: [],
      gpa: 0,
      totalCredits: 0
    };
    setSemesters(prev => [...prev, newSemester]);
  }, [semesters.length]);

  // Delete semester
  const deleteSemester = useCallback((semesterId: string) => {
    setSemesters(prev => prev.filter(s => s.id !== semesterId));
  }, []);

  // Add course to semester
  const addCourse = useCallback((semesterId: string) => {
    const newCourse: Course = {
      id: generateId(),
      name: '', // Optional - not used in UI anymore
      code: '',
      creditUnits: 3,
      grade: 'A',
      gradePoints: GRADE_SYSTEM['A']
    };

    setSemesters(prev => prev.map(semester => 
      semester.id === semesterId 
        ? { ...semester, courses: [...semester.courses, newCourse] }
        : semester
    ));
  }, []);

  // Update course
  const updateCourse = useCallback((semesterId: string, courseId: string, updates: Partial<Course>) => {
    setSemesters(prev => prev.map(semester => 
      semester.id === semesterId 
        ? {
            ...semester,
            courses: semester.courses.map(course => 
              course.id === courseId 
                ? { 
                    ...course, 
                    ...updates,
                    gradePoints: updates.grade ? GRADE_SYSTEM[updates.grade as keyof typeof GRADE_SYSTEM] : course.gradePoints
                  }
                : course
            )
          }
        : semester
    ));
  }, []);

  // Delete course
  const deleteCourse = useCallback((semesterId: string, courseId: string) => {
    setSemesters(prev => prev.map(semester => 
      semester.id === semesterId 
        ? { ...semester, courses: semester.courses.filter(c => c.id !== courseId) }
        : semester
    ));
  }, []);

  // Clear all data
  const clearAllData = useCallback(() => {
    setSemesters([]);
    localStorage.removeItem('cgpa-calculator-data');
  }, []);

  // Export data
  const exportData = useCallback(() => {
    const data = {
      semesters,
      cgpa,
      totalCredits,
      academicStanding,
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }, [semesters, cgpa, totalCredits, academicStanding]);

  // Import data
  const importData = useCallback((jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.semesters && Array.isArray(parsed.semesters)) {
        setSemesters(parsed.semesters);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  return {
    semesters: semestersWithCalculations,
    setSemesters,
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
    importData,
    GRADE_SYSTEM
  };
} 