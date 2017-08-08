// header
Vue.component('admin-header', {
    template: '#admin-header',
    props: {
        title: [String],
        system_list: [Array],
        user_menus: [Array]
    },
    data: function () {
        return {
            search_text: ''
        }
    },
    methods: {
        //将事件提交给父组件
        sys_switch: function (sys) {
            this.title = sys.title;
            this.$emit('click_sys_switch', sys)
        },
        search: function () {
            this.$emit('click_search', this.search_text)
        }
    }
})
//main
Vue.component('admin-main', {
    template: '#admin-main',
    props: {
        user: [Object],
        user_menus: [Array],
        menus: [Array],
    },
    methods: {
        //将事件提交给父组件
        open_tab: function (title, url) {
            this.$emit('click_open_tab', title, url);
        }
    }
})

//sidebar
Vue.component('admin-sidebar', {
    template: '#admin-sidebar',
    props: {
        user: [Object],
        user_menus: [Array],
        menus: [Array]
    },
    methods: {
        //将事件提交给父组件
        open_tab: function (menu) {
            this.$emit('open_tab', menu.title, menu.url);
        }
    }
})

var data = {
    system_skin: 'skin-green',
    //header
    system_title: '权限管理系统',
    //system_list.name对应主题名称
    system_list: [
        {id: '1', skin: 'skin-green', title: '权限管理系统', icon: 'zmdi-shield-security'},
        {id: '2', skin: 'skin-dark-blue', title: '内容管理系统', icon: 'zmdi-wikipedia'},
        {id: '3', skin: 'skin-pink', title: '支付管理系统', icon: 'zmdi-paypal-alt'},
        {id: '4', skin: 'skin-purple', title: '用户管理系统', icon: 'zmdi-account'},
        {id: '5', skin: 'skin-blue', title: '存储管理系统', icon: 'zmdi-cloud'},
    ],
    //main
    user_menus: [
        {title: '个人资料', icon: 'zmdi-account', url: '', isOpenTab: true},
        {title: '隐私管理', icon: 'zmdi-face', url: '', isOpenTab: true},
        {title: '退出登录', icon: 'zmdi-run', url: 'logout', isOpenTab: false}
    ],
    user: {
        avater: 'app/img/avatar.jpg',
        name: 'bloom'
    },
    menus: [
        {title: '首页', icon: 'zmdi-home', url: 'home', isOpenTab: true},
        {
            title: '系统组织管理', icon: 'zmdi-accounts-list', children: [
            {title: '系统管理', icon: 'zmdi-account', url: 'crud.html', isOpenTab: true}
        ]
        },
        {
            title: ' 角色用户管理', icon: 'zmdi-accounts', children: [
            {title: '用户管理', icon: '', url: 'page/sys/user/table.html', isOpenTab: true},
            {title: '角色管理', icon: '', url: 'page/sys/role/table.html', isOpenTab: true}
        ]
        },
        {
            title: ' 权限资源管理', icon: 'zmdi-lock-outline', children: [
            {title: '权限管理', icon: '', url: 'page/sys/menu/menus.html', isOpenTab: true},
        ]
        },
        {
            title: '其他数据管理', icon: 'zmdi-more', children: [
            {title: '百度', icon: 'zmdi-lock-outline', url: 'https://www.baidu.com/', isOpenTab: true},
        ]
        }
    ]
}


var vue = new Vue({
    el: '#app',
    data: data,
    methods: {
        sys_switch: function (sys) {// 切换系统
            $.cookie('bloom-skin-name', sys.skin);
            $.cookie('bloom-system-title', sys.title);
            $.cookie('bloom-system-id', sys.id);
            this.system_title = sys.title;
            this.system_skin = sys.skin;
            $('title').text(sys.title);
        },
        search: function (q) {
            console.log(q);
        },
        open_tab: function (title, url) {
            console.log(title, url)
            Tab.addTab(title, url)
        }
    }
})