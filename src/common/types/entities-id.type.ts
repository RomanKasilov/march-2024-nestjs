import { Opaque } from './opaque.type';

export type UserID = Opaque<string, 'UserID'>;
export type PostID = Opaque<string, 'PostID'>;
export type CommentID = Opaque<string, 'CommentID'>;
export type FollowID = Opaque<string, 'FollowID'>;
export type LikeID = Opaque<string, 'LikeID'>;
export type TagID = Opaque<string, 'TagID'>;
export type RefreshTokenID = Opaque<string, 'RefreshTokenID'>;
