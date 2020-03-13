import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
import Router from 'vue-router';
import { Authority } from '@/shared/security/authority';
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const JhiConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../admin/docs/docs.vue');
const JhiHealthComponent = () => import('../admin/health/health.vue');
const JhiLogsComponent = () => import('../admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../admin/metrics/metrics.vue');
const JhiGatewayComponent = () => import('../admin/gateway/gateway.vue');

const StudentSelection = () => import('../core/Guardian/studentselection/studentselection.vue');
const GuardianDashboard = () => import('../core/Guardian/guardiandashboard/guardiandashboard.vue');
const ScheduleGuardian = () => import('../core/Guardian/scheduleguardian/scheduleguardian.vue');
const ScheduleAssignments = () => import('../core/Guardian/scheduleassignments/scheduleassignments.vue');
const ScheduleCourses = () => import('../core/Guardian/schedulecourses/schedulecourses.vue');
const SubjectsGuardian = () => import('../core/Guardian/subjectsguardian/subjectsguardian.vue');
const SettingsGuardian = () => import('../core/Guardian/settingsguardian/settingsguardian.vue');
const CourseOverview = () => import('../core/Guardian/courseoverview/courseoverview.vue');
const OverviewAttendance = () => import('../core/Guardian/overviewattendance/overviewattendance.vue');
const OverviewAssignments = () => import('../core/Guardian/overviewassignments/overviewassignments.vue');
const OverviewGrades = () => import('../core/Guardian/overviewgrades/overviewgrades.vue');
const AssignmentView = () => import('../core/Guardian/assignmentview/assignmentview.vue');
const EarlyLeave = () => import('../core/Guardian/earlyleave/earlyleave.vue');
const Login = () => import('../core/login/login.vue');

/* teacher */
const TeacherDashboard = () => import('../core/teacher/dashboard/teacherdashboard.vue');
const TeacherSchedule = () => import('../core/teacher/schedule/teacherschedule.vue');
const TeacherSubjects = () => import('../core/teacher/subjects/teachersubjects.vue');
const TeacherSettings = () => import('../core/teacher/settings/teachersettings.vue');
const TeacherAttendance = () => import('../core/teacher/attendance/teacherattendance.vue');
const TeacherNewAssignment = () => import('../core/teacher/newassignment/newassignment.vue');
const TeacherCourseOverview = () => import('../core/teacher/courseoverview/courseoverviewteacher.vue');
const TeacherOverviewAssignments = () => import('../core/teacher/courseoverview/overviewassignments.vue');
const TeacherViewAssignments = () => import('../core/teacher/courseoverview/viewassignments.vue');
const TeacherOveriewStudents = () => import('../core/teacher/courseoverview/overviewstudents.vue');

/* student */
const StudentDashboard = () => import('../core/student/dashboard/studentdashboard.vue');
const StudentSchedule = () => import('../core/student/schedule/schedulestudent.vue');
const StudentScheduleCourses = () => import('../core/student/schedule/schedulecourses.vue');
const StudentScheduleAssignments = () => import('../core/student/schedule/scheduleassignments.vue');
const StudentSubject = () => import('../core/student/subjects/subjectsstudent.vue');
const StudentSettings = () => import('../core/student/settings/studentsettings.vue');
const StudentCourseOverview = () => import('../core/student/courseoverview/courseoverviewstudent.vue');
const StudentOverviewAttendance = () => import('../core/student/courseoverview/overviewattendancestudent.vue');
const StudentOverviewAssignments = () => import('../core/student/courseoverview/overviewassignments.vue');
const StudentViewAssignments = () => import('../core/student/courseoverview/viewassignment.vue');
const StudentOverviewGrades = () => import('../core/student/courseoverview/overviewgrades.vue');

/* tslint:disable */
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/student-selection',
      name: 'Selection',
      component: StudentSelection
    },
    {
      path: '/guardian',
      name: 'Guardian',
      component: GuardianDashboard,
      props: true
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: TeacherDashboard
    },
    {
      path: '/early-leave',
      name: 'Leave',
      component: EarlyLeave
    },
    {
      path: '/guardian-schedule',
      name: 'Schedule',
      component: ScheduleGuardian, children: [
        { path: '/guardian-schedule/courses', name: 'Courses', component: ScheduleCourses },
        { path: '/guardian-schedule/assignments', name: 'Assignments', component: ScheduleAssignments }
      ]
    },
    {
      path: '/teacher-schedule',
      name: 'Teacher Schedule',
      component: TeacherSchedule
    },
    {
      path: '/course-overview',
      name: 'Course Overview',
      component: CourseOverview, children: [
        { path: '/course-overview/attendance', name: 'Attendance', component: OverviewAttendance },
        { path: '/course-overview/assignments', name: 'Marks', component: OverviewAssignments },
        { path: '/course-overview/assignments/view', name: 'View', component: AssignmentView },
        { path: '/course-overview/grades', name: 'Grades', component: OverviewGrades }
      ]
    },
    {
      path: '/course-overview-teacher',
      name: 'Course Overview Teacher',
      component: TeacherCourseOverview, children: [
        { path: '/course-overview-teacher/assignments', name: 'Assignments Overview', component: TeacherOverviewAssignments },
        { path: '/course-overview-teacher/assignments/view', name: 'Assignments Full View', component: TeacherViewAssignments },
        { path: '/course-overview-teacher/students', name: 'Students Grades', component: TeacherOveriewStudents }
      ]
    },
    {
      path: '/subjects',
      name: 'Subjects',
      component: SubjectsGuardian
    },
    {
      path: '/teacher-subjects',
      name: 'Teacher Subjects',
      component: TeacherSubjects
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsGuardian
    },
    {
      path: '/teacher-settings',
      name: 'Teacher Settings',
      component: TeacherSettings
    },
    {
      path: '/teacher-attendance',
      name: 'Teacher Attendance',
      component: TeacherAttendance
    },
    {
      path: '/teacher-assignment',
      name: 'Teacher New Assignment',
      component: TeacherNewAssignment
    },
    {
      path: '/student-dashboard',
      name: 'Student Dashboard',
      component: StudentDashboard
    },
    {
      path: '/student-subjects',
      name: 'Student Subjects',
      component: StudentSubject
    },
    {
      path: '/student-settings',
      name: 'Student Settings',
      component: StudentSettings
    },
    {
      path: '/student-schedule',
      name: 'Student Schedule',
      component: StudentSchedule, children: [
        { path: '/student-schedule/courses', name: 'Student Courses', component: StudentScheduleCourses },
        { path: '/student-schedule/assignments', name: 'Student Month Assignments', component: StudentScheduleAssignments }
      ]
    },
    {
      path: '/student-course-overview',
      name: 'Student Course Overview',
      component: StudentCourseOverview, children: [
        { path: '/student-course-overview/attendance', name: 'Student Course Overview Attendance', component: StudentOverviewAttendance },
        { path: '/student-course-overview/assignments', name: 'Student Course Overview Assignments', component: StudentOverviewAssignments },
        { path: '/student-course-overview/grades', name: 'Student Course Overview Grades', component: StudentOverviewGrades }
      ]
    },
    {
      path: '/student-course-overview/assignments/view',
      name: 'Student Assignment View',
     component: StudentViewAssignments
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: [Authority.ADMIN] }
    }
,
    {
      path: '/admin/gateway',
      name: 'JhiGatewayComponent',
      component: JhiGatewayComponent,
      meta: { authorities: [Authority.ADMIN] }
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
  scrollBehavior() {
      document.getElementById('app').scrollIntoView();
  }
});
