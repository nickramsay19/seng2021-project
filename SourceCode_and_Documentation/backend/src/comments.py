import data
from error import AccessError, InputError

'''
Helper function
'''
def find_user_by_id(u_id):
    return data.users[u_id]['user']

# TESTING: def comment_add(u_id, sessionKey, cocktail, message):
# ASSUMPTION: cocktail is always one of the included cocktails called by the API
#             time is always a string with the format 'DD/MM/YYYY, HH:MM:SS'
def comments_add(u_id, cocktail, message, time):
    """
    Given a u_id, sessionKey, cocktail and message, add the information
    about this comment to the database

    Parameters
    ----------
    u_id :: int
    sessionKey :: int
    cocktail :: str
    message :: str

    Returns
    -------
    Dict
        'comment_id' :: int
    
    Raises
    ------
    AccessError
        Invalid u_id or not logged in
    InputError
        Empty or long message ( > 1000 char)
    """
    if u_id > len(data.users):
        raise AccessError()
    elif len(message) <= 0 or len(message) > 1000:
        raise InputError

    comment_index = len(data.comments)
    
    # create a new entry for comment
    data.comments.append({})
    data.comments[comment_index]['drink'] = cocktail
    data.comments[comment_index]['comment_id'] = comment_index
    data.comments[comment_index]['message'] = message
    # data.comments[comment_index]['u_id'] = u_id
    data.comments[comment_index]['u_id'] = u_id
    data.comments[comment_index]['ldTime'] = time

    return {
        'comment_id': comment_index,
    }

# TESTING: def comments_remove(u_id, sessionKey, comment_id):
def comments_remove(u_id, comment_id):
    """
    Given a u_id, sessionKey, comment_id, remove the information
    about this comment from the database

    Parameters
    ----------
    u_id :: int
    sessionKey :: int
    comment_id :: int

    Returns
    -------
    Dict
    
    Raises
    ------
    AccessError
        People other than the user wants to remove the comment
    """
    if data.comments[comment_id]['u_id'] != u_id:
        raise AccessError

    data.comments[comment_id]['message'] = ''

    return {}

def comments_get(cocktail):
    """
    Given a cocktail, display the comments
    of this cocktail from the database

    Parameters
    ----------
    cocktail :: str

    Returns
    -------
    Dict
        'messages': list

    """
    msgs = []
    for cmt in reversed(data.comments):
        if cmt['drink'] == cocktail and cmt['message'] != '':
            msgs.append({})
            msgs[-1]['cmt_id'] = cmt['drink'] + str(cmt['comment_id'])
            msgs[-1]['ldTime'] = cmt['ldTime']
            msgs[-1]['username'] = find_user_by_id(cmt['u_id'])
            msgs[-1]['message'] = cmt['message']
            msgs[-1]['u_id'] = cmt['u_id']
            msgs[-1]['comment_id'] = cmt['comment_id']
    
    return {
        'messages': msgs,
    }