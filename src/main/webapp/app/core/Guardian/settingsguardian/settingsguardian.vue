<template>
<div>
    <div id="settings">

        <div class="sticky-top whiteBG">
            <header-bell
                headerTitle="Settings"
            />
        </div>

        <div class="container-fluid p-0 justify-content-center">
            <div class="row m-0">

                <div class="col-4 pl-2 p-0 d-flex justify-content-center">
                    <div class="circle" style="width: 74px; height: 74px;">
                        <img class="p-0 w-100 h-100" style="borderRadius: 50%;" :src="guardianPhoto"/>
                    </div>
                </div>

                <div class="col-8 p-0">

                    <div class="row m-0">

                        <div class="col-12 p-0">
                            <p class="font-weight-regular m-0 blue text-left">{{guardianName}}</p>
                        </div>

                        <div class="col-12 p-0">
                            <p class="font-weight-regular m-0 gray text-left">{{guardianPhone}}</p>
                        </div>

                        <div class="col-12 p-0">
                            <p class="font-weight-regular m-0 gray text-left">{{guardianEmail}}</p>
                        </div>

                    </div>

                </div>

            </div>   

            <div class="p-2 mt-2">
                <div class="container card p-2">

                    <div class="row pt-2 p-0 m-0">

                        <div class="col-10 p-0">
                            <p class="font-weight-regular m-0 pl-3 p-0 blue text-left">Notifications and sound</p>
                        </div>

                        <div class="col-2 p-0 d-flex justify-content-center">
                            <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="chevron-right"/>
                        </div>

                        <div class="col-12 pt-2">
                            <div class="row m-0">
                                <div class="col-12" style="height: 2px; background-color: #1071A3;"></div>
                            </div>
                        </div>
                        
                    </div>   

                    <div class="row pt-2 p-0 m-0">

                        <div class="col-10 p-0">
                            <p class="font-weight-regular m-0 pl-3 p-0 blue text-left">Data</p>
                        </div>

                        <div class="col-2 p-0 d-flex justify-content-center">
                            <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="chevron-right"/>
                        </div>

                        <div class="col-12 pt-2">
                            <div class="row m-0">
                                <div class="col-12" style="height: 2px; background-color: #1071A3;"></div>
                            </div>
                        </div>
                        
                    </div>   

                    <div class="row pt-2 p-0 m-0">

                        <div class="col-10 p-0">
                            <p class="font-weight-regular m-0 pl-3 p-0 blue text-left">Appearance</p>
                        </div>

                        <div class="col-2 p-0 d-flex justify-content-center">
                            <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="chevron-right"/>
                        </div>

                        <div class="col-12 pt-2">
                            <div class="row m-0">
                                <div class="col-12" style="height: 2px; background-color: #1071A3;"></div>
                            </div>
                        </div>
                        
                    </div>   

                    <div class="row pt-2 p-0 m-0">

                        <div class="col-10 p-0">
                            <p class="font-weight-regular m-0 pl-3 p-0 blue text-left">Language</p>
                        </div>

                        <div class="col-2 p-0 d-flex justify-content-center">
                            <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="chevron-right"/>
                        </div>

                        <div class="col-12 pt-2">
                            <div class="row m-0">
                                <div class="col-12" style="height: 2px; background-color: #1071A3;"></div>
                            </div>
                        </div>
                        
                    </div>   

                    <div class="row pt-2 p-0 m-0">

                        <div class="col-10 p-0">
                            <p class="font-weight-regular m-0 pl-3 p-0 blue text-left">Privacy</p>
                        </div>

                        <div class="col-2 p-0 d-flex justify-content-center">
                            <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="chevron-right"/>
                        </div>
                        
                    </div>   
                        
                </div>

                <div class="container card p-1 mt-3">

                    <div @click="logout()" class="row pt-1 pb-1 p-0 m-0">

                        <div class="col-10 p-0">
                            <p class="font-weight-regular m-0 pl-3 p-0 blue text-left">Log out</p>
                        </div>

                        <div class="col-2 p-0 d-flex justify-content-center">
                            <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="chevron-right"/>
                        </div>
                        
                    </div>     
                        
                </div>
            </div>

        </div>

    </div>

    <bottom-nav/>

</div>
</template>

<script lang="ts" src="./seetings.component.ts">
</script>

<style scoped>
   #settings {
    height: 100%;
    min-height:100vh;
  }

  .circle {
    background-color: white;
    border-radius: 50%;
    width: 74px;
    box-shadow: 0px 2px 5px 4px rgba(0, 0, 0, 0.25);
  }

  .card {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
  }
</style>