export const API_ENDPOINTS = {
    // auth
    login: '/login',
    getAdmin: '/get-admins',

    getRoles: '/role/get-roles',
    getPermissions: '/role/get-permissions',
    getRolePermisson: '/get-roles-permissions',
    createRole: '/role/create-role',
    updateRole: '/role/update-role',
    createPermisson: '/role/create-permission',
    updatePermission: '/role/update-permission',

    getPaymentTypes: '/payment-types',
    getPaymentType: '/payment-type',
    createPaymentType: '/payment-type',
    updatePaymentType: '/payment-type',

    getProductCategory: '/product-categories',
    createProductCategory: '/product-categories',
    updateProductCategory: '/product-categories',


    getProductTypes: '/product-types',
    createProductTypes: '/product-types',
    updateProductTypes: '/product-types',

    getProductLevel: '/product-levels',
    createProductLevel: '/product-levels',
    updateProductLevel: '/product-levels',

        getProduct: '/products',
    createProduct: '/products',
    updateProduct: '/products',

    getAddOns: '/add-ons',
    createAddOns: '/add-ons',
    updateAddOns: '/add-ons',

    getCouponCodes: '/coupon-code',
    createCouponCodes: '/coupon-code',
    updateCouponCodes: '/coupon-code',

    getUsers: '/users',
    updateUser: '/user',

    uploadFile:"/uploadFiles",


    send_resetOtp: '/forgotpasword',
    verify_resetOtp: '/verifyotp',
    resetPassword: '/reset-password',
    countries: '/countries',
    professions: '/professions',
    profile_get: "/profile",
    profile_update: "/profile",
    instantFunding: "/plan?id=&tableName=instant_funding_plans",
    twoPhase: "/plan?id=&tableName=two_phases_plans",
    paymentMethods: "/payment/methods",
    addOns: "/payment/add-ons",
    checkout: "/payment/create-checkout-session",
    updateStatus: "/payment/update-session-status",
    couponCode: "/payment/apply-coupon-code",
    getProfile: "/profile",
    updateProfile: "/profile",
    changePassowrd: "/profile/change-password",
    forgotPassword: "/forgot-password",
    verifyEmail: "/verify-email",
    currencies: "/payment/crypto-currencies?status=active",
}