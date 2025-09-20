'use client';

import { useState } from 'react';
import { Link, Plus, Search, Filter, BookOpen, FileText, Video, MessageSquare } from 'lucide-react';
import { mockResources } from '@/lib/mock';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';

export default function ResourcesPage() {
  const [resources] = useState(mockResources);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture_notes': return <FileText className="h-4 w-4" />;
      case 'textbook': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'forum': return <MessageSquare className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture_notes': return 'text-blue-500 bg-blue-500/10';
      case 'textbook': return 'text-green-500 bg-green-500/10';
      case 'video': return 'text-purple-500 bg-purple-500/10';
      case 'forum': return 'text-orange-500 bg-orange-500/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Resources
            </h1>
            <p className="text-lg text-muted-foreground">
              Access your unit materials, lecture notes, and study resources.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <UIButton variant="secondary" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </UIButton>
            <UIButton variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Resource
            </UIButton>
          </div>

          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/70 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTypeColor(resource.type)}`}>
                        {getTypeIcon(resource.type)}
                        {resource.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
                    
                    {resource.description && (
                      <p className="text-muted-foreground mb-4">{resource.description}</p>
                    )}
                    
                    {resource.tags && resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-muted/20 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6 flex gap-2">
                    <UIButton variant="secondary" className="text-sm px-3 py-1" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <Link className="h-4 w-4 mr-1" />
                        Open
                      </a>
                    </UIButton>
                    <UIButton variant="ghost" className="text-sm px-3 py-1">
                      Edit
                    </UIButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
