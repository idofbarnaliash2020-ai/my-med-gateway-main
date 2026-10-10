import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Siren } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "./common";

export const navItems = [
  { to: "/hospitals", label: "Hospitals" },
  { to: "/ambulance", label: "Ambulance" },
  { to: "/doctors", label: "Doctors" },
  { to: "/medicines", label: "Medicines" },
  { to: "/records", label: "Records" },
  { to: "/dashboard", label: "Gov Dashboard" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="bg-warning-soft py-1 text-center text-xs font-medium text-warning">
        Prototype · all data is sample data · not for real emergencies — call 112
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" aria-label="MediResQ home"><Logo /></Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" activeProps={{ className: "bg-accent !text-accent-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="emergency" size="sm" className="hidden sm:inline-flex">
            <Link to="/ambulance"><Siren /> Emergency</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader><SheetTitle><Logo /></SheetTitle></SheetHeader>
              <nav className="mt-2 flex flex-col gap-1 px-4">
                <Link to="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 font-medium hover:bg-muted" activeOptions={{ exact: true }} activeProps={{ className: "bg-accent text-accent-foreground" }}>Home</Link>
                {navItems.map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 font-medium hover:bg-muted" activeProps={{ className: "bg-accent text-accent-foreground" }}>{n.label}</Link>
                ))}
                <Button asChild variant="emergency" className="mt-4">
                  <Link to="/ambulance" onClick={() => setOpen(false)}><Siren /> Emergency help</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-muted/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <Logo />
        <p className="max-w-xl">
          MediResQ is a student innovation prototype. It uses fictional sample data, does not dispatch ambulances, does not verify doctors, and does not store real health information. In an emergency, call <strong className="text-foreground">112</strong> (India).
        </p>
      </div>
    </footer>
  );
}
