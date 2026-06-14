import AdminLayout from "@/components/admin/AdminLayout";
import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import axios from "axios";
export default async function RootAdminLayout({ children }) {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SignIn />
      </div>
    );
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}