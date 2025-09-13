// === FrontHop UI - Header + Promo Banner (auto-inject) ===

(function(){

  /* ================== CONFIG ================== */

  const PROMO = {

    enabled: true,                                  // تشغيل/إيقاف الشريط

    message: "🎉 التسجيل للمحترفين مجاني لفترة محدودة — ",

    linkText: "انضم الآن",

    linkHref: "/join-pro.html",

    showOnPaths: ["*",],                            // "*" لكل الصفحات، أو [" / ", "/join-pro.html", ...]

    rememberDismissDays: 7,                         // تذكّر إغلاق الشريط (أيام)

    // تواريخ الحملة (اختياري) بصيغة "YYYY-MM-DD"

    startDate: null,                                // مثال: "2025-09-01"

    endDate: null                                   // مثال: "2025-10-01"

  };



  /* ================== STYLES ================== */

  const CSS = `

  .site-header{position:sticky;top:0;z-index:60;display:flex;align-items:center;gap:12px;

    justify-content:space-between;padding:14px 20px;background:rgba(28,28,30,.8);

    -webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);

    border-bottom:1px solid rgba(255,255,255,.06)}

  .site-logo{text-decoration:none;display:inline-flex;align-items:baseline;gap:6px;letter-spacing:1px}

  .logo-front{font-weight:800;font-size:clamp(22px,4.6vw,36px);color:#fff}

  .logo-hop{font-weight:900;font-size:clamp(22px,4.6vw,36px);color:#E53935}

  .site-nav{display:flex;gap:14px;align-items:center}

  .site-nav a{color:#ddd;text-decoration:none;padding:8px 10px;border-radius:10px;font-weight:600}

  .site-nav a:hover{background:#ffffff14}

  .site-nav a.active{background:#ffffff20;color:#fff}

  .menu-btn{appearance:none;background:transparent;color:#fff;border:none;font-size:24px;line-height:1;

    cursor:pointer;padding:6px 8px;display:none}

  /* Promo */

  .fh-promo{display:none;align-items:center;justify-content:center;gap:10px;

    background:#222; color:#fff; padding:8px 14px; font-weight:600; font-size:14px;

    border-bottom:1px solid #ffffff14}

  .fh-promo a{color:#FF8C32; text-decoration:none}

  .fh-promo a:hover{text-decoration:underline}

  .fh-promo .close{margin-inline-start:10px; font-weight:900; background:transparent; color:#fff;

    border:1px solid #ffffff33; border-radius:8px; padding:2px 8px; cursor:pointer}

  .fh-promo .close:hover{background:#ffffff18}

  @media (max-width:900px){

    .menu-btn{display:inline-block}

    .site-nav{

      position:absolute; right:12px; top:62px; background:#1F1F21; border:1px solid #ffffff18;

      border-radius:14px; box-shadow:0 14px 28px rgba(0,0,0,.45);

      padding:10px; display:none; flex-direction:column; min-width:220px;

    }

    .site-nav.open{display:flex}

    .site-nav a{padding:10px 12px}

    .fh-promo{font-size:13px; padding:8px 10px}

  }`;



  // inject CSS once

  if(!document.getElementById('fh-ui-style')){

    const s=document.createElement('style'); s.id='fh-ui-style'; s.textContent=CSS;

    document.head.appendChild(s);

  }



  /* ================== HELPERS ================== */

  const path = location.pathname.replace(/\/+$/,'') || '/';

  const inPaths = (list)=> list.includes('*') || list.map(x=>x.replace(/\/+$/,'')||'/').includes(path);



  const withinDates = ()=>{

    const today = new Date();

    if (PROMO.startDate){ const s = new Date(PROMO.startDate+"T00:00:00"); if (today < s) return false; }

    if (PROMO.endDate){ const e = new Date(PROMO.endDate+"T23:59:59"); if (today > e) return false; }

    return true;

  };



  const lsKey = "fh_promo_dismissed_until";

  const promoDismissed = ()=>{

    try{

      const until = localStorage.getItem(lsKey);

      return until && new Date(until) > new Date();

    }catch{ return false; }

  };

  const setPromoDismissed = (days)=>{

    try{

      const until = new Date(); until.setDate(until.getDate() + (days||7));

      localStorage.setItem(lsKey, until.toISOString());

    }catch{}

  };



  /* ================== BUILD PROMO ================== */

  const promoHTML = `

    <div class="fh-promo" role="region" aria-label="Announcement" aria-live="polite">

      <span>${PROMO.message}</span>

      <a href="${PROMO.linkHref}">${PROMO.linkText}</a>

      <button class="close" type="button" aria-label="Close announcement">×</button>

    </div>`;



  /* ================== BUILD HEADER ================== */

  const headerHTML = `

    ${PROMO.enabled && inPaths(PROMO.showOnPaths) && withinDates() && !promoDismissed() ? promoHTML : ''}

    <header class="site-header">

      <a class="site-logo" href="/" aria-label="FrontHop Home">

        <span class="logo-front">FRONT</span><span class="logo-hop">HOP</span>

      </a>

      <button class="menu-btn" aria-label="Open menu" aria-controls="site-nav" aria-expanded="false">≡</button>

      <nav id="site-nav" class="site-nav" aria-label="Primary">

        <a href="/">Home</a>

        <a href="/post.html">Post a Job</a>

        <a href="/join-pro.html">Join as Pro</a>

        <a href="/about.html">About</a>

        <a href="/contact.html">Contact</a>

        <a href="/terms.html">Terms</a>

        <a href="/privacy.html">Privacy</a>

      </nav>

    </header>`;



  // prepend header automatically

  const wrap = document.createElement('div');

  wrap.innerHTML = headerHTML;

  document.body.prepend(wrap);



  // show promo if present

  const promoEl = document.querySelector('.fh-promo');

  if(promoEl){ promoEl.style.display='flex';

    const closeBtn = promoEl.querySelector('.close');

    if(closeBtn){

      closeBtn.addEventListener('click', ()=>{

        promoEl.style.display='none';

        setPromoDismissed(PROMO.rememberDismissDays);

      });

    }

  }



  // mobile menu toggle

  const btn = document.querySelector('.menu-btn');

  const nav = document.getElementById('site-nav');

  if(btn && nav){

    btn.addEventListener('click', ()=>{

      const open = nav.classList.toggle('open');

      btn.setAttribute('aria-expanded', open ? 'true' : 'false');

    });

    nav.addEventListener('click', e=>{

      if(e.target.matches('a')){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }

    });

  }



  // active link highlight

  document.querySelectorAll('#site-nav a').forEach(a=>{

    const href = a.getAttribute('href').replace(/\/+$/,'') || '/';

    if((path==='/' && (href==='/'||href==='/index.html')) || href===path){

      a.classList.add('active');

    }

  });

})();
