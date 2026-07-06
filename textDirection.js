// Alter Code, wird durch Alpine.js ersetzt im .html und ist somit obsolet
// würde in vanilla .js trotzdem noch funktionieren, ist allerdings nicht mehr im .html eingebunden
// der sich ändernde Text muss erst noch neu übernommen/geschrieben werden im .html

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