import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { ArrowLeft, Calendar, Tag, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { documents } from "@/data/documents";

// Import highlight.js CSS for syntax highlighting
import "highlight.js/styles/github-dark.css";

export const DocumentPage = () => {
  const { docId } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const document = documents.find(doc => doc.id === docId);

  useEffect(() => {
    const loadDocument = async () => {
      if (!docId) {
        setError("Document ID not found");
        setLoading(false);
        return;
      }

      try {
        // Try to load markdown file
        const response = await fetch(`/docs/${docId}/index.md`);
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        } else {
          // Fallback content if file doesn't exist
          setContent(`# ${document?.title || docId}

This document is under construction. 

## Coming Soon

We're working on creating comprehensive documentation for this topic. Please check back later!

### What to expect:

- Detailed explanations and examples
- Code snippets and best practices  
- Step-by-step tutorials
- Additional resources and references

---

*This page will be updated soon with complete content.*`);
        }
      } catch (err) {
        setError("Failed to load document");
        console.error("Error loading document:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [docId, document]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">加载失败</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回首页
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回文档库
              </Button>
            </Link>
            
            {document && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{document.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <div className="flex gap-1">
                    {document.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                // Custom components for better styling
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground border-b border-border pb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary/50 pl-4 my-4 bg-accent/30 py-2 rounded-r">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className, ...props }) => {
                  const inline = !className?.includes('language-');
                  return inline 
                    ? <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    : <code className="block bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props}>
                        {children}
                      </code>
                },
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto border">
                    {children}
                  </pre>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    className="text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                    {href?.startsWith('http') && <ExternalLink className="h-3 w-3" />}
                  </a>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-border">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-border px-4 py-2">
                    {children}
                  </td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
};