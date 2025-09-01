import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface Category {
  name: string;
  count: number;
  color?: string;
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory?: string;
  onCategorySelect: (category: string) => void;
}

export const CategorySidebar = ({ categories, selectedCategory, onCategorySelect }: CategorySidebarProps) => {
  return (
    <div className="space-y-6">
      <Card className="shadow-card border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
            分类目录
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button
            onClick={() => onCategorySelect("all")}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-smooth hover:bg-accent/60 ${
              selectedCategory === "all" ? "bg-accent text-accent-foreground" : ""
            }`}
          >
            <span className="font-medium">全部文档</span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {categories.reduce((sum, cat) => sum + cat.count, 0)}
            </Badge>
          </button>
          
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-smooth hover:bg-accent/60 ${
                selectedCategory === category.name ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              <span className="font-medium">{category.name}</span>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {category.count}
              </Badge>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-card border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
            最近更新
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <div className="font-medium mb-1">OpenMCP 官方教程</div>
            <div className="text-muted-foreground text-xs">2025-04-22</div>
          </div>
          <div className="text-sm">
            <div className="font-medium mb-1">torchood 使用文档</div>
            <div className="text-muted-foreground text-xs">2024-12-16</div>
          </div>
          <div className="text-sm">
            <div className="font-medium mb-1">Rust Nom 教程</div>
            <div className="text-muted-foreground text-xs">2024-11-28</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};