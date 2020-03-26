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
            <nav-administration/>

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

                    <group-card
                        startHour="08:00"
                        endHour="09:00"
                        groupCode="MA-101"
                        classroom="R03"
                        students="25"
                        weekdays="L-V"
                    />

                </template>
            </cards-container>

            <div class="addButton" @click="openNewGroup()" ref="showNewGroup">
                <font-awesome-icon
                    style="width: 46px; height: 46px; color: green; position: absolute; left: 20.83%; right: 20.83%; top: 20.83%; bottom: 20.83%;"
                    icon="plus"
                />
            </div>
            <new-group/>

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
import GroupCard from '../card/groupcard.vue';
import NewGroup from '../forms/newgroup.vue';

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
    methods: {
        openNewGroup: function () {
            this.$root.$emit('bv::show::modal', 'new-group', '#showNewGroup')
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