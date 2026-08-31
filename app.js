const APP_CONFIG = {
  babyName: "Nuestro bebé",
  eventDate: "",
  eventTime: "",
  eventPlace: "Lima, Perú",
  mapsUrl: "",
  firebase: null
};

const gifts = [
  {id:'diapers-rn',name:'Pañales RN',category:'Pañales',price:40,emoji:'🧷'},
  {id:'diapers-s',name:'Pañales talla P/S',category:'Pañales',price:50,emoji:'🧷'},
  {id:'diapers-m',name:'Pañales talla M',category:'Pañales',price:60,emoji:'🧷'},
  {id:'wipes',name:'Toallitas húmedas',category:'Higiene',price:25,emoji:'🫧'},
  {id:'cream',name:'Crema para pañal',category:'Higiene',price:25,emoji:'🧴'},
  {id:'body-03',name:'Set de bodys 0–3 meses',category:'Ropa',price:55,emoji:'👕'},
  {id:'body-36',name:'Set de bodys 3–6 meses',category:'Ropa',price:55,emoji:'👕'},
  {id:'pajamas',name:'Pijamas enterizos',category:'Ropa',price:45,emoji:'🌙'},
  {id:'bibs',name:'Baberos',category:'Alimentación',price:30,emoji:'🍼'},
  {id:'hooded-towels',name:'Toallas con capucha',category:'Baño',price:45,emoji:'🛁'},
  {id:'baby-bath',name:'Bañera para bebé',category:'Baño',price:95,emoji:'🛁'},
  {id:'grooming-kit',name:'Kit de aseo',category:'Higiene',price:60,emoji:'🧼'},
  {id:'thermometer',name:'Termómetro digital',category:'Salud',price:45,emoji:'🌡️'},
  {id:'mattress-protector',name:'Protector de colchón',category:'Sueño',price:40,emoji:'🛏️'},
  {id:'crib-sheets',name:'Juego de sábanas para cuna',category:'Sueño',price:50,emoji:'☁️'},
  {id:'muslins',name:'Muselinas / mantitas',category:'Sueño',price:45,emoji:'🧸'},
  {id:'diaper-bag',name:'Mochila maternal',category:'Paseo',price:120,emoji:'🎒'},
  {id:'changing-mat',name:'Cambiador portátil',category:'Paseo',price:55,emoji:'👶'},
  {id:'teethers',name:'Mordedores',category:'Juguetes',price:30,emoji:'🦷'},
  {id:'books',name:'Libritos para bebé',category:'Juguetes',price:35,emoji:'📚'},
  {id:'activity-gym',name:'Gimnasio de actividades',category:'Juguetes',price:140,emoji:'🧸'}
];

const bigGifts = [
  {id:'stroller',name:'Coche para bebé',goal:600,emoji:'🛒',description:'Para acompañarnos en los paseos y salidas en familia.'},
  {id:'car-seat',name:'Silla de auto',goal:450,emoji:'🚗',description:'Un básico importante para viajar con el bebé.'},
  {id:'crib',name:'Cuna / colecho',goal:500,emoji:'🛏️',description:'Para preparar un espacio cómodo para sus primeros meses.'}
];

const state = {
  category:'Todos', price:'all', reservations:{}, contributions:{}, db:null, firebaseReady:false
};

const $ = s => document.querySelector(s);
const currency = n => `S/${Number(n).toFixed(0)}`;

function saveLocal(key,value){ localStorage.setItem(`babyShower:${key}`,JSON.stringify(value)); }
function loadLocal(key,fallback){ try{return JSON.parse(localStorage.getItem(`babyShower:${key}`)) ?? fallback}catch{return fallback} }

function initEvent(){
  $('#eventDateLabel').textContent = APP_CONFIG.eventDate ? formatDate(APP_CONFIG.eventDate) : 'Próximamente';
  $('#detailDate').textContent = APP_CONFIG.eventDate ? formatDate(APP_CONFIG.eventDate) : 'Por confirmar';
  $('#detailTime').textContent = APP_CONFIG.eventTime || 'Por confirmar';
  $('#detailPlace').textContent = APP_CONFIG.eventPlace || 'Por confirmar';
  if(APP_CONFIG.mapsUrl){ $('#mapsLink').href=APP_CONFIG.mapsUrl; $('#mapsLink').classList.remove('hidden'); }
  startCountdown();
}

function formatDate(value){
  const d = new Date(`${value}T12:00:00`);
  if(Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('es-PE',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
}

function startCountdown(){
  const note=$('#countdownNote');
  if(!APP_CONFIG.eventDate){ note.textContent='En cuanto definamos la fecha aparecerá aquí la cuenta regresiva.'; return; }
  const target=new Date(`${APP_CONFIG.eventDate}T${APP_CONFIG.eventTime || '15:00'}:00`);
  const tick=()=>{
    const diff=target-Date.now();
    if(diff<=0){['days','hours','minutes','seconds'].forEach(id=>$(`#${id}`).textContent='00');note.textContent='¡Llegó el gran día! 💙';return}
    const d=Math.floor(diff/86400000),h=Math.floor(diff/3600000)%24,m=Math.floor(diff/60000)%60,s=Math.floor(diff/1000)%60;
    $('#days').textContent=String(d).padStart(2,'0');$('#hours').textContent=String(h).padStart(2,'0');$('#minutes').textContent=String(m).padStart(2,'0');$('#seconds').textContent=String(s).padStart(2,'0');
    note.textContent='Cada día estamos un poquito más cerca 💙';
  };
  tick();setInterval(tick,1000);
}

async function initData(){
  state.reservations=loadLocal('reservations',{});
  state.contributions=loadLocal('contributions',{});
  if(APP_CONFIG.firebase && APP_CONFIG.firebase.apiKey){
    try{
      firebase.initializeApp(APP_CONFIG.firebase);
      state.db=firebase.firestore();state.firebaseReady=true;
      state.db.collection('giftReservations').onSnapshot(s=>{const next={};s.forEach(d=>next[d.id]=d.data());state.reservations=next;renderGifts();});
      state.db.collection('giftContributions').onSnapshot(s=>{const next={};s.forEach(d=>next[d.id]=d.data());state.contributions=next;renderBigGifts();});
    }catch(e){console.warn('Firebase no disponible; usando modo local.',e)}
  }
  renderCategories();renderGifts();renderBigGifts();
}

function renderCategories(){
  const categories=['Todos',...new Set(gifts.map(g=>g.category))];
  $('#categoryPills').innerHTML=categories.map(c=>`<button class="pill ${c===state.category?'active':''}" data-category="${c}">${c}</button>`).join('');
  document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{state.category=b.dataset.category;renderCategories();renderGifts()}));
}

function matchesPrice(g){
  if(state.price==='low')return g.price<=50;
  if(state.price==='mid')return g.price>50&&g.price<=150;
  if(state.price==='high')return g.price>150;
  return true;
}

function renderGifts(){
  const filtered=gifts.filter(g=>(state.category==='Todos'||g.category===state.category)&&matchesPrice(g));
  const reservedCount=Object.keys(state.reservations).length;
  $('#giftStats').textContent=`${gifts.length-reservedCount} regalos disponibles · ${reservedCount} reservados`;
  $('#giftGrid').innerHTML=filtered.map(g=>{
    const reserved=!!state.reservations[g.id];
    return `<article class="gift-card">
      <div class="gift-thumb">${g.emoji}</div>
      <div class="gift-body">
        <div class="gift-top"><h3>${g.name}</h3><span class="badge ${reserved?'reserved':''}">${reserved?'Reservado':'Disponible'}</span></div>
        <div class="gift-meta"><span>${g.category}</span><strong>${currency(g.price)} aprox.</strong></div>
        <button class="btn ${reserved?'secondary':'primary'}" data-gift="${g.id}" ${reserved?'disabled':''}>${reserved?'Ya fue elegido':'Yo regalo esto 💙'}</button>
      </div>
    </article>`
  }).join('') || '<p>No hay regalos con estos filtros.</p>';
  document.querySelectorAll('[data-gift]').forEach(b=>b.addEventListener('click',()=>openGiftDialog(b.dataset.gift)));
}

function openGiftDialog(id){
  const gift=gifts.find(g=>g.id===id);if(!gift)return;
  $('#dialogContent').innerHTML=`<div style="font-size:3rem">${gift.emoji}</div><h3 class="dialog-title">${gift.name}</h3><p class="dialog-copy">Gracias por querer tener este detalle con nosotros. Escribe tu nombre para reservarlo y evitar que otra persona elija el mismo regalo.</p><form class="dialog-form" id="reserveForm"><input id="reserveName" placeholder="Tu nombre" required><button class="btn primary full">Reservar regalo 💙</button></form>`;
  $('#giftDialog').showModal();
  $('#reserveForm').addEventListener('submit',async e=>{e.preventDefault();await reserveGift(id,$('#reserveName').value.trim())});
}

async function reserveGift(id,name){
  if(!name)return;
  const record={name,createdAt:new Date().toISOString()};
  try{
    if(state.firebaseReady){
      const ref=state.db.collection('giftReservations').doc(id);
      await state.db.runTransaction(async tx=>{const snap=await tx.get(ref);if(snap.exists)throw new Error('reserved');tx.set(ref,record)});
    }else{state.reservations[id]=record;saveLocal('reservations',state.reservations)}
    $('#giftDialog').close();renderGifts();showToast('¡Regalo reservado! Gracias 💙');
  }catch(e){showToast('Ese regalo acaba de ser reservado por otra persona.');}
}

function renderBigGifts(){
  $('#bigGifts').innerHTML=bigGifts.map(g=>{
    const data=state.contributions[g.id]||{total:0};const total=Math.min(Number(data.total||0),g.goal);const pct=Math.min(100,Math.round(total/g.goal*100));
    return `<article class="big-card"><div style="font-size:2rem">${g.emoji}</div><h3>${g.name}</h3><p>${g.description}</p><div class="progress"><span style="width:${pct}%"></span></div><div class="progress-meta"><span>${currency(total)} reunidos</span><span>Meta ${currency(g.goal)}</span></div><button class="btn secondary full" data-contribute="${g.id}">💙 Quiero aportar</button></article>`
  }).join('');
  document.querySelectorAll('[data-contribute]').forEach(b=>b.addEventListener('click',()=>openContributionDialog(b.dataset.contribute)));
}

function openContributionDialog(id){
  const gift=bigGifts.find(g=>g.id===id);if(!gift)return;
  $('#dialogContent').innerHTML=`<div style="font-size:3rem">${gift.emoji}</div><h3 class="dialog-title">Aportar para ${gift.name}</h3><p class="dialog-copy">Registra cuánto deseas aportar. Los papás podrán coordinar contigo la entrega.</p><form class="dialog-form" id="contributionForm"><input id="contributorName" placeholder="Tu nombre" required><input id="contributionAmount" type="number" min="1" max="${gift.goal}" placeholder="Monto en soles" required><button class="btn primary full">Registrar aporte 💙</button></form>`;
  $('#giftDialog').showModal();
  $('#contributionForm').addEventListener('submit',async e=>{e.preventDefault();await addContribution(id,$('#contributorName').value.trim(),Number($('#contributionAmount').value))});
}

async function addContribution(id,name,amount){
  if(!name||!amount||amount<1)return;
  try{
    if(state.firebaseReady){
      const ref=state.db.collection('giftContributions').doc(id);
      await state.db.runTransaction(async tx=>{const snap=await tx.get(ref);const current=snap.exists?Number(snap.data().total||0):0;tx.set(ref,{total:current+amount,lastContributor:name,updatedAt:new Date().toISOString()},{merge:true})});
    }else{
      const current=Number(state.contributions[id]?.total||0);state.contributions[id]={total:current+amount,lastContributor:name};saveLocal('contributions',state.contributions);
    }
    $('#giftDialog').close();renderBigGifts();showToast('¡Aporte registrado! Muchas gracias 💙');
  }catch(e){showToast('No pudimos registrar el aporte. Intenta otra vez.');}
}

$('#priceFilter').addEventListener('change',e=>{state.price=e.target.value;renderGifts()});
$('#dialogClose').addEventListener('click',()=>$('#giftDialog').close());

$('#rsvpForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const data={name:$('#guestName').value.trim(),attendance:$('#guestAttendance').value,count:Number($('#guestCount').value),message:$('#guestMessage').value.trim(),createdAt:new Date().toISOString()};
  if(!data.name)return;
  const status=$('#rsvpStatus');status.textContent='Guardando…';
  try{
    if(state.firebaseReady){await state.db.collection('rsvp').add(data)}
    else{const all=loadLocal('rsvp',[]);all.push(data);saveLocal('rsvp',all)}
    status.textContent=data.attendance==='yes'?'¡Gracias! Nos encantará verte 💙':'Gracias por avisarnos 💙';
    e.target.reset();
  }catch{status.textContent='No pudimos guardar tu confirmación. Intenta otra vez.'}
});

function showToast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2800)}

initEvent();initData();
