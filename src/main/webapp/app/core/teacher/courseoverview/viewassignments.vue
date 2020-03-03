<template>
<div>
    <div class="sticky-top blueBG">

        <header-arrow headerTitle="Assignment">
        <template v-slot:content>
            <div class="row w-100 m-0 mb-2 blueBG">
                <div class="col-8">
                    <p class="m-0 pr-2 white">Subject name</p>
                </div>        

                <div class="col-4">
                    <p class="p-0 m-0 white">Group</p>
                </div>
            </div>
        </template>
        </header-arrow>

    </div>


    <div class="container-fluid p-2 justify-content-center">
        
        <div class="row m-0 mb-2 pl-2 w-100">
            <div class="col-8 p-0">
                <h4 class="font-weight-bold m-0 blue">Assignment title</h4>
            </div>
            <div class="col-4">
                <p class="blue p-0 m-0">In time</p>
            </div>
        </div>
        
        <div class="row m-0 w-100">
            <div class="col-4">
                <p class="font-weight-bold p-0 m-0 blue">Due date</p>
            </div>
            <div class="col-8 p-0">
                <p class="gray m-0">Monday, february 9 at 13:00</p>
            </div>
        </div>

        <div class="row w-100 m-0 mt-2">
            <div class="col-12">
                <p class="gray m-0">Here you can read a the full description of the assignment.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                </p>
            </div>
        </div>

        <div class="row mt-4 card">
            <div class="row m-0 mt-2">
                <div class="col-3 p-0 pl-2">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="paperclip"/>
                </div>
                <div class="col-9 p-0">
                    <p>1 attachment</p>
                </div>
            </div>

            <div class="row m-0">
                <div class="col-2 p-0 pl-2">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="file-alt"/>
                </div>
                <div class="col-8 p-0">
                    <p class="m-0 gray">Name off the attach.docx</p>
                </div>
                <div class="col-2 p-0">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="cloud-download-alt"/>
                </div>
            </div>
        </div>

    </div>

</div>
</template>

<script>
import HeaderArrow from '../headerarrow/headerarrowslot.vue';

export default {
    name: "viewassignments",
    components: {
        HeaderArrow
    },
    props: {
        title: String,
        status: String,
        dueDate: String,
        description: String
    }
}
</script>

<style scoped>
    #assignments {
        min-height:100vh;
    }

    .blueBG {
        background-color: #1071A3!important;
    }

  .divider {
    background: #FFFFFF;
    border-radius: 100px 100px 0px 0px;
    height: 15px;
  }

  .card {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
        margin: 1%;
  }
</style>