from flask import Flask

from app.db import db
from app.internal.constants import DATABASE_URL
from app.internal.helpers.client_errors import method_not_allowed, not_found
from app.middlewares import Middleware, cors, process_time
from app.routes import common, user, post, uploads

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

app.url_map.strict_slashes = False


# reset_timeout = Timeout(IDLE_TIMEOUT, exit_server)
with app.app_context():
    db.create_all()


app.register_blueprint(common.router)
app.register_blueprint(user.router)
app.register_blueprint(post.router)
app.register_blueprint(uploads.router)

app.register_error_handler(404, not_found)
app.register_error_handler(405, method_not_allowed)

m = Middleware(app)
m.add_middleware(process_time.middleware)
m.add_middleware(cors.middleware)
