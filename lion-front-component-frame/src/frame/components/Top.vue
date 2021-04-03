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
                                    <a-avatar :src="headPortraitUrl" />
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

        <a-modal destroyOnClose v-model="editHeadPortraitModal" width="400px" title="修改头像" centered @ok="updateHeadPortrait" :maskClosable="maskClosable" cancelText="关闭" okText="保存">
            <a-upload :action="uploadAction" accept="image/png, image/jpeg" list-type="picture-card" :file-list="fileList" @change="(e)=>headPortraitChange(e)" :remove="function(file){headPortraitRemove(file)} " @preview="handlePreview">
                <div v-if="fileList.length < 1">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">
                        上传
                    </div>
                </div>
            </a-upload>
        </a-modal>

        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script lang="ts">

    import { Component,  Vue } from 'vue-property-decorator';
    import axios from "@lion/lion-front-core/src/network/axios";
    let md5 = require('md5');
    import { message,Icon } from 'ant-design-vue'
    @Component({
        components: {},
    })
    export default class Top extends Vue {

        private maskClosable:boolean=false;
        private editHeadPortraitModal:boolean=false;
        private editHeadPortraitModel:any={};
        private editPasswordModal:boolean=false;
        private editPasswordModel:any={};
        private editPasswordModelRules:any={
            pass:[{required:true,validator:this.validatorPass, trigger:'blur'}],
            confirmPass:[{required:true,validator:this.validatorConfimPass, trigger:'blur'}],
        }
        private user:any={name:""};
        private fileList:Array<any>=[];
        private uploadAction:string=process.env.VUE_APP_BASEURL+process.env.VUE_APP_BASEAPI+"/lion-common-console-restful/file/console/upload"
        private headPortraitUrl:string="";
        //头像预览窗口是否显示
        private previewVisible:boolean=false;
        //预览图片
        private previewImage:any="";
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
            axios.get("/lion-upms-console-restful/user/console/current/user/details",{params:{}})
            .then((data)=>{
                this.user=data.data;
                if (this.user.headPortraitVo && this.user.headPortraitVo.url){
                    this.headPortraitUrl=process.env.VUE_APP_BASEURL+process.env.VUE_APP_BASEAPI+this.user.headPortraitUrl;
                }
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
                this.editHeadPortrait();
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

        private editHeadPortrait():void{
            this.editHeadPortraitModal=true;
            this.editHeadPortraitModel={};
        }

        private editPassword():void{
            this.editPasswordModal=true;
            this.editPasswordModel={};
        }

        private updatePassword():void{
            let formData=new FormData();
            formData.append('password',md5(this.editPasswordModel.pass));
            axios.put("/lion-upms-console-restful/user/console/current/user/passwod/update",formData)
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

        private updateHeadPortrait():void{
            let formData=new FormData();
            formData.append('headPortrait',this.editHeadPortraitModel.headPortrait);
            axios.put("/lion-upms-console-restful/user/console/current/user/head/portrait/update",formData)
                .then((data)=>{
                    if (Object(data).status === 200){
                        message.success("修改头像成功");
                    }
                })
                .catch(fail => {
                })
                .finally(()=>{
                });
        }

        /**
         * 上传头像回调事件
         */
        private headPortraitChange( obj:any):void{
            this.fileList = obj.fileList;
            if (obj.file.status === 'done'){
                const response:any = eval('('+obj.file.xhr.response+')');
                this.editHeadPortraitModel.headPortrait=response.data[0].id;
                this.headPortraitUrl=process.env.VUE_APP_BASEURL+process.env.VUE_APP_BASEAPI+response.data[0].url;
            }
        }

        /**
         * 头像删除事件
         */
        private headPortraitRemove(file:any):boolean{
            delete this.editHeadPortraitModel.headPortrait;
            return true;
        }

        /**
         * 显示预览窗口
         */
        async handlePreview(file:any){
            if (!file.url && !file.preview) {
                file.preview = await this.getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        }
        /**
         * 获取图片base64编码
         */
        private getBase64(file:any) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        /**
         * 取消预览
         */
        private handleCancel():void {
            this.previewVisible = false;
        }
    }

</script>

<style scoped>
    .top-nav-wrap {
        position: absolute;
        right: 50px;
    }
    /* tile uploaded pictures */
    .upload-list-inline >>> .ant-upload-list-item {
        float: left;
        width: 200px;
        margin-right: 8px;
    }
    .upload-list-inline >>> .ant-upload-animate-enter {
        animation-name: uploadAnimateInlineIn;
    }
    .upload-list-inline >>> .ant-upload-animate-leave {
        animation-name: uploadAnimateInlineOut;
    }
</style>