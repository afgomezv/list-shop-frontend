import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ListView from "./views/ListView";
import AuthView from "./views/AuthView";
import CreateListView from "./views/CreateListView";
import EditListView from "./views/EditListView";
import ListDetailView from "./views/ListDetailView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthView />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<ListView />} index />
          <Route path="/lists/create" element={<CreateListView />} index />
          <Route path="/lists/:listId" element={<ListDetailView />} index />
          <Route path="/lists/:listId/edit" element={<EditListView />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
