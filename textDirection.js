const toggleBtn = document.getElementById('toggleDirectionBtn');

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {

    const currentDir = document.documentElement.getAttribute('dir');
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl'; 
    document.documentElement.setAttribute('dir', newDir);
    document.body.setAttribute('dir', newDir);
    
    //Wenn die neue Richtung "rtl" ist wird der Button in Rückgängig benannt, ansonsten wieder "Richtung wechseln"
    toggleBtn.textContent = newDir === 'rtl' ? 'Rückgängig' : 'Richtung wechseln';
  });
}