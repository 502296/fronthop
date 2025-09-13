<script>

// === FrontHop UI - drop-in header ===

(function(){

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

  .promo{display:none;align-items:center;justify-content:center;gap:10px;

    background:#222; color:#fff; padding:8px 14px; font-weight:600; font-size:14px;

    border-bottom:1px solid #ffffff14}

  .promo a{color:#FF8C32; text-decoration:none}

  @media (max-width:900px){

    .menu-btn{display:inline-block}

    .site-nav{

      position:absolute; right:12px; top:62px; background:#1F1F21; border:1px solid #ffffff18;

      border-radius:14px; box-shadow:0 14px 28px rgba(0,0,0,.45);

      padding:10px; display:none; flex-direction:column; min-width:220px;

    }

    .site-nav.open{display:flex}

    .site-nav a{padding:10px 12px}

  }`;



  // inject CSS once

  if(!document.getElementById('fh-ui-style')){

    const s=document.createElement('style'); s.id='fh-ui-style'; s.textContent=CSS;

    document.head.appendChild(s);

  }



  // promo banner (بدّل القيمة إلى true لتفعيله)

  const SHOW_PROMO = false; // ← غيّرها إلى true لو تبي شريط "التسجيل مجاني"

  const promoHTML = `

    <div class="promo" role="status" aria-live="polite">

      🎉 التسجيل للمحترفين مجاني لفترة محدودة —

      <a href="/join-pro.html">انضم الآن</a>

    </div>`;



  // build header

  const headerHTML = `

    ${SHOW_PROMO ? promoHTML : ''}

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



  // init promo visibility

  if(SHOW_PROMO){

    const el = document.querySelector('.promo'); if(el) el.style.display='flex';

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

  const path = location.pathname.replace(/\/+$/,'') || '/';

  document.querySelectorAll('#site-nav a').forEach(a=>{

    const href = a.getAttribute('href').replace(/\/+$/,'') || '/';

    if((path==='/' && (href==='/'||href==='/index.html')) || href===path){

      a.classList.add('active');

    }

  });

})();

</script>
