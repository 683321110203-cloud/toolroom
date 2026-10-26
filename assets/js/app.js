/* TOOLROOM • Frontend demo — SVG floor map, role workflows, localStorage */
const $ = (s, e = document) => e.querySelector(s);
const $$ = (s, e = document) => [...e.querySelectorAll(s)];
const L = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const S = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const ICON = {
  home:'<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/>',
  scan:'<path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2"/><path d="M7 8h10v8H7zM2 12h3m14 0h3"/>',
  return:'<path d="M9 14 4 9l5-5"/><path d="M4 9h10a5 5 0 0 1 0 10h-2"/>',
  history:'<path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  chart:'<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 6-7"/>',
  check:'<path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="9"/>',
  box:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 8 9 5 9-5M3 8v9l9 4 9-4V8M12 13v8"/>',
  shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  key:'<circle cx="8" cy="15" r="5"/><path d="m11.5 11.5 9-9L23 5l-2 2 2 2-3 3-2-2-3 3"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  tools:'<path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L14 12l-3-3 3.7-2.7Z"/><path d="m17 7 2-2 2 2-2 2"/>',
  logout:'<path d="M10 17l5-5-5-5M15 12H3"/><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',
  camera:'<path d="M14 4h-4l-2 3H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4l-2-3Z"/><circle cx="12" cy="13" r="3.5"/>',
  package:'<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 8 9 5 9-5M3 8v9l9 4 9-4V8M12 13v8"/>',
  map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/>',
  cabinet:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M4 9h16M4 15h16M9 6h1m5 6h1m-6 6h1"/>',
  shelf:'<path d="M4 3v18M20 3v18M4 7h16M4 13h16M4 19h16"/><path d="M7 4h4v2H7zm7 6h4v2h-4zm-7 6h4v2H7z"/>',
  door:'<path d="M4 21V3h13v18M4 21h16M14 12h.01"/>',
  window:'<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M12 5v14M3 12h18"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.1 10.4a16 16 0 0 0 6 6l1.9-1.9a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 2.2 2.5Z"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
  trash:'<path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  qr:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zm4 4h3v3h-3zm-4 2h2"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/',
  alert:'<path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
  close:'<path d="m18 6-12 12M6 6l12 12"/>',
  minus:'<path d="M5 12h14"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7L5.9 16l1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z"/>',
  external:'<path d="M14 3h7v7M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
  star:'<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9Z"/>'
};
const ico = (name, size=18) => `<svg class="ico" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name] || ICON.box}</svg>`;

const LOCATIONS0 = [
  {id:'A',name:'ตู้สูง A',type:'cabinet',x:3,y:8,w:23,d:22,height:2,shelves:3,doors:2},
  {id:'B',name:'ตู้สูง B',type:'cabinet',x:74,y:8,w:23,d:22,height:2,shelves:3,doors:4},
  {id:'C',name:'ชั้นวาง C',type:'shelf',x:82,y:35,w:15,d:27,height:2,shelves:3,doors:0},
  {id:'D',name:'ชั้นวาง D',type:'shelf',x:82,y:64,w:15,d:27,height:2,shelves:3,doors:0},
  {id:'E',name:'ชั้นแขวน E',type:'hanger',x:0,y:34,w:3,d:43,height:.5,shelves:1,doors:0},
  {id:'F',name:'ตู้เตี้ย F',type:'cabinet',x:2,y:78,w:17,d:18,height:1,shelves:3,doors:0}
];
const ITEMS0 = [
  ['EQ001','ไขควงชุด',12,'A',1,'R'],['EQ002','คีมล็อก',8,'A',2,'R'],['EQ003','ประแจแหวน',10,'A',3,'R'],
  ['EQ004','เวอร์เนียคาลิเปอร์',6,'B',1,'R'],['EQ005','ไมโครมิเตอร์',4,'B',2,'R'],['EQ006','สว่านไฟฟ้า',3,'B',3,'R'],
  ['EQ007','เทปวัดระยะ 5 ม.',10,'C',1,'R'],['EQ008','หมวกนิรภัย',15,'C',2,'R'],['EQ009','ถุงมือผ้า',40,'D',1,'C'],
  ['EQ010','เทปพันสายไฟ',25,'D',2,'C'],['EQ011','สายพ่วงไฟ',5,'E',1,'R'],['EQ012','ตลับเมตรเล็ก',9,'F',1,'R']
].map(a=>({id:a[0],n:a[1],q:a[2],a:a[2],z:a[3],l:a[4],t:a[5],bad:0}));
const USERS0 = [
  {u:'6501001',p:'1234',r:'student',name:'นางสาวเอ ใจดี',fac:'วิศวกรรมศาสตร์',maj:'โลจิสติกส์',yr:4,tel:'081-234-5678',mail:'a.jaidee@uni.ac.th'},
  {u:'staff01',p:'1234',r:'staff',name:'นายบี ดูแลคลัง',fac:'วิศวกรรมศาสตร์',tel:'082-111-2222',mail:'staff01@uni.ac.th'},
  {u:'admin',p:'1234',r:'admin',name:'ผู้ดูแลระบบ',tel:'083-000-0000',mail:'admin@uni.ac.th'}
];
let locations = L('locations', LOCATIONS0);
let items = L('items', ITEMS0);
let users = L('users', USERS0);
let hist = L('hist', [{no:'B001',uid:'6501001',name:'นางสาวเอ ใจดี',at:new Date().toLocaleString('th-TH'),mode:'ในเวลาเรียน',due:'วันนี้ 21:00',list:[{id:'EQ001',qty:1}],ret:false}]);
let surveys = L('surveys', []);
let me = L('me', null), cart = L('cart', []);
const sv = () => { S('locations',locations); S('items',items); S('users',users); S('hist',hist); S('cart',cart); S('surveys',surveys); };
const I = id => items.find(i => i.id === id);
const LOC = id => locations.find(z => z.id === id);
const locationLabel = id => LOC(id) ? `${LOC(id).name} (${id})` : `ตำแหน่ง ${id}`;
const loc = i => `${locationLabel(i.z)} · ชั้น ${i.l}`;
const localISODate = () => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const page = document.body.dataset.page || 'login';
const MENU = {
  student:[['student-home','หน้าแรก','home'],['student-scan','สแกนยืม','scan'],['student-return','คืนอุปกรณ์','return'],['student-history','ประวัติ','history'],['student-profile','โปรไฟล์','user']],
  staff:[['staff-dashboard','ภาพรวมคลัง','chart'],['staff-check','ตรวจรับคืน','check'],['staff-history','ประวัติรายการ','history'],['staff-items','จัดการอุปกรณ์','tools'],['staff-profile','โปรไฟล์','user']],
  admin:[['admin-dashboard','แดชบอร์ด','chart'],['admin-roles','จัดการสิทธิ์','shield'],['admin-users','จัดการผู้ใช้','users'],['admin-profile','โปรไฟล์','user']]
};
if(page !== 'login' && !me) location.href='index.html';
let selectedLocation = null, mapMode = '3d', activeInventoryType = 'all', activeStaffType = 'all', cameraStream = null, scanControls = null, scanning = false, scanTimer = null;

function qr(s) { return `<div class="qr-wrap"><div class="qr-slot" data-qr="${esc(s)}"></div><small>${esc(s)}</small></div>`; }
function fallbackQR(text) {
  let seed=0; for (const c of String(text)) seed=(seed*31+c.charCodeAt(0))>>>0;
  let cells=''; for(let y=0;y<21;y++) for(let x=0;x<21;x++){
    const finder=(x<7&&y<7)||(x>13&&y<7)||(x<7&&y>13); let on;
    if(finder){const a=x%14,b=y%14;on=a===0||a===6||b===0||b===6||(a>1&&a<5&&b>1&&b<5)}
    else{seed=(seed*1664525+1013904223)>>>0;on=(seed>>>30)&1}
    if(on) cells+=`<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }
  return `<svg viewBox="-1 -1 23 23" class="qr-fallback" aria-label="QR preview"><rect x="-1" y="-1" width="23" height="23" fill="#fff"/>${cells}</svg>`;
}
function renderQRs(root=document) {
  $$('.qr-slot',root).forEach(node=>{
    if(node.dataset.ready==='qr'||(node.dataset.ready==='fallback'&&!window.QRCode)) return;
    node.innerHTML='';
    if(window.QRCode){ try { new QRCode(node,{text:node.dataset.qr,width:174,height:174,colorDark:'#10243e',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M}); node.dataset.ready='qr'; return; } catch(e){} }
    node.dataset.ready='fallback';node.innerHTML=fallbackQR(node.dataset.qr);
  });
}
const libraryPromises={};
function loadOptionalLibrary(key,url,refreshQR=false){
  if(window[key]){if(refreshQR)refreshQRs();return Promise.resolve(true);}
  if(libraryPromises[key])return libraryPromises[key];
  libraryPromises[key]=new Promise(resolve=>{
    if(!document.head){delete libraryPromises[key];resolve(false);return;}
    const script=document.createElement('script');script.src=url;script.async=true;
    let finished=false;
    const finish=ok=>{if(finished)return;finished=true;if(ok&&refreshQR){$$('.qr-slot').forEach(n=>{if(n.dataset.ready==='fallback'){n.dataset.ready='';n.innerHTML='';}});renderQRs();}if(!ok)delete libraryPromises[key];resolve(ok);};
    const timeout=setTimeout(()=>finish(!!window[key]),3500);
    script.onload=()=>{clearTimeout(timeout);finish(!!window[key]);};
    script.onerror=()=>{clearTimeout(timeout);finish(false);};
    document.head.append(script);
  });
  return libraryPromises[key];
}
function refreshQRs(){ $$('.qr-slot').forEach(n=>{if(n.dataset.ready==='fallback'){n.dataset.ready='';n.innerHTML='';}});renderQRs(); }
function loadLibrariesForPage(){
  if(page==='student-return'||page==='staff-items')loadOptionalLibrary('QRCode','https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',true);
  if(page==='student-scan'||page==='staff-check')loadOptionalLibrary('ZXing','https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js',false);
}
function shell(title, html) {
  const menu=MENU[me?.r] || MENU.student;
  const roleText={student:'นักศึกษา',staff:'เจ้าหน้าที่คลัง',admin:'ผู้ดูแลระบบ'}[me?.r] || '';
  document.body.innerHTML=`<div class="app-shell role-${me?.r||'student'}">
    <aside class="sidebar">
      <a class="brand" href="${menu[0][0]}.html" aria-label="TOOLFLOW หน้าหลัก"><span class="brand-mark"><img src="assets/img/toolflow-mark.png" alt=""></span><span class="brand-copy"><b>TOOLFLOW</b><small>SMART EQUIPMENT SYSTEM</small></span></a>
      <div class="side-caption">เมนูหลัก</div>
      <nav class="side-nav">${menu.map(a=>`<a href="${a[0]}.html" class="nav-link ${a[0]===page?'active':''}"><span class="nav-icon">${ico(a[2],19)}</span><span>${a[1]}</span>${a[0]===page?'<span class="nav-indicator"></span>':''}</a>`).join('')}</nav>
      <div class="sidebar-spacer"></div>
      <div class="sidebar-account"><div class="avatar">${ico('user',18)}</div><div class="account-copy"><b>${esc(me?.name || '')}</b><small>${roleText}</small></div><button class="icon-button logout-btn" title="ออกจากระบบ" onclick="logout()">${ico('logout',17)}</button></div>
      <div class="sidebar-foot">TOOLFLOW · DEMO SYSTEM</div>
    </aside>
    <div class="app-main">
      <header class="topbar"><div class="topbar-title"><div class="topbar-brand-row"><img class="topbar-logo-mark" src="assets/img/toolflow-mark.png" alt="TOOLFLOW"><div class="topbar-meta"><div class="breadcrumbs">TOOLFLOW <span>/</span> ${esc(roleText)}</div><h1>${esc(title)}</h1></div></div></div><div class="topbar-actions"><span class="demo-pill"><span></span> DEMO MODE</span><div class="top-avatar">${ico('user',17)}</div></div></header>
      <main class="content">${html}</main>
    </div>
    <nav class="mobile-nav">${menu.map(a=>`<a href="${a[0]}.html" class="${a[0]===page?'active':''}">${ico(a[2],20)}<span>${a[1]}</span></a>`).join('')}</nav>
  </div>`;
  renderQRs();
}
function modal(content, size='normal') {
  const overlay=document.createElement('div'); overlay.className='modal-overlay';
  overlay.innerHTML=`<section class="modal-card ${size==='wide'?'modal-wide':''}"><div class="modal-body">${content}</div></section>`;
  overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove()});
  document.body.append(overlay); renderQRs(overlay); return overlay;
}
function closeModal(){ const overlays=$$('.modal-overlay'); overlays[overlays.length-1]?.remove(); }
function stat(label,value,iconName,sub='') { return `<article class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon">${ico(iconName,19)}</span></div><strong>${value}</strong>${sub?`<small>${sub}</small>`:''}</article>`; }
function emptyState(title,detail='ยังไม่มีรายการในขณะนี้') { return `<div class="empty-state">${ico('box',28)}<b>${title}</b><span>${detail}</span></div>`; }
function badge(text,tone='neutral'){ return `<span class="status-badge ${tone}"><i></i>${text}</span>`; }
function typeBadge(type){return `<span class="type-badge ${type==='R'?'type-returnable':'type-consumable'}">${type==='R'?'อุปกรณ์ยืม–คืน':'วัสดุสิ้นเปลือง'}</span>`;}

// Equipment thumbnails are drawn as inline SVG product illustrations, not generic menu icons.
function equipmentPhoto(item, size='inventory'){
  const n=String(item?.n||'').toLowerCase();
  let art='';
  if(n.includes('สว่าน')) art=`<g transform="rotate(-8 58 39)"><rect x="35" y="19" width="34" height="27" rx="7" fill="#2f6da8" stroke="#204c78" stroke-width="2"/><path d="M40 23h22v7H40z" fill="#77a9d6"/><rect x="66" y="27" width="16" height="12" rx="3" fill="#9aa8b7" stroke="#596b7d" stroke-width="2"/><path d="M82 30h15v5H82z" fill="#d5dde5" stroke="#7d8996"/><rect x="46" y="41" width="16" height="19" rx="4" fill="#244b72"/><rect x="48" y="55" width="21" height="8" rx="3" fill="#313d4b"/><path d="M47 43h7" stroke="#b8d8ef" stroke-width="2"/></g>`;
  else if(n.includes('หมวก')) art=`<path d="M22 48c1-19 14-30 34-30s33 11 34 30v5H22z" fill="#e7b943" stroke="#8f6b16" stroke-width="2"/><path d="M36 28c10-7 29-6 38 3" fill="none" stroke="#ffe59a" stroke-width="4" stroke-linecap="round"/><path d="M17 51q39 10 78 0v5q-39 12-78 0z" fill="#f3d06b" stroke="#a67e20" stroke-width="2"/><path d="M55 22v24" stroke="#c99b2a" stroke-width="3"/>`;
  else if(n.includes('ถุงมือ')) art=`<path d="M38 57 27 43q-3-5 2-8 4-2 7 3l5 6V23q0-5 5-5t5 5v14-19q0-5 5-5t5 5v19-15q0-5 5-5t5 5v16-9q0-5 5-5t5 5v19q0 17-17 17H51q-8 0-13-9z" fill="#4b83b7" stroke="#2c567e" stroke-width="2" stroke-linejoin="round"/><path d="M47 23v11m10-15v15m10-11v11" stroke="#b7d8ef" stroke-width="2" stroke-linecap="round"/>`;
  else if(n.includes('เวอร์เนีย')||n.includes('ไมโคร')) art=`<g transform="rotate(-8 56 39)"><rect x="16" y="36" width="83" height="9" rx="2" fill="#9faebc" stroke="#536779" stroke-width="2"/><path d="M21 37v7m7-7v4m7-4v7m7-7v4m7-4v7m7-7v4m7-4v7m7-7v4m7-4v7m7-7v4m7-4v7" stroke="#f7fafc" stroke-width="1.3"/><rect x="48" y="27" width="14" height="26" rx="2" fill="#3e7cae" stroke="#204c76" stroke-width="2"/><path d="M54 28v-7h9v7M54 52v7h9v-7" fill="none" stroke="#7c8d9c" stroke-width="4"/><rect x="45" y="31" width="20" height="5" rx="1" fill="#dce7ef"/></g>`;
  else if(n.includes('เทปพันสายไฟ')) art=`<g transform="rotate(-14 56 40)"><ellipse cx="55" cy="42" rx="24" ry="22" fill="#252d36" stroke="#111821" stroke-width="3"/><ellipse cx="55" cy="42" rx="11" ry="11" fill="#f3f6f9" stroke="#95a2af" stroke-width="4"/><path d="M37 25q18-10 34 4" stroke="#636d78" stroke-width="3" fill="none"/><path d="M69 58l12 7-5 7-13-9z" fill="#3a424d"/></g>`;
  else if(n.includes('เทป')||n.includes('ตลับเมตร')) art=`<g transform="rotate(-7 56 40)"><rect x="27" y="18" width="57" height="46" rx="11" fill="#e5b93a" stroke="#9b7820" stroke-width="2.5"/><rect x="33" y="23" width="45" height="35" rx="8" fill="#f3ce59"/><circle cx="55" cy="40" r="13" fill="#fff5cf" stroke="#9f7b26" stroke-width="3"/><circle cx="55" cy="40" r="7" fill="#d6dde3" stroke="#8593a1" stroke-width="2"/><path d="M77 43h11l4 6h-15z" fill="#343f4c"/><path d="M40 25h17" stroke="#fff0a6" stroke-width="3" stroke-linecap="round"/></g>`;
  else if(n.includes('คีม')) art=`<g stroke-linecap="round" stroke-linejoin="round"><path d="M53 35 35 59q-3 5 2 8t8-3l17-25" fill="none" stroke="#c54d56" stroke-width="10"/><path d="M61 35 79 59q3 5-2 8t-8-3L52 39" fill="none" stroke="#315f95" stroke-width="10"/><path d="M48 37 35 22q-3-5 2-8l7 1 13 17m7 5 13-16q4-4 8 0l-1 7-13 14" fill="#9baab8" stroke="#536577" stroke-width="3"/><circle cx="56" cy="37" r="6" fill="#e5ecf2" stroke="#64788b" stroke-width="2"/></g>`;
  else if(n.includes('ประแจ')) art=`<g transform="rotate(28 58 39)"><path d="M32 20a16 16 0 0 0 19 20l22 24q5 5 10 0t0-10L59 32a16 16 0 0 0-20-19l9 10-7 7z" fill="#a9b6c2" stroke="#586a7b" stroke-width="3" stroke-linejoin="round"/><path d="M39 20 46 27" stroke="#e9eef3" stroke-width="3" stroke-linecap="round"/><circle cx="77" cy="56" r="4" fill="#dce4ea"/></g>`;
  else if(n.includes('ไขควง')||n.includes('ตะไบ')) art=`<g transform="rotate(28 56 39)"><rect x="47" y="11" width="20" height="26" rx="7" fill="#c64d56" stroke="#8e303c" stroke-width="2"/><path d="M50 17h14m-14 5h14m-14 5h14" stroke="#f0a0a4" stroke-width="2"/><rect x="53" y="35" width="8" height="31" rx="2" fill="#9aa9b8" stroke="#5c6f81" stroke-width="1.5"/><path d="M55 38v25" stroke="#e9eef3" stroke-width="2"/><path d="M53 66h8l-4 7z" fill="#738496"/></g>`;
  else if(n.includes('สายพ่วง')) art=`<path d="M26 29c-7 0-10 6-10 13s5 12 12 12h12c8 0 11-5 11-12s-3-13-11-13h-4c-7 0-10 5-10 12" fill="none" stroke="#303d4b" stroke-width="7" stroke-linecap="round"/><path d="M60 49c0 10 6 15 14 15h8c8 0 12-5 12-12s-4-12-12-12h-9c-7 0-13 4-13 9" fill="none" stroke="#3a4653" stroke-width="7" stroke-linecap="round"/><rect x="19" y="22" width="17" height="12" rx="3" fill="#e4ebf1" stroke="#718293" stroke-width="2"/><path d="M24 22v-5m7 5v-5" stroke="#7a8896" stroke-width="2"/><rect x="76" y="55" width="17" height="12" rx="3" fill="#e4ebf1" stroke="#718293" stroke-width="2"/><path d="M81 67v4m7-4v4" stroke="#7a8896" stroke-width="2"/>`;
  else art=`<g transform="rotate(-12 56 40)"><rect x="26" y="20" width="60" height="15" rx="7" fill="#426f9c" stroke="#244967" stroke-width="2"/><rect x="32" y="23" width="44" height="4" rx="2" fill="#93badb"/><rect x="50" y="34" width="12" height="27" rx="3" fill="#9caab7" stroke="#5c6f80" stroke-width="2"/><path d="M52 39v18" stroke="#e7edf2" stroke-width="2"/><rect x="44" y="57" width="24" height="7" rx="3" fill="#354454"/></g>`;
  return `<span class="equipment-photo ${size}" role="img" aria-label="ภาพประกอบ ${esc(item?.n||'อุปกรณ์')}"><svg viewBox="0 0 112 78" aria-hidden="true"><rect x="1" y="1" width="110" height="76" rx="11" fill="#f0f5f9"/><path d="M7 60h98" stroke="#e1e9f0" stroke-width="1"/><ellipse cx="56" cy="66" rx="28" ry="4" fill="#132b42" opacity=".08"/>${art}<path d="M9 10h20" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/></svg></span>`;
}
function inventoryCard(i){return `<article class="equipment-row-card interactive-equipment-card" role="button" tabindex="0" aria-label="ดูรายละเอียด ${esc(i.n)}" onclick="showEquipmentDetail('${esc(i.id)}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();showEquipmentDetail('${esc(i.id)}') }" data-search="${esc((i.n+' '+i.id+' '+i.z+' '+loc(i)).toLowerCase())}">${equipmentPhoto(i,'inventory')}<div class="equipment-row-main"><div class="equipment-name-line"><b>${esc(i.n)}</b>${typeBadge(i.t)}</div><small>${esc(i.id)} <span class="dot-separator">·</span> ${esc(loc(i))}</small><div class="equipment-stock-line"><span>คงเหลือ <b>${i.a}</b> / ${i.q}</span>${i.a>0?badge('พร้อมยืม','success'):badge('หมด','danger')}</div><span class="equipment-detail-cta">${ico('external',12)} ดูรายละเอียด</span></div></article>`;}
function showEquipmentDetail(id){
  const item=I(id);if(!item)return;
  const place=LOC(item.z);
  const total=Math.max(0,Number(item.q)||0);
  const available=Math.max(0,Number(item.a)||0);
  const damaged=Math.max(0,Number(item.bad)||0);
  const issued=Math.max(0,total-available-damaged);
  const isConsumable=item.t==='C';
  const status=available>0?badge('พร้อมใช้งาน','success'):badge('ไม่มีคงเหลือ','danger');
  const details=[
    ['รหัสอุปกรณ์',item.id],
    ['ประเภทอุปกรณ์',isConsumable?'วัสดุสิ้นเปลือง':'อุปกรณ์ยืม–คืน'],
    ['ตำแหน่งจัดเก็บ',place?`${place.name} (${place.id})`:`ตำแหน่ง ${item.z}`],
    ['ชั้นวาง',`ชั้น ${item.l||1}${place?.shelves?` จาก ${place.shelves} ชั้น`:''}`],
    ['จำนวนทั้งหมด',`${total} ชิ้น`],
    ['จำนวนคงเหลือ',`${available} ชิ้น`],
    [isConsumable?'จำนวนที่จ่ายออกแล้ว':'จำนวนที่กำลังยืม',`${issued} ชิ้น`],
    ['จำนวนชำรุด',`${damaged} ชิ้น`]
  ];
  const detailRows=details.map(([label,value])=>`<div class="equipment-detail-row"><span>${esc(label)}</span><b>${esc(value)}</b></div>`).join('');
  const canManage=me?.r==='staff'||me?.r==='admin';
  modal(`<div class="modal-heading equipment-detail-heading"><div><span class="eyebrow">EQUIPMENT DETAIL</span><h2>รายละเอียดอุปกรณ์</h2><p>ข้อมูลรายการและตำแหน่งจัดเก็บในระบบ TOOLROOM</p></div><button class="icon-button" aria-label="ปิดรายละเอียด" onclick="closeModal()">${ico('close')}</button></div>
    <div class="equipment-detail-hero"><div class="equipment-detail-photo-wrap">${equipmentPhoto(item,'detail')}<span>${isConsumable?'วัสดุสิ้นเปลือง':'อุปกรณ์ยืม–คืน'}</span></div><div class="equipment-detail-summary"><div class="equipment-detail-status">${typeBadge(item.t)}${status}</div><h3>${esc(item.n)}</h3><p class="equipment-detail-code">รหัส ${esc(item.id)}</p><div class="equipment-detail-position">${ico('map',16)}<span><b>${esc(place?.name||`ตำแหน่ง ${item.z}`)}</b><small>ชั้นวางที่ ${esc(item.l||1)}</small></span></div></div></div>
    <div class="equipment-detail-stock-grid"><div><small>คงเหลือ</small><b>${available}</b><span>ชิ้น</span></div><div><small>จำนวนทั้งหมด</small><b>${total}</b><span>ชิ้น</span></div><div><small>${isConsumable?'จ่ายออกแล้ว':'กำลังยืม'}</small><b>${issued}</b><span>ชิ้น</span></div><div><small>ชำรุด</small><b>${damaged}</b><span>ชิ้น</span></div></div>
    <h3 class="equipment-detail-section-title">ข้อมูลอุปกรณ์</h3><div class="equipment-detail-rows">${detailRows}</div>
    <div class="modal-actions equipment-detail-actions">${canManage?`<button type="button" class="btn btn-outline" onclick="closeModal();editItem('${esc(item.id)}')">${ico('edit',15)} แก้ไขข้อมูล</button>`:''}<button type="button" class="btn btn-primary" onclick="closeModal()">ปิดรายละเอียด</button></div>`, 'wide');
}


// ----- SVG room maps: both views are drawn from data, no map image is used -----
function mapCardHTML() {
  return `<section class="card map-card"><div class="card-heading"><div><h2>แผนผังห้องอุปกรณ์</h2><p>เลือกตำแหน่งเพื่อแสดงรายการวัสดุและอุปกรณ์ที่จัดเก็บ</p></div><div class="segmented"><button id="btnMap2D" class="${mapMode==='2d'?'selected':''}" onclick="setMapMode('2d')">${ico('map',15)} 2D</button><button id="btnMap3D" class="${mapMode==='3d'?'selected':''}" onclick="setMapMode('3d')">${ico('box',15)} 3D</button></div></div><div class="map-instruction-feature" role="note"><span class="map-instruction-icon">${ico('map',22)}</span><div class="map-instruction-copy"><b>แตะตู้หรือวัตถุบนผังเพื่อเลือกดูตำแหน่งวัสดุ</b><small>เลือกตู้หรือชั้นวางเพื่อดูรายการอุปกรณ์และจำนวนคงเหลือ</small></div><span class="map-instruction-hint">${ico('tools',15)} แตะเพื่อดู</span></div><div id="map"></div><div class="map-footer"><span>${ico('check',15)} เลือกตำแหน่งแล้วจะแสดงรายการด้านล่าง</span><span class="map-legend"><i class="legend-dot selected-dot"></i>ตำแหน่งที่เลือก <i class="legend-dot stock-dot"></i>มีอุปกรณ์</span></div></section>`;
}
function renderMapSvg2D() {
  const sx=5.55, ox=42, oy=42, room=100*sx;
  const locHtml=locations.map(z=>{
    const x=ox+z.x*sx,y=oy+z.y*sx,w=z.w*sx,d=z.d*sx,active=selectedLocation===z.id;
    const count=items.filter(i=>i.z===z.id).length;
    const base=z.type==='hanger'?'#e7eef7':(z.type==='cabinet'?'#dbe8f7':'#e1eaf3');
    const label=`${z.id} · ${z.name}`;
    let detail='';
    if(z.type==='hanger') detail=`<path d="M ${x+4} ${y+12} h ${Math.max(8,w-8)}" stroke="#3b6792" stroke-width="3"/>`;
    else for(let n=1;n<z.shelves;n++) detail+=`<path d="M${x+4} ${y+d*n/z.shelves}h${Math.max(4,w-8)}" stroke="#6685a5" stroke-width="2"/>`;
    return `<g class="map-location ${active?'picked':''}" role="button" tabindex="0" onclick="pickLocation('${esc(z.id)}')" onkeydown="if(event.key==='Enter')pickLocation('${esc(z.id)}')"><rect class="location-shadow" x="${x+3}" y="${y+4}" width="${w}" height="${d}" rx="3"/><rect class="location-body" x="${x}" y="${y}" width="${w}" height="${d}" rx="3" fill="${active?'#b9d7ff':base}"/><path d="M${x+5} ${y+5}h${Math.max(0,w-10)}" stroke="#fff" stroke-opacity=".9" stroke-width="3"/>${detail}<text x="${x+w/2}" y="${y+d/2+4}" text-anchor="middle" class="location-letter">${esc(z.id)}</text><text x="${x+w/2}" y="${y+d+14}" text-anchor="middle" class="location-name">${esc(z.name)}</text><circle cx="${x+w-3}" cy="${y+3}" r="8" class="location-count"/><text x="${x+w-3}" y="${y+6}" class="count-text" text-anchor="middle">${count}</text></g>`;
  }).join('');
  const winX=ox+room*.39, winW=room*.22;
  return `<svg class="room-svg map-2d-svg" viewBox="0 0 ${room+84} ${room+100}" role="img" aria-label="ผังห้อง 2 มิติ">
    <defs><pattern id="tile2d" width="55.5" height="55.5" patternUnits="userSpaceOnUse"><path d="M55.5 0H0V55.5" fill="none" stroke="#e2e8f0" stroke-width="1"/></pattern></defs>
    <rect x="${ox}" y="${oy}" width="${room}" height="${room}" rx="1" fill="#f8fafc" stroke="#253a54" stroke-width="5"/><rect x="${ox}" y="${oy}" width="${room}" height="${room}" fill="url(#tile2d)"/>
    <rect x="${winX}" y="${oy-5}" width="${winW}" height="10" fill="#e8f6fb" stroke="#1f4c69" stroke-width="2"/><path d="M${winX+winW/2} ${oy-5}v10" stroke="#1f4c69" stroke-width="2"/><text x="${winX+winW/2}" y="${oy-16}" text-anchor="middle" class="room-label">หน้าต่าง</text>
    <path d="M${ox+room*.34} ${oy+room}H${ox+room*.66}" stroke="#fff" stroke-width="9"/><path d="M${ox+room*.34} ${oy+room}h${room*.15}v-${room*.15}" fill="none" stroke="#334155" stroke-width="2"/><path d="M${ox+room*.34} ${oy+room} A${room*.15} ${room*.15} 0 0 1 ${ox+room*.49} ${oy+room-room*.15}" fill="none" stroke="#94a3b8" stroke-width="1.5"/><text x="${ox+room*.5}" y="${oy+room+28}" text-anchor="middle" class="room-label">ประตูทางเข้า</text>
    ${locHtml}
    <text x="${ox+12}" y="${oy+room-12}" class="room-small">ขนาดแสดงโดยประมาณ</text>
  </svg>`;
}
function iso(x,y,z=0) { return {x:470+(x-y)*3.75, y:174+(x+y)*1.7-z*47}; }
const pt = p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
const poly = (pts,fill,stroke='#6b829c',sw=1,extra='') => `<polygon points="${pts.map(pt).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" ${extra}/>`;
function equipmentGlyph(item) {
  const n=String(item?.n||'').toLowerCase();
  if(n.includes('สว่าน')) return '<path d="M3 7h9l3 3h4v4h-5l-2-2H3z"/><path d="M6 14v5h4v-5M14 7V4h3v4"/>';
  if(n.includes('หมวก')) return '<path d="M3 14a9 9 0 0 1 18 0v2H3z"/><path d="M2 17h20M12 5v5"/>';
  if(n.includes('ถุงมือ')) return '<path d="M7 12V5a1.5 1.5 0 0 1 3 0v5-7a1.5 1.5 0 0 1 3 0v7-5a1.5 1.5 0 0 1 3 0v6-3a1.5 1.5 0 0 1 3 0v7c0 4-2 6-6 6h-2c-2 0-3-1-4-3l-3-4a1.8 1.8 0 0 1 3-2l2 2"/>';
  if(n.includes('เวอร์เนีย')||n.includes('ไมโคร')) return '<path d="M3 6h18M5 4v4m4-4v3m4-3v4m4-4v3m-7 2v10m-4-2h8"/><circle cx="12" cy="16" r="3"/>';
  if(n.includes('เทป')||n.includes('ตลับเมตร')) return '<rect x="4" y="5" width="16" height="14" rx="3"/><circle cx="12" cy="12" r="4"/><path d="M12 8v2m4 2h-2M8 12h2m2 4v-2"/>';
  if(n.includes('คีม')) return '<path d="M5 4l5 5m4 0 5-5M10 9l-5 8a2 2 0 0 0 3 3l5-8m1-3 5 8a2 2 0 0 1-3 3l-5-8"/>';
  if(n.includes('ประแจ')||n.includes('ไขควง')||n.includes('ตะไบ')) return '<path d="M14 4a5 5 0 0 0 0 7l-7 8a2 2 0 0 1-3-3l8-7a5 5 0 0 0 7-6l-3 3-3-3z"/>';
  if(n.includes('สายพ่วง')) return '<path d="M5 4v5a3 3 0 0 0 3 3h8a3 3 0 0 1 3 3v5"/><rect x="2.5" y="2" width="5" height="4" rx="1"/><rect x="16.5" y="18" width="5" height="4" rx="1"/>';
  return '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>';
}
function littleItem(item,x,y,z,idx) {
  const p=iso(x,y,z), colors=['#2f6fbb','#bd7a3e','#4d8579','#667c9b','#b65156','#8270a9'];
  const color=colors[idx%colors.length], name=String(item?.n||'อุปกรณ์'), qty=Math.max(0,Number(item?.a)||0);
  // A visible rectangular storage block with a simple line pictogram on its face.
  // The title remains accessible on hover/focus; there are no emoji glyphs in this scene.
  const glyph=equipmentGlyph(item);
  return `<g class="shelf-item-block" transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})" role="img" aria-label="${esc(name)} เหลือ ${qty} ชิ้น"><title>${esc(item?.id||'')} · ${esc(name)} · เหลือ ${qty} ชิ้น</title><ellipse cx="0" cy="9" rx="11" ry="3" fill="#172b43" opacity=".16"/><polygon points="-11,-6 0,-11 11,-6 0,-1" fill="#e4edf7" stroke="#56718d" stroke-width=".8"/><polygon points="-11,-6 0,-1 0,9 -11,4" fill="#d3e0ee" stroke="#56718d" stroke-width=".8"/><polygon points="0,-1 11,-6 11,4 0,9" fill="${color}" stroke="#36506c" stroke-width=".8"/><path d="M-7 -3 L-1 0 L-1 6 L-7 3Z" fill="#ffffff" opacity=".35"/><g transform="translate(4 -0.5) scale(.36)" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${glyph}</g><circle cx="8.5" cy="-5.5" r="4.2" fill="#10243e" stroke="#fff" stroke-width=".7"/><text x="8.5" y="-3.9" text-anchor="middle" font-size="4.2" font-family="Inter,sans-serif" font-weight="700" fill="#fff">${qty>99?'99+':qty}</text></g>`;
}
function renderOneLocation3D(z) {
  const x=z.x,y=z.y,w=z.w,d=z.d,h=z.height, active=selectedLocation===z.id;
  const P=(xx,yy,zz=0)=>iso(xx,yy,zz);
  const A=P(x,y),B=P(x+w,y),C=P(x+w,y+d),D=P(x,y+d);
  const Ah=P(x,y,h),Bh=P(x+w,y,h),Ch=P(x+w,y+d,h),Dh=P(x,y+d,h);
  const side=active?'#8fb9e8':'#aebfd0', back=active?'#274d78':'#344e6a', shelfTop=active?'#d7e8fb':'#e3ebf4';
  let out=`<g class="iso-location ${active?'picked':''}" role="button" tabindex="0" onclick="pickLocation('${esc(z.id)}')" onkeydown="if(event.key==='Enter')pickLocation('${esc(z.id)}')" aria-label="${esc(z.name)}">`;
  // cabinet backs and side panels; open face is deliberately left unobstructed
  if(z.type!=='hanger'){
    out+=poly([A,B,Bh,Ah],back,'#27415e',1.3);
    out+=poly([A,D,Dh,Ah],side,'#5f7892',1.1);
    out+=poly([B,C,Ch,Bh],active?'#7ea8d7':'#c5d3e1','#526c88',1.1);
    // Top cap is thin and slightly overhanging, in a blue/graphite finish
    out+=poly([Ah,Bh,Ch,Dh],active?'#2f639b':'#526d8b','#243e5b',1.2);
  } else {
    out+=poly([A,D,Dh,Ah],'#345879','#1e3a56',1.2);
    out+=`<path d="M${pt(Ah)} L${pt(Bh)}" stroke="#274d71" stroke-width="4"/>`;
  }
  if(z.type!=='hanger'){
    for(let n=1;n<=z.shelves;n++){
      const level=(h/(z.shelves+0.25))*n;
      if(level>h+.01) continue;
      const sA=P(x,y,level),sB=P(x+w,y,level),sC=P(x+w,y+d,level),sD=P(x,y+d,level);
      out+=poly([sA,sB,sC,sD],shelfTop,'#8096ad',.85);
      // front lip, giving each shelf a physical edge
      out+=poly([sD,sC,{x:sC.x,y:sC.y+2.5},{x:sD.x,y:sD.y+2.5}],active?'#6d9bcf':'#9fb4c9','#647c96',.6);
      const shelfNo=n;
      const allInv=items.filter(i=>i.z===z.id&&Number(i.l)===shelfNo);
      // Narrow shelving gets two blocks; wider cabinets can display three without overlap.
      const maxVisible=w<18?2:3, inv=allInv.slice(0,maxVisible);
      inv.forEach((item,idx)=>{
        const slots=inv.length;
        const ratio=slots===1?.5:(slots===2?(idx===0?.27:.73):(.18+idx*.32));
        const ix=x+w*ratio, iy=y+d*.64;
        out+=littleItem(item,ix,iy,level+.075,idx+Number(String(item.id).replace(/\D/g,'')));
      });
      if(allInv.length>maxVisible){const more=P(x+w*.88,y+d*.68,level+.22);out+=`<g class="shelf-item-more" transform="translate(${more.x} ${more.y})"><rect x="-8" y="-5" width="16" height="10" rx="2" fill="#10243e" stroke="#fff" stroke-width=".7"/><text x="0" y="1.5" text-anchor="middle" font-size="6" font-weight="700" fill="#fff">+${allInv.length-maxVisible}</text></g>`;}
    }
    // Open-front uprights and exposed shelf frame; no doors or front wall to hide stored items
    out+=`<path d="M${pt(D)} L${pt(Dh)} M${pt(C)} L${pt(Ch)}" stroke="#3a5878" stroke-width="3.4" stroke-linecap="round"/>`;
    out+=`<path d="M${pt(Dh)} L${pt(Ch)}" stroke="#405f80" stroke-width="2.8"/>`;
    // Door hint at the sides only for closed cabinet type, kept folded open
    if(z.type==='cabinet'&&z.doors){
      const mid=P(x+w*.08,y+d,h*.55);
      out+=`<path d="M${pt(mid)} l-10 -4 l-2 9 l10 4Z" fill="#b9c9d9" stroke="#5c7490" stroke-width=".8" opacity=".9"/>`;
      const mid2=P(x+w*.92,y+d,h*.55);
      out+=`<path d="M${pt(mid2)} l10 -4 l2 9 l-10 4Z" fill="#b9c9d9" stroke="#5c7490" stroke-width=".8" opacity=".9"/>`;
    }
  } else {
    for(let n=0;n<7;n++){
      const px=P(x+w*.4,y+d*(.1+n*.12),.3);
      out+=`<path d="M${px.x-3} ${px.y} q4 -5 8 0 v6" fill="none" stroke="#315b86" stroke-width="2.3" stroke-linecap="round"/>`;
    }
    items.filter(i=>i.z===z.id).slice(0,3).forEach((item,idx)=>out+=littleItem(item,x+w*.6,y+d*(.22+idx*.2),.2,idx));
  }
  // Location tag floats just above the rear/top edge
  const tag=P(x+w*.5,y,h+.18), count=items.filter(i=>i.z===z.id).length;
  out+=`<g class="iso-label" transform="translate(${tag.x.toFixed(1)} ${(tag.y-6).toFixed(1)})"><rect x="-29" y="-13" width="58" height="20" rx="6" fill="${active?'#164e8a':'#10243e'}"/><text x="0" y="1" text-anchor="middle">${esc(z.id)} · ${count}</text></g>`;
  out+='</g>';
  return out;
}
function renderMapSvg3D() {
  const corners=[iso(0,0),iso(100,0),iso(100,100),iso(0,100)];
  let tiles='';
  for(let n=10;n<100;n+=10){tiles+=`<path d="M${pt(iso(n,0))} L${pt(iso(n,100))}"/>`; tiles+=`<path d="M${pt(iso(0,n))} L${pt(iso(100,n))}"/>`;}
  const windowA=iso(39,0),windowB=iso(61,0),windowMidA=iso(50,0),windowMidB=iso(50,3),doorA=iso(38,100),doorB=iso(52,100),doorC=iso(52,94),windowLabel=iso(50,0),doorLabel=iso(45,100);
  const objects=locations.slice().sort((a,b)=>(a.x+a.y)-(b.x+b.y)).map(renderOneLocation3D).join('');
  return `<svg class="room-svg map-3d-svg" viewBox="0 0 940 590" role="img" aria-label="ผังห้องคลังอุปกรณ์ 3 มิติแบบเปิดเห็นชั้นวาง">
    <defs><linearGradient id="floorTone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfdff"/><stop offset="1" stop-color="#dfe7f0"/></linearGradient><filter id="softShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="1" dy="4" stdDeviation="4" flood-color="#243b53" flood-opacity=".15"/></filter></defs>
    <ellipse cx="470" cy="348" rx="365" ry="190" fill="#263d55" opacity=".06"/>
    ${poly(corners,'url(#floorTone)','#71859b',2,'filter="url(#softShadow)"')}
    <g class="floor-grid" stroke="#cfd9e4" stroke-width=".75" opacity=".8">${tiles}</g>
    <path d="M${pt(corners[0])} L${pt(corners[1])} L${pt(corners[2])} L${pt(corners[3])} Z" fill="none" stroke="#657b92" stroke-width="4" stroke-linejoin="round"/>
    <path d="M${pt(windowA)} L${pt(windowB)}" stroke="#f8fdff" stroke-width="9"/><path d="M${pt(windowA)} L${pt(windowB)}" stroke="#2f5b7d" stroke-width="4"/><path d="M${pt(windowMidA)} L${pt(windowMidB)}" stroke="#2f5b7d" stroke-width="2"/><text x="${windowLabel.x.toFixed(1)}" y="${(windowLabel.y-12).toFixed(1)}" text-anchor="middle" class="iso-room-label">หน้าต่าง</text>
    <path d="M${pt(doorA)} L${pt(doorB)}" stroke="#f8fafc" stroke-width="10"/><path d="M${pt(doorA)} L${pt(doorB)}" stroke="#71859b" stroke-width="2"/><path d="M${pt(doorA)} L${pt(doorC)}" stroke="#42617f" stroke-width="2.4"/><path d="M${pt(doorC)} A48 24 0 0 1 ${pt(doorB)}" fill="none" stroke="#9aabbd" stroke-width="1.5"/><text x="${doorLabel.x.toFixed(1)}" y="${(doorLabel.y+23).toFixed(1)}" text-anchor="middle" class="iso-room-label">ประตูทางเข้า</text>
    ${objects}
    <g transform="translate(28 26)"><rect width="164" height="45" rx="10" fill="#fff" stroke="#d7e1eb"/><circle cx="17" cy="16" r="4" fill="#2f639b"/><text x="29" y="19" class="scene-legend-title">OPEN STORAGE VIEW</text><text x="14" y="34" class="scene-legend-sub">เปิดด้านหน้า · เห็นอุปกรณ์ภายใน</text></g>
  </svg>`;
}
function renderMap() {
  const target=$('#map'); if(!target)return;
  target.innerHTML=mapMode==='2d'?renderMapSvg2D():renderMapSvg3D();
  $('#btnMap2D')?.classList.toggle('selected',mapMode==='2d'); $('#btnMap3D')?.classList.toggle('selected',mapMode==='3d');
  const active=LOC(selectedLocation);
  const scope=active?items.filter(i=>i.z===active.id):items;
  const detail=$('#map-detail');
  if(detail) detail.innerHTML=`<div class="selection-title"><div><span class="eyebrow">${active?'ตำแหน่งที่เลือก':'รายการอุปกรณ์ทั้งหมด'}</span><h3>${active?esc(active.name):'วัสดุอุปกรณ์ในห้อง'}</h3></div>${active?`<button class="btn btn-outline btn-sm" onclick="showLocationQR('${esc(active.id)}')">${ico('qr',15)} QR ตำแหน่ง</button>`:''}</div>
    <div class="inventory-category-tabs" role="group" aria-label="ประเภทอุปกรณ์"><button class="category-filter ${activeInventoryType==='all'?'selected':''}" onclick="setInventoryType('all')">ทั้งหมด <b>${scope.length}</b></button><button class="category-filter ${activeInventoryType==='R'?'selected':''}" onclick="setInventoryType('R')">ยืม–คืน <b>${scope.filter(i=>i.t==='R').length}</b></button><button class="category-filter ${activeInventoryType==='C'?'selected':''}" onclick="setInventoryType('C')">วัสดุสิ้นเปลือง <b>${scope.filter(i=>i.t==='C').length}</b></button></div>
    <div id="inventoryItemsList" class="equipment-list"></div>`;
  renderInventoryList();
}
function renderInventoryList(){
  const list=$('#inventoryItemsList');if(!list)return;
  const q=($('#itemSearch')?.value||'').toLowerCase();
  const base=selectedLocation?items.filter(i=>i.z===selectedLocation):items;
  const filtered=base.filter(i=>activeInventoryType==='all'||i.t===activeInventoryType).filter(i=>(i.n+' '+i.id+' '+loc(i)).toLowerCase().includes(q));
  list.innerHTML=filtered.map(inventoryCard).join('')||`<div class="inventory-empty">${emptyState('ไม่พบอุปกรณ์','ลองเปลี่ยนหมวดหมู่หรือคำค้นหา')}</div>`;
  $$('#map-detail .category-filter').forEach(b=>b.classList.toggle('selected',b.getAttribute('onclick')?.includes(`'${activeInventoryType}'`)));
}
function setInventoryType(type){activeInventoryType=type;renderInventoryList();}

function setMapMode(m){mapMode=m;renderMap();}
function pickLocation(id){selectedLocation=selectedLocation===id?null:id;renderMap();}
function initHomeMap(){renderMap();}
function showLocationQR(id){
  const z=LOC(id);if(!z)return;
  modal(`<div class="modal-heading"><div><span class="eyebrow">LOCATION QR CODE</span><h2>QR สำหรับติดชั้นวาง</h2><p>สแกนเพื่อเปิดรายการอุปกรณ์ในตำแหน่งนี้</p></div><button class="icon-button" onclick="closeModal()">${ico('close')}</button></div><div class="qr-panel location-qr-panel">${qr('LOCATION:'+z.id)}<b>${esc(z.name)}</b><span>รหัสตำแหน่ง ${esc(z.id)} · ${items.filter(i=>i.z===z.id).length} ประเภทอุปกรณ์</span><p>ดาวน์โหลดเป็น PNG ความละเอียดสูง พร้อมชื่อชั้นวางและรหัสตำแหน่ง เพื่อนำไปพิมพ์ติดหน้าตู้หรือชั้น</p><button class="btn btn-primary location-qr-download" onclick="downloadLocationQR('${esc(z.id)}')">${ico('download',16)} ดาวน์โหลด QR สำหรับพิมพ์ (PNG)</button></div>`);
}
async function downloadLocationQR(id){
  const z=LOC(id);if(!z)return alert('ไม่พบตำแหน่งจัดเก็บนี้');
  const btn=$('.location-qr-download');if(btn){btn.disabled=true;btn.innerHTML=`${ico('clock',16)} กำลังสร้างไฟล์…`;}
  try{
    const loaded=window.QRCode?true:await loadOptionalLibrary('QRCode','https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',false);
    if(!loaded||!window.QRCode)throw new Error('ไม่สามารถโหลดตัวสร้าง QR Code ได้ กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วลองอีกครั้ง');
    const holder=document.createElement('div');
    new QRCode(holder,{text:'LOCATION:'+z.id,width:480,height:480,colorDark:'#10243e',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});
    let qrCanvas=holder.querySelector('canvas');
    if(!qrCanvas){
      const qrImg=holder.querySelector('img');
      if(qrImg){await new Promise((resolve,reject)=>{if(qrImg.complete&&qrImg.naturalWidth)resolve();else{qrImg.onload=resolve;qrImg.onerror=reject;}});qrCanvas=document.createElement('canvas');qrCanvas.width=480;qrCanvas.height=480;qrCanvas.getContext('2d').drawImage(qrImg,0,0,480,480);}
    }
    if(!qrCanvas)throw new Error('สร้างภาพ QR ไม่สำเร็จ กรุณาลองใหม่');
    const out=document.createElement('canvas');out.width=720;out.height=900;
    const ctx=out.getContext('2d');
    ctx.fillStyle='#ffffff';ctx.fillRect(0,0,out.width,out.height);
    ctx.fillStyle='#102b4a';ctx.fillRect(0,0,out.width,126);
    ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.font='700 34px Arial, sans-serif';ctx.fillText('TOOLROOM',360,51);
    ctx.font='500 20px Arial, sans-serif';ctx.fillText('STORAGE LOCATION QR',360,88);
    ctx.fillStyle='#173653';ctx.font='700 34px Arial, sans-serif';ctx.fillText(z.name,360,180,620);
    ctx.fillStyle='#567086';ctx.font='600 24px Arial, sans-serif';ctx.fillText('รหัสตำแหน่ง '+z.id,360,219);
    ctx.fillStyle='#ffffff';ctx.fillRect(105,245,510,510);
    ctx.strokeStyle='#d7e1ec';ctx.lineWidth=2;ctx.strokeRect(105,245,510,510);
    ctx.drawImage(qrCanvas,120,260,480,480);
    ctx.fillStyle='#173653';ctx.font='600 23px Arial, sans-serif';ctx.fillText('สแกนเพื่อดูรายการอุปกรณ์ในตำแหน่งนี้',360,803,650);
    ctx.fillStyle='#71859a';ctx.font='16px Arial, sans-serif';ctx.fillText('LOCATION:'+z.id,360,843);
    const link=document.createElement('a');link.download=`TOOLROOM_QR_LOCATION_${String(z.id).replace(/[^a-zA-Z0-9_-]/g,'_')}.png`;link.href=out.toDataURL('image/png');document.body.append(link);link.click();link.remove();
    if(btn){btn.disabled=false;btn.innerHTML=`${ico('download',16)} ดาวน์โหลด QR สำหรับพิมพ์ (PNG)`;}
  }catch(err){
    if(btn){btn.disabled=false;btn.innerHTML=`${ico('download',16)} ดาวน์โหลด QR สำหรับพิมพ์ (PNG)`;}
    alert(err?.message||'ดาวน์โหลด QR ไม่สำเร็จ กรุณาลองใหม่');
  }
}

// ----- UI pages -----
const R = {
  login(){
    document.body.innerHTML=`<div class="login-screen"><div class="login-left"><div class="login-brand"><img class="login-full-logo" src="assets/img/toolflow-logo.png" alt="TOOLFLOW — Seamless Disbursement & Circulation"></div><div class="login-promo"><div class="promo-mark">${ico('tools',44)}</div><span class="eyebrow">ENGINEERING · LOGISTICS</span><h1>ยืมง่าย<br><em>คืนเป็นระบบ</em></h1><p>ระบบจัดการวัสดุอุปกรณ์ห้องปฏิบัติการ ติดตามตำแหน่ง คงคลัง และประวัติการยืม–คืนได้ในที่เดียว</p><div class="promo-features"><span>${ico('map',16)} ผังห้อง 2D / 3D</span><span>${ico('scan',16)} QR Scan Workflow</span><span>${ico('chart',16)} Inventory Tracking</span></div></div><div class="login-copyright">TOOLFLOW · SMART EQUIPMENT MANAGEMENT</div></div><div class="login-right"><form class="login-form" onsubmit="event.preventDefault();login()"><div class="login-heading"><div class="login-icon">${ico('shield',24)}</div><h2>เข้าสู่ระบบ</h2><p>กรอกบัญชีเพื่อเข้าใช้งานตามสิทธิ์ของคุณ</p></div><label for="u">ชื่อผู้ใช้ / รหัสนักศึกษา</label><div class="input-icon">${ico('user',18)}<input id="u" autocomplete="username" placeholder="กรอกรหัสนักศึกษา" value="6501001" required></div><label for="p">รหัสผ่าน</label><div class="input-icon">${ico('key',18)}<input id="p" type="password" autocomplete="current-password" placeholder="กรอกรหัสผ่าน" value="1234" required></div><button class="btn btn-primary login-submit" type="submit">เข้าสู่ระบบ ${ico('external',16)}</button><div class="demo-accounts"><div class="demo-accounts-heading">บัญชีสำหรับทดสอบ <span>รหัสผ่าน 1234</span></div><button type="button" onclick="fillLogin('6501001')"><span class="demo-role student-role">${ico('user',14)}</span><span><b>นักศึกษา</b><small>6501001</small></span><span class="demo-arrow">${ico('external',14)}</span></button><button type="button" onclick="fillLogin('staff01')"><span class="demo-role staff-role">${ico('box',14)}</span><span><b>เจ้าหน้าที่</b><small>staff01</small></span><span class="demo-arrow">${ico('external',14)}</span></button><button type="button" onclick="fillLogin('admin')"><span class="demo-role admin-role">${ico('shield',14)}</span><span><b>ผู้ดูแลระบบ</b><small>admin</small></span><span class="demo-arrow">${ico('external',14)}</span></button></div></form></div></div>`;
  },
  'student-home'(){
    shell('หน้าแรก',`<section class="welcome-banner"><div><span class="eyebrow">STUDENT WORKSPACE</span><h2>สวัสดี, ${esc(me.name?.split(' ')[0]||'นักศึกษา')}</h2><p>ค้นหาตำแหน่งอุปกรณ์ก่อนยืม และตรวจสอบจำนวนคงเหลือได้ที่นี่</p><div class="welcome-actions"><a class="btn btn-light" href="student-scan.html">${ico('scan',16)} สแกนเพื่อยืม</a><a class="banner-link" href="student-history.html">ดูประวัติ ${ico('external',14)}</a></div></div><div class="banner-art">${ico('box',64)}<span class="art-circle c1"></span><span class="art-circle c2"></span></div></section>
      <div class="stat-grid">${stat('ประเภทอุปกรณ์',items.length,'box','รายการในคลัง')}${stat('พร้อมให้ยืม',items.filter(i=>i.a>0&&i.t==='R').length,'check','รายการที่มีคงเหลือ')}${stat('รายการค้างคืน',hist.filter(h=>h.uid===me.u&&!h.ret).length,'clock','รายการที่ยังไม่ปิด')}</div>
      <div class="section-heading"><div><h2>ผังห้องอุปกรณ์</h2><p>สลับมุมมอง 2D/3D และเลือกตู้เพื่อดูของด้านใน</p></div><a href="student-scan.html" class="text-link">เริ่มยืม ${ico('external',15)}</a></div>
      ${mapCardHTML()}<section class="card inventory-card"><div class="card-heading"><div><h2>อุปกรณ์ในห้อง</h2><p>สถานะคงเหลืออัปเดตจากรายการเดโม่ในเบราว์เซอร์</p></div><div class="search-small">${ico('search',16)}<input id="itemSearch" placeholder="ค้นหาอุปกรณ์" oninput="filterInventory()"></div></div><div id="map-detail"></div></section>`);
    initHomeMap();
  },
  'student-scan'(){
    shell('สแกนเพื่อยืม',`<div class="page-intro"><div><h2>เลือกอุปกรณ์ที่ต้องการยืม</h2><p>สแกน QR ของชั้นวางหรืออุปกรณ์ทีละรายการ แล้วตรวจสอบตะกร้าก่อนยืนยัน</p></div><span class="soft-pill">${ico('scan',15)} QR BORROW</span></div><div class="two-col-layout"><section class="card camera-card"><div class="card-heading"><div><h2>สแกน QR Code</h2><p>อนุญาตการใช้กล้องเพื่อสแกนรหัสจริง</p></div>${badge('กล้อง','info')}</div><div class="scanner-frame"><video id="studentVideo" autoplay playsinline muted></video><div class="scan-corners"><i></i><i></i><i></i><i></i><span></span></div><div id="studentCameraPlaceholder" class="camera-placeholder">${ico('camera',30)}<b>พร้อมสแกน QR</b><small>กดเปิดกล้องเพื่อเริ่มใช้งาน</small></div></div><div class="camera-controls"><button class="btn btn-primary" onclick="startScanner('student')">${ico('camera',16)} เปิดกล้อง</button><button class="btn btn-outline" onclick="stopScanner()">ปิดกล้อง</button></div><p class="camera-note" id="studentCameraStatus">บนคอมพิวเตอร์ให้เปิดผ่าน localhost/HTTPS เพื่ออนุญาตกล้อง</p></section><section class="card cart-card"><div class="card-heading"><div><h2>รายการที่เลือก</h2><p>ปรับจำนวนได้ก่อนยืนยันการยืม</p></div><span class="cart-count" id="cartCount">${cart.reduce((s,c)=>s+c.qty,0)} ชิ้น</span></div><div id="cart"></div><div class="cart-summary"><span>จำนวนรวม</span><b id="cartTotal">${cart.reduce((s,c)=>s+c.qty,0)} ชิ้น</b></div><button class="btn btn-primary full-btn" onclick="borrow()">${ico('box',17)} ยืนยันรายการยืม</button><button class="btn btn-outline full-btn" onclick="clearCart()">ล้างรายการ</button></section></div><section class="card quick-select"><div class="card-heading"><div><h2>จำลองการสแกนสำหรับนำเสนอ</h2><p>เลือก QR ของตำแหน่งหรืออุปกรณ์เมื่อไม่สะดวกเปิดกล้อง</p></div></div><div class="quick-select-grid">${locations.map(z=>`<button class="quick-location" onclick="openLocationPick('${esc(z.id)}')"><span class="quick-icon">${ico(z.type==='cabinet'?'cabinet':z.type==='hanger'?'tools':'shelf',19)}</span><span><b>${esc(z.name)}</b><small>${items.filter(i=>i.z===z.id).length} ประเภท · ${z.id}</small></span>${ico('plus',16)}</button>`).join('')}${items.map(i=>`<button class="quick-item" onclick="handleStudentCode('${esc(i.id)}')">${equipmentPhoto(i,'mini')}<span><b>${esc(i.n)}</b><small>${esc(i.id)} · เหลือ ${i.a}</small></span>${ico('plus',16)}</button>`).join('')}</div></section>`);
    drawCart();
  },
  'student-return'(){
    const open=hist.filter(h=>h.uid===me.u&&!h.ret);
    shell('คืนอุปกรณ์',`<div class="page-intro"><div><h2>QR สำหรับยืนยันตัวตนตอนคืน</h2><p>แสดงรหัสนี้ให้เจ้าหน้าที่สแกนเมื่อส่งอุปกรณ์คืนที่ห้องคลัง</p></div><span class="soft-pill">${ico('return',15)} RETURN</span></div><div class="two-col-layout return-layout"><section class="card return-qr-card"><span class="eyebrow">STUDENT RETURN PASS</span><div class="return-qr">${qr('RET:'+me.u)}</div><h2>${esc(me.name)}</h2><p class="muted">รหัสนักศึกษา ${esc(me.u)}</p><div class="return-instruction">${ico('check',18)}<span>ให้เจ้าหน้าที่เปิดหน้า “ตรวจรับคืน” แล้วสแกน QR นี้เพื่อยืนยันรายการ</span></div><button type="button" class="btn btn-outline full-btn survey-demo-trigger" onclick="showSatisfactionSurvey('${esc(me.u)}',true)">${ico('star',16)} จำลองประเมินความพึงพอใจ</button><p class="survey-demo-note">ใช้สำหรับทดลองแบบประเมินระหว่างสาธิต โดยไม่ต้องรอเจ้าหน้าที่ตรวจคืน</p></section><section class="card"><div class="card-heading"><div><h2>รายการที่ยังไม่คืน</h2><p>รายการยืมที่เปิดอยู่ในบัญชีของคุณ</p></div>${badge(`${open.length} รายการ`,open.length?'warning':'success')}</div>${open.map(hline).join('')||emptyState('ไม่มีอุปกรณ์ค้างคืน','คุณคืนอุปกรณ์ครบแล้ว')}</section></div>`);
  },
  'student-history'(){shell('ประวัติการยืม–คืน',`<div class="page-intro"><div><h2>ประวัติของฉัน</h2><p>ตรวจสอบวันยืม กำหนดคืน และสถานะการคืนอุปกรณ์</p></div></div><section class="card"><div class="filter-row"><div class="segmented"><button class="selected" onclick="fh(0,this)">ทั้งหมด</button><button onclick="fh(1,this)">วันนี้</button><button onclick="fh(2,this)">สัปดาห์นี้</button><button onclick="fh(3,this)">เดือนนี้</button></div><span class="muted">${hist.filter(h=>h.uid===me.u).length} รายการ</span></div><div id="hl"></div></section>`);fh(0);},
  'student-profile'(){shell('โปรไฟล์ของฉัน',profile(true));},
  'staff-dashboard'(){
    const retItems=items.filter(i=>i.t==='R'),cons=items.filter(i=>i.t==='C');
    shell('ภาพรวมคลังอุปกรณ์',`<div class="page-intro"><div><h2>ภาพรวมการจัดเก็บ</h2><p>สถานะวัสดุอุปกรณ์และรายการยืม–คืนล่าสุด</p></div><a class="btn btn-primary" href="staff-check.html">${ico('scan',16)} ตรวจรับคืน</a></div><div class="stat-grid">${stat('อุปกรณ์ต้องคืน',retItems.length,'return','ประเภท')}${stat('วัสดุสิ้นเปลือง',cons.length,'package','ประเภท')}${stat('ชำรุด',items.reduce((s,i)=>s+(+i.bad||0),0),'alert','ชิ้น')}${stat('ควรจัดซื้อ',items.filter(i=>i.a<5).length,'box','รายการคงเหลือน้อย')}</div><section class="card"><div class="card-heading"><div><h2>สถานะคงคลัง</h2><p>จำนวนพร้อมใช้เทียบกับจำนวนทั้งหมด</p></div><a class="text-link" href="staff-items.html">จัดการอุปกรณ์ ${ico('external',15)}</a></div><div class="inventory-table-wrap"><table class="data-table"><thead><tr><th>อุปกรณ์</th><th>ประเภท</th><th>ตำแหน่ง</th><th>คงเหลือ</th><th>สถานะ</th></tr></thead><tbody>${items.map(i=>`<tr><td><div class="item-cell">${equipmentPhoto(i,'table')}<div class="table-item-copy"><button type="button" class="equipment-name-trigger" onclick="showEquipmentDetail('${esc(i.id)}')">${esc(i.n)}</button><small>${esc(i.id)}</small></div></div></td><td>${typeBadge(i.t)}</td><td>${esc(loc(i))}</td><td><b>${i.a}</b><span class="muted"> / ${i.q}</span></td><td>${i.a<5?badge('ใกล้หมด','warning'):badge('พร้อมใช้','success')}</td></tr>`).join('')}</tbody></table></div></section><section class="card"><div class="card-heading"><div><h2>รายการล่าสุด</h2><p>รายการที่มีการยืมล่าสุดในระบบ</p></div><a class="text-link" href="staff-history.html">ดูทั้งหมด ${ico('external',14)}</a></div>${hist.slice(0,4).map(hline).join('')||emptyState('ไม่มีประวัติ')}</section>`);
  },
  'staff-check'(){
    const current=users.filter(u=>u.r==='student'&&hist.some(h=>h.uid===u.u&&!h.ret));
    shell('ตรวจรับคืนอุปกรณ์',`<div class="page-intro"><div><h2>ยืนยันการรับคืน</h2><p>สแกน QR จากหน้าคืนอุปกรณ์ของนักศึกษา แล้วตรวจสอบรายการก่อนกดยืนยันรับคืน</p></div><span class="soft-pill">${ico('shield',15)} STAFF CHECK</span></div><div class="two-col-layout staff-scan-layout"><section class="card camera-card"><div class="card-heading"><div><h2>กล้องสแกนรหัสนักศึกษา</h2><p>สแกน QR ที่มีข้อมูล RET:รหัสนักศึกษา</p></div>${badge('พร้อมใช้งาน','info')}</div><div class="scanner-frame staff-scanner"><video id="staffVideo" autoplay playsinline muted></video><div class="scan-corners"><i></i><i></i><i></i><i></i><span></span></div><div id="staffCameraPlaceholder" class="camera-placeholder">${ico('camera',32)}<b>สแกน QR นักศึกษา</b><small>วาง QR ให้อยู่ในกรอบ</small></div></div><div class="camera-controls"><button class="btn btn-primary" onclick="startScanner('staff')">${ico('camera',16)} เปิดกล้องสแกน</button><button class="btn btn-outline" onclick="stopScanner()">ปิดกล้อง</button></div><p class="camera-note" id="staffCameraStatus">กล้องต้องทำงานผ่าน localhost หรือ HTTPS และได้รับอนุญาตจากเบราว์เซอร์</p><div class="manual-scan"><label for="studentDemoSelect">หรือเลือกนักศึกษาเพื่อจำลองสแกน</label><div class="manual-scan-row"><select id="studentDemoSelect">${(current.length?current:users.filter(u=>u.r==='student')).map(u=>`<option value="${esc(u.u)}">${esc(u.u)} · ${esc(u.name)}</option>`).join('')}</select><button class="btn btn-outline" onclick="showStudentLoans($('#studentDemoSelect').value)">${ico('scan',15)} จำลองสแกน</button></div></div></section><section class="card return-check-card"><div class="card-heading"><div><h2>ข้อมูลผู้มาคืน</h2><p>ข้อมูลนักศึกษาและรายการยืมที่ยังเปิดอยู่</p></div></div><div id="returnStudentPanel">${emptyState('รอการสแกน','สแกน QR หรือเลือกนักศึกษาจากช่องจำลอง')}</div></section></div>`);
  },
  'staff-history'(){shell('ประวัติการยืม–คืน',`<div class="page-intro"><div><h2>รายการประจำวัน</h2><p>ค้นหาและตรวจดูข้อมูลการทำรายการยืม–คืน</p></div></div><section class="card"><div class="filter-row"><div class="segmented"><button class="selected" onclick="sd('b',this)">รายการยืม</button><button onclick="sd('r',this)">รายการคืน</button><button onclick="sd('all',this)">ทั้งหมด</button></div><div class="search-small">${ico('search',16)}<input id="historySearch" placeholder="ค้นหาชื่อนักศึกษา" oninput="sd(currentHistoryType)"></div></div><div class="inventory-table-wrap"><table class="data-table" id="sd"></table></div></section>`);sd('b');},
  'staff-items'(){
    shell('จัดการอุปกรณ์และตำแหน่ง',`<div class="page-intro"><div><h2>จัดการคลังและแผนผัง</h2><p>เพิ่มอุปกรณ์ กำหนดชั้นวาง แก้ไขข้อมูล และสร้าง QR สำหรับติดจุดจัดเก็บ</p></div></div><div class="admin-work-grid"><section class="card"><div class="card-heading"><div><h2>เพิ่มอุปกรณ์</h2><p>ระบุข้อมูลและตำแหน่งจัดเก็บ</p></div><span class="stat-icon">${ico('package',18)}</span></div><form onsubmit="event.preventDefault();addItem()"><label>ชื่อวัสดุอุปกรณ์</label><input id="itemName" placeholder="เช่น ประแจปากตาย" required><div class="form-grid"><div><label>จำนวนทั้งหมด</label><input id="itemQty" type="number" min="1" value="1" required></div><div><label>ประเภท</label><select id="itemType"><option value="R">อุปกรณ์ยืม–คืน</option><option value="C">วัสดุสิ้นเปลือง</option></select></div></div><div class="form-grid"><div><label>ตำแหน่ง</label><select id="itemLoc">${locations.map(z=>`<option value="${esc(z.id)}">${esc(z.id+' · '+z.name)}</option>`).join('')}</select></div><div><label>ชั้นที่</label><input id="itemShelf" type="number" min="1" max="10" value="1"></div></div><button class="btn btn-primary full-btn" type="submit">${ico('plus',16)} เพิ่มอุปกรณ์และสร้าง QR</button></form></section><section class="card location-add-card"><div class="card-heading"><div><h2>เพิ่มตู้ / ชั้นวาง</h2><p>ตำแหน่งใหม่จะแสดงบนผัง 2D และ 3D ทันที</p></div><span class="stat-icon">${ico('shelf',18)}</span></div><form onsubmit="event.preventDefault();addLocation()"><div class="form-grid"><div><label>ชื่อจุดจัดเก็บ</label><input id="locName" placeholder="เช่น ชั้นวาง G" required></div><div><label>ประเภท</label><select id="locType"><option value="cabinet">ตู้เก็บอุปกรณ์</option><option value="shelf">ชั้นวางเปิด</option><option value="hanger">ชั้นแขวน</option></select></div></div><div class="form-grid three"><div><label>X (%)</label><input id="locX" type="number" min="0" max="95" value="30" required></div><div><label>Y (%)</label><input id="locY" type="number" min="0" max="95" value="35" required></div><div><label>กว้าง (%)</label><input id="locW" type="number" min="4" max="40" value="18" required></div></div><div class="form-grid three"><div><label>ลึก (%)</label><input id="locD" type="number" min="4" max="40" value="18" required></div><div><label>สูง (ม.)</label><input id="locH" type="number" min="0.3" max="3" step="0.1" value="1.8" required></div><div><label>จำนวนชั้น</label><input id="locShelves" type="number" min="1" max="8" value="3" required></div></div><button class="btn btn-outline full-btn" type="submit">${ico('plus',16)} เพิ่มตำแหน่งบนผัง</button></form></section></div>
      <section class="card"><div class="card-heading"><div><h2>ตำแหน่งจัดเก็บ</h2><p>แก้ไขรายละเอียด สร้าง QR หรือเอาตำแหน่งออก</p></div><span class="muted">${locations.length} ตำแหน่ง</span></div><div class="location-admin-grid">${locations.map(z=>`<article class="location-admin-item"><div class="location-admin-visual">${ico(z.type==='cabinet'?'cabinet':z.type==='hanger'?'tools':'shelf',24)}<span>${esc(z.id)}</span></div><div class="location-admin-info"><b>${esc(z.name)}</b><small>${z.height} ม. · ${z.shelves} ชั้น · ${items.filter(i=>i.z===z.id).length} ประเภท</small><div class="location-actions"><button class="btn btn-outline btn-sm" onclick="editLocation('${esc(z.id)}')">${ico('edit',14)} แก้ไข</button><button class="btn btn-outline btn-sm" onclick="showLocationQR('${esc(z.id)}')">${ico('qr',14)} QR</button><button class="btn btn-outline btn-sm" onclick="downloadLocationQR('${esc(z.id)}')">${ico('download',14)} ดาวน์โหลด</button><button class="icon-button danger-button" title="ลบตำแหน่ง" onclick="deleteLocation('${esc(z.id)}')">${ico('trash',15)}</button></div></div></article>`).join('')}</div></section>
      <section class="card"><div class="card-heading"><div><h2>รายการวัสดุอุปกรณ์</h2><p>สร้าง QR ประจำอุปกรณ์ แก้ไขจำนวน และเปลี่ยนจุดจัดเก็บ</p></div><div class="search-small">${ico('search',16)}<input id="staffItemSearch" placeholder="ค้นหาอุปกรณ์" oninput="filterStaffItems()"></div></div><div class="inventory-category-tabs staff-category-tabs" role="group" aria-label="กรองประเภทอุปกรณ์"><button class="category-filter ${activeStaffType==='all'?'selected':''}" onclick="filterStaffItemsType('all',this)">ทั้งหมด <b>${items.length}</b></button><button class="category-filter ${activeStaffType==='R'?'selected':''}" onclick="filterStaffItemsType('R',this)">ยืม–คืน <b>${items.filter(i=>i.t==='R').length}</b></button><button class="category-filter ${activeStaffType==='C'?'selected':''}" onclick="filterStaffItemsType('C',this)">สิ้นเปลือง <b>${items.filter(i=>i.t==='C').length}</b></button></div><div class="inventory-table-wrap"><table class="data-table" id="staffItemsTable"><thead><tr><th>อุปกรณ์</th><th>ประเภท</th><th>ตำแหน่ง</th><th>คงเหลือ / ทั้งหมด</th><th>การจัดการ</th></tr></thead><tbody>${items.map(itemRow).join('')}</tbody></table></div></section>`);
      filterStaffItems();
  },
  'staff-profile'(){shell('โปรไฟล์เจ้าหน้าที่',profile(false));},
  'admin-dashboard'(){shell('แดชบอร์ดผู้ดูแลระบบ',`<div class="page-intro"><div><h2>ข้อมูลภาพรวมระบบ</h2><p>สรุปวัสดุอุปกรณ์ ผู้ใช้งาน และเจ้าหน้าที่ในระบบเดโม่</p></div><a href="admin-users.html" class="btn btn-primary">${ico('plus',16)} เพิ่มผู้ใช้</a></div><div class="stat-grid">${stat('ประเภทอุปกรณ์',items.length,'box','รายการ')}${stat('ชำรุด',items.reduce((s,i)=>s+(+i.bad||0),0),'alert','ชิ้น')}${stat('นักศึกษา',users.filter(u=>u.r==='student').length,'users','บัญชี')}${stat('เจ้าหน้าที่',users.filter(u=>u.r==='staff').length,'shield','บัญชี')}</div><div class="two-col-layout"><section class="card"><div class="card-heading"><div><h2>ภาพรวมคลัง</h2><p>จำนวนที่พร้อมใช้งานและวัสดุคงเหลือน้อย</p></div></div><div class="inventory-table-wrap"><table class="data-table"><thead><tr><th>อุปกรณ์</th><th>ประเภท</th><th>คงเหลือ</th><th>สถานะ</th></tr></thead><tbody>${items.map(i=>`<tr><td><div class="item-cell">${equipmentPhoto(i,'table')}<div class="table-item-copy"><button type="button" class="equipment-name-trigger" onclick="showEquipmentDetail('${esc(i.id)}')">${esc(i.n)}</button><small>${esc(i.id)}</small></div></div></td><td>${typeBadge(i.t)}</td><td>${i.a}/${i.q}</td><td>${i.a<5?badge('คงเหลือน้อย','warning'):badge('พร้อมใช้','success')}</td></tr>`).join('')}</tbody></table></div></section><section class="card"><div class="card-heading"><div><h2>บัญชีผู้ใช้งาน</h2><p>จำแนกตามบทบาท</p></div><a class="text-link" href="admin-roles.html">จัดการสิทธิ์ ${ico('external',14)}</a></div>${['student','staff','admin'].map(r=>`<div class="role-count-row"><span class="role-avatar ${r}">${ico(r==='student'?'user':r==='staff'?'box':'shield',17)}</span><span><b>${{student:'นักศึกษา',staff:'เจ้าหน้าที่',admin:'ผู้ดูแลระบบ'}[r]}</b><small>${users.filter(u=>u.r===r).length} บัญชี</small></span><strong>${users.filter(u=>u.r===r).length}</strong></div>`).join('')}<a class="btn btn-outline full-btn" href="admin-users.html">${ico('users',16)} จัดการบัญชีผู้ใช้</a></section></div><section class="card survey-results-card"><div class="card-heading"><div><h2>ผลประเมินความพึงพอใจ</h2><p>แบบประเมินที่ส่งหลังตรวจรับคืนครั้งแรก</p></div><span class="survey-result-count">${ico('star',16)} ${surveys.length} ชุด</span></div>${surveys.length?`<div class="survey-result-summary"><strong>${(surveys.reduce((s,v)=>s+(Number(v.overall)||0),0)/surveys.length).toFixed(1)}<small> / 5</small></strong><span>คะแนนความพึงพอใจโดยรวมเฉลี่ย</span></div><div class="inventory-table-wrap"><table class="data-table"><thead><tr><th>นักศึกษา</th><th>วันที่ตอบ</th><th>คะแนนรวม</th><th>ข้อเสนอแนะ</th></tr></thead><tbody>${surveys.slice(0,8).map(v=>`<tr><td><div class="table-person"><b>${esc(v.name)}</b><small>${esc(v.uid)}</small></div></td><td>${esc(v.at)}</td><td><b>${Number(v.overall)||0} / 5</b></td><td>${esc(v.comment||'—')}</td></tr>`).join('')}</tbody></table></div>`:emptyState('ยังไม่มีแบบประเมิน','แบบประเมินจะแสดงที่นี่หลังนักศึกษาคืนอุปกรณ์ครั้งแรก')}</section>`);},
  'admin-profile'(){shell('โปรไฟล์ผู้ดูแลระบบ',profile(false));},
  'admin-roles'(){shell('กำหนดสิทธิ์ผู้ใช้งาน',`<div class="page-intro"><div><h2>สิทธิ์และบทบาท</h2><p>กำหนดสิทธิ์การเข้าถึงตามประเภทผู้ใช้งาน</p></div><a class="btn btn-primary" href="admin-users.html">${ico('plus',16)} เพิ่มผู้ใช้</a></div><section class="card"><div class="card-heading"><div><h2>รายชื่อบัญชี</h2><p>เปลี่ยนบทบาทหรือแก้ไขข้อมูลบัญชี</p></div><span class="muted">${users.length} บัญชี</span></div><div class="inventory-table-wrap"><table class="data-table"><thead><tr><th>บัญชีผู้ใช้</th><th>ชื่อ–สกุล</th><th>คณะ / สาขา</th><th>บทบาท</th><th>จัดการ</th></tr></thead><tbody>${users.map((u,i)=>`<tr><td><b>${esc(u.u)}</b></td><td>${esc(u.name)}</td><td>${esc([u.fac,u.maj].filter(Boolean).join(' · ')||'—')}</td><td><select class="role-select" onchange="changeRole('${esc(u.u)}',this.value)" ${u.u===me.u?'disabled':''}>${['student','staff','admin'].map(r=>`<option value="${r}" ${r===u.r?'selected':''}>${{student:'นักศึกษา',staff:'เจ้าหน้าที่',admin:'ผู้ดูแลระบบ'}[r]}</option>`).join('')}</select></td><td><button class="btn btn-outline btn-sm" onclick="editUser('${esc(u.u)}')">${ico('edit',14)} แก้ไข</button></td></tr>`).join('')}</tbody></table></div></section>`);},
  'admin-users'(){shell('จัดการบัญชีผู้ใช้',`<div class="page-intro"><div><h2>เพิ่มผู้ใช้งานและเจ้าหน้าที่</h2><p>กรอกข้อมูลนักศึกษาสำหรับใช้แสดงในโปรไฟล์และหน้าตรวจรับคืน</p></div><span class="soft-pill">${ico('users',15)} USER MANAGEMENT</span></div><div class="two-col-layout admin-user-layout"><section class="card"><div class="card-heading"><div><h2>ข้อมูลบัญชีใหม่</h2><p>ข้อมูลพื้นฐานสำหรับเข้าระบบ</p></div><span class="stat-icon">${ico('user',18)}</span></div><form onsubmit="event.preventDefault();addUser()"><div class="form-grid"><div><label>ประเภทผู้ใช้งาน</label><select id="newRole" onchange="toggleStudentFields()"><option value="student">นักศึกษา</option><option value="staff">เจ้าหน้าที่</option></select></div><div><label>รหัสผ่านเริ่มต้น</label><input id="newPassword" type="text" value="1234" required></div></div><div class="form-grid"><div><label>ชื่อ–สกุล <span class="req">*</span></label><input id="newName" placeholder="ชื่อและนามสกุล" required></div><div><label>รหัสนักศึกษา / Username <span class="req">*</span></label><input id="newUser" placeholder="เช่น 6601002" required></div></div><div id="studentFields"><div class="form-grid"><div><label>คณะ</label><input id="newFaculty" placeholder="เช่น วิศวกรรมศาสตร์"></div><div><label>สาขา</label><input id="newMajor" placeholder="เช่น โลจิสติกส์"></div></div><div class="form-grid"><div><label>ชั้นปี</label><select id="newYear"><option value="1">ชั้นปีที่ 1</option><option value="2">ชั้นปีที่ 2</option><option value="3">ชั้นปีที่ 3</option><option value="4" selected>ชั้นปีที่ 4</option><option value="5">ชั้นปีที่ 5</option></select></div><div><label>เบอร์โทรศัพท์</label><input id="newPhone" type="tel" placeholder="08X-XXX-XXXX"></div></div><div><label>อีเมล</label><input id="newEmail" type="email" placeholder="student@university.ac.th"></div></div><div id="staffFields" class="hidden"><div class="form-grid"><div><label>เบอร์โทรศัพท์</label><input id="newStaffPhone" type="tel" placeholder="08X-XXX-XXXX"></div><div><label>อีเมล</label><input id="newStaffEmail" type="email" placeholder="staff@university.ac.th"></div></div></div><button class="btn btn-primary full-btn" type="submit">${ico('plus',16)} สร้างบัญชีผู้ใช้</button><p class="form-footnote">ข้อมูลนี้จัดเก็บในเบราว์เซอร์เครื่องที่กำลังสาธิตเท่านั้น</p></form></section><section class="card"><div class="card-heading"><div><h2>สิทธิ์แต่ละบทบาท</h2><p>ขอบเขตการใช้งานในเดโม่</p></div></div><div class="permission-card"><span class="role-avatar student">${ico('user',19)}</span><div><b>นักศึกษา</b><p>ดูผังห้อง สแกนเลือกอุปกรณ์ ยืม–คืน และดูประวัติส่วนตัว</p></div></div><div class="permission-card"><span class="role-avatar staff">${ico('box',19)}</span><div><b>เจ้าหน้าที่</b><p>ตรวจรับคืน ดูสถานะคลัง เพิ่มและแก้ไขข้อมูลอุปกรณ์</p></div></div><div class="permission-card"><span class="role-avatar admin">${ico('shield',19)}</span><div><b>ผู้ดูแลระบบ</b><p>จัดการบัญชีและกำหนดบทบาทการเข้าถึง</p></div></div></section></div><section class="card"><div class="card-heading"><div><h2>บัญชีในระบบ</h2><p>ค้นหา แก้ไขข้อมูลนักศึกษา และกำหนดบทบาท</p></div><div class="search-small">${ico('search',16)}<input id="userSearch" placeholder="ค้นหาชื่อหรือรหัส" oninput="filterUsers()"></div></div><div class="inventory-table-wrap"><table class="data-table" id="usersTable"><thead><tr><th>ชื่อ–สกุล / รหัส</th><th>คณะ / สาขา / ชั้นปี</th><th>โทรศัพท์ / อีเมล</th><th>บทบาท</th><th>จัดการ</th></tr></thead><tbody>${users.map(userRow).join('')}</tbody></table></div></section>`);toggleStudentFields();}
};
function fillLogin(u){$('#u').value=u;$('#p').value='1234';}
function login(){const u=$('#u')?.value.trim(),p=$('#p')?.value;const found=users.find(x=>x.u===u&&x.p===p);if(!found){alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');return;}me=found;S('me',me);location.href=(MENU[found.r]?.[0]?.[0]||'student-home')+'.html';}
function logout(){stopScanner();localStorage.removeItem('me');location.href='index.html';}

// ----- Student cart and borrow workflow -----
function drawCart(){
  const el=$('#cart');if(!el)return;
  const total=cart.reduce((s,c)=>s+c.qty,0);
  $('#cartCount')&&($('#cartCount').textContent=`${total} ชิ้น`);$('#cartTotal')&&($('#cartTotal').textContent=`${total} ชิ้น`);
  el.innerHTML=cart.map((c,i)=>{const item=I(c.id);if(!item)return'';return `<div class="cart-line">${equipmentPhoto(item,'cart')}<div class="cart-line-info"><b>${esc(item.n)}</b><small>${esc(item.id)} · ${esc(locationLabel(item.z))}</small><div class="cart-line-qty"><button class="qty-btn" onclick="qt(${i},-1)" aria-label="ลดจำนวน">${ico('minus',13)}</button><b>${c.qty}</b><button class="qty-btn" onclick="qt(${i},1)" aria-label="เพิ่มจำนวน">${ico('plus',13)}</button><span>คงเหลือ ${item.a}</span></div></div><button class="icon-button danger-button" onclick="removeCart(${i})" title="นำออก">${ico('trash',15)}</button></div>`;}).join('')||emptyState('ยังไม่มีอุปกรณ์','สแกน QR หรือเลือกอุปกรณ์จากรายการจำลอง');
}
function add(id){const item=I(id);if(!item)return;if(item.a<=0)return alert('อุปกรณ์นี้หมดหรือไม่พร้อมให้ยืม');const c=cart.find(x=>x.id===id);if(c){if(c.qty>=item.a)return alert('จำนวนเกินยอดคงเหลือ');c.qty++;}else cart.push({id,qty:1});sv();drawCart();}
function qt(i,d){const c=cart[i],item=c&&I(c.id);if(!c||!item)return;c.qty+=d;if(c.qty<1)cart.splice(i,1);if(c.qty>item.a){c.qty=item.a;alert('จำนวนไม่สามารถเกินยอดคงเหลือ');}sv();drawCart();}
function removeCart(i){cart.splice(i,1);sv();drawCart();}
function clearCart(){if(!cart.length)return;cart=[];sv();drawCart();}
function handleStudentCode(code){
  const value=String(code||'').trim();
  if(value.startsWith('LOCATION:')){const id=value.split(':')[1];openLocationPick(id);return;}
  const id=value.replace(/^ITEM:/,'');
  if(I(id)){add(id);$('#studentCameraStatus')&&($('#studentCameraStatus').textContent=`เพิ่ม ${I(id).n} ลงในรายการแล้ว`);return;}
  alert('ไม่พบรหัสอุปกรณ์หรือตำแหน่งนี้ในระบบเดโม่');
}
function openLocationPick(id){
  const z=LOC(id);if(!z)return alert('ไม่พบตำแหน่ง');
  const at=items.filter(i=>i.z===id);
  const box=modal(`<div class="modal-heading"><div><span class="eyebrow">LOCATION ${esc(id)}</span><h2>${esc(z.name)}</h2><p>เลือกอุปกรณ์ที่จัดเก็บในตำแหน่งนี้</p></div><button class="icon-button" onclick="closeModal()">${ico('close')}</button></div><div class="location-pick-list">${at.map(i=>`<div class="location-pick-row">${equipmentPhoto(i,'mini')}<span><button type="button" class="equipment-name-trigger pick-item-name" onclick="showEquipmentDetail('${esc(i.id)}')">${esc(i.n)}</button><small>${esc(i.id)} · คงเหลือ ${i.a}</small></span><button class="btn btn-primary btn-sm" onclick="add('${esc(i.id)}')" ${i.a<=0?'disabled':''}>${ico('plus',14)} เพิ่ม</button></div>`).join('')||emptyState('ไม่มีอุปกรณ์','เพิ่มอุปกรณ์จากเมนูเจ้าหน้าที่ก่อน')}</div>`);
}
function borrow(){
  if(!cart.length)return alert('กรุณาเลือกหรือสแกนอุปกรณ์ก่อน');
  const today=localISODate();
  modal(`<div class="modal-heading"><div><span class="eyebrow">BORROW REQUEST</span><h2>ยืนยันการยืมอุปกรณ์</h2><p>ตรวจสอบประเภทการยืมและกำหนดเวลาคืน</p></div><button class="icon-button" onclick="closeModal()">${ico('close')}</button></div><label>ลักษณะการยืม</label><select id="borrowMode" onchange="updateBorrowMode()"><option value="in">ยืมในเวลาเรียน · คืนภายใน 21:00 น. วันนี้</option><option value="out">ยืมนอกเวลาเรียน · กำหนดคืนไม่เกิน 19:00 น.</option></select><label>วันที่คืน</label><input id="borrowDate" type="date" value="${today}" min="${today}" onchange="updateBorrowMode()"><label>เวลาคืน</label><input id="borrowTime" type="time" value="16:00"><p class="form-footnote" id="borrowHint">ยืมในเวลาเรียนต้องคืนภายในวันนี้ไม่เกิน 21:00 น.</p><div class="modal-actions"><button class="btn btn-outline" onclick="closeModal()">ยกเลิก</button><button class="btn btn-primary" onclick="confirmBorrow()">${ico('check',16)} ยืนยันการยืม</button></div>`);
  updateBorrowMode();
}
function updateBorrowMode(){const outside=$('#borrowMode')?.value==='out';const date=$('#borrowDate'),time=$('#borrowTime'),hint=$('#borrowHint');if(!date||!time)return;const today=localISODate();date.disabled=!outside;if(!outside)date.value=today;time.max=outside?'19:00':'21:00';hint.textContent=outside?'ยืมนอกเวลาเรียนต้องคืนภายในวันที่เลือก และไม่เกิน 19:00 น.':'ยืมในเวลาเรียนต้องคืนภายในวันนี้ ไม่เกิน 21:00 น.';}
function confirmBorrow(){
  if(!cart.length)return alert('ไม่มีรายการอุปกรณ์');const out=$('#borrowMode').value==='out',date=$('#borrowDate').value,time=$('#borrowTime').value,today=localISODate();
  if(!date||!time)return alert('กรุณาระบุวันและเวลาคืน');if(!out&&date!==today)return alert('การยืมในเวลาเรียนต้องคืนภายในวันนี้');if(time>(out?'19:00':'21:00'))return alert(`เวลาคืนเกินกำหนด ${out?'19:00':'21:00'} น.`);if(out&&date<today)return alert('วันที่คืนต้องไม่ย้อนหลัง');
  for(const c of cart){const item=I(c.id);if(!item||c.qty>item.a)return alert(`ยอดคงเหลือของ ${item?.n||c.id} ไม่เพียงพอ`);}
  const nextNo='B'+String(Math.max(0,...hist.map(h=>Number(String(h.no).replace(/\D/g,''))||0))+1).padStart(3,'0');
  hist.unshift({no:nextNo,uid:me.u,name:me.name,at:new Date().toLocaleString('th-TH'),mode:out?'นอกเวลาเรียน':'ในเวลาเรียน',due:`${date} ${time}`,list:cart.map(c=>({...c})),ret:false});
  cart.forEach(c=>I(c.id).a=Math.max(0,I(c.id).a-c.qty));cart=[];sv();closeModal();alert('ยืนยันการยืมสำเร็จ');location.href='student-return.html';
}
function hline(h){return `<article class="history-card"><div class="history-head"><div class="history-id">${ico('file',16)} <b>${esc(h.no)}</b></div>${h.ret?badge('คืนแล้ว','success'):badge('รอคืน','warning')}</div><div class="history-meta"><span>${ico('clock',14)} ${esc(h.at)}</span><span>${ico('box',14)} ${esc(h.mode)}</span><span>${ico('return',14)} คืน ${esc(h.due)}</span></div><div class="history-items">${(h.list||[]).map(l=>`<span>${esc(I(l.id)?.n||l.id)} <b>×${l.qty}</b></span>`).join('')}</div>${h.returnedAt?`<div class="return-stamp">${ico('check',14)} รับคืนแล้ว ${esc(h.returnedAt)}</div>`:''}</article>`;}
function fh(filter,btn){if(btn){$$('.filter-row .segmented button').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');}const el=$('#hl');if(!el)return;let list=hist.filter(h=>h.uid===me.u);const now=new Date();if(filter===1)list=list.filter(h=>new Date(h.at).toDateString()===now.toDateString()||String(h.at).includes(now.toLocaleDateString('th-TH')));if(filter===2)list=list.slice(0,7);if(filter===3)list=list.filter(h=>String(h.at).includes(String(now.getFullYear()+543))||String(h.at).includes(now.toLocaleDateString('th-TH').split('/')[1]));el.innerHTML=list.map(hline).join('')||emptyState('ไม่พบประวัติ','ไม่มีรายการในช่วงเวลาที่เลือก');}
function filterInventory(){renderInventoryList();}

// ----- Camera / QR scan: native BarcodeDetector first, ZXing fallback -----
async function startScanner(target){
  stopScanner();
  const video=$(target==='staff'?'#staffVideo':'#studentVideo'),status=$(target==='staff'?'#staffCameraStatus':'#studentCameraStatus'),placeholder=$(target==='staff'?'#staffCameraPlaceholder':'#studentCameraPlaceholder');
  if(!video){if(status)status.textContent='ไม่พบวิดีโอในหน้านี้';return;}
  if(!navigator.mediaDevices?.getUserMedia){if(status)status.textContent='เบราว์เซอร์นี้ไม่รองรับกล้อง กรุณาใช้รายการจำลองสแกน';return;}
  let hasNative=('BarcodeDetector' in window);
  if(!hasNative&&!window.ZXing){await loadOptionalLibrary('ZXing','https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js',false);}
  hasNative=('BarcodeDetector' in window);
  if(!hasNative&&window.ZXing?.BrowserQRCodeReader){
    try{
      scanning=true;if(placeholder)placeholder.classList.add('hidden');if(status)status.textContent='กำลังเปิดกล้องและค้นหา QR Code…';
      const reader=new ZXing.BrowserQRCodeReader();
      scanControls=await reader.decodeFromVideoDevice(undefined,video,(result,err,controls)=>{
        if(result&&scanning){const value=result.getText();stopScanner();target==='staff'?handleStaffCode(value):handleStudentCode(value);}
      });
      return;
    }catch(err){scanning=false;if(status)status.textContent='เปิดกล้องหรือเริ่มอ่าน QR ไม่สำเร็จ กรุณาตรวจสิทธิ์กล้องหรือใช้ปุ่มจำลอง';if(placeholder)placeholder.classList.remove('hidden');return;}
  }
  try{
    cameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});
    video.srcObject=cameraStream;await video.play();scanning=true;if(placeholder)placeholder.classList.add('hidden');if(status)status.textContent='เปิดกล้องแล้ว กำลังค้นหา QR Code…';
    if(hasNative){
      const detector=new BarcodeDetector({formats:['qr_code']});
      const tick=async()=>{if(!scanning||!video.isConnected)return;try{if(video.readyState>=2){const codes=await detector.detect(video);if(codes.length){const value=codes[0].rawValue;stopScanner();target==='staff'?handleStaffCode(value):handleStudentCode(value);return;}}}catch(e){}scanTimer=requestAnimationFrame(tick);};tick();
    } else if(status)status.textContent='กล้องเปิดแล้ว แต่ระบบนี้อ่าน QR อัตโนมัติไม่ได้ กรุณาใช้ปุ่มจำลองสแกน';
  }catch(err){if(status)status.textContent=`เปิดกล้องไม่สำเร็จ (${err.name==='NotAllowedError'?'ยังไม่ได้อนุญาตสิทธิ์กล้อง':'อุปกรณ์กล้องไม่พร้อมใช้งาน'}) กรุณาใช้ปุ่มจำลองสแกน`;if(placeholder)placeholder.classList.remove('hidden');}
}
function stopScanner(){scanning=false;if(scanTimer)cancelAnimationFrame(scanTimer);scanTimer=null;try{scanControls?.stop?.();}catch(e){}scanControls=null;if(cameraStream){cameraStream.getTracks().forEach(t=>t.stop());cameraStream=null;}const v1=$('#staffVideo'),v2=$('#studentVideo');[v1,v2].forEach(v=>{if(v){v.srcObject=null;}});[$('#staffCameraPlaceholder'),$('#studentCameraPlaceholder')].forEach(p=>p?.classList.remove('hidden'));}
function handleStaffCode(code){let raw=String(code||'').trim();if(raw.startsWith('RET:'))raw=raw.slice(4);if(raw.startsWith('STUDENT:'))raw=raw.slice(8);const u=users.find(x=>x.u===raw&&x.r==='student');if(u){showStudentLoans(u.u);const s=$('#staffCameraStatus');if(s)s.textContent=`อ่าน QR สำเร็จ: ${u.u}`;return;}alert('QR นี้ไม่มีรหัสนักศึกษาที่อยู่ในระบบเดโม่');}
function showStudentLoans(uid){
  const u=users.find(x=>x.u===uid&&x.r==='student');const target=$('#returnStudentPanel');if(!u||!target)return;
  const open=hist.filter(h=>h.uid===uid&&!h.ret);
  target.innerHTML=`<div class="student-identity"><div class="student-avatar">${ico('user',24)}</div><div><h3>${esc(u.name)}</h3><p>${esc(u.u)} · ${esc(u.maj||'นักศึกษา')}</p><small>${esc(u.fac||'')} ${u.yr?`· ชั้นปีที่ ${u.yr}`:''}</small></div></div><div class="student-contact-grid"><div><small>เบอร์โทรศัพท์</small><b>${esc(u.tel||'—')}</b></div><div><small>อีเมล</small><b>${esc(u.mail||'—')}</b></div></div><div class="loan-list-title"><b>รายการยืมที่ยังไม่คืน</b>${badge(`${open.length} รายการ`,open.length?'warning':'success')}</div>${open.map(h=>`<div class="loan-return-item"><div class="loan-return-top"><b>${esc(h.no)}</b><small>${esc(h.at)}</small></div><div class="loan-return-products">${h.list.map(l=>`<span>${esc(I(l.id)?.n||l.id)} <b>×${l.qty}</b></span>`).join('')}</div><div class="loan-due">กำหนดคืน ${esc(h.due)}</div><button class="btn btn-primary full-btn" onclick="ret('${esc(h.no)}')">${ico('check',16)} ยืนยันรับคืนรายการนี้</button></div>`).join('')||emptyState('ไม่มีรายการค้างคืน','นักศึกษาคืนอุปกรณ์ครบแล้ว')}`;
}
function ret(no){
  const h=hist.find(x=>x.no===no);if(!h||h.ret)return;
  const firstReturnForStudent=!hist.some(x=>x.uid===h.uid&&x.ret);
  h.ret=true;h.returnedAt=new Date().toLocaleString('th-TH');
  h.list.forEach(line=>{const item=I(line.id);if(item&&item.t==='R')item.a=Math.min(item.q,item.a+line.qty);});
  sv();showStudentLoans(h.uid);
  const s=$('#staffCameraStatus');if(s)s.textContent=`บันทึกการรับคืน ${h.no} สำเร็จ`;
  if(firstReturnForStudent&&!surveys.some(v=>v.uid===h.uid))showSatisfactionSurvey(h.uid);
}
function showSatisfactionSurvey(uid, simulated=false){
  const u=users.find(x=>x.u===uid&&x.r==='student');
  if(!u||(!simulated&&surveys.some(v=>v.uid===uid)))return;
  const questions=[
    ['qEase','ความง่ายในการใช้งานระบบ'],
    ['qFind','ความสะดวกในการค้นหาตำแหน่งอุปกรณ์'],
    ['qBorrow','ความชัดเจนของขั้นตอนการยืม'],
    ['qReturn','ความสะดวกของขั้นตอนการคืน'],
    ['qOverall','ความพึงพอใจโดยรวม']
  ];
  const ratingRows=questions.map(([name,label])=>`<fieldset class="survey-question"><legend>${label}<span>*</span></legend><div class="survey-rating">${[1,2,3,4,5].map(n=>`<label class="survey-rating-option"><input type="radio" name="${name}" value="${n}" required><span>${n}</span></label>`).join('')}</div><div class="survey-scale"><span>น้อยที่สุด</span><span>มากที่สุด</span></div></fieldset>`).join('');
  const intro=simulated
    ? `โหมดจำลองสำหรับ ${esc(u.name)} (${esc(u.u)}) สามารถทดลองส่งคะแนนได้ทันที${surveys.some(v=>v.uid===uid)?' หากส่งอีกครั้งจะอัปเดตผลประเมินเดิม':' และผลจะบันทึกในเดโม่'}`
    : `สำหรับนักศึกษา ${esc(u.name)} (${esc(u.u)}) หลังการคืนอุปกรณ์ครั้งแรก`;
  modal(`<div class="survey-header"><div class="survey-icon">${ico('star',25)}</div><span class="eyebrow">TOOLROOM · USER FEEDBACK</span><h2>แบบประเมินความพึงพอใจ</h2><p>${intro}</p><div class="survey-progress-label">ใช้เวลาประมาณ 1 นาที · ข้อมูลจะถูกเก็บในเดโม่นี้</div></div><form class="survey-form" onsubmit="event.preventDefault();submitSatisfactionSurvey('${esc(uid)}',${simulated?'true':'false'})">${ratingRows}<label class="survey-comment-label" for="surveyComment">ข้อเสนอแนะเพิ่มเติม (ไม่บังคับ)</label><textarea id="surveyComment" rows="3" placeholder="อยากให้ปรับปรุงส่วนใดเพิ่มเติมไหม?"></textarea><div class="modal-actions survey-actions"><button type="button" class="btn btn-outline" onclick="closeModal()">${simulated?'ปิดหน้าต่าง':'ทำภายหลัง'}</button><button type="submit" class="btn btn-primary">ส่งแบบประเมิน ${ico('check',15)}</button></div></form>`, 'wide');
}
function submitSatisfactionSurvey(uid, simulated=false){
  const existingIndex=surveys.findIndex(v=>v.uid===uid);
  if(existingIndex>=0&&!simulated){closeModal();return;}
  const names=['qEase','qFind','qBorrow','qReturn','qOverall'];
  const values=names.map(name=>Number($(`input[name="${name}"]:checked`)?.value||0));
  if(values.some(v=>v<1||v>5))return alert('กรุณาให้คะแนนครบทุกข้อก่อนส่ง');
  const u=users.find(x=>x.u===uid);
  const response={uid,name:u?.name||uid,at:new Date().toLocaleString('th-TH'),ratings:values,overall:values[4],comment:$('#surveyComment')?.value.trim()||''};
  if(existingIndex>=0)surveys[existingIndex]=response;else surveys.unshift(response);
  sv();closeModal();alert(simulated?'บันทึกผลประเมินจากการจำลองแล้ว':'ขอบคุณสำหรับการประเมินความพึงพอใจ');
}

let currentHistoryType='b';
function sd(type='b',btn){currentHistoryType=type;if(btn){$$('.filter-row .segmented button').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');}const table=$('#sd');if(!table)return;const q=($('#historySearch')?.value||'').toLowerCase();let list=hist.filter(h=>(h.name+' '+h.uid+' '+h.no).toLowerCase().includes(q));if(type==='r')list=list.filter(h=>h.ret);table.innerHTML=`<thead><tr><th>เลขที่</th><th>นักศึกษา</th><th>วันและเวลา</th><th>กำหนดคืน</th><th>สถานะ</th><th></th></tr></thead><tbody>${list.map(h=>`<tr><td><b>${esc(h.no)}</b></td><td><div class="table-person"><b>${esc(h.name)}</b><small>${esc(h.uid)}</small></div></td><td>${esc(h.at)}</td><td>${esc(h.due)}</td><td>${h.ret?badge('คืนแล้ว','success'):badge('รอคืน','warning')}</td><td><button class="btn btn-outline btn-sm" onclick="showHistoryDetail('${esc(h.no)}')">${ico('file',14)} รายละเอียด</button></td></tr>`).join('')||`<tr><td colspan="6">${emptyState('ไม่พบรายการ','ลองเปลี่ยนตัวกรองหรือคำค้นหา')}</td></tr>`}</tbody>`;}
function showHistoryDetail(no){const h=hist.find(x=>x.no===no);if(!h)return;modal(`<div class="modal-heading"><div><span class="eyebrow">TRANSACTION DETAIL</span><h2>${esc(h.no)}</h2></div><button class="icon-button" onclick="closeModal()">${ico('close')}</button></div><div class="detail-list"><div><span>นักศึกษา</span><b>${esc(h.name)} (${esc(h.uid)})</b></div><div><span>วันเวลายืม</span><b>${esc(h.at)}</b></div><div><span>ประเภท</span><b>${esc(h.mode)}</b></div><div><span>กำหนดคืน</span><b>${esc(h.due)}</b></div><div><span>สถานะ</span><b>${h.ret?'คืนแล้ว':'รอคืน'}</b></div></div><h3 class="detail-section-title">รายการอุปกรณ์</h3>${h.list.map(l=>`<div class="location-pick-row">${equipmentPhoto(I(l.id)||{n:l.id},'mini')}<span><b>${esc(I(l.id)?.n||l.id)}</b><small>${esc(l.id)}</small></span><b>× ${l.qty}</b></div>`).join('')}`);}

// ----- Staff inventory & storage locations -----
function itemRow(i){return `<tr data-type="${i.t}" data-search="${esc((i.n+' '+i.id+' '+i.z+' '+loc(i)).toLowerCase())}"><td><div class="item-cell">${equipmentPhoto(i,'table')}<div class="table-item-copy"><button type="button" class="equipment-name-trigger" onclick="showEquipmentDetail('${esc(i.id)}')">${esc(i.n)}</button><small>${esc(i.id)}</small></div></div></td><td>${typeBadge(i.t)}</td><td>${esc(loc(i))}</td><td><b>${i.a}</b><span class="muted"> / ${i.q}</span></td><td><div class="table-actions"><button class="btn btn-outline btn-sm" onclick="showEquipmentDetail('${esc(i.id)}')">${ico('file',14)} รายละเอียด</button><button class="btn btn-outline btn-sm" onclick="editItem('${esc(i.id)}')">${ico('edit',14)} แก้ไข</button><button class="btn btn-outline btn-sm" onclick="showItemQR('${esc(i.id)}')">${ico('qr',14)} QR</button></div></td></tr>`;}
function addItem(){const name=$('#itemName')?.value.trim(),q=Number($('#itemQty')?.value),z=$('#itemLoc')?.value,l=Number($('#itemShelf')?.value)||1,t=$('#itemType')?.value||'R';if(!name||!q||q<1)return alert('กรุณากรอกชื่อและจำนวนให้ถูกต้อง');if(!LOC(z))return alert('เลือกตำแหน่งจัดเก็บ');const id='EQ'+String(Math.max(0,...items.map(i=>Number(String(i.id).replace(/\D/g,''))||0))+1).padStart(3,'0');items.push({id,n:name,q,a:q,z,l,t,bad:0});sv();R[page]();modal(`<div class="modal-heading"><div><span class="eyebrow">ITEM CREATED</span><h2>เพิ่มอุปกรณ์สำเร็จ</h2><p>${esc(name)} · ${id}</p></div><button class="icon-button" onclick="closeModal()">${ico('close')}</button></div><div class="qr-panel">${qr(id)}<b>${esc(name)}</b><span>รหัสอุปกรณ์ ${id}</span><p>พิมพ์ QR นี้เพื่อติดที่อุปกรณ์หรือกล่องจัดเก็บ</p></div>`);}
function editItem(id){const i=I(id);if(!i)return;modal(`<div class="modal-heading"><div><span class="eyebrow">EDIT INVENTORY</span><h2>แก้ไขอุปกรณ์</h2></div><button class="icon-button" onclick="closeModal()">${ico('close')}</button></div><form onsubmit="event.preventDefault();saveItemEdit('${esc(id)}')"><label>ชื่ออุปกรณ์</label><input id="editItemName" value="${esc(i.n)}" required><div class="form-grid"><div><label>จำนวนทั้งหมด</label><input id="editItemTotal" type="number" min="1" value="${i.q}" required></div><div><label>คงเหลือ</label><input id="editItemAvailable" type="number" min="0" value="${i.a}" required></div></div><div class="form-grid"><div><label>ตำแหน่ง</label><select id="editItemLoc">${locations.map(z=>`<option value="${esc(z.id)}" ${z.id===i.z?'selected':''}>${esc(z.id+' · '+z.name)}</option>`).join('')}</select></div><div><label>ชั้นที่</label><input id="editItemShelf" type="number" min="1" value="${i.l}"></div></div><label>ประเภท</label><select id="editItemType"><option value="R" ${i.t==='R'?'selected':''}>อุปกรณ์ยืม–คืน</option><option value="C" ${i.t==='C'?'selected':''}>วัสดุสิ้นเปลือง</option></select><label>จำนวนชำรุด</label><input id="editItemBad" type="number" min="0" value="${i.bad||0}"><div class="modal-actions"><button type="button" class="btn btn-outline" onclick="closeModal()">ยกเลิก</button><button class="btn btn-primary" type="submit">บันทึก</button></div></form>`);}
function saveItemEdit(id){const i=I(id);if(!i)return;const q=Number($('#editItemTotal').value),a=Number($('#editItemAvailable').value);if(q<1||a<0||a>q)return alert('ตรวจสอบจำนวนทั้งหมดและคงเหลือ');i.n=$('#editItemName').value.trim();i.q=q;i.a=a;i.z=$('#editItemLoc').value;i.l=Math.max(1,Number($('#editItemShelf').value)||1);i.t=$('#editItemType').value;i.bad=Math.max(0,Number($('#editItemBad').value)||0);sv();closeModal();R[page]();}
function showItemQR(id){const i=I(id);if(!i)return;modal(`<div class="modal-heading"><div><span class="eyebrow">ITEM QR CODE</span><h2>${esc(i.n)}</h2></div><button class="icon-button" onclick="closeModal()">${ico('close')}</button></div><div class="qr-panel">${qr(i.id)}<b>${esc(i.id)}</b><span>${esc(loc(i))}</span><p>รหัส QR นี้ใช้เพิ่มอุปกรณ์ลงในรายการยืมของนักศึกษา</p></div>`);}
function addLocation(){
  const name=$('#locName')?.value.trim(),type=$('#locType')?.value,x=Number($('#locX')?.value),y=Number($('#locY')?.value),w=Number($('#locW')?.value),d=Number($('#locD')?.value),height=Number($('#locH')?.value),shelves=Number($('#locShelves')?.value);
  if(!name||![x,y,w,d,height,shelves].every(Number.isFinite))return alert('กรุณากรอกข้อมูลตำแหน่งให้ครบ');if(x+w>100||y+d>100)return alert('ตำแหน่งและขนาดต้องอยู่ภายในขอบเขตห้อง');
  const ids=locations.map(z=>z.id),next=Array.from({length:26},(_,i)=>String.fromCharCode(65+i)).find(id=>!ids.includes(id))||('L'+(locations.length+1));
  locations.push({id:next,name,type,x,y,w,d,height,shelves,doors:type==='cabinet'?2:0});sv();selectedLocation=next;R[page]();
}
function editLocation(id){const z=LOC(id);if(!z)return;modal(`<div class="modal-heading"><div><span class="eyebrow">STORAGE LOCATION · ${esc(id)}</span><h2>แก้ไขตำแหน่ง</h2></div><button class="icon-button" onclick="closeModal()">${ico('close')}</button></div><form onsubmit="event.preventDefault();saveLocationEdit('${esc(id)}')"><label>ชื่อจุดจัดเก็บ</label><input id="editLocName" value="${esc(z.name)}" required><div class="form-grid three"><div><label>X (%)</label><input id="editLocX" type="number" min="0" max="95" value="${z.x}" required></div><div><label>Y (%)</label><input id="editLocY" type="number" min="0" max="95" value="${z.y}" required></div><div><label>กว้าง (%)</label><input id="editLocW" type="number" min="4" max="40" value="${z.w}" required></div></div><div class="form-grid three"><div><label>ลึก (%)</label><input id="editLocD" type="number" min="4" max="40" value="${z.d}" required></div><div><label>สูง (ม.)</label><input id="editLocH" type="number" min=".3" max="3" step=".1" value="${z.height}" required></div><div><label>จำนวนชั้น</label><input id="editLocShelves" type="number" min="1" max="8" value="${z.shelves}" required></div></div><div class="modal-actions"><button type="button" class="btn btn-outline" onclick="closeModal()">ยกเลิก</button><button class="btn btn-primary" type="submit">บันทึกตำแหน่ง</button></div></form>`);}
function saveLocationEdit(id){const z=LOC(id);if(!z)return;const x=Number($('#editLocX').value),y=Number($('#editLocY').value),w=Number($('#editLocW').value),d=Number($('#editLocD').value);if(x+w>100||y+d>100)return alert('ตำแหน่งและขนาดต้องอยู่ภายในห้อง');z.name=$('#editLocName').value.trim();z.x=x;z.y=y;z.w=w;z.d=d;z.height=Number($('#editLocH').value);z.shelves=Number($('#editLocShelves').value);sv();closeModal();R[page]();}
function deleteLocation(id){if(items.some(i=>i.z===id))return alert('ไม่สามารถลบตำแหน่งนี้ได้ เพราะยังมีอุปกรณ์จัดเก็บอยู่');if(!confirm(`ลบตำแหน่ง ${id} ใช่หรือไม่?`))return;locations=locations.filter(z=>z.id!==id);if(selectedLocation===id)selectedLocation=null;sv();R[page]();}
function filterStaffItems(){const q=($('#staffItemSearch')?.value||'').toLowerCase();$$('#staffItemsTable tbody tr').forEach(tr=>{const matchesText=(tr.dataset.search||'').includes(q)||tr.textContent.toLowerCase().includes(q);const matchesType=activeStaffType==='all'||tr.dataset.type===activeStaffType;tr.style.display=matchesText&&matchesType?'':'none';});}
function filterStaffItemsType(type,btn){activeStaffType=type;$$('.staff-category-tabs .category-filter').forEach(b=>b.classList.remove('selected'));btn?.classList.add('selected');filterStaffItems();}
function filterUsers(){const q=($('#userSearch')?.value||'').toLowerCase();$$('#usersTable tbody tr').forEach(tr=>tr.style.display=tr.dataset.search?.includes(q)||tr.textContent.toLowerCase().includes(q)?'':'none');}
function userRow(u){return `<tr data-search="${esc([u.u,u.name,u.fac,u.maj,u.tel,u.mail].join(' ').toLowerCase())}"><td><div class="table-person"><b>${esc(u.name)}</b><small>${esc(u.u)}</small></div></td><td>${esc([u.fac,u.maj,u.yr?`ชั้นปี ${u.yr}`:''].filter(Boolean).join(' · ')||'—')}</td><td><div class="table-person"><span>${esc(u.tel||'—')}</span><small>${esc(u.mail||'—')}</small></div></td><td>${badge({student:'นักศึกษา',staff:'เจ้าหน้าที่',admin:'แอดมิน'}[u.r]||u.r,u.r==='admin'?'info':u.r==='staff'?'neutral':'success')}</td><td><div class="table-actions"><button class="btn btn-outline btn-sm" onclick="editUser('${esc(u.u)}')">${ico('edit',14)} แก้ไข</button>${u.u!==me.u?`<button class="icon-button danger-button" title="ลบบัญชี" onclick="deleteUser('${esc(u.u)}')">${ico('trash',15)}</button>`:''}</div></td></tr>`;}
function toggleStudentFields(){const student=$('#newRole')?.value==='student';$('#studentFields')?.classList.toggle('hidden',!student);$('#staffFields')?.classList.toggle('hidden',student);}
function addUser(){
  const r=$('#newRole').value,u=$('#newUser').value.trim(),name=$('#newName').value.trim(),p=$('#newPassword').value;
  if(!u||!name||!p)return alert('กรุณากรอกชื่อผู้ใช้ ชื่อ–สกุล และรหัสผ่าน');if(users.some(x=>x.u===u))return alert('รหัสผู้ใช้นี้มีอยู่แล้ว');
  const user={u,p,r,name,tel:r==='student'?($('#newPhone').value.trim()||'-'):($('#newStaffPhone').value.trim()||'-'),mail:r==='student'?($('#newEmail').value.trim()||''):($('#newStaffEmail').value.trim()||'')};
  if(r==='student'){user.fac=$('#newFaculty').value.trim();user.maj=$('#newMajor').value.trim();user.yr=Number($('#newYear').value)||1;}
  users.push(user);sv();R[page]();alert(`เพิ่มบัญชี ${name} สำเร็จ`);
}
function editUser(id){const u=users.find(x=>x.u===id);if(!u)return;modal(`<div class="modal-heading"><div><span class="eyebrow">USER MANAGEMENT</span><h2>แก้ไขข้อมูลผู้ใช้</h2><p>${esc(u.u)}</p></div><button class="icon-button" onclick="closeModal()">${ico('close')}</button></div><form onsubmit="event.preventDefault();saveUserEdit('${esc(id)}')"><label>ชื่อ–สกุล</label><input id="editUserName" value="${esc(u.name)}" required><label>รหัสผ่าน</label><input id="editUserPass" value="${esc(u.p)}" required><div class="form-grid"><div><label>คณะ</label><input id="editUserFaculty" value="${esc(u.fac||'')}"></div><div><label>สาขา</label><input id="editUserMajor" value="${esc(u.maj||'')}"></div></div><div class="form-grid"><div><label>ชั้นปี</label><select id="editUserYear">${[1,2,3,4,5].map(y=>`<option value="${y}" ${Number(u.yr)===y?'selected':''}>ชั้นปีที่ ${y}</option>`).join('')}</select></div><div><label>เบอร์โทรศัพท์</label><input id="editUserPhone" value="${esc(u.tel||'')}"></div></div><label>อีเมล</label><input id="editUserEmail" type="email" value="${esc(u.mail||'')}"><div class="modal-actions"><button class="btn btn-outline" type="button" onclick="closeModal()">ยกเลิก</button><button class="btn btn-primary" type="submit">บันทึกข้อมูล</button></div></form>`);}
function saveUserEdit(id){const u=users.find(x=>x.u===id);if(!u)return;u.name=$('#editUserName').value.trim();u.p=$('#editUserPass').value;u.fac=$('#editUserFaculty').value.trim();u.maj=$('#editUserMajor').value.trim();u.yr=Number($('#editUserYear').value);u.tel=$('#editUserPhone').value.trim();u.mail=$('#editUserEmail').value.trim();if(me.u===id){me={...u};S('me',me);}sv();closeModal();R[page]();}
function deleteUser(id){if(id===me.u)return alert('ไม่สามารถลบบัญชีที่กำลังใช้งานอยู่');if(hist.some(h=>h.uid===id&&!h.ret))return alert('บัญชีนี้ยังมีรายการยืมที่ไม่คืน');if(!confirm(`ลบบัญชี ${id} ใช่หรือไม่?`))return;users=users.filter(u=>u.u!==id);sv();R[page]();}
function changeRole(id,r){const u=users.find(x=>x.u===id);if(!u)return;u.r=r;sv();R[page]();}

// ----- Profile -----
function profile(isStudent){return `<div class="profile-layout"><section class="card profile-main"><div class="profile-cover"></div><div class="profile-identity"><div class="profile-avatar">${ico('user',34)}</div><div><h2>${esc(me.name)}</h2><p>${esc(me.u)} · ${{student:'นักศึกษา',staff:'เจ้าหน้าที่คลัง',admin:'ผู้ดูแลระบบ'}[me.r]}</p></div></div><div class="profile-info-grid">${[['คณะ',me.fac,'box'],['สาขา',me.maj,'tools'],['ชั้นปี',me.yr?`ชั้นปีที่ ${me.yr}`:'—','history'],['เบอร์โทรศัพท์',me.tel||'—','phone'],['อีเมล',me.mail||'—','mail']].filter(a=>isStudent||!['ชั้นปี','คณะ','สาขา'].includes(a[0])).map(a=>`<div class="profile-info-item"><span class="info-icon">${ico(a[2],17)}</span><div><small>${a[0]}</small><b>${esc(a[1]||'—')}</b></div></div>`).join('')}</div><div class="profile-actions"><button class="btn btn-primary" onclick="editMyProfile()">${ico('edit',16)} แก้ไขเบอร์โทรศัพท์</button>${isStudent?`<a class="btn btn-outline" href="tel:${esc(((users.find(u=>u.r==='staff')?.tel)||'0821112222').replace(/[^+\d]/g,''))}">${ico('phone',16)} ติดต่อเจ้าหน้าที่</a>`:''}<button class="btn btn-outline profile-logout" onclick="logout()">${ico('logout',16)} ออกจากระบบ</button></div></section><aside class="card profile-side"><div class="profile-side-icon">${ico('shield',24)}</div><h3>ข้อมูลบัญชี</h3><p>ข้อมูลโปรไฟล์ในหน้าจอนี้เป็นข้อมูลตัวอย่างสำหรับสาธิตระบบ</p><div class="account-detail"><span>สถานะบัญชี</span>${badge('ใช้งานอยู่','success')}</div><div class="account-detail"><span>บทบาท</span><b>${{student:'นักศึกษา',staff:'เจ้าหน้าที่',admin:'ผู้ดูแลระบบ'}[me.r]}</b></div><div class="account-detail"><span>ระบบ</span><b>TOOLROOM DEMO</b></div></aside></div>`;}
function editMyProfile(){modal(`<div class="modal-heading"><div><span class="eyebrow">PROFILE SETTINGS</span><h2>แก้ไขเบอร์โทรศัพท์</h2><p>แก้ไขข้อมูลติดต่อของบัญชีที่กำลังใช้งาน</p></div><button class="icon-button" onclick="closeModal()">${ico('close')}</button></div><form onsubmit="event.preventDefault();me.tel=$('#profilePhone').value;users=users.map(u=>u.u===me.u?({...u,...me}):u);S('me',me);sv();closeModal();R[page]()"><label>เบอร์โทรศัพท์</label><input id="profilePhone" type="tel" value="${esc(me.tel||'')}"><div class="modal-actions"><button type="button" class="btn btn-outline" onclick="closeModal()">ยกเลิก</button><button class="btn btn-primary" type="submit">บันทึก</button></div></form>`);}

// Start requested route; QR and scanner libraries load asynchronously so offline demos still open.
R[page]?.();
loadLibrariesForPage();
