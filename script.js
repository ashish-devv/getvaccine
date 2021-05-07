const app = angular.module("app", []);
app.controller("contro", ($scope, $http) => {
  $http
    .get(
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=800020&date=07-05-2021"
    )
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
});
