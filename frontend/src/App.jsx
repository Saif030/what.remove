import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PageRoutes from "./routes/PageRoutes";

const App = () => {
  return (
    <div className="sm:w-7xl bg-gray-100 w-full mx-auto h-screen max-h-screen">
      <NavBar />
      <PageRoutes />
      <Footer />
    </div>
  )
}

export default App;