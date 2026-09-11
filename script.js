const projects = {
  "ai-agent": {
    label:"FEATURED PROJECT · GENAI",
    title:"AI Interview Agent",
    intro:"A GenAI application designed to automate technical screening through role-specific questions, contextual analysis and dynamic follow-ups.",
    tags:["Spring AI","Amazon Bedrock","Claude","RAG","React"],
    flow:["Candidate","→","Interview Agent","→","Claude / Bedrock","→","Context + RAG","→","Follow-up"],
    bullets:[
      "Generates role-specific questionnaires and conducts interactive, context-aware interviews using Claude through Amazon Bedrock.",
      "Uses an agent workflow to analyze candidate responses in real time and adapt the interview.",
      "Generates probing follow-up questions from conversation context using Retrieval-Augmented Generation (RAG)."
    ],
    repo:"https://github.com/vinay030901"
  },
  "claim-tracker": {
    label:"FEATURED PROJECT · DISTRIBUTED SYSTEM",
    title:"Insurance Claim Tracker",
    intro:"A real-time backend architecture for tracking insurance events with event-driven processing and low-latency state reads.",
    tags:["Spring Boot","Kafka","Redis","PostgreSQL","Webhooks"],
    flow:["Webhook","→","HMAC Verify","→","Kafka","→","Consumer","→","PostgreSQL + Redis"],
    bullets:[
      "Built event-driven claim tracking with live status updates.",
      "Secured third-party webhook integrations with HMAC signature verification.",
      "Designed asynchronous Kafka consumers to persist claim timelines while Redis serves low-latency claim state reads."
    ],
    repo:"https://github.com/vinay030901"
  },
  "notification": {
    label:"FEATURED PROJECT · DISTRIBUTED SYSTEM",
    title:"Distributed Notification System",
    intro:"A fault-tolerant asynchronous notification architecture for email and SMS delivery with rate limiting and failure handling.",
    tags:["Spring Boot","Kafka","Redis","AWS","Rate Limiting","DLQ"],
    flow:["API","→","Kafka","→","Rate Limiter","→","Email / SMS","→","Retry","→","DLQ"],
    bullets:[
      "Supports asynchronous email and SMS delivery through an event-driven pipeline.",
      "Implements per-user and per-channel rate limiting backed by Redis.",
      "Uses Kafka retries and dead-letter queues to isolate failures and improve fault tolerance."
    ],
    repo:"https://github.com/vinay030901"
  }
};

const modal=document.getElementById("modal");
const modalTitle=document.getElementById("modalTitle");
const modalLabel=document.getElementById("modalLabel");
const modalIntro=document.getElementById("modalIntro");
const modalTags=document.getElementById("modalTags");
const architecture=document.getElementById("architecture");
const modalList=document.getElementById("modalList");
const modalRepo=document.getElementById("modalRepo");

function openProject(id){
  const p=projects[id]; if(!p) return;
  modalLabel.textContent=p.label;
  modalTitle.textContent=p.title;
  modalIntro.textContent=p.intro;
  modalTags.innerHTML=p.tags.map(t=>`<span>${t}</span>`).join("");
  architecture.innerHTML=p.flow.map((x,i)=>x==="→"?`<b>→</b>`:`<span>${x}</span>`).join("");
  modalList.innerHTML=p.bullets.map(x=>`<li>${x}</li>`).join("");
  modalRepo.href=p.repo;
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.querySelectorAll(".project-card").forEach(card=>{
  card.addEventListener("click",()=>openProject(card.dataset.project));
  card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ") {e.preventDefault();openProject(card.dataset.project)}});
});
document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

const menuBtn=document.getElementById("menuBtn"),navLinks=document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)});
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const progress=document.getElementById("progress");
window.addEventListener("scroll",()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(h>0?(window.scrollY/h)*100:0)+"%";
},{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("linkedinBtn").addEventListener("click",e=>{
  if(e.currentTarget.getAttribute("href")==="#"){
    e.preventDefault();
    alert("Add your LinkedIn profile URL in index.html before publishing.");
  }
});
