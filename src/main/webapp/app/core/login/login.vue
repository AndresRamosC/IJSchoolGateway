<template>
<div class="h-100">

<div v-if="!authenticated" class="container-fluid">
    <div class="row">
        <div class="col-12">
            <h1 class="blue mt-2 font-weight-bold text-center">Welcome to<br/> IJ School App</h1>
        </div>
        <div class="col-12 d-flex justify-content-center">
            <font-awesome-icon class="blue" style="width: 100px; height: 100px;" icon="graduation-cap"/>
        </div>
        <div class="col-12">
            <p style="fontSize: 1.2em;" class="blue text-center">This app is app will help you as a guardian to know when you're student enters and exit the school, also you will have access to his courses and their data such as assignments, grades and his attendance record.</p>
        </div>
        <div class="col-12 mt-4 d-flex justify-content-center">
            <b-button class="activeButton" @click="openLogin()">Go to login</b-button>
        </div>
    </div>
</div>

<student-selection v-if="authenticated && hasAnyAuthority('ROLE_GUARDIAN')"/>
<student-dashboard v-if="authenticated && hasAnyAuthority('ROLE_STUDENT')"/>
<teacher-dashboard v-if="authenticated && hasAnyAuthority('ROLE_EMPLOYEE_TEACHER')"/>
<administration-guardian v-if="authenticated && hasAnyAuthority('ROLE_ADMIN')"/>

</div>
</template>

<script lang="ts" src="./login.component.ts">
</script>

<style scoped>
    .activeButton {
        background: #1071A3;
        border: 1px solid #1071A3;
        box-sizing: border-box;
        border-radius: 10px;
        color: #FFFFFF;
    }
</style>