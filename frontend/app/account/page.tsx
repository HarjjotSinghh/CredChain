import CertifcatesInfo from '@/components/ui/AccountForms/CertificatesInfo';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import NameForm from '@/components/ui/AccountForms/NameForm';
import WalletInfo from '@/components/ui/AccountForms/WalletInfo';
import AptosProvider from '@/utils/providers/aptosProvider';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { use } from 'react';

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();
    const { data: userCertificates } = await supabase
    .from('certificates')
    .select('*')
    .eq("user_id", user?.id ?? "")
    .single();


  if (!user) {
    return redirect('/signin');
  }

  return (
      <section className="mb-32 ">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-4xl font-extrabold  sm:text-center sm:text-6xl">
              Your Account
            </h1>
            <p className="max-w-2xl opacity-80 m-auto mt-2 text-lg sm:text-center sm:text-xl">
              View your account settings.
            </p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap max-w-4xl lg:justify-center lg:items-center items-start justify-start gap-8 mx-auto">
          {/* <NameForm userName={userDetails?.full_name ?? ''} />
          <EmailForm userEmail={user.email} /> */}
          <section className="w-full">
            <WalletInfo user={user} />
          </section>
          
          <section className="w-full">
            <CertifcatesInfo user={user}/>
          </section>
        </div>
      </section>
  );
}
