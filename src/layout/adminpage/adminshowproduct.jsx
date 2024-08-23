import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AdminHome() {
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/auth/getproduct', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []); 

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8889/auth/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setMenuItems(menuItems.filter(item => item.id !== id));
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center py-10">
        <div className="">
          <p className="text-[50px] font-semibold text-center">Admin</p>
        </div>
        <div className="but">
          <Link to={`/Add`}>
            <button className="text-blue-500 font-semibold">เพิ่มสินค้า</button>
          </Link>
        </div>
        <div className="container mx-auto mt-10 p-4 rounded-lg ">
          {menuItems.map((item) => (
            <div key={item.id} className="rounded-xl border p-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-9 mb-2">
                <div className='flex items-center'>
                  <img src={item.file} alt="" className="w-20 h-20 rounded-md mr-4" />
                  <div>
                    <p className="font-semibold">{item.ItemName}</p>
                    <p>ราคา {item.price}</p>
                    <p>จำนวนสินค้า {item.stock}</p>
                  </div>
                </div>
                <div className="button-group">
                  <button className="text-blue-500 font-semibold" onClick={() => openModal(item)}>รายละเอียด</button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
{/* Modal */}
{showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full flex flex-col">
      <div className="flex flex-grow">
        {/* Image Section */}
        <div className="flex-shrink-0 w-[40%]">
          <img src={selectedProduct?.file} alt="" className="w-full h-full object-cover" />
        </div>
        {/* Details Section */}
        <div className="flex-grow pl-6">
          <h2 className="text-2xl font-semibold mb-4">{selectedProduct?.ItemName}</h2>
          <p className="mb-4 font-semibold">ราคา: {selectedProduct?.price}</p>
          <p className="mb-4">รายละเอียด: {selectedProduct?.description}</p>
          <p className ="mb-4 font-semibold" >จำนวนสินค้า {selectedProduct?.stock}</p>
        </div>
        
      </div>
      <div className="flex justify-end mt-auto">
        <button className="text-blue-500 font-semibold" onClick={closeModal}>Close</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
