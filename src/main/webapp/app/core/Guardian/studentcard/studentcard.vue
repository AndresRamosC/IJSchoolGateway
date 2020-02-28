<template>
<div @click="updateAndGo">
<div class="container-fluid p-0 studentCard mt-2 mb-2">
    <div class="row m-0 p-0">
      <div class="col-2 p-1 p-xl-3 d-flex flex-wrap align-content-center">
        <div>
          <img
            class="img-fluid"
            :src="imagen"
          />
        </div>
      </div>
      <div class="col-10 p-1">
        <p class="font-weight-bold m-0 blue">{{name}}</p>
        <div class="row">
          <div class="col-5 d-flex flex-wrap align-content-center">
            <p class="font-weight-normal m-0 gray">{{grade}}</p><p class="font-weight-normal gray" >th Grade</p>
          </div>
          <div class="col-1 p-0 d-flex flex-wrap align-content-center">
            <font-awesome-icon class="rotate90" icon="exchange-alt"/>
          </div>
          <div class="col-6">
            <div class="row p-0">
              <div class="col-12 p-0">
                <p class="font-weight-normal m-0 gray">{{enter}}</p>
              </div>
              <div class="col-12 p-0">
                <p class="font-weight-normal m-0 gray">{{leave}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</div>
</template>

<script>
  export default {
    name: 'studentcard',
    props: ["studentId", "imagen", "name", "grade", "enter", "leave"],
    methods: {
      updateAndGo: function() {
        this.$store.commit('changeStudent', this.studentId);
        this.$router.push('guardian')
      }
    }
  };
</script>

<style scoped>
  .rotate90 {
    transform: rotate(90deg);
  }

  .studentCard {
    box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }
</style>