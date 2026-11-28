import React from 'react';

export default function WayfernFooter() {
  return (
    <footer className="relative w-full overflow-hidden pt-20 pb-8 mt-24 border-t border-[#E8E2D8] dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col items-center">
        
        {/* Giant Serif Brand Wordmark with Bottom Gradient Fade (Like Wayfern) */}
        <div className="w-full text-center select-none overflow-hidden pb-4">
          <h2 
            className="text-[15vw] sm:text-[17vw] lg:text-[19vw] font-serif font-normal tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#1A1E26] via-[#2A303C]/90 to-transparent dark:from-white dark:via-gray-300/80 dark:to-transparent"
            style={{ fontFamily: 'Georgia, "Times New Roman", Garamond, serif' }}
          >
            Hiredge
          </h2>
        </div>

        {/* Bottom Metadata & Legal Bar */}
        <div className="w-full pt-8 border-t border-[#E8E2D8]/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716A] dark:text-gray-400">
          <p>© 2026 Hiredge Inc. • Made for people who value authentic talent & dialogue.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-[#1F242E] dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#1F242E] dark:hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-[#1F242E] dark:hover:text-white transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
