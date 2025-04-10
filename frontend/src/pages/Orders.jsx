import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrderData = async () => {
    try {
      setLoading(true);

      if (!token) {
        return;
      }

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });

        setorderData(allOrdersItem.reverse());
      } else {
        console.log('Failed to load orders');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-centers md:justify-between gap-4'
          >
            <div className='flex items-start gap-6 text-sm'>
              <img
                className='w-16 sm:w-20'
                src={
                  item.image && item.image[0]
                    ? item.image[0]
                    : 'path/to/placeholder-image.jpg'
                }
                alt={item.name || 'Product image'}
              />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p>
                    {item.price} {currency}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className='mt-1'>
                  Date:{' '}
                  <span className='text-gray-400'>
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className='mt-1'>
                  Payment:{' '}
                  <span className='text-gray-400'>{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                disabled={loading}
                className='border px-4 py-2 text-sm font-medium rounded-sm flex items-center gap-2'
              >
                {loading ? (
                  <span className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-500'></span>
                ) : (
                  'Track Order'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
