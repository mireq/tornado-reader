# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from tornado.web import asynchronous, RequestHandler, Application
from persistence import User
import json


class BaseHandler(RequestHandler):
	def get_current_user(self):
		user_json = self.get_secure_cookie('user')
		if user_json:
			return tornado.escape.json_decode(user_json)
		else:
			return None

	def write_ajax_error(self, message=None):
		self.set_header('Content-Type', 'application/json')
		data = {'status': 'error'}
		if message is not None:
			data['message'] = message
		self.write(json.dumps(data))


class HomeHandler(BaseHandler):
	def get(self):
		if self.get_current_user() is None:
			return self.render('login.html')
		else:
			return self.render('home.html')


class SignupHandler(BaseHandler):
	def post(self):
		email = self.get_argument('email', '')
		password = self.get_argument('password', '')
		password2 = self.get_argument('password2', '')
		print(email, password, password2)
