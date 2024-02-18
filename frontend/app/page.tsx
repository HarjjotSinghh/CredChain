import { Button } from "@/components/ui/button";
import LogoCloud from "@/components/ui/LogoCloud";
import Link from "next/link";

export default async function PricingPage() {


    return (
        <main className="flex justify-center items-center px-8 py-24 flex-col gap-6 bg-background dark:bg-dot-white/[0.3] bg-dot-black/[0.3] relative">
            <div className="absolute pointer-events-none inset-0 lg:flex hidden items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] min-w-screen "></div>
            <h1 className="lg:text-6xl md:text-5xl text-4xl lg:max-w-[800px] tracking-[-1px] max-w-2xl font-medium font-heading">
                Securely{" "}
                <span className=" bg-gradient-to-r bg-[length:180%] bg-[background-position:initial] hover:[background-position:-200%_-200%] hover:bg-pos-100 transition-all duration-500 ease-in-out from-primary to-primary/60 text-transparent bg-clip-text font-[1000] ">
                    storing certificates
                </span>
                <span className=" bg-gradient-to-r bg-[length:180%] bg-[background-position:initial] hover:[background-position:-200%_-200%] hover:bg-pos-100 transition-all duration-500 ease-in-out from-foreground to-foreground/60 text-transparent bg-clip-text ">
                    {" "}
                    on the blockchain.
                </span>
            </h1>
            <div className="flex lg:max-w-[800px] max-w-2xl justify-center items-start flex-col gap-4">
                <p className="lg:text-base text-sm opacity-85">
                    CredChain streamlines the certifcate verification process.
                    Institutions can seamlessly issue verifiable certificates
                    onto the blockchain, while employers and other entities can
                    instantly confirm the authenticity of credentials with just
                    a few clicks.
                </p>
                <div className="flex justify-start items-start flex-row gap-4">
                    <Link href="/signin/signup">
                        <Button className="lg:text-base text-sm lg:px-6 px-4 tracking-tight font-extrabold font-heading lg:shadow-lg shadow-md shadow-primary/10 hover:shadow-primary/30 transition-all duration-300 ease-in-out">
                            Get Started
                        </Button>
                    </Link>
                    <Link href="/signin/signup">
                        <Button variant={"ghost"} className="lg:text-base text-sm lg:px-6 px-4 tracking-tight font-extrabold font-heading lg:shadow-lg border-2 border-primary shadow-md shadow-primary/10 hover:shadow-primary/30 transition-all duration-300 ease-in-out">
                            Know More
                        </Button>
                    </Link>
                </div>
            </div>

            {/* <LogoCloud /> */}
        </main>
    );
}
