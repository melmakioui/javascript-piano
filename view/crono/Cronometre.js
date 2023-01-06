export class Cronometre {

  constructor() {
    this.startTime = 0;
    this.running = false;
    this.elapsedTime = 0;
  }

  start() {
    this.startTime = Date.now();
    this.running = true;
    this.interval = setInterval(this.updateDisplay.bind(this), 10);
  }

  stop() {
    this.elapsedTime = Date.now() - this.startTime;
    this.running = false;
    clearInterval(this.interval);
  }

  reset() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.running = false;
    this.updateDisplay();
  }

  updateDisplay() {
    let elapsedTime = this.elapsedTime;
    if (this.running) {
      elapsedTime = Date.now() - this.startTime;
    }
    this.display.innerHTML = this.formatTime(elapsedTime);
  }

  formatTime(timeInMilliseconds) {
    let time = Math.floor(timeInMilliseconds / 10) / 100;
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    let hundredths = Math.floor(time * 100 - seconds * 100 - minutes * 6000);
    return `${this.pad(minutes, 2)}:${this.pad(seconds, 2)}.${this.pad(hundredths, 2)}`;
  }

  pad(number, size) {
    let s = String(number);
    while (s.length < size) s = "0" + s;
    return s;
  }

  setDisplay(display) {
    this.display = display;
  }
}
