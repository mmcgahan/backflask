class Config(object):
    # Show all debug info on server error
    DEBUG = True

    # SQLAlchemy config - change to suit
    SQLALCHEMY_DATABASE_URI = 'postgresql://mike@localhost:5432/backflask'

    # CSRF_ENABLED = True  # used in WTForms
