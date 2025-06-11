import React from "react";

import { Dashboard, Lounge, Updates, UserList, Wallet ,AdminList,Roles,
RolesForm,
Permissions,
PermissionsForm,
PaymentTypes,
PaymentTypesForm,
AddOns,AddOnsForm,CouponCodes,CouponCodesForm,
ProductCategoreisForm,
ProductCategoreis,
ProductLevels,
ProductTypes,
ProductLevelsForm,
ProductTypesForm,Products,ProductsForm,UploadFiles} from "../pages";
const baseUrl=process.env.REACT_APP_BASE_URL ||'/admin/'

const RouteArr = [

  //dashboard
  {
    path: `${baseUrl}`,
    element: <Dashboard />,
  },
    //admin list
  {
    path: `${baseUrl}admin-list`,
    element: <AdminList />,
  },

  
    {
    path: `${baseUrl}roles`,
    element: <Roles />,
  },
        //admin list
  {
    path: `${baseUrl}add-role`,
    element: <RolesForm />,
  },

      //admin list
  {
    path: `${baseUrl}edit-role/:id`,
    element: <RolesForm />,
  },


    {
    path: `${baseUrl}permissions`,
    element: <Permissions />,
  },
        //admin list
  {
    path: `${baseUrl}add-permission`,
    element: <PermissionsForm />,
  },

      //admin list
  {
    path: `${baseUrl}edit-permission/:id`,
    element: <PermissionsForm />,
  },

      {
    path: `${baseUrl}payment-types`,
    element: <PaymentTypes />,
  },
        //admin list
  {
    path: `${baseUrl}add-payment-type`,
    element: <PaymentTypesForm />,
  },

      //admin list
  {
    path: `${baseUrl}edit-payment-type/:id`,
    element: <PaymentTypesForm />,
  },



        {
    path: `${baseUrl}add-ons`,
    element: <AddOns />,
  },
        //admin list
  {
    path: `${baseUrl}add-add-ons`,
    element: <AddOnsForm />,
  },

      //admin list
  {
    path: `${baseUrl}edit-add-ons/:id`,
    element: <AddOnsForm />,
  },


        {
    path: `${baseUrl}coupon-codes`,
    element: <CouponCodes />,
  },
        //admin list
  {
    path: `${baseUrl}add-coupon-codes`,
    element: <CouponCodesForm />,
  },

      //admin list
  {
    path: `${baseUrl}edit-coupon-codes/:id`,
    element: <CouponCodesForm />,
  },


  //lounge
  {
    path: `${baseUrl}lounge`,
    element: <Lounge />,
  },
  // user list 
  {
    path: `${baseUrl}users`,
    element: <UserList />,
  },
  // wallet 
  {
    path: `${baseUrl}wallet`,
    element: <Wallet />,
  },

   // Updates 
   {
    path: `${baseUrl}updates`,
    element: <Updates />,
  },

   // Category 
   {
    path: `${baseUrl}product-categories`,
    element: <ProductCategoreis />,
  },
     // Category 
   {
    path: `${baseUrl}add-product-categories`,
    element: <ProductCategoreisForm />,
  },
       // Category 
   {
    path: `${baseUrl}edit-product-categories/:id`,
    element: <ProductCategoreisForm />,
  },


     // Category 
   {
    path: `${baseUrl}product-levels`,
    element: <ProductLevels />,
  },
     // Category 
   {
    path: `${baseUrl}add-product-levels`,
    element: <ProductLevelsForm />,
  },
       // Category 
   {
    path: `${baseUrl}edit-product-levels/:id`,
    element: <ProductLevelsForm />,
  },



     // Category 
   {
    path: `${baseUrl}product-types`,
    element: <ProductTypes/>,
  },
     // Category 
   {
    path: `${baseUrl}add-product-types`,
    element: <ProductTypesForm />,
  },
       // Category 
   {
    path: `${baseUrl}edit-product-types/:id`,
    element: <ProductTypesForm />,
  },

       // Category 
   {
    path: `${baseUrl}products`,
    element: <Products/>,
  },
     // Category 
   {
    path: `${baseUrl}add-products`,
    element: <ProductsForm />,
  },
       // Category 
   {
    path: `${baseUrl}edit-products/:id`,
    element: <ProductsForm />,
  },
  {
     path: `${baseUrl}upload-files`,
    element: <UploadFiles />,
    
  }

];
export default RouteArr;
