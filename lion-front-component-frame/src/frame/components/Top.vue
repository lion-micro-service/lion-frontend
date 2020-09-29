<template>
    <div>
        <a-layout-header class="header">
            <div class="logo">
                <a>
                    <img class="expanded" src="@/assets/logo-full.svg" style="max-height:40px;" />
                </a>
            </div>

        </a-layout-header>
    </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { State, Mutation, namespace } from 'vuex-class';

    @Component({
        components: {
        },
    })
    export default class Top extends Vue {


    }

</script>

<style lang="less" scoped>

</style>