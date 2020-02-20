<template>
    <div class="container-fluid p-0 justify-content-center" id="course">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "courseoverview"
}
</script>

<style scoped>
    #course {
        min-height:100vh;
    }
</style>