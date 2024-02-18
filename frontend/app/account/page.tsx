import CertifcatesInfo from "@/components/ui/AccountForms/CertificatesInfo";
import CertifcatesOwned from "@/components/ui/AccountForms/CertificatesOwned";
import CreateCertificate from "@/components/ui/AccountForms/CreateCertificate";
import EmailForm from "@/components/ui/AccountForms/EmailForm";
import NameForm from "@/components/ui/AccountForms/NameForm";
import WalletInfo from "@/components/ui/AccountForms/WalletInfo";
import AptosProvider from "@/utils/providers/aptosProvider";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { use } from "react";

export default async function Account() {
    const supabase = createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    // const { data: userDetails } = await supabase
    //     .from("users")
    //     .select("*")
    //     .single();
    // const { data: userCertificates } = await supabase
    //     .from("certificates")
    //     .select("*")
    //     .eq("issuing_organization_id", user?.id ?? "")
    //     .single();

    if (!user) {
        return redirect("/signin");
    }

    return (
        <section className="mb-32 ">
            <div className="py-8 flex lg:justify-center lg:items-center justify-start items-start sm:pt-24 px-8">
                <div className="max-w-4xl mb-2">
                    <h1 className="lg:text-6xl w-fit font-extrabold text-5xl">
                        Your Account
                    </h1>
                    <p className="max-w-2xl lg:text-center w-full opacity-80 mt-2 lg:text-xl text-lg">
                        View your account settings.
                    </p>
                </div>
            </div>
            <div className="flex justify-center items-center  w-full">
                <div className="flex flex-row flex-wrap lg:justify-center lg:items-center items-start justify-start gap-8">
                    {/* <NameForm userName={userDetails?.full_name ?? ''} />
                          <EmailForm userEmail={user.email} /> */}
                    <section className="w-full">
                        <WalletInfo user={user} />
                    </section>
                    {user.user_metadata.organization && (
                        <div className=" max-w-6xl w-full mt-4 px-8">
                            <section className="w-full flex lg:flex-row-reverse flex-col-reverse gap-16 items-start justify-start">
                                <CertifcatesInfo user={user} />
                                <CreateCertificate user={user} />
                            </section>
                        </div>
                    )}
                    {!user.user_metadata.organization && (
                        <div>
                            <section className="w-full">
                                <CertifcatesOwned user={user} />
                            </section>
                
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
