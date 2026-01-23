'use client'

import { LayoutDashboard, BookOpen, Users, FileText, Settings, LogOut, Menu, X, DollarSign, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { useState } from 'react'
import Link from 'next/link'
import { useClerk, useUser, SignedIn, UserButton } from '@clerk/nextjs'

interface AdminSidebarProps {
  currentPage?: 'dashboard' | 'courses' | 'chapters' | 'students' | 'purchases' | 'settings'
}

export function AdminSidebar({ currentPage = 'dashboard' }: AdminSidebarProps) {
  const isMobile = useIsMobile()
  const { signOut } = useClerk()
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/admin',
      id: 'dashboard'
    },
    {
      icon: BookOpen,
      label: 'Cursos',
      href: '/admin/courses',
      id: 'courses'
    },
    {
      icon: FileText,
      label: 'Capítulos e Aulas',
      href: '/admin/chapters',
      id: 'chapters'
    },
    {
      icon: Users,
      label: 'Alunos',
      href: '/admin/students',
      id: 'students'
    },
    {
      icon: DollarSign,
      label: 'Vendas',
      href: '/admin/sales',
      id: 'purchases'
    },
    {
      icon: Settings,
      label: 'Configurações',
      href: '/admin/settings',
      id: 'settings'
    }
  ]

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-emerald-700">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg">Admin</h1>
          <p className="text-emerald-200 text-xs">Casa dos Painéis</p>
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
                  {user?.firstName || 'Administrador'}
                </p>
                <p className="text-emerald-200 text-xs truncate">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </div>
          </div>
        </SignedIn>

        <div className="space-y-2 mt-3">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-4 text-sm text-emerald-100 hover:bg-white/10 hover:text-white"
            >
              <LayoutDashboard className="w-4 h-4" />
              Ver Site
            </Button>
          </Link>
          <SignedIn>
            <Button
              variant="ghost"
              onClick={() => signOut(() => window.location.href = '/')}
              className="w-full justify-start gap-3 h-10 px-4 text-sm text-emerald-100 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </SignedIn>
        </div>
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
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">Admin</span>
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
