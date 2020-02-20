<template>
<div>
<div class="container-fluid p-0 justify-content-center" id="dashboard">
    <!-- app header -->
    <div class="row sticky-top pl-2 pr-4 pt-2 pb-1 m-0 blueBG">
        <!-- back arrow  -->
        <div class="col-2 pl-0 d-flex flex-wrap align-content-center">
          <router-link to="/">
            <font-awesome-icon class="white" style="width: 40px; height: 30px;" icon="arrow-left"/>
          </router-link>
        </div>
        <!-- section title  -->
        <div class="col-8 pl-0 d-flex flex-wrap align-content-center">
          <h1  class="font-weight-bold white">Dashboard</h1>
        </div>
        <!-- notifications icon  -->
        <div class="col-2 d-flex flex-wrap align-content-center">
           <font-awesome-icon class="white" style="width: 24px; height: 24px;" icon="bell"/>
        </div>
    </div>

    <!-- student photo container  -->
    <div style="position: relative">
    <div style="padding-top: 6rem !important;" class="row pb-0 m-0 d-flex justify-content-center blueBG">
        <div class="d-flex justify-content-center circle" style="width: 115px; height: 115px; ">
          <img class="p-0 w-100" style="borderRadius: 50%;" src="https://www.buscabiografias.com/img/people/Francisco-M%C3%A1rquez.jpg"/>
        </div>
          <!-- container separator  -->
        <div style="zIndex: 1" class="col-12 divider"></div>
    </div>

    <!-- student info  -->
    <div class="row m-0 pt-2">
      <div class="col-12">
          <h1 class="font-weight-regular text-center blue">Francisco Marquez</h1>
      </div>
      <div class="col-12">
          <p class="font-weight-regular text-center gray">5th Grade</p>
      </div>
    </div>

    <!-- student summary of the day (shadow box) -->
    <div class="container pt-3 todaySummaryBox" style="width: 90%;">
      <div class="row d-flex justify-content-center">
        <div>
          <!-- bvox title -->
          <p class="font-weight-bold text-center m-0 blue">Today</p>
        </div>
      </div>

      <!-- data -->
      <div class="row p-2 d-flex justify-content-start">

        <!-- courses info  -->
        <div class="col p-0">

          <!-- current course  -->
          <div class="col-12 p-0 pt-1 pb-1">
            <h5 class="font-weight-regular text-left p-0 m-0 blue">3 / 6 courses</h5>
            <p class="font-weight-regular text-left p-0 m-0 gray">English</p>
          </div>

          <!-- last course -->
          <div class="col-12 p-0 pt-1 pb-1">
            <h5 class="font-weight-regular text-left p-0 m-0 blue">End of courses</h5>
            <p class="font-weight-regular text-left p-0 m-0 gray">15:00</p>
          </div>

        </div>

        <!-- divider  -->
        <div class="blueBG" style="width: 2px;"></div>

        <!-- assistance info  -->
        <div class="col p-0">

          <!-- entrance time  -->
          <div class="col-12 p-0 pt-1 pb-1 pl-2">
            <h5 class="font-weight-regular text-left p-0 m-0 blue">Entrance</h5>
            <p class="font-weight-regular text-left p-0 m-0 gray">08:10 - late</p>
          </div>

          <!-- exit time -->
          <div class="col-12 p-0 pt-1 pb-1 pl-2">
            <h5 class="font-weight-regular text-left p-0 m-0 blue">Exit</h5>
            <p class="font-weight-regular text-left p-0 m-0 gray">still at school</p>
          </div>

        </div>

      </div>

    </div>

      <!-- early leave button  -->
      <div class="container pt-3 pb-3 d-flex justify-content-center">
        <div class="row">
          <div class="col-12 blueButton">
            <p class="p-0 m-1 text-center white">Ask for early leave</p>
          </div>
        </div>
      </div>

      </div>

</div>

<bottomnav/>

</div>
</template>

<script>
import bottomnav from '../bottomnav/bottomnav.vue';

export default {
    name: "guardiandashboard",
    components: {
      bottomnav
    }
}
</script>

<style scoped>
  .blueBG {
    background-color: #1071A3;
  }

  .circle {
    background-color: white;
    border-radius: 50%;
    width: 115px;
    position: absolute;
    z-index: 10;
    top: 1%;
    box-shadow: 0px 2px 5px 4px rgba(0, 0, 0, 0.25);
  }

  .divider {
    background: #FFFFFF;
    border-radius: 100px 100px 0px 0px;
    height: 15px;
  }

  .todaySummaryBox {
    box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
  }

  .blueButton {
    background: #1071A3;
    border: 1px solid #1071A3;
    box-sizing: border-box;
    border-radius: 10px;
  }

  #dashboard {
    height: 100%;
    min-height:100vh;
  }
</style>