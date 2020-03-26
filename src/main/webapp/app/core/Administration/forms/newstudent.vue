<template>
    <b-modal id="new-student" ref="new-student" hide-footer hide-header-close centered no-close-on-backdrop>
        <div class="container p-0">

            <div class="row m-0">
                <div class="col-10 py-2 d-flex align-items-center blueBG">
                    <h3 class="font-weight-bold m-0 p-0 text-left white">Create student</h3>
                </div>
                <div class="col-2 py-2 d-flex justify-content-end blueBG">
                    <font-awesome-icon
                    style="width: 25px; height: 25px; color: white;"
                    icon="times"
                    />
                </div>
            </div>

            <!-- photo and person data -->
            <div class="row mx-2 my-4">
                <div class="col-6 d-flex justify-content-center">
                    <div class="d-flex align-items-center justify-content-center" style="background: #FFFFFF; width: 200px; height: 200px; border: 5px solid #1071A3; borderRadius: 50%;">
                        <font-awesome-icon
                        style="width: 77%; height: 74%; color: #1071A3;"
                        icon="user-plus"
                        />
                    </div>
                </div>
                <div class="col-6 p-0">
                    <div class="row my-3 m-0">
                        <div class="col-5 p-0 m-0">
                            <p class="font-weight-bold text-right pr-2 m-0 blue">First name:</p>
                        </div>
                        <div class="col-7 p-0 m-0 pr-2">
                            <b-form-input required class="forms-input" id="form-newguardian-firtsname"></b-form-input>
                        </div>
                    </div>
                    <div class="row my-3 m-0">
                        <div class="col-5 p-0 m-0">
                            <p class="font-weight-bold text-right pr-2 m-0 blue">Last name:</p>
                        </div>
                        <div class="col-7 p-0 m-0 pr-2">
                            <b-form-input required class="forms-input" id="form-newguardian-lastname"></b-form-input>
                        </div>
                    </div>
                    <div class="row my-3 m-0">
                        <div class="col-5 p-0 m-0">
                            <p class="font-weight-bold text-right pr-2 m-0 blue">Gender:</p>
                        </div>
                        <div class="col-7 p-0 m-0">
                            <b-dropdown
                                id="dropdown-gender"
                                class="forms-combo-input p-0 pr-2 w-100"
                                toggle-class="text-decoration-none"
                                :no-caret="true"
                            >
                                <template v-slot:button-content :no-caret="true">
                                <div class="row m-0 combo-box">
                                    <div class="col-10 p-0">
                                        <p class="text-left gray m-0 p-0">Select</p>
                                    </div>
                                    <div class="col-2 p-0 d-flex align-items-center">
                                        <font-awesome-icon
                                            class="blue"
                                            style="width: 20px; height: 20px;"
                                            icon="chevron-down"
                                        />
                                    </div>
                                </div>
                                </template>
                                <b-dropdown-item>
                                    <p class="text-left gray">Male</p>
                                    <p class="text-left gray">Female</p>
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                    <div class="row my-3 m-0">
                        <div class="col-5 p-0 m-0">
                            <p class="font-weight-bold text-right pr-2 m-0 blue">Birth date:</p>
                        </div>
                        <div class="col-7 p-0 m-0 pr-2">
                            <b-form-input required type="date" class="forms-input" id="form-newguardian-birthdate"></b-form-input>
                        </div>
                    </div>
                    <div class="row my-3 m-0">
                        <div class="col-5 p-0 m-0">
                            <p class="font-weight-bold text-right pr-2 m-0 blue">Blood type:</p>
                        </div>
                        <div class="col-7 p-0 m-0 pr-2">
                            <b-dropdown
                                id="dropdown-blood"
                                class="forms-combo-input p-0 pr-2 w-100"
                                toggle-class="text-decoration-none"
                                :no-caret="true"
                            >
                                <template v-slot:button-content :no-caret="true">
                                <div class="row m-0 combo-box">
                                    <div class="col-10 p-0">
                                        <p class="text-left gray m-0 p-0">Select</p>
                                    </div>
                                    <div class="col-2 p-0 d-flex align-items-center">
                                        <font-awesome-icon
                                            class="blue"
                                            style="width: 20px; height: 20px;"
                                            icon="chevron-down"
                                        />
                                    </div>
                                </div>
                                </template>
                                <b-dropdown-item v-for="(blood, index) in types" :key="index">
                                    <p class="text-left gray">{{blood}}</p>
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                </div>
            </div>

            <!-- contact info -->
            <div class="row mx-2">
                <div class="row w-100 my-3 m-0">
                    <div class="col-7 p-0">
                        <div class="row m-0">
                            <div class="col-3 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">Address:</p>
                            </div>
                            <div class="col-9 p-0 m-0">
                                <b-form-input required class="forms-input" id="form-newguardian-address"></b-form-input>
                            </div>
                        </div>
                    </div>
                    <div class="col-5 p-0">
                        <div class="row m-0">
                            <div class="col-5 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">Zip code:</p>
                            </div>
                            <div class="col-7 p-0 m-0 pr-2">
                                <b-form-input required class="forms-input" id="form-newguardian-zipcode"></b-form-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 my-3 m-0">
                    <div class="col-6 p-0">
                        <div class="row m-0">
                            <div class="col-3 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">City:</p>
                            </div>
                            <div class="col-9 p-0 m-0">
                            <b-dropdown
                                id="dropdown-gender"
                                class="forms-combo-input p-0 pr-2 w-100"
                                toggle-class="text-decoration-none"
                                :no-caret="true"
                            >
                                <template v-slot:button-content :no-caret="true">
                                <div class="row m-0 combo-box">
                                    <div class="col-10 p-0">
                                        <p class="text-left gray m-0 p-0">Select</p>
                                    </div>
                                    <div class="col-2 p-0 d-flex align-items-center">
                                        <font-awesome-icon
                                            class="blue"
                                            style="width: 20px; height: 20px;"
                                            icon="chevron-down"
                                        />
                                    </div>
                                </div>
                                </template>
                                <b-dropdown-item>
                                    <p class="text-left gray">Male</p>
                                    <p class="text-left gray">Female</p>
                                </b-dropdown-item>
                            </b-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-0">
                        <div class="row m-0">
                            <div class="col-3 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">State:</p>
                            </div>
                            <div class="col-9 p-0 m-0 pr-2">
                                <b-dropdown
                                    id="dropdown-gender"
                                    class="forms-combo-input p-0 pr-2 w-100"
                                    toggle-class="text-decoration-none"
                                    :no-caret="true"
                                >
                                    <template v-slot:button-content :no-caret="true">
                                    <div class="row m-0 combo-box">
                                        <div class="col-10 p-0">
                                            <p class="text-left gray m-0 p-0">Select</p>
                                        </div>
                                        <div class="col-2 p-0 d-flex align-items-center">
                                            <font-awesome-icon
                                                class="blue"
                                                style="width: 20px; height: 20px;"
                                                icon="chevron-down"
                                            />
                                        </div>
                                    </div>
                                    </template>
                                    <b-dropdown-item>
                                        <p class="text-left gray">Male</p>
                                        <p class="text-left gray">Female</p>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 my-3 m-0">
                    <div class="col-6 p-0">
                        <div class="row m-0">
                            <div class="col-3 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">Phone:</p>
                            </div>
                            <div class="col-9 p-0 m-0">
                                <b-form-input type="tel" required class="forms-input" id="form-newguardian-phone"></b-form-input>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-0">
                        <div class="row m-0">
                            <div class="col-3 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">E-mail:</p>
                            </div>
                            <div class="col-9 p-0 m-0 pr-2">
                                <b-form-input type="email" required class="forms-input" id="form-newguardian-email"></b-form-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 my-3 m-0">
                    <div class="col-6 p-0">
                        <div class="row m-0">
                            <div class="col-7 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">Academic year:</p>
                            </div>
                            <div class="col-5 p-0 m-0">
                                <b-dropdown
                                    id="dropdown-education"
                                    class="forms-combo-input p-0 pr-2 w-100"
                                    toggle-class="text-decoration-none"
                                    :no-caret="true"
                                >
                                    <template v-slot:button-content :no-caret="true">
                                    <div class="row m-0 combo-box">
                                        <div class="col-10 p-0">
                                            <p class="text-left gray m-0 p-0">Select</p>
                                        </div>
                                        <div class="col-2 p-0 d-flex align-items-center">
                                            <font-awesome-icon
                                                class="blue"
                                                style="width: 20px; height: 20px;"
                                                icon="chevron-down"
                                            />
                                        </div>
                                    </div>
                                    </template>
                                    <b-dropdown-item v-for="(academic, index) in years" :key="index">
                                        <p class="text-left gray">{{academic}}</p>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 p-0">
                        <div class="row m-0">
                            <div class="col-6 p-0 m-0">
                                <p class="font-weight-bold text-right m-0 blue">Admission date:</p>
                            </div>
                            <div class="col-6 p-0 m-0">
                                <b-form-input type="date" required class="forms-input" id="form-newguardian-occupation"></b-form-input>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- save button  -->
                <div class="row w-100 my-3 m-0">
                    <div class="col-12 py-2 d-flex justify-content-end">
                        <div style="background-color: #1071A3; border-radius: 5px;" ref="returnStudentsHolder" @click="updateAndGo()">
                            <h3 class="font-weight-bold m-0 p-2 white">Save</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </b-modal>
</template>

<script>
export default {
    name: "newstudent",
    data() {
        return {
            types: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
            years: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th']
        }
    },
    methods: {
        updateAndGo: function() {
            this.$root.$emit('bv::hide::modal', 'new-student', '#returnStudentsHolder')
            this.$root.$emit('bv::show::modal', 'students-holder', '#showStudentsHolder')
        }
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
</style>