
import Link from 'next/link'
import {
  UserRound,
  LockKeyhole,
  MapPin,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react'

const ROUTES = {
  profile: '/profile/edit-profile',
  password: '/profile/change-password',
  addresses: '/profile/addresses',
}

const tabs = [
  {
    key: 'profile' as const,
    label: 'Personal info',
    hint: 'Name, email, phone',
    icon: UserRound,
    href: ROUTES.profile,
  },
  {
    key: 'password' as const,
    label: 'Password',
    hint: 'Keep your account safe',
    icon: LockKeyhole,
    href: ROUTES.password,
  },
  {
    key: 'addresses' as const,
    label: 'Addresses',
    hint: 'Where we deliver',
    icon: MapPin,
    href: ROUTES.addresses,
  },
]

type Props = {
  active: 'profile' | 'password' | 'addresses'
  title: string
  subtitle: string
  children: React.ReactNode
}

export default function AccountShell({
  active,
  title,
  subtitle,
  children,
}: Props) {
  return (
    <main className="min-h-[calc(100svh-76px)] bg-[#f4f6f4] px-3 py-6 sm:px-5 sm:py-10">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] ring-1 ring-black/5 lg:grid-cols-[260px_minmax(0,1fr)]">

        <aside className="relative flex min-w-0 flex-col overflow-hidden bg-gradient-to-br from-emerald-800 via-green-700 to-emerald-600 p-5 text-white sm:p-7 lg:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <p className="text-2xl font-extrabold tracking-tight">
              Buy<span className="text-emerald-100">Hub</span>
            </p>
            <p className="mt-1 text-xs text-emerald-50/80">
              Account settings
            </p>
          </div>

          <nav className="relative mt-6 grid grid-cols-3 gap-2 lg:mt-10 lg:grid-cols-1 lg:gap-3">
            {tabs.map(({ key, label, hint, icon: Icon, href }) => {
              const isActive = key === active

              return (
                <Link
                  key={key}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-w-0 flex-col items-center justify-center gap-2 rounded-xl px-2 py-3 text-center transition sm:flex-row sm:justify-start sm:px-3 sm:text-left lg:gap-3 lg:px-4 lg:py-3.5 ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-emerald-50/90 hover:bg-white/10'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-xs font-semibold leading-tight sm:text-sm">
                      {label}
                    </span>

                    <span
                      className={`mt-1 hidden text-[11px] lg:block ${
                        isActive
                          ? 'text-emerald-800/70'
                          : 'text-emerald-50/70'
                      }`}
                    >
                      {hint}
                    </span>
                  </span>
                </Link>
              )
            })}
          </nav>

          <div className="relative mt-6 hidden items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-4 lg:mt-auto lg:flex">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-100" />
            <p className="text-[11px] leading-relaxed text-emerald-50/85">
              Your information is encrypted and never shared with anyone.
            </p>
          </div>
        </aside>

        <section className="flex min-w-0 flex-col p-5 sm:p-8 lg:p-10">
          <header className="mb-7 sm:mb-9">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              {subtitle}
            </p>
          </header>

          <div className="min-w-0 flex-1">
            {children}
          </div>

          <footer className="mt-8 border-t border-gray-100 pt-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 transition hover:text-emerald-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Home
            </Link>
          </footer>
        </section>
      </div>
    </main>
  )
}
