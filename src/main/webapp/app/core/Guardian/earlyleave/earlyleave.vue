<template>
<div>
<div class="container-fluid p-0 sticky-top blueBG">
    <header-arrow
        headerTitle="Early leave"
    />
    <!-- container separator  -->
    <div style="zIndex: 1" class="col-12 divider"></div>
</div>
</div>
</template>

<script>
import HeaderArrow from '../headerarrow/headerarrow.vue';

export default {
    name: "earlyleave",
    components: {
        HeaderArrow
    }
}
</script>

<style scoped>
  .divider {
    background: #FFFFFF;
    border-radius: 100px 100px 0px 0px;
    height: 15px;
  }
</style>