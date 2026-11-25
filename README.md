# Albergo Diffuso dei Magi

Homepage responsive per l'Albergo Diffuso dei Magi a Saturnia, realizzata in HTML, CSS e JavaScript senza dipendenze o passaggi di compilazione.

## Aprire il progetto in Visual Studio Code

1. Apri Visual Studio Code.
2. Seleziona **File > Apri cartella...** e scegli la cartella `SITO`.
3. Apri `index.html` nel browser. In alternativa, installa l'estensione **Live Server** e seleziona **Go Live** per aggiornare la pagina mentre modifichi i file.

## File

- `index.html` contiene la struttura e i contenuti della pagina.
- `styles.css` contiene gli stili responsive.
- `script.js` gestisce il menu mobile, la mappa interattiva di Saturnia e la richiesta di disponibilità via WhatsApp.
- `images/` contiene il logo e le fotografie delle strutture e delle camere.

Le fotografie delle camere e degli appartamenti si trovano in `images/`. Le altre fotografie decorative sono caricate da Unsplash e richiedono una connessione internet. Il modulo non invia dati a un server: prepara una richiesta WhatsApp con le date e il numero di ospiti scelti.

La mappa usa Leaflet e le mappe di OpenStreetMap, quindi richiede una connessione internet.

## Aggiungere le tue fotografie

Copia le immagini dentro `images/` (per esempio `images/facciata-dimora.jpg`). Per mostrarne una nella homepage, sostituisci il link fotografico corrispondente in `index.html` con il percorso relativo, ad esempio `images/facciata-dimora.jpg`.
