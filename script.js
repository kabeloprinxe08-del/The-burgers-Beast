/* ===== EDIT ME: all the shop content lives here ===== */
var CFG={wa:"27000000000",email:"info@example.com",phone:"+27 00 000 0000",addr:"Address coming soon"};
var HOURS=[["Sunday","10:00","20:00"],["Monday","10:00","21:00"],["Tuesday","10:00","21:00"],["Wednesday","10:00","21:00"],["Thursday","10:00","21:00"],["Friday","10:00","22:00"],["Saturday","10:00","22:00"]];
var STORY=["The Beast Burgers started with one idea: a kota or burger that actually fills you up. Big portions, fresh veg, and everything grilled to order.","We cook for the neighbourhood, so nothing leaves the window half-done. Add the owner's real story here: who started it, where the recipes come from and what makes the Beast special."];
var SIGN="Add the owner's name here";
/* MENU: [category, name, description, price in rand, tag]. Tags: "Hot", "Veg", "Best seller" or "" */
var MENU=[
 ["Kotas","Classic Kota","Chips, polony, cheese and atchar in a quarter loaf",35,""],
 ["Kotas","Beast Kota","Chips, russian, polony, egg, cheese and atchar. The big one",65,"Best seller"],
 ["Kotas","Chicken Kota","Crispy chicken strips, chips, cheese and sauce",55,""],
 ["Kotas","Spatlho Special","Half loaf, chips, polony, cheese, egg and sauce",45,""],
 ["Burgers","The Beast Burger","Double beef patty, sharp cheddar, onion and house sauce",85,"Best seller"],
 ["Burgers","Cheeseburger","Beef patty, cheddar, lettuce, tomato and pickles",55,""],
 ["Burgers","Chicken Burger","Crispy chicken, lettuce, mayo and cheese",60,"Hot"],
 ["Burgers","Veggie Beast","Grilled mushroom patty, cheddar, herbs and multigrain bun",65,"Veg"],
 ["Sides","Chips (small)","Hot, golden and salted",20,""],
 ["Sides","Chips (large)","Enough to share, or not",35,""],
 ["Sides","Onion Rings","Crunchy and golden",30,"Veg"],
 ["Sides","Wings (6)","Hot or lemon and herb",60,"Hot"],
 ["Drinks","Soft Drink","330ml can",15,""],
 ["Drinks","Milkshake","Vanilla, chocolate or strawberry",40,""],
 ["Combos","Beast Combo","The Beast Burger, large chips and a cold drink",120,"Best seller"],
 ["Combos","Kota Combo","Beast Kota and a cold drink",75,""]
].map(function(a){return{c:a[0],n:a[1],d:a[2],p:a[3],t:a[4]}});
/* Signature wheel: use names from the menu above. Photos: images/dish1.jpg to images/dish6.jpg */
var DISHES=[{n:"The Beast Burger",base:"images/dish1"},{n:"Beast Kota",base:"images/dish2"},{n:"Veggie Beast",base:"images/dish3"},{n:"Chicken Burger",base:"images/dish4"},{n:"Wings (6)",base:"images/dish5"},{n:"Beast Combo",base:"images/dish6"}];
var REVIEWS=[{t:"Add a real customer review here. One or two sentences work best.",a:"Customer name"},{t:"A second customer review goes here. Copy it exactly as they wrote it.",a:"Customer name"},{t:"A third review goes here. Ask customers for permission first.",a:"Customer name"}];
/* Social: add the full link in url. An empty url shows the icon dimmed. */
var SOCIAL=[{k:"WhatsApp",i:"wa",url:"https://wa.me/"+CFG.wa},{k:"Instagram",i:"ig",url:""},{k:"Facebook",i:"fb",url:""},{k:"TikTok",i:"tt",url:""}];
/* Photos in the images folder: hero.jpg (optional backdrop), story.jpg, dish1-6.jpg, gallery1-7.jpg */
/* ============================================== */
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var IMG=["jpg","jpeg","png","webp","JPG","JPEG","PNG"];
var HOVER=matchMedia("(hover:hover) and (pointer:fine)").matches;
var byName={};MENU.forEach(function(m){byName[m.n]=m});
function R(n){return"R "+n}
function sv(x){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+x+"</svg>"}
var ICONS={ig:sv('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor"/>'),fb:sv('<path d="M14 21v-8h2.6l.4-3h-3V8.4c0-.9.3-1.4 1.5-1.4H17V4.2A15 15 0 0 0 14.9 4C12.7 4 11.2 5.3 11.2 7.7V10H8.5v3h2.7v8"/>'),wa:sv('<path d="M3.5 20.5l1.2-4.2A8.5 8.5 0 1 1 8 19.5l-4.5 1z"/><path d="M9.2 8.6c-.3.7-.1 1.7.8 2.9.9 1.2 2 1.9 3 2.2.7.2 1.4-.2 1.7-.9l-1.3-.9-.7.5c-.6-.3-1.200-.9-1.600-1.600l.5-.7-.9-1.300z"/>'),tt:sv('<path d="M14 3.5v10.2a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3.5c.3 2.3 1.8 3.9 4 4.1"/>')};

/* ---------- media helpers ---------- */
function cands(path,exts){var o=[],p=path.split("/"),f=p.pop(),F=f.charAt(0).toUpperCase()+f.slice(1);[f,F].forEach(function(n){exts.forEach(function(x){o.push(p.join("/")+"/"+n+"."+x)})});return o}
function load(el,list,fail){var i=0;function next(){if(i<list.length)el.src=list[i++];else fail()}el.addEventListener("error",next);next()}
function slot(box,list,hint,first){
  var el=document.createElement("img");el.alt=hint;el.decoding="async";if(!first)el.loading="lazy";
  el.addEventListener("load",function(){box.classList.add("rdy")});box.appendChild(el);
  load(el,list,function(){box.innerHTML="Add "+list[0].replace(/\.[^.]+$/,"")+".jpg"})
}

/* ---------- hero title ---------- */
function letters(id,start){var n=start;$(id).innerHTML=Array.from($(id).textContent).map(function(c){return c===" "?'<span class="sp"></span>':'<span class="l"><i style="--i:'+(n++)+'">'+c+"</i></span>"}).join("");return n}
letters("l2",letters("l1",0));
(function(){
  if(!HOVER)return;
  var L=document.querySelectorAll("#t .l i"),busy=false,mx=0,my=0;
  function go(){busy=false;L.forEach(function(el){var r=el.parentNode.getBoundingClientRect(),dx=mx-(r.left+r.width/2),dy=my-(r.top+r.height/2),k=Math.max(0,1-Math.hypot(dx,dy)/240);el.style.transform=k>0?"translateY("+(-k*.07).toFixed(3)+"em) rotate("+(dx>0?k*-2.5:k*2.5).toFixed(2)+"deg)":""})}
  addEventListener("pointermove",function(e){mx=e.clientX;my=e.clientY;if(!busy&&scrollY<innerHeight){busy=true;requestAnimationFrame(go)}});
})();
(function(){var w=["Kota","Burgers","Chips","Wings","Grilled fresh","Stacked high"],h="";for(var r=0;r<2;r++)w.forEach(function(x){h+="<span>"+x+'</span><span class="d">&#9679;</span>'});
  $("tapeA").innerHTML=h;$("tapeB").innerHTML=h})();

/* ---------- images ---------- */
(function(){
  var im=document.createElement("img");im.alt="";$("herobg").appendChild(im);load(im,cands("images/hero",IMG),function(){im.remove()});
  slot($("storyimg"),cands("images/story",IMG),"Our story",true);
  var g="";for(var i=0;i<7;i++)g+='<div class="ph rvi" tabindex="0" role="button" aria-label="Open photo"></div>';$("gal").innerHTML=g;
  document.querySelectorAll("#gal .ph").forEach(function(b,k){slot(b,cands("images/gallery"+(k+1),IMG),"Food photo",k<2)});
  var po=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");po.unobserve(e.target)}})},{threshold:.15,rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".rvi").forEach(function(t,i){t.style.transitionDelay=(i%4)*90+"ms";po.observe(t)});
})();
$("storytxt").innerHTML=STORY.map(function(p){return"<p>"+esc(p)+"</p>"}).join("");$("sign").textContent=SIGN;

/* ---------- order cart ---------- */
var CART={};
function totals(){var n=0,t=0;Object.keys(CART).forEach(function(k){n+=CART[k];t+=CART[k]*byName[k].p});return{n:n,t:t}}
function renderCart(bump){
  var T=totals(),bar=$("cartbar");bar.hidden=T.n===0;$("cbn").textContent=T.n+(T.n===1?" item":" items");$("cbt").textContent=R(T.t);
  if(bump){bar.classList.remove("bump");void bar.offsetWidth;bar.classList.add("bump")}
  $("dl").innerHTML=T.n?Object.keys(CART).map(function(k){return'<div class="dr"><b>'+esc(k)+"</b><span>"+R(CART[k]*byName[k].p)+'</span><div class="qty"><button type="button" data-k="'+esc(k)+'" data-d="-1" aria-label="Remove one">&minus;</button>'+CART[k]+'<button type="button" data-k="'+esc(k)+'" data-d="1" aria-label="Add one">+</button></div></div>'}).join(""):'<p class="empty">Your order is empty. Add something from the menu.</p>';
  $("dt").textContent=R(T.t);
  if(!T.n)closeDrawer();
}
function addToCart(n){if(!byName[n])return;CART[n]=(CART[n]||0)+1;renderCart(true)}
function openDrawer(){$("drawer").classList.add("on");$("dback").classList.add("on");$("drawer").setAttribute("aria-hidden","false")}
function closeDrawer(){$("drawer").classList.remove("on");$("dback").classList.remove("on");$("drawer").setAttribute("aria-hidden","true")}
$("cartbar").addEventListener("click",openDrawer);$("dx").addEventListener("click",closeDrawer);$("dback").addEventListener("click",closeDrawer);
$("dl").addEventListener("click",function(e){var k=e.target.getAttribute("data-k");if(!k)return;CART[k]+=+e.target.getAttribute("data-d");if(CART[k]<=0)delete CART[k];renderCart(false)});
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".add");if(!b)return;addToCart(b.getAttribute("data-n"));b.classList.add("ok");b.textContent="\u2713";setTimeout(function(){b.classList.remove("ok");b.textContent="+"},800)});
$("mode").addEventListener("change",function(){$("addrrow").hidden=this.value!=="Delivery"});
function orderLines(){return Object.keys(CART).map(function(k){return CART[k]+" x "+k+" ("+R(CART[k]*byName[k].p)+")"}).join("\n")}
$("of").addEventListener("submit",function(e){e.preventDefault();var T=totals();
  if(!T.n){$("dl").innerHTML='<p class="empty">Add something to your order first.</p>';return}
  var d=new FormData($("of")),m="Order - The Beast Burgers\n"+orderLines()+"\nTotal: "+R(T.t)+"\nName: "+d.get("name")+"\nPhone: "+d.get("phone")+"\n"+d.get("mode")+(d.get("mode")==="Delivery"?"\nAddress: "+d.get("address"):"")+"\nNotes: "+(d.get("note")||"-");
  window.open("https://wa.me/"+CFG.wa+"?text="+encodeURIComponent(m),"_blank")});

/* ---------- menu ---------- */
(function(){
  var cats=MENU.map(function(i){return i.c}).filter(function(v,i,a){return a.indexOf(v)===i}),cat=cats[0],q=$("q");
  function draw(){
    $("tabs").innerHTML=cats.map(function(c){return'<button type="button" class="'+(c===cat&&!q.value?"on":"")+'" data-c="'+esc(c)+'">'+esc(c)+"</button>"}).join("");
    var t=q.value.toLowerCase(),r=MENU.filter(function(i){return t?(i.n+" "+i.d+" "+i.c).toLowerCase().indexOf(t)>-1:i.c===cat});
    $("list").innerHTML=r.length?r.map(function(i){return'<div class="it"><b>'+esc(i.n)+(i.t?'<span class="tag'+(i.t==="Hot"?" h":"")+'">'+esc(i.t)+"</span>":"")+'</b><span class="pr">'+R(i.p)+"</span><small>"+esc(i.d)+'</small><button class="add" type="button" data-n="'+esc(i.n)+'" aria-label="Add '+esc(i.n)+' to order">+</button></div>'}).join(""):"<p>Nothing on the menu matches that search.</p>";
  }
  $("tabs").addEventListener("click",function(e){var c=e.target.getAttribute("data-c");if(c){cat=c;q.value="";draw()}});
  q.addEventListener("input",draw);draw();
})();

/* ---------- reviews, hours, contact, footer, booking ---------- */
$("rvs").innerHTML=REVIEWS.map(function(r){return'<div class="rc"><div class="st" aria-label="5 stars">\u2605\u2605\u2605\u2605\u2605</div><p>\u201C'+esc(r.t)+"\u201D</p><b>"+esc(r.a)+"</b></div>"}).join("");
function jhb(){var o={};new Intl.DateTimeFormat("en-US",{timeZone:"Africa/Johannesburg",weekday:"long",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date()).forEach(function(x){o[x.type]=x.value});return{day:o.weekday,min:(+o.hour%24)*60+ +o.minute}}
function mins(s){var a=s.split(":");return+a[0]*60+ +a[1]}
function hours(){var n=jhb(),open=false;
  $("hrs").innerHTML=HOURS.map(function(h){var t=h[0]===n.day;if(t)open=n.min>=mins(h[1])&&n.min<mins(h[2]);return'<div class="'+(t?"today":"")+'"><span>'+h[0]+"</span><span>"+h[1]+" to "+h[2]+"</span></div>"}).join("");
  var b=$("badge");b.textContent=open?"Open now":"Closed";b.className="badge "+(open?"open":"closed")}
hours();setInterval(hours,60000);
$("addr").textContent=CFG.addr;$("faddr").textContent=CFG.addr;$("yr").textContent=new Date().getFullYear();
[["call","fcall"],["mail","fmail"]].forEach(function(p,k){[$(p[0]),$(p[1])].forEach(function(el){el.textContent=k?CFG.email:CFG.phone;el.href=k?"mailto:"+CFG.email:"tel:"+CFG.phone.replace(/\s/g,"")})});
$("wa").href="https://wa.me/"+CFG.wa;
$("fsoc").innerHTML=SOCIAL.map(function(s){return'<a class="fs'+(s.url?"":" off")+'" aria-label="'+esc(s.k)+'" title="'+esc(s.k)+(s.url?"":" (coming soon)")+'" '+(s.url?'href="'+esc(s.url)+'" target="_blank" rel="noopener"':"")+">"+ICONS[s.i]+"</a>"}).join("");
(function(){var g=[];[1,2,3,4,5,6,0].forEach(function(d){var h=HOURS[d],t=h[1]+" to "+h[2],l=g[g.length-1];if(l&&l.t===t)l.e=h[0];else g.push({s:h[0],e:h[0],t:t})});
  $("fhrs").innerHTML=g.map(function(x){return"<div><span>"+(x.s===x.e?x.s.slice(0,3):x.s.slice(0,3)+" - "+x.e.slice(0,3))+"</span><span>"+x.t+"</span></div>"}).join("")})();
$("top2").addEventListener("click",function(e){e.preventDefault();scrollTo({top:0,behavior:"smooth"})});
function bmsg(){var d=new FormData($("f")),T=totals();return"Booking - The Beast Burgers\nName: "+d.get("name")+"\nPhone: "+d.get("phone")+"\nDate: "+d.get("date")+"\nTime: "+d.get("time")+"\nGuests: "+d.get("guests")+"\nRequest: "+d.get("type")+"\nNotes: "+(d.get("msg")||"-")+(T.n?"\n\nOrder:\n"+orderLines()+"\nTotal: "+R(T.t):"")}
$("f").addEventListener("submit",function(e){e.preventDefault();window.open("https://wa.me/"+CFG.wa+"?text="+encodeURIComponent(bmsg()),"_blank")});
$("mailbtn").addEventListener("click",function(){if(!$("f").reportValidity())return;location.href="mailto:"+CFG.email+"?subject="+encodeURIComponent("Booking")+"&body="+encodeURIComponent(bmsg())});

/* ---------- scroll behaviour ---------- */
var heroFade=1;
(function(){
  var nav=$("nav"),pr=$("prog"),tk=false,links={};
  document.querySelectorAll(".links a:not(.cta)").forEach(function(a){links[a.getAttribute("href").slice(1)]=a});
  function u(){tk=false;var y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
    nav.classList.toggle("solid",y>60);pr.style.width=(h>0?y/h*100:0)+"%";
    heroFade=Math.max(0,Math.min(1,1-y/(innerHeight*.85)));document.documentElement.style.setProperty("--ho",heroFade)}
  addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(u)}},{passive:true});u();
  var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)Object.keys(links).forEach(function(n){links[n].classList.toggle("on",n===e.target.id)})})},{rootMargin:"-45% 0px -50% 0px"});
  Object.keys(links).forEach(function(n){var s=$(n);if(s)o.observe(s)});
})();

/* ---------- cursor + lightbox ---------- */
(function(){
  if(HOVER){
    var c=document.createElement("div");c.id="cur";document.body.appendChild(c);
    var x=-100,y=-100,tx=-100,ty=-100;
    addEventListener("pointermove",function(e){tx=e.clientX;ty=e.clientY});
    (function f(){x+=(tx-x)*.18;y+=(ty-y)*.18;c.style.transform="translate3d("+x+"px,"+y+"px,0)";requestAnimationFrame(f)})();
    document.addEventListener("mouseover",function(e){var t=e.target,ph=t.closest&&t.closest("#gal .ph"),st=t.closest&&t.closest("#car3d");
      if(ph&&ph.querySelector("img")){c.className="big";c.textContent="View"}
      else if(st){c.className="big";c.textContent="Drag"}
      else if(t.closest&&t.closest("a,button,input,select,textarea")){c.className="link";c.textContent=""}
      else{c.className="";c.textContent=""}});
    document.documentElement.addEventListener("mouseleave",function(){c.style.opacity=0});
    document.documentElement.addEventListener("mouseenter",function(){c.style.opacity=1});
    document.querySelectorAll(".btn").forEach(function(b){
      b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+((e.clientX-r.left)/r.width-.5)*10+"px,"+((e.clientY-r.top)/r.height-.5)*8+"px)"});
      b.addEventListener("pointerleave",function(){b.style.transform=""})});
  }
  var lb=$("lb"),lc=$("lbc");
  function open(box){var m=box.querySelector("img");if(!m)return;lc.innerHTML="";var el=document.createElement("img");el.src=m.currentSrc||m.src;el.alt=m.alt||"";lc.appendChild(el);lb.classList.add("on");lb.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
  function close(){if(!lb.classList.contains("on"))return;lb.classList.remove("on");lb.setAttribute("aria-hidden","true");document.body.style.overflow="";setTimeout(function(){lc.innerHTML=""},600)}
  document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("#gal .ph");if(b&&b.querySelector("img"))open(b)});
  document.addEventListener("keydown",function(e){var a=document.activeElement;if(e.key==="Escape"){close();closeDrawer()}
    if((e.key==="Enter"||e.key===" ")&&a&&a.classList&&a.classList.contains("ph")){e.preventDefault();open(a)}});
  lb.addEventListener("click",function(e){if(e.target===lb||e.target.id==="lbx")close()});
})();

/* ================= THREE.JS ================= */
function fallbackWheel(){
  document.querySelector(".hint").textContent="Swipe sideways to see more dishes.";
  $("stage").classList.add("nogl");$("signature").classList.add("nogl");
  $("carfb").innerHTML=DISHES.map(function(d){var m=byName[d.n];return'<div class="dc"><div class="photo"></div><h3>'+esc(d.n)+"</h3><p>"+esc(m.d)+'</p><b class="cprice">'+R(m.p)+'</b><button class="btn solid add" style="width:auto;height:auto;border-radius:60px;font-size:.95rem;line-height:1.2;padding:.8rem 1.4rem" type="button" data-n="'+esc(d.n)+'">Add to order</button></div>'}).join("");
  document.querySelectorAll("#carfb .photo").forEach(function(b,k){slot(b,cands(DISHES[k].base,IMG),DISHES[k].n,k<2)});
}
function glowTex(){var c=document.createElement("canvas");c.width=c.height=64;var g=c.getContext("2d"),r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255,255,255,1)");r.addColorStop(.5,"rgba(255,255,255,.4)");r.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=r;g.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)}
function std(c,r,m,e){return new THREE.MeshStandardMaterial({color:c,roughness:r==null?.7:r,metalness:m||0,emissive:e||0x000000})}

/* Scene 1: an exploded burger with floating layers, herbs, cherry tomatoes, crumbs and a carton of fries */
function burgerScene(){
  var cv=$("hero3d"),Rn=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
  Rn.setPixelRatio(Math.min(devicePixelRatio,1.75));
  var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(36,1,.1,60);C.position.set(0,.8,13);
  S.add(new THREE.AmbientLight(0xffffff,.3));
  var key=new THREE.PointLight(0xff9500,3.4,45);key.position.set(-6,3,5);S.add(key);
  var rim=new THREE.PointLight(0x4caf50,1.8,45);rim.position.set(7,2,-4);S.add(rim);
  var top=new THREE.PointLight(0xfff0d0,1.7,45);top.position.set(0,8,4);S.add(top);
  var rig=new THREE.Group(),wrap=new THREE.Group();rig.add(wrap);S.add(rig);
  var layers=[],i,k;
  function layer(g,y){wrap.add(g);layers.push({o:g,y:y,ph:Math.random()*6.28,sp:.15+Math.random()*.25})}
  /* top bun with seeds */
  var tb=new THREE.Group(),dome=new THREE.Mesh(new THREE.SphereGeometry(1.75,56,28,0,Math.PI*2,0,Math.PI/2),std(0xc4852f,.55));dome.scale.y=.78;tb.add(dome);
  tb.add(new THREE.Mesh(new THREE.CylinderGeometry(1.76,1.7,.16,56),std(0xb06e1c,.6)));
  for(i=0;i<80;i++){var th=Math.random()*1.25,ph=Math.random()*6.28,sd=new THREE.Mesh(new THREE.SphereGeometry(.045,8,6),std(i%3?0xf3e3c3:0x4a3018,.6));sd.scale.set(1,.55,1.7);sd.position.set(1.77*Math.sin(th)*Math.cos(ph),1.77*Math.cos(th)*.78+.01,1.77*Math.sin(th)*Math.sin(ph));sd.rotation.y=ph;tb.add(sd)}
  layer(tb,2.6);
  /* lettuce */
  var lg=new THREE.CylinderGeometry(1.95,1.95,.07,72,1,false),lp=lg.attributes.position;
  for(i=0;i<lp.count;i++){var x=lp.getX(i),z=lp.getZ(i),a=Math.atan2(z,x),rr=Math.hypot(x,z)/1.95;lp.setY(i,lp.getY(i)+Math.sin(a*10)*.12*rr+Math.sin(a*23)*.04*rr)}
  lg.computeVertexNormals();
  var lt=new THREE.Group(),lm=std(0x4caf50,.55);lm.side=THREE.DoubleSide;lt.add(new THREE.Mesh(lg,lm));
  var lm2=std(0x2e8b3a,.6);lm2.side=THREE.DoubleSide;var l2=new THREE.Mesh(lg,lm2);l2.scale.set(.85,1,.85);l2.position.y=.06;l2.rotation.y=.4;lt.add(l2);
  layer(lt,1.8);
  /* tomato */
  var tm=new THREE.Group();
  [[.0,1.2],[.16,1.05]].forEach(function(a){var s=new THREE.Mesh(new THREE.CylinderGeometry(a[1],a[1],.14,40),std(0xd32f2f,.35));s.position.y=a[0];s.rotation.z=a[0]*.4;tm.add(s);var in2=new THREE.Mesh(new THREE.CylinderGeometry(a[1]*.72,a[1]*.72,.16,32),std(0xff6b5a,.3));in2.position.y=a[0];in2.rotation.z=a[0]*.4;tm.add(in2)});
  layer(tm,1.1);
  /* cheddar */
  var ch=new THREE.Mesh(new THREE.BoxGeometry(2.8,.07,2.8),std(0xffa000,.4,0,0x3a2000));ch.rotation.y=Math.PI/4;ch.rotation.x=.05;
  var cg=new THREE.Group();cg.add(ch);layer(cg,.55);
  /* mushroom patty */
  var pt=new THREE.Group();pt.add(new THREE.Mesh(new THREE.CylinderGeometry(1.62,1.56,.44,56),std(0x3b2418,.95)));
  for(i=0;i<34;i++){var b=new THREE.Mesh(new THREE.SphereGeometry(.18+Math.random()*.14,10,8),std(0x5b3a24,.95)),rd=Math.sqrt(Math.random())*1.35,an=Math.random()*6.28;b.scale.y=.45;b.position.set(Math.cos(an)*rd,.22,Math.sin(an)*rd);pt.add(b)}
  for(i=0;i<6;i++){var mu=new THREE.Mesh(new THREE.SphereGeometry(.36,18,10,0,Math.PI*2,0,Math.PI/2),std(0x9a7650,.8)),ra=.2+Math.random()*1,an2=i*1.05;mu.scale.y=.6;mu.position.set(Math.cos(an2)*ra,.24,Math.sin(an2)*ra);mu.rotation.z=(Math.random()-.5)*.3;pt.add(mu)}
  layer(pt,-.1);
  /* bottom bun */
  var bb=new THREE.Group();bb.add(new THREE.Mesh(new THREE.CylinderGeometry(1.72,1.56,.5,56),std(0xc4852f,.6)));layer(bb,-1.15);
  /* floating extras */
  var orbit=[];
  for(i=0;i<7;i++){var t2=new THREE.Mesh(new THREE.SphereGeometry(.2,20,14),std(0xe53935,.3));t2.add(new THREE.Mesh(new THREE.SphereGeometry(.06,8,6),std(0x2e7d32,.6)));t2.children[0].position.y=.19;wrap.add(t2);orbit.push({o:t2,r:2.6+Math.random()*1.1,a:Math.random()*6.28,s:.18+Math.random()*.2,y:-1.6+Math.random()*4.4})}
  for(i=0;i<18;i++){var lf=new THREE.Mesh(new THREE.SphereGeometry(.13,8,6),std(i%2?0x388e3c:0x66bb6a,.6));lf.scale.set(1.9,.22,.9);wrap.add(lf);orbit.push({o:lf,r:2.2+Math.random()*1.8,a:Math.random()*6.28,s:.12+Math.random()*.25,y:-2+Math.random()*5.2,spin:1})}
  var tex=glowTex(),N=140,cp=new Float32Array(N*3),cr=new THREE.BufferGeometry();
  for(i=0;i<N*3;i+=3){cp[i]=(Math.random()-.5)*8;cp[i+1]=(Math.random()-.5)*7;cp[i+2]=(Math.random()-.5)*5}
  cr.setAttribute("position",new THREE.BufferAttribute(cp,3));
  var crumbs=new THREE.Points(cr,new THREE.PointsMaterial({color:0xe8c28a,size:.14,map:tex,transparent:true,depthWrite:false,sizeAttenuation:true}));crumbs.frustumCulled=false;wrap.add(crumbs);
  /* fries carton */
  var fr=new THREE.Group(),carton=new THREE.Mesh(new THREE.CylinderGeometry(.95,.68,1.35,4,1,true),std(0xe65100,.6));carton.rotation.y=Math.PI/4;carton.material.side=THREE.DoubleSide;fr.add(carton);
  var band=new THREE.Mesh(new THREE.CylinderGeometry(.9,.82,.28,4,1,true),std(0xfff3e0,.6));band.rotation.y=Math.PI/4;band.position.y=.1;band.material.side=THREE.DoubleSide;fr.add(band);
  for(i=0;i<26;i++){var h=1.2+Math.random()*.8,f=new THREE.Mesh(new THREE.BoxGeometry(.15,h,.15),std(0xf5c542,.5)),rd2=Math.random()*.5,an3=Math.random()*6.28;f.position.set(Math.cos(an3)*rd2,.55+h/2-.2+Math.random()*.15,Math.sin(an3)*rd2);f.rotation.z=(Math.random()-.5)*.5;f.rotation.x=(Math.random()-.5)*.5;fr.add(f)}
  rig.add(fr);
  var intro=0,t=0,last=performance.now(),mx=0,my=0,burst=0,live=true;
  function layout(){var w=innerWidth,h=innerHeight;Rn.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();
    if(w>=900){rig.userData.b=[3.1,-.1];rig.scale.setScalar(1)}else{rig.userData.b=[0,.9];rig.scale.setScalar(w<520?.5:.68)}}
  layout();addEventListener("resize",layout);
  addEventListener("pointermove",function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
  $("top").addEventListener("pointerdown",function(e){if(!(e.target.closest&&e.target.closest("a,button")))burst=1});
  document.addEventListener("visibilitychange",function(){live=!document.hidden});
  function ease(x){return 1-Math.pow(1-x,3)}
  (function loop(now){requestAnimationFrame(loop);var dt=Math.min(.05,(now-last)/1000||.016);last=now;
    cv.style.opacity=heroFade*Math.min(1,intro*1.5);
    if(!live||heroFade<=.01)return;
    t+=dt;intro=Math.min(2.4,intro+dt*.55);burst*=.95;
    var b=rig.userData.b,ex=1+.2*(1-Math.min(1,Math.hypot(mx,my)*2))+burst*.7;
    rig.position.set(b[0]+(1-ease(Math.min(1,intro)))*1.5,b[1]+scrollY*.003,0);
    wrap.rotation.y=t*.32+mx*.9;wrap.rotation.x=.3+my*.14;
    for(k=0;k<layers.length;k++){var L=layers[k],p=ease(Math.max(0,Math.min(1,(intro-k*.12)/.9)));L.o.position.y=L.y*ex+Math.sin(t*1.1+L.ph)*.09+(1-p)*5;L.o.rotation.y=Math.sin(t*L.sp+L.ph)*.35}
    for(k=0;k<orbit.length;k++){var O=orbit[k];O.a+=dt*O.s;O.o.position.set(Math.cos(O.a)*O.r*ex,O.y+Math.sin(t+k)*.15,Math.sin(O.a)*O.r*ex);if(O.spin)O.o.rotation.set(t*.8+k,t*.6,0)}
    fr.position.set(2.6,-2.4-(1-ease(Math.min(1,intro)))*3,1.6);fr.rotation.y=-t*.35;
    crumbs.rotation.y=t*.05;
    key.intensity=3.4+Math.sin(t*3)*.3+burst*2.5;
    C.position.x+=(mx*1.2-C.position.x)*.05;C.position.y+=(.8-my*.7-C.position.y)*.05;C.lookAt(0,0,0);
    try{Rn.render(S,C)}catch(x){}
  })(performance.now());
}

/* Scene 2: a 3D wheel of rounded dish photos you can drag, flick or step through */
function wheelScene(){
  var cv=$("car3d"),stage=$("stage"),Rn=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
  Rn.setPixelRatio(Math.min(devicePixelRatio,1.75));
  var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(32,1,.1,80),N=DISHES.length,step=Math.PI*2/N,RAD=4.8,W=2.6,H=3.3,rc=.24,i;
  C.position.set(0,2.5,13);
  var wheel=new THREE.Group();S.add(wheel);
  var sh=new THREE.Shape(),x0=-W/2,x1=W/2,y0=-H/2,y1=H/2;
  sh.moveTo(x0+rc,y0);sh.lineTo(x1-rc,y0);sh.quadraticCurveTo(x1,y0,x1,y0+rc);sh.lineTo(x1,y1-rc);sh.quadraticCurveTo(x1,y1,x1-rc,y1);sh.lineTo(x0+rc,y1);sh.quadraticCurveTo(x0,y1,x0,y1-rc);sh.lineTo(x0,y0+rc);sh.quadraticCurveTo(x0,y0,x0+rc,y0);
  var geo=new THREE.ShapeGeometry(sh,12),pa=geo.attributes.position,ua=geo.attributes.uv;
  for(i=0;i<pa.count;i++)ua.setXY(i,(pa.getX(i)+W/2)/W,(pa.getY(i)+H/2)/H);ua.needsUpdate=true;
  var ring=new THREE.Mesh(new THREE.RingGeometry(RAD-.25,RAD+.25,96),new THREE.MeshBasicMaterial({color:0xff9500,transparent:true,opacity:.22,side:THREE.DoubleSide}));
  ring.rotation.x=-Math.PI/2;ring.position.y=-H/2-.1;S.add(ring);
  function placeholder(k){var c=document.createElement("canvas");c.width=416;c.height=528;var g=c.getContext("2d"),gr=g.createLinearGradient(0,0,416,528);gr.addColorStop(0,"#2b2b2b");gr.addColorStop(1,"#171717");g.fillStyle=gr;g.fillRect(0,0,416,528);
    g.fillStyle="#ff9500";g.textAlign="center";g.font="bold 46px Impact, Arial Black, sans-serif";var w=DISHES[k].n.toUpperCase().split(" "),ln="",y=240;w.forEach(function(x){if(g.measureText(ln+" "+x).width>340){g.fillText(ln.trim(),208,y);y+=54;ln=x}else ln+=" "+x});g.fillText(ln.trim(),208,y);
    g.fillStyle="#a8a29a";g.font="20px Arial";g.fillText("Add "+DISHES[k].base+".jpg",208,y+56);return new THREE.CanvasTexture(c)}
  var cards=[];
  DISHES.forEach(function(d,k){
    var mat=new THREE.MeshBasicMaterial({map:placeholder(k),side:THREE.DoubleSide,transparent:true}),g=new THREE.Group(),a=k*step;
    var fr=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0xff9500,side:THREE.DoubleSide,transparent:true}));fr.scale.set(1.045,1.035,1);fr.position.z=-.02;g.add(fr);
    g.add(new THREE.Mesh(geo,mat));
    g.position.set(Math.sin(a)*RAD,0,Math.cos(a)*RAD);g.rotation.y=a;wheel.add(g);cards.push({g:g,mat:mat,fr:fr,a:a});
    var list=cands(d.base,IMG),n=0;
    (function tryNext(){if(n>=list.length)return;var im=new Image();
      im.onload=function(){try{var tc=document.createElement("canvas");tc.width=tc.height=4;tc.getContext("2d").drawImage(im,0,0,4,4);tc.getContext("2d").getImageData(0,0,1,1);
        var t=new THREE.Texture(im),ca=W/H,ia=im.naturalWidth/im.naturalHeight;t.minFilter=THREE.LinearFilter;t.anisotropy=Math.min(4,Rn.capabilities.getMaxAnisotropy());
        if(ia>ca){t.repeat.set(ca/ia,1);t.offset.set((1-ca/ia)/2,0)}else{t.repeat.set(1,ia/ca);t.offset.set(0,(1-ia/ca)/2)}
        t.needsUpdate=true;mat.map=t;mat.needsUpdate=true}catch(e){}};
      im.onerror=tryNext;im.src=list[n++]})();
  });
  var rot=0,tgt=0,drag=false,lx=0,vel=0,vis=false,act=-1,t=0,mx=0,my=0,auto=0,box=$("cn").parentNode;
  function setAct(k){if(k===act)return;act=k;box.classList.add("sw");setTimeout(function(){var m=byName[DISHES[k].n];$("cn").textContent=DISHES[k].n;$("cd").textContent=m.d;$("cp").textContent=R(m.p);box.classList.remove("sw")},act<0?0:240)}
  function nearest(v){return Math.round(v/step)*step}
  cv.addEventListener("pointerdown",function(e){drag=true;lx=e.clientX;vel=0;auto=0;cv.setPointerCapture(e.pointerId);cv.style.cursor="grabbing"});
  cv.addEventListener("pointermove",function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;if(!drag)return;var d=(e.clientX-lx)*.0065;lx=e.clientX;tgt+=d;vel=d});
  function up(){if(!drag)return;drag=false;cv.style.cursor="grab";tgt=nearest(tgt+vel*16)}
  cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",up);
  $("next").addEventListener("click",function(){tgt=nearest(tgt)-step;auto=0});
  $("prev").addEventListener("click",function(){tgt=nearest(tgt)+step;auto=0});
  $("addsig").addEventListener("click",function(){addToCart(DISHES[act].n);var b=this;b.textContent="Added \u2713";setTimeout(function(){b.textContent="Add to order"},900)});
  stage.addEventListener("keydown",function(e){if(e.key==="ArrowRight"){tgt=nearest(tgt)-step;auto=0}if(e.key==="ArrowLeft"){tgt=nearest(tgt)+step;auto=0}});
  function size(){var w=stage.clientWidth,h=stage.clientHeight;Rn.setSize(w,h,false);C.aspect=w/h;C.position.z=C.aspect<.9?19:C.aspect<1.4?15.5:13;C.updateProjectionMatrix()}
  size();addEventListener("resize",size);
  new IntersectionObserver(function(es){vis=es[0].isIntersecting}).observe(stage);
  var last=performance.now();setAct(0);
  (function loop(now){requestAnimationFrame(loop);var dt=Math.min(.05,(now-last)/1000||.016);last=now;if(!vis||document.hidden)return;
    t+=dt;auto+=dt;if(!drag&&auto>5.5){tgt-=step;auto=0}
    rot+=(tgt-rot)*(drag?.35:.075);wheel.rotation.y=rot;wheel.rotation.x=my*.08;
    cards.forEach(function(c,k){var f=Math.cos(c.a+rot),s=1+.1*Math.max(0,(f-.55)/.45);c.g.scale.set(s,s,1);c.g.position.y=Math.sin(t*1.2+k)*.07;var o=.22+.78*Math.max(0,(f+.2)/1.2);c.mat.opacity=o;c.fr.material.opacity=o});
    setAct(((Math.round(-tgt/step)%N)+N)%N);
    C.position.x+=(mx*1.4-C.position.x)*.04;C.lookAt(0,0,0);try{Rn.render(S,C)}catch(x){}
  })(performance.now());
}

function boot(){
  try{burgerScene()}catch(e){$("hero3d").style.display="none"}
  try{wheelScene()}catch(e){fallbackWheel()}
}
if(window.THREE)boot();
else{var s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js";s.onload=boot;s.onerror=function(){$("hero3d").style.display="none";fallbackWheel()};document.head.appendChild(s)}