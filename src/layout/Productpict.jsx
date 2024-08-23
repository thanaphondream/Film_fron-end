import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Productpict = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8889/payment/paymentuser', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-list p-4 mt-[100px]">
      <h2 className="text-2xl font-bold mb-4">รายการสั่งซื้อ</h2>
      <div className="flex flex-col space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="order bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Order ID: {order.orderId}</h3>
            <p className="text-sm text-gray-700">สถานะการชำระเงิน: {order.status}</p>
            <p className="text-sm text-gray-700">วิธีการชำระเงิน: {order.pay}</p>
            <p className="text-sm text-gray-700">
              ชื่อผู้รับ: {order.address.name} {order.address.lastname}
            </p>
            <p className="text-sm text-gray-700">เบอร์โทร: {order.address.phone}</p>
            <p className="text-sm text-gray-700">
              ที่อยู่: {order.address.housenumber}, หมู่บ้าน: {order.address.village}, เขต: {order.address.district}, ตำบล: {order.address.tambon}, จังหวัด: {order.address.province}, รหัสไปรษณีย์: {order.address.zipcode}
            </p>
            <p className="text-sm text-gray-700">สถานะคำสั่งซื้อ: {order.order.status}</p>
            <p className="text-sm text-gray-700">วันที่สั่งซื้อ: {new Date(order.order.date).toLocaleDateString()}</p>
            <h4 className="text-lg font-semibold mt-4">รายการสินค้า:</h4>
            <div className="flex space-x-4 overflow-x-auto py-2">
              {order.order.ordercart.map((cartItem) => (
                <div key={cartItem.id} className="flex-shrink-0">
                  <img
                    src={cartItem.product.file}
                    alt={cartItem.product.ItemName}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <p className="text-sm text-gray-700">ชื่อสินค้า: {cartItem.product.ItemName}</p>
                  <p className="text-sm text-gray-700">จำนวน: {cartItem.total}</p>
                  <p className="text-sm text-gray-700">ราคา: {cartItem.price} บาท</p>
                </div>
              ))}
            </div>
            <p className="text-lg font-bold mt-4">ราคาสุทธิ: {order.order.price_all} บาท</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productpict;
