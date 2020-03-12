import axios, { AxiosPromise } from 'axios';
import { Module } from 'vuex';
import _ from 'lodash';

export const guardianStore: Module<any, any> = {
  state: {
    dashboard: '',
    actualStudent: '',
    courses: '',
    actualCourse: '',
    attendanceList: ''
  },
  getters: {
    dashboard: state => state.dashboard,
    student: state => state.actualStudent,
    todayCourses: state => _.sortBy(state.courses, ['startHour']),
    actualCourse: state => state.actualCourse,
    attendanceList: state => state.attendanceList,
    isLoaded: state => !!(state.dashboard !== ''),
    coursesLoaded: state => !!(state.courses !== ''),
    attendanceLoaded: state => !!(state.attendanceList !== ''),
    guardianPhoto: state =>
      'data:' + state.dashboard.guardianPerson.photographContentType + ';base64, ' + state.dashboard.guardianPerson.photograph,
    guardianName: state => state.dashboard.guardianPerson.firstName + ' ' + state.dashboard.guardianPerson.lastName,
    guardianEmail: state => state.dashboard.guardianPerson.contacts[0].eMail,
    guardianPhone: state => state.dashboard.guardianPerson.contacts[0].phoneNumber,
    studentPersons: state => state.dashboard.studentList,
    studentPhoto: state => id =>
      'data:' + state.dashboard.studentList[id].photographContentType + ';base64, ' + state.dashboard.studentList[id].photograph,
    studentName: state => id => state.dashboard.studentList[id].firstName + ' ' + state.dashboard.studentList[id].lastName,
    studentGrade: state => id => state.dashboard.studentList[id].academicYear,
    courses: state => state.dashboard.studentList[state.actualStudent].classGroupAndSubjectDtoList,
    coursesQty: state => state.dashboard.studentList[state.actualStudent].classGroupAndSubjectDtoList.length,
    actualStudentId: state => state.dashboard.studentList[state.actualStudent].studentId,
    findSubjectById: state => id =>
      _.findLast(state.dashboard.studentList[state.actualStudent].classGroupAndSubjectDtoList, function(subject) {
        if (subject.classGroupId == id) {
          return subject;
        }
      }),
    findSubjectBySubjectId: state => id =>
      _.findLast(state.dashboard.studentList[state.actualStudent].classGroupAndSubjectDtoList, function(subject) {
        if (subject.subjectId == id) {
          return subject;
        }
      }),
    findAttendanceByGroupId: state => id =>
      _.findLast(state.attendanceList, function(attendance) {
        if (attendance.classGroupId == id) {
          return attendance;
        }
      })
  },
  mutations: {
    updateDashboard(state, dashboard) {
      state.dashboard = dashboard;
    },
    changeStudent(state, newId) {
      state.actualStudent = newId;
    },
    changeCourses(state, courses) {
      state.courses = courses;
    },
    addAllToCourses(state, courses) {
      state.courses.push(courses);
    },
    changeActualCourse(state, course) {
      state.actualCourse = course;
    },
    updateAttendances(state, attendanceList) {
      state.attendanceList = attendanceList;
    }
  },
  actions: {
    async getDashboard(context, id) {
      const dashboard = (await axios.get(`/services/ijschoolmanageradministrationservice/api/GuardianDashBoard/${id}`)).data;
      context.commit('updateDashboard', dashboard);
    },
    async getScheduleCourses(context, { id, date }) {
      const courses = (await axios.get(`/services/ijschoolmanageradministrationservice/api/class-groups/${id}/${date}`)).data;
      context.commit('changeCourses', courses);
    },
    async getAttendancesByDay(context, { studentId, date }) {
      const attendanceList = (await axios.get(
        `/services/ijschoolmanageradministrationservice/api/attendances/student/byDay/${studentId}/${date}`
      )).data;
      context.commit('updateAttendances', attendanceList);
    },
    async getAttendanceByMonth(context, { studentId, groupId, date }) {
      const attendanceList = (await axios.get(
        `/services/ijschoolmanageradministrationservice/api/attendances/student/classGroup/byMonth/${studentId}/${groupId}/${date}`
      )).data;
      context.commit('updateAttendances', attendanceList);
    }
  }
};
