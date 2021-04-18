import data
from comments import*
from login_system import*

data.clear()

@pytest.fixture
def users():
    flockr.clear()
    'creates two users'
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
    assert comments_add()


'''
Testing for comments_remove
'''
def test_comments_remove(users):
    pass

'''
Testing for comments_get
'''
def test_comments_get(users):
    pass