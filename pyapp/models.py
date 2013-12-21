import random
from markdown import markdown
from sqlalchemy import sql
from pyapp import db, utils
# from flask.ext.scrypt import generate_random_salt, generate_password_hash, check_password_hash
from flask.ext import scrypt

""" Post-Tag many-to-many join table """
post_tag = db.Table('post_tag', db.Model.metadata,
    db.Column('post_id', db.Integer, db.ForeignKey('post.id')),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'))
)


class Post(db.Model):
    """ Post class """
    id = db.Column(db.Integer, primary_key=True)
    # author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    title = db.Column(db.String(255), nullable=False)
    subtitle = db.Column(db.String(255))
    slug = db.Column(db.String(255), nullable=False, unique=True)
    teaser = db.Column(db.String(511))
    hero_img = db.Column(db.String(255), default="default.jpg")
    markdown = db.Column(db.Text)
    html = db.Column(db.Text)
    create_date = db.Column(db.TIMESTAMP, default=sql.functions.current_timestamp())

    def set_html(self):
        self.html = markdown(self.markdown)

    @property
    def serialized(self):
        """Return object data as a dict"""
        return {
            'id': self.id,
            'title': self.title,
            'subtitle': self.subtitle,
            'slug': self.slug,
            'uri': '/posts/%s' % self.slug,
            'teaser': self.teaser,
            'hero_img': self.hero_img,
            'markdown': self.markdown,
            'html': self.html,
            'create_date': self.create_date.isoformat(),
            'tags': [tag.name for tag in self.tags]
        }

    @staticmethod
    def get_recent(num_posts=1, random_post=False):
        base_query = Post.query.order_by(sql.expression.desc(Post.create_date))
        recent_posts = base_query.limit(num_posts).all()
        return (random.choice(recent_posts) if random_post else recent_posts)

    def __init__(self,
                title,
                markdown_content='',
                category=None):
        self.title = title
        self.slug = utils.make_slug(title)
        self.markdown = markdown_content
        self.set_html()
        self.categpry = category


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), default='')
    posts = db.relationship('Post', secondary=post_tag, backref='tags')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '{}'.format(self.name)


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)

    def __init__(self, name):
        self.name = name


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    salt = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    create_date = db.Column(
        db.TIMESTAMP,
        default=sql.functions.current_timestamp()
    )
    posts = db.relationship('Post', backref='author')
    active = db.Column(db.Boolean(), default=True, nullable=False)
    is_admin = db.Column(db.Boolean(), default=False, nullable=False)

    def is_authenticated(self):
        return True

    def is_active(self):
        return self.active

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)

    def check_password(self, raw_pw):
        return scrypt.check_password_hash(raw_pw,
                                          self.password_hash,
                                          self.salt)

    def set_password(self, raw_pw):
        self.password_hash = scrypt.generate_password_hash(raw_pw, self.salt)

    @staticmethod
    def username_exists(username):
        return db.session.query(
            sql.exists().where(User.username == username)
        ).scalar()

    def __init__(self, username, raw_pw, first_name='', last_name=''):
        self.salt = scrypt.generate_password_salt() #: You can also provide the byte length to return: salt = generate_password_salt(32)
        self.username = username
        self.set_password(raw_pw)
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return '<User %s>' % self.username
