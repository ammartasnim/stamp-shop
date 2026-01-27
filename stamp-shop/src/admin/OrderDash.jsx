import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

function OrderDash() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch("/api/orders", {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success("Order status updated.");
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus, paid: newStatus== 'Paid' } : order));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    }
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("Order ID copied to clipboard.");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Delivered': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Order Ledger</h2>
          <p className="text-slate-500 text-sm mt-1">Manage fulfillment, tracking, and customer shipments.</p>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-300">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xs uppercase font-bold tracking-widest">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200 mx-6 my-6">
            <i className="bi bi-search text-4xl text-slate-200 mb-4 block"></i>
            <p className="text-slate-500 font-light">No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="pl-8 pr-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ref ID & Customer</th>
                  <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ship To</th>
                  <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Items</th>
                  <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Financials</th>
                  <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Date</th>
                  <th className="pr-8 pl-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group align-top">
                    
                    {/* ID & Profile */}
                    <td className="pl-8 pr-4 py-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span onClick={()=>copyToClipboard(order._id.slice(-6).toUpperCase())} className="font-mono text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                        <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${order.user ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                          {order.user ? 'Member' : 'Guest'}
                        </span>
                      </div>
                      <div className="font-bold text-slate-900 text-sm leading-tight">{order.customer.fullName}</div>
                      <div className="text-[11px] text-slate-400 font-medium truncate max-w-[150px]">{order.customer.email}</div>
                      <div className="text-[11px] text-slate-400 font-medium truncate max-w-[150px]">{order.customer.phone}</div>
                    </td>

                    {/* Shipping Address */}
                    <td className="px-4 py-5">
                      <div className="text-[11px] text-slate-500 leading-relaxed">
                        <span className="block font-bold text-slate-900 text-[10px] uppercase tracking-wide">{order.customer.city}</span>
                        {order.customer.address}<br/>
                        {order.customer.postalCode}
                      </div>
                    </td>

                    {/* Manifest (Items Detail) */}
                    <td className="px-4 py-5">
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex flex-col border-b border-slate-50 last:border-0 pb-1">
                            <span className="text-[11px] font-bold text-slate-700 leading-tight uppercase">
                              {item.product?.name || 'Stamp Item'} 
                              <span className="text-blue-500 ml-1">x{item.quantity}</span>
                            </span>
                            <span className="text-[9px] text-slate-400 font-medium">
                              {item.price.toFixed(3)} TND / unit
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Financials */}
                    <td className="px-4 py-5">
                      <div className="text-sm font-bold text-slate-900">{order.totalPrice.toFixed(3)} TND</div>
                      <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter mb-1">{order.paymentMethod}</div>
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold border ${order.paid ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                        <div className={`w-1 h-1 rounded-full ${order.paid ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                        {order.paid ? 'Paid' : 'Unpaid'}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="pr-8 pl-4 py-5 text-right">
                      <div className="text-[11px] font-bold text-slate-500 whitespace-nowrap">
                        {format(new Date(order.createdAt), 'dd MMM, yyyy')}
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono">
                        {format(new Date(order.createdAt), 'HH:mm')}
                      </div>
                    </td>

                    {/* Status Select */}
                    <td className="px-4 py-5 text-center">
                      <div className="relative inline-block">
                        <select 
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className={`appearance-none text-center pl-3 pr-8 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border-2 cursor-pointer transition-all focus:outline-none ${getStatusStyle(order.status)}`}
                        >
                          <option value="Created">Created</option>
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <i className="bi bi-chevron-down absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] opacity-50"></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6 px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        <span>Orders Found: {orders.length}</span>
        <span>Admin control panel</span>
      </div>
    </div>
  );
}

export default OrderDash;