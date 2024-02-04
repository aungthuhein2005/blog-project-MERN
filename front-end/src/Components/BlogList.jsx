import React, { useEffect, useMemo, useState } from 'react'
import SectionTitle from '../Components/SectionTitle'
import ItemList from '../Components/ItemList'
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import axios from 'axios';
function BlogList() {

    const [data,setData] = useState("");

    const fetchBlogs = useMemo(()=>async ()=>{
        try {
            const response = await axios.get('http://localhost:5000/api/blogs/');
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    })

    useEffect(()=>{
        fetchBlogs();
    },[fetchBlogs])

    return (
        <div>
            <SectionTitle title="Blogs" />
            {data === '' ? 
                <ShimmerSimpleGallery  imageHeight={300} caption /> : <ItemList data={data} />
            }
        </div>
    )
}

export default BlogList
