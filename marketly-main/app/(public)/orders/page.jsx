'use client'
import PageTitle from "@/components/PageTitle"
import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import { useAuth } from "@/lib/AuthContext";
import { getOrdersByUser, getProduct } from "@/lib/firebaseDb";
import Loading from "@/components/Loading";

export default function Orders() {

    const { user, loading: authLoading } = useAuth()
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        if (!user) return setLoading(false)
        try {
            const userOrders = await getOrdersByUser(user.uid)

            // Enrich order items with product data
            const enrichedOrders = await Promise.all(
                userOrders.map(async (order) => {
                    const items = Array.isArray(order.orderItems) ? order.orderItems : Object.values(order.orderItems || {})
                    const enrichedItems = await Promise.all(
                        items.map(async (item) => {
                            const product = await getProduct(item.productId)
                            return { ...item, product: product || { name: 'Unknown', images: [], id: item.productId } }
                        })
                    )
                    return { ...order, orderItems: enrichedItems, address: order.address || {} }
                })
            )

            setOrders(enrichedOrders)
        } catch (err) {
            console.error("Error fetching orders:", err)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!authLoading) fetchOrders()
    }, [user, authLoading]);

    if (loading) return <Loading />

    return (
        <div className="min-h-[70vh] mx-6">
            {orders.length > 0 ? (
                (
                    <div className="my-20 max-w-7xl mx-auto">
                        <PageTitle heading="My Orders" text={`Showing total ${orders.length} orders`} linkText={'Go to home'} />

                        <table className="w-full max-w-5xl text-slate-500 table-auto border-separate border-spacing-y-12 border-spacing-x-4">
                            <thead>
                                <tr className="max-sm:text-sm text-slate-600 max-md:hidden">
                                    <th className="text-left">Product</th>
                                    <th className="text-center">Total Price</th>
                                    <th className="text-left">Address</th>
                                    <th className="text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <OrderItem order={order} key={order.id} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ) : (
                <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
                    <h1 className="text-2xl sm:text-4xl font-semibold">You have no orders</h1>
                </div>
            )}
        </div>
    )
}