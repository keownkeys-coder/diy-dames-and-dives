
  
  const openSidebar = document.querySelector('.openSidebar');
  
  openSidebar?.addEventListener('click', ()=>{
    const isExpanded = openSidebar.getAttribute('aria-expanded') === 'true';
    openSidebar.setAttribute('aria-expanded', `${!isExpanded}`);
  });
  