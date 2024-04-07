
import { BookProvider } from "@/providers/book/index";
import { BookRequestProvider } from "@/providers/bookrequest";
import { LoanProvider } from "@/providers/loan";
import dynamic from "next/dynamic"; 
import { Suspense } from "react";

export const metadata = {
  title: 'Libhub',
  description: 'Generated by Next.js',
}

// const withAuth 

const DynamicRootLayout = dynamic(() => import('./layout'), { ssr: false });


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  //const AuthenticatedComponent = RequireAuth(DynamicRootLayout);
  return (
    

    // ...

   


    <LoanProvider>
      <BookRequestProvider>
        <BookProvider>
          <html lang="en">
            <head>
              <meta charSet="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>{metadata.title}</title>
              <link rel="icon" href="/logo.png" />
              <meta name="description" content={metadata.description} />
            </head>
            <body style={{ margin: 0 }}>{children}</body>
          </html>
          
        </BookProvider>
      </BookRequestProvider>
    </LoanProvider>
  );
}

export default RootLayout;
