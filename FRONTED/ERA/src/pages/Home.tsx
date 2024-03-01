import React, { Suspense, memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoaderSpinner } from '../components'
import { user } from '../interfaces'

export const Home = memo(() => {

    const navigator = useNavigate()
    const [user, setUser] = useState<user[]>()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo') as string);
        if (!user) navigator('/account');
        setUser([user])
    }, [])


    return (
        <React.Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <div>
                    {user?.map(singleObject => (<div>
                        <img className='rounded-full' src={singleObject.pic} alt="asdf" />
                        {singleObject.name}
                    </div>
                    ))}
                </div>
            </Suspense>
        </React.Fragment>
    )
})
