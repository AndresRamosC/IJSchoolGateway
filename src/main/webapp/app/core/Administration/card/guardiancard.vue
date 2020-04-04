<template>
    <div class="row m-0 py-2" style="border-bottom: 1px solid #559FD5;">
        <div class="col-1 px-0 d-flex justify-content-center">
            <div>
                <img class="circle-img p-0" style="border-color: purple" :src="photo"/>
            </div>
        </div>
        <div class="col-5 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue"> {{name}} </h2>
        </div>
        <div class="col-4 pr-0 d-flex align-items-center">
            <div class="pr-2" v-for="(student, index) in studentsPhotos" :key="index">
                <img class="circle-img p-0" style="border-color: red" :src="'data:' + student.photographContentType + ';base64, ' + student.photograph"/>
            </div>
        </div>
        <div class="col-1 p-0 d-flex align-items-center justify-content-end">
            <div class="circle mx-1"  style="border-color: #1071a3">
                <font-awesome-icon
                    style="width: 55px; height: 55px; color: #1071a3;"
                    class="px-2"
                    icon="pen"
                />
            </div>
            <div class="circle mx-1"  style="border-color: red;">
                <font-awesome-icon
                    style="width: 55px; height: 55px; color: red"
                    icon="times"
                />
            </div>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center justify-content-start">
        </div>
    </div>
</template>

<script>
export default {
    name: "guardiancard",
    props: {
        name: String,
        photo: String,
        studentsPhotos: Array
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