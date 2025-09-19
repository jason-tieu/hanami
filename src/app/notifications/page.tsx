'use client';

import { useState } from 'react';
import { Bell, Plus, Search, Filter, CheckCircle2, Clock } from 'lucide-react';
import { mockNotifications } from '@/lib/mock';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';

export default function NotificationsPage() {
  const [notifications] = useState(mockNotifications);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment_due': return 'text-orange-500 bg-orange-500/10';
      case 'exam_reminder': return 'text-red-500 bg-red-500/10';
      case 'grade_posted': return 'text-green-500 bg-green-500/10';
      case 'announcement': return 'text-blue-500 bg-blue-500/10';
      case 'general': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-AU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Notifications
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your notification preferences and view recent alerts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search notifications..."
                className="w-full pl-10 pr-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <UIButton variant="secondary" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </UIButton>
            <UIButton variant="primary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Notification
            </UIButton>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className={`bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/70 transition-colors ${!notification.isRead ? 'ring-2 ring-brand/20' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                        {notification.type.replace('_', ' ').toUpperCase()}
                      </span>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-brand rounded-full"></span>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(notification.createdAt)}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">{notification.title}</h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {notification.message}
                    </p>
                    
                    {notification.actionUrl && (
                      <UIButton variant="secondary" className="text-sm px-3 py-1" asChild>
                        <a href={notification.actionUrl}>
                          View Details
                        </a>
                      </UIButton>
                    )}
                  </div>
                  
                  <div className="ml-6 flex gap-2">
                    {!notification.isRead && (
                      <UIButton variant="secondary" className="text-sm px-3 py-1">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Mark as Read
                      </UIButton>
                    )}
                    <UIButton variant="ghost" className="text-sm px-3 py-1">
                      Archive
                    </UIButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
              <p className="text-muted-foreground mb-6">
                You&apos;re all caught up! New notifications will appear here.
              </p>
            </div>
          )}
        </div>
      </SectionWrapper>
    </main>
  );
}
