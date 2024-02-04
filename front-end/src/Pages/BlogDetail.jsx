import React, { useEffect, useState } from 'react'
import beach from '../Components/Assets/beach.jpg';
import authorImg from '../Components/Assets/17.jpg';
import {MdDateRange} from 'react-icons/md';
import RelatedList from '../Components/Related/RelatedList';
import SectionTitle from '../Components/SectionTitle';
import {AiFillLike, AiOutlineSend} from 'react-icons/ai';
import {BiSolidComment} from 'react-icons/bi';
import CommentList from '../Components/Comments/CommentList';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function BlogDetail() {
    const navigate = useNavigate();
    const [data,setData] = useState("");
    const [subscribe,setSubscribe] = useState(false);   
    const [comment,setComment] = useState("");
    const [commentList, setCommentList] = useState(false);
    const [like,setLike] = useState(false);
    let [likeCount,setLikeCount] = useState(0);
    const {id} = useParams();

    useEffect(()=>{
        setLike(false);
        console.log("id from para",id);
        if(/\d/. test(id)) fetchPostData(id);
    },[id])

    async function fetchPostData(id){
        axios.get(`http://localhost:5000/api/blogs/blog/${id}`)
        .then((response)=>{;
            fetchAuthorData(response.data.author.author_id)  
            .then(response=>{
                response.data !== null ? setSubscribe(true) : setSubscribe(false)
            })
            fetchLikesData(response.data._id)
            .then(response=>{
                if(response.data !== null || response.data !== ''){
                    response.data.likes.forEach(like => {
                        if(like === localStorage.getItem("user_id")){
                            setLike(true);
                        }else{
                            setLike(false);
                        }
                    });
                }
            })
            setLikeCount(response.data.likes.length);
            setData(response.data)
        })
        .catch(err=>console.error(err));
    }

    async function fetchAuthorData(authorId){
        console.log(authorId);
        try{
            const response = await axios.get('http://localhost:5000/api/subscribes',{
                params: {
                    userId: localStorage.getItem("user_id"),
                    authorId: authorId,
                }
            });
            console.log(response);
            return response;
        }
        catch(error){
            console.error("Error", error);
        }
    }

    async function fetchLikesData(postId){
        try{
            const response = await axios.get(`http://localhost:5000/api/likes`,{
                    params : {
                        userId: localStorage.getItem("user_id"),
                        postId: postId,
                    }
            });
            return response;
        }
        catch(err){
            console.error(err);
        }
    }



    const handleComment = () => {
        if(commentList){
            setCommentList(false);
        }else{
            setCommentList(true);
        }
    }

    const handleLike = () => {
        if(like){
            axios.delete('http://localhost:5000/api/likes',{
                    data : {
                        postId: data._id,
                        userId: localStorage.getItem("user_id"),
                    }
                })
            .then(response=>
                {
                    if(response.status === 200){
                        fetchPostData();
                        setLike(false);
                        setLikeCount(likeCount--);
                    }
                })
            .catch(err=>console.error(err))
        }else{
            axios.post('http://localhost:5000/api/likes',{
                    postId: data._id,
                    userId: localStorage.getItem("user_id"),
            })
            .then(response=>{
                if(response.status === 200) {
                    fetchPostData();
                    setLike(true);
                setLikeCount(likeCount++);}
            })
            .catch(err=>console.error(err))            
        }
        
    }

    const commentSubmit = () =>{
        if(localStorage.getItem('user_id')){
            axios.post('http://localhost:5000/api/comments',{
                userId: localStorage.getItem('user_id'),
                postId: data._id,
                description: comment,
            })
            .then(response=>{
                if(response.status === 200){
                    setComment("");
                    fetchPostData();
                }
            })
            .catch(err=>console.error(err))
        }
    }

    const subscribeHandle = () => {
        if(localStorage.getItem("user_id")){
            if(!subscribe){
                axios.post('http://localhost:5000/api/subscribes',
                    {
                        userId: localStorage.getItem("user_id"),
                        authorId: data.author.author_id,
                    })
                .then(response=>{
                    if(response.status === 200){
                        setSubscribe(true);
                    }
                })
                .catch(err=>console.log(err))
            }else{
                setSubscribe(false);
                axios.delete('http://localhost:5000/api/subscribes',{
                    data: {
                        userId: localStorage.getItem("user_id"),
                        authorId: data.author.author_id,
                    }
                })
                .then(response=>{
                    if(response.data.acknowledge){
                        setSubscribe(false);
                    }
                })
                .catch(err=>console.log(err))
            }
        }else{
            navigate('/login');
        }
    }


    return (
        <div>
            {data ? 
                <div className='lg:px-20'>
                <h1 className='text-center text-3xl font-bold py-3'>{data.title}</h1>
                <div className='overflow-hidden' style={{height: "50vh"}}>
                    <img src={ data.image ? data.image : beach} alt="" className='mx-auto  h-100 object-cover'/>
                </div>
                <div className='flex items-center justify-between my-2'>
                    <div className='flex items-start mb-2'>
                        <img src={authorImg} className='w-10 rounded-full object-cover' alt="" />
                        <div>
                            <p className='ps-2 text-md font-bold'>{data.author.name}</p>
                            <p className='ps-2 italic font-bold text-gray-400 text-xs'>Work</p>
                        </div>
                        <div>
                            <button className={`${subscribe ? "bg-red-300" : "bg-gray-300"} px-2 py-1 self-center rounded-full mt-2 hover:shadow-md transition-shadow duration-300 ms-3`} onClick={subscribeHandle}>Subscribe</button>
                            {/* <button className={`${subscribe ? "bg-red-300" : "bg-gray-300"} px-2 py-1 self-center rounded-full mt-2 hover:shadow-md transition-shadow duration-300 ms-3`} onClick={subscribeHandle}>Subscribe</button> */}
                        </div>
                    </div>
                    <div className=''>
                        <span className='font-bold flex items-center text-green-600'><MdDateRange size={20}/> 12-Sep-2023</span>
                    </div>
                </div><hr />
                <p className='py-4 px-4'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi in natus esse quam pariatur cupiditate dolorem deserunt libero quisquam cum laborum officia, perferendis quis eos voluptatem molestiae delectus architecto aliquid?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi in natus esse quam pariatur cupiditate dolorem deserunt libero quisquam cum laborum officia, perferendis quis eos voluptatem molestiae delectus architecto aliquid?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi in natus esse quam pariatur cupiditate dolorem deserunt libero quisquam cum laborum officia, perferendis quis eos voluptatem molestiae delectus architecto aliquid?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi in natus esse quam pariatur cupiditate dolorem deserunt libero quisquam cum laborum officia, perferendis quis eos voluptatem molestiae delectus architecto aliquid?
                    <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi in natus esse quam pariatur cupiditate dolorem deserunt libero quisquam cum laborum officia, perferendis quis eos voluptatem molestiae delectus architecto aliquid?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi in natus esse quam pariatur cupiditate dolorem deserunt libero quisquam cum laborum officia, perferendis quis eos voluptatem molestiae delectus architecto aliquid?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi in natus esse quam pariatur cupiditate dolorem deserunt libero quisquam cum laborum officia, perferendis quis eos voluptatem molestiae delectus architecto aliquid?
                </p>
                <hr />
                <div className='my-1 text-end'>
                    <button className='border-1 px-2 py-1 me-2' onClick={handleLike}><AiFillLike size={20} color={like ? 'blue' : ''} /></button>
                    <button className='border-1 px-2 py-1 me-2' onClick={handleComment}><BiSolidComment size={20}/></button>
                    <p className='text-gray-500'>
                        <span className='px-1'>{data.likes.length > 0 ? data.likes.length === 1 ? `${likeCount}Like` : `${data.likes.length}Likes`: ''}</span>
                        <span className='px-1'>{data.comments.length > 0 ? data.comments.length === 1 ? `${data.comments.length}Comment` : `${data.comments.length}Comments`: ''}</span>
                    </p>
                </div> 
                <div className={commentList ? '' : 'hidden'}>
                    <div className='bg-gray-100 p-2'>
                        <div className='flex border-1 p-1 bg-white rounded-lg my-2 '>
                            <input type="text" onChange={(e)=>setComment(e.target.value)} className='w-full outline-none me-4' placeholder='Add a comment...' value={comment}/>
                            <AiOutlineSend size={25} className='cursor-pointer' onClick={commentSubmit}/>
                        </div>
                    </div>
                    <div>
                        {
                            // console.log(data.comments)
                            data.comments !== null ?
                            <CommentList data={data.comments} fetchPostData={fetchPostData} postId={data._id}/> : 
                            <p>There is no comment</p>
                        }
                    </div>
                </div>
                <div className='my-20'>
                    <SectionTitle title="Related Blogs"/>
                    <RelatedList category={data.category} />
                </div>  
            </div> : null    
        }
        </div>
    )
}

export default BlogDetail
