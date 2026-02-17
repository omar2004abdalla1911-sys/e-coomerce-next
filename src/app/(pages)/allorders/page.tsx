'use client'

import { UserOrders } from '@/interfaces/userOrderInterface';
import React, { useEffect, useState } from 'react';

export default function AllOrders() {
  // المصفوفة اللي هتحمل الطلبات
  const [orders, setOrders] = useState<UserOrders[]>([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Async IIFE داخل useEffect لتجنب setState المتزامن
    (async () => {
      try {
        const cartId = localStorage.getItem('cartId');
        if (!cartId) {
          setEmpty(true);
          setLoading(false);
          return;
        }

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`);
        const data: UserOrders[] = await response.json();

        setOrders(data);
        setEmpty(data.length === 0);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setEmpty(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <h2 className='flex justify-center items-center font-semibold'>Loading orders...</h2>;
  }

  if (empty) {
    return <h2 className='flex justify-center items-center font-semibold'>No orders found.</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">All Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-xl p-6 mb-8 shadow-sm bg-white"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-semibold">
                Order #{order._id}
              </h2>
              <p className="text-gray-500 text-sm">
                {new Date(order.createdAt).toDateString()}
              </p>

              <p className="mt-4">
                <span className="font-semibold">Items:</span>{' '}
                {order.cartItems.length}
              </p>

              <p>
                <span className="font-semibold">Total:</span>{' '}
                {order.totalOrderPrice} EGP
              </p>

              <p>
                <span className="font-semibold">Payment:</span>{' '}
                {order.isPaid ? 'Paid' : 'Not Paid'}
              </p>

              <p>
                <span className="font-semibold">Delivery:</span>{' '}
                {order.isDelivered ? 'Delivered' : 'Not Delivered'}
              </p>
            </div>

            {/* Payment Badge */}
            <span
              className={`px-4 py-1 text-sm rounded-full border ${
                order.paymentMethodType === 'cash'
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {order.paymentMethodType}
            </span>
          </div>

          {/* Shipping */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Shipping Address:</h3>
            <p>{order.shippingAddress?.city}</p>
            <p>{order.shippingAddress?.details}</p>
            <p>{order.shippingAddress?.phone}</p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products:</h3>

            {order.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-4 border-b pb-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.count}
                    </p>
                  </div>
                </div>

                <p className="font-semibold">
                  {item.price} EGP
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}