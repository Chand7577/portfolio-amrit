'use client';

import React from 'react';
import { FAQS } from '@/data/portfolioData';
import Faq3 from '@/components/ui/Faq3';

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 sm:py-28 border-b border-[#1a1a1a]">
      <Faq3
        items={FAQS}
        badge="08 • FAQ"
        title={
          <>
            Common <span className="italic">Questions.</span>
          </>
        }
        subtitle="Quick answers regarding availability, pricing, technology stack, and engagements."
        showContactCard={true}
      />
    </section>
  );
}
