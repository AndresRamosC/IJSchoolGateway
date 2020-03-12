import axios, { AxiosPromise } from 'axios';
import { Module } from 'vuex';
import _ from 'lodash';

export const studentStore: Module<any, any> = {
  state: {
    studentData: '',
    studentTodayCourses: '',
    studentCourses: '',
    studentSubjects: '',
    studentSelectedCourse: '',
    studentAttendanceList: '',
    studentAssignmentsList: '',
    selectedAssignment: '',
    allLoaded: false,
    totalAbscence: 0
  },
  getters: {
    studentData: state => state.studentData,
    studentDataLoaded: state => !!(state.studentData !== ''),
    studentTodayCourses: state => state.studentTodayCourses,
    studentTodayCoursesLoaded: state => !!(state.studentTodayCourses !== ''),
    studentCourses: state => state.studentCourses,
    studentAttendanceList: state => state.studentAttendanceList,
    studentAssignmentsList: state => state.studentAssignmentsList,
    selectedAssignment: state => state.selectedAssignment,
    allLoaded: state => state.allLoaded,
    totalAbscence: state => state.totalAbscence,
    studentAttendanceLoaded: state => !!(state.studentAttendanceList !== ''),
    studentAssignmentsLoaded: state => !!(state.studentAssignmentsList !== ''),
    studentCoursesLoaded: state => !!(state.studentCourses !== ''),
    getStudentSubjects: state => state.studentSubjects,
    getStudentSelectedCourse: state => state.studentSelectedCourse,
    getStudentPhoto: state =>
      'data:' + state.studentData.studentPerson.photographContentType + ';base64, ' + state.studentData.studentPerson.photograph,
    getStudentName: state => state.studentData.studentPerson.firstName + ' ' + state.studentData.studentPerson.lastName,
    getStudentEmail: state => state.studentData.studentPerson.contacts[0].eMail,
    getStudentPhone: state => state.studentData.studentPerson.contacts[0].phoneNumber,
    findStudentSubjectById: state => id =>
      _.findLast(state.studentSubjects, function(subject) {
        if (subject.subjectId == id) {
          return subject;
        }
      }),
    findStudentSubjectByGroup: state => id =>
      _.findLast(state.studentSubjects, function(subject) {
        if (subject.classGroupId == id) {
          return subject;
        }
      }),
    getAssitances: state => {
      var total = 0;
      for (let index = 0; index < state.studentAttendanceList.length; index++) {
        if (state.studentAttendanceList[index].onTime == true) {
          total++;
        }
      }
      return total;
    },
    getLates: state => {
      var total = 0;
      for (let index = 0; index < state.studentAttendanceList.length; index++) {
        if (state.studentAttendanceList[index].onTime == false) {
          total++;
        }
      }
      return total;
    }
  },
  mutations: {
    updateStudentData(state, dashboard) {
      state.studentData = dashboard;
    },
    updateTodayStudentCourses(state, courses) {
      state.studentTodayCourses = courses;
    },
    updateStudentCourses(state, courses) {
      state.studentCourses = courses;
    },
    updateStudentSubjects(state, subjects) {
      state.studentSubjects = subjects;
    },
    updateStudentSelectedCourse(state, course) {
      state.studentSelectedCourse = course;
    },
    updateStudentAttendances(state, attendanceList) {
      state.studentAttendanceList = attendanceList;
    },
    updatestudentAssignments(state, assignmentsList) {
      state.studentAssignmentsList = assignmentsList;
    },
    updateSelectedAssignment(state, assignment) {
      state.selectedAssignment = assignment;
    },
    updateAllLoaded(state, value) {
      state.allLoaded = value;
    },
    loadAllStudentAssignments(state, assignmentsList) {
      if (assignmentsList.length != 0) {
        for (let index = 0; index < assignmentsList.length; index++) {
          state.studentAssignmentsList.push(assignmentsList[index]);
        }
      }
    }
  },
  actions: {
    async getStudentData(context, id) {
      const dashboard = (await axios.get(`/services/ijschoolmanageradministrationservice/api/StudentDashBoard/${id}`)).data;
      context.commit('updateStudentData', dashboard);
    },
    async getStudentTodayCourses(context, { id, date }) {
      const courses = (await axios.get(`/services/ijschoolmanageradministrationservice/api/class-groups/${id}/${date}`)).data;
      context.commit('updateTodayStudentCourses', courses);
    },
    async getStudentCoursesByDay(context, { id, date }) {
      const courses = (await axios.get(`/services/ijschoolmanageradministrationservice/api/class-groups/${id}/${date}`)).data;
      context.commit('updateStudentCourses', courses);
    },
    async getStudentAttendanceByMonth(context, { studentId, groupId, date }) {
      const attendanceList = (await axios.get(
        `/services/ijschoolmanageradministrationservice/api/attendances/student/classGroup/byMonth/${studentId}/${groupId}/${date}`
      )).data;
      context.commit('updateStudentAttendances', attendanceList);
    },
    async getStudentAssignmentsByMonth(context, { studentId, date }) {
      const assignmentsList = (await axios.get(
        `/services/ijschoolmanageradministrationservice/api/assignments/studentId/${studentId}/${date}`
      )).data;
      context.commit('updatestudentAssignments', assignmentsList);
    },
    async getStudentAssignmentsByCourse(context, { studentId, groupId }) {
      const assignmentsList = (await axios.get(
        `/services/ijschoolmanageradministrationservice/api/assignments/studentAndGroupId/${studentId}/${groupId}`
      )).data;
      context.commit('updatestudentAssignments', assignmentsList);
    },
    returnStudentAssignmentsByCourse(context, { studentId, groupId }) {
      axios
        .get(`/services/ijschoolmanageradministrationservice/api/assignments/studentAndGroupId/${studentId}/${groupId}`)
        .then(function(response) {
          // handle success
          context.commit('loadAllStudentAssignments', response.data);
        });
    }
  }
};
