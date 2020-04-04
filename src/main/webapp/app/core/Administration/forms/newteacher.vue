<template>
  <b-modal
    id="new-teacher"
    ref="new-teacher"
    hide-footer
    hide-header-close
    centered
    no-close-on-backdrop
  >
    <div class="container p-0">
      <basic-form title="New teacher" @onSubmit="onSumbit">
        <template v-slot:content>
          <!-- teacher data -->
          <div class="row mx-2">
            <div class="row w-100 mt-2 m-0">
              <div class="col-6 p-0">
                <div class="row m-0">
                  <div class="col-7 p-0 m-0">
                    <p class="font-weight-bold text-right pr-2 m-0 blue">Control number:</p>
                  </div>
                  <div class="col-5 p-0 m-0 pr-2">
                    <b-form-input
                      type="number"
                      number
                      v-model="employeeForm.controlNumber"
                      required
                      class="forms-input"
                      id="form-teacherControlNumber"
                    ></b-form-input>
                  </div>
                </div>
              </div>
              <div class="col-6 p-0">
                <div class="row m-0">
                  <div class="col-5 p-0 m-0">
                    <p class="font-weight-bold text-right pr-2 m-0 blue">Department:</p>
                  </div>
                  <div class="col-7 p-0 m-0 pr-2">
                    <b-form-input
                      type="text"
                      v-model="employeeForm.department"
                      required
                      class="forms-input"
                      id="form-department"
                    ></b-form-input>
                  </div>
                </div>
              </div>
            </div>

            <div class="row w-100 mt-2 m-0">
              <div class="col-6 p-0">
                <div class="row m-0">
                  <div class="col-7 p-0 m-0">
                    <p class="font-weight-bold text-right pr-2 m-0 blue">Education level:</p>
                  </div>
                  <div class="col-5 p-0 m-0 pr-2">
                    <b-form-select
                      id="form-teacherEducationLevel"
                      class="forms-combo-input p-0 w-100"
                      v-model="employeeForm.educationLevel"
                      :options="levels"
                      value-field="item"
                      text-field="name"
                      required
                    ></b-form-select>
                  </div>
                </div>
              </div>
              <div class="col-6 p-0">
                <div class="row m-0">
                  <div class="col-7 p-0 m-0">
                    <p class="font-weight-bold text-right pr-2 m-0 blue">Employment type:</p>
                  </div>
                  <div class="col-5 p-0 m-0 pr-2">
                    <b-form-input
                      type="text"
                      v-model="employeeForm.employmentType"
                      required
                      class="forms-input"
                      id="form-employmentType"
                    ></b-form-input>
                  </div>
                </div>
              </div>
            </div>

            <div class="row w-100 mt-2 m-0">
              <div class="col-6 p-0">
                <div class="row m-0">
                  <div class="col-6 p-0 m-0">
                    <p class="font-weight-bold text-right m-0 blue">Employed since:</p>
                  </div>
                  <div class="col-6 p-0 m-0">
                    <b-form-input
                      type="date"
                      v-model="employeeForm.employedSince"
                      class="forms-input"
                      id="form-employedSince"
                    ></b-form-input>
                  </div>
                </div>
              </div>
              <div class="col-6 p-0">
                <div class="row m-0">
                  <div class="col-6 p-0 m-0">
                    <p class="font-weight-bold text-right m-0 blue">Employed Until:</p>
                  </div>
                  <div class="col-6 p-0 m-0">
                    <b-form-input
                      type="date"
                      v-model="employeeForm.employedUntil"
                      class="forms-input"
                      id="form-employedUntil"
                    ></b-form-input>
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

export default {
  name: 'newteacher',
  components: {
    BasicForm
  },
  data() {
    return {
      employeeForm: {
        controlNumber: '',
        department: '',
        educationLevel: null,
        employedSince: '',
        employedUntil: '',
        employmentType: ''
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
      personData: null,
      employeeData: null,
      userId: null
    };
  },
  methods: {
    onSumbit: function(personDTO, contactDTO) {
      // if(this.teacherIdDuplicated == false) {
      this.$store
        .dispatch('createUser', {
          authorities: 'TEACHER',
          email: contactDTO.eMail,
          firstName: personDTO.firstName,
          lastName: personDTO.lastName,
          login: contactDTO.eMail,
          password: personDTO.firstName
        })
        .then(response => {
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
        this.employeeData = JSON.stringify(this.employeeForm);
        this.personData = JSON.stringify(this.personData);

        var newTeacher = `{
                "contactDTO" : ${this.contactData},
                "employeeDTO" : ${this.employeeData},
                "teacherDTO" : {},
                "personDTO" : ${this.personData}
                }`;

        this.$store.dispatch('createTeacher', newTeacher);

        this.$root.$emit('bv::hide::modal', 'new-teacher', '#showNewTeacher');
      }
    }
  }
};
</script>

<style scoped>
.divider {
  border: 1px solid #1071a3;
  margin-bottom: 0.5rem;
}

.blueBG {
  background-color: #1071a3;
}

.combo-box {
  background: #ffffff;
  border-bottom: 1px solid #1071a3;
  box-sizing: border-box;
}

.circle {
  width: 60px !important;
  height: 60px !important;
  border-radius: 50%;
  border: 2px solid #ffffff;
}
</style>