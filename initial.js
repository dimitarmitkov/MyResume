let listener = document.addEventListener("click", eventHandler);
let mainPageTextImage = document.getElementById("dimitarText");
let i = 0;
let currentTime = document.getElementById("time");
let currentDate = document.getElementById("date");
let currentWeather = document.getElementById("weather");

function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();


    m = checkTime(m);
    s = checkTime(s);
    currentTime.innerHTML = h + ":" + m + ":" + s;
    let t = setTimeout(startTime, 500);

    if (+h === 0) {
        showCurrentDate();
    }


    if (m % 10 === 0) {
        showCurrentWeather();
    }

}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    // add zero in front of numbers < 10
    return i;
}

startTime();

function showCurrentDate() {

    currentDate.innerHTML = new Date().toDateString();


}

showCurrentDate();

function showCurrentWeather() {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=Sofia&units=metric&appid=07406591daf0667b7a7bb2fd7f62519b")
        .then(r => r.json())
        .then(r => {
                let data = Object.entries(r);
                let objEntries51 = Object.entries(data[5][1]);
                let objData110 = Object.values(data)[1][1][0];
                let currentTemp = Object.entries(data[3][1])[0][1];
                let currentWind = objEntries51[0][1];
                let speedDirection = objEntries51[1][1];
                let currentIcon = objData110.icon;
                let currentDescription = objData110.description;

                currentWeather.innerHTML = "Current temperature: " + parseInt(currentTemp) + "˚C "
                    + currentDescription +
                    `<img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png" width="40" height="40">`
                    + " current wind speed: " + currentWind + " km/h " + " direction "
                    + `<i class="bx bxs-right-arrow-alt" style="transform: rotate(${speedDirection}deg)"></i>`;
            }
        );
}

showCurrentWeather();

function eventHandler(e) {

    if (e.target.id === "clickIcon" || e.target.id === "arrow2" ) {
        mainPageTextImage.style.display = "block";
        mainPageTextImage.style.opacity = "1";
        document.getElementById("footer").style.position = "absolute";
        document.body.style.background = "url( \"./img/pexels-mati-mango-3193767.jpg\")";
        document.body.style.backgroundSize = "100rem";
        document.getElementById("resume").style.display = "none";
        document.getElementById("dimitarText").style.display = "block";
        document.getElementById("clickIcon").style.display = "none";
    }

    if (e.target.id === "startBtn") {
        time();
    }

    if (e.target.id === "mail"){
        window.location.href = `mailto:dimitar.mitkov@me.com`;
    }
}


function time() {
    setTimeout(() => {

        mainPageTextImage.style.opacity = `${1 - (parseFloat(i).toFixed(2))}`;
        i += 0.01;

        if (parseFloat(i).toFixed(2) < 1) {
            time();
        } else if (parseFloat(i.toFixed(2)) === 1) {
            mainPageTextImage.style.display = "none";
            // arrow.style.display = "inline-block";
            mainPageTextImage.style.opacity = "1";
            document.getElementById("footer").style.position = "relative";
            document.body.style.background = "url( \"./img/49756.ngsversion.1518628798992.adapt.1900.1.jpg\") no-repeat";
            document.body.style.backgroundSize = "cover";
            document.getElementById("resume").style.display = "block";
            document.getElementById("dimitarText").style.display = "none";
            document.getElementById("clickIcon").style.display = "block";
            document.getElementById("time").style.color="white";
            document.getElementById("date").style.color="white";
            document.getElementById("weather").style.color="white";
            document.getElementById("arrow").style.color="white";
            document.getElementById("arrow2").style.color="white";
            document.getElementById("clickIcon").style.color="white";
            i = 0;
        }

    }, 20);
}


listener ? listener.removeEventListener("click") : null;

