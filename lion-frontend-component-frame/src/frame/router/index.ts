import { createRouter,createWebHashHistory}  from 'vue-router'
const routes : Array<any> =[]
const route = createRouter({
    history: createWebHashHistory(),
    routes
})
export default route