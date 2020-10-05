<template>
    <div>
        <a-layout-header class="header">
            <div class="logo">
                <a>
                    <img class="expanded" src="@/assets/logo-full.svg" style="max-height:40px;" />
                </a>
            </div>

            <div class="top-nav-wrap">
                <ul class="top-nav">
                    <li class="hidden-xs">
                        <a-dropdown>
                            <div class="item">
                                <div class="d-flex align-items-center px-sm">
                                    <a-avatar src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3474094557,370758738&fm=11&gp=0.jpg" />
                                    <samp style="margin-left: 10px;">{{user.name}}</samp>
                                </div>
                            </div>
                            <a-menu slot="overlay" @click="handleCommand">
                                <a-menu-item key="editHeadPortrait">
                                    <i class="fa fa-cog"></i>
                                    修改头像</a-menu-item>
                                <a-menu-divider />
                                <a-menu-item key="editPassword">
                                    <i class="fa fa-cog"></i>
                                    修改密码</a-menu-item>
                                <a-menu-divider />
                                <a-menu-item divided key="logout">
                                    <i class="fa fa-sign-out"></i>
                                    退出登录</a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </li>
                </ul>
            </div>
        </a-layout-header>

        <a-modal destroyOnClose v-model="editPasswordModal" width="800px" title="修改密码" centered @ok="updatePassword" :maskClosable="maskClosable" cancelText="关闭" okText="保存">
            <a-form-model layout="inline" ref="editPasswordForm" :model="editPasswordModel" :rules="editPasswordModelRules" >
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="密码" prop="pass" ref="pass" >
                            <a-input-password  placeholder="请输入密码" v-model="editPasswordModel.pass" autocomplete="off"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="确认密码" prop="confirmPass" ref="confirmPass" >
                            <a-input-password  placeholder="请输入确认密码" v-model="editPasswordModel.confirmPass" autocomplete="off"/>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script lang="ts">

    import { Component,  Vue } from 'vue-property-decorator';
    import axios from "@lion/lion-front-core/src/network/axios";
    let md5 = require('md5');
    import { message } from 'ant-design-vue'
    @Component({
        components: {
        },
    })
    export default class Top extends Vue {

        private maskClosable:boolean=false;
        private editPasswordModal:boolean=false;
        private editPasswordModel:any={};
        private editPasswordModelRules:any={
            pass:[{required:true,validator:this.validatorPass, trigger:'blur'}],
            confirmPass:[{required:true,validator:this.validatorConfimPass, trigger:'blur'}],
        }

        private user:any={name:""};

        /**
         * 校验密码
         * @param rule
         * @param value
         * @param callback
         */
        private validatorPass(rule :any, value:string, callback:any):void{
            if (!value || value.trim() === ''){
                callback(new Error('请输入密码'));
            }else{
                if (this.editPasswordModel.confirmPass && this.editPasswordModel.confirmPass.trim() !== ''){
                    (this.$refs.form as any).validateField("confirmPass");
                }
                callback();
            }
        }

        /**
         * 校验确认密码
         * @param rule
         * @param value
         * @param callback
         */
        private validatorConfimPass(rule :any, value:string, callback:any):void{
            if (!value || value.trim() === '' ){
                callback(new Error("请输入确认密码！"));
            }else if (this.editPasswordModel.pass !== this.editPasswordModel.confirmPass){
                callback(new Error("两次输入的密码不一致！"));
            }
            callback();
        }

        private mounted():void{
            axios.get("/upms/user/console/current/user/details",{params:{}})
            .then((data)=>{
                this.user=data.data.user;
            })
            .catch(fail => {
            })
            .finally(()=>{
            });

        }

        private handleCommand(e:any):void{
            if (e.key==="logout"){
                this.logout();
            }else if (e.key==="editPassword"){
                this.editPassword();
            }else if (e.key==="editHeadPortrait"){

            }
        }

        private logout():void{
            axios.get("/logout",{params:{}})
            .then((data)=>{
                window.location.href="/";
            })
            .catch(fail => {
            })
            .finally(()=>{
            });
        }

        private editPassword():void{
            this.editPasswordModal=true;
            this.editPasswordModel={};
        }

        private updatePassword():void{
            let formData=new FormData();
            formData.append('password',md5(this.editPasswordModel.pass));
            axios.put("/upms/user/console/current/user/passwod/update",formData)
            .then((data)=>{
                if (Object(data).status === 200){
                    message.success("修改密码成功");
                }
            })
            .catch(fail => {
            })
            .finally(()=>{
            });

        }
    }

</script>

<style lang="less" scoped>
    .top-nav-wrap {
        position: absolute;
        right: 50px;
    }
</style>