import {  Link } from "@heroui/react";

export function Header() {


  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background-secondary/50 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/">
            <span className="text-xl font-bold tracking-tight m">Contact Search</span>
          </a>
        </div>

        {/* Links (Desktop) */}
        <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Home</Link>
          <Link href="/databases" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Databases</Link>
        </div>
        
      </div>
    </nav>
  );
}