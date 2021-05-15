(()=>{"use strict";const e={renderProjects(e){const t=document.querySelector(".project-container");for(;t.firstChild;)t.removeChild(t.firstChild);e.forEach((e=>{const s=document.createElement("div");s.classList.add("project"),s.dataset.id=e.id;const n=document.createElement("div");n.classList.add("edit-project"),n.textContent="Edit",n.addEventListener("click",e.edit.bind(e));const i=document.createElement("div");i.classList.add("delete-project"),i.textContent="x",i.addEventListener("click",e.delete.bind(e));const d=document.createElement("p");d.classList.add("project-paragraph"),d.textContent=e.name,e.selected?d.addEventListener("click",e.close.bind(e)):d.addEventListener("click",e.open.bind(e,s,d)),e.selected&&(n.classList.add("project-selected"),i.classList.add("project-selected"),s.classList.add("project-selected")),s.appendChild(n),s.appendChild(i),s.appendChild(d),t.appendChild(s)}));const s=document.createElement("div");s.classList.add("margin-fixer-projects"),s.textContent="margin",t.appendChild(s)},renderTasks(e){const t=document.querySelector(".task-container");for(;t.firstChild;)t.removeChild(t.firstChild);e.forEach((e=>{const s=document.createElement("div");s.classList.add("task-wrapper");const n=document.createElement("div");n.classList.add("green-screen"),e.active&&n.classList.add("hidden");const i=document.createElement("div");i.classList.add("task");const d=document.createElement("div");d.classList.add("edit-task"),d.textContent="Edit",d.addEventListener("click",e.edit.bind(e));const a=document.createElement("div");a.classList.add("delete-task"),a.textContent="Delete",a.addEventListener("click",e.delete.bind(e));const o=document.createElement("div");o.classList.add("checkbox");const c=document.createElement("div");c.classList.add("x"),c.innerHTML='<img src="check.png">',e.active&&c.classList.add("hidden"),o.appendChild(c),o.addEventListener("click",e.activeSwitch.bind(e,n,c));const l=document.createElement("div");l.classList.add("item-containers","title-descr-container");const r=document.createElement("h4");r.classList.add("top-task"),r.textContent=e.name,l.appendChild(r);const u=document.createElement("p");u.classList.add("bottom-task"),u.textContent=e.description,l.appendChild(u);const v=document.createElement("div");v.classList.add("item-containers","due-container");const m=document.createElement("div");m.classList.add("date","top-task"),m.textContent=e.due,v.appendChild(m);const p=document.createElement("p");p.classList.add("bottom-task","due-p"),p.textContent="Due",v.appendChild(p);const h=document.createElement("div");h.classList.add("item-containers","priority-container");const L=document.createElement("div");L.classList.add("priority","top-task",`priority-${e.priority}`),h.appendChild(L);const g=document.createElement("p");g.classList.add("bottom-task","priority-p"),g.textContent=e.priority[0].toUpperCase()+e.priority.slice(1),h.appendChild(g),i.appendChild(d),i.appendChild(a),i.appendChild(o),i.appendChild(l),i.appendChild(v),i.appendChild(h),s.appendChild(n),s.appendChild(i),t.appendChild(s)}));const s=document.createElement("div");s.classList.add("margin-fixer-tasks"),s.textContent="margin",t.appendChild(s)}},t=document.querySelector(".screen-cover"),s=document.querySelector(".project-form"),n=document.querySelector(".task-form"),i=document.querySelector(".project-input"),d=document.querySelector(".name-input"),a=document.querySelector(".description-input"),o=document.querySelector(".due-input"),c=document.querySelector(".priority-input"),l=document.querySelector(".add-project"),r=document.querySelector(".add-task");let u,v,m=[],p=0,h="";const L=n=>(p+=1,{name:n,tasks:[],selected:!0,id:p,delete(){const t=m.indexOf(this);m.splice(t,1),e.renderProjects(m),h.id===this.id&&(h="",0===m.length?document.querySelector(".tasks-header").innerHTML="Start by adding a project.<br> You must have a project selected in order to add tasks.":document.querySelector(".tasks-header").textContent="Select Project to View or Add Tasks",e.renderTasks([])),window.localStorage.setItem("todolist",JSON.stringify(m))},edit(){u=f.bind(this),i.value=this.name,t.classList.toggle("hidden"),s.classList.toggle("hidden"),document.addEventListener("keydown",u),document.addEventListener("click",w),window.localStorage.setItem("todolist",JSON.stringify(m))},open(t,s){t.removeChild(s),m.forEach((e=>{e.selected&&e.close()}));const n=document.createElement("p");n.classList.add("project-paragraph"),n.textContent=this.name,n.addEventListener("click",this.close.bind(this)),t.appendChild(n),t.classList.add("project-selected"),t.firstChild.classList.add("project-selected"),t.firstChild.nextSibling.classList.add("project-selected"),this.selected=!0,h=this,document.querySelector(".tasks-header").textContent=this.name.concat(" - Tasks"),e.renderTasks(this.tasks)},close(){const t=document.querySelector(`[data-id='${this.id}']`),s=t.querySelector(".project-paragraph");t.removeChild(s);const n=document.createElement("p");n.classList.add("project-paragraph"),n.textContent=this.name,n.addEventListener("click",this.open.bind(this,t,n)),t.appendChild(n),t.classList.remove("project-selected"),t.firstChild.classList.remove("project-selected"),t.firstChild.nextSibling.classList.remove("project-selected"),this.selected=!1,h="",document.querySelector(".tasks-header").textContent="Select Project to View or Add Tasks",e.renderTasks([])}}),g=(s,i,l,r,p,L,g,k,y)=>({due:r,month:L,day:g,year:k,inputDateFormat:y,project:s,name:i,description:l,priority:p,active:!0,activeSwitch(t,s){this.active=!this.active,t.classList.toggle("hidden"),s.classList.toggle("hidden"),E(h.tasks),e.renderTasks(h.tasks)},delete(){const t=h.tasks.indexOf(this);h.tasks.splice(t,1),e.renderTasks(h.tasks),window.localStorage.setItem("todolist",JSON.stringify(m))},edit(){u=S.bind(this),v=j.bind(this),d.value=this.name,a.value=this.description,o.value=this.inputDateFormat,c.value=this.priority,t.classList.toggle("hidden"),n.classList.toggle("hidden"),document.addEventListener("keydown",u),document.addEventListener("click",v),window.localStorage.setItem("todolist",JSON.stringify(m))}}),k=e=>{e.sort(((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1)),window.localStorage.setItem("todolist",JSON.stringify(m))},y={lowest:1,low:2,medium:3,high:4,highest:5},E=e=>{e.sort(((e,t)=>{if(e.active===t.active){if(y[e.priority]===y[t.priority]){if(e.due===t.due)return e.name.toLowerCase()<t.name.toLowerCase()?-1:1;if(e.year!==t.year)return parseInt(e.year,10)-parseInt(t.year,10);if(e.month!==t.month)return e.month-t.month;if(e.day!==t.day)return e.day-t.day}return y[t.priority]-y[e.priority]}return e.active?-1:1})),window.localStorage.setItem("todolist",JSON.stringify(m))};function f(n){if("Enter"===n.key){document.removeEventListener("click",w),document.removeEventListener("keydown",u),t.classList.toggle("hidden"),s.classList.toggle("hidden");const n=m.indexOf(this);m[n].name=i.value,k(m),e.renderProjects(m),i.value="",window.localStorage.setItem("todolist",JSON.stringify(m))}else"Escape"===n.key&&(document.removeEventListener("click",w),document.removeEventListener("keydown",u),t.classList.toggle("hidden"),s.classList.toggle("hidden"),i.value="")}const C=n=>{if("Enter"===n.key){if(""===i.value)return;document.removeEventListener("click",w),document.removeEventListener("keydown",C),t.classList.toggle("hidden"),s.classList.toggle("hidden");const n=L(i.value);h=n,m.forEach((e=>{e.selected=!1})),m.push(n),k(m),document.querySelector(".tasks-header").textContent=n.name.concat(" - Tasks"),e.renderProjects(m),i.value="",e.renderTasks(n.tasks),window.localStorage.setItem("todolist",JSON.stringify(m))}else"Escape"===n.key&&(document.removeEventListener("click",w),document.removeEventListener("keydown",C),t.classList.toggle("hidden"),s.classList.toggle("hidden"),i.value="")},w=e=>{e.target===t&&(document.removeEventListener("click",w),document.removeEventListener("keydown",C),t.classList.toggle("hidden"),s.classList.toggle("hidden"),i.value="")};function S(s){if("Enter"===s.key){if(s.preventDefault(),""===d.value||""===a.value||""===o.value||"select one"===c.value)return;document.removeEventListener("keydown",u),document.removeEventListener("click",v),t.classList.toggle("hidden"),n.classList.toggle("hidden");const i=o.value.slice(2,4),l="0"===o.value[5]?o.value.slice(6,7):o.value.slice(5,7),r="0"===o.value[8]?o.value.slice(9):o.value.slice(8),p=h.tasks.indexOf(this),L=h.tasks[p];L.name=d.value,L.description=a.value,L.due=`${l}/${r}/${i}`,L.day=r,L.month=l,L.year=i,L.inputDateFormat=o.value,L.priority=c.value,E(h.tasks),d.value="",a.value="",o.value="",c.value="select one",e.renderTasks(h.tasks),window.localStorage.setItem("todolist",JSON.stringify(m))}else"Escape"===s.key&&(document.removeEventListener("click",v),document.removeEventListener("keydown",u),t.classList.toggle("hidden"),n.classList.toggle("hidden"),d.value="",a.value="",o.value="",c.value="select one")}function j(s){if(s.preventDefault(),s.target===document.querySelector(".submit-button")){if(""===d.value||""===a.value||""===o.value||"select one"===c.value)return;document.removeEventListener("keydown",u),document.removeEventListener("click",v),t.classList.toggle("hidden"),n.classList.toggle("hidden");const s=o.value.slice(2,4),i="0"===o.value[5]?o.value.slice(6,7):o.value.slice(5,7),l="0"===o.value[8]?o.value.slice(9):o.value.slice(8),r=h.tasks.indexOf(this),p=h.tasks[r];p.name=d.value,p.description=a.value,p.due=`${i}/${l}/${s}`,p.day=l,p.month=i,p.year=s,p.inputDateFormat=o.value,p.priority=c.value,E(h.tasks),d.value="",a.value="",o.value="",c.value="select one",e.renderTasks(h.tasks),window.localStorage.setItem("todolist",JSON.stringify(m))}else s.target===t&&(document.removeEventListener("click",v),document.removeEventListener("keydown",u),t.classList.toggle("hidden"),n.classList.toggle("hidden"),d.value="",a.value="",o.value="",c.value="select one")}const x=s=>{if("Enter"===s.key){if(s.preventDefault(),""===d.value||""===a.value||""===o.value||"select one"===c.value)return;document.removeEventListener("click",b),document.removeEventListener("keydown",x),t.classList.toggle("hidden"),n.classList.toggle("hidden");const i=o.value.slice(2,4),l="0"===o.value[5]?o.value.slice(6,7):o.value.slice(5,7),r="0"===o.value[8]?o.value.slice(9):o.value.slice(8),u=g(h.id,d.value,a.value,`${l}/${r}/${i}`,c.value,l,r,i,o.value);h.tasks.push(u),E(h.tasks),d.value="",a.value="",o.value="",c.value="select one",e.renderTasks(h.tasks),window.localStorage.setItem("todolist",JSON.stringify(m))}else"Escape"===s.key&&(document.removeEventListener("click",b),document.removeEventListener("keydown",x),t.classList.toggle("hidden"),n.classList.toggle("hidden"),d.value="",a.value="",o.value="",c.value="select one")},b=s=>{if(s.preventDefault(),s.target===document.querySelector(".submit-button")){if(""===d.value||""===a.value||""===o.value||"select one"===c.value)return;document.removeEventListener("click",b),document.removeEventListener("keydown",x),t.classList.toggle("hidden"),n.classList.toggle("hidden");const s=o.value.slice(2,4),i="0"===o.value[5]?o.value.slice(6,7):o.value.slice(5,7),l="0"===o.value[8]?o.value.slice(9):o.value.slice(8),r=g(h.id,d.value,a.value,`${i}/${l}/${s}`,c.value,i,l,s,o.value);h.tasks.push(r),E(h.tasks),d.value="",a.value="",o.value="",c.value="select one",e.renderTasks(h.tasks),window.localStorage.setItem("todolist",JSON.stringify(m))}else s.target===t&&(document.removeEventListener("click",b),document.removeEventListener("keydown",x),t.classList.toggle("hidden"),n.classList.toggle("hidden"),d.value="",a.value="",o.value="",c.value="select one")};l.addEventListener("click",(()=>{t.classList.toggle("hidden"),s.classList.toggle("hidden"),document.addEventListener("keydown",C),document.addEventListener("click",w)})),r.addEventListener("click",(()=>{""!==h&&(t.classList.toggle("hidden"),n.classList.toggle("hidden"),document.addEventListener("keydown",x),document.addEventListener("click",b))}));const q=window.localStorage.getItem("todolist");if(q){const t=JSON.parse(q);m=t.map((e=>{const t=e.tasks.map((e=>{const{projectId:t,taskName:s,descriptionInput:n,due:i,priorityInput:d,month:a,day:o,year:c,inputDateFormat:l}=e;return g(t,s,n,i,d,a,o,c,l)})),s=L(e.name);return s.tasks=t,s.id=e.id,s})),e.renderProjects(m)}})();