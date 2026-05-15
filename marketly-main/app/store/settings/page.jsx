'use client'
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { updatePassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuth } from "@/lib/AuthContext"
import { getStoreByUserId, updateStore } from "@/lib/firebaseDb"
import Image from "next/image"
import { assets } from "@/assets/assets"
import Loading from "@/components/Loading"

export default function StoreSettings() {
    const { user, loading: authLoading } = useAuth()
    const [loading, setLoading] = useState(true)
    const [storeInfo, setStoreInfo] = useState({ id: "", name: "", logo: "" })
    const [logoFile, setLogoFile] = useState(null)
    const [password, setPassword] = useState("")

    useEffect(() => {
        const fetchStore = async () => {
            if (!user) return setLoading(false)
            try {
                const store = await getStoreByUserId(user.uid)
                if (store) {
                    setStoreInfo({ id: store.id, name: store.name || "", logo: store.logo || "" })
                }
            } catch (err) {
                console.error("Error fetching store:", err)
            }
            setLoading(false)
        }
        if (!authLoading) fetchStore()
    }, [user, authLoading])

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            let logoUrl = storeInfo.logo
            if (logoFile) {
                const convertToBase64 = (file) => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
                logoUrl = await convertToBase64(logoFile)
            }
            await updateStore(storeInfo.id, {
                name: storeInfo.name,
                logo: logoUrl
            })
            setStoreInfo({ ...storeInfo, logo: logoUrl })
            setLogoFile(null)
            toast.success("Store profile updated successfully!")
        } catch (error) {
            console.error(error)
            toast.error("Failed to update store profile")
        }
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        if (!password || password.length < 6) {
            return toast.error("Password must be at least 6 characters")
        }
        try {
            if (auth.currentUser) {
                await updatePassword(auth.currentUser, password)
                toast.success("Password updated successfully!")
                setPassword("")
            } else {
                toast.error("User not found")
            }
        } catch (error) {
            console.error(error)
            if (error.code === 'auth/requires-recent-login') {
                toast.error("Please log out and log back in to change your password.")
            } else {
                toast.error("Failed to update password")
            }
        }
    }

    if (loading) return <Loading />

    return (
        <div className="text-slate-500 mb-28 max-w-2xl">
            <h1 className="text-2xl mb-8">Store <span className="text-slate-800 font-medium">Settings</span></h1>
            
            <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h2 className="text-xl font-medium text-slate-700 mb-4">Profile</h2>
                <form onSubmit={e => toast.promise(handleUpdateProfile(e), { loading: "Updating profile..." })}>
                    <div className="mb-4">
                        <p className="mb-2">Store Logo</p>
                        <label htmlFor="logo" className="cursor-pointer">
                            <Image width={100} height={100} className='w-20 h-20 rounded-full object-cover border border-slate-200' src={logoFile ? URL.createObjectURL(logoFile) : storeInfo.logo || assets.upload_area} alt="Store Logo" />
                            <input type="file" id="logo" accept="image/*" hidden onChange={(e) => setLogoFile(e.target.files[0])} />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="flex flex-col gap-2">
                            Store Name
                            <input type="text" value={storeInfo.name} onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })} className="p-2 px-4 outline-none border border-slate-200 rounded" required />
                        </label>
                    </div>
                    <button type="submit" className="bg-slate-800 text-white px-6 py-2 hover:bg-slate-900 rounded transition">Update Profile</button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h2 className="text-xl font-medium text-slate-700 mb-4">Security</h2>
                <form onSubmit={e => toast.promise(handleUpdatePassword(e), { loading: "Updating password..." })}>
                    <div className="mb-4">
                        <label className="flex flex-col gap-2">
                            New Password
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" className="p-2 px-4 outline-none border border-slate-200 rounded" required />
                        </label>
                    </div>
                    <button type="submit" className="bg-slate-800 text-white px-6 py-2 hover:bg-slate-900 rounded transition">Update Password</button>
                </form>
            </div>
        </div>
    )
}
