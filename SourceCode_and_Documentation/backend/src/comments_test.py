import pytest
import data
from error import*
from comments import*
from login_system import*

data.clear()

@pytest.fixture
def users():
    return [
        user_register('user1', 'password1'),
        user_register('user2', 'password2'),
        user_register('user3', 'password3'),
        user_register('user4', 'password4')
    ]

'''
Testing for comments_add
'''
def test_comments_add(users):
    assert user_login('user1', 'password1') == True
    assert user_login('user3', 'password3') == True

    # error catching tests
    with pytest.raises(AccessError):
        comments_add(
            10,
            'Margarita',
            'good',
            '19/04/2021, 05:34:57'
        )
    with pytest.raises(InputError):
        comments_add(
            1,
            'Margarita',
            '',
            '19/04/2021, 05:34:57'
        )

    # basic tests for comments_add
    assert comments_add(
        1,
        'Margarita',
        'good',
        '19/04/2021, 05:34:57'
    )['comment_id'] == 0
    assert comments_add(
        2,
        'Margarita',
        'good',
        '19/04/2021, 05:34:57'
    )['comment_id'] == 1

'''
Testing for comments_remove
'''
def test_comments_remove(users):
    # basic tests for comments_remove
    comments_remove(1, 0)
    assert len(data.comments) == 2
    assert data.comments[0]['message'] == ''

'''
Testing for comments_get
'''
def test_comments_get(users):
    # basic tests for comments_get
    assert comments_get('Margarita') == {
        'messages': [
            {
                'cmt_id': 'Margarita1',
                'ldTime': '19/04/2021, 05:34:57',
                'username': 'user2',
                'message': 'good'
            }
        ]
    }

data.clear()