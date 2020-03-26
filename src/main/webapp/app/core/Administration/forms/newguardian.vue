<template>
    <b-modal id="new-guardian" ref="new-guardian" hide-footer hide-header-close centered no-close-on-backdrop>
        <div class="container p-0">

            <div class="row m-0">
                <div class="col-10 py-2 d-flex align-items-center blueBG">
                    <h3 class="font-weight-bold m-0 p-0 text-left white">New guardian</h3>
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
                    <div class="col-7 p-0">
                        <div class="row m-0">
                            <div class="col-6 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">Education level:</p>
                            </div>
                            <div class="col-6 p-0 m-0">
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
                                    <b-dropdown-item v-for="(level, index) in levels" :key="index">
                                        <p class="text-left gray">{{level}}</p>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="col-5 p-0">
                        <div class="row m-0">
                            <div class="col-6 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">Occupation:</p>
                            </div>
                            <div class="col-6 p-0 m-0 pr-2">
                                <b-form-input type="email" required class="forms-input" id="form-newguardian-occupation"></b-form-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 my-3 m-0">
                    <div class="col-12 p-0">
                        <div class="row w-100 m-0">
                            <div class="col-3 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">Work address:</p>
                            </div>
                            <div class="col-9 p-0 m-0 pr-2">
                                <b-form-input type="email" required class="forms-input" id="form-newguardian-workaddress"></b-form-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 my-3 m-0">
                    <div class="col-12 p-0 d-flex justify-content-end">
                        <div class="circle"  style="background-color: #1071A3" ref="showStudentsHolder" @click="updateAndGo()">
                            <font-awesome-icon
                                style="width: 55px; height: 55px; color: white;"
                                class="px-2"
                                icon="arrow-right"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </b-modal>
</template>

<script>
export default {
    name: "newguardian",
    data() {
        return {
            types: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
            levels: ['No schooling completed', 'High school', 'College', 'Trade/technical/vocational training', 'Bachelor’s degree', 'Master’s degree', 'Professional degree', 'Doctorate degree']
        }
    },
    methods: {
        updateAndGo: function() {
            this.$root.$emit('bv::hide::modal', 'new-guardian', '#showNewGuardian')
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