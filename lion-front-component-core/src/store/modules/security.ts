import {Module, MutationTree, ActionTree, GetterTree, ActionContext} from 'vuex';
import { RootState }  from './../index'

export interface ISecurityState{
    token?:string;
    permission?:any;
};
const mutations: MutationTree<ISecurityState> = {

};
const actions: ActionTree<ISecurityState, RootState> = {

};
const getters: GetterTree<ISecurityState, RootState> = {

};
const securityState: ISecurityState = {
};
const security: Module<ISecurityState, RootState> = {
    namespaced: true,
    state: securityState,
    getters,
    actions,
    mutations,
};
export default security;
