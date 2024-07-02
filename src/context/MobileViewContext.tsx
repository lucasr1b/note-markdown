'use client';
import { usePathname } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type MobileViewContextType = {
  isMobileView: boolean;
  isMobileNavOpened: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
};

const MobileViewContext = createContext<MobileViewContextType | undefined>(undefined);

export const MobileViewProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);

  const pathname = usePathname();


  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobileNavOpened(false);
  }, [pathname]);

  const openMobileNav = () => setIsMobileNavOpened(true);
  const closeMobileNav = () => setIsMobileNavOpened(false);

  return (
    <MobileViewContext.Provider value={{ isMobileView, isMobileNavOpened, openMobileNav, closeMobileNav }}>
      {children}
    </MobileViewContext.Provider>
  );
};

export const useMobileView = () => {
  const context = useContext(MobileViewContext);
  if (!context) {
    throw new Error('useMobileView must be used within a MobileViewProvider');
  }
  return context;
};
