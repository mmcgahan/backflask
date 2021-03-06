Python on the backend, JS+SCSS on the front. Fully responsive, mobile-first blog-oriented framework.

# Goals

1. Lean

    Code weight and complexity must be as small as possible. Code stats will be tracked for every release. Code size increases must be justified.

2. Mobile-first

    Everything will be designed starting from mobile. Desktop support is secondary, and must have minimal impact on the weight of pages delivered to mobile. This means lazy-loading advanced features and images. If the code is light enough, the augmentation should be seamless on the desktop.

3. Open

    Dev process and code will be opinionated but open. The project will be self-documenting, as the resulting site gets deployed at [mmcgahan.github.io/backflask](http://mmcgahan.github.io/backflask/). It will specify dependencies and make the barrier to entry as small as possible.

# Usage

1. Install Python packages with `pip`.

    ```sh
    $ pip install -r requirements.txt
    ```

    You might get an error here if you don't have PostgreSQL installed, because the requirements file will try to install a PostgreSQL Python driver. You can use Homebrew on Mac, or install [Postgres.app](http://postgresapp.com/) and make sure `pg_config` is in your `$PATH`.

2. Edit the app config file

    In your `instance/` directory, create a `config.py` file that declares the following variables:

    - `SQLALCHEMY_DATABASE_URI` (e.g. postgresql://user@localhost:5432/backflask)
    - `SECRET_KEY` (a random string that is used for connections with the XML-RPC API)

3. Create and initialize the DB
    
    For local development, just set up a simple SQL database in the flavor of your choice - Backflask uses SQLAlchemy to manage the DB, so as long as your `SQLALCHEMY_DATABASE_URI` config variable is set correctly, it will connect to any existing DB.

    In SQL:
    ```sql
    CREATE DATABASE backflask;
    ```

    I recommend using [Postgres.app](http://postgresapp.com/) on Mac to get PostgreSQL up and running. Once installed, run `psql` from the command line to open a SQL prompt.

    Then run `pysetup.py` to create an Admin user, an example Category, and an example Post.

4. `npm install` (loades package.json dependencies, including Grunt)

5. `grunt`
    - load bower packages (not ready)
    - build scripts + stylesheets (dev, uncompressed)

5. `grunt watch`
    - flask dev server
    - watch for python changes (and script+style+template), livereload

6. `grunt build` (not ready)
    - build for production
        - precompile handlebar templates
        - concat and uglify
        - figure out how to load different scripts in templates for production

7. `grunt release` (not ready)
    - git flow create release, push

# Components:

## Back end

1. Flask
    - Base template generation (Jinja2)
    - JSON API
    - Authentication for remote editing
    - SQLAlchemy
    - scrypt
2. PostgreSQL

## Front end

1. Backbone.js
2. Lodash
3. Handlebars
4. Foundation
5. Browserify (or Require.js?)

## Dev tools

1. Grunt
    - watch
    - connect
    - uglify
    - livereload
2. Bower
3. SASS + Compass + libsass
