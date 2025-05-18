import LandingPage from "@/components/landing/LandingPage";
import NavBar from "@/components/navbar/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" w-full">
      <NavBar />
      <LandingPage />
      {/* Footer Section */}
      <footer className="w-full text-center text-muted-foreground text-sm pt-12 border-t mt-16">
        <p>&copy; {new Date().getFullYear()} ChatWave. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="#contact" className="hover:underline">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}
