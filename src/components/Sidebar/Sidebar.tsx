import './Sidebar.css';
import resume from '@/assets/resume.svg';
import linkedin from '@/assets/linkedin.svg';
import github from '@/assets/github.svg';
import email from '@/assets/email.svg';
import me from '@/assets/pat.jpg';

function Sidebar() {
  return (
    <section className="sidebar">
      <header className="sidebar-header">
        <img src={me} alt="Hey, it's me!" />
        <h1>patneal.codes</h1>
      </header>
      <nav>
        <div className="nav-item">
          <span>Resume</span>
          <a className="nav-link" href="#" target="_blank">Download my resume <img src={resume} alt="Download my resume" /></a>
        </div>
        <div className="nav-item">
          <span>LinkedIn</span>
          <a className="nav-link" href="https://www.linkedin.com/in/patnealcodes" target="_blank">Connect with me <img src={linkedin} alt="Connect with me on LinkedIn" /></a>
        </div>
        <div className="nav-item">
          <span>GitHub</span>
          <a className="nav-link" href="https://github.com/patnealcodes/patgpt" target="_blank">View this source <img src={github} alt="View this source on GitHub" /></a>
        </div>
        <div className="nav-item">
          <span>Email</span>
          <a className="nav-link" href="#">Contact me directly <img src={email} alt="Contact me directly via email" /></a>
        </div>
      </nav>
    </section>
  );
}

export default Sidebar;
