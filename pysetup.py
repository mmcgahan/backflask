#!/usr/bin/env python

from pyapp.models import User, Category, Post
from pyapp import db

def reset_db():
    if (raw_input('Delete database? (y/n) ') == 'y'):
        db.drop_all()
        db.create_all()
    return True

def create_admin(username='Admin', password='password'):
    admin_user = User(username=username, raw_pw=password)
    db.session.add(admin_user)
    db.session.commit()
    print('{} : {}'.format(username, admin_user.id))
    return


def create_category(category_name):
    new_category = Category(category_name)
    db.session.add(new_category)
    db.session.commit()
    print('{} : {}'.format(new_category.name, new_category.id))
    return

def create_post(title='Example post'):
    new_post = Post(title)
    db.session.add(new_post)
    db.session.commit()
    print('{} : {}'.format(new_post.title, new_post.id))
    return


if __name__ == '__main__':
    if reset_db():
        create_admin()
        create_category('Programming')
        create_post()
