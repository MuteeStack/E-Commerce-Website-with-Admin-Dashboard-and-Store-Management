import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "Marketly - Store Dashboard",
    description: "Marketly - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
