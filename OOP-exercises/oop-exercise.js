class Car {
  brand;
  model;

  constructor(carDetails){
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }

  displayInfo(){
    return `${this.brand} ${this.model}, Speed: ${this.speed} km/h`;
  }

  speed = 0;
  go(){
    this.speed += 5;
    if (this.speed > 200){
      this.speed = 200;
    }
  }

  brake(){
    this.speed -= 5;
    if (this.speed < 0){
      this.speed = 0;
    }
  }
}

const car1 = new Car ({
  brand: 'Toyota', 
  model: 'Corolla'
})

car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.brake();
console.log(car1.displayInfo());