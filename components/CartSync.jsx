'use client'
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "@/lib/AuthContext";
import { updateUserCart } from "@/lib/firebaseDb";

export default function CartSync() {
    const { user, loading } = useAuth();
    const cart = useSelector(state => state.cart);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip syncing on first render or when auth is still loading
        if (loading || !user) return;
        
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Sync to Firebase
        const syncCart = async () => {
            try {
                await updateUserCart(user.uid, cart);
            } catch (error) {
                console.error("Failed to sync cart to Firebase:", error);
            }
        };

        syncCart();
    }, [cart, user, loading]);

    return null;
}
