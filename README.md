# 🎓 CGPA Calculator - Nigerian University Grade System

A modern, responsive web application for calculating CGPA (Cumulative Grade Point Average) specifically designed for Nigerian university students. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

### 📊 Core Functionality
- **Real-time CGPA Calculation** - Instant updates as you input or modify grades
- **Multiple Semester Management** - Add, edit, and organize courses across different semesters
- **Nigerian University Grade System** - Built-in support for the standard Nigerian grading scale (A=5.0 to F=0.0)
- **Academic Standing Classification** - Automatic classification (First Class, Second Class Upper, etc.)

### 📱 User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Mode** - Toggle between themes with persistent preference
- **Intuitive Interface** - Easy-to-use forms and collapsible semester views
- **Real-time Validation** - Input validation and error handling

### 📈 Analytics & Insights
- **Grade Distribution Charts** - Visual representation of your academic performance
- **Progress Tracking** - Monitor progress toward academic goals (First Class, Second Class Upper)
- **Semester Breakdown** - Individual GPA calculation for each semester
- **Credit Summary** - Track total credits attempted, passed, and failed

### 💾 Data Management
- **Local Storage** - Your data is saved automatically in your browser
- **Export Functionality** - Download your academic records as JSON or printable PDF reports
- **Import/Export** - Transfer data between devices or backup your records
- **Clear Data Option** - Reset all data with confirmation prompts

### 📋 Additional Features
- **Grade System Information** - Built-in help modal explaining the Nigerian grading system
- **Quality Points Calculation** - Shows detailed breakdown of how grades are calculated
- **Course Management** - Add/remove courses with credit units and grades
- **Academic Tips** - Helpful guidance for students

## 🚀 Technology Stack

- **Frontend**: Next.js 15.3.3 with React 19
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS v4 for modern, responsive design
- **State Management**: React Hooks with localStorage persistence
- **Build Tool**: Next.js with optimized production builds
- **Deployment Ready**: Optimized for Vercel, Netlify, or any static hosting

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cgpa-calculator.git
   cd cgpa-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Getting Started
1. **Add Your First Semester** - Click "Add Semester" to create your first academic semester
2. **Add Courses** - Click "Add Course" within a semester to input course details
3. **Enter Course Information**:
   - Course name (e.g., "Introduction to Computer Science")
   - Course code (e.g., "CSC 101")
   - Credit units (1-6)
   - Grade (A, B, C, D, E, F)
4. **View Results** - Your CGPA and academic standing update in real-time

### Nigerian Grade System
- **A = 5.0 points** (70-100%) - Excellent
- **B = 4.0 points** (60-69%) - Very Good  
- **C = 3.0 points** (50-59%) - Good
- **D = 2.0 points** (45-49%) - Fair
- **E = 1.0 points** (40-44%) - Pass
- **F = 0.0 points** (0-39%) - Fail

### Academic Standing
- **First Class**: 4.50 - 5.00
- **Second Class Upper**: 3.50 - 4.49
- **Second Class Lower**: 2.40 - 3.49
- **Third Class**: 1.50 - 2.39
- **Pass**: 1.00 - 1.49
- **Fail**: Below 1.00

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── app/
│   ├── components/          # React components
│   │   ├── CGPACalculator.tsx
│   │   ├── Header.tsx
│   │   ├── SemesterManager.tsx
│   │   ├── CourseInput.tsx
│   │   ├── ResultsDisplay.tsx
│   │   ├── ExportTools.tsx
│   │   └── GradeSystemInfo.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useCGPAData.ts
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── public/                  # Static assets
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style (TypeScript + ESLint)
2. Write meaningful commit messages
3. Test your changes on different devices/browsers
4. Update documentation if needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- [ ] Grade prediction tool
- [ ] Semester comparison charts  
- [ ] Goal-setting features
- [ ] Academic calendar integration
- [ ] Multi-university support
- [ ] Course recommendation system
- [ ] Performance analytics
- [ ] Student community features

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/cgpa-calculator/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about the problem

## 🙏 Acknowledgments

- Built for Nigerian university students
- Inspired by the need for accessible academic tracking tools
- Thanks to the open-source community for the amazing tools and libraries

---

**Made with ❤️ for Nigerian university students**

*Calculate your CGPA with confidence and track your academic journey!*
