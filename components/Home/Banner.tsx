import Link from "next/link";
// Assets
import { Instagram } from "lucide-react";
// Components
import { Button } from "@/components/ui/button";

export const Banner = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&auto=format&fit=crop&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-lg">
          Sin excusas
        </h1>
        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="bg-white text-indigo-700 hover:bg-gray-100 hover:scale-105 transform transition-transform duration-200"
          >
            <Link href="https://www.instagram.com/rhinolegacy/" target="_blank">
              Seguinos
              <Instagram className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
