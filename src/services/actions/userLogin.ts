//"use server";  use server add korle eta server e render hoy,
// use server add korle refresh token browser e set korte onek kahini kora lage tai, use server use korbo na. tahole onek simply ei kaj ta kora jabe
import { FieldValues } from "react-hook-form";
export const userLogin = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      //cache: "no-store",
      credentials: "include",
    }
  );
  const userInfo = await res.json();
  return userInfo;
};
