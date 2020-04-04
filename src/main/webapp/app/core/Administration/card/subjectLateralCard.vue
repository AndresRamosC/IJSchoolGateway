<template>
    <div class="col-4 col-lg-12 px-0 py-3" style="height: fit-content;" @click="$emit('updateSubject', subjectId)">
        <div class="row">
            <div class="col pr-0">
                <div class="circle"  :style="style"></div>
            </div>
            <div class="col-9 px-0 blue"> {{name}} </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "lateralcard",
    props: {
        name: String,
        color: String,
        subjectId: Number
    },
    computed: {
        style () {
        return 'border-color: ' +  this.color;
      }
    }
}
</script>

<style scoped>
  .circle {
    width: 20px; height: 20px; 
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
</style>