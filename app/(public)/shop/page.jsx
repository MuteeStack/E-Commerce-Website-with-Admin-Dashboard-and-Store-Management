'use client'
import { Suspense, useState } from "react"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

 function ShopContent() {

    // get query params ?search=abc
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const router = useRouter()

    const products = useSelector(state => state.product.list)
    const [selectedCategory, setSelectedCategory] = useState('All')

    const baseCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    const categories = ['All', 'Latest', 'Best Selling', ...baseCategories];

    let filteredProducts = [...products];
    
    if (search) {
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    if (selectedCategory === 'Latest') {
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (selectedCategory === 'Best Selling') {
        filteredProducts.sort((a, b) => (b.rating?.length || 0) - (a.rating?.length || 0))
    } else if (selectedCategory !== 'All') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory)
    }

    return (
        <div className="min-h-[70vh] mx-6">
            <div className=" max-w-7xl mx-auto">
                <h1 onClick={() => router.push('/shop')} className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer"> {search && <MoveLeftIcon size={20} />}  All <span className="text-slate-700 font-medium">Products</span></h1>
                
                {/* Categories */}
                <div className="flex gap-4 overflow-x-auto no-scrollbar mb-8 pb-2">
                    {categories.map(category => (
                        <button 
                            key={category} 
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${selectedCategory === category ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
                    {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
            </div>
        </div>
    )
}


export default function Shop() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}