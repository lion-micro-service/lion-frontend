<template>
    <div v-if="getAuthority()" >
      <slot></slot>
    </div>
</template>

<script lang="ts">
import {Options, Vue,Prop,Watch} from 'vue-property-decorator';
import authority from "./authority";
@Options({components:{}})
export default class Authority extends Vue{
  private show:boolean=false;
  @Prop(String) authorityCode: string;

  private getAuthority():any{
    return authority(this.authorityCode);
  }
}
</script>

<style scoped>

</style>