<template>
    <div>
        <a-form-model ref="ruleForm" :model="searchModel" >
            <a-card class="card" :bordered="false">
                <a-row :gutter="40">
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" >
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" >
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" >
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="40">
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" >
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" >
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" >
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                </a-row>

                <a-form-item style="text-align:right;">
                    <a-button type="primary" icon="search" @click="search()">查询</a-button>
                    <a-button type="primary" icon="file-add">添加</a-button>
                    <a-button type="danger" icon="delete">删除</a-button>
                </a-form-item>
            </a-card>
        </a-form-model>

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

        private searchModel : any ={
            name : "",
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



    }
</script>

<style lang="less" scoped>
    .ant-form-item{
        margin-bottom: 0px;
    }
</style>
