import data
from error import AccessError, InputError

'''
Helper function
'''
def find_user_by_id(u_id):
    return data.user[u_id]['user']

# TESTING: def comment_add(u_id, sessionKey, cocktail, message):
def comment_add(u_id, cocktail, message, time):
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
    
    """
    comment_index = len(data.comments)
    
    # create a new entry for comment
    data.comments.append({})
    data.comments[comment_index]['drink'] = cocktail
    data.comments[comment_index]['comment_id'] = comment_index
    data.comments[comment_index]['message'] = message
    data.comments[comment_index]['u_id'] = u_id
    data.comments[comment_index]['ldTime'] = time

    return {
        'comment_id': comment_index,
    }

def comment_remove(u_id, sessionKey, comment_id):
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

def comment_get(cocktail):
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
    for cmt in data.comments:
        if cmt['drink'] == cocktail and cmt['message'] != '':
            msgs.append({})
            msgs[-1].ldTime = cmt['time']
            msgs[-1].username = find_user_by_id(cmt['u_id'])
            msgs[-1].message = cmt['message']

    return {
        'messages': msgs,
    }