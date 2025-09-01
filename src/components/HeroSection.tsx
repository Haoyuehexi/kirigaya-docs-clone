import { Book, Code, Heart } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-hero text-white">
      {/* Geometric decorations */}
      <div className="absolute top-20 left-10 w-16 h-16 rotate-45 bg-white/10 rounded-lg"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-20 left-1/4 w-8 h-8 rotate-12 bg-white/10 rounded-lg"></div>
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <Book className="h-8 w-8" />
            <span className="text-2xl font-light">|</span>
            <Code className="h-8 w-8" />
            <Heart className="h-6 w-6" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
            锦恢 | 文档库
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
            Mirror the unknown
          </p>
          
          <div className="flex justify-center pt-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm text-white/60">技术文档</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm text-white/60">开源项目</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">2+</div>
                <div className="text-sm text-white/60">精选读物</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};