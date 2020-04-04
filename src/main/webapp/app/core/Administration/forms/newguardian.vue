<template>
    <b-modal id="new-guardian" ref="new-guardian" hide-footer hide-header-close centered no-close-on-backdrop>
        <div class="container p-0">

            <basic-form title="New guardian" @onSubmit="onSumbit">
            <template v-slot:content>
            <!-- guardian data -->
            <div class="row mx-2">
                <div class="row w-100 mt-2 m-0">
                    <div class="col-7 p-0">
                        <div class="row m-0">
                            <div class="col-6 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">Education level:</p>
                            </div>
                            <div class="col-6 p-0 m-0">
                                <b-form-select
                                    id="form-educationLevel"
                                    class="forms-combo-input p-0 w-100"
                                    v-model="guardianForm.educationLevel"
                                    :options="levels"
                                    value-field="item"
                                    text-field="name"
                                    required
                                ></b-form-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-5 p-0">
                        <div class="row m-0">
                            <div class="col-6 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">Occupation:</p>
                            </div>
                            <div class="col-6 p-0 m-0 pr-2">
                                <b-form-input type="text" v-model="guardianForm.occupation" required class="forms-input" id="form-occupation"></b-form-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 mt-2 m-0">
                    <div class="col-12 p-0">
                        <div class="row w-100 m-0">
                            <div class="col-3 p-0 m-0">
                                <p class="font-weight-bold text-right pr-2 m-0 blue">Work address:</p>
                            </div>
                            <div class="col-9 p-0 m-0 pr-2">
                                <b-form-input type="text" v-model="guardianForm.workAddress" required class="forms-input" id="form-workaddress"></b-form-input>
                            </div>
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

export default {
    name: "newguardian",
    components: {
        BasicForm
    },
    data() {
        return {
            guardianForm: {
                educationLevel: null,
                occupation: '',
                workAddress: ''
            },
            levels: [
                { item: 'NONE', name: 'None' },
                { item: 'ELEMENTARY', name: 'Elementary' },
                { item: 'MIDDLE', name: 'Middle' },
                { item: 'HIGH', name: 'High' },
                { item: 'COLLEGE', name: 'College' },
                { item: 'MASTERS', name: 'Masters' },
                { item: 'PHD', name: 'Phd' }
            ],
            contactData: null,
            guardianData: null,
            personData: null,
            userId: null
        }
    },
    computed: {
        ...mapGetters([
            'userDuplicated'])
    },
    methods: {
        onSumbit: function(personDTO, contactDTO) {
            if(this.userDuplicated == false) {
                this.$store.dispatch('createUser', { "authorities": "GUARDIAN", "email": contactDTO.eMail, "firstName": personDTO.firstName, "lastName": personDTO.lastName, "login": contactDTO.eMail, "password": personDTO.firstName } )
                .then((response) => {
                    console.log(response);
                    this.userId = response.data.id;
                })
            }
            this.personData = personDTO;
            this.contactData = contactDTO;
        }
    },
    watch: {
        userId() {
            if (this.userId !== '' || this.userId != null || this.userId !== Promise) {
                this.personData.keycloakUserId = this.userId;

                this.guardianData = JSON.stringify(this.guardianForm);
                this.contactData = JSON.stringify(this.contactData);
                this.personData = JSON.stringify(this.personData);

                var newGuardian = `{
                "contactDTO" : ${this.contactData},
                "guardianDTO" : ${this.guardianData},
                "personDTO" : ${this.personData}
                }`;

                this.$store.dispatch('createGuardian', newGuardian);

                this.$root.$emit('bv::hide::modal', 'new-guardian', '#showNewGuardian');
                this.$root.$emit('bv::show::modal', 'students-holder', '#showStudentsHolder');
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