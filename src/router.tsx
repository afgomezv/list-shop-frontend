import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ListView from "./views/ListView";
import AuthView from "./views/AuthView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthView />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<ListView />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
