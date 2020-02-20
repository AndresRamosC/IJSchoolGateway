<template>
 <div id="studentselection">
  <div class="container-fluid justify-content-center">

      <!-- app header -->
      <div class="row blueBG">
        <div class="col-8 d-flex flex-wrap align-content-center">
          <h1 style="fontSize: 1.3em" class="font-weight-bold white">Student selection</h1>
        </div>
        <div class="col-4 d-flex flex-wrap align-content-center">
          <div class="w-75 h-75 circle d-flex justify-content-center">
            <img class="p-2" style="width: 50px" src="https://www.buscabiografias.com/img/people/Francisco-M%C3%A1rquez.jpg"/>
          </div>
        </div>
        <div class="col-12 divider"></div>
      </div>

      <!-- landing - greeting -->
      <div class="row">
        <div class="col-12">
          <h1 class="text-center font-weight-normal blue">Welcome back</h1>
        </div>
        <div class="col-12">
          <p class="text-center font-weight-normal blue">{{user}}</p>
        </div>
      </div>
    </div>

    <!-- students section  -->
    <div class="container-fluid">
      <div class="row mb-5">
        <!-- student card -->
        <div class="col-12">
          <studentcard
            imagen="https://www.buscabiografias.com/img/people/Francisco-M%C3%A1rquez.jpg"
            name="Francisco Marquez Paniagua"
            grade="5"
            enter="08:10 - late"
            leave= "Still at school"
          />
        </div>
        <!-- student card -->
        <div class="col-12">
          <studentcard
            imagen="https://www.buscabiografias.com/img/people/Juan-Escutia.jpg"
            name="Juan Escutia Y Martinez"
            grade="8"
            enter="07:50"
            leave= "14:00"
          />
        </div>
      </div>
    </div>

 </div>

</template>

<script>
import studentcard from '../components/studentcard.vue';

export default {
  name: 'studentselection',
  props: ["imagen", "name", "grade", "enter", "leave"],
  components: {
    studentcard
  },
  data() {
    return {
      user: "Felipe Santiago Xicoténcatl"
    };
  }
};
</script>

<style scoped>
  .blueBG {
    background-color: #1071A3;
  }

  .circle {
    background-color: white;
    border-radius: 50%
  }

  .divider {
    background: #FFFFFF;
    border-radius: 100px 100px 0px 0px;
    height: 15px;
  }

  #studentselection {
    min-height:100vh;
    height: 100%;
  }
</style>