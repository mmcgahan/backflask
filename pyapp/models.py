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
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    category = db.relationship('Category',
                               backref=db.backref('posts', lazy='dynamic'))
    title = db.Column(db.String(255), nullable=False)
    subtitle = db.Column(db.String(255))
    _status = db.Column(db.Integer, default=1)
    teaser = db.Column(db.String(511))
    hero_img = db.Column(db.String(255))
    _raw_content = db.Column(db.Text)
    _html_content = db.Column(db.Text)
    slug = db.Column(db.String(255), nullable=False, unique=True)
    create_date = db.Column(db.TIMESTAMP, default=sql.functions.current_timestamp())

    STATUS = {
        'draft': 0,
        'publish': 1,
        'private': 2,
        'pending': 3,
        3: 'pending',
        2: 'private',
        1: 'publish',
        0: 'draft'
    }

    # content is 2-part: raw + HTML
    @property
    def content(self):
        return {
            'raw': self._raw_content,
            'html': self._html_content
        }
    @content.setter
    def content(self, raw_content):
        self._raw_content = raw_content
        self._html_content = markdown(raw_content)
        return

    # status is stored as an integer, reported as a string
    @property
    def status(self):
        return self.STATUS[self._status]
    @status.setter
    def status(self, status_code):
        self._status = self.STATUS[status_code]
        return

    @property
    def tag_names(self):
        return [tag.name for tag in self.tags]
    @tag_names.setter
    def tag_names(self, tag_names):
        tags = []
        for tag_name in tag_names:
            tag = Tag.query.filter(Tag.name == tag_name).first()
            if tag is None:
                tag = Tag(tag_name)
                db.session.add(tag)
                db.session.commit()
            tags.append(tag)
        self.tags = tags
        return

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
            'content': self.content,
            'create_date': self.create_date.isoformat(),
            'tags': self.tag_names
        }

    @staticmethod
    def get_recent(num_posts=1, random_post=False):
        base_query = Post.query.order_by(sql.expression.desc(Post.create_date))
        recent_posts = base_query.limit(num_posts).all()
        return (random.choice(recent_posts) if random_post else recent_posts)

    def __init__(self,
                title,
                subtitle=None,
                status='publish',
                teaser=None,
                hero_img=None,
                raw_content='',
                category=None,
                author=None,
                slug=None,
                tag_names=[],
                create_date=None):
        self.title = title
        self.subtitle = subtitle
        self.status = status
        self.category = category
        self.content = raw_content
        self.author = author
        self.teaser = teaser
        self.tag_names = tag_names
        if create_date is not None:
            self.create_date = create_date

        self.slug = slug or utils.make_slug(title)


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

    @staticmethod
    def is_authentic(username, password):
        user = db.session.query(User).filter(User.username == username).first()
        return user is not None and user.check_password(password)


    def __init__(self, username, raw_pw, first_name='', last_name=''):
        self.salt = scrypt.generate_random_salt() #: You can also provide the byte length to return: salt = generate_password_salt(32)
        self.username = username
        self.set_password(raw_pw)
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return '<User %s>' % self.username
