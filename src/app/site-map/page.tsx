import Link from 'next/link';
import { Globe, Code, Database, Settings, Users, BarChart3, Shield, Zap } from 'lucide-react';

export const metadata = {
  title: 'Sitemap - Skygorilla Ecosystem',
  description: 'Complete navigation and system overview for Skygorilla universe'
};

const ecosystemSections = [
  {
    title: 'Public Pages',
    icon: Globe,
    color: 'bg-blue-500',
    pages: [
      { name: 'Uvod', path: '/', description: 'Homepage with hero and calculator' },
      { name: 'Pretplate', path: '/pretplate', description: 'Subscription models and pricing' },
      { name: 'Politika', path: '/politika', description: 'Political news and analysis' },
      { name: 'Glas Otoka', path: '/pitch', description: 'Main brand presentation' },
      { name: 'Kultura', path: '/kultura', description: 'Cultural content and events' },
      { name: 'Sport', path: '/sport', description: 'Sports news and coverage' },
      { name: 'Kontakt', path: '/kontakt', description: 'Contact form and information' }
    ]
  },
  {
    title: 'Development Tools',
    icon: Code,
    color: 'bg-green-500',
    pages: [
      { name: 'DevTools Hub', path: '/devtools', description: 'Main development dashboard' },
      { name: 'Console', path: '/devtools/console', description: 'Debug console and logs' },
      { name: 'Network Monitor', path: '/devtools/network', description: 'API calls and performance' },
      { name: 'Performance', path: '/devtools/performance', description: 'Core Web Vitals tracking' },
      { name: 'Elements Inspector', path: '/devtools/elements', description: 'DOM inspection tools' },
      { name: 'Code Review', path: '/devtools/review', description: 'Automated code analysis' }
    ]
  },
  {
    title: 'API Endpoints',
    icon: Database,
    color: 'bg-purple-500',
    pages: [
      { name: 'Health Check', path: '/api/health', description: 'System status and monitoring' },
      { name: 'Contact API', path: '/api/contact', description: 'Form submission endpoint' },
      { name: 'Analytics API', path: '/api/analytics', description: 'Event tracking and metrics' }
    ]
  },
  {
    title: 'System Resources',
    icon: Settings,
    color: 'bg-orange-500',
    pages: [
      { name: 'Sitemap XML', path: '/sitemap.xml', description: 'SEO sitemap for search engines' },
      { name: 'Build Manifest', path: '/build-id.json', description: 'Build information and version' }
    ]
  }
];

const futureModules = [
  { name: 'User Management', icon: Users, description: 'Authentication and user profiles', status: 'planned' },
  { name: 'Analytics Dashboard', icon: BarChart3, description: 'Business intelligence and reporting', status: 'planned' },
  { name: 'Security Center', icon: Shield, description: 'Security monitoring and compliance', status: 'planned' },
  { name: 'Performance Hub', icon: Zap, description: 'Advanced performance optimization', status: 'planned' }
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Skygorilla Ecosystem</h1>
            <p className="text-muted-foreground text-lg">
              Complete navigation and system overview for the Skygorilla universe
            </p>
          </div>

          <div className="grid gap-8 mb-16">
            {ecosystemSections.map((section) => (
              <div key={section.title} className="bg-card rounded-lg border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg ${section.color}`}>
                    <section.icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.pages.map((page) => (
                    <Link
                      key={page.path}
                      href={page.path}
                      className="block p-4 rounded-lg border hover:border-primary transition-colors group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {page.name}
                        </h3>
                        <span className="text-xs text-muted-foreground font-mono">
                          {page.path}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {page.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Future Modules</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {futureModules.map((module) => (
                <div key={module.name} className="flex items-start gap-4 p-4 bg-background rounded-lg">
                  <div className="p-2 rounded-lg bg-muted-foreground/10">
                    <module.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{module.name}</h3>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        {module.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}