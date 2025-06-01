import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "@/app/not-found";
import Home from "@/frontend/pages/home";
import Layout from "./layout.tsx";
import Projects from "./pages/projects/index.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
