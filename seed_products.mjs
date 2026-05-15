import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push, get, child } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBvqF5XaEZr3ZtzmBwX8E4D038NVXHyTUs",
    authDomain: "marketly-d5552.firebaseapp.com",
    databaseURL: "https://marketly-d5552-default-rtdb.firebaseio.com",
    projectId: "marketly-d5552",
    storageBucket: "marketly-d5552.firebasestorage.app",
    messagingSenderId: "49581192926",
    appId: "1:49581192926:web:dd6ccfbb26721edabc344f",
    measurementId: "G-0KWR18Z6KT"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const seedProductsOnly = async () => {
    try {
        const uid = "BAXi6xCfF9guiE4TitI9KIdiyio2"; // shop@gmail.com UID

        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `stores`));
        let storeId = null;
        
        if (snapshot.exists()) {
            const stores = snapshot.val();
            const storeEntry = Object.entries(stores).find(([id, s]) => s.userId === uid);
            if (storeEntry) storeId = storeEntry[0];
        }

        if (!storeId) {
             console.log("Creating new store node...");
             const storesRef = ref(db, 'stores');
             const newStoreRef = push(storesRef);
             storeId = newStoreRef.key;
             await set(newStoreRef, {
                 userId: uid,
                 name: "Demo Shop",
                 username: "demo_shop",
                 description: "This is a dummy store created for demonstration purposes.",
                 email: "shop@gmail.com",
                 contact: "1234567890",
                 address: "123 Demo St, Demo City",
                 logo: "https://ui-avatars.com/api/?name=DemoShop&background=random",
                 status: "approved",
                 isActive: true,
                 createdAt: new Date().toISOString(),
                 updatedAt: new Date().toISOString(),
             });
        }
        
        console.log("Using store with ID:", storeId);

        // create products
        const products = [
            {
                name: "Sony WH-1000XM5 Headphones",
                description: "Industry leading noise canceling headphones.",
                mrp: 399,
                price: 349,
                category: "Electronics",
                images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80"],
                storeId: storeId,
                inStock: true,
            },
            {
                name: "Apple AirPods Pro",
                description: "Active Noise Cancellation for immersive sound.",
                mrp: 249,
                price: 199,
                category: "Electronics",
                images: ["https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&q=80"],
                storeId: storeId,
                inStock: true,
            },
            {
                name: "Minimalist Desk Clock",
                description: "A beautiful minimalist clock for your desk.",
                mrp: 49,
                price: 29,
                category: "Home & Kitchen",
                images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80"],
                storeId: storeId,
                inStock: true,
            }
        ];

        for (const p of products) {
            const prodRef = push(ref(db, 'products'));
            await set(prodRef, {
                ...p,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }
        console.log("Seeded products successfully!");
        process.exit(0);

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

seedProductsOnly();
