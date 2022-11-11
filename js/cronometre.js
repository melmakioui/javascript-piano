function Cronometre(element, innerElement) {
    var interval;
    this.element = element;
    this.inner = innerElement;
    this.milisegons = 0;
    this.segons = 0;
    this.minuts = 0;
    this.hores = 0;

    this.init = function () {
      this.stop();
      this.pinta();
      clearInterval(interval);
      interval = setInterval(this.iniciaCrono, 10);
    };

    this.iniciaCrono = function () {
      this.milisegons += 10;
      var maxMilisegons = 1000;
      var maxMinSegons = 60

      if (this.milisegons === maxMilisegons) this.sumaSegons();
      if (this.segons === maxMinSegons) this.sumaMinuts();
      if (this.minuts === maxMinSegons) this.sumaHores();

      this.actualitza();
    }.bind(this);


    this.sumaSegons = function(){
      this.milisegons = 0;
      this.segons++;
    }

    this.sumaMinuts = function(){
      this.segons = 0;
      this.minuts++;
    }

    this.sumaHores = function(){
      this.minuts = 0;
      this.hores++;
    }

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