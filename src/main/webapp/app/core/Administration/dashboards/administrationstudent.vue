<template>
<div class="container-fluid h-100 p-0">
    <header-administration />

    <div class="row m-0 administration-container" style="height: 95%;">

        <lateral-nav
            title="Roles"
        >
            <template v-slot:content>
                <lateral-card
                    name="Admin"
                    color="green"
                    route="admin"
                />
                <lateral-card
                    name="Teacher"
                    color="cyan"
                    route="teacher"
                />
                <lateral-card
                    name="Guardian"
                    color="purple"
                    route="guardian"
                />
                <lateral-card
                    name="Student"
                    color="red"
                    route="student"
                />
            </template>
        </lateral-nav>

        <div class="col-12 col-lg-11  p-0" style="position: relative">
            <nav-administration
                v-if="studentListLoaded"
                :qty="studentList.length"
                :type="studentList.length > 1 ? 'students' : 'student'"
                :sortOptions="sort"
                :options="listToFilter"
                @sortList="sortByParameter"
                @filterList="searchByParameter"
            />

            <cards-container>
                <template v-slot:headers>

                    <div class="row m-0 mb-2 d-flex align-content-center py-2" style="border-bottom: 1px solid #1071A3;">
                        <div class="col-1"></div>
                        <div class="col-3">
                            <h3 class="font-weight-bold m-0 light-blue">Name</h3>
                        </div>
                        <div class="col-2">
                            <h3 class="font-weight-bold m-0 light-blue">Control number</h3>
                        </div>
                        <div class="col-2">
                            <h3 class="font-weight-bold m-0 light-blue">Grade</h3>
                        </div>
                        <div class="col-2">
                            <h3 class="font-weight-bold m-0 light-blue">Guardian(s)</h3>
                        </div>
                        <div class="col-2"></div>
                    </div>

                </template>

                <template  v-slot:cards>
                    
                    <div v-if="studentListLoaded">
                        <div v-for="(student, index) in studentList" :key="index">
                            <student-card
                                :studentPhoto="'data:' + student.personDTO.photographContentType + ';base64, ' + student.personDTO.photograph"
                                :name="student.personDTO.firstName + ' ' + student.personDTO.lastName"
                                :controlNumber="student.studentDTO.controlNumber"
                                :grade="student.studentDTO.academicYear"
                                :guardiansPhotos="student.guardianPhotoAndNameList"
                            />
                        </div>
                    </div>

                </template>
            </cards-container>

        </div>

    </div>
</div>
</template>

<script>
import HeaderAdministration from '../header/headeradministration.vue';
import LateralNav from '../lateralnav/lateralnav.vue';
import LateralCard from '../card/lateralcard.vue';
import NavAdministration from '../navadministration/navadministration.vue';
import CardsContainer from '../guardiancomponents/cardscontainer.vue';
import StudentCard from '../card/studentcard.vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    name: "administrationTeacher",
    components: {
        HeaderAdministration,
        LateralNav,
        LateralCard,
        NavAdministration,
        CardsContainer,
        StudentCard
    },
    data() {
        return {
            sort: [
                { text: 'Name', value: 'personDTO.firstName' },
                { text: 'Control number', value: 'studentDTO.controlNumber' },
                { text: 'Grade', value: 'studentDTO.academicYear' }
            ],
            originalList: null,
            sortParameter: '',
            listToFilter: null
        }
    },
    created() {
        this.$store.dispatch('getAdministrationStudentDashboard');
    },
    computed: {
        ...mapGetters([
            'studentList',
            'studentListLoaded'
        ])
    },
    methods: {
        sortByParameter: function (sortParameter) {
            if (sortParameter == 'personDTO.firstName') {
                this.$store.commit('updateStudentList', _.sortBy(this.studentList, [function(o) { return o.personDTO.firstName; }]) );
            } 
            if (sortParameter == 'studentDTO.controlNumber') {
                this.$store.commit('updateStudentList', _.sortBy(this.studentList, [function(o) { return o.studentDTO.controlNumber; }]) );
            }
            if (sortParameter == 'studentDTO.academicYear') {
                this.$store.commit('updateStudentList', _.sortBy(this.studentList, [function(o) { return o.studentDTO.academicYear; }]) );
            }
        },
        searchByParameter: function (searchParameter) {
            var list = [];
            var listCopy;
            _.forEach(this.originalList, function(value, key) {
                if (_.startsWith(value.personDTO.firstName.toLowerCase(), searchParameter.toLowerCase())) {
                    list.push(value);   
                }
            })
            this.$store.commit('updateStudentList', list );
        }
    },
    watch: {
        studentListLoaded() {
            this.originalList = this.studentList;
            var list = [];
            _.forEach(this.studentList, function(value, key) {
                list.push(value.personDTO.firstName);
            });
            this.listToFilter = list;
        }
    }
}
</script>

<style scoped>
.addButton {
    border: 1px solid green;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    bottom: 2%;
    right: 1%;
    position: absolute;
}
</style>