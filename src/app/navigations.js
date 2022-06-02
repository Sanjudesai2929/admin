import Cookies from 'universal-cookie'
const cookies = new Cookies()

const adminrole = cookies.get('adminrole')

export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard/default',
        icon: 'dashboard',
    },
    // {
    //     label: 'PAGES',
    //     type: 'label',
    // },
    // {
    //     name: 'Session/Auth',
    //     icon: 'security',
    //     children: [
    //         {
    //             name: 'Sign in',
    //             iconText: 'SI',
    //             path: '/session/signin',
    //         },
    //         {
    //             name: 'Sign up',
    //             iconText: 'SU',
    //             path: '/session/signup',
    //         },
    //         {
    //             name: 'Forgot Password',
    //             iconText: 'FP',
    //             path: '/session/forgot-password',
    //         },
    //         {
    //             name: 'Error',
    //             iconText: '404',
    //             path: '/session/404',
    //         },
    //     ],
    // },
    {
        label: 'Components',
        type: 'label',
    },
    {
        name: 'Components',
        icon: 'favorite',
        badge: { value: '30+', color: 'secondary' },
        children: [
            {
                name: 'Admin List',
                path: '/material/admindata',
                iconText: 'U',
            },
            {
                name: 'User List',
                path: '/material/memberdata',
                iconText: 'U',
            },
            {
                name: 'FAQ',
                path: '/material/faqdata',
                iconText: 'F',
            },
            {
                name: 'NEWS',
                path: '/material/tablenews',
                iconText: 'A',
            },
            {
                name: 'Testinomial',
                path: '/material/testinomialdata',
                iconText: 'A',
            },
            {
                name: 'Image Category',
                path: '/material/imagecategorydata',
                iconText: 'A',
            },
            {
                name: 'Image Gallery',
                path: '/material/imagegallerydata',
                iconText: 'A',
            },
            {
                name: 'Model Popup',
                path: '/material/modelpopupdata',
                iconText: 'A',
            },
            // {
            //     name: 'Auto Complete',
            //     path: '/material/autocomplete',
            //     iconText: 'A',
            // },
            // {
            //     name: 'Buttons',
            //     path: '/material/buttons',
            //     iconText: 'B',
            // },
            // {
            //     name: 'Checkbox',
            //     path: '/material/checkbox',
            //     iconText: 'C',
            // },
            // {
            //     name: 'Dialog',
            //     path: '/material/dialog',
            //     iconText: 'D',
            // },
            // {
            //     name: 'Expansion Panel',
            //     path: '/material/expansion-panel',
            //     iconText: 'E',
            // },
            // {
            //     name: 'Form',
            //     path: '/material/form',
            //     iconText: 'F',
            // },

            // {
            //     name: 'Icons',
            //     path: '/material/icons',
            //     iconText: 'I',
            // },
            // {
            //     name: 'Menu',
            //     path: '/material/menu',
            //     iconText: 'M',
            // },
            // {
            //     name: 'Progress',
            //     path: '/material/progress',
            //     iconText: 'P',
            // },
            // {
            //     name: 'Radio',
            //     path: '/material/radio',
            //     iconText: 'R',
            // },
            // {
            //     name: 'Switch',
            //     path: '/material/switch',
            //     iconText: 'S',
            // },
            // {
            //     name: 'Slider',
            //     path: '/material/slider',
            //     iconText: 'S',
            // },
            // {
            //     name: 'Snackbar',
            //     path: '/material/snackbar',
            //     iconText: 'S',
            // },
            // {
            //     name: 'Table',
            //     path: '/material/table',
            //     iconText: 'T',
            // },
        ],
    },
    // {
    //     name: 'Charts',
    //     icon: 'trending_up',

    //     children: [
    //         {
    //             name: 'Echarts',
    //             path: '/charts/echarts',
    //             iconText: 'E',
    //         },
    //     ],
    // },
    // {
    //     name: 'Documentation',
    //     icon: 'launch',
    //     type: 'extLink',
    //     path: 'http://demos.ui-lib.com/matx-react-doc/',
    // },
]

const accessToken = cookies.get('accessToken')

const role = localStorage.getItem('role')
// const role = cookies.get('role')
// const role = ['SUBADMIN']

if (role == 'SUBADMIN') {
    delete navigations[2].children[0]
    delete navigations[2].children[1]
} else {
    // console.log('Admin')
}

function include(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == obj) return true
    }
}

if (accessToken) {
    if (include(adminrole, 'FAQ')) {
    } else {
        delete navigations[2].children[2]
    }

    if (include(adminrole, 'NEWS')) {
    } else {
        delete navigations[2].children[3]
    }
    if (include(adminrole, 'Testinomial')) {
    } else {
        delete navigations[2].children[4]
    }

    if (include(adminrole, 'Image Category')) {
    } else {
        delete navigations[2].children[5]
    }
    if (include(adminrole, 'Image Gallery')) {
    } else {
        delete navigations[2].children[6]
    }
    if (include(adminrole, 'Model Popup')) {
    } else {
        delete navigations[2].children[7]
    }
}
