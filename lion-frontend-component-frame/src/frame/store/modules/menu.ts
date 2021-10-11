import {VuexModule, Module, Mutation, Action, getModule} from 'vuex-module-decorators'
import store from '../index'

@Module({name: "menu", dynamic:true, namespaced: true,store})
export default class Menu extends VuexModule{
    public _currentMeun:Array<string> = ["|"];

    @Mutation
    private mutationCurrentMeun(currentMeun: Array<string>):void{
        this._currentMeun = currentMeun;
    }

    @Action
    public setCurrentMeun(currentMeun: Array<string>):void {
        this.context.commit('mutationCurrentMeun', currentMeun);
    }

}

export const MenuModule = getModule(Menu);