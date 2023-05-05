from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stars = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String(300))

    chapter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chapters.id')))
    chapter = db.relationship('Chapter', back_populates="reviews")

    def to_dict(self):
        return {
            'stars': self.stars
        }
