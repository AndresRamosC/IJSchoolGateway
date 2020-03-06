import axios, { AxiosPromise } from 'axios';
import { Module } from 'vuex';
import _ from 'lodash';

export const teacherStore: Module<any, any> = {
  state: {
    teacherContext: '',
    actualTeacher: '',
    teacherTodayCourses: '',
    teacherDashboardCourses: '',
    selectedCourse: '',
    selectedGroup: '',
    studentsList: '',
    studentsGroup: ''
  },
  getters: {
    teacherContext: state => state.teacherContext,
    teacher: state => state.actualTeacher,
    teacherTodayCourses: state => state.teacherTodayCourses,
    teacherDashboardCourses: state => state.teacherDashboardCourses,
    selectedCourse: state => state.selectedCourse,
    selectedGroup: state => state.selectedGroup,
    studentsList: state => state.studentsList,
    studentsGroup: state => state.studentsGroup,
    teacherContextLoaded: state => !!(state.teacherContext !== ''),
    teacherLoaded: state => !!(state.actualTeacher !== ''),
    teacherCoursesLoaded: state => !!(state.teacherTodayCourses !== ''),
    teacherDashboardCoursesLoaded: state => !!(state.teacherDashboardCourses !== ''),
    studentsListLoaded: state => !!(state.studentsList !== ''),
    studentsGroupLoaded: state => !!(state.studentsGroup !== ''),
    teacherPhoto: state =>
      'data:' + state.teacherContext.teacherPerson.photographContentType + ';base64, ' + state.teacherContext.teacherPerson.photograph,
    teacherName: state => state.teacherContext.teacherPerson.firstName + ' ' + state.teacherContext.teacherPerson.lastName,
    teacherEmail: state => state.teacherContext.teacherPerson.contacts[0].eMail,
    teacherPhone: state => state.teacherContext.teacherPerson.contacts[0].phoneNumber,
    amountOfGroups: state => state.teacherContext.amountOfGroups,
    classGroupList: state => state.teacherContext.classGroupDTOList,
    courseName: state => id =>
      _.findLast(state.teacherContext.classGroupDTOList, function(subject) {
        if (subject.subjectId == id) {
          return subject.courseName;
        }
      }),
    findCourseByGroupId: state => id =>
      _.findLast(state.teacherContext.classGroupDTOList, function(subject) {
        if (subject.classGroupId == id) {
          return subject;
        }
      }),
    studentNameGroup: state => id => state.studentsGroup[id].firstName + ' ' + state.studentsGroup[id].lastName,
    studentPhotoGroup: state => id =>
      'data:' + state.studentsGroup[id].photographContentType + ';base64, ' + state.studentsGroup[id].photograph
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
    updateTeacherDashboardCourses(state, teacherDashboardCourses) {
      state.teacherDashboardCourses = teacherDashboardCourses;
    },
    updateSelectedCourse(state, newCourses) {
      state.selectedCourse = newCourses;
    },
    updateSelectedGroup(state, newGroup) {
      state.selectedGroup = newGroup;
    },
    updateStudentsList(state, newStudents) {
      state.studentsList = newStudents;
    },
    updateStudentsGroup(state, newStudentsGroup) {
      state.studentsGroup = newStudentsGroup;
    },
    addAllToGroupList(state, allGroup) {
      state.teacherContext.classGroupDTOList.push(allGroup);
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
    },
    async getTeacherDashboard(context, { id, date }) {
      const courses = (await axios.get(`/services/ijschoolmanageradministrationservice/api/class-groups/fromTeacher/${id}/${date}`)).data;
      context.commit('updateTeacherDashboardCourses', courses);
    },
    async getStudentsByCourse(context, id) {
      const students = (await axios.get(`/services/ijschoolmanageradministrationservice/api/class-groups/Students/${id}`)).data;
      context.commit('updateStudentsGroup', students);
    },
    async getStudentsByDay(context, { id, date }) {
      const students = (await axios.get(
        `/services/ijschoolmanageradministrationservice/api/class-groups/Students/Attendance/${id}/${date}`
      )).data;
      context.commit('updateStudentsList', students);
    },
    postAttendance(context, { classGroupId, onTime, studentId }) {
      axios.post('/services/ijschoolmanageradministrationservice/api/attendances/', {
        classGroupId: classGroupId,
        onTime: onTime,
        studentId: studentId
      });
    }
  }
};
