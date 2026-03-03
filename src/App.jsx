import React, { useEffect, useRef } from 'react';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Mail, 
  Github, 
  ExternalLink, 
  Terminal, 
  Database, 
  Layers,
  GraduationCap, // Now used in the Experience section
  Briefcase,
  LineChart
} from 'lucide-react';

function App() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.15 }
    );

    const currentSections = sectionsRef.current;
    currentSections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      currentSections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --bg-dark: #070214;
          --bg-card: rgba(30, 15, 60, 0.4);
          --accent-purple: #9333ea;
          --accent-cyan: #22d3ee;
          --text-main: #f8fafc;
          --text-dim: #94a3b8;
          --glass-border: rgba(255, 255, 255, 0.1);
        }

        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=JetBrains+Mono&display=swap');

        * { box-sizing: border-box; }
        body { 
          margin: 0; 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          background-color: var(--bg-dark); 
          color: var(--text-main); 
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        .bg-glow {
          position: fixed;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%);
          top: -100px;
          right: -100px;
          z-index: -1;
          filter: blur(80px);
          animation: float 10s infinite alternate;
        }

        @keyframes float {
          from { transform: translate(0, 0); }
          to { transform: translate(-100px, 100px); }
        }

        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 1.5rem 10%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(7, 2, 20, 0.7);
          backdrop-filter: blur(12px);
          z-index: 1000;
          border-bottom: 1px solid var(--glass-border);
        }

        .logo { 
          font-weight: 800; 
          font-size: 1.5rem; 
          background: linear-gradient(to right, var(--accent-cyan), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-links a {
          color: var(--text-dim);
          text-decoration: none;
          margin-left: 2rem;
          font-weight: 600;
          transition: 0.3s;
          font-size: 0.9rem;
        }

        .nav-links a:hover { color: var(--accent-cyan); }

        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 1rem;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 8vw, 5rem);
          margin: 0;
          line-height: 1.1;
        }

        .hero p {
          color: var(--accent-cyan);
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.2rem;
          margin-top: 1rem;
        }

        .btn-primary {
          margin-top: 2rem;
          padding: 1rem 2.5rem;
          background: linear-gradient(45deg, var(--accent-purple), #6366f1);
          border: none;
          color: white;
          border-radius: 50px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
          text-decoration: none;
          box-shadow: 0 10px 20px rgba(147, 51, 234, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(147, 51, 234, 0.5);
        }

        .section {
          padding: 100px 10%;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .section-title::after {
          content: "";
          height: 1px;
          flex-grow: 1;
          background: var(--glass-border);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1.5rem;
        }

        .skill-card {
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          padding: 1.5rem;
          border-radius: 16px;
          text-align: center;
          transition: 0.3s;
        }

        .skill-card:hover {
          border-color: var(--accent-cyan);
          background: rgba(147, 51, 234, 0.1);
          transform: translateY(-5px);
        }

        .skill-card svg { color: var(--accent-cyan); margin-bottom: 10px; }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          padding: 2rem;
          border-radius: 20px;
          transition: 0.3s;
        }

        .project-card:hover { border-color: var(--accent-purple); }
        .project-card h3 { color: var(--accent-cyan); margin-top: 1rem; }
        .project-card p { color: var(--text-dim); line-height: 1.6; font-size: 0.95rem; }

        .tag {
          font-size: 0.7rem;
          background: rgba(34, 211, 238, 0.1);
          color: var(--accent-cyan);
          padding: 4px 10px;
          border-radius: 4px;
          margin-right: 8px;
          font-family: 'JetBrains Mono', monospace;
        }

        .timeline {
          border-left: 2px solid var(--accent-purple);
          padding-left: 2rem;
          margin-left: 1rem;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
        }

        .timeline-item::before {
          content: "";
          position: absolute;
          left: -2.6rem;
          top: 0.5rem;
          width: 16px;
          height: 16px;
          background: var(--accent-purple);
          border-radius: 50%;
          box-shadow: 0 0 15px var(--accent-purple);
        }

        .footer {
          padding: 4rem 10%;
          text-align: center;
          border-top: 1px solid var(--glass-border);
          color: var(--text-dim);
        }

        @media (max-width: 768px) {
          .navbar { padding: 1rem 5%; }
          .nav-links { display: none; }
          .section { padding: 60px 5%; }
        }
      `}</style>

      <div className="bg-glow"></div>
      
      <nav className="navbar">
        <div className="logo">ANIQUE.DEV</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero">
        <p>// IT Engineer & Data Science Enthusiast</p>
        <h1>Anique Shaikh<span>.</span></h1>
        <p style={{color: 'var(--text-dim)', maxWidth: '700px', fontSize: '1.1rem'}}>
          Transitioning from AI & ML Diploma to Information Technology Degree. 
          Bridging corporate operations with full-stack development.
        </p>
        <a href="#projects" className="btn-primary">Explore My Work</a>
      </header>

      <main>
        <section id="about" className="section" ref={addToRefs}>
          <h2 className="section-title"><Terminal size={32} /> The Profile</h2>
          <div style={{maxWidth: '850px', fontSize: '1.1rem', color: 'var(--text-dim)', lineHeight: '1.8'}}>
            <p>
              I am an aspiring Information Technology engineer with a foundational background in <span style={{color: 'var(--text-main)'}}>AI and Machine Learning</span>. 
              My journey began with a diploma where I mastered core computing fundamentals, leading me to specialize in 
              the <span style={{color: 'var(--text-main)'}}>Spring Boot ecosystem</span> and <span style={{color: 'var(--text-main)'}}>React</span>.
            </p>
            <p>
              Having worked in high-pressure environments like Amazon, I've developed a unique blend of 
              <span style={{color: 'var(--accent-cyan)'}}> operational management</span> and <span style={{color: 'var(--accent-cyan)'}}>technical problem-solving</span> skills. 
              My goal is to build intelligent, data-driven applications that solve complex real-world logistics and user experience challenges.
            </p>
          </div>
        </section>

        <section id="experience" className="section" ref={addToRefs}>
          <h2 className="section-title"><GraduationCap size={32} /> Career & Education</h2>
          <div className="timeline">
            <div className="timeline-item">
              <h3 style={{margin: 0}}>B.E. in Information Technology</h3>
              <p style={{color: 'var(--accent-cyan)', margin: '5px 0'}}>Bharati Vidyapeeth College of Engineering, Navi Mumbai • 2025 - 2028</p>
              <p style={{color: 'var(--text-dim)'}}>Pursuing an advanced degree focusing on Software Engineering, Data Structures, and Enterprise Systems.</p>
            </div>
            
            <div className="timeline-item">
              <h3 style={{margin: 0}}>Warehouse Associate</h3>
              <p style={{color: 'var(--accent-cyan)', margin: '5px 0'}}>Amazon FC BOM7 (Bhiwandi) • 2025</p>
              <p style={{color: 'var(--text-dim)'}}>Gained hands-on experience in corporate management and logistics.</p>
            </div>

            <div className="timeline-item">
              <h3 style={{margin: 0}}>Data Science Intern</h3>
              <p style={{color: 'var(--accent-cyan)', margin: '5px 0'}}>MIT Milestone Institute of Technology • 2024</p>
              <p style={{color: 'var(--text-dim)'}}>Specialized in refining datasets and performing predictive analytics.</p>
            </div>

            <div className="timeline-item">
              <h3 style={{margin: 0}}>Diploma in AI & ML</h3>
              <p style={{color: 'var(--accent-cyan)', margin: '5px 0'}}>Abdul Razzaq Kalsekar Polytechnic • 2022 - 2025</p>
              <p style={{color: 'var(--text-dim)'}}>Fundamental training in ML algorithms and statistical analysis.</p>
            </div>
          </div>
        </section>

        <section id="skills" className="section" ref={addToRefs}>
          <h2 className="section-title"><Cpu size={32} /> Technical Arsenal</h2>
          <div className="skills-grid">
            {[
              { name: 'Java', icon: <Layers /> },
              { name: 'Spring Boot', icon: <Database /> },
              { name: 'React.js', icon: <Code2 /> },
              { name: 'Python', icon: <LineChart /> },
              { name: 'Data Analytics', icon: <Globe /> },
              { name: 'C++ / DSA', icon: <Terminal /> },
              { name: 'SQL / DB', icon: <Database /> },
              { name: 'Machine Learning', icon: <Cpu /> }
            ].map(skill => (
              <div className="skill-card" key={skill.name}>
                {skill.icon}
                <div style={{fontSize: '0.9rem', fontWeight: '600'}}>{skill.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section" ref={addToRefs}>
          <h2 className="section-title">
            <Code2 size={32} /> Featured Projects
          </h2>

          <div className="projects-grid">

            {/* AI FACE RECOGNITION PROJECT */}
            <div className="project-card">
              <a
                href="https://github.com/ANIQUESK/AI_BASED_FACE_RECOGNITION_AND_ATTENDANCE_SYSTEM"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink
                  size={20}
                  style={{ float: "right", color: "var(--text-dim)" }}
                />
              </a>

              <h3>AI Face Recognition Attendance System</h3>

              <p>
                An intelligent attendance automation system developed using Python,
                OpenCV, and MySQL. Detects faces in real-time and automatically
                records attendance through a GUI-based desktop application.
              </p>

              <div style={{ marginTop: "1.7rem" }}>
                <span className="tag">Python</span>
                <span className="tag">OpenCV</span>
                <span className="tag">Machine Learning</span>
                <span className="tag">MySQL</span>
                <span className="tag">Tkinter</span>
              </div>
            </div>

            {/* E-COMMERCE */}
            <div className="project-card">
              <Github
                size={20}
                style={{ float: "right", color: "var(--text-dim)" }}
              />
              <h3>Full-Stack E-Commerce</h3>

              <p>
                A comprehensive platform featuring a Spring Boot backend,
                React frontend, and PostgreSQL database integration.
              </p>

              <div style={{ marginTop: "1.5rem" }}>
                <span className="tag">Spring Boot</span>
                <span className="tag">React</span>
                <span className="tag">JWT</span>
              </div>
            </div>

            {/* PORTFOLIO */}
            <div className="project-card">
              <ExternalLink
                size={20}
                style={{ float: "right", color: "var(--text-dim)" }}
              />

              <h3>Neural Portfolio</h3>

              <p>
                A glassmorphic personal brand site utilizing high-performance
                animations and modern UI design principles.
              </p>

              <div style={{ marginTop: "1.5rem" }}>
                <span className="tag">Modern UI</span>
                <span className="tag">Framer</span>
                <span className="tag">Lucide</span>
              </div>
            </div>

          </div>
        </section>

        <section id="contact" className="section" ref={addToRefs} style={{textAlign: 'center'}}>
          <h2 className="section-title" style={{justifyContent: 'center'}}>Get In Touch</h2>
          <p style={{fontSize: '1.2rem', color: 'var(--text-dim)', marginBottom: '2rem'}}>
            Currently open to internships and full-stack development opportunities.
          </p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'}}>
            <a href="mailto:shaikhanique07@gmail.com" className="btn-primary" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <Mail size={20} /> Email Me
            </a>
            <a href="https://github.com/ANIQUESK" target="_blank" rel="noreferrer" className="btn-primary" style={{background: 'transparent', border: '1px solid var(--accent-purple)'}}>
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Anique Shaikh | Built with Passion & React</p>
      </footer>
    </>
  );
}

export default App;
