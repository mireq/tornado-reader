(function(_){

var contentElement = _.id('content');
var loginForm = _.elemAppend(contentElement, 'FORM', {'class': 'panel login'});
var signupForm = _.elemAppend(contentElement, 'FORM', {'class': 'panel signup'});
var formrow;

_.elemAppend(loginForm, 'H2', undefined, 'Log In');
_.elemAppend(signupForm, 'H2', undefined, 'Sign Up');

formrow = _.elemAppend(loginForm, 'DIV', {'class': 'formrow'});
_.elemAppend(loginForm, 'LABEL', {'for': 'id_email'}, 'E-mail');
_.elemAppend(loginForm, 'INPUT', {'id': 'id_email', 'type': 'text', 'name': 'email'});

formrow = _.elemAppend(loginForm, 'DIV', {'class': 'formrow'});
_.elemAppend(loginForm, 'LABEL', {'for': 'id_password'}, 'Password');
_.elemAppend(loginForm, 'INPUT', {'id': 'id_password', 'type': 'password', 'name': 'password'});

formrow = _.elemAppend(loginForm, 'DIV', {'class': 'formrow submit'});
_.elemAppend(loginForm, 'BUTTON', {'type': 'submit'}, 'Log in');


formrow = _.elemAppend(signupForm, 'DIV', {'class': 'formrow'});
_.elemAppend(signupForm, 'LABEL', {'for': 'id_signup_email'}, 'E-mail');
_.elemAppend(signupForm, 'INPUT', {'id': 'id_signup_email', 'type': 'text', 'name': 'email'});

formrow = _.elemAppend(signupForm, 'DIV', {'class': 'formrow'});
_.elemAppend(signupForm, 'LABEL', {'for': 'id_signup_password'}, 'Password');
_.elemAppend(signupForm, 'INPUT', {'id': 'id_signup_password', 'type': 'password', 'name': 'password'});

formrow = _.elemAppend(signupForm, 'DIV', {'class': 'formrow'});
_.elemAppend(signupForm, 'LABEL', {'for': 'id_signup_password2'}, 'Password confirm');
_.elemAppend(signupForm, 'INPUT', {'id': 'id_signup_password2', 'type': 'password', 'name': 'password2'});

formrow = _.elemAppend(signupForm, 'DIV', {'class': 'formrow submit'});
_.elemAppend(signupForm, 'BUTTON', {'type': 'submit'}, 'Sign up');


_.bindEvent(signupForm, 'submit', function(e) {
	e.preventDefault();
	var formData = _.dict(_.serializeForm(signupForm));
	console.log(formData);
});


})(_utils);
