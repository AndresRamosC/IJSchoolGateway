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
            <nav-administration/>

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
                
                    <teacher-card
                        name="Ruben Aguirre"
                        employeeId="T-001"
                        subjectsQty="2"
                        groupsQty="4"
                    />

                </template>
            </cards-container>

            <div class="addButton" @click="openNewTeacher()" ref="showNewTeacher">
                <font-awesome-icon
                    style="width: 46px; height: 46px; color: green; position: absolute; left: 20.83%; right: 20.83%; top: 20.83%; bottom: 20.83%;"
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
    methods: {
        openNewTeacher: function () {
            this.$root.$emit('bv::show::modal', 'new-teacher', '#showNewTeacher')
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