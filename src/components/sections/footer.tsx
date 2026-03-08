"use client";

import React from 'react';
import Image from 'next/image';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Phone, Mail, ShieldCheck, Globe, Zap, Cpu } from 'lucide-react';

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.67l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.889z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
import { motion } from 'framer-motion';

const Footer = () => {
  const quickLinks = [
    { name: 'Solutions', href: '#' },
    { name: 'Enterprise', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Careers', href: '#' },
  ];

  const WHATSAPP_BASE = 'https://api.whatsapp.com/send/?phone=';
  const contactInfo = [
    { icon: <Phone size={16} className="text-primary" />, label: '+91-9599204039', href: 'tel:+919599204039' },
    { icon: <WhatsAppIcon />, label: 'WhatsApp +91-9599204039', href: `${WHATSAPP_BASE}919599204039&text=&type=phone_number&app_absent=0` },
    { icon: <WhatsAppIcon />, label: 'WhatsApp +91-7032257346', href: `${WHATSAPP_BASE}917032257346&text=&type=phone_number&app_absent=0` },
    { icon: <Mail size={16} className="text-primary" />, label: 'contact@MADAlgos.in', href: 'mailto:contact@MADAlgos.in' },
    { icon: <Mail size={16} className="text-primary" />, label: 'team@MADAlgos.in', href: 'mailto:team@MADAlgos.in' },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, label: 'Facebook', href: 'https://www.facebook.com/MADAlgos' },
    { icon: <Instagram size={20} />, label: 'Instagram', href: 'https://www.instagram.com/madalgos/' },
    { icon: <Youtube size={20} />, label: 'YouTube', href: 'https://www.youtube.com/c/madalgos' },
    { icon: <TelegramIcon />, label: 'Telegram', href: 'https://t.me/madalgos' },
    { icon: <WhatsAppIcon />, label: 'WhatsApp', href: `${WHATSAPP_BASE}919599204039&text=&type=phone_number&app_absent=0` },
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
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
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
              © 2021 MAD ALGOS TECHNOLOGIES. BUILT FOR ENTERPRISE SCALE.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Refund', href: '/refund' },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-primary transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
