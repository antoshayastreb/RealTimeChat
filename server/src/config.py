from logging import DEBUG
import os
import uuid
import configparser

basedir = os.path.abspath(os.path.dirname(__file__))
config_path= os.path.join(basedir, 'serverconfig.ini')

configfile = configparser.ConfigParser()

class Config(object):
    # ...
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = False

    configfile.read(config_path)
    
    sections = configfile.sections()
    for section in configfile.sections():
        try:
            DEBUG = configfile[section]["debug"]
        except (configparser.ParsingError, KeyError) as p:
            continue 