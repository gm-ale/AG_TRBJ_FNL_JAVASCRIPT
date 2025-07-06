const form = document.getElementById('budgetForm');
const totalPriceEl = document.getElementById('totalPrice');

// Inputs
const nameInput = form.name;
const surnameInput = form.surname;
const phoneInput = form.phone;
const emailInput = form.email;
const productInputs = form.elements['product'];
const termInput = form.term;
const extrasInputs = form.querySelectorAll('input[name="extras"]');
const termsInput = form.terms;

// Error smalls
const errorName = document.getElementById('errorName');
const errorSurname = document.getElementById('errorSurname');
const errorPhone = document.getElementById('errorPhone');
const errorEmail = document.getElementById('errorEmail');

// Validations
function validateName(name) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,15}$/.test(name);
}

function validateSurname(surname) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,40}$/.test(surname);
}

function validatePhone(phone) {
  return /^\d{1,9}$/.test(phone);
}

function validateEmail(email) {
  // Simple email regex example:
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, errorEl, message) {
  if (message) {
    errorEl.textContent = message;
    input.classList.add('invalid');
  } else {
    errorEl.textContent = '';
    input.classList.remove('invalid');
  }
}

// Calculate total price with discounts and extras
function calculateTotal() {
  let productPrice = 0;
  for (const prod of productInputs) {
    if (prod.checked) {
      productPrice = Number(prod.value);
      break;
    }
  }

  let extrasPrice = 0;
  extrasInputs.forEach(extra => {
    if (extra.checked) extrasPrice += Number(extra.value);
  });

  let term = Number(termInput.value) || 1;
  if(term < 1) term = 1;

  // Descuento: 5% por cada mes menos a 6 (mínimo 0%)
  let discountPercent = 0;
  if(term < 6) {
    discountPercent = (6 - term) * 5;
    if(discountPercent > 25) discountPercent = 25; // límite descuento max 25%
  }

  let basePrice = productPrice + extrasPrice;
  let discount = basePrice * discountPercent / 100;
  let finalPrice = basePrice - discount;

  totalPriceEl.textContent = `€${finalPrice.toFixed(2)}`;
}

// Real-time update total price on changes
form.addEventListener('change', calculateTotal);

// Validation on submit
form.addEventListener('submit', e => {
  e.preventDefault();

  let valid = true;

  if(!validateName(nameInput.value)) {
    showError(nameInput, errorName, 'Nombre inválido (solo letras, máximo 15 caracteres)');
    valid = false;
  } else {
    showError(nameInput, errorName, '');
  }

  if(!validateSurname(surnameInput.value)) {
    showError(surnameInput, errorSurname, 'Apellidos inválidos (solo letras, máximo 40 caracteres)');
    valid = false;
  } else {
    showError(surnameInput, errorSurname, '');
  }

  if(!validatePhone(phoneInput.value)) {
    showError(phoneInput, errorPhone, 'Teléfono inválido (solo números, máximo 9 dígitos)');
    valid = false;
  } else {
    showError(phoneInput, errorPhone, '');
  }

  if(!validateEmail(emailInput.value)) {
    showError(emailInput, errorEmail, 'Correo electrónico inválido');
    valid = false;
  } else {
    showError(emailInput, errorEmail, '');
  }

  // Verificar producto seleccionado
  if (![...productInputs].some(p => p.checked)) {
    alert('Por favor, seleccione un producto');
    valid = false;
  }

  // Verificar plazo numérico válido
  if (termInput.value === "" || Number(termInput.value) < 1) {
    alert('Por favor, indique un plazo válido (mínimo 1)');
    valid = false;
  }

  // Verificar condiciones aceptadas
  if (!termsInput.checked) {
    alert('Debe aceptar las condiciones de privacidad');
    valid = false;
  }

  if(valid){
    alert('Formulario enviado con éxito!\nPresupuesto: ' + totalPriceEl.textContent);
    form.reset();
    calculateTotal();
  }
});

// Inicializar cálculo
calculateTotal();
