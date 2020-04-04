<template>
    <b-modal id="new-student" ref="new-student" hide-footer hide-header-close centered no-close-on-backdrop>
        <div class="container p-0">

            <basic-form title="New student"  @onSubmit="onSumbit">
                <template v-slot:content>
                    <div class="row w-100 my-3 m-0">
                        <div class="col-6 p-0">
                            <div class="row m-0">
                                <div class="col-7 p-0 m-0">
                                    <p class="font-weight-bold text-right pr-2 m-0 blue">Academic year:</p>
                                </div>
                                <div class="col-5 p-0 m-0">
                                    <b-form-select
                                        id="form-academicYear"
                                        class="forms-combo-input p-0 w-100"
                                        v-model="studentForm.academicYear"
                                        :options="years"
                                        value-field="item"
                                        text-field="name"
                                        required
                                    ></b-form-select>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 p-0">
                            <div class="row m-0">
                                <div class="col-6 p-0 m-0">
                                    <p class="font-weight-bold text-right m-0 blue">Admission date:</p>
                                </div>
                                <div class="col-6 p-0 m-0">
                                    <b-form-input type="date" v-model="studentForm.admissinDate" required class="forms-input" id="form-admissionDate"></b-form-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 my-3 m-0 d-flex justify-content-start">
                        <div class="col-7 p-0">
                            <div class="row m-0">
                                <div class="col-6 p-0 m-0">
                                    <p class="font-weight-bold text-right pr-2 m-0 blue">Control number:</p>
                                </div>
                                <div class="col-6 p-0 m-0 pr-2">
                                    <b-form-input type="text" v-model="studentForm.controlNumber" required class="forms-input" id="form-controlNumber"></b-form-input>
                                    <!-- This will only be shown if the preceding input has an invalid state -->
                                    <b-form-invalid-feedback id="input-check-controlNumber">control number in use</b-form-invalid-feedback>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </basic-form>

        </div>
    </b-modal>
</template>

<script>
import BasicForm from './basicForm.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: "newstudent",
    components: {
        BasicForm
    },
    data() {
        return {
            studentForm: {
                academicYear: null,
                admissionDate: '',
                controlNumber: ''
            },
            years: [
                { name: '1st', item: 1},
                { name: '2nd', item: 2 },
                { name: '3rd', item: 3 },
                { name: '4th', item: 4 },
                { name: '5th', item: 5 },
                { name: '6th', item: 6 },
                { name: '7th', item: 7 },
                { name: '8th', item: 8 },
                { name: '9th', item: 9 },
                { name: '10th', item: 10 },
                { name: '11th', item: 11 },
                { name: '12th', item: 12 },
                { name: '13th', item: 13 },
                { name: '14th', item: 14 },
                { name: '15th', item: 15 },
                { name: '16th', item: 16 },
                { name: '17th', item: 17 },
            ],
            contactData: null,
            personData: null,
            studentData: null,
            userId: null
        }
    },
    computed: {
        ...mapGetters([
            'createdGuardianId'
        ])
    },
    methods: {
        onSumbit: function(personDTO, contactDTO) {
            // if(this.controlNumberDuplicated == false) {
                const username = personDTO.firstName + (moment(personDTO.dateOfBirth).format('DDMM'));
                console.log(username);
                this.$store.dispatch('createUser', { "authorities": "STUDENT", "email": contactDTO.eMail, "firstName": personDTO.firstName, "lastName": personDTO.lastName, "login": username, "password": personDTO.firstName } )
                .then((response) => {
                    console.log(response);
                    this.userId = response.data.id;
                });
                this.contactData = contactDTO;
                this.personData = personDTO;
            // }
        }
    },
    watch: {
        userId() {
            if (this.userId !== '' || this.userId != null || this.userId !== Promise) {
                this.personData.keycloakUserId = this.userId;

                this.contactData = JSON.stringify(this.contactData);
                this.studentData = JSON.stringify(this.studentForm);
                this.personData = JSON.stringify(this.personData);

                var newStudent = `{
                "contactDTO" : ${this.contactData},
                "studentDTO" : ${this.studentData},
                "personDTO" : ${this.personData}
                }`;

                this.$store.dispatch('createStudent', { 'guardianId': this.createdGuardianId, 'studentObject': newStudent } )
                .then((response) => {
                    this.$store.dispatch('getStudentsByGuardian', this.createdGuardianId);
                });

                this.$root.$emit('bv::hide::modal', 'new-student', '#returnStudentsHolder')
                this.$root.$emit('bv::show::modal', 'students-holder', '#showStudentsHolder')
            }
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