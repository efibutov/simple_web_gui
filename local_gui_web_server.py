"""
Local GUI light webserver
Handle client websocket connection for real-time GUI update (Backend disconnect etc.)
"""
import json
import os
import uuid
from bottle import request, Bottle, abort, template, static_file, response
from gevent.pywsgi import WSGIServer
from geventwebsocket import WebSocketError
from geventwebsocket.handler import WebSocketHandler
from threading import Thread
from utils import send_ipc_message
from multiprocessing import Process, Queue


def run_web_server(receiver, transmitter):
    app = Bottle()
    root_path = os.path.dirname(__file__)

    @app.route('/websocket')
    def handle_websocket():
        poison_pill = uuid.uuid4()
        wsock = request.environ.get('wsgi.websocket')

        if not wsock:
            abort(400, 'Expected WebSocket request.')

        def listen_to_daemon(ws):
            while True:
                msg = receiver.get()

                if msg == poison_pill:
                    break

                try:
                    msg_json = json.dumps(msg)
                    print('SENDING TO LOCAL GUI:{}'.format(msg_json))
                except Exception as e:
                    print('Cannot jsonify a message {} to local gui ({})'.format(msg, e))
                else:
                    ws.send(msg_json)

        daemon_listener = Thread(target=listen_to_daemon, args=(wsock,))
        daemon_listener.start()
        send_ipc_message(queue=transmitter, method='refresh_gui', params=None)

        while True:
            try:
                method = wsock.receive()

                if method:
                    print('Local GUI sent this shit: {}'.format(method))
                    send_ipc_message(queue=transmitter, method=method, params=None)
            except WebSocketError:
                receiver.put(poison_pill)
                break

        daemon_listener.join()

    @app.route('/')
    def index():
        return template(os.path.join(root_path, 'views/home.html'))

    @app.get('/config')
    def get_config():
        response.content_type = 'application/json'
        send_ipc_message(transmitter, 'refresh_gui')
        return {}

    @app.post('/config')
    def post_config():
        try:
            new_config = json.loads(request.json)
        except Exception as e:
            logger.exception('Bad incoming data: {} ({})'.format(request.forms.keys(), e))
        else:
            send_ipc_message(transmitter, 'update_local_config', new_config)
        finally:
            return {}

    @app.route('/static/<filepath:path>')
    def server_static(filepath):
        return static_file(filepath, root=os.path.join(root_path, 'static'))

    ip = '127.0.0.1'
    port = 8080
    print('Running local GUI webserver on http://{}:{}/'.format(ip, port))
    server = WSGIServer((ip, port), app, handler_class=WebSocketHandler)
    Process(target=server.serve_forever).start()


def main():
    sending_queue, receiving_queue = Queue(), Queue()
    p = Process(target=run_web_server, args=(sending_queue, receiving_queue))
    p.start()


if __name__ == '__main__':
    main()
