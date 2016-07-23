# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import tornado.httpserver
import tornado.ioloop
import tornado.web
import tornado.wsgi
from tornado.netutil import bind_unix_socket
from tornado.options import define, options

import web.wsgi


define('base_port', type=int, default=8000)
define('debug', type=bool, default=False)
define('unix_socket', default=None)


def main():
	server_port = int(options.base_port)
	print("Starting server 0.0.0.0:%d" % server_port)

	wsgi_app = tornado.wsgi.WSGIContainer(web.wsgi.application)
	app = tornado.web.Application(
		[('.*', tornado.web.FallbackHandler, dict(fallback=wsgi_app)),],
		debug=options.debug
	)
	if options.unix_socket:
		server = tornado.httpserver.HTTPServer(app)
		socket = bind_unix_socket(options.unix_socket)
		server.add_socket(socket)
	else:
		app.listen(server_port)
	tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
	main()
