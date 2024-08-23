import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { FaHome, FaShoppingCart, FaClipboardList, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

const guestNav = [
  { to: '/', text: '' },
  { to: '/register', text: '' },
];

const userNav = [
  { to: '/', text: 'หน้าแรก', icon: <FaHome /> },
  { to: '/cart', text: 'ตะกร้า', icon: <FaShoppingCart /> },
  { to: '/product01', text: 'คำสั่งซื้อของฉัน', icon: <FaClipboardList /> },
  { to: '/address', text: 'ที่อยู่', icon: <FaMapMarkerAlt /> },
];

const adminNav = [
  { to: '/home', text: 'Home' },
  { to: '/order', text: 'Order' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const finalNav = user?.id ? (user?.role === 'ADMIN' ? adminNav : userNav) : guestNav;
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const hdlLogout = () => {
    logout();
    navigate('/');
  };

  const hdlPro = () => {
    navigate('/profile');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Adjust this value as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar bg-base-100 fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'} ${scrolled ? 'bg-white' : 'bg-base-100'}`}>
      <div className="flex-1 flex items-center">
        <img src="/src/assets/DISNEY copy.png" alt="" className={`transition-transform duration-300 ${scrolled ? 'h-16' : 'h-20'} w-auto mx-5`} />
        <a className="btn btn-ghost text-xl" onClick={hdlPro}>CS.SHOP | {user?.id ? user.username : ''}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map(el => (
            <li key={el.to} className="mx-2 flex items-center">
              <Link
                to={el.to}
                className="text-[16px] font-semibold text-black hover:bg-gray-600 hover:text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
              >
                <span className="mr-2">{el.icon}</span>
                {!scrolled && el.text} {/* Show text only when not scrolled */}
              </Link>
            </li>
          ))}
          {user?.id && (
            <li>
              <Link to="#" className="text-[16px] font-semibold hover:bg-red-400 transition-colors" onClick={hdlLogout}>ออกจากระบบ</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
