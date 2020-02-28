import axios, { AxiosPromise } from 'axios';
import { Module } from 'vuex';
import _ from 'lodash';

export const guardianStore: Module<any, any> = {
  state: {
    dashboard: '',
    actualStudent: '',
    courses: ''
  },
  getters: {
    dashboard: state => state.dashboard,
    student: state => state.actualStudent,
    todayCourses: state => _.sortBy(state.courses, ['startHour']),
    isLoaded: state => !!(state.dashboard !== ''),
    coursesLoaded: state => !!(state.courses !== ''),
    guardianPhoto: state =>
      'data:' + state.dashboard.guardianPerson.photographContentType + ';base64, ' + state.dashboard.guardianPerson.photograph,
    guardianName: state => state.dashboard.guardianPerson.firstName + ' ' + state.dashboard.guardianPerson.lastName,
    guardianEmail: state => state.dashboard.guardianPerson.contacts[0].eMail,
    guardianPhone: state => state.dashboard.guardianPerson.contacts[0].phoneNumber,
    studentPersons: state => state.dashboard.studentList,
    studentPhoto: state => id =>
      'data:' +
      state.dashboard.studentList[id].personDTO.photographContentType +
      ';base64, ' +
      state.dashboard.studentList[id].personDTO.photograph,
    studentName: state => id =>
      state.dashboard.studentList[id].personDTO.firstName + ' ' + state.dashboard.studentList[id].personDTO.lastName,
    studentGrade: state => id => state.dashboard.studentList[id].studentDTO.academicYear,
    courses: state => state.dashboard.studentList[state.actualStudent].studentDTO.classGroups,
    coursesQty: state => state.dashboard.studentList[state.actualStudent].studentDTO.classGroups.length,
    actualStudentId: state => state.dashboard.studentList[state.actualStudent].studentDTO.id
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
    }
  }
};
