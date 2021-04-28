'''
Test cases for database
'''
import unittest
from unittest.mock import patch
import json
from app import get_profile_from_db

KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'



class GetProfileTest(unittest.TestCase):
    '''
    Test case for the function get_profile_from_db
    '''
    def setUp(self):
        '''
        Setup for the test case
        '''
        self.success_test_params = [{
            KEY_INPUT: 'doesntexist@email',
            KEY_EXPECTED: {
                'error': True
            }
        }, {
            KEY_INPUT: 'improperly.formatted@email',
            KEY_EXPECTED: {
                'error': True
            },
        }, {
            KEY_INPUT: 'exists@email',
            KEY_EXPECTED: {
                'error': False,
                'email': 'exists@email',
                'oath_name': 'it exists',
                'nickname': 'exists',
                'age': 21,
                'gender': 'Non-Binary',
                'bio': '',
                'image_url': '',
            }
        }]

        self.initial_db_mock = {
            'exists@email': {
                'error': False,
                'email': 'exists@email',
                'oath_name': 'it exists',
                'nickname': 'exists',
                'age': 21,
                'gender': 'Non-Binary',
                'bio': '',
                'image_url': '',
            }
        }

    def mock_out_query(self, email):
        '''
        Return None if no user exists, else the user
        '''
        if email in self.initial_db_mock:
            return self.initial_db_mock[email]
        else:
            return None

    def mock_db_get_user_attributes(self, user):
        '''
        Return user
        '''
        return user

    def test_success(self):
        '''
        Mock and run test cases for get_profile_from_db
        '''
        print('Test cases for get_profile_from_db')
        for test_param in self.success_test_params:
            with patch('app.mock_out_query', self.mock_out_query):
                with patch('app.get_db_user_attributes',
                           self.mock_db_get_user_attributes):

                    actual_result = get_profile_from_db(test_param[KEY_INPUT])
                    expected_result = test_param[KEY_EXPECTED]
                    self.assertEqual(len(actual_result), len(expected_result))
                    self.assertEqual(actual_result['error'],
                                     expected_result['error'])
                    self.assertDictEqual(actual_result, expected_result)


if __name__ == '__main__':
    unittest.main()
