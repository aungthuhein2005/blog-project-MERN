import React, { useRef,useEffect} from 'react'
import beachImg from '../Assets/beach.jpg';
import {HiArrowRightCircle} from 'react-icons/hi2';
import {MdDateRange} from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';


function Item(props) {

    const iframeRef = useRef();

    const handleIframeLoad = () => {
        const iframeDocument = iframeRef.current.contentDocument;
    
        if (iframeDocument) {
            const head = iframeDocument.head;
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'; // Adjust the CDN URL as needed
            head.appendChild(link);
            
            const h1Element = iframeDocument.querySelector('h1');
          if (h1Element) {
            h1Element.classList.add(...['text-xl', 'font-bold']);
          }
        }
      };

    const date = new Date(props.date);
    const postClickHandle = () => {
        let accessTime = Cookies.get(`${props.id}`) || 0;
        if(accessTime !== 0){
            accessTime++;
        }else{
            accessTime = 1;
        }
        Cookies.set(`${props.id}`,accessTime);
    }

    return (
        <div className='shadow-sm rounded-sm overflow-hidden'>
            <img src={ props.image ? props.image : beachImg} alt="" className='w-full object-cover' style={{height: "250px"}}/>
            <div className='p-2'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-xl font-bold'>{props.title}</h1>
                    <span className='font-bold text-green-600 text-xs flex items-center'><MdDateRange size={18}/><span> {date.getDay()}-{date.getMonth()}-{date.getFullYear()}</span></span>
                </div>
                <p className=''>
                    {
                        props.description ?
                        <iframe srcDoc={`${props.description.slice(0,150)}`} className='w-full' onLoad={handleIframeLoad} frameBorder='0' src='' ref={iframeRef} ></iframe>
                        :
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda asperiores, consectetur excepturi cum labore qui distinctio dict'
                    }
                </p>
            <div className='float-end pb-2'>
                <Link to={`/blogs/${props.id}`} onClick={postClickHandle} className='bg-yellow-400 rounded-sm text-white p-1 shadow-sm d-flex items-center hover:bg-yellow-500 transition ease-in duration-300'>
                   <span className='mr-2 text-base'>Read More</span> <HiArrowRightCircle size={20}/>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default Item
