<template>
<div class="container-fluid p-0">
    <div class="row m-0" style="backgroundColor: #004674;">
        <b-nav>
            <b-nav-item active @click="toRoles()">
                <h1 class="font-weight-bold m-0 white">Role members</h1>
            </b-nav-item>
            <div style="width: 2px; height: 80%; backgroundColor: #559FD5" class="d-flex align-self-center"></div>
            <b-nav-item @click="toSubjects()">
                <h1 class="font-weight-bold m-0 white">Subjects</h1>
            </b-nav-item>
            <div style="width: 2px; height: 80%; backgroundColor: #559FD5" class="d-flex align-self-center"></div>
            <b-nav-item @click="toGroups()">
                <h1 class="font-weight-bold m-0 white">Groups</h1>
            </b-nav-item>
            <div style="width: 2px; height: 80%; backgroundColor: #559FD5" class="d-flex align-self-center"></div>
        </b-nav>
    </div>

    <div class="d-flex row m-0 pt-2 pb-2" style="border-bottom: 1px solid #1071a3;">
        <div class="flex-grow-1 pl-2">
            <h2 class="font-weight-bold m-0 blue"> {{qty}} {{type}}</h2>
        </div>
        <div class="flex-grow-1 p-0 pr-2">
            <div class="row m-0">
                <div class="col pr-1">
                    <h2 class="font-weight-bold m-0 text-right blue">Sort by:</h2>
                </div>
                <div class="col-2 p-0 flex-grow-1">
                    <b-form-select
                        id="form-sort"
                        class="combo-search p-0 w-100"
                        v-model="sortParameter"
                        :options="sortOptions"
                    ></b-form-select>
                </div>
            </div>
        </div>
        <div class="flex-grow-0 pl-0 pr-2">
            <b-form-input v-model="searchParameter" id="search-input" type="search" list="group-list" placeholder="Search"></b-form-input>

            <b-form-datalist id="group-list" :options="options"></b-form-datalist>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "navadministration",
    props: {
        qty: Number,
        type: String,
        sortOptions: Array,
        options: Array
    },
    data() {
        return {
            sortParameter: '',
            searchParameter: ''
        }
    },
    methods: {
        toRoles: function () {
            this.$router.push('/administration-dashboard/roles/guardian')
        },
        toGroups: function () {
            this.$router.push('/administration-dashboard/groups')
        },
        toSubjects: function () {
            this.$router.push('/administration-dashboard/subjects')
        }
    },
    watch: {
        sortParameter() {
            this.$emit('sortList', this.sortParameter)
        },
        searchParameter() {
            this.$emit('filterList', this.searchParameter)
        }
    }
}
</script>

<style scoped>
    .leave-box {
        background: #ffffff;
        border: 1px solid #1071a3;
        box-sizing: border-box;
        border-radius: 5px;
    }

    @media screen and (max-width: 630px) {
        h1 {
            font-size: 1.5em;
        }
    }
</style>