/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function App() {
  // Using the robust direct link format for Google Drive images
  const imageId = "1wecPSpYKYtTVSHGCVfeHxYjPGw93jj2r";
  const imageUrl = `https://lh3.googleusercontent.com/d/${imageId}`;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden selection:bg-white selection:text-black">
      {/* Background Image - Subtle blurred version for atmosphere */}
      <div className="absolute inset-0 opacity-20 blur-3xl scale-110 -z-10">
        <img 
          src={imageUrl} 
          alt="" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
            className="text-xs uppercase tracking-[0.4em] mb-4 font-semibold"
          >
            Tomochi
          </motion.p>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter uppercase italic">
            its<br/>coming...
          </h1>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="h-1 bg-white w-32 mt-8 origin-left"
          />
        </motion.div>

        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="order-1 lg:order-2 relative aspect-video group w-full"
        >
          <div className="absolute inset-0 border border-white/20 translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-500" />
          
          <div className="w-full h-full overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
            <img 
              src={imageUrl} 
              alt="Teaser" 
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback to a high-quality placeholder if the Drive link is restricted
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/future/1920/1080";
              }}
            />
          </div>

          {/* Floating Label */}
          <div className="absolute -bottom-4 -right-4 bg-white text-black px-4 py-2 font-bold text-xs uppercase tracking-widest hidden md:block">
            Coming Soon
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation / Meta */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/10 pt-8"
      >
        <div className="text-[10px] uppercase tracking-widest leading-relaxed">
          Design & Development<br/>
          In Progress
        </div>
        <div className="text-[10px] uppercase tracking-widest">
          © 2026
        </div>
      </motion.div>
    </main>
  );
}
