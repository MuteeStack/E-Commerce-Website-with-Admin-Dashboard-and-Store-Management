import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "Marketly - Admin",
    description: "Marketly - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
