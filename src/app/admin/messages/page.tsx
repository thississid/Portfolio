'use client';

import { useState } from 'react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  starred: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Question about your AI project',
      message: 'Hi, I am very interested in your AI-powered analytics platform. Could you share more details about the tech stack and implementation?',
      date: '2024-01-15T10:30:00',
      read: false,
      starred: true,
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@company.com',
      subject: 'Job Opportunity',
      message: 'We are looking for a talented developer with your skillset. Would you be interested in discussing a senior position at our company?',
      date: '2024-01-14T15:45:00',
      read: true,
      starred: false,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@startup.io',
      subject: 'Collaboration Proposal',
      message: 'I love your work! Would you be interested in collaborating on an open-source project?',
      date: '2024-01-13T09:20:00',
      read: true,
      starred: false,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all');

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'starred') return msg.starred;
    return true;
  });

  const markAsRead = (id: string) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)));
  };

  const toggleStar = (id: string) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, starred: !msg.starred } : msg)));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-gray-400">Manage contact form submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg">
          <p className="text-sm text-gray-400">Total Messages</p>
          <p className="text-2xl font-bold text-[rgb(var(--neon-cyan))]">{messages.length}</p>
        </div>
        <div className="p-4 bg-gray-900 border border-[rgb(var(--neon-pink))] border-opacity-30 rounded-lg">
          <p className="text-sm text-gray-400">Unread</p>
          <p className="text-2xl font-bold text-[rgb(var(--neon-pink))]">
            {messages.filter((m) => !m.read).length}
          </p>
        </div>
        <div className="p-4 bg-gray-900 border border-[rgb(var(--neon-purple))] border-opacity-30 rounded-lg">
          <p className="text-sm text-gray-400">Starred</p>
          <p className="text-2xl font-bold text-[rgb(var(--neon-purple))]">
            {messages.filter((m) => m.starred).length}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <FilterButton
          active={filter === 'all'}
          onClick={() => setFilter('all')}
          label="All"
          count={messages.length}
        />
        <FilterButton
          active={filter === 'unread'}
          onClick={() => setFilter('unread')}
          label="Unread"
          count={messages.filter((m) => !m.read).length}
        />
        <FilterButton
          active={filter === 'starred'}
          onClick={() => setFilter('starred')}
          label="Starred"
          count={messages.filter((m) => m.starred).length}
        />
      </div>

      {/* Messages Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-2">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No messages found</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                isSelected={selectedMessage?.id === message.id}
                onClick={() => {
                  setSelectedMessage(message);
                  markAsRead(message.id);
                }}
                onStar={() => toggleStar(message.id)}
              />
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <MessageDetail message={selectedMessage} onDelete={() => deleteMessage(selectedMessage.id)} />
          ) : (
            <div className="h-full bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-xl mb-2">📬</p>
                <p>Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all ${
        active
          ? 'bg-[rgb(var(--neon-cyan))] text-white'
          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
      }`}
    >
      {label} ({count})
    </button>
  );
}

function MessageItem({
  message,
  isSelected,
  onClick,
  onStar,
}: {
  message: Message;
  isSelected: boolean;
  onClick: () => void;
  onStar: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-[rgb(var(--neon-cyan))] bg-opacity-20 border border-[rgb(var(--neon-cyan))] border-opacity-50'
          : 'bg-gray-900 border border-gray-700 hover:border-[rgb(var(--neon-cyan))] hover:border-opacity-30'
      } ${!message.read ? 'border-l-4 border-l-[rgb(var(--neon-pink))]' : ''}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className={`font-semibold ${!message.read ? 'text-white' : 'text-gray-300'}`}>
            {message.name}
          </h3>
          <p className="text-xs text-gray-500">{message.email}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStar();
          }}
          className="text-lg"
        >
          {message.starred ? '⭐' : '☆'}
        </button>
      </div>
      <p className={`text-sm mb-1 ${!message.read ? 'font-medium' : 'text-gray-400'}`}>
        {message.subject}
      </p>
      <p className="text-xs text-gray-500">{new Date(message.date).toLocaleDateString()}</p>
    </div>
  );
}

function MessageDetail({ message, onDelete }: { message: Message; onDelete: () => void }) {
  return (
    <div className="bg-gray-900 border border-[rgb(var(--neon-cyan))] border-opacity-30 rounded-lg p-6">
      <div className="border-b border-gray-700 pb-4 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold mb-2">{message.subject}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>From: <strong className="text-white">{message.name}</strong></span>
              <span>{message.email}</span>
              <span>{new Date(message.date).toLocaleString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[rgb(var(--neon-cyan))] bg-opacity-20 text-[rgb(var(--neon-cyan))] rounded-lg hover:bg-opacity-30 transition-all">
              Reply
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 bg-opacity-20 text-red-400 rounded-lg hover:bg-opacity-30 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{message.message}</p>
      </div>
    </div>
  );
}
