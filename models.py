'''
Database models
'''
import enum
from database import db

class UserProfile(db.Model):
    '''
    Table for user profile
    '''
    __tablename__ = 'userprofile'
    
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True)
    oath_name = db.Column(db.String(100))
    nickname = db.Column(db.String(50))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(15))
    bio = db.Column(db.String(2048))
    image_url = db.Column(db.String(200))
    # message_ids = db.relationship('Conversations')
    match_status_child = db.relationship('MatchStatusTable', uselist=False)
    
    def __repr__(self):
        return '<UserProfile for {}>'.format(self.email)



class StatusEnum(enum.Enum):
    '''
    Enumeration of the different statuses a person can have
    '''
    needs_profile = 1
    waiting_for_match = 2
    is_matched = 3


class MatchStatusTable(db.Model):
    '''
    Table that identifies people's current match status
    '''
    __tablename__ = 'matchstatustable'
    
    match_id = db.Column(db.Integer, primary_key=True)
    
    user_email = db.Column(db.String(50), db.ForeignKey('userprofile.email'))
    user_match_status = db.Column(db.Enum(StatusEnum))
    matched_person = db.Column(db.String(50))
    email_parent = db.relationship('UserProfile', foreign_keys = [user_email])


'''
class Conversations(db.Model):
    __tablename__ = 'conversations'
    
    message_id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('profile.uid'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('profile.uid'), nullable=False)
    message = db.Column(db.String(2048))
'''