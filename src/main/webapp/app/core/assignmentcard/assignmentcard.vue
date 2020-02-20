<template>
<div class="container card">
    <div class="row">

        <!-- subject color div -->
        <div :style="style"></div>

        <!-- assignment data  -->
        <div class="col">
            <div class="row">
                <div class="col-12 pl-1 d-flex align-self-center">
                    <p class="font-weight-bold text-left text-capitalize m-0 blue"> {{assignmentName}} </p>
                </div>

                <div class="col-2 p-0">
                    <p class="font-weight-regular text-left pl-1 p-0 m-0 gray"> {{dueTime}} </p>
                </div>

                <div class="col-8 pl-2 p-0">
                    <p class="font-weight-regular text-left text-capitalize p-0 m-0 gray"> {{subjectName}} </p>
                </div>

                <div class="col-1 p-0">
                    <font-awesome-icon class="blue" style="width: 15px; height: 15px;" icon="paperclip"/>
                </div>

                <div class="col-1 p-0">
                    <p class="font-weight-regular text-left p-0 m-0 gray"> {{attachmentsQty}} </p>
                </div>
            </div>
        </div>

    </div>

</div>
</template>

<script>
export default {
    name: "assignmentcard",
    props: {
        subjectColor: String,
        assignmentName: String,
        dueTime: String,
        subjectName: String,
        attachmentsQty: String
    },
    computed: {
        style () {
        return 'width: 2px; background-color: ' +  this.subjectColor;
      }
    }
}
</script>

<style scoped>
    .card {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
    }
</style>