import Link from "next/link";

export default function LogoCloud() {
  return (
    <div className="lg:max-w-[800px] max-w-2xl w-full flex justify-start items-start">
      <div>
        <p className="lg:text-xs text-[10px] font-extralight tracking-[0.2em]">
          Developed by
        </p>
        <div className="flex justify-center">
          <Link href={"https://harjot.pro"} className=" underline decoration-primary/30 underline-offset-4">
            <h1 className="lg:text-3xl text-2xl font-heading font-extrabold text-primary opacity-95 hover:opacity-80 transition-all duration-300 ease-in-out">@HarjjotSinghh and @gargayush909</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
