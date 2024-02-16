import Pricing from '@/components/ui/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';

export default async function PricingPage() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();



  return (
    <Pricing
      user={user}
      products={[]}
      subscription={null}
    />
  );
}
