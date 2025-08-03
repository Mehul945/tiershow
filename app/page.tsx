"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star,
  Shield,
  Crown,
  Gem,
  Lock,
  Zap,
  Sparkles,
  Menu,
  X,
  Calendar,
  Users,
  Award
} from 'lucide-react';
import { useUser } from '@supabase/auth-helpers-react';
import { LogoutButton } from "@/components/logout-button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import TierPopup from "@/components/TierPopup"
import EventsGrid from '@/components/EventGrid';


const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>
  );
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useUser()
  return (
    <nav className="relative z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Star className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              EventTier
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
              Features
            </Link>
            <Link href="#tiers" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
              Tiers
            </Link>
            <Link href="#events" className="text-gray-300 hover:text-purple-400 transition-colors duration-300">
              Events
            </Link>
            {user ? <LogoutButton /> : <div className="flex gap-2">
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton showName />
              </SignedIn>
            </div>}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-4 py-6 space-y-4">
              <Link href="#features" className="block text-gray-300 hover:text-purple-400 transition-colors">
                Features
              </Link>
              <Link href="#tiers" className="block text-gray-300 hover:text-purple-400 transition-colors">
                Tiers
              </Link>
              <Link href="#events" className="block text-gray-300 hover:text-purple-400 transition-colors">
                Events
              </Link>
              <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full font-semibold">

              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <FloatingShapes />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Exclusive Events
            </span>
            <br />
            <span className="text-white">For Every Tier</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover premium events tailored to your membership level. From free community gatherings to platinum VIP experiences that will transform your networking game.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
              <span className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Browse Events Now</span>
              </span>
            </button>
            <button className="backdrop-blur-xl bg-white/10 border border-white/20 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Tier Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { tier: 'Free', icon: Shield, gradient: 'from-gray-400 to-gray-600', desc: 'Community events' },
              { tier: 'Silver', icon: Star, gradient: 'from-gray-300 to-gray-500', desc: 'Premium access' },
              { tier: 'Gold', icon: Crown, gradient: 'from-yellow-400 to-yellow-600', desc: 'VIP experiences' },
              { tier: 'Platinum', icon: Gem, gradient: 'from-purple-400 to-purple-600', desc: 'Ultra exclusive' }
            ].map((item, index) => (
              <div
                key={item.tier}
                className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.tier}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Lock,
      title: 'Secure Access',
      description: 'Advanced authentication ensures only tier-appropriate access to exclusive events with enterprise-grade security.',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Instant Updates',
      description: 'Real-time event updates and notifications based on your membership level, never miss an opportunity.',
      gradient: 'from-green-500 to-blue-600'
    },
    {
      icon: Sparkles,
      title: 'Premium Experience',
      description: 'Curated events designed to provide exceptional value and networking opportunities at every membership tier.',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <section id="features" className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Why Choose EventTier?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience events like never before with our revolutionary tier-based access system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-4"
            >
              <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-300`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">{feature.title}</h3>
              <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { number: '10K+', label: 'Active Members', icon: Users },
    { number: '500+', label: 'Premium Events', icon: Calendar },
    { number: '98%', label: 'Satisfaction Rate', icon: Award }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-purple-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Ready to Experience{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Exclusive Events
            </span>?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of members already enjoying tier-based exclusive access to premium events and networking opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
              Start Free Today
            </button>
            <button className="backdrop-blur-xl bg-white/10 border border-white/20 px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative backdrop-blur-xl bg-white/5 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                EventTier
              </span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Revolutionizing event access with tier-based memberships. Experience events tailored to your level and unlock premium networking opportunities.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Product</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">API</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="#" className="hover:text-purple-400 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 EventTier. All rights reserved. Built for Psypher AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      <Navigation />
      <SignedIn>
        <TierPopup />
        <EventsGrid />
      </SignedIn>
      <SignedOut>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </SignedOut>
      <Footer />
    </div>
  );
}