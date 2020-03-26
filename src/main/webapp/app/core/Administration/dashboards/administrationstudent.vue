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

                    <student-card
                        name="Kyle Brian Craven"
                        controlNumber="15050993"
                        grade="8th"
                    />

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
    methods: {

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