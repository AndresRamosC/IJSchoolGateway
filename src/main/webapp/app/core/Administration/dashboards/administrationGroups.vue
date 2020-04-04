<template>
<div class="container-fluid h-100 p-0">
    <header-administration />

    <div class="row m-0 administration-container" style="height: 95%;">

        <lateral-nav
            title="Roles"
        >
            <template v-slot:content>
                <div class="w-100" v-for="(subject, index) in subjectsList" :key="index">
                    <lateral-card
                        @updateSubject="updateSubject"
                        :name="subject.subjectDTO.courseName"
                        :color="subject.subjectDTO.colorCode"
                        :subjectId="subject.subjectDTO.id"
                    />
                </div>
            </template>
        </lateral-nav>

        <div class="col-12 col-lg-11  p-0" style="position: relative">
            <nav-administration
                v-if="groupsListLoaded"
                :qty="groupsList.length"
                :type="groupsList.length > 1 ? 'groups' : 'group'"
                :sortOptions="sort"
                :options="listToFilter"
                @sortList="sortByParameter"
                @filterList="searchByParameter"
            />

            <cards-container>
                <template v-slot:headers>

                    <div class="row m-0 mb-2 d-flex align-content-center py-2" style="border-bottom: 1px solid #1071A3;">
                        <div class="col-1 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Start hour</h2>
                        </div>
                        <div class="col-1 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">End our</h2>
                        </div>
                        <div class="col-1 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Classroom</h2>
                        </div>
                        <div class="col-1 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Students</h2>
                        </div>
                        <div class="col-2 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Group code</h2>
                        </div>
                        <div class="col-2 pr-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Weekdays</h2>
                        </div>
                        <div class="col-2 px-0 d-flex align-items-center">
                            <h2 class="font-weight-bold m-0 light-blue">Teacher</h2>
                        </div>
                        <div class="col-2 pr-0 d-flex align-items-center">
                        </div>
                    </div>

                </template>

                <template  v-slot:cards>

                    <div v-if="selectedSubject == null">
                        <div class="row m-0">
                            <div class="col-12 p-0">
                                <h2 class="font-weight-bold text-center blue">Select a subject of the left first</h2>
                            </div>
                        </div>
                    </div>
                    <div v-else v-for="(group, index) in groupsList" :key="index">
                        <group-card
                            :startHour="group.classGroupAndSubjectDto.classScheduleDTOS"
                            :endHour="group.classGroupAndSubjectDto.classScheduleDTOS"
                            :groupCode="group.classGroupAndSubjectDto.groupCode"
                            :classroom="group.classGroupAndSubjectDto.classRoom"
                            :students="group.classGroupAndSubjectDto.classGroupSize"
                            :weekdays="group.classGroupAndSubjectDto.classScheduleDTOS"
                        />
                    </div>

                </template>
            </cards-container>

            <div v-if="selectedSubject != null" class="addButton" @click="openNewGroup()" ref="showNewGroup">
                <font-awesome-icon
                    style="width: 46px; height: 46px; color: white; position: absolute; left: 20.83%; right: 20.83%; top: 20.83%; bottom: 20.83%;"
                    icon="plus"
                />
            </div>
            <new-group
                v-if="selectedSubject != null"
                :subId="selectedSubject"
            />

        </div>

    </div>
</div>
</template>

<script>
import HeaderAdministration from '../header/headeradministration.vue';
import LateralNav from '../lateralnav/lateralnav.vue';
import LateralCard from '../card/subjectLateralCard.vue';
import NavAdministration from '../navadministration/navadministration.vue';
import CardsContainer from '../guardiancomponents/cardscontainer.vue';
import GroupCard from '../card/groupcard.vue';
import NewGroup from '../forms/newgroup.vue';
import { mapGetters } from 'vuex';

export default {
    name: "administrationTeacher",
    components: {
        HeaderAdministration,
        LateralNav,
        LateralCard,
        NavAdministration,
        CardsContainer,
        NewGroup,
        GroupCard
    },
    data() {
        return {
            selectedSubject: null,
            sort: [
                { text: 'Start hour', value: 'classGroupAndSubjectDto.classScheduleDTOS[0].startHour' },
                { text: 'End hour', value: 'classGroupAndSubjectDto.classScheduleDTOS[0].endHour' },
                { text: 'Classroom', value: 'classGroupAndSubjectDto.classRoom' },
                { text: 'Students', value: 'classGroupAndSubjectDto.classGroupSize' }
            ],
            originalList: null,
            sortParameter: '',
            listToFilter: null
        }
    },
    created() {
        this.$store.dispatch('getAdministrationSubjectsDashboard');
    },
    methods: {
        openNewGroup: function () {
            this.$root.$emit('bv::show::modal', 'new-group', '#showNewGroup')
        },
        updateSubject: function (subjectId) {
            this.selectedSubject = subjectId;
        },
        sortByParameter: function (sortParameter) {
            if (sortParameter == 'classGroupAndSubjectDto.classScheduleDTOS[0].startHour') {
                this.$store.commit('updateGroupsList', _.sortBy(this.groupsList, [function(o) { return o.classGroupAndSubjectDto.classScheduleDTOS[0].startHour; }]) );
            } 
            if (sortParameter == 'classGroupAndSubjectDto.classScheduleDTOS[0].endHour') {
                this.$store.commit('updateGroupsList', _.sortBy(this.groupsList, [function(o) { return o.classGroupAndSubjectDto.classScheduleDTOS[0].endHour; }]) );
            }
            if (sortParameter == 'classGroupAndSubjectDto.classRoom') {
                this.$store.commit('updateGroupsList', _.sortBy(this.groupsList, [function(o) { return o.classGroupAndSubjectDto.classRoom; }]) );
            }
            if (sortParameter == 'classGroupAndSubjectDto.classGroupSize') {
                this.$store.commit('updateGroupsList', _.sortBy(this.groupsList, [function(o) { return o.classGroupAndSubjectDto.classGroupSize; }]) );
            }
        },
        searchByParameter: function (searchParameter) {
            var list = [];
            var listCopy;
            _.forEach(this.originalList, function(value, key) {
                if (_.startsWith(value.classGroupAndSubjectDto.groupCode.toLowerCase(), searchParameter.toLowerCase())) {
                    list.push(value);   
                }
            })
            this.$store.commit('updateGroupsList', list );
        }
    },
    computed: {
        ...mapGetters([
            'subjectsList',
            'subjectsListLoaded',
            'groupsListLoaded',
            'groupsList'
        ])
    },
    watch: {
        selectedSubject() {
            this.$store.dispatch('getGroupsBySubjectId', this.selectedSubject);
        },
        groupsListLoaded() {
            this.originalList = this.groupsList;
            var list = [];
            _.forEach(this.groupsList, function(value, key) {
                list.push(value.classGroupAndSubjectDto.groupCode);
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