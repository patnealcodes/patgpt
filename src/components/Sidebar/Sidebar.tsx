import './Sidebar.css';

function Sidebar() {
  return (
    <section className="sidebar">
      <header>
        <h1>PatGPT</h1>
        <h2>at patneal.codes</h2>
      </header>
      <nav>
        <a className="nav-link" href="#" target="_blank">Download Resume</a>
        <a className="nav-link" href="https://www.linkedin.com/in/patnealcodes" target="_blank">Connect with me</a>
        <a className="nav-link" href="https://github.com/patnealcodes/patgpt" target="_blank">View this source</a>
        <a className="nav-link" href="#">Contact me directly</a>
      </nav>
    </section>
  );
}

export default Sidebar;
