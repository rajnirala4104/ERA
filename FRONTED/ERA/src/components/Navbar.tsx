import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { user } from '../interfaces';
import { LoaderSpinner, SearchNavbarBtn } from '.';
import { StoriesIcon } from '.';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [user, setUser] = useState<user[]>();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo") as string);
        setUser([user]);
    }, []);


    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div className="sticky bg-[#18eeb8] top-0 shadow-md px-10 h-[4.5rem] flex justify-between items-center ">
                    <div className="userIcon  cursor-pointer lg:p-2">
                        {user?.map((singleObject) => (
                            <Link to={`/user-profile/${singleObject._id}`} className="flex justify-center items-center" key={singleObject._id}>
                                <img
                                    className="rounded-full w-[3rem] h-[3rem] object-cover"
                                    src={singleObject.profilePic}
                                    alt="asdf"
                                />
                                <span className="mx-2 text-xl">
                                    {singleObject.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div className="hidden stories lg:flex justify-center items-center">
                        <StoriesIcon />
                        <StoriesIcon />
                        <StoriesIcon />
                        <StoriesIcon />
                    </div>
                    <div className="searchBtn">
                        <SearchNavbarBtn />
                    </div>
                </div>
            </Suspense>
        </Fragment>
    )
}

export default Navbar;