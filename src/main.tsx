import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./app.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#232323",
            color: "#FFFFFF",
            paddingBlock: "15px",
            paddingInline: "15px",
          },
          duration: 4000,
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);
