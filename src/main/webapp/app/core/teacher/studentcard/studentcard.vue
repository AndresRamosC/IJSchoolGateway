<template>
    <div class="container card p-2 mt-2">
        <div class="row m-0">
        <div class="col-2 p-0">
            <div class="d-flex pb-2 justify-content-center circle" >
                <img class="p-0 img-fluid" style="width:40px; height: 40px; borderRadius: 50%;" :src="photo"/>
            </div>
        </div>
            <div class="col-10 d-flex align-items-center">
                <p class="text-left m-0 gray">{{name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "studentcard",
    props: {
        name: String,
        photo: String
    }
}
</script>

<style scoped>
.card {
    background: #FFFFFF;
    box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
}

  .circle {
    background-color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    box-shadow: 1px 3px 5px 0px rgba(0, 0, 0, 0.25);
  }
</style>