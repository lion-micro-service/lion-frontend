<template>
    <div>
        <a-form-model ref="ruleForm" :model="searchModel" >
            <a-card class="card" :bordered="false">
                <a-row :gutter="40">
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" style="margin-bottom: 0px;">
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" style="margin-bottom: 0px;">
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" style="margin-bottom: 0px;">
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="40">
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" style="margin-bottom: 0px;">
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" style="margin-bottom: 0px;">
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :xs="8">
                        <a-form-model-item prop="name" ref="name" style="margin-bottom: 0px;">
                            <a-input addonBefore="姓名:" placeholder="请输入" v-model="searchModel.name" />
                        </a-form-model-item>
                    </a-col>
                </a-row>

                <a-form-item style="text-align:right;margin-bottom: 0px;">
                    <a-button type="primary" icon="search">查询</a-button>
                    <a-button type="primary">添加</a-button>
                    <a-button type="danger">删除</a-button>
                </a-form-item>
            </a-card>
        </a-form-model>

        <a-table :columns="columns" :dataSource="data">
            <a slot="action" slot-scope="text">action</a>
        </a-table>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
    @Component({})
    export default class List extends Vue{

        private searchModel : any ={
            name : "测试"
        }

        private x : number = 1500;
        private y : number = 300;

        private columns :Array<any> = [
            { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
            { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
            { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
            { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
            { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
            { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
            { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
            { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
            { title: 'Column 8', dataIndex: 'address', key: '8' },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                scopedSlots: { customRender: 'action' },
            },
        ];

        private data:Array<any> = [{key:1,name:'Edrward',age:32,address:'London Park no'},
            {key:2,name:'ss',age:32,address:'London Park no'}];

    }
</script>

<style lang="less" scoped>

</style>