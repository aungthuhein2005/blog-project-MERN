import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios';
import Alert from '../UI/Alert';


// import 'react-rich-text-editor';

function Posts() {
    const userId = localStorage.getItem('user_id');
    const [content,setContent] = useState('');
    const [posted,setPosted] =useState(false);

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image'],
          ['clean'],
        ],
      };        
      
      function extractImgTags(htmlString) {
          const doc = new DOMParser().parseFromString(htmlString, 'text/html');
          const imgTags = doc.querySelector('img');
          // return Array.from(imgTags).map(imgTag => imgTag.outerHTML).join('');
          if(imgTags){
            return imgTags.src;
          }
        }

      const handlePost = async () =>{

        const toSend = {
          author : {
            author_id: userId,
          },
          category: "knowledge",
          date : new Date(),
          description: content,
          image: extractImgTags(content),
        }
        const response = await axios.post(`http://localhost:5000/api/blogs`,toSend,{
          headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${localStorage.getItem('jwtToken')}`,
          }
        })
        if(response.status === 200){
          setContent('');
          setPosted(true);
          setTimeout(()=>{
            setPosted(false)
          },5000)
        }
      }

      const handleChange = (value) =>{
        setContent(value);
      }

    return (
        <div className='px-12 relative'>
            {
              posted ? <Alert bg="green" color="white" text="Created Successfully" status="success"/> : null
            }
            <ReactQuill modules={modules} value={content} onChange={handleChange} className='bg-red-050'/>
            <button className='bg-blue-600 py-1 px-3 text-white rounded-sm my-2' onClick={handlePost} >Post</button>
        </div>
    )
}

export default Posts
