import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const getStoredToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
    };
    const [token, setToken] = useState(getStoredToken());

    useEffect(() => {
    const handleStorageChange = () => {
      const newToken = getStoredToken();
      if (newToken !== token) {
        setToken(newToken);
      }
    };

    // Listen to storage event (for other tabs)
    window.addEventListener('storage', handleStorageChange);
    
    // Check periodically (for same tab)
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [token]);

  const updateToken = () => {
  const newToken = getStoredToken();
  setToken(newToken);
};

    const getCart = async () => {
        if(!token){
            setCart([]);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const res = await fetch('/api/cart', 
            { headers: { Authorization: 'Bearer ' + token } });
            const data = await res.json();
            console.log('Fetched cart data:', data);
            setCart(data.items || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        } 
    };

    useEffect(() => {
        getCart();
    }, [token]);

    const addItem=async(id, qte=1)=>{
        try{
            console.log('Adding item to cart:', id, qte);
            console.log('Using token:', token);
            const res=await fetch('/api/cart/add',{
                method:'POST',
                headers:{ 'Content-Type':'application/json', Authorization: 'Bearer ' + token },
                body: JSON.stringify({ productId:id, quantity:qte })
            })
            const data=await res.json();
            console.log(data);
            setCart(data.items || []);
            toast.success("Item added to cart");
        }catch(err){
            console.error(err);
        }
    };

    const updateQuantity=async(id, qte)=>{
        try{
            console.log('Sending update:', { productId: id, quantity: qte }); // Add this
            const res=await fetch('/api/cart/update',{
                method:'POST',
                headers:{ 'Content-Type':'application/json',
                Authorization: 'Bearer ' + token },
                body: JSON.stringify({ productId:id, quantity:qte })
            })

            if (!res.ok) {
            const errorData = await res.json();
            console.error('Backend error:', errorData); // Add this too
            return;
        }
            const data=await res.json();
             console.log('Update response:', data);
            setCart(data.items || []);
        }catch(err){
            console.error(err);
        }
    }

    const removeItem=async(id)=>{
        try{
            const res=await fetch('/api/cart/remove',{
                method:'POST',
                headers:{ 'Content-Type':'application/json',
                Authorization: 'Bearer ' + token },
                body: JSON.stringify({ productId:id })
            })
            const data=await res.json();
            setCart(data.items || []);
            toast.success("Item removed from cart");
        }catch(err){
            console.error(err);
        }
    };

    const clearCart=async()=>{
        try{
            const res=await fetch('/api/cart/clear',{
                method:'POST',
                headers:{ 'Content-Type':'application/json',
                Authorization: 'Bearer ' + token }
            })
            const data=await res.json();
            setCart(data.items || []);
            toast.success("Cart cleared");
        }catch(err){
            console.error(err);
        }
    };

    return(
        <CartContext.Provider value={{cart, loading, addItem, updateQuantity, removeItem, clearCart, getCart, updateToken }}>
            {children}
        </CartContext.Provider>
    );

}
export const useCart=()=>useContext(CartContext);