<template>
    <div class="row m-0 py-2" style="border-bottom: 1px solid #559FD5;">
        <div class="col-1 pr-0 d-flex align-items-center">
            <font-awesome-icon
                style="width: 50px; height: 50px; color: black"
                class=""
                :icon="icon"
            />
        </div>
        <div class="col-1 pr-0 d-flex align-items-center">
            <div class="circle" :style="style">
            </div>
        </div>
        <div class="col-3 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue"> {{name}} </h2>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue">{{code}}</h2>
        </div>
        <div class="col-2 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue">{{department}}</h2>
        </div>
        <div class="col-2 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue"> {{groupsQty}} </h2>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center justify-content-end">
            <div class="circle-btn"  style="border-color: #1071a3">
                <font-awesome-icon
                    style="width: 55px; height: 55px; color: #1071a3;"
                    class="px-2"
                    icon="pen"
                />
            </div>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center justify-content-start">
            <div class="circle-btn"  style="border-color: red;">
                <font-awesome-icon
                    style="width: 55px; height: 55px; color: red"
                    icon="times"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "subjectcard",
    props: {
        icon: String,
        color: String,
        name: String,
        code: String,
        department: String,
        groupsQty: Number,
    },
    computed: {
        style () {
            return 'backgroundColor: ' + this.color;
        }
    }
}
</script>

<style scoped>
  .circle {
    width: 40px!important;
    height: 40px!important; 
    border-radius: 50%;
  }

   .circle-btn {
    width: 60px!important;
    height: 60px!important; 
    border-radius: 50%;
    border: 2px solid #ffffff;
  }
</style>