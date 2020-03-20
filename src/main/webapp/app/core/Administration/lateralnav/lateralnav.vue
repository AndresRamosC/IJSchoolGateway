<template>
<div class="col-12 col-lg-1 pr-0 lateral">

    <div class="row h-100 m-0">

        <div class="row m-0" style="height: fit-content;">
            <div class="col-12 px-0">
                <h1 class="font-weight-bold text-left pt-2 blue"> {{title}} </h1>
            </div>
            <slot name="content"></slot>
        </div>


        <div class="col-12 px-0 d-flex align-self-end">
            <div class="row m-0">
                <h4 class="blue m-0 pr-2">IJ Robotics</h4>
                <font-awesome-icon
                    class="blue align-self-center"
                    style="width: 20px; height: 20px;"
                    icon="copyright"
                />
            </div>
        </div>
        
    </div>

</div>    
</template>

<script>
export default {
    name: "lateralnav",
    props: {
        title: String
    }
}
</script>

<style scoped>
    .lateral {
        border-right: 1px solid #1071a3;
    }
</style>