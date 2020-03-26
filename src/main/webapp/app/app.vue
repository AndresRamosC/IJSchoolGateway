<template>
  <div id="app">
    <!-- <ribbon></ribbon>
    <div id="app-header">
      <jhi-navbar></jhi-navbar>
    </div> -->
    <!-- <div class="container-fluid"> -->
      <!-- <div class="card jh-card"> -->
        <router-view></router-view>
      <!-- </div> -->
      <!-- <jhi-footer></jhi-footer> -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts" src="./app.component.ts">
</script>

<style>
  html, body {
    font-family: Roboto;
    min-height:100vh;
    height: 100%;
  }

  #app {
    height: 100%;
    min-height:100vh;
  }

  .white {
    color: #ffffff;
  }

  .blue {
    color: #1071A3;
  }

  .light-blue {
    color: #559FD5;
  }

  .gray {
    color: rgba(0, 0, 0, 0.5);
  }

  .whiteBG {
    background: white;
  }
</style>
