let rn = rn => (Math.floor(Math.random() * 10) + 1);
let fruits = ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🍎", "🍏", "🍒", "🍓", "🥝", "🍅", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶", "️🥒", "🥦", "🍄", "🥜", "🌰"];
let bombed = false;
let score = 0;
let skullscore = 0;
let bombscore = 0;
let onSuper = false;
let pwTimeout = null;
let runners = new Set();
let skulls = new Set();
let rInt = null;
//let rn = rn => 1;

let desc = document.getElementById("desc");

function newFruit(bomb, isSuper) {
  let f = document.createElement("span");
  f.innerText = bomb ? "💣" : fruits[Math.floor(Math.random() * fruits.length)];
  switch (isSuper) {
    case true:
      f.innerText = "🌟";
      break;
    case false:
      au.sus();
      f.innerText = "☢️";
      break;
  }
  f.style.position = "fixed";
  f.style.margin = 0;
  f.style.padding = 0;
  f.style["font-size"] = "50px";
  f.style.MozUserSelect = "none";
  f.style["user-select"] = "none";
  if (bomb) f.style["z-index"] = 2;
  document.body.appendChild(f);
  
  handleFruit(f, bomb, isSuper);
}

function handleFruit(f, bomb, isSuper) {
  let ps = {
    t: 0,
    l: 0,
    sp: {
      t: rn(),
      l: rn()
    }
  }
  
  let ct = {
    t: 0,
    l: 0
  }
  
  let fs = 10;
  let fruitShotted = false;
  
  //let stat = document.createElement('p');
  //document.body.appendChild(stat);
  let fr = { ps, ct, f };
  runners.add(fr);
  
  if (isSuper == false) {
    // nuke
    f.addEventListener("pointerover", () => {
      au.bm();
      
      runners.delete(fr);
      document.body.style.background = "orange";
      
      f.style["font-size"] = "160px";
      f.style.top = (ps.t - 60) + "px";
      f.style.left = (ps.l - 60) + "px";
      f.innerText = "💥";
      setTimeout(_ => {
        document.body.removeChild(f);
        
        au.sc();
        
        bombed = true;
        clearInterval(rInt);
        document.documentElement.style.background = "black";
        document.getElementById("gameover").style.visibility = "visible";
      }, 40);
      
      return;
    });
  } else f.addEventListener("pointerdown", () => {
    if (bombed) return;
    
    if (isSuper) {
      // star
      onSuper = true;
      document.getElementById("sc").style.color = "green";
      document.body.style.background = "lightgreen";
      clearTimeout(pwTimeout);
      pwTimeout = setTimeout(() => {
        onSuper = false;
        document.getElementById("sc").style.color = "";
        document.body.style.background = "transparent";
      }, 10000);
      au.pw();
      
      runners.delete(fr)
      document.body.removeChild(f);
      return;
    }
    
    if (bomb && !isSuper) {
      // bomb
      au.bm();
      
      runners.delete(fr);
      document.body.style.background = "orange";

      f.style["font-size"] = "160px";
      f.style.top = (ps.t - 60) + "px";
      f.style.left = (ps.l - 60) + "px";
      f.innerText = "💥";

      bombscore++
      document.getElementById("bombscore").innerText = bombscore;
      setTimeout(_ => {
        document.body.removeChild(f);
        document.body.style.background = onSuper ? "lightgreen" : "transparent";
        
        if (onSuper) return;
        
        au.sc();
        
        bombed = true;
        clearInterval(rInt);
        document.documentElement.style.background = "black";
        document.getElementById("gameover").style.visibility = "visible";
      }, 40);
      
      return;
    }
    
    fs += 30;
    if (f.innerText === "☠️") {
      // skull
      ps.t -= 20;
      ps.l -= 20;
      f.style.top = ps.t + "px";
      f.style.left = ps.l + "px";
      f.style["z-index"] = 2;
      
      if ((fs > 150) || onSuper) {
        f.style["z-index"] = 3;
        document.body.style.background = "orange";
        f.innerText = "💥";
        skullscore++
        document.getElementById("skullscore").innerText = skullscore;
        setTimeout(_ => {
          document.body.removeChild(f);
          document.body.style.background = onSuper ? "lightgreen" : "transparent";
        }, 40);
        
        if (!onSuper)
          for (let i = 0; i < 2; i++) newFruit(true); // drop 2 bombs
        return au.bm();
      }
      
      f.style["font-size"] = fs + "px";
      return au.ht();
    } else if (!fruitShotted) {
      // fruit
      fruitShotted = true;
      score++;
      document.getElementById("score").innerText = score;
      document.getElementById("sc").style.visibility = "visible";
      
      f.style["z-index"] = 2;
      
      if (!onSuper && (score % 20) === 0) newFruit(true, true); // drop a star
      if ((score % 50) === 0) newFruit(true, false); // drop the nuke
    }
    runners.delete(fr);
    skulls.add(fr);
    f.innerText = "☠️";
    if (!isSuper) newFruit();
  });
}

loadAud()
window.addEventListener("pointerdown", p => {
  if (bombed) return;
  au.sh();
  desc.style.visibility = "visible";
  desc.style.top = (p.clientY - 30) + "px";
  desc.style.left = (p.clientX - 30) + "px";
  setTimeout(() => {
    desc.style.visibility = "hidden";
  }, 30);
  
  document.getElementById("loading").style.visibility = "hidden";
});
for (let i = 0; i < 10; i++) newFruit();

rInt = setInterval(() => {
  if (!runners.size) return clearInterval(rInt);
  for (const fr of runners) {
    if (bombed) break;
    
    if (fr.ps.t >= window.innerHeight) {
      fr.ct.t = 1;
      fr.ps.sp.t = rn();
    } else if (fr.ps.t <= 0) {
      fr.ct.t = 0;
      fr.ps.sp.t = rn();
    }
    
    if (fr.ps.l >= window.innerWidth) {
      fr.ct.l = 1;
      fr.ps.sp.l = rn();
    } else if (fr.ps.l <= 0) {
      fr.ct.l = 0;
      fr.ps.sp.l = rn();
    }
    
    if (fr.ct.t) fr.ps.t = fr.ps.t - fr.ps.sp.t;
    else fr.ps.t = fr.ps.t + fr.ps.sp.t;
    if (fr.ct.l) fr.ps.l = fr.ps.l - fr.ps.sp.l;
    else fr.ps.l = fr.ps.l + fr.ps.sp.l;
    
    fr.f.style.top = fr.ps.t + "px";
    fr.f.style.left = fr.ps.l + "px";
    //stat.innerText = JSON.stringify(ps);
  }
}, 20);
