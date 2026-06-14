import StoreLayout from "@/components/store/StoreLayout";
import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "GoCart. - Store Dashboard",
  description: "GoCart. - Store Dashboard",
};

export default async function RootStoreLayout({ children }) {
  const { userId } = await auth();

  // کاربر لاگین نکرده
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SignIn />
      </div>
    );
  }

  // بررسی وجود فروشگاه برای کاربر
  const store = await prisma.store.findUnique({
    where: {
      userId,
    },
  });

  // اگر فروشگاه ندارد
  if (!store) {
    redirect("/create-store");
  }

  return (
    <StoreLayout>
      {children}
    </StoreLayout>
  );
}