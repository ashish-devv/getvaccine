const app = angular.module("app", []);
app.controller("contro", ($scope, $http) => {
  $scope.showemptymsg = true;
  $scope.show = false;
  function senduserdetail() {
    $http({
      url: "https://getvaccine-server.herokuapp.com/getDetail",
      method: "GET",
      params: {
        name: $scope.name,
        email: $scope.email,
        age: $scope.age,
        pincode: $scope.pincode,
        state: $scope.stno,
        district: $scope.dist,
      },
    }).then(
      (response) => {
        //console.log(response);

        if (response.data.code == 1) {
          $scope.show = true;
          $scope.message = 1;
        } else if (response.data.code == 2) {
          $scope.show = true;
          $scope.message = 2;
        } else if (response.data.code == 3) {
          $scope.show = true;
          $scope.message = 3;
        }
      },
      (error) => {
        console.log(error);
        $scope.show = true;
        $scope.message = 4;
      }
    );
  }

  $scope.senduserdetail = senduserdetail;

  $http.get("https://cdn-api.co-vin.in/api/v2/admin/location/states").then(
    (response) => {
      //console.log(response.data);
      $scope.states = response.data.states;
    },
    (error) => {
      console.log(error);
    }
  );

  function district_change(no) {
    $http
      .get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${no}`)
      .then(
        (response) => {
          //console.log(response.data);
          $scope.districts = response.data.districts;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  $scope.district_change = district_change;

  function getlocationbydistrict(dis) {
    var date = new Date(); // M-D-YYYY

    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var dateString =
      (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
    $http
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${dis}&date=${dateString}`
      )
      .then(
        (response) => {
          console.log(response.data);
          $scope.data = response.data.centers;
          if (Object.keys(response.data.centers).length === 0) {
            console.log("empty");
            $scope.showemptymsg = false;
          } else {
            $scope.showemptymsg = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  $scope.getlocationbydistrict = getlocationbydistrict;

  function getlocationbypin(pincode) {
    var date = new Date(); // M-D-YYYY

    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var dateString =
      (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
    $http
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${dateString}`
      )
      .then(
        (response) => {
          console.log(response.data);
          $scope.data = response.data.centers;
          if (Object.keys(response.data.centers).length === 0) {
            console.log("empty");
            $scope.showemptymsg = false;
          } else {
            $scope.showemptymsg = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  $scope.getlocationbypin = getlocationbypin;
});
