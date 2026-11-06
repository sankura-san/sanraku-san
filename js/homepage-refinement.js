/* Homepage-only content refinement. Existing navigation and other sections stay intact. */
(() => {
  "use strict";

  const view = document.getElementById("view");
  if (!view) return;

  const homeMarkup = `
    <section class="home-layout" aria-label="Portfolio introduction">
      <div class="home-kicker">
        <span class="home-kicker-dot" aria-hidden="true"></span>
        <span>FIRST-YEAR COMPUTER SCIENCE STUDENT</span>
        <span class="home-kicker-separator">/</span>
        <span>UNIVERSITY OF THE CORDILLERAS</span>
      </div>

      <h2 class="home-statement">Building a foundation in <em>software development.</em></h2>

      <p class="home-lead">
        I’m <strong>Maynard K. Nay-osan</strong>, a first-year BS Computer Science student at the
        University of the Cordilleras. I’m strengthening my programming fundamentals through
        coursework, coding exercises, and hands-on practice with Java and Python.
      </p>

      <div class="home-facts" aria-label="Quick information">
        <div class="home-fact">
          <span class="home-fact-label">PROGRAM</span>
          <strong>BS Computer Science</strong>
          <small>1st Year</small>
        </div>
        <div class="home-fact">
          <span class="home-fact-label">CURRENT FOCUS</span>
          <strong>Java &amp; Python</strong>
          <small>Programming fundamentals</small>
        </div>
        <div class="home-fact">
          <span class="home-fact-label">UNIVERSITY</span>
          <strong>University of the Cordilleras</strong>
          <small>Baguio City, Philippines</small>
        </div>
      </div>

      <p class="home-support">
        I’m interested in exploring different areas of technology, improving my problem-solving,
        and turning what I learn into practical projects.
      </p>

      <div class="home-bottom">
        <div class="home-status">
          <span class="home-status-dot" aria-hidden="true"></span>
          Open to learning opportunities and collaboration
        </div>
        <div class="home-actions">
          <a class="btn pri" href="#contact">Contact me</a>
          <a class="btn" href="https://github.com/sankura-san" target="_blank" rel="noopener noreferrer">GitHub profile <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div class="home-colophon"><span>01</span><span> / </span><span>INTRODUCTION</span></div>
    </section>
  `;

  function isHomeRoute() {
    return !window.location.hash || window.location.hash === "#home";
  }

  function enhanceHomepage() {
    const active = isHomeRoute();
    document.body.classList.toggle("is-home", active);
    if (!active || view.querySelector(".home-layout")) return;
    view.innerHTML = homeMarkup;
  }

  enhanceHomepage();
  window.addEventListener("hashchange", enhanceHomepage, { passive: true });

  const observer = new MutationObserver(enhanceHomepage);
  observer.observe(view, { childList: true });
})();
