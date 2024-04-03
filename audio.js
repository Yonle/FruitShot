let au = {
  sh: "shotgun.mp3",
  bm: "explosion.mp3",
  ht: "hit.mp3",
  sc: "toms-screams.mp3",
  pw: "powerup.mp3",
  sus: "suspense.mp3"
}

async function loadAud() {
  for (const n of Object.keys(au)) {
    const audioBlob = await fetch(au[n]).then(_ => _.blob());
    let b = URL.createObjectURL(audioBlob);

    au[n] = _ => {
      let a = new Audio();
      a.src = b;
      a.play();
    }

    document.getElementById("loadedaudios").innerText++;
  }

  return true;
}

document.getElementById("availableaudios").innerText = Object.keys(au).length;
