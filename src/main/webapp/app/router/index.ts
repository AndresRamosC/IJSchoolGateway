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

const StudentSelection = () => import('../core/studentselection/studentselection.vue');
const GuardianDashboard = () => import('../core/guardiandashboard/guardiandashboard.vue');
const ScheduleGuardian = () => import('../core/scheduleguardian/scheduleguardian.vue');
const ScheduleAssignments = () => import('../core/scheduleassignments/scheduleassignments.vue');
const ScheduleCourses = () => import('../core/schedulecourses/schedulecourses.vue');
const SubjectsGuardian = () => import('../core/subjectsguardian/subjectsguardian.vue');
const SettingsGuardian = () => import('../core/settingsguardian/settingsguardian.vue');
const CourseOverview = () => import('../core/courseoverview/courseoverview.vue');
const OverviewAttendance = () => import('../core/overviewattendance/overviewattendance.vue');
const OverviewAssignments = () => import('../core/overviewassignments/overviewassignments.vue');
const OverviewGrades = () => import('../core/overviewgrades/overviewgrades.vue');
const AssignmentView = () => import('../core/assignmentview/assignmentview.vue');
/* tslint:disable */
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: StudentSelection
    },
    {
      path: '/guardian',
      name: 'Guardian',
      component: GuardianDashboard
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
      path: '/course-overview',
      name: 'Course Overview',
      component: CourseOverview, children: [
        { path: '/course-overview/attendance', name: 'Attendance', component: OverviewAttendance },
        { path: '/course-overview/assignments', name: 'Assignments', component: OverviewAssignments },
        { path: '/course-overview/assignments/view', name: 'View', component: AssignmentView },
        { path: '/course-overview/grades', name: 'Grades', component: OverviewGrades }
      ]
    },
    {
      path: '/subjects',
      name: 'Subjects',
      component: SubjectsGuardian
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsGuardian
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
  ]
});
