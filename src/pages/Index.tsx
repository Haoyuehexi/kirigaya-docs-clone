import { useState, useMemo } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";
import { DocumentCard } from "@/components/DocumentCard";
import { CategorySidebar } from "@/components/CategorySidebar";
import { documents, categories } from "@/data/documents";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === "all" || doc.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
              />
              
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  {selectedCategory === "all" ? "所有文档" : selectedCategory}
                  <span className="text-lg text-muted-foreground ml-2">
                    ({filteredDocuments.length})
                  </span>
                </h2>
              </div>
            </div>
            
            <div className="grid gap-6">
              {filteredDocuments.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  title={doc.title}
                  description={doc.description}
                  date={doc.date}
                  tags={doc.tags}
                  docId={doc.id}
                />
              ))}
              
              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-muted-foreground text-lg">
                    没有找到匹配的文档
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    尝试更改搜索条件或选择不同的分类
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <CategorySidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
