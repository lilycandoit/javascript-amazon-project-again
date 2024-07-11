class Car {
  #brand;
  #model;

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  speed = 0;
  isTrunkopen = false;

  
  displayInfo(){
    const trunkStatus = this.isTrunkopen ? 'open' : 'closed';

    return `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, ${trunkStatus}`;
  }
  
  go(){
    if(!this.isTrunkopen){
      this.speed += 5;
    }
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

  openTrunk(){
    if(this.speed === 0){
      this.isTrunkopen = true;
    }
  }

  closeTrunk(){
    this.isTrunkopen = false;
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
car1.go();
console.log(car1.displayInfo());
// result: Toyota Corolla, Speed: 25 km/h, closed


//17e
class RaceCar extends Car{
  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  // overiding method
  go(){
    this.speed += this.acceleration;

    if (this.speed > 300){
      this.speed = 300;
    }
  }

  // overiding method
  displayInfo(){
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, acceleration: ${this.acceleration}`)
  }

}

const raceCar = new RaceCar({
  brand: 'Toyota', 
  model: 'Corolla', 
  acceleration: 20
})

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
