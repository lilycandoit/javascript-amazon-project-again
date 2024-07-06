class Car {
  brand;
  model;

  constructor(carDetails){
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }

  speed = 0;
  isTrunkopen = false;

  
  displayInfo(){
    const trunkStatus = this.isTrunkopen ? 'open' : 'closed';

    return `${this.brand} ${this.model}, Speed: ${this.speed} km/h, ${trunkStatus}`;
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
