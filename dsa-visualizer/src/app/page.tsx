import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-5xl font-bold mb-8 text-black dark:text-white">
              Visualize. Simplify. Master.
            </h2>
            <p
              className="text-gray-400 text-2xl mb-12"
              style={{ fontFamily: "Young Serif" }}
            >
              "Transforming complex data structures into captivating visual
              journeys—experience DSA like never before!"
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard">
                <button className="bg-[#68B7A4] text-white px-8 py-3 rounded-full hover:bg-[#5aa090] transition-colors">
                  EXPLORE
                </button>
              </Link>
              <button className="text-gray-500 flex items-center gap-2 border px-8 py-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Image
                  src="/assets/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex gap-4 items-center border-b-2 border-gray-300 dark:border-gray-700 pb-4">
            <div className="w-16 h-16">
              <Image
                src="/assets/speed.svg"
                alt="Fast"
                width={60}
                height={60}
                className="dark:invert"
              />
            </div>
            <div>
              <h3 className="text-black dark:text-white text-xl font-bold mb-2">
                Fastest possible
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our algorithms are as fast as possible, there is no way someone
                did it better
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start border-b-2 border-gray-300 dark:border-gray-700 pb-4">
            <div className="w-16 h-16">
              <Image
                src="/assets/easybuild.svg"
                alt="Accessible"
                width={45}
                height={45}
                className="dark:invert"
              />
            </div>
            <div>
              <h3 className="text-black dark:text-white text-xl font-bold mb-2">
                Easy and accessible
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each sorting algorithm has a clear description to help you
                understand the concept
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-16 h-16">
              <Image
                src="/assets/mobile-friendly.svg"
                alt="Mobile"
                width={60}
                height={60}
                className="dark:invert"
              />
            </div>
            <div>
              <h3 className="text-black dark:text-white text-xl font-bold mb-2">
                Mobile friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can use our website comfortably on various devices,
                including phones and tablets
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
          <p className="text-2xl text-gray-500 dark:text-gray-400">
            Short movie or GIF about sorting algorithms
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-[#68B7A4] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 text-white">
            <div className="md:w-2/3">
              <blockquote className="text-xl mb-4">
                "I have learnt so much using this website! I recommend it to
                everyone that starts their journey with algorithms and web
                development!"
              </blockquote>
              <div>
                <p className="font-semibold">
                  Talyah Kodumal, CTO and Co-Founder
                </p>
                <p className="opacity-75">airly</p>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-end">
              <div className="relative">
                <div className="w-48 h-auto rounded-full overflow-hidden">
                  <Image
                    src="/assets/testimonial.png"
                    alt="Testimonial"
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>
                <div>
                  <Image
                    src="/assets/testimonial-1.png"
                    alt="Quote"
                    width={24}
                    height={24}
                    className="absolute -bottom-4 bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Theme Toggle */}
      <ThemeToggle />
    </main>
  );
}
