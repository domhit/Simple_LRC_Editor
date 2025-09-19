const audio = document.getElementById('player');
const audioFile = document.getElementById('audioFile');
const lyricsInput = document.getElementById('lyricsInput');
const lyricsDiv = document.getElementById('lyrics');
const exportBtn = document.getElementById('exportLrc');
const loadLyricsBtn = document.getElementById('loadLyrics');
const titleInput = document.getElementById('title');
const artistInput = document.getElementById('artist');
const albumInput = document.getElementById('album');
const applyMetadataBtn = document.getElementById('applyMetadata');
const loadLrcBtn = document.getElementById('loadLrc');
const lrcFileInput = document.getElementById('lrcFile');
const karaokeBtn = document.getElementById('startKaraoke');
const karaokeView = document.getElementById('karaokeView');
const karaokeLine = document.getElementById('karaokeLine');
const themeBtn = document.getElementById('toggleTheme');

let lines = [];
let currentIndex = 0;

// Theme aus LocalStorage laden
if (localStorage.getItem('theme') === 'light') document.body.classList.add('light');

audioFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) audio.src = URL.createObjectURL(file);
});

loadLyricsBtn.addEventListener('click', () => {
  lines = lyricsInput.value.split(/\n/).map(l => l.trim()).filter(l => l).map(l => ({ text: l, time: null }));
  renderLyrics();
  currentIndex = 0;
});

function renderLyrics() {
  lyricsDiv.innerHTML = '';
  lines.forEach((line, index) => {
    const div = document.createElement('div');
    div.textContent = line.time ? `[${line.time}] ${line.text}` : line.text;
    div.classList.add('line', 'editable');
    div.addEventListener('click', () => { setTimestamp(index, div); currentIndex = index + 1; });
    div.addEventListener('dblclick', () => {
      const newText = prompt('Bearbeite den Text:', line.text);
      if (newText !== null) { line.text = newText.trim(); div.textContent = line.time ? `[${line.time}] ${line.text}` : line.text; }
    });
    lyricsDiv.appendChild(div);
  });
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  const cs = Math.floor((sec % 1) * 100);
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(cs).padStart(2,'0')}`;
}

function setTimestamp(i, div) {
  lines[i].time = formatTime(audio.currentTime);
  div.textContent = `[${lines[i].time}] ${lines[i].text}`;
  div.classList.add('active');
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Enter' || e.code === 'Space') {
    e.preventDefault();
    if (currentIndex < lines.length) {
      setTimestamp(currentIndex, lyricsDiv.children[currentIndex]);
      currentIndex++;
    }
  }
});

audio.addEventListener('timeupdate', () => {
  let activeIndex = -1;
  lines.forEach((line, i) => {
    if (line.time) {
      const [min, sec] = line.time.split(':');
      const [s, cs] = sec.split('.');
      const t = parseInt(min) * 60 + parseInt(s) + parseInt(cs) / 100;
      if (audio.currentTime >= t) activeIndex = i;
    }
  });
  [...lyricsDiv.children].forEach((div, i) => {
    div.classList.remove('current');
    if (i === activeIndex) {
      div.classList.add('current');
      div.scrollIntoView({ behavior: 'smooth', block: 'center' });
      karaokeLine.textContent = div.textContent;
    }
  });
});

exportBtn.addEventListener('click', () => {
  let lrc = '';
  if (titleInput.value.trim()) lrc += `[ti:${titleInput.value.trim()}]\n`;
  if (artistInput.value.trim()) lrc += `[ar:${artistInput.value.trim()}]\n`;
  if (albumInput.value.trim()) lrc += `[al:${albumInput.value.trim()}]\n`;
  lrc += "\n" + lines.map(l => l.time ? `[${l.time}] ${l.text}` : l.text).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([lrc], { type: 'text/plain' }));
  a.download = 'lyrics.lrc';
  a.click();
});

karaokeBtn.addEventListener('click', () => {
  karaokeView.style.display = 'block';
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

loadLrcBtn.addEventListener('click', () => lrcFileInput.click());
lrcFileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    lines = [];
    evt.target.result.split(/\n/).map(l => l.trim()).forEach(line => {
      if (line.startsWith('[ti:')) titleInput.value = line.slice(4, -1).trim();
      else if (line.startsWith('[ar:')) artistInput.value = line.slice(4, -1).trim();
      else if (line.startsWith('[al:')) albumInput.value = line.slice(4, -1).trim();
      else if (line.startsWith('[')) {
        const match = line.match(/\[(\d{2}:\d{2}\.\d{2})\](.*)/);
        if (match) lines.push({ time: match[1], text: match[2].trim() });
      } else if (line) lines.push({ time: null, text: line });
    });
    renderLyrics();
  };
  reader.readAsText(file);
});

applyMetadataBtn.addEventListener('click', () => alert('Metadaten übernommen!'));

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

