import React, { useEffect, useState } from 'react'
import DashboardHeader from '../dasboardheader'
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';

const PaymentTypes = () => {
    const { fetchData } = useApiRequest()
    const navigate = useNavigate()
    const [list, setList] = useState([])

    useEffect(() => {
        callApi()
    }, [])

    const callApi = async () => {
        try {
            const tradeRes = await fetchData(API_ENDPOINTS.getPaymentTypes, navigate, "GET", {});
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
            key: "symbol",
            text: "Symbol",
            sortable: true,
        },
        {
            key: "icon",
            text: "icon",
        },
                        {
            key: "image",
            text: "Image",
            sortable: true,
        },
        {
            key: "primary_color",
            text: "Primary Color",
        },
                       {
            key: "secondary_color",
            text: "Secondary Color",
            sortable: true,
        },
         {
            key: "fees",
            text: "Fees",
        },
        {
            key: "status",
            text: "Status",
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
            key: "created_by",
            text: "Created By",
        },
        {
            key: "updated_by",
            text: "Updated by",
        },
        {
            text: 'Actions',
            cell: (item) => (
                <button onClick={() => navigate(`${process.env.REACT_APP_BASE_URL}edit-payment-type/${item.id}`)}>Edit</button>
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
            <DashboardHeader heading="Permissions" />
            <div className='main'>
                <div className='d-flex justify-content-end mb-3'>
                    <button className='btn btn-primary' onClick={() => navigate(`${process.env.REACT_APP_BASE_URL}add-payment-type`)}>Add Payment Type</button>
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

export default PaymentTypes
