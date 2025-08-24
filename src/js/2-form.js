const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

const savedData = localStorage.getItem('feedback-form-state');
if (savedData) {
  const parsedData = JSON.parse(savedData);
  for (const key in formData) {
    if (parsedData[key]) {
      formData[key] = parsedData[key];
      const field = form.querySelector(`[name="${key}"]`);
      if (field) {
        field.value = parsedData[key];
      }
    }
  }
}

form.addEventListener('input', e => {
  const target = e.target;
  if (target && target.name && target.name in formData) {
    formData[target.name] = target.value;

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const allFilled = Object.values(formData).every(value => value.trim() !== '');
  if (!allFilled) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  for (const key in formData) {
    formData[key] = '';
    const field = form.querySelector(`[name="${key}"]`);
    if (field) {
      field.value = '';
    }
  }
});