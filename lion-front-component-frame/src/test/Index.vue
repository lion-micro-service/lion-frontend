<template>
    <router-view></router-view>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    @Component({})
    export default class Index extends Vue{
        private created() {
            this.$router.push('/test/list');
        }
    }
</script>

<style lang="less" scoped>
</style>


