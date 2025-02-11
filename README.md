## Description

NestJS restful API, swagger [docs](https://nestjs-my-car-value.onrender.com/api)

# Logic
1. signup
2. then post 3 or more reports with 1 type and model of the car with different price
  2.1 json should looks like this
  {
    "price": 18000,
    "make": "Toyota",
    "model": "Corolla",
    "year": 1952,
    "lng": 53,
    "lat": 18,
    "mileage": 120000
  }
  2.2 year can be +\-3, lng and lat +\-5, price can be random
3. approve all 3 reports by its id one by one, each user is provided with that right like admin
4. get average price with url params like /reports?make=Toyota&model=Corolla&lng=53&lat=18&mileage=120000&year=1952
5. profit, average price is counted

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
