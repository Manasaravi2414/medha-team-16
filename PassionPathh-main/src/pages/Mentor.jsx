import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import {
  Send,
  Bot,
  User,
  ChevronDown,
  Lock,
  Users,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockMentors } from '../data/mockMentors';

const Mentor = () => {
  const location = useLocation();
  const { user, mentor, mentorAccess, sendMentorMessage, changeMentorMode } =
    useAppStore();
  const { messages, isTyping, mode } = mentor;
  const { isUnlocked } = mentorAccess;

  const [inputVal, setInputVal] = useState('');
  const [selectedMentorId, setSelectedMentorId] = useState(
    location.state?.selectedMentorId || 'ai_mentor'
  );
  const messagesEndRef = useRef(null);

  const aiMentor = {
    id: 'ai_mentor',
    name: 'PassionPath AI',
    domain: 'Universal guidance',
    role: 'Virtual Assistant',
    desc: 'Always active. Your primary guide for all app-related and general learning questions.',
    avatar: '/src/assets/avatars/ai_bot.png', // I'll assume a generic bot icon or I can generate eventually
    status: 'available',
    isAI: true,
  };

  // Prioritize mentors based on interests
  const prioritizedMentors = useMemo(() => {
    const interests = (user.interests || []).map((i) => i.toLowerCase());
    const sortedReal = [...mockMentors].sort((a, b) => {
      const aMatch = interests.some((i) => a.domain.toLowerCase().includes(i));
      const bMatch = interests.some((i) => b.domain.toLowerCase().includes(i));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });

    return [aiMentor, ...sortedReal];
  }, [user.interests]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const currentMentor =
    [...mockMentors, aiMentor].find((m) => m.id === selectedMentorId) ||
    aiMentor;

  const handleSendClick = () => {
    if (!inputVal.trim()) return;
    sendMentorMessage(inputVal);
    setInputVal('');
  };

  const handleSuggestionClick = (text) => {
    sendMentorMessage(text);
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex gap-6 page-enter relative">
      {/* Sidebar for Real Mentors */}
      <div className="hidden lg:flex flex-col w-72 shrink-0 space-y-4">
        <h2 className="font-headline text-lg px-2 flex items-center gap-2">
          <Users size={20} className="text-primary" />
          Real Mentors
        </h2>
        <div className="flex-grow overflow-y-auto pr-2 scrollbar-none space-y-3">
          {prioritizedMentors.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMentorId(m.id)}
              disabled={!isUnlocked && !m.isAI}
              className={`w-full text-left p-3 rounded-xl border transition-all relative group flex gap-3
                ${
                  selectedMentorId === m.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                    : 'border-outline-variant/20 bg-surface hover:border-primary/40'
                }
                ${!isUnlocked && !m.isAI ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {!isUnlocked && !m.isAI && (
                <Lock
                  size={12}
                  className="absolute top-2 right-2 text-on-surface-variant/40"
                />
              )}
              <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden bg-surface-container flex items-center justify-center">
                {m.avatar ? (
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users size={16} className="text-on-surface-variant/30" />
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-0.5">
                  <span
                    className={`font-headline text-xs ${
                      selectedMentorId === m.id
                        ? 'text-primary'
                        : 'text-on-surface'
                    }`}
                  >
                    {m.name}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      m.status === 'available'
                        ? 'bg-primary'
                        : 'bg-outline-variant/30'
                    }`}
                  ></span>
                </div>
                <span
                  className={`block font-label text-[8px] uppercase tracking-widest font-bold mb-1 ${
                    m.isAI ? 'text-secondary' : 'text-on-surface-variant'
                  }`}
                >
                  {m.domain}
                </span>
                <p className="font-body text-[9px] text-on-surface-variant line-clamp-1">
                  {m.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col relative rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm bg-surface-container-low">
        {/* Lock Overlay (only if real mentor selected) */}
        {!isUnlocked && !currentMentor.isAI && (
          <div className="absolute inset-0 z-50 backdrop-blur-[6px] bg-background/40 flex items-center justify-center p-8 text-center">
            <Card className="max-w-md shadow-2xl border-primary/20 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} className="text-primary" />
              </div>
              <h3 className="font-headline text-2xl mb-4">
                Mentor Access Restricted
              </h3>
              <p className="font-body text-on-surface-variant mb-6 leading-relaxed">
                Progress through your learning trajectories to unlock access to
                our elite network of industry mentors.
              </p>
              <div className="space-y-3 text-left bg-surface-container p-4 rounded-lg border border-outline-variant/10 mb-6">
                <p className="font-label text-xs uppercase tracking-widest font-bold opacity-60 flex items-center gap-2">
                  <Zap size={12} /> Unlock Criteria
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-primary" />
                  <span className="font-body">Complete 5 Modules</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-primary" />
                  <span className="font-body">Growth Score ≥ 50</span>
                </div>
              </div>
              <Button onClick={() => navigate('/growth')} className="w-full">
                View My Progress
              </Button>
            </Card>
          </div>
        )}

        {/* Chat Header */}
        <header className="p-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center ${
                isUnlocked || currentMentor.isAI
                  ? 'bg-primary/10 text-primary'
                  : 'bg-surface-container text-on-surface-variant opacity-40'
              }`}
            >
              {currentMentor.avatar ? (
                <img
                  src={currentMentor.avatar}
                  alt={currentMentor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Bot size={20} />
              )}
            </div>
            <div>
              <h1 className="font-headline text-lg text-on-surface">
                {currentMentor.isAI
                  ? 'PassionPath AI'
                  : `Mentor: ${currentMentor.name}`}
              </h1>
              <div className="flex gap-2 items-center mt-1">
                {['General', 'Expertise', 'Strategic'].map((m) => (
                  <button
                    key={m}
                    onClick={() => changeMentorMode(m)}
                    className={`text-[9px] uppercase font-label tracking-widest px-2 py-0.5 rounded border transition-colors ${
                      mode === m
                        ? 'bg-primary text-white border-primary'
                        : 'bg-transparent border-outline-variant/30 text-on-surface-variant hover:border-primary/40'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8 scrollbar-thin pb-40">
          {messages.map((msg, i) => (
            <div
              key={msg.id || i}
              className={`flex max-w-[85%] ${
                msg.sender === 'user'
                  ? 'ml-auto justify-end'
                  : 'mr-auto justify-start'
              }`}
            >
              <div
                className={`flex gap-4 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center mt-1 ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-container-highest text-on-surface'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={16} />
                    )
                  ) : currentMentor.avatar ? (
                    <img
                      src={currentMentor.avatar}
                      alt={currentMentor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>
                <div
                  className={`p-4 rounded-2xl shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-surface-container-highest text-on-surface rounded-tl-none border border-outline-variant/10'
                  }`}
                >
                  <p className="font-body text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex max-w-[85%] mr-auto justify-start">
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center animate-pulse">
                  <Bot size={16} />
                </div>
                <div className="flex gap-1 h-2 items-center">
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-surface-container-lowest border-t border-outline-variant/10">
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-none pb-1">
            {[
              'Analyze my focus',
              'Career path advice',
              'Next strategic step',
            ].map((s) => (
              <Button
                key={s}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(s)}
                className="whitespace-nowrap rounded-full font-label text-[10px] uppercase tracking-wider"
              >
                {s}
              </Button>
            ))}
          </div>
          <div className="flex gap-3 relative">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendClick()}
              placeholder={
                isUnlocked || currentMentor.isAI
                  ? 'Message your mentor...'
                  : 'Mentor access is locked...'
              }
              disabled={!isUnlocked && !currentMentor.isAI}
              className="flex-grow bg-surface-container-high border border-outline-variant/20 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-body text-sm placeholder:text-on-surface-variant/30 shadow-inner"
            />
            <Button
              variant="primary"
              onClick={handleSendClick}
              disabled={
                (!isUnlocked && !currentMentor.isAI) ||
                isTyping ||
                !inputVal.trim()
              }
              className="!px-6 !rounded-2xl shrink-0"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
