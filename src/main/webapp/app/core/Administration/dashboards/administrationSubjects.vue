<template>
<div class="container-fluid h-100 p-0">
    <header-administration />

    <div class="row m-0 administration-container" style="height: 95%;">

        <lateral-nav
            title="Roles"
        >
            <template v-slot:content>
                <lateral-card
                    name="Math"
                    color="green"
                />
                <lateral-card
                    name="Geography"
                    color="cyan"
                />
                <lateral-card
                    name="Spanish"
                    color="purple"
                />
                <lateral-card
                    name="History"
                    color="red"
                />
            </template>
        </lateral-nav>

        <div class="col-12 col-lg-11  p-0" style="position: relative">
            <nav-administration
                v-if="subjectsListLoaded"
                :qty="subjectsList.length"
                :type="subjectsList.length > 1 ? 'subjects' : 'subject'"
                :sortOptions="sort"
                :options="listToFilter"
                @sortList="sortByParameter"
                @filterList="searchByParameter"
            />

            <cards-container>
                <template v-slot:headers>

                    <div class="row m-0 mb-2 d-flex align-content-center py-2" style="border-bottom: 1px solid #1071A3;">
                        <div class="col-1 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Icon</h2>
                        </div>
                        <div class="col-1 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Color</h2>
                        </div>
                        <div class="col-3 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Name</h2>
                        </div>
                        <div class="col-1 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Code</h2>
                        </div>
                        <div class="col-2 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Department</h2>
                        </div>
                        <div class="col-2 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Group(s)</h2>
                        </div>
                        <div class="col-2 pr-0 d-flex align-items-center">
                        </div>
                    </div>

                </template>

                <template  v-slot:cards>

                    <div v-if="subjectsListLoaded">
                        <div v-for="(subject, index) in subjectsList" :key="index">
                            <subject-card
                                :icon="subject.subjectDTO.iconCode"
                                :color="subject.subjectDTO.colorCode"
                                :name="subject.subjectDTO.courseName"
                                :code="subject.subjectDTO.courseCode"
                                :department="subject.subjectDTO.department"
                                :groupsQty="subject.amount"
                            />
                        </div>
                    </div>

                </template>
            </cards-container>

            <div class="addButton" @click="openNewSubject()" ref="showNewSubject">
                <font-awesome-icon
                    style="width: 46px; height: 46px; color: white; position: absolute; left: 20.83%; right: 20.83%; top: 20.83%; bottom: 20.83%;"
                    icon="plus"
                />
            </div>
            <new-subject/>

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
import SubjectCard from '../card/subjectcard.vue';
import NewSubject from '../forms/newsubject.vue';
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
        NewSubject,
        SubjectCard
    },
    data() {
        return {
            sort: [
                { text: 'Name', value: 'courseName' },
                { text: 'Code', value: 'courseCode' },
                { text: 'Groups', value: 'amount' }
            ],
            originalList: null,
            sortParameter: '',
            listToFilter: null
        }
    },
    created() {
        this.$store.dispatch('getAdministrationSubjectsDashboard');
    },
    computed: {
        ...mapGetters([
            'subjectsList',
            'subjectsListLoaded'
        ])
    },
    methods: {
        openNewSubject: function () {
            this.$root.$emit('bv::show::modal', 'new-subject', '#showNewSubject')
        },
        sortByParameter: function (sortParameter) {
            if (sortParameter == 'amount') {
                this.$store.commit('subjectsListList', _.sortBy(this.subjectsList, [function(o) { return o.amount; }]) );
            } else {
                this.$store.commit('subjectsListList', _.sortBy(this.subjectsList, [function(o) { return o.subjectDTO.courseName; }]) );
            }
        },
        searchByParameter: function (searchParameter) {
            var list = [];
            var listCopy;
            _.forEach(this.originalList, function(value, key) {
                if (_.startsWith(value.subjectDTO.courseName.toLowerCase(), searchParameter.toLowerCase())) {
                    list.push(value);   
                }
            })
            this.$store.commit('subjectsListList', list );
        }
    },
    watch: {
        subjectsListLoaded() {
            this.originalList = this.subjectsList;
            var list = [];
            _.forEach(this.subjectsList, function(value, key) {
                list.push(value.subjectDTO.courseName);
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