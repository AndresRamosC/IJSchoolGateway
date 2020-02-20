<template>
<div class="container p-0 mt-2 mb-2 box">
<router-link class="p-0 m-0 " to="/course-overview/assignments/view">
    <div class="row m-0">
        <div class="col-1 p-0">
            <font-awesome-icon class="blue" style="width: 16px; height: 16px;" icon="paperclip"/>
        </div>
        <div class="col-4 p-0">
            <p class="gray m-0"> {{numberAttch}} attachment</p>
        </div>
        <div class="col-4 p-0">
            <p style="fontSize: 0.8em;" class="blue pl-2 pt-1 m-0"> {{status}}</p>
        </div>
        <div class="col-1 p-0">
            <font-awesome-icon class="blue" style="width: 16px; height: 16px;" icon="calendar-day"/>
        </div>
        <div class="col-2 p-0">
            <p class="gray m-0"> {{dueDate}}</p>
        </div>
    </div>
    <div class="row m-0">
        <div class="col-12 p-2">
            <p class="gray m-0"> {{description}}</p>
        </div>
    </div>
</router-link>
</div>
</template>

<script>
export default {
    name: "assignmentitem",
    props: {
        numberAttch: String,
        status: String,
        dueDate: String,
        description: String
    }
}
</script>

<style scoped>
    .box {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
    }
</style>