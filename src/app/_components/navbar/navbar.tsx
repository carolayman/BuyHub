'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  ShoppingCart,
  Menu,
  X,
  User,
  Package,
  Grid3X3,
  Store,
  LogIn,
  UserPlus,
  Home,
  LogOut,
  Settings,
  ChevronDown,
  LockKeyhole,
  UserRound,
  MapPin,
} from 'lucide-react'
import SearchBar from '../SearchBar/SearchBar'

const ACCOUNT_LINKS = [
  {
    name: 'Edit Profile',
    href: '/profile/edit-profile',
    icon: UserRound,
  },
  {
    name: 'Change Password',
    href: '/profile/change-password',
    icon: LockKeyhole,
  },
  {
    name: 'Addresses',
    href: '/profile/addresses',
    icon: MapPin,
  },
]

export default function Navbar({
  cartIcon,
  wishlistIcon,
}: {
  cartIcon: React.ReactNode
  wishlistIcon: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const pathname = usePathname()
  const { data: session, status } = useSession()

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Categories', href: '/categories', icon: Grid3X3 },
    { name: 'Brands', href: '/brands', icon: Store },
  ]

  const isAccountActive = ACCOUNT_LINKS.some(
    (link) => pathname === link.href
  )

  const logOut = () => {
    signOut({ callbackUrl: '/login' })
  }

  const closeMenu = () => {
    setIsOpen(false)
    setSettingsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-[76px] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            onClick={closeMenu}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 shadow-sm shadow-green-500/20">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>

            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Buy<span className="text-green-500">Hub</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-green-500'
                    : 'text-gray-600 hover:text-green-500'
                }`}
              >
                {link.name}

                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-green-500" />
                )}
              </Link>
            ))}
          </div>

          <SearchBar className="hidden w-full max-w-[220px] lg:block xl:max-w-[260px]" />

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            {session ? (
              <>
                {wishlistIcon}
                {cartIcon}

                <div className="mx-2 h-7 w-px bg-gray-200" />

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSettingsOpen((prev) => !prev)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      settingsOpen || isAccountActive
                        ? 'text-green-600'
                        : 'text-gray-700 hover:text-green-500'
                    }`}
                    aria-expanded={settingsOpen}
                  >
                    <Settings className="h-4 w-4" />
                    Settings

                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        settingsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {settingsOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                      {ACCOUNT_LINKS.map(({ name, href, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setSettingsOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                            pathname === href
                              ? 'bg-green-50 font-semibold text-green-600'
                              : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={logOut}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="mx-2 h-7 w-px bg-gray-200" />

                <Link
                  href="/login"
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === '/login'
                      ? 'text-green-500'
                      : 'text-gray-700 hover:text-green-500'
                  }`}
                >
                  <User className="h-4 w-4" />
                  Login
                </Link>

                <Link
                  href="/register"
                  className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all ${
                    pathname === '/register'
                      ? 'bg-green-600'
                      : 'bg-green-500 hover:bg-green-600 hover:shadow-md hover:shadow-green-500/20'
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100 md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-gray-100 py-5 md:hidden">
            <div className="mb-4">
              <SearchBar className="w-full" onNavigate={closeMenu} />
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base transition-all ${
                      pathname === link.href
                        ? 'bg-green-50 font-semibold text-green-500'
                        : 'font-medium text-gray-700 hover:bg-gray-50 hover:text-green-500'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                )
              })}

              {session && (
                <>
                  <Link
                    href="/wishlist"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-1.5 text-gray-700 transition hover:bg-green-50"
                  >
                    {wishlistIcon}
                    <span className="text-sm font-medium">Wishlist</span>
                  </Link>

                  <Link
                    href="/cart"
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-xl px-1.5 text-gray-700 transition hover:bg-green-50"
                  >
                    {cartIcon}
                    <span className="text-sm font-medium">Cart</span>
                  </Link>
                    
                  <button
                    type="button"
                    onClick={() => setSettingsOpen((prev) => !prev)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition ${
                      isAccountActive
                        ? 'text-green-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-green-500'
                    }`}
                    aria-expanded={settingsOpen}
                  >
                    <span className="flex items-center gap-3">
                      <Settings className="h-5 w-5" />
                      Settings
                    </span>

                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        settingsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {settingsOpen && (
                    <div className="space-y-1">
                      {ACCOUNT_LINKS.map(({ name, href, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeMenu}
                          className={`flex items-center gap-3 rounded-xl py-3 pl-12 pr-4 text-sm font-medium transition ${
                            pathname === href
                              ? 'bg-green-50 text-green-600'
                              : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {status !== 'loading' && (
              <div className="mt-4 flex gap-3 border-t border-gray-100 pt-4">
                {session ? (
                  <button
                    type="button"
                    onClick={logOut}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition-all ${
                        pathname === '/login'
                          ? 'border-green-200 bg-green-50 font-semibold text-green-500'
                          : 'border-gray-200 font-semibold text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={closeMenu}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-green-600"
                    >
                      <UserPlus className="h-4 w-4" />
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
