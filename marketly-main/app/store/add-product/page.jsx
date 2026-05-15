'use client'
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/AuthContext"
import { getStoreByUserId, createProduct, getProduct, updateProduct } from "@/lib/firebaseDb"
import { useEffect } from "react"

export default function StoreAddProduct() {

    const { user } = useAuth()
    const searchParams = useSearchParams()
    const productId = searchParams.get('id')
    const router = useRouter()

    const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Health', 'Toys & Games', 'Sports & Outdoors', 'Books & Media', 'Food & Drink', 'Hobbies & Crafts', 'Others']

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        mrp: 0,
        price: 0,
        category: "",
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                const product = await getProduct(productId)
                if (product) {
                    setProductInfo({
                        name: product.name || "",
                        description: product.description || "",
                        mrp: product.mrp || 0,
                        price: product.price || 0,
                        category: product.category || "",
                    })
                    const loadedImages = { 1: null, 2: null, 3: null, 4: null }
                    if (product.images) {
                        product.images.forEach((img, index) => {
                            if (index < 4) loadedImages[index + 1] = img
                        })
                    }
                    setImages(loadedImages)
                }
            }
        }
        fetchProduct()
    }, [productId])


    const onChangeHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const store = await getStoreByUserId(user.uid)
            if (!store) {
                toast.error("Store not found")
                return
            }

            const imageFiles = Object.values(images).filter(img => img !== null)

            if (imageFiles.length === 0) {
                toast.error("Please add at least one image")
                setLoading(false)
                return
            }

            const convertToBase64 = (file) => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });

            const imageUrls = await Promise.all(
                imageFiles.map(file => typeof file === 'string' ? Promise.resolve(file) : convertToBase64(file))
            );

            if (productId) {
                await updateProduct(productId, {
                    ...productInfo,
                    mrp: Number(productInfo.mrp),
                    price: Number(productInfo.price),
                    images: imageUrls.length > 0 ? imageUrls : ['/placeholder.png'],
                })
                toast.success("Product updated successfully!")
                router.push('/store/manage-product')
            } else {
                await createProduct({
                    ...productInfo,
                    mrp: Number(productInfo.mrp),
                    price: Number(productInfo.price),
                    images: imageUrls.length > 0 ? imageUrls : ['/placeholder.png'],
                    storeId: store.id,
                    rating: [],
                })

                toast.success("Product added successfully!")
                setProductInfo({ name: "", description: "", mrp: 0, price: 0, category: "" })
                setImages({ 1: null, 2: null, 3: null, 4: null })
            }
        } catch (err) {
            console.error("Error saving product:", err)
            toast.error("Failed to save product")
        } finally {
            setLoading(false)
        }
    }


    return (
        <form onSubmit={e => toast.promise(onSubmitHandler(e), { loading: productId ? "Updating Product..." : "Adding Product..." })} className="text-slate-500 mb-28">
            <h1 className="text-2xl">{productId ? 'Edit' : 'Add New'} <span className="text-slate-800 font-medium">Product</span></h1>
            <p className="mt-7">Product Images</p>

            <div htmlFor="" className="flex gap-3 mt-4">
                {Object.keys(images).map((key) => (
                    <label key={key} htmlFor={`images${key}`}>
                        <Image width={300} height={300} className='h-15 w-auto border border-slate-200 rounded cursor-pointer' src={images[key] ? (typeof images[key] === 'string' ? images[key] : URL.createObjectURL(images[key])) : assets.upload_area} alt="" />
                        <input type="file" accept='image/*' id={`images${key}`} onChange={e => setImages({ ...images, [key]: e.target.files[0] })} hidden />
                    </label>
                ))}
            </div>

            <label htmlFor="" className="flex flex-col gap-2 my-6 ">
                Name
                <input type="text" name="name" onChange={onChangeHandler} value={productInfo.name} placeholder="Enter product name" className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded" required />
            </label>

            <label htmlFor="" className="flex flex-col gap-2 my-6 ">
                Description
                <textarea name="description" onChange={onChangeHandler} value={productInfo.description} placeholder="Enter product description" rows={5} className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded resize-none" required />
            </label>

            <div className="flex gap-5">
                <label htmlFor="" className="flex flex-col gap-2 ">
                    Actual Price ($)
                    <input type="number" name="mrp" onChange={onChangeHandler} value={productInfo.mrp} placeholder="0" rows={5} className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded resize-none" required />
                </label>
                <label htmlFor="" className="flex flex-col gap-2 ">
                    Offer Price ($)
                    <input type="number" name="price" onChange={onChangeHandler} value={productInfo.price} placeholder="0" rows={5} className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded resize-none" required />
                </label>
            </div>

            <select onChange={e => setProductInfo({ ...productInfo, category: e.target.value })} value={productInfo.category} className="w-full max-w-sm p-2 px-4 my-6 outline-none border border-slate-200 rounded" required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <br />

            <button disabled={loading} className="bg-slate-800 text-white px-6 mt-7 py-2 hover:bg-slate-900 rounded transition">{productId ? 'Update Product' : 'Add Product'}</button>
        </form>
    )
}