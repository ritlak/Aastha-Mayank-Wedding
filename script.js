/* ================================= */
/* ENVELOPE                          */
/* ================================= */

function openInvitation() {

    const envelope =
        document.getElementById("envelope");

    const card =
        document.getElementById("invitationCard");

    envelope.classList.add("opened");

    setTimeout(function () {

        card.classList.add("show-names");

    }, 700);

}


/* ================================= */
/* MUSIC                             */
/* ================================= */

function toggleMusic() {

    const music =
        document.getElementById("weddingMusic");

    const button =
        document.getElementById("musicButton");

    const floatingButton =
        document.getElementById("floatingMusic");


    if (music.paused) {

        music.play()
            .then(function () {

                button.textContent =
                    "❚❚ PAUSE MUSIC";

                floatingButton.textContent =
                    "❚❚";

            })
            .catch(function () {

                alert(
                    "Please tap the play button to start the music."
                );

            });

    } else {

        music.pause();

        button.textContent =
            "▶ PLAY MUSIC";

        floatingButton.textContent =
            "♫";

    }

}


/* ================================= */
/* COUNTDOWN                         */
/* ================================= */

function updateCountdown() {

    const weddingDate =
        new Date(
            "September 12, 2026 20:00:00"
        ).getTime();


    const now =
        new Date().getTime();


    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById(
            "days"
        ).textContent = "00";

        document.getElementById(
            "hours"
        ).textContent = "00";

        document.getElementById(
            "minutes"
        ).textContent = "00";

        document.getElementById(
            "seconds"
        ).textContent = "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );


    document.getElementById(
        "days"
    ).textContent =
        String(days).padStart(2, "0");


    document.getElementById(
        "hours"
    ).textContent =
        String(hours).padStart(2, "0");


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes).padStart(2, "0");


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* ================================= */
/* EDITOR                            */
/* ================================= */

function showEditor() {

    document.getElementById(
        "editor"
    ).style.display = "block";

}


function hideEditor() {

    document.getElementById(
        "editor"
    ).style.display = "none";

}


/* ================================= */
/* LIVE EDITING                      */
/* ================================= */

function updateNames() {

    document.getElementById(
        "brideName"
    ).textContent =
        document.getElementById(
            "brideInput"
        ).value;


    document.getElementById(
        "groomName"
    ).textContent =
        document.getElementById(
            "groomInput"
        ).value;

}


document.getElementById(
    "brideInput"
).addEventListener(
    "input",
    updateNames
);


document.getElementById(
    "groomInput"
).addEventListener(
    "input",
    updateNames
);


document.getElementById(
    "dateInput"
).addEventListener(
    "input",
    function () {

        document.getElementById(
            "weddingDate"
        ).textContent =
            this.value;

    }
);


document.getElementById(
    "timeInput"
).addEventListener(
    "input",
    function () {

        document.getElementById(
            "weddingTime"
        ).textContent =
            this.value;

    }
);


document.getElementById(
    "venueInput"
).addEventListener(
    "input",
    function () {

        document.getElementById(
            "venueText"
        ).textContent =
            this.value;

    }
);


document.getElementById(
    "locationInput"
).addEventListener(
    "input",
    function () {

        document.getElementById(
            "locationText"
        ).textContent =
            this.value;

    }
);


document.getElementById(
    "mapInput"
).addEventListener(
    "input",
    function () {

        document.getElementById(
            "mapButton"
        ).href =
            this.value;

    }
);


document.getElementById(
    "baratInput"
).addEventListener(
    "input",
    function () {

        document.getElementById(
            "baratTime"
        ).textContent =
            this.value;

    }
);


document.getElementById(
    "dinnerInput"
).addEventListener(
    "input",
    function () {

        document.getElementById(
            "dinnerTime"
        ).textContent =
            this.value;

    }
);


document.getElementById(
    "doliInput"
).addEventListener(
    "input",
    function () {

        document.getElementById(
            "doliText"
        ).textContent =
            this.value;

    }
);


document.getElementById(
    "songInput"
).addEventListener(
    "input",
    function () {

        document.getElementById(
            "songText"
        ).textContent =
            this.value;

    }
);


document.getElementById(
    "familiesInput"
).addEventListener(
    "input",
    function () {

        document.getElementById(
            "familiesText"
        ).innerHTML =
            this.value
                .replace(/\n/g, "<br>");

    }
);


/* ================================= */
/* PHOTO STORAGE                     */
/* ================================= */

const photoDBRequest =
    indexedDB.open(
        "WeddingCardDB",
        1
    );


photoDBRequest.onupgradeneeded =
    function (event) {

        const db =
            event.target.result;


        if (
            !db.objectStoreNames.contains(
                "photos"
            )
        ) {

            db.createObjectStore(
                "photos"
            );

        }

    };


function savePhoto(
    photoNumber,
    file
) {

    const request =
        indexedDB.open(
            "WeddingCardDB",
            1
        );


    request.onsuccess =
        function (event) {

            const db =
                event.target.result;


            const transaction =
                db.transaction(
                    "photos",
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    "photos"
                );


            store.put(
                file,
                "photo" + photoNumber
            );


            transaction.oncomplete =
                function () {

                    loadPhoto(
                        photoNumber
                    );

                };

        };

}


function loadPhoto(
    photoNumber
) {

    const request =
        indexedDB.open(
            "WeddingCardDB",
            1
        );


    request.onsuccess =
        function (event) {

            const db =
                event.target.result;


            const transaction =
                db.transaction(
                    "photos",
                    "readonly"
                );


            const store =
                transaction.objectStore(
                    "photos"
                );


            const getRequest =
                store.get(
                    "photo" + photoNumber
                );


            getRequest.onsuccess =
                function () {

                    const file =
                        getRequest.result;


                    if (file) {

                        const imageURL =
                            URL.createObjectURL(
                                file
                            );


                        document.getElementById(
                            "photoPreview" +
                            photoNumber
                        ).src =
                            imageURL;

                    }

                };

        };

}


/* ================================= */
/* PHOTO INPUTS                      */
/* ================================= */

document.getElementById(
    "photoInput1"
).addEventListener(
    "change",
    function () {

        const file =
            this.files[0];

        if (file) {

            savePhoto(
                1,
                file
            );

        }

    }
);


document.getElementById(
    "photoInput2"
).addEventListener(
    "change",
    function () {

        const file =
            this.files[0];

        if (file) {

            savePhoto(
                2,
                file
            );

        }

    }
);


document.getElementById(
    "photoInput3"
).addEventListener(
    "change",
    function () {

        const file =
            this.files[0];

        if (file) {

            savePhoto(
                3,
                file
            );

        }

    }
);


loadPhoto(1);

loadPhoto(2);

loadPhoto(3);


/* ================================= */
/* SAVE INVITATION                   */
/* ================================= */

function saveInvitation() {

    const invitationData = {

        bride:
            document.getElementById(
                "brideInput"
            ).value,

        groom:
            document.getElementById(
                "groomInput"
            ).value,

        date:
            document.getElementById(
                "dateInput"
            ).value,

        time:
            document.getElementById(
                "timeInput"
            ).value,

        venue:
            document.getElementById(
                "venueInput"
            ).value,

        location:
            document.getElementById(
                "locationInput"
            ).value,

        map:
            document.getElementById(
                "mapInput"
            ).value,

        barat:
            document.getElementById(
                "baratInput"
            ).value,

        dinner:
            document.getElementById(
                "dinnerInput"
            ).value,

        doli:
            document.getElementById(
                "doliInput"
            ).value,

        song:
            document.getElementById(
                "songInput"
            ).value,

        families:
            document.getElementById(
                "familiesInput"
            ).value

    };


    localStorage.setItem(
        "weddingInvitation",
        JSON.stringify(
            invitationData
        )
    );


    const message =
        document.getElementById(
            "saveMessage"
        );


    message.textContent =
        "✓ Invitation saved successfully ❤️";


    setTimeout(
        function () {

            message.textContent = "";

        },
        3000
    );

}


/* ================================= */
/* LOAD INVITATION                   */
/* ================================= */

function loadInvitation() {

    const savedData =
        localStorage.getItem(
            "weddingInvitation"
        );


    if (!savedData) {
        return;
    }


    const data =
        JSON.parse(
            savedData
        );


    document.getElementById(
        "brideInput"
    ).value =
        data.bride;


    document.getElementById(
        "groomInput"
    ).value =
        data.groom;


    document.getElementById(
        "dateInput"
    ).value =
        data.date;


    document.getElementById(
        "timeInput"
    ).value =
        data.time;


    document.getElementById(
        "venueInput"
    ).value =
        data.venue;


    document.getElementById(
        "locationInput"
    ).value =
        data.location;


    document.getElementById(
        "mapInput"
    ).value =
        data.map;


    document.getElementById(
        "baratInput"
    ).value =
        data.barat;


    document.getElementById(
        "dinnerInput"
    ).value =
        data.dinner;


    document.getElementById(
        "doliInput"
    ).value =
        data.doli;


    document.getElementById(
        "songInput"
    ).value =
        data.song;


    document.getElementById(
        "familiesInput"
    ).value =
        data.families;


    /* Update preview */

    document.getElementById(
        "brideName"
    ).textContent =
        data.bride;


    document.getElementById(
        "groomName"
    ).textContent =
        data.groom;


    document.getElementById(
        "weddingDate"
    ).textContent =
        data.date;


    document.getElementById(
        "weddingTime"
    ).textContent =
        data.time;


    document.getElementById(
        "venueText"
    ).textContent =
        data.venue;


    document.getElementById(
        "locationText"
    ).textContent =
        data.location;


    document.getElementById(
        "mapButton"
    ).href =
        data.map;


    document.getElementById(
        "baratTime"
    ).textContent =
        data.barat;


    document.getElementById(
        "dinnerTime"
    ).textContent =
        data.dinner;


    document.getElementById(
        "doliText"
    ).textContent =
        data.doli;


    document.getElementById(
        "songText"
    ).textContent =
        data.song;


    document.getElementById(
        "familiesText"
    ).innerHTML =
        data.families
            .replace(/\n/g, "<br>");

}


loadInvitation();


/* ================================= */
/* RESET                             */
/* ================================= */

function resetInvitation() {

    localStorage.removeItem(
        "weddingInvitation"
    );


    location.reload();

}


/* ================================= */
/* SCROLL REVEAL                     */
/* ================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        function (
            entries,
            observer
        ) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(
            element
        );

    }
);