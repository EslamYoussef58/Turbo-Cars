import { AUTH_COOKIE_NAME } from "@/constants/server";
import { createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { account } = await createSessionClient();
    const cookieStore = cookies();
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

    // إذا كان هناك جلسة نشطة، حاول إنهاؤها
    if (authCookie?.value) {
      try {
        await account.deleteSession("current");
      } catch (sessionError) {
        console.warn("Failed to delete session:", sessionError);
        // يمكن الاستمرار حتى لو فشل حذف الجلسة
      }
    }

    // احذف الـ cookie سواء كانت الجلسة موجودة أم لا
    cookieStore.delete(AUTH_COOKIE_NAME);

    return NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error("Logout error:", error);
    
    // استخدم 400 أو 401 بدلاً من 500 لأخطاء العميل
    const statusCode = error?.code === 401 ? 401 : 400;
    
    return NextResponse.json(
      {
        error: error?.message || "Logout failed",
      },
      {
        status: statusCode,
      }
    );
  }
};