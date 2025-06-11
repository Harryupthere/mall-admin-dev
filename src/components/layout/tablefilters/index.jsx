import React, { useState } from 'react'
import { Icons } from '../../../utils/customFn'
import { SearchIcon } from '../../../icons/icons';
import './tablefilter.scss'
import FilterModal from '../../filtermodal';

const TableFilter = () => {
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false)
    }
    return (
        <div className='filter-wrapper'>
            <div className='filter-container'>
                <div className='left-side'>
                    <div className='select-date d-flex align-items-center gap-2'>
                        <p className='mb-0'>Select period</p>
                        <div className='input-main-data'>
                            <input type='date' />
                        </div>
                        to
                        <div className='input-main-data'>
                            <input type='date' />
                        </div>
                    </div>
                    <div className='filter-button'>
                        <button type='button' onClick={handleOpenModal}>
                            <span>Filter</span>
                            <img src={Icons['filtericon.svg']} alt='filter' />
                        </button>
                    </div>

                    <div className='reset'>
                        <button type='button'>Reset</button>
                    </div>
                </div>
                <div className='right-side'>
                    <div className='searchbox'>
                        <input type='text' placeholder='Search for a user' />
                        <span className='searchicon'>
                            <SearchIcon />
                        </span>
                    </div>
                </div>
            </div>
            <FilterModal openModal={openModal} closeModal={handleCloseModal} />
        </div>
    )
}

export default TableFilter;
