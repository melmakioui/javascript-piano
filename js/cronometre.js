function Cronometre(element, inner) {
    this.element = element;
    this.milisegons = 0;
    this.segons = 0;
    this.minuts = 0;
    this.hores = 0;
    this.inner = inner;
    var interval;

    this.init = function () {
      this.pinta();
      interval = setInterval(this.iniciaCrono, 10);
    };

    this.iniciaCrono = function () {
      this.milisegons += 10;

      if (this.milisegons === 1000) {
        this.milisegons = 0;
        this.segons++;
      }

      if (this.segons === 60) {
        this.segons = 0;
        this.minuts++;
      }

      if (this.minuts === 60) {
        this.minuts = 0;
        this.hores++;
      }

      this.actualitza();
    }.bind(this);

    this.stop = function () {
      this.element.innerHTML = this.inner;
      clearInterval(interval);
    };

    this.pinta = function () {
      this.element.innerHTML = "00 : 00 : 00 : 000";
    };

    this.actualitza = function () {
      var hores = this.hores < 10 ? "0" + this.hores : this.hores;
      var minuts = this.minuts < 10 ? "0" + this.minuts : this.minuts;
      var segons = this.segons < 10 ? "0" + this.segons : this.segons;
      var milisegons =
        this.milisegons < 10
          ? "00" + this.milisegons
          : this.milisegons < 100
          ? "0" + this.milisegons
          : this.milisegons;
      this.element.innerHTML = `${hores} : ${minuts} : ${segons} : ${milisegons}`;
    };
  }