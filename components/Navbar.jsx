'use client'
import { Package, Search, ShoppingCart, LogOut, UserIcon, Store, ShieldAlert, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "@/lib/AuthContext";
import LoginModal from "./LoginModal";
import { getStoreByUserId } from "@/lib/firebaseDb";

const Navbar = () => {

    const { user, loading: authLoading, logout } = useAuth();
    const router = useRouter();

    const [search, setSearch] = useState('')
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const cartCount = useSelector(state => state.cart.total)

    const [isAdmin, setIsAdmin] = useState(false)
    const [hasApprovedStore, setHasApprovedStore] = useState(false)

    useEffect(() => {
        const checkRoles = async () => {
            if (user) {
                setIsAdmin(user.role === 'admin')

                try {
                    const store = await getStoreByUserId(user.uid)
                    if (store && store.status === 'approved') {
                        setHasApprovedStore(true)
                    } else {
                        setHasApprovedStore(false)
                    }
                } catch (error) {
                    console.error("Error fetching store status:", error)
                }
            } else {
                setIsAdmin(false)
                setHasApprovedStore(false)
            }
        }
        checkRoles()
    }, [user])

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    const handleLogout = async () => {
        await logout()
        setShowUserMenu(false)
        router.push('/')
    }

    return (
        <>
            <nav className="relative bg-white">
                <div className="mx-6">
                    <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">

                        <Link href="/" className="relative text-2xl sm:text-4xl font-semibold text-slate-700">
                            <span className="text-teal-600">Mar</span>ketly<span className="text-teal-600 text-5xl leading-0">.</span>
                            <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-teal-500">
                                plus
                            </p>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                            <Link href="/">Home</Link>
                            <Link href="/shop">Shop</Link>
                            <Link href="/about">About</Link>
                            <Link href="/contact">Contact</Link>

                            <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                                <Search size={18} className="text-slate-600" />
                                <input 
                                    className="w-full bg-transparent outline-none placeholder-slate-600" 
                                    type="text" 
                                    placeholder="Search products" 
                                    value={search} 
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        if (e.target.value.trim() !== '') {
                                            router.push(`/shop?search=${e.target.value}`);
                                        } else {
                                            router.push(`/shop`);
                                        }
                                    }} 
                                />
                            </form>

                            <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                                <ShoppingCart size={18} />
                                Cart
                                <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                            </Link>
                            {   authLoading ? (
                                    <div className="w-20 h-9 bg-slate-100 animate-pulse rounded-full"></div>
                                ) : !user ? (
                                    <button onClick={() => setShowLoginModal(true)} className="px-8 py-2 bg-indigo-500
                                    hover:bg-indigo-600 transition text-white rounded-full">
                                        Login
                                    </button>
                                ) : (
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowUserMenu(!showUserMenu)}
                                            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition px-3 py-2 rounded-full"
                                        >
                                            {user.image ? (
                                                <img src={user.image} alt="" className="w-7 h-7 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-medium">
                                                    {user.name?.charAt(0)?.toUpperCase() || <UserIcon size={14} />}
                                                </div>
                                            )}
                                            <span className="text-sm text-slate-700 max-w-24 truncate">{user.name || 'User'}</span>
                                        </button>

                                        {showUserMenu && (
                                            <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-lg shadow-lg py-2 w-48 z-50">
                                                <button onClick={() => { router.push('/orders'); setShowUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition">
                                                    <Package size={16} /> My Orders
                                                </button>
                                                {isAdmin && (
                                                    <button onClick={() => { router.push('/admin'); setShowUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition">
                                                        <ShieldAlert size={16} /> Admin Dashboard
                                                    </button>
                                                )}
                                                {hasApprovedStore && (
                                                    <button onClick={() => { router.push('/store'); setShowUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition">
                                                        <Store size={16} /> Store Dashboard
                                                    </button>
                                                )}
                                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition">
                                                    <LogOut size={16} /> Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>

                        {/* Mobile User Button  */}
                        <div className="sm:hidden flex items-center gap-3">
                            <Link href="/cart" className="relative flex items-center gap-1 text-slate-600">
                                <ShoppingCart size={18} />
                                <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                            </Link>

                            {authLoading ? (
                                <div className="w-8 h-8 bg-slate-100 animate-pulse rounded-full"></div>
                            ) : user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center"
                                    >
                                        {user.image ? (
                                            <img src={user.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-medium">
                                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                        )}
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-lg shadow-lg py-2 w-48 z-50">
                                            <button onClick={() => { router.push('/orders'); setShowUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition">
                                                <Package size={16} /> My Orders
                                            </button>
                                            {isAdmin && (
                                                <button onClick={() => { router.push('/admin'); setShowUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition">
                                                    <ShieldAlert size={16} /> Admin Dashboard
                                                </button>
                                            )}
                                            {hasApprovedStore && (
                                                <button onClick={() => { router.push('/store'); setShowUserMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition">
                                                    <Store size={16} /> Store Dashboard
                                                </button>
                                            )}
                                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition">
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ):(
                                 <button onClick={() => setShowLoginModal(true)} className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
                                Login
                            </button>
                            )}

                            <button onClick={() => setShowMobileMenu(true)} className="text-slate-600 p-1">
                                <Menu size={24} />
                            </button>
                           
                        </div>
                    </div>
                </div>
                <hr className="border-gray-300" />

                {/* Mobile Navigation Drawer */}
                <div className={`fixed inset-0 z-50 bg-white transition-transform duration-300 ${showMobileMenu ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}>
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-6 border-b">
                            <span className="text-2xl font-semibold text-slate-700">Menu</span>
                            <button onClick={() => setShowMobileMenu(false)} className="text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-1 p-6">
                            <Link href="/" onClick={() => setShowMobileMenu(false)} className="py-4 text-lg text-slate-600 border-b border-slate-50">Home</Link>
                            <Link href="/shop" onClick={() => setShowMobileMenu(false)} className="py-4 text-lg text-slate-600 border-b border-slate-50">Shop</Link>
                            <Link href="/about" onClick={() => setShowMobileMenu(false)} className="py-4 text-lg text-slate-600 border-b border-slate-50">About</Link>
                            <Link href="/contact" onClick={() => setShowMobileMenu(false)} className="py-4 text-lg text-slate-600 border-b border-slate-50">Contact</Link>
                            
                            <form onSubmit={(e) => { handleSearch(e); setShowMobileMenu(false); }} className="mt-6 flex items-center w-full text-sm gap-2 bg-slate-100 px-4 py-3 rounded-xl">
                                <Search size={18} className="text-slate-600" />
                                <input 
                                    className="w-full bg-transparent outline-none placeholder-slate-600" 
                                    type="text" 
                                    placeholder="Search products" 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Login Modal */}
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </>
    )
}

export default Navbar