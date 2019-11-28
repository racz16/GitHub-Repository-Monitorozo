export interface CommitDto {
    url: string;
    sha: string;
    node_id: string;
    html_url: string;
    comments_url: string;
    commit: CommitInfoDto;
    author: CommitAuthorDto;
    committer: CommitAuthorDto;
    parents: Array<TreeDto>;
}

export interface CommitAuthorDto {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface CommitInfoDto {
    url: string;
    author: CommitInfoAuthorDto;
    committer: CommitInfoAuthorDto;
    message: string;
    tree: TreeDto;
    comment_count: number;
    verification: VerificationDto;
}

export interface CommitInfoAuthorDto {
    name: string;
    email: string;
    date: string;
}

export interface TreeDto {
    url: string;
    sha: string;
}

export interface VerificationDto {
    verified: boolean;
    reason: string;
    signature: null;
    payload: null;
}
