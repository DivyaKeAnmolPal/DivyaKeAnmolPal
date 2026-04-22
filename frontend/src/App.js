import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from "@/pages/HomePage";
import InvitePage from "@/pages/InvitePage";
import GuestsPage from "@/pages/GuestsPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/invite/:guestSlug" element={<InvitePage />} />
                    <Route path="/invite" element={<InvitePage />} />
                    <Route path="/guests" element={<GuestsPage />} />
                </Routes>
            </BrowserRouter>
            <Toaster position="bottom-center" richColors />
        </div>
    );
}

export default App;
