<template>
    <div>
        <a-card class="card" :bordered="false">
            <a-form-model layout="inline" ref="from" :model="searchModel" >
                <a-row>
                    <a-col :span="6">
                        <a-form-model-item label="登陆账号" prop="username" ref="username" >
                            <a-input placeholder="请输入登陆账号" v-model="searchModel.username"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-model-item label="姓名" prop="name" ref="name" >
                            <a-input placeholder="请输入姓名" v-model="searchModel.name"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-model-item label="年龄" prop="age" ref="age" >
                            <a-input-number placeholder="请输入年龄" v-model="searchModel.age"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-model-item label="邮箱" prop="email" ref="email" >
                            <a-input placeholder="请输入邮箱" v-model="searchModel.email"/>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="6">
                        <a-form-model-item label="生日" prop="birthday" ref="birthday" >
                            <a-date-picker placeholder="请输入生日" v-model="searchModel.birthday" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row >
                    <a-col :span="24" style="text-align:right;">
                        <a-form-item>
                            <a-button type="primary" icon="search" @click="search()">查询</a-button>
                            <a-button type="primary" icon="file-add" @click="add()">添加</a-button>
                            <a-button type="danger" icon="delete">删除</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-card>

        <a-card :bordered="false">
            <a-table rowKey="id" :columns="columns" :dataSource="data" :loading="loading" :pagination="paginationProps">

            </a-table>
        </a-card>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    import axios from "@lion/lion-front-core/src/network/axios";

    @Component({})
    export default class List extends Vue{



        private create():void {
        }

        private searchModel : any ={
            email:"",
            pageNumber:1,
            pageSize:1
        }

        private data:Array<any> = [];
        private loading:boolean=false;
        //private x : number = 1500;
        //private y : number = 300;

        private columns :Array<any> = [
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '邮箱', dataIndex: 'email', key: 'email'},
            { title: '年龄', dataIndex: 'age', key: 'age' }
        ];

        private paginationProps:any={
            showSizeChanger: true,
            showQuickJumper: true,
            current:this.searchModel.pageNumber,
            pageSize:this.searchModel.pageSize,
            hideOnSinglePage:false,
            pageSizeOptions:['10', '20', '30', '40','50','60','70','80','90','100'],
            showSizeChange: (pageNumber:number, pageSize: number)=>this.paginationSearch(pageNumber,pageSize),
            onChange: (pageNumber:number, pageSize: number)=>this.paginationSearch(pageNumber,pageSize),
        };

        private mounted() :void{
            this.search();
        }

        private paginationSearch(pageNumber:number, pageSize: number):void{
            this.searchModel.pageNumber=pageNumber;
            this.searchModel.pageSize=pageSize;
            this.search();
        }

        private search():void{
            this.loading=true;
            axios.get("/upms/user/console/list",{params:this.searchModel})
                .then((data)=>{
                        this.data=data.data.list;
                        this.paginationProps.total=(Object(data)).totalElements;
                        this.paginationProps.current=(Object(data)).pageNumber;
                        this.paginationProps.pageSize=(Object(data)).pageSize;
                    }
                )
                .catch(fail => {

                    }
                )
                .finally(()=>{
                        this.loading=false;
                    }
                );
        }

        private add():void{
            this.$router.push("/test/add");
        }

        private emailChange(value:string):void{
            this.searchModel.email =
                !value || value.indexOf('@') >= 0
                    ? []
                    : [`${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`];
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
