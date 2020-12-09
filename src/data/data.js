export const navBar = {
    headers: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/', access: ['all','yes']},
        { title: 'Mark Attendance', icon: 'mdi-account-arrow-right', path: '/markAttendance', access: ['lecturer','mentor','dh','yes']},
        { title: 'My Courses', icon: 'mdi-school', path: '/viewCourses', access: ['student','lecturer','mentor','dh','yes']},
        { title: 'Mentor Groups', icon: 'mdi-account-supervisor', path: '/viewMentorGroups', access: ['mentor','dh','yes']},
        { title: 'View Timetable', icon: 'mdi-timetable', path: '/timetable', access: ['student','lecturer','mentor','yes']},
        { title: 'Mahapola Eligibility', icon: 'mdi-cash', path: '/viewMahapolaEligibility', access: ['student','yes']},
        { title: 'View Students', icon: 'mdi-account', path: '/viewAllStudents', access: ['dh','yes']},
        { title: 'Register Students', icon: 'mdi-account', path: '/RegisterUsers', access: ['admin','yes']},
        { title: 'Mahapola Duration', icon: 'mdi-calendar-edit', path: '/setMahapolaDuration', access: ['admin','yes']},
    ]
};

export const viewAlerts = {
  cards: [
    {date:'April 11', from: 'Heshan Jayasinghe' , msg: 'this is the first msg'},  
    {date:'March 05', from: 'Gimantha Dissanayake' , msg: 'this is the second msg'}
  ],
};

export const markAttendance = {
  headers: [
    { text: 'Registration No', value: 'registration_no' },
    { text: 'Name', value: 'student_name' },
    { text: 'Remove from list', value: 'actions', sortable: false },
  ],
};


export const registerUsers = {
    headers: [
        { text: 'Registration No', value: 'registration_no' },
        { text: 'Name', value: 'student_name' },
      ],
};

export const timetable = {
  headers: [
    {
      text: 'Time',
      align: 'start',
      sortable: false,
      value: 'time',
    },
    { text: 'Monday', value: 'Monday' },
    { text: 'Tuesday', value: 'Tuesday' },
    { text: 'Wednesday', value: 'Wednesday' },
    { text: 'Thursday', value: 'Thursday' },
    { text: 'Friday', value: 'Friday' },
  ],
  item: [
    {
      time: '08 - 09',
      Monday: '',
      Tuesday: 'CSC1133',
      Wednesday: '',
      Thursday: '',
      Friday: 'CSC1122',
    },
    {
      time: '08 - 09',
      Monday: 'CSC1133',
      Tuesday: '',
      Wednesday: 'CSC1133',
      Thursday: 'MAT1122',
      Friday: '',
    },
    {
      time: '08 - 09',
      Monday: 'CSC1122',
      Tuesday: '',
      Wednesday: 'CSC1144',
      Thursday: 'CSC1122',
      Friday: 'CSC1122',
    },
    {
      time: '08 - 09',
      Monday: 'CSC1144',
      Tuesday: 'CSC1133',
      Wednesday: '',
      Thursday: 'MAT1122',
      Friday: '',
    },
     {
      time: '08 - 09',
      Monday: '',
      Tuesday: 'CSC1133',
      Wednesday: '',
      Thursday: '',
      Friday: 'CSC1122',
    },
    {
      time: '08 - 09',
      Monday: 'CSC1133',
      Tuesday: '',
      Wednesday: 'CSC1133',
      Thursday: 'MAT1122',
      Friday: '',
    },
    {
      time: '08 - 09',
      Monday: 'CSC1122',
      Tuesday: '',
      Wednesday: 'CSC1144',
      Thursday: 'CSC1122',
      Friday: 'CSC1122',
    },
    {
      time: '08 - 09',
      Monday: 'CSC1144',
      Tuesday: 'CSC1133',
      Wednesday: '',
      Thursday: 'MAT1122',
      Friday: '',
    },
  ],
};

export const viewAllStudents = {
  headers: [
    { text: 'Registration Number', align: 'start',  value: 'registration_no'},
    { text: 'Name', value: 'name'},
],
students: [
    {
        registration_no: 'SC/2017/10030',
        name: 'Heshan Jayasinghe',
        level: 'Level 3',
        degree: 'BCS'
    },
    {
        registration_no: 'SC/2017/10031',
        name: 'Gimantha Dissanayake',
        level: 'Level 3',
        degree: 'BCS'
    },
    {
        registration_no: 'SC/2017/10032',
        name: 'Ramesh Shanilka',
        level: 'Level 2',
        degree: 'BCS'
    },
    {
        registration_no: 'SC/2017/10033',
        name: 'Dinuka Heshan',
        level: 'Level 1',
        degree: 'BSC'
    },
],
levels: [
    'Level 1', 'Level 2', 'Level 3'
],
degrees: [
    'BSC', 'BCS'
],
};

export const viewAttendance = {
  headers: [
    { text: 'Course Code', align: 'start',  value: 'course_code'},
    { text: 'Course Title', value: 'course_title'},
    { text: 'Attendance Percentage', value:'attendance_percentage'},
],
courses: [
    {
        course_code: 'CSC3113',
        course_title: 'Group Project',
        attendance_percentage: '100',
    },
    {
        course_code: 'CSC3122',
        course_title: 'E-commerce and Professional Practice',
        attendance_percentage: '88',
    },
    {
        course_code: 'CSC3132',
        course_title: 'Data Warehousing and Data mining	',
        attendance_percentage: '95',
    },
    {
        course_code: 'CSC3142',
        course_title: 'Internet Services and Protocols	',
        attendance_percentage: '80',
    },
    {
        course_code: 'CSC3172',
        course_title: 'Distributed Systems',
        attendance_percentage: '70',
    },
]
};

export const viewAttendanceSheet = {
  course: {
    course_code: 'CSC1142',
    course_title: 'System Analysis and Design',
    date: '11.01.2020',
    overall_attendance_percentage: '85%'
},
students: [
    {
        registration_no : 'SC/2017/10100',
        name: 'A.B.C silva',
        status: 'present'
    },
    {
        registration_no : 'SC/2017/10200',
        name: 'A.B.C silva',
        status: 'absent'
    },
    {
        registration_no : 'SC/2017/10100',
        name: 'A.B.C silva',
        status: 'present'
    },
    {
        registration_no : 'SC/2017/10100',
        name: 'A.B.C silva',
        status: 'present'
    },
    {
        registration_no : 'SC/2017/10100',
        name: 'A.B.C silva',
        status: 'absent'
    },
],
headers: [
    { text: 'Registration Number', align: 'start',  value: 'registration_no'},
    { text: 'Name', value: 'student_name'},
    { text: 'Status', value: 'status'}
]
};

export const viewCourses = {
  headers: [
    { text: 'COURSE CODE', align: 'start',  value: 'course_code'},
    { text: 'COURSE TITLE', value: 'course_title'},
    { text: 'TYPE', value: 'type'},
    { text: 'ATTENDANCE PERCENTAGE', value:'attendance_percentage'},
],
levels: [
  'Level 1', 'Level 2', 'Level 3'
],
semesters: [
  'Semester 1', 'Semester 2'
]
};

export const viewDetailedAttendance = {
headers: [
    { text: 'DATE', align: 'start',  value: 'date'},
    { text: 'ATTENDANCE STATUS', value: 'status'},
],
};

export const viewDetailedCourse = {
  course: {
    course_code: 'CSC1142',
    course_title: 'System Analysis and Design',
    overall_attendance_percentage: '85%'
},
headers: [
    { text: 'Date', align: 'start',  value: 'date'},
    { text: 'Attendance Percentage', value: 'percentage'},
],
dates: [
    {
        date: '12.01.2020',
        percentage: '100%'
    },
    {
        date: '19.01.2020',
        percentage: '90%'
    },
    {
        date: '26.01.2020',
        percentage: '100%'
    },
    {
        date: '02.02.2020',
        percentage: '95%'
    },
    {
        date: '09.02.2020',
        percentage: '80%'
    },
    {
        date: '16.02.2020',
        percentage: '40%'
    },
    {
        date: '23.02.2020',
        percentage: '100%'
    },
    {
        date: '12.01.2020',
        percentage: '100%'
    },
    {
        date: '12.01.2020',
        percentage: '60%'
    },
    {
        date: '12.01.2020',
        percentage: '80%'
    },
    {
        date: '12.01.2020',
        percentage: '78%'
    },
    {
        date: '12.01.2020',
        percentage: '100%'
    },
    {
        date: '12.01.2020',
        percentage: '90%'
    },
    {
        date: '12.01.2020',
        percentage: '50%'
    },
    {
        date: '12.01.2020',
        percentage: '60%'
    },
],
}

export const viewMahapolaEligibility = {
  headers: [
    { text: 'COURSE CODE', align: 'start',  value: 'course_code'},
    { text: 'COURSE TITLE', value: 'course_title'},
    { text: 'TYPE', value: 'type'},
    { text: 'ATTENDANCE PERCENTAGE', value:'percentage'},
],
courses: [
    {
        course_code: 'CSC3113',
        course_title: 'Group Project',
        attendance_percentage: '79',
    },
    {
        course_code: 'CSC3122',
        course_title: 'E-commerce and Professional Practice',
        attendance_percentage: '68',
    },
]
}

export const viewMentorGroups = {
  headers: [
    { text: 'Registration Number', align: 'start',  value: 'registration_no'},
    { text: 'Student Name', value: 'name'},
],
students: [
    {
        registration_no: 'SC/2017/10030',
        name: 'Heshan Jayasinghe',
        level: 'Level 3',
    },
    {
        registration_no: 'SC/2017/10031',
        name: 'Gimantha Dissanayake',
        level: 'Level 3',
    },
    {
        registration_no: 'SC/2017/10032',
        name: 'Ramesh Shanilka',
        level: 'Level 2',
    },
    {
        registration_no: 'SC/2017/10033',
        name: 'Dinuka Heshan',
        level: 'Level 1',
    },
],
levels: [
  'Level 1', 'Level 2', 'Level 3'
],
};

export const viewRegisteredStudents = {
  course: {
    course_code: 'CSC1142',
    course_title: 'System Analysis and Design',
    overall_attendance_percentage: '85%'
},
students: [
    {
        registration_no : 'SC/2017/10100',
        name: 'A.B.C silva',
        percentage: '80',

    },
    {
        registration_no : 'SC/2017/10200',
        name: 'A.B.C silva',
        percentage: '80',
    },
    {
        registration_no : 'SC/2017/10100',
        name: 'A.B.C silva',
        percentage: '100',
    },
    {
        registration_no : 'SC/2017/10100',
        name: 'A.B.C silva',
        percentage: '80',
    },
    {
        registration_no : 'SC/2017/10100',
        name: 'A.B.C silva',
        percentage: '70',
    },
],
headers: [
    { text: 'Registration Number', align: 'start',  value: 'registration_no'},
    { text: 'Name', value: 'student_name'},
    { text: 'Attendance Percentage', value: 'percentage'},
    { text: 'Send alert', value:'actions'}
]
}

export const viewStudentDetails = {
  student:{
    name: 'Kamal Perera',
    registration_no: 'SC/2021/12291',
    degree_program: 'BCS',
    level: 'Level 3',
    mentor: 'Kasun Sirisena'
},
headers: [
    { text: 'Course Code', align: 'start',  value: 'course_code'},
    { text: 'Course Name', value: 'course_name'},
    { text: 'Attendance Percentage', value: 'attendance_percentage'},
],
courses: [
    {
        course_code: 'CSC1124',
        course_name: 'Internet programming',
        attendance_percentage: 50
    },
     {
        course_code: 'CSC1333',
        course_name: 'Programming techniques',
        attendance_percentage: 60
    },
     {
        course_code: 'CSC1124',
        course_name: 'Group Project',
        attendance_percentage: 100
    },
     {
        course_code: 'CSC1124',
        course_name: 'Internet programming',
        attendance_percentage: 75
    },
     {
        course_code: 'CSC1124',
        course_name: 'Internet programming',
        attendance_percentage: 90
    },
]
}

