import React from 'react';
import useAppStore from '../store/useAppStore';
import {
  Settings,
  Database,
  ShieldCheck,
  FileText,
  LogOut,
  ChevronRight,
  Globe,
  Bell,
  Fingerprint,
} from 'lucide-react';

const ProfileItem = ({ icon: Icon, title, desc, actionLabel, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer border border-on-background/5 rounded-sm"
  >
    <div className="flex items-center gap-6">
      <div className="w-10 h-10 rounded-sm archival-gradient flex items-center justify-center text-white shadow-sm">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-headline text-xl italic text-on-surface">
          {title}
        </h4>
        <p className="font-body text-xs text-on-surface-variant opacity-60 mt-0.5">
          {desc}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      {actionLabel && (
        <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">
          {actionLabel}
        </span>
      )}
      <ChevronRight
        size={16}
        className="text-on-surface-variant opacity-30 group-hover:translate-x-1 transition-transform"
      />
    </div>
  </div>
);

const Profile = () => {
  const { user, showToast } = useAppStore();

  if (!user) return null;

  const handleSettingClick = (title) => {
    showToast(`${title} configuration updated.`, 'success');
  };

  const handleDecoupleSession = () => {
    showToast('Decoupling current archival session...', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-24 page-enter">
      {/* Header Profile Section */}
      <section className="flex flex-col md:flex-row items-center md:items-end gap-12 border-b border-on-background/5 pb-16">
        <div className="relative">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-sm overflow-hidden border-4 border-white shadow-xl ring-1 ring-on-background/5">
            {user?.avatar ? (
              <img
                alt={user.name}
                className="w-full h-full object-cover"
                src={user.avatar}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-surface-container text-on-surface-variant font-bold text-4xl">${
                    user.name?.charAt(0) ?? '?'
                  }</div>`;
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface-container text-on-surface-variant font-bold text-4xl">
                {user?.name?.charAt(0) ?? '?'}
              </div>
            )}
          </div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 archival-gradient rounded-full flex items-center justify-center text-white border-4 border-background shadow-lg">
            <Fingerprint size={20} />
          </div>
        </div>

        <div className="text-center md:text-left space-y-4">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold">
              Identity Verified
            </span>
            <ShieldCheck size={14} className="text-primary" />
          </div>
          <h2 className="font-headline italic text-5xl md:text-7xl text-on-surface tracking-tight leading-none">
            {user.name}
          </h2>
          <p className="font-body text-lg text-on-surface-variant opacity-60">
            {user.role} // Folio ID: PP-1422-B
          </p>
        </div>
      </section>

      {/* Interest Selection Section */}
      <section className="bg-surface-container-high/40 p-8 rounded-sm border border-primary/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h3 className="font-headline text-3xl italic mb-2">
              Priority Domains
            </h3>
            <p className="font-body text-sm text-on-surface-variant opacity-70">
              Select your active interests to personalize your paths, analytics,
              and mentor guidance.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Music',
              'Sports',
              'Art',
              'Chess',
              'Strategy',
              'Programming',
              'Lifestyle',
            ].map((interest) => {
              const isActive = user.interests?.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => {
                    const newInterests = isActive
                      ? user.interests.filter((i) => i !== interest)
                      : [...(user.interests || []), interest];
                    useAppStore.getState().setInterests(newInterests);
                  }}
                  className={`px-4 py-2 rounded-full font-label text-[10px] uppercase tracking-widest transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-lg scale-105'
                      : 'bg-surface-container-highest text-on-surface-variant/60 hover:bg-surface-container-highest/80'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>
        {user.interests?.length > 0 && (
          <div className="flex items-center gap-2 text-primary animate-in fade-in slide-in-from-left-2">
            <Fingerprint size={14} />
            <span className="font-label text-[9px] uppercase tracking-tighter font-bold">
              System synced to: {user.interests.join(' + ')}
            </span>
          </div>
        )}
      </section>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Archival Settings */}
        <section className="space-y-8">
          <h3 className="font-label text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant border-b border-on-background/5 pb-4">
            Archival Protocol
          </h3>
          <div className="space-y-4">
            <ProfileItem
              icon={Database}
              title="Data Governance"
              desc="Manage your persistent archival records"
              actionLabel="Active"
              onClick={() => handleSettingClick('Data Governance')}
            />
            <ProfileItem
              icon={Globe}
              title="Network Visibility"
              desc="Configure your resonance in the Human Network"
              actionLabel="Private"
              onClick={() => handleSettingClick('Network Visibility')}
            />
            <ProfileItem
              icon={Bell}
              title="Alert Thresholds"
              desc="Modify notifications for drift and synthesis"
              onClick={() => handleSettingClick('Alert Thresholds')}
            />
          </div>
        </section>

        {/* Security & System */}
        <section className="space-y-8">
          <h3 className="font-label text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant border-b border-on-background/5 pb-4">
            System Integrity
          </h3>
          <div className="space-y-4">
            <ProfileItem
              icon={ShieldCheck}
              title="Encryption Mode"
              desc="High-fidelity holographic indexing"
              actionLabel="V-2"
              onClick={() => handleSettingClick('Encryption Mode')}
            />
            <ProfileItem
              icon={FileText}
              title="Export Thesis"
              desc="Download your complete archival record"
              onClick={() => handleSettingClick('Export Thesis')}
            />
            <ProfileItem
              icon={LogOut}
              title="Decouple Session"
              desc="Safely terminate current archival access"
              onClick={handleDecoupleSession}
            />
          </div>
        </section>
      </div>

      {/* Detailed Stats */}
      <section className="bg-surface-container-low p-10 rounded-sm border border-on-background/5">
        <div className="flex justify-between items-center mb-10">
          <h3 className="font-headline text-3xl italic">Systemic Footprint</h3>
          <span className="font-label text-[10px] uppercase tracking-widest opacity-40">
            Persistence Analytics
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Total Logs', val: '1,422' },
            { label: 'Synthesis Time', val: '428h' },
            { label: 'Resonance', val: '68%' },
            { label: 'Nodes Unlocked', val: '12' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="font-label text-[9px] uppercase tracking-widest opacity-40">
                {stat.label}
              </p>
              <p className="font-headline text-4xl text-primary-container leading-none italic">
                {stat.val}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 text-center">
        <p className="font-label text-[10px] uppercase tracking-[0.2em] opacity-30">
          PassionPath OS — Version 1.0.42-STABLE
        </p>
      </footer>
    </div>
  );
};

export default Profile;
