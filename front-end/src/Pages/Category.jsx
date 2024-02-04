import React, { useEffect, useState } from 'react'
import SectionTitle from '../Components/SectionTitle'
import ItemList from '../Components/ItemList'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Category() {
    const [data, setData] = useState('');
    const {category} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/blogs/categories/${category}`)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
    }, [category])

    return (
        <div className='min-h-screen'>
            <SectionTitle title={category} />
            {data.length === 0 ? <p className='text-lg text-center'>There is no blog</p> : (
                <div className='pb-12 lg:px-20'>
                    <ItemList data={data} />
                </div>)}
        </div>
    )


}

export default Category
