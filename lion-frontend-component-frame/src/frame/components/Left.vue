<template>
    <div class="aside" style="overflow-x:auto;overflow-y:auto">
        <a-menu :mode="mode" :theme="theme"  :open-keys.sync="openKeys">
            <template v-for="value in menu">
                <a-menu-item @click="click(value.url,[value.name])" v-if="value.type.key === 1" :key="value.id">
                    <span>{{ value.name }}</span>
                </a-menu-item>
                <a-sub-menu v-else-if="value.type.key === 0" :key="value.id">
                    <span slot="title"><span>{{ value.name }}</span></span>
                    <template v-for="childValue in value.children">
                        <a-menu-item v-if="childValue.type.key === 1" :id="childValue.id"  @click="click(childValue.url,[value.name,childValue.name] )"  :key="childValue.id">
<!--                            <a-icon type="appstore" />--> {{childValue.name}}
                        </a-menu-item>
                        <a-sub-menu v-else-if="childValue.type.key === 0" :key="childValue.id">
                            <span slot="title"><span>{{ childValue.name }}</span></span>
                            <a-menu-item v-if="childChildValue.type.key === 1" :id="childChildValue.id"  @click="click(childChildValue.url,[value.name,childValue.name,childChildValue.name] )" v-for="childChildValue in childValue.children"  :key="childChildValue.id">
<!--                                <a-icon type="appstore" />--> {{childChildValue.name}}
                            </a-menu-item>
                        </a-sub-menu>
                    </template>
                </a-sub-menu>
            </template>
        </a-menu>
    </div>
</template>
<script lang="ts">
    import {Options, Vue} from 'vue-property-decorator';
    import axios from "@lion/lion-frontend-core/src/network/axios";
    import {MenuModule} from "@/frame/store/modules/menu";
    @Options({})
    export default class Left extends Vue{
        private mode:string = "inline";
        private theme:string = "light";
        private defaultSelectedKey:Array<string>=[];
        private openKeys:Array<string>=[];

        private menu:Array<any> =[];

        public mounted():void{
            axios.get("/lion-upms-console-restful/resources/console/menu").then((data)=>{
                if (data.data){
                    this.persistentAuthority(data.data);
                    this.menu = data.data;
                    this.$nextTick(function(){
                        let id:string |null = this.defaultSelectedKey[0];
                        let obj:any = document.getElementById(id);
                        if (obj){
                            obj.click();
                        }
                    })
                }
            }).then(error=>{

            }).finally(()=>{

            })
        }

        private persistentAuthority(resources:Array<any>):void{
            let authority:Array<string>=[];
            for (const value of resources) {
                if (this.openKeys.length==0){
                    this.openKeys[0] = value.id;
                }
                authority[authority.length] = value.code;
                if (value.children && value.children.length>0){
                    let authorityTemp:Array<string>=[];
                    this.persistentAuthorityChilder(value.children,authorityTemp);
                    for (const code of authorityTemp) {
                        authority[authority.length] = code;
                    }
                }
            }
            sessionStorage.setItem("authority",authority.join(","));
        }

        private persistentAuthorityChilder(resources:Array<any>,authority:Array<any>):void{
            for (const value of resources) {
                if (this.defaultSelectedKey.length==0){
                    if (value.url) {
                        this.defaultSelectedKey[0] = value.id;
                    }
                }
                if (this.defaultSelectedKey.length==0 && value.children && value.children.length>0){
                    this.openKeys[this.openKeys.length] = value.id;
                }
                authority[authority.length] = value.code;
                if (value.children && value.children.length>0){
                    this.persistentAuthorityChilder(value.children,authority);
                }
            }
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