'use client'
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import Loading from "@/components/Loading"
import { useAuth } from "@/lib/AuthContext"
import { getStoreByUserId, getProductsByStore, updateProduct, deleteProduct } from "@/lib/firebaseDb"
import { useRouter } from "next/navigation"

export default function StoreManageProducts() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        if (!user) return setLoading(false)
        try {
            const store = await getStoreByUserId(user.uid)
            if (store) {
                const data = await getProductsByStore(store.id)
                setProducts(data)
            }
        } catch (err) {
            console.error("Error fetching products:", err)
        }
        setLoading(false)
    }

    const toggleStock = async (productId) => {
        const product = products.find(p => p.id === productId)
        await updateProduct(productId, { inStock: !product.inStock })
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, inStock: !p.inStock } : p))
        toast.success("Stock updated!")
    }

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteProduct(productId)
            setProducts(prev => prev.filter(p => p.id !== productId))
            toast.success("Product deleted!")
        } catch (error) {
            toast.error("Failed to delete product")
        }
    }


    useEffect(() => {
        if (!authLoading) fetchProducts()
    }, [user, authLoading])

    if (loading) return <Loading />

    return (
        <>
            <h1 className="text-2xl text-slate-500 mb-5">Manage <span className="text-slate-800 font-medium">Products</span></h1>
            <table className="w-full max-w-4xl text-left  ring ring-slate-200  rounded overflow-hidden text-sm">
                <thead className="bg-slate-50 text-gray-700 uppercase tracking-wider">
                    <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3 hidden md:table-cell">Description</th>
                        <th className="px-4 py-3 hidden md:table-cell">MRP</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-slate-700">
                    {products.map((product) => (
                        <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3">
                                <div className="flex gap-2 items-center">
                                    {product.images?.[0] && (
                                        <Image width={40} height={40} className='p-1 shadow rounded cursor-pointer' src={product.images[0]} alt="" />
                                    )}
                                    {product.name}
                                </div>
                            </td>
                            <td className="px-4 py-3 max-w-md text-slate-600 hidden md:table-cell truncate">{product.description}</td>
                            <td className="px-4 py-3 hidden md:table-cell">{currency} {(product.mrp || 0).toLocaleString()}</td>
                            <td className="px-4 py-3">{currency} {(product.price || 0).toLocaleString()}</td>
                            <td className="px-4 py-3 text-center flex gap-2 justify-center items-center h-full">
                                <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                    <input type="checkbox" className="sr-only peer" onChange={() => toast.promise(toggleStock(product.id), { loading: "Updating data..." })} checked={product.inStock} />
                                    <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                                    <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                                </label>
                                <button onClick={() => router.push(`/store/add-product?id=${product.id}`)} className="text-blue-500 hover:text-blue-700 ml-3">Edit</button>
                                <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}