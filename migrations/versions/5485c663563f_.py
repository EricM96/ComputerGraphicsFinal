"""empty message

Revision ID: 5485c663563f
Revises: 
Create Date: 2020-11-15 16:26:27.561063

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5485c663563f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tutorials',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('tutorial_file', sa.String(), nullable=False),
    sa.Column('starter_file', sa.String(), nullable=False),
    sa.Column('solution_file', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('solution_file'),
    sa.UniqueConstraint('starter_file'),
    sa.UniqueConstraint('tutorial_file')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tutorials')
    # ### end Alembic commands ###
