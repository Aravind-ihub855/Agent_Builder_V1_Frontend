import type { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider, QueryProvider } from "@/app/providers";

export const metadata: Metadata = {
    title: "Platform | Authentication",
    description: "Secure authentication for your platform",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">
                <QueryProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </QueryProvider>
            </body>
        </html>
    );
}

