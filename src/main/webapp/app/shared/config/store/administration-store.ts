import axios, { AxiosPromise } from 'axios';
import { Module } from 'vuex';
import _ from 'lodash';

export const administrationStore: Module<any, any> = {
  state: {
    guardianList: '',
    studentList: '',
    guardianStudentsList: '',
    teacherList: '',
    subjectsList: '',
    groupsList: '',
    userDuplicated: false,
    createdGuardianId: ''
  },
  getters: {
    guardianList: state => state.guardianList,
    guardianListLoaded: state => !!(state.guardianList !== ''),
    studentList: state => state.studentList,
    studentListLoaded: state => !!(state.studentList !== ''),
    teacherList: state => state.teacherList,
    teacherListLoaded: state => !!(state.teacherList !== ''),
    subjectsList: state => state.subjectsList,
    subjectsListLoaded: state => !!(state.subjectsList !== ''),
    groupsList: state => state.groupsList,
    groupsListLoaded: state => !!(state.groupsList !== ''),
    userDuplicated: state => state.userDuplicated,
    createdGuardianId: state => state.createdGuardianId,
    guardianStudentsList: state => state.guardianStudentsList,
    guardianStudentsListLoaded: state => !!(state.guardianStudentsList !== '')
  },
  mutations: {
    updateGuardianList(state, newList) {
      state.guardianList = newList;
    },
    updateStudentList(state, newList) {
      state.studentList = newList;
    },
    updateTeacherList(state, newList) {
      state.teacherList = newList;
    },
    updateGroupsList(state, newList) {
      state.groupsList = newList;
    },
    subjectsListList(state, newList) {
      state.subjectsList = newList;
    },
    updateGuardianStudentsList(state, newList) {
      state.guardianStudentsList = newList;
    },
    updateuserDuplicated(state, newValue) {
      state.userDuplicated = newValue;
    },
    updateCreatedGuardianId(state, newValue) {
      state.createdGuardianId = newValue;
    }
  },
  actions: {
    async getAdministrationGuardianDashboard(context) {
      const list = (await axios.get('/services/ijschoolmanageradministrationservice/api/GuardianDashBoardAdministration/')).data;
      context.commit('updateGuardianList', list);
    },
    async getAdministrationStudentDashboard(context) {
      const list = (await axios.get('/services/ijschoolmanageradministrationservice/api/students')).data;
      context.commit('updateStudentList', list);
    },
    async getAdministrationTeacherDashboard(context) {
      const list = (await axios.get('/services/ijschoolmanageradministrationservice/api/teachers')).data;
      context.commit('updateTeacherList', list);
    },
    async getAdministrationSubjectsDashboard(context) {
      const list = (await axios.get('/services/ijschoolmanageradministrationservice/api/subjects')).data;
      context.commit('subjectsListList', list);
    },
    async getStates(context) {
      const list = (await axios.get('/services/ijschoolmanageradministrationservice/api/subjects')).data;
      context.commit('subjectsListList', list);
    },
    async getStudentsByGuardian(context, guardianId) {
      const list = (await axios.get(`/services/ijschoolmanageradministrationservice/api/students/basicInfo/withGuardian/${guardianId}`))
        .data;
      context.commit('updateGuardianStudentsList', list);
    },
    async getGroupsBySubjectId(context, subjectId) {
      const list = (await axios.get(`/services/ijschoolmanageradministrationservice/api/class-groups/whereSubject/${subjectId}`)).data;
      context.commit('updateGroupsList', list);
    },
    verifyUser(context, userName) {
      axios.get(`/api/VerifyUser/${userName}`).then(response => {
        context.commit('updateuserDuplicated', response.data);
      });
    },
    async createUser(context, { authorities, email, firstName, lastName, login, password }) {
      return await axios.post('api/users', {
        password: password,
        userDTO: {
          authorities: [authorities],
          email: email,
          firstName: firstName,
          lastName: lastName,
          login: login
        }
      });
    },
    createGuardian(context, guardianObject) {
      axios
        .post('/services/ijschoolmanageradministrationservice/api/guardians', guardianObject, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response.data);
          context.dispatch('getAdministrationGuardianDashboard');
          context.commit('updateCreatedGuardianId', response.data.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    createStudent(context, { guardianId, studentObject }) {
      axios
        .post(`/services/ijschoolmanageradministrationservice/api/studentToGuardian/${guardianId}`, studentObject, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response.data);
          context.dispatch('getAdministrationStudentDashboard');
        })
        .catch(err => {
          console.log(err);
        });
    },
    createTeacher(context, teacherObject) {
      axios
        .post('/services/ijschoolmanageradministrationservice/api/teachers/', teacherObject, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response.data);
          context.dispatch('getAdministrationTeacherDashboard');
        })
        .catch(err => {
          console.log(err);
        });
    },
    createGroup(context, { groupObject, subjectId }) {
      axios
        .post('/services/ijschoolmanageradministrationservice/api/class-groups/', groupObject, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response.data);
          context.dispatch('getGroupsBySubjectId', subjectId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    createSubject(context, subjectObject) {
      axios
        .post('/services/ijschoolmanageradministrationservice/api/subjects/', subjectObject, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response.data);
          context.dispatch('getAdministrationSubjectsDashboard');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
