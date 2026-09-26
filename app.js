const DEFAULT_DATA = {"f3982": {"title": "F-3982 — Tubulão / steam drum do catcooler", "tag": "F-3982", "category": "equip", "function": "O F-3982 é o tubulão do sistema de geração de vapor do catcooler. Sua função é separar água e vapor, manter inventário de água de alimentação e fornecer volume de segurança para geração estável de vapor.", "process": "A água de alimentação entra no tubulão. O calor removido do catalisador nos catcoolers é transferido para a água, promovendo ebulição. A mistura água-vapor retorna ao tubulão, onde ocorre a separação: o vapor segue para consumo/exportação e a água recircula no circuito.", "impact": "Nível baixo reduz a reserva hidráulica e compromete a geração de vapor. Nível alto favorece arraste de água para a linha de vapor. O objetivo é manter nível estável e boa separação água-vapor.", "formula": "H₂O(l) → H₂O(v)\n\ndM/dt = F_HBF − F_vapor − F_purgas\n\nQ = ṁ·Cp·ΔT\nou\nQ = ṁ_vapor·λ", "obs": "Acompanhar nível, tendência de vapor gerado, diferença entre HBF e vapor produzido e coerência com a carga térmica."}, "c3901ab": {"title": "C-3901A / C-3901B — Catcoolers", "tag": "C-3901A/B", "category": "equip", "function": "Os catcoolers removem o excesso de calor do regenerador D-3904. Ao mesmo tempo, recuperam essa energia para gerar vapor no circuito do F-3982.", "process": "Parte do catalisador quente do regenerador circula pelos catcoolers. O calor é transferido indiretamente para a água do circuito. O catalisador retorna mais frio ao regenerador e o sistema produz vapor útil para a unidade.", "impact": "Remoção insuficiente de calor eleva a temperatura do regenerador. Remoção excessiva pode derrubar a temperatura além do desejado. O equilíbrio térmico é essencial para estabilidade e integridade.", "formula": "Q = U·A·ΔTlm\n\nQ = ṁ_cat·Cp_cat·(T_entrada − T_saida)\n\nC + O₂ → CO₂ + calor\n2C + O₂ → 2CO + calor", "obs": "Operacionalmente, os catcoolers controlam a temperatura do regenerador e recuperam energia na forma de vapor."}, "tic39031": {"title": "TIC-39031 — Controle de temperatura", "tag": "TIC-39031", "category": "control", "function": "Mantém a temperatura associada ao sistema catcooler/regenerador no valor desejado, modulando a intensidade de remoção de calor.", "process": "O controlador compara PV e SP. A partir do desvio, ajusta a variável manipulada do sistema do catcooler, aumentando ou reduzindo a remoção de calor conforme a necessidade.", "impact": "Temperatura alta indica remoção de calor insuficiente ou maior carga térmica. Temperatura baixa indica remoção excessiva. O controle evita excursões térmicas e estabiliza o balanço energético.", "formula": "e(t) = SP − PV\n\nSe PV > SP → aumentar resfriamento\nSe PV < SP → reduzir resfriamento", "obs": "Acompanhar PV, SP, MV e a coerência entre a resposta do controlador e a tendência da temperatura."}, "arj3901": {"title": "AR proveniente do J-3901", "tag": "AR J-3901", "category": "air", "function": "É a principal fonte de ar de suporte do sistema, ajudando na fluidização, aeração e sustentação operacional do circuito associado ao regenerador/catcooler.", "process": "Esse ar ajuda a manter mobilidade do catalisador, estabilidade hidráulica e, quando aplicável, contribui com o ambiente de combustão do sistema.", "impact": "Redução desse ar pode prejudicar fluidização e circulação. Excesso pode alterar hidráulica, ΔP e distribuição de fluxo.", "formula": "Função predominantemente operacional/hidráulica.\n\nQuando associado à combustão:\nC + O₂ → CO₂ + calor", "obs": "Pensar no AR do J-3901 como ar principal de suporte ao sistema."}, "arj3982": {"title": "AR proveniente do J-3982", "tag": "AR J-3982", "category": "air", "function": "Atua como fonte auxiliar/complementar de ar para o sistema do catcooler, ajudando no ajuste fino da aeração/fluidização.", "process": "Ele reforça a operação do circuito quando necessário, contribuindo para manter circulação do catalisador, aeração dos pontos específicos e estabilidade da troca térmica.", "impact": "Sua indisponibilidade reduz flexibilidade operacional e pode comprometer o ajuste fino do sistema.", "formula": "Função predominantemente operacional.\n\nMaior aeração → melhor mobilidade do leito/catalisador, respeitados os limites do sistema.", "obs": "Pensar no J-3982 como apoio ao sistema, principalmente para estabilidade e reforço operacional."}, "v12emerg": {"title": "V-12 Emergência", "tag": "V-12 EMERG.", "category": "steam", "function": "É o vapor utilitário de emergência usado para contingência, partida ou suporte operacional.", "process": "No catcooler/regenerador, pode ser usado para purga, suporte temporário, aquecimento e preservação de condição operacional quando alguma utilidade principal não estiver disponível.", "impact": "Sua disponibilidade aumenta segurança e flexibilidade da manobra. Em eventos de falha ajuda a preservar o sistema e facilitar a retomada.", "formula": "Q ≈ ṁ_vapor·(h_saida − h_entrada)", "obs": "Encarar o V-12 emergência como utilidade estratégica para cenários anormais."}, "hbflevel": {"title": "Controle de nível do HBF para o F-3982", "tag": "LIC/FIC HBF → F-3982", "category": "control", "function": "Mantém o nível do tubulão F-3982 dentro da faixa segura, ajustando a vazão de HBF para compensar a geração de vapor e as variações de inventário.", "process": "O nível medido no tubulão é comparado ao SP. A lógica de controle aumenta HBF quando a geração de vapor tende a baixar o nível e reduz HBF quando a geração cai, evitando sobre-elevação.", "impact": "Nível baixo compromete a segurança térmica e a reserva de água. Nível alto pode causar arraste de água para o vapor. É importante interpretar o fenômeno de shrink/swell típico de tubulão.", "formula": "dM/dt = F_HBF − F_vapor − F_purgas\n\nShrink/swell: mudanças rápidas na ebulição alteram o nível aparente.", "obs": "Interpretar tendência de nível junto com carga térmica e vapor produzido."}, "xv808": {"title": "XV-808 — válvula que fecha no intertravamento total da GV-3901", "tag": "XV-808", "category": "safety", "function": "É uma válvula de isolamento de segurança. Em caso de intertravamento total da GV-3901, fecha automaticamente para isolar o sistema.", "process": "Ao ocorrer o intertravamento total, a lógica de proteção comanda o fechamento da XV-808 para bloquear fluxo indevido, evitar reversão, perda de inventário ou transferência indesejada de energia/pressão.", "impact": "Protege a caldeira/tubulão e evita agravamento do evento, separando o sistema em falha do restante da malha operacional.", "formula": "Conceito operacional:\nIntertravamento total → XV-808 fecha → sistema é isolado", "obs": "A XV-808 deve ser entendida como barreira de segurança da GV-3901."}};
const STORAGE_KEY="catcoolerConcept_data";
let data=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null")||structuredClone(DEFAULT_DATA);
let currentKey=null,deferredPrompt=null,editing=false;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1700)}
function saveCurrent(){if(!currentKey)return;const d=data[currentKey];d.function=$("#fieldFunction").innerText.trim();d.process=$("#fieldProcess").innerText.trim();d.impact=$("#fieldImpact").innerText.trim();d.formula=$("#fieldFormula").innerText.trim();d.obs=$("#fieldObs").innerText.trim();d.video=$("#videoUrl").value.trim();localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}
function loadFields(d){$("#infoTitle").textContent=d.title;$("#infoTag").textContent=d.tag;$("#infoCat").textContent=d.category.toUpperCase();$("#fieldFunction").innerText=d.function;$("#fieldProcess").innerText=d.process;$("#fieldImpact").innerText=d.impact;$("#fieldFormula").innerText=d.formula;$("#fieldObs").innerText=d.obs;$("#videoUrl").value=d.video||""}
function selectItem(k,h=null){if(currentKey&&currentKey!==k)saveCurrent();currentKey=k;$$(".hotspot").forEach(x=>x.classList.remove("active"));if(h)h.classList.add("active");$("#empty").classList.add("hidden");$("#info").style.display="flex";loadFields(data[k]);editing=false;syncEditable();const p=$("#detailPanel");if(p){p.classList.remove("minimized");p.classList.add("open")}}
function syncEditable(){$$(".editable").forEach(el=>el.contentEditable=editing?"true":"false");$("#videoUrl").disabled=!editing;$("#editBtn").textContent=editing?"✓ Concluir edição":"✏️ Editar";$("#editState").classList.toggle("show",editing);$("#editModeBanner").classList.toggle("hidden",!editing)}
function toggleEdit(){editing=!editing;syncEditable();toast(editing?"Modo edição ativado":"Edição encerrada")}
function saveCurrentAndExit(){if(!currentKey)return;saveCurrent();editing=false;syncEditable();toast("Alterações salvas neste dispositivo")}
function cancelEdit(){if(!currentKey)return;loadFields(data[currentKey]);editing=false;syncEditable();toast("Alterações não salvas descartadas")}
function restoreCurrent(){if(!currentKey)return;if(!confirm("Restaurar este item para o conteúdo original?"))return;data[currentKey]=JSON.parse(JSON.stringify(DEFAULT_DATA[currentKey]));localStorage.setItem(STORAGE_KEY,JSON.stringify(data));loadFields(data[currentKey]);editing=false;syncEditable();toast("Item restaurado para o conteúdo original")}
function togglePanelMinimize(){const p=$("#detailPanel");if(p)p.classList.toggle("minimized")}
function minimize(){if(currentKey)saveCurrent();currentKey=null;editing=false;syncEditable();$("#info").style.display="none";$("#empty").classList.remove("hidden");$$(".hotspot").forEach(x=>x.classList.remove("active"));const p=$("#detailPanel");if(p){p.classList.remove("open","minimized")}}
function exportJSON(){if(currentKey)saveCurrent();const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="catcooler-concept-u39-dados.json";a.click();URL.revokeObjectURL(a.href)}
function importJSON(ev){const f=ev.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{data=JSON.parse(r.result);localStorage.setItem(STORAGE_KEY,JSON.stringify(data));toast("Dados importados");if(currentKey)selectItem(currentKey,document.querySelector(`.hotspot[data-key="${currentKey}"]`))}catch(e){alert("Arquivo JSON inválido.")}};r.readAsText(f);ev.target.value=""}
function resetAll(){if(!confirm("Restaurar o conteúdo padrão e apagar as edições locais?"))return;data=structuredClone(DEFAULT_DATA);localStorage.setItem(STORAGE_KEY,JSON.stringify(data));minimize();toast("Conteúdo restaurado")}
function filterCategory(c){$$(".hotspot").forEach(h=>h.classList.toggle("hidden",c!=="all"&&h.dataset.category!==c));$$(".chip").forEach(ch=>ch.classList.toggle("active",ch.dataset.filter===c))}
function searchTag(){const q=$("#search").value.trim().toLowerCase();if(!q)return;const hit=Object.entries(data).find(([k,v])=>[v.tag,v.title,v.function,v.process,v.impact,v.obs].filter(Boolean).join(" ").toLowerCase().includes(q));if(hit){const h=document.querySelector(`.hotspot[data-key="${hit[0]}"]`);filterCategory("all");selectItem(hit[0],h);toast(`Encontrado: ${hit[1].tag}`)}else toast("Nenhum ponto encontrado para essa busca")}
function openVideo(){const url=$("#videoUrl").value.trim();if(!url)return toast("Informe uma URL de vídeo");window.open(url,"_blank","noopener")}
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

window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("#installBtn").classList.remove("hidden")});
window.addEventListener("appinstalled",()=>{deferredPrompt=null;$("#installBtn").textContent="✓ App instalado";toast("Catcooler Concept U-39 instalado")});
async function installApp(){if(deferredPrompt){deferredPrompt.prompt();const choice=await deferredPrompt.userChoice;if(choice.outcome==="accepted")$("#installBtn").textContent="✓ Instalando...";deferredPrompt=null;return}const ua=navigator.userAgent||"";if(/iphone|ipad|ipod/i.test(ua))alert("No iPhone/iPad: toque em Compartilhar e escolha “Adicionar à Tela de Início”.");else alert("Se a janela de instalação não abrir, use o menu do navegador e escolha “Instalar app” ou “Adicionar à tela inicial”.")}
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
document.addEventListener("DOMContentLoaded",()=>{$$(".hotspot").forEach(h=>h.addEventListener("click",()=>selectItem(h.dataset.key,h)));$$(".chip").forEach(c=>c.addEventListener("click",()=>filterCategory(c.dataset.filter)));$("#search").addEventListener("keydown",e=>{if(e.key==="Enter")searchTag()});$("#info").style.display="none";syncEditable()});
