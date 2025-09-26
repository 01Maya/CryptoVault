"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Wallet,
  Shield,
  Smartphone,
  Coins,
  Eye,
  Lock,
  ArrowUp,
  Star,
  Download,
  Play,
  Github,
  Twitter,
  MessageCircle,
  Send,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Zap,
  Users,
  Menu,
  X,
  ArrowUpCircle,
} from "lucide-react";

/**
 * Single-file responsive Crypto Wallet Landing Page
 * - Drop into app/page.tsx or pages/index.tsx
 * - Requires Tailwind CSS + framer-motion + lucide-react + next/image
 *
 * Small local Button and Card components are defined so this single file is self-contained.
 */

/* ---------- tiny local UI primitives (self-contained) ---------- */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

function Button({ variant = "solid", size = "md", className = "", children, ...rest }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full font-medium focus:outline-none transition";
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variants: Record<string, string> = {
    solid: "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg",
    outline: "border border-purple-500 text-purple-200 bg-transparent",
    ghost: "bg-transparent text-slate-300",
  };

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl overflow-hidden ${className}`}>{children}</div>;
}
function CardContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

/* ---------- main page component ---------- */

export default function CryptoVaultLandingPage() {
  // Navbar state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "Demo", id: "demo" },
    { name: "Security", id: "security" },
    { name: "Interactive", id: "interactive" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Download", id: "download" },
  ];

  // scroll & progress
  const { scrollY } = useScroll();
  const progressX = useTransform(scrollY, [0, 4000], [0, 1]);
  const progressSpring = useSpring(progressX, { stiffness: 100, damping: 30 });

  // Hero parallax
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // other states
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // sample data
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "DeFi Trader",
      image: "/images/testimonial-1.png",
      rating: 5,
      text: "The most intuitive crypto wallet I've ever used. The security features give me complete peace of mind.",
    },
    {
      name: "Marcus Rodriguez",
      role: "NFT Collector",
      image: "/images/testimonial-2.png",
      rating: 5,
      text: "Love the NFT viewer and multi-chain support. Managing my portfolio has never been easier.",
    },
    {
      name: "Alex Kim",
      role: "Crypto Enthusiast",
      image: "/images/testimonial-3.png",
      rating: 5,
      text: "Open-source, self-custodial, and beautiful design. Everything I wanted in a crypto wallet.",
    },
  ];

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-Time Portfolio",
      description: "Track your assets with live price updates and detailed analytics",
      gradient: "from-cyan-500 to-blue-500",
      shadowColor: "shadow-cyan-500/25",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "NFT Viewer",
      description: "Browse and manage your NFT collection with stunning visuals",
      gradient: "from-purple-500 to-pink-500",
      shadowColor: "shadow-purple-500/25",
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "Multi-Chain Wallet",
      description: "Support for Ethereum, Bitcoin, Solana, and 50+ blockchains",
      gradient: "from-green-500 to-teal-500",
      shadowColor: "shadow-green-500/25",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "DEX Integration",
      description: "Swap tokens directly with the best rates across DEXs",
      gradient: "from-yellow-500 to-orange-500",
      shadowColor: "shadow-yellow-500/25",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Biometric Security",
      description: "Face ID and fingerprint authentication for maximum security",
      gradient: "from-red-500 to-pink-500",
      shadowColor: "shadow-red-500/25",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Social Trading",
      description: "Follow top traders and copy their successful strategies",
      gradient: "from-indigo-500 to-purple-500",
      shadowColor: "shadow-indigo-500/25",
    },
  ];

  const cryptoPrices = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "90,360.50",
      change: "+3.08%",
      isPositive: true,
      icon: "₿",
      color: "from-orange-500 to-yellow-500",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "3,240.75",
      change: "+1.24%",
      isPositive: true,
      icon: "Ξ",
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "245.80",
      change: "-0.85%",
      isPositive: false,
      icon: "◎",
      color: "from-purple-500 to-pink-500",
    },
  ];

  // security features (fixed string issue)
  const securityItems = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description: "Your keys & transactions are encrypted and never leave your device.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Multi-Sig Support",
      description: "Require multiple approvals for high-value transactions.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Open-Source Audits",
      description: "Frequent external audits and a transparent security model.",
      color: "from-green-500 to-teal-500",
    },
  ];

  // auto-rotate testimonials
  useEffect(() => {
    const id = setInterval(() => setCurrentTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  // handle scroll: active section + show scroll top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);

      // find active section by position
      const sections = navItems.map((n) => n.id);
      const offset = 140; // approximate navbar height + buffer
      const scrollPos = window.scrollY + offset;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          setActiveSection(id);
          return;
        }
      }

      // fallback
      if (window.scrollY < 200) setActiveSection("home");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navbarHeight = 80; // fixed header height assumption
    const top = el.offsetTop - navbarHeight + 8;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* ---------- UI rendering ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950 text-white overflow-x-hidden relative">
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 z-50 origin-left"
        style={{ scaleX: progressSpring }}
      />

      {/* Background gradients / orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 left-8 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-16 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
      </div>

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-indigo-950/30 border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              CryptoVault
            </button>
          </div>

          {/* desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-cyan-400 ${
                  activeSection === item.id ? "text-cyan-400" : "text-slate-300"
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* right controls: desktop CTA & mobile toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button size="md" className="px-6 py-2">
                Get Started
              </Button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen((s) => !s)} aria-label="Toggle menu" className="p-2">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden absolute left-0 right-0 bg-indigo-950/95 backdrop-blur-md border-t border-purple-500/20 z-40"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-3 text-lg ${activeSection === item.id ? "text-cyan-400" : "text-slate-300"}`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="mt-4">
                  <Button className="w-full justify-center">Get Started</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-600/20 to-pink-500/10" />

        {/* particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => {
            const size = Math.round(Math.random() * 12 + 6);
            const left = Math.round(Math.random() * 100);
            const top = Math.round(Math.random() * 100);
            const delay = Math.random() * 3;
            const gradient =
              i % 4 === 0
                ? "linear-gradient(45deg, #00f5ff, #ff00ff)"
                : i % 4 === 1
                ? "linear-gradient(45deg, #ff00ff, #ffff00)"
                : i % 4 === 2
                ? "linear-gradient(45deg, #00ff00, #00f5ff)"
                : "linear-gradient(45deg, #ffff00, #ff00ff)";
            return (
              <motion.div
                key={i}
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  top: `${top}%`,
                  background: gradient,
                  boxShadow: "0 0 12px currentColor",
                }}
                className="absolute rounded-full"
                animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay }}
              />
            );
          })}
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* left content */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Secure & Safe Crypto Currency</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Make your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Crypto</span>
              <br />
              Transaction effortless
            </h1>

            <p className="text-lg text-slate-300 mb-8 max-w-2xl">
              Buy and sell 100+ cryptocurrencies with 20+ fiat currencies using bank transfers or cards — secure,
              fast, and intuitive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="text-lg px-8 py-4" onClick={() => scrollToSection("download")}>
                <Play className="w-5 h-5 mr-2" />
                How It Works
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg" onClick={() => scrollToSection("demo")}>
                White Papers
              </Button>
            </div>

            {/* crypto cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cryptoPrices.map((crypto, index) => (
                <motion.div key={crypto.symbol} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}>
                  <Card className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${crypto.color} flex items-center justify-center text-white font-bold text-sm`}>
                          {crypto.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-sm">{crypto.name}</div>
                          <div className="text-xs text-slate-400">{crypto.symbol}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-white">${crypto.price}</div>
                        <div className={`text-sm font-medium ${crypto.isPositive ? "text-green-400" : "text-red-400"}`}>{crypto.change}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* right image */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-3xl rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 blur-2xl rounded-full" style={{ animationDelay: "1s" }} />

            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative z-10">
              <Image src="/images/bitcoin-hologram.png" alt="Glowing Bitcoin with Rings" width={500} height={500} className="w-full h-auto max-w-md mx-auto rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/crypto-market-space.png" alt="Crypto Market Space" fill className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/80 to-purple-950/80" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">The Future of Digital Assets</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">Experience the next generation of cryptocurrency management with our cutting-edge platform that combines security, usability, and advanced analytics.</p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/30 to-purple-950/30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Everything You Need</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Manage your crypto portfolio with confidence using our advanced features</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} className="h-full" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10, scale: 1.02 }}>
                <Card className={`bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-sm border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 h-full ${feature.shadowColor}`}>
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} text-white mb-6 shadow-lg ${feature.shadowColor}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-20 bg-gradient-to-r from-purple-950/30 to-indigo-950/30 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.15),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Live Demo</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">See It In Action</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Experience the intuitive interface and powerful features of CryptoVault</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced Portfolio Analytics",
                image: "/images/hero-market-bg.png",
                description: "Comprehensive market analysis with real-time data visualization and advanced trading indicators.",
              },
              {
                title: "Secure Wallet Interface",
                image: "/images/security-3d.png",
                description: "Multi-layered security dashboard with biometric authentication and encrypted transactions.",
              },
              {
                title: "Interactive User Experience",
                image: "/images/user-interaction-dashboard.png",
                description: "Intuitive user interface designed for seamless crypto management and portfolio tracking.",
              },
            ].map((demo, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10, scale: 1.02 }}>
                <Card className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-sm border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-purple-500/25">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image src={demo.image} alt={demo.title} width={400} height={300} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{demo.title}</h3>
                      <p className="text-slate-400 text-sm">{demo.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-20 bg-gradient-to-r from-indigo-950 via-purple-900 to-indigo-950 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-pink-500/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300">About Security</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Bank-Grade Security</h2>
              <p className="text-lg text-slate-300 mb-8">We use multi-layered protection, hardware wallet compatibility, and regular audits to keep your funds safe.</p>

              <div className="space-y-6">
                {securityItems.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                      <p className="text-slate-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full" />
              <Image src="/images/security-laptop-3d.png" alt="3D Security Illustration" width={600} height={500} className="relative z-10 w-full h-auto rounded-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive */}
      <section id="interactive" className="py-20 bg-gradient-to-r from-purple-950/40 to-indigo-950/40 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300">Interactive Experience</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Intuitive Dashboard Design</h2>
              <p className="text-lg text-slate-300 mb-8">Our user-centric design puts you in complete control with an interface that's both powerful and easy to use.</p>

              <div className="space-y-4">
                {["Real-time portfolio tracking", "Advanced charting tools", "One-click trading execution", "Multi-device synchronization"].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
                    <span className="text-slate-300">{s}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full" />
              <Image src="/images/user-dashboard-interaction.png" alt="User Dashboard Interaction" width={600} height={500} className="relative z-10 w-full h-auto rounded-lg" />
            </motion.div>
          </div>
        </div>
      </section>

{/* Testimonials */}
<section id="testimonials" className="py-20 bg-gradient-to-r from-purple-950/30 to-indigo-950/30 relative">
  <div className="container mx-auto px-6 relative z-10 text-center">
    <div className="mb-10">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
        <Users className="w-4 h-4 text-cyan-400" />
        <span className="text-sm text-cyan-300">Testimonials</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Trusted by Thousands</h2>
      <p className="text-lg text-slate-400 max-w-2xl mx-auto">See what our users are saying about CryptoVault</p>
    </div>

    <AnimatePresence mode="wait">
      <motion.div
        key={currentTestimonial}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-sm border border-purple-500/30 shadow-xl shadow-purple-500/20 max-w-3xl mx-auto">
          <CardContent className="p-8 text-center">
            {/* All stars filled using lucide-react */}
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 stroke-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            <p className="text-lg text-slate-300 mb-6 italic">"{testimonials[currentTestimonial].text}"</p>

            {/* Name and Role without image */}
            <div className="text-center">
              <h4 className="font-semibold text-white">{testimonials[currentTestimonial].name}</h4>
              <p className="text-cyan-400">{testimonials[currentTestimonial].role}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>

    <div className="flex items-center justify-between max-w-3xl mx-auto mt-6">
      <Button
        variant="ghost"
        size="sm"
        className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 backdrop-blur-sm border border-purple-500/30 text-slate-400 hover:text-cyan-400"
        onClick={() => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)}
      >
        <ChevronLeft />
      </Button>

      <div className="flex space-x-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentTestimonial(idx)}
            className={`w-3 h-3 rounded-full ${idx === currentTestimonial ? "bg-cyan-400" : "bg-slate-600"}`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 backdrop-blur-sm border border-purple-500/30 text-slate-400 hover:text-cyan-400"
        onClick={() => setCurrentTestimonial((p) => (p + 1) % testimonials.length)}
      >
        <ChevronRight />
      </Button>
    </div>
  </div>
</section>


      {/* Download */}
      <section id="download" className="py-20 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
            <Download className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Download App</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Get Started Today</h2>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">Download CryptoVault and take control of your digital assets with the most secure wallet</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button size="lg" className="bg-black hover:bg-gray-800">
              <Download className="w-5 h-5 mr-2" />
              App Store
            </Button>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Play className="w-5 h-5 mr-2" />
              Google Play
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-950 to-purple-950 border-t border-purple-500/30 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">CryptoVault</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                The most secure and user-friendly crypto wallet for managing your digital assets with complete control and peace of mind.
              </p>
              <div className="flex space-x-4">
                <button className="text-slate-400 hover:text-cyan-400 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 backdrop-blur-sm border border-purple-500/30 p-2 rounded-full"><MessageCircle className="w-5 h-5" /></button>
                <button className="text-slate-400 hover:text-cyan-400 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 backdrop-blur-sm border border-purple-500/30 p-2 rounded-full"><Twitter className="w-5 h-5" /></button>
                <button className="text-slate-400 hover:text-cyan-400 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 backdrop-blur-sm border border-purple-500/30 p-2 rounded-full"><Send className="w-5 h-5" /></button>
                <button className="text-slate-400 hover:text-cyan-400 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 backdrop-blur-sm border border-purple-500/30 p-2 rounded-full"><Github className="w-5 h-5" /></button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { name: "Home", id: "home" },
                  { name: "Features", id: "features" },
                  { name: "Security", id: "security" },
                  { name: "Download", id: "download" },
                ].map((link) => (
                  <button key={link.name} onClick={() => scrollToSection(link.id)} className="block text-slate-400 hover:text-cyan-400 transition-all duration-300 text-left hover:translate-x-2">{link.name}</button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <div className="space-y-2">
                {["Documentation", "API", "White Paper", "Blog", "Help Center"].map((link) => (
                  <button key={link} className="block text-slate-400 hover:text-cyan-400 transition-colors text-left">{link}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-purple-500/30 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} CryptoVault. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <button className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Privacy Policy</button>
              <button className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Terms of Service</button>
              <button className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} onClick={scrollToTop} className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition">
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
