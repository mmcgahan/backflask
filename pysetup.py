#!/usr/bin/env python

from pyapp.models import User, Category, Post
from pyapp import db

def reset_db():
    if (raw_input('Initialize database? (y/n) ') == 'y'):
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
    new_post = Post(title=title,
                subtitle='Subtitle',
                status='publish',
                teaser='This is the teaser',
                raw_content="""
Post title should be h1

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto,
mollitia, sunt quibusdam iusto iste animi quidem maiores fugiat atque unde
veniam libero repudiandae odit possimus est ab voluptates hic porro?

## Heading 2

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, modi fugit
doloremque odio perferendis quas eligendi saepe obcaecati nulla est dolores
iste in reiciendis voluptates magni vel quam inventore nisi!

- Item 1
- Item 2
- Item 3

### Heading 3

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, voluptatem,
magnam maiores aperiam perferendis esse iste deserunt dolore inventore
blanditiis laudantium officia suscipit soluta distinctio unde cupiditate earum
veritatis eum.

> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, nostrum
dolores assumenda tempore atque totam placeat autem blanditiis nemo debitis
ab sunt neque quae odit natus eaque explicabo. Quod, illo.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, ad, et, omnis
quasi sunt ab dignissimos pariatur perferendis ipsum voluptate ipsa ex
accusamus culpa maiores ratione veritatis blanditiis minus reprehenderit?
""",)

    db.session.add(new_post)
    db.session.commit()
    print('{} : {}'.format(new_post.title, new_post.id))
    return


if __name__ == '__main__':
    if reset_db():
        create_admin()
        create_category('Programming')
        create_post()
