<template>
    <div class="aside" style="overflow-x:auto;overflow-y:auto">
        <a-menu mode="inline" theme="light"  :open-keys="openKeys" v-model:selectedKeys="defaultSelectedKey">
          <template v-for="value in menu">
            <a-sub-menu v-if="value.type.key === 0" :key="value.id">
              <template #title>{{value.name}}</template>
              <a-menu-item :id="childValue.id" @click="click(childValue.url,[value.name,childValue.name])" v-for="childValue in value.children" :key="childValue.id">{{childValue.name}}</a-menu-item>
            </a-sub-menu>
          </template>
        </a-menu>
    </div>
</template>
<script lang="ts">
    import {Options, Vue} from 'vue-property-decorator';
    import {ref} from 'vue';
    import axios from "@lion/lion-frontend-core/src/network/axios";
    import {MenuModule} from "@/frame/store/modules/menu";
    @Options({components:{}})
    export default class Left extends Vue{
        private defaultSelectedKey:Array<string>=[];
        private openKeys:Array<string>=['1'];

        private menu:Array<any> =[];

        public mounted():void{
          let _this:any = this;
            axios.get("/lion-upms-console-restful/resources/console/menu").then((data)=>{
              if (data.data){
                let b:boolean =true;
                for (const value of data.data) {
                  if (b) {
                    _this.openKeys[0] = value.id;
                    b=false;
                  }
                }
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
              Object(document.getElementById("contentIframe")).src = window.location.protocol+"//"+window.location.host+url;
            }
        }
    }

</script>
<style lang="less" scoped>
</style>