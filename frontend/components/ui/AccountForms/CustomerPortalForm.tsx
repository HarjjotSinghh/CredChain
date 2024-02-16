'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';

export default function CustomerPortalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice = 999
  const subscription = null
  const handleStripePortalRequest = async () => {

  };

  return (
    <Card
      title="Your Plan"
      description={
        subscription
          ? `You are currently on the ${subscription} plan.`
          : 'You are not currently subscribed to any plan.'
      }
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0 opacity-90">Manage your subscription on Stripe.</p>
          <Button
            variant="default"
            onClick={handleStripePortalRequest}
            
          >
            Open customer portal
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        {subscription ? (
          `${subscriptionPrice}/${subscription}`
        ) : (
          <Link href="/">Choose your plan</Link>
        )}
      </div>
    </Card>
  );
}
