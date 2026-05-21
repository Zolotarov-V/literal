import { useState } from 'react'
import './index.css'

// Icons as simple SVG components
const Icons = {
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Blocks: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/>
    </svg>
  ),
  GitBranch: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>
    </svg>
  ),
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/>
    </svg>
  ),
  Puzzle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.707c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/>
    </svg>
  ),
  Rocket: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  Play: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  Bot: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>
    </svg>
  ),
  Cog: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  Twitter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  ),
  Github: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  ),
  Linkedin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
}

// Header Component
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#" className="logo">
          <div className="logo-icon">
            <Icons.Zap />
          </div>
          AgentFlow
        </a>

        <nav className="nav">
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#docs" className="nav-link">Docs</a>
          <a href="#blog" className="nav-link">Blog</a>
        </nav>

        <div className="header-buttons">
          <button className="btn btn-ghost">Sign In</button>
          <button className="btn btn-primary">Get Started</button>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icons.Menu />
        </button>
      </div>
    </header>
  )
}

// Hero Component
function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Now in Public Beta
          </div>

          <h1 className="hero-title">
            Build AI Agents<br />
            <span className="hero-title-gradient">Without Code</span>
          </h1>

          <p className="hero-description">
            Visual drag-and-drop builder for creating intelligent AI agents.
            Connect models, define workflows, and deploy in minutes.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary btn-large">
              Start Building Free
            </button>
            <button className="btn btn-outline btn-large">
              <Icons.Play /> Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Component
function Features() {
  const features = [
    {
      icon: <Icons.Blocks />,
      title: 'Visual Builder',
      description: 'Drag-and-drop interface to create complex AI workflows without writing a single line of code.'
    },
    {
      icon: <Icons.Zap />,
      title: 'Pre-built Templates',
      description: 'Start fast with 50+ templates for customer support, data analysis, content creation, and more.'
    },
    {
      icon: <Icons.GitBranch />,
      title: 'Conditional Logic',
      description: 'Build smart agents with branching logic, loops, and dynamic decision-making capabilities.'
    },
    {
      icon: <Icons.Brain />,
      title: 'Multi-Model Support',
      description: 'Connect to GPT-4, Claude, Llama, Mistral and other LLMs. Switch models with one click.'
    },
    {
      icon: <Icons.Puzzle />,
      title: '100+ Integrations',
      description: 'Connect to Slack, Discord, Notion, Google Sheets, Airtable, and your favorite tools.'
    },
    {
      icon: <Icons.Rocket />,
      title: 'One-Click Deploy',
      description: 'Deploy agents as APIs, chatbots, or scheduled jobs. Scale automatically with usage.'
    }
  ]

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Features</span>
          <h2 className="section-title">Everything you need to build AI agents</h2>
          <p className="section-description">
            Powerful tools for developers and non-technical users alike.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Builder Preview Component
function BuilderPreview() {
  const nodes = [
    { icon: <Icons.Play />, label: 'Trigger', sublabel: 'New Message', type: 'trigger' },
    { icon: <Icons.Bot />, label: 'AI Agent', sublabel: 'GPT-4 Turbo', type: 'ai' },
    { icon: <Icons.Cog />, label: 'Process', sublabel: 'Extract Data', type: 'action' },
    { icon: <Icons.Send />, label: 'Output', sublabel: 'Send Response', type: 'output' }
  ]

  return (
    <section className="builder-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Builder</span>
          <h2 className="section-title">Visual workflow editor</h2>
          <p className="section-description">
            Create powerful AI agents with our intuitive drag-and-drop interface.
          </p>
        </div>

        <div className="builder-preview">
          <div className="builder-header">
            <span className="builder-dot builder-dot-red"></span>
            <span className="builder-dot builder-dot-yellow"></span>
            <span className="builder-dot builder-dot-green"></span>
            <span className="builder-title">customer-support-agent.flow</span>
          </div>

          <div className="builder-canvas">
            <div className="workflow-container">
              {nodes.map((node, index) => (
                <>
                  <div key={node.label} className="node">
                    <div className={`node-icon node-icon-${node.type}`}>
                      {node.icon}
                    </div>
                    <div className="node-label">{node.label}</div>
                    <div className="node-sublabel">{node.sublabel}</div>
                  </div>
                  {index < nodes.length - 1 && <div className="connector"></div>}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Stats Component
function Stats() {
  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '50M+', label: 'Agents Created' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '<100ms', label: 'Avg Response' }
  ]

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Component
function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <h2 className="cta-title">Ready to build your first agent?</h2>
        <p className="cta-description">
          Start for free. No credit card required. Upgrade as you grow.
        </p>
        <div className="cta-buttons">
          <button className="btn btn-primary btn-large">Get Started Free</button>
          <button className="btn btn-outline btn-large">Talk to Sales</button>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              <div className="logo-icon">
                <Icons.Zap />
              </div>
              AgentFlow
            </a>
            <p>Build, deploy, and scale AI agents without code. The future of automation is here.</p>
          </div>

          <div>
            <h4 className="footer-title">Product</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Features</a>
              <a href="#" className="footer-link">Pricing</a>
              <a href="#" className="footer-link">Templates</a>
              <a href="#" className="footer-link">Integrations</a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Resources</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Documentation</a>
              <a href="#" className="footer-link">API Reference</a>
              <a href="#" className="footer-link">Blog</a>
              <a href="#" className="footer-link">Community</a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Company</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">About</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Contact</a>
              <a href="#" className="footer-link">Privacy</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">2024 AgentFlow. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" className="footer-social"><Icons.Twitter /></a>
            <a href="#" className="footer-social"><Icons.Github /></a>
            <a href="#" className="footer-social"><Icons.Linkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <BuilderPreview />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
