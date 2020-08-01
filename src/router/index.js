import Vue from 'vue'
import Router from 'vue-router'
import PageView from '@/layouts/PageView'
// import BlankView from '@/layouts/BlankView'
import TabsView from '@/layouts/TabsView'
import Login from '@/pages/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: Login
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        // {
        //   path: 'dashboard',
        //   name: 'Dashboard',
        //   meta: {
        //     icon: 'dashboard'
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: 'workplace',
        //       name: '工作台',
        //       component: () => import('@/pages/dashboard/workplace/WorkPlace'),
        //     },
        //     {
        //       path: 'analysis',
        //       name: '分析页',
        //       component: () => import('@/pages/dashboard/analysis/Analysis'),
        //     }
        //   ]
        // },
        // {
        //   path: 'form',
        //   name: '表单页',
        //   meta: {
        //     icon: 'form',
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'basic',
        //       name: '基础表单',
        //       component: () => import('@/pages/form/basic/BasicForm'),
        //     },
        //     {
        //       path: 'step',
        //       name: '分步表单',
        //       component: () => import('@/pages/form/step/StepForm'),
        //     },
        //     {
        //       path: 'advance',
        //       name: '高级表单',
        //       component: () => import('@/pages/form/advance/AdvancedForm'),
        //     }
        //   ]
        // },
        // {
        //   path: 'list',
        //   name: '列表页',
        //   meta: {
        //     icon: 'table'
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'query',
        //       name: '查询表格',
        //       component: () => import('@/pages/list/QueryList'),
        //     },
        //     {
        //       path: 'primary',
        //       name: '标准列表',
        //       component: () => import('@/pages/list/StandardList'),
        //     },
        //     {
        //       path: 'card',
        //       name: '卡片列表',
        //       component: () => import('@/pages/list/CardList'),
        //     },
        //     {
        //       path: 'search',
        //       name: '搜索列表',
        //       component: () => import('@/pages/list/search/SearchLayout'),
        //       children: [
        //         {
        //           path: 'article',
        //           name: '文章',
        //           component: () => import('@/pages/list/search/ArticleList'),
        //         },
        //         {
        //           path: 'application',
        //           name: '应用',
        //           component: () => import('@/pages/list/search/ApplicationList'),
        //         },
        //         {
        //           path: 'project',
        //           name: '项目',
        //           component: () => import('@/pages/list/search/ProjectList'),
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   path: 'details',
        //   name: '详情页',
        //   meta: {
        //     icon: 'profile'
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: 'basic',
        //       name: '基础详情页',
        //       component: () => import('@/pages/detail/BasicDetail')
        //     },
        //     {
        //       path: 'advance',
        //       name: '高级详情页',
        //       component: () => import('@/pages/detail/AdvancedDetail')
        //     }
        //   ]
        // },
        //部门模块
        {
          path: 'department',
          name: '部门管理',
          meta: {
            requireAuth: true
          },
          component: PageView,
          children: [
            {
              path: 'department',
              name: '部门列表',
              meta: {
                requireAuth: true
              },
              component: () => import('@/pages/department/departments')
            },
            {
              path: 'departmentMembers',
              name: '部门成员',
              meta: {
                requireAuth: true
              },
              component: () => import('@/pages/department/departmentMembers')
            }
          ]
        },
        //考核模块
        {
          path: 'assessment',
          name: '考核管理',
          meta: {
            requireAuth: true
          },
          component: PageView,
          children: [
            {
              path: 'list',
              name: '考核列表',
              meta: {
                requireAuth: true
              },
              component: () => import('@/pages/assessManagement/assessment')
            },
            {
              path: 'personalAssess',
              name: '个人绩效查询',
              meta: {
                requireAuth: true
              },
              component: () => import('@/pages/assessManagement/personalAssess')
            }
          ]
        },
        //案件模块
        {
          path: 'case',
          name: '案件管理',
          meta: {
            requireAuth: true
          },
          component: PageView,
          children: [
            {
              path: 'list',
              name: '案件列表',
              meta: {
                requireAuth: true
              },
              component: () => import('@/pages/case/caseList')
            }
          ]
        },
        //个人模块
        {
          path: 'personal',
          name: '个人详情',
          meta: {
            requireAuth: true
          },
          // component: PageView,
          component: () => import('@/pages/personal/personalInfo')
        },
        //新闻模块
        {
          path: 'news',
          name: '公安新闻',
          meta: {
            requireAuth: true
          },
          // component: PageView,
          component: () => import('@/pages/News/newsList')
        },
      ]
    }
  ]
})
