const shit = document.querySelector("#shit"),
  cards = document.querySelector("#cards"),
  tes = document.querySelector("#tes"),
  hasil = document.querySelector("#hasil"),
  nextBtn = document.querySelector("#next"),
  prevBtn = document.querySelector("#prev");

let testStarted,
  testEnded,
  currCard,
  data,
  result = {};

const main = async () => {
  data = await fetch("data.json").then((r) => r.json());
  genCard();
};

function genCard() {
  let q = 1;
  for (const i of shuffle(Object.keys(data))) {
    const k = Object.keys(data[i]),
      v = Object.values(data[i]),
      card = $("div"),
      aspek = $("h3"),
      o1 = $("div"),
      o2 = $("div"),
      i1 = $("input"),
      i2 = $("input"),
      l1 = $("label"),
      l2 = $("label"),
      idx = $("p");

    [i1, l1].map((i) => {
      o1.className = "opt";
      o1.appendChild(i);
    });

    [i2, l2].map((i) => {
      o2.className = "opt";
      o2.appendChild(i);
    });

    let a;
    [a, l1.textContent, l2.textContent] = v;
    aspek.textContent = "Dalam " + a + ", saya:";
    i1.value = k[1];
    i2.value = k[2];
    i1.type = "radio";
    i2.type = "radio";
    i1.name = "q" + q;
    i2.name = "q" + q;
    card.className = "q" + q + " card";
    idx.textContent = q + "/" + data.length;

    [aspek, ...shuffle([o1, o2]), idx].map((c) => {
      card.appendChild(c);
      card.style.display = "none";
    });

    cards.appendChild(card);
    q++;
  }
}

function $(_) {
  return document.createElement(_);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function nextCard() {

  if (!optChecked()) {
    alert("pilih salah satu sebelum lanjut!");
    return
  }

  if (currCard == data.length) {
    testEnded = true;
    tes.style.display = "none";
    calcResult();
    return
  }

  if (currCard == data.length - 1) {
    nextBtn.textContent = "Hasil";
  }

  letCurrCard("none");
  currCard++
  letCurrCard("block");

}

function prevCard() {
  letCurrCard("none");
  if (currCard == 1) {
    currCard++;
  }
  if (currCard == data.length) {
    nextBtn.textContent = "Selanjutnya";
  }
  currCard--;
  letCurrCard("block");
}

function startTest() {
  testStarted = true;
  currCard = 1;
  shit.style.display = "none";
  tes.style.display = "block";
  letCurrCard("block");
}

function calcResult() {
  let d = cards.querySelectorAll('input')
  let cf = {
    Te: 0, Ti: 0, Fe: 0, Fi: 0, Ne: 0, Ni: 0, Se: 0, Si: 0
  }

  Array.from(d).filter(i => i.checked)
    .map(n => cf[n.value]++);

  for (let k in cf) {
    let el = $('h2');
    el.textContent = k + ': ' + cf[k];
    hasil.appendChild(el)
  }
}

function letCurrCard(m) {
  let c = document.querySelector(".q" + currCard);
  c.style.display = m;
}

function optChecked() {
  let c = document.querySelector(".q" + currCard);
  let d = c.querySelectorAll("input");
  return d[0].checked || d[1].checked;
}

window.onload = main();

window.addEventListener("beforeunload", (e) => {
  if (testStarted && !testEnded) {
    e.preventDefault();
  }
});

// prevBtn.addEventListener("onclick", (e) => {
//   letCurrCard("none");
//   if (currCard == 1) {
//     currCard++;
//   }
//   if (currCard == data.length) {
//     nextBtn.textContent = "Selanjutnya";
//   }
//   currCard--;
//   letCurrCard("block");
// });
//
// nextBtn.addEventListener("onclick", (e) => {
//   letCurrCard("none");
//   if (currCard == data.length - 1) {
//     nextBtn.textContent = "Hasil";
//   }
//   if (currCard == data.length) {
//     testEnded = true;
//     tes.style.display = "none";
//     calcResult();
//   } else {
//     currCard++;
//     letCurrCard("block");
//   }
// });
