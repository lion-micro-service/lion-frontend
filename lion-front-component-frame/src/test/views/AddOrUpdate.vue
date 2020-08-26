<template>
    <div>
        <a-form-model layout="inline" ref="form" :model="addModel" :rules="rules" >
            <a-card class="card" :bordered="false">
                <a-row >
                    <a-col :span="8">
                        <a-form-model-item label="登陆账号" prop="username" ref="username" >
                            <a-input placeholder="请输入登陆账号" v-model="addModel.username"  autocomplete="off"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item label="密码" prop="password" ref="password" >
                            <a-input-password placeholder="请输入密码" v-model="addModel.password" autocomplete="off"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item label="确认密码" prop="confirmPassword" ref="confirmPassword" >
                            <a-input-password placeholder="请输入确认密码" v-model="addModel.confirmPassword" autocomplete="off"/>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="8">
                        <a-form-model-item label="姓名" prop="name" ref="name" >
                            <a-input placeholder="请输入姓名" v-model="addModel.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item label="邮箱" prop="email" ref="email">
                            <a-input placeholder="请输入邮箱" v-model="addModel.email" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item label="年龄" prop="age" ref="age">
                            <a-input-number  placeholder="请输入年龄" v-model="addModel.age" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="8">
                        <a-form-model-item label="生日" prop="birthday" ref="birthday" >
                            <a-date-picker placeholder="请输入生日" v-model="addModel.birthday" />
                        </a-form-model-item>
                    </a-col>
                </a-row>

                <a-row >
                    <a-col :span="24" style="text-align:center;">
                        <a-form-item >
                            <a-button type="primary" icon="save" @click="save()">保存</a-button>
                            <a-button type="dashed" icon="undo" @click="reset()">重置</a-button>
                            <a-button icon="rollback" @click="back()">返回</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
        </a-form-model>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import axios from "@lion/lion-front-core/src/network/axios";
    @Component({})
    export default class AddOrUpdate extends Vue{

        private searchUsername :boolean = false;

        private addModel : any={};

        private rules:any={
            username:[{required:true,validator:this.checkUsernameIsExist,trigger:'blur'}],
            password:[{required:true,validator:this.validatorPassword, trigger:'blur'}],
            confirmPassword:[{required:true,validator:this.validatorConfimPassword, trigger:'blur'}],
        };

        private checkUsernameIsExist(rule :any, value:string, callback:any):void{
            if (!value || value.trim() === ''){
                callback(new Error('请输入登陆账号'));
                return;
            }else if (value && value.trim() !== ''){
                axios.get("/upms/user/console/exist",{params:{"username":this.addModel.username}})
                    .then((data)=> {
                        if (data.data.isExist) {
                            callback(new Error('该账号已存在'));
                        }else {
                            callback();
                        }
                    })
                    .catch(fail => {
                    })
                    .finally(()=>{
                    });
                return;
            }
            callback();

        }

        private validatorPassword(rule :any, value:string, callback:any):void{
            if (!value || value.trim() === ''){
                callback(new Error('请输入密码'));
            }else{
                if (this.addModel.confirmPassword && this.addModel.confirmPassword.trim() !== ''){
                    (this.$refs.form as any).validateField("confirmPassword");
                }
                callback();
            }
        }

        private validatorConfimPassword(rule :any, value:string, callback:any):void{
            if (!value || value.trim() === '' ){
                callback(new Error("请输入确认密码！"));
            }else if (this.addModel.password !== this.addModel.confirmPassword){
                callback(new Error("两次输入的密码不一致！"));
            }
            callback();
        }


        private save():void{
            (this.$refs.form as any).validate((validate: boolean) => {
                if (!validate) {

                }
            });
        };

        private back():void{
            this.$router.go(-1);
        };

        private reset():void{
            (this.$refs.form as any).resetFields();
            this.addModel = {};
        }

    }
</script>

<style lang="css" scoped>
    .ant-form-item >>> .ant-form-item-label{
        width: 80px;
    }
    .ant-form-item{
        width: 100%;
    }
    .ant-row >>> .ant-form-item-control-wrapper{
        width: calc(100% - 80px);
    }
</style>