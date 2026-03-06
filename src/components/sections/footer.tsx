"use client";

import React from 'react';
import Image from 'next/image';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Phone, Mail, ShieldCheck, Globe, Zap, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const quickLinks = [
    { name: 'Solutions', href: '#' },
    { name: 'Enterprise', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Careers', href: '#' },
  ];

  const contactInfo = [
    { icon: <Phone size={16} className="text-primary" />, label: '+91 800 210 8080', href: 'tel:+918002108080' },
    { icon: <Mail size={16} className="text-primary" />, label: 'hello@madalgos.com', href: 'mailto:hello@madalgos.com' },
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, label: 'LinkedIn', href: '#' },
    { icon: <Twitter size={20} />, label: 'Twitter', href: '#' },
    { icon: <Youtube size={20} />, label: 'Youtube', href: '#' },
  ];

  return (
    <footer className="w-full bg-background px-6 md:px-12 py-32 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-10 group cursor-default">
              <Image
                src="/navbar_logo2_trans.png"
                alt="MAD Algos logo"
                width={180}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm opacity-60">
              Architecting the future of B2B talent ecosystems through high-fidelity AI infrastructure and elite Silicon Valley mentorship.
            </p>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-10 opacity-40">Platform</h3>
            <ul className="flex flex-col gap-5">
              {['Enterprise Hubs', 'AI Foundry', 'Solutions', 'Insights', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-500 text-sm font-bold uppercase tracking-widest">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-10 opacity-40">Contact HQ</h3>
            <ul className="flex flex-col gap-6">
              {contactInfo.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="flex items-center gap-4 text-gray-400 hover:text-primary transition-all duration-500 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/40 group-hover:text-primary transition-all">
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-10 opacity-40">Connect</h3>
            <div className="flex gap-4 mb-10">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="flex items-center justify-center w-12 h-12 rounded-[1.25rem] bg-white/5 border border-white/10 text-gray-400 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-500"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
               <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-4 uppercase">System Status</p>
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#2dd4bf]" />
                  <span className="text-xs font-bold text-white tracking-tight uppercase">All Protocols Operational</span>
               </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-16" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3 text-muted-foreground">
            <ShieldCheck size={16} className="text-primary opacity-60" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
              © 2026 MAD ALGOS TECHNOLOGIES. BUILT FOR ENTERPRISE SCALE.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {['Privacy', 'Terms', 'Security', 'Compliance'].map((link) => (
              <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
