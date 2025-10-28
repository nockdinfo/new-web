function getProducts(){
  return JSON.parse(localStorage.getItem('nockd_products')||'[]');
}
function saveProducts(arr){
  localStorage.setItem('nockd_products',JSON.stringify(arr));
}

// Add product
document.getElementById('saveProd')?.addEventListener('click', async ()=>{
  const name=p_name.value.trim(), price=p_price.value.trim(), desc=p_desc.value.trim(), cat=p_cat.value, file=p_img.files[0];
  if(!name||!price) return alert("Name & Price required");
  let img='';
  if(file){
    const reader=new FileReader();
    reader.onload=()=>{img=reader.result;store()};
    reader.readAsDataURL(file);
  } else store();
  function store(){
    const all=getProducts();
    all.push({id:Date.now(),name,price,desc,cat,image:img});
    saveProducts(all);
    alert(`Added to ${cat==='nockd'?'NockD':'Velra'} Collection`);
    renderList();
  }
});

function renderList(){
  const list=document.getElementById('prodList');
  if(!list) return;
  const all=getProducts();
  list.innerHTML=all.map(p=>`
    <div class="prod-row">
      <div><b>${p.name}</b><br>₹${p.price} • ${p.cat}</div>
      <div><button class="del" data-id="${p.id}">Delete</button></div>
    </div>
  `).join('') || '<p>No products yet</p>';
  document.querySelectorAll('.del').forEach(b=>b.onclick=()=>{
    const arr=getProducts().filter(x=>x.id!=b.dataset.id);
    saveProducts(arr);renderList();
  });
}

renderList();

document.getElementById('logout')?.addEventListener('click',()=>{
  localStorage.removeItem('nockd_admin');
  location='admin-login.html';
});
document.getElementById('viewSite')?.addEventListener('click',()=>location='index.html');
