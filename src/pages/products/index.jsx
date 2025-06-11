import React, { useEffect, useState } from 'react'
import DashboardHeader from '../dasboardheader'
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';

const Products = () => {
    const { fetchData } = useApiRequest()
    const navigate = useNavigate()
    const [list, setList] = useState([])

    useEffect(() => {
        callApi()
    }, [])

    const callApi = async () => {
        try {
            const tradeRes = await fetchData(API_ENDPOINTS.getProduct, navigate, "GET", {});
            if (tradeRes?.success) {
                setList(tradeRes?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            text: "S. No.",
            cell: (item, row) => (<>{row + 1}</>)
        },
        {
            key: "name",
            text: "Name",
            sortable: true,
        },
        {
            key: "description",
            text: "Description",
        },
        {
            key: "overview",
            text: "Overview",
        },
        {
            key: "category_name",
            text: "Category",
        },
                {
            key: "type_name",
            text: "Type",
        },
                {
            key: "level_name",
            text: "Level",
        },
        {
            key: "discount_percentage",
            text: "Discount percentage",
        },
        {
            key: "price",
            text: "Price",
        },
        {
            key: "primary_color",
            text: "primary Color",
        },
        {
            key: "secondary_color",
            text: "Secondary Color",
        },
        {
            key: "preview_image",
            text: "Preview Image",
        },
        {
            key: "main_image",
            text: "Main Image",
        },
        {
            key: "preview_link",
            text: "preview Link",
        },
        {
            key: "link",
            text: "Main Link",
        },
        {
            key: "show_language",
            text: "Show Language",
        },
{
            key: "format",
            text: "Formate",
        },

        {
            key: "instructor_type",
            text: "Instructor Type",
        },
        {
            text: 'Instructor',
            cell: (item) => {
                return (<>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                        {item?.instructor?.length > 0 ? (
                            item.instructor.map((instructor, idx) => (
                                <li key={idx}>{instructor}</li>
                            ))
                        ) : (
                            <li>-</li>
                        )}
                    </ul></>)
            }
        }, 
         {
            text: 'Includes',
            cell: (item) => {
                return (<>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                        {item?.includes?.length > 0 ? (
                            item.includes.map((includes, idx) => (
                                <li key={idx}>{includes}</li>
                            ))
                        ) : (
                            <li>-</li>
                        )}
                    </ul></>)
            }
        }, 
         {
            text: 'Keywords',
            cell: (item) => {
                return (<>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                        {item?.keywords?.length > 0 ? (
                            item.keywords.map((keywords, idx) => (
                                <li key={idx}>{keywords}</li>
                            ))
                        ) : (
                            <li>-</li>
                        )}
                    </ul></>)
            }
        }, 
         {
            text: 'Languages',
            cell: (item) => {
                return (<>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                        {item?.languages?.length > 0 ? (
                            item.languages.map((languages, idx) => (
                                <li key={idx}>{languages}</li>
                            ))
                        ) : (
                            <li>-</li>
                        )}
                    </ul></>)
            }
        },
        {
            key: "created_by",
            text: "Created By",
        },
        {
            key: "updated_by",
            text: "Updated By",
        },
        {
            key: "created_at",
            text: "Created At",
        },
        {
            key: "updated_at",
            text: "Updated At",
        },

        {
            text: 'Actions',
            cell: (item) => (
                <button onClick={() => navigate(`${process.env.REACT_APP_BASE_URL}edit-products/${item.id}`)}>Edit</button>
            )
        },
    ]

    const configForTable = {
        page_size: 10,
        length_menu: [10, 20, 50],
        show_filter: true,
        show_pagination: true,
        pagination: "advance",
        button: {
            excel: true,
            print: false,
        },
    };

    return (
        <>
            <DashboardHeader heading="Products" />
            <div className='main'>
                <div className='d-flex justify-content-end mb-3'>
                    <button className='btn btn-primary' onClick={() => navigate(`${process.env.REACT_APP_BASE_URL}add-products`)}>Add Product</button>
                </div>
                <div className='customer-table'>
                    <div className='data-table-wrapped'>
                        <div className='data-table-container'>
                            <ReactDatatable
                                columns={columns}
                                records={list}
                                config={configForTable}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
