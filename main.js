let sh = () => null;
let bm = () => null;
let ht = () => null;
let sc = () => null;
let pw = () => null;
let sus = () => null;

function loadAud() {
  fetch("shotgun.mp3").then(_ => _.blob()).then(audioBlob => {
    let aud = URL.createObjectURL(audioBlob);

    sh = _ => {
      let shot = new Audio();
      shot.src = aud;
      shot.play();
    }
  });

  fetch("explosion.mp3").then(_ => _.blob()).then(audioBlob => {
    let aud = URL.createObjectURL(audioBlob);

    bm = _ => {
      let shot = new Audio();
      shot.src = aud;
      shot.play();
    }
  });

  fetch("hit.mp3").then(_ => _.blob()).then(audioBlob => {
    let aud = URL.createObjectURL(audioBlob);

    ht = _ => {
      let shot = new Audio();
      shot.src = aud;
      shot.play();
    }
  });

  fetch("toms-screams.mp3").then(_ => _.blob()).then(audioBlob => {
    let aud = URL.createObjectURL(audioBlob);

    sc = _ => {
      let shot = new Audio();
      shot.src = aud;
      shot.play();
    }
  });

  fetch("powerup.mp3").then(_ => _.blob()).then(audioBlob => {
    let aud = URL.createObjectURL(audioBlob);

    pw = _ => {
      let shot = new Audio();
      shot.src = aud;
      shot.play();
    }
  });

  fetch("suspense.mp3").then(_ => _.blob()).then(audioBlob => {
    let aud = URL.createObjectURL(audioBlob);

    sus = _ => {
      let shot = new Audio();
      shot.src = aud;
      shot.play();
    }
  });
}
