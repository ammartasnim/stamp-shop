import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = () => {
    fetch("/api/orders/myorders", { 
      headers: { Authorization: 'Bearer ' + token } 
    })
      .then(res => res.json())
      .then(data => { 
        setOrders(data); 
        setLoading(false); 
      })
      .catch(() => setLoading(false));
  };

  const onCancelOrder = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this order? This action cannot be undone.");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + token }
      });

      if (res.ok) {
        toast.success("Order cancelled successfully.");
        fetchOrders(); 
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to cancel order.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while trying to cancel the order.");
    }
  };
  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("Order ID copied to clipboard.");
  };

  if (loading) return (
    <div className="py-20 text-center text-slate-400 animate-pulse font-black text-[10px] uppercase tracking-widest">
      Retrieving Ledger...
    </div>
  );

  return (
    <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm overflow-x-auto">
      {orders.length > 0 ? (
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="pl-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</th>
              <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Items</th>
              <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Date</th>
              <th className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total</th>
              <th className="pr-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order) => {
              const canCancel = ['pending', 'created'].includes(order.status.toLowerCase());

              return (
                <tr key={order._id} className="align-top hover:bg-slate-50/30 transition-colors">
                  {/* COLUMN 1: ID */}
                  <td className="pl-8 py-8">
                    <span onClick={() => copyToClipboard(order._id.slice(-6).toUpperCase())}
                     className="font-mono text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                  </td>

                  

                  {/* COLUMN 3: ITEMS */}
                  <td className="px-4 py-8">
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col border-l-2 border-slate-100 pl-3">
                          <span className="text-[11px] font-black text-slate-800 uppercase tracking-tight">
                            {item.product?.name || 'Stamp Item'} 
                          </span>
                          <div className="flex gap-2 mt-0.5">
                            <span className="text-[10px] text-blue-600 font-black">x{item.quantity}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{item.price.toFixed(3)} TND</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* COLUMN 4: STATUS */}
                  <td className="px-4 py-8 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter 
                      ${order.status.toLowerCase() === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 
                        order.status.toLowerCase() === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                      {order.status}
                    </span>
                  </td>
                  {/* COLUMN 2: DATE (SEPARATE) */}
                  <td className="pl-8 py-8">
                    <span className="text-[11px] font-bold text-slate-600 whitespace-nowrap">
                      {format(new Date(order.createdAt), 'dd MMM yyyy')}
                    </span>
                  </td>

                  {/* COLUMN 5: TOTAL */}
                  <td className="px-4 py-8 text-right">
                    <span className="font-black text-slate-900 text-sm whitespace-nowrap">
                      {order.totalPrice.toFixed(3)}
                      <span className="text-[10px] text-slate-400 font-medium ml-1">TND</span>
                    </span>
                  </td>

                  {/* COLUMN 6: CANCEL ACTION (SEPARATE) */}
                  <td className="pr-8 py-8 text-right">
                    {canCancel ? (
                      <button 
                        onClick={() => onCancelOrder(order._id)}
                        className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:text-white hover:bg-red-500 border border-red-100 hover:border-red-500 px-4 py-2 rounded-xl transition-all active:scale-95 whitespace-nowrap"
                      >
                        Cancel Order
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
                        Locked
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="py-20 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">
          No transaction history found
        </div>
      )}
    </div>
  );
}

export default OrderHistory;