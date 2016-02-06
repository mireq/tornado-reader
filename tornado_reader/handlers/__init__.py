# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from tornado.web import asynchronous, RequestHandler, Application


class BaseHandler(RequestHandler):
	def get_current_user(self):
		user_json = self.get_secure_cookie('user')
		if user_json:
			return tornado.escape.json_decode(user_json)
		else:
			return None


class HomeHandler(BaseHandler):
	def get(self):
		if self.get_current_user() is None:
			return self.render('login.html')
		else:
			return self.render('home.html')
