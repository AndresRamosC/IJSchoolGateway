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
                />
                <lateral-card
                    name="Teacher"
                    color="cyan"
                />
                <lateral-card
                    name="Guardian"
                    color="purple"
                />
                <lateral-card
                    name="Student"
                    color="red"
                />
            </template>
        </lateral-nav>

        <div class="col-12 col-lg-11  p-0" style="position: relative">
            <nav-administration/>

            <cards-container/>

            <div class="addButton">
                <font-awesome-icon
                    style="width: 46px; height: 46px; color: green; position: absolute; left: 20.83%; right: 20.83%; top: 20.83%; bottom: 20.83%;"
                    icon="plus"
                />
            </div>

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

export default {
    name: "administrationGuardian",
    components: {
        HeaderAdministration,
        LateralNav,
        LateralCard,
        NavAdministration,
        CardsContainer
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

.administration-container {

}
</style>