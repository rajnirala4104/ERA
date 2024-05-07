import React, { Fragment } from 'react'

const SearchNavbarBtn: React.FC = () => {
    return (
        <Fragment>
            <div className=''>
                <div className="searchInput">
                    <input type="text" className='text-[1.1rem] shadow-lg text-gray-600 outline-none rounded-md px-2 py-1' placeholder='Search..' />
                </div>
            </div>
        </Fragment>
    )
}

export default SearchNavbarBtn;
