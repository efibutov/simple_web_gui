class IPCMessage(object):
    def __init__(self, method, params=None):
        self.method = method
        self.params = params

    def to_dict(self):
        return {
            'method': self.method,
            'params': self.params
        }


def send_ipc_message(queue, method, params=None):
    queue.put(
        IPCMessage(
            method=method,
            params=params
        )
    )
