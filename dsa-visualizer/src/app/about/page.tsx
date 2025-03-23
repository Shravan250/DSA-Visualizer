import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust the import if your Button component is located elsewhere

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col justify-center items-center">
        <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
          <Card className="border-none shadow-none mb-0">
            {/* Main Title */}
            <CardTitle className="text-4xl font-bold opacity-70">
              <h1>My Name is Shravan...</h1>
            </CardTitle>

            {/* Personal Touch / Introduction */}
            <CardContent className="px-0 text-lg text-gray-500 text-justify leading-relaxed tracking-wide">
              I first discovered the magic of Data Structures &amp; Algorithms
              when I was tinkering with small coding projects, eager to find
              elegant solutions to everyday problems. From that moment, I fell
              in love with the artistry behind structuring data and optimizing
              logic.
            </CardContent>

            {/* Subheading: Why DSA? */}
            <CardContent className="px-0 text-lg text-gray-500 text-justify leading-relaxed tracking-wide mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Why DSA?
              </h2>
              In the world of data structures and algorithms , even the neatest
              code can surprise you—like a linked list that circles back or a{" "}
              tree that branches in unexpected ways. My DSA Visualizer is a
              stage where arrays perform their dance and stacks keep order, even
              when a rogue pointer decides to play hide and seek.
            </CardContent>

            {/* Programming Humor & CTA */}
            <CardContent className="px-0 text-lg text-gray-500 text-justify leading-relaxed tracking-wide mt-4">
              Programming humor finds its home in the chaos of recursive
              functions and nested loops. Imagine an algorithm so deep that its
              base case is like a hidden Easter egg—just waiting for that “aha!”
              moment. My journey through the world of DSA has been a delightful
              blend of meticulous logic and unexpected laughs, where even the
              most stubborn error messages become part of a playful narrative.
              It’s all about embracing the delightful madness of code, one
              visualization at a time.
            </CardContent>

            {/* Call to Action */}
            <CardContent className="px-0 mt-6">
              <Link href="/" passHref>
                <Button className="bg-[#68B7A4] text-white hover:bg-[#56a491]">
                  Try the DSA Visualizer
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Illustration / Image */}
          <Card className="border-none shadow-none mb-0 flex items-center justify-center">
            <Image
              src="/assets/working_late.svg"
              alt="Illustration of working late"
              width={500}
              height={500}
            />
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
