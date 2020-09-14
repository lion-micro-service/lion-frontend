<template>
    <div class="aside">
        <a-menu :mode="mode" :theme="theme">
            <template v-for="value in menu">
                <a-menu-item @click="click(value.url,[value.name])" v-if="value.type.key === 1" :key="value.id">
                    <a-icon type="appstore" />
                    <span>{{ value.name }}</span>
                </a-menu-item>
                <a-sub-menu v-else-if="value.type.key === 0" :key="value.id">
                    <span slot="title"><a-icon type="appstore" /><span>{{ value.name }}</span></span>
                    <a-menu-item @click="click(childValue.url,[value.name,childValue.name] )" v-for="childValue in value.children" :key="childValue.id">
                        <a-icon type="appstore" /> {{childValue.name}}
                    </a-menu-item>
                </a-sub-menu>
            </template>
        </a-menu>
    </div>
</template>
<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import axios from "@lion/lion-front-core/src/network/axios";
    import {MenuModule} from "@/frame/store/modules/menu";
    @Component({})
    export default class Left extends Vue{
        private mode:string = "inline";
        private theme:string = "light";

        private menu:Array<any> =[];

        private mounted():void{
            axios.get("/upms/resources/console/front/menu").then((data)=>{
                if (data.data.menu){
                    this.menu = data.data.menu;
                }
            }).then(error=>{

            }).finally(()=>{

            })
        }

        private click( url:string,currentMeunTitle:Array<string>):void{
            if (url && url !== ''){
                MenuModule.setCurrentMeun(currentMeunTitle);
                url = url+(url.indexOf("?")>-1?"&":"?")+"_t="+new Date().getTime();
                Object(document.getElementById("contentIframe")).src = url;
            }
        }
    }

</script>
<style lang="less" scoped>
</style>