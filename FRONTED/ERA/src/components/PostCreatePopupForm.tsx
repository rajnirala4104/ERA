import React, { Fragment, Suspense, useContext, useState } from 'react'
import { LoaderSpinner } from './LoaderSpinner'
import { PostCreatePopupContext } from '../contaxt'
import { CloseIcon } from '../icons'
import { createPostApiCall } from '../api/services/postApiServices'
import { createThoghtPostApiCall } from '../api/services/thoughtPostServices'
import { postInterface } from '../interfaces'

const PostCreatePopupForm: React.FC = () => {

    const { postCreatePopupOnOff, setPostCreatePopupOnOff } = useContext(PostCreatePopupContext)

    const [postImage, setPostImage] = useState<string>()
    const [thoughtPostForm, setThoughtPostForm] = useState<boolean>(false)
    const [allPostsAndThoughtPosts, setAllPostsAndThoughtPosts] = useState<postInterface[]>()

    const postDetails = (pics: React.ChangeEvent<HTMLInputElement>) => {
        const fileObject = pics.target.files![0];
        if (fileObject === undefined) {
            alert("Oops!! image error");
            return;
        }
        if (fileObject.type === "image/jpeg" || fileObject.type === "image/png") {
            const data = new FormData();
            data.append('file', fileObject);
            data.append('upload_preset', 'ERA_910');
            data.append("cloud_name", "eracloud");

            fetch('https://api.cloudinary.com/v1_1/eracloud/image/upload', {
                method: "POST",
                body: data
            }).then((res) => res.json()).then((data) => {
                setPostImage(data.url.toString());
            })
        }
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formObject = Object.fromEntries(formData.entries());
        const loggedUser = JSON.parse(localStorage.getItem('userInfo') as string);

        const finalDataObject = {
            content: postImage,
            caption: formObject.caption as string
        }
        const response = await createPostApiCall(finalDataObject, loggedUser?.token as string);
        setAllPostsAndThoughtPosts(response.data.data)
        window.location.reload()
    }

    const ThoughtPostSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formObject = Object.fromEntries(formData.entries());
        const loggedUser = JSON.parse(localStorage.getItem('userInfo') as string);

        const finalDataObject = {
            user: loggedUser._id as string,
            thought: formObject.thought as string,
        }
        const response = await createThoghtPostApiCall(finalDataObject, loggedUser.token)
        setAllPostsAndThoughtPosts(el => [...el!, response.data.data])
        window.location.reload()
    }


    return (
        <Fragment>
            <Suspense fallback={<LoaderSpinner />}>
                <section
                    style={{ background: 'rgba(106,106,106,0.40)' }}
                    className='w-full h-screen flex justify-center items-center backdrop-blur-md absolute top-0 bg-black z-10'
                >
                    <div className='flex flex-col w-[60%] h-[80%] justify-center relative items-center bg-white rounded-md'>
                        <span onClick={() => setPostCreatePopupOnOff(!postCreatePopupOnOff)} className='text-gray-700 transition duration-200 hover:text-black text-2xl absolute top-[3%] right-[2%] cursor-pointer'>{<CloseIcon classess='' />}</span>

                        <div className='my-4'>
                            <span className='font-semibold text-2xl'>{thoughtPostForm ? "Add Post" : "Add Thougth Post"}</span>
                        </div>
                        <div className='my-2 flex flex-col justify-start items-center w-full h-full'>
                            <div className={`${thoughtPostForm ? "" : "hidden"} my-5  w-[70%]`}>
                                <form
                                    onKeyDown={(e) => (e.key === "Enter" ? submitHandler : "")}
                                    onSubmit={(e) => submitHandler(e)}
                                    className='flex flex-col justify-center items-center'>
                                    <div className="file">
                                        <input onChange={(e) => postDetails(e)} name='postImage' placeholder='Enter File' type="file" id='postImage' className='' />
                                    </div>
                                    <div className='captin my-2'>
                                        <textarea rows={5} cols={60} name='caption' className='border border-black p-2 rounded-md ' placeholder='Caption..' />
                                    </div>
                                    <div className="btn my-4 flex flex-col justify-center items-center">
                                        <button
                                            type="submit"
                                            className="text-[20px] text-center cursor-pointer mx-2 w-[100%] bg-black hover:bg-gray-800 dark:text-white px-2 py-2 rounded-md"
                                        >
                                            Create Post
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className={` ${thoughtPostForm ? "hidden" : ""} my-5  w-[70%] `}>
                                <form
                                    onKeyDown={(e) => (e.key === "Enter" ? ThoughtPostSubmitHandler : "")}
                                    onSubmit={(e) => ThoughtPostSubmitHandler(e)}
                                    className='flex flex-col justify-center items-center'>
                                    <div className='captin my-2'>
                                        <textarea rows={5} cols={60} name='thought' className='border border-black p-2 rounded-md ' placeholder='Enter you Thouht..' />
                                    </div>
                                    <div className="btn my-4 flex flex-col justify-center items-center">
                                        <button
                                            type="submit"
                                            className="text-[20px] text-center cursor-pointer mx-2 w-[100%] bg-black hover:bg-gray-800 dark:text-white px-2 py-2 rounded-md"
                                        >
                                            Share Thought
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className='my-2'>
                                <span onClick={() => setThoughtPostForm(!thoughtPostForm)} className='underline text-blue-500 cursor-pointer text-center'>{thoughtPostForm ? "ThoughtPost" : "Post"}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </Suspense>
        </Fragment>
    )
}

export default PostCreatePopupForm