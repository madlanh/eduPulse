import { Course, LearningStyle, StudentProfile, StudentData } from './types';

export const INITIAL_PROFILE: StudentProfile = {
  id: "s1",
  email: "alex@student.university.ac.id",
  name: "Alex Johnson",
  major: "Computer Science",
  semester: 4,
  gpa: 3.2,
  learningStyle: LearningStyle.VISUAL,
  interests: ["Artificial Intelligence", "Web Development", "Game Design"],
  weaknesses: ["Advanced Calculus", "Time Management"]
};

export const INITIAL_COURSES: Course[] = [
  { id: '1', name: 'Data Structures & Algorithms', grade: 88, credits: 4, category: 'Core' },
  { id: '2', name: 'Calculus II', grade: 65, credits: 3, category: 'Core' },
  { id: '3', name: 'Introduction to Psychology', grade: 92, credits: 3, category: 'Elective' },
  { id: '4', name: 'Database Management', grade: 78, credits: 3, category: 'Core' },
  { id: '5', name: 'Physics I', grade: 72, credits: 4, category: 'Core' },
];

export const MOCK_STUDENTS_DB: StudentData[] = [
  {
    profile: INITIAL_PROFILE,
    courses: INITIAL_COURSES
  },
  {
    profile: {
      id: "s2",
      email: "sarah@student.university.ac.id",
      name: "Sarah Wijaya",
      major: "Medicine",
      semester: 6,
      gpa: 3.85,
      learningStyle: LearningStyle.READING_WRITING,
      interests: ["Anatomy", "Public Health", "Research"],
      weaknesses: ["Clinical Practice Stress", "Sleep Schedule"]
    },
    courses: [
      { id: '101', name: 'Human Anatomy', grade: 95, credits: 4, category: 'Core' },
      { id: '102', name: 'Pathology', grade: 88, credits: 4, category: 'Core' },
      { id: '103', name: 'Biochemistry', grade: 92, credits: 3, category: 'Core' },
      { id: '104', name: 'Medical Ethics', grade: 85, credits: 2, category: 'Elective' }
    ]
  },
  {
    profile: {
      id: "s3",
      email: "budi@student.university.ac.id",
      name: "Budi Santoso",
      major: "Mechanical Engineering",
      semester: 2,
      gpa: 2.4,
      learningStyle: LearningStyle.KINESTHETIC,
      interests: ["Robotics", "Automotive", "3D Printing"],
      weaknesses: ["Theoretical Physics", "Calculus", "Writing Reports"]
    },
    courses: [
      { id: '201', name: 'Calculus I', grade: 55, credits: 4, category: 'Core' },
      { id: '202', name: 'Physics Mechanics', grade: 60, credits: 4, category: 'Core' },
      { id: '203', name: 'Engineering Drawing', grade: 85, credits: 3, category: 'Lab' },
      { id: '204', name: 'Material Science', grade: 65, credits: 3, category: 'Core' }
    ]
  }
];

export const TRANSLATIONS = {
  en: {
    login: {
      title: "Welcome to EduPulse",
      subtitle: "Sign in to access your smart learning assistant",
      email: "Email Address",
      password: "Password",
      btn: "Sign In",
      footer: "Don't have an account? Ask your administrator."
    },
    nav: {
      dashboard: "Dashboard",
      profile: "Profile & Grades",
      recommendations: "AI Recommendations",
      protip: "Pro Tip",
      protipDesc: "Update your grades weekly for better AI accuracy.",
      logout: "Sign Out",
      backToList: "Back to Student List"
    },
    dashboard: {
      welcome: "Welcome back",
      overview: "Here's an overview of your academic performance.",
      gpa: "GPA",
      avgScore: "Avg. Score",
      semesters: "Semesters",
      needFocus: "Need Focus",
      courses: "Courses",
      coursePerf: "Course Performance",
      learningProfile: "Learning Profile",
      learningStyle: "Learning Style",
      majorInterest: "Major Interest",
      struggles: "Struggles"
    },
    profile: {
      title: "Edit Profile & Grades",
      save: "Save Changes",
      personalDetails: "Personal Details",
      fullName: "Full Name",
      major: "Major",
      semester: "Current Semester",
      learningStyle: "Learning Style",
      interests: "Interests (comma separated)",
      weaknesses: "Weaknesses/Struggles (comma separated)",
      courseGrades: "Course Grades",
      addCourse: "Add Course",
      courseName: "Course Name",
      grade: "Grade",
      credits: "Credits",
      category: "Category",
      successMsg: "Profile updated successfully!"
    },
    recommendations: {
      title: "AI Recommendation Engine",
      analyzeBtn: "Analyze My Profile",
      analyzingBtn: "Analyzing...",
      regenerateBtn: "Regenerate",
      readyTitle: "Ready to Optimize Your Learning?",
      readyDesc: "Our AI will analyze your courses and learning style to provide a tailored study plan.",
      summary: "Executive Summary",
      match: "Match",
      failed: "Failed to generate recommendations",
      reason: "Reason",
      type: "Type"
    },
    admin: {
      studentList: "Student Management",
      totalStudents: "Total Students",
      avgGpa: "Average GPA",
      atRisk: "Students At Risk",
      searchPlaceholder: "Search by name or major...",
      viewDetail: "View Detail",
      name: "Name",
      major: "Major",
      sem: "Sem",
      gpa: "GPA",
      status: "Status",
      actions: "Actions"
    }
  },
  id: {
    login: {
      title: "Selamat Datang di EduPulse",
      subtitle: "Masuk untuk mengakses asisten belajar pintar Anda",
      email: "Alamat Email",
      password: "Kata Sandi",
      btn: "Masuk",
      footer: "Belum punya akun? Hubungi administrator Anda."
    },
    nav: {
      dashboard: "Dasbor",
      profile: "Profil & Nilai",
      recommendations: "Rekomendasi AI",
      protip: "Tips Pro",
      protipDesc: "Perbarui nilai Anda setiap minggu untuk akurasi AI yang lebih baik.",
      logout: "Keluar",
      backToList: "Kembali ke Daftar"
    },
    dashboard: {
      welcome: "Selamat datang kembali",
      overview: "Berikut adalah ringkasan performa akademik Anda.",
      gpa: "IPK",
      avgScore: "Rata-rata Nilai",
      semesters: "Semester",
      needFocus: "Perlu Fokus",
      courses: "Mata Kuliah",
      coursePerf: "Performa Mata Kuliah",
      learningProfile: "Profil Belajar",
      learningStyle: "Gaya Belajar",
      majorInterest: "Minat Utama",
      struggles: "Kesulitan"
    },
    profile: {
      title: "Edit Profil & Nilai",
      save: "Simpan Perubahan",
      personalDetails: "Detail Pribadi",
      fullName: "Nama Lengkap",
      major: "Jurusan",
      semester: "Semester Saat Ini",
      learningStyle: "Gaya Belajar",
      interests: "Minat (pisahkan dengan koma)",
      weaknesses: "Kelemahan/Kesulitan (pisahkan dengan koma)",
      courseGrades: "Nilai Mata Kuliah",
      addCourse: "Tambah Matkul",
      courseName: "Nama Mata Kuliah",
      grade: "Nilai",
      credits: "SKS",
      category: "Kategori",
      successMsg: "Profil berhasil diperbarui!"
    },
    recommendations: {
      title: "Mesin Rekomendasi AI",
      analyzeBtn: "Analisis Profil Saya",
      analyzingBtn: "Menganalisis...",
      regenerateBtn: "Analisis Ulang",
      readyTitle: "Siap Mengoptimalkan Pembelajaran?",
      readyDesc: "AI kami akan menganalisis mata kuliah dan gaya belajar Anda untuk memberikan rencana belajar yang disesuaikan.",
      summary: "Ringkasan Eksekutif",
      match: "Cocok",
      failed: "Gagal menghasilkan rekomendasi",
      reason: "Alasan",
      type: "Tipe"
    },
    admin: {
      studentList: "Manajemen Mahasiswa",
      totalStudents: "Total Mahasiswa",
      avgGpa: "Rata-rata IPK",
      atRisk: "Mahasiswa Berisiko",
      searchPlaceholder: "Cari nama atau jurusan...",
      viewDetail: "Lihat Detail",
      name: "Nama",
      major: "Jurusan",
      sem: "Sem",
      gpa: "IPK",
      status: "Status",
      actions: "Aksi"
    }
  }
};
