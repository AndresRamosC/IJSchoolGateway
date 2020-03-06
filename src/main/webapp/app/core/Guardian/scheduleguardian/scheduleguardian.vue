<template>
<div>
    <div class="container-fluid p-0 justify-content-center" id="schedule">
        <router-view></router-view>
    </div>
    <!-- nav -->
    <bottom-nav/>
</div>
</template>

<script>
import HeaderBell from '../headerbell/headerbell.vue';
import BottomNav from '../bottomnav/bottomnav.vue';

export default {
    name: "scheduleguardian",
    components: {
        HeaderBell,
        BottomNav
    }
}
</script>

<style scoped>
    .activeButton {
        background: #1071A3;
        border: 1px solid #1071A3;
        box-sizing: border-box;
        border-radius: 10px;
        color: #FFFFFF;
    }

    .inactiveButton {
        background: #FFFFFF;
        border: 1px solid #1071A3;
        box-sizing: border-box;
        border-radius: 10px;
        color: #1071A3;
    }

    .daySectionBox {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    #schedule {
        min-height:100vh;
    }
</style>