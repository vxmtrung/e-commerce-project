"use client";
import Metadata from "@/components/meta_data";
import ReduxProvider from "@/redux/provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import CustomerLayout from "../../components/customer_layout";

export default function CustomerRootLayout({ children }) {
  const isLoggedIn = true;

  return (
    <>
      <Metadata seoTitle="Customer" seoDescription="Customer Panel" />
      <ReduxProvider>
        <AntdRegistry>
          <CustomerLayout isLoggedIn={isLoggedIn}>{children}</CustomerLayout>
        </AntdRegistry>
      </ReduxProvider>
    </>
  );
}
