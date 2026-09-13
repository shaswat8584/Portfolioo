import Navbar from "./components/Navbar";
import ShaderBackground from "./components/ShaderBackground";
import Hero from "./components/Hero";

function App() {
  return (
    <main className="min-h-screen bg-[#171717] p-4">
      <div
        className="
          relative
          min-h-[calc(100vh-2rem)]
          overflow-hidden
          rounded-[32px]
          border
          border-black/30
          bg-[#080808]
        "
      >
        {/* WebGL Background */}
        <ShaderBackground />

        {/* Website Content */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
        </div>
      </div>
    </main>
  );
}

export default App;
