import React from 'react';
import { MatchingResult } from '../../types/astrology';
import { getReportString } from '../../utils/reportLocalization';
import { Moon, Star, Users, Briefcase, Heart, Flame, Shield, Activity, Crown } from 'lucide-react';

interface Props {
  data: MatchingResult;
  lang: string;
  type: 'bride' | 'groom';
}

export const ProfileDetails: React.FC<Props> = ({ data, lang, type }) => {
  const info = type === 'bride' ? data.girlInfo : data.boyInfo;

  if (!info) return null;

  const points = [
    { label: "Rashi (Moon Sign)", value: info.moonSign, icon: <Moon className="w-4 h-4" /> },
    { label: "Nakshatra (Star)", value: info.nakshatra, icon: <Star className="w-4 h-4" /> },
    { label: "Nakshatra Pada", value: info.nakshatraPada, icon: <Activity className="w-4 h-4" /> },
    { label: "Varna (Caste/Work)", value: info.varna, icon: <Briefcase className="w-4 h-4" /> },
    { label: "Vashya (Control)", value: info.vashya, icon: <Shield className="w-4 h-4" /> },
    { label: "Yoni (Nature)", value: info.yoni, icon: <Heart className="w-4 h-4" /> },
    { label: "Gana (Temperament)", value: info.gana, icon: <Users className="w-4 h-4" /> },
    { label: "Nadi (Health)", value: info.nadi, icon: <Flame className="w-4 h-4" /> },
    { label: "Rashi Lord", value: info.rashiLord, icon: <Crown className="w-4 h-4" /> }
  ];

  return (
    <div className="flex flex-col mb-0 border-b border-stone-300 pb-0 relative">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-50 to-transparent rounded-bl-full pointer-events-none"></div>

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-serif font-medium text-stone-800 tracking-wide uppercase">
          {getReportString(lang, type === 'bride' ? 'brideDetails' : 'groomDetails')}
        </h2>
        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
          <span className="text-amber-600 font-serif font-bold">{type === 'bride' ? 'B' : 'G'}</span>
        </div>
      </div>

      <div className="flex-1 w-full mx-auto flex flex-col justify-center">
        <div className="flex flex-col gap-3">
          {points.map((pt, idx) => (
            <div key={idx} className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-stone-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-stone-100 flex items-center justify-center text-amber-600">
                {pt.icon}
              </div>
              <div className="flex-1 border-b border-stone-100 pb-2">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{pt.label}</p>
                <p className="text-sm font-medium text-stone-800 mt-0.5">{pt.value || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
