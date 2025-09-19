'use client';

import { useState } from 'react';
import { Megaphone, Plus, Search, Filter, Clock } from 'lucide-react';
import { mockAnnouncements } from '@/lib/mock';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';

export default function AnnouncementsPage() {
  const [announcements] = useState(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'low': return 'text-green-500 bg-green-500/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-AU', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Announcements
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with course announcements and university news.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <UIButton variant="secondary" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </UIButton>
            <UIButton variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Announcement
            </UIButton>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className={`bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/70 transition-colors ${!announcement.isRead ? 'ring-2 ring-brand/20' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.toUpperCase()}
                      </span>
                      {!announcement.isRead && (
                        <span className="w-2 h-2 bg-brand rounded-full"></span>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(announcement.postedAt)}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-3">{announcement.title}</h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {announcement.body}
                    </p>
                    
                    {announcement.attachments && announcement.attachments.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {announcement.attachments.map((attachment, index) => (
                            <span key={index} className="text-xs bg-muted/20 px-2 py-1 rounded">
                              {attachment}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6 flex gap-2">
                    <UIButton variant="secondary" className="text-sm px-3 py-1">
                      Mark as Read
                    </UIButton>
                    <UIButton variant="ghost" className="text-sm px-3 py-1">
                      Archive
                    </UIButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No announcements found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? 'Try adjusting your search terms.' : 'No announcements available.'}
              </p>
              <UIButton variant="primary" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Announcement
              </UIButton>
            </div>
          )}
        </div>
      </SectionWrapper>
    </main>
  );
}
