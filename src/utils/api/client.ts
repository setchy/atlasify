import type { AxiosPromise } from 'axios';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import type { Account, SettingsState } from '../../types';
import { Constants } from '../constants';
import { apiRequestAuth } from './request';
import type {
  GraphQLResponse,
  MyNotifications,
  MyUserDetails,
  NotificationsExtensions,
} from './types';

/**
 * Get the authenticated user
 *
 * Endpoint documentation: https://developer.atlassian.com/platform/atlassian-graphql-api/graphql
 */
export function getAuthenticatedUser(
  account: Account,
): AxiosPromise<GraphQLResponse<MyUserDetails, unknown>> {
  const QUERY = gql`
    query me {
      me {
        user {
          accountId
          name
          picture
        }
      }
    }
  `;

  return apiRequestAuth(account, {
    query: print(QUERY),
    variables: {},
  });
}

/**
 * List all notifications for the current user.
 *
 * Endpoint documentation: https://developer.atlassian.com/platform/atlassian-graphql-api/graphql
 */
export function getNotificationsForUser(
  account: Account,
  settings: SettingsState,
): AxiosPromise<GraphQLResponse<MyNotifications, NotificationsExtensions>> {
  const QUERY = gql`
    query myNotifications
      (
        $readState: InfluentsNotificationReadState, 
        $first: Int
      ) 
      {
      notifications {
        unseenNotificationCount
        notificationFeed(
          flat: true, 
          first: $first,
          filter: {
            readStateFilter: $readState
          }
        ) {
          pageInfo {
            hasNextPage
          }
          nodes {
            groupId
            headNotification {
              notificationId
              timestamp
              readState
              category
              content {
                type
                message
                url
                entity {
                  title
                  iconUrl
                  url
                }
                path {
                  title
                  iconUrl
                  url
                }
                actor {
                  displayName
                  avatarURL
                }
              }
              analyticsAttributes {
                key
                value
              }
            }
          }
        }
      }
    }
  `;

  return apiRequestAuth(account, {
    query: print(QUERY),
    variables: {
      first: Constants.MAX_NOTIFICATIONS_PER_ACCOUNT,
      readState: settings.fetchOnlyUnreadNotifications ? 'unread' : null,
    },
  });
}

/**
 * Mark a notification as "read".
 *
 * Endpoint documentation: https://developer.atlassian.com/platform/atlassian-graphql-api/graphql
 */
export function markNotificationsAsRead(
  account: Account,
  notificationIds: string[],
): AxiosPromise<void> {
  const MUTATION = gql`
    mutation markAsRead($notificationIDs: [String!]!) {
      notifications {
        markNotificationsByIdsAsRead(ids: $notificationIDs) 
      }
    }
  `;

  return apiRequestAuth(account, {
    query: print(MUTATION),
    variables: {
      notificationIDs: notificationIds,
    },
  });
}

/**
 * Mark a notification as "unread".
 *
 * Endpoint documentation: https://developer.atlassian.com/platform/atlassian-graphql-api/graphql
 */
export function markNotificationsAsUnread(
  account: Account,
  notificationIds: string[],
): AxiosPromise<void> {
  const MUTATION = gql`
    mutation markAsUnread($notificationIDs: [String!]!) {
      notifications {
        markNotificationsByIdsAsUnread(ids: $notificationIDs) 
      }
    }
  `;

  return apiRequestAuth(account, {
    query: print(MUTATION),
    variables: {
      notificationIDs: notificationIds,
    },
  });
}
