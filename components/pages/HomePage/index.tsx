import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import FeatureCard from "@atoms/FeatureCard";
import { ArrowRight, BookOpen, Globe, Users } from "lucide-react";
import Link from "next/link";

const HomePage = async () => {
  const session = await auth();

  return (
    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-heading">
            Bloom in Your Language Journey
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl sm:text-2xl">
            Unlock a world of languages with Lingo Bloom. Immerse yourself in
            interactive lessons, connect with native speakers, and watch your
            linguistic skills flourish.
          </p>
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white"
            >
              <Link href={session ? "/test-creation" : "/login"}>
                Start Learning Now! <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FeatureCard
            icon={<BookOpen className="h-10 w-10" />}
            title="Interactive Lessons"
            description="Engage with our AI-powered lessons tailored to your learning style."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10" />}
            title="Community Practice"
            description="Connect with language partners and practice in real-world scenarios."
          />
          <FeatureCard
            icon={<Globe className="h-10 w-10" />}
            title="Cultural Immersion"
            description="Dive into the cultures behind the languages you're learning."
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
