<template>
<div>
    <div class="container card mt-2 mb-2" @click="moreThanOne">
        <div class="row">
            
            <!-- subject color div -->
            <div :style="style"></div>

            <div class="col-9">
                <div class="row p-0">

                    <!-- subject icon -->
                    <div class="col-2 d-flex align-self-center">
                        <font-awesome-icon class="blue" style="width: 25px; height: 25px;" :icon="subjectIcon"/>
                    </div>
                    
                    <div class="col-10">
                        <div class="row pl-1">

                            <!-- subject name -->
                            <div class="col-12 pl-2 p-0">
                                <h4 class="font-weight-bold m-0 blue text-left text-capitalize"> {{subjectName}} </h4>
                            </div>

                            <!-- subject name -->
                            <div class="col-12 pl-2 p-0">
                                <p class="font-weight-regular gray m-0 text-left"> {{subjectCode}} </p>
                            </div>


                        </div>
                    </div>

                </div>
            </div>

            <div class="col-2 p-0">
                <div class="row m-0">
                    <div class="col-12 p-0">
                        <p class="m-0 blue">Groups</p>
                    </div>
                    <div class="col-12 p-0">
                        <p class="m-0 text-center gray">{{groupQty}}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <b-modal ref="my-modal" hide-footer hide-header-close centered>
        <div class="container p-0 w-100">

            <div class="row m-0 d-flex justify-content-center">
                <div class="col-12">
                    <p class="font-weight-bold m-0 pb-2 text-center blue">Select group</p>
                </div>
                <!-- container separator  -->
                <div class="col-12 divider"></div>
            </div>
            <div class="row m-0" v-for="(group, index) in groups" :key="index">
                <div class="col-12" @click="groupSelected(group)">
                    <div class="row">
                        <div class="col-10">
                            <p class="m-0 p-0 blue">Group:{{classGroupList[group].groupCode}} {{classGroupList[group].startHour}}-{{classGroupList[group].endHour}}</p>
                        </div>
                        <div class="col-2">
                            <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="chevron-right"/>
                        </div>
                        <!-- container separator  -->
                        <div class="col-12 divider"></div>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    name: "teachersubjectcard",
    props: {
        groupId: Number,
        subjectIcon: String,
        subjectColor: String,
        subjectName: String,
        subjectCode: String,
        group: String,
        groupQty: Number
    },
    created() {
    },
    data() {
      return {
        groups: []
      }
    },
    computed: {
        ...mapGetters([
            'classGroupList'
        ]),
        style () {
        return 'width: 2px; background-color: ' +  this.subjectColor;
      }
    },
    methods: {
        moreThanOne: function () {
            const arr = [];
            if(this.groupQty > 1) {
                for (let index = 0; index < this.classGroupList.length; index++) {
                    if (this.classGroupList[index].courseName === this.subjectName) {
                        arr.push(index);
                    }
                }
                this.groups = arr;
                this.$refs['my-modal'].show()
            } else {
            var id = 0;
            for(let index = 0; index < this.classGroupList.length; index++) {
                if (this.classGroupList[index].classGroupId == this.groupId) {
                    id = index;
                }
            }
                this.$store.commit('updateSelectedGroup', id)
                this.$router.push('/course-overview-teacher/assignments')
            }
        },
        groupSelected: function (group) {
            this.$store.commit('updateSelectedGroup', group)
            this.$router.push('/course-overview-teacher/assignments')
        }
    }
}
</script>

<style scoped>
    .card {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
    }

    .modal-header {
        display: none!important;
    }

    .divider {
        border: 1px solid #1071A3;
        margin-bottom: 0.5rem;
    }
</style>