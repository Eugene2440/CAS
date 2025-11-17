import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown, Home, Users, BookOpen, UserPlus, Download, Image, Mail, Award, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Executive Council", href: "/executive", icon: Users },
  { name: "Chapters", href: "/chapters", icon: BookOpen },
  { name: "Membership", href: "/membership", icon: UserPlus },
  { name: "Downloads", href: "/downloads", icon: Download },
  { name: "Gallery", href: "/gallery", icon: Image },
  { name: "Contact Us", href: "/contact", icon: Mail },
  { name: "Professional Registration", href: "/professional-reg", icon: Award },
];

const chapterLinks = [
  { name: "Quantity Surveying", href: "/chapters#qs-chapter", icon: Building2 },
  { name: "Construction Management", href: "/chapters#cm-chapter", icon: Users },
  { name: "Building Construction Technology", href: "/chapters#bct-chapter", icon: Building2 },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return location.hash === href.substring(1);
    }
    return location.pathname === href;
  };

  return (
    <header className={cn(
      "sticky top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-md py-4"
    )}>
      <div className="csa-container flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img 
            src="/lovable-uploads/c8c68b22-285b-430f-a653-19099c309574.png" 
            alt="CSA-TUK Logo" 
            className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
          />
          <span className="ml-2 text-lg font-bold text-csa-navy hidden sm:block transition-colors duration-300 group-hover:text-csa-orange">CSA-TUK</span>
        </Link>

        <nav className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="space-x-1">
              {navLinks.map((link) => 
                link.name === "Chapters" ? (
                  <NavigationMenuItem key={link.name}>
                    <Link
                      to={link.href}
                      className={cn(
                        "nav-link flex items-center px-4 py-2",
                        isActive(link.href) && "active"
                      )}
                    >
                      <link.icon className="h-4 w-4 mr-2" />
                      {link.name}
                    </Link>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.name}>
                    <Link
                      to={link.href}
                      className={cn(
                        "nav-link flex items-center px-4 py-2",
                        isActive(link.href) && "active"
                      )}
                    >
                      <link.icon className="h-4 w-4 mr-2" />
                      {link.name}
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md text-csa-navy hover:text-csa-orange transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="csa-container py-4">
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <li key={link.name} className="transform transition-transform duration-300 hover:translate-x-2">
                  {link.name === "Chapters" ? (
                    <Link
                      to={link.href}
                      className={cn(
                        "nav-link flex items-center",
                        isActive(link.href) && "active"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <link.icon className="h-4 w-4 mr-2" />
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      to={link.href}
                      className={cn(
                        "nav-link flex items-center",
                        isActive(link.href) && "active"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <link.icon className="h-4 w-4 mr-2" />
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
