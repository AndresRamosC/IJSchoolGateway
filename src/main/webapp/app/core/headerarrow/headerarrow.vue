<template>
<div class="container-fluid p-0 justify-content-center">

    <!-- app header -->
    <div class="row pt-3 pb-0 m-0 mb-1 d-flex justify-content-center blueBG">

        <!-- notifications icon  -->
        <div class="col-2 pb-2 d-flex flex-wrap align-content-center" @click="$router.go(-1)">
            <font-awesome-icon class="white" style="width: 24px; height: 24px;" icon="arrow-left"/>
        </div>

        <!-- section title -->
        <div class="col-8 pb-2 p-0 d-flex flex-wrap align-content-start">
          <h1 style="fontSize: 1.5em;" class="font-weight-bold white">{{headerTitle}}</h1>
        </div>

        <!-- circle photo -->
        <div class="col-2 p-0">
            <div class="d-flex pb-2 justify-content-center circle" >
                <img class="p-0 img-fluid" style="width:40px; height: 40px; borderRadius: 50%;" src="https://www.buscabiografias.com/img/people/Francisco-M%C3%A1rquez.jpg"/>
            </div>
        </div>

    </div>

</div>
</template>

<script>
export default {
    name: "headerarrow",
    props: {
      headerTitle: String,
      link: String
    }
}
</script>

<style scoped>
  .blueBG {
    background-color: #1071A3!important;
  }

  .circle {
    background-color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    box-shadow: 0px 2px 5px 4px rgba(0, 0, 0, 0.25);
  }
</style>