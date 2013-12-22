import string
from datetime import datetime
from flask import url_for
from flask.ext.xmlrpc import XMLRPCHandler, Fault
from . import app, db
from .models import User, Post, Tag, Category

# MetaWeblogAPI XML-RPC
handler = XMLRPCHandler('xmlapi')
handler.connect(app, '/xmlapi')
metaweblog = handler.namespace('metaWeblog')
blogger = handler.namespace('blogger')
wordpress = handler.namespace('wp')
moveabletype = handler.namespace('mt')

def authenticate(username, password):
    user = User.is_authentic(username, password)
    if not user:
        raise Fault("invalid_user",
                    "Invalid username/password, please try again.")
    return user

def xmlpost(post):
    return {
        'title': post.title,
        'link': 'http://127.0.0.1/post/' + post.slug,
        'description': post.content['raw'],
        'postid': post.id,
        'mt_excerpt': post.teaser,
        'mt_tags': ','.join([tag.name for tag in post.tags]),
        'dateCreated': post.create_date,
        'wp_slug': post.slug,
        'custom_fields': [{
            'key': 'subtitle',
            'value': post.subtitle
        }, {
            'key': 'hero_img',
            'value': post.hero_img
        }]
    }

def xmlcategory(category):
    return {
        'categoryId': category.id,
        'categoryName': category.name
    }

@metaweblog.register
def newPost(blog_id, username, password, content, publish):
    user = authenticate(username, password)
    create_date = None
    if content.get('dateCreated'):
        create_date = datetime.strptime(str(content.get('dateCreated')),
                                        "%Y%m%dT%H:%M:%SZ")
    post = Post(title=content['title'],
                raw_content=content['description'],
                status=content['post_status'],
                author=user,
                teaser=content.get('mt_excerpt'),
                slug=content.get('wp_slug'),
                create_date=create_date,
                tag_names=string.split(content['mt_tags'], ','))

    for custom_field in content.get('custom_fields', []):
        if custom_field['key'] == 'subtitle':
            post.subtitle = custom_field['value']
        elif custom_field['key'] == 'hero_img':
            post.hero_img = custom_field['value']

    db.session.add(post)
    db.session.commit()
    return post.id


@metaweblog.register
def editPost(post_id, username, password, content, publish):
    authenticate(username, password)
    post = Post.query.get(post_id)
    post.title = content['title']
    post.content = content['description']
    post.teaser = content['mt_excerpt']
    post.status = content['post_status']
    post.tag_names = string.split(content['mt_tags'], ',')
    post.slug = content.get('wp_slug')
    create_date = content.get('dateCreated')
    if create_date:
        post.create_date = datetime.strptime(str(create_date),
                                        "%Y%m%dT%H:%M:%SZ")

    db.session.add(post)
    db.session.commit()
    return True


@metaweblog.register
def getPost(post_id, username, password):
    authenticate(username, password)
    post = Post.query.filter(Post.id == post_id).first()
    if not post:
        raise Fault("not_found", "Post not found.")

    return xmlpost(post)


@metaweblog.register
def getRecentPosts(blogid, username, password, numberOfPosts):
    authenticate(username, password)
    posts = Post.query.order_by('create_date').all()
    return [xmlpost(post) for post in posts]


@metaweblog.register
def newMediaObject(blogid, username, password, mediaobject):
    authenticate(username, password)
    filename = mediaobject['name']
    # b64_data = mediaobject['bits']
    # TODO: figure how to write b64_data to a file
    url = (url_for('static', filename='images/articles/' + filename))
    return {'url': url}


@wordpress.register
def getPages(blogid, username, password, numberOfPages):
    authenticate(username, password)
    return []


@wordpress.register
def newCategory(blogid, username, password, category):
    authenticate(username, password)
    # category = Category.query.filter(Category.name == category['name']).first()
    # if category is None:
    category = Category(category['name'])
    db.session.add(category)
    db.session.commit()
    return category.id


@wordpress.register
def getTags(blogid, username, password):
    return [{ 'tag_id': tag.id, 'name': tag.name } for tag in Tag.query.all()]


@wordpress.register
def getCategories(blogid, username, password):
    return [xmlcategory(category) for category in Category.query.all()]


@moveabletype.register
def setPostCategories(post_id, username, password, categories):
    post = Post.query.get(post_id)
    # built to set multiple categories - we will only set one
    post.category = Category.query.filter(
        Category.name == categories[0]['categoryName']
    ).first()
    db.session.add(post)
    db.session.commit()
    return True


@moveabletype.register
def getPostCategories(post_id, username, password):
    category = Post.query.get(post_id).category
    return [xmlcategory(category)] if category else []


@moveabletype.register
def supportedTextFilters():
    return []


@blogger.register
def deletePost(appkey, post_id, username, password, publish):
    authenticate(username, password)
    post = Post.query.get(int(post_id))
    db.session.delete(post)
    db.session.commit()
    pass
