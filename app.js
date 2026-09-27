
let APP={}, HOTSPOTS=[], DEFAULT_DATA={}, data={}, QUIZ=[], SCENARIOS=[], INTERLOCK={effects:[],rows:[]}, ENGINEERING={unitOperations:[],fluidMechanics:[]};
let currentKey=null, editing=false, editSnapshot=null, deferredPrompt=null, activeFilter='all';
let quickQuiz=[];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const clone=o=>JSON.parse(JSON.stringify(o));
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x};

async function loadJson(path){const r=await fetch(path,{cache:'no-store'});if(!r.ok)throw new Error(path);return r.json()}
async function boot(){
  try{
    [APP,HOTSPOTS,DEFAULT_DATA,QUIZ,SCENARIOS,INTERLOCK,ENGINEERING]=await Promise.all([
      loadJson('config/app.json'),loadJson('config/hotspots.json'),loadJson('config/equipment.json'),
      loadJson('config/quiz.json'),loadJson('config/scenarios.json'),loadJson('config/interlocks.json'),loadJson('config/engineering.json')
    ]);
    document.title=APP.title||APP.appName||'Concept Template';
    $('#appTitle').textContent=APP.title||APP.appName;
    $('#appSubtitle').textContent=APP.subtitle||'';
    $('#heroKicker').textContent=APP.kicker||'CONCEPT';
    $('#heroTitle').textContent=APP.heroTitle||APP.title;
    $('#heroDescription').textContent=APP.heroDescription||'';
    $('#processTitle').textContent=APP.processTitle||'Tela do processo';
    $('#processImage').src=APP.processImage||'assets/process-placeholder.svg';
    $('#footerTitle').textContent=APP.title||APP.appName;
    $('#versionBadge').textContent=APP.version||'T1.0';
    $('#trainingDisclaimer').textContent=APP.engineeringDisclaimer||'Material de treinamento.';
    data=loadLocalData();
    renderHotspots();
    renderFilters();
    bindSearch();
    syncEditable();
  }catch(e){
    document.querySelector('.app').insertAdjacentHTML('afterbegin',`<div class="config-error"><b>Falha ao carregar configuração.</b><br>Verifique os arquivos da pasta config/.</div>`);
    console.error(e);
  }
}
function storageKey(){return APP.storageKey||'conceptTemplate_data'}
function loadLocalData(){try{const x=JSON.parse(localStorage.getItem(storageKey())||'null');return x?Object.assign(clone(DEFAULT_DATA),x):clone(DEFAULT_DATA)}catch{return clone(DEFAULT_DATA)}}
function saveLocalData(){localStorage.setItem(storageKey(),JSON.stringify(data))}
function renderHotspots(){
  const layer=$('#hotspotLayer'); layer.innerHTML='';
  HOTSPOTS.forEach(h=>{
    const b=document.createElement('button');
    b.className='hotspot'; b.dataset.key=h.key; b.dataset.category=h.category||'other';
    b.style.left=`${h.left}%`; b.style.top=`${h.top}%`;
    b.innerHTML=`<span class="bulb">💡</span><span class="lamp-label">${escapeHtml(h.label||h.key)}</span>`;
    b.addEventListener('click',()=>selectItem(h.key,b));
    layer.appendChild(b);
  });
}
function renderFilters(){
  const cats=[...new Set(HOTSPOTS.map(h=>h.category||'other'))];
  const labels={all:'Todos',equip:'Equipamentos',control:'Controles',air:'Ar',steam:'Vapor',utility:'Utilidades',safety:'Segurança',other:'Outros'};
  $('#filterChips').innerHTML=[['all','Todos'],...cats.map(c=>[c,labels[c]||c])].map(([c,l])=>`<button class="chip ${c==='all'?'active':''}" onclick="filterCategory('${c}',this)">${l}</button>`).join('');
}
function filterCategory(cat,btn){
  activeFilter=cat; $$('.chip').forEach(x=>x.classList.remove('active')); btn?.classList.add('active');
  $$('.hotspot').forEach(h=>h.classList.toggle('hidden',cat!=='all'&&h.dataset.category!==cat));
}
function bindSearch(){$('#search').addEventListener('keydown',e=>{if(e.key==='Enter')searchTag()})}
function searchTag(){
  const q=$('#search').value.trim().toLowerCase(); if(!q)return;
  const key=Object.keys(data).find(k=>JSON.stringify(data[k]).toLowerCase().includes(q))||HOTSPOTS.find(h=>(h.label||'').toLowerCase().includes(q))?.key;
  if(!key)return toast('Nenhum item encontrado');
  const h=$(`.hotspot[data-key="${key}"]`); selectItem(key,h); toast('Item encontrado');
}
function selectItem(k,h=null){
  if(currentKey&&currentKey!==k)saveCurrent();
  currentKey=k; $$('.hotspot').forEach(x=>x.classList.remove('active')); h?.classList.add('active');
  $('#empty').classList.add('hidden'); $('#info').style.display='flex'; loadFields(data[k]);
  editing=false; syncEditable();
  const p=$('#detailPanel');p.classList.remove('minimized');p.classList.add('open');document.body.classList.add('detail-panel-open');
  renderEquipmentMedia(); showStorageEstimate();
}
function loadFields(d){
  if(!d)return;
  $('#infoTitle').textContent=d.title||currentKey; $('#infoTag').textContent=d.tag||''; $('#infoCat').textContent=d.category||'';
  $('#fieldFunction').textContent=d.function||'';$('#fieldProcess').textContent=d.process||'';$('#fieldImpact').textContent=d.impact||'';
  $('#fieldFormula').textContent=d.formula||'';$('#fieldObs').textContent=d.obs||'';$('#videoUrl').value=d.video||'';
}
function collectFields(){
  return {...data[currentKey],function:$('#fieldFunction').innerText,process:$('#fieldProcess').innerText,impact:$('#fieldImpact').innerText,
    formula:$('#fieldFormula').innerText,obs:$('#fieldObs').innerText,video:$('#videoUrl').value.trim()};
}
function saveCurrent(){if(!currentKey)return;data[currentKey]=collectFields();saveLocalData()}
function toggleEdit(){if(!currentKey)return;if(!editing)editSnapshot=clone(data[currentKey]);editing=!editing;syncEditable()}
function syncEditable(){
  $$('.editable').forEach(x=>x.contentEditable=editing?'true':'false');
  $('#editState')?.classList.toggle('show',editing);$('#editModeBanner')?.classList.toggle('hidden',!editing);
  if($('#editBtn'))$('#editBtn').textContent=editing?'✓ Editando':'✏️ Editar';
}
function saveCurrentAndExit(){saveCurrent();editing=false;editSnapshot=null;syncEditable();toast('Alterações salvas neste dispositivo')}
function cancelEdit(){if(!currentKey)return;if(editSnapshot){data[currentKey]=editSnapshot;loadFields(data[currentKey])}editing=false;editSnapshot=null;syncEditable()}
function restoreCurrent(){if(!currentKey)return;if(!confirm('Restaurar este item para o conteúdo do template?'))return;data[currentKey]=clone(DEFAULT_DATA[currentKey]);saveLocalData();loadFields(data[currentKey]);toast('Item restaurado')}
function togglePanelMinimize(){const p=$('#detailPanel');p.classList.toggle('minimized');document.body.classList.toggle('detail-panel-open',!p.classList.contains('minimized')&&p.classList.contains('open'))}
function minimize(){if(currentKey)saveCurrent();currentKey=null;editing=false;syncEditable();$('#info').style.display='none';$('#empty').classList.remove('hidden');$$('.hotspot').forEach(x=>x.classList.remove('active'));const p=$('#detailPanel');p.classList.remove('open','minimized');document.body.classList.remove('detail-panel-open');clearMediaObjectUrls()}
function openVideo(){const u=$('#videoUrl').value.trim();if(u)window.open(u,'_blank','noopener');else toast('Informe uma URL')}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}

function openQuiz(){
  quickQuiz=shuffle(QUIZ).slice(0,Math.min(10,QUIZ.length));
  $('#quizBody').innerHTML=quickQuiz.map((q,i)=>`<div class="q"><h4>${i+1}. ${escapeHtml(q.q)}</h4>${q.a.map((a,j)=>`<label><input type="radio" name="qq${i}" value="${j}"> <span class="option-letter">${String.fromCharCode(65+j)}.</span> ${escapeHtml(a)}</label>`).join('')}<div class="qfeedback hidden" id="qqfb${i}"></div></div>`).join('');
  $('#quizResult').classList.add('hidden');$('#quizDrawer').classList.add('open');
}
function closeQuiz(){$('#quizDrawer').classList.remove('open')}
function gradeQuiz(){
  let s=0;quickQuiz.forEach((q,i)=>{const sel=document.querySelector(`input[name="qq${i}"]:checked`);const fb=$(`#qqfb${i}`);fb.classList.remove('hidden');if(sel&&+sel.value===q.c){s++;fb.className='qfeedback correct';fb.textContent='✓ '+q.explanation}else{fb.className='qfeedback wrong';fb.textContent='Resposta: '+String.fromCharCode(65+q.c)+'. '+q.a[q.c]+' — '+q.explanation}});
  const pct=quickQuiz.length?Math.round(s/quickQuiz.length*100):0;$('#quizResult').textContent=`Resultado: ${s}/${quickQuiz.length} — ${pct}%`;$('#quizResult').classList.remove('hidden');
}
function quizCurrentItem(){if(!currentKey)return;const pool=QUIZ.filter(q=>q.equipment===currentKey);if(!pool.length)return toast('Sem questões configuradas para este item');quickQuiz=pool;openQuiz()}

const TRAIN_MODULES=[['home','Visão geral'],['quiz','Quiz'],['scenarios','Cenários'],['interlock','🧩 Intertravamentos'],['unitops','Operações Unitárias'],['fluid','Mecânica dos Fluidos']];
function openTraining(m='home'){$('#trainingDrawer').classList.add('open');openTrainingModule(m)}
function closeTraining(){$('#trainingDrawer').classList.remove('open')}
function openTrainingModule(id){
  $('#trainingNav').innerHTML=TRAIN_MODULES.map(([k,l])=>`<button class="${k===id?'active':''}" onclick="openTrainingModule('${k}')">${l}</button>`).join('');
  $('#trainingBreadcrumb').textContent=TRAIN_MODULES.find(x=>x[0]===id)?.[1]||id;
  const c=$('#trainingContent');
  ({home:renderTrainingHome,quiz:renderTrainingQuiz,scenarios:renderScenarios,interlock:renderInterlocks,unitops:()=>renderEngineering('unitOperations','Operações Unitárias'),fluid:()=>renderEngineering('fluidMechanics','Mecânica dos Fluidos')}[id]||renderTrainingHome)(c);
}
function renderTrainingHome(c){c.innerHTML=`<h2 class="training-title">Concept Template</h2><p class="training-sub">O núcleo permanece estável; personalize os arquivos JSON da pasta <b>config</b>.</p><div class="training-grid"><div class="module-card template-help"><h3>1. Tela + hotspots</h3><p>app.json, hotspots.json e equipment.json</p></div><div class="module-card template-help"><h3>2. Avaliação</h3><p>quiz.json e scenarios.json</p></div><div class="module-card template-help"><h3>3. Intertravamentos</h3><p>interlocks.json alimenta a lógica causa × efeito.</p></div><div class="module-card template-help"><h3>4. Engenharia</h3><p>engineering.json alimenta Operações Unitárias e Mecânica dos Fluidos.</p></div></div>`}
function renderTrainingQuiz(c){c.innerHTML=`<h2 class="training-title">Quiz configurado</h2><p class="training-sub">${QUIZ.length} questão(ões) carregada(s).</p><button class="btn primary" onclick="closeTraining();openQuiz()">Abrir quiz</button>`}
function renderScenarios(c){c.innerHTML=`<h2 class="training-title">Cenários</h2>${SCENARIOS.length?SCENARIOS.map(s=>`<div class="training-box"><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.intro)}</p><small>${escapeHtml(s.skill||'')}</small></div>`).join(''):'<div class="training-box">Nenhum cenário configurado.</div>'}`}

function renderInterlocks(c){
  const rows=INTERLOCK.rows||[],effects=INTERLOCK.effects||[];
  c.innerHTML=`<h2 class="training-title">🧩 Intertravamentos</h2><p class="training-sub">Matriz causa × efeito carregada de config/interlocks.json.</p>${rows.map((r,i)=>`<div class="training-box"><h3>${escapeHtml(r.cause)} — ${escapeHtml(r.tag)}</h3><p>${(r.effects||[]).map(id=>escapeHtml(effects.find(e=>e.id===id)?.label||id)).join(' → ')}</p><button class="btn" onclick="startInterlockTest(${i})">Treinar esta linha</button></div>`).join('')||'<div class="training-box">Nenhuma lógica configurada.</div>'}`;
}
function startInterlockTest(i){
  const r=INTERLOCK.rows[i],effects=INTERLOCK.effects||[],c=$('#trainingContent');
  c.innerHTML=`<button class="btn" onclick="openTrainingModule('interlock')">← Voltar</button><h2 class="training-title">Causa → Efeito</h2><div class="training-box"><h3>${escapeHtml(r.cause)}</h3><p>${escapeHtml(r.tag)} ${r.set?'• '+escapeHtml(r.set):''}</p></div><div id="tplEffects" class="interlock-effects">${effects.map(e=>`<button class="interlock-effect" data-id="${e.id}" onclick="this.classList.toggle('selected')"><span class="effect-check">○</span><span><strong>${escapeHtml(e.label)}</strong><small>${escapeHtml(e.tag||'')}</small></span></button>`).join('')}</div><button class="btn primary" onclick="validateTemplateInterlock(${i})">Validar lógica</button><div id="tplInterlockFb"></div>`;
}
function validateTemplateInterlock(i){
  const r=INTERLOCK.rows[i],chosen=$$('#tplEffects .interlock-effect.selected').map(b=>b.dataset.id),ok=chosen.length===r.effects.length&&chosen.every(x=>r.effects.includes(x));
  $('#tplInterlockFb').innerHTML=`<div class="feedback-box"><strong>${ok?'✓ Correto':'Revise a lógica'}</strong><p>${r.effects.map(id=>escapeHtml(INTERLOCK.effects.find(e=>e.id===id)?.label||id)).join(' → ')}</p></div>`;
}
function renderEngineering(key,title){
  const c=$('#trainingContent'),arr=ENGINEERING[key]||[];
  c.innerHTML=`<h2 class="training-title">${title}</h2><p class="training-sub">Conteúdo carregado de config/engineering.json.</p>${arr.map(t=>`<div class="training-box"><h3>${escapeHtml(t.title)}</h3><p><b>Onde:</b> ${escapeHtml(t.where)}</p><p>${escapeHtml(t.concept)}</p><div class="formula">${escapeHtml(t.equations)}</div><p><b>Operação:</b> ${escapeHtml(t.operator)}</p><p><b>CIC:</b> ${escapeHtml(t.diagnostic)}</p><p class="note"><b>Atenção:</b> ${escapeHtml(t.warning)}</p></div>`).join('')||'<div class="training-box">Nenhum conteúdo configurado.</div>'}`;
}

/* IndexedDB de mídia local */
let mediaDB=null,mediaObjectUrls=[];
function dbName(){return APP.mediaDbName||'conceptTemplateMediaDB'}
function openMediaDB(){return new Promise((resolve,reject)=>{if(mediaDB)return resolve(mediaDB);const req=indexedDB.open(dbName(),1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('media')){const s=db.createObjectStore('media',{keyPath:'id',autoIncrement:true});s.createIndex('equipmentKey','equipmentKey');s.createIndex('kind','kind')}};req.onsuccess=()=>{mediaDB=req.result;resolve(mediaDB)};req.onerror=()=>reject(req.error)})}
async function addMediaRecord(r){const db=await openMediaDB();return new Promise((res,rej)=>{const q=db.transaction('media','readwrite').objectStore('media').add(r);q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})}
async function getMediaByEquipment(k){const db=await openMediaDB();return new Promise((res,rej)=>{const q=db.transaction('media').objectStore('media').index('equipmentKey').getAll(k);q.onsuccess=()=>res(q.result||[]);q.onerror=()=>rej(q.error)})}
async function deleteMediaRecord(id){const db=await openMediaDB();return new Promise((res,rej)=>{const q=db.transaction('media','readwrite').objectStore('media').delete(id);q.onsuccess=()=>res();q.onerror=()=>rej(q.error)})}
function clearMediaObjectUrls(){mediaObjectUrls.forEach(URL.revokeObjectURL);mediaObjectUrls=[]}
function fmtBytes(n){if(!n)return'0 B';const u=['B','KB','MB','GB'],i=Math.floor(Math.log(n)/Math.log(1024));return`${(n/1024**i).toFixed(i?1:0)} ${u[i]}`}
async function saveMediaFiles(ev,kind){if(!currentKey)return;for(const f of [...ev.target.files])await addMediaRecord({equipmentKey:currentKey,kind,name:f.name,type:f.type,size:f.size,addedAt:new Date().toISOString(),blob:f});ev.target.value='';await renderEquipmentMedia();showStorageEstimate()}
async function renderEquipmentMedia(){
  const v=$('#videoFileList'),a=$('#attachmentList');if(!v||!a)return;clearMediaObjectUrls();if(!currentKey){v.innerHTML='';a.innerHTML='';return}
  const all=await getMediaByEquipment(currentKey);
  v.innerHTML='';a.innerHTML='';
  for(const x of all){const box=document.createElement('article');box.className='inline-media-card';const u=URL.createObjectURL(x.blob);mediaObjectUrls.push(u);let preview='';
    if(x.kind==='video'||x.type.startsWith('video/'))preview=`<video class="inline-video" controls playsinline src="${u}"></video>`;
    else if(x.type.startsWith('image/'))preview=`<img class="inline-image" src="${u}" alt="">`;
    else if(x.type==='application/pdf'||x.name.toLowerCase().endsWith('.pdf'))preview=`<iframe class="inline-pdf" src="${u}"></iframe>`;
    else if(x.type.startsWith('audio/'))preview=`<audio class="inline-audio" controls src="${u}"></audio>`;
    else preview=`<div class="unsupported-preview">📎 ${escapeHtml(x.name)} — prévia interna não disponível.</div>`;
    box.innerHTML=`<div class="inline-media-head"><div><strong>${escapeHtml(x.name)}</strong><div class="media-file-meta">${fmtBytes(x.size)}</div></div><button class="media-mini-btn delete" onclick="removeMedia(${x.id})">Excluir</button></div><div class="inline-preview">${preview}</div>`;
    (x.kind==='video'?v:a).appendChild(box);
  }
}
async function removeMedia(id){if(!confirm('Excluir este arquivo local?'))return;await deleteMediaRecord(id);renderEquipmentMedia()}
async function showStorageEstimate(){if(!navigator.storage?.estimate)return;const e=await navigator.storage.estimate();$('#mediaStorageEstimate').textContent=`Armazenamento local: ${fmtBytes(e.usage||0)} usados de aproximadamente ${fmtBytes(e.quota||0)}.`}

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').classList.remove('hidden')});
async function installApp(){if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}else alert('Use o menu do navegador para instalar/adicionar à tela inicial.')}
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
document.addEventListener('DOMContentLoaded',boot);
