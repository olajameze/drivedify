import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  HomeIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  CurrencyPoundIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Students', href: '/dashboard/students', icon: UserGroupIcon },
  { name: 'Schedule', href: '/dashboard/schedule', icon: CalendarIcon },
  { name: 'Payments', href: '/dashboard/payments', icon: CurrencyPoundIcon },
  { name: 'Lesson Notes', href: '/dashboard/notes', icon: DocumentTextIcon },
  { name: 'Theory Quiz', href: '/dashboard/theory', icon: AcademicCapIcon },
  { name: 'Community', href: '/dashboard/community', icon: ChatBubbleLeftRightIcon },
  { name: 'Bookings', href: '/dashboard/bookings', icon: BookOpenIcon },
];

const SideNav: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="w-64 bg-white shadow-lg min-h-screen p-4">
      <div className="space-y-4">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNav;
