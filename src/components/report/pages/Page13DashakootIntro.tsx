import React from 'react';
import { FixedPage } from './FixedPage';

export const Page13DashakootIntro: React.FC = () => {
  return (
    <FixedPage pageNumber={13}>
      <div className="px-12 py-10 flex flex-col h-full w-full bg-white relative z-10">
        
        {/* Header Pill */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute left-0 right-0 h-0.5 bg-[#E67E22]"></div>
          <div className="bg-white px-8 py-2 border-2 border-[#E67E22] rounded-full relative z-10 text-2xl text-[#E67E22] font-semibold">
            Dashakoot Details
          </div>
        </div>

        <div className="text-stone-800 space-y-4">
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">What is dashakoot</h2>
          
          <p className="text-sm leading-relaxed text-stone-700">
            To ensure a long and happy married life, the ancient Indian sages and saints devised a method to check the
            matrimonial adaptability or marriageable compatibility which is called 'Marriage Matching' or 'Matchmaking'.
            They devised the method of matching by Koota Agreement based on the Birth Stars of the boy and the
            girl. Generally they recommended 20 kootas. But out of these only 10 kootas are considered for the actual horoscope
            matching and in some parts of India only 8 kootas are considered. Hence it also popularly known as 'Das
            Poritham' in Hindi or 10 Porutham in Tamil.
          </p>
          <p className="text-sm leading-relaxed text-stone-700">
            The 10 Porutham are Dinam, Ganam, Yoni, Rasi, Rasiyathipaty, Rajju, Vedha, Vasya, Mahendhram, Stree
            Deergam.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 mb-4 font-semibold text-stone-800 text-sm">
            <div>Dina</div><div>Rajju</div>
            <div>Gan</div><div>Vedha</div>
            <div>Yoni</div><div>Vashya</div>
            <div>Rashi</div><div>Mahendra</div>
            <div>Rasyadhipati</div><div>Stree Deergha</div>
          </div>

          <p className="text-sm leading-relaxed text-stone-700 font-bold mt-4">The ten kootas or Aspects of Dashakoota are as follows:</p>
          
          <div className="space-y-2 text-sm leading-relaxed text-stone-700">
            <p><strong>Dina</strong> – Tara or Dina Koota indicates the wellbeing and longevity of the prospective couple.</p>
            <p><strong>Gan</strong> – Gana indicates the mutual behaviors, mental compatibility and temperaments of the prospective bride and groom.</p>
            <p><strong>Yoni</strong> – Yoni Koota measures the intimacy levels, sexual compatibility and mutual love of the prospective couple. It matches the sensuous nature and characteristics of both.</p>
            <p><strong>Rashi</strong> – This represents emotional compatibility of the couple.</p>
            <p><strong>Rasyadhipati</strong> – This reflects the mental compatibility, affection and natural friendship between the partners. It denotes how inimical the boy and the girl are to each other.</p>
            <p><strong>Rajju</strong> – It is considered as the most important of the ten kootas as it ensures a long life for the husband.</p>
            <p><strong>Vedha</strong> – Vedha means affliction. This koota agreement wards of all evils and pitfalls in married life.</p>
            <p><strong>Vashya</strong> – This measures mutual attraction and the degree to which the partners shall be able to influence each other.</p>
            <p><strong>Mahendra</strong> – This shows the impact upon progeny and child-birth issues.</p>
            <p><strong>Stree Deergha</strong> – It ensures accumulation of wealth and all round prosperity.</p>
          </div>
        </div>

      </div>
    </FixedPage>
  );
};
