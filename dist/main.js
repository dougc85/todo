(()=>{"use strict";const e={renderProjects(e){const t=document.querySelector(".project-container");for(;t.firstChild;)t.removeChild(t.firstChild);e.forEach((e=>{const d=document.createElement("div");d.classList.add("project"),d.dataset.id=e.id;const n=document.createElement("div");n.classList.add("edit-project"),n.textContent="Edit",n.addEventListener("click",e.edit.bind(e));const c=document.createElement("div");c.classList.add("delete-project"),c.textContent="x",c.addEventListener("click",e.delete.bind(e));const s=document.createElement("p");s.textContent=e.name,e.selected&&(n.classList.add("project-selected"),c.classList.add("project-selected"),Projectdiv.classList.add("project-selected")),d.appendChild(n),d.appendChild(c),d.appendChild(s),t.appendChild(d)}))}},t=document.querySelector(".screen-cover"),d=document.querySelector(".project-form"),n=(document.querySelector(".task-form"),document.querySelector(".project-input")),c=document.querySelector(".add-project");document.querySelector(".add-task");let s,o=[],i=0;const l=c=>(i+=1,a.bind(void 0),{name:c,todos:[],selected:!1,id:i,delete(){let t=o.indexOf(this);o.splice(t,1),e.renderProjects(o)},edit(){s=a.bind(this),n.value=this.name,t.classList.toggle("hidden"),d.classList.toggle("hidden"),document.addEventListener("keydown",s),document.addEventListener("click",u)}}),r=e=>{e.sort(((e,t)=>e.name<t.name?-1:1))};function a(c){if("Enter"===c.key){document.removeEventListener("click",u),document.removeEventListener("keydown",s),console.log(document),t.classList.toggle("hidden"),d.classList.toggle("hidden");let c=o.indexOf(this);o[c].name=n.value,r(o),e.renderProjects(o),n.value="",console.log(o)}else"Escape"===c.key&&(document.removeEventListener("click",u),document.removeEventListener("keydown",s),t.classList.toggle("hidden"),d.classList.toggle("hidden"),n.value="")}const m=c=>{"Enter"===c.key?(document.removeEventListener("click",u),document.removeEventListener("keydown",m),t.classList.toggle("hidden"),d.classList.toggle("hidden"),o.push(l(n.value)),r(o),e.renderProjects(o),n.value=""):"Escape"===c.key&&(document.removeEventListener("click",u),document.removeEventListener("keydown",m),t.classList.toggle("hidden"),d.classList.toggle("hidden"),n.value="")},u=e=>{e.target===t&&(document.removeEventListener("click",u),document.removeEventListener("keydown",m),t.classList.toggle("hidden"),d.classList.toggle("hidden"),n.value="")};c.addEventListener("click",(e=>{t.classList.toggle("hidden"),d.classList.toggle("hidden"),document.addEventListener("keydown",m),document.addEventListener("click",u)}))})();