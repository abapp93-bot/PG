# Il doppio quiz di PG

Sito statico pronto per GitHub Pages.

## Personalizzazioni veloci
1. Apri `app.js`.
2. Cambia `CONFIG.intro` con il testo di introduzione.
3. Cambia `CONFIG.crushName` con il nome della crush.
4. Sostituisci le domande e le risposte nel blocco `quizzes`.
5. Metti le foto nella cartella `assets/` con gli stessi nomi usati nel codice (oppure cambia i percorsi).
6. Metti la foto finale della crush in `assets/crush.jpg`.

Ogni domanda ha 4 risposte e, nella struttura predisposta, 2 risposte fotografiche: puoi trasformarne una terza in foto semplicemente aggiungendo `image: 'assets/nomefile.jpg'` a una risposta testuale.

## Pubblicazione su GitHub Pages
1. Crea un nuovo repository su GitHub.
2. Carica tutti i file di questa cartella mantenendo `assets/`.
3. Vai in **Settings → Pages**.
4. In **Build and deployment**, scegli **Deploy from a branch**.
5. Seleziona il branch `main` e la cartella `/ (root)`, poi salva.

Il link pubblico comparirà nella pagina GitHub Pages del repository.
