(function(){
  const body=document.body;
  const projects=window.PORTFOLIO_PROJECTS||{};

  function nav(){
    const toggle=document.querySelector(".nav-toggle");
    const menu=document.querySelector(".site-nav");
    if(toggle&&menu){
      const links=()=>[...menu.querySelectorAll("a[href]")];
      const setOpen=(open,{restoreFocus=false}={})=>{
        menu.classList.toggle("open",open);
        body.classList.toggle("nav-open",open);
        toggle.setAttribute("aria-expanded",String(open));
        if(open){
          menu.scrollTop=0;
          requestAnimationFrame(()=>links()[0]?.focus());
        }else if(restoreFocus){
          toggle.focus();
        }
      };

      toggle.addEventListener("click",()=>setOpen(!menu.classList.contains("open")));
      menu.addEventListener("click",event=>{
        if(event.target.closest("a"))setOpen(false);
      });
      document.addEventListener("keydown",event=>{
        if(!menu.classList.contains("open"))return;
        if(event.key==="Escape"){
          event.preventDefault();
          setOpen(false,{restoreFocus:true});
          return;
        }
        if(event.key!=="Tab")return;
        const focusable=links();
        if(!focusable.length)return;
        const first=focusable[0],last=focusable[focusable.length-1];
        if(event.shiftKey&&document.activeElement===first){
          event.preventDefault();
          last.focus();
        }else if(!event.shiftKey&&document.activeElement===last){
          event.preventDefault();
          first.focus();
        }
      });
      window.addEventListener("resize",()=>{
        if(window.innerWidth>800)setOpen(false);
      });
    }

    document.querySelectorAll("[data-page-link]").forEach(a=>
      a.classList.toggle("active",a.dataset.pageLink===body.dataset.page)
    );
  }

  function reveal(){
    const nodes=document.querySelectorAll(".reveal");
    if(matchMedia("(prefers-reduced-motion: reduce)").matches){
      nodes.forEach(n=>n.classList.add("visible"));
      return;
    }
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),{threshold:.12});
    nodes.forEach(node=>observer.observe(node));
  }

  function renderCase(){
    const root=document.querySelector("[data-case]");
    if(!root)return;
    const slug=body.dataset.project;
    const project=projects[slug];
    if(!project)return;
    const galleryLoading=slug==="vero-social"?"eager":"lazy";
    document.title=`${project.title} — Stefano Caccamo`;
    root.innerHTML=`<section class="case-hero"><div class="case-meta"><span>${project.type}</span><span>${project.year}</span></div><h1>${project.title}</h1></section><img class="case-cover" src="../../assets/img/optimized/${project.cover}" alt="${project.title}" fetchpriority="high"><section class="case-story"><p>Case study / ${project.year}</p><div class="story-blocks"><section><h2>Contesto</h2><p>${project.challenge}</p></section><section><h2>Approccio</h2><p>${project.approach}</p></section><section><h2>Risultato</h2><p>${project.outcome}</p></section></div></section><section class="case-gallery"><img src="../../assets/img/optimized/${project.cover}" alt="Dettaglio ${project.title}" loading="${galleryLoading}"><img src="../../assets/img/optimized/${project.second}" alt="Applicazione ${project.title}" loading="${galleryLoading}"></section>${nextLink(slug)}`;
    document.documentElement.style.setProperty("--warm",project.accent);
  }

  function nextLink(slug){
    const order=["bar-giannone","friginfest","amazon-kdp","sicuri-online","menu-design","event-flyer"];
    const next=order[(order.indexOf(slug)+1)%order.length];
    const project=projects[next];
    return `<a class="next-project" href="${next}-index.html"><span>Progetto successivo</span><strong>${project.title} ↗</strong></a>`;
  }

  function year(){
    document.querySelectorAll("[data-year]").forEach(node=>{
      node.textContent=new Date().getFullYear();
    });
  }

  nav();
  renderCase();
  year();
  reveal();
})();
