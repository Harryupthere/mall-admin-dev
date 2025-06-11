import React, { useEffect, useState } from 'react'
import DashboardHeader from '../dasboardheader'
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';

const TradesList = () => {
    const { fetchData } = useApiRequest()
    const navigate = useNavigate()
    const [list, setList] = useState([])

    useEffect(() => {
        callApi()
    }, [])

    const callApi = async () => {
        try {
            const tradeRes = await fetchData(API_ENDPOINTS.getTrades, navigate, "GET", {});
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
            key: "symbol",
            text: "Symbol",
            sortable: true,
        },
        {
            key: "lot_size",
            text: "Lot Size",
        },
        {
            key: "stop_loss",
            text: "Stop Loss",
        },
        {
            key: "take_profit",
            text: "Take Profit",
        },
        {
            key: "pips",
            text: "Pips",
        },
        {
            key: "trade_date",
            text: "Trade Date",
        },
        {
            key: "trading_account_type_name",
            text: "Account Type",
        },
        {
            text: 'Actions',
            cell: (item) => (
                <button onClick={() => navigate(`${process.env.REACT_APP_BASE_URL}edit-trade/${item.id}`)}>Edit</button>
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
            <DashboardHeader heading="Trades" />
            <div className='main'>
                <div className='d-flex justify-content-end mb-3'>
                    <button className='btn btn-primary' onClick={() => navigate('/add-trade')}>Add Trade</button>
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

export default TradesList
