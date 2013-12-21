from .models import User, Category, Post
from . import db

def reset_db():
    if (raw_input('Delete database? (y/n) ') == 'y'):
        db.drop_all()
        db.create_all()
    return True

def create_admin(username='Admin', password='password'):
    admin_user = User(username=username, raw_pw=password)
    db.session.add(admin_user)
    result = db.session.commit()
    return result


def create_category():
    db.session.add(Category('Programming'))
    result = db.session.commit()
    return result

def create_post(title='Example post'):
    db.session.add(Post(title))
    result = db.session.commit()
    return result
