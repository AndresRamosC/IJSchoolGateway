<template>
<div class="container-fluid p-0 justify-content-center">

    <!-- app header -->
    <div class="row pt-3 pb-0 m-0 mb-1 d-flex justify-content-center blueBG">

        <!-- circle photo -->
        <div class="col-2">
            <div class="d-flex pb-2 justify-content-center circle" >
                <img class="p-0 img-fluid" style="width:40px; height: 40px; borderRadius: 50%;" src="https://www.buscabiografias.com/img/people/Francisco-M%C3%A1rquez.jpg"/>
            </div>
        </div>

        <!-- section title -->
        <div class="col-8 pb-2 d-flex flex-wrap align-content-start">
          <h1  class="font-weight-bold white">{{headerTitle}}</h1>
        </div>

        <!-- notifications icon  -->
        <div class="col-2 pb-2 d-flex flex-wrap align-content-center">
            <b-button v-b-modal.modal-1 class="p-0 shadow-none" style="background: #1071A3;">
              <font-awesome-icon class="white" style="width: 24px; height: 24px;" icon="bell"/>
            </b-button>
            <b-modal id="modal-1" hide-footer>
              <template v-slot:modal-title class="d-flex justify-content-center">
                <p class="blue text-center">Notifications</p>
              </template>
              <p class="my-4">Notifications will be shown here</p>
            </b-modal>
        </div>

        <!-- container separator  -->
        <div style="zIndex: 1" class="col-12 divider"></div>

    </div>

</div>
</template>

<script>
export default {
    name: "headerbell",
    props: {
      headerTitle: String
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
    width: 40px;
    height: 40px;
    box-shadow: 0px 2px 5px 4px rgba(0, 0, 0, 0.25);
  }

  .divider {
    background: #FFFFFF;
    border-radius: 100px 100px 0px 0px;
    height: 15px;
  }
</style>