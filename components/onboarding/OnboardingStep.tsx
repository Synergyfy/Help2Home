'use client';

import React, { useEffect, useRef } from 'react';
import FadeIn from '@/components/FadeIn';

interface StepProps {
  step: { title: string; fields: React.ReactNode; tooltip?: string };
  onCollectFieldNames?: (names: string[]) => void;
}

export default function OnboardingStep({ step, onCollectFieldNames }: StepProps) {
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onCollectFieldNames) return;

    const names: string[] = [];
    if (stepRef.current) {
      const fields = stepRef.current.querySelectorAll(
        'input[name], select[name], textarea[name]'
      );

      fields.forEach((f) => {
        const el = f as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (el.name) names.push(el.name);
      });
    }

    onCollectFieldNames(names);
  }, [step.fields, onCollectFieldNames]);

  return <FadeIn><div ref={stepRef}>{step.fields}</div></FadeIn>;
}
