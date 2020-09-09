<template>
    <div class="reuse-tab ad-rt fixed">
        <div slot="breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item v-for="(value,key,index) in $store.state.menu._currentMeun" v-bind:key="value">
                    <a >{{value}}</a>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
    </div>
</template>

<script lang="tsx">
import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch} from 'vue-property-decorator';
import {MenuModule} from "@/frame/store/modules/menu";

@Component({})
export default class ReuseTab extends Vue {
}
</script>

<style lang="less">
@reuse-tab-prefix: ~'.reuse-tab';
@reuse-tab-height: 52px;
@reuse-tab-bg: #fff;
@reuse-tab-padding: 8px;
@reuse-tab-border-color: #d9d9d9;

@{reuse-tab-prefix} {
    display: block;
    background-color: @reuse-tab-bg;
    padding: @reuse-tab-padding;
    border-bottom: 1px solid @reuse-tab-border-color;
    outline: none;
    user-select: none;

    .ant-tabs-bar {
        margin-bottom: 0;
        border-bottom: none;
    }

    .ant-tabs-nav .ant-tabs-tab {
        padding: 0;

        .name {
            display: inline-block;
            padding: 8px 20px;
        }

        .op {
            display: none;
            position: absolute;
            top: 14px;
            right: 2px;
            margin: 0;
            font-size: 12px;
        }

        &:hover {
            .op {
                display: block;
            }
        }
    }
}

@{reuse-tab-prefix}__cm {
    .ant-menu {
        border: 1px solid #e9e9e9;
    }
}

.ad-rt {
    display: block;
    background-color: #fff;
    padding: 8px;
    margin: 0 -24px 0 -24px;
    border-bottom: 1px solid #d9d9d9;
    outline: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

}

.ad-rt.fixed {
    position: fixed;
    top: 64px;
    left: 200px;
    right: 0;
    margin: 0;
    z-index: 10
}

.aside-collapsed {
    .ad-rt.fixed {
        position: fixed;
        top: 64px;
        left: 64px;
        right: 0;
        margin: 0;
        z-index: 10
    }
}
</style>
