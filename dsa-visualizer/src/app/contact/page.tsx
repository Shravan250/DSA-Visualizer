import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col justify-center items-center py-16">
        <section className="max-w-5xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
              Have questions about DSA Visualizer? Want to collaborate or share
              feedback? I'd love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <Card className="border-none shadow-none">
              <CardContent className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#68B7A4] rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 dark:text-white">
                      Email
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      shravan.bobade.tech@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#68B7A4] rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 dark:text-white">
                      Phone
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +91 7776000344
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-[#68B7A4] rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 dark:text-white">
                      Location
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Pune, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">
                    Follow Me
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#68B7A4] transition-colors dark:text-gray-300"
                    >
                      <Link
                        href="https://github.com/Shravan250"
                        target="_blank"
                      >
                        <FaGithub className="h-6 w-6 text-black dark:text-white" />
                      </Link>
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#68B7A4] transition-colors dark:text-gray-300"
                    >
                      <Link
                        href="https://www.linkedin.com/in/shravan-bobade"
                        target="_blank"
                      >
                        <FaLinkedin className="h-6 w-6 text-black dark:text-white" />
                      </Link>
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#68B7A4] transition-colors dark:text-gray-300"
                    >
                      <Link
                        href="https://medium.com/@shravan.bobade.tech"
                        target="_blank"
                      >
                        <FaMedium className="h-6 w-6 text-black dark:text-white" />
                      </Link>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="border-none shadow-none">
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium text-gray-700 dark:text-white"
                      >
                        First Name
                      </label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="lastName"
                        className="text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can I help?" />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message here..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#68B7A4] text-white hover:bg-[#56a491] flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
