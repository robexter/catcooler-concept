const DEFAULT_DATA = {"f3982": {"title": "F-3982 — Tubulão / steam drum do catcooler", "tag": "F-3982", "category": "equip", "function": "O F-3982 é o tubulão (steam drum) do circuito de geração de vapor do catcooler. Ele recebe e mantém o inventário de água de alimentação (HBF), separa a mistura água-vapor que retorna do circuito aquecido e fornece volume de amortecimento para que a geração de vapor permaneça estável mesmo quando a carga térmica varia.", "process": "O calor retirado do catalisador nos C-3901A/B é transferido para o circuito de água. Parte da água vaporiza e a mistura bifásica retorna ao F-3982. Dentro do tubulão, o vapor é separado da fase líquida: o vapor segue para o coletor/consumo e a água permanece disponível para recirculação. A pressão do drum define, em grande parte, a temperatura de saturação da água; portanto, pressão, nível e vapor gerado precisam ser interpretados em conjunto.", "impact": "⚠️ NÍVEL BAIXO: reduz a reserva hidráulica e pode expor o circuito a condição térmica inadequada.\n\n⚠️ NÍVEL ALTO: reduz espaço de separação e aumenta risco de arraste de gotículas de água para a linha de vapor.\n\n⚠️ VARIAÇÃO RÁPIDA DE CARGA: pode produzir swell/shrink; o nível indicado pode mudar antes de a massa real de água mudar na mesma proporção.\n\nAção operacional deve considerar tendência de nível, HBF, vapor gerado, pressão do drum e carga térmica — não apenas um valor instantâneo.", "formula": "Balanço de massa:\ndM/dt = F_HBF − F_vapor − F_purgas\n\nBalanço de energia simplificado:\nQ_catcooler ≈ ṁ_vapor · (h_vapor − h_água)\n\nCalor sensível do catalisador:\nQ ≈ ṁ_cat · Cp_cat · (T_entrada − T_saida)\n\nRelação qualitativa:\nP_drum ↑ → T_saturação ↑", "obs": "NO CIC — observar em conjunto:\n• LIC do F-3982 e sua tendência;\n• vazão de HBF (FIC associado);\n• vapor gerado;\n• indicação ΔHBF − vapor gerado mostrada na tela;\n• pressão/condição do circuito;\n• carga térmica do catcooler.\n\nSituação típica: aumento súbito de geração de vapor pode produzir swell. Antes de reduzir HBF de forma agressiva, confirmar se o aumento do nível é inventário real ou resposta dinâmica da ebulição.\n\nESTRUTURA DE LEITURA NO CIC:\n• Variável principal: nível do F-3982.\n• Confirmações: HBF, vapor gerado, ΔHBF−vapor, pressão e carga térmica.\n• Sinal de degradação: diferença sustentada de balanço acompanhada por tendência de inventário.\n• Erro comum: reagir ao swell/shrink como se fosse mudança imediata de massa."}, "c3901ab": {"title": "C-3901A / C-3901B — Catcoolers", "tag": "C-3901A/B", "category": "equip", "function": "Os C-3901A/B retiram calor do catalisador quente associado ao regenerador D-3904. Essa remoção permite controlar o balanço térmico do regenerador e recuperar a energia na forma de vapor no circuito ligado ao F-3982.", "process": "Catalisador quente circula pelo circuito externo dos catcoolers. A energia térmica é transferida para a água do sistema de geração de vapor. O catalisador retorna ao D-3904 com menor temperatura. A intensidade de remoção de calor depende da circulação de catalisador, da diferença de temperatura e das condições do lado água/vapor. Os dois ramos A/B permitem distribuir a remoção térmica e acompanhar assimetrias entre os lados.", "impact": "⚠️ REMOÇÃO DE CALOR INSUFICIENTE: tendência de elevação da temperatura do regenerador para a mesma carga térmica.\n\n⚠️ REMOÇÃO EXCESSIVA: pode reduzir a temperatura do regenerador além do desejado e alterar o balanço térmico da FCC.\n\n⚠️ ASSIMETRIA A/B: diferenças persistentes entre temperaturas, ar de aeração, circulação ou resposta dos dois lados podem indicar distribuição desigual de catalisador ou perda de desempenho em um ramo.\n\n⚠️ PERDA DE AERAÇÃO/FLUIDIZAÇÃO: pode prejudicar a circulação de catalisador pelo cooler.", "formula": "Q = ṁ_cat · Cp_cat · (T_entrada − T_saida)\n\nTroca térmica:\nQ = U · A · ΔT_lm\n\nGeração de vapor aproximada:\nṁ_vapor ≈ Q / λ\n\nCombustão que gera o calor no regenerador:\nC + O₂ → CO₂ + calor\n2C + O₂ → 2CO + calor", "obs": "NO CIC — correlacionar:\n• temperatura do D-3904;\n• temperaturas de entrada/saída dos ramos A e B;\n• geração de vapor;\n• carga térmica indicada;\n• atuação do TIC-39031;\n• condições de AR J-3901 / AR J-3982 / V-12 de emergência;\n• diferenças persistentes entre C-3901A e C-3901B.\n\nDiagnóstico: se a temperatura do regenerador sobe e a geração de vapor/carga térmica dos catcoolers cai, investigar perda de circulação ou de troca térmica antes de concluir aumento de carga da unidade.\n\nESTRUTURA DE LEITURA NO CIC:\n• Variável principal: capacidade de remoção de calor dos ramos A/B.\n• Confirmações: temperaturas, geração de vapor, aeração e TIC-39031.\n• Sinal de degradação: assimetria persistente A/B ou queda de vapor com temperatura do regenerador subindo.\n• Erro comum: atribuir toda diferença apenas à instrumentação sem comparar circulação/aeração."}, "tic39031": {"title": "TIC-39031 — Controle de temperatura", "tag": "TIC-39031", "category": "control", "function": "O TIC-39031 participa do controle térmico do sistema, comparando a temperatura medida com o setpoint e modulando a atuação associada aos ramos do catcooler para aumentar ou reduzir a remoção de calor.", "process": "Quando a PV tende a ficar acima do SP, a lógica deve comandar maior capacidade de remoção de calor, dentro dos limites e permissivos do sistema. Quando a PV fica abaixo do SP, a tendência é reduzir a retirada de calor. Na tela aparecem elementos associados aos dois ramos (TY-39031A/B); por isso, além do erro PV−SP, é importante verificar se os dois lados respondem de forma coerente e se algum elemento final está saturado.", "impact": "⚠️ PV > SP com MV já elevada: pode indicar que o controle está pedindo mais resfriamento, mas o processo não consegue entregar — investigar circulação, aeração, disponibilidade dos ramos e carga térmica.\n\n⚠️ PV oscilando: verificar se a oscilação nasce no processo ou é provocada pela malha/elementos finais.\n\n⚠️ A/B muito diferentes: pode haver limitação ou distribuição desigual entre os catcoolers.", "formula": "Erro de controle:\ne(t) = SP − PV\n\nConceito de ação:\nPV > SP → aumentar remoção de calor\nPV < SP → reduzir remoção de calor\n\nBalanço térmico simplificado:\nQ_gerado − Q_removido = acumulação de energia", "obs": "NO CIC — acompanhar simultaneamente PV, SP e MV do TIC-39031, além das saídas associadas aos ramos A/B. Se a PV se afasta do SP apesar de grande atuação, tratar como possível limitação de processo/equipamento, não apenas como problema de sintonia.\n\nESTRUTURA DE LEITURA NO CIC:\n• Variável principal: PV versus SP.\n• Confirmações: MV, saídas A/B e resposta térmica real.\n• Sinal de degradação: PV afastada do SP com atuação elevada e pouca resposta do processo.\n• Erro comum: alterar sintonia antes de verificar limitação física do sistema."}, "arj3901": {"title": "AR proveniente do J-3901", "tag": "AR J-3901", "category": "air", "function": "O ar proveniente do J-3901 atua como fonte principal de aeração/fluidização do circuito associado ao catcooler, ajudando a manter o catalisador móvel e a circulação estável nos ramos.", "process": "A injeção de ar em pontos do circuito reduz a tendência de acomodação do catalisador e favorece a mobilidade do sólido. A condição de aeração influencia a circulação pelo C-3901A/B e, consequentemente, a capacidade de remoção de calor.", "impact": "⚠️ VAZÃO/PRESSÃO INSUFICIENTE: pode reduzir mobilidade do catalisador, diminuir circulação e reduzir a carga térmica removida.\n\n⚠️ VARIAÇÃO BRUSCA: pode aparecer como mudança de temperatura dos ramos, geração de vapor e resposta do TIC-39031.\n\n⚠️ EXCESSO: pode alterar ΔP e distribuição hidráulica; deve respeitar os limites operacionais.", "formula": "Função principal: fluidização/aeração.\n\nConceito qualitativo:\nvelocidade superficial de gás ↑ → força de arraste sobre partículas ↑\n\nQuando o O₂ participa da combustão no regenerador:\nC + O₂ → CO₂ + calor", "obs": "NO CIC — se houver perda do AR J-3901, correlacionar imediatamente com circulação dos catcoolers, temperaturas A/B, vapor gerado e disponibilidade do ar auxiliar/emergencial conforme procedimento.\n\nESTRUTURA DE LEITURA NO CIC:\n• Variável principal: disponibilidade/condição do ar principal.\n• Confirmações: temperaturas A/B, geração de vapor e circulação aparente.\n• Sinal de degradação: perda térmica do catcooler após queda de aeração.\n• Erro comum: olhar somente vazão de ar sem correlacionar o efeito no processo."}, "arj3982": {"title": "AR proveniente do J-3982", "tag": "AR J-3982", "category": "air", "function": "O ar do J-3982 atua como fonte auxiliar/complementar de aeração do circuito do catcooler. Sua função é oferecer flexibilidade para manter ou ajustar a condição de fluidização/circulação quando necessário.", "process": "A contribuição do J-3982 complementa o ar principal e pode ajudar a estabilizar pontos específicos do circuito. Seu efeito deve ser avaliado pelo comportamento do catalisador, temperaturas dos ramos e resposta térmica do sistema.", "impact": "⚠️ INDISPONIBILIDADE: reduz a margem operacional e a capacidade de correção fina da aeração.\n\n⚠️ USO DESBALANCEADO ENTRE RAMOS: pode contribuir para diferenças de circulação e de remoção térmica.\n\nA atuação deve ser coordenada com o ar principal e com a condição real dos catcoolers.", "formula": "Função hidráulica de aeração.\n\nRelação qualitativa:\naeração adequada → maior mobilidade do sólido → melhor capacidade de circulação\n\nNão existe reação química específica obrigatória associada à função do J-3982.", "obs": "NO CIC — utilizar tendência e comparação entre os dois catcoolers. Se um ramo perder desempenho, verificar se a condição de aeração auxiliar é coerente antes de atribuir o desvio somente à troca térmica.\n\nESTRUTURA DE LEITURA NO CIC:\n• Variável principal: condição do ar auxiliar.\n• Confirmações: equilíbrio entre ramos e desempenho térmico.\n• Sinal de degradação: perda de flexibilidade para corrigir assimetria/aeração.\n• Erro comum: usar o ar auxiliar para mascarar um problema de circulação sem diagnóstico."}, "v12emerg": {"title": "V-12 Emergência", "tag": "V-12 EMERG.", "category": "steam", "function": "O V-12 de emergência é uma utilidade de contingência destinada a preservar condições mínimas de aeração/purga ou suporte ao circuito quando a fonte normal não estiver disponível, conforme a lógica e o procedimento da unidade.", "process": "Por ser vapor, ele fornece fluxo gasoso sem depender do sistema normal de ar. Em uma contingência pode ajudar a manter passagens desobstruídas, reduzir acomodação de catalisador e preservar uma condição mais favorável para parada ou recuperação.", "impact": "⚠️ Não deve ser interpretado como substituto permanente do ar normal.\n\n⚠️ Sua entrada altera o balanço de massa e energia do sistema e deve seguir a sequência operacional prevista.\n\n⚠️ Falha de disponibilidade em uma emergência reduz a margem de proteção operacional.", "formula": "Energia transportada pelo vapor:\nQ = ṁ_vapor · Δh\n\nPara vapor superaquecido/saturado, Δh deve ser obtido pelas propriedades termodinâmicas correspondentes.", "obs": "NO CIC — em cenário de perda de ar, confirmar disponibilidade, pressão e resposta do V-12 de emergência conforme procedimento. O objetivo é proteção/contingência, não maximização de remoção de calor.\n\nESTRUTURA DE LEITURA NO CIC:\n• Variável principal: disponibilidade da utilidade de emergência.\n• Confirmações: pressão, resposta do circuito e condição de contingência.\n• Sinal de degradação: incapacidade de manter condição mínima de suporte quando requerido.\n• Erro comum: tratar V-12 como substituto permanente do ar normal."}, "hbflevel": {"title": "Controle de nível do HBF para o F-3982", "tag": "LIC/FIC HBF → F-3982", "category": "control", "function": "A malha de nível mantém o inventário de água do F-3982 ajustando a vazão de HBF. A tela também mostra a diferença entre HBF e vapor gerado, o que permite ao operador avaliar o balanço instantâneo do drum.", "process": "Em um controle simples, o LIC corrige a vazão de HBF conforme o desvio de nível. Em estratégias do tipo três elementos, comuns em steam drums, o nível é combinado com as vazões de vapor e água de alimentação: a diferença entre vapor gerado e HBF antecipa a necessidade de correção, enquanto o LIC elimina o erro de inventário. A tela sugere esse acompanhamento por exibir ΔHBF − vapor gerado; a lógica exata deve ser confirmada no diagrama de controle da unidade.", "impact": "⚠️ SWELL: aumento de ebulição pode elevar temporariamente o nível indicado mesmo com tendência de perda de massa.\n\n⚠️ SHRINK: redução de ebulição pode fazer o nível indicado cair temporariamente.\n\n⚠️ Correções agressivas baseadas apenas no LIC podem amplificar a oscilação de nível.\n\n⚠️ Grande diferença sustentada entre HBF e vapor gerado implica tendência de mudança do inventário, salvo outras entradas/saídas.", "formula": "Balanço de massa:\ndM/dt = F_HBF − F_vapor − F_purgas\n\nFeedforward conceitual:\nF_HBF alvo ≈ F_vapor + correção do LIC\n\nSe F_HBF > F_vapor + purgas → inventário tende a subir\nSe F_HBF < F_vapor + purgas → inventário tende a cair", "obs": "NO CIC — observar nível + HBF + vapor gerado + ΔHBF−vapor. Uma divergência curta pode ser dinâmica; uma divergência persistente deve aparecer no inventário. Em variações rápidas de carga, considerar shrink/swell antes de intervir de forma agressiva.\n\nESTRUTURA DE LEITURA NO CIC:\n• Variável principal: nível do F-3982.\n• Confirmações: F_HBF, F_vapor e ΔHBF−vapor.\n• Sinal de degradação: divergência sustentada entre entrada e saída com nível caminhando na mesma direção.\n• Erro comum: correção agressiva baseada apenas no nível durante transientes."}, "xv808": {"title": "XV-808 — fechamento no intertravamento total da GV-3901", "tag": "XV-808", "category": "safety", "function": "A XV-808 é uma válvula de isolamento de segurança associada à GV-3901. No intertravamento total da caldeira, ela fecha automaticamente para separar o sistema e limitar continuidade de fluxo/energia para uma condição em falha.", "process": "O comando de trip total leva a XV-808 à posição segura de fechamento. O isolamento reduz a possibilidade de alimentação indevida, transferência de pressão/energia ou manutenção de uma condição que possa agravar o evento. Depois do trip, qualquer retorno depende da lógica de permissivos e do procedimento de recomposição.", "impact": "⚠️ XV-808 não confirmando fechamento após trip: tratar como falha relevante de barreira e seguir o procedimento de contingência.\n\n⚠️ Reabertura prematura: pode recolocar energia/fluxo no sistema antes de a causa do trip estar eliminada.\n\n⚠️ A indicação de posição deve ser coerente com a resposta das variáveis de processo.", "formula": "Lógica conceitual:\nTRIP TOTAL GV-3901 → comando FECHAR XV-808 → isolamento\n\nFunção de segurança: reduzir propagação do evento.", "obs": "NO CIC — após trip total, confirmar comando e indicação de posição da XV-808 e observar a resposta de pressão/fluxo do sistema. Não considerar o evento encerrado apenas porque o comando foi emitido; é importante confirmar a resposta de campo/posição.\n\nESTRUTURA DE LEITURA NO CIC:\n• Variável principal: comando e posição confirmada da XV-808.\n• Confirmações: resposta de fluxo/pressão após o trip.\n• Sinal de degradação: comando de fechamento sem confirmação coerente de posição/processo.\n• Erro comum: considerar o isolamento concluído apenas porque o comando foi emitido."}};
const STORAGE_KEY="catcoolerConcept_data";
let data=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null")||structuredClone(DEFAULT_DATA);
let currentKey=null,deferredPrompt=null,editing=false;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1700)}
function saveCurrent(){if(!currentKey)return;const d=data[currentKey];d.function=$("#fieldFunction").innerText.trim();d.process=$("#fieldProcess").innerText.trim();d.impact=$("#fieldImpact").innerText.trim();d.formula=$("#fieldFormula").innerText.trim();d.obs=$("#fieldObs").innerText.trim();d.video=$("#videoUrl").value.trim();localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}
function loadFields(d){$("#infoTitle").textContent=d.title;$("#infoTag").textContent=d.tag;$("#infoCat").textContent=d.category.toUpperCase();$("#fieldFunction").innerText=d.function;$("#fieldProcess").innerText=d.process;$("#fieldImpact").innerText=d.impact;$("#fieldFormula").innerText=d.formula;$("#fieldObs").innerText=d.obs;$("#videoUrl").value=d.video||""}
function selectItem(k,h=null){if(currentKey&&currentKey!==k)saveCurrent();currentKey=k;$$(".hotspot").forEach(x=>x.classList.remove("active"));if(h)h.classList.add("active");$("#empty").classList.add("hidden");$("#info").style.display="flex";loadFields(data[k]);editing=false;syncEditable();const p=$("#detailPanel");if(p){p.classList.remove("minimized");p.classList.add("open")}document.body.classList.add("detail-panel-open");renderEquipmentMedia();showStorageEstimate()}
function syncEditable(){$$(".editable").forEach(el=>el.contentEditable=editing?"true":"false");$("#videoUrl").disabled=!editing;$("#editBtn").textContent=editing?"✓ Concluir edição":"✏️ Editar";$("#editState").classList.toggle("show",editing);$("#editModeBanner").classList.toggle("hidden",!editing)}
function toggleEdit(){editing=!editing;syncEditable();toast(editing?"Modo edição ativado":"Edição encerrada")}
function saveCurrentAndExit(){if(!currentKey)return;saveCurrent();editing=false;syncEditable();toast("Alterações salvas neste dispositivo")}
function cancelEdit(){if(!currentKey)return;loadFields(data[currentKey]);editing=false;syncEditable();toast("Alterações não salvas descartadas")}
function restoreCurrent(){if(!currentKey)return;if(!confirm("Restaurar este item para o conteúdo original?"))return;data[currentKey]=JSON.parse(JSON.stringify(DEFAULT_DATA[currentKey]));localStorage.setItem(STORAGE_KEY,JSON.stringify(data));loadFields(data[currentKey]);editing=false;syncEditable();toast("Item restaurado para o conteúdo original")}
function togglePanelMinimize(){const p=$("#detailPanel");if(!p)return;p.classList.toggle("minimized");document.body.classList.toggle("detail-panel-open",!p.classList.contains("minimized")&&p.classList.contains("open"))}
function minimize(){if(currentKey)saveCurrent();currentKey=null;editing=false;syncEditable();$("#info").style.display="none";$("#empty").classList.remove("hidden");$$(".hotspot").forEach(x=>x.classList.remove("active"));const p=$("#detailPanel");if(p){p.classList.remove("open","minimized")}document.body.classList.remove("detail-panel-open");clearMediaObjectUrls();closeVideoPreview()}
function exportJSON(){if(currentKey)saveCurrent();const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="catcooler-concept-u39-dados.json";a.click();URL.revokeObjectURL(a.href)}
function importJSON(ev){const f=ev.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{data=JSON.parse(r.result);localStorage.setItem(STORAGE_KEY,JSON.stringify(data));toast("Dados importados");if(currentKey)selectItem(currentKey,document.querySelector(`.hotspot[data-key="${currentKey}"]`))}catch(e){alert("Arquivo JSON inválido.")}};r.readAsText(f);ev.target.value=""}
function resetAll(){if(!confirm("Restaurar o conteúdo padrão e apagar as edições locais?"))return;data=structuredClone(DEFAULT_DATA);localStorage.setItem(STORAGE_KEY,JSON.stringify(data));minimize();toast("Conteúdo restaurado")}
function filterCategory(c){$$(".hotspot").forEach(h=>h.classList.toggle("hidden",c!=="all"&&h.dataset.category!==c));$$(".chip").forEach(ch=>ch.classList.toggle("active",ch.dataset.filter===c))}
function searchTag(){const q=$("#search").value.trim().toLowerCase();if(!q)return;const hit=Object.entries(data).find(([k,v])=>[v.tag,v.title,v.function,v.process,v.impact,v.obs].filter(Boolean).join(" ").toLowerCase().includes(q));if(hit){const h=document.querySelector(`.hotspot[data-key="${hit[0]}"]`);filterCategory("all");selectItem(hit[0],h);toast(`Encontrado: ${hit[1].tag}`)}else toast("Nenhum ponto encontrado para essa busca")}
function openVideo(){const url=$("#videoUrl").value.trim();if(!url)return toast("Informe uma URL de vídeo");window.open(url,"_blank","noopener")}

// =========================================================
// V2.1 — Armazenamento local de vídeos e arquivos (IndexedDB)
// =========================================================
const MEDIA_DB_NAME='catcoolerConceptMediaDB';
const MEDIA_DB_VERSION=1;
const MEDIA_STORE='media';
let mediaObjectUrls=[];

function openMediaDB(){
  return new Promise((resolve,reject)=>{
    if(!('indexedDB' in window)){reject(new Error('IndexedDB indisponível'));return}
    const req=indexedDB.open(MEDIA_DB_NAME,MEDIA_DB_VERSION);
    req.onupgradeneeded=()=>{
      const db=req.result;
      if(!db.objectStoreNames.contains(MEDIA_STORE)){
        const store=db.createObjectStore(MEDIA_STORE,{keyPath:'id',autoIncrement:true});
        store.createIndex('equipmentKey','equipmentKey',{unique:false});
        store.createIndex('kind','kind',{unique:false});
      }
    };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
}
function mediaTx(mode='readonly'){
  return openMediaDB().then(db=>{
    const tx=db.transaction(MEDIA_STORE,mode);
    return {db,tx,store:tx.objectStore(MEDIA_STORE)};
  });
}
async function addMediaRecord(record){
  const {db,tx,store}=await mediaTx('readwrite');
  return new Promise((resolve,reject)=>{
    const req=store.add(record);
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
    tx.oncomplete=()=>db.close();
  });
}
async function getMediaByEquipment(key){
  const {db,tx,store}=await mediaTx('readonly');
  return new Promise((resolve,reject)=>{
    const idx=store.index('equipmentKey');
    const req=idx.getAll(IDBKeyRange.only(key));
    req.onsuccess=()=>resolve(req.result||[]);
    req.onerror=()=>reject(req.error);
    tx.oncomplete=()=>db.close();
  });
}
async function getMediaRecord(id){
  const {db,tx,store}=await mediaTx('readonly');
  return new Promise((resolve,reject)=>{
    const req=store.get(Number(id));
    req.onsuccess=()=>resolve(req.result||null);
    req.onerror=()=>reject(req.error);
    tx.oncomplete=()=>db.close();
  });
}
async function deleteMediaRecord(id){
  const {db,tx,store}=await mediaTx('readwrite');
  return new Promise((resolve,reject)=>{
    const req=store.delete(Number(id));
    req.onsuccess=()=>resolve();
    req.onerror=()=>reject(req.error);
    tx.oncomplete=()=>db.close();
  });
}
function formatBytes(bytes){
  if(!Number.isFinite(bytes)||bytes<=0)return '0 B';
  const units=['B','KB','MB','GB'];let i=0,n=bytes;
  while(n>=1024&&i<units.length-1){n/=1024;i++}
  return `${n>=10||i===0?n.toFixed(0):n.toFixed(1)} ${units[i]}`;
}
function escapeMediaHtml(s){
  return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function clearMediaObjectUrls(){
  mediaObjectUrls.forEach(u=>{try{URL.revokeObjectURL(u)}catch(e){}});
  mediaObjectUrls=[];
}
async function saveMediaFiles(ev,kind){
  if(!currentKey){toast('Selecione primeiro uma lâmpada/equipamento');ev.target.value='';return}
  const files=[...(ev.target.files||[])];
  if(!files.length)return;
  let saved=0,skipped=0;
  for(const file of files){
    const max=kind==='video'?250*1024*1024:100*1024*1024;
    if(file.size>max){skipped++;continue}
    await addMediaRecord({
      equipmentKey:currentKey,kind,name:file.name,type:file.type||'application/octet-stream',
      size:file.size,addedAt:new Date().toISOString(),blob:file
    });
    saved++;
  }
  ev.target.value='';
  await renderEquipmentMedia();
  if(saved)toast(`${saved} ${kind==='video'?'vídeo(s)':'arquivo(s)'} adicionado(s)`);
  if(skipped)alert(`${skipped} item(ns) não foram salvos porque excedem o limite local (${kind==='video'?'250 MB por vídeo':'100 MB por arquivo'}).`);
}

async function renderEquipmentMedia(){
  const videoList=document.getElementById('videoFileList');
  const fileList=document.getElementById('attachmentList');
  const preview=document.getElementById('videoPreview');
  if(!videoList||!fileList||!preview)return;

  clearMediaObjectUrls();
  preview.innerHTML='';
  preview.classList.add('hidden');

  if(!currentKey){
    videoList.innerHTML='';
    fileList.innerHTML='';
    return;
  }

  try{
    const all=await getMediaByEquipment(currentKey);
    const videos=all.filter(x=>x.kind==='video').sort((a,b)=>String(b.addedAt).localeCompare(String(a.addedAt)));
    const files=all.filter(x=>x.kind==='file').sort((a,b)=>String(b.addedAt).localeCompare(String(a.addedAt)));

    videoList.innerHTML = videos.length
      ? '<div class="inline-media-grid">'+videos.map(inlineVideoHtml).join('')+'</div>'
      : '<div class="media-local-note">Nenhum vídeo local adicionado neste ponto.</div>';

    fileList.innerHTML = files.length
      ? '<div class="inline-media-stack">'+files.map(inlineFileHtml).join('')+'</div>'
      : '<div class="media-local-note">Nenhum arquivo local adicionado neste ponto.</div>';

    for(const item of videos) await hydrateInlineMedia(item);
    for(const item of files) await hydrateInlineMedia(item);

  }catch(err){
    videoList.innerHTML='<div class="media-local-note">Armazenamento local indisponível neste navegador.</div>';
    fileList.innerHTML='<div class="media-local-note">Armazenamento local indisponível neste navegador.</div>';
  }
}

function inlineVideoHtml(item){
  const date=item.addedAt?new Date(item.addedAt).toLocaleString('pt-BR'):'';
  return `<article class="inline-media-card" id="media-${item.id}">
    <div class="inline-media-head">
      <div class="media-file-main">
        <span class="media-file-name">${escapeMediaHtml(item.name)}</span>
        <div class="media-file-meta">${escapeMediaHtml(item.type||'vídeo')} • ${formatBytes(item.size)} • ${escapeMediaHtml(date)}</div>
      </div>
      <div class="media-file-actions">
        <button class="media-mini-btn" onclick="downloadStoredMedia(${item.id})">Baixar</button>
        <button class="media-mini-btn delete" onclick="removeStoredMedia(${item.id})">Excluir</button>
      </div>
    </div>
    <div class="inline-preview" id="media-preview-${item.id}">
      <div class="media-loading">Carregando vídeo…</div>
    </div>
  </article>`;
}

function inlineFileHtml(item){
  const date=item.addedAt?new Date(item.addedAt).toLocaleString('pt-BR'):'';
  return `<article class="inline-media-card" id="media-${item.id}">
    <div class="inline-media-head">
      <div class="media-file-main">
        <span class="media-file-name">${escapeMediaHtml(item.name)}</span>
        <div class="media-file-meta">${escapeMediaHtml(item.type||'arquivo')} • ${formatBytes(item.size)} • ${escapeMediaHtml(date)}</div>
      </div>
      <div class="media-file-actions">
        <button class="media-mini-btn" onclick="downloadStoredMedia(${item.id})">Baixar</button>
        <button class="media-mini-btn delete" onclick="removeStoredMedia(${item.id})">Excluir</button>
      </div>
    </div>
    <div class="inline-preview" id="media-preview-${item.id}">
      <div class="media-loading">Preparando visualização…</div>
    </div>
  </article>`;
}

async function hydrateInlineMedia(item){
  const target=document.getElementById(`media-preview-${item.id}`);
  if(!target)return;

  const type=(item.type||'').toLowerCase();
  const name=(item.name||'').toLowerCase();

  if(item.kind==='video' || type.startsWith('video/')){
    const url=URL.createObjectURL(item.blob);mediaObjectUrls.push(url);
    target.innerHTML=`<video class="inline-video" controls playsinline preload="metadata" src="${url}"></video>`;
    return;
  }

  if(type.startsWith('image/') || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(name)){
    const url=URL.createObjectURL(item.blob);mediaObjectUrls.push(url);
    target.innerHTML=`<img class="inline-image" src="${url}" alt="${escapeMediaHtml(item.name)}">`;
    return;
  }

  if(type==='application/pdf' || name.endsWith('.pdf')){
    const url=URL.createObjectURL(item.blob);mediaObjectUrls.push(url);
    target.innerHTML=`<iframe class="inline-pdf" src="${url}#toolbar=1&navpanes=0" title="${escapeMediaHtml(item.name)}"></iframe>`;
    return;
  }

  if(type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|aac)$/i.test(name)){
    const url=URL.createObjectURL(item.blob);mediaObjectUrls.push(url);
    target.innerHTML=`<audio class="inline-audio" controls preload="metadata" src="${url}"></audio>`;
    return;
  }

  if(type.startsWith('text/') || /(json|csv|xml|javascript)/.test(type) || /\.(txt|csv|json|md|log|xml|js|css|html)$/i.test(name)){
    try{
      const text=await item.blob.text();
      const limited=text.length>25000?text.slice(0,25000)+'\\n\\n[prévia limitada aos primeiros 25.000 caracteres]':text;
      target.innerHTML=`<pre class="inline-text">${escapeMediaHtml(limited)}</pre>`;
    }catch(e){
      target.innerHTML=`<div class="unsupported-preview">Não foi possível gerar a prévia deste texto.</div>`;
    }
    return;
  }

  const office = /\.(docx?|xlsx?|pptx?|xlsm|ods|odt|odp)$/i.test(name);
  if(office){
    target.innerHTML=`<div class="office-preview">
      <div class="office-preview-icon">📄</div>
      <div><strong>${escapeMediaHtml(item.name)}</strong><br>
      <span>Arquivo Office anexado. O navegador não consegue renderizar este formato localmente dentro do painel.</span></div>
    </div>`;
    return;
  }

  target.innerHTML=`<div class="unsupported-preview">
    📎 ${escapeMediaHtml(item.name)} já está anexado a este ponto. Prévia interna não disponível para este formato.
  </div>`;
}

async function openStoredMedia(id){
  const el=document.getElementById(`media-${id}`);
  if(el)el.scrollIntoView({behavior:'smooth',block:'center'});
}

function closeVideoPreview(){
  const p=document.getElementById('videoPreview');
  if(p){p.innerHTML='';p.classList.add('hidden')}
}

async function downloadStoredMedia(id){
  const item=await getMediaRecord(id);if(!item)return;
  const url=URL.createObjectURL(item.blob);
  const a=document.createElement('a');a.href=url;a.download=item.name||'arquivo';document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),2500);
}

async function removeStoredMedia(id){
  const item=await getMediaRecord(id);
  if(!item)return;
  if(!confirm(`Excluir "${item.name}" deste dispositivo?`))return;
  await deleteMediaRecord(id);
  await renderEquipmentMedia();
  toast('Arquivo removido');
}
async function showStorageEstimate(){
  if(!navigator.storage?.estimate)return;
  const est=await navigator.storage.estimate();
  const pct=est.quota?Math.min(100,Math.round((est.usage||0)/est.quota*100)):0;
  const el=document.getElementById('mediaStorageEstimate');
  if(el)el.innerHTML=`Uso local aproximado: ${formatBytes(est.usage||0)} de ${formatBytes(est.quota||0)}<div class="storage-meter"><span style="width:${pct}%"></span></div>`;
}

const quiz=[
{
q:"Durante a operação do sistema Catcooler, qual descrição representa melhor a função do F-3982?",
a:[
{t:"Regular a circulação de catalisador entre o D-3904 e os catcoolers, usando o nível como variável principal.",f:"A circulação de catalisador está associada ao circuito dos catcoolers; o F-3982 atua no circuito de água/vapor, não como regulador direto da circulação de catalisador."},
{t:"Separar a mistura água-vapor, manter inventário de água e fornecer volume para geração estável de vapor.",f:"O F-3982 funciona como tubulão do circuito de geração de vapor, separando água e vapor e mantendo o inventário necessário ao sistema."},
{t:"Controlar a pressão do HBF antes dos catcoolers e isolar automaticamente a GV-3901 em qualquer desvio.",f:"O HBF alimenta o circuito e existem elementos de proteção específicos; a função principal do F-3982 não é atuar como válvula de isolamento nem como controlador primário de pressão."},
{t:"Resfriar diretamente os gases do regenerador e condensar o vapor antes do retorno ao circuito de água.",f:"A remoção de calor ocorre principalmente pela troca térmica associada ao catalisador nos catcoolers; o F-3982 não é um condensador de gases do regenerador."}
],c:1
},
{
q:"Qual alternativa descreve com maior precisão a função conjunta dos C-3901A e C-3901B?",
a:[
{t:"Transferir calor do circuito de água para o catalisador, elevando sua temperatura antes do retorno ao D-3904.",f:"O sentido térmico esperado é o oposto: o catalisador quente cede calor ao circuito de água/vapor."},
{t:"Atuar principalmente como vasos de separação, retirando vapor da água antes do retorno ao F-3982.",f:"A separação água-vapor é função do tubulão F-3982; os C-3901A/B são os equipamentos de remoção de calor."},
{t:"Remover calor do catalisador associado ao D-3904 e transferi-lo ao circuito de água para geração de vapor.",f:"Essa é a função central dos catcoolers: retirar energia térmica do sistema do regenerador e recuperá-la na geração de vapor."},
{t:"Controlar diretamente o nível do F-3982 por variação da pressão de ar proveniente do J-3982.",f:"O nível é controlado pelo balanço de água/vapor; os catcoolers influenciam a carga térmica, mas não são o elemento direto de controle de nível."}
],c:2
},
{
q:"Se a PV do TIC-39031 permanecer acima do SP e o restante do sistema estiver disponível, qual resposta é coerente com a finalidade desse controle?",
a:[
{t:"Reduzir a remoção de calor para aumentar gradualmente a temperatura até que a PV se aproxime do SP.",f:"Com a PV acima do SP, reduzir a remoção de calor tenderia a agravar o desvio de temperatura."},
{t:"Manter a remoção de calor constante e corrigir o desvio apenas aumentando a vazão de HBF para o F-3982.",f:"A vazão de HBF participa do balanço do tubulão, mas não substitui a ação térmica esperada do controle de temperatura."},
{t:"Transferir o controle para o V-12 de emergência, mantendo inalterada a atuação normal dos catcoolers.",f:"O V-12 de emergência é uma utilidade de contingência e não é a resposta normal do controlador de temperatura."},
{t:"Aumentar a remoção de calor do sistema, de modo a conduzir a PV de volta em direção ao SP.",f:"Quando a temperatura medida está acima do valor desejado, a ação coerente é aumentar a remoção de calor, respeitando a lógica e os limites reais da unidade."}
],c:3
},
{
q:"Considerando as funções descritas para as duas fontes de ar, qual relação entre J-3901 e J-3982 é a mais adequada?",
a:[
{t:"O J-3901 fornece o ar principal de suporte, enquanto o J-3982 atua como fonte auxiliar ou complementar para ajuste operacional.",f:"Essa relação representa o papel principal/complementar adotado no material da one page."},
{t:"O J-3982 fornece o ar principal de suporte e o J-3901 deve ser usado somente quando houver indisponibilidade do primeiro.",f:"Essa alternativa inverte os papéis definidos no material de treinamento."},
{t:"Os dois sistemas devem operar sempre com a mesma vazão, pois qualquer diferença entre eles indica falha de controle.",f:"Fontes principal e auxiliar não precisam ter vazões idênticas; suas funções e necessidades operacionais podem ser diferentes."},
{t:"O J-3901 atua apenas na partida e o J-3982 assume integralmente a aeração durante a operação normal.",f:"O conteúdo da one page não define o J-3901 apenas como ar de partida nem o J-3982 como substituto integral em operação normal."}
],c:0
},
{
q:"Em uma condição anormal que exija suporte de utilidade, qual uso está mais alinhado à função do V-12 de emergência?",
a:[
{t:"Assumir continuamente a função normal do ar do J-3901 durante toda a campanha da unidade.",f:"O V-12 é uma utilidade de contingência e não deve ser interpretado como substituto contínuo da fonte normal de ar."},
{t:"Auxiliar em purga, suporte temporário e preservação de condição operacional durante uma contingência.",f:"Esse é o papel de suporte atribuído ao V-12 de emergência no material da one page."},
{t:"Controlar diretamente o nível do F-3982, aumentando ou reduzindo sua vazão conforme a indicação do LIC.",f:"O controle de nível do tubulão é associado ao balanço de HBF e vapor; o V-12 não é o elemento normal desse controle."},
{t:"Regular a temperatura do D-3904 substituindo a atuação do TIC-39031 sempre que houver desvio de PV.",f:"O V-12 não substitui a malha normal de controle de temperatura; sua função é de contingência/suporte."}
],c:1
},
{
q:"A geração de vapor aumenta rapidamente e o nível indicado do F-3982 sobe momentaneamente. Qual interpretação é mais consistente antes de uma intervenção agressiva no HBF?",
a:[
{t:"Tratar a elevação como ganho real e permanente de massa no tubulão e reduzir imediatamente o HBF ao mínimo.",f:"Uma elevação rápida pode conter componente de swell; agir como se todo o aumento fosse inventário real pode levar a correção excessiva."},
{t:"Assumir falha do transmissor de nível sempre que o vapor gerado aumentar e manter o HBF fixo até estabilizar.",f:"O aumento de vapor pode produzir resposta dinâmica real do nível; não é adequado classificar automaticamente a indicação como falha."},
{t:"Considerar o efeito de swell e avaliar nível, geração de vapor e tendência do controle em conjunto antes de corrigir o inventário.",f:"No tubulão, mudanças rápidas de ebulição podem alterar o nível aparente; a interpretação conjunta evita correções precipitadas."},
{t:"Interpretar a elevação do nível como prova de redução da ebulição e aumentar o HBF para restabelecer a geração de vapor.",f:"O nível aparente pode subir justamente com aumento de ebulição; aumentar HBF sem avaliar o balanço pode agravar o nível alto."}
],c:2
},
{
q:"Qual é o objetivo operacional do fechamento da XV-808 quando ocorre o intertravamento total da GV-3901?",
a:[
{t:"Manter uma passagem mínima para preservar a circulação, reduzindo a abertura para aproximadamente metade do curso.",f:"Em um intertravamento total, a lógica descrita é de isolamento; uma abertura parcial não representa a função de barreira indicada."},
{t:"Redirecionar automaticamente o fluxo para o V-12 de emergência, mantendo o circuito principal conectado.",f:"A XV-808 é tratada como elemento de isolamento, não como válvula de transferência automática para o V-12."},
{t:"Aumentar o inventário do F-3982 antes de parar a geração de vapor, evitando queda de nível durante o evento.",f:"A função de segurança da XV-808 não é elevar o inventário do tubulão, e sim isolar o sistema em condição de trip total."},
{t:"Isolar o sistema para limitar fluxos ou transferências indesejadas e evitar agravamento da condição de falha.",f:"O fechamento da XV-808 funciona como barreira de segurança no intertravamento total da GV-3901."}
],c:3
},
{
q:"No balanço simplificado do F-3982, se a vazão de HBF permanecer menor que a soma da vazão de vapor gerado com as purgas, qual tendência de inventário é esperada?",
a:[
{t:"O inventário tende a aumentar, porque a maior geração de vapor eleva permanentemente a massa retida no tubulão.",f:"Se as saídas de massa superam a entrada, o inventário total tende a cair, mesmo que o nível aparente possa sofrer efeitos transitórios."},
{t:"O inventário tende a diminuir, pois as saídas de massa superam a alimentação de HBF.",f:"Pelo balanço dM/dt = F_HBF − F_vapor − F_purgas, uma soma de saídas maior que a entrada produz tendência negativa de inventário."},
{t:"O inventário permanece constante, porque a mudança de fase não altera o balanço global de massa do sistema.",f:"A mudança de fase não cria massa; porém, se a vazão que sai supera a que entra, o inventário não permanece constante."},
{t:"A tendência do inventário depende somente da temperatura do TIC-39031, independentemente das vazões de entrada e saída.",f:"A temperatura influencia a geração de vapor, mas o inventário é determinado pelo balanço de massa entre entradas e saídas."}
],c:1
},
{
q:"Mantendo aproximadamente constantes a vazão de catalisador e o seu Cp, o que indica um aumento do ΔT do catalisador através do catcooler?",
a:[
{t:"Maior remoção de calor do catalisador, pois Q cresce com ṁ·Cp·ΔT.",f:"Com vazão e Cp aproximadamente constantes, um ΔT maior representa maior quantidade de calor removida do catalisador."},
{t:"Menor remoção de calor, porque um ΔT maior indica menor aproximação térmica entre os dois circuitos.",f:"Na relação Q = ṁ·Cp·ΔT, mantendo os demais termos constantes, Q aumenta com o ΔT."},
{t:"A mesma remoção de calor, porque o ΔT não participa do balanço energético quando existe geração de vapor.",f:"O ΔT do catalisador participa diretamente do balanço de energia e continua relevante mesmo com mudança de fase no lado da água."},
{t:"Apenas aumento de pressão no F-3982, sem relação direta com a energia transferida pelo catcooler.",f:"O ΔT do catalisador é uma medida diretamente relacionada à energia cedida pelo catalisador no trocador."}
],c:0
},
{
q:"Durante uma mesma condição de carga térmica, a temperatura do regenerador começa a subir enquanto a contribuição térmica dos catcoolers diminui. Qual diagnóstico inicial é mais coerente?",
a:[
{t:"A remoção de calor pelo sistema pode estar insuficiente, devendo-se avaliar circulação, troca térmica e variáveis associadas ao catcooler.",f:"Se a carga térmica permanece semelhante e a temperatura sobe com menor contribuição dos catcoolers, a hipótese de remoção de calor insuficiente é coerente."},
{t:"A remoção de calor provavelmente aumentou além do necessário, sendo esperado que a temperatura do regenerador também aumente.",f:"Maior remoção de calor tenderia a reduzir, e não elevar, a temperatura para a mesma carga térmica."},
{t:"O comportamento comprova nível excessivamente alto no F-3982, mesmo sem observar a tendência do LIC ou da geração de vapor.",f:"A temperatura do regenerador isoladamente não comprova nível alto no tubulão; é preciso correlacionar as variáveis."},
{t:"O comportamento indica necessariamente excesso de ar do J-3982, independentemente da circulação de catalisador e da troca térmica.",f:"Uma única tendência não permite concluir necessariamente excesso de ar auxiliar; a avaliação deve considerar o conjunto das variáveis."}
],c:0
},
{
q:"Após aumento rápido da carga térmica, o vapor gerado cresce e o nível do F-3982 sobe, enquanto a diferença HBF−vapor fica momentaneamente negativa. Qual ação de diagnóstico é mais adequada?",
a:[
{t:"Reduzir imediatamente o HBF ao mínimo porque qualquer subida de nível significa excesso real de massa no drum.",f:"O nível pode subir por swell durante aumento de ebulição; reduzir HBF agressivamente sem avaliar o balanço pode provocar perda real de inventário."},
{t:"Avaliar swell, tendência do LIC, HBF, vapor gerado e duração da diferença de vazões antes de concluir que existe excesso de inventário.",f:"A leitura conjunta permite separar uma resposta dinâmica de nível de uma mudança sustentada de massa no tubulão."},
{t:"Desconsiderar a indicação de vapor gerado e controlar apenas pelo nível, pois o balanço de massa não é útil durante transientes.",f:"O balanço HBF-vapor é especialmente útil em transientes, embora precise ser interpretado junto com shrink/swell."},
{t:"Aumentar simultaneamente HBF e V-12 de emergência para compensar a elevação temporária do nível.",f:"O V-12 não é a variável normal de correção de nível, e aumentar HBF durante nível alto sem diagnóstico pode agravar a condição."}
],c:1
},
{
q:"O TIC-39031 apresenta PV acima do SP e grande atuação, porém a geração de vapor dos catcoolers está caindo. Qual hipótese merece prioridade na investigação?",
a:[
{t:"Possível limitação de circulação/troca térmica ou de aeração nos catcoolers, pois o controle pede resfriamento mas a remoção efetiva diminui.",f:"A combinação de alta demanda do controlador com queda de remoção térmica sugere limitação de processo/equipamento."},
{t:"Erro inevitável de sintonia do TIC-39031, porque qualquer MV alta comprova que o controlador está mal ajustado.",f:"MV alta pode ser resposta correta a uma limitação física; não comprova problema de sintonia."},
{t:"Excesso de HBF como causa única, independentemente das temperaturas dos ramos A/B e das condições de aeração.",f:"A vazão de água influencia o drum, mas a perda de remoção térmica deve ser correlacionada com circulação, aeração e desempenho dos dois ramos."},
{t:"Falha obrigatória do transmissor de temperatura, pois PV acima do SP não pode coexistir com queda de vapor gerado.",f:"Essas duas tendências podem coexistir se os catcoolers perderem capacidade de remover calor."}
],c:0
},
{
q:"Após perda do AR J-3901, qual conjunto de tendências é mais coerente com uma possível deterioração da circulação de catalisador pelos catcoolers?",
a:[
{t:"Queda da capacidade de remoção de calor, alterações nas temperaturas dos ramos e possível redução da geração de vapor.",f:"A perda de aeração pode prejudicar mobilidade/circulação e reduzir a transferência térmica para o circuito de vapor."},
{t:"Aumento obrigatório e imediato do nível do F-3982, sem qualquer mudança térmica nos catcoolers.",f:"O nível do drum não é uma assinatura única da perda de aeração; a resposta mais direta tende a aparecer na circulação e na troca térmica."},
{t:"Aumento garantido da remoção de calor, porque menos ar reduz a resistência ao escoamento do catalisador.",f:"Menor aeração tende a prejudicar, e não garantir melhora, da mobilidade do catalisador."},
{t:"Nenhuma mudança no sistema, pois o ar J-3901 não interfere na mobilidade do catalisador.",f:"No material do treinamento, o J-3901 é justamente a principal fonte de aeração/fluidização do circuito."}
],c:0
},
{
q:"Em um trip total da GV-3901, o comando de fechamento da XV-808 foi emitido, mas a indicação de posição não confirma fechamento. Qual interpretação é mais adequada?",
a:[
{t:"A lógica de segurança cumpriu totalmente sua função, pois o comando é suficiente mesmo sem confirmação de posição.",f:"Uma barreira de isolamento precisa de resposta efetiva; ausência de confirmação deve ser tratada como condição relevante."},
{t:"A falha pode ser ignorada se o nível do F-3982 estiver normal, porque o nível confirma indiretamente o fechamento da válvula.",f:"Nível normal não comprova a posição física da XV-808 nem substitui sua indicação/checagem."},
{t:"Deve-se tratar como possível falha da barreira de isolamento, confirmar a condição por indicação/resultado de processo e seguir o procedimento de contingência.",f:"A ausência de confirmação de fechamento exige verificação da resposta real do sistema e tratamento conforme o procedimento."},
{t:"A válvula deve ser reaberta e comandada novamente para testar o curso, independentemente da causa do trip.",f:"Reabrir durante um trip pode recolocar energia/fluxo antes de a condição segura estar estabelecida."}
],c:2
},
{
q:"C-3901A e C-3901B passam a apresentar respostas térmicas muito diferentes sob a mesma condição geral do regenerador. Qual abordagem de diagnóstico é mais consistente?",
a:[
{t:"Considerar a diferença normal e ajustar somente o setpoint do TIC-39031 até que os dois lados apresentem a mesma temperatura.",f:"Uma assimetria persistente pode sinalizar diferenças de circulação/aeração/desempenho e não deve ser mascarada apenas por alteração do SP."},
{t:"Comparar aeração, temperaturas, circulação aparente e contribuição térmica dos dois ramos antes de concluir falha de medição ou de troca térmica.",f:"A comparação sistemática entre A e B ajuda a separar problema de instrumentação, aeração, circulação e capacidade térmica."},
{t:"Concluir que o F-3982 está em nível alto, porque assimetria de catcooler é consequência direta e exclusiva do nível do drum.",f:"O nível do drum pode influenciar o circuito de vapor, mas não é causa exclusiva de assimetria entre os dois ramos."},
{t:"Aumentar o V-12 de emergência nos dois lados até igualar as temperaturas, mesmo sem perda de ar normal.",f:"O V-12 é utilidade de contingência e não deve ser usado como ajuste rotineiro para mascarar uma assimetria sem diagnóstico."}
],c:1
}
];

let quizRender=[];

function shuffledOptions(item){
  const arr=item.a.map((opt,idx)=>({opt,originalIndex:idx}));
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function openQuiz(){
  const box=$("#quizBody");
  box.innerHTML="";
  quizRender=quiz.map((item,i)=>({item,shown:shuffledOptions(item)}));
  quizRender.forEach(({item,shown},i)=>{
    const div=document.createElement("div");
    div.className="q";
    div.dataset.qindex=i;
    div.innerHTML=`<h4>${i+1}. ${item.q}</h4>`+
      shown.map((entry,j)=>`<label><input type="radio" name="q${i}" value="${entry.originalIndex}"> <span class="option-letter">${String.fromCharCode(65+j)}</span> ${entry.opt.t}</label>`).join("")+
      `<div class="qfeedback hidden" id="qfb${i}"></div>`;
    box.appendChild(div);
  });
  const r=$("#quizResult");
  r.classList.add("hidden");
  r.textContent="";
  $("#quizDrawer").classList.add("open");
}

function gradeQuiz(){
  let score=0, answered=0;
  quizRender.forEach(({item,shown},i)=>{
    const card=document.querySelector(`.q[data-qindex="${i}"]`);
    const selected=document.querySelector(`input[name="q${i}"]:checked`);
    const fb=$("#qfb"+i);
    card.querySelectorAll("label").forEach(l=>l.classList.remove("answer-correct","answer-wrong"));
    if(!selected){
      fb.textContent="Questão não respondida.";
      fb.className="qfeedback unanswered";
      return;
    }
    answered++;
    const chosen=+selected.value;
    const isCorrect=chosen===item.c;
    if(isCorrect)score++;
    const selectedLabel=selected.closest("label");
    selectedLabel.classList.add(isCorrect?"answer-correct":"answer-wrong");
    const correctRadio=[...card.querySelectorAll('input[type="radio"]')].find(r=>+r.value===item.c);
    if(correctRadio)correctRadio.closest("label").classList.add("answer-correct");
    fb.textContent=item.a[chosen].f;
    fb.className="qfeedback "+(isCorrect?"correct":"wrong");
  });

  const pct=Math.round((score/quiz.length)*100);
  const omitted=quiz.length-answered;
  let level=pct>=90?"Excelente domínio":pct>=75?"Bom domínio":pct>=60?"Domínio parcial":"Revisão recomendada";
  const r=$("#quizResult");
  r.innerHTML=`<strong>${score}/${quiz.length} acertos — ${pct}%</strong><br>${level}${omitted?` • ${omitted} não respondida(s)`:''}`;
  r.classList.remove("hidden");
}


const TRAIN_QUESTION_BANK = [{"id": "q01", "level": "basico", "skill": "Processo térmico", "equipment": "f3982", "topic": "F-3982", "q": "Qual é a função central do F-3982?", "a": ["Substituir o V-12 de emergência", "Controlar sozinho a temperatura do regenerador", "Separar água e vapor e manter inventário do circuito", "Regular diretamente a circulação de catalisador"], "c": 2, "explanation": "O F-3982 é o steam drum: separa a mistura água-vapor e mantém o inventário necessário ao circuito."}, {"id": "q02", "level": "operacional", "skill": "Processo térmico", "equipment": "f3982", "topic": "F-3982", "q": "Durante operação estável, qual descrição melhor explica por que o F-3982 é essencial ao circuito?", "a": ["Controlar sozinho a temperatura do regenerador", "Separar água e vapor e manter inventário do circuito", "Regular diretamente a circulação de catalisador", "Substituir o V-12 de emergência"], "c": 1, "explanation": "O F-3982 é o steam drum: separa a mistura água-vapor e mantém o inventário necessário ao circuito."}, {"id": "q03", "level": "avancado", "skill": "Processo térmico", "equipment": "f3982", "topic": "F-3982", "q": "Ao analisar simultaneamente geração de vapor e estabilidade de inventário, qual papel do F-3982 conecta esses dois comportamentos?", "a": ["Separar água e vapor e manter inventário do circuito", "Regular diretamente a circulação de catalisador", "Substituir o V-12 de emergência", "Controlar sozinho a temperatura do regenerador"], "c": 0, "explanation": "O F-3982 é o steam drum: separa a mistura água-vapor e mantém o inventário necessário ao circuito."}, {"id": "q04", "level": "basico", "skill": "Processo térmico", "equipment": "f3982", "topic": "Nível alto", "q": "Qual é um risco típico de nível alto no F-3982?", "a": ["Fechamento obrigatório da XV-808", "Maior risco de arraste de água para a linha de vapor", "Maior garantia de vapor seco", "Perda automática do AR J-3901"], "c": 1, "explanation": "Nível alto reduz o espaço de separação e favorece carryover de gotículas."}, {"id": "q05", "level": "operacional", "skill": "Processo térmico", "equipment": "f3982", "topic": "Nível alto", "q": "O nível permanece alto e estável. Qual consequência operacional merece maior atenção?", "a": ["Maior risco de arraste de água para a linha de vapor", "Maior garantia de vapor seco", "Perda automática do AR J-3901", "Fechamento obrigatório da XV-808"], "c": 0, "explanation": "Nível alto reduz o espaço de separação e favorece carryover de gotículas."}, {"id": "q06", "level": "avancado", "skill": "Processo térmico", "equipment": "f3982", "topic": "Nível alto", "q": "Se o nível do drum sobe e o espaço de separação diminui, qual mecanismo de risco se torna mais relevante?", "a": ["Maior garantia de vapor seco", "Perda automática do AR J-3901", "Fechamento obrigatório da XV-808", "Maior risco de arraste de água para a linha de vapor"], "c": 3, "explanation": "Nível alto reduz o espaço de separação e favorece carryover de gotículas."}, {"id": "q07", "level": "basico", "skill": "Processo térmico", "equipment": "f3982", "topic": "Nível baixo", "q": "Qual é uma consequência importante de nível baixo no F-3982?", "a": ["Redução da reserva hidráulica do circuito", "Aumento garantido da geração de vapor", "Melhora automática da separação", "Aumento automático do ar J-3982"], "c": 0, "explanation": "Menor inventário reduz a margem hidráulica e pode comprometer a condição térmica do circuito."}, {"id": "q08", "level": "operacional", "skill": "Processo térmico", "equipment": "f3982", "topic": "Nível baixo", "q": "Com nível baixo persistente, qual preocupação deve entrar na avaliação do operador?", "a": ["Aumento garantido da geração de vapor", "Melhora automática da separação", "Aumento automático do ar J-3982", "Redução da reserva hidráulica do circuito"], "c": 3, "explanation": "Menor inventário reduz a margem hidráulica e pode comprometer a condição térmica do circuito."}, {"id": "q09", "level": "avancado", "skill": "Processo térmico", "equipment": "f3982", "topic": "Nível baixo", "q": "Se o inventário real do drum cai apesar de nível aparente oscilante, qual risco básico aumenta?", "a": ["Melhora automática da separação", "Aumento automático do ar J-3982", "Redução da reserva hidráulica do circuito", "Aumento garantido da geração de vapor"], "c": 2, "explanation": "Menor inventário reduz a margem hidráulica e pode comprometer a condição térmica do circuito."}, {"id": "q10", "level": "basico", "skill": "Controle", "equipment": "hbflevel", "topic": "Balanço HBF-vapor", "q": "Se HBF for maior que vapor + purgas por tempo sustentado, o que tende a ocorrer?", "a": ["Inventário tende a cair", "Inventário fica sempre constante", "Depende somente do TIC-39031", "Inventário tende a subir"], "c": 3, "explanation": "Entrada sustentada maior que saída produz acumulação de massa."}, {"id": "q11", "level": "operacional", "skill": "Controle", "equipment": "hbflevel", "topic": "Balanço HBF-vapor", "q": "Δ(HBF−vapor) permanece positivo e o nível começa a responder lentamente. Qual leitura é coerente?", "a": ["Inventário fica sempre constante", "Depende somente do TIC-39031", "Inventário tende a subir", "Inventário tende a cair"], "c": 2, "explanation": "Entrada sustentada maior que saída produz acumulação de massa."}, {"id": "q12", "level": "avancado", "skill": "Controle", "equipment": "hbflevel", "topic": "Balanço HBF-vapor", "q": "Desconsiderando outras entradas/saídas, qual tendência de inventário decorre de balanço de massa positivo sustentado?", "a": ["Depende somente do TIC-39031", "Inventário tende a subir", "Inventário tende a cair", "Inventário fica sempre constante"], "c": 1, "explanation": "Entrada sustentada maior que saída produz acumulação de massa."}, {"id": "q13", "level": "basico", "skill": "Diagnóstico", "equipment": "hbflevel", "topic": "Swell", "q": "O que caracteriza o swell em um steam drum?", "a": ["Falha obrigatória do transmissor", "Aumento de massa somente por HBF", "Elevação aparente do nível por aumento de ebulição", "Queda aparente do nível por redução de ebulição"], "c": 2, "explanation": "Swell é expansão de bolhas/volume bifásico, podendo elevar o nível indicado sem aumento equivalente de massa."}, {"id": "q14", "level": "operacional", "skill": "Diagnóstico", "equipment": "hbflevel", "topic": "Swell", "q": "Vapor aumenta rapidamente e o nível sobe mesmo com balanço HBF-vapor negativo. Qual fenômeno deve ser considerado?", "a": ["Aumento de massa somente por HBF", "Elevação aparente do nível por aumento de ebulição", "Queda aparente do nível por redução de ebulição", "Falha obrigatória do transmissor"], "c": 1, "explanation": "Swell é expansão de bolhas/volume bifásico, podendo elevar o nível indicado sem aumento equivalente de massa."}, {"id": "q15", "level": "avancado", "skill": "Diagnóstico", "equipment": "hbflevel", "topic": "Swell", "q": "Qual fenômeno explica nível aparente crescente ao mesmo tempo em que o balanço de massa pode estar negativo?", "a": ["Elevação aparente do nível por aumento de ebulição", "Queda aparente do nível por redução de ebulição", "Falha obrigatória do transmissor", "Aumento de massa somente por HBF"], "c": 0, "explanation": "Swell é expansão de bolhas/volume bifásico, podendo elevar o nível indicado sem aumento equivalente de massa."}, {"id": "q16", "level": "basico", "skill": "Diagnóstico", "equipment": "hbflevel", "topic": "Shrink", "q": "O que caracteriza o shrink?", "a": ["Aumento obrigatório de HBF", "Queda aparente do nível após redução de ebulição", "Elevação aparente do nível por aumento de ebulição", "Trip da GV-3901"], "c": 1, "explanation": "Shrink ocorre quando a redução de ebulição colapsa bolhas e reduz o volume aparente da fase líquida."}, {"id": "q17", "level": "operacional", "skill": "Diagnóstico", "equipment": "hbflevel", "topic": "Shrink", "q": "Após queda rápida de vapor, o nível também cai. Qual fenômeno deve ser lembrado?", "a": ["Queda aparente do nível após redução de ebulição", "Elevação aparente do nível por aumento de ebulição", "Trip da GV-3901", "Aumento obrigatório de HBF"], "c": 0, "explanation": "Shrink ocorre quando a redução de ebulição colapsa bolhas e reduz o volume aparente da fase líquida."}, {"id": "q18", "level": "avancado", "skill": "Diagnóstico", "equipment": "hbflevel", "topic": "Shrink", "q": "Qual efeito dinâmico pode fazer o nível cair mais rápido que a mudança real de inventário?", "a": ["Elevação aparente do nível por aumento de ebulição", "Trip da GV-3901", "Aumento obrigatório de HBF", "Queda aparente do nível após redução de ebulição"], "c": 3, "explanation": "Shrink ocorre quando a redução de ebulição colapsa bolhas e reduz o volume aparente da fase líquida."}, {"id": "q19", "level": "basico", "skill": "Processo térmico", "equipment": "c3901ab", "topic": "Catcoolers", "q": "Qual é a função dos C-3901A/B?", "a": ["Remover calor do catalisador e recuperar energia em vapor", "Aquecer o catalisador antes do regenerador", "Condensar o vapor do F-3982", "Controlar diretamente a XV-808"], "c": 0, "explanation": "Os catcoolers retiram calor do catalisador e transferem essa energia ao circuito água-vapor."}, {"id": "q20", "level": "operacional", "skill": "Processo térmico", "equipment": "c3901ab", "topic": "Catcoolers", "q": "Em regime normal, qual contribuição dos catcoolers ajuda a controlar a temperatura do regenerador?", "a": ["Aquecer o catalisador antes do regenerador", "Condensar o vapor do F-3982", "Controlar diretamente a XV-808", "Remover calor do catalisador e recuperar energia em vapor"], "c": 3, "explanation": "Os catcoolers retiram calor do catalisador e transferem essa energia ao circuito água-vapor."}, {"id": "q21", "level": "avancado", "skill": "Processo térmico", "equipment": "c3901ab", "topic": "Catcoolers", "q": "Qual mecanismo conecta o balanço térmico do D-3904 à geração de vapor do F-3982?", "a": ["Condensar o vapor do F-3982", "Controlar diretamente a XV-808", "Remover calor do catalisador e recuperar energia em vapor", "Aquecer o catalisador antes do regenerador"], "c": 2, "explanation": "Os catcoolers retiram calor do catalisador e transferem essa energia ao circuito água-vapor."}, {"id": "q22", "level": "basico", "skill": "Processo térmico", "equipment": "c3901ab", "topic": "Balanço térmico", "q": "Qual relação representa conceitualmente o calor removido do catalisador?", "a": ["Q depende somente do nível do F-3982", "Q independe de ΔT", "Q é definido apenas pelo SP do TIC-39031", "Q depende do produto vazão de catalisador × Cp × ΔT"], "c": 3, "explanation": "Q≈ṁ·Cp·ΔT; alterações opostas em ṁ e ΔT exigem avaliação quantitativa."}, {"id": "q23", "level": "operacional", "skill": "Processo térmico", "equipment": "c3901ab", "topic": "Balanço térmico", "q": "Mantendo Cp constante, quais grandezas do catalisador mais diretamente influenciam Q removido?", "a": ["Q independe de ΔT", "Q é definido apenas pelo SP do TIC-39031", "Q depende do produto vazão de catalisador × Cp × ΔT", "Q depende somente do nível do F-3982"], "c": 2, "explanation": "Q≈ṁ·Cp·ΔT; alterações opostas em ṁ e ΔT exigem avaliação quantitativa."}, {"id": "q24", "level": "avancado", "skill": "Processo térmico", "equipment": "c3901ab", "topic": "Balanço térmico", "q": "Se vazão de catalisador sobe e ΔT cai, por que não é possível afirmar o sentido de Q sem quantificar?", "a": ["Q é definido apenas pelo SP do TIC-39031", "Q depende do produto vazão de catalisador × Cp × ΔT", "Q depende somente do nível do F-3982", "Q independe de ΔT"], "c": 1, "explanation": "Q≈ṁ·Cp·ΔT; alterações opostas em ṁ e ΔT exigem avaliação quantitativa."}, {"id": "q25", "level": "basico", "skill": "Diagnóstico", "equipment": "c3901ab", "topic": "Assimetria A/B", "q": "Qual abordagem é mais útil diante de assimetria persistente A/B?", "a": ["Assumir que o F-3982 é a causa exclusiva", "Aumentar V-12 nos dois lados sem diagnóstico", "Comparar aeração, temperaturas, circulação e instrumentos dos dois ramos", "Alterar apenas o SP geral"], "c": 2, "explanation": "Comparar ramos equivalentes ajuda a localizar instrumentação, aeração, circulação ou troca térmica."}, {"id": "q26", "level": "operacional", "skill": "Diagnóstico", "equipment": "c3901ab", "topic": "Assimetria A/B", "q": "C-3901B perde desempenho e A permanece estável. Qual é a melhor estratégia de diagnóstico?", "a": ["Aumentar V-12 nos dois lados sem diagnóstico", "Comparar aeração, temperaturas, circulação e instrumentos dos dois ramos", "Alterar apenas o SP geral", "Assumir que o F-3982 é a causa exclusiva"], "c": 1, "explanation": "Comparar ramos equivalentes ajuda a localizar instrumentação, aeração, circulação ou troca térmica."}, {"id": "q27", "level": "avancado", "skill": "Diagnóstico", "equipment": "c3901ab", "topic": "Assimetria A/B", "q": "Com resposta desigual a comandos semelhantes, qual comparação reduz melhor a ambiguidade entre falha local e causa comum?", "a": ["Comparar aeração, temperaturas, circulação e instrumentos dos dois ramos", "Alterar apenas o SP geral", "Assumir que o F-3982 é a causa exclusiva", "Aumentar V-12 nos dois lados sem diagnóstico"], "c": 0, "explanation": "Comparar ramos equivalentes ajuda a localizar instrumentação, aeração, circulação ou troca térmica."}, {"id": "q28", "level": "basico", "skill": "Controle", "equipment": "tic39031", "topic": "TIC-39031", "q": "Qual ação conceitual é coerente quando a PV do TIC-39031 está acima do SP?", "a": ["HBF deve ir ao mínimo", "PV acima do SP tende a exigir maior remoção de calor", "PV acima do SP exige menor remoção de calor", "A XV-808 deve abrir"], "c": 1, "explanation": "Se a temperatura está acima do alvo, o sistema deve buscar maior remoção de calor, respeitando limites e lógica real."}, {"id": "q29", "level": "operacional", "skill": "Controle", "equipment": "tic39031", "topic": "TIC-39031", "q": "A temperatura controlada sobe acima do alvo. Qual direção de resposta térmica é esperada?", "a": ["PV acima do SP tende a exigir maior remoção de calor", "PV acima do SP exige menor remoção de calor", "A XV-808 deve abrir", "HBF deve ir ao mínimo"], "c": 0, "explanation": "Se a temperatura está acima do alvo, o sistema deve buscar maior remoção de calor, respeitando limites e lógica real."}, {"id": "q30", "level": "avancado", "skill": "Controle", "equipment": "tic39031", "topic": "TIC-39031", "q": "Considerando o erro PV−SP, qual resposta do processo deve ser solicitada para reduzir o desvio positivo de temperatura?", "a": ["PV acima do SP exige menor remoção de calor", "A XV-808 deve abrir", "HBF deve ir ao mínimo", "PV acima do SP tende a exigir maior remoção de calor"], "c": 3, "explanation": "Se a temperatura está acima do alvo, o sistema deve buscar maior remoção de calor, respeitando limites e lógica real."}, {"id": "q31", "level": "basico", "skill": "Controle", "equipment": "tic39031", "topic": "Saturação da malha", "q": "PV continua alta e MV já está no limite. O que isso pode indicar?", "a": ["Limitação física do processo/atuador deve ser investigada", "A sintonia está obrigatoriamente errada", "O SP está necessariamente incorreto", "O nível do drum é a única causa possível"], "c": 0, "explanation": "MV no limite com erro persistente é assinatura de possível limitação de capacidade, não prova de sintonia ruim."}, {"id": "q32", "level": "operacional", "skill": "Controle", "equipment": "tic39031", "topic": "Saturação da malha", "q": "TIC-39031 pede máxima atuação e o processo responde pouco. Qual hipótese deve ser priorizada?", "a": ["A sintonia está obrigatoriamente errada", "O SP está necessariamente incorreto", "O nível do drum é a única causa possível", "Limitação física do processo/atuador deve ser investigada"], "c": 3, "explanation": "MV no limite com erro persistente é assinatura de possível limitação de capacidade, não prova de sintonia ruim."}, {"id": "q33", "level": "avancado", "skill": "Controle", "equipment": "tic39031", "topic": "Saturação da malha", "q": "Quando o controlador satura sem eliminar o erro, qual conceito ajuda a separar problema de controle de limitação de capacidade?", "a": ["O SP está necessariamente incorreto", "O nível do drum é a única causa possível", "Limitação física do processo/atuador deve ser investigada", "A sintonia está obrigatoriamente errada"], "c": 2, "explanation": "MV no limite com erro persistente é assinatura de possível limitação de capacidade, não prova de sintonia ruim."}, {"id": "q34", "level": "basico", "skill": "Utilidades", "equipment": "arj3901", "topic": "AR J-3901", "q": "Qual é o papel principal do AR J-3901 no material de treinamento?", "a": ["Fonte exclusiva de HBF", "Vapor de emergência", "Válvula de isolamento", "Fonte principal de aeração/fluidização do circuito"], "c": 3, "explanation": "Menor aeração pode prejudicar mobilidade/circulação do catalisador e reduzir troca térmica."}, {"id": "q35", "level": "operacional", "skill": "Utilidades", "equipment": "arj3901", "topic": "AR J-3901", "q": "Após queda do J-3901, qual função do sistema fica diretamente ameaçada?", "a": ["Vapor de emergência", "Válvula de isolamento", "Fonte principal de aeração/fluidização do circuito", "Fonte exclusiva de HBF"], "c": 2, "explanation": "Menor aeração pode prejudicar mobilidade/circulação do catalisador e reduzir troca térmica."}, {"id": "q36", "level": "avancado", "skill": "Utilidades", "equipment": "arj3901", "topic": "AR J-3901", "q": "Qual elo causal torna a perda do J-3901 capaz de reduzir a geração de vapor dos catcoolers?", "a": ["Válvula de isolamento", "Fonte principal de aeração/fluidização do circuito", "Fonte exclusiva de HBF", "Vapor de emergência"], "c": 1, "explanation": "Menor aeração pode prejudicar mobilidade/circulação do catalisador e reduzir troca térmica."}, {"id": "q37", "level": "basico", "skill": "Utilidades", "equipment": "arj3982", "topic": "AR J-3982", "q": "Como o AR J-3982 é classificado no treinamento?", "a": ["Proteção de trip total", "Controle direto do nível", "Fonte auxiliar/complementar de aeração", "Fonte principal de HBF"], "c": 2, "explanation": "O J-3982 fornece flexibilidade de aeração auxiliar; seus limites devem seguir procedimento."}, {"id": "q38", "level": "operacional", "skill": "Utilidades", "equipment": "arj3982", "topic": "AR J-3982", "q": "Se J-3982 fica indisponível, qual capacidade operacional é reduzida?", "a": ["Controle direto do nível", "Fonte auxiliar/complementar de aeração", "Fonte principal de HBF", "Proteção de trip total"], "c": 1, "explanation": "O J-3982 fornece flexibilidade de aeração auxiliar; seus limites devem seguir procedimento."}, {"id": "q39", "level": "avancado", "skill": "Utilidades", "equipment": "arj3982", "topic": "AR J-3982", "q": "Por que o J-3982 deve ser visto como margem de ajuste e não como substituto universal do J-3901?", "a": ["Fonte auxiliar/complementar de aeração", "Fonte principal de HBF", "Proteção de trip total", "Controle direto do nível"], "c": 0, "explanation": "O J-3982 fornece flexibilidade de aeração auxiliar; seus limites devem seguir procedimento."}, {"id": "q40", "level": "basico", "skill": "Utilidades", "equipment": "v12emerg", "topic": "V-12 emergência", "q": "Qual é a função conceitual do V-12 emergência?", "a": ["Controle normal do TIC-39031", "Utilidade de contingência para suporte/purga", "Substituto permanente do ar normal", "Controle de nível do drum"], "c": 1, "explanation": "V-12 é contingência; uso indevido pode mascarar problemas e alterar balanços do sistema."}, {"id": "q41", "level": "operacional", "skill": "Utilidades", "equipment": "v12emerg", "topic": "V-12 emergência", "q": "Em perda de utilidade normal, como o V-12 deve ser interpretado?", "a": ["Utilidade de contingência para suporte/purga", "Substituto permanente do ar normal", "Controle de nível do drum", "Controle normal do TIC-39031"], "c": 0, "explanation": "V-12 é contingência; uso indevido pode mascarar problemas e alterar balanços do sistema."}, {"id": "q42", "level": "avancado", "skill": "Utilidades", "equipment": "v12emerg", "topic": "V-12 emergência", "q": "Qual risco existe ao usar V-12 rotineiramente para mascarar uma deficiência de aeração normal?", "a": ["Substituto permanente do ar normal", "Controle de nível do drum", "Controle normal do TIC-39031", "Utilidade de contingência para suporte/purga"], "c": 3, "explanation": "V-12 é contingência; uso indevido pode mascarar problemas e alterar balanços do sistema."}, {"id": "q43", "level": "basico", "skill": "Segurança", "equipment": "xv808", "topic": "XV-808", "q": "Qual é a função da XV-808 no trip total da GV-3901?", "a": ["Fechar no trip total e ter atuação confirmada", "Abrir para aliviar em qualquer trip", "Permanecer na última posição", "Regular o HBF"], "c": 0, "explanation": "A XV-808 é uma barreira de isolamento; comando sem confirmação não garante atuação efetiva."}, {"id": "q44", "level": "operacional", "skill": "Segurança", "equipment": "xv808", "topic": "XV-808", "q": "Comando de fechamento emitido e posição não confirmada: qual é a leitura correta?", "a": ["Abrir para aliviar em qualquer trip", "Permanecer na última posição", "Regular o HBF", "Fechar no trip total e ter atuação confirmada"], "c": 3, "explanation": "A XV-808 é uma barreira de isolamento; comando sem confirmação não garante atuação efetiva."}, {"id": "q45", "level": "avancado", "skill": "Segurança", "equipment": "xv808", "topic": "XV-808", "q": "Por que comando, indicação de posição e resposta de processo devem ser coerentes após um trip total?", "a": ["Permanecer na última posição", "Regular o HBF", "Fechar no trip total e ter atuação confirmada", "Abrir para aliviar em qualquer trip"], "c": 2, "explanation": "A XV-808 é uma barreira de isolamento; comando sem confirmação não garante atuação efetiva."}, {"id": "q46", "level": "basico", "skill": "Comunicação", "equipment": "geral", "topic": "Passagem de turno", "q": "O que torna uma passagem de turno útil para o catcooler?", "a": ["Informar apenas valores instantâneos", "Informar apenas alarmes", "Informar somente o SP do TIC", "Transmitir tendências, limitações, riscos ativos, ações e pendências"], "c": 3, "explanation": "Uma boa passagem comunica dinâmica, causa provável, ações executadas, condição atual e pontos a vigiar."}, {"id": "q47", "level": "operacional", "skill": "Comunicação", "equipment": "geral", "topic": "Passagem de turno", "q": "Após instabilidade recente, qual informação é mais valiosa ao próximo operador?", "a": ["Informar apenas alarmes", "Informar somente o SP do TIC", "Transmitir tendências, limitações, riscos ativos, ações e pendências", "Informar apenas valores instantâneos"], "c": 2, "explanation": "Uma boa passagem comunica dinâmica, causa provável, ações executadas, condição atual e pontos a vigiar."}, {"id": "q48", "level": "avancado", "skill": "Comunicação", "equipment": "geral", "topic": "Passagem de turno", "q": "Qual conteúdo preserva melhor o raciocínio diagnóstico e reduz risco de recorrência no turno seguinte?", "a": ["Informar somente o SP do TIC", "Transmitir tendências, limitações, riscos ativos, ações e pendências", "Informar apenas valores instantâneos", "Informar apenas alarmes"], "c": 1, "explanation": "Uma boa passagem comunica dinâmica, causa provável, ações executadas, condição atual e pontos a vigiar."}];
const TRAIN_SCENARIOS = [{"id": "s1", "title": "Perda do AR J-3901", "skill": "Utilidades / Diagnóstico", "intro": "O AR J-3901 sofre queda acentuada. Preserve a circulação do catalisador e identifique a consequência térmica.", "steps": [{"q": "Qual é a primeira leitura que mais ajuda a dimensionar o impacto real?", "choices": [{"t": "Correlacionar ar, temperaturas A/B e vapor gerado.", "score": 2, "risk": 0, "fb": "Confirma se a perda de ar já afetou circulação/troca térmica."}, {"t": "Atuar imediatamente no SP do TIC-39031.", "score": 0, "risk": 2, "fb": "Mudar o SP pode mascarar o efeito sem tratar a perda de aeração."}, {"t": "Observar somente o F-3982.", "score": 0, "risk": 2, "fb": "O impacto inicial pode aparecer nos catcoolers."}]}, {"q": "A geração de vapor começa a cair. Qual hipótese ganha força?", "choices": [{"t": "A perda de aeração reduziu circulação e remoção de calor.", "score": 2, "risk": 0, "fb": "A cadeia é coerente com a função do ar principal."}, {"t": "O F-3982 necessariamente está com nível alto.", "score": 0, "risk": 1, "fb": "Nível alto não é a única explicação."}, {"t": "A XV-808 fechou automaticamente.", "score": 0, "risk": 2, "fb": "Não há relação automática entre perda de ar e trip total."}]}, {"q": "O J-3982 está disponível. Como usar essa informação?", "choices": [{"t": "Avaliar suporte auxiliar conforme procedimento e confirmar recuperação pela resposta térmica.", "score": 2, "risk": 0, "fb": "O ar auxiliar pode recuperar margem, mas precisa ser validado pelo processo."}, {"t": "Assumir substituição integral sem acompanhamento.", "score": 0, "risk": 2, "fb": "Não se deve assumir equivalência total."}, {"t": "Aumentar V-12 e J-3982 simultaneamente sem diagnóstico.", "score": 0, "risk": 2, "fb": "Ações simultâneas dificultam identificar causa e efeito."}]}, {"q": "Qual indicador melhor confirma recuperação?", "choices": [{"t": "Estabilização de A/B e recuperação coerente do vapor gerado.", "score": 2, "risk": 0, "fb": "Mostra recuperação de remoção térmica."}, {"t": "Somente a vazão do J-3982.", "score": 0, "risk": 1, "fb": "A utilidade sozinha não prova resposta de processo."}, {"t": "Somente o nível instantâneo do F-3982.", "score": 0, "risk": 1, "fb": "Nível isolado não confirma recuperação térmica."}]}]}, {"id": "s2", "title": "Assimetria C-3901A × C-3901B", "skill": "Diagnóstico", "intro": "O C-3901B passa a remover menos calor que o A.", "steps": [{"q": "Qual comparação inicial é mais valiosa?", "choices": [{"t": "Temperaturas, aeração e resposta térmica A versus B.", "score": 2, "risk": 0, "fb": "Comparar ramos equivalentes ajuda a localizar a origem."}, {"t": "Somente nível do F-3982.", "score": 0, "risk": 1, "fb": "O drum é comum aos dois ramos."}, {"t": "Alterar o SP geral.", "score": 0, "risk": 2, "fb": "Isso pode mascarar a assimetria."}]}, {"q": "A aeração indicada é semelhante, mas B continua pior. Próximo foco?", "choices": [{"t": "Verificar instrumentos, circulação aparente e troca térmica do ramo B.", "score": 2, "risk": 0, "fb": "A diferença pode estar em medição, circulação ou troca local."}, {"t": "Aumentar ar nos dois lados igualmente.", "score": 0, "risk": 1, "fb": "Pode aumentar consumo sem localizar a causa."}, {"t": "Assumir que A está errado.", "score": 0, "risk": 1, "fb": "É preciso evidência antes de escolher qual lado está incorreto."}]}, {"q": "TIC-39031 pede mais remoção, mas B quase não responde. Isso sugere:", "choices": [{"t": "Limitação local no ramo B ou seu elemento de atuação.", "score": 2, "risk": 0, "fb": "Resposta desigual ao comando comum aponta para limitação localizada."}, {"t": "Erro obrigatório de sintonia geral.", "score": 0, "risk": 1, "fb": "Sintonia comum não explica facilmente apenas um ramo."}, {"t": "Swell no F-3982 como causa direta.", "score": 0, "risk": 1, "fb": "Swell afeta nível aparente, não explica sozinho assimetria térmica."}]}, {"q": "Qual critério indica diagnóstico bem sucedido?", "choices": [{"t": "Causa localizada e tendências A/B coerentes após correção.", "score": 2, "risk": 0, "fb": "Conecta causa, ação e resposta."}, {"t": "Temperaturas iguais porque o SP foi alterado.", "score": 0, "risk": 2, "fb": "Pode mascarar a causa."}, {"t": "Desaparecimento temporário de alarme.", "score": 0, "risk": 1, "fb": "Alarme ausente não prova desempenho normal."}]}]}, {"id": "s3", "title": "Queda de vapor + aumento da T do D-3904", "skill": "Processo térmico", "intro": "Com carga semelhante, vapor cai e temperatura do regenerador sobe.", "steps": [{"q": "Qual interpretação inicial é mais coerente?", "choices": [{"t": "A remoção de calor pode estar diminuindo.", "score": 2, "risk": 0, "fb": "As tendências combinam com perda de capacidade térmica."}, {"t": "Os catcoolers removem calor demais.", "score": 0, "risk": 2, "fb": "Isso tenderia a reduzir a temperatura."}, {"t": "É apenas variação de nível.", "score": 0, "risk": 1, "fb": "Nível não explica sozinho as tendências térmicas."}]}, {"q": "Qual conjunto deve ser correlacionado?", "choices": [{"t": "TIC-39031, A/B, aeração, vapor e temperaturas.", "score": 2, "risk": 0, "fb": "Diferencia malha, ramo e utilidade."}, {"t": "Somente TIC-39031.", "score": 0, "risk": 1, "fb": "A malha não mostra sozinha a capacidade real."}, {"t": "Somente V-12.", "score": 0, "risk": 1, "fb": "Não é a variável normal do balanço térmico."}]}, {"q": "MV está alta, mas vapor continua caindo. O que indica?", "choices": [{"t": "O controle pede mais, mas o processo pode estar limitado.", "score": 2, "risk": 0, "fb": "É assinatura de possível limitação física."}, {"t": "O TIC certamente está mal sintonizado.", "score": 0, "risk": 1, "fb": "Pode ser limitação física."}, {"t": "O F-3982 está necessariamente vazio.", "score": 0, "risk": 1, "fb": "Não é conclusão direta."}]}, {"q": "Qual resultado demonstra recuperação?", "choices": [{"t": "Vapor recupera e T do regenerador estabiliza.", "score": 2, "risk": 0, "fb": "Balanço térmico voltou a responder."}, {"t": "Somente MV volta a 50%.", "score": 0, "risk": 1, "fb": "MV isolada não prova recuperação."}, {"t": "O nível oscila menos por alguns segundos.", "score": 0, "risk": 1, "fb": "Não comprova recuperação térmica."}]}]}, {"id": "s4", "title": "Swell / Shrink no F-3982", "skill": "Controle de nível", "intro": "O drum passa por mudança rápida de carga térmica.", "steps": [{"q": "Aumento rápido de vapor e subida de nível: principal hipótese?", "choices": [{"t": "Swell.", "score": 2, "risk": 0, "fb": "Aumento de ebulição pode expandir bolhas e elevar nível aparente."}, {"t": "Shrink.", "score": 0, "risk": 1, "fb": "Shrink está associado à redução de ebulição."}, {"t": "Falha certa do LT.", "score": 0, "risk": 1, "fb": "O fenômeno pode ser real de processo."}]}, {"q": "Δ(HBF−vapor) está negativo. O que isso acrescenta?", "choices": [{"t": "O inventário pode estar diminuindo apesar do nível alto.", "score": 2, "risk": 0, "fb": "Balanço negativo pode coexistir com swell."}, {"t": "Confirma excesso de massa.", "score": 0, "risk": 2, "fb": "Diferença negativa indica mais saída que entrada."}, {"t": "Não tem utilidade em transientes.", "score": 0, "risk": 1, "fb": "É útil quando interpretado junto com a dinâmica."}]}, {"q": "Qual ação tem maior risco de amplificar a instabilidade?", "choices": [{"t": "Reduzir HBF agressivamente só porque o nível subiu.", "score": 2, "risk": 0, "fb": "Pode transformar swell em perda real de inventário."}, {"t": "Correlacionar vapor e HBF.", "score": 0, "risk": 0, "fb": "É uma ação diagnóstica adequada."}, {"t": "Observar tendência curta com vigilância.", "score": 0, "risk": 0, "fb": "Pode ser apropriado em condição controlada."}]}, {"q": "Na redução brusca de vapor, o nível cai. Como interpretar?", "choices": [{"t": "Pode ser shrink e deve ser correlacionado com balanço de massa.", "score": 2, "risk": 0, "fb": "Colapso de bolhas reduz nível aparente."}, {"t": "É prova de vazamento.", "score": 0, "risk": 2, "fb": "Não é prova suficiente."}, {"t": "É sempre falta de HBF.", "score": 0, "risk": 1, "fb": "Pode ocorrer mesmo com HBF normal."}]}]}, {"id": "s5", "title": "Trip total da GV-3901 / XV-808", "skill": "Segurança", "intro": "O intertravamento total da GV-3901 é acionado.", "steps": [{"q": "Qual resposta da XV-808 é esperada?", "choices": [{"t": "Fechamento para isolamento.", "score": 2, "risk": 0, "fb": "É a função de segurança descrita."}, {"t": "Abertura para aliviar.", "score": 0, "risk": 2, "fb": "O papel descrito é de isolamento."}, {"t": "Manter última posição.", "score": 0, "risk": 2, "fb": "O trip comanda a posição segura."}]}, {"q": "Comando emitido, mas posição não confirma. Qual tratamento?", "choices": [{"t": "Considerar possível falha da barreira e confirmar por campo/processo.", "score": 2, "risk": 0, "fb": "Comando sem confirmação não garante isolamento."}, {"t": "Assumir fechamento porque a lógica atuou.", "score": 0, "risk": 2, "fb": "A barreira precisa de confirmação."}, {"t": "Reabrir para testar curso.", "score": 0, "risk": 3, "fb": "Pode recolocar energia durante condição insegura."}]}, {"q": "Pressão/fluxo a jusante não respondem como esperado. O que sugere?", "choices": [{"t": "Verificar estanqueidade/caminhos alternativos e isolamento real.", "score": 2, "risk": 0, "fb": "A resposta de processo confirma a barreira."}, {"t": "Elevar nível do F-3982.", "score": 0, "risk": 1, "fb": "Não resolve a dúvida de isolamento."}, {"t": "Alterar SP do TIC.", "score": 0, "risk": 1, "fb": "Não é a prioridade do trip."}]}, {"q": "Quando pensar em recomposição?", "choices": [{"t": "Após causa controlada, condição segura e permissivos/procedimento atendidos.", "score": 2, "risk": 0, "fb": "Recomposição deve respeitar critérios de segurança."}, {"t": "Assim que o nível normalizar.", "score": 0, "risk": 2, "fb": "Nível não é critério único."}, {"t": "Após tempo fixo independente do evento.", "score": 0, "risk": 2, "fb": "Não se deve inventar temporização universal."}]}]}, {"id": "s6", "title": "Instabilidade de nível HBF / F-3982", "skill": "Controle", "intro": "O nível oscila e é preciso separar dinâmica de processo de atuação excessiva.", "steps": [{"q": "Qual variável deve ser correlacionada imediatamente ao nível?", "choices": [{"t": "HBF e vapor gerado.", "score": 2, "risk": 0, "fb": "Eles definem o balanço de massa principal."}, {"t": "Somente ar J-3982.", "score": 0, "risk": 1, "fb": "Ar não substitui o balanço de água/vapor."}, {"t": "Somente XV-808.", "score": 0, "risk": 1, "fb": "Não é variável primária de nível."}]}, {"q": "Oscilação começa após grande mudança de vapor. O que considerar?", "choices": [{"t": "Shrink/swell.", "score": 2, "risk": 0, "fb": "Mudanças de ebulição alteram o nível aparente."}, {"t": "Falha certa do LIC.", "score": 0, "risk": 1, "fb": "Primeiro considere a dinâmica real."}, {"t": "Trip obrigatório da GV-3901.", "score": 0, "risk": 1, "fb": "Não é consequência automática."}]}, {"q": "A malha corrige demais e o nível cruza o SP repetidamente. O que investigar?", "choices": [{"t": "Ação do controlador, dinâmica do drum e feedforward de vazões.", "score": 2, "risk": 0, "fb": "Oscilação pode ser interação controle-processo."}, {"t": "Aumentar HBF manualmente.", "score": 0, "risk": 2, "fb": "Pode piorar a oscilação."}, {"t": "Alterar TIC-39031 sem relação.", "score": 0, "risk": 1, "fb": "Não é a primeira correlação."}]}, {"q": "Qual condição indica estabilização real?", "choices": [{"t": "Nível estável com balanço HBF/vapor coerente e sem correções extremas.", "score": 2, "risk": 0, "fb": "Combina inventário e fluxo coerentes."}, {"t": "Nível no SP por poucos segundos com HBF saturado.", "score": 0, "risk": 1, "fb": "Pode ser equilíbrio temporário."}, {"t": "Ausência de alarmes apesar de oscilação.", "score": 0, "risk": 1, "fb": "Alarmes não substituem tendência."}]}]}];
const TREND_CASES = [{"title": "TIC pedindo mais, vapor caindo", "prompt": "PV TIC-39031 ↑ acima do SP; MV ↑; vapor gerado ↓; T do D-3904 ↑.", "options": ["Limitação de remoção de calor/circulação", "Remoção de calor excessiva", "Swell como causa única", "XV-808 necessariamente fechada"], "c": 0, "fb": "A ação cresce enquanto o efeito térmico cai: investigar capacidade física."}, {"title": "Swell provável", "prompt": "Vapor ↑ rapidamente; nível F-3982 ↑; Δ(HBF−vapor) < 0.", "options": ["Swell com possível perda real de inventário", "Acumulação certa de massa", "Shrink", "Falha certa do LT"], "c": 0, "fb": "Nível aparente pode subir mesmo com balanço de massa negativo."}, {"title": "Shrink provável", "prompt": "Vapor ↓ rapidamente; nível F-3982 ↓; HBF permanece próximo.", "options": ["Shrink", "Swell", "XV-808 fechando", "Excesso de HBF"], "c": 0, "fb": "Menor ebulição pode colapsar bolhas e reduzir nível aparente."}, {"title": "Assimetria de ramo", "prompt": "C-3901A estável; C-3901B com menor ΔT e menor contribuição térmica.", "options": ["Investigar ramo B: aeração/circulação/instrumentação", "Alterar apenas SP geral", "Assumir nível alto do drum", "Aumentar V-12 nos dois lados"], "c": 0, "fb": "A diferença localizada deve ser investigada no ramo que divergiu."}, {"title": "Perda do ar principal", "prompt": "AR J-3901 ↓; temperaturas A/B divergem; vapor ↓.", "options": ["Possível perda de circulação por aeração insuficiente", "Maior eficiência térmica", "Problema apenas de nível", "Trip obrigatório da GV"], "c": 0, "fb": "A aeração pode afetar mobilidade do catalisador e troca térmica."}, {"title": "Isolamento não confirmado", "prompt": "Trip total GV; comando XV-808 fechar; posição sem confirmação; pressão não cai.", "options": ["Possível falha de isolamento", "Evento encerrado", "Apenas falha de nível", "Ajustar TIC-39031"], "c": 0, "fb": "Comando, posição e resposta de processo precisam ser coerentes."}, {"title": "Inventário subindo", "prompt": "Δ(HBF−vapor) positivo sustentado; nível sobe lentamente.", "options": ["Acumulação real de inventário", "Shrink", "Perda de massa", "Falha obrigatória do vapor"], "c": 0, "fb": "Balanço positivo sustentado leva a acumulação."}, {"title": "Controle saturado", "prompt": "PV > SP por longo período; MV no limite; ramos respondem pouco.", "options": ["Limitação física/saturação de capacidade", "Erro zero", "SP necessariamente errado", "V-12 deve assumir controle"], "c": 0, "fb": "MV no limite sem corrigir PV indica possível limitação de capacidade."}];
const AB_CASES = [{"prompt": "B remove menos calor, ar indicado semelhante nos dois lados.", "options": ["Comparar instrumentos, circulação e temperaturas do B", "Mudar SP geral", "Aumentar ar nos dois sem comparar", "Ignorar se o drum estiver normal"], "c": 0}, {"prompt": "A e B recebem comando semelhante; A responde, B quase não muda.", "options": ["Investigar elemento final/ramo B", "Reajustar apenas o LIC", "Assumir erro do SP", "Abrir XV-808"], "c": 0}, {"prompt": "Ambos perdem desempenho após queda de AR J-3901.", "options": ["Causa comum de aeração é plausível", "Dois instrumentos falharam juntos", "Problema exclusivo do B", "Nível alto é a única causa"], "c": 0}, {"prompt": "B mostra ΔT normal, mas contribuição térmica atribuída cai.", "options": ["Verificar medição/balanço térmico do ramo", "Concluir circulação ruim sem checagens", "Alterar SP do TIC", "Aumentar V-12 automaticamente"], "c": 0}, {"prompt": "Após correção de aeração, A/B voltam a tendências próximas.", "options": ["Resposta apoia hipótese de problema de aeração", "Prova nível alto", "Prova falha do TIC", "Não fornece informação"], "c": 0}];
const SHIFT_CASES = [{"title": "Turno após instabilidade térmica", "facts": ["T do D-3904 subiu e estabilizou", "C-3901B ficou abaixo do A", "AR J-3901 normalizou", "TIC-39031 ainda com MV mais alta"], "critical": ["Assimetria A/B ainda existente", "MV do TIC permanece elevada", "Confirmar estabilidade de AR J-3901", "Tendência de vapor gerado"], "non": ["Cor do fundo da tela", "Ordem dos botões do app"]}, {"title": "Turno após swell no F-3982", "facts": ["Vapor subiu rapidamente", "Nível subiu com ΔHBF−vapor negativo", "Nível retornou sem grande correção", "Balanço atual próximo de zero"], "critical": ["Registrar ocorrência de swell", "Informar balanço HBF/vapor atual", "Tendência do nível", "Ações realizadas/evitadas"], "non": ["Tamanho do ícone", "Quantidade de perguntas do quiz"]}, {"title": "Turno após trip da GV-3901", "facts": ["Trip total ocorreu", "XV-808 recebeu comando fechar", "Posição foi confirmada", "Recomposição ainda não autorizada"], "critical": ["Causa do trip ainda em análise", "XV-808 confirmada fechada", "Condição atual de pressão/fluxo", "Permissivos pendentes"], "non": ["Tema visual da página", "Nota do último quiz"]}];
const BAD_ACTIONS = [{"q": "Nível sobe com aumento rápido de vapor. Qual ação pode piorar?", "options": ["Reduzir HBF agressivamente sem avaliar swell", "Comparar HBF e vapor", "Observar tendência curta", "Correlacionar carga térmica"], "c": 0, "fb": "Redução agressiva pode converter swell em perda real de inventário."}, {"q": "PV alta e MV saturada. Qual ação pode mascarar a causa?", "options": ["Elevar o SP apenas para eliminar o desvio", "Verificar capacidade A/B", "Checar aeração", "Comparar vapor gerado"], "c": 0, "fb": "Mudar o objetivo não trata a limitação."}, {"q": "XV-808 não confirmou fechamento. Qual ação é mais arriscada?", "options": ["Reabrir para testar curso durante o trip", "Confirmar posição por campo/processo", "Verificar pressão/fluxo", "Seguir contingência"], "c": 0, "fb": "Reabrir pode recolocar energia antes de condição segura."}, {"q": "C-3901B diverge do A. Qual ação dificulta o diagnóstico?", "options": ["Alterar vários ajustes ao mesmo tempo", "Comparar A/B", "Verificar instrumento do B", "Checar aeração"], "c": 0, "fb": "Múltiplas mudanças eliminam rastreabilidade."}, {"q": "Perda do J-3901. Qual suposição é perigosa?", "options": ["Assumir que J-3982 substitui integralmente sem limites", "Monitorar resposta térmica", "Seguir procedimento", "Verificar vapor e temperaturas"], "c": 0, "fb": "O ar auxiliar pode ter limites diferentes."}, {"q": "Oscilação de nível após mudança de vapor. O que pode amplificar?", "options": ["Correções manuais grandes e alternadas", "Observar tendência de balanço", "Verificar shrink/swell", "Revisar ação do controlador"], "c": 0, "fb": "Ações alternadas grandes podem alimentar a oscilação."}];


const TRAIN_HISTORY_KEY='catcoolerConcept_trainingHistory_v2';
let trainQuiz=[], trainConfig=null, activeScenario=null, scenarioStep=0, scenarioScore=0, scenarioRisk=0, scenarioEffects=[];
let locateMode=null, trendIndex=0, abIndex=0, shiftIndex=0, badIndex=0;

function loadTrainHistory(){return JSON.parse(localStorage.getItem(TRAIN_HISTORY_KEY)||'{"attempts":[],"wrong":{},"skills":{},"lastModule":null}')}
function saveTrainHistory(h){localStorage.setItem(TRAIN_HISTORY_KEY,JSON.stringify(h))}
function recordTraining(type,name,score,max,skills={},wrong=[]){const h=loadTrainHistory();h.attempts.unshift({ts:new Date().toISOString(),type,name,score,max,skills});h.attempts=h.attempts.slice(0,50);wrong.forEach(id=>h.wrong[id]=(h.wrong[id]||0)+1);Object.entries(skills).forEach(([k,v])=>{if(!h.skills[k])h.skills[k]={score:0,max:0};h.skills[k].score+=v.score;h.skills[k].max+=v.max});h.lastModule=name;saveTrainHistory(h)}
function setLastModule(n){const h=loadTrainHistory();h.lastModule=n;saveTrainHistory(h)}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

// =========================================================
// V2.6 — Fundamentos de Engenharia
// Operações Unitárias + Mecânica dos Fluidos
// =========================================================
const UNIT_OP_TOPICS = [{"title": "Transferência de calor nos C-3901A/B", "where": "C-3901A e C-3901B, entre o catalisador quente e o circuito água/vapor.", "concept": "É a operação unitária central do Catcooler. O catalisador proveniente do D-3904 entrega energia térmica ao circuito de geração de vapor. A remoção de calor depende da vazão de catalisador, de sua capacidade calorífica, da diferença de temperatura e da capacidade global de troca térmica do equipamento.", "equations": "Q = ṁ_cat · Cp_cat · (T_entrada − T_saida)\n\nQ = U · A · ΔT_lm\n\nṁ_vapor ≈ Q / λ", "operator": "Se a circulação de catalisador ou a troca térmica diminuem, a geração de vapor tende a cair e a temperatura do regenerador pode tender a subir para a mesma carga térmica. Assimetria A/B pode indicar diferença de circulação, aeração, medição ou desempenho do equipamento.", "diagnostic": "Correlacionar TIC-39031, temperaturas dos ramos A/B, geração de vapor, carga térmica, AR J-3901/J-3982 e tendência da temperatura do D-3904.", "warning": "Não concluir perda de troca térmica por uma única variável. Confirmar tendência e coerência entre os dois ramos."}, {"title": "Ebulição e vaporização da água", "where": "Lado água/vapor dos C-3901A/B e circuito de retorno ao F-3982.", "concept": "A água absorve calor até atingir condições próximas à saturação. A partir daí, parcela crescente da energia recebida é utilizada na mudança de fase líquido → vapor. Por isso, a vazão de vapor gerado funciona como indicador indireto da quantidade de calor recuperada.", "equations": "H₂O(l) + Q → H₂O(v)\n\nQ ≈ ṁ_vapor · λ\n\nQ = ṁ · (h_saida − h_entrada)", "operator": "Queda de vapor com temperatura do regenerador subindo, mantendo condições de carga semelhantes, reforça a hipótese de redução da capacidade térmica do Catcooler.", "diagnostic": "Comparar vapor gerado com carga térmica, TIC-39031, temperaturas A/B e condições de circulação/aeração.", "warning": "Vapor gerado também depende das condições termodinâmicas do circuito; não usar uma relação isolada como medição absoluta de circulação de catalisador."}, {"title": "Separação líquido-vapor no F-3982", "where": "F-3982 — steam drum.", "concept": "A mistura bifásica proveniente do circuito aquecido entra no drum. Devido à grande diferença de densidade, o vapor ocupa a região superior e a água permanece na região inferior. O vaso fornece volume para separação, inventário e amortecimento de transientes.", "equations": "ρ_água ≫ ρ_vapor\n\nV_superficial,vapor = Q_vapor / A_livre", "operator": "Nível excessivamente alto reduz o espaço disponível à separação e pode aumentar risco de carryover. Nível muito baixo reduz reserva hidráulica e margem do circuito.", "diagnostic": "Observar nível, HBF, vapor gerado, pressão do drum, diferença HBF−vapor e tendência de carga térmica.", "warning": "O nível do drum não é somente inventário: swell/shrink podem alterar significativamente o nível aparente."}, {"title": "Circulação água–vapor", "where": "Circuito F-3982 ↔ C-3901A/B.", "concept": "A água líquida e a mistura água-vapor percorrem regiões diferentes do circuito. Ao ocorrer vaporização, a densidade média do fluido muda, alterando a hidráulica, a perda de carga e, em sistemas com circulação natural, a força motriz de circulação.", "equations": "ṁ = ρ · A · V\n\nx = ṁ_vapor / (ṁ_vapor + ṁ_líquido)", "operator": "Mudanças na fração de vapor podem alterar rapidamente o comportamento do nível, da pressão diferencial e da circulação.", "diagnostic": "Correlacionar vapor, HBF, pressão, nível e resposta térmica do cooler durante mudanças de carga.", "warning": "A arquitetura exata da circulação da U-39 deve ser confirmada em P&ID/manual/projeto antes de assumir circulação natural ou forçada."}, {"title": "Fluidização e aeração do catalisador", "where": "Circuito de catalisador dos C-3901A/B e pontos de injeção de AR J-3901/J-3982 ou utilidade de emergência.", "concept": "O gás introduzido no leito de partículas exerce força de arraste e aumenta a fração de vazios. Na faixa adequada, isso reduz a tendência de acomodação do catalisador e favorece sua mobilidade/circulação.", "equations": "U_g ↑ → força de arraste ↑\n\nNo início da fluidização:\nΔP_leito ≈ peso aparente do leito / área", "operator": "Aeração insuficiente pode reduzir mobilidade do catalisador e, consequentemente, a remoção de calor. Aeração excessiva também pode alterar ΔP, expansão do leito e arraste de partículas.", "diagnostic": "Comparar AR J-3901/J-3982, temperaturas A/B, geração de vapor e resposta do TIC-39031.", "warning": "Mais ar não significa necessariamente mais circulação. Existe uma faixa hidráulica adequada."}, {"title": "Transporte e circulação de sólidos", "where": "Entre o D-3904 e os C-3901A/B.", "concept": "O catalisador é transportado como fase sólida aerada. O movimento depende da distribuição de pressão, densidade aparente do leito, geometria, aeração e resistência ao escoamento.", "equations": "ΔP ≈ ρ_bulk · g · H\n\nρ_bulk ≈ (1−ε) · ρ_s", "operator": "Mudanças na aeração alteram a densidade aparente e a pressão hidrostática do leito, podendo alterar a circulação do catalisador mesmo sem mudança mecânica do equipamento.", "diagnostic": "Usar comparação A/B, temperaturas, aeração, ΔP disponível (quando aplicável) e geração de vapor.", "warning": "Não inferir vazão de catalisador apenas pela vazão de ar."}, {"title": "Contato gás–sólido", "where": "Pontos onde ar/vapor entram em contato com o catalisador.", "concept": "O gás transfere quantidade de movimento às partículas. Esse contato é essencial para sustentar a condição de leito aerado e evitar regiões com baixa mobilidade.", "equations": "Força de arraste ∝ função(ρ_g, U_g, d_p, μ_g)\n\nRe_p = ρ_g · U_g · d_p / μ_g", "operator": "Alterações de pressão, vazão ou qualidade do gás podem aparecer como mudanças de circulação e resposta térmica.", "diagnostic": "Observar se a perda de desempenho coincide com alteração da utilidade de aeração.", "warning": "A função exata de cada ponto de injeção deve seguir o desenho e procedimento da unidade."}, {"title": "Controle de inventário do F-3982", "where": "F-3982 e malha LIC/FIC de HBF.", "concept": "O inventário de água é uma operação dinâmica de acumulação. O nível resulta do balanço entre entrada de HBF, vapor retirado, purgas e efeitos volumétricos do escoamento bifásico.", "equations": "dM/dt = F_HBF − F_vapor − F_purgas\n\nEm equilíbrio médio:\nF_HBF ≈ F_vapor + F_purgas", "operator": "Balanço positivo sustentado tende a aumentar inventário; balanço negativo tende a reduzi-lo. Porém, swell/shrink podem fazer o nível indicado caminhar temporariamente em outra direção.", "diagnostic": "Ler nível + HBF + vapor + Δ(HBF−vapor) em conjunto.", "warning": "Evitar correções agressivas baseadas somente em nível instantâneo durante transientes."}, {"title": "Recuperação de energia na forma de vapor", "where": "Conjunto C-3901A/B + F-3982.", "concept": "O Catcooler não apenas remove calor do regenerador; ele recupera essa energia em um fluido útil — vapor. Isso integra controle térmico e eficiência energética da unidade.", "equations": "Q_recuperado ≈ ṁ_vapor · (h_vapor − h_água)\n\nEficiência térmica conceitual = Q_recuperado / Q_disponível", "operator": "Uma queda de vapor pode representar perda de recuperação energética e, simultaneamente, perda da capacidade de controlar o balanço térmico do regenerador.", "diagnostic": "Correlacionar geração de vapor, carga térmica indicada, temperaturas e condição dos dois coolers.", "warning": "A eficiência real depende de dados de processo e entalpias; a equação é conceitual para treinamento."}, {"title": "Dissipação de energia em válvulas e restrições", "where": "Válvulas de controle e restrições do circuito de água/vapor e utilidades.", "concept": "Uma válvula controla vazão criando resistência e dissipando energia de pressão. A queda de pressão aumenta turbulência e pode modificar o estado do fluido quando ele está próximo da saturação.", "equations": "Líquidos, forma conceitual:\nQ ∝ Cv · √(ΔP/SG)\n\nh_local = K · V²/(2g)", "operator": "Válvula muito estrangulada pode concentrar elevada perda de pressão e tornar o sistema mais sensível a cavitação/flashing, dependendo das condições termodinâmicas.", "diagnostic": "Observar posição da válvula, ΔP, vazão e resposta do processo.", "warning": "Limites reais de abertura/ΔP devem seguir projeto e procedimento."}];
const FLUID_MECH_TOPICS = [{"title": "Continuidade — relação entre vazão e velocidade", "where": "Tubulações de HBF, vapor, ar e demais utilidades.", "concept": "A conservação de massa conecta vazão, densidade, área e velocidade. Para líquido aproximadamente incompressível, aumentar vazão na mesma tubulação significa aumentar velocidade.", "equations": "ṁ = ρ · A · V\n\nQ = A · V", "operator": "Aumento de velocidade eleva perdas de carga e pode tornar restrições, válvulas e acessórios mais influentes.", "diagnostic": "Quando vazão cai, verificar se houve mudança de pressão disponível, restrição, válvula, densidade ou condição bifásica.", "warning": "Para vapor/ar compressíveis, a densidade varia com pressão e temperatura."}, {"title": "Equação de Bernoulli com perdas", "where": "Principalmente no circuito de água/HBF e linhas de utilidades.", "concept": "A energia mecânica do fluido é distribuída entre pressão, velocidade, altura e energia adicionada por máquinas, sendo parte dissipada em perdas de carga.", "equations": "P₁/(ρg) + V₁²/(2g) + z₁ + H_bomba = P₂/(ρg) + V₂²/(2g) + z₂ + h_L", "operator": "Para aumentar vazão, o sistema precisa dispor de pressão suficiente para vencer pressão do destino, desnível e perdas.", "diagnostic": "Queda de vazão com mesma demanda pode indicar perda de pressão disponível ou aumento de resistência.", "warning": "Bernoulli simples não representa sozinho trechos fortemente bifásicos ou compressíveis."}, {"title": "Perda de carga distribuída", "where": "Tubulações do circuito.", "concept": "O atrito entre fluido e parede dissipa energia. Darcy-Weisbach mostra que a perda cresce com comprimento, fator de atrito e aproximadamente com o quadrado da velocidade.", "equations": "h_f = f · (L/D) · V²/(2g)", "operator": "Duplicar velocidade pode aumentar fortemente a perda de carga, reduzindo margem hidráulica.", "diagnostic": "Comparar pressão a montante/jusante e vazão para identificar aumento de resistência.", "warning": "Fator f depende de Reynolds e rugosidade."}, {"title": "Perdas localizadas", "where": "Válvulas, curvas, Tês, entradas, saídas e restrições.", "concept": "A mudança de direção ou de seção cria separação de escoamento e turbulência adicionais.", "equations": "h_local = ΣK · V²/(2g)", "operator": "Uma válvula parcialmente fechada pode dominar a perda de carga de um trecho.", "diagnostic": "Se pressão cai principalmente através de um componente, avaliar sua posição/condição.", "warning": "Coeficientes K dependem da geometria e posição."}, {"title": "Número de Reynolds e regime de escoamento", "where": "Linhas de líquido, ar e vapor.", "concept": "Reynolds compara forças inerciais e viscosas. Em linhas industriais de alta vazão, regime turbulento é comum e aumenta mistura e sensibilidade a rugosidade/perdas.", "equations": "Re = ρ · V · D / μ", "operator": "Mudanças importantes de viscosidade, densidade ou vazão alteram o regime e as perdas.", "diagnostic": "Útil para compreender por que fluidos frios/viscosos podem apresentar maior resistência.", "warning": "Limites laminar/transição/turbulento dependem da geometria."}, {"title": "Escoamento bifásico água–vapor", "where": "Retorno dos C-3901A/B ao F-3982.", "concept": "Líquido e vapor compartilham a tubulação. A fase vapor ocupa grande volume devido à baixa densidade, alterando densidade média, velocidade, perda de carga e dinâmica do nível.", "equations": "x = ṁ_v /(ṁ_v + ṁ_l)\n\nρ_mistura ≈ α·ρ_v + (1−α)·ρ_l", "operator": "Pequena mudança de massa vaporizada pode gerar grande mudança de volume, influenciando swell/shrink e circulação.", "diagnostic": "Correlacionar vapor gerado, pressão, nível e transientes de carga.", "warning": "Modelos bifásicos reais são mais complexos; esta relação é didática."}, {"title": "Circulação natural / efeito termossifão", "where": "Aplicável somente se o projeto do circuito F-3982/C-3901 utilizar circulação natural.", "concept": "A coluna mais líquida é mais densa que a coluna com mistura água-vapor. A diferença de peso hidrostático pode gerar uma força motriz de circulação.", "equations": "ΔP_motriz ≈ g · H · (ρ_líquido − ρ_mistura)\n\nΔP_motriz = ΔP_fricção + ΔP_local + ΔP_aceleração", "operator": "Aumento de vaporização muda a densidade da coluna e pode alterar a circulação.", "diagnostic": "Se houver circulação natural confirmada, avaliar mudanças de vapor/pressão juntamente com resposta térmica.", "warning": "CONFIRMAR em documentação da U-39 antes de usar este mecanismo como explicação da planta."}, {"title": "Swell — expansão volumétrica aparente", "where": "F-3982 durante aumento rápido de ebulição/geração de vapor.", "concept": "Mais bolhas de vapor dentro da fase líquida aumentam o volume aparente. O nível pode subir mesmo quando o balanço de massa de água é negativo.", "equations": "α_vapor ↑ → Volume_aparente ↑ → Nível_indicado ↑", "operator": "Reduzir HBF agressivamente durante swell pode transformar um aumento aparente em perda real de inventário.", "diagnostic": "Comparar nível, HBF, vapor e Δ(HBF−vapor).", "warning": "Não assumir que todo aumento de nível representa entrada de massa."}, {"title": "Shrink — contração volumétrica aparente", "where": "F-3982 durante redução rápida de ebulição/geração de vapor.", "concept": "O colapso de bolhas reduz o volume ocupado pela mistura, fazendo o nível cair antes de ocorrer perda equivalente de massa.", "equations": "α_vapor ↓ → Volume_aparente ↓ → Nível_indicado ↓", "operator": "Aumentar HBF agressivamente durante shrink pode gerar excesso real de inventário após o transiente.", "diagnostic": "Comparar tendência do nível com vazões de entrada/saída.", "warning": "Nível aparente e inventário real podem divergir temporariamente."}, {"title": "Separação de gotas e velocidade superficial", "where": "Zona de separação do F-3982.", "concept": "O vapor ascendente precisa ter velocidade compatível com a separação de gotículas. Se a velocidade for alta, aumenta a tendência de arraste de líquido.", "equations": "V_s = Q_vapor / A_livre\n\nSouders-Brown:\nV_max = K · √[(ρ_L − ρ_V)/ρ_V]", "operator": "Nível alto reduz área/volume efetivo de separação e alta geração de vapor aumenta velocidade superficial, elevando risco de carryover.", "diagnostic": "Observar nível alto associado a elevada geração de vapor e qualidade/condição do sistema a jusante.", "warning": "K e limites são de projeto; não inferir limite operacional sem documentação."}, {"title": "Velocidade mínima de fluidização", "where": "Leito/circuito de catalisador aerado.", "concept": "À medida que a velocidade do gás aumenta, a força de arraste sobre as partículas cresce. Na velocidade mínima de fluidização, a força ascendente equilibra aproximadamente o peso aparente do leito.", "equations": "U = U_mf → início da fluidização\n\nU < U_mf → tendência a leito pouco móvel\nU > U_mf → leito fluidizado/expandido", "operator": "Aeração abaixo da faixa necessária pode reduzir circulação; excesso pode aumentar expansão e arraste.", "diagnostic": "Relacionar vazão/pressão do gás com ΔP do leito, temperatura dos ramos e geração de vapor.", "warning": "U_mf depende de tamanho/densidade das partículas e propriedades do gás."}, {"title": "Equação de Ergun e ΔP do leito", "where": "Regiões de leito particulado antes/próximas da fluidização.", "concept": "A equação de Ergun combina contribuições viscosas e inerciais para a perda de pressão através de um leito de partículas.", "equations": "ΔP/L = 150·[(1−ε)²/ε³]·(μU/d_p²) + 1,75·[(1−ε)/ε³]·(ρU²/d_p)", "operator": "ΔP responde à velocidade do gás, fração de vazios e propriedades do catalisador. Mudanças anormais podem indicar alteração da condição do leito.", "diagnostic": "Usar ΔP junto com vazão de aeração e sinais de circulação.", "warning": "A equação é base de engenharia; aplicação quantitativa exige propriedades reais do catalisador."}, {"title": "Pressão hidrostática do catalisador aerado", "where": "Colunas/trechos verticais contendo catalisador.", "concept": "A pressão disponível devido ao peso do leito depende da densidade aparente. Aeração aumenta fração de vazios e reduz densidade aparente.", "equations": "ΔP ≈ ρ_bulk · g · H\n\nρ_bulk ≈ (1−ε)·ρ_s", "operator": "Alterar aeração altera a hidráulica do sólido e pode modificar circulação.", "diagnostic": "Comparar mudanças de ar com resposta térmica e de pressão.", "warning": "É uma aproximação conceitual para leito aerado."}, {"title": "Escoamento compressível do V-12 / ar", "where": "Linhas de vapor e ar, sobretudo através de válvulas/orifícios.", "concept": "Gases e vapor mudam densidade com pressão. Em grande razão de pressão, a velocidade pode alcançar condição crítica na restrição.", "equations": "Condição crítica: M = 1 no gargalo\n\nApós estrangulamento crítico, reduzir P_jusante não aumenta proporcionalmente a vazão.", "operator": "Uma válvula pode atingir limite de capacidade mesmo aumentando a diferença de pressão.", "diagnostic": "Observar pressão a montante, jusante, posição da válvula e vazão.", "warning": "Cálculo quantitativo de choked flow depende de propriedades do gás/vapor e geometria."}, {"title": "Válvulas — Cv e dissipação de pressão", "where": "Válvulas de controle de água, vapor, ar e demais fluidos.", "concept": "A válvula converte pressão disponível em perda localizada para regular vazão.", "equations": "Para líquido, forma simplificada:\nQ ∝ Cv · √(ΔP/SG)", "operator": "Com a válvula muito fechada, pequena mudança de abertura pode provocar grande mudança de ΔP e aumentar sensibilidade do controle.", "diagnostic": "Comparar posição, vazão e ΔP. Alta abertura sem vazão pode indicar falta de pressão disponível ou restrição externa.", "warning": "Características instalada e inerente da válvula podem ser diferentes."}, {"title": "Cavitação e flashing", "where": "Possível em água quente através de bombas, válvulas e restrições quando a pressão se aproxima da pressão de vapor.", "concept": "Se a pressão local cai abaixo da pressão de vapor, formam-se bolhas. Se a pressão se recupera e as bolhas colapsam ocorre cavitação; se permanecem como vapor ocorre flashing.", "equations": "Se P_local < P_vapor(T) → formação de vapor\n\nCavitação: P recupera > P_vapor → colapso\nFlashing: P permanece < P_vapor", "operator": "Pode causar ruído, vibração, erosão, perda de capacidade e instabilidade de vazão.", "diagnostic": "Correlacionar temperatura, pressão, ΔP de válvula/bomba e comportamento de vazão.", "warning": "Não significa que exista cavitação atualmente na U-39; é um risco de engenharia a ser avaliado com dados reais."}, {"title": "Transitórios hidráulicos / golpe de aríete", "where": "Linhas líquidas sujeitas a mudanças rápidas de velocidade.", "concept": "Fechamento/abertura rápida de válvula altera a velocidade e gera onda de pressão que se propaga pela tubulação.", "equations": "Joukowsky:\nΔP = ρ · a · ΔV", "operator": "Mudanças muito rápidas podem gerar picos de pressão e esforços mecânicos.", "diagnostic": "Associar picos rápidos de pressão a manobras de válvula/bomba.", "warning": "Magnitude real depende da elasticidade da tubulação, velocidade da onda e tempo de manobra."}];
const ENGINEERING_QUESTIONS = [{"id": "eng01", "level": "basico", "skill": "Operações Unitárias", "equipment": "unitops", "topic": "Transferência de calor", "q": "Qual é a operação unitária central dos C-3901A/B?", "a": ["Transferência de calor do catalisador para o circuito água/vapor", "Destilação do vapor", "Absorção de H2S", "Filtração do catalisador"], "c": 0, "explanation": "O Catcooler retira calor do catalisador e transfere essa energia para o circuito de geração de vapor."}, {"id": "eng02", "level": "operacional", "skill": "Operações Unitárias", "equipment": "unitops", "topic": "Vaporização", "q": "Se a geração de vapor cai enquanto a temperatura do D-3904 sobe, com carga semelhante, qual interpretação é coerente?", "a": ["Possível redução da remoção de calor nos catcoolers", "Aumento garantido da eficiência térmica", "Maior separação no drum", "Swell como única causa"], "c": 0, "explanation": "Menor vapor recuperado com temperatura subindo sugere perda de capacidade de remoção térmica."}, {"id": "eng03", "level": "avancado", "skill": "Operações Unitárias", "equipment": "unitops", "topic": "Separação", "q": "Por que nível muito alto no F-3982 pode aumentar carryover?", "a": ["Reduz espaço de separação e pode elevar velocidade efetiva do vapor", "Diminui a densidade da água a zero", "Fecha automaticamente os catcoolers", "Elimina a fase líquida"], "c": 0, "explanation": "Menor espaço de separação combinado com vapor elevado favorece arraste de gotículas."}, {"id": "eng04", "level": "operacional", "skill": "Operações Unitárias", "equipment": "unitops", "topic": "Fluidização", "q": "Qual efeito é esperado se a aeração ficar insuficiente?", "a": ["Menor mobilidade do catalisador e possível redução da remoção de calor", "Maior circulação garantida", "Maior vapor sem alteração de processo", "Fechamento obrigatório da XV-808"], "c": 0, "explanation": "Aeração ajuda a manter o sólido móvel; sua perda pode reduzir circulação e carga térmica."}, {"id": "eng05", "level": "avancado", "skill": "Operações Unitárias", "equipment": "unitops", "topic": "Inventário", "q": "Por que nível indicado e inventário real podem caminhar temporariamente em direções diferentes?", "a": ["Por swell/shrink em escoamento bifásico", "Porque massa não é conservada", "Porque HBF não possui densidade", "Porque vapor sempre condensa instantaneamente"], "c": 0, "explanation": "Mudanças de fração de vapor alteram o volume aparente sem mudança proporcional imediata de massa."}, {"id": "eng06", "level": "operacional", "skill": "Operações Unitárias", "equipment": "unitops", "topic": "Energia", "q": "Qual variável funciona como bom indicador indireto de calor recuperado no Catcooler?", "a": ["Vazão de vapor gerado, interpretada com as condições do circuito", "Somente nível instantâneo do F-3982", "Somente posição da XV-808", "Somente vazão do J-3982"], "c": 0, "explanation": "A produção de vapor é diretamente ligada à energia transferida ao circuito de água."}, {"id": "eng07", "level": "basico", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Continuidade", "q": "Em uma linha líquida de área constante, aumentar vazão tende a:", "a": ["Aumentar a velocidade", "Reduzir a velocidade a zero", "Não alterar a velocidade", "Eliminar a perda de carga"], "c": 0, "explanation": "Q=A·V; com área constante, maior Q implica maior V."}, {"id": "eng08", "level": "operacional", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Perda de carga", "q": "Por que aumentar muito a velocidade pode consumir rapidamente a margem de pressão?", "a": ["Porque perdas por atrito/localizadas crescem aproximadamente com V²", "Porque densidade vira zero", "Porque viscosidade desaparece", "Porque a gravidade deixa de atuar"], "c": 0, "explanation": "Darcy-Weisbach e perdas locais contêm o termo V²/(2g)."}, {"id": "eng09", "level": "avancado", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Escoamento bifásico", "q": "Como uma pequena massa de vapor pode alterar muito o volume da mistura?", "a": ["O vapor tem densidade muito menor e ocupa grande volume", "O vapor é incompressível", "A água desaparece quimicamente", "A pressão não influencia o sistema"], "c": 0, "explanation": "A baixa densidade do vapor gera grande fração volumétrica mesmo com fração mássica limitada."}, {"id": "eng10", "level": "avancado", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Swell", "q": "Nível sobe, vapor aumenta e Δ(HBF−vapor) fica negativo. Qual hipótese é mais coerente?", "a": ["Swell com possível redução real de inventário", "Acúmulo de massa garantido", "Shrink", "Falha obrigatória do transmissor"], "c": 0, "explanation": "O nível aparente pode subir pela expansão de vapor mesmo com balanço de massa negativo."}, {"id": "eng11", "level": "operacional", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Fluidização", "q": "O que representa U_mf?", "a": ["Velocidade mínima de fluidização", "Velocidade máxima de vapor no drum", "Velocidade da água de HBF", "Velocidade de rotação do J-3901"], "c": 0, "explanation": "U_mf é a velocidade superficial de gás associada ao início da fluidização do leito."}, {"id": "eng12", "level": "avancado", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Ergun", "q": "A equação de Ergun relaciona principalmente:", "a": ["Queda de pressão através de leito particulado com propriedades do gás/leito", "Entalpia do vapor com nível do drum", "Velocidade de rotação do compressor com pressão", "Composição química do catalisador com octanagem"], "c": 0, "explanation": "Ergun descreve perda de pressão em leitos de partículas por termos viscoso e inercial."}, {"id": "eng13", "level": "operacional", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Carryover", "q": "Qual combinação tende a aumentar o risco de carryover no F-3982?", "a": ["Nível alto + elevada geração de vapor", "Nível baixo + vapor zero", "Baixa velocidade de vapor + grande espaço livre", "Redução de vazão de vapor"], "c": 0, "explanation": "Menor espaço de separação e maior velocidade superficial favorecem arraste de gotas."}, {"id": "eng14", "level": "avancado", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Circulação natural", "q": "Se o circuito utilizar termossifão, qual é a principal força motriz?", "a": ["Diferença de densidade hidrostática entre coluna líquida e coluna bifásica", "Somente velocidade da bomba", "Somente nível do D-3904", "Somente posição da XV-808"], "c": 0, "explanation": "A diferença de peso das colunas pode gerar a pressão motriz da circulação natural."}, {"id": "eng15", "level": "operacional", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Cavitação", "q": "Quando pode iniciar formação de vapor local em um líquido quente?", "a": ["Quando a pressão local cai abaixo da pressão de vapor na temperatura do líquido", "Quando a pressão local aumenta muito acima da pressão de vapor", "Somente quando o nível do drum está alto", "Somente quando o ar J-3901 está alto"], "c": 0, "explanation": "A vaporização local ocorre quando a pressão local fica inferior à pressão de vapor."}, {"id": "eng16", "level": "avancado", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Choked flow", "q": "Em escoamento compressível crítico através de uma restrição, o que ocorre?", "a": ["A velocidade atinge condição sônica no gargalo e reduzir mais P a jusante não aumenta proporcionalmente a vazão", "A velocidade do gás torna-se zero", "A densidade fica constante como líquido", "A vazão passa a depender apenas do nível do drum"], "c": 0, "explanation": "No choked flow, a restrição alcança condição crítica e a capacidade de vazão fica limitada."}, {"id": "eng17", "level": "operacional", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Válvulas", "q": "Uma válvula de controle regula vazão principalmente ao:", "a": ["Criar uma perda de pressão controlada", "Gerar massa nova", "Eliminar atrito da tubulação", "Aumentar área sem limite"], "c": 0, "explanation": "A válvula dissipa energia de pressão através de uma restrição controlável."}, {"id": "eng18", "level": "avancado", "skill": "Mecânica dos Fluidos", "equipment": "fluidmech", "topic": "Golpe de aríete", "q": "Na equação de Joukowsky, um aumento de ΔV tende a:", "a": ["Aumentar o pico de pressão transitório", "Eliminar a onda de pressão", "Reduzir sempre a pressão para zero", "Não ter efeito"], "c": 0, "explanation": "ΔP=ρ·a·ΔV; maior mudança rápida de velocidade implica maior onda de pressão."}, {"id": "eng19", "level": "operacional", "skill": "Integração de Engenharia", "equipment": "fluidmech", "topic": "Cadeia causal", "q": "Qual cadeia melhor conecta perda de AR J-3901 ao balanço térmico?", "a": ["Aeração ↓ → mobilidade/circulação ↓ → Q removido ↓ → vapor ↓ → T D-3904 tende a ↑", "Aeração ↓ → Q removido ↑ → vapor ↑ → T cai sempre", "Aeração ↓ → XV-808 abre obrigatoriamente → nível sobe", "Aeração ↓ → densidade do catalisador zera"], "c": 0, "explanation": "A perda de aeração pode reduzir circulação e, portanto, a remoção térmica e geração de vapor."}, {"id": "eng20", "level": "avancado", "skill": "Integração de Engenharia", "equipment": "unitops", "topic": "Diagnóstico sistêmico", "q": "TIC-39031 pede mais remoção, vapor cai e um ramo perde resposta. Qual abordagem integra melhor operações unitárias e mecânica dos fluidos?", "a": ["Investigar circulação/aeração do ramo e capacidade de troca antes de alterar apenas a sintonia", "Aumentar SP para esconder o erro", "Assumir falha do F-3982 sem comparação A/B", "Ignorar vazão de vapor"], "c": 0, "explanation": "O controlador pode estar saturado porque o processo físico perdeu capacidade de transportar catalisador e remover calor."}];
TRAIN_QUESTION_BANK.push(...ENGINEERING_QUESTIONS);

function renderEngineeringOverview(c,kind){
  const isUnit=kind==='unitops';
  const topics=isUnit?UNIT_OP_TOPICS:FLUID_MECH_TOPICS;
  const title=isUnit?'Operações Unitárias do Catcooler':'Mecânica dos Fluidos no Catcooler';
  const intro=isUnit
    ? 'Estude os fenômenos de processo que conectam D-3904, C-3901A/B e F-3982: transferência de calor, vaporização, separação, circulação, fluidização, transporte de sólidos e recuperação de energia.'
    : 'Estude como pressão, vazão, velocidade, perda de carga, escoamento bifásico, fluidização e transitórios explicam o comportamento hidráulico do sistema.';
  c.innerHTML=`<h2 class="training-title">${title}</h2>
  <p class="training-sub">${intro}</p>
  <div class="eng-summary">
    <div class="eng-summary-card"><b>${topics.length}</b><span>Tópicos técnicos</span></div>
    <div class="eng-summary-card"><b>${isUnit?'Processo':'Hidráulica'}</b><span>Visão de engenharia</span></div>
    <div class="eng-summary-card"><b>CIC</b><span>Aplicação operacional</span></div>
  </div>
  <div class="eng-grid">
    ${topics.map((t,i)=>`<button class="eng-topic-card" onclick="showEngineeringTopic('${kind}',${i})">
      <span class="eng-index">${String(i+1).padStart(2,'0')}</span>
      <span><strong>${t.title}</strong><small>${t.where}</small></span>
    </button>`).join('')}
  </div>
  <div class="training-actions">
    <button class="btn primary" onclick="startEngineeringQuiz('${kind}')">🎯 Quiz deste módulo</button>
    ${isUnit?`<button class="btn" onclick="openTrainingModule('fluidmech')">Ir para Mecânica dos Fluidos →</button>`:`<button class="btn" onclick="openTrainingModule('unitops')">← Operações Unitárias</button>`}
  </div>
  <div class="training-box engineering-caveat">
    <h3>Aplicação na U-39</h3>
    <p>Os conceitos abaixo explicam o comportamento físico do sistema. Estratégias específicas de circulação, internos, limites, permissivos e intertravamentos devem ser confirmados nos documentos oficiais da unidade.</p>
  </div>`;
}

function showEngineeringTopic(kind,i){
  const topics=kind==='unitops'?UNIT_OP_TOPICS:FLUID_MECH_TOPICS;
  const t=topics[i]; if(!t)return;
  const c=$('#trainingContent');
  c.innerHTML=`<div class="eng-detail-head">
    <button class="btn" onclick="renderEngineeringOverview($('#trainingContent'),'${kind}')">← Voltar</button>
    <span class="badge">${i+1} / ${topics.length}</span>
  </div>
  <h2 class="training-title">${t.title}</h2>
  <div class="eng-detail-grid">
    <section class="training-box"><h3>📍 Onde ocorre</h3><p>${t.where}</p></section>
    <section class="training-box"><h3>⚙️ Fenômeno / conceito</h3><p>${t.concept}</p></section>
    <section class="training-box eng-formula"><h3>∑ Equações e relações</h3><pre>${escapeMediaHtml(t.equations)}</pre></section>
    <section class="training-box"><h3>👷 Consequência para o operador</h3><p>${t.operator}</p></section>
    <section class="training-box"><h3>🖥️ Como diagnosticar no CIC</h3><p>${t.diagnostic}</p></section>
    <section class="training-box eng-warning"><h3>⚠️ Limite de interpretação</h3><p>${t.warning}</p></section>
  </div>
  <div class="training-actions">
    ${i>0?`<button class="btn" onclick="showEngineeringTopic('${kind}',${i-1})">← Anterior</button>`:''}
    ${i<topics.length-1?`<button class="btn primary" onclick="showEngineeringTopic('${kind}',${i+1})">Próximo →</button>`:''}
    <button class="btn green" onclick="startEngineeringQuiz('${kind}')">Quiz</button>
  </div>`;
}

function renderUnitOpsModule(c){renderEngineeringOverview(c,'unitops')}
function renderFluidMechModule(c){renderEngineeringOverview(c,'fluidmech')}

function startEngineeringQuiz(kind){
  const equipment=kind==='unitops'?'unitops':'fluidmech';
  const pool=shuffle(TRAIN_QUESTION_BANK.filter(q=>q.equipment===equipment)).slice(0,10);
  trainQuiz=pool.map(q=>({...q,shown:shuffle(q.a.map((t,i)=>({t,orig:i})))}));
  trainConfig={level:'engenharia',count:pool.length,equipment};
  renderTrainQuiz();
}


// =========================================================
// V2.9 — TESTE DE LÓGICA: INTERTRAVAMENTO CAT-COOLER
// Matriz transcrita da imagem fornecida pelo usuário.
// =========================================================
const INTERLOCK_EFFECTS=[{"id": "trip1", "label": "TRIP 1º EVENTO", "tag": ""}, {"id": "instfail", "label": "INSTRUMENTO EM FALHA", "tag": ""}, {"id": "slideA", "label": "FECHA SLIDE C-3901A", "tag": "L3926-A"}, {"id": "slideB", "label": "FECHA SLIDE C-3901B", "tag": "L3926-B"}, {"id": "v12fluidA", "label": "ABRE V12 FLUIDIZAÇÃO P/ C-3901A", "tag": "XV-2302"}, {"id": "v12fluidB", "label": "ABRE V12 FLUIDIZAÇÃO P/ C-3901B", "tag": "XV-2311"}, {"id": "v12aerA", "label": "ABRE V12 AERAÇÃO E ELEVAÇÃO P/ C-3901A", "tag": "HV-2301"}, {"id": "v12aerB", "label": "ABRE V12 AERAÇÃO E ELEVAÇÃO P/ C-3901B", "tag": "HV-2310"}, {"id": "closeXV808", "label": "FECHA V42 DO F-3982 P/ GV-3901", "tag": "XV-808"}, {"id": "sealpots", "label": "DESVIA POTES SELAGEM", "tag": ""}];
const INTERLOCK_ROWS=[{"id": "r1", "cause": "NÍVEL BAIXO F-3982", "tag": "LSLL-2322", "set": "50%", "effects": ["instfail", "slideA", "slideB"]}, {"id": "r2", "cause": "NÍVEL BAIXO F-3982 E HS-2320 = C-3901A", "tag": "LSLL-2323", "set": "50%", "effects": ["instfail", "slideA"]}, {"id": "r3", "cause": "NÍVEL BAIXO F-3982 E HS-2320 = C-3901B", "tag": "LSLL-2323", "set": "50%", "effects": ["instfail", "slideB"]}, {"id": "r4", "cause": "AR FLUIDIZAÇÃO C-3901A", "tag": "FSLL-2311", "set": "", "effects": ["instfail", "v12fluidA"]}, {"id": "r5", "cause": "AR FLUIDIZAÇÃO C-3901B", "tag": "FSLL-2338", "set": "", "effects": ["instfail", "v12fluidB"]}, {"id": "r6", "cause": "AR P/ REGENERADOR", "tag": "FSLL-003", "set": "2836", "effects": ["instfail", "v12aerA", "v12aerB"]}, {"id": "r7", "cause": "TRIP DO J-3901", "tag": "XSJ3901", "set": "", "effects": ["trip1", "v12aerA", "v12aerB"]}, {"id": "r8", "cause": "TRIP MANUAL J-3901", "tag": "HS-010", "set": "", "effects": ["trip1", "v12aerA", "v12aerB"]}, {"id": "r9", "cause": "TRIP MANUAL SDCD", "tag": "HS-022", "set": "", "effects": ["trip1", "slideA", "slideB", "closeXV808"]}, {"id": "r10", "cause": "TRIP GERAL CONSOLE", "tag": "HS-PB2", "set": "", "effects": ["trip1", "slideA", "slideB", "closeXV808"]}, {"id": "r11", "cause": "VAPOR DA GV-3901", "tag": "FAI392231", "set": "FIC2230 < 40 t/h", "effects": ["closeXV808", "sealpots"]}];
const INTERLOCK_SCENARIOS=[{"title": "Perda de ar de fluidização no C-3901A", "text": "O FSLL-2311 atua. Selecione os efeitos esperados conforme a matriz.", "row": "r4", "process": "A lógica procura preservar a condição do ramo por meio da atuação associada ao V12 de fluidização. No diagnóstico, correlacione aeração, mobilidade do catalisador, geração de vapor e resposta térmica."}, {"title": "Trip do J-3901", "text": "O XSJ3901 indica trip do J-3901. Monte a assinatura lógica esperada.", "row": "r7", "process": "A perda da fonte normal de ar exige atenção à sustentação da aeração/elevação. Aeração ↓ pode levar a mobilidade/circulação ↓, remoção de calor ↓, vapor ↓ e tendência de T do D-3904 ↑."}, {"title": "Trip manual pelo SDCD", "text": "O HS-022 é acionado. Quais efeitos devem aparecer na lógica?", "row": "r9", "process": "Este cenário produz uma assinatura mais ampla que uma simples perda de ar: há trip de 1º evento, fechamento dos dois slides e fechamento da XV-808."}, {"title": "Nível baixo do F-3982", "text": "O LSLL-2322 atinge a condição de 50%. Identifique a resposta da matriz.", "row": "r1", "process": "Além do alarme/condição de instrumento em falha indicada na matriz, os dois slides são fechados. Relacione a ação com a proteção do circuito de geração de vapor e inventário do drum."}, {"title": "Baixa vazão de vapor da GV-3901", "text": "FAI392231 / FIC2230 fica abaixo de 40 t/h. Quais efeitos aparecem?", "row": "r11", "process": "A assinatura dessa condição é diferente dos trips gerais: fechamento da XV-808 e desvio dos potes de selagem."}];

let interlockState={mode:'home',row:null,selected:new Set(),score:0,total:0,exam:[],examIndex:0,examResults:[]};

function effectById(id){return INTERLOCK_EFFECTS.find(e=>e.id===id)}
function rowById(id){return INTERLOCK_ROWS.find(r=>r.id===id)}
function sameSet(a,b){return a.length===b.length&&a.every(x=>b.includes(x))}

function renderInterlockModule(c){
  interlockState.mode='home';
  c.innerHTML=`<h2 class="training-title">🧩 Lógica de Intertravamento — Catcooler</h2>
  <p class="training-sub">Treine a leitura da matriz causa × efeito como se estivesse acompanhando a lógica no SDCD. Os pontos verdes da matriz fornecida foram transcritos para os exercícios.</p>
  <div class="interlock-mode-grid">
    <button class="module-card" onclick="startCauseEffect()"><h3>Causa → Efeito</h3><p>Receba uma causa e marque todos os efeitos associados.</p></button>
    <button class="module-card" onclick="startEffectCause()"><h3>Efeito → Causa</h3><p>Reconheça a causa a partir da assinatura lógica observada.</p></button>
    <button class="module-card" onclick="startBuildLogic()"><h3>Montar lógica</h3><p>Construa a sequência correta selecionando os blocos de efeito.</p></button>
    <button class="module-card" onclick="startMatrixPractice()"><h3>Completar matriz</h3><p>Reponha os pontos verdes apagados de uma linha.</p></button>
    <button class="module-card" onclick="startInterlockScenarios()"><h3>Cenários</h3><p>Integre lógica, diagnóstico e consequência de processo.</p></button>
    <button class="module-card engineering-feature" onclick="startInterlockExam()"><h3>Modo prova</h3><p>10 rodadas aleatórias sem mostrar a matriz.</p></button>
  </div>
  <div class="training-box" style="margin-top:12px">
    <h3>Matriz original de referência</h3>
    <p class="training-sub">Use somente para estudo/validação. Em operação real prevalecem a matriz oficial vigente, P&IDs, permissivos, procedimentos e intertravamentos aprovados.</p>
    <button class="btn" onclick="toggleInterlockReference()">Mostrar / ocultar matriz</button>
    <div id="interlockReference" class="interlock-reference hidden"><img src="intertravamento_catcooler.png" alt="Matriz de intertravamento Catcooler"></div>
  </div>
  <div class="training-box">
    <h3>Como o desempenho será avaliado</h3>
    <div class="interlock-skill-pills">
      <span>Leitura da matriz</span><span>Memorização</span><span>Diagnóstico</span><span>Compreensão de processo</span>
    </div>
  </div>`;
}

function toggleInterlockReference(){
  document.getElementById('interlockReference')?.classList.toggle('hidden');
}

function renderEffectsChecklist(containerId,selected=[]) {
  const s=new Set(selected);
  const el=document.getElementById(containerId); if(!el)return;
  el.innerHTML=INTERLOCK_EFFECTS.map(e=>`
    <button class="interlock-effect ${s.has(e.id)?'selected':''}" data-effect="${e.id}" onclick="toggleInterlockEffect(this,'${e.id}')">
      <span class="effect-check">${s.has(e.id)?'✓':'○'}</span>
      <span><strong>${e.label}</strong>${e.tag?`<small>${e.tag}</small>`:''}</span>
    </button>`).join('');
  interlockState.selected=new Set(selected);
}

function toggleInterlockEffect(btn,id){
  if(interlockState.selected.has(id))interlockState.selected.delete(id);else interlockState.selected.add(id);
  btn.classList.toggle('selected',interlockState.selected.has(id));
  const mark=btn.querySelector('.effect-check'); if(mark)mark.textContent=interlockState.selected.has(id)?'✓':'○';
}

function randomInterlockRow(){
  return INTERLOCK_ROWS[Math.floor(Math.random()*INTERLOCK_ROWS.length)];
}

function causeCard(r){
  return `<div class="interlock-cause-card"><span>CAUSA</span><h3>${r.cause}</h3><div class="interlock-meta"><b>${r.tag}</b>${r.set?`<b>SET: ${r.set}</b>`:''}</div></div>`;
}

function startCauseEffect(rowId=null){
  const c=$('#trainingContent'),r=rowId?rowById(rowId):randomInterlockRow();
  interlockState={...interlockState,mode:'causeEffect',row:r,selected:new Set()};
  c.innerHTML=`<div class="training-actions"><button class="btn" onclick="renderInterlockModule($('#trainingContent'))">← Menu da lógica</button></div>
  <h2 class="training-title">Causa → Efeito</h2>${causeCard(r)}
  <p class="training-sub">Marque <strong>todos</strong> os efeitos que pertencem a esta causa.</p>
  <div id="interlockEffects" class="interlock-effects"></div>
  <div class="training-actions"><button class="btn primary" onclick="validateCauseEffect()">Validar lógica</button><button class="btn" onclick="startCauseEffect()">Nova causa</button></div>
  <div id="interlockFeedback"></div>`;
  renderEffectsChecklist('interlockEffects');
}

function validateCauseEffect(){
  const r=interlockState.row, chosen=[...interlockState.selected], ok=sameSet(chosen,r.effects);
  const fb=$('#interlockFeedback');
  const missed=r.effects.filter(x=>!chosen.includes(x)),extra=chosen.filter(x=>!r.effects.includes(x));
  document.querySelectorAll('#interlockEffects .interlock-effect').forEach(btn=>{
    const id=btn.dataset.effect;
    btn.classList.remove('logic-correct','logic-wrong','logic-missed');
    if(r.effects.includes(id))btn.classList.add(chosen.includes(id)?'logic-correct':'logic-missed');
    else if(chosen.includes(id))btn.classList.add('logic-wrong');
  });
  fb.innerHTML=`<div class="feedback-box ${ok?'logic-ok':'logic-attention'}"><strong>${ok?'✓ Lógica correta':'Revise a assinatura lógica'}</strong>
    ${missed.length?`<p><b>Faltou:</b> ${missed.map(id=>effectById(id).label).join(' • ')}</p>`:''}
    ${extra.length?`<p><b>Selecionado indevidamente:</b> ${extra.map(id=>effectById(id).label).join(' • ')}</p>`:''}
    <p><b>Resposta da matriz:</b> ${r.effects.map(id=>effectById(id).label).join(' → ')}</p></div>`;
  recordTraining('interlock','Causa → Efeito',ok?1:0,1,{'Leitura da matriz':{score:ok?1:0,max:1}},ok?[]:[r.id]);
}

function signatureHtml(r){
  return `<div class="interlock-signature">${r.effects.map(id=>`<span>${effectById(id).label}</span>`).join('')}</div>`;
}

function startEffectCause(){
  const c=$('#trainingContent'),r=randomInterlockRow();
  const wrong=shuffle(INTERLOCK_ROWS.filter(x=>x.id!==r.id)).slice(0,3);
  const opts=shuffle([r,...wrong]);
  interlockState={...interlockState,mode:'effectCause',row:r};
  c.innerHTML=`<div class="training-actions"><button class="btn" onclick="renderInterlockModule($('#trainingContent'))">← Menu da lógica</button></div>
  <h2 class="training-title">Efeito → Causa</h2>
  <p class="training-sub">A seguinte assinatura apareceu na lógica. Qual causa é compatível?</p>
  ${signatureHtml(r)}
  <div class="interlock-answer-list">${opts.map(o=>`<button class="choice-btn" data-row="${o.id}" onclick="answerEffectCause('${o.id}',this)"><strong>${o.cause}</strong><br><small>${o.tag}${o.set?' • '+o.set:''}</small></button>`).join('')}</div>
  <div id="interlockFeedback"></div>`;
}

function answerEffectCause(id,btn){
  const ok=id===interlockState.row.id;
  document.querySelectorAll('.interlock-answer-list .choice-btn').forEach(b=>b.disabled=true);
  btn.classList.add(ok?'logic-choice-correct':'logic-choice-wrong');
  if(!ok){
    document.querySelector(`.interlock-answer-list .choice-btn[data-row="${interlockState.row.id}"]`)?.classList.add('logic-choice-correct');
  }
  $('#interlockFeedback').innerHTML=`<div class="feedback-box"><strong>${ok?'✓ Correto':'Resposta incorreta'}</strong><p>A assinatura corresponde a <b>${interlockState.row.cause} — ${interlockState.row.tag}</b>.</p></div>`;
  recordTraining('interlock','Efeito → Causa',ok?1:0,1,{'Diagnóstico':{score:ok?1:0,max:1}},ok?[]:[interlockState.row.id]);
}

function startBuildLogic(){
  const c=$('#trainingContent'),r=randomInterlockRow();
  interlockState={...interlockState,mode:'build',row:r,selected:new Set()};
  c.innerHTML=`<div class="training-actions"><button class="btn" onclick="renderInterlockModule($('#trainingContent'))">← Menu da lógica</button></div>
  <h2 class="training-title">Montar lógica</h2>${causeCard(r)}
  <p class="training-sub">Selecione os blocos que devem compor a saída lógica. No celular, toque nos blocos; no PC funciona da mesma forma.</p>
  <div id="interlockEffects" class="interlock-effects build-logic"></div>
  <div class="training-box"><h3>Lógica montada</h3><div id="builtLogic" class="built-logic"><span class="muted-inline">Nenhum efeito selecionado.</span></div></div>
  <div class="training-actions"><button class="btn primary" onclick="validateBuildLogic()">VALIDAR LÓGICA</button><button class="btn" onclick="startBuildLogic()">Nova lógica</button></div>
  <div id="interlockFeedback"></div>`;
  renderEffectsChecklist('interlockEffects');
  document.querySelectorAll('#interlockEffects .interlock-effect').forEach(btn=>btn.addEventListener('click',renderBuiltLogic));
}

function renderBuiltLogic(){
  const box=$('#builtLogic'); if(!box)return;
  const arr=[...interlockState.selected];
  box.innerHTML=arr.length?arr.map(id=>`<span class="built-block">${effectById(id).label}</span>`).join('<span class="logic-arrow">→</span>'):'<span class="muted-inline">Nenhum efeito selecionado.</span>';
}

function validateBuildLogic(){
  const r=interlockState.row,chosen=[...interlockState.selected],ok=sameSet(chosen,r.effects);
  $('#interlockFeedback').innerHTML=`<div class="feedback-box"><strong>${ok?'✓ Lógica montada corretamente':'A lógica ainda não corresponde à matriz'}</strong>
  <p>${r.effects.map(id=>effectById(id).label).join(' → ')}</p></div>`;
  recordTraining('interlock','Montar lógica',ok?1:0,1,{'Memorização':{score:ok?1:0,max:1}},ok?[]:[r.id]);
}

function startMatrixPractice(){
  const c=$('#trainingContent'),r=randomInterlockRow();
  interlockState={...interlockState,mode:'matrix',row:r,selected:new Set()};
  c.innerHTML=`<div class="training-actions"><button class="btn" onclick="renderInterlockModule($('#trainingContent'))">← Menu da lógica</button></div>
  <h2 class="training-title">Completar matriz</h2>
  <p class="training-sub">Os pontos verdes desta linha foram apagados. Clique nas células que deveriam estar marcadas.</p>
  ${causeCard(r)}
  <div class="matrix-practice-wrap"><table class="matrix-practice">
    <thead><tr>${INTERLOCK_EFFECTS.map(e=>`<th><span>${e.label}</span>${e.tag?`<small>${e.tag}</small>`:''}</th>`).join('')}</tr></thead>
    <tbody><tr>${INTERLOCK_EFFECTS.map(e=>`<td><button data-effect="${e.id}" onclick="toggleMatrixCell(this,'${e.id}')"></button></td>`).join('')}</tr></tbody>
  </table></div>
  <div class="training-actions"><button class="btn primary" onclick="validateMatrixPractice()">VALIDAR MATRIZ</button><button class="btn" onclick="startMatrixPractice()">Nova linha</button></div>
  <div id="interlockFeedback"></div>`;
}

function toggleMatrixCell(btn,id){
  if(interlockState.selected.has(id))interlockState.selected.delete(id);else interlockState.selected.add(id);
  btn.classList.toggle('selected',interlockState.selected.has(id));
}

function validateMatrixPractice(){
  const r=interlockState.row,chosen=[...interlockState.selected],ok=sameSet(chosen,r.effects);
  document.querySelectorAll('.matrix-practice td button').forEach(btn=>{
    const id=btn.dataset.effect;
    btn.classList.remove('cell-correct','cell-wrong','cell-missed');
    if(r.effects.includes(id))btn.classList.add(chosen.includes(id)?'cell-correct':'cell-missed');
    else if(chosen.includes(id))btn.classList.add('cell-wrong');
  });
  $('#interlockFeedback').innerHTML=`<div class="feedback-box"><strong>${ok?'✓ 100% — matriz correta':'Compare as células destacadas'}</strong>
  <p><span class="legend-dot green"></span> correto &nbsp; <span class="legend-dot red"></span> indevido &nbsp; <span class="legend-dot yellow"></span> faltou selecionar</p></div>`;
  recordTraining('interlock','Completar matriz',ok?1:0,1,{'Leitura da matriz':{score:ok?1:0,max:1}},ok?[]:[r.id]);
}

function startInterlockScenarios(){
  const c=$('#trainingContent');
  c.innerHTML=`<div class="training-actions"><button class="btn" onclick="renderInterlockModule($('#trainingContent'))">← Menu da lógica</button></div>
  <h2 class="training-title">Cenários de intertravamento</h2>
  <p class="training-sub">Escolha um cenário e relacione a lógica automática com a consequência de processo.</p>
  <div class="training-grid">${INTERLOCK_SCENARIOS.map((s,i)=>`<div class="module-card" onclick="openInterlockScenario(${i})"><h3>${s.title}</h3><p>${s.text}</p></div>`).join('')}</div>`;
}

function openInterlockScenario(i){
  const s=INTERLOCK_SCENARIOS[i],r=rowById(s.row),c=$('#trainingContent');
  interlockState={...interlockState,mode:'scenario',row:r,selected:new Set(),scenario:i};
  c.innerHTML=`<div class="training-actions"><button class="btn" onclick="startInterlockScenarios()">← Cenários</button></div>
  <h2 class="training-title">${s.title}</h2>
  <div class="training-box"><p>${s.text}</p></div>
  ${causeCard(r)}
  <div id="interlockEffects" class="interlock-effects"></div>
  <div class="training-actions"><button class="btn primary" onclick="validateInterlockScenario()">Confirmar resposta</button></div>
  <div id="interlockFeedback"></div>`;
  renderEffectsChecklist('interlockEffects');
}

function validateInterlockScenario(){
  const s=INTERLOCK_SCENARIOS[interlockState.scenario],r=interlockState.row,chosen=[...interlockState.selected],ok=sameSet(chosen,r.effects);
  $('#interlockFeedback').innerHTML=`<div class="feedback-box"><strong>${ok?'✓ Assinatura lógica correta':'Assinatura lógica incompleta/incorreta'}</strong>
  <p><b>Efeitos:</b> ${r.effects.map(id=>effectById(id).label).join(' → ')}</p>
  <p><b>Integração com o processo:</b> ${s.process}</p></div>`;
  recordTraining('interlock','Cenário de intertravamento',ok?1:0,1,{'Compreensão de processo':{score:ok?1:0,max:1}},ok?[]:[r.id]);
}

function startInterlockExam(){
  const pool=shuffle(INTERLOCK_ROWS).slice(0,Math.min(10,INTERLOCK_ROWS.length));
  interlockState={...interlockState,mode:'exam',exam:pool,examIndex:0,examResults:[],selected:new Set()};
  renderInterlockExamQuestion();
}

function renderInterlockExamQuestion(){
  const c=$('#trainingContent'),i=interlockState.examIndex,r=interlockState.exam[i];
  if(!r)return finishInterlockExam();
  interlockState.row=r;interlockState.selected=new Set();
  c.innerHTML=`<div class="training-actions"><button class="btn" onclick="renderInterlockModule($('#trainingContent'))">Sair da prova</button></div>
  <h2 class="training-title">Modo prova — ${i+1} / ${interlockState.exam.length}</h2>
  <div class="progressbar"><span style="width:${Math.round((i/interlockState.exam.length)*100)}%"></span></div>
  ${causeCard(r)}
  <p class="training-sub">Marque todos os efeitos. A resposta só será mostrada ao final da prova.</p>
  <div id="interlockEffects" class="interlock-effects"></div>
  <div class="training-actions"><button class="btn primary" onclick="submitInterlockExamAnswer()">Confirmar e avançar</button></div>`;
  renderEffectsChecklist('interlockEffects');
}

function submitInterlockExamAnswer(){
  const r=interlockState.row,chosen=[...interlockState.selected],ok=sameSet(chosen,r.effects);
  interlockState.examResults.push({row:r.id,ok,chosen});
  interlockState.examIndex++;
  renderInterlockExamQuestion();
}

function finishInterlockExam(){
  const c=$('#trainingContent'),res=interlockState.examResults,score=res.filter(x=>x.ok).length,pct=Math.round(score/res.length*100);
  const weak=res.filter(x=>!x.ok).map(x=>rowById(x.row));
  c.innerHTML=`<h2 class="training-title">Resultado — Lógica de Intertravamento</h2>
  <div class="metric-grid"><div class="metric"><b>${score}/${res.length}</b><small>Acertos</small></div><div class="metric"><b>${pct}%</b><small>Resultado</small></div><div class="metric"><b>${weak.length}</b><small>Pontos a revisar</small></div></div>
  <div class="training-box"><h3>Diagnóstico</h3>
    ${weak.length?weak.map(r=>`<p><b>${r.cause} — ${r.tag}</b><br>${r.effects.map(id=>effectById(id).label).join(' • ')}</p>`).join(''):'<p>Excelente: todas as assinaturas foram reconhecidas.</p>'}
  </div>
  <div class="training-actions"><button class="btn primary" onclick="startInterlockExam()">Refazer prova</button><button class="btn" onclick="renderInterlockModule($('#trainingContent'))">Voltar ao módulo</button></div>`;
  recordTraining('interlock','Prova de intertravamento',score,res.length,{'Memorização':{score,max:res.length}},weak.map(r=>r.id));
}

const TRAIN_MODULES=[['home','Visão geral'],['interlock','🧩 Lógica de Intertravamento'],['unitops','Operações Unitárias'],['fluidmech','Mecânica dos Fluidos'],['scenarios','Cenários encadeados'],['trends','Diagnóstico de tendências'],['drum','Shrink / Swell'],['ab','Comparação A × B'],['trip','Trip GV-3901'],['equipmentQuiz','Quiz por equipamento'],['causal','Causa × consequência'],['shift','Passagem de turno'],['badActions','Ações que pioram'],['animation','Animações'],['history','Histórico / desempenho']];
function openTraining(m='home'){$('#trainingDrawer').classList.add('open');openTrainingModule(m)}
function closeTraining(){$('#trainingDrawer').classList.remove('open')}
function openTrainingModule(id){renderTrainingNav(id);setLastModule(TRAIN_MODULES.find(x=>x[0]===id)?.[1]||id);$('#trainingBreadcrumb').textContent=TRAIN_MODULES.find(x=>x[0]===id)?.[1]||id;const c=$('#trainingContent');const fn={home:renderTrainingHome,interlock:renderInterlockModule,unitops:renderUnitOpsModule,fluidmech:renderFluidMechModule,scenarios:renderScenarioHome,trends:renderTrendModule,drum:renderDrumModule,ab:renderABModule,trip:renderTripModule,equipmentQuiz:renderEquipmentQuiz,causal:renderCausalModule,shift:renderShiftModule,badActions:renderBadActions,animation:renderAnimationModule,history:renderHistoryModule}[id];if(fn)fn(c)}
function renderTrainingNav(active){$('#trainingNav').innerHTML=TRAIN_MODULES.map(([id,l])=>`<button class="${id===active?'active':''}" onclick="openTrainingModule('${id}')">${l}</button>`).join('')}
function renderTrainingHome(c){const h=loadTrainHistory();c.innerHTML=`<h2 class="training-title">Centro de Treinamento</h2><p class="training-sub">Layout do HMI congelado. Aqui ficam os módulos de prática, diagnóstico e avaliação. ${h.lastModule?`Último módulo: <strong>${h.lastModule}</strong>`:''}</p><div class="training-grid"><div class="module-card interlock-feature" onclick="openTrainingModule('interlock')"><h3>🧩 Lógica de Intertravamento</h3><p>Causa → efeito, efeito → causa, completar matriz, cenários e prova.</p></div><div class="module-card engineering-feature" onclick="openTrainingModule('unitops')"><h3>⚙️ Operações Unitárias</h3><p>Transferência de calor, vaporização, separação, fluidização e transporte de sólidos.</p></div><div class="module-card engineering-feature" onclick="openTrainingModule('fluidmech')"><h3>🌊 Mecânica dos Fluidos</h3><p>Vazão, perda de carga, bifásico, swell/shrink, fluidização, cavitação e transitórios.</p></div><div class="module-card" onclick="openTrainingModule('scenarios')"><h3>Cenários encadeados</h3><p>6 cenários × 4 decisões com risco acumulado.</p></div><div class="module-card" onclick="openTrainingModule('trends')"><h3>Diagnóstico de tendências</h3><p>PV, MV, vapor, nível, aeração e temperatura.</p></div><div class="module-card" onclick="openTrainingModule('drum')"><h3>Shrink / Swell</h3><p>Simulador visual do drum.</p></div><div class="module-card" onclick="openTrainingModule('ab')"><h3>C-3901A × B</h3><p>Diagnóstico de assimetria.</p></div><div class="module-card" onclick="openTrainingModule('history')"><h3>Relatório</h3><p>Histórico, habilidades e erros recorrentes.</p></div></div><div class="training-box" style="margin-top:12px"><h3>Quiz por nível</h3><div class="training-actions"><button class="btn" onclick="startTrainQuiz('basico',12,null)">Básico</button><button class="btn" onclick="startTrainQuiz('operacional',12,null)">Operacional</button><button class="btn primary" onclick="startTrainQuiz('avancado',12,null)">Avançado</button><button class="btn green" onclick="startTrainQuiz('misto',15,null)">Misto</button></div></div>`}

function startTrainQuiz(level='misto',count=12,equipment=null){let pool=TRAIN_QUESTION_BANK.filter(q=>(level==='misto'||q.level===level)&&(!equipment||q.equipment===equipment));if(pool.length<count&&equipment)pool=TRAIN_QUESTION_BANK.filter(q=>q.equipment===equipment);pool=shuffle(pool).slice(0,Math.min(count,pool.length));trainQuiz=pool.map(q=>({...q,shown:shuffle(q.a.map((t,i)=>({t,orig:i})))}));trainConfig={level,count,equipment};renderTrainQuiz()}
function renderTrainQuiz(){const c=$('#trainingContent');c.innerHTML=`<h2 class="training-title">Quiz ${trainConfig.equipment?'por equipamento':'por nível'}</h2><p class="training-sub">Alternativas embaralhadas. Corrija ao final para ver desempenho por habilidade.</p><div id="trainQuizBox">${trainQuiz.map((q,i)=>`<div class="train-question" data-i="${i}"><h4>${i+1}. ${q.q}</h4>${q.shown.map((o,j)=>`<label><input type="radio" name="tq${i}" value="${o.orig}"> ${String.fromCharCode(65+j)}. ${o.t}</label>`).join('')}<div class="train-feedback" id="tqfb${i}"></div></div>`).join('')}</div><button class="btn primary" onclick="gradeTrainQuiz()">Corrigir</button><div id="trainQuizResult"></div>`}
function gradeTrainQuiz(){let score=0,skills={},wrong=[];trainQuiz.forEach((q,i)=>{const card=document.querySelector(`.train-question[data-i="${i}"]`),sel=document.querySelector(`input[name="tq${i}"]:checked`);if(!skills[q.skill])skills[q.skill]={score:0,max:0};skills[q.skill].max++;card.querySelectorAll('label').forEach(l=>l.classList.remove('correct','wrong'));if(!sel){wrong.push(q.id);$('#tqfb'+i).textContent='Não respondida. '+q.explanation;return}const ok=+sel.value===q.c;if(ok){score++;skills[q.skill].score++}else wrong.push(q.id);sel.closest('label').classList.add(ok?'correct':'wrong');const correct=[...card.querySelectorAll('input')].find(r=>+r.value===q.c);if(correct)correct.closest('label').classList.add('correct');$('#tqfb'+i).textContent=q.explanation});const pct=Math.round(score/trainQuiz.length*100);const skillHtml=Object.entries(skills).map(([k,v])=>{const p=Math.round(v.score/v.max*100);return `<div class="skill-row"><span>${k}</span><div class="bar"><span style="width:${p}%"></span></div><b>${p}%</b></div>`}).join('');$('#trainQuizResult').innerHTML=`<div class="training-box"><h3>Resultado: ${score}/${trainQuiz.length} — ${pct}%</h3><div class="skill-bars">${skillHtml}</div></div>`;recordTraining('quiz',trainConfig.equipment?'Quiz por equipamento':'Quiz por nível',score,trainQuiz.length,skills,wrong)}
function quizCurrentItem(){if(!currentKey)return toast('Selecione uma lâmpada primeiro');closeTraining();openTraining('equipmentQuiz');startTrainQuiz('misto',6,currentKey)}

function renderScenarioHome(c){c.innerHTML=`<h2 class="training-title">Cenários operacionais encadeados</h2><p class="training-sub">Cada cenário tem 4 decisões. Risco e efeitos anteriores permanecem visíveis.</p><div class="training-grid">${TRAIN_SCENARIOS.map((s,i)=>`<div class="module-card" onclick="startScenario(${i})"><h3>${s.title}</h3><p>${s.intro}</p><small>${s.skill}</small></div>`).join('')}</div>`}
function startScenario(i){activeScenario=TRAIN_SCENARIOS[i];scenarioStep=0;scenarioScore=0;scenarioRisk=0;scenarioEffects=[];renderScenarioStep()}
function renderScenarioStep(){const c=$('#trainingContent'),s=activeScenario,step=s.steps[scenarioStep],prev=scenarioEffects.length?`<div class="feedback-box"><strong>Efeito anterior:</strong> ${scenarioEffects.at(-1)}</div>`:'';c.innerHTML=`<h2 class="training-title">${s.title}</h2><p class="training-sub">${s.intro}</p><div class="progressbar"><span style="width:${scenarioStep/s.steps.length*100}%"></span></div><div class="scenario-state">Etapa ${scenarioStep+1}/${s.steps.length} • Pontos ${scenarioScore} • Risco ${scenarioRisk}</div>${prev}<div class="training-box"><h3>${step.q}</h3>${step.choices.map((x,j)=>`<button class="choice-btn" onclick="answerScenario(${j})">${x.t}</button>`).join('')}</div>`}
function answerScenario(j){const x=activeScenario.steps[scenarioStep].choices[j];scenarioScore+=x.score;scenarioRisk+=x.risk;scenarioEffects.push(x.fb);scenarioStep++;if(scenarioStep>=activeScenario.steps.length){const max=activeScenario.steps.length*2,pct=Math.round(scenarioScore/max*100);$('#trainingContent').innerHTML=`<h2 class="training-title">${activeScenario.title} — resultado</h2><div class="metric-grid"><div class="metric"><b>${scenarioScore}/${max}</b><small>Decisões</small></div><div class="metric"><b>${pct}%</b><small>Desempenho</small></div><div class="metric"><b>${scenarioRisk}</b><small>Risco</small></div></div><div class="training-box">${scenarioEffects.map((e,i)=>`<p><strong>${i+1}.</strong> ${e}</p>`).join('')}</div><button class="btn" onclick="renderScenarioHome($('#trainingContent'))">Outro cenário</button>`;recordTraining('cenario',activeScenario.title,scenarioScore,max,{[activeScenario.skill]:{score:scenarioScore,max}})}else renderScenarioStep()}

function renderTrendModule(c){const x=TREND_CASES[trendIndex];c.innerHTML=`<h2 class="training-title">Diagnóstico de tendências</h2><p class="training-sub">Interprete o conjunto antes de agir.</p><div class="training-box"><h3>${x.title}</h3><p>${x.prompt}</p>${x.options.map((o,i)=>`<button class="choice-btn" onclick="answerTrend(${i})">${o}</button>`).join('')}<div id="trendFb"></div></div><div class="training-actions"><button class="btn" onclick="trendIndex=(trendIndex+TREND_CASES.length-1)%TREND_CASES.length;renderTrendModule($('#trainingContent'))">Anterior</button><button class="btn" onclick="trendIndex=(trendIndex+1)%TREND_CASES.length;renderTrendModule($('#trainingContent'))">Próximo</button></div>`}
function answerTrend(i){const x=TREND_CASES[trendIndex],ok=i===x.c;$('#trendFb').innerHTML=`<div class="feedback-box">${ok?'✓ ':''}${x.fb}</div>`;recordTraining('tendencia',x.title,ok?1:0,1,{Diagnóstico:{score:ok?1:0,max:1}})}

function renderDrumModule(c){c.innerHTML=`<h2 class="training-title">Simulador Shrink / Swell</h2><p class="training-sub">Nível aparente pode divergir do inventário real.</p><div class="sim-controls"><button class="btn" onclick="renderDrumSim('increase')">Aumento de vapor</button><button class="btn" onclick="renderDrumSim('decrease')">Redução de vapor</button><button class="btn" onclick="renderDrumSim('stable')">Estável</button></div><div id="drumSimArea"></div><div class="training-box"><h3>Regra</h3><p>Leia nível + HBF + vapor + duração do desvio. Não reaja apenas ao valor instantâneo do nível.</p></div>`;renderDrumSim('increase')}
function pts(a,w=600,h=180,p=20){const ma=Math.max(...a),mi=Math.min(...a),sp=ma-mi||1;return a.map((v,i)=>`${p+i*(w-2*p)/(a.length-1)},${h-p-(v-mi)*(h-2*p)/sp}`).join(' ')}
function renderDrumSim(k){const S={increase:{title:'Aumento de vapor — swell',l:[50,52,58,67,72,68,63,60],v:[50,55,68,82,90,88,85,84],h:[50,51,55,62,70,76,80,82],cls:'swell',txt:'O nível sobe rapidamente pela expansão de bolhas; o balanço pode ainda estar negativo.'},decrease:{title:'Redução de vapor — shrink',l:[60,58,51,43,38,42,47,50],v:[82,78,65,52,45,44,45,46],h:[80,76,68,60,54,50,48,47],cls:'shrink',txt:'O colapso de bolhas reduz o nível aparente sem perda equivalente de massa.'},stable:{title:'Condição estável',l:[55,55,56,55,55,54,55,55],v:[65,65,66,65,65,65,64,65],h:[65,65,65,65,66,65,65,65],cls:'',txt:'HBF e vapor ficam próximos e o nível varia pouco.'}}[k];$('#drumSimArea').innerHTML=`<div class="drum-visual"><div class="drum-vessel"><div class="drum-water ${S.cls}"></div></div><div><h3>${S.title}</h3><p>${S.txt}</p></div></div><div class="sim-chart"><svg viewBox="0 0 620 210"><polyline points="${pts(S.l)}" fill="none" stroke="#ffc858" stroke-width="4"/><polyline points="${pts(S.v)}" fill="none" stroke="#66c2ff" stroke-width="3"/><polyline points="${pts(S.h)}" fill="none" stroke="#75d64c" stroke-width="3"/></svg><div class="legend"><span style="color:#ffc858">Nível</span><span style="color:#66c2ff">Vapor</span><span style="color:#75d64c">HBF</span></div></div>`}

function renderABModule(c){const x=AB_CASES[abIndex];c.innerHTML=`<h2 class="training-title">Comparação C-3901A × B</h2><p class="training-sub">Use o ramo saudável como referência.</p><div class="training-box"><h3>Caso ${abIndex+1}/${AB_CASES.length}</h3><p>${x.prompt}</p>${x.options.map((o,i)=>`<button class="choice-btn" onclick="answerAB(${i})">${o}</button>`).join('')}<div id="abFb"></div></div><button class="btn" onclick="abIndex=(abIndex+1)%AB_CASES.length;renderABModule($('#trainingContent'))">Próximo</button>`}
function answerAB(i){const x=AB_CASES[abIndex],ok=i===x.c;$('#abFb').innerHTML=`<div class="feedback-box">${ok?'✓ Diagnóstico coerente.':'Revise a comparação entre os ramos.'}</div>`;recordTraining('comparacao','A × B',ok?1:0,1,{Diagnóstico:{score:ok?1:0,max:1}})}

function renderTripModule(c){c.innerHTML=`<h2 class="training-title">Trip total da GV-3901</h2><p class="training-sub">Checklist conceitual; a lógica oficial prevalece.</p><div class="training-box"><ol><li>Reconhecer trip e causa/alarmes.</li><li>Confirmar comando de fechamento XV-808.</li><li>Confirmar posição e efeito de processo.</li><li>Verificar pressão/fluxo do sistema isolado.</li><li>Recompor apenas com condição segura e permissivos.</li></ol></div><div class="training-box"><button class="choice-btn" onclick="tripAnswer(0)">Reabrir XV-808 para testar curso.</button><button class="choice-btn" onclick="tripAnswer(1)">Tratar falta de confirmação como possível falha de barreira.</button><button class="choice-btn" onclick="tripAnswer(2)">Usar somente nível do F-3982 como confirmação.</button><div id="tripFb"></div></div>`}
function tripAnswer(i){const ok=i===1;$('#tripFb').innerHTML=`<div class="feedback-box">${ok?'✓ Correto: confirme atuação real da barreira.':'Essa opção reduz a qualidade/segurança do diagnóstico.'}</div>`;recordTraining('trip','GV-3901 / XV-808',ok?1:0,1,{Segurança:{score:ok?1:0,max:1}})}

const LOCATE=[['Localize o F-3982.','f3982'],['Localize o controle de nível/HBF.','hbflevel'],['Localize o TIC-39031.','tic39031'],['Localize o AR J-3901.','arj3901'],['Localize o AR J-3982.','arj3982'],['Localize o V-12 emergência.','v12emerg'],['Localize a XV-808.','xv808'],['Localize um catcooler C-3901A/B.','c3901ab']];
function renderLocateModule(c){c.innerHTML=`<h2 class="training-title">Localização visual</h2><p class="training-sub">O painel fecha e você deve tocar na lâmpada correta.</p><button class="btn primary" onclick="startLocate()">Iniciar desafio</button><div id="locateResult"></div>`}
function startLocate(){const p=LOCATE[Math.floor(Math.random()*LOCATE.length)];locateMode={q:p[0],key:p[1]};closeTraining();const b=document.createElement('div');b.id='locateBanner';b.className='locate-banner';b.textContent=p[0];document.body.appendChild(b)}
function handleHotspotClick(h){if(locateMode){const ok=h.dataset.key===locateMode.key,q=locateMode.q;document.getElementById('locateBanner')?.remove();locateMode=null;openTraining('locate');$('#locateResult').innerHTML=`<div class="feedback-box">${ok?'✓ Localização correta.':'Localização incorreta. Tente novamente.'}</div>`;recordTraining('localizacao',q,ok?1:0,1,{Localização:{score:ok?1:0,max:1}});return}selectItem(h.dataset.key,h)}

function renderEquipmentQuiz(c){const O=[['f3982','F-3982'],['c3901ab','C-3901A/B'],['tic39031','TIC-39031'],['arj3901','AR J-3901'],['arj3982','AR J-3982'],['v12emerg','V-12 emergência'],['hbflevel','Nível/HBF'],['xv808','XV-808']];c.innerHTML=`<h2 class="training-title">Quiz por equipamento</h2><div class="training-grid">${O.map(([k,l])=>`<div class="module-card" onclick="startTrainQuiz('misto',6,'${k}')"><h3>${l}</h3><p>Testar este ponto.</p></div>`).join('')}</div>`}
const CHAINS=[['Perda de AR J-3901','↓ aeração','↓ circulação','↓ Q removido','↓ vapor','↑ tendência T D-3904'],['Limitação C-3901B','assimetria A/B','↓ remoção no B','TIC pede mais','MV elevada','PV pode permanecer alta'],['Aumento súbito de vapor','mais bolhas','swell','nível aparente ↑','ΔHBF−vapor pode ficar negativo','risco de sobrecorreção'],['Redução súbita de vapor','colapso de bolhas','shrink','nível aparente ↓','inventário real pode não cair igual','evitar sobrecorreção'],['Trip total GV-3901','comando fechar XV-808','confirmar posição','confirmar resposta','manter isolamento','recompor com permissivos']];
function renderCausalModule(c){c.innerHTML=`<h2 class="training-title">Causa × consequência</h2><p class="training-sub">Construa raciocínio de processo.</p>${CHAINS.map(ch=>`<div class="training-box"><div class="causal-chain">${ch.map((x,i)=>`${i?'<b>→</b>':''}<span>${x}</span>`).join('')}</div></div>`).join('')}<button class="btn primary" onclick="startTrainQuiz('avancado',12,null)">Treinar no quiz avançado</button>`}

function renderShiftModule(c){const x=SHIFT_CASES[shiftIndex],items=shuffle([...x.critical.map(t=>({t,ok:true})),...x.non.map(t=>({t,ok:false}))]);c.innerHTML=`<h2 class="training-title">Passagem de turno</h2><div class="training-box"><h3>${x.title}</h3>${x.facts.map(f=>`<p>• ${f}</p>`).join('')}</div><div class="training-box shift-check" id="shiftOptions">${items.map(it=>`<label><input type="checkbox" data-ok="${it.ok}"> ${it.t}</label>`).join('')}</div><button class="btn primary" onclick="gradeShift()">Avaliar passagem</button><div id="shiftFb"></div><button class="btn" onclick="shiftIndex=(shiftIndex+1)%SHIFT_CASES.length;renderShiftModule($('#trainingContent'))">Outro caso</button>`}
function gradeShift(){const b=[...document.querySelectorAll('#shiftOptions input')];let s=0;b.forEach(x=>{if(x.checked===(x.dataset.ok==='true'))s++});$('#shiftFb').innerHTML=`<div class="feedback-box">Resultado ${s}/${b.length}. Priorize tendências, limitações, riscos, ações e pendências.</div>`;recordTraining('passagem','Passagem de turno',s,b.length,{Comunicação:{score:s,max:b.length}})}
function renderBadActions(c){const x=BAD_ACTIONS[badIndex];c.innerHTML=`<h2 class="training-title">Ações que podem piorar</h2><div class="training-box"><h3>${x.q}</h3>${x.options.map((o,i)=>`<button class="choice-btn" onclick="answerBad(${i})">${o}</button>`).join('')}<div id="badFb"></div></div><button class="btn" onclick="badIndex=(badIndex+1)%BAD_ACTIONS.length;renderBadActions($('#trainingContent'))">Próximo</button>`}
function answerBad(i){const x=BAD_ACTIONS[badIndex],ok=i===x.c;$('#badFb').innerHTML=`<div class="feedback-box">${ok?'✓ ':''}${x.fb}</div>`;recordTraining('acao_ruim','Ações que pioram',ok?1:0,1,{Diagnóstico:{score:ok?1:0,max:1}})}
function renderAnimationModule(c){c.innerHTML=`<h2 class="training-title">Mini animações</h2><div class="training-box"><h3>Fluxo térmico</h3><div class="flow-scene"><div class="flow-node">Catalisador quente<br>D-3904</div><div class="flow-arrow"></div><div class="flow-node">C-3901A/B<br>remove calor</div></div><div class="flow-scene"><div class="flow-node">Água / HBF</div><div class="flow-arrow"></div><div class="flow-node">F-3982<br>separa vapor</div></div></div><div class="video-placeholder">Os campos de vídeo existentes em cada lâmpada podem receber materiais complementares. As URLs ficam salvas localmente.</div><div class="training-actions"><button class="btn" onclick="openTrainingModule('drum')">Ver Shrink / Swell</button></div>`}
function renderHistoryModule(c){const h=loadTrainHistory(),A=h.attempts||[],S=h.skills||{},best=A.filter(a=>a.type==='quiz').reduce((b,a)=>!b||a.score/a.max>b.score/b.max?a:b,null),skills=Object.entries(S).length?Object.entries(S).map(([k,v])=>{const p=v.max?Math.round(v.score/v.max*100):0;return `<div class="skill-row"><span>${k}</span><div class="bar"><span style="width:${p}%"></span></div><b>${p}%</b></div>`}).join(''):'<p>Sem dados.</p>',wrong=Object.entries(h.wrong||{}).sort((a,b)=>b[1]-a[1]).slice(0,8);c.innerHTML=`<h2 class="training-title">Histórico e desempenho</h2><div class="metric-grid"><div class="metric"><b>${A.length}</b><small>Atividades</small></div><div class="metric"><b>${best?Math.round(best.score/best.max*100)+'%':'—'}</b><small>Melhor quiz</small></div><div class="metric"><b>${h.lastModule||'—'}</b><small>Último módulo</small></div></div><div class="training-box"><h3>Habilidades</h3><div class="skill-bars">${skills}</div></div><div class="training-box"><h3>Questões mais erradas</h3>${wrong.length?wrong.map(([id,n])=>`<p>${id}: ${n} erro(s)</p>`).join(''):'<p>Sem histórico de erros.</p>'}</div><div class="training-box"><h3>Últimas atividades</h3><table class="history-table"><tr><th>Tipo</th><th>Módulo</th><th>Resultado</th></tr>${A.slice(0,15).map(a=>`<tr><td>${a.type}</td><td>${a.name}</td><td>${a.score}/${a.max}</td></tr>`).join('')}</table></div><button class="btn danger" onclick="clearTrainingHistory()">Limpar histórico</button>`}
function clearTrainingHistory(){if(confirm('Apagar histórico local?')){localStorage.removeItem(TRAIN_HISTORY_KEY);renderHistoryModule($('#trainingContent'));toast('Histórico apagado')}}

window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("#installBtn").classList.remove("hidden")});
window.addEventListener("appinstalled",()=>{deferredPrompt=null;$("#installBtn").textContent="✓ App instalado";toast("Catcooler Concept U-39 instalado")});
async function installApp(){if(deferredPrompt){deferredPrompt.prompt();const choice=await deferredPrompt.userChoice;if(choice.outcome==="accepted")$("#installBtn").textContent="✓ Instalando...";deferredPrompt=null;return}const ua=navigator.userAgent||"";if(/iphone|ipad|ipod/i.test(ua))alert("No iPhone/iPad: toque em Compartilhar e escolha “Adicionar à Tela de Início”.");else alert("Se a janela de instalação não abrir, use o menu do navegador e escolha “Instalar app” ou “Adicionar à tela inicial”.")}
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
document.addEventListener("DOMContentLoaded",()=>{$$(".hotspot").forEach(h=>h.addEventListener("click",()=>handleHotspotClick(h)));$$(".chip").forEach(c=>c.addEventListener("click",()=>filterCategory(c.dataset.filter)));$("#search").addEventListener("keydown",e=>{if(e.key==="Enter")searchTag()});$("#info").style.display="none";syncEditable()});
