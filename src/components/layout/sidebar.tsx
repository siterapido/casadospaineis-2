'use client'

import { BookOpen, Home, BarChart3, LogOut, Menu, X, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { useState } from 'react'
import Link from 'next/link'
import { useClerk, useUser, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

interface SidebarProps {
  currentPage?: 'home' | 'dashboard' | 'courses'
}

export function Sidebar({ currentPage = 'home' }: SidebarProps) {
  const isMobile = useIsMobile()
  const { signOut } = useClerk()
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    {
      icon: Home,
      label: 'Início',
      href: '/',
      id: 'home'
    },
    {
      icon: BookOpen,
      label: 'Cursos',
      href: '/courses',
      id: 'courses'
    },
    {
      icon: BarChart3,
      label: 'Dashboard',
      href: '/dashboard',
      id: 'dashboard'
    }
  ]

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-emerald-700">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg">Casa dos Painéis</h1>
          <p className="text-emerald-200 text-xs">Plataforma de Cursos</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-12 px-4 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/20 text-white hover:bg-white/25'
                    : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-emerald-700">
        <SignedIn>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {user?.firstName || 'Usuário'}
                </p>
                <p className="text-emerald-200 text-xs truncate">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </div>
          </div>
        </SignedIn>

        <SignedOut>
          <div className="space-y-2">
            <Link href="/login">
              <Button
                className="w-full justify-start gap-3 h-10 px-4 text-sm text-emerald-100 hover:bg-white/10 hover:text-white"
              >
                <User className="w-4 h-4" />
                Fazer Login
              </Button>
            </Link>
            <Link href="/register">
              <Button
                className="w-full justify-start gap-3 h-10 px-4 text-sm bg-white/20 text-white hover:bg-white/30"
              >
                Criar Conta
              </Button>
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <Button
            variant="ghost"
            onClick={() => signOut(() => window.location.href = '/')}
            className="w-full justify-start gap-3 h-10 px-4 text-sm text-emerald-100 hover:bg-white/10 hover:text-white mt-3"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </SignedIn>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="h-10 w-10"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">Casa dos Painéis</span>
            </div>
          </div>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-72 bg-emerald-800"
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </div>
          </div>
        )}

        {/* Spacer for mobile header */}
        <div className="lg:hidden h-16" />
      </>
    )
  }

  return (
    <div className="hidden lg:flex w-64 flex-col fixed left-0 top-0 bottom-0 bg-gradient-to-b from-emerald-800 to-emerald-900 border-r border-emerald-700">
      {sidebarContent}
    </div>
  )
}
