<template>
    <div class="row m-1 mt-2 month">
        <div class="col-12">
            <h3 class="font-weight-bold text-center blue">{{month}}</h3>
        </div>
        <div class="row w-100">
            <div class="col-6"><p class="text-left m-0 pl-2 blue">Homeworks</p></div>
            <div class="col-6"><p class="text-right m-0 gray">{{homeworks}}</p></div>
        </div>
        <!-- <div class="row w-100">
            <div class="col-6"><p class="text-left m-0 pl-2 blue">Test</p></div>
            <div class="col-6"><p class="text-right m-0 gray">{{test}}</p></div>
        </div> -->
        <div class="row mb-2 w-100">
            <div class="col-6"><p class="font-weight-bold text-left m-0 pl-2 blue">Total</p></div>
            <div class="col-6"><p class="font-weight-bold text-right m-0 blue">{{total}}</p></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "assignmentitem",
    props: {
        month: String,
        homeworks: String,
        test: String,
        total: Number
    }
}
</script>

<style scoped>
    .month {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
    }
</style>