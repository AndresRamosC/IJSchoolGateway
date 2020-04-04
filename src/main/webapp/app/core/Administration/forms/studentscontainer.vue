<template>
    <b-modal id="students-holder" ref="students-holder" hide-footer hide-header-close centered no-close-on-backdrop>
        <div class="container p-0">

            <div class="row m-0">
                <div class="col-10 py-2 d-flex align-items-center blueBG">
                    <h3 class="font-weight-bold m-0 p-0 text-left white">Register students</h3>
                </div>
                <div class="col-2 py-2 d-flex justify-content-end blueBG">
                    <font-awesome-icon
                    style="width: 25px; height: 25px; color: white;"
                    icon="times"
                    />
                </div>
            </div>

            <!-- Guardian name -->
            <div class="row mx-2 my-4">
                <div class="col-12">
                    <h1 class="font-weight-bold m-0 p-0 text-center blue">Guardian Name</h1>
                </div>
            </div>

            <!-- info -->
            <div class="row mx-2 my-4">
                <div class="col-12">
                   <p class="text-center blue">Register a new student or continue to add later</p>
                </div>
            </div>

            <!-- students container + new student card holder -->
            <!-- <div v-if="guardianStudentsListLoaded"> -->
            <div>
            <div class="row mx-4 my-2"  v-for="(student, index) in guardianStudentsList" :key="index">
                <div class="col-8">
                    <div class="row" style="box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25); border-radius: 5px;">
                        <div class="col-3 my-1 p-0 d-flex align-items-center justify-content-center">
                            <div class="d-flex align-items-center justify-content-center">
                                <img class="circle-img p-0" style="border-color: red" :src="'data:' + student.photographContentType + ';base64, ' + student.photograph"/>
                            </div>
                        </div>
                        <div class="col-9 my-1">
                            <div class="row m-0 pr-2">
                                <div class="col-12 p-0">
                                    <p class="font-weight-bold m-0 blue"> {{student.name}} {{student.lastName}}  </p>
                                </div>
                                <div class="col-6 p-0">
                                    <p class="font-weight-bold m-0 blue"> {{student.academicYear}} Grade</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <!-- students container + new student card holder -->
                <div class="row mx-4">
                    <div class="col-8" @click="createNewStudent()" ref="showCreateNewStudent">
                        <div class="row" style="box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25); border-radius: 5px;">
                            <div class="col-3 p-0 d-flex align-items-center justify-content-center">
                                <div class="d-flex align-items-center justify-content-center" style="background-color: #A6A6A6; width: 50px; height: 50px; borderRadius: 50%;">
                                    <font-awesome-icon
                                        style="width: 77%; height: 74%; color: white;"
                                        icon="user-plus"
                                    />
                                </div>
                            </div>
                            <div class="col-9">
                                <div class="row pr-2">
                                    <div class="col-12 my-2" style="width: 208px; height: 15px; background: rgba(0, 0, 0, 0.35); border-radius: 5px;"></div>
                                    <div class="col-6 my-2" style="width: 208px; height: 15px; background: rgba(0, 0, 0, 0.35); border-radius: 5px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <!-- save button  -->
            <div class="row w-100 my-3 m-0">
                <div class="col-12 py-2 d-flex justify-content-end">
                    <div style="background-color: #1071A3; border-radius: 5px;" ref="endProcess" @click="endProcess()">
                        <h3 class="font-weight-bold m-0 p-2 white">Save</h3>
                    </div>
                </div>
            </div>

        </div>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "studentscontainer",
    data() {
        return {
        }
    },
    methods: {
        createNewStudent: function () {
            this.$root.$emit('bv::hide::modal', 'students-holder', '#showStudentsHolder')
            this.$root.$emit('bv::show::modal', 'new-student', '#showCreateNewStudent')
        },
        endProcess: function () {
            this.$store.dispatch('getAdministrationGuardianDashboard');
            this.$root.$emit('bv::hide::modal', 'students-holder', '#endProcess')
        }
    },
    computed: {
        ...mapGetters([
            'guardianStudentsListLoaded',
            'guardianStudentsList'
        ])
    }
}
</script>

<style scoped>
    .divider {
        border: 1px solid #1071A3;
        margin-bottom: 0.5rem;
    }

    .blueBG {
        background-color: #1071A3;
    }

    .combo-box {
        background: #ffffff;
        border-bottom: 1px solid #1071a3;
        box-sizing: border-box;
    }

    .circle {
        width: 60px!important;
        height: 60px!important; 
        border-radius: 50%;
        border: 2px solid #ffffff;
    }

      .circle-img {
    width: 50px!important;
    height: 50px!important; 
    border-radius: 50%;
    border: 2px solid #ffffff;
  }
</style>