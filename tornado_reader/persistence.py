# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from persistent import Persistent


class User(Persistent):
	def __init__(self, email):
		super(User, self).__init__()
		self.email = email

	def set_password(self, password):
		self.password = password

	def check_password(self, password):
		return self.password == password
