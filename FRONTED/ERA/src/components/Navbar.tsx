import React, { Fragment, useEffect, useState } from 'react'
import { user } from '../interfaces';
import { SearchNavbarBtn } from './SearchNavbarBtn';
import { StoriesIcon } from './StoriesIcon';

export const Navbar: React.FC = () => {
    const [user, setUser] = useState<user[]>();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo") as string);
        setUser([user]);
    }, []);
    return (
        <Fragment>
            <div className="sticky bg-[#18eeb8] top-0 shadow-md px-10 h-[4.5rem] flex justify-between items-center ">
                <div className="userIcon  cursor-pointer p-2">
                    {user?.map((singleObject) => (
                        <div className="flex justify-center items-center" key={singleObject._id}>
                            <img
                                className="rounded-full w-12"
                                src={singleObject.pic}
                                alt="asdf"
                            />
                            <span className="mx-2 text-xl">
                                {singleObject.name}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="stories flex justify-center items-center">
                    <StoriesIcon />
                    <StoriesIcon />
                    <StoriesIcon />
                    <StoriesIcon />
                </div>
                <div className="searchBtn">
                    <SearchNavbarBtn />
                </div>
            </div>
        </Fragment>
    )
}
