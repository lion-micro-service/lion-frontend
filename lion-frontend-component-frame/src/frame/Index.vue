<template>
    <div class="wrapper">
        <Top></Top>
        <Left></Left>
        <reuse-tab></reuse-tab>
        <div id="content">
            <iframe ref="contentIframe" id="contentIframe" width="100%" frameborder=”no” border=”0″ marginwidth=”0″ marginheight=”0″ scrolling=”no” allowtransparency=”yes” src=""></iframe>
        </div>
<!--        <footer-toolbar></footer-toolbar>-->
    </div>
</template>

<script lang="ts">
    import {Vue,Options,Prop,Emit} from 'vue-property-decorator';
    import Top from "@/frame/components/Top.vue";
    import Left from "@/frame/components/Left.vue"
    import FooterToolbar from '@/frame/components/footertoolbar/Index.vue'
    import ReuseTab from '@/frame/components/reusetab/Index.vue'
    @Options({
      components:{Top,Left,FooterToolbar,ReuseTab}
    })
    export default class Index extends Vue{

    }
</script>

<style lang="less">
    #content {
        margin-top: 100px;
        margin-left: 200px;
        //min-height: e("calc(100vh - 154px)")
      min-height: e("calc(100vh - 107px) ")
    }
    #contentIframe{
        //min-height: e("calc(100vh - 160px)");
      min-height: e("calc(100vh - 107px)");
        padding-left: 10px;
        padding-top: 10px;
        padding-right: 10px;
    }
</style>