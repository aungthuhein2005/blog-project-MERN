import React, { useEffect, useState } from 'react'
import SectionTitle from '../SectionTitle'
import ItemList from '../ItemList'
import axios from 'axios';


function Latest() {

    const [data, setData] = useState("");

    useEffect(()=>{
        axios.get('http://localhost:5000/api/blogs/latest/3')
        .then(response=> setData(response.data));
    },[])

    return (
        <div className='my-12 lg:px-20'>
            <SectionTitle title="Latest blog"/>
            <ItemList data={data}/>
        </div>
    )
}

export default Latest
