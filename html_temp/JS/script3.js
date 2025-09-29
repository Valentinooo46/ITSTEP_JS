$(document).ready(function () {
    const password = $('input[name="password"]');

    password.on('blur', function () {
        const value = password.val();
        const strength = getPasswordStrength(value);

        // Виводимо рівень надійності в дужках після поля
        let label = $('label[for="password"]');
        if (label.length === 0) {
            label = password.closest('.field').find('label');
        }

        label.find('.strength-indicator').remove(); // очищення попереднього
        label.append(`<span class="strength-indicator"> (${strength})</span>`);
    });

    function getPasswordStrength(password) {
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        const isOnlyDigits = /^\d+$/.test(password);
        const isOnlyLower = /^[a-z]+$/.test(password);
        const isOnlyUpper = /^[A-Z]+$/.test(password);

        if (isOnlyDigits || isOnlyLower || isOnlyUpper) {
            return 'Very easy';
        }

        if (hasDigit && ((hasLower && !hasUpper) || (hasUpper && !hasLower))) {
            return 'Easy';
        }

        if (hasDigit && hasLower && hasUpper && !hasSpecial) {
            return 'Normal';
        }

        if (hasDigit && hasLower && hasUpper && hasSpecial) {
            return 'Hard';
        }

        return 'Unknown';
    }

    // Кастомний валідатор для username
    window.Parsley.addValidator('usernamecheck', {
        validateString: function (value) {
            const blacklist = ['admin', 'user', 'test'];
            return !blacklist.includes(value.replace(/\s+/g, '').toLowerCase());
        },
        messages: {
            en: "Username cannot be admin or user or test"
        }
    });

    // Ініціалізація форми
    const form = $('#registerForm').parsley();

    // Валідація при втраті фокусу
    //   $('#registerForm input').on('blur', function () {
    //     console.log(form.fields);
    //     $(this).parsley().validate();
    //   });
    form.fields.forEach(field => {
        console.log(field);
        field.$element.on('blur', function () {
            field.validate();
        });
    });
    // Сабміт з фокусом на перше невалідне поле
    form.$element.on('submit', function (e) {
        e.preventDefault();
        form.validate();

        if (!form.isValid()) {
            const firstInvalid = form.fields.find(f => !f.isValid());
            if (firstInvalid) {
                firstInvalid.$element.focus();
            }
        } else {
            alert('Form is valid! Submitting...');
            // Тут можна виконати AJAX або іншу логіку
            $("#result").empty();
            form.fields.forEach(field => {
                $("#result").append(`<p>${field.$element.attr('name')}: ${field.getValue()}</p>`);
            }); // скидаємо форму після успішної відправки
        }
    });
});