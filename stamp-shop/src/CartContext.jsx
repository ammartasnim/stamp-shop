import { gu } from 'date-fns/locale';
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const max = 5;
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

const getGuestCart=()=>{
        try{
            const guestCart=localStorage.getItem('guestCart');
            return guestCart ? JSON.parse(guestCart) : [];
        }catch(err){
            console.error(err);
            return [];
        }
    }
    const saveGuestCart=(items)=>{
        localStorage.setItem('guestCart', JSON.stringify(items));
    }
    const populateGuestCart=async(items)=>{
        const populatedItems=[];
        for(const item of items){
            try{
                const res=await fetch(`/api/stamps/${item.productId}`);
                const data=await res.json();
                populatedItems.push({
                    productId: data,
                    quantity: item.quantity,
                    price: data.price
                })
            }catch(err){
                console.error(err)
            }
        }
        return populatedItems;
    }



    const getCart = async () => {
        if(!token){
            const guestItems=getGuestCart();
            const populated=await populateGuestCart(guestItems);
            setCart(populated);
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

    const addItem=async(id, qte=1, price)=>{
        if(!token){
            const guestItems=getGuestCart();
            const existingIndex = guestItems.findIndex(item => item.productId === id);
            if(existingIndex>-1){
                const currentquantity=guestItems[existingIndex].quantity;
                if(currentquantity>=max){
                    toast.error('Maximum quantity reached');
                    return;
                }
                guestItems[existingIndex].quantity+=qte;
            }else{
                guestItems.push({productId:id, quantity:qte, price:price});
            }
            saveGuestCart(guestItems);
            const populated=await populateGuestCart(guestItems);
            setCart(populated);
            toast.success("Item added to cart");
            return;
        }
        const existingItem = cart.find(item => item.productId?._id === id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;
        if(currentQuantity + qte > max){
            toast.error('Maximum quantity reached');
            return;
        }
        try{
            console.log('Adding item to cart:', id, qte);
            console.log('Using token:', token);
            const res=await fetch('/api/cart/add',{
                method:'POST',
                headers:{ 'Content-Type':'application/json', Authorization: 'Bearer ' + token },
                body: JSON.stringify({ productId:id, quantity:qte, price:price })
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
        if(qte<1) return;
        if(qte>max){
            toast.error('Maximum quantity reached');
            return;
        }
        if (!token) {
            let guestItems=getGuestCart();
            if(qte==0){
                guestItems=guestItems.filter(item=>item.productId!==id);
            }else{
                const existingIndex=guestItems.findIndex(item=>item.productId===id);
                if(existingIndex>-1){
                    guestItems[existingIndex].quantity=qte;
                }
            }
            saveGuestCart(guestItems);
            const populated=await populateGuestCart(guestItems);
            setCart(populated);
            return;
        }
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
        if (!token) {
            let guestItems=getGuestCart();
            guestItems=guestItems.filter(item=>item.productId!==id);
            saveGuestCart(guestItems);
            const populated=await populateGuestCart(guestItems);
            setCart(populated);
            toast.success("Item removed from cart");
            return;
}
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
        if (!token) {
            localStorage.removeItem('guestCart');
            setCart([]);
            toast.success("Cart cleared");
            return;
}
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