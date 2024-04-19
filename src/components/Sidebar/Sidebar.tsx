import './Sidebar.css';

function Sidebar() {
  return (
    <section className="sidebar">
      <header>
        <h1>PatGPT</h1>
        <h2>at patneal.codes</h2>
      </header>
      <nav>
        <a href="#">Resume</a>
        <a href="#">LinkedIn</a>
        <a href="#">GitHub</a>
        <a href="#">Contact</a>
      </nav>
    </section>
  );
}

export default Sidebar;
