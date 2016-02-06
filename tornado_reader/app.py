# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import base64
import os
import uuid

import ZODB, ZODB.FileStorage
import tornado.ioloop
import tornado.options
import tornado.web
from tornado.options import define, options
from tornado.web import url

import handlers


define('port', default=8100, type=int)


class Application(tornado.web.Application):
	def __init__(self, **overrides):
		url_handlers = [
			url(r'/', handlers.HomeHandler, name='home'),
		]

		settings = {
			'static_path': os.path.join(os.path.dirname(__file__), 'static'),
			'template_path': os.path.join(os.path.dirname(__file__), 'templates'),
			'db_path': os.path.join(os.path.dirname(__file__), 'database.fs'),
			'cookie_secret':    base64.b64encode(uuid.uuid4().bytes + uuid.uuid4().bytes),
			'debug': True,
		}

		tornado.web.Application.__init__(self, url_handlers, **settings)
		self.open_db()

	def open_db(self):
		storage = ZODB.FileStorage.FileStorage(self.settings['db_path'])
		db = ZODB.DB(storage)
		connection = db.open()
		self.db = connection.root


def main():
	tornado.options.parse_command_line()
	app = Application()
	app.listen(options.port)
	tornado.ioloop.IOLoop.instance().start()


if __name__ == '__main__':
	main()
