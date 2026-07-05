const toggleBtn = document.getElementById('toggleDirectionBtn');

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const currentDir = document.documentElement.getAttribute('dir');
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    
    document.documentElement.setAttribute('dir', newDir);
    document.body.setAttribute('dir', newDir);
    
    toggleBtn.textContent = newDir === 'rtl' ? 'Rückgängig' : 'Richtung wechseln';
  });
}