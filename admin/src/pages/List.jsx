import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      console.log("API Response:", response.data); // Log the entire response

      if (response.data.success) {
        setList(response.data.data); // Access the 'data' array
        console.log("Products set:", response.data.data); // Log the products
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error fetching products:", error.message);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
         try {
           const response = await axios.post(backendUrl + '/api/product/remove', {id},{headers:{token}})
           
           if (response.data.success) {
              toast.success(response.data.message)
              await fetchList();
           }
           else{
            toast.error(response.data.message)
           }
           
          } catch (error) {
              console.log(error)
              toast.error(error.message)
         }
  }

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    console.log("Current list:", list); // Log the current list whenever it updates
  }, [list]);

  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div className='flex flex-col gap-2'>
        {/* Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item) => (
            <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
              <img src={item.image[0]} alt={item.name} className='w-16 h-16 object-cover' /> {/* Access the first image */}
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price.toFixed(2)}</p>
              <div className='text-center'>
                <button onClick={()=>removeProduct(item._id)} className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button> {/* Replace with actual action */}
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
};

export default List;