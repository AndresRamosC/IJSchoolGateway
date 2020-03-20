<template>
<div class="container-fluid">
    <div class="row m-0">
        <div class="col-1"></div>
        <div class="col-5">
            <p class="blue">Name</p>
        </div>
        <div class="col-4">
            <p class="blue">Student(s)</p>
        </div>
        <div class="col-2"></div>
    </div>

    <div class="row m-0">
        <div class="col-1 pr-0 d-flex justify-content-center">
            <div class="circle"  style="border-color: purple">
                <img class="p-0 w-100" style="borderRadius: 50%;" src="https://www.trecebits.com/wp-content/uploads/2019/02/Persona-1-445x445.jpg"/>
            </div>
        </div>
        <div class="col-5 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue"> Dwight Schrute </h2>
        </div>
        <div class="col-4 pr-0 d-flex align-items-center">
            <div class="circle"  style="border-color: red">
                <img class="p-0 w-100" style="borderRadius: 50%;" src="https://www.trecebits.com/wp-content/uploads/2019/02/Persona-1-445x445.jpg"/>
            </div>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center">
            <div class="circle"  style="border-color: blue">
                <font-awesome-icon
                    style="width: 50px; height: 50px; top: 10%; color: blue; position: relative;"
                    icon="pen"
                />
            </div>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center">
            <div class="circle"  style="border-color: red;">
                <font-awesome-icon
                    style="width: 55px; height: 55px; color: red;"
                    icon="times"
                />
            </div>
        </div>
    </div>

</div>    
</template>

<script>
export default {
    name: "cardscontainer"    
}
</script>

<style scoped>
  .circle {
    width: 60px; height: 60px; 
    border-radius: 50%;
    border: 3px solid #ffffff;
  }
</style>