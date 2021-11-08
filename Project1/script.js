const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');

//show functions
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const err = formControl.querySelector('small');
  err.textContent = message;
}

//check functions
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${input.id}이 입력되지 않았습니다.`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${input.id}이 ${min}자 이상 이여야 합니다.`);
  } else if (input.value.length > max) {
    showError(input, `${input.id}이 ${max}자 이하 이여야 합니다.`);
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `${input.id} 형식이 올바르지 않습니다.`);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `비밀번호가 다릅니다.`);
  }
}

//Event Listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, passwordConfirm]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, passwordConfirm);
});
