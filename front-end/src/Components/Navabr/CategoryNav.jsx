import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function CategoryNav(props) {

    const [data,setData] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:5000/api/blogs/categories')
        .then((response)=>{
            setData(response.data)
        }
        )
        .catch(err=>console.error(err))
    },[])

    const memoizeData = useMemo(()=>data,[data]);

    return (
        <div>
            <ul className='absolute z-50 p-3 left-3/4 top-3/4 bg-white border border-b shadow-lg m-2 rounded-md'>
                {
                    memoizeData !== "" ? data.map((element,i) => (
                        <div key={i}><li onClick={()=>props.dropdownHandle(false)} className='py-1 text-gray-500 uppercase' ><Link to={`/categories/${(element.name).toLowerCase()}`}>{element.name}</Link></li><hr /></div>
                    )) : null
                }
            </ul>
        </div>

    )
}

export default CategoryNav
