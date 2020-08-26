<template>
    <div class="login">
        <a-form-model ref="ruleForm" :model="loginModel" :rules="rules" @submit="login">
            <a-form-model-item prop="username" ref="username">
                <a-input size="large" placeholder='登陆账号' v-model="loginModel.username" >
                    <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password" ref="password">
                <a-input size="large" type="password" placeholder="密码" v-model="loginModel.pass">
                    <a-icon slot="prefix" type='lock' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type='primary' htmlType='submit' size="large" class="ant-btn__block">
                    登录
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script lang="ts">
    import {Vue,Component,Prop } from "vue-property-decorator";
    import { FormModel } from 'ant-design-vue';
    import axios from "@lion/lion-front-core/src/network/axios";
    var md5 = require('md5');
    Vue.use(FormModel);
    @Component({})
    export default class Index extends Vue{

        //登陆model
        private loginModel :any ={
            username: "",
            pass: "",
            password:"",
            grant_type : "password",
            scope : "console",
            client_id : "console",
            client_secret : "console"
        };

        //校验规则
        private rules : any ={
            username:[{required:true,message:'请输入用户名',trigger:'blur'}],
            pass:[{required:true,message:'请输入密码',trigger:'blur'}]
        }

        private login(event:any):void {
            event.preventDefault();
            (this.$refs.ruleForm as any).validate((validate: boolean) => {
                if (validate) {
                    this.loginModel.password = md5(this.loginModel.pass);
                    const formData = new FormData();
                    Object.keys(this.loginModel).forEach((key) => {
                        formData.append(key, this.loginModel[key]);
                    });
                    axios.post("/oauth/token",formData,{})
                    .then(success => {
                        }
                    ).catch(fail => {
                        }
                    );
                }
            });

        }
    }
</script>

<style lang="less">
    @import '../assets/theme/styles/index.less';

    .login {
        display: block;
        width: 368px;
        margin: 0 auto;

        .ant-tabs .ant-tabs-bar {
            border-bottom: 0;
            margin-bottom: 24px;
            text-align: center;
        }

        .ant-tabs-tab {
            font-size: 16px;
            line-height: 24px;
        }

        .ant-input-affix-wrapper .ant-input:not(:first-child) {
            padding-left: 34px;
        }

        .icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: @primary-color;
            }
        }

        .other {
            text-align: left;
            margin-top: 24px;
            line-height: 22px;

            nz-tooltip {
                vertical-align: middle;
            }

            .register {
                float: right;
            }
        }
    }
</style>