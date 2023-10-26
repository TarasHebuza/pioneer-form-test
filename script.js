[...document.querySelectorAll(".button-submit")].map((elem) => {
    elem.addEventListener("click", function (e) {
        let count = 0;
        [...document.querySelectorAll(".item-field")].map((formItem) => {
            if(!formItem.value) {
               formItem.parentElement.parentElement.querySelector(".item-error").classList.add("active");
               document.querySelector(".button-repeat").classList.add("active");
               document.querySelector(".button-submit").classList.remove("active");
            } else if (formItem.value) {
                formItem.parentElement.parentElement.querySelector(".item-error").classList.remove("active");
                count++
            }
        })

        if (count == [...document.querySelectorAll(".item-field")].length) {
            document.querySelector(".button-repeat").classList.remove("active");
            document.querySelector(".button-submit").classList.add("active");
            
            // send data start
            const sendData = async () => {
                const firstName = document.querySelector("#first-name").value;
                const lastName = document.querySelector("#last-name").value;
                const phone = document.querySelector("#phone").value;
                const email = document.querySelector("#email").value;
                const city = document.querySelector("#city").value;
                const notes = document.querySelector("#interested-in").value;
              
                const data = {
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    email: email,
                    city: city,
                    notes: notes
                };

                const wrongMessage = document.querySelector(".message-wrong");
                wrongMessage.style.display = 'flex';

                setTimeout(function () {
                    wrongMessage.style.display = 'none';
                }, 3000);

                try {
                    const response = await fetch('/backend-endpoint', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data)
                    });
                
                    if (response.status = 200) {
                        console.log('Data sent successfully');

                        const successMessage = document.querySelector(".message-success");
                        successMessage.style.display = 'flex';

                        setTimeout(function () {
                            successMessage.style.display = 'none';
                        }, 3000);

                        document.querySelector("#first-name").value = "";
                        document.querySelector("#last-name").value = "";
                        document.querySelector("#phone").value = "";
                        document.querySelector("#email").value = "";
                        document.querySelector("#city").value = "";
                        document.querySelector("#interested-in").value = "";

                    } else {
                        console.error('Error sending data to the server');

                        const wrongMessage = document.querySelector(".message-wrong");
                        wrongMessage.style.display = 'flex';

                        setTimeout(function () {
                            wrongMessage.style.display = 'none';
                        }, 3000);

                    }

                  } catch (error) {
                    console.error('Network error:', error);
                }
            }

            sendData()

            // send data end

        }
    })
});


[...document.querySelectorAll(".item-field")].map((itemField) => {
    itemField.addEventListener("focusin", function (e) {
        [...document.querySelectorAll(".item-field")].map((itemFieldNotActive) => {
            itemFieldNotActive.parentElement.parentElement.classList.remove("active");
        })
        itemField.parentElement.parentElement.classList.add("active");
    })
});


[...document.querySelectorAll(".item-field")].map((itemField) => {
    itemField.addEventListener("focusout", function (e) {
        [...document.querySelectorAll(".item-field")].map((item) => {
            item.parentElement.parentElement.classList.remove("active");
        })
    })
});

[...document.querySelectorAll(".item-field")].map((itemField) => {
    itemField.addEventListener("input", function (e) {
        if(itemField.value) {
            itemField.parentElement.parentElement.querySelector(".item-error").classList.remove("active")
        } else if(!itemField.value) {
            itemField.parentElement.parentElement.querySelector(".item-error").classList.add("active")
        }
    })
});