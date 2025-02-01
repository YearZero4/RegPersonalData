 const originalLogros = [
'Aprender DJANGO en Python 100%',
'Hacer un E-commerce',
'Ganar certificados para mi curriculum',
'Aplicacion para crear portafolio con exportacion PDF'
 ];

 let logx = [...originalLogros];

 let completedLogros = localStorage.getItem('completedLogros');
 if (completedLogros) {
completedLogros = JSON.parse(completedLogros);
 } else {
completedLogros = [];
 }

 let deletedLogros = localStorage.getItem('deletedLogros');
 if (deletedLogros) {
deletedLogros = JSON.parse(deletedLogros);
 } else {
deletedLogros = [];
 }

 function renderLogros() {
document.getElementById('info').innerHTML = `
 Cantidad de metas = <label id="nx">(${logx.length-deletedLogros.length})</label><br>
 Logros Pendientes = <label id="nx">(${logx.length - completedLogros.length-deletedLogros.length})</label><br>
 Logros actuales = <label id="nx">(${completedLogros.length})</label><br>
 <img id="rest" src="./src/icons/restart.png">
`;

let divsx = '';
let visibleCount = 1;
logx.forEach((x, index) => {
 const isCompleted = completedLogros.includes(index.toString());
 const isDeleted = deletedLogros.includes(index.toString());
 if (!isDeleted) {
divsx += `
 <div id="son-logro">
<div id="number">[${visibleCount}]</div>
<div id="plog">${x}</div>
<img id="close" data-index="${index}" src="./src/icons/close.png" style="${isCompleted ? 'display:none;' : 'display:inline-block;'}">
<img id="check" data-index="${index}" style="${isCompleted ? 'right:10px;' : 'display:inline-block;'}" src="./src/icons/check.png">
<img id="medalla" data-index="${index}" style="${isCompleted ? 'display:block;' : 'display:none;'}" src="./src/icons/medalla.png">
 </div>`;
visibleCount++;
 }
});
document.getElementById('father-logros').innerHTML = divsx;
document.querySelectorAll('#close').forEach(img => {
 img.addEventListener('click', function() {
const index = this.getAttribute('data-index');
deletedLogros.push(index.toString());
localStorage.setItem('deletedLogros', JSON.stringify(deletedLogros));
renderLogros();
 });
});

document.querySelectorAll('#check').forEach(img => {
 img.addEventListener('click', function() {
const index = this.getAttribute('data-index');
if (completedLogros.includes(index.toString())) {
 completedLogros = completedLogros.filter(i => i !== index.toString());
 localStorage.setItem('completedLogros', JSON.stringify(completedLogros));
} else {
 completedLogros.push(index.toString());
 localStorage.setItem('completedLogros', JSON.stringify(completedLogros));
}
renderLogros();
 });
});

const reset = document.getElementById('rest');
reset.addEventListener('click', function () {
 localStorage.clear();
 completedLogros = [];
 deletedLogros = [];
 logx = [...originalLogros];
 renderLogros();
});
 }

 document.getElementById('addButton').addEventListener('click', function () {
const add00=document.getElementById('add0x').value;
if(add00.length > 4){
document.getElementById('info2').innerHTML = 'NUEVA META AGREGADA CON EXITO';
setTimeout(() => {
 document.getElementById('info2').innerHTML = '';
}, 3000);
const newLogro = document.getElementById('add0x').value.trim();
if (newLogro) {
 logx.push(newLogro);
 localStorage.setItem('logx', JSON.stringify(logx));
 document.getElementById('add0x').value = '';
 renderLogros();
}
}
 });

 const storedLogros = localStorage.getItem('logx');
 if (storedLogros) {
logx = JSON.parse(storedLogros);
 }
 renderLogros();
