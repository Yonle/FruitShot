let au = {
  sh: "shotgun.mp3",
  bm: "explosion.mp3",
  ht: "hit.mp3",
  sc: "toms-screams.mp3",
  pw: "powerup.mp3",
  sus: "suspense.mp3"
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

async function load_audio(n) {
  const r = await fetch(au[n]);
  let b = await audioCtx.decodeAudioData(await r.arrayBuffer())

  au[n] = _ => {
    playAudio(b)
  }

  document.getElementById("loadedaudios").innerText++;
}

function loadAud() {
  for (const n of Object.keys(au)) {
    load_audio(n)
  }
}

function playAudio(src) {
  const source = audioCtx.createBufferSource();
  source.buffer = src;
  source.connect(audioCtx.destination);
  source.start(0);
}

document.getElementById("availableaudios").innerText = Object.keys(au).length;

