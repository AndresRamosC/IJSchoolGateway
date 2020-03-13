<template>
<div class="container p-0 mt-2 mb-2 box" @click="updateAndGo">
    <div class="row m-0">
        <div class="col-1 p-0">
            <font-awesome-icon class="blue" style="width: 16px; height: 16px;" icon="paperclip"/>
        </div>
        <div class="col-4 p-0">
            <p v-if="numberAttch == 1" class="gray m-0" v-text="numberAttch + ' ' + $t('student.assignments.attachment')"> {{numberAttch}} attachment</p>
            <p v-if="numberAttch > 1" class="gray m-0" v-text="numberAttch + ' ' + $t('student.assignments.attachments')"> {{numberAttch}} attachments</p>
        </div>
        <div class="col-4 p-0">
            <p style="fontSize: 0.8em;" class="blue pl-2 pt-1 m-0" v-text="$t('student.assignments.status.' + getStatus.toLowerCase())"> {{getStatus}}</p>
        </div>
        <div class="col-1 p-0">
            <font-awesome-icon class="blue" style="width: 16px; height: 16px;" icon="calendar-day"/>
        </div>
        <div class="col-2 p-0">
            <p class="gray m-0"> {{dueDate}}</p>
        </div>
    </div>
    <div class="row m-0 w-100">
        <div class="col-12 p-2">
            <p class="gray m-0"> {{description}}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "assignmentitem",
    props: {
        assignmentIndex: Number,
        numberAttch: Number,
        status: Boolean,
        dueDate: String,
        description: String
    },
    computed: {
        getStatus: function () {
            return this.status ? "Delivered" : 'Not delivered';
        }
    },
    methods: {
        updateAndGo() {
            this.$store.commit('updateSelectedAssignment', this.assignmentIndex);
            this.$router.push('/student-course-overview/assignments/view')
        }
    }
}
</script>

<style scoped>
    .box {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
    }
</style>