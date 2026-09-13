import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');

const makePromise = () => {
    return new Promise((resolve, reject) => {
        const state = document.querySelector('input[name="state"]:checked');

        setTimeout(() => {
            if (state.value === "fulfilled") {
                resolve(Number(delay.value));
            } else if (state.value === "rejected") {
                reject(Number(delay.value));
            } else {
                throw new Error(`Unexpected state value: ${state}`);
            }
        }, Number(delay.value));
    });
};

form.addEventListener("submit", event => {
    event.preventDefault();

    makePromise()
        .then(value => {
            iziToast.show({
                message: `✅ Fulfilled promise in ${value}ms`,
                position: 'topRight',
                backgroundColor: 'green'
            });
        })
        .catch(value => {
            iziToast.show({
                title: 'Error',
                message: `❌ Rejected promise in ${value}ms`,
                position: 'topRight',
                backgroundColor: 'red'
            });
        })
        .finally(() => form.reset());
});