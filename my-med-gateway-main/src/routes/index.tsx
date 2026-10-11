import { createFileRoute, Link } from "@tanstack/react-router";
import { Ambulance, Bell, Building2, FileHeart, LineChart, Pill, Phone, Siren, Stethoscope, ArrowRight, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DemoBadge, DemoNotice } from "@/components/common";
import { hospitals } from "@/data/hospitals";
import { notifications } from "@/data/health";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediResQ — Emergency & Health Dashboard" },
      { name: "description", content: "Find hospitals, request an ambulance (simulated), and access healthcare services in one place. Prototype with sample data." },
      { property: "og:title", content: "MediResQ — Emergency & Health Dashboard" },
      { property: "og:description", content: "An integrated healthcare platform prototype connecting patients, hospitals, doctors and pharmacies." },
    ],
  }),
  component: Home,
});

const quick = [
  { to: "/hospitals", label: "Hospitals", desc: "Pan-India directory", icon: Building2 },
  { to: "/patient-login", label: "Patient Login", desc: "Prototype demo verification", icon: UserRound },
  { to: "/ambulance", label: "Ambulances", desc: "Simulated request", icon: Ambulance },
  { to: "/doctors", label: "Doctors", desc: "Sample directory", icon: Stethoscope },
  { to: "/medicines", label: "Medicines", desc: "Info & pharmacies", icon: Pill },
  { to: "/records", label: "Medical Records", desc: "Consent demo", icon: FileHeart },
  { to: "/dashboard", label: "Health Dashboard", desc: "Public health view", icon: LineChart },
] as const;

const contacts = [
  { label: "National Emergency", number: "112" },
  { label: "Ambulance", number: "108" },
  { label: "Police", number: "100" },
  { label: "Fire", number: "101" },
];

function Home() {
  return (
    <div className="space-y-8">
      <section className="bg-hero relative overflow-hidden rounded-3xl p-6 text-primary-foreground sm:p-10">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold">Prototype · Demo mode</span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">Healthcare, connected in one place.</h1>
            <p className="mt-3 max-w-xl text-primary-foreground/80">
              MediResQ shows how patients, hospitals, doctors, pharmacies, ambulances and health authorities could work together. Hospital listings show names and cities; operational data is not verified.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-primary-foreground/10 p-6 text-center backdrop-blur">
            <Dialog>
              <DialogTrigger asChild>
                <button className="pulse-ring grid h-32 w-32 place-items-center rounded-full bg-emergency text-destructive-foreground shadow-emergency transition-transform hover:scale-105" aria-label="Emergency assistance">
                  <span className="flex flex-col items-center gap-1 font-display text-lg font-bold"><Siren className="h-9 w-9" />SOS</span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-emergency"><Siren className="h-5 w-5" /> Emergency assistance</DialogTitle>
                  <DialogDescription>MediResQ is a prototype and cannot contact emergency services. For a real emergency, call directly:</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-2">
                  {contacts.map((c) => (
                    <a key={c.number} href={`tel:${c.number}`} className="flex flex-col rounded-xl border p-3 hover:bg-muted">
                      <span className="text-xs text-muted-foreground">{c.label}</span>
                      <span className="flex items-center gap-1 text-xl font-bold text-primary"><Phone className="h-4 w-4" />{c.number}</span>
                    </a>
                  ))}
                </div>
                <Button asChild variant="emergency"><Link to="/ambulance">Try simulated ambulance request</Link></Button>
              </DialogContent>
            </Dialog>
            <p className="text-sm font-medium">Emergency assistance</p>
            <p className="text-xs text-primary-foreground/70">Shows real helpline numbers (India)</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-primary">Quick access</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quick.map((q) => (
            <Link key={q.to} to={q.to} className="group rounded-2xl border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-teal">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-teal group-hover:text-primary-foreground"><q.icon className="h-5 w-5" /></div>
              <p className="mt-3 font-semibold">{q.label}</p>
              <p className="text-xs text-muted-foreground">{q.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border bg-card p-5 shadow-card">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-lg font-bold text-primary"><Building2 className="h-5 w-5 text-teal" /> Pan-India hospital directory</h2>
            <DemoBadge>Names and locations only</DemoBadge>
          </div>
          <ul className="mt-4 space-y-3">
            {hospitals.slice(0, 4).map((h) => {
              return (
                <li key={h.id}>
                  <Link to="/hospitals/$id" params={{ id: h.id }} className="block rounded-lg p-2 hover:bg-muted">
                    <div className="flex justify-between gap-2 text-sm"><span className="font-medium">{h.name}</span><span className="shrink-0 text-muted-foreground">{h.city}, {h.state}</span></div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">{hospitals.length} directory listings across {new Set(hospitals.map((h) => h.state)).size} states/territories. Contact details and live availability are not verified.</p>
          <Button asChild variant="outline" className="mt-3 w-full"><Link to="/hospitals">Find a hospital <ArrowRight /></Link></Button>
        </section>

        <section className="rounded-2xl border bg-card p-5 shadow-card">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-primary"><Bell className="h-5 w-5 text-teal" /> Recent notifications</h2>
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li key={n.id} className="rounded-xl border p-3">
                <div className="flex items-center justify-between gap-2"><p className="text-sm font-semibold">{n.title}</p><span className="shrink-0 text-xs text-muted-foreground">{n.time}</span></div>
                <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <DemoNotice>
        <strong>Demo mode:</strong> hospital directory entries show names and cities only. Bed availability, hospital contacts, doctors, pharmacies and notifications are not live verified information. Helpline numbers 112, 108, 100 and 101 are real Indian public services — use them in a genuine emergency.
      </DemoNotice>
    </div>
  );
}
