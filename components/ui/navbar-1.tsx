"use client" 

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Gift } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-6 px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-md rounded-full shadow-lg w-full max-w-5xl relative z-10 border border-border/50">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Gift className="w-6 h-6 text-primary" />
            </motion.div>
            <span className="font-serif text-xl font-bold tracking-tight text-foreground hidden sm:block">
              Love In Box
            </span>
          </Link>
        </div>
        
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={item.href} className="text-sm text-foreground/80 hover:text-primary transition-colors font-medium">
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

        <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            {/* Desktop CTA Button */}
            <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            >
            <Link
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2 text-sm text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-colors"
            >
                Get Started
            </Link>
            </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <motion.button className="flex items-center p-2" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
            <Menu className="h-6 w-6 text-foreground" />
            </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 pt-24 px-6 md:hidden pointer-events-auto"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-foreground" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Link href={item.href} className="text-lg text-foreground font-medium" onClick={toggleMenu}>
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-colors "
                  onClick={toggleMenu}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Navbar1 }
