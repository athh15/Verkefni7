/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;
var tala1 = 0;
var tala2 = 0;
var typeOfQuestion = 0;
var GAMES_PLAYED = 0;
var rettSvar = 0;
var startTimi = 0;
var endTimi = 0;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
  alert('Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.');

  do {
    startTimi = performance.now();
    play();
  } while (confirm('Spila annan leik?'));
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {

  let correct = false;

  do {
    if (!ask()) {
      alert('Hætt í leik');
      reset();
      break;
    }
    if (GAMES_PLAYED == GAMES_TO_PLAY) {
      endTimi = performance.now();
      alert(showScore());
      reset();
      correct = true;
    }
  } while (!correct)
}

function reset() {
  tala1 = 0;
  tala2 = 0;
  typeOfQuestion = 0;
  GAMES_PLAYED = 0;
  rettSvar = 0;
  startTimi = 0;
  endTimi = 0;
}

function showScore() {
  const reiknaTima = (endTimi - startTimi) / 1000;
  const medalTimi = reiknaTima / rettSvar;
  const result = `Þú svaraðir ${rettSvar} af 10 dæmum rétt á ${reiknaTima.toFixed(2)} sekúndum. 
Meðalrétt svör á sekúndu eru ${medalTimi.toFixed(2)}`;

  return result;
}
/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {

  const input = prompt('Hvað er ' + spurning());

  if (input === null) {
    return false;
  }

  let reiknudTala = 0;
  if (typeOfQuestion == 1) {
    reiknudTala = tala1 + tala2;
  } else if (typeOfQuestion == 2) {
    reiknudTala = tala1 - tala2;
  } else if (typeOfQuestion == 3) {
    reiknudTala = tala1 * tala2;
  } else if (typeOfQuestion == 4) {
    reiknudTala = tala2 / tala1;
  }

  const parsedInput = parseGuess(input);

  if (parsedInput == reiknudTala) {
    rettSvar++;
  }
  GAMES_PLAYED++;

  return true;
}

function parseGuess(input) {
  const parsed = parseInt(input, 10);

  if (isNaN(parsed)) {
    return null;
  }

  return parsed;
}

function spurning() {
  const rand = randomNumber(1, 4);

  if (rand == 1) { //+
    tala1 = randomNumber(1, 100);
    tala2 = randomNumber(1, 100);
    typeOfQuestion = 1;
    return tala1 + ' + ' + tala2;
  } else if (rand == 2) {
    tala1 = randomNumber(1, 100);
    tala2 = randomNumber(1, 100);
    typeOfQuestion = 2;
    return tala1 + ' - ' + tala2;
  } else if (rand == 3) {
    tala1 = randomNumber(1, 10);
    tala2 = randomNumber(1, 10);
    typeOfQuestion = 3;
    return tala1 + ' * ' + tala2;
  } else {
    tala1 = randomNumber(2, 10);
    tala2 = tala1 * randomNumber(2, 10);
    typeOfQuestion = 4;
    return tala2 + ' / ' + tala1;
  }

}


/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();