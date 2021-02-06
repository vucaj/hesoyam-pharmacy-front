import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import MedicineSearchPage from '../views/MedicineSearchPage.vue'
import PharmacistPage from '../views/PharmacistPage.vue'
import DermatologistPage from '../views/DermatologistPage.vue'
import SysAdminProfilePage from '../views/SysAdminProfilePage.vue'
import SupplierPage from '../views/SupplierPage.vue'
import BrowseMedicinePage from '../views/BrowseMedicinePage.vue'
import AllPharmaciesPage from '../views/AllPharmaciesPage.vue'

import PharmacyPage from '../views/PharmacyPage.vue'
import PharmacistsPage from '../views/PharmacistsPage.vue'
import DermatologistsPage from '../views/DermatologistsPage.vue'
import EmployeePage from '../views/EmployeePage.vue'
import SearchUsersPage from '../views/SearchUsersPage.vue'
// import HandOutMedicinePage from '../views/HandOutMedicinePage.vue'
import CounselingReportPage from '../views/CounselingReportPage.vue'


import * as UserService from '../service/UserService.js';


import {client} from '@/client/axiosClient'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login', 
    component: LoginPage,
    beforeEnter: function(to, from, next){
      if(UserService.isUserLoggedIn()){
        router.push({path: '/'});
      }else{
        next();
      }
    }
  },

  {
    path: '/register', 
    component: RegisterPage,
    beforeEnter: function(to, from, next){
      if(UserService.isUserLoggedIn()){
        router.push({path: '/'});
      }else{
        next();
      }
    }
  },

  {
    path: '/profile', 
    component: ProfilePage,
    beforeEnter: function(to, from, next){
      if(!UserService.isUserLoggedIn()){
        router.push({path: '/login'});
      }
      else{
        next();
      }
    }
  },
  {
    path: '/sys-profile',
    component: SysAdminProfilePage,
    beforeEnter: function(to, from, next){
      if(UserService.isSysAdmin()){
        next();
        return;
      }
      router.push({path:'/login'});
    }
  },
  {
    path:'/supplier-profile',
    component: SupplierPage
  },
  {
    path:'/browse-medicine',
    component: BrowseMedicinePage
  },
  {
    path: '/medicine-search',
    component: MedicineSearchPage,
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pharmacist',
    component: PharmacistPage,
    beforeEnter: function(to, from, next){
      if(!UserService.isUserLoggedIn()){
        router.push({path: '/login'});
      }
      else{
        let user = UserService.getLoggedUserData();
        if(user.userRole == 'PHARMACIST'){
          next();
        }
        else{
          router.push({path: '/'});
        }
      }
    }
  },
  {
    path: '/pharmacist/:id',
    name: 'Pharmacist',
    component: EmployeePage,
    beforeEnter: function(to, from, next){
      UserService.isUserLoggedIn() ? next() : router.push({path: '/login'});
    }
  },
  {
    path: '/dermatologist/:id',
    name: 'Dermatologist',
    component: EmployeePage,
    beforeEnter: function(to, from, next){
      UserService.isUserLoggedIn() ? next() : router.push({path: '/login'});
    }
  },
  {
    path: '/pharmacy/all',
    name: 'AllPharmacies',
    component: AllPharmaciesPage
  },
  {
    path: '/dermatologist',
    component: DermatologistPage,
    beforeEnter: function(to, from, next){

      if(!UserService.isUserLoggedIn()){
        router.push({path: '/login'});
      }
      else{
        let user = UserService.getLoggedUserData();
        if(user.userRole == 'DERMATOLOGIST'){
          next();
        }
        else{
          router.push({path: '/'});
        }
      }
    }
  },
  {
    path: '/pharmacy/:id',
    name: 'Pharmacy',
    component: PharmacyPage
  },
  {
    path: '/pharmacists',
    name: 'Pharmacists',
    component: PharmacistsPage,
    beforeEnter: function(to, from, next){
        let user = UserService.getLoggedUserData();
        if(user.userRole == 'PATIENT' || user.userRole == 'ADMINISTRATOR'){
          next();
        }
        else{
          router.push({path: '/'});
        }
    }
  },

  {
    path: '/searchusers',
    name: 'SearchUsers',
    component: SearchUsersPage,
    beforeEnter: function(to, from, next){
      let user = UserService.getLoggedUserData();
      if(user.userRole == 'PHARMACIST' || user.userRole == 'DERMATOLOGIST'){
        next();
      }
      else{
        router.push({path: '/'});
      }
    }
  },

  {
    path: '/dermatologists',
    name: 'Dermatologists',
    component: DermatologistsPage,
    beforeEnter: function(to, from, next){
      let user = UserService.getLoggedUserData();
      if(user.userRole == 'PATIENT' || user.userRole == 'ADMINISTRATOR'){
        next();
      }
      else{
        router.push({path: '/'});
      }
    }
  },
  {
    path: '/counseling-report',
    name: 'CounselingReport',
    component: CounselingReportPage,
    beforeEnter: function(to, from, next){
      let user = UserService.getLoggedUserData();
      if(user.userRole == 'PHARMACIST'){
        next();
      }
      else{
        router.push({path: '/'});
      }
    }
  },
  // {
  //   path: '/hand-out-medicine',
  //   name: 'HandOutMedicine',
  //   component: HandOutMedicinePage,
  //   beforeEnter: function(to, from, next){
  //     let user = UserService.getLoggedUserData();
  //     if(user.userRole == 'PHARMACIST'){
  //       next();
  //     }
  //     else{
  //       router.push({path: '/'});
  //     }
  //   }
  // },
  {
    path: '/my-pharmacy',
    name: 'MyPharmacy',
    component: PharmacyPage,
    beforeEnter: function(to, from, next){
      let user = UserService.getLoggedUserData();
      if(user.userRole == 'ADMINISTRATOR'){
        client({
          method: 'GET',
          url: 'administrator/pharmacy/id'
        }).then((response) => {
          let pharmacyId = response.data;
          router.push({path: '/pharmacy/' + pharmacyId});
        }, (error) => {});
      }
      else{
        router.push({path: '/'});
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( async (to, from, next) => {
  //Before each routing, check user authentication (token)
  UserService.validateAuthentication().then( (isAuthenticationValid) => {
      if(!isAuthenticationValid){
        UserService.clearUserData();
      }
      next();
  });
});


export default router
