import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const AppTable = Loadable(lazy(() => import('./tables/AppTable')))
// const AppForm = Loadable(lazy(() => import('./forms/AppForm')))
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')))
// const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')))
// const AppProgress = Loadable(lazy(() => import('./AppProgress')))
// const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')))
// const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')))
// const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')))
// const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')))
// const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')))
// const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')))
// const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')))
const AdminTable = Loadable(
    lazy(() => import('./adminList/Apptable/AppTableAdminList'))
)
const AdminList = Loadable(
    lazy(() => import('./adminList/AdminList/AppAdminList'))
)
const UpdateAdminList = Loadable(
    lazy(() => import('./adminList/UpdateAdminList/AppUpdateAdminList'))
)
const Faq = Loadable(lazy(() => import('./faq/faqs/AppFaq')))
const UpdateFaq = Loadable(lazy(() => import('./faq/UpdateFaq/AppUpdateFaq')))
const UserData = Loadable(lazy(() => import('./faq/AppFaq/AppDatatable')))
const News = Loadable(lazy(() => import('./News/News/AppNews')))
const TableNews = Loadable(lazy(() => import('./News/Apptable/AppTableNews')))
const UpdateNews = Loadable(
    lazy(() => import('./News/updateNews/AppUpdateNews'))
)
const TableTestinomial = Loadable(
    lazy(() => import('./Testinomials/AppTable/AppTableTestinomial'))
)
const Testinomial = Loadable(
    lazy(() => import('./Testinomials/Testinomial/AppTestinomial'))
)
const UpdateTestinomial = Loadable(
    lazy(() => import('./Testinomials/updateTestinomial/AppUpdateTestinomial'))
)
const TabelCategory = Loadable(
    lazy(() => import('./image-category/AppCategory/AppTableCategory'))
)
const ImageCategory = Loadable(
    lazy(() => import('./image-category/imageCategoty/AppImageCategory'))
)
const UpdateCategory = Loadable(
    lazy(() => import('./image-category/updateCategory/AppUpdateCategory'))
)
const TableGallery = Loadable(
    lazy(() => import('./image-gallery/AppGallery/AppTableGallery'))
)
const ImageGallery = Loadable(
    lazy(() => import('./image-gallery/imageGallery/AppImageGallery'))
)
const UpdateGallery = Loadable(
    lazy(() => import('./image-gallery/updateGallery/AppUpdateGallery'))
)
const TableMember = Loadable(
    lazy(() => import('./Members/AppMember/AppTableMember'))
)
const Member = Loadable(lazy(() => import('./Members/Member/AppMember')))

const TableModelPopUp = Loadable(
    lazy(() => import('./modelpopup/AppModelPopUp/AppTablePopUp'))
)
const ModelPopUp = Loadable(
    lazy(() => import('./modelpopup/modelpopup/AppModelPopUp'))
)
const UpdatePopUp = Loadable(
    lazy(() => import('./modelpopup/Updatemodelpopup/AppUpdateModelPopUp'))
)
const Analytics = Loadable(
    lazy(() => import('../../views/dashboard/Analytics'))
)
// const AppAutoComplete = Loadable(
//     lazy(() => import('./auto-complete/AppAutoComplete'))
// )
// const AppExpansionPanel = Loadable(
//     lazy(() => import('./expansion-panel/AppExpansionPanel'))
// )

const adminrole = cookies.get('adminrole')

const role = cookies.get('role')

if (include(role, 'SUBADMIN')) {
    var admin = <Analytics />
} else {
    var admin = <AdminTable />
    var user = <TableMember />
}

const accessToken = cookies.get('accessToken')

function include(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == obj) return true
    }
}

if (accessToken) {
    if (include(adminrole, 'FAQ')) {
        var faq = <UserData />
    } else {
        var faq = <Analytics />
    }

    if (include(adminrole, 'NEWS')) {
        var news = <TableNews />
    } else {
        var news = <Analytics />
    }

    if (include(adminrole, 'Testinomial')) {
        var testinomial = <TableTestinomial />
    } else {
        var testinomial = <Analytics />
    }

    if (include(adminrole, 'Image Category')) {
        var imageCategory = <TabelCategory />
    } else {
        var imageCategory = <Analytics />
    }

    if (include(adminrole, 'Image Gallery')) {
        var imageGallery = <TableGallery />
    } else {
        var imageGallery = <Analytics />
    }

    if (include(adminrole, 'Model Popup')) {
        var modelPopUp = <TableModelPopUp />
    } else {
        var modelPopUp = <Analytics />
    }
}

const materialRoutes = [
    // <-------------------Admin------------------->

    {
        path: '/material/admindata',
        element: admin,
    },
    {
        path: '/material/adminlist',
        element: <AdminList />,
    },
    {
        path: '/material/editadminlist/:id',
        element: <UpdateAdminList />,
    },

    // <---------------------User List------------------------->

    {
        path: '/material/memberdata',
        element: user,
    },
    {
        path: '/material/member/:id',
        element: <Member />,
    },

    // <-----------------------model-popup------------------>
    {
        path: '/material/modelpopupdata',
        element: modelPopUp,
    },
    {
        path: '/material/modelpopup',
        element: <ModelPopUp />,
    },
    {
        path: '/material/editmodelpopup/:id',
        element: <UpdatePopUp />,
    },
    // <--------------------Faq-------------------------->
    {
        path: '/material/faq',
        element: <Faq />,
    },
    {
        path: '/material/faq/faqdetails/:id',
        element: <UpdateFaq />,
    },
    {
        path: '/material/faqdata',
        element: faq,
    },
    // <----------------------------News------------------------->

    {
        path: '/material/news',
        element: <News />,
    },
    {
        path: '/material/tablenews',
        element: news,
    },
    {
        path: '/material/updatenews/:id',
        element: <UpdateNews />,
    },
    {
        path: '/material/table',
        element: <AppTable />,
    },

    // <-------------Testinomial----------->
    {
        path: '/material/testinomialdata',
        element: testinomial,
    },
    {
        path: '/material/testinomial',
        element: <Testinomial />,
    },
    {
        path: '/material/updatetestinomial/:id',
        element: <UpdateTestinomial />,
    },

    // <-------------Image category----->

    {
        path: '/material/imagecategorydata',
        element: imageCategory,
    },
    {
        path: '/material/imagecategory',
        element: <ImageCategory />,
    },
    {
        path: '/material/editimagecategory/:id',
        element: <UpdateCategory />,
    },

    // <----------------Image Gallery---------->
    {
        path: '/material/imagegallerydata',
        element: imageGallery,
    },
    {
        path: '/material/imagegallery',
        element: <ImageGallery />,
    },
    {
        path: '/material/editimagegallery/:id',
        element: <UpdateGallery />,
    },

    // <----------------------------------------->
    // {
    //     path: '/material/form',
    //     element: <AppForm />,
    // },
    {
        path: '/material/buttons',
        element: <AppButton />,
    },
    // {
    //     path: '/material/icons',
    //     element: <AppIcon />,
    // },
    // {
    //     path: '/material/progress',
    //     element: <AppProgress />,
    // },
    // {
    //     path: '/material/menu',
    //     element: <AppMenu />,
    // },
    // {
    //     path: '/material/checkbox',
    //     element: <AppCheckbox />,
    // },
    // {
    //     path: '/material/switch',
    //     element: <AppSwitch />,
    // },
    // {
    //     path: '/material/radio',
    //     element: <AppRadio />,
    // },
    // {
    //     path: '/material/slider',
    //     element: <AppSlider />,
    // },
    // {
    //     path: '/material/autocomplete',
    //     element: <AppAutoComplete />,
    // },
    // {
    //     path: '/material/expansion-panel',
    //     element: <AppExpansionPanel />,
    // },
    // {
    //     path: '/material/dialog',
    //     element: <AppDialog />,
    // },
    // {
    //     path: '/material/snackbar',
    //     element: <AppSnackbar />,
    // },
]

export default materialRoutes
