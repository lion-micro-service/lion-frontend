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

    import {Vue,Component,Prop,Emit,PropSync,Provide,Model,Watch,Inject} from 'vue-property-decorator';

    @Component({
        components: {
        },
    })
    export default class Top extends Vue {


    }

</script>

<style lang="less" scoped>

</style>