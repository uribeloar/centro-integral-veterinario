/* BASE HOSTESS · Centro Integral Veterinario Jardines — bolita WhatsApp + agenda wizard (v4.0) */
(function () {
  var CONF = { wa: '523331442776', nombre: 'Centro Integral Veterinario Jardines', msgDefault: '¡Hola Centro Integral Veterinario Jardines! 🐾 Vengo de su página web y quiero agendar una cita.' };
  var SERV = { 'Servicios': [
      { n: 'Aves y exóticos', x: 'Periquitos, erizos, reptiles — atención especializada.', ic: '🦜' },
      { n: 'Urgencias 24 h', x: 'Hospital abierto a toda hora, todos los días.', ic: '🚨' },
      { n: 'Hospitalización', x: 'Internamiento con cuidados continuos.', ic: '🏥' },
      { n: 'Consulta y cirugía', x: 'Diagnóstico, vacunación y quirófano.', ic: '🩺' }
  ]};
  var HORARIO = { 0: [[0, 24]], 1: [[0, 24]], 2: [[0, 24]], 3: [[0, 24]], 4: [[0, 24]], 5: [[0, 24]], 6: [[0, 24]] };
  var MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var css = ''
    + '.waFab{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));z-index:70;display:flex;align-items:center;text-decoration:none;opacity:0;transform:translateY(14px) scale(.92);pointer-events:none;transition:transform .5s ease,opacity .45s ease;}'
    + '.waFab--in{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}'
    + '.waFab__btn{position:relative;flex:none;width:58px;height:58px;border-radius:9999px;background:linear-gradient(145deg,#25d366,#12b455);display:grid;place-items:center;box-shadow:0 10px 26px rgba(18,180,85,.44),0 2px 6px rgba(0,0,0,.25);transition:transform 240ms cubic-bezier(.34,1.56,.64,1),filter 160ms ease;}'
    + '.waFab__btn svg{width:32px;height:32px;position:relative;z-index:1;}'
    + '.waFab:hover .waFab__btn{transform:scale(1.14);filter:brightness(1.08);}'
    + '.waFab__pulso{position:absolute;inset:0;border-radius:9999px;background:#25d366;z-index:0;animation:waFabPulso 2.4s ease-out infinite;}'
    + '@keyframes waFabPulso{0%{transform:scale(1);opacity:.4}70%,100%{transform:scale(1.75);opacity:0}}'
    + '@media (max-width:600px){.waFab__btn{width:54px;height:54px}.waFab__btn svg{width:30px;height:30px}}'
    + '@media (prefers-reduced-motion:reduce){.waFab__pulso{animation:none}}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
  var WA_SVG='<svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.163 5.335 5.5.001 12.05.001c3.2 0 6.207 1.246 8.466 3.507a11.82 11.82 0 013.505 8.472c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.729-.978zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.017-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.007-1.413.247-.695.247-1.29.173-1.414z"/></svg>';
  function crearFab(){
    if(document.querySelector('.waFab'))return;
    var a=document.createElement('a');
    a.href='https://wa.me/'+CONF.wa+'?text='+encodeURIComponent(CONF.msgDefault);
    a.target='_blank'; a.rel='noopener noreferrer'; a.className='waFab'; a.setAttribute('aria-label','Escríbenos por WhatsApp');
    a.innerHTML='<span class="waFab__btn"><span class="waFab__pulso" aria-hidden="true"></span>'+WA_SVG+'</span>';
    document.body.appendChild(a);
    var entrar=function(){a.classList.add('waFab--in');};
    setTimeout(entrar,1200);
    window.addEventListener('scroll',entrar,{once:true,passive:true,capture:true});
  }
  var sel={serv:null,fecha:null,hora:null}; var calMes,modal,body;
  var ACC='#c98f3f', TINTA='#14453d', PAPEL='#f7faf8', MUTE='#6f8079';
  function crearModal(){
    if(modal)return;
    modal=document.createElement('div'); modal.id='rmodal';
    modal.style.cssText='position:fixed;inset:0;z-index:90;display:none;align-items:flex-end;justify-content:center;';
    modal.innerHTML='<div id="rmodal-bg" style="position:absolute;inset:0;background:rgba(10,20,16,.62);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);"></div>'
      +'<div id="rmodal-card" style="position:relative;width:100%;max-width:520px;max-height:92svh;display:flex;flex-direction:column;border-radius:26px 26px 0 0;border:1px solid rgba(255,255,255,.35);overflow:hidden;background:linear-gradient(165deg, rgba(255,255,255,.93), rgba(244,248,245,.97) 45%, rgba(236,242,238,.98));backdrop-filter:blur(28px) saturate(1.3);-webkit-backdrop-filter:blur(28px) saturate(1.3);box-shadow:0 -20px 70px rgba(10,20,16,.4);">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;padding:20px 22px 10px;"><p style="font-family:serif;font-size:20px;color:'+TINTA+';margin:0;">Agenda tu cita</p>'
      +'<button id="rmodal-cerrar" aria-label="Cerrar" style="width:44px;height:44px;border:0;background:transparent;border-radius:9999px;color:'+MUTE+';cursor:pointer;display:grid;place-items:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>'
      +'<div id="rmodal-pasos" style="display:flex;gap:8px;padding:0 22px 12px;"><span data-p="1" class="rp"></span><span data-p="2" class="rp"></span><span data-p="3" class="rp"></span><span data-p="4" class="rp"></span></div>'
      +'<div id="rmodal-body" style="padding:0 22px 26px;overflow-y:auto;flex:1;"></div></div>';
    document.body.appendChild(modal);
    var pst=document.createElement('style');
    pst.textContent='#rmodal .rp{height:5px;flex:1;border-radius:999px;background:rgba(0,0,0,.1);transition:background .3s}#rmodal .rp.on{background:'+ACC+'}'
      +'@media(min-width:640px){#rmodal{align-items:center!important}#rmodal-card{border-radius:26px!important}}'
      +'#rmodal .rw-item{width:100%;text-align:left;border:1px solid rgba(0,0,0,.12);background:rgba(255,255,255,.6);border-radius:16px;padding:14px 15px;margin-bottom:9px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:border .2s,background .2s;font-family:Jost,sans-serif}'
      +'#rmodal .rw-item:hover{border-color:'+ACC+'}'
      +'#rmodal .rw-day{aspect-ratio:1;border-radius:12px;border:1px solid transparent;background:transparent;font-size:14px;color:'+TINTA+';cursor:pointer;font-family:Jost,sans-serif}'
      +'#rmodal .rw-day:hover{background:'+ACC+';color:#fff}'
      +'#rmodal .rw-day.off{color:rgba(0,0,0,.22);pointer-events:none}'
      +'#rmodal .rw-day.today{border-color:'+ACC+';color:'+ACC+';font-weight:600}'
      +'#rmodal .rw-chip{border-radius:12px;border:1px solid rgba(0,0,0,.15);background:rgba(255,255,255,.55);color:'+TINTA+';font-size:14px;padding:10px 0;cursor:pointer;font-family:Jost,sans-serif;transition:all .15s}'
      +'#rmodal .rw-chip:hover{background:'+TINTA+';color:#fff;border-color:'+TINTA+'}';
    document.head.appendChild(pst);
    body=document.getElementById('rmodal-body');
    document.getElementById('rmodal-cerrar').addEventListener('click',cerrar);
    document.getElementById('rmodal-bg').addEventListener('click',cerrar);
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.style.display!=='none')cerrar();});
  }
  function abrir(nombreServicio){
    crearModal();
    sel={serv:null,fecha:null,hora:null};
    if(nombreServicio){ var s=SERV['Servicios'].filter(function(x){return x.n===nombreServicio;})[0]; if(s)sel.serv=s; }
    modal.style.display='flex'; document.body.style.overflow='hidden';
    if(window.__lenis)window.__lenis.stop();
    if(sel.serv){var hoy=new Date();calMes=new Date(hoy.getFullYear(),hoy.getMonth(),1);paso2();}else paso1();
    var M=window.Motion,c=document.getElementById('rmodal-card');
    if(M&&c){try{M.animate(c,{opacity:[0,1],y:[36,0],scale:[.97,1]},{duration:.45,ease:[.22,.9,.3,1]});}catch(_){}}
  }
  function cerrar(){modal.style.display='none';document.body.style.overflow='';if(window.__lenis)window.__lenis.start();}
  function animBody(){var M=window.Motion;if(M){try{M.animate(body.children,{opacity:[0,1],y:[14,0]},{delay:M.stagger(.04),duration:.4,ease:[.22,.65,.2,1]});}catch(_){}}}
  function marcaPaso(n){modal.querySelectorAll('.rp').forEach(function(el){el.classList.toggle('on',parseInt(el.dataset.p)<=n);});}
  function btnAtras(fn){var b=document.createElement('button');b.type='button';b.style.cssText='border:0;background:transparent;color:'+MUTE+';font-size:12px;text-transform:uppercase;letter-spacing:.12em;margin-bottom:14px;cursor:pointer;font-family:Jost,sans-serif;';b.innerHTML='‹ Atrás';b.addEventListener('click',fn);return b;}
  function titulo(t,sub){var h=document.createElement('p');h.style.cssText='font-family:serif;font-size:20px;color:'+TINTA+';margin:0 0 4px;';h.textContent=t;body.appendChild(h);
    if(sub){var s=document.createElement('p');s.style.cssText='font-family:Jost,sans-serif;font-size:13px;color:'+MUTE+';margin:0 0 14px;';s.textContent=sub;body.appendChild(s);}else{h.style.marginBottom='14px';}}
  function paso1(){
    marcaPaso(1); body.innerHTML='';
    titulo('¿Qué necesita tu mascota?','Elige el servicio de tu visita.');
    SERV['Servicios'].forEach(function(s){
      var c=document.createElement('button');c.type='button';c.className='rw-item';
      c.innerHTML='<span style="font-size:22px">'+s.ic+'</span><div style="flex:1;min-width:0"><p style="margin:0;font-size:15px;color:'+TINTA+';">'+s.n+'</p>'
        +(s.x?'<p style="margin:2px 0 0;font-size:12.5px;color:'+MUTE+';">'+s.x+'</p>':'')+'</div>';
      c.addEventListener('click',function(){sel.serv=s;var hoy=new Date();calMes=new Date(hoy.getFullYear(),hoy.getMonth(),1);paso2();});
      body.appendChild(c);
    });
    animBody();
  }
  function paso2(){
    marcaPaso(2); body.innerHTML=''; body.appendChild(btnAtras(paso1));
    titulo('¿Qué día?', sel.serv.n);
    var hoy=new Date();hoy.setHours(0,0,0,0);
    var max=new Date(hoy);max.setDate(max.getDate()+60);
    var head=document.createElement('div');head.style.cssText='display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;';
    var tit=document.createElement('p');tit.style.cssText='font-family:serif;color:'+TINTA+';text-transform:capitalize;margin:0;';tit.textContent=MESES[calMes.getMonth()]+' '+calMes.getFullYear();
    function navBtn(txt,delta){var b=document.createElement('button');b.type='button';b.style.cssText='width:40px;height:40px;border-radius:999px;border:1px solid rgba(0,0,0,.18);background:transparent;color:'+TINTA+';cursor:pointer;font-size:16px;';b.textContent=txt;
      b.addEventListener('click',function(){calMes=new Date(calMes.getFullYear(),calMes.getMonth()+delta,1);paso2();});return b;}
    var prev=navBtn('‹',-1),next=navBtn('›',1);
    if(calMes<=new Date(hoy.getFullYear(),hoy.getMonth(),1)){prev.style.opacity=.3;prev.style.pointerEvents='none';}
    if(calMes>=new Date(max.getFullYear(),max.getMonth(),1)){next.style.opacity=.3;next.style.pointerEvents='none';}
    head.appendChild(prev);head.appendChild(tit);head.appendChild(next);body.appendChild(head);
    var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(7,1fr);gap:6px;text-align:center;';
    ['D','L','M','M','J','V','S'].forEach(function(d){var e=document.createElement('p');e.style.cssText='font-size:11px;text-transform:uppercase;color:'+MUTE+';margin:0;padding:4px 0;font-family:Jost,sans-serif;';e.textContent=d;grid.appendChild(e);});
    for(var i=0;i<calMes.getDay();i++){grid.appendChild(document.createElement('span'));}
    var dias=new Date(calMes.getFullYear(),calMes.getMonth()+1,0).getDate();
    for(var d=1;d<=dias;d++){(function(d){
      var f=new Date(calMes.getFullYear(),calMes.getMonth(),d);
      var b=document.createElement('button');b.type='button';b.textContent=d;b.className='rw-day';
      var cerradoDia=!HORARIO[f.getDay()];
      if(f<hoy||f>max||cerradoDia){b.classList.add('off');}
      else{ if(f.getTime()===hoy.getTime())b.classList.add('today');
        b.addEventListener('click',function(){sel.fecha=f;paso3();}); }
      grid.appendChild(b);
    })(d);}
    body.appendChild(grid);
    var nota=document.createElement('p');nota.style.cssText='font-family:Jost,sans-serif;font-size:12px;color:'+MUTE+';margin:12px 0 0;';nota.textContent='Abierto las 24 horas, todos los días.';body.appendChild(nota);
    animBody();
  }
  function paso3(){
    marcaPaso(3); body.innerHTML=''; body.appendChild(btnAtras(paso2));
    var ftxt=sel.fecha.toLocaleDateString('es-MX',{weekday:'long',day:'numeric',month:'long'});
    titulo('¿A qué hora?', ftxt.charAt(0).toUpperCase()+ftxt.slice(1));
    var rangos=HORARIO[sel.fecha.getDay()]||[];
    var ahora=new Date();
    var grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:8px;';
    rangos.forEach(function(r){
      for(var t=r[0];t<r[1];t+=0.5){
        var hh=Math.floor(t),mm=(t%1)?30:0;
        if(hh>=24)continue;
        var dt=new Date(sel.fecha);dt.setHours(hh,mm,0,0);
        if(sel.fecha.toDateString()===ahora.toDateString()&&dt<=ahora)continue;
        var b=document.createElement('button');b.type='button';b.className='rw-chip';
        var h12=((hh+11)%12)+1,suf=hh<12?'am':'pm';
        b.textContent=h12+':'+(mm===0?'00':'30')+' '+suf;
        (function(label){b.addEventListener('click',function(){sel.hora=label;paso4();});})(b.textContent);
        grid.appendChild(b);
      }
    });
    if(!grid.children.length){var p=document.createElement('p');p.style.cssText='font-family:Jost,sans-serif;color:'+MUTE+';';p.textContent='Ya no hay horarios hoy — elige otro día.';body.appendChild(p);}
    body.appendChild(grid); animBody();
  }
  function paso4(){
    marcaPaso(4); body.innerHTML=''; body.appendChild(btnAtras(paso3));
    titulo('Confirma tu cita');
    var ftxt=sel.fecha.toLocaleDateString('es-MX',{weekday:'long',day:'numeric',month:'long'});
    var res=document.createElement('div');res.style.cssText='border:1px solid rgba(0,0,0,.14);background:rgba(255,255,255,.6);border-radius:16px;padding:14px 16px;margin-bottom:14px;font-family:Jost,sans-serif;';
    res.innerHTML='<p style="margin:0;font-size:15px;color:'+TINTA+';">'+sel.serv.ic+' '+sel.serv.n+'</p>'
      +'<p style="margin:4px 0 0;font-size:14px;color:'+MUTE+';text-transform:capitalize;">📅 '+ftxt+'</p>'
      +'<p style="margin:4px 0 0;font-size:14px;color:'+MUTE+';">🕐 '+sel.hora+'</p>';
    body.appendChild(res);
    function campo(id,label,ph){var lab=document.createElement('label');lab.style.cssText='display:block;font-family:Jost,sans-serif;text-transform:uppercase;letter-spacing:.12em;font-size:11px;color:'+MUTE+';margin:0 0 6px;';lab.textContent=label;lab.htmlFor=id;body.appendChild(lab);
      var inp=document.createElement('input');inp.id=id;inp.type='text';inp.placeholder=ph;
      inp.style.cssText='width:100%;border-radius:14px;background:rgba(255,255,255,.75);border:1px solid rgba(0,0,0,.15);padding:13px 15px;font-family:Jost,sans-serif;font-size:15px;color:'+TINTA+';margin-bottom:14px;outline:none;box-sizing:border-box;';
      body.appendChild(inp);return inp;}
    var inp=campo('rw-nombre','Tu nombre','¿Cómo te llamas?');
    var mas=campo('rw-mascota','Tu mascota','Nombre y especie (ej. Max, perro)');
    var go=document.createElement('button');go.type='button';
    go.style.cssText='width:100%;display:flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:999px;background:linear-gradient(145deg,#25d366,#12b455);color:#fff;font-family:Jost,sans-serif;font-weight:600;font-size:16px;padding:16px;cursor:pointer;box-shadow:0 10px 26px rgba(18,180,85,.35);';
    go.innerHTML=WA_SVG+' Agendar por WhatsApp';
    go.querySelector('svg').style.cssText='width:20px;height:20px;';
    go.addEventListener('click',function(){
      var n=inp.value.trim(); if(!n){inp.focus();inp.style.borderColor=ACC;return;}
      var t='¡Hola '+CONF.nombre+'! 🐾 Quiero agendar una cita:\n\n'+sel.serv.ic+' '+sel.serv.n+'\n📅 '+ftxt+'\n🕐 '+sel.hora+(mas.value.trim()?'\n🐶 Mascota: '+mas.value.trim():'')+'\n👤 '+n+'\n\n¿Me confirman disponibilidad? ¡Gracias!';
      window.open('https://wa.me/'+CONF.wa+'?text='+encodeURIComponent(t),'_blank');
      cerrar();
    });
    body.appendChild(go);
    var nota=document.createElement('p');nota.style.cssText='text-align:center;font-family:Jost,sans-serif;font-size:12px;color:'+MUTE+';margin:12px 0 0;';nota.textContent='Se abrirá WhatsApp con tu mensaje listo — solo dale enviar.';body.appendChild(nota);
    animBody(); inp.focus();
  }
  function init(){
    crearFab();
    document.addEventListener('click',function(e){
      var el=e.target.closest?e.target.closest('[data-reservar]'):null;
      if(!el)return; e.preventDefault();
      abrir(el.getAttribute('data-servicio')||undefined);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init); else init();
  window.VetBase={SERV:SERV,HORARIO:HORARIO,CONF:CONF,abrirCita:abrir};
})();
