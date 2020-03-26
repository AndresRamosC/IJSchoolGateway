<template>
    <div class="row m-0 py-2" style="border-bottom: 1px solid #559FD5;">
        <div class="col-1 px-0 d-flex justify-content-center">
            <div>
                <img class="circle-img p-0" style="border-color: #05BFFA" src="https://www.trecebits.com/wp-content/uploads/2019/02/Persona-1-445x445.jpg"/>
            </div>
        </div>
        <div class="col-3 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue"> {{name}} </h2>
        </div>
        <div class="col-2 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue"> {{employeeId}} </h2>
        </div>
        <div class="col-2 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue">{{subjectsQty}} subjects</h2>
        </div>
        <div class="col-2 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue">{{groupsQty}} groups</h2>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center justify-content-end">
            <div class="circle"  style="border-color: #1071a3">
                <font-awesome-icon
                    style="width: 55px; height: 55px; color: #1071a3;"
                    class="px-2"
                    icon="pen"
                />
            </div>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center justify-content-start">
            <div class="circle"  style="border-color: red;">
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
    name: "teachercard",
    props: {
        name: String,
        employeeId: String,
        subjectsQty: Number,
        groupsQty: Number,
    }
}
</script>

<style scoped>
  .circle {
    width: 60px!important;
    height: 60px!important; 
    border-radius: 50%;
    border: 2px solid #ffffff;
  }

  .circle-img {
    width: 60px!important;
    height: 60px!important; 
    border-radius: 50%;
    border: 2px solid #ffffff;
  }
</style>