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
                v-if="teacherListLoaded"
                :qty="teacherList.length"
                :type="teacherList.length > 1 ? 'teachers' : 'teacher'"
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
                            <h3 class="font-weight-bold m-0 light-blue">Employee id</h3>
                        </div>
                        <div class="col-2">
                            <h3 class="font-weight-bold m-0 light-blue">Subject(s)</h3>
                        </div>
                        <div class="col-2">
                            <h3 class="font-weight-bold m-0 light-blue">Group(s)</h3>
                        </div>
                        <div class="col-1"></div>
                    </div>

                </template>

                <template  v-slot:cards>
                
                    <div v-if="teacherListLoaded">
                        <div v-for="(teacher, index) in teacherList" :key="index">
                            <teacher-card
                                :photo="'data:' + teacher.personDTO.photographContentType + ';base64, ' + teacher.personDTO.photograph"
                                :name="teacher.personDTO.firstName + ' ' + teacher.personDTO.lastName"
                                :employeeId="teacher.employeeDTO.controlNumber"
                                :subjectsQty="teacher.subjectsAmount"
                                :groupsQty="teacher.groupsAmount"
                            />
                        </div>
                    </div>

                </template>
            </cards-container>

            <div class="addButton" @click="openNewTeacher()" ref="showNewTeacher">
                <font-awesome-icon
                    style="width: 46px; height: 46px; color: white; position: absolute; left: 20.83%; right: 20.83%; top: 20.83%; bottom: 20.83%;"
                    icon="plus"
                />
            </div>
            <new-teacher/>

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
import TeacherCard from '../card/teachercard.vue';
import NewTeacher from '../forms/newteacher.vue';
import { mapGetters } from 'vuex';

export default {
    name: "administrationTeacher",
    components: {
        HeaderAdministration,
        LateralNav,
        LateralCard,
        NavAdministration,
        CardsContainer,
        NewTeacher,
        TeacherCard
    },
    data() {
        return {
            sort: [
                { text: 'Name', value: 'personDTO.firstName' },
                { text: 'Employee id', value: 'employeeDTO.controlNumber' },
                { text: 'Subjects', value: 'subjectsAmount' },
                { text: 'Groups', value: 'groupsAmount' }
            ],
            originalList: null,
            sortParameter: '',
            listToFilter: null
        }
    },
    methods: {
        openNewTeacher: function () {
            this.$root.$emit('bv::show::modal', 'new-teacher', '#showNewTeacher')
        },
        sortByParameter: function (sortParameter) {
            if (sortParameter == 'personDTO.firstName') {
                this.$store.commit('updateTeacherList', _.sortBy(this.teacherList, [function(o) { return o.personDTO.firstName; }]) );
            } 
            if (sortParameter == 'employeeDTO.controlNumber') {
                this.$store.commit('updateTeacherList', _.sortBy(this.teacherList, [function(o) { return o.employeeDTO.controlNumber; }]) );
            }
            if (sortParameter == 'subjectsAmount') {
                this.$store.commit('updateTeacherList', _.sortBy(this.teacherList, [function(o) { return o.subjectsAmount; }]) );
            }
            if (sortParameter == 'groupsAmount') {
                this.$store.commit('updateTeacherList', _.sortBy(this.teacherList, [function(o) { return o.groupsAmount; }]) );
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
            this.$store.commit('updateTeacherList', list );
        }
    },
    created() {
        this.$store.dispatch('getAdministrationTeacherDashboard');
    },
    computed: {
        ...mapGetters([
            'teacherList',
            'teacherListLoaded'
        ])
    },
    watch: {
        teacherListLoaded() {
            this.originalList = this.teacherList;
            var list = [];
            _.forEach(this.teacherList, function(value, key) {
                list.push(value.personDTO.firstName);
            });
            this.listToFilter = list;
        }
    }
}
</script>

<style scoped>
.addButton {
    background-color: green;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    bottom: 2%;
    right: 1%;
    position: absolute;
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.25);
}
</style>