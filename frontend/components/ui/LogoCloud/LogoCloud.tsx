export default function LogoCloud() {
  return (
    <div>
      <p className="mt-24 text-xs uppercase 400 text-center font-bold tracking-[0.3em]">
        Brought to you by
      </p>
      <div className="grid grid-cols-1 place-items-center	my-12 space-y-4 sm:mt-8 sm:space-y-0 md:mx-auto md:max-w-2xl sm:grid sm:gap-6 sm:grid-cols-5">
        <div className="flex items-center justify-start h-12">
          <a href="https://nextjs.org" aria-label="Next.js Link">
            <img
              src="/nextjs.svg"
              alt="Next.js Logo"
              className="h-6 sm:h-12 "
            />
          </a>
        </div>
        <div className="flex items-center justify-start h-12">
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <img
              src="/vercel.svg"
              alt="Vercel.com Logo"
              className="h-6 "
            />
          </a>
        </div>
        <div className="flex items-center justify-start h-12">
          <a href="https://stripe.com" aria-label="stripe.com Link">
            <img
              src="/stripe.svg"
              alt="stripe.com Logo"
              className="h-12 "
            />
          </a>
        </div>
        <div className="flex items-center justify-start h-12">
          <a href="https://supabase.io" aria-label="supabase.io Link">
            <img
              src="/supabase.svg"
              alt="supabase.io Logo"
              className="h-10 "
            />
          </a>
        </div>
        <div className="flex items-center justify-start h-12">
          <a href="https://github.com" aria-label="github.com Link">
            <img
              src="/github.svg"
              alt="github.com Logo"
              className="h-8 "
            />
          </a>
        </div>
      </div>
    </div>
  );
}
