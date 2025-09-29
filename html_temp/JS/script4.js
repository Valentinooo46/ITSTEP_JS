$(document).ready(function () {
  // Кастомна дата перевірка
  window.Parsley.addValidator('birthday', {
    validateString: function (value) {
      const minDate = new Date('1900-01-01');
      const inputDate = new Date(value);
      return inputDate >= minDate;
    },
    messages: {
      en: 'Min birthday is 01/01/1900'
    }
  });

  const form = $('#userInfoForm').parsley();

  // Валідація при втраті фокусу
  form.fields.forEach(field => {
    field.$element.on('blur change', function () {
      field.validate();
    }
    );
  });

  // Сабміт з фокусом на перше невалідне поле
  $('#userInfoForm').on('submit', function (e) {
    e.preventDefault();
    form.validate();

    if (!form.isValid()) {
      const firstInvalid = form.fields.find(f => !f.isValid());
      if (firstInvalid) {
        firstInvalid.$element.focus();
      }
    } else {
      alert('Form is valid! Submitting...');
      $("#result").empty();
            form.fields.forEach(field => {
                $("#result").append(`<p>${field.$element.attr('name')}: ${field.getValue()}</p>`);
            }); // скидаємо форму після успішної відправки
    }
  });
});