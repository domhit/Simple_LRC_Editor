# 🎵 Selfhosted LRC Editor & Karaoke

Ein einfacher **Web-basierten Editor für LRC-Dateien**, komplett **offline** im Browser nutzbar.  
Du kannst Songs laden, Lyrics hinzufügen, Zeitstempel setzen und das Ergebnis als `.lrc` exportieren.  
Zusätzlich gibt es eine Karaoke-Ansicht mit hervorgehobener aktueller Zeile.

---

## 🚀 Funktionen
- 🎶 **Song laden** (MP3, OGG, etc.)
- 📝 **Lyrics importieren** (Text oder bestehende `.lrc`)
- ⏱️ **Zeitstempel setzen** per Mausklick oder Tastendruck (Enter/Space)
- ✏️ **Lyrics bearbeiten** (Doppelklick auf Zeile)
- 🏷️ **Metadaten** (Titel, Interpret, Album)
- 🌗 **Dark-/Light-Mode** (wird gespeichert)
- 🎤 **Karaoke Modus** mit Hervorhebung & Scrollen
- 💾 **Export** als `.lrc`-Datei

---

## 📂 Projektstruktur
lrc_editor/
├── index.html # Hauptseite
├── css/
│    └── style.css # Styles (Dark/Light Mode, Layout)
├── js/
|    └── app.js # Logik (Timestamps, Karaoke, Export)

---

## 🛠️ Nutzung
1. Projektordner herunterladen und lokal entpacken.  
2. `index.html` im Browser öffnen (Doppelklick reicht).  
3. Schritte im Editor folgen:  
   1. **Song laden** (MP3 auswählen).  
   2. **Metadaten eintragen** (Titel, Interpret, Album).  
   3. **Lyrics einfügen** oder `.lrc` laden.  
   4. Beim Abspielen **Zeitstempel setzen** (Mausklick oder Enter/Space).  
   5. Exportieren → fertige `.lrc` speichern.  
   6. Optional: Karaoke-Modus starten.  

---

## 🔧 Hinweise
- Läuft **komplett offline**, kein Server nötig.  
- Unterstützt UTF-8 → auch Umlaute/Emojis kein Problem.  
- LocalStorage merkt sich dein gewähltes Theme.  
- Karaoke-Modus läuft synchron mit dem Audio.  

---

## 📜 Lizenz
Dieses Projekt ist frei verwendbar und darf angepasst werden.  

