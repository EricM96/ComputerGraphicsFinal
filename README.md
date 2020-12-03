# Let's Learn WebGL
An interactive tutorial website for learning WebGL.
# Deploy
## MacOS/Linux
1. Setup the environment: `source .env.example`
2. Install dependencies: `pip install -r requirements.txt`
3. Setup the database
    1. Install postgres
    2. Create database:
    ```sql
    $ psql
    # create database tutorials_dev;
    CREATE DATABASE
    #\q
    ```
    3. Migrate database: `python manage.py db upgrade`
4. Run the server: `python manage.py runserver`

## Windows
1. Setup the database
    1. Install postgres
    2. Create a postgres account for your Windows user account.
    3. Create database:
    ```sql
    $ psql
    # create database tutorials_dev;
    CREATE DATABASE
    #\q
    ```
2. Setup the environment
    1. Edit the file `./.env.example.ps1`
    2. Change the database URL in line 2. It should be in the format `$ENV:DATABASE_URL="postgresql://<user>:<password>@localhost:5432/tutorials_dev"`
    3.  `./.env.example.ps1`
3. Install dependencies: `pip install -r requirements.txt`
4. Migrate database: `python manage.py db upgrade`
5. Run the server: `python manage.py runserver`
