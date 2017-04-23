$.validator.addMethod('emailAvailable', function (value, element) {
    return !CheckEmail(value)
}, "The email must not already be in database");

$(function () {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='signup']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            username: "required",
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true,
                emailAvailable: true
            },
            password: {
                required: true,
                minlength: 5
            },
            confirmPassword: {
                equalTo: '#password',
                minlength: 5
            }
        },
        // Specify validation error messages
        messages: {
            username: "Please enter your firstname",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            confirmPassword: {
                equalTo: "Password mismatched",
                minlength: "Your password must be at least 5 characters long"
            },
            email: {
                email: "Please enter a valid email address",
                emailAvailable: "This email has been used. Please provide another email"
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            form.submit();
        }
    });
    $("form[name='signin']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            password: {
                required: true
            }
        },
        // Specify validation error messages
        messages: {
            password: {
                required: "Please provide a password"
            },
            email: {
                email: "Please enter a valid email address"
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function (form) {
            form.submit();
        }
    });
    $('#email').on('blur', function () {
        CheckEmail($('#email').val())
    });
});

CheckEmail = function (email) {
    $.post('signup/validation', {email: email}, function (data) {
        console.log($.isEmptyObject(data));
        return $.isEmptyObject(data)
    }, 'JSON');
};

/**
 * Created by USER on 4/22/2017.
 */
