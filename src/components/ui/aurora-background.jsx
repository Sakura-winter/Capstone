import { cn } from "@/lib/utils";
import React from "react";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen w-full items-center justify-start bg-[#F7F5F0] dark:bg-[#0E1117] text-[#1F242E] dark:text-[#E8E5DF] transition-colors duration-400 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Aurora Layer & Glaze Flow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            `
          [--white-gradient:repeating-linear-gradient(100deg,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0.75)_7%,transparent_10%,transparent_12%,rgba(255,255,255,0.75)_16%)]
          [--dark-gradient:repeating-linear-gradient(100deg,rgba(18,22,30,0.8)_0%,rgba(18,22,30,0.8)_7%,transparent_10%,transparent_12%,rgba(18,22,30,0.8)_16%)]
          [--aurora:repeating-linear-gradient(100deg,#C15F3C_8%,#E28766_14%,#89B3CD_20%,#8EAF80_26%,#DDBE99_32%)]
          [background-image:var(--white-gradient),var(--aurora)]
          dark:[background-image:var(--dark-gradient),var(--aurora)]
          [background-size:280%,_200%]
          [background-position:50%_50%,50%_50%]
          filter blur-[26px] opacity-45 dark:opacity-35
          after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
          after:dark:[background-image:var(--dark-gradient),var(--aurora)]
          after:[background-size:200%,_100%] 
          after:animate-aurora after:[background-attachment:fixed] after:mix-blend-multiply dark:after:mix-blend-screen
          absolute -inset-[15px] will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_75%)]`
          )}
        />

        {/* Ambient Glaze Beam Lights (Luminous running lighting paths) */}
        <div className="absolute -top-36 left-1/4 w-[620px] h-[620px] bg-gradient-to-br from-[#C15F3C]/25 via-[#F3C3A6]/20 to-transparent rounded-full blur-[110px] animate-warm-1" />
        <div className="absolute top-1/2 -right-36 w-[600px] h-[600px] bg-gradient-to-bl from-[#89B3CD]/25 via-[#8EAF80]/20 to-transparent rounded-full blur-[120px] animate-warm-2" />
        <div className="absolute -bottom-32 left-10 w-[640px] h-[640px] bg-gradient-to-tr from-[#DDBE99]/25 via-[#C15F3C]/15 to-transparent rounded-full blur-[130px] animate-warm-1" />

        {/* Beautiful Floating Illustrated Badges / Stickers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {/* Sticker 1: Idea / Insight Lightbulb Badge */}
          <div className="absolute top-[14%] left-[6%] animate-float-emoji-1">
            <div className="sticker-badge flex items-center gap-2 group hover:scale-110">
              <span className="text-xl">💡</span>
              <span className="hidden sm:inline-block text-[11px] font-bold text-[#8C462B] dark:text-[#F3C3A6] pr-1">Insight</span>
            </div>
          </div>

          {/* Sticker 2: Handshake / Partnership Badge */}
          <div className="absolute top-[28%] right-[8%] animate-float-emoji-2">
            <div className="sticker-badge flex items-center gap-2 group hover:scale-110">
              <span className="text-xl">🤝</span>
              <span className="hidden sm:inline-block text-[11px] font-bold text-[#3B6244] dark:text-[#A8D3B2] pr-1">Dialogue</span>
            </div>
          </div>

          {/* Sticker 3: Precision Target Badge */}
          <div className="absolute top-[52%] left-[8%] animate-float-emoji-3">
            <div className="sticker-badge flex items-center gap-2 group hover:scale-110">
              <span className="text-xl">🎯</span>
              <span className="hidden sm:inline-block text-[11px] font-bold text-[#2A5E78] dark:text-[#9EC4D7] pr-1">Precision</span>
            </div>
          </div>

          {/* Sticker 4: Empathy Speech Badge */}
          <div className="absolute top-[68%] right-[10%] animate-float-emoji-1">
            <div className="sticker-badge flex items-center gap-2 group hover:scale-110">
              <span className="text-xl">💬</span>
              <span className="hidden sm:inline-block text-[11px] font-bold text-[#82542B] dark:text-[#E8BD95] pr-1">Clarity</span>
            </div>
          </div>

          {/* Sticker 5: Cognitive Mind Badge */}
          <div className="absolute top-[84%] left-[18%] animate-float-emoji-2">
            <div className="sticker-badge flex items-center gap-2 group hover:scale-110">
              <span className="text-xl">🧠</span>
              <span className="hidden sm:inline-block text-[11px] font-bold text-[#6D3D6A] dark:text-[#DCA9D8] pr-1">Intellect</span>
            </div>
          </div>

          {/* Sticker 6: Growth / Sparkle Badge */}
          <div className="absolute top-[40%] right-[22%] animate-float-emoji-3">
            <div className="sticker-badge flex items-center gap-1.5 group hover:scale-110">
              <span className="text-lg">✨</span>
              <span className="hidden sm:inline-block text-[11px] font-bold text-[#A8611C] dark:text-[#F7D293] pr-1">Talent</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};
