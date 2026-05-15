import { db } from "./firebase";
import { ref, get, set, push, update, remove, query, orderByChild, equalTo } from "firebase/database";

// ─── Helper: strip undefined values ───
const cleanData = (obj) => {
    if (obj === null || obj === undefined) return null;
    if (typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(cleanData);
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
            cleaned[key] = typeof value === "object" ? cleanData(value) : value;
        }
    }
    return cleaned;
};

// ─── Generic CRUD ───

export async function dbGet(path) {
    const snapshot = await get(ref(db, path));
    return snapshot.exists() ? snapshot.val() : null;
}

export async function dbSet(path, data) {
    await set(ref(db, path), cleanData(data));
}

export async function dbPush(path, data) {
    const newRef = push(ref(db, path));
    await set(newRef, cleanData(data));
    return newRef.key;
}

export async function dbUpdate(path, data) {
    await update(ref(db, path), cleanData(data));
}

export async function dbRemove(path) {
    await remove(ref(db, path));
}

// ─── Users ───

export async function getUser(userId) {
    return await dbGet(`users/${userId}`);
}

export async function createUser(userId, data) {
    await dbSet(`users/${userId}`, {
        id: userId,
        name: data.name || "",
        email: data.email || "",
        image: data.image || "",
        role: data.role || "user",
        cart: data.cart || {},
        createdAt: new Date().toISOString(),
    });
}

export async function updateUser(userId, data) {
    await dbUpdate(`users/${userId}`, data);
}

// ─── Products ───

export async function getAllProducts() {
    const data = await dbGet("products");
    if (!data) return [];
    return Object.entries(data).map(([id, val]) => ({ id, ...val }));
}

export async function getProduct(productId) {
    const data = await dbGet(`products/${productId}`);
    return data ? { id: productId, ...data } : null;
}

export async function createProduct(data) {
    const id = await dbPush("products", {
        ...data,
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    return id;
}

export async function updateProduct(productId, data) {
    await dbUpdate(`products/${productId}`, {
        ...data,
        updatedAt: new Date().toISOString(),
    });
}

export async function deleteProduct(productId) {
    await dbRemove(`products/${productId}`);
}

export async function getProductsByStore(storeId) {
    const allProducts = await getAllProducts();
    return allProducts.filter((p) => p.storeId === storeId);
}

// ─── Stores ───

export async function getAllStores() {
    const data = await dbGet("stores");
    if (!data) return [];
    return Object.entries(data).map(([id, val]) => ({ id, ...val }));
}

export async function getStore(storeId) {
    const data = await dbGet(`stores/${storeId}`);
    return data ? { id: storeId, ...data } : null;
}

export async function getStoreByUserId(userId) {
    const stores = await getAllStores();
    return stores.find((s) => s.userId === userId) || null;
}

export async function getStoreByUsername(username) {
    const stores = await getAllStores();
    return stores.find((s) => s.username === username) || null;
}

export async function createStore(data) {
    const id = await dbPush("stores", {
        ...data,
        status: "pending",
        isActive: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    return id;
}

export async function updateStore(storeId, data) {
    await dbUpdate(`stores/${storeId}`, {
        ...data,
        updatedAt: new Date().toISOString(),
    });
}

// ─── Orders ───

export async function getAllOrders() {
    const data = await dbGet("orders");
    if (!data) return [];
    return Object.entries(data).map(([id, val]) => ({ id, ...val }));
}

export async function getOrdersByUser(userId) {
    const orders = await getAllOrders();
    return orders.filter((o) => o.userId === userId);
}

export async function getOrdersByStore(storeId) {
    const orders = await getAllOrders();
    return orders.filter((o) => o.storeId === storeId);
}

export async function createOrder(data) {
    const id = await dbPush("orders", {
        ...data,
        status: "ORDER_PLACED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    return id;
}

export async function updateOrder(orderId, data) {
    await dbUpdate(`orders/${orderId}`, {
        ...data,
        updatedAt: new Date().toISOString(),
    });
}

// ─── Ratings ───

export async function getAllRatings() {
    const data = await dbGet("ratings");
    if (!data) return [];
    return Object.entries(data).map(([id, val]) => ({ id, ...val }));
}

export async function createRating(data) {
    const id = await dbPush("ratings", {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });

    // Also push this rating to the product's embedded rating array
    try {
        const product = await getProduct(data.productId);
        if (product) {
            const user = await getUser(data.userId);
            const currentRatings = product.rating || [];
            
            const newEmbeddedRating = {
                rating: data.rating,
                review: data.review,
                createdAt: new Date().toISOString(),
                user: {
                    name: user?.name || "Anonymous",
                    email: user?.email || "",
                    image: user?.image || ""
                }
            };
            
            await updateProduct(data.productId, {
                rating: [...currentRatings, newEmbeddedRating]
            });
        }
    } catch (e) {
        console.error("Failed to update product embedded rating", e);
    }

    return id;
}

// ─── Addresses ───

export async function getAddressesByUser(userId) {
    const data = await dbGet("addresses");
    if (!data) return [];
    const all = Object.entries(data).map(([id, val]) => ({ id, ...val }));
    return all.filter((a) => a.userId === userId);
}

export async function createAddress(data) {
    const id = await dbPush("addresses", {
        ...data,
        createdAt: new Date().toISOString(),
    });
    return id;
}

// ─── Coupons ───

export async function getAllCoupons() {
    const data = await dbGet("coupons");
    if (!data) return [];
    return Object.entries(data).map(([code, val]) => ({ code, ...val }));
}

export async function getCoupon(code) {
    const data = await dbGet(`coupons/${code}`);
    return data ? { code, ...data } : null;
}

export async function createCoupon(data) {
    await dbSet(`coupons/${data.code}`, {
        description: data.description,
        discount: data.discount,
        forNewUser: data.forNewUser || false,
        forMember: data.forMember || false,
        isPublic: data.isPublic || false,
        storeId: data.storeId || null,
        productId: data.productId || null,
        expiresAt: data.expiresAt,
        createdAt: new Date().toISOString(),
    });
}

export async function deleteCoupon(code) {
    await dbRemove(`coupons/${code}`);
}
