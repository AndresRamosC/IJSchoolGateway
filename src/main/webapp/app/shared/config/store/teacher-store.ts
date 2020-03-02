import axios, { AxiosPromise } from 'axios';
import { Module } from 'vuex';
import _ from 'lodash';

export const teacherStore: Module<any, any> = {
  state: {
    teacherContext: '',
    actualTeacher: '',
    teacherTodayCourses: '',
    selectedCourse: ''
  },
  getters: {
    teacherContext: state => state.teacherContext,
    teacher: state => state.actualTeacher,
    teacherTodayCourses: state => state.teacherTodayCourses,
    selectedCourse: state => state.selectedCourse,
    teacherContextLoaded: state => !!(state.teacherContext !== ''),
    teacherLoaded: state => !!(state.actualTeacher !== ''),
    teacherCoursesLoaded: state => !!(state.teacherTodayCourses !== ''),
    teacherPhoto: state =>
      'data:' + state.teacherContext.teacherPerson.photographContentType + ';base64, ' + state.teacherContext.teacherPerson.photograph,
    teacherName: state => state.teacherContext.teacherPerson.firstName + ' ' + state.teacherContext.teacherPerson.lastName,
    teacherEmail: state => state.teacherContext.teacherPerson.contacts[0].eMail,
    teacherPhone: state => state.teacherContext.teacherPerson.contacts[0].phoneNumber,
    amountOfGroups: state => state.teacherContext.amountOfGroups,
    classGroupList: state => state.teacherContext.classGroupDTOList,
    courseName: state => id =>
      _.findLast(state.teacherContext.classGroupDTOList, function(subject) {
        if (subject.subjectId.id == id) {
          return subject.subjectId.courseName;
        }
      })
  },
  mutations: {
    updateTeacherContext(state, teachercontext) {
      state.teacherContext = teachercontext;
    },
    updateActualTeacher(state, teacherid) {
      state.actualTeacher = teacherid;
    },
    updateTeacherTodayCourses(state, newTodayCourses) {
      state.teacherTodayCourses = newTodayCourses;
    },
    updateSelectedCourse(state, newCourses) {
      state.selectedCourse = newCourses;
    }
  },
  actions: {
    async getTeacherContext(context, id) {
      const dashboard = (await axios.get(`/services/ijschoolmanageradministrationservice/api/TeacherDashBoard/${id}`)).data;
      context.commit('updateTeacherContext', dashboard);
    },
    async getTeacherCoursesByDay(context, { id, date }) {
      const courses = (await axios.get(`/services/ijschoolmanageradministrationservice/api/class-groups/fromTeacher/${id}/${date}`)).data;
      context.commit('updateTeacherTodayCourses', courses);
    }
  }
};
