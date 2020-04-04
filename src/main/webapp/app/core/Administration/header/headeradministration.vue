<template>
<div class="container-fluid p-0" style="height: 5%;">
  <b-navbar toggleable="lg" type="dark" style="backgroundColor: #1071a3; height: 100%;" class="pl-4 p-0">
    <b-navbar-brand href="#">IJ School App</b-navbar-brand>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto p-0">

        <b-nav-item-dropdown right no-caret>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-6">
                        <p class="m-0 white">{{username.login}}</p>
                    </div>
                    <div class="col-6">
                        <!-- <img class="p-0 img-fluid" style="width:40px; height: 40px; borderRadius: 50%;" :src="studentPhoto(student)"/> -->
                        <font-awesome-icon class="white" style="width: 35px; height: 35px;" icon="user-circle"/>
                    </div>
                </div>
            </div>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="" @click="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
      
  </b-navbar>
</div>    
</template>

<script lang="ts" src="./headeradministration.component.ts">
</script>