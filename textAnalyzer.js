import DOMPurify from 'https://esm.sh/dompurify@3.0.6';

// Regel-Objekt nach Gäckle (2021) Referenz
const TO_REPLACE = {
  'Mitarbeiter': 'Mitarbeitenden',
  'Student': 'Studierende',
  'Studenten': 'Studierende',
  'Leser': 'Lesende',
  'Nutzer': 'Nutzende',
  'Benutzer': 'Benutzende',
  'Kollegen': 'KollegInnen',
  'Lehrer': 'Lehrende',
  'Professor': 'ProfessorInnen',
  'Der Fachmann' : 'Die Fachkraft',
  'Ein Fachmann' : 'Die Fachkraft',
  'Wissenschaftler': 'WissenschaftlerInnen',
  'Fahrer': 'Fahrende',
  'Bürger': 'BürgerInnen',
  'Kunde': 'KundIn',
  'Kundnen': 'KundInnen',
  'Teilnehmer': 'Teilnehmende',
  'Anbieter': 'AnbieterIn',
  'Techniker': 'TechnikerIn',
  'Anfänger': 'AnfängerIn',
  'Besucher': 'Besuchende',
  'Professor': 'ProfessorIn',
  'Interessenten': 'Interessierte',
  'jeder': 'alle',
  'Softwareberater': 'SoftwareberaterInnen',
  'Verfasser': 'VerfasserIn',
  'Trainer': 'TrainerIn',
};


function sanitizeText(str, target) {
  const targetElement = document.getElementById(target); 
  if (!targetElement) return;

  const allowedTags = ['b', 'i', 'a', 'p', 'br', 'ul', 'ol', 'li'];
  const cleanHTML = DOMPurify.sanitize(str, { 
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: []
  });
  
  targetElement.innerHTML = cleanHTML;
  console.log("Eingegebener Text wurde bereinigt");
}

// Schlüssel im Object werden nach Länge sortiert, da kürzere Begriffe in längeren miteinbegriffen sein können
// und deshalb zuerst längere Begriffe ersetzt werden sollen
const sortedKeys = Object.keys(TO_REPLACE).sort((a, b) => b.length - a.length);

function replaceGenderedTerms(elementId) {    
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn('kein Element mit der ID gefunden');
    return;
  }

  // TreeWalker statt den Text direkt zu verändern um HTML-Tags nicht kaputt zu machen
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT
  )

  let node;
  while (node = walker.nextNode()) {
    let nodeText = node.nodeValue;

    // Mit Regex, da nur ganze Wörter ersetzt werden sollen
    for (const key of sortedKeys) {
      // \b für die Wortgrenzen
      // 'g' für global, dass alle Vorkommnisse der Schlüssel ersetzt werden
      // 'i' für case-insensitive, Groß/Kleinschreibung wird ignoriert
      // -> diese zwei müssen für korrekten Syntax kombiniert werden!
      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      nodeText = nodeText.replace(regex, TO_REPLACE[key]);
    }

    node.nodeValue = nodeText;
  }
  console.log('Text wurde gegendert');
};


// der alte eventlistener mit vanilla js ist nun obsolet, da alpine.js den Ablauf vereinfacht

// document.addEventListener('DOMContentLoaded', () => {
//   const btnInput = document.getElementById('addTextBtn');
//   const textInput = document.getElementById('textInput');
//   const btn = document.getElementById('genderBtn');
//   if (!btn || !textInput || !btnInput) {
//     return;
//   }

//   btn.addEventListener('click', () => {
//     const element = document.getElementById('root');
//     if (!element) {
//       console.warn('ID existiert nicht');
//       return;
//     }

//     const inputContent = textInput.innerHTML;
//     sanitizeText(inputContent, 'textInput'); // automatically sanitizes anything in the textinput as well before gendering other terms proper
//     replaceGenderedTerms('root');
//     console.log('gender button gedrückt.')

//   });

//   btnInput.addEventListener('click', () => {
    
//     const inputContent = textInput.innerHTML;
//     sanitizeText(inputContent,'textInput');   
//     replaceGenderedTerms('textInput');
//     console.log('hinzufügen button gedrückt.')
//   })
// });

// Globaler Export für direkte Einbindung im .html
window.replaceGenderedTerms = replaceGenderedTerms;
window.sanitizeText = sanitizeText;