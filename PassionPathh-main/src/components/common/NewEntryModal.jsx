import React, { useState } from 'react';
import {
  X,
  Target,
  Clock,
  BookOpen,
  Trophy,
  Zap,
  MessageSquare,
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';

const NewEntryModal = () => {
  const { isNewEntryModalOpen, toggleNewEntryModal, user, addActivityLog } =
    useAppStore();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    duration: '',
    type: 'Practice',
    notes: '',
  });

  if (!isNewEntryModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.duration) return;

    addActivityLog(formData);
    setFormData({
      title: '',
      category: '',
      duration: '',
      type: 'Practice',
      notes: '',
    });
  };

  const types = [
    { id: 'Practice', icon: Zap },
    { id: 'Learning', icon: BookOpen },
    { id: 'Performance', icon: Trophy },
    { id: 'Competition', icon: Target },
  ];

  // Safe fallback — never crashes even if interests is undefined
  const userInterests = user?.interests ?? [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => toggleNewEntryModal(false)}
      />

      <Card className="relative w-full max-w-lg border-primary/20 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm archival-gradient flex items-center justify-center text-white">
              <Zap size={20} />
            </div>
            <h2 className="font-headline text-2xl italic">Log Activity</h2>
          </div>
          <button
            onClick={() => toggleNewEntryModal(false)}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              Activity Title
            </label>
            <Input
              placeholder="e.g. Morning Scale Practice"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                Category
              </label>
              <select
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-sm px-4 py-2.5 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select Domain</option>
                {userInterests.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
                <option value="General">General</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                Duration (Hours)
              </label>
              <Input
                type="number"
                step="0.1"
                placeholder="0.5"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block">
              Activity Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {types.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.id })}
                  className={`flex flex-col items-center justify-center p-3 rounded-sm border transition-all ${
                    formData.type === type.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/50'
                  }`}
                >
                  <type.icon size={18} className="mb-2" />
                  <span className="font-label text-[8px] uppercase tracking-tighter">
                    {type.id}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              Notes (Optional)
            </label>
            <textarea
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors min-h-[100px] resize-none"
              placeholder="What did you achieve?"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => toggleNewEntryModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1 archival-gradient border-none"
            >
              Archive Entry
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewEntryModal;
